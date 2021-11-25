<template>
  <div class="notice-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div class="notice-control-new">
            <el-button type="primary" plain @click="addNotice()">+ 新建公告</el-button>
          </div>
          <div class="notice-control-search">
            <el-input class="notice-control-search-input" v-model="search.title" clearable placeholder="请输入公告标题"></el-input>
            <el-input class="notice-control-search-input" v-model="search.desc" clearable placeholder="请输入公告描述"></el-input>
            <el-input class="notice-control-search-input" v-model="search.content" clearable placeholder="请输入公告内容"></el-input>
            <el-input class="notice-control-search-input" v-model="search.name" clearable placeholder="请输入公告发布人"></el-input>
            <el-button class="notice-control-search-btn" plain type="primary" slot="append" icon="el-icon-search" @click="searchA()">查询</el-button>
            <el-button class="notice-control-search-btn" plain type="info" slot="append" icon="el-icon-delete" @click="clear()">清空</el-button>
          </div>
          <div class="notice-control-table">
            <el-table
              :data="tableData"
              border
              fit
              style="width: 100%">
              <el-table-column
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column prop="notice_title" label="标题" width="120">
              </el-table-column>
              <el-table-column prop="notice_desc" label="描述">
              </el-table-column>
              <el-table-column prop="notice_content" label="内容">
              </el-table-column>
              <el-table-column prop="notice_date" label="日期" width="120">
              </el-table-column>
              <el-table-column prop="admin_name" label="发布人" width="120">
              </el-table-column>
              <!-- <el-table-column prop="zip" label="邮编" width="120">
              </el-table-column> -->
              <el-table-column prop="control" label="操作" width="120">
                 <!-- slot-scope="scope" -->
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-tooltip :enterable="false" effect="dark" content="修改" placement="top">
                    <el-button type="primary" plain icon="el-icon-edit" size="mini" @click="editNotice(scope.row)"></el-button>
                  </el-tooltip>
                  <!-- 删除按钮 -->
                  <el-tooltip :enterable="false" effect="dark" content="删除" placement="top">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="delNoticeById(scope.row.id)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-pagination
                class="notice-control-pagination"
                :current-page="queryInfo.pagenum"
                :page-size="queryInfo.pagesize"
                layout="total, prev, pager, next, jumper"
                :total="queryInfo.total"
                @current-change="pagechange">
              </el-pagination>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="新建公告"
      :visible.sync="addDialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告描述">
          <el-input type="textarea" v-model="addForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="公告日期">
          <el-date-picker
            v-model="addForm.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改公告"
      :visible.sync="editDialogVisible"
      :before-close="handleClose2">
      <el-form ref="form" :model="editForm" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告描述">
          <el-input type="textarea" v-model="editForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="editForm.content"></el-input>
        </el-form-item>
        <el-form-item label="公告日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="editForm.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmit">立即创建</el-button>
          <el-button @click="cancelSubmit2">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NoticeControl',
  data () {
    return {
      addForm: {
        title: '',
        desc: '',
        content: '',
        date: ''
      },
      editForm: {
        id: '',
        title: '',
        desc: '',
        content: '',
        date: ''
      },
      search: {
        title: '',
        desc: '',
        date: '',
        content: '',
        name: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [],
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
        total: null
      },
      addDialogVisible: false,
      editDialogVisible: false
    }
  },
  created () {
    this.getList()
    this.getListTotal()
  },
  methods: {
    // 删除
    async delNoticeById (id) {
      const confirmResult = await this.$confirm('是否删除公告', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$axios.post('api/admin/delNotice', {
          id: id
        }).then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('删除公告失败')
          }
          this.$message.success('删除公告成功')
          this.getList()
          this.getListTotal()
        })
      }
    },
    // 修改
    editNotice (row) {
      this.editDialogVisible = true
      console.log(row)
      this.editForm.id = row.id
      this.editForm.title = row.notice_title
      this.editForm.desc = row.notice_desc
      this.editForm.content = row.notice_content
      this.editForm.date = row.notice_date
    },
    editSubmit () {
      console.log('submit!')
      this.$axios.post('api/admin/updateNotice', {
        id: this.editForm.id,
        title: this.editForm.title,
        desc: this.editForm.desc,
        content: this.editForm.content,
        date: this.editForm.date,
        adminId: localStorage.getItem('adminId')
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('修改公告失败')
          }
          this.editDialogVisible = false
          this.editForm = this.$options.data().editForm
          this.getList()
          this.getListTotal()
          this.$message.success('修改公告成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelSubmit2 () {
      this.editDialogVisible = false
    },
    // 关闭提示2
    handleClose2 (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editForm = this.$options.data().editForm
          done()
        })
        .catch(_ => {})
    },
    // 新增
    addNotice () {
      this.addDialogVisible = true
    },
    addSubmit () {
      console.log('submit!')
      this.$axios.post('api/admin/addNotice', {
        title: this.addForm.title,
        desc: this.addForm.desc,
        content: this.addForm.content,
        date: this.addForm.date,
        adminId: localStorage.getItem('adminId')
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('新增公告失败')
          }
          this.addDialogVisible = false
          this.addForm = this.$options.data().addForm
          this.getList()
          this.getListTotal()
          this.$message.success('新增公告成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelSubmit () {
      this.addDialogVisible = false
    },
    // 关闭提示
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.addForm = this.$options.data().addForm
          done()
        })
        .catch(_ => {})
    },
    getList (limitF, limitS) {
      this.$axios.post('api/admin/searchNotice', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
    },
    getListTotal () {
      this.$axios.post('api/admin/searchNotice')
        .then(res => {
          console.log(res.data.data)
          this.queryInfo.total = res.data.data.length
        })
    },
    pagechange (val) {
      console.log(val)
      this.queryInfo.pagenum = val
      this.getList()
    },
    searchA () {
      this.$axios.post('api/admin/searchNotice', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10,
        title: this.search.title,
        desc: this.search.desc,
        content: this.search.content,
        adminName: this.search.name
      })
        .then(res => {
          this.searchATotal()
          console.log(res)
          this.queryInfo.pagenum = 1
          this.tableData = res.data.data
        })
    },
    searchATotal () {
      this.$axios.post('api/admin/searchNotice', {
        title: this.search.title,
        desc: this.search.desc,
        content: this.search.content,
        adminName: this.search.name
      })
        .then(res => {
          if (res.data.errno !== '200') {
            this.queryInfo.total = 0
          }
          console.log(res)
          this.queryInfo.total = res.data.data.length
        })
    },
    // 清空
    clear () {
      this.search = this.$options.data().search
      this.getList()
      this.getListTotal()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  min-height: calc(100vh - 158px);
}
.notice-control-search{
  margin-top: 6px;
}
.notice-control-search-input{
  width: 200px;
  margin-top: 4px;
  margin-right: 10px;
}
.notice-control-search-btn{
  margin-top: 4px;
}
.notice-control-table{
  margin-top: 10px;
}
.notice-control-pagination{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
// @media screen and (max-width: 500px) {
//   .el-dialog__wrapper /deep/ .el-dialog{
//     width: 90%;
//   }
//   .el-message-box__wrapper /deep/ .el-message-box {
//     top: 220px !important;
//   }
// }
// @media screen and (min-width: 501px) {
//   .el-dialog__wrapper /deep/ .el-dialog{
//     width: 70%;
//   }
// }
// @media screen and (min-width: 901px) {
//   .el-dialog__wrapper /deep/ .el-dialog{
//     width: 50%;
//   }
// }
// @media screen and (min-width: 1201px) {
//   .el-dialog__wrapper /deep/ .el-dialog{
//     width: 40%;
//   }
// }
// @media screen and (min-width: 1900px) {
//   .el-dialog__wrapper /deep/ .el-dialog{
//     width: 30%;
//   }
// }
</style>
