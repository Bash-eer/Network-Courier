<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a font-size-14 bold-500 required">
        Name the Delivery Type
      </h5>
      <TextField
        v-model="details.delivery_type"
        type="text"
        :classes="{
          'p-invalid': v$.details.delivery_type.$invalid && submitted,

          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a font-size-14 bold-500">
        Collection Time
      </h5>
      <TimePicker24
        v-model="details.collect_time"
        :state="details.collect_time"
        :classes="{
          'p-invalid': v$.details.collect_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a font-size-14 bold-500">Cut Off Time</h5>
      <TimePicker24
        v-model="details.cut_off_time"
        :state="details.cut_off_time"
        :classes="{
          'p-invalid': v$.details.cut_off_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a font-size-14 bold-500">
        Cut Off Days Count
      </h5>
      <TextField
        v-model="details.cut_off_days_count"
        type="number"
        :classes="{
          'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a font-size-14 bold-500">Rate ($)</h5>
      <TextField
        v-model="details.rate"
        type="number"
        :classes="{
          'p-invalid': v$.details.rate.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="color-7a7a7a font-size-14 bold-500 required">
        Delivery Type Initial
      </h5>
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
  <!-- <div
    v-if="
      Object.keys(this.$store.state.rapidoAdhoc.addEcommerceData).length == 0
    "
    class="flex justify-content-between add_rate"
  > -->

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
        <CancelButton
          storePath="expressAdhoc"
          label="Cancel"
          class="color-357dea"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text bg-357dea"
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

    //DATA COLLECTION
    details: {
      delivery_type: "",
      collect_time: "",
      cut_off_time: "",
      cut_off_days_count: "",
      delivery_type_initial: "",
      rate: "",
    },
    //DATA COLLECTION
  }),

  validations() {
    return {
      details: {
        delivery_type: { required },
        collect_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        rate: { required },
        delivery_type_initial: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        // var formattedTime = moment(data).format("HH:mm");
        var formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },
    async submitData() {
      console.log(this.details, "details");
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // await this.processTimePickerData();
        let processedData =
          //data;
          JSON.parse(JSON.stringify(this.details));
        processedData.cut_off_time = this.timeFormatter(
          processedData.cut_off_time
        );
        processedData.collect_time = this.timeFormatter(
          processedData.collect_time
        );

        // this.$store.state.expressAdhoc.addZoneData["trips"] = {
        //   bike: this.processedTrips(this.details.bike_trips),
        //   van: this.processedTrips(this.details.van_trips),
        // };

        if (this.$store.state.expressAdhoc.editEcommerceBikeData?.id) {
          let StateData = this.$store.state.expressAdhoc.editEcommerceBikeData;
          if (StateData.id) {
            this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
              path:
                "settings/sales/rates/express/adhoc/ratecard/ecommerce/bike/delivery/type/" +
                StateData.id,
              // data: this.details,
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
          }
        } else {
          this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/express/adhoc/ratecard/ecommerce/bike/delivery/type",
            data: {
              service_id:
                this.$store.state.expressAdhoc.ExpressAdhocEcomBikeTableData[0]
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

    async processTimePickerData() {
      // this.details.cut_off_time = this.timeFormatter(this.details.cut_off_time);
      // this.details.collect_time = this.timeFormatter(this.details.collect_time);
      let processedData =
        //data;
        JSON.parse(JSON.stringify(this.details));
      processedData.cut_off_time = this.timeFormatter(
        processedData.cut_off_time
      );
      processedData.collect_time = this.timeFormatter(
        processedData.cut_off_time
      );
      return processedData;
    },
  },
  unmounted() {
    this.$store.state.expressAdhoc.editEcommerceBikeData = {};
    this.$store.state.expressAdhoc.triggerThirdPageLoad = true;
  },
  created() {
    if (this.$store.state.expressAdhoc.editEcommerceBikeData) {
      console.log(
        this.$store.state.expressAdhoc.editEcommerceBikeData,
        "incoming"
      );
      for (let d in this.details) {
        this.details[d] =
          this.$store.state.expressAdhoc.editEcommerceBikeData[d];
      }
    }
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
