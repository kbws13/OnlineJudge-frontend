<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                :column="{ xs: 1, md: 2, lg: 3 }"
                title="判题条件"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}kb
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" disabled title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select v-model="form.submitLanguage" placeholder="选择编程语言">
              <a-option>java</a-option>
              <a-option>python3</a-option>
              <a-option disabled>敬请其他更多语言</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :handle-change="changeCode"
          :language="form.submitLanguage"
          :value="form.submitCode as string"
        />
        <a-divider size="0" />
        <a-button
          style="min-width: 200px; text-align: center;"
          type="primary"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../backend/question";
import { useStore } from "vuex";
import { LoginUserVO } from "backend/user";

interface Props {
  id: string;
}

/**
 * 获取到动态路由 id
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

// 获取存储用户信息
const store = useStore();

const question = ref<QuestionVO>();
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败," + res.message);
  }
};

/**
 * 不同语言的默认程序
 */
const codeDefaultValue = ref(
  "import java.util.Scanner;\n" +
  "public class Main {\n" +
    "    public static void main(String[] args) {\n" +
    "        Scanner in = new Scanner(System.in);\n" +
    "        \n" +
    "    }\n" +
    "}\n"
);

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const form = ref<QuestionSubmitAddRequest>({
  submitLanguage: "java",
  submitCode: codeDefaultValue as unknown as string,
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
     message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
  // 获取登录用户信息
  const loginUser: LoginUserVO = store.state.user?.loginUser as LoginUserVO;

  // 创建 SSE 请求
  const eventSource = new EventSource(
  //  `http://localhost:8101/api/question/sse/connect/${loginUser.id}`
    `http://ojbackend.kbws.xyz/api/question/sse/connect/${loginUser.id}`
  )
  // 接收消息
  eventSource.onmessage = function (event) {
   message.info(event.data)
  }
  // 报错或连接关闭时触发
  eventSource.onerror = function (event) {
   if(event.eventPhase === EventSource.CLOSED) {
     console.log("关闭连接");
     eventSource.close();
   }
  }
});

const changeCode = (value: string) => {
  form.value.submitCode = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
