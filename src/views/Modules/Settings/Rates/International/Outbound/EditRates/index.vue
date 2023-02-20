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
                  <div class="agent-name color-4e5968 text-2xl">
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
          <div :key="selectedTab" class="right-content flex align-items-center">
            <Buttons
              label="Export All"
              button_class="p-button-sm mr-3 p-button-outlined  add-btn custom-add-btn color-357dea"
            />

            <Buttons
              v-if="
                selectedTab.name != 'zone' &&
                selectedTab.name != 'weights' &&
                this.imp_edit.currentTab != 'overweight_charges'
              "
              label="Add New"
              button_class="p-button-sm mr-4  add-btn custom-add-btn bg-357dea"
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
      tabs: [
        {
          tab: "Zone",
          component: "Document",
          routeName: "outboundEditZones",
          name: "zone",
          subTabs: false,
        },
        {
          tab: "Weights",
          component: "Parcel",
          routeName: "outboundEditWeights",
          name: "weights",
          subTabs: true,
        },
        {
          tab: "Surcharges",
          component: "Parcel",
          routeName: "outboundEditSurcharges",
          name: "surcharges",
          subTabs: true,
        },
        {
          tab: "Additional Surcharges",
          component: "Parcel",
          routeName: "outboundEditAddSurcharges",
          name: "add_surcharges",
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
      if (!value.subTabs) {
        this.setCurrentTab({ edit: "imp_edit", data: value.name });
      }
      this.$router.push({ name: value.routeName });
    },
    $route() {
      this.watchRouteChange();
    },
  },
  computed: {
    ...mapGetters({
      imp_edit: "Outbound/Edit/imp_edit",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentTab: "Outbound/Edit/setCurrentTab",
      toggleDialog: "Outbound/Edit/toggleDialog",
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
    }),
    returnToList() {
      this.$router.push({ name: "salesRates" });
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
    openDialog() {
      this.toggleDialog({
        edit: "imp_edit",
        type: this.imp_edit.currentTab,
        data: true,
      });
    },
    async getRateCard() {
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "additional_surcharges",
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

        delete this.details.zones;
      }
    },
  },
  created() {
    this.watchRouteChange();
    this.getRateCard();
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
  font-weight: 600;
  font-size: 14px;
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
  font-weight: 600;
  font-size: 14px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  letter-spacing: 0.3px;
}

.agent-name {
  text-align: left;
  font-weight: 600;
  font-size: 20px;
  color: #4e5968 !important;
  white-space: nowrap;
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
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
  text-align: left;
}
</style>