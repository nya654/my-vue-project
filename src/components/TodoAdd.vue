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
    @finish="addTodo"
    @finishFailed="handleFinishFailed"
  >
      <a-form-item>
      <a-input v-model:value="formState.content" placeholder="写下来要做的事吧~" size="large" style="width: 700px">
        <template><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
<!--  当表单为空的时候 无论何时 都不需要click方法-->
      <!--当日期相同时 无论何时 都不需要click方法-->
      <a-popover v-model:open="visible" title="只能在今天新建待办事项哦~" :trigger="(props.ParentDays === dayjs().format('YYYY-MM-DD') || formState.content==='')  ? [] : ['click']">
          <template #content>
            <a @click="hide">close</a>
          </template>
          <a-button type="primary" shape="round" size="large" html-type="submit" :disabled="formState.content === ''">
        <template #icon>
              <PlusOutlined />
        </template>
            新建

      </a-button>
        </a-popover>

    </a-form-item>

  </a-form>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { reactive,ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import axios from 'axios';
import { defineEmits } from 'vue'
import dayjs from 'dayjs'

const days = ref(dayjs().format('YYYY-MM-DD'))

const props = defineProps({
  ParentDays: {
    type: String,
    required: true
  }

})

const emit = defineEmits(['update'])

const visible = ref<boolean>(false);



interface FormState {
  content: string;
}
const formState: UnwrapRef<FormState> = reactive({
  content: ''
});
const handleFinish: FormProps['onFinish'] = values => {
  console.log(values, formState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.log(errors);
};
const hide = () => {
  visible.value = false;
};

async function addTodo() {
  if(props.ParentDays !== dayjs().format('YYYY-MM-DD')){
    visible.value = true
    return
  }
  try {
    const response = await axios.post('http://localhost:8000/api/addthing', {
      id: 0,
      content: formState.content,
      is_finish: false
    },{
      withCredentials: true // 发送 Cookie
    });
    //数据库里更新了 前端也要更新
    formState.content = ''
    emit('update', response.data.data)
  }catch (error) {
    console.error('Error:', error);
  }
}
</script>

