<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="register"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item
      label="邮箱"
      name="email"
      :rules="[{ required: true, message: '请告诉我你的邮箱地址' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请告诉我你的名字~' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item has-feedback label="密码" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="确认密码" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  username: '',
  pass: '',
  checkPass: '',
  email: ''
});
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码哦');
  } else {
    if (formState.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请你确认你的密码');
  } else if (value !== formState.pass) {
    return Promise.reject("你再次确认的密码和第一次输入的密码不一致");
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};
const handleFinish = (values: FormState) => {
  console.log(values, formState);
};
const handleFinishFailed = errors => {
  console.log(errors);
};
const handleValidate = (...args) => {
  console.log(args);
};
import axios from 'axios';
async function register() {
  try{
    const response = await axios.post('http://localhost:8000/api/register',{
      username: formState.username,
      password: formState.pass,
      email: formState.email
    }
    )
    alert(response.data.message)
  }catch (error){
    if(error.response){

      const {status,data} = error.response

      if (status === 401){
        alert(data.detail.message)
      }else{
        alert(`请求失败 ${status}`)
      }
    }else {
      alert("网络问题")
    }
  }
}
</script>

