<template>
  <div class="order-box">
    <div>
      <p>接收订单</p>
      <input type="date" v-model="formData.orderCreateTime">
      <input type="number" v-model="formData.deliveryType">

    </div>

    <div>
      <p>分页查询所有订单信息</p>
      <label >容量<input type="number" v-model="condition.pageSize"></label>
      <label >页数<input type="number" v-model="condition.currentPage"></label>
      总数<span v-text="totalItem"></span>
      <button @click="orderGet">分页查询所有信息</button>
    </div>
    <div>
      <input type="number" v-model="orderId">
      <button @click="orderGoodGet">通过orderId查询商品信息</button>
    </div>




      <label for="orderid">订单编号</label>
      <input type="number" id="orderid" v-model="condition.orderId">
      <span>订单类型</span><select name="orderType"  v-model="condition.orderType">
        <option value="-1">全部</option>
        <option value="1">电话订单</option>
        <option value="2">网络订单</option>
        <option value="3">其他</option>
        <option value="4">淘宝网店</option>
        <option value="5">当当网店</option>
      </select>
      <span>支付方式</span><select name="payType"  v-model="condition.payType">
        <option value="-1">全部</option>
        <option value="1">货到付款</option>
        <option value="2">款到发货</option>
      </select>
      <span>业务类型</span><select name="payType" v-model="condition.bussinessType">
      <option value="-1">全部</option>
      <option value="1">普通业务</option>
      <option value="2">号卡套餐</option>
    </select>
      <span>下单日期</span>
      <label for="beginTime">起始</label><input type="date" name="beginTime" id="beginTime" v-model="condition.beginTime"/>
      <label for="endTime">结束</label><input type="date" name="endTime" id="endTime" v-model="condition.endTime"/>

      <span>订单动作</span><select name="payType" v-model="condition.orderAction">
      <option value="-1">全部</option>
      <option value="1">订购</option>
      <option value="2">换购</option>
      <option value="3">支付</option>
    </select>
      <span>订单状态</span><select name="orderType"  v-model="condition.orderStatus">
      <option value="-1">全部</option>
      <option value="0">无效</option>
      <option value="1">待审核</option>
      <option value="2">审核通过</option>
      <option value="3">已付款</option>
      <option value="4">待出库</option>
      <option value="5">已出库</option>
      <option value="6">已发货</option>
      <option value="7">已到货</option>
      <option value="8">已归档</option>
    </select>
      <button @click="conditionGet">提交条件查询</button>
      <button @click="resetCondition">重置查询条件</button>
      


  </div>
</template>

<script>
export default {
  name: "index.vue",
  data(){
    return {
      orderId:1,
      totalItem:0,
      formData:{
        id:'',
        orderCreateTime:'',
        deliveryType:'',
        orderId:1,
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
      condition:{
        pageSize:5,
        currentPage:1,
        orderId:'',
        orderType:-1,
        payType:-1,
        bussinessType:-1,
        beginTime:'',
        endTime:'',
        orderAction:-1,
        orderStatus:-1,
        
      }

    }
  },
  methods:{
    //分页查询所有订单
    orderGet(){
      this.$axios.get(`order`).then(response=>{
        console.log(response)
        this.totalItem = response.data.data.total;

      })
    },
    orderGoodGet(){
      this.$axios.get(`ordergood/orderid/${this.orderId}`).then(response=>{
        console.log(response)

      })
    },
    conditionGet(){
      this.$axios.get(`order`,{
        params:this.condition
      }).then(response=>{
        console.log(response)
        this.totalItem = response.data.data.total;
      })
    },
    resetCondition(){
      this.condition = {
        orderId:'',
        orderType:-1,
        payType:-1,
        bussinessType:-1,
        beginTime:'',
        endTime:'',
        orderAction:-1,
        orderStatus:-1,
      }
    }





  }

}
</script>

<style scoped>


</style>