<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!--DRAG AND DROP UPLOAD-->
  <div>
    <DragAndDropUpload />
    <!-- <CustomDragDrop /> -->
  </div>
  <!--Footer-->
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
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Upload"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
const { URL } = require("../../../../../config/const");
import useVuelidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
// import RadioButton from "primevue/radiobutton";
// import CustomDragDrop from "../../../../../Reusables/CustomDragandDrop.vue"
export default {
  name: "ExpressContractVanContractOrSendQuotation",
  components: {},
  data: () => ({
    selectedCategory: null,
    date: null,
    radios: null,
    // SalesDialogCategories: [{ name: "Charge Usage Only", key: "M1" }],
    SalesDialogCategories: [
      { name: "Called", key: "CLD" },
      { name: "Call Received", key: "CR" },
      { name: "Meeting", key: "MET" },
      { name: "Follow Up", key: "FU" },
    ],
    Sales2: [{ name: "Charge Minimum", key: "M2" }],
    v$: useVuelidate(),
    details: {
      remarks: "",
    },
    submitted: false,
  }),
  //   validations() {
  //     return {
  //       details: {

  //         remarks: { required },
  //       },
  //     };
  //   },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // for (var d in this.details) {
        //   this.$store.state.sales.quotationCreationFormData[d] =
        //     this.details[d];
        // }
        // this.$store.state.sales.quotationCreationFormData["contact_person"] =
        //   this.$store.state.masters.formTableData;

        this.uploadFile();
      }
    },

    uploadFile() {
      // console.log(this.$store.state.sales.FilesToUpload)
      this.$store.dispatch("sales/AttachmentsCRUD", {
        tag: "add",
        data: {
          attachment_url: this.$store.state.sales.FilesToUpload,
          quotation_id: this.$store.state.sales.salesQuotationId,
          remarks: this.details.remarks,
        },
      });
      // axios
      //   .post("attachment", {
      //     attachment_url: this.$store.state.sales.FilesToUpload,
      //     quotation_id: this.$store.state.sales.salesQuotationId,
      //     remarks: this.details.remarks,
      //   })
      //   .then(async (res) => {
      //     console.log(res);
      //     this.$store.dispatch("sales/loadAttachments");

      //     // this.fileLink = res.data.results.fileLink;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // }
    },
  },
  created() {
    // this.$store.state.sales.expressQuotationContactsTableData =
    //   this.$store.state["sales"].contactsStateData;
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>
<style scoped>
:v-deep span .p-button {
  /* background: white; */
  border-color: rgb(102, 99, 99) !important;
}
</style>
