<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a font-size-14 bold-500">Zone Name</h5>
      <!--  'p-invalid': v$.details.region.$invalid && submitted,-->
      <TextField
        label="zone"
        type="text"
        v-model="$store.state.expressAdhoc.addZoneValue"
        classes="inputfield w-full dialog-dropdown-text"
      />
      <span class="red zone-error-text">{{
        $store.state.expressAdhoc.addZoneError
      }}</span>
    </div>
  </div>
  <!--stepper -->
  <div class="m-3">
    <ExpressAdhocStepper :stepId="stepId" :stepperData="stepperData" />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ExpressAdhocStepper from "../../Stepper.vue";

//data imports
import { addZonesStepperData } from "../../Const/const.js";
export default {
  components: {
    ExpressAdhocStepper,
  },
  data: () => ({
    stepId: "PostalCodeStep",
    stepperData: addZonesStepperData,
    v$: useVuelidate(),

    details: {
      zone: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        zone: { required },
      },
    };
  },
  //   watch: {
  //   "$store.state.expressAdhoc.addZoneValue": function () {
  //     if (this.$store.state.expressAdhoc.addZoneValue != null) {
  //       this.$store.dispatch("expressAdhoc/setZoneError", {
  //         error: null,
  //       });
  //     }
  //   },
  // },
  unmounted() {
    // this.$store.dispatch("expressAdhoc/setZonalRates", {
    //   type: null,
    // });
    // this.$store.dispatch("expressAdhoc/setNormalRatesTransport", {
    //   type: null,
    // });
    // this.$store.dispatch("expressAdhoc/setECommerceRatesTransport", {
    //   type: null,
    // });
    this.$store.dispatch("expressAdhoc/setAddZoneValue", {
      data: null,
    });

    this.$store.dispatch("expressAdhoc/navigateStepper", {
      step: null,
    });
    this.$store.dispatch("expressAdhoc/loadZonesData", {
      path: "/settings/salesSettings/rates/express/adhoc/zone",
      mutation: "fetchZonesData",
    });
    // this.$store.dispatch("expressAdhoc/setAddZonalRatesValidation", {
    //   bool: false,
    // });
    // this.$store.dispatch("expressAdhoc/setAddZonalRatesSubmission", {
    //   bool: false,
    // });
  },
};
</script>

<style scoped>
.zone-error-text {
  font-size: 12px;
  font-weight: bold;
}
::v-deep .stepNames {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #4e5868;
}
</style>
