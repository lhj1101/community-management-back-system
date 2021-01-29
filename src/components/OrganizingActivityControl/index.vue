<template>
  <div class="organizing-activity-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <!-- <div class="organizing-activity-control-new">
            <el-button type="primary" plain>+ 新建公告</el-button>
          </div> -->
          <div class="organizing-activity-control-search">
            <el-input class="organizing-activity-control-search-input" v-model="searchTitle" clearable placeholder="请输入活动标题"></el-input>
            <el-input class="organizing-activity-control-search-input" v-model="searchUser" clearable placeholder="请输入发起人昵称"></el-input>
            <el-input class="organizing-activity-control-search-input" v-model="searchPlace" clearable placeholder="请输入集合地点"></el-input>
            <el-date-picker
              class="organizing-activity-control-search-input"
              v-model="searchYear"
              type="year"
              placeholder="选择年">
            </el-date-picker>
            <el-date-picker
              class="organizing-activity-control-search-input"
              v-model="searchMonth"
              type="month"
              placeholder="选择月">
            </el-date-picker>
            <el-date-picker
              class="organizing-activity-control-search-input"
              v-model="searchDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
            <el-button class="organizing-activity-control-search-btn" plain type="primary" slot="append" icon="el-icon-search">查询</el-button>
            <el-button class="organizing-activity-control-search-btn" plain type="info" slot="append" icon="el-icon-delete">清空</el-button>
          </div>
          <div class="organizing-activity-control-table">
            <el-table
              :data="tableData"
              border
              fit
              style="width: 100%">
              <el-table-column fixed prop="date" label="日期" width="120">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="province" label="省份" width="120">
              </el-table-column>
              <el-table-column prop="city" label="市区" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column prop="zip" label="邮编" width="120">
              </el-table-column>
              <el-table-column prop="control" label="操作" width="120">
                 <!-- slot-scope="scope" -->
                <template>
                  <!-- 修改按钮 -->
                  <el-tooltip :enterable="false" effect="dark" content="修改" placement="top">
                    <el-button type="primary" plain icon="el-icon-edit" size="mini"></el-button>
                  </el-tooltip>
                  <!-- 删除按钮 -->
                  <el-tooltip :enterable="false" effect="dark" content="删除" placement="top">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-pagination
                class="organizing-activity-control-pagination"
                :current-page="1"
                :page-size="5"
                layout="total, prev, pager, next, jumper"
                :total="11">
              </el-pagination>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OrganizingActivityControl',
  data () {
    return {
      searchTitle: '',
      searchUser: '',
      searchPlace: '',
      searchYear: '',
      searchMonth: '',
      searchDate: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      }
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
