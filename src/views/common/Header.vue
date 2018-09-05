<template>
    <div class="header">
        <div class="user-info">
            <span style="font-size: 24px;font-family: serif;color:white;">hg运营后台</span>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" v-bind:src="usericon"> {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userSetting">设置</el-dropdown-item>
                    <el-dropdown-item command="aboutme">关于</el-dropdown-item>
                    <el-dropdown-item command="isLoginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import Storage from "../../utils/storage.js";

export default {
  data() {
    return {
      dialogVisible: false,
      warnMsg: "hello"
    };
  },
  computed: {
    username() {
      let userinfo = Storage.fetch("userinfo");
      return userinfo ? userinfo.username : "admin";
    },
    usericon() {
      return "../../../static/img/default-head.png";
    }
  },
  methods: {
    handleCommand(command) {
      const self = this;
      if (command == "isLoginout") {
        self
          .$confirm("您确定要离开了嘛?", "提示", {
            confirmButtonText: "忍心离开",
            cancelButtonText: "手下留情",
            type: "warning"
          })
          .then(() => {
            self.loginout();
          })
          .catch(msg => {
            console.log(msg + "退出登录");
          });
      } else if (command == "userSetting") {
        self.$router.push("userinfo");
      } else if (command == "aboutme") {
        self.$router.push("aboutme");
      }
    },
    loginout() {
      console.log("退出登录");
      this.dialogVisible = false;
      this.$store.dispatch("doLogout");
      this.$router.replace("/login");
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  line-height: 70px;
  /* color: #fff; */
  /* background: #000000; */
}

.header .logo {
  float: right;
  width: 100px;
  text-align: center;
}

.nav-menu {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
