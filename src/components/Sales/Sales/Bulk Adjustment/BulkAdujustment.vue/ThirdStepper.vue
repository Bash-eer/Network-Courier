<template>
  <div>
    <div
      class="formgrid grid mt-3 col-11 flex DiasbledDiv justify-content-between"
    >
      <div class="field col-12 md:col-3">
        <h5 class="required text-style text-left">Batch Name</h5>
        <TextField
          class="color-212121 font-size-14 font-bold"
          label="companyName"
          v-model="details.batch_name"
          :class="{
            'p-invalid': v$.details.batch_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
        <!-- v-model="details.profile_name"
          @blur="v$.details.profile_name.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.profile_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }" -->
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="text-style text-left required">Batch Date</h5>
        <Calendar
          v-model="details.batch_date"
          class="width-235"
          :showIcon="true"
          :class="{
            'p-invalid': v$.details.batch_date.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
        <!-- :data="tradeData"
          :state="details.trade"
          label="trade"
          id="trade"
          code="code"
          v-model="details.trade"
          :value="details.trade"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }" -->
      </div>
      <!-- <div class="flex"> -->
      <div class="mt-3 flex">
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="Express"
                  value="Express"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="chargeMinium"
                  >Express</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="Rapido"
                  value="Rapido"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="chargeMinium"
                  >Rapido</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="whiteDiv p-3 calendarDiv">
            <div class="flex flex-row">
              <div class="flex">
                <RadioButton
                  name="International"
                  value="International"
                  v-model="selectedCategory"
                />
                <label class="radioButtonsDiv ml-2" for="International"
                  >International</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="field col-12 md:col-6 mt-3">
      <TextField
        v-model="details.searcher"
        label="contactsSearch"
        icon="fa fa-search"
        placeholder="Search "
        type="text"
      />
  </div> -->
      </div>
    </div>
    <!-- </div> -->
    <h5 class="ef-style ml-3">Effective Date</h5>
    <div class="field col-12 md:col-3">
      <h5
        class="
          color-7a7a7a
          font-size-14
          margin-right-130
          required
          text-left
          ml-2
          mt-3
        "
      >
        Effective Date
      </h5>
      <Calendar
        v-model="details.effective_date"
        class="width-235"
        :showIcon="true"
        :class="{
          'p-invalid': v$.details.effective_date.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
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
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="
            p-button-outlined
            mr-1
            dialog-button-text
            previous-btn
            color-357dea
          "
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea"
        />
        <Buttons
          label="save"
          button_class="bg-357dea"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EffectiveDate",
  components: { RadioButton },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      selectedCategory: "",
      details: {
        batch_name: "",
        batch_date: "",
        //searcher:"",
        effective_date: "",
      },
      SalesDialogCategories: [
        { name: "Express", key: "CU" },
        { name: "Rapido", key: "IU" },
        { name: "International", key: "CU" },
      ],
    };
  },
  validations() {
    return {
      details: {
        batch_name: { required },
        batch_date: { required },
        effective_date: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
      bulkAdjustmentAddNewPayload: "bulkAdjustment/bulkAdjustmentAddNewPayload",
    }),
  },
  watch: {
    bulkAdjustmentAddNewData: function () {
      this.prefillData;
    },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.batch_name":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.batch_date":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.radiobuttons":
      function () {
        this.prefillData();
      },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.profile":
      function () {
        this.prefillData();
      },
    "details.effective_date": function () {
      this.details.effective_date = this.dateFormater(
        this.details.effective_date
      );
    },
  },
  methods: {
    goBackHandler() {
      // this.$store.state.sales.stepperNavigation = "Information";
      this.$store.dispatch("salesSales/navigateStepper", {
        step: "RateAdjustment",
      });
    },
    async nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setPayload();
        console.log(
          this.bulkAdjustmentAddNewData,
          "submitted",
          this.bulkAdjustmentAddNewPayload
        );
        this.apiCallHandler();
      }
    },
    async apiCallHandler() {
      const res = this.$store.dispatch(
        "bulkAdjustment/POSTPATCHCRUDOPERATIONAddNew",
        {
          path: "/sales/contract/bulk-adjustment/batch",
          data: this.bulkAdjustmentAddNewPayload,
          method: "POST",
          loadData: "salesContract/loadBulkAdjustmentTableData",
          toastMutationData: "salesSales/toastMutationFunc",
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        }
      );
      if (res) {
        await this.$router.push({ name: "SalesHome" });
      }
    },
    prefillData() {
      this.NormalProfileData = this.bulkAdjustmentAddNewData?.profile;
      this.details.batch_name = this.bulkAdjustmentAddNewData?.batch_name;
      this.details.batch_date = this.bulkAdjustmentAddNewData?.batch_date;
      this.selectedCategory = this.bulkAdjustmentAddNewData?.radiobuttons;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("YYYY-MM-DD");
        return formattedDate;
      }
    },
    setPayload() {
      this.bulkAdjustmentAddNewPayload["effective_date"] =
        this.details.effective_date;
      this.bulkAdjustmentAddNewPayload["profiles"] = {};
      this.bulkAdjustmentAddNewPayload.profiles["e_commerce"] = [];
      this.bulkAdjustmentAddNewPayload.profiles["normal"] = [];
      // this.bulkAdjustmentAddNewPayload.profiles.e_commerce[0][
      //   "e_commerce_type"
      // ] = [];
      //normal
      this.bulkAdjustmentAddNewData?.profiles?.normal.map((list) => {
        this.bulkAdjustmentAddNewPayload?.profiles?.normal.push({
          contract_id: list?.contract_id,
          profile_name: list?.profile_name,
          acknowledged: false,
          sales_person_id: list?.sales_person_id,
          sales_person_name: list?.sales_person_name,
          sales_person_contact: list?.sales_person_contact,
          address: list?.address,
          contract_profile_id: list?.id,
          express_contract_type: "normal",

          remarks: list?.remarks,
          normal_type: {
            express_service_type: list.express_service_type,
            rate_per_job: list?.per_job,
            additional_job_rate: list?.additional_job,
            job_count: list?.no_of_units,
            amount: list?.amount,
            increment_value: list?.Increment_amount,
            percentage: list?.Increment_Percentage,
            // normal_rate_id: list?.id,
            new_cost: list.new_cost,
          },
        });
      });
      //ecom
      let ecomDdata = this.bulkAdjustmentAddNewPayload?.profiles?.e_commerce;
      for (let i in this.bulkAdjustmentAddNewData?.profiles?.e_commerce) {
        ecomDdata[i] = {};
        ecomDdata[i]["contract_id"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].contract_id;
        ecomDdata[i]["profile_name"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].profile_name;
        ecomDdata[i]["acknowledged"] = false;
        ecomDdata[i]["sales_person_id"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[
            i
          ].sales_person_id;
        ecomDdata[i]["sales_person_name"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[
            i
          ].sales_person?.display_name;
        ecomDdata[i]["sales_person_contact"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[
            i
          ].sales_person?.contact_no;
        ecomDdata[i]["address"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].address;
        ecomDdata[i]["contract_profile_id"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].id;
        ecomDdata[i]["express_contract_type"] = "e_commerce";
        ecomDdata[i]["remarks"] =
          this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].remarks;

        ecomDdata[i]["e_commerce_type"] = [];
        for (let j in this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i]
          .e_commerce) {
          ecomDdata[i]["e_commerce_type"][j] = {};

          ecomDdata[i].e_commerce_type[j]["express_service_type"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].service;
          ecomDdata[i].e_commerce_type[j]["delivery_type_initial"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].delivery_type_initial;
          ecomDdata[i].e_commerce_type[j]["delivery_type"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].delivery_type;
          ecomDdata[i].e_commerce_type[j]["rate_per_job"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].per_job;
          ecomDdata[i].e_commerce_type[j]["additional_job_rate"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].additional_job;
          ecomDdata[i].e_commerce_type[j]["job_count"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].no_of_units;
          ecomDdata[i].e_commerce_type[j]["amount"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].amount;
          ecomDdata[i].e_commerce_type[j]["increment_value"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].Increment_amount;
          ecomDdata[i].e_commerce_type[j]["percentage"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].Increment_Percentage;
          ecomDdata[i].e_commerce_type[j]["new_cost"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].revised_amount;
          ecomDdata[i].e_commerce_type[j]["remarks"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].remarks;
          ecomDdata[i].e_commerce_type[j]["e_commerce_rate_id"] =
            this.bulkAdjustmentAddNewData?.profiles?.e_commerce[i].e_commerce[
              j
            ].id;
        }
      }
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style scoped>
.DiasbledDiv {
  pointer-events: none;
}
.text-style {
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */

  display: flex;
  align-items: center;

  color: #7a7a7a;
}

.radioButtonsDiv {
  font-weight: 700;
  font-size: 12px;
  /* line-height: 15px; */
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #c4c4c4;
}
.ef-style {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  justify-content: start;
  display: flex;

  color: #4e5868;
}
</style>