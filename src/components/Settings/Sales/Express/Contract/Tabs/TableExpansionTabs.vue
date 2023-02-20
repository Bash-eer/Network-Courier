<template>
  <div class="w-100 table-expansion-tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div :key="render" class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding px-1"
              id="pills-tab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs.label, tabs.apiKey)"
                  :class="
                    index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                  "
                  :id="'pills-' + tabs.label + '-tab'"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-' + tabs.label"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-' + tabs.label"
                  :aria-selected="index == 0 ? true : false"
                >
                  {{ tabs.tabName }}
                </button>
              </li>
            </ul>
          </div>
          <div
            v-if="currentTab == 'Attendance'"
            class="flex align-items-center attendanceTabText"
          >
            <div class="flex flex-row">
              <div
                class="flex mr-2"
                v-for="(attendance, index) in $store.state.contacts
                  .contactManagementAttendanceTabData"
                :key="index"
              >
                <span>{{ index }}: {{ attendance }}</span>
                <span class="line-opacity">&nbsp;|</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div></div>
    </div>

    <!-- tab-content -->
    <div :key="render" class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <div
          v-if="this.currentTab == 'Rates'"
          class="right-content flex align-items-center"
        >
          <span style="padding-left: 640px; padding-bottom: 10px">
            <Button
              label="+ Add New"
              class="p-button-raised p-button-rounded"
              @click="handleClick($event)"
            />
          </span>
        </div>
        <!--TEMPLATE : REGULAR -->
        <span v-if="tabs.label != 'ChargeByQuantity'">
          <keep-alive>
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.heading"
              :tableData="tabs.data"
              :tableColumns="tabs.columns"
              :apiKey="tabs.apiKey"
              v-bind:is="tabs.tab"
              :editEnable="editEnable"
              :transport="tabs.transport"
              :type="tabs.type"
            ></component>
          </keep-alive>
        </span>
        <!--TEMPLATE : REGULAR  -->

        <!--TEMPLATE : CHARGE BY QUANTITY , BOX COUNT CHARGES -->

        <span v-if="tabs.label == 'ChargeByQuantity'">
          <keep-alive>
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.heading"
              :tableData="tabs.data"
              :editEnable="editEnable"
              :tableColumns="tabs.columns[0]"
              v-bind:is="tabs.tab"
              :transport="tabs.transport"
              :type="tabs.type"
            ></component>
          </keep-alive>

          <div class="table-expansion-header mt-5 mb-3">
            <span>Box Count Charges</span>
          </div>
          <div class="right-content flex align-items-center">
            <span style="padding-left: 640px; padding-bottom: 10px">
              <Button
                label="+ Add New"
                class="p-button-raised p-button-rounded"
                @click="addBoxes($event)"
              />
            </span>
          </div>
          <keep-alive>
            <component
              :tableDataName="'BoxCountCharges'"
              :tableName="'Box Count Charges'"
              :tableData="tabs.data[0].rates"
              :editEnable="editEnable"
              :tableColumns="tabs.columns[1]"
              v-bind:is="tabs.tab"
              :transport="tabs.transport"
              :type="tabs.type"
            ></component>
          </keep-alive>
        </span>
        <!--TEMPLATE : CHARGE BY QUANTITY -->
      </div>
    </div>
    <Dialog header="Add New" v-model:visible="ratesDialog">
      <Rates
        :key="key"
        :serviceId="service_id"
        :submit-form="createBikeEcommerceDelivey"
        @cancel="onCancel"
      />
    </Dialog>
    <Dialog header="Add New" v-model:visible="ratesVanDialog">
      <VanRates
        :key="key"
        :serviceId="service_id"
        :submit-form="createVanEcommerceRates"
        @cancel="onCancel"
        @close='closeVanDialog'
      />
    </Dialog>
    <Dialog header="Add New" v-model:visible="quantityBoxes">
      <QuantityBoxes
        :key="key"
        :serviceId="service_id"
        :submit-form="createVanEcommerceBoxes"
        @cancel="onCancel"
        @close='closeDialog'
      />
    </Dialog>
  </div>
</template>

<script>
import ExpansionTables from "../Tables/ExpansionTables.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Rates from "../Dialogs/CRUDDialogues/TableComponent/ExpandedDialog/rates.vue";
import VanRates from "../Dialogs/CRUDDialogues/VanTableComponent/Dialogs/rates.vue";
import QuantityBoxes from "../Dialogs/CRUDDialogues/VanTableComponent/Dialogs/boxCount.vue";
import { mapActions } from "vuex";
export default {
  name: "PageTabs",
  props: ["tabMenuData", "editEnable", "type", "defaultTab", "storePath"],
  components: {
    ExpansionTables,
    Button,
    Rates,
    Dialog,
    VanRates,
    QuantityBoxes,
  },
  data: () => ({
    searcher: "",
    render: 0,
    defaultTabIndex: 0,
    quantityBoxes: false,
    ratesVanDialog: false,
    ratesDialog: false,
    currentTab: "Rates",
  }),
  methods: {
    ...mapActions("express", ["getRegionRatesById"]),
    createBikeEcommerceDelivey(value) {
      this.ratesDialog = value;
    },
    testFunction(args) {},
    createVanEcommerceRates(value) {
      this.ratesVanDialog = value;
    },
    onCancel() {
      this.ratesDialog = false;
      this.ratesVanDialog = false;
      this.quantityBoxes = false;
    },
    addBoxes() {
      this.key++;
      this.quantityBoxes = true;
    },
    closeDialog(){
      this.quantityBoxes = false
      this.getRegionRatesById(this.$route.params.id)
      this.key++
    },
    createVanEcommerceBoxes(value) {
      if (value) this.ratesVanDialog = false;
    },
    handleClick(args) {
      if (
        this.$store.state.expressContract.regionRatesTransportTab == "bike" &&
        this.currentTab == "Rates"
      ) {
        this.ratesDialog = true;
      }
      if (
        this.$store.state.expressContract.regionRatesTransportTab == "van" &&
        this.currentTab == "Rates"
      ) {
        this.ratesVanDialog = true;
      }
    },
    closeVanDialog(){
      this.ratesDialog = false;
      this.getRegionRatesById(this.$route.params.id);
    },
    tabChange(tab, apiKey) {
      this.currentTab = tab;

      if (
        apiKey == "e_commmerce_bike_rates" ||
        apiKey == "bike_customer_van_job"
      ) {
        this.$store.dispatch("expressContract/regionRatesTabStateAction", {
          variable: "regionRatesECommerceBikeTableExpansionTab",
          value: apiKey,
        });
      }

      if (
        apiKey == "e_commmerce_van_rates" ||
        apiKey == "van_charge_by_weight" ||
        apiKey == "van_charge_by_quantity" ||
        apiKey == "van_customer_bike_job"
      ) {
        this.$store.dispatch("expressContract/regionRatesTabStateAction", {
          variable: "regionRatesECommerceVanTableExpansionTab",
          value: apiKey,
        });
      }
    },
  },
  activated() {
    if (document.getElementById("pills-" + this.currentTab + "-tab")) {
      document.getElementById("pills-" + this.currentTab + "-tab").click();
    }
  },

  mounted() {
    if (
      document.getElementById("pills-" + this.tabMenuData[0].label + "-tab")
    ) {
      document
        .getElementById("pills-" + this.tabMenuData[0].label + "-tab")
        .click();
    }
  },
  watch: {
    "$store.state.express.new1": function () {
      this.render++;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: rgb(255, 255, 255) !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.attendanceTabText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.line-opacity {
  opacity: 0.2;
}
.PrintLableBtn {
  height: 32px;
}
::v-deep .search-text {
  width: 328px !important;
}
.Button-Font {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
</style>
