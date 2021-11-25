<template>
  <div class="notice-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div class="notice-control-new">
            <el-button type="primary" plain @click="addNotice()">+ 新增管理员</el-button>
          </div>
          <div class="notice-control-search">
            <el-input class="notice-control-search-input" v-model="search.account" clearable placeholder="请输入管理员账号"></el-input>
            <el-input class="notice-control-search-input" v-model="search.adminName" clearable placeholder="请输入管理员昵称"></el-input>
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
              <el-table-column prop="admin_user" label="账号" width="120">
              </el-table-column>
              <el-table-column prop="admin_password" label="密码">
              </el-table-column>
              <el-table-column prop="admin_name" label="管理员">
              </el-table-column>
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
      title="添加管理员账号"
      :visible.sync="addDialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="addForm.adminName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改管理员账号"
      :visible.sync="editDialogVisible"
      :before-close="handleClose2">
      <el-form ref="form" :model="editForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="editForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="textarea" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input type="textarea" v-model="editForm.adminName"></el-input>
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
        account: '',
        password: '',
        adminName: '',
        title: '',
        desc: '',
        content: '',
        date: ''
      },
      editForm: {
        id: '',
        title: '',
        account: '',
        password: '',
        adminName: '',
        desc: '',
        content: '',
        date: ''
      },
      search: {
        title: '',
        desc: '',
        account: '',
        password: '',
        adminName: '',
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
      const confirmResult = await this.$confirm('是否删除管理员账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$axios.post('api/admin/delAdminAccount', {
          id: id
        }).then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('删除管理员账号失败')
          }
          this.$message.success('删除管理员账号成功')
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
      this.editForm.account = row.admin_user
      this.editForm.password = row.admin_password
      this.editForm.adminName = row.admin_name
    },
    editSubmit () {
      console.log('submit!')
      this.$axios.post('api/admin/updateAdminAccount', {
        id: this.editForm.id,
        account: this.editForm.account,
        password: this.editForm.password,
        adminName: this.editForm.adminName
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('修改管理员账号失败')
          }
          this.editDialogVisible = false
          this.editForm = this.$options.data().editForm
          this.getList()
          this.getListTotal()
          this.$message.success('修改管理员账号成功')
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
      this.$axios.post('api/admin/addAdminAccount', {
        account: this.addForm.account,
        password: this.addForm.password,
        adminName: this.addForm.adminName
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('新增管理员账号失败')
          }
          this.addDialogVisible = false
          this.addForm = this.$options.data().addForm
          this.getList()
          this.getListTotal()
          this.$message.success('新增管理员账号成功')
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
      this.$axios.post('api/admin/searchAdminAccount', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
    },
    getListTotal () {
      this.$axios.post('api/admin/searchAdminAccount')
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
      this.$axios.post('api/admin/searchAdminAccount', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10,
        account: this.search.account,
        password: this.search.password,
        adminName: this.search.adminName
      })
        .then(res => {
          this.searchATotal()
          console.log(res)
          this.queryInfo.pagenum = 1
          this.tableData = res.data.data
        })
    },
    searchATotal () {
      this.$axios.post('api/admin/searchAdminAccount', {
        account: this.search.account,
        password: this.search.password,
        adminName: this.search.adminName
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
</style>
