<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Import</h5>
      <DropDown
        :state="details.import"
        code="code"
        :data="importType"
        label="customer_type"
        v-model="details.import"
        :classes="{
          'p-invalid': v$.details.import.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Export</h5>
      <DropDown
        :state="details.expert"
        code="code"
        :data="expertType"
        label="expert"
        v-model="details.expert"
        :classes="{
          'p-invalid': v$.details.expert.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Local</h5>
      <DropDown
        :state="details.local"
        code="code"
        :data="localType"
        label="local"
        v-model="details.local"
        :classes="{
          'p-invalid': v$.details.local.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex mt-2 justify-content-end">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Normal',
                        tag: 'Normal',
                        key: 'Normal',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Normal',
                  tag: 'Normal',
                  key: 'Normal',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'E-Commerce',
                        tag: 'E-Commerce',
                        key: 'E-Commerce',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'E-Commerce',
                  tag: 'E-Commerce',
                  key: 'E-Commerce',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Import</h5>
      <DropDown
        :state="details.import_express"
        code="code"
        :data="importExpressType"
        label="import_express"
        v-model="details.import_express"
        :classes="{
          'p-invalid': v$.details.import_express.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Export</h5>
      <DropDown
        :state="details.export_express"
        code="code"
        :data="exportExpressType"
        label="export_express"
        v-model="details.export_express"
        :classes="{
          'p-invalid': v$.details.export_express.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Local</h5>
      <DropDown
        :state="details.local_express"
        code="code"
        :data="localExpressType"
        label="local_express"
        v-model="details.local_express"
        :classes="{
          'p-invalid': v$.details.local_express.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex mt-2 justify-content-end">
    <div class="flex flex-row acknowledgement-check">
      <div class="flex flex-row acknowledgement-row">
        <CheckBox
          path="fleets"
          class="checksText"
          v-bind:checker="
            details.acknowledgement == true
              ? [
                  {
                    name: 'Normal',
                    tag: 'Normal',
                    key: 'Normal',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'Normal',
              tag: 'Normal',
              key: 'Normal',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
        <CheckBox
          path="fleets"
          class="checksText"
          v-bind:checker="
            details.acknowledgement == true
              ? [
                  {
                    name: 'E-Commerce',
                    tag: 'E-Commerce',
                    key: 'E-Commerce',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'E-Commerce',
              tag: 'E-Commerce',
              key: 'E-Commerce',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
      </div>
    </div>
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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
     <CancelButton storePath="salesSales" />
      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "SalesInternationalServiceProvider",
  data: () => ({
    expertType: [
      { name: "None", code: "AG" },
      { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    importType: [
      { name: "Rate card 1", code: "EX" },
      { name: "Rate card 2", code: "IN" },
      { name: "Rate card 3", code: "RP" },
    ],
    localExpressType: [
      { name: "None", code: "H1" },
      { name: "Low", code: "L1" },
    ],
    exportExpressType: [
      { name: "None", code: "AG" },
      { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    importExpressType: [
      { name: "Rate card 1", code: "EX" },
      { name: "Rate card 2", code: "IN" },
      { name: "Rate card 3", code: "RP" },
    ],
    localType: [
      { name: "None", code: "H1" },
      { name: "Low", code: "L1" },
    ],
    v$: useVuelidate(),

    details: {
      import: "",
      expert: "",
      local: "",
      import_express: "",
      export_express: "",
      local_express: "",
      acknowledgement: false,
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        import: { required },
        expert: { required },
        local: { required },
        import_express: { required },
        export_express: { required },
        local_express: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SelectMethodInternationalCenter",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "SalesInternationalCostCenter",
        });
      }
    },
  },
};
</script>

<style scoped>
.acknowledgement-row{
    gap:4rem;
}
</style>
