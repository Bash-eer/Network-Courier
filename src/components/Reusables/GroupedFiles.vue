<template>
  <div label="Toggle" class="filesDiv" @click="toggle">
    <img v-if="getFilesLength(data) == 1" src="/images/preview.png" alt="pdf" />
    <span class="flex" v-if="getFilesLength(data) == 2">
      <img src="/images/preview.png" alt="pdf" />
      <img src="/images/preview.png" alt="pdf" />
    </span>
    <span class="flex flex-row" v-if="getFilesLength(data) > 2">
      <img src="/images/preview.png" alt="pdf" />
      <img src="/images/preview.png" alt="pdf" />
      <div class="mt-1 ml-1">
        <span><Avatar :label="'+' + (getFilesLength(data) - 2)" /></span>
      </div>
    </span>
  </div>
  <OverlayPanel ref="op">
    <span class="filesHeader bodyTxt">Files:</span>
    <div class="flex flex-column p-1">
      <div class="flex mt-2" v-for="(files, index) in data" :key="index">
        {{ index + 1 }}.
        <span>
          <a
            class="filesText bodyTxt ml-1"
            :href="files['url']"
            target="_blank"
            >{{ files["file_name"] }}</a
          ></span
        >
      </div>
    </div>
  </OverlayPanel>
</template>

<script>
import Avatar from "primevue/avatar";
import OverlayPanel from "primevue/overlaypanel";
export default {
  name: "GroupedFiles",
  props: ["data"],
  methods: {
    getFilesLength(files) {
      if (files != null) {
        return files.length;
      }
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },
  },
  components: {
    Avatar,
    OverlayPanel,
  },
};
</script>

<style scoped>
.filesDiv {
  cursor: pointer;
}
.bodyTxt {
  font-family: Montserrat;
  color: #4e5868;
}
.filesHeader {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
.filesText {
  text-decoration: none;
  color: #6c5ce7 !important;
}
</style>
