<template>
  <Checkbox
    id="binary"
    @change="$emit('update:modelValue', checked)"
    v-model="checked"
    :binary="true"
  />
  <label class="label-text ml-2" for="binary">{{ label }}</label>
</template>

<script>
import Checkbox from "primevue/checkbox";

export default {
  props: ["label", "value"],
  components: { Checkbox },
  data() {
    return {
      checked: this.$props.value || false,
    };
  },
  watch: {
    checked(value) {
      this.$emit("update:modelValue", value);
    },
    value() {
      this.checked = this.$props.value;
    },
  },
};
</script>

<style scoped>
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}

.label-text {
  color: #4e5968;
  font-size: 15px;
}
</style>