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
      <h5 class="required dialog-label-text">Inspected by</h5>
      <DropDown
        code="code"
        :state="details.inspected_by"
        :data="InspectedBy"
        label="Inspected by"
        id="Inspected by"
        v-model="details.inspected_by"
        :classes="{
          'p-invalid': v$.details.inspected_by.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
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
      <h5 class="required dialog-label-text">Mileage</h5>
      <TextField
        label="idle_hours"
        type="number"
        v-model="details.mileage"
        :classes="{
          'p-invalid': v$.details.mileage.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
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
  </div>
  <span class="formTableHeader ml-3">Other Inspections</span>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <keep-alive>
        <FormTable
          v-if="$store.state.fleets.inspectionsDropDownTableData != null"
          :key="$store.state.fleets.inspectionsDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.fleets.inspectionsDropDownTableData"
          :tableColumns="
            $store.state.fleets.inspectionsDropDownTableDataColumns
          "
          storePath="fleets"
        />
      </keep-alive>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Problem</h5>
      <TextAreaField
        :state="details.problem"
        label="receipt_remarks"
        v-model="details.problem"
        @blur="v$.details.problem.$model;"
        :classes="{
          'p-invalid': v$.details.problem.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.remarks"
        label="receipt_remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <DragAndDropUpload
    :state="inspectionsAttachmentsState"
    type="vehicleCommons"
    storePath="fleets"
  />
  <h5 class="required dialog-label-text">Upload Images</h5>
  <MultiImagesUpload
    type="FleetsInspection"
    :state="multiImageChipsState"
    storePath="fleets"
  />
  <div
    v-if="submitted && $store.state.fleets.multiImagesUploadedData.length == 0"
    class="our-error p-error mismatch mb-2"
  >
    {{ mismatchError }}
  </div>
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
export default {
  name: "FleetInspectionDialog",
  data: () => ({
    mismatchError: "please upload a vehicle image!",
    inspectionsAttachmentsState: " ",
    vehicleImageState: "",
    selectionModeState: null,
    multiImageChipsState: null,
    InspectedBy: [
      { name: "Bill", code: "1" },
      { name: "Tom", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      vehicle_name: "",
      inspected_by: "",
      driver: "",
      mileage: "",
      date_time: "",
      problem: "",
      remarks: "",
      image_url: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        vehicle_name: { required },
        inspected_by: { required },
        driver: { required },
        mileage: { required },
        date_time: { required },
        problem: { required },
        remarks: { required },
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
        case "inspected_by":
          source = this.InspectedBy;
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
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (
        !this.v$.$invalid &&
        this.$store.state.fleets.multiImagesUploadedData.length != 0
      ) {
        let inspectionDetails = {};

        for (let d in this.details) {
          if (d == "date_time") {
            if (
              Object.keys(this.$store.state.fleets.fleetInspectionsStateData)
                .length != 0
            ) {
              inspectionDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              inspectionDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else if (
            d == "vehicle_reg_no" ||
            d == "driver" ||
            d == "inspected_by"
          ) {
            if (isNaN(this.details[d]) == false) {
              inspectionDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              inspectionDetails[d] = this.details[d];
            }
          } else {
            inspectionDetails[d] = this.details[d];
          }
        }

        setTimeout(() => {
          let otherInspectionsData = [];
          for (let oi in this.$store.state.fleets
            .inspectionsDropDownTableData) {
            for (let oj in this.$store.state.fleets.inspectionsFormTableData) {
              if (
                this.$store.state.fleets.inspectionsFormTableData[oj][
                  "inspection_check"
                ] ==
                this.$store.state.fleets.inspectionsDropDownTableData[oi][
                  "inspection_check"
                ]
              ) {
                let obj =
                  this.$store.state.fleets.inspectionsDropDownTableData[oi];
                let otherInspectionsObj = {};
                for (let ob in obj) {
                  if (ob == "inspection_check") {
                    otherInspectionsObj["inspection"] = obj[ob];
                  }
                  if (ob == "checked") {
                    let bool;
                    bool = obj[ob] == "Yes" ? true : false;
                    otherInspectionsObj[ob] = bool;
                  }
                  if (ob == "feedback") {
                    otherInspectionsObj[ob] = obj[ob];
                  }
                }
                otherInspectionsData.push(otherInspectionsObj);
              }
            }
          }
          inspectionDetails["other_inspection"] = otherInspectionsData;
          inspectionDetails["inspection_attachments"] =
            this.$store.state.fleets.vehicleInspectionFiles;
          inspectionDetails["inspection_images"] =
            this.$store.state.fleets.multiImagesUploadedData;

          if (
            Object.keys(this.$store.state.fleets.fleetInspectionsStateData)
              .length != 0
          ) {
            inspectionDetails["delete_inspection_attachments"] =
              this.$store.state.fleets.deletedVehicleInspectionFiles;
            inspectionDetails["delete_inspection_images"] =
              this.$store.state.fleets.deletedVehicleInspectionImages;
          }
          //making an update/PATCH api call to update insurance details
          if (this.$store.state.fleets.fleetInspectionsStateData.id) {
            inspectionDetails["id"] =
              this.$store.state.fleets.fleetInspectionsStateData.id;
            this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
              path: "inspection",
              loadApiName: "loadVehicleCommons",
              mutation: "fetchInspectionTableData",
              tag: "update",
              data: inspectionDetails,
              type: "Inspection",
            });
          }
          //making an add/POST api call to create new insurance details
          else {
            this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
              path: "inspection",
              loadApiName: "loadVehicleCommons",
              mutation: "fetchInspectionTableData",
              tag: "add",
              data: inspectionDetails,
              type: "Inspection",
            });
          }
        }, 700);
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.fleetInspectionsStateData)
          .length != 0
      ) {
        let otherInspectionData =
          this.$store.state.fleets.fleetInspectionsStateData[
            "other_inspection"
          ];
        let otherInspectionsState = [];
        for (let oi in this.$store.state.fleets.inspectionsDropDownTableData) {
          for (let oj in otherInspectionData) {
            if (
              otherInspectionData[oj]["inspection"] ==
              this.$store.state.fleets.inspectionsDropDownTableData[oi][
                "inspection_check"
              ]
            ) {
              this.$store.state.fleets.inspectionsDropDownTableData[oi][
                "checked"
              ] = otherInspectionData[oj]["checked"] == true ? "Yes" : "No";
              this.$store.state.fleets.inspectionsDropDownTableData[oi][
                "feedback"
              ] = otherInspectionData[oj]["feedback"];
              otherInspectionsState.push(
                this.$store.state.fleets.inspectionsDropDownTableData[oi]
              );
            }
          }
        }
        this.$store.state.fleets.inspectionsFormTableData =
          otherInspectionsState;
        this.selectionModeState = otherInspectionsState;

        let inspectionImagesData =
          this.$store.state.fleets.fleetInspectionsStateData[
            "inspection_images"
          ];
        this.$store.state.fleets.multiImagesUploadedData = JSON.parse(
          JSON.stringify(inspectionImagesData)
        );
        this.multiImageChipsState = inspectionImagesData;

        this.inspectionsAttachmentsState =
          this.$store.state.fleets.fleetInspectionsStateData[
            "inspection_attachments"
          ];
        this.$store.state.fleets.vehicleInspectionFiles =
          this.$store.state.fleets.fleetInspectionsStateData[
            "inspection_attachments"
          ];

        for (let state in this.details) {
          if (state == "date_time") {
            let rawDate = new Date(
              this.$store.state.fleets.fleetInspectionsStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.fleets.fleetInspectionsStateData[state];
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
          this.details.image_url = v_obj["image_url"];
        }
      }
    },
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "vehicleInspection";
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.fleets.multiImagesUploadedData = [];
    this.$store.state.fleets.deletedVehicleInspectionImages = [];
    this.$store.state.fleets.vehicleInspectionFiles = [];
    this.$store.state.fleets.deletedVehicleInspectionFiles = [];
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "inspectionCheck",
      mutation: "fetchInspectionDropDownTableData",
    });
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
    this.$store.state.fleets.multiImagesUploadedData = [];
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style scoped>
.formTableHeader {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #4e5968;
}
</style>
