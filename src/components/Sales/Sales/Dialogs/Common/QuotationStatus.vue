<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { salesCommon, sales_co, quotation } from "../../../../../store/helper";
export default {
  name: "QuotationStatus",
  data: () => ({
    v$: useVuelidate(),
    status: [],
    details: {
      status: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        status: { required },
      },
    };
  },
  computed: {
    ...sales_co,
  },
  created() {
    if (this.salesType == "quotations") {
      this.status = this.quotationsStatus;
    } else {
      this.status = this.contractsStatus;
    }
  },
  methods: {
    ...salesCommon,
    ...quotation,
    async submitData() {
      await this.updateStatus({
        id: this.updateStatusId,
        payload: this.details,
        type: this.salesType,
        toast: this.$toast,
      });
      this.closeDialog();
      if (this.$route.path == "/sales") {
        this.loadQuotationTabData();
        this.loadContractTabData();
      } else {
        this.quotationData({ id: this.$route.params.id });
        this.contractData({ id: this.$route.params.id });
      }
      this.setSalesType("");
      this.setUpdateStatusId(0);
    },
  },

  watch: {},
};
</script>
<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-10">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        :state="details.status"
        code="name"
        :data="status"
        label="customer_type"
        v-model="details.status"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>

  <!--footer-->
  <!--Work-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton v-on:childToParent="closeDialog" />
    <Buttons
      label="Update"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<style scoped></style>