<template>
  <div class="flex align-items-center" :key="renderKey">
    <Dropdown
      v-model="selectedCity"
      :options="dropDownData"
      :state="selectedCity"
      optionLabel="caller_name"
      optionValue="id"
      optionGroupLabel="name"
      optionGroupChildren="items"
      :showClear="false"
      :filter="true"
      class="dropdown_color profile-drop-down"
      :placeholder="
        gerCrmBookingData.caller_details == null
          ? 'Caller Person'
          : gerCrmBookingData?.caller_details?.caller_name
      "
    >
      <template #optiongroup>
        <div class="flex flex-row align-items-center addNewRecipientsDiv">
          <div class="flex recipientNames">
            <span class="addNewRecipientText" @click="Add">Add New +</span>
          </div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex flex-row align-items-center justify-content-between">
          <div class="flex fieldNames">{{ slotProps.option.caller_name }}</div>
          <div
            v-if="slotProps.option.id"
            class="flex delete col-1 md:col-1 mt-2"
            @click="removeOption(slotProps.option.code, slotProps.option.id)"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
      </template>
    </Dropdown>
    <div @click="Edit" class="icon cursor-pointer">
      <i class="pi pi-user-edit"></i>
    </div>
  </div>
  <Dialog
    v-model:visible="display"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '40vw' }"
  >
    <template #header>
      <h5 class="bold-700 font-size-16">CRM Caller Data</h5>
    </template>
    <div class="flex justify-content-between">
      <div>
        <h6 class="color-7a7a7a bold-600 required">Name:</h6>
        <InputText
          type="text"
          v-model="details.name"
          :class="{
            'p-invalid': v$.details.name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div>
        <h6 class="color-7a7a7a bold-600 required">Contact No:</h6>
        <InputText
          type="text"
          v-model="details.contact_no"
          :class="{
            'p-invalid': v$.details.contact_no.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="mt-2">
      <h6 class="color-7a7a7a bold-600 required">Email ID:</h6>
      <TextField
        type="text"
        id="Email ID"
        label="Email ID"
        v-model="details.email_id"
        :classes="{
          'p-invalid': v$.details.email_id.$invalid && submitted,
          'dialog-label-text dialog-field-text': true,
        }"
      />
    </div>
    <template #footer>
      <Buttons
        v-if="!updateBtn"
        label="Cancel"
        button_class="buttonClass-customer-launch "
        @click="clickedCancel"
      />
      <Buttons
        v-if="updateBtn"
        label="Update"
        button_class="dialog-button-text"
        @click="updateValue"
      />
      <Buttons
        v-else
        label="Save"
        button_class="dialog-button-text"
        @click="saveValue"
      />
    </template>
  </Dialog>
</template>
<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  components: {
    Dropdown,
    Dialog,
    InputText,
  },
  props: ["emittedManual"],
  data() {
    return {
      v$: useVuelidate(),
      details: {
        newRecipient: "",
        name: "",
        contact_no: "",
        email_id: "",
      },
      displayTwo: false,
      display: false,
      object: null,
      selectedCity: null,
      updateBtn: false,
      // DropdownData: [],
      dropDownData: [],
      items: [],
      renderKey: 1,
      image: null,
      displayButton: false,

      ID: null,
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        name: { required },
        contact_no: { required },
        email_id: { required, email },
      },
    };
  },
  methods: {
    ...mapActions({
      getCrmCollerDropDown: "CustomerLaunchStore/getCrmCollerDropDown",
      patchCrmCollerData: "CustomerLaunchStore/patchCrmCollerData",
      deleteCaller: "CustomerLaunchStore/deleteCallerData",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      postdropdowncoller: "CustomerLaunchStore/postdropdowncoller",
      patchdropdowncoller: "CustomerLaunchStore/patchdropdowncoller",
      //mass collection
      patchCrmBookingDetailsMassCollection:
        "Masscollection/patchCrmBookingDetails",
      getCrmBookingDetailsMassCollection: "Masscollection/getCrmBookingDetails",
    }),
    Add() {
      this.display = true;
      this.details.name = null;
      this.details.email_id = null;
      this.details.contact_no = null;
      this.updateBtn = false;
      this.renderKey++;
    },
    async removeOption(e, id) {
      this.$confirm.require({
        message: "Are you sure you want to Delete the caller data?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteCaller(id).then((c) => {
            if (
              this.$route.name == "massCollectionContract" &&
              this.getCrmBookingData?.id
            ) {
              this.getCallerData(this.getCrmBookingData);
            } else if (this.gerCrmBookingData?.id) {
              this.getCallerData(this.gerCrmBookingData);
            }
          });
        },
      });
    },
    closeAddNew() {
      this.display = false;
      this.stopPropagation();
    },
    addNew(event) {
      this.displayTwo = true;
      this.events = event;
      this.stopPropagation();
    },
    stopPropagation() {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    },
    async Edit() {
      if (
        this.$route.name == "massCollectionContract" &&
        this.getCrmBookingData?.caller_details
      ) {
        this.details.name = this.getCrmBookingData?.caller_details
          ? this.getCrmBookingData?.caller_details?.caller_name
          : "";
        this.details.contact_no = this.getCrmBookingData?.caller_details
          ? this.getCrmBookingData?.caller_details?.contact_number
          : "";
        this.details.email_id = this.getCrmBookingData?.caller_details
          ? this.getCrmBookingData?.caller_details?.email
          : "";
      } else if (this.gerCrmBookingData.caller_id) {
        this.details.name = this.gerCrmBookingData.caller_name
          ? this.gerCrmBookingData.caller_name
          : "";
        this.details.contact_no = this.gerCrmBookingData.contact_number
          ? this.gerCrmBookingData.contact_number
          : "";
        this.details.email_id = this.gerCrmBookingData.email
          ? this.gerCrmBookingData.email
          : "";
      }
      if (this.details.name) {
        this.updateBtn = true;
        this.display = true;
      }
      // this.renderKey++;
    },
    clickedCancel() {
      this.display = false;
    },
    async updateValue() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.display = false;
        let type_p = this.$route.params.type;
        let data;
        let sales_contract_profile_id;
        if (
          this.$route.name == "massCollectionContract" &&
          this.getCrmBookingData?.id
        ) {
          sales_contract_profile_id = this.getCrmBookingData?.contract_id
            ? this.getCrmBookingData?.contract_id
            : this.getCrmBookingData?.profile_id;
        } else {
          sales_contract_profile_id =
            this.$route.params.type == "Contract"
              ? this.gerCrmBookingData?.contract_id
              : this.gerCrmBookingData?.profile_id;
        }
        data = {
          id: this.selectedCity,
          caller_name: this.details.name,
          contact_number: this.details.contact_no,
          email: this.details.email_id,
        };
        if (this.$route.params.type == "Contract") {
          data["sales_contract_profile_id"] = sales_contract_profile_id;
        } else {
          data["profile_id"] = sales_contract_profile_id;
        }
        let response = await this.patchdropdowncoller(data);
        if (response.status == 200) {
          if (
            this.$route.name == "massCollectionContract" &&
            this.getCrmBookingData?.id
          ) {
            this.getCallerData(this.getCrmBookingData);
            this.getCrmBookingDetailsMassCollection(this.getCrmBookingData?.id);
          } else if (this.gerCrmBookingData?.id) {
            await this.getCallerData(this.gerCrmBookingData);
            await this.getUpdateDatas();
          }
        }
      }
    },
    async saveValue() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }

      if (!this.v$.$invalid) {
        let type_p = this.$route.params.type;
        this.display = false;
        let data;
        let sales_contract_profile_id;
        if (
          this.$route.name == "massCollectionContract" &&
          this.getCrmBookingData?.id
        ) {
          sales_contract_profile_id = this.getCrmBookingData?.contract_id
            ? this.getCrmBookingData?.contract_id
            : this.getCrmBookingData?.profile_id;
        } else {
          sales_contract_profile_id = this.gerCrmBookingData?.contract_id
            ? this.gerCrmBookingData?.contract_id
            : this.gerCrmBookingData?.profile_id;
        }
        data = {
          contract_id: sales_contract_profile_id,
          caller_name: this.details.name,
          contact_number: this.details.contact_no,
          email: this.details.email_id,
        };
        if (this.$route.params.type == "Contract") {
          data["sales_contract_profile_id"] = sales_contract_profile_id;
        } else {
          data["profile_id"] = sales_contract_profile_id;
        }

        let response = await this.postdropdowncoller(data);
        if (response.status == 200) {
          this.details.name = null;
          this.details.email_id = null;
          this.details.contact_no = null;
          if (
            this.$route.name == "massCollectionContract" &&
            this.getCrmBookingData?.id
          ) {
            this.getCallerData(this.getCrmBookingData);
          } else if (this.gerCrmBookingData?.id) {
            this.getCallerData(this.gerCrmBookingData);
          }
        }
      }
    },
    async getCallerData(data) {
      let type = this.$route.params.type;
      let id =
        this.$route.params.type == "Contract"
          ? data?.contract_id
          : data?.profile_id;
      await this.getCrmCollerDropDown({ type, id });
    },
    async getUpdateDatas() {
      this.getCrmCollerDropDownList?.map((i, index) => {
        if (this.selectedCity == i.id) {
          this.image = i.image_url;
          this.ID = i.id;
          // this.getCrmCollerDropDownList[i].name =
          //   this.getCrmCollerDropDownList[i].caller_name;
          // this.getCrmCollerDropDownList[i].code = index;
        }
      });
      this.dropDownData = [];
      this.dropDownData[0] = {};
      this.dropDownData[0].code = "HI";
      this.dropDownData[0].name = "Add New";
      this.dropDownData[0].items = this.getCrmCollerDropDownList
        ? this.getCrmCollerDropDownList
        : [];
      let obj = { ...this.gerCrmBookingData };
      let data = {
        ...this.gerCrmBookingData,
        id: this.gerCrmBookingData.id,
        caller_id: this.selectedCity ? this.selectedCity : 0,
      };

      if (
        this.$route.name == "massCollectionContract" &&
        this.getCrmBookingData?.id &&
        this.selectedCity
      ) {
        let obj = this.getCrmBookingData;
        let idValue = obj.id;
        let dataMassCollect = {
          id: idValue,
          caller_id: this.selectedCity,
        };
        this.patchCrmBookingDetailsMassCollection(dataMassCollect);
      } else if (this.gerCrmBookingData?.id) {
        let idValue = obj.id;
        // if (data.job_type) {
        await this.patchCrmCollerData(data);
        // }
        await this.getCrmBookingDetails(idValue);
      }
    },
    async checkandUpdate() {
      let data = {
        ...this.gerCrmBookingData,
        id: this.gerCrmBookingData.id,
        caller_id: this.selectedCity,
      };
      await this.patchCrmCollerData(data);
      // }
      await this.getCrmBookingDetails(data.id);
    },
  },
  async created() {
    // let type_p=this.$route.params.type
    //   await this.getCrmCollerDropDown({type:type_p,id:type_p=="Adhoc"?this.getCrmBookingData?.profile_id:this.getCrmBookingData?.contract_id});
    if (
      this.$route.name == "massCollectionContract" &&
      this.getCrmBookingData?.id
    ) {
      this.getCallerData(this.getCrmBookingData);
      this.selectedCity = this.getCrmBookingData?.caller_id;
    } else {
      this.selectedCity = this.gerCrmBookingData?.caller_id;
      this.getCallerData(this.gerCrmBookingData);
    }
  },

  computed: {
    ...mapGetters({
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
      getCrmCollerDropDownList: "CustomerLaunchStore/getCrmCollerDropDownList",
      getCrmBookingData: "Masscollection/getCrmBookingData",
    }),
  },
  watch: {
    getCrmCollerDropDownList: {
      async handler() {
        this.dropDownData[0] = {};
        this.dropDownData[0].items = this.getCrmCollerDropDownList;
        if (
          this.getCrmCollerDropDownList &&
          this.getCrmCollerDropDownList.length != 0
        ) {
          this.selectedCity = this.getCrmCollerDropDownList[0]?.id;
          let obj = { ...this.gerCrmBookingData };
          let data = {
            ...this.gerCrmBookingData,
            id: this.gerCrmBookingData.id,
            caller_id: this.selectedCity,
          };
          await this.patchCrmCollerData(data);
          await this.getCrmBookingDetails(data.id);

          this.object = this.getCrmCollerDropDownList?.reduce((obj, item) =>
            Object.assign(obj, { [item.key]: item.value })
          );
        } else {
          this.selectedCity = null;
        }

        this.renderKey++;
      },
      deep: true,
    },
    selectedCity: {
      handler: function (newValue, oldVal) {
        this.getUpdateDatas();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  background-color: red;
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  color: white !important;
}
::v-deep .p-dropdown .p-dropdown-label {
  background-color: linear-gradient(
    180deg,
    #357dea 0%,
    #0347ae 100%
  ) !important;
  color: white !important;
}
.p-dropdown .p-dropdown-trigger {
  background-color: linear-gradient(
    180deg,
    #357dea 0%,
    #0347ae 100%
  ) !important;
}
.addNewFieldtText {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #357dea;
}
.p-dropdown {
  margin-right: 100px;
  border: none;
  background: repeat;
}
.pi {
  color: white !important;
}
.icon {
  margin-left: -90px !important;
  margin-right: 100px !important;
  display: flex;
  align-items: center;
}
::v-deep .dropdown_color {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  background-color: linear-gradient(
    180deg,
    #357dea 0%,
    #0347ae 100%
  ) !important;
  color: white !important;
  border: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  border: none !important;
}
::v-deep .p-dropdown .p-dropdown-trigger {
  color: white !important;
}

.dropDownPic {
  width: 34.14px;
  height: 34.14px;
  margin-right: 0.5rem;
}
.profile-drop-down {
  width: 210px !important;
}
.caller_person {
  padding-top: 21px;
}
</style>
