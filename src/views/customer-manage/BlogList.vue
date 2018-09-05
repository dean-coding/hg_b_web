<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>博客</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="crumbs">
            <el-col :span="12">
                <el-input placeholder="标题 - 搜索" icon="search" v-model="params.keywords" :on-icon-click="_search" @keyup.enter.native="_search">
                </el-input>
            </el-col>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-col :span="8">
                <el-button type="info" @click="_search()">搜索</el-button>
                <el-button type="info" @click="addOne()">新增博客</el-button>
                <el-button type="info" @click="resetConn()">清空条件</el-button>
            </el-col>
        </div>

        <!-- 筛选查询 -->
        <div class="crumbs">
            <el-collapse accordion>
                <el-collapse-item title="筛选查询">
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
            <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="likedcount" label="点赞数"></el-table-column>
            <el-table-column prop="replycount" label="回复数"></el-table-column>
            <el-table-column prop="createdDate" label="创建时间" sortable></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="editOne(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="alertDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="pageList" layout="total, prev, pager, next, jumper" :total="totalElements" :current-page="number" :page-size="size">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import dateUtils from "../../utils/dateUtils";
export default {
  data() {
    return {
      params: {
        keywords: null,
        startTime: null,
        endTime: null
      },
      tableData: [],
      number: 0,
      size: 10,
      totalPages: 1,
      totalElements: 0,
      listLoading: false // 列表loading 加载标识 true 显示加载 false 不显示
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetConn() {
      //清空查询条件
      this.params = {
        keywords: null,
        startTime: null,
        endTime: null
      };
    },
    _search() {
      //搜索
      this.loadData();
    },
    addOne() {
      //新增博客
      this.$router.push("/blog");
    },
    editOne(index, row) {
      this.$router.push("/blog?topicId=" + row.id);
    },
    pageList(val) {
      //分页触发列表数据变动
      this.number = val;
      this.loadData();
    },
    //加载博客列表数据
    loadData() {
      const page = this.number - 1;
      const queryParams = this.params;
      var paramsStr = "?page=" + page + "&size=" + this.size;
      if (queryParams.keywords != null) {
        paramsStr = paramsStr + "&keywords=" + queryParams.keywords;
      }
      if (queryParams.startTime) {
        paramsStr =
          paramsStr +
          "&startTime=" +
          dateUtils.formatDate(queryParams.startTime, "yyyy-MM-dd");
      }
      if (queryParams.endTime) {
        paramsStr =
          paramsStr +
          "&endTime=" +
          dateUtils.formatDate(queryParams.endTime, "yyyy-MM-dd");
      }
      this.listLoading = true;
      //TEST-DATA
      const resdata = {
        content: [
          {
            id: 29,
            title: "form表单enter回车自动提交表单问题",
            replycount: 10,
            likedcount: 3,
            createdDate: "2018-08-11"
          },
          {
            id: 28,
            title: "vue2-editor未捕获的TypeError：e.isBuffer is not function",
            replycount: 220,
            likedcount: 10,
            createdDate: "2018-08-11"
          },
          {
            id: 27,
            title: "logback收集日志到kafka",
            replycount: 9,
            likedcount: 0,
            createdDate: "2018-08-03"
          },
        ],
        totalElements: 100,
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
        numberOfElements: 5,
        size: 10,
        number: 0
      };
      this.tableData = resdata.content;
      this.totalPages = resdata.totalPages;
      this.totalElements = resdata.totalElements;
      this.size = resdata.size;
      this.listLoading = false;
    },
    // 处理删除
    alertDelete(index, row) {
      this.$confirm("你确定删除嘛？此操作不可撤销!", "提示", {
        confirmButtonText: "老子不想要了",
        cancelButtonText: "手误",
        type: "warning"
      })
        .then(() => {
          this.deleteOne(row.id);
        })
        .catch(() => {
          //取消
        });
    },
    deleteOne(_id) {
      this.$notify({
        title: "成功",
        message: "删除成功！",
        type: "success"
      });
      this.loadData();
    }
  }
};
</script>

<style scoped>
.dialog-ul {
  list-style-type: none;
}
</style>
