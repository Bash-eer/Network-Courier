<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Remarks</h5>
        <TextAreaField
          :state="remarks"
          label="remarks"
          v-model="remarks"
          @blur="v$.details.remarks.$model;"
          :classes="{
            'p-invalid': v$.details.remarks.$invalid && submitted,
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
          @click="handleClick()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "Upload",
  data() {
    return {
      details: {
        remarks: "",
      },
      maintenanceAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
     details: {},
      remarks: "",
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
    },
    handleClick() {
      axios.post("/sales/quotation/attachments", {
        quotation_id: this.$route.params.id,
        remarks: this.remarks,
        uploaded_in: "attachment",
        attachment_details: [
          {
            file_name: "test",
            url: "test",
            mime_type: "test",
            size: 3,
          },
          {
            file_name: "test",
            url: "test",
            mime_type: "test",
            size: 3,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
