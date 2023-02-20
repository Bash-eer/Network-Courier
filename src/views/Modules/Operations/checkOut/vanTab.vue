<template>
  <div>
    <div class="scan_inputs">
      <div class="row_1 grid mb-3 ml-3">
        <div class="col-5 text-left">
          <label class="mb-2 label">Scan Barcode</label>
          <div class="relative">
            <input
              ref="scan_no"
              class="p-inputtext custom_inputs w-100"
              v-model="scan_no"
              @keyup.enter="getScanAndJobNo"
            />
            <span class="primaryBtn" @click="getScanAndJobNo">
              <img src="../../../../assets/rightArrowBtn.svg" />
            </span>
          </div>
        </div>
        <div class="col d-flex justify-content-start align-items-end ml-3">
          <Buttons class="mx-2 my-1" label="Update" @click="submitData" />
          <Buttons
            class="p-button-outlined mx-2 my-1"
            label="Clear"
            @click="clearJobsData"
          />
          <Buttons class="p-button-outlined mx-2 my-1" label="Print MChart" />
        </div>
      </div>
      <div class="row_2 grid mb-3 ml-3">
        <div class="col-5 text-left">
          <label class="mb-2 label">Scan Job Number</label>
          <div class="relative">
            <input
              ref="jobId"
              class="p-inputtext custom_inputs w-100"
              v-model="job_id"
              @keyup.enter="selectJobs"
            />
            <span class="primaryBtn" @click="selectJobs">
              <label>Add</label>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="table_component">
      <VanTable
        :tableColumn="tableColumns"
        :tableData="tabledata"
        tableName="vanTable"
        @editData="getDataForEdit"
      />
    </div>
  </div>
</template>

<script>
import Buttons from "primevue/button";
import VanTable from "./checkOutTable.vue";
import { tableColumns } from "./const";
import { mapActions, mapMutations } from "vuex";
export default {
  components: { Buttons, VanTable },
  data() {
    return {
      tableColumns,
      tabledata: null,
      scan_no: "",
      mchart: null,
      job_id: "",
      selectedJobs: [],
      formData: null,
    };
  },

  methods: {
    ...mapActions({
      getJobIdAndLoadData: "Checkout/getJobId",
      updateJobsForCheckout: "Checkout/updateJobsForCheckout",
    }),
    ...mapMutations({
      clearDataInCheckoutStore: "Checkout/clearJobsData",
    }),

    async getScanAndJobNo() {
      if (this.scan_no != null && this.scan_no != "") {
        this.mchart = this.scan_no;
        const payload = {
          movementChartId: this.scan_no ?? "",
          jobId: this.job_id ?? "",
          logsitic_mode: "Van",
          jobSelection: false,
        };

        const data = await this.getJobIdAndLoadData(payload);
        if (data && data.status == 200 && data.results.length !== 0) {
          data?.results.map((id) => {
            if (this.selectedJobs.indexOf(id) < 0) {
              this.selectedJobs.push(id);
            }
          });
          this.scan_no = null;
          this.$refs.jobId.focus();
        } else {
          const errorMessage = data?.message;
          this.commonToast("error", "Error Message", errorMessage);
        }
      }
    },

    async printMchart() {
      if (this.mchart != null) {
        const res = await this.loadPrintMchart(this.mchart);
        if (res && res.status == 200) {
          const successMessage = res?.results;
          this.commonToast("success", "Success", successMessage);
        } else {
          const errorMessage = res?.message || "Something Went Wrong!";
          this.commonToast("error", "Error", errorMessage);
        }
      }
    },

    async selectJobs() {
      if (this.job_id != null && this.job_id != "") {
        const payload = {
          movementChartId: this.scan_no ?? "",
          jobId: this.job_id ?? "",
          logsitic_mode: "Van",
          jobSelection: true,
        };
        await this.getJobIdAndLoadData(payload);
        this.job_id = null;
        this.$refs.jobId.focus();
      }
    },

    getDataForEdit(event) {
      this.formData = event;
    },

    async submitData() {
      if (this.formData) {
        const res = await this.updateJobsForCheckout(this.formData);
        if (res && res.status == 200) {
          const successMessage =
            res?.results || "Checkout Details Updated Successfully";
          this.commonToast("success", "Success", successMessage);
        } else {
          const errorMessage = res?.message || "Something Went Wrong!";
          this.commonToast("error", "Error", errorMessage);
        }
      } else {
        this.commonToast("info", "Job No not available", "");
      }
    },

    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    clearJobsData() {
      this.selectedJobs = null;
      this.clearDataInCheckoutStore();
    },
  },
};
</script>

<style lang="scss" scoped>
.primaryBtn {
  width: 4rem;
  background-color: #357dea;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 10px;
  border-radius: 3px;
  position: absolute;
  right: 5px;
  top: 4px;
  cursor: pointer;

  label {
    font-size: 0.85rem;
    color: #fff;
    cursor: pointer;
  }
}

.label {
  color: #7a7a7a !important;
  font-size: 14px;
}

::v-deep.p-button {
  background: #357dea !important;
  border-color: #357dea !important;
}

::v-deep.p-button.p-button-outlined {
  background-color: transparent !important;
}
</style>
