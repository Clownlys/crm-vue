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
        <el-button size="mini" type="danger" @click="dialogFormVisible=true,formData={}">新建</el-button>
        <el-button size="mini" type="danger" @click="dialogDeleteVisible=true">删除</el-button>
      </el-button-group>
    </div>

    <div class="search-box">
      <!--      搜索使用到的-->
      <el-form :inline="true" ref="form1" :model="searchForm" class="demo-form-inline">
        <el-form-item label="供应商名称" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierName" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierContact" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierPhone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierAddress" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-form-item label="开户行" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierBrank" placeholder="开户账号"></el-input>
        </el-form-item>
        <el-form-item label="开户账号" size="mini" style="margin-top: 5px">
          <el-input v-model="searchForm.supplierBrankCode" placeholder="开户地址"></el-input>
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
            prop="supplierName"
            label="运营商名称"
        >
        </el-table-column>
          <el-table-column
                  align="center"
                  prop="supplierContact"
                  label="联系人"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="supplierPhone"
                  label="联系电话"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="supplierEmail"
                  label="联系邮箱"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="supplierBrank"
                  label="开户行"
          >
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="supplierBrankCode"
                  label="开户账号"
          >
          </el-table-column>
        <el-table-column
            align="center"
            prop="supplierAddress"
            show-overflow-tooltip
            label="联系地址">
        </el-table-column>

        <el-table-column
            align="center"
            label="操作"
        >
          <!--这种方式是可以展示的 但是无法取值 (必须把按钮添加在template标签中 用于取值)-->
          <template v-slot="obj">
            <el-button size="mini" type="primary" @click="dialogFormVisible=true,findById(obj.row.id)">编辑</el-button>
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
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="pageChange"
          :total="total">
      </el-pagination>

    </div>

    <!--新建或者编辑弹框-->
    <el-dialog title="供货商操作" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formData" label-width="100px" size="small">
        <el-form-item label="运营商名称">
          <el-input v-model="formData.supplierName" placeholder="运营商名称"></el-input>
        </el-form-item>
        <el-row >
          <el-col :span="12">
            <el-form-item label="联系人" >
              <el-input v-model="formData.supplierContact" placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" >
              <el-input v-model="formData.supplierPhone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系邮箱" >
          <el-input v-model="formData.supplierEmail" placeholder="联系邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" >
          <el-input v-model="formData.supplierAddress" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行" >
              <el-input v-model="formData.supplierBrank" placeholder="开户行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户账号" >
              <el-input v-model="formData.supplierBrankCode" placeholder="开户账号"></el-input>
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
