<template>
  <div class="mt-5">
    <div class="title font-size-14 color-343434 bold-700">Pick Up Location</div>
    <div class="flex align-items-end">
      <div class="input-wrapper col mt-4 pl-0">
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
          Pick Up Location Name
        </div>
        <TextField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.location_name"
          :classes="{
            'p-invalid': v$.formData.location_name.$invalid && !isValid,
          }"
        />
      </div>
      <div
        @click="$emit('removeRow', rowId)"
        v-if="rowCount !== 1"
        class="pi pi-times pointer ml-3 mb-3"
      ></div>
    </div>
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
        Enter the Address
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
    </div>

    <div class="flex align-items-center">
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
      <div class="input-wrapper col">
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
      <div class="input-wrapper col">
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
    </div>

    <div class="flex align-items-center">
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
        />
      </div>
    </div>
    <div class="input-wrapper col pl-0">
      <div
        class="color-7a7a7a bold-500 font-size-14 flex align-items-start mb-2"
      >
        Location ID
      </div>
      <TextField
        label="min_weight"
        mode="decimal"
        v-on:childToParent="getUserInput"
        v-model="formData.location_id"
      />
    </div>
    <div class="flex align-items-center">
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
          Default
        </div>
        <DropDownField
          code="name"
          label="min_weight"
          :data="defaultOpts"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.default"
          :value="formData.default"
          :classes="{
            'p-invalid': v$.formData.default.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
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
          Default Pickup Mode
        </div>
        <DropDownField
          code="name"
          :data="defaultPickUpOpts"
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.default_pick_up"
          :value="formData.default_pick_up"
          :classes="{
            'p-invalid': v$.formData.default_pick_up.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
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
          Pickup Cutoff Time
        </div>
        <TimePicker24
          class="full-width"
          label="pickup_cutoff_time"
          v-model="formData.pickup_cutoff_time"
          v-on:childToParent="getUserInput"
          :state="formData.pickup_cutoff_time"
          hourFormat="24"
           :classes="{
            'p-invalid': v$.formData.pickup_cutoff_time.$invalid && !isValid,
          }"
        />
      </div>
    </div>
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
        Remarks
      </div>
      <TextAreaField
        label="min_weight"
        mode="decimal"
        v-on:childToParent="getUserInput"
        v-model="formData.remarks"
        :classes="{
          'p-invalid': v$.formData.remarks.$invalid && !isValid,
        }"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { Country, State } from "country-state-city";

export default {
  props: ["rowCount", "rowId", "type", "stepKey", "location"],
  data() {
    return {
      statesWatcher: null,
      allCountries: Country.getAllCountries(),
      allStates: State.getAllStates(),
      states: null,
      cities: null,
      CountryCode: null,
      StateCode: null,
      rowData: [{ id: 1, valid: false }],
      isValid: true,
      defaultOpts: [
        { name: "Yes", value: "Yes" },
        { name: "No", value: "No" },
      ],
      defaultPickUpOpts: [
        { name: "Bike", value: "Bike" },
        { name: "Van", value: "Van" },
        { name: "Rapido", value: "Rapido" },
      ],
      formData: {
        location_name: "",
        address: "",
        postal_code: "",
        country: "",
        state: "",
        floor_no: "",
        building_name: "",
        default: "",
        location_id: "",
        default_pick_up: "",
        pickup_cutoff_time: "",
        remarks: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        location_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
        state: { required },
        default: { required },
        default_pick_up: { required },
        pickup_cutoff_time: { required },
        remarks: { required },
      },
    };
  },
  watch: {
    btnKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
      if (!this.v$.$invalid) {
        this.isValid = true;
      }
    },
    "formData.country": function () {
      if (this.formData.country != null) {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.formData.country
        );
        console.log(respectiveData);
        this.countryFunction(respectiveData.isoCode);
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
      btnKey: "salesRapidoContract/Contract/btnKey",
    }),
  },
  methods: {
    ...mapActions({
      setCostCenterData: "salesRapidoContract/Contract/setCostCenterData",
    }),
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
    getUserInput() {
      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      this.setCostCenterData({
        key: "pick_up_locations",
        value: this.formData,
        idx: this.$props.rowId,
      });
    },
  },
  created() {
    if (this.$props.location) {
      this.formData.location_name = this.$props.location.location_name;
      this.formData.address = this.$props.location.address;
      this.formData.postal_code = this.$props.location.postal_code;
      this.formData.country = this.$props.location.country;
      this.formData.state = this.$props.location.state;
      this.formData.floor_no = this.$props.location.floor_no;
      this.formData.unit_no = this.$props.location.unit_no;
      this.formData.building_name = this.$props.location.building_name;
      this.formData.default = this.$props.location.default;
      this.formData.location_id = this.$props.location.location_id;
      this.formData.default_pick_up = this.$props.location.default_pick_up;
      this.formData.pickup_cutoff_time =
        this.$props.location.pickup_cutoff_time;
      this.formData.remarks = this.$props.location.remarks;

      this.setCostCenterData({
        key: "pick_up_locations",
        value: this.formData,
        idx: this.$props.rowId,
      });
    }
  },
};
</script>

<style>
</style>