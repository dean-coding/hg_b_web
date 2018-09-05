<template>
    <div>
        <!-- https://github.com/davidroyer/vue2-editor 
            :editorToolbar 指定工具类
        -->
        <el-button type="primary" @click="sumbmitOne" :loading="isLoadingDesc">发布</el-button>
         <el-col>
            <el-input placeholder="-- 输入标题 -- " v-model="title"> </el-input>
        </el-col>
        <vue-editor id="editor"
          useCustomImageHandler
          @imageAdded="addImage" v-model="htmlForEditor">
        </vue-editor>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      title: '如果你不出去走走,你就会以为这就是天堂......', //标题
      baseResDownUrl: null, //资源获取url
      isLoadingDesc: false,
      htmlForEditor: "hi mygirl,what wrong with you",
      _id: null
    };
  },
  components: {
    VueEditor
  },
  mounted: function() {
    this._id = this.$route.query.topicId;
    console.log("topicId=", this._id);

    this.baseResDownUrl = "/api";
  },
  methods: {
    sumbmitOne() {
      console.log("编辑blog：", encodeURIComponent(this.htmlForEditor));
      const params = {
        title: this.title,
        content: encodeURIComponent(this.htmlForEditor)
      };
      if (this._id) {
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success"
        });
        this.isLoadingDesc = false;
        this.$router.go(-1);
      } else {
        this.$notify({
          title: "成功",
          message: "提交成功",
          type: "success"
        });
        this.isLoadingDesc = false;
        this.$router.go(-1);
      }
    },

    addImage: function(file, Editor, cursorLocation) {
      //添加图片资源
      var formData = new FormData();
      formData.append("files", file);
      axios({
        url: "/files/upload",
        method: "POST",
        data: formData
      })
        .then(res => {
          console.log("文件上传res:", res);
          let imageUrl = this.baseResDownUrl + res.data[0]; // Get url from response
          console.log("image-url：", imageUrl);
          Editor.insertEmbed(cursorLocation, "image", imageUrl);
        })
        .catch(err => {
          this.$notify.error({
            title: "上传文件失败",
            message: err.message
          });
        });
    }
  }
};
</script>
