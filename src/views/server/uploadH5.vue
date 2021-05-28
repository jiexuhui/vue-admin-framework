<template>
  <div class="app-container">
   <el-upload
    class="upload-demo"
    style="margin-top:5%;margin-left:10%;"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :disabled="waitstatus"
    :file-list="fileList"
    :before-upload="onBeforeUpload"
    accept="zip"
    list-type="picture"
    :http-request="upload">
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
            <div class="el-upload__tip">
            只能上传 zip 文件，且不超过 500m
            </div>
        </template>
    </el-upload>
  </div>
</template>
<script>
import { uploadH5 } from "@/api/yunying";
  export default {
    data() {
      return {
        fileList: [],
        waitstatus: false
      };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        onBeforeUpload(file) {
            console.log("onBeforeUpload>>>>", file)
            const isIMAGE = file.type === 'zip'||'application/x-zip-compressed';
            const isLt1M = file.size / 1024 / 1024 < 500;

            if (!isIMAGE) {
                this.$message.error('上传文件只能是zip格式!');
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 500MB!');
            }

            if (this.fileList.length >= 1) {
                this.$message.error('同时只能上传一个文件哦!');
            }
            if (!!this.waitstatus) {
                this.$message.error('请等待文件上传完成!');
            }
            // this.upload()
            return isIMAGE && isLt1M;
        },

        modeUpload(item) {
            this.fileList.push(item.file)
        },


        upload: function(param) {
            this.waitstatus = true
            let fd = new FormData()
            fd.append('file', param.file)
            uploadH5(fd).then(res => {
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.dialogFormVisible = false;
                    this.waitstatus = false
                    this.fileList = []
                }
            });
        },
    }
  }
</script>

<style>
</style>
