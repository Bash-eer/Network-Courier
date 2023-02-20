<template>
  <div class="searchicon flex align-items-center">
    <i class="fa fa-search ml-1"></i>
    <TextField
      v-model="searcher"
      icon="pi pi-search"
      icon_class="p-input-icon-left"
      placeholder="Search by Keyword"
      classes="p-inputtext-sm p-2 search-text"
      class="border text"
       @input="$emit('update:modelValue', $event.target.value)"
      v-on:childToParent="globalSearcher"
      style="width: 328px"
    />
  </div>
</template>

<script>
export default {
  name: "SearchField",
  props: ["storePath"],
  data() {
    return {
      searcher: "",
    };
  },
  globalSearcher(searchString) {
    this.$store.state.globalSearch = searchString;
  },
  methods: {
    globalSearcher(label, searchString) {
      if (this.storePath) {
        this.$store.state[this.storePath].globalSearch = searchString;
      }
    },
  },
  created() {
    if (this.storePath) {
      this.searcher = this.$store.state[this.storePath].globalSearch;
    }

    if (this.storePath == "Outbound") {
      this.searcher = "";
    } else if (this.storePath == "bulkAdjustment") {
      this.searcher = "";
    } else if (this.storePath == "inbound") {
      this.searcher = "";
    } else if (this.storePath == "templateSettings") {
      this.searcher = "";
    }
  },
  // unmounted() {
  //   this.$store.state[this.storePath].globalSearch = "";
  //   console.log(this.$store.state[this.storePath].globalSearch, "unmount");
  // },
};
</script>

<style scoped>
.wrapper {
  background: #fff !important;
  max-width: 1280px !important;
  margin: 0 auto;
}
::v-deep .border {
  border: none !important;
}
.p-button.p-button-sm {
  width: auto !important;
  height: 39px !important;
  margin-top: 8px !important;
  font-weight: bold !important;
}
.table-design {
  max-width: 1280px !important;
  margin: 0 auto;
}
.titleDesign {
  color: #4e5968;
  font-size: 18px;
  font-weight: 700;
}
.text {
  font-size: 12px;
  font-weight: 600;
}
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}
::v-deep .p-inputtext {
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  border-color: none !important;
}
</style>
