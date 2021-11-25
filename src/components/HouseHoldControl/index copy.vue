<template>
  <div class="house-hold-control">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div class="house-hold-control-new">
            <el-button type="primary" plain>+ 新增住户</el-button>
          </div>
          <div class="house-hold-control-search">
            <el-input class="house-hold-control-search-input" v-model="searchTitle" clearable placeholder="请输入住户名"></el-input>
            <el-input class="house-hold-control-search-input" v-model="searchPhone" clearable placeholder="请输入住户手机号"></el-input>
            <el-select class="house-hold-control-search-input" v-model="searchBildingNumber" clearable placeholder="请选择楼栋号">
              <el-option
                v-for="item in optionsBildingNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="house-hold-control-search-input" v-model="searchLayerNumber" clearable placeholder="请选择楼层">
              <el-option
                v-for="item in optionsLayerNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="house-hold-control-search-input" v-model="searchHouseNumber" clearable placeholder="请选择门牌号">
              <el-option
                v-for="item in optionsHouseNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button class="house-hold-control-search-btn" plain type="primary" slot="append" icon="el-icon-search">查询</el-button>
            <el-button class="house-hold-control-search-btn" plain type="info" slot="append" icon="el-icon-delete">清空</el-button>
          </div>
          <div class="house-hold-control-table">
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
                class="house-hold-control-pagination"
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
  name: 'HouseHoldControl',
  data () {
    return {
      searchTitle: '',
      searchPhone: '',
      searchBildingNumber: '',
      searchLayerNumber: '',
      searchHouseNumber: '',
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
.house-hold-control-search{
  margin-top: 6px;
}
.house-hold-control-search-input{
  width: 200px;
  margin-top: 4px;
  margin-right: 10px;
}
.house-hold-control-search-btn{
  margin-top: 4px;
}
.house-hold-control-table{
  margin-top: 10px;
}
.house-hold-control-pagination{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
