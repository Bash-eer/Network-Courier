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
      this.$store.dispatch("quotation/" + this.type, {
        type: this.value,
      });
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
