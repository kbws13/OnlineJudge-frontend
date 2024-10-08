<template>
  <a-row id="globalHeader" :wrap="false" align="center">
    <a-col flex="auto">
      <div>
        <a-menu
          :selected-keys="selectedKeys"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img alt="logo" class="logo" src="../assets/oj-logo.png" />
              <div class="title">K-OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <!-- <a-dropdown trigger="hover">
        <template
          v-if="loginUser && loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN"
        >
          <template v-if="loginUser.userAvatar">
            <a-avatar
              :image-url="loginUser.userAvatar"
              shape="circle"
            ></a-avatar>
          </template>
          <template v-else>
            <a-avatar shape="circle">
              <IconUser />
            </a-avatar>
          </template>
        </template>
        <template v-else>
          <a-avatar :style="{ backgroundColor: '#3370ff' }" shape="circle">
            <IconUser />
          </a-avatar>
        </template>
        <template #content>
          <template v-if="loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN">
            <a-doption>
              <template #icon>
                <icon-idcard />
              </template>
              <template #default>
                <a-anchor-link href="/user/info">个人信息</a-anchor-link>
              </template>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-poweroff />
              </template>
              <template #default>
                <a-anchor-link @click="logout">退出登录</a-anchor-link>
              </template>
            </a-doption>
          </template>
          <template v-else>
            <a-doption>
              <template #icon>
                <icon-user />
              </template>
              <template #default>
                <a-anchor-link href="/user/login">登录</a-anchor-link>
              </template>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-user />
              </template>
              <template #default>
                <a-anchor-link href="/user/register">注册</a-anchor-link>
              </template>
            </a-doption>
          </template>
        </template>
      </a-dropdown> -->
      <!-- 未登录状态 -->
      <a-link v-if="!loginUser.id" @click="gologin">未登录</a-link>
      <!-- 已登录状态 -->
      <a-popover v-else trigger="click" position="bottom">
        <!-- 没名称用户 -->
        <a-link>{{ loginUser.userName ?? "无名"  }}</a-link>
        <template #content>
          <p class="logout" @click="logout">退出登录</p>
        </template>
      </a-popover>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { LoginUserVO, UserControllerService } from "../../backend/user";

const router = useRouter();
// 获取存储用户信息
const store = useStore();

// 获取登录用户信息
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

// 展示在菜单的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 通过权限过滤菜单
    return checkAccess(
      store.state.user.loginUser,
      item?.meta?.access as string
    );
  });
});

// 用户注销
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};

const gologin = () => {
  router.push({
    path: "/user/login",
  });
};

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单页
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "KBWS",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 1000);
</script>

<style scoped>
.logout {
  cursor: pointer;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
