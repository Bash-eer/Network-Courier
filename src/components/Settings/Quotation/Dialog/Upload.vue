
<template>
<div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.reamrks"
        label="remarks"
        v-model="details.reamrks"
        @blur="v$.details.reamrks.$model;"
        :classes="{
          'p-invalid': v$.details.reamrks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="maintenanceAttachmentsState"
      type="vehicleCommons"
      storePath="fleets"
    />
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="quotation" />
      <Buttons
        label="Upload"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "Upload",
  data() {
    return {
      details: {
        reamrks: "",
      },
      maintenanceAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
      
    };
  },
  validations() {
    return {
      details: {
        reamrks: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
