<template>
  <div class="w-100 tab-class">
    <span class="flex justify-content-left px-4 pt-3 tab-title"
      >Selected Area Name</span
    >
    <div class="w-11 justify-content-center m-4">
      <div class="p-inputgroup">
        <InputText
          placeholder="Search by Keyword"
          class="search-input"
          v-model="searchValue"
          @input="searchSelectedArea($event.target.value)"
        />
        <Button icon="pi pi-search" class="p-button-primary" />
      </div>
    </div>
    <div class="w-11 m-4 checkbox-area-container">
      <div
        v-for="(area, index) in selectedList"
        :key="index"
        class="flex justify-content-between my-2"
      >
        <span>{{ area.area_name }}</span>
        <span class="remove-item cursor-pointer" @click="removeItem(index)"
          ><i class="pi pi-times"></i
        ></span>
      </div>
      <div
        v-if="selectedList.length == 0"
        class="flex justify-content-center font-size-16 font-family-third"
      >
        No selected areas found
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  name: "SelectedAreaName",
  props: ["tableDataName", "selectedAreaNameData", "selectedSearchValue"],
  components: {
    InputText,
    Button,
  },
  data: () => ({
    searchValue: "",
    selectedList: [],
  }),
  methods: {
    removeItem(index) {
      let data = this.selectedList[index];
      this.$emit("removeSelectedAreaData", data);
    },
    searchSelectedArea(event) {
      let searchData = event.toLowerCase();
      let filterData = this.selectedAreaNameData.filter((res) => {
        if (res.area_name.toLowerCase().includes(searchData)) {
          return res;
        }
      });
      this.selectedList = filterData;
    },
  },
  created() {},
  mounted() {
    this.searchValue = this.selectedSearchValue;
  },
  watch: {
    selectedAreaNameData: function (newValue, oldValue) {
      this.selectedList = newValue;
      this.searchValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.p-inputtext {
  height: 36px;
  border-radius: 4px;
}
.tab-class {
  width: 556px !important;
  height: 754px;
  border: 1px solid $color-e6e6e6;
  box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.tab-title {
  color: $color-4e5968;
  font-weight: 600;
  font-size: 16px;
  font-family: "Montserrat";
}
.checkbox-area-container {
  height: 600px;
  overflow: auto;
}
</style>
