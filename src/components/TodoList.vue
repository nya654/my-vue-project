<template>
  <div class="main-container">
    <a-card
      title="我的一天"
      :bordered="false"
      class="content-card"
    >
      <!-- 添加表单容器 -->
      <div class="form-container">
        <TodoAdd />
      </div>

      <div class="todo-list">
        <todo-card dothings="吃饭"/>
        <!-- 后续待办事项 -->
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #ececec;
  padding: 30px;
}

.content-card {
  width: 1000px;
  /* 添加卡片内部布局 */
  display: flex;
  flex-direction: column;
}

.form-container {
  /* 控制表单区域间距 */
  margin: 20px;
  width: 100%;
  /* 让他居中对齐 */
  display: flex;
  justify-content: center;
}

.todo-list {
  margin-top: 40px;
}

/* 深度选择器强制修改卡片头样式 */
:deep(.ant-card-head) {
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid #1890ff;
}
</style>
<script setup>
import TodoAdd from "./TodoAdd.vue";
import TodoCard from "./TodoCard.vue";
</script>