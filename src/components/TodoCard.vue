<script>
export default {
  props: ["dothings"]
}
</script>

<template>
  <div class="card">
    <a-card size="small" style="width: 800px">
    <h3>{{dothings}}</h3>
  </a-card>
  </div>
</template>

<style scoped>
.card{
  display: flex;
  justify-content: center;
}
</style>