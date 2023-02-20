<template>
  <div class="custom-modal-height">
    <div class="scrollable-body">
      <div class="mt-2">
        <div v-for="item in countryArray" :key="item.id">
          <countrySettingsFields
            @deleteTheCountry="deleteCountrySettingsFunct"
            :countrySettingsObj="item"
            @saveCountryData="saveData"
            :volumentricValue="volumentricValue"
            @parcelTotalWeight="parcelTotalWeight"
            :editCountryValue="editCountryValue"
          />
        </div>
        <span
          class="add-item pl-2 mt-2 font-size-12"
          @click="addItem()"
          v-if="!updateBtn"
        >
          <i class="pi pi-plus"></i>Add States & Prohibited Items</span
        >
      </div>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import countrySettingsFields from "../../CRM/Dialogs/countrySettingsFields.vue";

export default {
  name: "countryDialog",
  components: { countrySettingsFields },
  props: ["emittedJobTypeData", "editCountryValue"],
  data() {
    return {
      submitted: false,
      jobTypeValue: "",
      jobTypeSelected: null,
      jobId: null,
      countryArray: [1],
      value1: [],
      countryState: null,
      stateData: null,
      itemData: null,
      countryCodeLis: null,
      countryCode: null,
      countryName: null,
      postalCode: null,
      stateMandatory: null,
    };
  },

  methods: {
    ...mapActions({
      getCountriesDropDownList: "CrmSettings/getCountriesDropDownList",
      createNewCountrySettingsData: "CrmSettings/createNewCountrySettingsData",
      getCountriesNameListId: "CrmSettings/getCountriesNameListId",
      getCountrySettingsData: "CrmSettings/getCountrySettingsData",
      updateCountrySettings: "CrmSettings/updateCountrySettings",
      updateCountryState: "CrmSettings/updateCountryState",
      showCountrySettingsDialog: "CrmSettings/showCountrySettingsDialog",
      updateBtnData: "CrmSettings/updateBtnData",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showCountrySettingsDialog(dialogData);
    },
    saveData(data) {
      this.value1.push(data);
    },
    updateData() {
      if (this.$store.state.CrmSettings.countriesAddData) {
        let state = this.value1.map((c) => {
          this.countryState = c.countryStateName.map((c) => {
            return { state: c };
          });
        });
        let statePayload = {
          id: this.editCountryValue.id,
          states: this.countryState,
        };
        this.updateCountryState(statePayload).then(async (c) => {
          if (c.status == 200) {
            await this.getCountrySettingsData();
            let info = "Country State Updated successfully";
            this.commonToast("success", "Success", info);
          } else {
            let info = "Failed to Update Country State";
            this.commonToast("error", "Error", info);
          }
        });
      } else {
        let data = this.value1.map((c) => {
          this.stateData = c.countryStateName.map((c) => {
            return { state: c };
          });
          this.itemData = c.prohibitedItems.map((c) => {
            return { item: c };
          });
          this.countryCodeList = c.countryCodeList.id;
          this.countryCode = c.countryCodeList.country_iso_code;
          this.countryName = c.countryName.country_name;
          this.postalCode = c.postalCode;
          this.stateMandatory = c.stateMandatory;
        });
        let payload = {
          id: this.editCountryValue.id,
          country_id: this.countryCodeList,
          country_iso_code: this.countryCode,
          country_name: this.countryName,
          postal_code_mandatory: this.postalCode,
          state_mandatory: this.stateMandatory,
          states: this.stateData,
          prohibited_items: this.itemData,
        };
        this.updateCountrySettings(payload).then(async (c) => {
          if (c.status == 200) {
            await this.getCountrySettingsData();
            let info = "Country Settings Updated successfully";
            this.commonToast("success", "Success", info);
          } else {
            let info = "Failed to Update Country Settings";
            this.commonToast("error", "Error", info);
          }
        });
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
    deleteCountrySettingsFunct(id) {
      const items = this.countryArray.filter((c) => c.id !== id);
      this.countryArray = [...items];
    },
    addItem() {
      const items = {};
      this.countryArray = [
        ...this.countryArray,
        { ...items, id: this.countryArray.length + 1 },
      ];
    },
    submitData() {
      let data = this.value1.map((c) => {
        let countryState = c.countryStateName.map((c) => {
          return { state: c };
        });
        let prohibitedItems = c.prohibitedItems.map((c) => {
          return { item: c };
        });
        return {
          country_id: c.countryCodeList.id,
          country_iso_code: c.countryCodeList.country_iso_code,
          country_name: c.countryName.country_name,
          postal_code_mandatory: c.postalCode,
          state_mandatory: c.stateMandatory,
          states: countryState,
          prohibited_items: prohibitedItems,
        };
      });
      let updatedPayload = {
        settings: data,
      };
      this.createNewCountrySettingsData(updatedPayload).then(async (c) => {
        if (c.status == 200) {
          await this.getCountrySettingsData();
          let info = "Country Settings Created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to Create Country Settings";
          this.commonToast("error", "Error", info);
        }
      });
      this.submitted = true;
    },
  },

  async mounted() {},
  computed: {
    ...mapGetters({
      getCountryCodeList: "CrmSettings/getCountryCodeList",
      updateBtn: "CrmSettings/updateBtn",
    }),
  },
  unmounted() {
    this.updateBtnData(false);
  },
  async created() {
    await this.getCountriesDropDownList();
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
  height: 64vh;
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
.scrollable-body {
  background-color: white;
  height: 74vh;
}

::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 17px;
  align-items: center;
  margin-left: 20px;
}
</style>
