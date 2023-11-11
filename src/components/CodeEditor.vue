<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 480px; height: 40vh"
  />
</template>
<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Prop {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

const codeEditorRef = ref();
const codeEditor = ref();

// 给组件定义初始值
const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    lineNumbers: "on",
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    // theme: "vs",
    theme: "vs-dark",
  });
  // 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
