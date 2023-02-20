<template>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">OnForwarding</p>
  </div>
  <div class="formgrid grid">
    <div class="col-4 ml-4">
      <h5 class="dialog-label-text head">FEDEX</h5>
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Import</h5>
      <DropDown
        code="name"
        :data="import_value"
        label="import_value"
        v-model="details.import_value"
        :class="{
             'p-invalid': v$.details.import_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Export</h5>
      <DropDown
        code="name"
        :data="export_value"
        label="export_value"
        v-model="details.export_value"
        :class="{
             'p-invalid': v$.details.export_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Local</h5>
      <DropDown
        code="name"
        :data="export_value"
        label="local_value"
        v-model="details.local_value"
        :class="{
             'p-invalid': v$.details.local_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="col-4 ml-4">
      <h5 class="dialog-label-text head">M Express</h5>
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Import</h5>
      <DropDown
        code="name"
        :data="import_value"
        label="import_value"
        v-model="details.import_value"
        :class="{
             'p-invalid': v$.details.import_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Export</h5>
      <DropDown
        code="name"
        :data="export_value"
        label="export_value"
        v-model="details.export_value"
        :class="{
             'p-invalid': v$.details.export_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Local</h5>
      <DropDown
        code="name"
        :data="export_value"
        label="local_value"
        v-model="details.local_value"
        :class="{
             'p-invalid': v$.details.local_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid pl-2 pr-2">
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
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AddOnForwardingDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      import_value: "",
      export_value: "",
      local_value: "",
    },
    import_value: [
      { name: "Rate Card 1", code: "USD" },
      { name: "Rate Card 2", code: "SGD" },
    ],
    export_value: [
      { name: "New", code: "USD" },
      { name: "None", code: "USD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        import_value: { required },
        export_value: { required },
        local_value: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddPermitSettingsDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddSendQuotationDialog",
        });
      }
    },
  },
};
</script>

<style></style>
