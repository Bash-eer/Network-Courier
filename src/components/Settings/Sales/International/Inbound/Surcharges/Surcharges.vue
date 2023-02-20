<template>
  <!-- header -->
  <div class="flex justify-content-between mt-3 ml-2 mr-2 mb-3">
    <div class="flex">
      <p class="Header-Style">Surcharges</p>
    </div>
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex mr-1">
          <Buttons
            label="Export All"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
          />
        </div>
        <div class="flex mr-2">
          <Buttons
            label="Add New"
            button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
            v-on:childToParent="
              openDialog(
                'AddNewSurchargeDialog',
                'internationalInbound',
                'Add New Surcharge'
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
  <DataTable
    tableName="surcharges"
    :tableData="$store.state['internationalInbound']['addSurchargesData']"
    :tableColumns="tableColumn"
  />
</template>

<script>
import DataTable from "../Tables/DataTable.vue";
import {InboundSurchargeTableColumnData} from "../../const.js";
export default {
  data: () => ({
    tableColumn: InboundSurchargeTableColumnData,
  }),
  methods: {
    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "internationalInbound") {
        this.$store.dispatch("internationalInbound/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["internationalInbound/controlActivityDialog"];
      }
    },
  },
  components: {
    DataTable,
  },
  created() {
    this.$store.dispatch("internationalInbound/loadInboundTableData", {
      path: "/settings/sales/rates/international/inbound/surcharges",
      type: "addSurchargesData",
    });
  },
};
</script>

<style scoped>
.Header-Style {
  font-weight: 700;
  font-size: 18px;
  color: #4e5968;
}
</style>
