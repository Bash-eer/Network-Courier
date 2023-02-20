<template>
    <div
    class="
      searchicon
      flex flex-row
      justify-content-end
      align-items-center
    "
  >
    <i class="fa fa-search ml-1"></i>
        <TextField
          v-model="searcher"
          label="contactsSearch"
          placeholder="Search Contacts"
          type="text"
          class="ColorText"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          v-on:childToParent="globalSearcher"
          style="color: #B9B9B9;"
        />
      </div>
</template>

<script>
export default {
  name: "SearchContact",
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
      this.$store.state["contacts"].globalSearch = searchString;
    },
  },
};
</script>

<style scoped>

::v-deep .border {
  border: none !important;
}
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  color: #b9b9b9;
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
