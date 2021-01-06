<template>
  <div class="order-box">
    <input type="date" v-model="formData.orderCreateTime">
    <input type="number" v-model="formData.deliveryType">
    <button @click="lalala">点击</button>


  </div>
</template>

<script>
export default {
  name: "index.vue",
  data(){
    return {
      formData:{
        id:'',
        orderCreateTime:'',
        deliveryType:'',
        goodItems:[
          {
            orderId:'123412',
            receiverName:'lin',
          },
          {
            orderId:'122412',
            receiverName:'张',
          }
        ],
      },

    }
  },
  methods:{
    lalala(){
      this.$axios.post(`order`,this.formData).then(response=>{
        console.log(response)
      })
    }
  }

}
</script>

<style scoped>


</style>