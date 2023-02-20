<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <h6>Job Type</h6>
        <AddDropDown
          stateName="JobTypeDropDownList"
          :data="$store.state.CrmSettings.jobTypeDropDownList"
          :companyDetails="getJobTypeList"
          @name="emitdata"
          storePath="internationalInbound"
          v-model="jobTypeValue"
          type="jobType"
          class="text-left w-25rem"
        />
      </div>
      <h6 class="mt-4">Add Document Detail</h6>
      <div v-for="(data, index) in documentDetailData" :key="index">
        <div
          class="bg-e1ecff w-100 mt-2"
          v-bind:class="{
            'col-12 md:col-6': documentDetailData.length - 1 == index,
            'col-12 md:col-5': documentDetailData.length - 1 != index,
          }"
        >
          <div class="flex p-2">
            <div class="flex-row w-20rem mr-2">
              <div class="font-size-14 p-2 pl-0">Document Details</div>
              <TextField
                label="customer_contact"
                type="text"
                v-model="data.DocumentDetailsValue"
              />
            </div>
            <div class="flex-row w-20rem mr-2">
              <div class="font-size-14 p-2 pl-0">Delivery Document</div>
              <TextField
                label="customer_contact"
                type="text"
                v-model="data.deliveryDocumentValue"
              />
            </div>
            <div class="flex-row w-20rem">
              <div class="font-size-14 p-2 pl-0">Return Document</div>
              <TextField
                label="customer_contact"
                type="text"
                v-model="data.returnDocumentValue"
              />
            </div>
          </div>
          <div class="flex flex-row">
            <div class="w-25rem m-2">
              <div class="font-size-14 p-2 pl-0">Remarks</div>
              <Textarea v-model="data.remarks" rows="1" cols="30" />
            </div>
            <div
              class="flex align-items-center font-bold border-round p-2 mt-4"
            >
              <Checkbox
                v-model="data.returnTripCharge"
                :binary="true"
                :aria-disabled="true"
              />
              <h6 class="pl-2 font-size-14 bold-600 color-1e90ff">
                Return Trip Charge
              </h6>
            </div>
            <div
              class="flex align-items-center font-bold border-round p-2 mt-4"
            >
              <Checkbox
                v-model="data.headOfficeCharge"
                :binary="true"
                :aria-disabled="true"
              />
              <h6 class="pl-2 font-size-14 bold-600 color-1e90ff">
                Head Office Charge
              </h6>
            </div>
            <div
              class="field flex align-items-end pt-6"
              v-if="documentDetailData.length - 1 != index"
            >
              <span
                class="remove-item cursor-pointer"
                @click="removeItem(index)"
                ><i class="pi pi-times"></i
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!updateBtn">
        <span class="add-item pl-2 mt-2" @click="addItem()">
          <i class="pi pi-plus"></i> Add New Document Detail</span
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
          v-if="!updateBtn"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isFeedbackSettingCreation"
          v-if="!updateBtn"
        />
        <Buttons
          label="Update"
          button_class="dialog-button-text"
          v-on:childToParent="updateData"
          :loading="isFeedbackSettingCreation"
          v-if="updateBtn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import AddDropDown from "../../../components/Reusables/CRM/AddDropDown.vue";
import { errhandler } from "@/services/httpClient";

export default {
  name: "DocumentDetailDialog",
  components: { Textarea, Checkbox, AddDropDown },
  props: ["emittedJobTypeData"],
  data() {
    return {
      submitted: false,
      details: { clearance_mode_name: " " },
      jobTypeValue: "",
      jobTypeSelected: null,
      jobId: null,
      documentDetailData: [
        {
          DocumentDetailsValue: null,
          deliveryDocumentValue: null,
          returnDocumentValue: null,
          remarks: null,
          returnTripCharge: false,
          headOfficeCharge: false,
        },
      ],
    };
  },

  methods: {
    ...mapActions({
      showDocumentDetailSettingsDialog:
        "CrmSettings/showDocumentDetailSettingsDialog",
      getJobTypeDropDownList: "CrmSettings/getJobTypeDropDownList",
      createNewDocumentDetail: "CrmSettings/createNewDocumentDetail",
      createNewJobType: "CrmSettings/createNewJobType",
      getDocumentDetailSettingsData:
        "CrmSettings/getDocumentDetailSettingsData",
      updateDocumentIdSettings: "CrmSettings/updateDocumentIdSettings",
      getOnRowSelectData: "CrmSettings/getOnRowSelectData",
      updateBtnData: "CrmSettings/updateBtnData",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showDocumentDetailSettingsDialog(dialogData);
    },

    emitdata(value) {
      this.jobId = value;
    },
    updateData() {
      let updatedPayload = {
        id: this.emittedJobTypeData.id,
        document_details: this.documentDetailData[0].DocumentDetailsValue,
        delivery_document: this.documentDetailData[0].deliveryDocumentValue,
        return_document: this.documentDetailData[0].returnDocumentValue,
        remarks: this.documentDetailData[0].remarks,
        return_trip_charge: this.documentDetailData[0].returnTripCharge,
        head_office_charge: this.documentDetailData[0].headOfficeCharge,
      };
      this.updateDocumentIdSettings(updatedPayload).then(async (c) => {
        if (c.data.status == 200) {
          let data = this.onRowSelectInDataTableId;
          await this.getOnRowSelectData(data);
          let info = "Document Detail updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to update Document detail";
          this.commonToast("error", "Error", info);
        }
      });
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showDocumentDetailSettingsDialog(dialogData);
    },
    async addDocumentDetailData() {
      try {
        let response = await this.getDocumentDetailSettingsData();
        if (response.data.status === 200) {
          let info = "Document Detail Created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to create Document Detail";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to create Document Detail";
        this.commonToast("error", "Error", info);
      }
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
    addItem() {
      let data = {};
      this.documentDetailData.push(data);
    },
    removeItem(index) {
      this.documentDetailData.splice(index, 1);
    },
    submitData() {
      let payload = this.documentDetailData.map((person) => {
        return {
          document_details: person.DocumentDetailsValue,
          delivery_document: person.deliveryDocumentValue,
          return_document: person.returnDocumentValue,
          remarks: person.remarks,
          return_trip_charge: person.returnTripCharge,
          head_office_charge: person.headOfficeCharge,
        };
      });
      let updatedPayload = {
        id: this.jobId.id,
        details: payload,
      };
      this.createNewDocumentDetail(updatedPayload).then(async (c) => {
        if (c.data.status == 200) {
          await this.getDocumentDetailSettingsData();
          this.addDocumentDetailData();
        }
      });
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showDocumentDetailSettingsDialog(dialogData);
      this.submitted = true;
    },
    value() {
      (this.documentDetailData[0].DocumentDetailsValue = this.emittedJobTypeData
        ? this.emittedJobTypeData.document_details
        : null),
        (this.documentDetailData[0].deliveryDocumentValue = this
          .emittedJobTypeData
          ? this.emittedJobTypeData.delivery_document
          : null),
        (this.documentDetailData[0].returnDocumentValue = this
          .emittedJobTypeData
          ? this.emittedJobTypeData.return_document
          : null),
        (this.documentDetailData[0].remarks = this.emittedJobTypeData
          ? this.emittedJobTypeData.remarks
          : null),
        (this.documentDetailData[0].returnTripCharge = this.emittedJobTypeData
          ? this.emittedJobTypeData.return_trip_charge
          : false),
        (this.documentDetailData[0].headOfficeCharge = this.emittedJobTypeData
          ? this.emittedJobTypeData.head_office_charge
          : false);
    },
  },
  watch: {},
  mounted() {
    this.jobTypeValue = this.getJobTypeList ? this.getJobTypeList[0] : null;
    if (this.updateBtn == true) {
      this.jobTypeValue = this.getJobTypeList.find(
        (x) => x.id === this.getSelectedJobType.id
      );
    }
  },
  computed: {
    ...mapGetters({
      getJobTypeList: "CrmSettings/getJobTypeList",
      getJobType: "CrmSettings/getJobType",
      onRowSelectInDataTableId: "CrmSettings/onRowSelectInDataTableId",
      updateBtn: "CrmSettings/updateBtn",
      getSelectedJobType: "CrmSettings/getSelectedJobType",
    }),
  },
  unmounted() {
    this.updateBtnData(false);
  },
  async created() {
    await this.getJobTypeDropDownList();
    this.value();
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

::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 50vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 42vh;
  overflow: auto;
}

::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 27px;
  align-items: center;
  margin-left: 20px;
}
</style>
