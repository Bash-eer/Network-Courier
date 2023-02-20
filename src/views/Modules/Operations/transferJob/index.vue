<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-3 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span
              class="mr-2 previous_btn"
              v-if="isTriggeredFromLiveJob"
              @click="moveToPrevious"
            >
              <i class="pi pi-arrow-left"></i>
            </span>
            <span class="table-title">Transfer Job</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-start mb-3 text-left mx-4">
      <div class="col-3 field">
        <div class="label">Scan No</div>
        <div>
          <input
            ref="scan_no"
            class="p-inputtext custom_inputs w-100"
            v-model="scan_no"
            @keyup.enter="getJobIdByScan"
          />
        </div>
      </div>
    </div>

    <div class="text-left mx-4 d-flex pb-4">
      <div class="table-title">Items Alloted</div>
      <div class="label ml-3">
        No of entries: {{ selectedJobData?.length || 0 }}
      </div>
    </div>

    <div class="mx-4 pb-4">
      <TransferJobDataTable
        :tableColumn="transferJobTableColumnData"
        tableName="transferJobTable"
        :tableData="selectedJobData"
        :isLiveJobData="isTriggeredFromLiveJob"
        dataKey="id"
        @updatedTableData="getUpdatedTableData"
        @removeSelectedData="removeSelected"
      />
    </div>

    <div class="d-flex pb-6 mx-4 justify-content-end">
      <Buttons
        class="p-button-outlined mx-1"
        label="Cancel"
        @click="cancelForm"
      />
      <Buttons
        class="mx-1"
        label="Update"
        @click="submitForm"
        :disable="diableSubmitBtn"
      />
    </div>
  </div>

  <Toasts
    :severity="$store.state['liveJobStatus'].toastData.severity"
    :summary="$store.state['liveJobStatus'].toastData.summary"
  />
</template>

<script>
import Toasts from "../liveJobStatus/Toast.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { debounce, differenceWith } from "lodash";
import TransferJobDataTable from "./transferJobTable.vue";
import { transferJobTableColumnData, NUMBER } from "./const";

export default {
  name: "transferJob",
  components: {
    TransferJobDataTable,
    Toasts,
  },
  data() {
    return {
      transferJobTableColumnData,
      tableData: [],
      formdata: [],
      scan_no: null,
      renderKey: 11,
      selectedJobs: [],
      diableSubmitBtn: true,
    };
  },
  computed: {
    ...mapState({
      selectedJobData: (state) => state.liveJobStatus.selectedJobData,
      isTriggeredFromLiveJob: (state) =>
        state.liveJobStatus.isTriggeredFromLiveJob,
      totalJobsSelected: (state) => state.liveJobStatus.totalJobsSelected,
      selectedJobId: (state) => state.liveJobStatus.selectedJobId,
    }),
  },
  mounted() {
    if (!this.isTriggeredFromLiveJob) {
      this.focusInput("scan_no");
    }
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Operations",
      breadcrumbInfo: this.isTriggeredFromLiveJob
        ? "Operations > Trip Manager > Live Job Status > Transfer Job"
        : "Operations > Trip Manager > Transfer Job",
    });
  },
  methods: {
    ...mapActions({
      showAdvanceFilterDialog: "liveJobStatus/showFilterDialog",
      isUpdateStatusDialog: "liveJobStatus/showUpdateStatusDialog",
      isPrintLabelDialog: "liveJobStatus/showPrintPreviewDialog",
      scanAndPushSelectedJobById: "liveJobStatus/scanAndPushSelectedJobById",
      getLiveJobIdAndLoadData: "liveJobStatus/getLiveJobAndLoad",
      updateSelectedJobForTransfer:
        "liveJobStatus/updateSelectedJobForTransfer",
    }),
    ...mapMutations({
      setParentTriggered: "liveJobStatus/setParentTriggered",
      removeDatainStore: "liveJobStatus/removeSelectedJob",
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    emitAdvanceFilterDialogData(dialogData) {
      this.initialComponent = "AdvanceFilterDialogMain";
      this.dialogComponent = "AdvanceFilterDialog";
      this.showAdvanceFilterDialog(dialogData);
    },
    emittedAdvanceFilterList(filterList) {
      this.filterList = filterList;
    },

    focusInput(refId) {
      this.$refs[refId].focus();
    },
    moveToPrevious() {
      const boolValue = false;
      this.$router.go(NUMBER.NEGATIVE_ONE); //moves to previous screen
      this.setParentTriggered(boolValue);
    },

    getUpdatedTableData(arr) {
      this.formdata = arr.filter((x) => x.edited && x.edited == true);
    },

    removeSelected(arr) {
      this.selectedJobs = differenceWith(
        this.selectedJobs,
        arr,
        (el, id) => el == id
      );
      this.formdata = differenceWith(
        this.formdata,
        arr,
        (el, id) => el.id == id
      );
      this.renderKey++;
    },

    async getJobIdByScan() {
      const params = this.scan_no;
      const data = await this.getLiveJobIdAndLoadData(params);
      const jobId = data?.results?.id;
      if (
        data &&
        data.status == 200 &&
        this.selectedJobs.indexOf(jobId) < NUMBER.ZERO
      ) {
        this.selectedJobs.push(jobId);
      }

      this.scan_no = null;
      this.$refs.scan_no.focus();
    },

    filterKeys(arr) {
      let formatted = arr;
      let fields = [
        "rider_id",
        "bike_trip_id",
        "rapido_trip_id",
        "van_trip_id",
        "logistics_mode",
        "id",
      ];

      formatted.map((obj, index) => {
        Object.keys(obj).forEach((ele) => {
          if (!fields.includes(ele)) {
            delete formatted[index][ele];
          }
        });
      });
      return formatted;
    },

    checkAndPush(arr, id) {
      if (id != null && id != "" && !arr.includes(id)) {
        return id;
      }
    },

    async submitForm() {
      let payload = await this.filterKeys(this.formdata);
      let updatedId = [];
      for (let i = 0; i < payload.length; i++) {
        updatedId.push(this.checkAndPush(updatedId, payload[i].id)),
          (payload[i]["rider_id"] = Number(payload[i].rider_id) || null);
        payload[i]["bike_trip_id"] = Number(payload[i].bike_trip_id) || null;
        payload[i]["rapido_trip_id"] =
          Number(payload[i].rapido_trip_id) || null;
        payload[i]["van_trip_id"] = Number(payload[i].van_trip_id) || null;
      }
      const { data, bool } = this.updateSelectedJobForTransfer({
        formData: payload,
        updatedId: updatedId,
        isLiveJobData: this.isTriggeredFromLiveJob,
        toastData: {
          toastSuccessData: {
            toastMsg: `Jobs  is updated successfully!`,
            toastSeverity: "success",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in Updating the Jobs, try again!",
            toastSeverity: "error",
          },
        },
      });

      if (data && bool == true) {
        this.removeSelected(updatedId);
        if (!this.formdata.length) {
          this.$router.push({ path: "/Operation/liveJobStatus" });
        }
      } else {
        this.removeSelected(updatedId);
      }
    },

    cancelForm() {
      if (this.isTriggeredFromLiveJob) {
        this.moveToPrevious();
      }
    },
  },

  watch: {
    formdata: function () {
      this.formdata.length
        ? (this.diableSubmitBtn = false)
        : (this.disableSubmitBtn = true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
}
a {
  text-decoration: none;
}
::v-deep .global-search {
  height: 27px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
.notification-icon {
  position: absolute;
  background: red;
  display: inline-block;
  margin-top: -15px;
  height: 18px;
  width: auto;
  font-size: 12px;
  border-radius: 8px;
  color: #ffffff;
  padding: 0px 5px 0px;
}

.previous_btn {
  cursor: pointer;
  .pi {
    color: #4e5968;
    font-size: medium;
    line-height: unset;
  }
}

.label {
  color: #7a7a7a;
  font-size: 14px;
}
</style>
