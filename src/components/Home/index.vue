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
                  <i class="el-icon-star-off home-card-one-account-i"></i>
                  <div class="home-card-one-user-title">
                    <p class="home-card-p">访客人数</p>
                    <p class="home-card-number">123</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <!-- <div ref="asd" style="height: 200px;"></div> -->
                <div class="home-card-one-live">
                  <i class="el-icon-star-off home-card-one-account-i"></i>
                  <div class="home-card-one-live-title">
                    <p class="home-card-p">失物报备</p>
                    <p class="home-card-number">123</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <div class="home-card-one-account">
                  <i class="el-icon-star-off home-card-one-account-i"></i>
                  <div class="home-card-one-account-title">
                    <p class="home-card-p">损坏报修</p>
                    <p class="home-card-number">123</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-card class="home-card-one">
                <div class="home-card-one-account">
                  <i class="el-icon-star-off home-card-one-account-i"></i>
                  <div class="home-card-one-account-title">
                    <p class="home-card-p">投诉建议</p>
                    <p class="home-card-number">123</p>
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
    }
  },
  mounted () {
    this.zhexiantu()
    this.qqq()
    this.www()
    this.typea()
  },
  methods: {
    zhexiantu () {
      var myChart = this.$echarts.init(this.$refs.main)
      var option = {
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
          data: [33, 15, 23, 14]
        }]
      }
      option && myChart.setOption(option)
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
            data: [
              { value: 50, name: '已找回' },
              { value: 10, name: '未找回' }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
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
            data: [
              { value: 1048, name: '管理' },
              { value: 888, name: '服务' },
              { value: 735, name: '安保' },
              { value: 580, name: '环境' },
              { value: 484, name: '卫生' },
              { value: 300, name: '其他' }
            ],
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
            data: [
              { value: 40, name: '家具' },
              { value: 38, name: '服饰' },
              { value: 32, name: '餐厨' },
              { value: 30, name: '电器' },
              { value: 28, name: '电子产品' },
              { value: 26, name: '体育用品' },
              { value: 22, name: '特产' },
              { value: 18, name: '其他' }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
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
