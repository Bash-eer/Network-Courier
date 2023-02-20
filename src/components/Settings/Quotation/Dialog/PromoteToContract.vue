<template>
  <div :key="renderKey">
    <p>Contract Settings</p>

    <div class="flex">
      <Checkbox v-model="details.project_job" :binary="true" />
      <p class="my-auto ml-2">Auto Renewal</p>
    </div>

    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract Start Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            id="icon"
            v-model="details.contract_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.contract_start_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract End Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            :class="{
              'p-invalid': v$.details.contract_end_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
            id="icon"
            v-model="details.contract_end_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Contract Period</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="details.contract_period"
          :classes="{
            'p-invalid': v$.details.contract_period.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk">
          Contract Date
        </h5>
        <div class="white_content1 p-2">
          <Calendar
            dateFormat="d MM yy"
            :class="{
              'p-invalid': v$.details.contract_date.$invalid && submitted,
              'inputfield w-full': true,
            }"
            id="icon"
            v-model="details.contract_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>

      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Signatory Name</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="details.signatory"
          :classes="{
            'p-invalid': v$.details.signatory.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Signatory Designation</h5>
        <TextField
          label="build_name"
          type="text"
          v-model="details.signatory_designation"
          :classes="{
            'p-invalid': v$.details.signatory_designation.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

    <br />

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
        <CancelButton storePath="quotation" @click="closeDialog()" />
        <Buttons
          label="Submit"
          button_class="dialog-button-text"
          @click="submitData()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Checkbox from "primevue/checkbox";
import moment from "moment";
import { sales_co } from "../../../../store/helper";
export default {
  name: "AddFollowUP",
  components: {
    Checkbox,
  },
  props: ["loadData"],
  data() {
    return {
      renderKey: 1,
      g_data: null,
      details: {
        contract_start_date: "",
        contract_end_date: "",
        contract_period: "",
        contract_date: "",
        signatory: "",
        signatory_designation: "",
        project_job: false,
      },
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        contract_start_date: { required },
        contract_end_date: { required },
        contract_period: { required },
        contract_date: { required },
        signatory: { required },
        signatory_designation: { required },
      },
    };
  },
  computed: {
    ...sales_co,
  },
  created(){
    if(this.quotation_g_overView){
    let data=this.quotation_g_overView.settings;
    this.g_data=this.quotation_g_overView;
     this.details.contract_start_date=data.contract_start_date?moment(data.contract_start_date).format("D MMM YYYY"):""
        this.details.contract_end_date=data.contract_end_date? moment(data.contract_end_date).format("D MMM YYYY"):""
        this.details.contract_period= data.contract_period
        this.details.contract_date= data.contract_date?moment(data.contract_date).format("D MMM YYYY"):""
        this.details.signatory= data.signatory_name
        this.details.signatory_designation= data.signatory_designation
        this.details.project_job= data.auto_renewal
    }
        this.renderKey++
  },
  methods: {
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }

      if (!this.v$.$invalid) {
        const payload = {
          contract_start_date: this.details.contract_start_date,
          auto_renewal: this.details.project_job,
          contract_end_date: this.details.contract_end_date,
          contract_date: this.details.contract_date,
          contract_period: this.details.contract_period,
          signatory_name: this.details.signatory,
          signatory_designation: this.details.signatory_designation,
        };

        await this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path: `${this.g_data? `/sales/contracts/settings/${this.g_data.id}`:`/sales/quotations/promotetocontract/${this.$route.params.id}`}`,
          method: this.g_data? "PATCH":"POST",
          id: this.$route.params.id,
          data: payload,
          type: this.$route.params.type,
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The contract activated successfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in activating contract, try again!",
              toastSeverity: "error",
            },
          },
          //   loadData: this.loadData,
          loadData: this.$store.state.salesCommon?.promoteToContract,
        });
        await this.closeDialog();
      }
    },

    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-termination-heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
.add-termination-content {
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 11px !important;
  color: #343434 !important;
}
</style>