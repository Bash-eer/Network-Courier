<template>
  <Dropdown
    :id="id"
    v-model="selected"
    @change="$emit('update:modelValue', $event.value)"
    :options="data"
    :value="modelValue"
    optionLabel="name"
    :optionValue="code"
    :placeholder="placeholder"
    :filter="filter"
    :class="classes"
    class="flex text-left inputfield p-inputtext-sm w-full"
    appendTo="body"
    :disabled="disable"
    :optionDisabled="optionDisabled"
  >
  <template #header>
    <div>
      <div  v-if="firstOption" class="flex flex-row align-items-center mt-2 mx-2">
      <div
        v-for="category of firstData"
        :key="category.key"
        class="p-field-radiobutton flex mr-2 "
      >
        <RadioButton
          name="category"
          :value="category.name"
          v-model="select_first_type"
          @change="$emit('firstOption',category.name)"
        />
        <label
          :class="`font-size-12 ml-1 ${
            select_type == category.name ? 'primary-color' : ''
          }`"
          :for="category.key"
          >{{ category.name }}</label
        >
      </div>
    </div>
    <div v-if="secondOption" class="flex flex-row align-items-center mt-3 mx-2">
      <div
        v-for="category of secondData"
        :key="category.key"
        class="p-field-radiobutton flex mr-2"
      >
        <RadioButton
          name="category"
          :value="category.name"
          v-model="select_second_type"
          @change="$emit('secondOption',category.name)"
        />
        <label
          :class="`font-size-12 ml-1 ${
            select_type == category.name ? 'primary-color' : ''
          }`"
          :for="category.key"
          >{{ category.name }}</label
        >
      </div>
    </div>
  </div>
  </template></Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";

export default {
  name: "DropDown",
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
    "disable",
    "optionDisabled",
    "firstData",
    "firstOption",
    "secondData",
    "secondOption"
  ],
  data: () => ({
    selected: null,
    select_first_type:"",
    select_second_type:"",
    // firstData: [
    //   { name: "Express", key: "Express" },
    //   { name: "International", key: "International" },
    //   { name: "Rapido", key: "Rapido" },
    // ],
  }),
  components: {
    Dropdown,
    RadioButton
  },
  watch: {
    modelValue: function () {
      this.$emit("childToParent", this.label, this.modelValue);
    },
  },
  created() {
    this.selected = this.$props.value || null;
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
