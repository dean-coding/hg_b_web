
<!-- 系统管理-类别设置 -->
<template>
    <div class="home-content">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-setting"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>类别设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-tabs type="border-card" @tab-click="handleTabSwitch" :active-name="GOO_CATE_NAME">

            <el-tab-pane label="商品类别" :name="GOO_CATE_NAME">
                <el-col :span="20">
                    <el-tooltip content="选中单个类别可直接作为新增类别的父级" placement="right-end" effect="dark">
                        <el-button type="info" @click="addItemCate">添加类别</el-button>
                    </el-tooltip>
                </el-col>
                <el-button type="success" size="small" @click="editChecked">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteChecked">删除</el-button>
                <el-button size="small" @click="resetChecked">清空选择</el-button>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <!-- 树结构：
                                            show-checkbox 显示选中框
                                            check-strictly 父子级不严格关联 indent 节点之间的距离
                                            default-expand-all  默认展开
                                            :expand-on-click-node="false" 选中节点那一行 
                                            props 属性配置:-标签字段，子节点字段
                                            defaultProps: {
                                                children: 'children',
                                                label: 'label'
                                            }
                                        -->
                <el-tree :data="itemCates" :props="defaultProps" show-checkbox check-strictly :indent=50 node-key="id" default-expand-all :filter-node-method="filterNode" class="filter-tree" ref="cateTree">
                </el-tree>

                <!-- 添加类别的弹框 -->
                <el-dialog :title="cateDialogType" :visible.sync="handlerItemCateDialog" top="20%">
                    <el-form :model="itemCateForm">

                        <el-form-item label="父 级：" label-width="100px">
                            <el-col :span="12">
                                <el-select v-model="itemCateForm.parent.name" filterable remote :remote-method="loadSearchData" placeholder="请选择父级类别" @change="handlerSelect" clearable>
                                    <el-option v-for="item in searchList" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="索引：" label-width="100px">
                            <el-col :span="12">
                                <el-tooltip content="类别按索引值从大到小排序" placement="right-end" effect="dark">
                                    <el-input-number v-model="itemCateForm.sortIndex" :min=1></el-input-number>
                                </el-tooltip>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="类别名称：" label-width="100px">
                            <el-col :span="12">
                                <el-input v-model.trim="itemCateForm.name"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="handlerItemCateDialog = false">我就看看</el-button>
                        <el-button type="primary" @click="handlerConfirm">just do it!</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="商品规格" :name="GOO_ATTRIBUTE_NAME">商品规格</el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

let id = 1000;
export default {
  data() {
    return {
      GOO_CATE_NAME: "goo_cate",
      GOO_ATTRIBUTE_NAME: "goo_attribute",
      handlerItemCateDialog: false,
      cateDialogType: "", //区分是编辑还是新增类别
      filterText: "",
      itemCateForm: {
        id: null,
        parent: {
          id: null,
          name: null
        },
        name: null,
        sortIndex: 1
      },
      itemCates: [
        {
          createdDate: 1524139430000,
          updatedDate: 1524139430000,
          id: 1,
          parentId: 0,
          name: "电影",
          sortIndex: 1,
          isParent: true,
          isDeleted: false
        },
        {
          createdDate: 1524139447000,
          updatedDate: 1524139447000,
          id: 2,
          parentId: 0,
          children: [
            {
              createdDate: 1524140017000,
              updatedDate: 1524140017000,
              id: 4,
              parentId: 2,
              parentName: "小说",
              name: "mac",
              sortIndex: 1,
              isParent: false,
              isDeleted: false
            }
          ],
          name: "小说",
          sortIndex: 1,
          isParent: true,
          isDeleted: false
        },
        {
          createdDate: 1524139459000,
          updatedDate: 1524139459000,
          id: 3,
          parentId: 0,
          name: "音乐",
          sortIndex: 1,
          isParent: true,
          isDeleted: false
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      searchList: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.cateTree.filter(val); //节点过滤
    },
    // 监听类别对话框的关闭
    handlerItemCateDialog: {
      //监听 客户信息编辑对话框的取消
      handler: function() {
        if (!this.handlerItemCateDialog) {
          console.log("close the cate edit dialog");
          this.resetCateDialog();
        }
      },
      deep: true
    }
  },

  methods: {
    //加载搜索框数据
    loadSearchData(keywords) {
          this.searchList = [{"createdDate":1524140017000,"updatedDate":1524140017000,"id":4,"parentId":2,"parentName":"小说","name":"mac","sortIndex":1,"isParent":false,"isDeleted":false},{"createdDate":1524139459000,"updatedDate":1524139459000,"id":3,"parentId":0,"name":"音乐","sortIndex":1,"isParent":true,"isDeleted":false},{"createdDate":1524139447000,"updatedDate":1524139447000,"id":2,"parentId":0,"name":"小说","sortIndex":1,"isParent":true,"isDeleted":false},{"createdDate":1524139430000,"updatedDate":1524139430000,"id":1,"parentId":0,"name":"电影","sortIndex":1,"isParent":true,"isDeleted":false}]
    },

    // 处理标签切换
    handleTabSwitch(tab, event) {
      let tabName = tab.name;
      if (tabName == this.GOO_CATE_NAME) {
      } else if (tabName == this.GOO_ATTRIBUTE_NAME) {
        console.log("处理商品规则标签业务....");
      }
    },
    // 新增类别
    addItemCate() {
      var nodes = this.$refs.cateTree.getCheckedNodes();
      if (nodes.length > 1) {
        this.$message.error("选中的父级不能为多个");
      } else {
        //节点匹配做默认
        if (nodes[0]) {
          this.matchSelect(nodes[0].id);
        }
        this.cateDialogType = "添加类别";
        this.handlerItemCateDialog = true;
      }
    },
    //匹配下拉选择
    matchSelect(cateId) {
      var cates = this.searchList;
      for (var i = 0, len = cates.length; i < len; i++) {
        if (cates[i].id == cateId) {
          this.itemCateForm.parent = cates[i];
        }
      }
    },
    // 编辑选中
    editChecked() {
      const nodes = this.$refs.cateTree.getCheckedNodes();
      if (nodes.length != 1) {
        this.$message.error("请选中一个要编辑的类别");
      } else {
        const node = nodes[0];

        this.itemCateForm.id = node.id;
        this.itemCateForm.name = node.name;
        if (node.parent) {
          this.matchSelect(node.parent.id);
        }
        this.itemCateForm.children = node.children;
        this.itemCateForm.sortIndex = node.sortIndex;
        this.cateDialogType = "编辑类别";
        this.handlerItemCateDialog = true;
      }
    },
    // 删除选中
    deleteChecked() {
      const nodes = this.$refs.cateTree.getCheckedNodes();
      if (nodes.length != 1) {
        this.$message.error("请选择一个要删除的类别");
      } else {
        this.$confirm("考虑考虑呗？删除后可能会影响类别相关的数据呀", "提示", {
          confirmButtonText: "听我的",
          cancelButtonText: "算你狠",
          type: "warning"
        })
          .then(() => {
                  this.$notify({
                    title: "成功",
                    message: "操作成功！",
                    type: "success"
                  });
          })
          .catch(() => {
            //取消
          });
      }
    },
    // 清空选中
    resetChecked() {
      this.$refs.cateTree.setCheckedKeys([]);
    },
    //清空类别对话框内容
    resetCateDialog() {
      this.itemCateForm = {
        id: null,
        parent: {
          id: null,
          name: null
        },
        name: null,
        sortIndex: 1
      };
    },
    // 处理确认对话框
    handlerConfirm() {
      let isAdd = this.itemCateForm.id === null ? true : false; //是否是新增操作
      const parent = this.itemCateForm.parent;
      if (parent) {
        this.itemCateForm.parentId = parent.id;
        this.itemCateForm.parentName = parent.name;
      }
        this.$notify({
            title: "成功",
            message: "操作成功！",
            type: "success"
        });
    },
    // 下拉框选择
    handlerSelect(name) {
      if (name) {
        this.getSelectCateId(name);
      }
    },

    getSelectCateId(name) {
      let cates = this.searchList;
      for (var i = 0, len = cates.length; i < len; i++) {
        var cate = cates[i];
        if (name == cate.name) {
          this.itemCateForm.parent.id = cate.id;
        }
      }
    },
    append(store, data) {
      store.append({ id: id++, label: "testtest", children: [] }, data);
    },

    remove(store, data) {
      store.remove(data);
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
};
</script>
