<script>
export default {
  props: ["dothings","checked"],
  data(){
    return{
      innerChecked: this.checked
    }
  }
}
</script>

<template>
  <div class="card">
    <a-card size="small" style="width: 800px">
      <a-row>
        <a-col :span="21">
          <h3>{{dothings}}</h3>
        </a-col>
        <a-col :span="3">
          <a-switch v-model:checked="innerChecked" checked-children="已完成" un-checked-children="未完成" @click=""/>
        </a-col>

      </a-row>

  </a-card>
  </div>
</template>

<style scoped>
.card{
  display: flex;
  justify-content: center;
}
</style>