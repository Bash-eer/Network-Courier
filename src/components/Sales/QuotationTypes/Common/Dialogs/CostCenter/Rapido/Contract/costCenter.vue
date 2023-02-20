<template>
  <div class="mt-5">
    <div class="title font-size-14 color-343434 bold-700">Cost Center</div>
    <div class="input-wrapper col pl-0">
      <div
        class="
          required
          color-7a7a7a
          bold-500
          font-size-14
          flex
          align-items-start
          mb-2
        "
      >
        Cost Center Name
      </div>
      <TextField
        label="min_weight"
        mode="decimal"
        class="ml-1 pb-1"
        v-on:childToParent="getUserInput"
        v-model="formData.cost_center_name"
        :value="formData.cost_center_name"
        :classes="{
          'p-invalid': v$.formData.cost_center_name.$invalid && !isValid,
        }"
      />
    </div>
    <AddressArea
      :key="renderKey"
      :default="formData"
      :submitted="!isValid"
      @getAddress="setAddress"
    />
    <!-- <div class="input-wrapper col pl-0">
      <div
        class="
          required
          color-7a7a7a
          bold-500
          font-size-14
          flex
          align-items-start
          mb-2
        "
      >
        Address
      </div>
      <TextField
        label="min_weight"
        mode="decimal"
        v-on:childToParent="getUserInput"
        v-model="formData.address"
        :classes="{
          'p-invalid': v$.formData.address.$invalid && !isValid,
        }"
      />
    </div> -->

    <!-- <div class="flex align-items-center">
      <div class="input-wrapper col pl-0">
        <div
          class="
            required
            color-7a7a7a
            bold-500
            font-size-14
            flex
            align-items-start
            mb-2
          "
        >
          Postal Code
        </div>
        <TextField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.postal_code"
          :classes="{
            'p-invalid': v$.formData.postal_code.$invalid && !isValid,
          }"
        />
      </div>
      <div :key="renderKey" class="input-wrapper col">
        <div
          class="
            required
            color-7a7a7a
            bold-500
            font-size-14
            flex
            align-items-start
            mb-2
          "
        >
          Country
        </div>
        <DropDown
          :data="allCountries"
          :state="formData.country"
          :filter="true"
          label="country"
          id="country"
          code="name"
          modelValue="isoCode"
          v-on:childToParent="getUserInput"
          v-model="formData.country"
          @blur="v$.formData.country.$model;"
          :classes="{
            'p-invalid': v$.formData.country.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div :key="renderKey" class="input-wrapper col">
        <div
          class="color-7a7a7a bold-500 font-size-14 flex align-items-start mb-2"
        >
          State
        </div>
        <DropDown
          :data="states"
          :state="formData.state"
          :filter="true"
          label="state"
          id="state"
          code="name"
          v-on:childToParent="getUserInput"
          v-model="formData.state"
          :value="formData.state"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div> -->

    <!-- <div class="flex align-items-center">
      <div class="input-wrapper col pl-0">
        <div
          class="color-7a7a7a bold-500 font-size-14 flex align-items-start mb-2"
        >
          Building Name
        </div>
        <TextField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.building_name"
          :classes="{}"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a bold-500 font-size-14 flex align-items-start mb-2"
        >
          Floor No
        </div>
        <TextField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.floor_no"
          :classes="{}"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a bold-500 font-size-14 flex align-items-start mb-2"
        >
          Unit No
        </div>
        <TextField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.unit_no"
          :classes="{}"
        />
      </div>
    </div> -->

    <div class="mt-3" v-for="(data, idx) of rowData" :key="data">
      <p
        class="
          color-7a7a7a
          bold-700
          font-size-12
          color-4e5868
          flex
          align-items-start
          mb-2
        "
      >
        contact
      </p>
      <Contact
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        :stepKey="stepKey"
        :profileDetails="profileDetails && profileDetails.company_contacts[idx]"
      />
    </div>

    <div @click="addRow" class="flex mb-2">
      <span class="new-field mt-0 color-3057ff"><b>+ Add Contact</b></span>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Contact from "./Components/contact.vue";
import { mapActions, mapGetters } from "vuex";
import { Country, State } from "country-state-city";

export default {
  components: { Contact },
  data() {
    return {
      renderKey: 10,
      statesWatcher: null,
      allCountries: Country.getAllCountries(),
      allStates: State.getAllStates(),
      states: null,
      cities: null,
      CountryCode: null,
      StateCode: null,
      rowData: [{ id: 1, valid: false }],
      isValid: true,
      profileDetails: null,
      isContactValid: false,
      formData: {
        cost_center_name: "",
        address: "",
        postal_code: "",
        country: "",
        state: "",
        floor_no: "",
        building_name: "",
        unit_no: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        cost_center_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  watch: {
    costCenterDataById() {
      this.prefillData();
    },
    btnKey() {
      if (this.v$.$invalid || !this.isContactValid) {
        this.isValid = false;
      }
      if (!this.v$.$invalid && this.isContactValid) {
        this.isValid = true;
      }
    },
    "formData.country": function () {
      if (this.formData.country != null) {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.formData.country
        );
        //needed
        //this.countryFunction(respectiveData.isoCode);
      }
      this.getUserInput();
    },
    "formData.state": function () {
      this.getUserInput();
    },

    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
  },
  computed: {
    ...mapGetters({
      costCenterDataById: "salesRapidoContract/Contract/costCenterDataById",
      btnKey: "salesRapidoContract/Contract/btnKey",
    }),
  },
  methods: {
    ...mapActions({
      setCostCenterData: "salesRapidoContract/Contract/setCostCenterData",
      updateValid: "salesRapidoContract/Contract/updateValid",
    }),
    setAddress(e) {
      (this.formData = {
        ...this.formData,
        ...e,
      })
    },
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeContacts(id);
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidForm = this.rowData.find((list) => list.valid === false);
      if (invalidForm) {
        this.isContactValid = false;
      } else {
        this.isContactValid = true;
      }

      if (this.v$.$invalid || !this.isContactValid) {
        this.updateValid({ type: "isCostCenterValid", payload: false });
      }
      if (!this.v$.$invalid && this.isContactValid) {
        this.updateValid({ type: "isCostCenterValid", payload: true });
      }
    },
    getUserInput() {
      this.setCostCenterData({ value: this.formData });

      if (this.v$.$invalid || !this.isContactValid) {
        this.updateValid({ type: "isCostCenterValid", payload: false });
      }
      if (!this.v$.$invalid && this.isContactValid) {
        this.updateValid({ type: "isCostCenterValid", payload: true });
      }
    },
    countryFunction(countryCode) {
      this.states = [];
      for (var state of this.allStates) {
        if (state.countryCode == countryCode) {
          this.states.push(state);
        }
      }
      if (this.states.length == 0) {
        this.states.push({ name: "none", isoCode: "NAN" });
      }
    },
    filterStatesByCountryName(country) {
      for (let c in this.allCountries) {
        if (this.allCountries[c].name == country) {
          this.statesWatcher = this.allCountries[c]["isoCode"];
        }
      }
    },
    prefillData() {
      if (this.costCenterDataById) {
        this.profileDetails = {};
        this.formData.cost_center_name =
          this.costCenterDataById.cost_center_name;
        this.formData.address = this.costCenterDataById.address;
        this.formData.postal_code = this.costCenterDataById.postal_code;
        this.formData.country = this.costCenterDataById.country;
        this.formData.state = this.costCenterDataById.state;
        this.formData.floor_no = this.costCenterDataById.floor_no;
        this.formData.building_name = this.costCenterDataById.building_name;
        this.formData.unit_no = this.costCenterDataById.unit_no;

        this.profileDetails["company_contacts"] =
          this.costCenterDataById.cost_center_contacts;

        if (
          this.costCenterDataById &&
          this.costCenterDataById?.cost_center_contacts.length
        ) {
          this.rowData = [];
        }

        this.costCenterDataById?.cost_center_contacts.map((list, idx) => {
          this.rowData.push({ id: idx + 1, valid: false });
        });

        this.renderKey++;
      }
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style></style>