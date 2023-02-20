<template>
  <div>
    <div>
      <div class="row formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="required text-style">Contact Name</h5>
          <TextField
            label="contact_name"
            type="text"
            v-model="details.contact_name"
            :classes="{
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required text-style">Contact No</h5>
          <TextField
            label="contact_no"
            type="number"
            v-model="details.contact_no"
            :classes="{
              'p-invalid': v$.details.contact_no.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required text-style">Email</h5>
          <TextField
            label="email"
            type="text"
            v-model="details.email"
            :classes="{
              'p-invalid': v$.details.email.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
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
        <div class="align-self-center flex"></div>
      </div>
    </div>
    <div class="flex align-items-center justify-content-end mx-2">
     
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea mx-3"
        v-on:childToParent="genaralCloseD"
      />
      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea "
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { genaralAct } from "../../../store/helper";
import { crmClState, crm_Client } from "../../../store/modules/CRM/helper";
export default {
  name: "ContactDetails",
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    details: {
      contact_name: "",
      company_id: "",
      contact_no: "",
      email: "",
    },
  }),
  validations() {
    return {
      details: {
        contact_name: { required },
        contact_no: { required },
        email: { required },
      },
    };
  },
  computed: {
    ...crmClState,
  },
  created() {
    if (this.contact_data) {
      this.prefilleData();
    } else {
      this.details.company_id = this.contact_company_id;
    }
  },
  methods: {
    ...crm_Client,
    ...genaralAct,
    prefilleData() {
      let b_data = this.contact_data;
      this.details.company_id = b_data.company_id;
      this.details.contact_name = b_data.contact_name;
      this.details.contact_no = b_data.contact_no;
      this.details.email = b_data.email ?? "";
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        this.continueSubmit();
      }
    },
    async continueSubmit() {
      let data = {
        id: this.contact_data?.id ?? "",
        contact_id: this.contact_data?.id ?? "",
        data: this.details,
      };
      this.actionContacts({
        payload: data,
        toast: this.$toast,
        method: this.contact_data ? "PATCH" : "POST",
      });
      this.genaralCloseD();
    },
  },
};
</script>

<style scoped>
.text-style {
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  color: #7a7a7a;
}
.rpla-text {
  font-size: 21px;
  color: black;
  text-align: center;
}
.primary-color {
  color: #357dea !important;
}
</style>
