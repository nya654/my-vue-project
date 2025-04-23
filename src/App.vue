<template>
  <a-layout id="BasicLayout">
    <a-layout-header class="header">
      <MyHeader />
    </a-layout-header>
    <a-layout-content>
      <MyLogin />
    </a-layout-content>
    <a-layout-footer class="footer">
      <footer>Ant Design ©2023 Created by Ant UED</footer>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import MyHeader from './components/MyHeader.vue';
import MyLogin from '@/components/MyLogin.vue';
export default {
  name: 'BasicLayout',
  components: {
    MyLogin,
    MyHeader,
  },
  setup() {
    return {};
  },
};
</script>
<style scoped>
#BasicLayout .header {
  background-color: white;
  color: unset;
}
#BasicLayout .footer {
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>