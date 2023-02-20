<template>
  <div
    v-for="category of categories"
    :key="category.key"
    :class="path == 'fleets' ? 'p-field-checkbox' : 'p-field-checkbox m-2'"
  >
    <Checkbox
      :id="category.key"
      name="category"
      :value="category"
      :disabled="disable"
      v-model="selectedCategories"
      @change="EmitToParent"
    />
    <label
      class="checksText ml-2"
      v-if="path == 'sales' || path == 'fleets'"
      :for="category.key"
      >{{ category.name }}</label
    >
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
export default {
  name: "CheckBox",
  components: { Checkbox },
  props: ["categories", "disable", "checker", "ref", "path"],
  data() {
    return {
      checked: false,
      cities: [],
      selectedCategories: this.checker,
    };
  },
  methods: {
    EmitToParent() {
      this.$emit("childToParent", this.selectedCategories, this.categories);
    },
  },
  created() {},
};
</script>

<style scoped>
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
</style>
