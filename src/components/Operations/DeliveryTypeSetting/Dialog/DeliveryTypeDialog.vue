<template>
  <!-- DRIVER DROPDOWN SECTION -->
  <div class="grid mt-3 mx-2">
    <div class="field col-5">
      <h5 class="required color-7a7a7a text-xs">Driver</h5>
      <!-- BIKE -->
      <div v-if="this.tabButton == 'Bike'">
        <DropDownWithButtons
          :data="dropDownData ? dropDownData : DriverBikeTypeData"
          tableDataName="BikeDefaultAllotmentData"
          storePath="operationAllotment"
          class="text-left"
          @selectedName="getselectedName"
          v-model="details.driver"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <!-- VAN -->
      <div v-if="this.tabButton == 'Van'">
        <DropDownWithButtons
          :data="dropDownData ? dropDownData : DriverVanTypeData"
          tableDataName="BikeDefaultAllotmentData"
          storePath="operationAllotment"
          @selectedName="getselectedName"
          v-model="details.driver"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <!-- RAPIDO -->
      <div v-if="this.tabButton == 'Rapido'">
        <DropDownWithButtons
          :data="dropDownData ? dropDownData : DriverRapidoTypeData"
          tableDataName="BikeDefaultAllotmentData"
          storePath="operationAllotment"
          @selectedName="getselectedName"
          v-model="details.driver"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <!-- DELIVERY DROPDOWN SECTION -->
    <div class="field col-3 ml-8">
      <h5 class="required color-7a7a7a text-xs">Delivery Type</h5>
      <div clas="flex">
        <!-- BIKE -->
        <div v-if="this.tabButton == 'Bike'" :key="alterKey">
          <AddNewDropDownTextField
            stateName="addNewDropDownDatasettings"
            :state="details.delivery_type"
            :data="this.addNewDropDownDatasettingsData"
            :placeholder="'Choose Delivery Type Name'"
            storePath="TypeSetting"
            v-model="details.delivery_type"
            code="name"
            :classes="{
              'p-invalid': v$.details.delivery_type.$invalid && submitted,
              'inputfield dialog-dropdown-text ': true,
            }"
          />
          <!-- VAN -->
        </div>
        <div v-if="this.tabButton == 'Van'" :key="alterKey">
          <AddNewDropDownTextField
            stateName="addNewDropDownDatasettingsVan"
            :state="details.delivery_type"
            :data="this.addNewDropDownDatasettingsVanData"
            :placeholder="'Choose Delivery Type Name'"
            storePath="TypeSetting"
            v-model="details.delivery_type"
            code="name"
            :classes="{
              'p-invalid': v$.details.delivery_type.$invalid && submitted,
              'inputfield dialog-dropdown-text ': true,
            }"
          />
        </div>
        <!-- RAPIDO -->
        <div v-if="this.tabButton == 'Rapido'" :key="alterKey">
          <AddNewDropDownTextField
            stateName="addNewDropDownDatasettingsRapido"
            :state="details.delivery_type"
            :data="this.addNewDropDownDatasettingsRapidoData"
            :placeholder="'Choose Delivery Type Name'"
            storePath="TypeSetting"
            v-model="details.delivery_type"
            code="name"
            :classes="{
              'p-invalid': v$.details.delivery_type.$invalid && submitted,
              'inputfield dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- CALENDER SECTION -->
  <div class=" grid mt-3 mx-2">
    <div class="field col-5">
      <h5 class="required color-7a7a7a text-xs">From</h5>
      <Calendar
        code="name"
        label="bike_zone"
        style="width: 70%"
        :showIcon="true"
        dateFormat="d MM yy"
        v-model="details.from"
        :class="{
          'p-invalid': v$.details.from.$invalid && submitted,
          'inputfield  color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-3 ml-8">
      <h5 class="required color-7a7a7a text-xs">To</h5>
      <div class="flex">
        <Calendar
          code="name"
          label="bike_zone"
          style="width: 100%"
          :showIcon="true"
          dateFormat="d MM yy"
          v-model="details.to"
          :classes="{
            'p-invalid': v$.details.to.$invalid && submitted,
            'inputfield color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
  </div>
  <!-- RADIO BUTTON SECTION -->
  <!-- BIKE -->
  <div v-if="this.tabButton == 'Bike'">
    <span class="bold-700 font-size-12 color-4e5868 ml-2 mb-1">Trips</span>
    <div
      class="
        flex
        mt-2
        add-follow-heading
        bold-700
        font-size-12
        color-717171
        ml-2
        mb-2
        overflow-auto
      "
    >
      <div class="flex flex-row mr-4">
        <div class="flex mr-1" :key="alterKey">
          <div
            v-for="category of BikeTypeData"
            :key="category.key"
            :class="
              path == 'fleets' ? 'p-field-checkbox' : 'p-field-checkbox m-2'
            "
          >
            <Checkbox v-model="category['selected']" :binary="true" />
            <label class="overflow-auto ml-2" :for="category.key">{{
              category.trip_name
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- VAN -->
  <div v-if="this.tabButton == 'Van'">
    <span class="bold-700 font-size-12 color-4e5868 ml-2 mb-1">Trips</span>
    <div
      class="
        flex
        mt-2
        add-follow-heading
        bold-700
        font-size-12
        color-717171
        ml-2
        mb-2
        overflow-auto
      "
      style="overflow: auto"
    >
      <div class="flex flex-row mr-4">
        <div class="flex mr-1" :key="alterKey">
          <div
            v-for="category of VanTypeData"
            :key="category.key"
            :class="
              path == 'fleets' ? 'p-field-checkbox' : 'p-field-checkbox m-2'
            "
          >
            <Checkbox v-model="category['selected']" :binary="true" />
            <label class="overflow-auto ml-2" :for="category.key">{{
              category.trip_name
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- RAPIDO -->
  <div v-if="this.tabButton == 'Rapido'">
    <span class="bold-700 font-size-12 color-4e5868 ml-2 mb-1">Trips</span>
    <div
      class="
        flex
        mt-2
        add-follow-heading
        bold-700
        font-size-12
        color-717171
        ml-2
        mb-2
        overflow-auto
      "
    >
      <div class="flex flex-row mr-4">
        <div class="flex mr-1 overflow-auto">
          <div
            v-for="category of RapidoTypeData"
            :key="category.key"
            :class="
              path == 'fleets' ? 'p-field-checkbox' : 'p-field-checkbox m-2'
            "
          >
            <Checkbox v-model="category['selected']" :binary="true" />
            <label class="overflow-auto ml-2" :for="category.key">{{
              category.trip_name
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showError == true" class="red mt-1">Please select a call type</div>
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
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="TypeSetting"
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
</template>

<script>
import Checkbox from "primevue/checkbox";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import DropDownWithButtons from "../DeliveryTypeSettingTable/DropDownWithButtons.vue";
import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "DeliveryTypeDialog",
  components: {
    DropDownWithButtons,
    Checkbox,
  },
  data() {
    return {
      showError: false,
      BikeTypeData: [
        { label: "1st", tag: "called" },
        { label: "2nd", tag: "call_received" },
        { label: "3rd", tag: "meeting" },
        { label: "4th", tag: "Email" },
        { label: "5th", tag: "SMS" },
      ],
      VanTypeData: [
        { label: "1st", tag: "called" },
        { label: "2nd", tag: "call_received" },
        { label: "3rd", tag: "meeting" },
        { label: "4th", tag: "Email" },
        { label: "5th", tag: "SMS" },
      ],
      DriverBikeTypeData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      DriverRapidoTypeData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      DriverVanTypeData: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      RapidoTypeData: [
        { label: "1st", tag: "called" },
        { label: "2nd", tag: "call_received" },
        { label: "3rd", tag: "meeting" },
        { label: "4th", tag: "Email" },
        { label: "5th", tag: "SMS" },
      ],

      details: {
        driver: "",
        driver_id: "",
        delivery_type: "",
        from: " ",
        to: " ",
      },
      renderkey: 8,
      alterKey: 10,
      payloadData: {},
      v$: useVuelidate(),
      submitted: false,
      radiobuttonData: [],
      radiobuttonDatavan: [],
      radiobuttonDatarapido: [],
      dropDownData: null,
    };
  },
  validations() {
    return {
      details: {
        //driver: { required },
        delivery_type: { required },
        from: { required },
        to: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      tabButton: "TypeSetting/addRegionDeliveryTransportTypeData",
      addNewDropDownDatasettingsData:
        "TypeSetting/addNewDropDownDatasettingsData",
      addNewDropDownDatasettingsVanData:
        "TypeSetting/addNewDropDownDatasettingsVanData",
      addNewDropDownDatasettingsRapidoData:
        "TypeSetting/addNewDropDownDatasettingsRapidoData",
      DeliveryTypeSettingStateDatabike:
        "TypeSetting/DeliveryTypeSettingStateDatabike",
      DeliveryTypeSettingStateDataVanData:
        "TypeSetting/DeliveryTypeSettingStateDataVanData",
      DeliveryTypeSettingStateDataRapidoData:
        "TypeSetting/DeliveryTypeSettingStateDataRapidoData",
      PrefillBikeDeliveryData: "TypeSetting/PrefillBikeDeliveryData",
      PrefillVanDeliveryDatawireup: "TypeSetting/PrefillVanDeliveryDatawireup",
      PrefillRapidoDeliveryDatawireup:
        "TypeSetting/PrefillRapidoDeliveryDatawireup",
      addNewDropDownDatasettingsdropData:
        "TypeSetting/addNewDropDownDatasettingsdropData",
      getDriverDropDownList: "TypeSetting/getDriverDropDownList",
    }),
    ...mapState({
      PrefillVanDeliveryData: (state) =>
        state.TypeSetting.PrefillVanDeliveryData,
      PrefillBikeDeliveryData: (state) =>
        state.TypeSetting.PrefillBikeDeliveryData,
      PrefillRapidoDeliveryData: (state) =>
        state.TypeSetting.PrefillRapidoDeliveryData,
    }),
  },
  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: "TypeSetting/POSTPATCHCRUDOPERATION",
      loadPrefillRapidoDeliveryData:
        "TypeSetting/loadPrefillRapidoDeliveryData",
      loadPrefillVanDeliveryData: "TypeSetting/loadPrefillVanDeliveryData",
      loadPrefillBikeDeliveryData: "TypeSetting/loadPrefillBikeDeliveryData",
    }),

    getselectedName({ name, id }) {
      this.details.driver = name;
      this.details.driver_id = id;
    },
    // FOR PUSH THE DATA SECTION
    //BIKE
    getdata() {
      this.addNewDropDownDatasettingsData[0].items = [];
      this.DeliveryTypeBikeDropDown.map((list) => {
        this.addNewDropDownDatasettingsData[0].items.push({
          name: list.delivery_type,
          code: list.delivery_type,
        });
      });
    },
    //VAN
    getdataVan() {
      this.addNewDropDownDatasettingsVanData[0].items = [];
      this.DeliveryTypeVanDropDown.map((list) => {
        this.addNewDropDownDatasettingsVanData[0].items.push({
          name: list.delivery_type,
          code: list.delivery_type,
        });
      });
    },
    //RAPIDO
    getdataRapido() {
      this.addNewDropDownDatasettingsRapidoData[0].items = [];
      this.DeliveryTypeRapidoDropDown.map((list) => {
        this.addNewDropDownDatasettingsRapidoData[0].items.push({
          name: list.delivery_type,
          code: list.delivery_type,
        });
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        this.payloadData = this.details;
        this.payloadData.trips = [];

        if (this.tabButton == "Bike") {
          this.BikeTypeData.map((list) => {
            this.payloadData.trips.push({
              trip_name: list.trip_name,
              trip_id:this.DeliveryTypeSettingStateDatabike.id ? Number(list.trip_id):Number(list.id),
              selected: list.selected,
            });
          });
        }
        if (this.tabButton == "Van") {
          this.VanTypeData.map((list) => {
            this.payloadData.trips.push({
              trip_name: list.trip_name,
              trip_id: this.DeliveryTypeSettingStateDataVanData?.id ? Number(list.trip_id):Number(list.id),
              selected: list.selected,
            });
          });
        }
        if (this.tabButton == "Rapido") {
          this.RapidoTypeData.map((list) => {
            this.payloadData.trips.push({
              trip_name: list.trip_name,
              trip_id: this.DeliveryTypeSettingStateDataRapidoData?.id ? Number(list.trip_id):Number(list.id),
              selected: list.selected,
            });
          });
        }
        if (
          this.DeliveryTypeSettingStateDataVanData?.id ||
          this.DeliveryTypeSettingStateDatabike.id ||
          this.DeliveryTypeSettingStateDataRapidoData.id
        ) {
          if (this.tabButton == "Bike") {
            this.apiPatchCallHandlerBike();
          } else if (this.tabButton == "Van") {
            this.apiPatchCallHandlerVan();
          } else if (this.tabButton == "Rapido") {
            this.apiPatchCallHandlerRapido();
          }
        } else {
          if (this.tabButton == "Bike") {
            this.addBikeZoneData();
          } else if (this.tabButton == "Van") {
            this.addVanZoneData();
          } else if (this.tabButton == "Rapido") {
            this.addRapidoZoneData();
          }
        }
      }
    },
    //POST API DATAS
    addBikeZoneData() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/bike/deliverytypes",

        data: payload,
        method: "POST",
        loadData: "TypeSetting/loadBikedeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `Delivery Type Setting is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Delivery Type Setting already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Delivery Type Setting, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addVanZoneData() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/van/deliverytypes",

        data: payload,
        method: "POST",
        loadData: "TypeSetting/loadVandeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `Delivery Type Setting is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Delivery Type Setting already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Delivery Type Setting, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addRapidoZoneData() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/rapido/deliverytypes",

        data: payload,
        method: "POST",
        loadData: "TypeSetting/loadRapidodeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `Delivery Type Setting is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Delivery Type Setting already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Delivery Type Setting, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    //EDIT DATA WIREUP
    apiPatchCallHandlerBike() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path:
          "/operations/rider-allot/bike/deliverytypes/" +
          this.DeliveryTypeSettingStateDatabike.id,

        data: payload,
        method: "PUT",
        loadData: "TypeSetting/loadBikedeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `Delivery Type Setting is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Delivery Type Setting already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in creating the Delivery Type Setting, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandlerVan() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path:
          "/operations/rider-allot/van/deliverytypes/" +
          this.DeliveryTypeSettingStateDataVanData.id,

        data: payload,
        method: "PUT",
        loadData: "TypeSetting/loadVandeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandlerRapido() {
      let payload = this.details;
      payload.delivery_type = this.details.delivery_type.name;
      this.POSTPATCHCRUDOPERATION({
        path:
          "/operations/rider-allot/rapido/deliverytypes/" +
          this.DeliveryTypeSettingStateDataRapidoData.id,

        data: payload,
        method: "PUT",
        loadData: "TypeSetting/loadRapidodeliveryTypeTableData",
        closeDialogue: "TypeSetting/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    //     RADIO BUTTON WIREUP SECTION
    async getTripDataBike() {
      this.BikeTypeData = [];
      await axios
        .get("/operations/rider-allot/suggestions/callTrips/bike")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["selected"] = false;
              this.BikeTypeData.push(res.data.results[c]);
            }
          }
        });
    },
    async getTripDataVan() {
      this.VanTypeData = [];
      await axios
        .get("/operations/rider-allot/suggestions/callTrips/van")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["selected"] = false;
              this.VanTypeData.push(res.data.results[c]);
            }
          }
        });
    },
    async getTripDataRapido() {
      this.RapidoTypeData = [];
      await axios
        .get("/operations/rider-allot/suggestions/callTrips/rapido")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["selected"] = false;
              this.RapidoTypeData.push(res.data.results[c]);
            }
          }
        });
    },

    //     DATA DRIVER DROPDOWN WIREUP SECTION

    async getTripDataBikedriver() {
      this.DriverBikeTypeData = [];
      await axios.get("/hrms/employee/rider").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["employee_name"];
            this.DriverBikeTypeData.push(res.data.results[c]);
          }
        }
      });
    },
    async getTripDataVandriver() {
      this.DriverVanTypeData = [];
      await axios.get("/hrms/employee/driver").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["employee_name"];
            this.DriverVanTypeData.push(res.data.results[c]);
          }
        }
      });
    },
    async getTripRapidoVandriver() {
      this.DriverRapidoTypeData = [];
      await axios.get("/hrms/employee/rapidodriver").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["employee_name"];
            this.DriverRapidoTypeData.push(res.data.results[c]);
          }
        }
      });
    },
    //     DELIVERYTYPE DROPDOWN DATA WIREUP SECTION
    async getDeliveryTypeBikeDropDown() {
      this.DeliveryTypeBikeDropDown = [];
      await axios
        .get("/operations/delivery-types/dropdown/bike")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["delivery_type"];
              this.DeliveryTypeBikeDropDown.push(res.data.results[c]);
            }
          }
        });
      this.getdata();
    },
    async getDeliveryTypeVanDropDown() {
      this.DeliveryTypeVanDropDown = [];
      await axios.get("/operations/delivery-types/dropdown/van").then((res) => {
        if (res.data.results) {
          for (let c in res.data.results) {
            res.data.results[c]["name"] = res.data.results[c]["delivery_type"];
            res.data.results[c]["code"] = res.data.results[c]["delivery_type"];
            this.DeliveryTypeVanDropDown.push(res.data.results[c]);
          }
        }
      });
      this.getdataVan();
    },
    async getDeliveryTypeRapidoDropDown() {
      this.DeliveryTypeRapidoDropDown = [];
      await axios
        .get("/operations/delivery-types/dropdown/rapido")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["delivery_type"];
              this.DeliveryTypeRapidoDropDown.push(res.data.results[c]);
            }
          }
        });
      this.getdataRapido();
    },

    prefillEditData() {
      if (this.tabButton == "Bike") {
        let incomingData = this.PrefillBikeDeliveryData;
        this.details.from = incomingData.from ? this.dateFormater(incomingData.from) : new Date();
        this.details.to = incomingData.to ?this.dateFormater(incomingData.to) : new Date();
        this.details.driver = incomingData.driver_details?.employee_name;
        this.details.driver_id = incomingData.driver_details?.id;

        if (incomingData.bike_trips) {
          this.BikeTypeData = incomingData.bike_trips;
        }
      }
    },
    prefillEditDataVan() {
      if (this.tabButton == "Van") {
        let incomingData = this.PrefillVanDeliveryDatawireup;
        this.details.from = incomingData.from ?this.dateFormater(incomingData.from) :new Date();
        this.details.to = incomingData.to ?this.dateFormater(incomingData.to):new Date();
        this.details.driver = incomingData.driver_details?.employee_name;
        this.details.driver_id = incomingData.driver_details?.id;

        if (incomingData.Van_trips) {
          this.VanTypeData = incomingData.Van_trips;
        }
      }
    },
    prefillEditDataRapido() {
      if (this.tabButton == "Rapido") {
        let incomingData = this.PrefillRapidoDeliveryDatawireup;
        this.details.from = incomingData.from ?this.dateFormater(incomingData.from) :new Date();
        this.details.to = incomingData.to ?this.dateFormater(incomingData.to):new Date();
        this.details.driver = incomingData.driver_details?.employee_name;
        this.details.driver_id = incomingData.driver_details?.id;
        if (incomingData.rapido_trips) {
          this.RapidoTypeData = incomingData.rapido_trips;
        }
      }
    },
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },

  async created() {
    await this.getTripDataBike();
    await this.getTripDataVan();
    await this.getTripDataRapido();
    await this.getTripDataBikedriver();
    await this.getTripDataVandriver();
    await this.getTripRapidoVandriver();
    await this.getDeliveryTypeBikeDropDown();
    await this.getDeliveryTypeVanDropDown();
    await this.getDeliveryTypeRapidoDropDown();
    if (this.tabButton == "Bike") {
      await this.loadPrefillBikeDeliveryData({
        id: this.DeliveryTypeSettingStateDatabike?.id,
      });
      const DropdownBike = {
        name: this.PrefillBikeDeliveryData.delivery_type,
        code: this.PrefillBikeDeliveryData.delivery_type,
      };
      this.details.delivery_type = DropdownBike;
      this.alterKey += 1;
      
      this.prefillEditData();
    }

    if (this.tabButton == "Van") {
      await this.loadPrefillVanDeliveryData({
        id: this.DeliveryTypeSettingStateDataVanData?.id,
      });

      const DrpdownData = {
        name: this.PrefillVanDeliveryData.delivery_type,
        code: this.PrefillVanDeliveryData.delivery_type,
      };
      this.details.delivery_type = DrpdownData;
      this.alterKey += 1;
      this.prefillEditDataVan();
    }
    if (this.tabButton == "Rapido") {
      await this.loadPrefillRapidoDeliveryData({
        id: this.DeliveryTypeSettingStateDataRapidoData?.id,
      });
      const DropdownRapido = {
        name: this.PrefillRapidoDeliveryData.delivery_type,
        code: this.PrefillRapidoDeliveryData.delivery_type,
      };
      this.details.delivery_type = DropdownRapido;
      this.alterKey += 1;
      this.prefillEditDataRapido();
    }
  },
  unmounted() {
    //needed
    // this.PrefillBikeDeliveryData = {};
    // this.PrefillVanDeliveryDatawireup = {};
    // this.PrefillRapidoDeliveryDatawireup ={};
    (this.$store.state.TypeSetting.PrefillBikeDeliveryData = {}),
      (this.$store.state.TypeSetting.PrefillVanDeliveryData = {}),
      (this.$store.state.TypeSetting.PrefillRapidoDeliveryData = {}),
      //needed
      (this.$store.state.TypeSetting.DeliveryTypeSettingStateData = {});
    this.$store.state.TypeSetting.DeliveryTypeSettingStateDataVan = {};
    this.$store.state.TypeSetting.DeliveryTypeSettingStateDataRapido = {};
  },
  watch: {
    "$store.state.TypeSetting.PrefillBikeDeliveryData": function () {
      if (this.PrefillBikeDeliveryData) {
        this.details.delivery_type = this.PrefillBikeDeliveryData.delivery_type;
        this.prefillEditData();
      }
    },
    "$store.state.TypeSetting.PrefillVanDeliveryData": function () {
      if (this.PrefillVanDeliveryDatawireup) {
        this.details.delivery_type =
          this.PrefillVanDeliveryDatawireup.delivery_type;
        this.prefillEditDataVan();
      }
    },
    "$store.state.TypeSetting.PrefillRapidoDeliveryData": function () {
      if (this.PrefillRapidoDeliveryDatawireup) {
        this.details.delivery_type =
          this.PrefillRapidoDeliveryDatawireup.delivery_type;
        this.prefillEditDataRapido();
      }
    },
    "$store.state.TypeSetting.DriverDropDownList": function () {
      for (let i in this.getDriverDropDownList) {
        this.getDriverDropDownList[i].name =
          this.getDriverDropDownList[i].employee_name;
      }
      this.dropDownData = this.getDriverDropDownList;
    },
    
  },
};
</script>

<style>
 /* {
  margin-left: 137px;
} */
::v-deep.width {
  width: 123% !important;
}
</style>