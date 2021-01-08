<template>
  <div class="entity-box">
    <!--    操作的部分 -->
    <div class="execute-box">
      <!--
        size: 表示大小 size	尺寸	string	medium / small / mini
        type: 表示按钮的颜色  primary / success / warning / danger / info / text
        plain: 镂空颜色
        round：button是否是圆角显示
      -->
      <!--<el-button-group>-->
        <!--<el-button size="mini" type="danger" @click="dialogFormVisible=true,formData={}">新建</el-button>-->
        <!--<el-button size="mini" type="danger" @click="dialogDeleteVisible=true">删除</el-button>-->
      <!--</el-button-group>-->
    </div>

    <div class="search-box">
      <!--      搜索使用到的-->
      <el-form :inline="true" ref="form1" :model="searchForm" class="demo-form-inline">
        <el-form-item label="存货档案编码" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.prodCode" placeholder="存货档案编码"></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.prodModel" placeholder="基础库-型号"></el-input>
        </el-form-item>
        <el-form-item label="基础库分类" size="mini" style="margin-top: 5px">
          <el-select v-model="searchForm.prodType" placeholder="基础库品牌">
            <div v-for="(cat,index) in categoryList" :key="index">
              <el-option :index="cat.id" :label="cat.categoryName" :value="cat.id"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="基础库品牌" size="mini" style="margin-top: 5px">
          <el-select v-model="searchForm.prodBrand" placeholder="基础库品牌">
            <div v-for="(bra,index) in brandList" :key="index">
              <el-option :index="bra.id" :label="bra.brandName" :value="bra.id"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="findAll">查询</el-button>
          <el-button size="mini" @click="searchForm={},findAll()">刷新</el-button>
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
          @selection-change="selectionChangeListener"
          style="width: 100%">
        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            align="center"
            prop="id"
            label="id"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="prodCode"
            label="存货档案编码"
        >
        </el-table-column>
          <el-table-column
                  align="center"
                  prop="category.categoryName"
                  label="基础库-分类"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="brand.brandName"
                  label="基础库-品牌"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="prodModel"
                  label="基础库-型号"
          >
          </el-table-column>
        <!--<el-table-column-->
            <!--align="center"-->
            <!--label="操作"-->
        <!--&gt;-->
          <!--&lt;!&ndash;这种方式是可以展示的 但是无法取值 (必须把按钮添加在template标签中 用于取值)&ndash;&gt;-->
          <!--<template v-slot="obj">-->
            <!--<el-button size="mini" type="danger" @click="ids=[],ids.push(obj.row.id)">选择</el-button>-->
          <!--</template>-->


        <!--</el-table-column>-->
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
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="pageChange"
          :total="total">
      </el-pagination>

    </div>

    <!--删除的弹框-->
    <el-dialog title="温馨提示" :visible.sync="dialogDeleteVisible" width="30%">

      <span>你确定要删除吗?{{ids}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false" size="mini">取 消</el-button>
        <el-button type="success" @click="dialogDeleteVisible = false,deleteByIds()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>
