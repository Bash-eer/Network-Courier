<template>
  <SelectButton v-model="value" :options="options" @change="onChange($event)" />
</template>

<script>
import SelectButton from "primevue/selectbutton";
export default {
  name: "DuoSelect",
  props: ["options", "default"],
  data: () => ({
    value: "",
    // options: ["Bike", "Van"],
  }),
  methods: {
    getType(value) {
      let type;
      switch (value) {
        case "Network Courier":
          type = "Network Courier";
          break;
        case "Personal Contacts":
          type = "Personal";
          break;
      }
      return type;
    },
    onChange(e){

console.log(e);
    },
  },
  watch: {
    value: function () {
      this.$emit("childToParent", this.getType(this.value));
      this.$store.state.masters.expressRatesAddRateType = this.value;
    },
  },
  components: {
    SelectButton,
  },
  created() {
    this.value = this.default;
  },
};
</script>

<style></style>
