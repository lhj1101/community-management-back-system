<template>
  <div class="home">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <!-- <el-row :gutter="100">
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8">
              <div ref="main" style="height: 400px;"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8">
              <div ref="asd" style="height: 400px;"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8">
              <div ref="www" style="height: 400px;"></div>
            </el-col>
          </el-row> -->
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <!-- <div ref="main" style="height: 200px;"></div> -->
                <div class="home-card-one-user">
                  <i class="iconfont icon-fangke home-card-one-account-i"></i>
                  <div class="home-card-one-user-title">
                    <p class="home-card-p">访客人数</p>
                    <p class="home-card-number">{{total.visitor}}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <!-- <div ref="asd" style="height: 200px;"></div> -->
                <div class="home-card-one-live">
                  <i class="iconfont icon-dibudaohanglan- home-card-one-account-i"></i>
                  <div class="home-card-one-live-title">
                    <p class="home-card-p">失物报备</p>
                    <p class="home-card-number">{{total.lost}}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <div class="home-card-one-account">
                  <i class="iconfont icon-baoxiu-weixuanzhong home-card-one-account-i"></i>
                  <div class="home-card-one-account-title">
                    <p class="home-card-p">损坏报修</p>
                    <p class="home-card-number">{{total.repair}}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <div class="home-card-one-account">
                  <i class="iconfont icon-tousu home-card-one-account-i"></i>
                  <div class="home-card-one-account-title">
                    <p class="home-card-p">投诉建议</p>
                    <p class="home-card-number">{{total.complaint}}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
              <el-card class="home-card-second">
                <div class="typea" ref="typea"></div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
              <el-card class="home-card-second">
                <el-row :gutter="100">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div ref="main" style="height: 200px;"></div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div ref="qqq" style="height: 200px;"></div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div ref="www" style="height: 200px;"></div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      total: {
        visitor: '',
        lost: '',
        repair: '',
        complaint: ''
      },
      repairoption: [],
      temp1: 0,
      temp2: 0,
      temp3: 0,
      temp4: 0,
      lostList: [
        { value: 0, name: '已找回' },
        { value: 0, name: '未找回' }
      ],
      complaintList: [
        { value: 0, name: '管理' },
        { value: 0, name: '服务' },
        { value: 0, name: '安保' },
        { value: 0, name: '环境' },
        { value: 0, name: '卫生' },
        { value: 0, name: '其他' }
      ],
      goodsList: [
        { value: 0, name: '家具' },
        { value: 0, name: '服饰' },
        { value: 0, name: '餐厨' },
        { value: 0, name: '电器' },
        { value: 0, name: '电子产品' },
        { value: 0, name: '体育用品' },
        { value: 0, name: '特产' },
        { value: 0, name: '其他' }
      ]
    }
  },
  created () {
    this.getTotal()
  },
  mounted () {
    // this.zhexiantu()
    // this.qqq()
    // this.www()
    // this.typea()
  },
  methods: {
    getTotal () {
      this.getVistorTotal()
      this.getLostTotal()
      this.getRepairTotal()
      this.getComplaintTotal()
      this.getGoodsTotal()
    },
    // 获取访客人数
    getVistorTotal () {
      this.$axios.post('api/user/searchUserVisitor')
        .then(res => {
          console.log(res.data.data)
          console.log(res.data.data.length)
          this.total.visitor = res.data.data.length
        })
    },
    // 获取失物数量
    getLostTotal () {
      this.$axios.post('api/user/searchUserLost')
        .then(res => {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            if (item.lost_done === '已找回') {
              this.lostList[0].value += 1
            } else if (item.lost_done === '未找回') {
              this.lostList[1].value += 1
            }
          })
          this.qqq()
          console.log(res.data.data.length)
          this.total.lost = res.data.data.length
        })
    },
    // 获取报修数量
    getRepairTotal () {
      this.$axios.post('api/user/searchUserRepair')
        .then(res => {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            if (item.repair_extent === '轻微') {
              this.temp1 += 1
            } else if (item.repair_extent === '中等') {
              this.temp2 += 1
            } else if (item.repair_extent === '严重') {
              this.temp3 += 1
            } else if (item.repair_extent === '紧急') {
              this.temp4 += 1
            }
          })
          console.log(this.repairoption)
          this.repairoption = [this.temp1, this.temp2, this.temp3, this.temp4]
          this.zhexiantu()
          console.log(this.repairoption)
          console.log(res.data.data.length)
          this.total.repair = res.data.data.length
        })
    },
    // 获取投诉建议数量
    getComplaintTotal () {
      this.$axios.post('api/user/searchUserComplaint')
        .then(res => {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            if (item.complaint_direction === '管理') {
              this.complaintList[0].value += 1
            } else if (item.complaint_direction === '服务') {
              this.complaintList[1].value += 1
            } else if (item.complaint_direction === '安保') {
              this.complaintList[2].value += 1
            } else if (item.complaint_direction === '环境') {
              this.complaintList[3].value += 1
            } else if (item.complaint_direction === '卫生') {
              this.complaintList[4].value += 1
            } else if (item.complaint_direction === '其他') {
              this.complaintList[5].value += 1
            }
          })
          this.www()
          console.log(res.data.data.length)
          this.total.complaint = res.data.data.length
        })
    },
    // 获取商品数量
    getGoodsTotal () {
      this.$axios.post('api/user/searchUserMarketGoods')
        .then(res => {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            if (item.goods_type === 'JJ') {
              this.goodsList[0].value += 1
            } else if (item.goods_type === 'FS') {
              this.goodsList[1].value += 1
            } else if (item.goods_type === 'CC') {
              this.goodsList[2].value += 1
            } else if (item.goods_type === 'DQ') {
              this.goodsList[3].value += 1
            } else if (item.goods_type === 'DZCP') {
              this.goodsList[4].value += 1
            } else if (item.goods_type === 'TYYP') {
              this.goodsList[5].value += 1
            } else if (item.goods_type === 'TC') {
              this.goodsList[6].value += 1
            } else if (item.goods_type === 'QT') {
              this.goodsList[7].value += 1
            }
          })
          this.typea()
          console.log(res.data.data.length)
          // this.total.complaint = res.data.data.length
        })
    },
    // 图
    zhexiantu () {
      var myChart = this.$echarts.init(this.$refs.main)
      var repairoption = {
        title: {
          text: '损坏程度'
        },
        tooltip: {},
        xAxis: {
          data: ['轻微', '中等', '严重', '紧急']
        },
        yAxis: {},
        series: [{
          name: '损坏程度',
          type: 'bar',
          data: this.repairoption
        }]
      }
      repairoption && myChart.setOption(repairoption)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    qqq () {
      var myChart = this.$echarts.init(this.$refs.qqq)
      var option = {
        title: {
          text: '失物状况'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '失物状况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            labelLine: {
              show: true
            },
            data: this.lostList
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    www () {
      var myChart = this.$echarts.init(this.$refs.www)
      var option = {
        title: {
          text: '投诉建议类型',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '投诉建议类型',
            type: 'pie',
            radius: '50%',
            data: this.complaintList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    typea () {
      var myChart = this.$echarts.init(this.$refs.typea)
      var option = {
        title: {
          text: '二手市场商品类型'
        },
        legend: {
          top: 'bottom'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: this.goodsList
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  min-height: calc(100vh - 158px);
}
.home-card-one {
  margin-top: 10px;
  height: 100px;
}
// .home-card-one /deep/ .el-card__body {
//   padding: 10px;
// }
.home-card-one-user, .home-card-one-live, .home-card-one-account {
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.home-card-one-account-i {
  font-size: 40px;
  padding: 10px;
  color: rgb(64 158 255);
}
// .home-card-one-user-title > p, .home-card-one-live-title > p, .home-card-one-account-title > p {
//   margin: 0;
//   line-height: 20px;
//   padding-top: 6px;
//   text-align: center;
// }
.home-card-p {
  margin: 0;
  font-weight: 700;
  color: rgba(0, 0, 0, .45);
  line-height: 18px;
  margin-bottom: 12px;
  font-size: 16px;
}
.home-card-number {
  margin: 0;
  font-weight: 700;
  text-align: center;
  color: #666;
  font-size: 20px;
}
.home-card-second {
  margin-top: 10px;
  height: 600px;
}
.typea{
  height: 500px;
}
</style>
