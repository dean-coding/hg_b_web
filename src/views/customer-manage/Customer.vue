<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>客户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="crumbs">
            <el-col :span="12">
                <el-input placeholder="客户昵称/手机号/邮箱/编号 - 搜索" icon="search" v-model="params.keywords" :on-icon-click="handleSearch" @keyup.enter.native="handleSearch">
                </el-input>
            </el-col>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-col :span="8">
                <el-button type="info" @click="handleSearch()">搜索</el-button>
                <el-button type="info" @click="handleCreate()">新增客户</el-button>
                <el-button type="info" @click="removeParams()">清空条件</el-button>
            </el-col>
        </div>

        <!-- 客户详情：编辑，新增 -->
        <el-dialog title="客户详情" :visible.sync="editCustomerDialog" top="20%">
            <el-form :model="detailsForm">
                <el-form-item>
                    <el-col :span="8">
                        <ul>
                            <el-form-item>
                                <!-- display : inline 是否自动换行-->
                                <h3 style="display : inline"> {{detailsForm.grade ? filterGrade(detailsForm.grade) :'客户等级' }}--{{detailsForm.serialNumber? detailsForm.serialNumber : "客户编号"}}</h3>
                            </el-form-item>
                            <el-form-item>
                                <img class="border-logo" :src="''" alt="客户头像">
                            </el-form-item>
                        </ul>
                    </el-col>
                    <el-col :span="12">
                        <ul class="dialog-ul">
                            <li>
                                <el-form-item label="昵称">
                                    <el-input v-model.trim="detailsForm.nickname"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="手机号">
                                    <el-input v-model.trim="detailsForm.mobile"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="邮箱">
                                    <el-input v-model.trim="detailsForm.email"></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-col>
                </el-form-item>

                <el-form-item label="性别：" :label-width="formLabelWidth">
                    <el-col :span="12">
                        <el-radio-group v-model="detailsForm.sex">
                            <el-radio label="帅男"></el-radio>
                            <el-radio label="靓女"></el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>

                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-col :span="12">
                        <el-input type="password" v-if="!detailsForm.id" v-model.trim="detailsForm.password"></el-input>
                        <el-button type="info" @click="changePassword(detailsForm.id)" v-else>修改密码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="生日：" :label-width="formLabelWidth">
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="detailsForm.birthday" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="12">
                        <span>客户等级:</span>
                        <el-select v-model="detailsForm.grade" placeholder="选择等级">
                            <el-option label="普通" value="COMMON"></el-option>
                            <el-option label="白金" value="PLATINUM"></el-option>
                            <el-option label="黄金" value="GOLDEN"></el-option>
                            <el-option label="钻石" value="DIAMOND"></el-option>
                            <el-option label="超级" value="SVIP"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="地址：" :label-width="formLabelWidth">
                    <el-input v-model="detailsForm.address" placeholder="多个地址用逗号分开"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">先等等</el-button>
                <el-button type="primary" @click="confirmEdit" :loading="confirmLoading">没差了</el-button>
            </div>
        </el-dialog>
        <!-- 更改客户密码 -->
        <el-dialog title="修改密码" :visible.sync="changePasswordDialog" top="20%">
            <el-form :model="passwordForm">
                <el-form-item label="新密码：" :label-width="formLabelWidth">
                    <el-col :span="12">
                        <el-input type="password" v-model.trim="passwordForm.newPassword"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePasswordDialog = false">不想改了</el-button>
                <el-button type="primary" @click="confirmChangePwd">准奏</el-button>
            </div>
        </el-dialog>
        <!-- 筛选查询 -->
        <div class="crumbs">
            <el-collapse accordion>
                <el-collapse-item title="筛选查询">

                    <div class="el-form-item">
                        <span class="el-form-item__label">客户生日:</span>
                        <el-date-picker type="date" placeholder="选择日期" v-model="params.birthday"></el-date-picker>
                    </div>
                    <div class="el-form-item">
                        <span class="el-form-item__label">客户等级:</span>
                        <el-select v-model="params.grade" placeholder="选择等级">
                            <el-option label="普通" value="COMMON"></el-option>
                            <el-option label="白金" value="PLATINUM"></el-option>
                            <el-option label="黄金" value="GOLDEN"></el-option>
                            <el-option label="钻石" value="DIAMOND"></el-option>
                            <el-option label="超级" value="SVIP"></el-option>
                        </el-select>
                    </div>
                    <div class="el-form-item">
                        <span class="el-form-item__label">加入日期范围:</span>
                        <el-date-picker type="date" placeholder="选择日期" v-model="params.startTime" format="yyyy-MM-dd"></el-date-picker>
                        <el-date-picker type="date" placeholder="选择日期" v-model="params.endTime" format="yyyy-MM-dd"></el-date-picker>
                    </div>

                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- 表格属性:
                border 显示列边框 empty-text 无数据内容显示的文本；
                stripe 斑马纹  highlight-current-row 选中高亮;
                列属性：
                show-overflow-tooltip 列过长显示缩略提示
            -->
        <el-table :data="tableData" border style="width: 100%" height v-loading.body="listLoading" element-loading-text="主人稍等,玩命加载中...">
            <el-table-column prop="serialNumber" label="编号" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="sex" label="性别">
                <template scope="scope">
                    <el-tag :type="scope.row.sex === '帅男' ? 'primary' : 'success'" close-transition>{{scope.row.sex}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="birthday" label="生日" sortable></el-table-column>
            <el-table-column prop="grade" label="等级" sortable :formatter="formatter"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="totalElements" :current-page="number" :page-size="size">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import dateUtils from "../../utils/dateUtils";
export default {
  data() {
    return {
      resBaseUrl: "/api", //资源基础路径
      params: {
        keywords: null,
        birthday: null,
        sex: null,
        grade: null,
        startTime: null,
        endTime: null
      },
      tableData: [],
      detailsForm: {
        id: null,
        serialNumber: null,
        nickname: null,
        mobile: null,
        password: null,
        birthday: null,
        email: null,
        logoRes: null,
        sex: "帅男",
        grade: "COMMON",
        address: null
      },
      passwordForm: {
        id: null,
        newPassword: ""
      },
      formLabelWidth: "120px", //表格内标签偏移量
      number: 0,
      size: 10,
      totalPages: 1,
      totalElements: 0,
      editCustomerDialog: false, //客户信息编辑弹框：true 显示 false不显示
      changePasswordDialog: false, // 更改密码弹框: true 显示 false 不显示
      listLoading: false, // 列表loading 加载标识 true 显示加载 false 不显示
      confirmLoading: false // 客户信息编辑弹框中-确认按钮的loading标识
    };
  },
  mounted() {
    this.loadData();
  },
  watch: {
    editCustomerDialog: {
      //监听 客户信息编辑对话框的取消
      handler: function() {
        if (!this.editCustomerDialog) {
          this.cancelEdit();
          this.loadData();
        }
      },
      deep: true
    }
  },
  methods: {
    removeParams() {
      //清空查询条件
      this.params = {
        keywords: null,
        birthday: null,
        grade: null,
        startTime: null,
        endTime: null
      };
    },
    handleSearch() {
      //搜索
      this.loadData();
    },
    handleCreate() {
      //新增客户
      this.editCustomerDialog = true;
    },
    handleCurrentChange(val) {
      //分页触发列表数据变动
      this.number = val;
      this.loadData();
    },
    //加载客户列表数据
    loadData() {
      this.listLoading = true;
      const page = this.number - 1;
      const queryParams = this.params;
      var paramsStr = "?page=" + page + "&size=" + this.size;
      const resdata = {
        content: [
          {
            createdDate: 1538933808000,
            updatedDate: 1534933808000,
            id: 1143134,
            serialNumber: "HGCS1001",
            nickname: "13115920745",
            mobile: "180333333333",
            email: '123@qq.com',
            birthday: "2018-01-01",
            sex: "美女",
            grade: "COMMON"
          },
          {
            createdDate: 1538933808000,
            updatedDate: 1534933808000,
            id: 1313134,
            serialNumber: "HGCS1002",
            nickname: "13115920747",
            mobile: "180333333333",
            email: '123@qq.com',
            birthday: "2018-01-01",
            sex: "帅男",
            grade: "COMMON"
          },
           {
            createdDate: 1538933808000,
            updatedDate: 1534933808000,
            id: 1134,
            serialNumber: "HGCS1003",
            nickname: "13115920746",
            mobile: "180333333333",
            email: '123@qq.com',
            birthday: "2018-01-01",
            sex: "帅锅",
            grade: "PLATINUM"
          },
        ],
        totalElements: 3,
        last: true,
        totalPages: 1,
        first: true,
        sort: [
          {
            direction: "DESC",
            property: "id",
            ignoreCase: false,
            nullHandling: "NATIVE",
            descending: true,
            ascending: false
          }
        ],
        numberOfElements: 4,
        size: 10,
        number: 0
      };
      this.tableData = resdata.content;
      this.totalPages = resdata.totalPages;
      this.totalElements = resdata.totalElements;
      this.size = resdata.size;
      this.listLoading = false;
    },
    //格式化列表字段
    formatter(row, column) {
      return this.filterGrade(row.grade);
    },
    filterGrade(value) {
      switch (value) {
        case "COMMON":
          return "普通";
          break;
        case "PLATINUM":
          return "白金";
          break;
        case "GOLDEN":
          return "黄金";
          break;
        case "DIAMOND":
          return "钻石";
          break;
        case "SVIP":
          return "超级";
          break;
        default:
          return "";
      }
    },

    // 过滤列为标签
    filterTag(value, row) {
      console.log(row.sex);
      // console.log(value);
      return row.sex === value;
    },

    //更改密码
    changePassword(customerId) {
      this.changePasswordDialog = true;
      this.passwordForm.id = customerId;
    },

    //确认更改密码
    confirmChangePwd() {
      let pwdInfo = this.passwordForm;
          this.$notify({
            title: "成功",
            message: "密码更改成功！",
            type: "success"
          });
          this.changePasswordDialog = false;
    },
    // 处理编辑客户详情
    handleEdit(index, row) {
      this.editCustomerDialog = true;
      let rowTemp = row;
      this.detailsForm = rowTemp;
    },
    // 取消编辑
    cancelEdit() {
      this.editCustomerDialog = false;
      // this.loadData();//修改为监听时触发刷新
      this.detailsForm = {
        id: null,
        serialNumber: null,
        nickname: null,
        mobile: null,
        password: null,
        birthday: null,
        email: null,
        logoRes: null,
        sex: "帅男",
        grade: null,
        address: null
      };
    },
    // 确认编辑
    confirmEdit() {
      this.confirmLoading = true;
      let isAdd = this.detailsForm.id === null ? true : false; //是否是新增操作
        this.editCustomerDialog = false;
        this.$notify({
            title: "成功",
            message: "操作成功！",
            type: "success"
            });
        this.loadData();
        this.confirmLoading = false;
    },
    // 处理删除
    handleDelete(index, row) {
        this.$confirm("你确定删除嘛？此操作不可撤销!", "提示", {
            confirmButtonText: "老子不想要了",
            cancelButtonText: "手误",
            type: "warning"
        }).then(() => {
            this.deleteOne()
        })
    },
    deleteOne(customerId) {
        this.$notify({
            title: "成功",
            message: "删除成功！",
            type: "success"
        });
    }
  }
};
</script>

<style scoped>
.dialog-ul {
  list-style-type: none;
}
</style>
