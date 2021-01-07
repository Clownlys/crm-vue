<template>
  <div class="entity-box">
    <!--    操作的部分 -->
    <div class="execute-box">

    </div>

    <div class="search-box">
      <!--      搜索使用到的-->
      <el-form :inline="true" :model="condition" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="condition.orderId" type="number" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="condition.orderType" placeholder="订单类型">
            <el-option label="全部" value="-1"></el-option>
            <el-option  v-for="item in orderAssets.orderTypeList" :key="item.id" :label="item.name"  :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="condition.payType" placeholder="支付方式">
            <el-option label="全部" value="-1"></el-option>
            <el-option  v-for="item in orderAssets.payTypeList" :key="item.id" :label="item.name"  :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="condition.bussinessType" placeholder="业务类型">
            <el-option label="全部" value="-1"></el-option>
            <el-option  v-for="item in orderAssets.bussinessTypeList" :key="item.id" :label="item.name"  :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始">
          <el-input v-model="condition.beginTime" type="date"></el-input>
        </el-form-item>
        <el-form-item label="结束">
          <el-input v-model="condition.endTime" type="date"></el-input>
        </el-form-item>
        <el-form-item label="订单动作">
          <el-select v-model="condition.orderAction" placeholder="订单动作">
            <el-option label="全部" value="-1"></el-option>
            <el-option  v-for="item in orderAssets.orderActionList" :key="item.id" :label="item.name"  :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="condition.orderStatus" placeholder="订单状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option  v-for="item in orderAssets.orderStatusList" :key="item.id" :label="item.name"  :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="table-box">
      <!--
      stripe ：隔行变色
      border： 设置边框的
      -->


      <el-table
          ref="dataTable"
          stripe
          tooltip-effect="light"
          border
          :data="tableData"

          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + condition.pageSize * (condition.currentPage - 1) }}</span>
          </template>

        </el-table-column>
        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            align="center"
            prop="id"
            label="订单编号"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="orderType"
            label="订单类型"
        >
          <template slot-scope="scope">
            <span>{{orderTypeValue(scope.row.orderType)}}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="orderAction"
            label="订单动作"
        >
          <template slot-scope="scope">
            <span>{{orderActionValue(scope.row.orderAction)}}</span>
          </template>
        </el-table-column>

        <el-table-column
            align="center"
            prop="bussinessType"
            label="业务类型"
        >
          <template slot-scope="scope">
            <span>{{bussinessTypeValue(scope.row.bussinessType)}}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="payType"
            label="支付方式"
        >
          <template slot-scope="scope">
            <span>{{payTypeValue(scope.row.payType)}}</span>
          </template>
        </el-table-column>

        <el-table-column
            align="center"
            prop="deliveryType"
            label="配送方式">
          <template slot-scope="scope">
            <span>{{deliveryTypeValue(scope.row.deliveryType)}}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="orderStatus"
            label="订单状态">
          <template slot-scope="scope">
            <span>{{orderStatusValue(scope.row.orderStatus)}}</span>
          </template>
        </el-table-column>

        <el-table-column
            align="center"
            label="操作"
        >
          <!--这种方式是可以展示的 但是无法取值 (必须把按钮添加在template标签中 用于取值)-->
          <template v-slot="obj">
            <el-button size="mini" type="primary" >  <router-link :to="{path:'/main/order/orderDetail',query: {id: obj.row.id}}">查看</router-link> </el-button>
          </template>


        </el-table-column>
      </el-table>
    </div>

    <div class="page-box">
      <!--
      page-size: 表示每一页的大小 默认值是10
      current-page： 表示当前页默认是1  current-page等于几 这一页高亮

      -->
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="condition.currentPage"
          :page-size="condition.pageSize"
          @current-change="pageChange"
          :total="total">
      </el-pagination>

    </div>


  </div>


</template>

<script src="./index.js">
</script>

<style scoped>

</style>