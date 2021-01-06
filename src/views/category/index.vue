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
          row-key="id"
          :data="tableData"
          :tree-props="{children:'children'}"
          style="width: 100%">
        <el-table-column
            prop="categoryName"
            label="分类名称"
        >
        </el-table-column>
          <el-table-column
                  align="center"
                  prop="categoryDesc"
                  label="分类描述"
          >
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
    <el-dialog title="分类操作" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formData" label-width="100px" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="formData.categoryName" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" >
          <el-input v-model="formData.categoryDesc" placeholder="分类描述"></el-input>
        </el-form-item>
        <el-form-item label="分类等级" >
          <treeselect
                  v-model="formData.parentId"
                  :multiple="false"
                  :options="tableData"
                  :normalizer="propTreeNormalizer"
                  noResultsText = "暂无搜索结果"
                  placeholder="请选择"
                  :default-expand-level="1"
                  :disable-branch-nodes="false"
          >
          </treeselect>
          <!--<el-input v-model="formData.parentId"></el-input>-->
        </el-form-item>
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
