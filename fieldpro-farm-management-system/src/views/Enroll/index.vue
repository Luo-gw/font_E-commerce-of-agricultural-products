<script setup>


//表单校验
//import {loginAPI} from '@/apis/user'
import{ ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import {enroll} from '@/apis/enroll.js'
import { useUserStore } from '@/store/user'
import { ElMessageBox } from 'element-plus'
import Axios from "axios"
Axios.defaults.baseURL='/api'



const userStore = useUserStore()
//1.准备表单对象
const form = ref({
  name:'',
  password:'',
  password2:'',
  agree:true,
  
  
})


let repeatValidate = (rule, value, callback) => {
    if(value ==='')
    callback(new Error('请再次输入密码'))
      else if (value !== form.value.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }


const rules ={
  name:[
    { required:true,message:'用户名不能为空',trigger:'blur'}
  ],
  password:[
    {required :true,message:'密码不能为空',trigger:'blur'},
    {min:6,max:16,message:'密码长度应为6-16',trigger:'blur'}
  ],
  agree:[
    {
      validator:(rule,value,callback) => {
        console.log(value)
 
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议!'))
        }
      }
    }
  ],
  password2:[
  { required: true, validator: repeatValidate, trigger: 'blur' }
  ]
}

//3.获取form实例 对整个登录表单都做校验
const formRef=ref(null)
//路由跳转
const router= useRouter()

//doLogin 函数 掌管登录的逻辑
const doEnroll = () => {
  
  //校验的格式
  formRef.value.validate(async (valid) => {
    console.log(valid)
    if(valid){
      //login才会进行
      let params = {
        name: form.value.name,
        password:form.value.password,
      }
      console.log("customerID")
      enroll(params).then(function (res) {
        ElMessageBox.alert('您的ID为：'+res.data,'注册成功',
                  {
                      //确定按钮的文本
                      type:'success',
                      confirmButtonText:'确定',
                      //回调函数，在点击弹框后执行，action参数是自动传入，代表用户的选择
                      callback:action => { 
                      }
                  }
              );
      })   
    
    
  

   router.replace({path:'/login'})
      
      
      
      
    }
  })
}
</script>


<template>
 <div class="bg">
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">阡陌</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>



    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户注册</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px"
              status-icon>
              <el-form-item prop="name" label="用户名">
                <el-input v-model="form.name"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="form.password"/>
              </el-form-item>
             <input type="hidden" name="abc" value="123">
              <el-form-item prop="password2" label="确认密码">
                <el-input type="password" v-model="form.password2"/>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox  size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doEnroll">点击注册</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped lang='scss'>

.bg{
  background-image: url("../../assets/loginbg.png");
  .login-header {
  //background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    position: relative;
    top:20px;
    left:450px;
    width: 350px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: #27ba9b;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  position: relative;
  right: 290px;
  background-size: cover;
  height: 583px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: #27ba9b;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: #cf4444;
          }

          &.active,
          &:focus {
            border-color: #27ba9b;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: #cf4444;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: #27ba9b;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}


.subBtn2 {
  background: #0c8649;
  width: 100%;
  color: #fff;
}
}
.subBtn {
  background: #27ba9b;
  width: 100%;
  color: #fff;
}
</style>