<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          访客
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VisitorControl',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  min-height: calc(100vh - 158px);
}
</style>
