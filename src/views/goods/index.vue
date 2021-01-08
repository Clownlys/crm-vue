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
      <el-button-group>
        <el-button size="mini" type="danger" @click="dialogFormVisible=true,dialogEditOdEdit(),formData={},bran={},cate={},prod={}">新建</el-button>
        <el-button size="mini" type="danger" @click="dialogDeleteVisible=true">删除</el-button>
      </el-button-group>
    </div>

    <div class="search-box">
      <!--      搜索使用到的-->
      <el-form :inline="true" ref="form1" :model="searchForm" class="demo-form-inline">
        <el-form-item label="商品名称" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品型号" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.goodsProduct.proModel" placeholder="商品型号"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.goodsColor" placeholder="商品颜色"></el-input>
        </el-form-item>
        <el-form-item label="基础库分类" size="mini" style="margin-top: 5px">
          <el-select v-model="searchForm.goodsProduct.prodType" placeholder="基础库品牌">
            <div v-for="(cat,index) in categoryList" :key="index">
              <el-option :index="cat.id" :label="cat.categoryName" :value="cat.id"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="基础库品牌" size="mini" style="margin-top: 5px">
          <el-select v-model="searchForm.goodsProduct.prodBrand" placeholder="基础库品牌">
            <div v-for="(bra,index) in brandList" :key="index">
              <el-option :index="bra.id" :label="bra.brandName" :value="bra.id"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="findAll">查询</el-button>
          <el-button size="mini" @click="searchForm={},searchForm.goodsProduct={},findAll()">刷新</el-button>
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
            prop="goodsName"
            label="商品名称"
        >
        </el-table-column>
          <el-table-column
                  align="center"
                  prop="goodsProduct.category.categoryName"
                  label="商品分类"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="goodsProduct.brand.brandName"
                  label="商品品牌"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="goodsProduct.prodModel"
                  label="商品型号"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="goodsColor"
                  label="商品颜色"
          >
          </el-table-column>
        <el-table-column
            align="center"
            label="操作"
        >
          <!--这种方式是可以展示的 但是无法取值 (必须把按钮添加在template标签中 用于取值)-->
          <template v-slot="obj">
            <el-button size="mini" type="success" @click="dialogDetail(),dialogFormVisible=true,findById(obj.row.id)">查看</el-button>
            <el-button size="mini" type="primary" @click="dialogEditOdEdit(),dialogFormVisible=true,findById(obj.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="dialogDeleteVisible=true,$refs.dataTable.clearSelection(),ids=[],ids.push(obj.row.id)">删除</el-button>
          </template>


        </el-table-column>
      </el-table>
    </div>

    <div class="page-box">
      <!--
      page-size: 表示每一页的大小 默认值是10
      current-page： 表示当前页默认是1  current-page等于几 这一页高亮

      -->
      <!--<el-pagination-->
          <!--background-->
          <!--layout="prev, pager, next"-->
          <!--:current-page="currentPage"-->
          <!--:page-size="pageSize"-->
          <!--@current-change="pageChange"-->
          <!--:total="total">-->
      <!--</el-pagination>-->

    </div>

    <!--新建或者编辑弹框-->
    <el-dialog title="商品操作" :visible.sync="dialogFormVisible" width="40%">
      <el-form id="dialogId" :model="formData" label-width="100px" size="small" :disabled="disabled">
        <el-form-item label="选择一类产品">
          <el-select v-model="formData.prodId" placeholder="选择一类产品" @change="findGoodsProductById()">
            <div v-for="(item,index) in goodsProductList" :key="index">
              <el-option :index="item.id" :label="item.prodName" :value="item.id"></el-option>
            </div>
          </el-select>
        </el-form-item>

        <el-row >
          <el-col :span="12">
            <el-form-item label="基础库-分类">
              <el-input v-model="cate.categoryName" placeholder="基础库-分类" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基础库-品牌" >
              <el-input v-model="bran.brandName" placeholder="基础库-品牌" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="基础库-型号" >
              <el-input v-model="prod.prodModel" placeholder="基础库-型号" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基础库-采购模式" >
              <el-select v-model="prod.purchasingMode" placeholder="基础库-采购模式" disabled>
                <el-option label="集团采购" value="集团采购"></el-option>
                <el-option label="分散采购" value="分散采购"></el-option>
                <el-option label="半集中半分散采购" value="半集中半分散采购"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="基础库-铺货" >
              <el-select v-model="prod.isShopGoods" placeholder="基础库-铺货" disabled>
                <el-option label="非铺货" value=0></el-option>
                <el-option label="铺货" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基础库-备机" >
              <el-select v-model="prod.isStandby" placeholder="基础库-备机" disabled>
                <el-option label="非备机" value=0></el-option>
                <el-option label="备机" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row >
          <el-col :span="12">
            <el-form-item label="商品名称" >
              <el-input v-model="formData.goodsName" placeholder="商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品颜色" >
              <el-input v-model="formData.goodsColor" placeholder="商品颜色"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="采购价" >
              <el-input v-model="formData.purchasingPrice" placeholder="采购价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="市场价" >
              <el-input v-model="formData.marketPrice" placeholder="市场价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商城价" >
              <el-input v-model="formData.mallPrice" placeholder="商城价"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="库存量" >
              <el-input v-model="formData.goodsStock" placeholder="库存量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="float: right">
            <el-form-item label="是否可采购" style="float: right;">
              <el-select v-model="formData.goodsStatus" placeholder="是否可采购" style="float: right">
                  <el-option label="可采购" value=0></el-option>
                  <el-option label="不可采购" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="success" @click="dialogFormVisible = false,addOrEdit()" size="mini">确 定</el-button>
      </div>
    </el-dialog>

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
