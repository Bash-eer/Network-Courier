<template>
  <Dropdown
    :key="key"
    :id="id"
    v-model="selected"
    @change="$emit('update:modelValue', $event.value)"
    :options="country"
    :value="modelValue"
    optionLabel="name"
    optionValue="name"
    :placeholder="placeholder"
    :filter="filter"
    :class="classes"
    class="flex text-left inputfield p-inputtext-sm w-full"
    appendTo="body"
    :optionDisabled="optionDisabled"
  />
</template>

<script>
import Dropdown from "primevue/dropdown";
import { salesCommon, sales_co } from "../../store/helper";
export default {
  name: "CountryDrop",
  props: [
    "state",
    "placeholder",
    "data",
    "v_model_value",
    "filter",
    "label",
    "id",
    "value",
    "classes",
    "modelValue",
    "code",
    "optionDisabled",
    "key",
  ],
  data: () => ({
    selected: null,
    country: [],
  }),
  components: {
    Dropdown,
  },
  async created() {
    await this.getCountries();
  },
  async mounted() {
    await this.getCountries();
  },
  computed: {
    ...sales_co,
  },
  methods: {
    ...salesCommon,
    async getCountries() {
      this.country = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        if (this.state?.toLowerCase() == list.country_name.toLowerCase()) {
          this.selected = list.country_name;
        } else {
          if (list.default) {
            this.selected = list.country_name;
          }
        }

        this.country.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
      this.renderKey++;
    },
  },
};
</script>

<style>
::v-deep .clones {
  border: 3px solid #357dea !important;
  /* font-size: 14px !important; */
}
.p-dropdown .p-dropdown-label.p-placeholder {
  color: #357dea !important;
  font-size: 14px !important;
  font-weight: bold !important;
}
.p-inputtext-lg .p-inputtext {
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #212121 !important;
}
.p-dropdown .p-dropdown-label.p-placeholder {
  color: black !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300 !important;
  line-height: 20px;
  letter-spacing: 0px;
}
</style>