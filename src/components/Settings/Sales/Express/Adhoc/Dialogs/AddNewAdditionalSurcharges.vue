<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Additional Rate Name</h5>
      <TextField v-model="details.name" type="text" />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Rate (S$)</h5>
      <TextField v-model="details.rates" type="number" />
    </div>
  </div>
  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="expressAdhoc" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewAdditionalSurcharges",
  data() {
    return {
      details: {
        name: "",
        rates: "",
      },
    };
  },
  methods: {
    submitData() {
      //   if (this.v$.$invalid) {
      //     this.submitted = true;
      //   }
      {
        console.log("Hi");
        console.log(this.details);
      }
    },
  },
};
</script>

<style></style>
