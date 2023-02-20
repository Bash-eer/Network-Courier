<template>
  <div class="bg-white pt-4">
    <div class="flex m-3 justify-content-between align-items-center">
      <div
        class="flex align-items-center justify-content-start pointer-cursor"
        @click="setTabHandler"
      >
        <span> <i class="pi pi-arrow-left"></i></span>

        <!-- <div v-if="defaultTransportType == 'Document'"> -->
        <div class="flex">
          <div
            class="
              flex
              align-items-center
              flex
              justify-content-start
              color-4e5968
              font-size-18
              mt-2
              ml-2
            "
          >
            <h5 class="color-e0e4eb">
              {{ $route.params.type }} Template Settings
            </h5>
            <h5 class="ml-2 mt-1">> {{ $route.params.module }}</h5>
          </div>
        </div>
      </div>
      <!-- right contents -->
      <div class="flex align-items-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <SearchField storePath="templateSettings" />
        </div>
        <!-- add new button -->
        <Buttons
          button_class="p-button-sm mr-4 ml-2 bg-357dea"
          label="Add New"
          v-on:childToParent="
            openDialog(
              'emailCreateTemplate',
              'templateSettings',
              'Add Template'
            )
          "
        />
      </div>
    </div>
    <div class="row ml-2 table_div color-7e84a7">
      <div class="col-12">
        <!-- <keep-alive> -->
        <DataTable
          formTableDataName="emailprofileTableDataEmail"
          tableName="EmailprofileTable"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="profileTableDataEmail"
          :tableColumns="
            this.$store.state.templateSettings.emailTableColunmData
          "
          storePath="templateSettings"
        />
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
  <TemplateDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['templateSettings'].dialogComponent"
  />
  <Toasts
    :severity="$store.state['templateSettings'].toastData.severity"
    :summary="$store.state['templateSettings'].toastData.summary"
  />
</template>

<script>
import DataTable from "./Components/DataTable.vue";
import { mapActions, mapGetters } from "vuex";
import Toasts from "./Components/Toast.vue";
import TemplateDialogs from "./Dialog.vue";
export default {
  name: "templateSettings",
  components: {
    DataTable,
    Toasts,
    TemplateDialogs,
  },
  data() {
    return {
      profileTableDataEmail: [],
      defaultTransportType: "Document",
    };
  },
  computed: {
    ...mapGetters({
      documentRowData: "templateSettings/documentRowData",
      emailRowData: "templateSettings/emailRowData",
    }),
  },
  watch: {
    "$store.state.templateSettings.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.templateSettings.addRegionDeliveryTransportType;
      },
    "$store.state.templateSettings.AllTemplatesData": function () {
      this.getTableData();
    },
  },
  methods: {
    ...mapActions({
      getAllTemplatesData: "templateSettings/getAllTemplatesData",
    }),
    openDialog(name, type, header) {
      // if (type == "salesHome") {
      this.$store.dispatch("templateSettings/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["templateSettings/controlActivityDialog"];
    },
    setTabHandler() {
      this.$router.push("/settings/templateSettings");
    },
    async getTemplates() {
      let id = this.$route.params.id;
      const res = await this.getAllTemplatesData(id);
      this.getTableData();
    },
    getTableData() {
      if (this.$store.state.templateSettings.AllTemplatesData) {
        this.profileTableDataEmail = [];
        this.$store.state.templateSettings.profileTableDataEmail =
          this.$store.state.templateSettings.AllTemplatesData;
        this.profileTableDataEmail =
          this.$store.state.templateSettings.profileTableDataEmail;
        let sno = 1;
        for (let i in this.$store.state.templateSettings
          .profileTableDataEmail) {
          this.profileTableDataEmail[i].s_no = sno++;
          this.profileTableDataEmail[i]["document"] = [];
          this.profileTableDataEmail[i].document.push({
            file_name:
              this.$store.state.templateSettings.profileTableDataEmail[i]
                .file_name,
            size: this.$store.state.templateSettings.profileTableDataEmail[i]
              .size,
            mime_type:
              this.$store.state.templateSettings.profileTableDataEmail[i]
                .mime_type,
            url: this.$store.state.templateSettings.profileTableDataEmail[i]
              .url,
          });
        }
      }
    },
  },
  created() {
    this.getTemplates();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .tabsBar {
  // flex-wrap: wrap;
  background-color: #fff !important;
}
::v-deep .p-datatable {
  padding: 10px !important;
  margin-right: 10px !important;
  background-color: #fff !important;
}
</style>