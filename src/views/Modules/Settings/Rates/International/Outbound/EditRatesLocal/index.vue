<template>
  <div>
    <Card>
      <template #header>
        <div class="flex align-items-center justify-content-between">
          <div class="left-content flex align-items-center">
            <div
              @click="returnToList"
              class="pi pointer icon pi-arrow-left"
            ></div>
            <div class="flex align-items-start ml-4">
              <div class="flex align-items-center">
                <img
                  class="agent-img"
                  :src="details?.agent?.vendor?.profile_image"
                  alt="img"
                />

                <div class="ml-3">
                  <div class="agent-name">
                    {{ details?.agent?.vendor?.agent_name || "-" }}
                  </div>
                  <div class="rate-card">{{ details?.rate_card_name }}</div>
                </div>
              </div>
              <div class="flex align-items-center ml-4">
                <div
                  class="
                    rate-type-badge rate-type-wrapper
                    flex
                    align-items-center
                    mr-2
                  "
                >
                  <img src="@/assets/airplane.png" alt="img" />
                  <span class="ml-2">{{ details?.rate_card_type }}</span>
                </div>
                <div class="imp-color">{{ details?.shipping_type }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex justify-content-between align-items-center ml-2">
          <SelectButton
            v-model="selectedTab"
            optionLabel="tab"
            class="mr-5"
            :options="tabs"
          />
          <div class="right-content flex align-items-center">
            <Buttons
              label="Export All"
              button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn"
            />
            <Buttons
              v-if="showAddNew"
              label="Add New"
              button_class="p-button-sm mr-4  add-btn custom-add-btn"
              v-on:childToParent="openDialog"
            />
          </div>
        </div>
      </template>
    </Card>
    <router-view></router-view>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Card from "primevue/card";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: { Card, SelectButton },
  data() {
    return {
      details: {},
      showAddNew: true,
      tabs: [
        {
          tab: "Normal",
          routeName: "outboundLocalEditNormal",
          name: "zone",
          subTabs: false,
        },
        {
          tab: "Ecommerce",
          routeName: "outboundLocalEditEcommerce",
          name: "e_delivery_type_b",
          subTabs: true,
        },
        {
          tab: "Surcharges",
          routeName: "outboundLocalEditSurcharges",
          name: "surcharges",
          subTabs: true,
        },
        {
          tab: "Additional Surcharges",
          name: "add_surcharges",
          routeName: "outboundLocalEditAddSurcharges",
          subTabs: false,
        },
      ],
      selectedTab: {
        tab: "Zone",
        component: "Document",
        routeName: "outboundEditZones",
        name: "zone",
        subTabs: false,
      },
    };
  },
  watch: {
    selectedTab(value) {
      this.$router.push({ name: value.routeName });
      this.setCurrentTab({ edit: "local_edit", data: value.name });
    },
    $route() {
      this.watchRouteChange();
    },
    local_edit: {
      handler() {
        console.log("hites");
        this.displayAddNew();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
    }),
  },
  methods: {
    ...mapActions({
      toggleDialog: "Outbound/Edit/toggleDialog",
      setCurrentTab: "Outbound/Edit/setCurrentTab",
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
    }),
    openDialog() {
      this.toggleDialog({
        edit: "local_edit",
        type: this.local_edit.currentTab,
        data: true,
      });
    },
    returnToList() {
      this.$router.push({ name: "salesRates" });
    },
    displayAddNew() {
      switch (this.local_edit.currentTab) {
        case "normal_bike_jobs":
        case "normal_van_twotier_w":
        case "normal_van_twotier_q":
        case "normal_van_box":
        case "surcharges":
          this.showAddNew = false;
          break;
        default:
          this.showAddNew = true;
          break;
      }
    },
    watchRouteChange() {
      let route_name = this.$route.name;

      let getStep = this.tabs.find((list) => {
        if (list.routeName == route_name) {
          return list;
        }
      });

      if (getStep) {
        this.selectedTab = getStep;
      }
    },
    async getRateCard() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "surcharges",
        });

        this.isloading = false;
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }

      if (response) {
        this.details = response.data.results;

        delete this.details.charges;
      }
    },
  },
  async created() {
    await this.getRateCard();
    this.watchRouteChange();
  },
};
</script>

<style scoped>
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

:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}

.rate-type-wrapper {
  width: 80px !important;
}

.exp-color {
  color: #e48d1e !important;
  font-weight: bolder;
}

.imp-color {
  color: #17c079 !important;
  background: rgb(23, 192, 121, 0.2);
  color: #7469f2;
  border-radius: 2px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.rate-type-badge {
  background: rgba(116, 105, 242, 0.15);
  color: #7469f2;
  border-radius: 2px;
  font-weight: 700;
  font-size: 12px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  letter-spacing: 0.3px;
}

.agent-name {
  text-align: left;
}

.agent-img {
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  border: 1px solid black;
  border-radius: 4px;
}

.rate-card {
  white-space: nowrap;
  text-align: left;
}
</style>