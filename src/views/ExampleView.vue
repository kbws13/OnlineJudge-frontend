<template>
  <div id="exampleView">
    <CodeEditor :handle-change="onCodeChange" :value="codeValue" />
    <MdEditor :handle-change="onMdChange" :value="MdValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref();
const MdValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
};

const onMdChange = (v: string) => {
  MdValue.value = v;
};
</script>
<style scoped>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
