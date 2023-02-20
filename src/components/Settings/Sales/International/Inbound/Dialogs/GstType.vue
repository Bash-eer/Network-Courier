<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6" v-if="GstType != 'MES SCHEME'">
      <h5 class="dialog-label-text required">Document Charges $</h5>
      <TextField
        type="number"
        v-model="details.document_charges"
        :classes="{
          'p-invalid': v$.details.document_charges.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Handling Charges $</h5>
      <TextField
        type="number"
        v-model="details.handling_charges"
        :classes="{
          'p-invalid': v$.details.handling_charges.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>

  <div class="mt-3">
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
        <CancelButton storePath="internationalInbound" />
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    v$: useVuelidate(),
    GstType: null,
    validation: 0,
    details: {
      document_charges: "",
      handling_charges: "",
    },
    submitted: false,
  }),
  validations() {
    if (this.GstType != "MES SCHEME") {
      return {
        details: {
          document_charges: { required },
          handling_charges: { required },
        },
      };
    } else {
      return {
        details: {
          handling_charges: { required },
        },
      };
    }
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.internationalInbound.gstTypeFormStateData;
        if (StateData.id) {
          if (this.GstType != "MES SCHEME") {
            this.details["permit_type"] = StateData["permit_type"];
            this.details["gst_type"] = StateData["gst_type"];
          } else {
            delete this.details["permit_type"];
          }
          this.details["gst_type"] = StateData["gst_type"];

          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "settings/salesSettinigs/rates/international/inbound/permitCharges/gstTypes/" +
              StateData.id,
            data: this.details,
            method: "PATCH",
            loadData: {
              loadApi: "loadPermitChargesData",
              loadPath:
                "/settings/salesSettinigs/rates/international/inbound/permitCharges/gstTypes",
              type: "fetchGstChargesData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The GST Type detail is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the GST Type, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.internationalInbound.gstTypeFormStateData)
          .length != 0
      ) {
        this.GstType =
          this.$store.state.internationalInbound.gstTypeFormStateData[
            "gst_type"
          ];
        for (let d in this.details) {
          this.details[d] =
            this.$store.state.internationalInbound.gstTypeFormStateData[d];
        }
        this.validation++;
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.GstType = null;
  },
};
</script>

<style></style>
