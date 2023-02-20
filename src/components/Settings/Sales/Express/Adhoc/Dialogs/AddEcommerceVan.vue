<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text required">Delivery Type</h5>
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
      <h5 class="dialog-label-text required">Collection Time</h5>
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
      <div class="field col-12 md:col-8">
        <h5 class="dialog-label-text required">Weight Range(Kg)</h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details['rates'][index].min_weight"
              :showButtons="true"
              :maxFractionDigits="2"
              mode="decimal"
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

        <div
          v-if="
            details['rates'][index].max_weight <
            details['rates'][index].min_weight
          "
          class="ml-2"
          style="color: red"
        >
          Max Kg must be greater than Min Kg
        </div>
      </div>

      <div class="field col-12 md:col-4 width">
        <h5 class="dialog-label-text required">Unit Rate($)</h5>
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
    </div>
    <div v-if="index > 0">
      <div class="flex delete" @click="deleteQuestion(index)">
        <i class="pi parent pi-times cross-button field col-12 md:col-1"></i
        ><br />
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
    <span class="new-field" @click="addQuestion"><b>+ Add rates</b></span>
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
        <CancelButton storePath="expressAdhoc" />
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
        min_weight: { required },
        max_weight: { required },
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
          min_weight: "",
          max_weight: "",
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
        //var formattedTime = moment(data).format("HH:mm");
        var formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // await this.processTimePickerData();
        // if (this.$store.state.expressAdhoc.editEcommerceVanData) {
        let processedData =
          //data;
          JSON.parse(JSON.stringify(this.details));
        processedData.cut_off_time = this.timeFormatter(
          processedData.cut_off_time
        );
        processedData.collect_time = this.timeFormatter(
          processedData.collect_time
        );
        let StateData = this.$store.state.expressAdhoc.editEcommerceVanData;
        if (StateData?.id) {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type/" +
              StateData.id,
            data: processedData,
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
          // }
        } else {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/express/adhoc/ratecard/ecommerce/van/delivery/type",
            data: {
              service_id:
                this.$store.state.expressAdhoc.ExpressAdhocEcomVanTableData[0]
                  .service_id,
              ...processedData,
            },

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
        }
      }
    },
    // processTimePickerData() {
    //   this.details.cut_off_time = this.timeFormatter(this.details.cut_off_time);
    //   this.details.collect_time = this.timeFormatter(this.details.collect_time);
    // },
    addQuestion() {
      this.details.rates.push({
        min_weight: "",
        max_weight: "",
        unit_rate: "",
      });
      this.questionsValidation.push({
        min_weight: { required },
        max_weight: { required },
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
    populateRates() {
      let RatesStateDate =
        this.$store.state.expressAdhoc.editEcommerceVanData.rates;

      if (RatesStateDate.length > 0) {
        this.addQuestions = [];
        this.details.rates = [];
        this.questionsValidation = [];
        //loop
        for (let cs in RatesStateDate) {
          this.addQuestions.push("existing_contact");
          let cd_obj = RatesStateDate[cs];

          let detailsDeliveryObj = {};
          let deliveryValidationObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "max_weight" ||
              cd_obj_keys == "min_weight" ||
              cd_obj_keys == "unit_rate"
            ) {
              detailsDeliveryObj[cd_obj_keys] = cd_obj[cd_obj_keys];

              deliveryValidationObj[cd_obj_keys] = { required };
            }
          }
          this.details.rates.push(detailsDeliveryObj);
          this.questionsValidation.push(deliveryValidationObj);
        }
      }
    },
  },
  created() {
    if (
      this.$store.state.expressAdhoc.editEcommerceVanData &&
      Object.keys(this.$store.state.expressAdhoc.editEcommerceVanData).length !=
        0
    ) {
      for (let d in this.details) {
        if (d != "rates") {
          this.details[d] =
            this.$store.state.expressAdhoc.editEcommerceVanData[d];
        }
        this.populateRates();
      }
    }
  },
  unmounted() {
    this.$store.state.expressAdhoc.editEcommerceVanData = {};
    this.$store.state.expressAdhoc.triggerThirdPageLoad = true;
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
  width: 150px;
  margin-left: -9px;
}
</style>
