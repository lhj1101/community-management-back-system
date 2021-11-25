<template>
  <div class="organizing-activity-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <!-- <div class="organizing-activity-control-new">
            <el-button type="primary" plain @click="addNotice()">+ 新建公告</el-button>
          </div> -->
          <div class="organizing-activity-control-search">
            <el-input class="organizing-activity-control-search-input" v-model="search.title" clearable placeholder="请输入活动标题"></el-input>
            <el-input class="organizing-activity-control-search-input" v-model="search.content" clearable placeholder="请输入活动内容"></el-input>
            <el-input class="organizing-activity-control-search-input" v-model="search.place" clearable placeholder="请输入活动地点"></el-input>
            <el-button class="organizing-activity-control-search-btn" plain type="primary" slot="append" icon="el-icon-search" @click="searchA()">查询</el-button>
            <el-button class="organizing-activity-control-search-btn" plain type="info" slot="append" icon="el-icon-delete" @click="clear()">清空</el-button>
          </div>
          <div class="organizing-activity-control-table">
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
              <el-table-column prop="activity_title" label="标题" width="120">
              </el-table-column>
              <el-table-column prop="activity_content" label="内容">
              </el-table-column>
              <el-table-column prop="activity_place" label="地点">
              </el-table-column>
              <el-table-column prop="activity_date" label="日期" width="120">
              </el-table-column>
              <el-table-column prop="acc_nickname" label="发布人昵称" width="120">
              </el-table-column>
              <el-table-column prop="acc_phone" label="发布人联系方式" width="120">
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
                class="organizing-activity-control-pagination"
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
    <!-- <el-dialog
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
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <el-dialog
      title="修改组织活动"
      :visible.sync="editDialogVisible"
      :before-close="handleClose2">
      <el-form ref="form" :model="editForm" label-width="120px">
        <el-form-item label="组织活动标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="组织活动内容">
          <el-input type="textarea" v-model="editForm.content"></el-input>
        </el-form-item>
        <el-form-item label="组织活动地点">
          <el-input type="textarea" v-model="editForm.place"></el-input>
        </el-form-item>
        <el-form-item label="组织活动日期">
          <el-date-picker
            v-model="editForm.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发起人昵称">
          <el-input v-model="editForm.nickname" disabled></el-input>
        </el-form-item>
        <el-form-item label="发起人联系方式">
          <el-input type="textarea" v-model="editForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmit">立即修改</el-button>
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
        place: '',
        content: '',
        date: ''
      },
      editForm: {
        id: '',
        title: '',
        desc: '',
        content: '',
        place: '',
        date: '',
        nickname: '',
        phone: '',
        userId: ''
      },
      search: {
        title: '',
        desc: '',
        content: '',
        place: '',
        name: '',
        nickname: '',
        phone: ''
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
      const confirmResult = await this.$confirm('是否删除组织活动', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$axios.post('api/user/delUserActivity', {
          id: id
        }).then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('删除组织活动失败')
          }
          this.$message.success('删除组织活动成功')
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
      this.editForm.title = row.activity_title
      this.editForm.content = row.activity_content
      this.editForm.place = row.activity_place
      this.editForm.date = row.activity_date
      this.editForm.phone = row.acc_nickname
      this.editForm.nickname = row.acc_phone
      this.editForm.userId = row.activity_userId
    },
    editSubmit () {
      console.log('submit!')
      this.$axios.post('api/user/updateUserActivity', {
        id: this.editForm.id,
        title: this.editForm.title,
        content: this.editForm.content,
        place: this.editForm.place,
        date: this.editForm.date,
        userId: this.editForm.userId
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('修改组织活动失败')
          }
          this.editDialogVisible = false
          this.editForm = this.$options.data().editForm
          this.getList()
          this.getListTotal()
          this.$message.success('修改组织活动成功')
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
            return this.$message.error('新增组织活动失败')
          }
          this.addDialogVisible = false
          this.addForm = this.$options.data().addForm
          this.getList()
          this.getListTotal()
          this.$message.success('新增组织活动成功')
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
      this.$axios.post('api/user/searchUserActivity', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
    },
    getListTotal () {
      this.$axios.post('api/user/searchUserActivity')
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
      this.$axios.post('api/user/searchUserActivity', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10,
        title: this.search.title,
        content: this.search.content,
        place: this.search.place,
        date: this.search.date
      })
        .then(res => {
          this.searchATotal()
          console.log(res)
          this.queryInfo.pagenum = 1
          this.tableData = res.data.data
        })
    },
    searchATotal () {
      this.$axios.post('api/user/searchUserActivity', {
        title: this.search.title,
        content: this.search.content,
        place: this.search.place,
        date: this.search.date
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
.organizing-activity-control-search{
  margin-top: 6px;
}
.organizing-activity-control-search-input{
  width: 200px;
  margin-top: 4px;
  margin-right: 10px;
}
.organizing-activity-control-search-btn{
  margin-top: 4px;
}
.organizing-activity-control-table{
  margin-top: 10px;
}
.organizing-activity-control-pagination{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
