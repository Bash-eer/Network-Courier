<template>
  <div class="choices">
    <div class="flex justify-content-between">
      <div
        v-for="choices of ChoiceSelectionData"
        :key="choices.label + 'span'"
        class="flex"
      >
        <input
          type="radio"
          class="btn-check mr-2"
          name="options-outlined"
          :id="choices.type + '-outlined'"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-primary mr-1 label mt-1 ml-1 mb-1"
          :for="choices.type + '-outlined'"
          >{{ choices.label }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceSelection",
  props: ["ChoiceSelectionData"],
};
</script>

<style scoped>
.choices {
  background: #edf1f7 !important;
  width: 100%;
}
.label {
  background: white;
}
.btn-outline-primary {
  border-color: white !important;
  border-radius: 4px !important;
}
</style>
