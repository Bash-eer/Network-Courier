<template>
  <div :class="icon_class">
    <i v-if="iconSet" class="pi pi-dollar" ></i>
    <InputText
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-model="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="TextFieldClass()"
      :min="minvalue"
      class="inputfield p-inputtext-sm w-full"
    />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
export default {
  name: "TextField",
  components: { InputText },
  props: [
    "placeholder",
    "disabled",
    "type",
    "icon",
    "icon_class",
    "classes",
    "label",
    "defaultClass",
    "modelValue",
    "iconSet",
    "minvalue"
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
    TextFieldClass() {
      const classes = [];
      classes.push(this.classes);
      return classes;
    },
  },
};
</script>

<style></style>
