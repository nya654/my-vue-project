
<template>
  <div class="card" v-if="isVisible">
    <a-card size="small" style="width: 800px">
      <a-row >
        <a-col :span="16">
          <h3>{{innerDothings}}</h3>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" shape="round" size="small"  @click="showModal">
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
          <a-modal v-model:open="open" title="更改事项" @ok="ChangeStatus" ok-text="确定" cancel-text="取消">
            <a-form>
              <a-form-item>
                <a-input v-model:value="innerDothings" />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-col><a-col :span="2">
          <a-button type="primary" shape="round" size="small"  @click="deleteTodo">
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </a-col>
        <a-col :span="3">
          <a-switch v-model:checked="innerChecked" checked-children="已完成" un-checked-children="未完成" @click="ChangeStatus"/>
        </a-col>

      </a-row>

  </a-card>
  </div>
</template>

<script>
import { DeleteOutlined,EditOutlined } from '@ant-design/icons-vue';
export default {
  props: ["cardId","dothings","checked"],
  data(){
    return{
      innerChecked: this.checked,
      open: false,
      changeTodo: '',
      innerDothings: this.dothings,
      isVisible: true
    }
  },
  methods:{
    ChangeStatus,
    showModal(){
      this.open = true;
    },
    handleOk(){
      this.open = false;
    },
    deleteTodo
  },
  components:{
    DeleteOutlined,
    EditOutlined
  }
}

import axios from 'axios';
async function ChangeStatus(){
  const temp_dothings = this.innerDothings
  try{
    const response = await axios.put(`http://localhost:8000/api/updatethings/${this.cardId}`,{
      id: this.cardId,
      content: this.innerDothings,
      is_finish: this.innerChecked
    })
    this.open = false
  }catch (error){
    console.error('更新状态失败:', error.response?.data || error.message);
    // 回滚状态
    if (this.open === false){
      this.innerChecked = !this.innerChecked;
    }else{
      this.innerDothings = temp_dothings
    }
  }
}
async function deleteTodo(){
  try{
    const response = await axios.delete(`http://localhost:8000/api/deletethings/${this.cardId}`)
    this.isVisible = false
    console.log(response.data)
  }catch (error){
    console.error('删除失败:', error.response?.data || error.message);
    this.isVisible = true
  }
}
</script>

<style scoped>
.card{
  display: flex;
  justify-content: center;
}
</style>