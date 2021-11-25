<template>
  <div class="login">
    <div class="login-box">
      <div class="title">
        <span class="title-s">
          好运来小区物业管理后台系统
        </span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: 'admin',
        pass: '123456',
        checkPass: '123456'
      },
      rules: {
        account: [
          { required: true, message: '请输入管理员账号', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2 },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          console.log(this.ruleForm.account)
          console.log(this.ruleForm.password)
          console.log(this.ruleForm.checkPass)
          this.$axios.post('api/admin/login', {
            account: this.ruleForm.account,
            password: this.ruleForm.pass
          })
            .then(res => {
              console.log(res)
              if (res.data.errno === 0) {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 2000
                })
                localStorage.setItem('adminId', res.data.data[0].id)
                localStorage.setItem('adminName', res.data.data[0].admin_name)
                this.$router.push('/back')
              } else {
                this.$message.error('登录失败')
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('登录失败')
            })
          // if (this.ruleForm.account === 'admin' & this.ruleForm.pass === '123456' & this.ruleForm.checkPass === '123456') {
            // this.$message({
            //   message: '登录成功',
            //   type: 'success',
            //   duration: 2000
            // })
            // this.$router.push('/back')
          // } else {
          //   this.$message.error('登录失败')
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login{
height: 100%;
background: url('../../assets/images/login_background.png') no-repeat;
}
.login{
  position: relative;
}
.login-box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 10px;
}
.title{
  height: 30px;
  padding: 20px 14px;
  text-align: end;
  line-height: 30px;
  font-size: 18px;
  font-weight: 700;
  color: #666;
}
</style>
