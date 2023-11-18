<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in" appear>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://kbws.xyz" target="_blank"> Online Judge by KBWS </a>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
          桂ICP备2023002099号
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

#basicLayout {
  margin: 0 20px;
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
  height: 60px;
  margin: 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin: 16px 0;
  border-radius: 10px;
}

#basicLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader.vue";

export default {
  components: { GlobalHeader },
};
</script>
