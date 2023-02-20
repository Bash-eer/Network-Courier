<template>
  <SelectButton v-model="value" :options="options" />
</template>

<script>
import SelectButton from "primevue/selectbutton";
export default {
  name: "DuoSelect",
  props: ["options", "default", "type", "index"],
  data: () => ({
    value: "",
  }),
  methods: {},
  watch: {
    value: function () {
      if (this.type != "setECommerceVanDuoType") {
        this.$store.dispatch("expressAdhoc/" + this.type, {
          type: this.value,
        });
      }
      if (this.type == "setECommerceVanDuoType") {
        this.$store.dispatch("expressAdhoc/" + this.type, {
          type: [this.value, this.index],
        });
      }
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
