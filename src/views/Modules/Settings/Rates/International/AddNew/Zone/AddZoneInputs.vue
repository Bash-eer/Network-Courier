<template>
  <div class="mt-5">
    <div class="input-field-wrapper col-4">
      <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
        Zone No 
        <!-- <span class="required-field ml-1"> *</span> -->
      </div>
      <div class="flex align-items-center">
        <TextField
          class="col-7"
          label="country_code"
          v-model="zone_no"
          @blur="v$.zone_no.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.zone_no.$invalid && !isValid,
            'inputfield p-inputtext-sm  w-full dialog-field-text': true,
          }"
        />
        <Buttons
          class="ml-2 col-3"
          label="Import"
          button_class="p-button-sm p-button-outlined add-btn custom-add-btn color-357dea"
        />
        <div
          v-if="count !== 1"
          @click="$emit('removeZone', zoneId)"
          class="pointer pi pi-times col"
        ></div>
      </div>
    </div>
    <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
      Add Countries 
      <!-- <span class="required-field ml-1"> *</span> -->
    </div>
    <keep-alive>
    <MultiSelectChips
      :options="countries"
      :filter="true"
      display="chip"
      placeholder="Select Countries"
      v-model="selectedCountries"
      :value="selectedCountries"
      :state="selectedCountries"
      optionValue="country_id"
      v-on:childToParent="getUserInput"
      :classes="{
        'p-invalid': v$.selectedCountries.$invalid && !isValid,
      }"
    />
    </keep-alive>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["zoneId", "count"],
  data() {
    return {
      zone_no: "",
      isValid: true,
      destinations: [],
      selectedCountries: [],
      countriesId: [],
      selectedItems: null,
      selectAll: false,
      countries: [
        { name: "Australia", code: "AU", country_id: 1 },
        { name: "Brazil", code: "BR", country_id: 2 },
        { name: "China", code: "CN", country_id: 3 },
      ],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      selectedCountries: { required },
      zone_no: { required },
    };
  },
  computed: {
    ...mapGetters({
      currentStep: "AddNewInternational/currentStep",
      footerBtnKey: "AddNewInternational/footerBtnKey",
      isNextValid: "AddNewInternational/isNextValid",
      zoneData: "AddNewInternational/zoneData",
    }),
  },
  watch: {
    footerBtnKey() {
      this.countriesId = [];

      this.selectedCountries.map((list) =>
        this.countriesId.push({ country_id: list })
      );

      this.setZoneData({
        idx: this.zoneId,
        data: {
          countries: this.countriesId,
          zone_no: this.zone_no,
        },
      });

      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isFormValid", { isValid: false, id: this.zoneId });
      } else {
        this.$emit("isFormValid", { isValid: true, id: this.zoneId });
      }
    },
  },
  methods: {
    ...mapActions({
      setZoneData: "AddNewInternational/setZoneData",
      getCountryList: "Outbound/getCountryList",
      getDestList: "Outbound/getDestList",
    }),
    onSelectAllChange(event) {
      this.selectedItems = event.checked
        ? this.items.map((item) => item.value)
        : [];
      this.selectAll = event.checked;
    },
    onChange(event) {
      this.selectAll = event.value.length === this.items.length;
    },
    async destList(id) {
      if (id) {
        try {
          console.log(id);
          this.destinationOpts = [];
          let res = await this.getDestList(id);

          res.data.results.map((list) => {
            this.destinationOpts.push({
              name: list.destination_name,
              code: list.destination_code,
              destination_id: list.id,
            });
          });

          console.log("hit", this.destinationOpts);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getCountries() {
      this.countries = [];
      let res = await this.getCountryList();
      res.data.results.map((list) => {
        this.countries.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  async created() {
    await this.getCountries();
    this.zone_no = this.zoneData[this.zoneId]?.zone_no;

    this.zoneData[this.zoneId]?.countries &&
      this.zoneData[this.zoneId]?.countries.map((list) =>
        this.selectedCountries.push(list.country_id)
      );
  },
};
</script>

<style scoped>
:deep .col-7,
.col,
.col-4,
.col-2 {
  padding-left: 0 !important;
}

:deep .p-multiselect-label-container {
  min-height: 100px;
}

:deep .p-multiselect-trigger {
  display: none;
}
</style>
