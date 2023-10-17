<template>
  <div id="exampleView">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="MdValue" :handle-change="onMdChange" />
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
