<template>
  <div v-for="(rate, index) of addRates" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text required">Festivals Name</h5>
        <TextField
          v-model="details['festivals'][index].festival_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['festivals'][index].festival_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>

    <div class="flex justify-content-between add_rate ml-3">
      <div
        v-if="
          Object.keys(this.$store.state.others.otherTableEditData).length == 0
        "
        class="flex justify-content-between add_rate ml-3"
      >
        <div class="flex">
          <span class="new-field" @click="addRate"><b>+ Add New</b></span>
        </div>
      </div>
    </div>
  </div>
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
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text color-357dea"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text save-style"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  data: () => ({
    name: "FestivalsDialog",
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    addRates: ["new_rate"],
    ratesValidation: [
      {
        festival_name: {required},
      },
    ],
    details: {
      festivals: [
        {
          festival_name: "",
        },
      ],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          festivals: this.ratesValidation,
        },
      };
    }
  },

  methods: {
    closeDialog() {
      this.$store.state["others"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (
          Object.keys(this.$store.state.others.otherTableEditData).length != 0
        ) {
          this.$store.dispatch("others/commonCRUD", {
            path:
              "settings/salesSettinigs/others/festival/" +
              this.$store.state.others.otherTableEditData.id,
            action: "loadOthersTables",
            tag: "update",
            data: this.details.festivals[0],
            mutation: "fetchFestivalsTable",
            type: "",
            id_key: "",
            listApiPath: "festival",
          });
        } else {
          this.$store.dispatch("others/commonCRUD", {
            path: "settings/salesSettinigs/others/festival",
            action: "loadOthersTables",
            tag: "add",
            data: this.details,
            mutation: "fetchFestivalsTable",
            type: "",
            id_key: "",
            listApiPath: "festival",
          });
        }
      }
    },
    addRate() {
      this.details.festivals.push({
        festival_name: "",
      });
      this.ratesValidation.push({
        festival_name: {required},
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.festivals.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
    loadState() {
      if (
        Object.keys(this.$store.state.others.otherTableEditData).length != 0
      ) {
        this.details.festivals = [];
        this.addRates = [];
        this.ratesValidation = [];
        // for(let d in this.details){
        this.details.festivals.push(
          this.$store.state.others.otherTableEditData
        );
        this.addRates.push("new_rate");
        this.ratesValidation.push({
          festival_name: {required},
        });
        this.addRatesClicked++;
      }
    },
  },
  unmounted() {
    this.$store.dispatch("others/setOtherTableEditData", {data: {}});
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.save-style {
  font-size: 14px;
  font-weight: 600;
}
</style>
