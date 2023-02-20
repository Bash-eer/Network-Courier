<template>
  <div :class="mainChipClass">
    <img :src="url" :class="chipImageClass" />
    <span :class="chipImageRemoveClass" @click="removeImageChips(index, url)"
      >x</span
    >
  </div>
</template>

<script>
export default {
  name: "RemovableImageChips",
  props: [
    "url",
    "index",
    "mainChipClass",
    "chipImageClass",
    "chipImageRemoveClass",
  ],
  methods: {
    removeImageChips(index, url) {
      this.$emit("childToParent", [index, url]);
    },
  },
};
</script>

<style scoped>
.inspectionImagesChipsDiv {
  position: relative;
  width: 51px;
  height: 46px;
  border: 1px solid #aecfff;
  border-radius: 4px;
  background: white;
  padding: 3%;
}
.contactsImagesChipsDiv {
  position: relative;
  width: 38.59px;
  height: 38.59px;
  border-radius: 7.23529px;
  padding: 2%;
}
.inspectionChipImages {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.contactsChipImages {
  width: 100%;
  height: 100%;
  border-radius: 7.23529px;
}
.inspectionChipImageRemove {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0;
  margin: 0;
  width: 19px;
  height: 19px;
  background: #ffffff;
  border: 0.5px solid #ff5b5b;
  color: #ff5b5b;
  box-shadow: 0px 5.60477px 5.60477px rgba(0, 0, 0, 0.15);
  border-radius: 55px;
}
.contactsChipImageRemove {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0;
  margin: 0;
  width: 19.36px;
  height: 19.36px;
  background: #ffffff;
  color: #4e5868;
  box-shadow: 0px 5.60477px 5.60477px rgba(0, 0, 0, 0.25);
  border-radius: 7.23529px;
}
</style>
