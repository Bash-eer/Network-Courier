<template>
  <div v-for="(competitors, index) of addCompetitors" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteCompetitor(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text required">Competitor Name</h5>
        <TextField
          v-model="details['competitors'][index].competitor_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['competitors'][index].competitor_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text">Enter the Address</h5>
        <TextField
          v-model="details['competitors'][index].address"
          type="text"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Postal code</h5>
        <TextField
          v-model="details['competitors'][index].postal_Code"
          type="number"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Country</h5>
        <DropDown
          v-model="details['competitors'][index].country"
          code="name"
          :state="details['competitors'][index].country"
          id="country"
          :data="country"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">State</h5>
        <TextField v-model="details['competitors'][index].state" type="text" />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Building Name</h5>
        <TextField
          v-model="details['competitors'][index].building_name"
          type="text"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Floor No</h5>
        <TextField
          v-model="details['competitors'][index].floor_no"
          type="number"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Unit No</h5>
        <TextField
          v-model="details['competitors'][index].unit_no"
          type="number"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">E-mail</h5>
        <TextField v-model="details['competitors'][index].email" type="text" />
      </div>

      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Phone No</h5>
        <TextField
          v-model="details['competitors'][index].phone_no"
          type="number"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text">Website</h5>
        <TextField
          v-model="details['competitors'][index].website"
          type="text"
        />
      </div>
    </div>
  </div>

  <div
    v-if="Object.keys(this.$store.state.others.otherTableEditData).length == 0"
    class="flex justify-content-between add_rate ml-3"
  >
    <div class="flex">
      <span class="new-field" @click="addCompetitor"
        ><b>+ Add new Competitor </b></span
      >
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
import { required, email } from "@vuelidate/validators";
export default {
  data: () => ({
    name: "CompetitorsDialog",
    v$: useVuelidate(),
    submitted: false,
    cloneFieldClicked: 0,
    addCompetitors: ["new_competitor"],
    country: [
      { name: "Australia", code: "1" },
      { name: "Singapore", code: "2" },
    ],
    competitorsValidation: [
      {
        competitor_name: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      competitors: [
        {
          competitor_name: "",
          address: "",
          postal_Code: "",
          country: "",
          state: "",
          building_name: "",
          floor_no: "",
          unit_no: "",
          email: "",
          phone_no: "",
          website: "",
        },
      ],
      email: "",
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.cloneFieldClicked > -1) {
      return {
        details: {
          competitors: this.competitorsValidation,
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
              "settings/salesSettinigs/others/competitor/" +
              this.$store.state.others.otherTableEditData.id,
            action: "loadOthersTables",
            tag: "update",
            data: this.details.competitors[0],
            mutation: "fetchCompetitorsTable",
            type: "",
            id_key: "",
            listApiPath: "competitor",
          });
        } else {
          this.$store.dispatch("others/commonCRUD", {
            path: "settings/salesSettinigs/others/competitor",
            action: "loadOthersTables",
            tag: "add",
            data: this.details,
            mutation: "fetchCompetitorsTable",
            type: "",
            id_key: "",
            listApiPath: "competitor",
          });
        }
      }
    },
    addCompetitor() {
      this.details.competitors.push({
        competitor_name: "",
        address: "",
        postal_Code: "",
        country: "",
        state: "",
        building_name: "",
        floor_no: "",
        unit_no: "",
        email: "",
        phone_no: "",
        website: "",
      });
      this.competitorsValidation.push({
        competitor_name: { required },
      });
      this.cloneFieldClicked++;
      this.addCompetitors.push("new_competitor");
    },
    //   closeDialog() {
    //   this.$store.state["users"].displayDialog = false;
    // },
    deleteCompetitor(index) {
      this.details.competitors.splice(index, 1);
      this.competitorsValidation.splice(index, 1);
      this.addCompetitors.splice(index, 1);
      this.cloneFieldClicked++;
    },
    loadState() {
      if (
        Object.keys(this.$store.state.others.otherTableEditData).length != 0
      ) {
        this.details.competitors = [];
        this.addCompetitors = [];
        this.competitorsValidation = [];
        // for(let d in this.details){
        this.details.competitors.push(
          this.$store.state.others.otherTableEditData
        );
        this.addCompetitors.push("new_competitor");
        this.competitorsValidation.push({
          competitor_name: { required },
        });
        this.cloneFieldClicked++;
      }
    },
  },
  unmounted() {
    this.$store.dispatch("others/setOtherTableEditData", { data: {} });
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
h5 {
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
}
</style>
