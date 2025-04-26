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
        <todo-card v-for="thing in things" :dothings="thing[0]" :checked="thing[1]"style="margin-bottom: 10px"/>
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
<script>
import TodoAdd from "./TodoAdd.vue";
import TodoCard from "./TodoCard.vue";
import axios from 'axios';
async function getThings(){
  try {
    const response = await axios.get('http://localhost:8000/api/getthings')
    console.log(response.data.data.items)
    return response.data.data.items
  }catch (error){
    console.log(error.response.data)
    return []
  }
}
export default {
  data(){
    return{
      things: []
    }
  },
  async created(){
    try{
      this.things = await getThings()
    }catch (error){
      console.log("数据加载失败")
    }

  },
  components: {
    TodoAdd,
    TodoCard
  }
}
</script>