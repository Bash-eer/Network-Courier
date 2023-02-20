<template>
  <div class="w-100 tab-class">
    <span class="flex justify-content-left px-4 pt-3 tab-title"
      >Available Area Name</span
    >
    <div class="w-11 justify-content-center m-4">
      <div class="p-inputgroup">
        <InputText
          placeholder="Search by Keyword"
          class="search-input"
          v-model="searchValue"
          @input="searchAvailableArea($event.target.value)"
        />
        <Button icon="pi pi-search" class="p-button-primary" />
      </div>
    </div>
    <div class="w-11 m-4 checkbox-area-container text-left">
      <div class="field-checkbox" v-if="availableAreaList.length > 0">
        <Checkbox
          inputId="SA"
          name="selectAll"
          value="true"
          v-model="isSelectAll"
          @input="
            selectAllAreaChange($event);
            $emit('emitSelectAll', isSelectAll);
          "
        />
        <label for="SA">Select All</label>
      </div>
      <div
        v-for="area of availableAreaList"
        :key="area.key"
        class="field-checkbox single-checkbox"
      >
        <Checkbox
          :inputId="area.key"
          name="category"
          :value="area"
          v-model="selectedCategories"
          @change="checkBoxChange($event.target.value)"
        />
        <label :for="area.key" class="single-checkbox-label">{{
          area.name
        }}</label>
      </div>
      <div
        v-if="availableAreaList.length == 0"
        class="flex justify-content-center font-size-16 font-family-third"
      >
        No available areas found
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
const _ = require("lodash");

export default {
  name: "AvailableAreaName",
  props: [
    "tableDataName",
    "availableAreaList",
    "selectedAreaList",
    "availableSearchValue",
    "isAvailableSelectAll",
  ],
  components: {
    InputText,
    Button,
    Checkbox,
  },
  data: () => ({
    isSelectAll: false,
    searchValue: "",
    selectedCategories: [],
  }),
  methods: {
    checkBoxChange(event) {
      this.isSelectAll = [];
      this.$emit("selectedSingleArea", this.selectedCategories);
    },
    selectAllAreaChange(event) {
      if (this.isSelectAll.length > 0) {
        this.selectedCategories = this.availableAreaList;
      } else {
        this.selectedCategories = [];
      }
      let data = this.isSelectAll;
      this.$emit("emitSelectAll", data);
    },
    searchAvailableArea: _.debounce(function (event) {
      this.isSelectAll = [];
      this.$emit("searchValue", event);
    }, 600),
  },
  watch: {
    selectedAreaList: function (newValue, oldValue) {
      this.selectedCategories = this.selectedAreaList || [];
    },
    availableAreaList: function (newValue, oldValue) {
      if (this.availableSearchValue == "") {
        this.searchValue = "";
      }
    },
    isAvailableSelectAll: function (newValue, oldValue) {
      if (this.isAvailableSelectAll == true) {
        this.isSelectAll = [];
      }
    },
  },
  created() {},
  mounted() {
    this.searchValue = this.availableSearchValue;
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
::v-deep .p-field-checkbox {
  margin-left: 0px !important;
}
::v-deep .p-field-checkbox .checksText,
::v-deep.field-checkbox label {
  font-family: $font-family-third !important;
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
}
::v-deep.field-checkbox label {
  color: #dadada;
}
::v-deep.single-checkbox-label {
  color: #1d1d1d !important;
}
</style>
