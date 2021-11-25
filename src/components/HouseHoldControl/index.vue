<template>
  <div class="visitor-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div class="visitor-control-new">
            <el-button type="primary" plain @click="addNotice()">+ 新增住户</el-button>
          </div>
          <div class="visitor-control-search">
            <el-input class="visitor-control-search-input" v-model="search.name" clearable placeholder="请输入住户名"></el-input>
            <el-select class="visitor-control-search-input" v-model="search.sex" clearable placeholder="请选择住户性别">
              <el-option
                v-for="item in sexType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input class="visitor-control-search-input" v-model="search.phone" clearable placeholder="请输入住户手机号"></el-input>
            <el-select class="visitor-control-search-input" v-model="search.buildingNumber" clearable placeholder="请选择楼栋号">
              <el-option
                v-for="item in optionsBildingNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="visitor-control-search-input" v-model="search.floorNumber" clearable placeholder="请选择楼层">
              <el-option
                v-for="item in optionsLayerNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="visitor-control-search-input" v-model="search.doorNumber" clearable placeholder="请选择门牌号">
              <el-option
                v-for="item in optionsHouseNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input class="visitor-control-search-input" v-model="search.direction" clearable placeholder="请选择投诉方向"></el-input> -->
            <!-- <el-input class="visitor-control-search-input" v-model="search.desc" clearable placeholder="投诉内容"></el-input> -->
            <!-- <el-input class="visitor-control-search-input" v-model="search.date" clearable placeholder="投诉日期"></el-input> -->
            <!-- <el-input class="visitor-control-search-input" v-model="search.done" clearable placeholder="是否已经解决"></el-input> -->
            <!-- <el-date-picker
              class="visitor-control-search-input"
              v-model="search.date"
              clearable
              type="date"
              placeholder="投诉日期">
            </el-date-picker> -->
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
              <el-table-column prop="holder_user" label="住户名" width="120">
              </el-table-column>
              <el-table-column prop="holder_sex" label="住户性别">
              </el-table-column>
              <el-table-column prop="holder_phone" label="住户联系方式">
              </el-table-column>
              <el-table-column prop="holder_community" label="住户小区名" width="120">
              </el-table-column>
              <el-table-column prop="holder_building_number" label="楼栋" width="120">
              </el-table-column>
              <el-table-column prop="holder_floor_number" label="楼层" width="120">
              </el-table-column>
              <el-table-column prop="holder_door_number" label="门牌号" width="120">
              </el-table-column>
              <!-- <el-table-column prop="acc_nickname" label="卖家昵称" width="120">
              </el-table-column>
              <el-table-column prop="acc_phone" label="卖家联系方式" width="120">
              </el-table-column> -->
              <!-- <el-table-column prop="lost_done" label="是否已经找回" width="120">
              </el-table-column>
              <el-table-column prop="acc_nickname" label="失主" width="120">
              </el-table-column>
              <el-table-column prop="acc_phone" label="失主联系方式" width="120">
              </el-table-column> -->
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
      title="添加住户"
      :visible.sync="addDialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="addForm" label-width="120px">
        <el-form-item label="住户名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="住户性别">
          <el-select class="visitor-control-search-input" v-model="addForm.sex" clearable placeholder="请选择住户性别">
            <el-option
              v-for="item in sexType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住户联系方式">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="住户小区名">
          <el-input v-model="addForm.communityName" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼栋">
          <el-select v-model="addForm.buildingNumber" clearable placeholder="请选择楼栋号">
              <el-option
                v-for="item in optionsBildingNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="addForm.floorNumber" clearable placeholder="请选择楼层">
              <el-option
                v-for="item in optionsLayerNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="门牌号">
          <el-select v-model="addForm.doorNumber" clearable placeholder="请选择门牌号">
              <el-option
                v-for="item in optionsHouseNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否已经找回">
          <el-input v-model="addForm.done"></el-input>
        </el-form-item>
        <el-form-item label="失主">
          <el-input v-model="addForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="失主联系方式">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item> -->
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
      title="修改住户信息"
      :visible.sync="editDialogVisible"
      :before-close="handleClose2">
      <el-form ref="form" :model="editForm" label-width="120px">
        <el-form-item label="住户名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="住户性别">
          <el-select v-model="editForm.sex" clearable placeholder="请选择住户性别">
            <el-option
              v-for="item in sexType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住户联系方式">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="住户小区名">
          <el-input v-model="editForm.communityName" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼栋">
          <el-select v-model="editForm.buildingNumber" clearable placeholder="请选择楼栋号">
              <el-option
                v-for="item in optionsBildingNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="editForm.floorNumber" clearable placeholder="请选择楼层">
              <el-option
                v-for="item in optionsLayerNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="门牌号">
          <el-select v-model="editForm.doorNumber" clearable placeholder="请选择门牌号">
              <el-option
                v-for="item in optionsHouseNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否已经找回">
          <el-input v-model="editForm.done"></el-input>
        </el-form-item>
        <el-form-item label="失主">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="失主联系方式">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item> -->
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
      optionsGoodsType: [
        {
          value: 'JJ',
          label: '家具'
        }, {
          value: 'FS',
          label: '服饰'
        }, {
          value: 'CC',
          label: '餐厨'
        }, {
          value: 'DQ',
          label: '电器'
        }, {
          value: 'DZCP',
          label: '电子产品'
        }, {
          value: 'TYYP',
          label: '体育用品'
        }, {
          value: 'TC',
          label: '特产'
        }, {
          value: 'QT',
          label: '其他'
        }
      ],
      optionsBildingNumber: [
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }
      ],
      optionsLayerNumber: [
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '10',
          label: '10'
        }, {
          value: '11',
          label: '11'
        }
      ],
      optionsHouseNumber: [
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }
      ],
      optionsGoodsOff: [
        {
          value: '0',
          label: '已下架'
        }, {
          value: '1',
          label: '未下架'
        }
      ],
      sexType: [
        {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
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
        type: '',
        extent: '',
        direction: '',
        number: '',
        price: '',
        picture: '',
        communityName: '好运来小区',
        buildingNumber: '',
        floorNumber: '',
        doorNumber: '',
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
        communityName: '',
        buildingNumber: '',
        floorNumber: '',
        doorNumber: '',
        price: '',
        type: '',
        sex: '',
        stayTime: '',
        done: '',
        realname: '',
        direction: '',
        extent: '',
        number: '',
        picture: '',
        name: ''
      },
      search: {
        title: '',
        desc: '',
        userId: '',
        content: '',
        place: '',
        name: '',
        price: '',
        type: '',
        nickname: '',
        communityName: '',
        buildingNumber: '',
        floorNumber: '',
        doorNumber: '',
        number: '',
        picture: '',
        phone: '',
        phone2: '',
        sex: '',
        direction: '',
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
      const confirmResult = await this.$confirm('是否删除住户信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$axios.post('api/houseHolder/delHolder', {
          id: id
        }).then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('删除住户信息失败')
          }
          this.$message.success('删除住户信息成功')
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
      this.editForm.name = row.holder_user
      this.editForm.sex = row.holder_sex
      this.editForm.phone = row.holder_phone
      this.editForm.communityName = row.holder_community
      this.editForm.buildingNumber = row.holder_building_number
      this.editForm.floorNumber = row.holder_floor_number
      this.editForm.doorNumber = row.holder_door_number
    },
    editSubmit () {
      console.log('submit!')
      this.$axios.post('api/houseHolder/updateHolder', {
        id: this.editForm.id,
        user: this.editForm.name,
        sex: this.editForm.sex,
        phone: this.editForm.phone,
        communityName: this.editForm.communityName,
        buildingNumber: this.editForm.buildingNumber,
        floorNumber: this.editForm.floorNumber,
        doorNumber: this.editForm.doorNumber
      })
        .then(res => {
          console.log(res)
          if (res.data.errno !== 0) {
            return this.$message.error('修改住户信息失败')
          }
          this.editDialogVisible = false
          this.editForm = this.$options.data().editForm
          this.getList()
          this.getListTotal()
          this.$message.success('修改住户信息成功')
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
      this.$axios.post('api/houseHolder/addHolder', {
        user: this.addForm.name,
        sex: this.addForm.sex,
        phone: this.addForm.phone,
        communityName: this.addForm.communityName,
        buildingNumber: this.addForm.buildingNumber,
        floorNumber: this.addForm.floorNumber,
        doorNumber: this.addForm.doorNumber
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
      this.$axios.post('api/houseHolder/searchHolder', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
    },
    getListTotal () {
      this.$axios.post('api/houseHolder/searchHolder')
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
      this.$axios.post('api/houseHolder/searchHolder', {
        limitF: (this.queryInfo.pagenum - 1) * 10,
        limitS: 10,
        id: this.search.id,
        user: this.search.name,
        sex: this.search.sex,
        phone: this.search.phone,
        communityName: this.search.communityName,
        buildingNumber: this.search.buildingNumber,
        floorNumber: this.search.floorNumber,
        doorNumber: this.search.doorNumber
      })
        .then(res => {
          this.searchATotal()
          console.log(res)
          this.queryInfo.pagenum = 1
          this.tableData = res.data.data
        })
    },
    searchATotal () {
      this.$axios.post('api/houseHolder/searchHolder', {
        id: this.search.id,
        user: this.search.name,
        sex: this.search.sex,
        phone: this.search.phone,
        communityName: this.search.communityName,
        buildingNumber: this.search.buildingNumber,
        floorNumber: this.search.floorNumber,
        doorNumber: this.search.doorNumber
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
</style>
