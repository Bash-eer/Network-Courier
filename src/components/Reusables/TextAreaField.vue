<template>
  <Textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-model="value"
    :autoResize="true"
    :class="classes"
    rows="5"
  />
</template>

<script>
import Textarea from "primevue/textarea";
export default {
  name: "TextAreaField",
  props: ["classes", "modelValue", "state", "label"],
  data: () => ({
    value: "",
  }),
  watch: {
    modelValue: function () {
      this.$emit("childToParent", this.label, this.modelValue);
    },
  },
  created() {
    if (this.state != "" && this.state != undefined) {
      this.value = this.state;
    }
    if (this.state == undefined) {
      this.value = " ";
    }
  },
  components: {
    Textarea,
  },
};
</script>

<style>
.p-inputtextarea {
  width: 100% !important;
}
</style>