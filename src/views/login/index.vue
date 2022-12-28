<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      :rules="loginRules"
      class="login-form"
    >
      <!--      标题 -->
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!--      用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!--      密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <span
          class="show-pwd"
          @click="
            passwordType === 'password'
              ? (passwordType = 'text')
              : (passwordType = 'password')
          "
        >
          <span class="svg-container">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        @click="handleLogin"
        type="primary"
        style="width: 100%"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { validatePassword } from "./rules";
import { useStore } from "vuex";

/* data */
const loginForm = ref({
  username: "super-admin",
  password: "123456",
});

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "用户名为必填项",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validatePassword(),
    },
  ],
});

// 声明 passwordType 数据
const passwordType = ref("password");
// 声明 loading
const loading = ref(false);
// 获取页面Form表单实例
const loginFormRef = ref(null);
// 获取 vuex store
const store = useStore();

/* methods */
// 处理登陆
const handleLogin = () => {
  // 表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return;
    console.log(loginFormRef.value);
    loading.value = true;
    // 触发登录动作
    store
      .dispatch("user/login", loginForm.value)
      .then(() => {
        loading.value = false;
        // TODO: 进行登陆后处理
      })
      .catch((err) => {
        console.log("err", err);
        loading.value = false;
      });
  });
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
