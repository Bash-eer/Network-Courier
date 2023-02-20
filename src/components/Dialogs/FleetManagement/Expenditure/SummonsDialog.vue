<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Reg No</h5>
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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Name</h5>
      <TextField
        :disabled="true"
        label="vehicle_name"
        type="text"
        v-model="details.vehicle_name"
        :classes="{
          'p-invalid': v$.details.vehicle_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Notice No</h5>
      <TextField
        label="notice_no"
        type="text"
        v-model="details.notice_no"
        :classes="{
          'p-invalid': v$.details.notice_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.date_time"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Offence Place</h5>
      <TextField
        label="offence_place"
        type="text"
        v-model="details.offence_place"
        :classes="{
          'p-invalid': v$.details.offence_place.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Fine Amount</h5>
      <TextField
        label="fine_amount"
        type="amount"
        v-model="details.fine_amount"
        :classes="{
          'p-invalid': v$.details.fine_amount.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Due Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.due_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.due_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Summon Remarks</h5>
      <TextAreaField
        :state="details.summon_remarks"
        label="summon_remarks"
        v-model="details.summon_remarks"
        @blur="v$.details.summon_remarks.$model;"
        :classes="{
          'p-invalid': v$.details.summon_remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Receipt No.</h5>
      <TextField
        label="receipt_no"
        type="text"
        v-model="details.receipt_no"
        :classes="{
          'p-invalid': v$.details.receipt_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Receipt Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.receipt_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.receipt_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Paid by</h5>
      <DropDown
        code="code"
        :state="details.paid_by"
        :data="paidBy"
        label="paid_by"
        id="paid_by"
        v-model="details.paid_by"
        :classes="{
          'p-invalid': v$.details.paid_by.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Receipt Remarks</h5>
      <TextAreaField
        :state="details.receipt_remarks"
        label="receipt_remarks"
        v-model="details.receipt_remarks"
        @blur="v$.details.receipt_remarks.$model;"
        :classes="{
          'p-invalid': v$.details.receipt_remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="summonsOrReceiptsAttachmentsState"
      type="expenditure"
      storePath="fleets"
    />
  </div>
  <div class="flex align-self-center justify-content-end mt-2">
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
export default {
  name: "SummonsDialog",
  data: () => ({
    summonsOrReceiptsAttachmentsState: " ",
    date: null,
    paidBy: [
      { name: "Bill", code: "1" },
      { name: "Tim", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      vehicle_name: "",
      notice_no: "",
      date_time: "",
      driver: "",
      offence_place: "",
      fine_amount: "",
      due_date: "",
      summon_remarks: "",
      receipt_no: "",
      receipt_date: "",
      paid_by: "",
      receipt_remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        vehicle_name: { required },
        notice_no: { required },
        date_time: { required },
        driver: { required },
        offence_place: { required },
        fine_amount: { required },
        due_date: { required },
        summon_remarks: { required },
        receipt_no: { required },
        receipt_date: { required },
        paid_by: { required },
        receipt_remarks: { required },
      },
    };
  },
  methods: {
    getDropDownData(key) {
      let source;
      switch (key) {
        case "vehicle_reg_no":
          source = this.$store.state.fleets.vehiclesRegNoDropDownData;
          break;
        case "driver":
          source = this.$store.state.fleets.driversDropDown;
          break;
        case "paid_by":
          source = this.paidBy;
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let date = rawDate.getDate();
      let month = rawDate.getMonth();
      month += 1;
      let year = rawDate.getFullYear();
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let summonsDetails = {};
        for (let d in this.details) {
          if (d == "due_date" || d == "receipt_date") {
            summonsDetails[d] = this.customDateFormatter(this.details[d]);
          } else if (d == "date_time") {
            if (
              Object.keys(this.$store.state.fleets.expenditureSummonsStateData)
                .length != 0
            ) {
              summonsDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              summonsDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else if (d == "vehicle_reg_no" || d == "driver" || d == "paid_by") {
            if (isNaN(this.details[d]) == false) {
              summonsDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              summonsDetails[d] = this.details[d];
            }
          } else {
            summonsDetails[d] = this.details[d];
          }
        }
        summonsDetails["summon_attachments"] =
          this.$store.state.fleets.expenditureSummonsFiles;

        if (
          Object.keys(this.$store.state.fleets.expenditureSummonsStateData)
            .length != 0
        ) {
          summonsDetails["delete_summon_attachments"] =
            this.$store.state.fleets.deletedexpenditureSummonsFiles;
        }

        //making an update/PATCH api call to update summon details
        if (this.$store.state.fleets.expenditureSummonsStateData.id) {
          summonsDetails["id"] =
            this.$store.state.fleets.expenditureSummonsStateData.id;
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "summons",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureSummonsTableData",
            tag: "update",
            data: summonsDetails,
          });
        }
        //making an add/POST api call to create new summon details
        else {
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "summons",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureSummonsTableData",
            tag: "add",
            data: summonsDetails,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.expenditureSummonsStateData)
          .length != 0
      ) {
        this.summonsOrReceiptsAttachmentsState =
          this.$store.state.fleets.expenditureSummonsStateData[
            "expenditure_summon_attachments"
          ];
        this.$store.state.fleets.expenditureSummonsFiles =
          this.$store.state.fleets.expenditureSummonsStateData[
            "expenditure_summon_attachments"
          ];
        for (let state in this.details) {
          if (
            state == "date_time" ||
            state == "due_date" ||
            state == "receipt_date"
          ) {
            let rawDate = new Date(
              this.$store.state.fleets.expenditureSummonsStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else if (state == "driver_id") {
            this.details["driver_id"] =
              this.$store.state.fleets.expenditureSummonsStateData[
                "driver_name"
              ];
          } else {
            this.details[state] =
              this.$store.state.fleets.expenditureSummonsStateData[state];
          }
        }
      }
    },
  },
  watch: {
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
    },
  },
  unmounted() {
    this.$store.state.fleets.expenditureSummonsFiles = [];
    this.$store.state.fleets.deletedexpenditureSummonsFiles = [];
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "expenditureSummons";
  },
  created() {
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicles",
      mutation: "fetchVehiclesCommonDropDownData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "drivers",
      mutation: "fetchDriversDropDownData",
    });
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style scoped></style>
