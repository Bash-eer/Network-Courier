<template>
  <Buttons
    label="Close"
    v-on:childToParent="closeDialog"
    class="p-button-outlined mr-1 dialog-button-text cancel-style"
  />
</template>

<script>
export default {
  props: ["storePath"],
  methods: {
    closeDialog() {
      this.$store.dispatch(this.storePath + "/closeDialog");
    },
  },
};
</script>

<style scoped>
.cancel-style {
  font-weight: bold;
  line-height: 32px;
  font-size: 14px;
  color: #2196F3;
}
</style>
