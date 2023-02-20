<template>
  <div class="formgrid grid row">
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Country</h5>
      <DropDownField
        :key="renderKey"
        :value="details.country"
        code="name"
        :data="country"
        :filter="true"
        label="customer_type"
        v-model="details.country"
        v-on:childToParent="getUserInput"
        @update:modelValue="getCountryID"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">State</h5>

      <DropDownField
        :key="renderKey"
        :value="details.state"
        code="name"
        :data="states"
        :filter="true"
        label="customer_type"
        v-model="details.state"
        v-on:childToParent="getUserInput"
        @update:modelValue="getState"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Postal Code</h5>
      <TextField
        :key="renderKey"
        label="postal_code"
        type="text"
        v-model="details.postal_code"
        @update:modelValue="getPostal"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Enter the Address
      </h5>
      <AutoComplete
        v-model="details.address"
        :suggestions="address"
        @item-select="onSelect($event)"
        @complete="searchAddress($event)"
        minLength="3"
        field="name"
        v-on:childToParent="getUserInput"
        :inputClass="{
          'p-invalid': v$.details.address.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text': true,
        }"
        optionLabel="name"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Building Name</h5>
      <TextField
        :key="renderKey"
        label="building_name"
        type="text"
        v-model="details.building_name"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Floor No</h5>
      <TextField
        label="floor_no"
        type="text"
        v-model="details.floor_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Unit No</h5>
      <TextField
        label="unit_no"
        type="text"
        v-model="details.unit_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { debounce } from "lodash";
import AutoComplete from "primevue/autocomplete";
import { salesCommon, sales_co } from "../../store/helper";
export default {
  name: "Address",
  props: ["key", "default", "submitted"],
  components: { AutoComplete },
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    checkCountry: "",
    country: [],
    states: [],
    address: [],
    details: {
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
    },
  }),
  validations() {
    return {
      details: {
        address: { required },
        postal_code: { required },
        country: { required },
        // state: { required },
      },
    };
    // }
  },
  computed: {
    ...sales_co,
  },
  async created() {
    // await this.getTripRapidoVandriver();
    let data = this.default;
    let ad_dress = "";
    if ("billing_address" in data) {
      ad_dress = "billing_address";
    }
    if ("address" in data) {
      ad_dress = "address";
    }
    this.details.address = data[ad_dress];
    let post = "";
    if ("postal_code" in data) {
      post = "postal_code";
    }
    if ("pin_code" in data) {
      post = "pin_code";
    }
    this.details.postal_code = data[post];
    this.details.country = data.country;
    this.checkCountry = data.country;
    this.details.state = data.state;
    let build = "";
    if ("building_name" in data) {
      build = "building_name";
    }
    if ("build_name" in data) {
      build = "build_name";
    }
    this.details.building_name = data[build];
    this.details.floor_no = !Number.isNaN(data.floor_no) ? data.floor_no : 0;
    this.details.unit_no = !Number.isNaN(data.unit_no) ? data.unit_no : 0;
    await this.getCountries();
    // this.getUserInput();
    this.renderKey++;
  },
  async mounted() {
    this.getUserInput();
  },
  watch: {
    "details.country": function () {},
    "details.state": function () {},
    "details.postal_code": function () {},
    "details.address": function () {},
  },
  methods: {
    ...salesCommon,
    async getUserInput() {
      this.$emit("getAddress", this.details);
    },
    async getCountries() {
      this.country = [];
      let res = await this.getCountryList();
      let default_c = "";
      res.data.results.map((list) => {
        if (list.default) {
          default_c = list.country_name;
          // this.getCountryID(list.country_name);
        }
        // if (this.default?.country) {
        //   if (
        //     this.default?.country?.toLowerCase() ==
        //     list.country_name.toLowerCase()
        //   ) {
        //     this.details.country = list.country_name;
        //     this.getCountryID(list.country_name);
        //   }
        // } else {
        //   if (list.default) {
        //     this.details.country = list.country_name;
        //     this.getCountryID(list.country_name);
        //   }
        // }

        this.country.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
      this.details.country = this.default?.country
        ? this.default?.country
        : default_c;
      this.getCountryID(this.details.country);
      this.renderKey++;
    },
    async getPostal(e) {
      //  if (this.details.country) {
      if (this.details.country.toLowerCase() == "singapore" && e.length > 4) {
        this.getDetail(e);
      }
    },
    getStateChange(e) {
      this.details.state = e;
      this.getUserInput();
    },
    async getCountryID(e) {
      let getCountry = this.countryList?.find(
        (i) => e.toLowerCase() == i.country_name.toLowerCase()
      );
      if (getCountry) {
        await this.getState(getCountry.id);
      }
      // if (
      //   this.checkCountry.toLowerCase() == this.details.country.toLowerCase()
      // ) {
      //   this.details.postal_code = "";
      //   this.details.state = "";
      //   this.details.address = "";
      //   this.details.building_name = "";
      //   this.details.floor_no = "";
      //   this.details.unit_no = "";
      // }

      this.getUserInput();
    },
    async getState(id) {
      let res = await this.getStates(id);
      this.states = [];
      if (res) {
        res.data.results.map((i) => {
          if (
            this.default.state?.toLowerCase() ==
            i.destination_name.toLowerCase()
          ) {
            this.details.state = i.destination_name;
          }
          this.states.push({
            name: i.destination_name,
            code: i.id,
            ...i,
          });
        });
      }
      // this.getUserInput();
      this.renderKey++;
    },
    async getDetail(code) {
      let res = await this.getAddress(code);
      if (res) {
        let data = res.data.results;
        this.details.address = `${data.area_name}`;
        this.details.building_name = data.building_name;
      }
      this.getUserInput();
      this.renderKey++;
    },

    onSelect(e) {
      let data = e.value;
      this.details.address = data.name;
      this.details.postal_code = data.code;
      this.details.building_name = data.building_name;
      this.getUserInput();
      this.renderKey++;
    },
    searchAddress(event) {
      setTimeout(async () => {
        if (this.details.country.toLowerCase() == "singapore") {
          let res = await this.getPostalCode(event.query);
          this.address = [];
          if (res) {
            res.data.results.map((i) => {
              this.address.push({
                name: `${i.area_name}`,
                code: i.from_pincode,
                building_name: i.building_name,
              });
            });
          }
        }
        this.getUserInput();
        this.renderKey++;
      }, 850);
    },
  },
};
</script>

<style>
.p-autocomplete {
  width: inherit !important;
}
</style>