<template>
  <InputNumber
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.value)"
    v-model="value"
    :placeholder="placeholder"
    :class="NumberFieldClass()"
    :mode="mode"
    class="
      inputfield
      w-full
      inputfield
      p-inputnumber-sm
      w-full
      dialog-field-text
    "
    :showButtons="showButtons"
    :min="max"
    :max="min"
    :minFractionDigits="minFractionDigits"
    :maxFractionDigits="maxFractionDigits"
  />
</template>

<script>
import InputNumber from "primevue/inputnumber";
export default {
  name: "NumberField",
  components: { InputNumber },
  props: [
    "placeholder",
    "type",
    "icon",
    "icon_class",
    "classes",
    "label",
    "defaultClass",
    "modelValue",
    "showButtons",
    "min",
    "max",
    "mode",
    "minFractionDigits",
    "maxFractionDigits",
  ],
  data: () => ({
    value: null,
  }),
  watch: {
    modelValue: function () {
      this.$emit("childToParent", this.label, this.modelValue);
    },
  },
  methods: {
    NumberFieldClass() {
      const classes = [];
      classes.push(this.classes);
      return classes;
    },
  },
};
</script>

<style>
.p-inputnumber-input {
  width: 100% !important;
}
</style>
