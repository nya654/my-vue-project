<script setup>

import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
  <div class="logincard bg-image-parent">
      <a-card style="width: 900px">
        <a-layout>
          <a-layout>
          <a-layout-content>
            <img alt="example" src="../assets/108333059_p0.jpg" class="loginImage">
          </a-layout-content>
        <a-layout-sider class="loginForm" width="300px" >
          <div class="loginText">
            <h3 style="margin-bottom: 30px;margin-top: 30px">欢迎~</h3>
            <h3 style="margin-bottom: 30px">请注册 or 登陆~</h3>
          </div>

          <div style="margin-right: 20px">
            <RegisterForm />
          </div>
        </a-layout-sider>

        </a-layout>
        </a-layout>
      </a-card>
  </div>

</template>

<style scoped>
.logincard {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;
}
.loginImage {
  width: 600px;
  height: auto;
}
.loginForm {
  width: 600px;
  height: auto;
  background-color: #f0f0f0;
}
.loginText{
  text-align: center;
}
.background-image{
  background-image: url("../assets/129348929_p0_master1200.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.5)

}

.bg-image-parent {
  position: relative;
}

.bg-image-parent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/129348929_p0_master1200.jpg") center/cover;
  opacity: 0.5;
  z-index: 0; /* 调整层级 */
}


</style>