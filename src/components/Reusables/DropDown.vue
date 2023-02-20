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
    :optionDisabled="optionDisabled"
  />
</template>

<script>
import Dropdown from "primevue/dropdown";

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
    "optionDisabled",
  ],
  data: () => ({
    selected: null,
  }),
  components: {
    Dropdown,
  },
  created() {
    if (this.state != "") {
      for (let s in this.data) {
        if (this.data[s]["name"] == this.state) {
          this.selected = this.data[s][this.code];
        }
      }
    }
    // {
    //   if (!this.value) {
    //     if (this.state != "") {
    //       for (let s in this.data) {
    //         if (this.data[s]["name"] == this.state) {
    //           this.selected = this.data[s][this.code];
    //         }
    //       }
    //     }
    //   } else {
    //     this.selected = this.value;
    //   }
    // }
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
