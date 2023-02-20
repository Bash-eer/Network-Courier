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
              {{ items.label == "Disable" ? "Resolved" : items.label }}
            </div>
            <div
              v-if="items.label == 'Disable' && storePath == 'CrmFeedback'"
              class="ml-3"
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="rowData.status == 'Unresolved' ? false : true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>

  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
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
      dialogComponent: "",
      initialComponent: "",
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
    };
  },
  methods: {
    ...mapActions({
      deleteFeedbackSettingsData: "CrmSettings/deleteFeedbackData",
      deleteFeedbackData: "CrmFeedback/deleteFeedbackData",
      deletePaymentItemData: "CrmSettings/deletePaymentMethodData",
      fetchFeedbackData: "CrmFeedback/loadFeedbackDataList",
      fetchFeedbackSettingsData: "CrmSettings/loadFeedbackSettingsData",
      getCrmListFeedbackData: "CsrActivityStore/getCrmListFeedbackData",
      loadSpecificFeedbackSettingsData: "CrmSettings/specificFeedbackData",
      fetchPaymentMethodData: "CrmSettings/loadPaymentMethodData",
      resolveUnresolveFeedback: "CrmFeedback/resolveFeedbackData",
    }),

    toggle(event) {
      this.$refs.op.toggle(event);
    },

    //TO Resolve/Unresolve A TABLE ROW
    async disableRow() {
      try {
        let status =
          this.rowData?.status == "Resolved" ? "Unresolved" : "Resolved";

        let data = {
          id: this.rowData.id,
          status: status,
        };
        let response = await this.resolveUnresolveFeedback(data);
        if (response && response.status === 200) {
          let messageInfo = response.data.message;
          let info = `The Feedback  is ${status.toLowerCase()} successfully!`;
          this.commonToast("success", "Success", info);
          this.initializeData(this.rowData);
        } else {
          let info =
            response.data.message ||
            "There was an error in resolving/unresolving the feedback, try again!";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }

      this.$refs.op.hide();
    },

    async menuClicked(choice) {
      //TO EDIT THE TABLE ROW
      if (choice == "Edit" && this.storePath == "CrmFeedbackSettings") {
        this.initialComponent = "CRMFeedbackSettingsMainDialog";
        this.dialogComponent = "feedbackSettings";
        const dialogData = {
          displayDialog: true,
          formData: this.rowData,
        };
        this.$emit("getFeedbackSettings", dialogData);
        let feedbackSettingParams = {
          id: this.rowData.id,
        };
        const subTypeResponse = await this.loadSpecificFeedbackSettingsData(
          feedbackSettingParams
        );

        if (subTypeResponse && subTypeResponse.status === 200) {
          let expandedData =
            subTypeResponse.data?.results.feedback_subtype || [];
          this.isMoreData = expandedData.length > 5 ? true : false;
          this.expandedData = expandedData.map((res, index) => {
            return res.sub_type;
          });
        }
        this.$refs.op.hide();
      }

      if (choice == "Edit" && this.storePath == "CrmFeedback") {
        this.initialComponent = "CRMFeedbackMainDialog";
        this.dialogComponent = "feedbackDialog";
        const dialogData = {
          displayDialog: true,
          formData: this.rowData,
        };
        this.$emit("getFeedback", dialogData);
        this.$refs.op.hide();
      }

      if (choice == "Edit" && this.storePath == "CrmPaymentMethod") {
        const dialogData = {
          displayDialog: true,
          formData: this.rowData,
        };
        this.$emit("getPaymentMethod", dialogData);
        this.$refs.op.hide();
      }

      //TO DELETE THE TABLE ROW
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            if (this.storePath === "CrmFeedbackSettings") {
              this.deleteFeedbackSettingItem();
            } else if (this.storePath === "CrmPaymentMethod") {
              this.deletePaymentMethodItem();
            } else {
              this.deleteFeedbackItem();
            }
          },
        });
      }
    },

    async initializeData(data) {
      if (this.storePath === "CrmFeedbackSettings") {
        this.fetchFeedbackSettingsData();
      } else if (this.storePath === "CrmPaymentMethod") {
        this.fetchPaymentMethodData();
        this.feedbackList();
      } else {
        this.fetchFeedbackData(this.paginationParams);
        this.feedbackList();
      }
    },

    async feedbackList() {
      let datas = {
        orderBy: ["createdAt", "DESC"],
        filter_params: [
          {
            column_name: "feedback_no",
            type: "contains",
            searchkey: "89",
          },
        ],
        searchValue: "",
      };
      await this.getCrmListFeedbackData(datas);
    },

    commonToast(severity, summary, message) {
      this.$store.state.CrmSettings.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    //FOR DELETE FEEDBACK SETTINGS
    async deleteFeedbackSettingItem() {
      try {
        let data = this.rowData;
        data.type = this.dataName;
        let response = await this.deleteFeedbackSettingsData(data);
        if (response && response.status === 200) {
          let info = "Feedback settings deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData();
        } else {
          let info =
            response.data.message || "Failed to delete the feedback settings";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },

    //FOR DELETE FEEDBACK ITEM
    async deleteFeedbackItem() {
      try {
        let data = this.rowData;
        data.type = this.dataName;
        let response = await this.deleteFeedbackData(data);
        if (response && response.status === 200) {
          let info = "Feedback deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData();
        } else {
          let info = response.data.message || "Failed to delete the feedback";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },

    //FOR DELETE PAYMENT METHOD ITEM
    async deletePaymentMethodItem() {
      try {
        let data = this.rowData;
        data.type = this.dataName;
        let response = await this.deletePaymentItemData(data);
        if (response && response.status === 200) {
          let info = "Payment method deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData();
        } else {
          let info =
            response.data.message || "Failed to delete the payment method";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
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
