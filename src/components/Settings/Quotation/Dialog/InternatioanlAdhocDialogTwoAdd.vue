<template>
  <div class="flex align-items-end">
    <div class="field col-4">
      <h5 class="required dialog-label-text">Weight (kg)</h5>
      <TextField type="number" v-model="details.weight" />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Length (cm)</h5>
      <TextField type="number" v-model="details.apple" />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Width (cm)</h5>
      <TextField type="number" v-model="details.width" />
    </div>
    <div class="field col">
      <h5 class="required dialog-label-text">Height (cm)</h5>
      <TextField type="number" v-model="details.height" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {
        weight: "",
        apple: "",
        width: "",
        height: "",
      },
    };
  },
};
</script>

<style></style>
