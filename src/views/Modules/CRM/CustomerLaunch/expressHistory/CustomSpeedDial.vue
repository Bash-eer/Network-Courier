<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded mx-2  updateButton'"
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer"
            @click="menuClicked(items.label, rowData)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                zone-route-custom-speed-dial-text
              "
            >
              {{ items.label }}
            </div>
            <div
              v-if="items.label == 'Disable' || items.label == 'Private'"
              class="ml-3"
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="
                    rowData.status == 'Inactive' || rowData.private == true
                      ? true
                      : false
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from "primevue/button";

import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName"],
  components: {
    Button,
    OverlayPanel,
  },
  data() {
    return {
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-plus",
          command: () => this.$emit("editMethod"),
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
          command: () => this.$emit("deleteMethod"),
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
      gettSavedAccordianJobDetails:
        "CustomerLaunchStore/gettSavedAccordianJobDetails",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      postCustomerLaunchBookingHistoryClone:
        "CustomerLaunchStore/postCustomerLaunchBookingHistoryClone",
      expressDataFetch: "customerLaunchBookingHistory/loadExpressTableData",
    }),

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {},

    async menuClicked(choice, data) {
      if (choice == "Edit") {
        this.gettSavedAccordianJobDetails(data.id).then((res) => {
          if (res == 200) {
            this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey =
              "CrmExpressMouleEditKey";
          }
        });
        await this.getCrmBookingDetails(data.id);
        this.$router.push({
          name: "customerDetailsCrm",
          params: {
            type: data.customer_type,
            mode: "edit",
          },
        });
      } else if (choice == "Feedback") {
        this.$router.push({
          name: "CRMFeedback",
          params: {
            contractId: data.contract_id,
            costCenterId: data.cost_center_id,
            callerId: data.caller_id,
            companyName: data.contract_customer?.profile_name,
            ...data,
          },
        });
      } else if (choice == "Clone") {
        await this.postCustomerLaunchBookingHistoryClone(data.id);
        let paginationParams = {
          offset: 1,
          limit: 10,
          orderBy: ["createdAt", "ASC"],
        };
        await this.expressDataFetch(paginationParams);
      }
    },

    initializeData(data) {},

    commonToast(severity, summary, message) {
      this.$store.state.operationZonesRoute.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    //FOR DELETE ROUTE ZONES ON ROUTE PLANNING
    async deleteRouteZones() {},
  },
  watch: {},

  computed: {
    ...mapGetters({
      pageOffset: "operationZonesRoute/getPageOffset",
      pageLimit: "operationZonesRoute/getPageLimit",
    }),
  },
};
</script>

<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.zone-route-custom-speed-dial-text {
  font-weight: 600;
  font-size: 14px;
  color: #4e5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
