<template>
  <div id="userLoginView">
    <h1 style="margin: 32px 0">登录</h1>
    <a-form
      :model="form"
      auto-label-width
      label-align="left"
      style="max-width: 320px; margin: 0 auto"
    >
      <a-form-item
        field="userAccount"
        label="账号"
        required
        tooltip="账号不少于 4 位"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        required
        tooltip="密码不少于 8 位"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
    </a-form>
    <a-space wrap>
      <a-button
        shape="round"
        size="large"
        status="success"
        type="secondary"
        @click="toIndex"
      >
        首 页
      </a-button>
      <a-button
        html-type="submit"
        shape="round"
        size="large"
        style="width: 120px; margin: 16px"
        type="primary"
        @click="handleSubmit"
      >
        登 录
      </a-button>
      <a-button
        shape="round"
        size="large"
        status="success"
        type="outline"
        @click="toRegister"
      >
        注 册
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService, UserLoginRequest } from "../../../backend/user";

/**
 * 表单信息
 * @type {UnwrapNestedRefs<{post: string, name: string, isRead: boolean}>}
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // 将token保存在localStorage中
    localStorage.setItem("token", res.data.token);
    router.push({
      path: "/",
      replace: true,
    });
    message.success("登录成功！");
  } else {
    message.error("登录失败," + res.message);
  }
};
/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: `/`,
  });
};

const toRegister = () => {
  router.push({
    path: `/user/register`,
  });
};
</script>
