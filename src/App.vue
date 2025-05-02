<template>
  <a-layout id="BasicLayout">
    <a-layout-header class="header">
      <!--我现在需要做一个刷新系统
           通过MyHeader的子组件传现在的App父组件来进行刷新-->
      <MyHeader v-if="true" @refresh="handleRefresh"/>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">
      <footer>关于</footer>
    </a-layout-footer>
  </a-layout>

</template>
<script>
import MyHeader from './components/MyHeader.vue';
import MyLogin from '@/components/MyLogin.vue';
import {nextTick} from 'vue'
export default {
  data(){
    return{
      headerKey: true
    }
  },
  name: 'BasicLayout',
  components: {
    MyLogin,
    MyHeader,
  },
  methods: {
    handleRefresh(){
      this.headerKey = false;
      console.log("刷新")
      nextTick(() => {
        this.headerKey = true;
      });
    }
  }
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