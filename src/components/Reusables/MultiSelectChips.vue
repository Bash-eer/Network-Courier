<template>
  <MultiSelect
    v-model="selected"
    :disabled="disabled"
    :options="options"
    optionLabel="name"
    :placeholder="placeholder"
    display="chip"
    :type="type"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.value)"
    :class="classes"
    class="flex text-left inputfield w-full p-inputtext-lg"
    :filter="filter"
    appendTo="self"
  />
  <!-- :getPopupContainer="popMethod" appendTo="body" :blockScroll="true" -->
</template>

<script>
import MultiSelect from "primevue/multiselect";
export default {
  name: "MultiSelectChips",
  components: { MultiSelect },
  props: [
    "loading",
    "state",
    "placeholder",
    "options",
    "type",
    "icon",
    "icon_class",
    "classes",
    "label",
    "defaultClass",
    "modelValue",
    "disabled",
    "filter",
  ],
  data: () => ({
    selected: [],
  }),
  watch: {
    modelValue: function () {
      this.$emit("childToParent", this.label, this.modelValue);
    },
  },
  methods: {
    // popMethod(){trigger => trigger.parentElement},
    EmitToParent() {
      var val;
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i][this.value] == this.Selected) {
          val = this.options[i][this.value];
        }
      }
      this.$emit("childToParent", [val, this.id]);
    },
    TextFieldClass() {
      const classes = [];
      classes.push(this.classes);
      return classes;
    },
  },
  // eslint-disable-next-line no-unused-vars
  ChangeFunction(event) {},
  created() {
    if (this.state != null) {
      // if (this.state.length != 0) {
        this.selected = this.state;
      // }
    }
  },
};
</script>

<style>
.clones {
  border: 3px solid #357dea !important;
}
::v-deep .p-multiselect-token {
  background-color: rgb(253, 11, 51) !important;
}
.p-multiselect .p-multiselect-label.p-placeholder {
  color: #357dea;
  font-size: 14px;
  font-weight: bold;
}
.p-multiselect.p-multiselect-chip .p-multiselect-token {
  background: #7e84a7;
  color: #ffffff;
  border-radius: 2px;
}
.p-multiselect .p-multiselect-label.p-placeholder {
  color: #000 !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300 !important;
  line-height: 20px;
  letter-spacing: 0px;
}
</style>
