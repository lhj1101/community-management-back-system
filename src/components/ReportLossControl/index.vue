<template>
  <div class="visitor-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div class="visitor-control-new">
            <el-button type="primary" plain @click="addNotice()">+ 失物报备</el-button>
          </div>
          <div class="visitor-control-search">
            <el-input class="visitor-control-search-input" v-model="search.name" clearable placeholder="请输入失物物品"></el-input>
            <el-input class="visitor-control-search-input" v-model="search.desc" clearable placeholder="请输入失物描述"></el-input>
            <el-input class="visitor-control-search-input" v-model="search.place" clearable placeholder="请输入遗失地点"></el-input>
            <!-- <el-input class="visitor-control-search-input" v-model="search.date" clearable placeholder="请输入遗失日期"></el-input> -->
            <!-- <el-input class="visitor-control-search-input" v-model="search.done" clearable placeholder="失物是否找回"></el-input> -->
            <el-select class="complaint-control-search-input" v-model="search.done" clearable placeholder="失物是否找回">
              <el-option
                v-for="item in optionsDone"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              class="visitor-control-search-input"
              v-model="search.date"
              value-format="yyyy-MM-dd"
              clearable
              type="date"
              placeholder="请输入遗失日期">
            </el-date-picker>
            <!-- <el-input class="visitor-control-search-input" v-model="search.done" clearable placeholder="请输入访客是否已经离开"></el-input> -->
            <el-button class="visitor-control-search-btn" plain type="primary" slot="append" icon="el-icon-search" @click="searchA()">查询</el-button>
            <el-button class="visitor-control-search-btn" plain type="info" slot="append" icon="el-icon-delete" @click="clear()">清空</el-button>
          </div>
          <div class="visitor-control-table">
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
              <el-table-column prop="lost_name" label="失物物品" width="120">
              </el-table-column>
              <el-table-column prop="lost_desc" label="失物描述">
              </el-table-column>
              <el-table-column prop="lost_place" label="遗失地点">
              </el-table-column>
              <el-table-column prop="lost_date" label="遗失日期" width="120">
              </el-table-column>
              <el-table-column prop="lost_done" label="是否已经找回" width="120">
              </el-table-column>
              <el-table-column prop="acc_nickname" label="失主" width="120">
              </el-table-column>
              <el-table-column prop="acc_phone" label="失主联系方式" width="120">
              </el-table-column>
              <!-- <el-table-column prop="acc_realname" label="受访人名" width="120">
              </el-table-column>
              <el-table-column prop="acc_phone" label="受访人联系电话" width="120">
              </el-table-column> -->
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
                class="visitor-control-pagination"
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
      title="失物登记"
      :visible.sync="addDialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="失物物品">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="失物描述">
          <el-input v-model="addForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="遗失地点">
          <el-input v-model="addForm.place"></el-input>
        </el-form-item>
        <el-form-item label="遗失日期">
          <!-- <el-input v-model="addForm.date"></el-input> -->
          <el-date-picker
              v-model="addForm.date"
              value-format="yyyy-MM-dd"
              clearable
              type="date"
              placeholder="请输入遗失日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="是否已经找回">
          <!-- <el-input v-model="addForm.done"></el-input> -->
          <el-select class="complaint-control-search-input" v-model="addForm.done" clearable placeholder="失物是否找回">
            <el-option
              v-for="item in optionsDone"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="失主">
          <el-input v-model="addForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="失主联系方式">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="访客来访时间">
          <el-date-picker
            v-model="addForm.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="访客是否已经离开">
          <el-input v-model="addForm.done"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改失物信息"
      :visible.sync="editDialogVisible"
      :before-close="handleClose2">
      <el-form ref="form" :model="editForm" label-width="120px">
        <el-form-item label="失物物品">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="失物描述">
          <el-input v-model="editForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="遗失地点">
          <el-input v-model="editForm.place"></el-input>
        </el-form-item>
        <el-form-item label="遗失日期">
          <!-- <el-input v-model="editForm.date"></el-input> -->
          <el-date-picker
              v-model="editForm.date"
              value-format="yyyy-MM-dd"
              clearable
              type="date"
              placeholder="请输入遗失日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="是否已经找回">
          <!-- <el-input v-model="editForm.done"></el-input> -->
          <el-select class="complaint-control-search-input" v-model="editForm.done" clearable placeholder="失物是否找回">
          <el-option
            v-for="item in optionsDone"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="失主">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="失主联系方式">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="访客来访时间">
          <el-date-picker
            v-model="editForm.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否已经离开">
          <el-input v-model="editForm.done"></el-input>
        </el-form-item> -->
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
      optionsDone: [
        {
          value: '已找回',
          label: '已找回'
        }, {
          value: '未找回',
          label: '未找回'
        }
      ],
      addForm: {
        id: '',
        title: '',
        desc: '',
        content: '',
        place: '',
        date: '',
        nickname: '',
        phone: '',
        phone2: '',
        userId: '',
        sex: '',
        stayTime: '',
        done: '',
        realname: '',
        extent: '',
        name: ''
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
        phone2: '',
        userId: '',
        sex: '',
        stayTime: '',
        done: '',
        realname: '',
        extent: '',
        name: ''
      },
      search: {
        title: '',
        desc: '',
        userId: '',
        content: '',
        place: '',
        name: '',
        nickname: '',
        phone: '',
        phone2: '',
        sex: '',
        stayTime: '',
        done: '',
        extent: '',
        realname: ''
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
      const confirmResult = await this.$confirm('是否删除失物物品信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$axios.post('api/user/delUserLost', {
          id: id
        }).then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('删除失物信息失败')
          }
          this.$message.success('删除失物信息成功')
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
      this.editForm.name = row.lost_name
      this.editForm.desc = row.lost_desc
      this.editForm.place = row.lost_place
      this.editForm.date = row.lost_date
      this.editForm.done = row.lost_done
      this.editForm.nickname = row.acc_nickname
      this.editForm.phone = row.acc_phone
      this.editForm.userId = row.lost_userId
    },
    editSubmit () {
      console.log('submit!')
      this.$axios.post('api/user/updateUserLost', {
        id: this.editForm.id,
        name: this.editForm.name,
        desc: this.editForm.desc,
        place: this.editForm.place,
        date: this.editForm.date,
        done: this.editForm.done,
        nickname: this.editForm.nickname,
        phone: this.editForm.phone,
        userId: this.editForm.userId
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('修改失物信息失败')
          }
          this.editDialogVisible = false
          this.editForm = this.$options.data().editForm
          this.getList()
          this.getListTotal()
          this.$message.success('修改失物信息成功')
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
      this.$axios.post('api/user/addUserLost', {
        name: this.addForm.name,
        desc: this.addForm.desc,
        place: this.addForm.place,
        date: this.addForm.date,
        done: this.addForm.done,
        nickname: this.addForm.nickname,
        phone: this.addForm.phone,
        userId: '1'
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('新增访客信息失败')
          }
          this.addDialogVisible = false
          this.addForm = this.$options.data().addForm
          this.getList()
          this.getListTotal()
          this.$message.success('新增访客信息成功')
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
      this.$axios.post('api/user/searchUserLost', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
    },
    getListTotal () {
      this.$axios.post('api/user/searchUserLost')
        .then(res => {
          console.log(res.data.data)
          console.log(res.data.data.length)
          this.queryInfo.total = res.data.data.length
        })
    },
    pagechange (val) {
      console.log(val)
      this.queryInfo.pagenum = val
      this.getList()
    },
    searchA () {
      this.$axios.post('api/user/searchUserLost', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10,
        name: this.search.name,
        desc: this.search.desc,
        place: this.search.place,
        date: this.search.date,
        done: this.search.done,
        nickname: this.search.nickname,
        phone: this.search.phone
      })
        .then(res => {
          this.searchATotal()
          console.log(res)
          this.queryInfo.pagenum = 1
          this.tableData = res.data.data
        })
    },
    searchATotal () {
      this.$axios.post('api/user/searchUserLost', {
        name: this.search.name,
        desc: this.search.desc,
        place: this.search.place,
        date: this.search.date,
        done: this.search.done,
        nickname: this.search.nickname,
        phone: this.search.phone
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
.visitor-control-search{
  margin-top: 6px;
}
.visitor-control-search-input{
  width: 200px;
  margin-top: 4px;
  margin-right: 10px;
}
.visitor-control-search-btn{
  margin-top: 4px;
}
.visitor-control-table{
  margin-top: 10px;
}
.visitor-control-pagination{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.complaint-control-search-input{
  width: 200px;
  margin-top: 4px;
  margin-right: 10px;
}
</style>
