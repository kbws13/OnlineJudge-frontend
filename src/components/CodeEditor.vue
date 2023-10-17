<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
  <a-button @click="fillValue">填充值</a-button>
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

/**
 * 定义组件属性类型
 */
interface Prop {
  value: string;
  handleChange: (v: string) => void;
}

const codeEditorRef = ref();
const codeEditor = ref();

const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  // 改变值
  toRaw(codeEditor.value).setValue("新的值");
};

// 给组件定义初始值
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    lineNumbers: "on",
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs",
  });
  // 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
