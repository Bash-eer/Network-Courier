<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event)"
    />
    <RapidoDataTable
      tableName="RapidoAdhocThirdPage"
      :tableData="[tableData]"
      :tableColumns="tableColumnData"
    />
  </div>
</template>

<script>
import axios from "axios";
import TabMenu from "primevue/tabmenu";
import RapidoDataTable from "../Adhoc/Tables/DataTable.vue";
import { AdhocRateZoneNDDTableColumnData } from "../const/const";
export default {
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
    tableColumnData: AdhocRateZoneNDDTableColumnData,
    tableData: [],
  }),
  watch: {
    zone: async function () {
      let respectiveData = this.zoneRanges.find(
        (item) => item.name == this.zone
      );

      await this.$store.dispatch("rapidoAdhoc/loadRapidoAdhocThirdPageData", {
        path:
          "/settings/sales/rates/rapido/adhoc/ratecards/zone/" +
          respectiveData.id,
      });
    },
    "$store.state.rapidoAdhoc.triggerThirdPageLoad": async function () {
      await this.loadFunction();
    },
    activeIndex() {
      this.tableData = this.tabMenuData.find(
        (list, index) => this.activeIndex == index
      );
      this.$store.state.rapidoAdhoc.EcommerceDataRapido = this.tableData.id;

      console.log(this.tableData, "activeIndex");
      [this.tableData].map((list, idx) => {
        list["sno"] = idx + 1;
        list.rates.map((listRates, indexRates) => {
          listRates["sno"] = indexRates + 1;
        });
      });
    },
  },
  methods: {
    tabChanged(tab) {
      this.currentTab = tab;
    },
    getTableColumnData(tab) {
      switch (tab) {
        case "Same Day Delivery":
          return AdhocRateZoneNDDTableColumnData;
        case "Next Day Delivery":
          return AdhocRateZoneNDDTableColumnData;
      }
    },
    getTableData() {
      this.tabMenuData.find((list, index) => this.activeIndex == index);
      console.log(this.tabMenuData, "......");
    },
    async getZoneDropdownData() {
      let id = this.$route.params.id;

      await axios
        .get(
          "/settings/sales/rates/rapido/adhoc/dropdowns/ratecard/zonerange/" +
            id
        )
        .then((res) => {
          if (res.data.results) {
            this.zoneRanges = res.data.results;
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["zone_from"] +
                "-" +
                res.data.results[c]["zone_to"];
              this.RateDropdownData.push(res.data.results[c]);
              this.placeholder = this.RateDropdownData[0].name;
            }
          }
        });
    },
    findZone() {
      let respectiveZoneData = this.RateDropdownData.find(
        (item) => item.id == this.$route.params.zoneId
      );
      this.zone = respectiveZoneData.name;
    },
    async loadFunction() {
      let respectiveData = this.zoneRanges?.find(
        (item) => item.name == this.zone
      );
      if (respectiveData?.id) {
        await this.$store.dispatch("rapidoAdhoc/loadRapidoAdhocThirdPageData", {
          path:
            "/settings/sales/rates/rapido/adhoc/ratecards/zone/" +
            respectiveData.id,
        });
      }
    },
  },

  components: {
    TabMenu,
    RapidoDataTable,
  },
  created() {
    console.log(this.tabMenuData);
    this.tableData = this.tabMenuData.find(
      (list, index) => this.activeIndex == index
    );
    this.$store.state.rapidoAdhoc.EcommerceDataRapido = this.tableData.id;
    [this.tableData].map((list, idx) => {
      list["sno"] = idx + 1;
      list["created_by"] = list.user.display_name;
      list.rates.map((listRates, indexRates) => {
        listRates["sno"] = indexRates + 1;
      });
    });
  },
};
</script>

<style>
.ratesSubTabs .p-menuitem-link {
  background: #e1eaf9 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.ratesSubTabs .p-highlight .p-menuitem-link {
  background: #e1eaf9 !important;
  border-color: #2196f3 !important;
  color: #2196f3 !important;
}
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
