<template>
  <!--accept="application/pdf,application/vnd.ms-excel"-->
  <FileUpload
    name="demo[]"
    url="./upload.php"
    @upload="onUpload"
    :multiple="true"
    :showUploadButton="false"
    :showCancelButton="false"
    chooseLabel="Browse"
    @select="uploader"
  >
    <template #empty>
      <div
        class="
          wrap
          flex flex-row
          w-full
          justify-content-center
          align-items-center
        "
      >
        <img class="cursor" src="/images/pin.png" alt="" />
        <div class="flex flex-column m-1 ml-2">
          <span class="drag-text">Drag and Drop to upload</span>
          <span class="drag-text">Or Click browse to upload</span>
        </div>
      </div>
    </template>
  </FileUpload>
</template>

<script>
import FileUpload from "primevue/fileupload";
export default {
  name: "DragAndDropUpload",
  components: { FileUpload },
  methods: {
    onUpload(e) {
      console.log("eventss >>>", e);
    },
    uploader(e) {
      console.log("eventss >>>", e);
      // console.log(e.files[0].Target)
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 116px;
  color: #4e5868;
  background: #edf1f7;
  font-size: 14px;
  font-weight: bold;
  /* border-radius: 7px; */
}
.drag-text {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: 0.03em;
  text-align: center;
  color: #4e5868;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
::v-deep .p-button .p-button-icon-left {
  color: #fff;
}
::v-deep .p-button-label {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: 0.03em;
  text-align: center;

  cursor: pointer;
}
</style>
