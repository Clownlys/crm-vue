<template>
  <div class="page-box">
    <table border="1" style="border-collapse: collapse">
      <tr>
        <td colspan="4">订单基本资料</td>
      </tr>
      <tr>
        <td>订单编号</td>
        <td>{{ order.id }}</td>
        <td>下单日期</td>
        <td>{{ order.orderCreateTime }}</td>
      </tr>
      <tr>
        <td>订单类型</td>
        <td>{{ orderTypeValue(order.orderType) }}</td>
        <td>订单动作</td>
        <td>{{ orderActionValue(order.orderAction) }}</td>
      </tr>
      <tr>
        <td>业务类型</td>
        <td>{{ bussinessTypeValue(order.bussinessType) }}</td>
        <td>订单状态</td>
        <td>{{ orderStatusValue(order.orderStatus) }}</td>
      </tr>
      <tr>
        <td colspan="4">收货人资料</td>
      </tr>
      <tr>
        <td>收货人姓名</td>
        <td>{{ order.receiverName }}</td>
        <td>会员账号</td>
        <td>{{ order.userAccount }}</td>
      </tr>
      <tr>
        <td>联系电话</td>
        <td>{{ order.receiverTel }}</td>
        <td>联系手机</td>
        <td>{{ order.receiverPhone }}</td>
      </tr>
      <tr>
        <td>邮政编码</td>
        <td>{{ order.postalCode }}</td>
        <td>收货地址</td>
        <td>{{ order.receiverAddress }}</td>
      </tr>
      <tr>
        <td>配送地区</td>
        <td>{{ order.deliveryZone }}</td>
        <td>配送方式</td>
        <td>{{ deliveryTypeValue(order.deliveryType)  }}</td>
      </tr>
      <tr>
        <td>配送费用</td>
        <td>{{ order.deliveryPrice }}</td>
        <td>支付方式</td>
        <td>{{payTypeValue(order.payType)}}</td>
      </tr>
      <tr>
        <td>自提时间</td>
        <td>{{ order.ownTakeTime }}</td>
        <td>电子邮箱</td>
        <td>{{order.receiverEmail}}</td>
      </tr>
      <tr>
        <td>汇款人</td>
        <td>{{order.remitter}}</td>
      </tr>
      <tr>
        <td>备注</td>
        <td colspan="3">{{order.remark}}</td>
      </tr>
      <tr>

        <td colspan="4">订单商品信息</td>
      </tr>
      <tr>
        <td colspan="4" >
          <table border="1" style="border-collapse: collapse">
            <tr>
              <td>商品编号</td>
              <td>商品名称</td>
              <td>单价</td>
              <td>数量</td>
              <td>总金额</td>
            </tr>
            <tr v-for="item in goodList" :key="item.id" >
              <td>{{item.id}}</td>
              <td>{{item.gootName}}</td>
              <td>{{item.goodPrice}}</td>
              <td>{{item.goodNum}}</td>
              <td>{{item.totalPrice}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <el-button size="mini" type="primary" @click="goBack"> 返回 </el-button>


  </div>
</template>
<script src="./index.js">
</script>
<style scoped>
</style>