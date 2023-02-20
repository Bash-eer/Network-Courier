<template>
  <Card class="third-party-div">
    <template #header>
      <div
        class="wrapper flex flex-row justify-content-between align-items-center"
      >
        <div class="ml-5 header"><b>Third Party Intergration</b></div>
        <div class="flex flex-row">
          <div class="m-2 mr-3">
            <TextField
              v-model="searcher"
              placeholder="Search by Keyword"
              icon="pi pi-search"
              icon_class="p-input-icon-left"
              classes="p-inputtext-sm p-2 search-text"
              v-on:childToParent="globalSearcher"
              style="width: 328px"
            />
          </div>
          <div class="flex mr-1">
            <Buttons
              class="mr-4"
              button_class="p-button-sm p-button-outlined  add-btn custom-add-btn"
              label="Export"
              v-on:childToParent="openDialog('')"
            />
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-2">
        <div class="row">
          <div
            class="col-3 border-design"
            v-for="(item, index) of $store.state.masters
              .ThirdPartyIntergrationData"
            :key="index"
          >
            <img :src="item.img_url" class="image-design" />
            <div class="content-div">
              <div class="flex justify-content-between">
                <div class="flex title-class">{{ item.title }}</div>
                <div class="flex"><i class="pi pi-ellipsis-v" /></div>
              </div>
              <div class="content">{{ item.content }}</div>
              <div>
                <Buttons
                  button_class="p-button-sm add-btn btn-design"
                  :label="item.button_label"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
export default {
  data() {
    return {
      searcher: "",
    };
  },
  components: {
    Card,
  },
  mounted() {
    this.$store.commit("users/updateBreadCrumb", "FleetMasters");
  },

  created() {
    this.$store.dispatch("masters/loadRoomsData", {
      path: "rooms",
      mutation: "fetchRoomsData",
    });
  },
  methods: {
    openDialog(name) {
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 39px !important;
}
.btn-design {
  background: #357dea !important;
  border-radius: 6px !important;
}
.content {
  margin-top: 10px;
  width: 251px;
  font-size: 14px;
  font-weight: 400;
}
.third-party-div {
  margin-left: 94px;
  margin-top: 40px;
  margin-right: 95px;
  padding-bottom: 53px;
}
.search-text {
  width: 328px;
}
.p-button.p-button-sm {
  width: auto !important;
  height: 39px !important;
  margin-top: 8px !important;
  font-weight: bold !important;
}
.header {
  color: #4e5968;
}
.outer_design {
  border: 1px solid #dcdcdc;
  width: 333px;
  height: 346px;
  box-sizing: border-box;
  border-radius: 15px;
}
.content-div {
  margin-top: 15px;
  margin-left: 23px;
  margin-right: 23px;
}
.title-class {
  font-weight: bold;
  font-size: 16px;
}
.border-design {
  width: 333px;
  height: 346px;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  padding: 0 !important;
  margin-left: 23px;
}
.image-design {
  width: 100%;
  margin: 0 !important;
  border-radius: 15px;
}
</style>
