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
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <img
                :src="'/images/liveJobStatus/' + items.icon + '.png'"
                alt=""
                width="19"
                height="20"
                class="ml-2"
              />
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
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from "primevue/button";

import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { errhandler } from "@/services/httpClient";
export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "SelectedProfile",
  ],
  components: {
    Button,
    OverlayPanel,
  },
  data() {
    return {
      name: null,
    };
  },
  methods: {
    ...mapActions({
      sendSMSInfo: "liveJobStatus/sendSMSOnLiveJobStatus",
      sendNotifyRiderApp: "liveJobStatus/notifyRiderApp",
      sendJobsForTransfer: "liveJobStatus/setTransferJobData",
      setParentTriggered: "liveJobStatus/setParentTriggered",
      fetchJobForTransfer: "liveJobStatus/fetchSelectedJobById",
      loadSpecificJobsDetails:
        "customerLaunchBookingHistory/loadSpecificBookingOverAllJobDetails",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {
      this.$refs.op.hide();
    },

    async menuClicked(choice) {
      //TO Update Route Settings TABLE ROW
      if (choice == "Update Route Settings") {
        let selectedData = this.SelectedProfile.map((c) => {
          return c;
        });
        let data = {
          data: this.rowData,
          multipleData: selectedData,
        };
        this.$emit("emitUpdateRouteSettings", data);
        this.$refs.op.hide();
      }
      if (choice == "Group") {
        //FOR ZONES ON ROUTE PLANNING
        this.apiCallHandlergroup();
        this.$refs.op.hide();
      }
      if (choice == "UnGroup") {
        //FOR ZONES ON ROUTE PLANNING
        this.apiCallHandlerUngroup();
        this.$refs.op.hide();
      }

      if (choice == "Transfer Job") {
        let selectedData = await this.SelectedProfile.map((c) => {
          return Number(c.id);
        });
        let singleData = [];
        singleData[0] = Number(this.rowData.id);
        selectedData.length
          ? await this.fetchJobForTransfer(selectedData)
          : await this.fetchJobForTransfer(singleData);
        this.setParentTriggered(true);
        this.$router.push({ path: "/Operation/transferJob" });
        this.$refs.op.hide();
      }

      //TO SEND SMS
      if (choice == "Send SMS") {
        let data = this.rowData;
        this.$emit("emitSendSMS", data);
        // this.$confirm.require({
        //   message: "Are you sure you want to send the SMS?",
        //   header: "Confirmation",
        //   icon: "pi pi-exclamation-triangle",
        //   accept: () => {
        //     this.sendSMSInfoData();
        //   },
        // });
        this.$refs.op.hide();
      }

      //TO NOTIFY RIDER APP
      if (choice == "Notify Rider App") {
        this.$confirm.require({
          message: "Are you sure you want to notify rider app?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.notifyRiderApp();
          },
        });
        this.$refs.op.hide();
      }

      //TO UPDATE STATUS OF ROW
      if (choice == "Update Status") {
        let data = this.rowData;
        this.$emit("emitUpdateStatus", data);
        this.$refs.op.hide();
      }

      //TO UPDATE STATUS OF ROW
      if (choice == "POD") {
        let data = this.rowData;
        this.loadSpecificJobsDetails(data.id);
        this.$emit("emitPodReport", data);
        this.$refs.op.hide();
      }

      if (
        choice == "Print Label" ||
        choice == "Instruction Slip" ||
        choice == "Acknowledge Slip" ||
        choice == "Job Sheet"
      ) {
        let data = {
          data: this.rowData,
          title: choice,
        };
        this.$emit("emitPrintLabel", data);
        this.$refs.op.hide();
      }
    },

    //FOR SEND SMS
    async sendSMSInfoData() {
      try {
        let data = {
          job_id: this.rowData?.id,
          rider_id: this.rowData?.rider?.id || "",
        };
        let response = await this.sendSMSInfo(data);

        if (response && response.status === 200) {
          let info = "SMS sent successfully";
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info = response.data.message || "Failed to send the SMS";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },

    //FOR NOTIFY RIDER APP
    async notifyRiderApp() {
      try {
        let data = {
          job_id: this.rowData?.id,
          rider_id: this.rowData?.rider?.id || "",
        };
        let response = await this.sendNotifyRiderApp(data);

        if (response && response.status === 200) {
          let info = "Job notified on rider app successfully";
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info =
            response.data.message || "Failed to notify the job on rider app";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
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

    async apiCallHandlergroup() {
      let datagroup = this.$store.state.liveJobStatus.GropAllPayload;

      const res = this.$store.dispatch("liveJobStatus/POSTPATCHCRUDOPERATION", {
        path: "/crm/bookings/live-job/group",
        data: datagroup,
        method: "POST",
        type: "Group",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rows are Grouped  successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Group already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the Group, try again!",

            toastSeverity: "error",
          },
        },
      });
    },

    async apiCallHandlerUngroup() {
      let datagroup = this.$store.state.liveJobStatus.GropAllPayload;
      const res = this.$store.dispatch("liveJobStatus/POSTPATCHCRUDOPERATION", {
        path: "/crm/bookings/live-job/ungroup",
        data: datagroup,
        method: "POST",
        type: "UnGroup",
        toastData: {
          toastSuccessData: {
            toastMsg: `The rows are UnGrouped successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `UnGroup already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the Group, try again!",

            toastSeverity: "error",
          },
        },
      });
    },

    //FOR DELETE ROUTE ZONES ON ROUTE PLANNING
    async deleteRouteZones() {},
  },
  computed: {
    ...mapGetters({
      pageOffset: "liveJobStatus/getPageOffset",
      pageLimit: "liveJobStatus/getPageLimit",
    }),
  },

  watch: {
    "$store.state.liveJobStatus.errorconflicting": function () {
      this.errorreceived = true;
      if (this.errorreceived) {
        this.$confirm.require({
          message: "Are you sure you want to override the existing data?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            if (
              this.$store.state.liveJobStatus.errorconflicting.type == "Group"
            ) {
              this.$store.state.liveJobStatus.GropAllPayload.confirm = true;
              this.apiCallHandlergroup();
            } else if (
              this.$store.state.liveJobStatus.errorconflicting.type == "UnGroup"
            ) {
              this.$store.state.liveJobStatus.GropAllPayload.confirm = true;
              this.apiCallHandlerUngroup();
            }
          },
        });
      }
    },
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
