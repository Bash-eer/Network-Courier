<template>
  <MultiSelect
    v-model="selected"
    :options="countryData"
    optionLabel="name"
    placeholder="Select Countries"
    :filter="true"
    display="chip"
    class="
      multiselect-custom
      flex
      text-left
      inputfield
      w-full
      p-inputtext-lg
      inputfield
      w-full
      dialog-field-text
    "
  >
    <template #chip="slotProps">
      <img
        :src="'/images/' + slotProps.value.name + '.png'"
        class="p-mr-2"
        width="40"
      />
      <div class="ml-2">{{ slotProps.value.name }}</div>
    </template>
    <template #option="slotProps">
      <div class="country-item">
        <img
          :src="'/images/' + slotProps.option.name + '.png'"
          class="p-mr-2"
          width="40"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </MultiSelect>
</template>

<script>
import MultiSelect from "primevue/multiselect";
export default {
  name: "MultiChipCountrySelect",
  props: ["countryData"],
  data: () => ({
    selected: null,
  }),
  components: {
    MultiSelect,
  },
};
</script>

<style>
.multiselect-custom .country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-right: 0.5rem;
  background: #7e84a7 !important;
  color: #fff;
}
</style>
