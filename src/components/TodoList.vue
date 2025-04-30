<template>
  <div class="main-container">
    <a-card
      title="TodoList"
      :bordered="false"
      class="content-card"
    >
      <a-form-item name="date-picker" label="日期" class="flex-container" >
      <a-date-picker v-model:value="days" value-format="YYYY-MM-DD" placeholder="选择日期" />
    </a-form-item>
      <!-- 添加表单容器 -->
      <div class="form-container">
        <TodoAdd @update="handleUpdate" :ParentDays="this.days"/>
      </div>

      <div class="todo-list">
        <todo-card v-for="thing in things" :dothings="thing[0]" :checked="thing[1]" style="margin-bottom: 10px" :cardId="thing[2]"/>
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
.flex-container {
  position: relative; /* 或 absolute/fixed 根据需求 */
  display: flex;
  justify-content: flex-end; /* 水平靠右 */
  align-items: flex-start;   /* 垂直靠上 */
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
import dayjs from 'dayjs';


export default {
  data(){
    return{
      things: [],
      days: dayjs().format('YYYY-MM-DD'),
    }
  },
  async created(){
    //判断在不在登陆状态
    const cookie = document.cookie
    console.log(cookie)
      console.log(this.days)
      console.log(typeof(this.days))
      await this.getThings()
  },
  components: {
    TodoAdd,
    TodoCard
  },
  methods:{
    handleUpdate(payload){

      console.log(payload)
      this.things.push([payload.content,false,payload.id])
    },
    async getThings(){
        try {

          const response = await axios.get(`http://localhost:8000/api/getthings/${this.days}`)
          const items = response?.data?.data?.items || [];
          console.log(items)
          this.things = items
        }catch (error){
          console.error('请求失败:', {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
          });
          console.log(error.response.data)
          return []
        }
      }
  },
  watch:{
    days(oldValue,newValue){
      this.getThings()
    }
  }

}
</script>