<template>
  <Card>
    <!--CARD HEADER-->
    <template #header>
      <div
        class="
          flex
          justify-content-between
          align-items-center
          justify-content-center
        "
      >
        <div class="flex">
          <div class="flex flex-row">
              <div class="mx-3 m-2 cursor-pointer" @click='movePrevious'>
                <i class="pi pi-arrow-left"></i>
              </div>

            <div class="flex">
              <div class="flex flex-column">
                <div class="flex region-name">{{this.regionRatesByIdData?.region?.region ?? 'Region Name' }}
                  <span class="default_badge ml-1" v-if="this.regionRatesByIdData.default == true" >
                    <img src='@/assets/bookmark.svg' v-tooltip.top="{value:'Default', class: 'custom-tooltip'}"  />
                  </span>
                </div>
                <div class="flex rate-card-name">{{this.regionRatesByIdData.rate_card_name ?? 'Rate Card Name'}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <Buttons
                label="Export All"
                button_class="p-button-sm mr-4 add-btn custom-add-btn"
              />
            </div>
            <div class="flex">
              <span
                v-if="
                  $store.state.expressContract.regionRatesSubTab == 'rates' ||
                  $store.state.expressContract.regionRatesSubTab ==
                    'multiTierRate' ||
                  ($store.state.expressContract.regionRatesSubTab ==
                    'twoTireRate' &&
                    $store.state.expressContract.regionRatesTwoTierSubTab ==
                      'van_2_tire_rates_charge_by_quantity') ||
                  ($store.state.expressContract.regionRatesRateTab ==
                    'e_commerce' &&
                    $store.state.expressContract
                      .regionRatesECommerceBikeTableExpansionTab !=
                      'bike_customer_van_job')
                "
              >
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--CARD CONTENT-->
    <template #content>
      <!--LEVEL ONE TABS-->
      <ExpressContractPageTabs
        v-bind:tabMenuData="tabMenuData"
        type="regionRates"
        defaultTab="Normal"
        storePath=""
      />
    </template>
  </Card>
   <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressContract'].dialogComponent"
  />
  
  <Toasts
    :severity="$store.state['expressContract'].toastData.severity"
    :summary="$store.state['expressContract'].toastData.summary"
  />
</template>

<script>
import Card from "primevue/card";
import Toasts from "../Toasts.vue";
import Tooltip from "primevue/tooltip";
import { mapState, mapActions, mapMutations } from 'vuex';
import Dialog from "../Dialog.vue"
//data imports
import {regionRatesMainTabMenuData} from "../const/const.js";


export default {
  directives:{
    'tooltip': Tooltip
  },
  components: {
    Card,
    Toasts,
    Dialog,
  },
  data: () => ({
    tabMenuData: regionRatesMainTabMenuData,
    count: 0,
    renderKey: 10,
  }),
    computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
      
     
    }),
  },
  async mounted(){
  await this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id);
   this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: `Settings > Sales Settings > Rates > Express > Contract > ${
        this.regionRatesByIdData?.region?.region ?? "Region Name"
      } > ${this.regionRatesByIdData.rate_card_name ?? "Rate Card Name"}`,
    });
  
  },
  methods: {
     ...mapActions('express', ['getRegionRatesById']),
      ...mapActions('expressContract', ['loadRegionRatesTable']),
      ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getNormalRoute(charge_types_index, property, normal_charge_services_index) {
      switch (property) {
        case "rates":
          return {
            charge_types_index: charge_types_index,
            property: property,
            normal_charge_services_index: normal_charge_services_index,
            addTo: "rates_array",
          };
        case "van_2_tire_rates_charge_by_quantity":
          return {
            charge_types_index: charge_types_index,
            property: property,
            normal_charge_services_index: normal_charge_services_index,
            addTo: "box_count_charges_array",
          };
        case "van_Multi_tire_rates_charge_by_quantity":
          return {
            charge_types_index: charge_types_index,
            property: property,
            normal_charge_services_index: normal_charge_services_index,
            addTo: "van_Multi_tire_rates_charge_by_quantity",
          };
        case "van_Multi_tire_rates_charge_by_job_count":
          return {
            charge_types_index: charge_types_index,
            property: property,
            normal_charge_services_index: normal_charge_services_index,
            addTo: "van_Multi_tire_rates_charge_by_job_count",
          };
      }
    },
    getECommerceRoute(
      charge_types_index,
      property,
      delivery_type,
      ecommerce_charge_services_index,
      type
    ) {
      switch (type) {
        case "delivery_rates":
          return {
            charge_types_index: charge_types_index,
            property: property,
            delivery_type: delivery_type,
            ecommerce_charge_services_index: ecommerce_charge_services_index,
            addTo: "rates",
            type: type,
          };
        case "box_rates":
          return {
            charge_types_index: charge_types_index,
            property: property,
            delivery_type: delivery_type,
            ecommerce_charge_services_index: ecommerce_charge_services_index,
            addTo: "rates",
            type: type,
          };
      }
    },
    getTemplateData(type) {
      switch (type) {
        case "rates":
          return {
            min_units: 0,
            max_units: 0,
            unit_rate: 0,
          };
        case "van_2_tire_rates_charge_by_quantity":
          return {
            boxes_under: "",
            rate: "",
          };
        case "box_count_rates":
          return {
            boxes_under: "",
            rate: "",
          };
        case "van_Multi_tire_rates_charge_by_quantity":
          return {
            min_box: 0,
            max_box: 0,
            rate: 0,
          };
        case "van_Multi_tire_rates_charge_by_job_count":
          return {
            min_job: 0,
            max_job: 0,
            rate: 0,
          };
      }
    },
    addNewRate(parentTab, transportTab, subTab, twoTierSubTab) {
      switch (parentTab) {
        //normal tab
        case "normal":
          switch (transportTab) {
            case "bike":
              switch (subTab) {
                case "rates":
                  this.$store.dispatch(
                    "expressContract/addToRegionRatesTable",
                    {
                      path: this.getNormalRoute(0, "rates", 0, ""),
                      data: this.getTemplateData("rates"),
                    }
                  );
                  break;
              }
              break;
            case "van":
              switch (subTab) {
                case "rates":
                  this.$store.dispatch(
                    "expressContract/addToRegionRatesTable",
                    {
                      path: this.getNormalRoute(0, "rates", 1, ""),
                      data: this.getTemplateData("rates"),
                    }
                  );
                  break;
                case "twoTireRate":
                  if (twoTierSubTab == "van_2_tire_rates_charge_by_quantity") {
                    this.$store.dispatch(
                      "expressContract/addToRegionRatesTable",
                      {
                        path: this.getNormalRoute(
                          0,
                          "van_2_tire_rates_charge_by_quantity",
                          1
                        ),
                        data: this.getTemplateData(
                          "van_2_tire_rates_charge_by_quantity"
                        ),
                      }
                    );
                  }
                  break;
                case "multiTierRate":
                  switch (
                    this.$store.state.expressContract.regionRatesMultiTierSubTab
                  ) {
                    case "van_Multi_tire_rates_charge_by_quantity":
                      this.$store.dispatch(
                        "expressContract/addToRegionRatesTable",
                        {
                          path: this.getNormalRoute(
                            0,
                            "van_Multi_tire_rates_charge_by_quantity",
                            1
                          ),
                          data: this.getTemplateData(
                            "van_Multi_tire_rates_charge_by_quantity"
                          ),
                        }
                      );
                      break;
                    case "van_Multi_tire_rates_charge_by_job_count":
                      this.$store.dispatch(
                        "expressContract/addToRegionRatesTable",
                        {
                          path: this.getNormalRoute(
                            0,
                            "van_Multi_tire_rates_charge_by_job_count",
                            1
                          ),
                          data: this.getTemplateData(
                            "van_Multi_tire_rates_charge_by_job_count"
                          ),
                        }
                      );
                      break;
                  }
                  break;
              }
              break;
          }
          break;
        //e-commerce tab
        case "e_commerce":
          switch (transportTab) {
            case "bike":
              this.$store.dispatch("expressContract/addToRegionRatesTable", {
                path: this.getECommerceRoute(
                  1,
                  "delivery_type",
                  this.$store.state.expressContract.regionRatesECommerceSubTab,
                  0,
                  "delivery_rates"
                ),
                data: this.getTemplateData("rates"),
              });
              break;
            case "van":
              switch (
                this.$store.state.expressContract
                  .regionRatesECommerceVanTableExpansionTab
              ) {
                case "e_commmerce_van_rates":
                  this.$store.dispatch(
                    "expressContract/addToRegionRatesTable",
                    {
                      path: this.getECommerceRoute(
                        1,
                        "delivery_type",
                        this.$store.state.expressContract
                          .regionRatesECommerceSubTab,
                        1,
                        "delivery_rates"
                      ),
                      data: this.getTemplateData("rates"),
                    }
                  );
                  break;
                case "van_charge_by_quantity":
                  this.$store.dispatch(
                    "expressContract/addToRegionRatesTable",
                    {
                      path: this.getECommerceRoute(
                        1,
                        "delivery_type",
                        this.$store.state.expressContract
                          .regionRatesECommerceSubTab,
                        1,
                        "box_rates"
                      ),
                      data: this.getTemplateData("box_count_rates"),
                    }
                  );
                  break;
              }
          }
          break;
        //additional surcharges tab
        case "additional_surcharges":
          this.$store.dispatch("expressContract/addToRegionRatesTable", {
            path: {
              charge_types_index: 3,
              property: "additional_surcharges",
            },
            data: {},
          });
          break;
      }
    },
    movePrevious() {
      this.$router.push('/settings/sales-settings/rates');
      this.renderKey++;
    },
  },
  created() {
    this.$store.dispatch(
      "expressContract/regionRatesAddNewButtonControlAction",
      {bool: false}
    );
    this.loadRegionRatesTable(this.$store.state.express.rateCardId ?? this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.region-name {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #4e5968;
  margin-top: 0.5rem;
}
.rate-card-name {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
</style>
