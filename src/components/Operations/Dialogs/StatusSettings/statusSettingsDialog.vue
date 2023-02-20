<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div v-for="(data, index) in state.statusList" :key="index">
        <div class="formgrid grid">
          <div
            class="field"
            v-bind:class="{
              'col-12 md:col-12': state.statusList.length - 1 == index,
              'col-12 md:col-10': state.statusList.length - 1 != index,
            }"
          >
            <h5 class="required dialog-label-text">Status</h5>

            <Textarea
              v-model="data.status_name"
              :autoResize="true"
              rows="3"
              cols="30"
              placeholder="Enter status name"
              :class="{
                'p-invalid':
                  v.statusList.$each.$response.$errors[index].status_name
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div
            class="
              field
              col-12
              md:col-2
              flex
              justify-content-center
              align-items-end
            "
            v-if="state.statusList.length - 1 != index"
          >
            <span class="remove-item cursor-pointer" @click="removeItem(index)"
              ><i class="pi pi-times"></i
            ></span>
          </div>
        </div>
      </div>
      <div v-if="!statusCreationId">
        <span class="add-item pl-2" @click="addItem()">
          <i class="pi pi-plus"></i> Add New</span
        >
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isSupervisorAssign"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { reactive } from "vue";
import { errhandler } from "@/services/httpClient";
import Textarea from "primevue/textarea";
export default {
  name: "statusSettingsDialog",
  props: ["selectedTab"],
  components: {
    Textarea,
  },
  setup() {
    const rules = {
      statusList: {
        $each: helpers.forEach({
          status_name: { required },
        }),
      },
    };
    const state = reactive({
      statusList: [
        {
          status_name: "",
          status: "Active",
        },
      ],
    });
    const v = useVuelidate(rules, state);
    return { v, state };
  },
  data() {
    return {
      submitted: false,
      isSupervisorAssign: false,
      zonesList: [],
      supervisorList: [],
      statusCreationId: "",
    };
  },
  methods: {
    ...mapActions({
      createExpressData: "operationsStatusSettings/createExpressStatusData",
      createInternationalData:
        "operationsStatusSettings/createInternationalStatusData",
      createRapidoData: "operationsStatusSettings/createRapidoStatusData",
      updateExpressData: "operationsStatusSettings/updateExpressStatusData",
      updateInternationalData:
        "operationsStatusSettings/updateInternationalStatusData",
      updateRapidoData: "operationsStatusSettings/updateRapidoStatusData",
      expressDataFetch: "operationsStatusSettings/loadExpressDataFetch",
      rapidoDataFetch: "operationsStatusSettings/loadRapidoDataFetch",
      internationalDataFetch:
        "operationsStatusSettings/loadInternationalDataFetch",
      showSupervisorDialog: "operationsStatusSettings/showStatusSettingsDialog",
    }),
    closeDialog() {
      this.showSupervisorDialog(false);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v.$invalid) {
        return;
      }
      this.isSupervisorAssign = true;
      if (!this.statusCreationId) {
        if (this.selectedTab == "ExpressTab") {
          this.addExpressStatusData();
        } else if (this.selectedTab == "RapidoTab") {
          this.addRapidoStatusData();
        } else {
          this.addInternationalStatusData();
        }
      } else {
        if (this.selectedTab == "ExpressTab") {
          this.editExpressStatusData();
        } else if (this.selectedTab == "RapidoTab") {
          this.editRapidoStatusData();
        } else {
          this.editInternationalStatusData();
        }
      }
    },
    async addExpressStatusData() {
      try {
        let data = {
          status_updates: this.state.statusList,
        };
        let response = await this.createExpressData(data);
        if (response && response.status === 200) {
          let info = "Express status created successfully";
          this.commonToast("success", "Success", info);

          this.expressDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in creating the express status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addInternationalStatusData() {
      try {
        let data = {
          status_updates: this.state.statusList,
        };
        let response = await this.createInternationalData(data);
        if (response && response.status === 200) {
          let info = "International status created successfully";
          this.commonToast("success", "Success", info);

          this.internationalDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in creating the international status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addRapidoStatusData() {
      try {
        let data = {
          status_updates: this.state.statusList,
        };
        let response = await this.createRapidoData(data);
        if (response && response.status === 200) {
          let info = "Rapido status created successfully";
          this.commonToast("success", "Success", info);

          this.rapidoDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in creating the rapido status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editExpressStatusData() {
      try {
        const data = {
          status_updates: this.state.statusList[0] || {},
          id: this.statusCreationId,
        };
        let response = await this.updateExpressData(data);
        if (response && response.status === 200) {
          let info = "Express status updated successfully";
          this.commonToast("success", "Success", info);

          this.expressDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in updating the express status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editInternationalStatusData() {
      try {
        const data = {
          status_updates: this.state.statusList[0] || {},
          id: this.statusCreationId,
        };
        let response = await this.updateInternationalData(data);
        if (response && response.status === 200) {
          let info = "International status updated successfully";
          this.commonToast("success", "Success", info);

          this.internationalDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in updating the international status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editRapidoStatusData() {
      try {
        const data = {
          status_updates: this.state.statusList[0] || {},
          id: this.statusCreationId,
        };
        let response = await this.updateRapidoData(data);
        if (response && response.status === 200) {
          let info = "Rapido status updated successfully";
          this.commonToast("success", "Success", info);

          this.rapidoDataFetch(this.selectedTab);
        } else {
          let info =
            response.data.message ||
            "There was an error in updating the rapido status, try again!";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    addItem() {
      let data = {
        status_name: "",
        status: "Active",
      };
      this.state.statusList.push(data);
    },
    removeItem(index) {
      this.state.statusList.splice(index, 1);
    },
    commonToast(severity, summary, message) {
      this.isSupervisorAssign = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    loadInitialData() {
      if (Object.keys(this.statusFormData).length != 0) {
        this.state.statusList = [];
        let statusFormData = {
          status_name: this.statusFormData.status_name,
          status: this.statusFormData.status,
        };
        this.statusCreationId = this.statusFormData.id;
        this.state.statusList.push(statusFormData);
      } else {
        this.statusCreationId = null;
      }
    },
  },
  created() {
    this.loadInitialData();
  },
  computed: {
    ...mapGetters({
      statusFormData: "operationsStatusSettings/getEditStatusData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.required {
  color: $color-7a7a7a !important;
}
.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.add-item,
.add-item > i {
  color: #1e90ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.add-item > i {
  font-size: 10px !important;
}
.custom-modal-height {
  height: 40vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 23px;
  right: 0;
}
.scollable-body {
  height: 34vh;
  overflow: auto;
}
::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
}
.supervisor-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
.p-dropdown {
  width: auto;
  height: 32px;
}
</style>
