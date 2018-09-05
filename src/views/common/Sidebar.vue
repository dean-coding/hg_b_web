<template>
    <div v-bind:class="[ isCollapse ? 'sidebar-narrow':'sidebar']">
        <transition name="el-zoom-in-center">
            <div>
                <!--unique-opened 开启打开单个菜单模式；:default-active="onRoutes"按路由激活菜单 router路由模式以菜单index跳转 -->
                <el-menu :default-active="onRoutes" theme="dark" class="el-menu-vertical-demo" unique-opened router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <li style="padding-top: 10px;text-align: right;padding-right: 10px;color: #7FFFD4" @click="change()">
                        <i v-bind:class="[ isCollapse ? 'el-icon-d-arrow-left':'el-icon-d-arrow-right']"></i>
                    </li>

                    <el-menu-item index="readme">
                        <i class="el-icon-document"></i>
                        <template slot="title">
                            <span slot="title">首页看板</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">客户管理</span>
                        </template>
                        <el-menu-item index="customer">
                            <span slot="title">客户信息</span>
                        </el-menu-item>
                        <el-menu-item index="bloglist">
                            <span slot="title">博客</span>
                        </el-menu-item>
                        <el-menu-item index="mapNav">
                            <span slot="title">地图导航</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">报表统计</span>
                        </template>
                        <el-menu-item index="basecharts">
                            <label>基础统计</label>
                        </el-menu-item>
                        <el-menu-item index="mixcharts">
                            <label>数据分析</label>
                        </el-menu-item>
                         <!-- <el-submenu index="4-1">
                            <template slot="title">
                                <label>插件</label>
                            </template>
                            <el-menu-item index="basecharts">
                                <label>测试插件</label>
                            </el-menu-item>
                        </el-submenu> -->
                    </el-submenu>


                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">系统设置</span>
                        </template>
                        <el-menu-item index="cateManage">
                            <label>类别设置</label>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        change() {
            this.isCollapse = !this.isCollapse;
            this.$emit('tell-to-expend', this.isCollapse)
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 140px;
    min-height: 400px;
}
</style>
