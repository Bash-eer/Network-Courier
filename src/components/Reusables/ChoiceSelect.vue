<template>
  <SelectButton v-model="value" :options="data" :disabled="disabled" />
</template>

<script>
import SelectButton from "primevue/selectbutton";
export default {
  name: "ChoiceSelect",
  props: ["data", "state", "modelValue", "disabled"],
  data() {
    return {
      value: null,
      count: 0,
    };
  },
  watch: {
    value: function () {
      this.$store.state.users.deliveryChoicesState = this.value;
      this.$store.state.users.categoriesState = [];

      if (this.$store.state.users.deliveryTypestabs == null) {
        this.$store.state.users.radioButtonTypesValue = null;
      }

      if (this.$store.state.users.deliveryTypestabs != null) {
        if (this.value == this.$store.state.users.deliveryTypestabs) {
          this.count++;
        }
        if (
          this.value != this.$store.state.users.deliveryTypestabs &&
          this.count > 1
        ) {
          this.$store.state.users.radioButtonTypesValue = null;
          this.$store.state.users.rolesPageDropDown = null;
        }
        if (
          this.value == this.$store.state.users.deliveryTypestabs &&
          this.count > 1
        ) {
          this.$store.state.users.radioButtonTypesValue = null;
        }
        this.count++;
      }

      if (this.value == "International") {
        for (var ro in this.$store.state.users.rolesOnlineCustomerTabs) {
          var ro_obj = this.$store.state.users.rolesOnlineCustomerTabs[ro];
          if (
            ro_obj.label == "Contract" ||
            ro_obj.label == "Agent" ||
            ro_obj.label == "Adhoc" ||
            ro_obj.label == "OBC"
          ) {
            this.$store.state.users.categoriesState.push(
              this.$store.state.users.categories[ro]
            );
          }
        }
      }
      if (this.value == "Express" || this.value == "Rapido") {
        for (var ro_two in this.$store.state.users.rolesOnlineCustomerTabs) {
          var ro_two_obj =
            this.$store.state.users.rolesOnlineCustomerTabs[ro_two];
          if (ro_two_obj.label == "Contract" || ro_two_obj.label == "Adhoc") {
            this.$store.state.users.categoriesState.push(
              this.$store.state.users.categories[ro_two]
            );
          }
        }
      }

      this.$store.state.users.rolesTabSwitch = true;
    },
  },
  components: {
    SelectButton,
  },
  created() {
    this.value = this.$store.state.users[this.state];
  },
};
</script>

<style></style>
