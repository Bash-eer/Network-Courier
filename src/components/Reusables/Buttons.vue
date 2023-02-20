<template>
  <Button
    :type="type"
    :label="label"
    :icon="icon"
    :class="ButtonClass()"
    :badge="badge_value"
    :badgeClass="badge_icon"
    @click="EmitToParent"
    :iconPos="iconPos"
    :disabled="disable"
    :loading="loading"
  />
</template>

<script>
import Button from "primevue/button";
export default {
  name: "Buttons",
  props: [
    "label",
    "icon",
    "button_class",
    "badge_value",
    "badge_icon",
    "type",
    "iconPos",
    "disable",
    "loading",
  ],
  methods: {
    ButtonClass() {
      const classes = [];
      classes.push(this.button_class);
      return classes;
    },
    EmitToParent() {
      this.$emit("childToParent");
    },
  },
  components: {
    Button,
  },
};
</script>

<style>
.roundedButton {
  border-radius: 10px;
}
.p-disabled {
  opacity: 1;
}
.customerTypes {
  width: 100% !important;
  border-radius: 7px !important;
}
</style>
