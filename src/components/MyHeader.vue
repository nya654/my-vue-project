<template>
  <div id="globalHeader">
    <a-row>
      <a-col :span="21">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
      </a-col>
      <a-col v-if="user === null" :span="3">
        <router-link to="/login">
          <a-button style="margin-right: 20px" >登陆</a-button>
        </router-link>
        <router-link to="/register">
          <a-button>注册</a-button>
        </router-link>
      </a-col>
      <a-col v-else :span="3">

          <a-button @click="logout">登出</a-button>
      </a-col>

    </a-row>

  </div>

</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons-vue';
import githubIcon from '../assets/github-mark.png'
import {MenuProps} from 'ant-design-vue';
import axios from 'axios';
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia';

const store = useAuthStore()

const {user} = storeToRefs(store)

const {logout} = store


const current = ref<string[]>();
const items = ref<MenuProps['items']>([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: h(
      RouterLink,
      { to: '/todo' },
      { default: () => 'TodoList' }
    ),
    title: 'TodoList'

  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    icon: () => h('img', {
        src: githubIcon, // 使用导入的图片变量
      style: {
        width: '16px',
        height: '16px',
      },
      alt: 'GitHub 图标'
    }),
    label: h('a', {href: 'https://github.com/nya654/my-vue-project', target: '_blank'}, 'GitHub-repository'),
    title: 'github',
  },
]);
</script>