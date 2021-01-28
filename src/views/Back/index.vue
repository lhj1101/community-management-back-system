<template>
  <div class="back">
    <el-container>
      <el-aside ref="aside" class="back-aside" :width="isCollapse ? '0' : '200px'">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          router
          unique-opened
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false">
          <el-submenu :index="item.id" v-for="(item) in menu" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path" v-for="(subItem) in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              {{subItem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="back-right">
        <el-header class="back-header">
          <el-row>
            <el-col :span="24" class="back-header-col">
              <div class="back-header-ibtn">
                <el-button type="primary" class="menuControl" @click="toggleCollapsed">
                  <i :class="isCollapse ? 'el-icon-s-unfold menu-control-i' : 'el-icon-s-fold menu-control-i'" />
                </el-button>
              </div>
              <div class="back-header-title">
                <span class="back-header-title-span">物业管理系统</span>
              </div>
              <div class="back-header-info">
                <i class="el-icon-user"></i>
                <span class="back-header-info-span">物管哥1号</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="back-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Back',
  data () {
    return {
      isCollapse: false,
      activePath: sessionStorage.getItem('activePath') || '/index',
      menu: [
        {
          id: '100',
          authName: '首页',
          path: '/',
          children: [
            {
              id: '101',
              authName: '首页',
              path: 'index'
            }
          ]
        },
        {
          id: '200',
          authName: '消息发布',
          path: '/',
          children: [
            {
              id: '201',
              authName: '通知公告',
              path: 'noticeControl'
            },
            {
              id: '202',
              authName: '小区活动',
              path: 'communityActivityControl'
            }
          ]
        },
        {
          id: '300',
          authName: '用户发布',
          path: '/',
          children: [
            {
              id: '301',
              authName: '组织活动',
              path: 'organizingActivityControl'
            },
            {
              id: '302',
              authName: '访客通道',
              path: 'visitorControl'
            },
            {
              id: '303',
              authName: '损坏报修',
              path: 'reportRepairControl'
            },
            {
              id: '304',
              authName: '失物报备',
              path: 'reportLossControl'
            },
            {
              id: '305',
              authName: '投诉建议',
              path: 'complaintsComplaintControl'
            }
          ]
        },
        {
          id: '400',
          authName: '模块管理',
          path: '/',
          children: [
            {
              id: '401',
              authName: '二手市场',
              path: 'marketControl'
            },
            {
              id: '402',
              authName: '分享墙',
              path: 'shareControl'
            }
          ]
        },
        {
          id: '500',
          authName: '用户管理',
          path: '/',
          children: [
            {
              id: '501',
              authName: '住户管理',
              path: 'houseHoldControl'
            },
            {
              id: '502',
              authName: '账号管理',
              path: 'accountControl'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.createcollapsed()
  },
  methods: {
    toggleCollapsed () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = sessionStorage.getItem('activePath')
    },
    createcollapsed () {
      if (document.body.clientWidth <= 768) {
        this.isCollapse = !this.isCollapse
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 500px) {
  .el-aside{
    width: 0 !important;
  }
  .el-menu{
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 60px;
    height: calc(100vh - 60px) !important;
  }
  .el-header{
    z-index: 9999;
  }
  .back-main{
    padding-left: 84px;
  }
}
.el-menu{
  border-right-width: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.back-right{
  height: 100vh;
}
.back-aside{
  background: #eee;
  width: 200px;
}
.back-header{
  // background: skyblue;
  background: #eee;
  // border-bottom: 1px solid #eee;
}
.back-header-col{
  display: flex;
  // justify-content: space-between;
}
.back-header-ibtn {
  width: 100px;
  height: 60px;
  position: relative;
}
.menuControl{
  padding: 6px 12px;
  position: absolute;
  top: 50%;
  margin: -18px 0 0 4px;
}
.menu-control-i {
  font-size: 20px;
}
.back-header-title {
  width: calc(100% - 200px);
  text-align: center;
  line-height: 60px;
  height: 60px;
}
.back-header-title-span{
  font-size: 20px;
}
.back-header-info {
  width: 100px;
  height: 60px;
  font-size: 16px;
  line-height: 60px;
  text-align: end;
}
.back-header-info > i {
  padding-right: 4px;
}
@media screen and (max-width: 500px) {
  .back-header-ibtn {
    width: 70px;
    height: 60px;
    position: relative;
  }
  .menuControl{
    padding: 4px 10px;
    position: absolute;
    top: 50%;
    // left: 50%;
    margin: -18px 0 0 4px;
  }
  .menu-control-i {
    font-size: 20px;
  }
  .back-header-title {
    width: calc(100% - 140px);
    // float: left;
    text-align: center;
    line-height: 60px;
    // height: 60px;
  }
  .back-header-title-span{
    font-size: 18px;
    // word-wrap: break-word;
    // word-break: normal;
  }
  .back-header-info {
    width: 70px;
    // float: left;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    // text-align: end;
  }
  .back-header-info > i {
    padding-right: 4px;
  }
  .back-header-info > span {
    display: none;
  }
}
</style>
