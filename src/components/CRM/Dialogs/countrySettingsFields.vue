<template>
  <div class="scollable-body">
    <div class="flex flex-row">
      <div class="mr-4">
        <h5 class="required dialog-label-text">Country Code</h5>
        <Dropdown
          v-model="countriesData.countryCodeList"
          :options="getCountryCodeList"
          optionLabel="country_iso_code"
          placeholder="Select Country Code"
          class="w-15rem"
          :filter="true"
        />
      </div>
      <div>
        <h5 class="required dialog-label-text">Country Name</h5>
        <Dropdown
          v-model="countriesData.countryName"
          :options="getCountryCodeList"
          optionLabel="country_name"
          placeholder=""
          class="w-17rem"
          :filter="true"
        />
      </div>
    </div>
    <div class="flex-column">
      <div class="field mb-0 p-fluid mt-2">
        <h5 class="required dialog-label-text">Add States</h5>
        <Chips v-model="countriesData.countryStateName" />
        <div class="field col-12 p-fluid"></div>
      </div>
      <div class="field mb-0 p-fluid mt-2">
        <h5 class="dialog-label-text">Prohibited Items</h5>
        <Chips v-model="countriesData.prohibitedItems" />
        <div class="field col-12 p-fluid"></div>
      </div>
    </div>
    <div class="flex flex-row ml-2">
      <div class="flex align-items-center font-bold border-round">
        <Checkbox v-model="countriesData.postalCode" :binary="true" />
        <h6 class="pl-2 mt-2 font-size-12 bold-600 color-1e90ff">
          Postal Code Mandatory
        </h6>
      </div>
      <div class="flex align-items-center font-bold border-round ml-2">
        <Checkbox v-model="countriesData.stateMandatory" :binary="true" />
        <h6 class="pl-2 mt-2 font-size-12 bold-600 color-1e90ff">
          State Mandatory
        </h6>
      </div>
      <div class="field flex align-items-end" v-if="!updateBtn">
        <span
          class="remove-item cursor-pointer"
          @click="removeItem(countrySettingsObj.id)"
          ><i class="pi pi-times"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Chips from "primevue/chips";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Chip from "primevue/chip";

export default {
  name: "countryDialog",
  components: { Checkbox, Chips, Dropdown },
  props: ["countrySettingsObj", "editCountryValue"],
  data() {
    return {
      submitted: false,
      selectedJobType: {},
      newVall: null,
      destination_name: [],
      idCountry: null,
      countryValue: null,
      countriesData: {
        countryCodeList: null,
        countryName: null,
        countryStateName: null,
        stateId: null,
        prohibitedItems: null,
        stateMandatory: false,
        postalCode: false,
      },
    };
  },

  methods: {
    ...mapActions({
      getCountriesDropDownList: "CrmSettings/getCountriesDropDownList",
      createNewCountrySettingsData: "CrmSettings/createNewCountrySettingsData",
      getCountriesNameListId: "CrmSettings/getCountriesNameListId",
      getCoutriesStateData: "CrmSettings/getCoutriesStateData",
      updateCountryState: "CRMSettings/updateCountryState",
    }),
    removeItem(id) {
      this.$emit("deleteTheCountry", id);
    },
    deleteCountry(item) {
      this.countriesData.countryStateName =
        this.countriesData.countryStateName.filter(
          (x) => x.idCountry !== item.idCountry
        );
    },
    countryDataEmit() {
      let value = this.countriesData;
      this.$emit("saveCountryData", value);
      if (this.updateBtn === false) {
        this.countriesData.prohibitedItems = null;
        this.countriesData.countryStateName = null;
        this.countriesData.stateMandatory = false;
        this.countriesData.postalCode = false;
      }
    },
    emitCountryData() {
      if (this.updateBtn === true) {
        const countryId = this.editCountryValue.country_id;
        this.countriesData.countryCodeList = this.countryValue;
        this.countriesData.stateMandatory =
          this.editCountryValue.state_mandatory;
        this.countriesData.postalCode =
          this.editCountryValue.postal_code_mandatory;
        this.countriesData.countryCodeList = this.getCountryCodeList.find(
          (x) => x.id === countryId
        );
      }
    },
  },
  watch: {
    "countriesData.countryCodeList": async function (newVal, oldVal) {
      this.newVall = newVal;
      this.countriesData.countryName = this.newVall;
      this.selectedJobType = { ...newVal };
    },
    "countriesData.countryName": async function (newVal, oldVal) {
      this.countriesData.countryCodeList = newVal;
    },
    getStateList: async function (newVal, oldVal) {
      this.countriesData.countryStateName = this.getStateList.map((c) => {
        return c.state;
      });
    },
    getCountryProhibitedValue: async function (newVal, oldVal) {
      this.countriesData.prohibitedItems = this.getCountryProhibitedValue.map(
        (c) => {
          return c.item;
        }
      );
    },
  },
  async mounted() {
    await this.getCountriesDropDownList();
    this.countriesData.countryCodeList = this.getCountryCodeList
      ? this.getCountryCodeList[0]
      : null;
    this.emitCountryData();
    this.countryDataEmit();
  },
  computed: {
    ...mapGetters({
      getCountryCodeList: "CrmSettings/getCountryCodeList",
      getCountryNameList: "CrmSettings/getCountryNameList",
      getStateList: "CrmSettings/getStateList",
      getCountryProhibitedValue: "CrmSettings/getCountryProhibitedValue",
      updateBtn: "CrmSettings/updateBtn",
    }),
  },
  unmounted() {},
  async created() {
    if (this.updateBtn === true) {
      let data = this.editCountryValue;
      this.getCoutriesStateData(data);
    }
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

::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 74vh;
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
  height: 54vh !important;
  overflow: auto;
}

::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 17px;
  align-items: center;
  margin-left: 20px;
}

::v-deep .p-chip {
  background: rgba(126, 132, 167, 1);
  border-radius: 2px;
  color: white;
}
::v-deep .p-chips .p-chips-multiple-container .p-chips-token {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 4px;
}
</style>
