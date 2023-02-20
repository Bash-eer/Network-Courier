<template>
  <div class="formgrid grid">
    {{ this.$store.state.rapidoAdhoc.RapidoAdhocEcommerceTableData }}
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Delivery Type</h5>
      <TextField
        v-model="details.delivery_type"
        type="text"
        :classes="{
          'p-invalid': v$.details.delivery_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Collection Time</h5>
      <TimePicker24
        v-model="details.collect_time"
        :state="details.collect_time"
        :classes="{
          'p-invalid': v$.details.collect_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Cut Off Time</h5>
      <TimePicker24
        v-model="details.cut_off_time"
        :state="details.cut_off_time"
        :classes="{
          'p-invalid': v$.details.cut_off_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Cut Off Days Count</h5>
      <TextField
        v-model="details.cut_off_days_count"
        type="number"
        :classes="{
          'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Delivery Type Initial</h5>
      <TextField
        v-model="details.delivery_type_initial"
        type="text"
        :classes="{
          'p-invalid': v$.details.delivery_type_initial.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div v-for="(question, index) of addQuestions" :key="index">
    <div class="formgrid grid">
      <div class="field col-12 md:col-3">
        <h5 class="dialog-label-text required">Name the Size</h5>
        <TextField
          v-model="details['rates'][index].size_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['rates'][index].size_name.$invalid && submitted,

            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text required">Kg</h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['rates'][index].min_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              :classes="{
                'p-invalid':
                  v$.details['rates'][index].min_weight.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['rates'][index].max_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              :classes="{
                'p-invalid':
                  v$.details['rates'][index].max_weight.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text required">Cm</h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['rates'][index].min_length"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
              :classes="{
                'p-invalid':
                  v$.details['rates'][index].min_length.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['rates'][index].max_length"
              :showButtons="true"
              :maxFractionDigits="2"
              mode="decimal"
              :classes="{
                'p-invalid':
                  v$.details['rates'][index].max_length.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </div>

      <div class="field col-12 md:col-1 width">
        <h5 class="dialog-label-text required">Rate</h5>
        <TextField
          v-model="details['rates'][index].unit_rate"
          type="number"
          class="Rate-input"
          :classes="{
            'p-invalid':
              v$.details['rates'][index].unit_rate.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div v-if="index > 0">
        <div class="flex delete" @click="deleteQuestion(index)">
          <i class="pi parent pi-times cross-button field col-12 md:col-1"></i
          ><br />
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    v-if="
      Object.keys(this.$store.state.rapidoAdhoc.addEcommerceData).length == 0
    "
    class="flex justify-content-between add_rate"
  > -->
  <div class="flex">
    <span class="new-field" @click="addQuestion"><b>+ Add Size</b></span>
  </div>
  <!-- </div> -->

  <div class="mt-5">
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
        <!-- <CancelButton storePath="internationalInbound" /> -->
        <CancelButton storePath="rapidoAdhoc" />
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
import moment from "moment";
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    addQuestionClicked: 0,
    addQuestions: ["new_question"],
    questionsValidation: [
      {
        size_name: { required },
        min_weight: { required },
        max_weight: { required },
        min_length: { required },
        max_length: { required },
        unit_rate: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      delivery_type: "",
      collect_time: "",
      cut_off_time: "",
      cut_off_days_count: "",
      delivery_type_initial: "",
      rates: [
        {
          size_name: "",
          min_weight: "",
          max_units: "",
          max_weight: "",
          min_length: "",
          max_length: "",
          unit_rate: "",
        },
      ],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addQuestionClicked > -1) {
      return {
        details: {
          delivery_type: { required },
          collect_time: { required },
          cut_off_time: { required },
          delivery_type_initial: { required },
          cut_off_days_count: { required },
          rates: this.questionsValidation,
        },
      };
    }
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        var formattedTime = moment(data).utc().format("HH:mm");

        return formattedTime;
      }
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        await this.processTimePickerData();
        let delivery_type = [];
        this.details["charges_id"] =
          this.$store.state.rapidoAdhoc.RapidoAdhocEcommerceTableData[0].charges_id;

        delivery_type.push(this.details);

        let StateData = this.$store.state.rapidoAdhoc.addEcommerceData;
        if (StateData?.id) {
          console.log("hi");
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type/" +
              StateData.id,
            data: this.details,
            method: "PATCH",
            triggered: true,

            toastData: {
              toastSuccessData: {
                toastMsg: `The ecommerce is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the ecommerce, try again!",
                toastSeverity: "error",
              },
            },
          });
          this.$store.state.rapidoAdhoc.renderKey++;
        } else {
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/rapido/adhoc/ratecard/ecommerce/delivery/type",
            data: { delivery_type: delivery_type },

            method: "POST",
            triggered: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Ecommerce data is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the ecommerce data, try again!",
                toastSeverity: "error",
              },
            },
          });
          this.$store.state.rapidoAdhoc.renderKey++;
        }
      }
    },

    // getData(){
    //    console.warn("function called");
    // },
    processTimePickerData() {
      this.details.cut_off_time = this.timeFormatter(this.details.cut_off_time);
      this.details.collect_time = this.timeFormatter(this.details.collect_time);
    },
    addQuestion() {
      this.details.rates.push({
        size_name: "",
        min_weight: "",
        max_units: "",
        max_weight: "",
        min_length: "",
        max_length: "",
        unit_rate: "",
      });
      this.questionsValidation.push({
        size_name: { required },
        min_weight: { required },
        max_weight: { required },
        min_length: { required },
        max_length: { required },
        unit_rate: { required },
      });
      this.addQuestionClicked++;
      this.addQuestions.push("new_question");
    },
    deleteQuestion(index) {
      this.details.rates.splice(index, 1);
      this.questionsValidation.splice(index, 1);
      this.addQuestions.splice(index, 1);
      this.addQuestionClicked++;
    },
    loadState() {
      if (this.$store.state.rapidoAdhoc.addEcommerceData?.id) {
        this.addQuestions = [];
        this.details.rates = [];
        this.questionsValidation = [];
        this.addQuestions.push("new_question");
        this.details.rates.push({
          size_name: "",
          min_weight: "",
          max_units: "",
          max_weight: "",
          min_length: "",
          max_length: "",
          unit_rate: "",
        });
        this.questionsValidation.push({
          size_name: { required },
          min_weight: { required },
          max_units: { required },
          max_weight: { required },
          min_length: { required },
          max_length: { required },
          unit_rate: { required },
        });
        // for (let d in this.details) {
        //   this.details[d] = this.$store.state.rapidoAdhoc.addEcommerceData[d];
        // }
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.rapidoAdhoc.addEcommerceData = {};
  },
};
</script>

<style scoped>
.cross-button {
  right: 13px;
  color: red;
  margin-left: 570px;
  position: relative;
  bottom: 174px;
}
::v-deep.Rate-input {
  width: 50px;
  margin-left: -9px;
}
</style>
