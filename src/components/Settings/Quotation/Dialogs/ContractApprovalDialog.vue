<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        type="text"
        v-model="details.remarks"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
    />
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="quotation" />
    <Buttons
      label="Approve"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
export default {
  name: "ContractApprovalDialog",
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    details: {
      remarks: "",
    },
  }),
};
</script>

<style>
</style>