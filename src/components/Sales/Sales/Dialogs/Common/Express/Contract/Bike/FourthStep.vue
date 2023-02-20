<template>
  <br />
  <RadioButtons
    class="color-212121 font-size-14"
    label="platform"
    state="radioButtonNormal"
    v-bind:radioButtonData="SalesExpressContractBikeDialogCategories"
    v-model="selectedCategory"
  />
  <div>
    <span v-if="selectedCategory == 'Normal (Monthly Minimum)'">
      <NormalCategoryComponent />
    </span>
    <span v-if="selectedCategory == 'E-Commerce'">
      <EcomCategoryComponent />
    </span>
  </div>
</template>

<script>
import NormalCategoryComponent from "./NormalCategory.vue";
import EcomCategoryComponent from "./EcomCategory.vue";
export default {
  components: { NormalCategoryComponent, EcomCategoryComponent },
  data: () => ({
    selectedCategory: "",
    SalesExpressContractBikeDialogCategories: [
      { name: "Normal (Monthly Minimum)", key: "N" },
      { name: "E-Commerce", key: "E" },
    ],
  }),
  created() {
    this.selectedCategory = "Normal (Monthly Minimum)";
  },
};
</script>

<style></style>
