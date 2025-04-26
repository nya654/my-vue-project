<!--<template>-->
<!--      <div>-->
<!--        <a-row>-->
<!--          <a-col :span="20">-->

<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-button type="primary" shape="round" size="large">-->
<!--            <template #icon>-->
<!--              <PlusOutlined />-->
<!--            </template>-->
<!--            新建-->
<!--          </a-button>-->
<!--          </a-col>-->

<!--        </a-row>-->

<!--      </div>-->

<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { PlusOutlined } from '@ant-design/icons-vue';-->
<!--</script>-->
<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" shape="round" size="large" html-type="submit" :disabled="formState.user === '' || formState.password === ''">
        <template #icon>
              <PlusOutlined />
        </template>
            新建
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';

interface FormState {
  user: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
});
const handleFinish: FormProps['onFinish'] = values => {
  console.log(values, formState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.log(errors);
};
</script>

