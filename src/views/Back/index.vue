<template>
  <div class="back">
    <el-container>
      <el-aside ref="aside" class="back-aside" :width="isCollapse ? '64px' : '200px'">
        <el-menu
          :default-active="$route.path"
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
              <i :class="item.img" style="margin-right:10px;"></i>
              <span>{{item.authName}}</span>
            </template>
             <!-- @click="saveNavState('/' + subItem.path)" -->
            <!-- , changeComponent(subItem.ComponentName) -->
            <el-menu-item :index="'/' + subItem.path" v-for="(subItem) in item.children" :key="subItem.id">
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
              <!-- <div class="back-header-info">
                <i class="el-icon-user"></i>
                <span class="back-header-info-span">物管哥1号</span>
              </div> -->
              <el-dropdown>
                <span class="el-dropdown-link back-header-info">
                  <i class="el-icon-user back-header-info-user"></i>
                  <span class="back-header-info-span">{{adminName}}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/adminAccountControl">
                    <el-dropdown-item>账号信息</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item divided>
                    <el-button type="info" @click="logout">退出</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="back-main">
          <el-tabs
            v-model="activeIndex"
            type="card"
            @tab-click="clickTab"
            @tab-remove="removeTab"
            v-if="openTab.length"
            closable
          >
            <el-tab-pane
              v-for="(item) of openTab"
              :key="item.name"
              :label="item.name"
              :name="item.route"
            >
              <router-view />
            </el-tab-pane>
          </el-tabs>
          <!-- <component :is="isComponent"></component> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Home from '../../components/Home/index'
// import NoticeControl from '../../components/NoticeControl/index'
export default {
  name: 'Back',
  data () {
    return {
      adminName: localStorage.getItem('adminName'),
      // isComponent: 'Home',
      isCollapse: false,
      // activePath: sessionStorage.getItem('activePath') || '/index',
      menu: [
        {
          id: '100',
          authName: '首页',
          path: '/',
          img: 'iconfont icon-shouye',
          children: [
            {
              id: '101',
              authName: '首页',
              path: 'index',
              ComponentName: 'Home'
            }
          ]
        },
        {
          id: '200',
          authName: '消息发布',
          path: '/',
          img: 'iconfont icon-fabu',
          children: [
            {
              id: '201',
              authName: '通知公告',
              path: 'noticeControl',
              ComponentName: 'NoticeControl'
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
          img: 'iconfont icon-fabu1',
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
              path: 'complaintControl'
            }
          ]
        },
        {
          id: '400',
          authName: '模块管理',
          img: 'iconfont icon-51wangluoanquan20_mokuai',
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
          img: 'iconfont icon-yonghuguanli',
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
        },
        {
          id: '600',
          authName: '后台管理',
          img: 'iconfont icon-houtaiguanli',
          path: '/',
          children: [
            {
              id: '601',
              authName: '管理员账号',
              path: 'adminAccountControl'
            }
          ]
        }
      ]
    }
  },
  // components: {
  //   Home,
  //   NoticeControl
  // },
  created () {
    this.createcollapsed()
  },
  watch: {
    '$route' (to, from) {
      let flag = false
      for (const item of this.openTab) {
        if (item.name === to.name) {
          this.$store.commit('set_active_index', to.path)
          flag = true
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', { route: to.path, name: to.name })
        this.$store.commit('set_active_index', to.path)
      }
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/' && this.$route.path !== '/index') {
      this.$store.commit('add_tabs', { route: '/index', name: '首页' })
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name })
      this.$store.commit('set_active_index', this.$route.path)
    } else {
      this.$store.commit('add_tabs', { route: '/index', name: '首页' })
      this.$store.commit('set_active_index', '/index')
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  methods: {
    logout () {
      this.$message({
        message: '退出登录',
        duration: 2000
      })
      this.$store.commit('outLogin')
      localStorage.removeItem('adminId')
      localStorage.removeItem('adminName')
      this.$router.push('/login')
    },
    clickTab (tab) {
      this.$router.push({ path: this.activeIndex })
      console.log(this.$route.path)
    },
    removeTab (target) {
      if (target === '/' || target === '/index') {
        return
      }
      this.$store.commit('delete_tabs', target)
      if (this.activeIndex === target) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log('=============', this.openTab[this.openTab.length - 1].route)
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route)
          this.$router.push({ path: this.activeIndex })
        }
      }
    },
    toggleCollapsed () {
      this.isCollapse = !this.isCollapse
    },
    // saveNavState (activePath) {
    //   sessionStorage.setItem('activePath', activePath)
    //   this.activePath = sessionStorage.getItem('activePath')
    // },
    createcollapsed () {
      if (document.body.clientWidth <= 768) {
        this.isCollapse = !this.isCollapse
      }
    }
    // changeComponent (curComponentName) {
    //   this.isComponent = curComponentName
    // }
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
    z-index: 10;
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
  height: calc(100vh);
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   height: 100%;
// }
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
  .el-dropdown{
    width: 70px;
  }
  .back-header-info-user{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 0;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
