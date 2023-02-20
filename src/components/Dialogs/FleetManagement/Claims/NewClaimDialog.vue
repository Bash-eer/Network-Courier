<template>
  <!--vehicle details-->
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Vehicle Reg No</h5>
      <DropDown
        code="code"
        :key="$store.state.fleets.vehiclesRegNoDropDownData"
        :state="details.vehicle_reg_no"
        :data="$store.state.fleets.vehiclesRegNoDropDownData"
        label="vehicle_reg_no"
        id="vehicle_reg_no"
        v-model="details.vehicle_reg_no"
        :classes="{
          'p-invalid': v$.details.vehicle_reg_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Vehicle Name</h5>
      <TextField
        :disabled="true"
        label="vehicle_name"
        type="text"
        v-model="details.vehicle_name"
        :classes="{
          'p-invalid': v$.details.vehicle_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <!--driver details-->
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Driver</h5>
      <DropDown
        code="code"
        :state="details.driver"
        :key="$store.state.fleets.driversDropDown"
        :data="$store.state.fleets.driversDropDown"
        label="driver"
        id="driver"
        v-model="details.driver"
        :classes="{
          'p-invalid': v$.details.driver.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <span class="bodyTxt claimsHeader">Claims</span>
      <!--card type-->
      <div class="flex flex-row mt-2">
        <span class="bodyTxt paidWithText">Paid with</span>
        <div class="ml-3 flex mr-3">
          <RadioButton
            id="cashCard"
            name="cashCard"
            value="Cash Card"
            v-model="details.paid_with"
          />
          <label class="radiosText ml-2" for="cashCard">Cash Card</label>
        </div>
        <div class="flex">
          <RadioButton
            id="personalCard"
            name="personalCard"
            value="Personal Card"
            v-model="details.paid_with"
          />
          <label class="radiosText ml-2 radios-text-paid-with-personal-card " for="personalCard"
            >Personal Card
          </label>
        </div>
      </div>
    </div>
  </div>
  <!--personal card fields-->
  <div class="formgrid grid" v-if="details.paid_with == 'Personal Card'">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text required">Card No</h5>
      <TextField
        label="card_no"
        type="text"
        class="uppercase"
        @keyup="uppercase"
        v-model="detailscard_no"
        :classes="{
          'p-invalid': v$.details.card_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <!--cash card fields-->
  <div class="formgrid grid" v-if="details.paid_with == 'Cash Card'">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Card No</h5>
      <TextField
        :disabled="false"
        label="card_no"
        type="text"
        v-model="details.card_no"
        :classes="{
          'p-invalid': v$.details.card_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Card Balance</h5>
      <TextField
        :disabled="false"
        label="card_balance"
        type="number"
        v-model="details.card_balance"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <!--claims-->
  <Accordion class="claimsAccordion" :multiple="true" :activeIndex="active">
    <AccordionTab v-for="(claim, index) of addClaims" :key="index">
      <template #header>
        <div class="flex justify-content-between ml-2 w-100">
          <div class="flex">{{ "Claim" + " " + (parseInt(index) + 1) }}</div>
          <div class="flex delete" v-if="index > 0" @click="deleteClaim(index)">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </template>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Receipt No</h5>
          <TextField
            label="recipt_no"
            type="text"
            v-model="details.card_claims[index]['recipt_no']"
            :classes="{
              'p-invalid':
                v$.details.card_claims[index]['recipt_no'].$invalid &&
                submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Location</h5>
          <TextField
            label="location"
            type="text"
            v-model="details.card_claims[index]['location']"
            :classes="{
              'p-invalid':
                v$.details.card_claims[index]['location'].$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Claim Type</h5>
          <DropDown
            code="code"
            :key="$store.state.fleets.claimsDropDownData"
            :state="details.card_claims[index]['claim_type']"
            :data="$store.state.fleets.claimsDropDownData"
            label="claim_type"
            id="claim_type"
            v-model="details.card_claims[index]['claim_type']"
            :classes="{
              'p-invalid':
                v$.details.card_claims[index]['claim_type'].$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <div class="flex flex-row">
            <div class="flex">
              <h5 class="dialog-label-text required">Claim Amount</h5>
            </div>
            <div class="flex pl-2">
              <CheckBox
                path="fleets"
                class="checksText"
                v-bind:checker="
                  details.card_claims[index]['gst'] == true
                    ? [
                        {
                          name: 'GST',
                          tag: 'gst',
                          key: 'gst',
                          index: index,
                        },
                      ]
                    : []
                "
                v-bind:categories="[
                  {
                    name: 'GST',
                    tag: 'gst',
                    key: 'gst',
                    index: index,
                  },
                ]"
                v-on:childToParent="checkBoxChange"
              />
            </div>
          </div>
          <TextField
            label="claim_amount"
            type="number"
            v-model="details.card_claims[index]['claim_amount']"
            :classes="{
              'p-invalid':
                v$.details.card_claims[index]['claim_amount'].$invalid &&
                submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text required">Claim Date & Time</h5>
          <div clas="flex">
            <div class="whiteDiv calendarDiv">
              <Calendar
                :showTime="true"
                :showSeconds="true"
                dateFormat="d MM yy"
                class="fleetsCalendar"
                v-model="details.card_claims[index]['claim_date_time']"
                :showIcon="true"
                style="width: 100%"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1950:2050"
                :class="{
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <!--add new claims-->
  <div class="flex justify-content-between mt-1">
    <div class="flex">
      <span class="new_contact Contact" @click="addClaim"
        ><b>+ Add New Claim</b></span
      >
    </div>
  </div>
  <!--remarks-->
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.remarks"
        label="remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!--attachments-->
  <div>
    <DragAndDropUpload
      :state="claimsAttachmentsState"
      type="expenditure"
      storePath="fleets"
    />
  </div>
  <!--form buttons-->
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text"
    />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import RadioButton from "primevue/radiobutton";
export default {
  name: "NewClaimDialog",
  components: {
    Accordion,
    AccordionTab,
    RadioButton,
  },
  data() {
    return {
      claimsAttachmentsState: " ",
      deletedClaims: [],
      active: 0,
      detailscard_no:"",
      addClaimsClicked: 0,
      cardsValidation: 0,
      addClaims: ["new_claim"],
      claimsValidation: [
        {
          recipt_no: { required },
          location: { required },
          claim_type: { required },
          claim_amount: { required },
        },
      ],
      v$: useVuelidate(),
      details: {
        vehicle_reg_no: "",
        vehicle_name: "",
        driver: "",
        paid_with: "Cash Card",
        card_no: "",
        remarks: "",
        card_claims: [
          {
            recipt_no: "",
            location: "",
            claim_type: "",
            claim_amount: "",
            gst: false,
            claim_date_time: "",
          },
        ],
      },
      submitted: false,
    };
  },
  validations() {
    if (this.addClaimsClicked > -1) {
      return {
        details: {
          vehicle_reg_no: { required },
          vehicle_name: { required },
          driver: { required },
          card_no: { required },
          remarks: { required },
          card_claims: this.claimsValidation,
        },
      };
    }
  },
  methods: {
    uppercase() {
        this.detailscard_no = this.detailscard_no.toUpperCase();
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY HH:mm:ss");
        return formattedDate;
      }
    },
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "vehicle_reg_no":
          source = this.$store.state.fleets.vehiclesRegNoDropDownData;
          break;
        case "driver":
          source = this.$store.state.fleets.driversDropDown;
          break;
        case "claim_type":
          source = this.$store.state.fleets.claimsDropDownData;
          break;
      }
      return source;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    addClaim() {
      this.details.card_claims.push({
        recipt_no: "",
        location: "",
        claim_type: "",
        claim_amount: "",
        gst: false,
        claim_date_time: "",
      });
      this.claimsValidation.push({
        recipt_no: { required },
        location: { required },
        claim_type: { required },
        claim_amount: { required },
      });
      this.addClaimsClicked++;
      this.addClaims.push("new_claim");
    },
    deleteClaim(index) {
      if (
        Object.keys(this.$store.state.fleets.expenditureClaimsStateData)
          .length != 0
      ) {
        for (let cl in this.details.card_claims) {
          if (index == cl) {
            this.deletedClaims.push(this.details.card_claims[cl]["id"]);
          }
        }
      }
      this.details.card_claims.splice(index, 1);
      this.addClaims.splice(index, 1);
      this.claimsValidation.splice(index, 1);
      this.addClaimsClicked++;
    },
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details.card_claims[val[0].index][val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details.card_claims[src[0].index][src[0].tag] = false;
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let claimDetails = {};
        for (let c in this.details.card_claims) {
          let cObj = this.details.card_claims[c];
          for (let cKeys in cObj) {
            if (cKeys == "claim_type") {
              if (isNaN(cObj[cKeys]) == false) {
                this.details.card_claims[c][cKeys] = this.dropDownFilter(
                  this.getDropDownData(cKeys),
                  "code",
                  cObj[cKeys]
                );
              } else {
                this.details.card_claims[c][cKeys] = cObj[cKeys];
              }
            }
          }
        }
        for (let d in this.details) {
          if (d == "claim_date_time") {
            if (
              Object.keys(this.$store.state.fleets.expenditureClaimsStateData)
                .length != 0
            ) {
              claimDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              claimDetails[d] = this.details[d];
            }
          } else if (d == "vehicle_reg_no" || d == "driver") {
            if (isNaN(this.details[d]) == false) {
              claimDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              claimDetails[d] = this.details[d];
            }
          } else {
            claimDetails[d] = this.details[d];
          }
        }

        claimDetails["claims_attachments"] =
          this.$store.state.fleets.expenditureClaimsFiles;

        if (
          Object.keys(this.$store.state.fleets.expenditureClaimsStateData)
            .length != 0
        ) {
          claimDetails["delete_claims_attachments"] =
            this.$store.state.fleets.deletedexpenditureClaimsFiles;
          claimDetails["delete_card_claims"] = this.deletedClaims;
        }

        this.$store.state.fleets.expenditureClaimsTab = this.details.paid_with;

        //making an update/PATCH api call to update claims details
        if (this.$store.state.fleets.expenditureClaimsStateData.id) {
          claimDetails["id"] =
            this.$store.state.fleets.expenditureClaimsStateData.id;
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "claim",
            loadApiName: "loadExpenditureCommons",
            mutation:
              claimDetails.paid_with == "Cash Card"
                ? "fetchExpenditureClaimsCashCardTableData"
                : "fetchExpenditureClaimsPersonalCardTableData",
            tag: "update",
            data: claimDetails,
          });
        }
        //making an add/POST api call to create new claim details
        else {
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "claim",
            loadApiName: "loadExpenditureCommons",
            mutation:
              claimDetails.paid_with == "Cash Card"
                ? "fetchExpenditureClaimsCashCardTableData"
                : "fetchExpenditureClaimsPersonalCardTableData",
            tag: "add",
            data: claimDetails,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.expenditureClaimsStateData)
          .length != 0
      ) {
        this.claimsAttachmentsState =
          this.$store.state.fleets.expenditureClaimsStateData[
            "expenditure_claim_attachments"
          ];
        this.$store.state.fleets.expenditureClaimsFiles =
          this.$store.state.fleets.expenditureClaimsStateData[
            "expenditure_claim_attachments"
          ];
        for (let state in this.details) {
          if (state == "claim_date_time") {
            let rawDate = new Date(
              this.$store.state.fleets.expenditureClaimsStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else if (state == "driver_id") {
            this.details["driver_id"] =
              this.$store.state.fleets.expenditureClaimsStateData[
                "driver_name"
              ];
          } else if (state == "card_claims") {
            this.details.card_claims = [];
            this.addClaims = [];
            this.claimsValidation = [];
            let claimsData =
              this.$store.state.fleets.expenditureClaimsStateData[
                "expenditure_claims_card"
              ];
            for (let c in claimsData) {
              this.addClaims.push("new_claim");
              let cObj = claimsData[c];
              let claimsObj = {};
              let claimsValidationObj = {};
              for (let cKeys in cObj) {
                if (
                  cKeys == "id" ||
                  cKeys == "recipt_no" ||
                  cKeys == "location" ||
                  cKeys == "claim_type" ||
                  cKeys == "claim_amount" ||
                  cKeys == "gst" ||
                  cKeys == "claim_date_time"
                ) {
                  claimsObj[cKeys] = cObj[cKeys];
                  if (
                    cKeys == "recipt_no" ||
                    cKeys == "location" ||
                    cKeys == "claim_type" ||
                    cKeys == "claim_amount"
                  ) {
                    claimsValidationObj[cKeys] = { required };
                  }
                }
              }
              this.details.card_claims.push(claimsObj);
              this.claimsValidation.push(claimsValidationObj);
            }
          } else {
            this.details[state] =
              this.$store.state.fleets.expenditureClaimsStateData[state];
          }
        }
      }
    },
  },
  watch: {
    "$store.state.fleets.cashCardNumber": function () {
      if (this.details.paid_with == "Cash Card") {
        this.details["card_no"] = this.$store.state.fleets.cashCardNumber;
      }
    },
    "$store.state.fleets.cashCardBalance": function () {
      if (this.details.paid_with == "Cash Card") {
        this.details["card_balance"] = this.$store.state.fleets.cashCardBalance;
      }
    },
    "details.paid_with": function () {
      let cardType = this.details.paid_with;
      this.details["card_no"] = "";
      if (cardType == "Cash Card") {
        this.details["card_balance"] = "";
        if (
          this.$store.state.fleets.cashCardNumber != null &&
          this.$store.state.fleets.cashCardBalance != null
        ) {
          this.details["card_no"] = this.$store.state.fleets.cashCardNumber;
          this.details["card_balance"] =
            this.$store.state.fleets.cashCardBalance;
        }
      }
      if (cardType == "Personal Card") {
        if (this.details["card_balance"]) {
          delete this.details["card_balance"];
        }
      }
    },
    "details.vehicle_reg_no": function () {
      let regNo;
      if (isNaN(this.details["vehicle_reg_no"]) == false) {
        regNo = this.dropDownFilter(
          this.getDropDownData("vehicle_reg_no"),
          "code",
          this.details.vehicle_reg_no
        );
      } else {
        regNo = this.details.vehicle_reg_no;
      }
      for (let v in this.$store.state.fleets.vehiclesCommonDropDownData) {
        let v_obj = this.$store.state.fleets.vehiclesCommonDropDownData[v];
        if (v_obj["reg_no"] == regNo) {
          this.details.vehicle_name = v_obj["name"];
        }
      }
      if (this.details.paid_with == "Cash Card") {
        this.$store.dispatch("fleets/loadFleetDropDowns", {
          path: "cashCard/" + regNo,
          mutation: "fetchCashCardDetails",
        });
      }
    },
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "expenditureClaims";
  },
  unmounted() {
    this.$store.state.fleets.expenditureClaimsFiles = [];
    this.$store.state.fleets.deletedexpenditureClaimsFiles = [];
    this.$store.state.fleets.cashCardNumber = null;
    this.$store.state.fleets.cashCardBalance = null;
    this.$store.state.fleets.expenditureClaimsTab = null;
    this.$store.state.fleets.expenditureClaimsStateData = {};
  },
  created() {
    this.deletedClaims = [];
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicles",
      mutation: "fetchVehiclesCommonDropDownData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "drivers",
      mutation: "fetchDriversDropDownData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "claimTypes",
      mutation: "fetchClaimsDropDownData",
    });
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style>
.claimsAccordion .p-accordion-tab .p-accordion-content {
  background: #f0f5fc !important;
}
.fa-times {
  color: red;
}
.bodyTxt {
  font-family: Montserrat;
  color: #4e5868;
}
.claimsHeader {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
.paidWithText {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
}
.Contact{
 color:  #357DEA;
}
.radiosText{
font-weight: bold;
font-size: 12px;
align-self: center;
color: #919191;
}
.radios-text-paid-with-personal-card{
  color:  #357DEA;
}
</style>
