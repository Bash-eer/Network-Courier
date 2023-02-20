<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="flex pb-3">
          <img
            src="/images/express.png"
            width="28"
            height="20"
            alt="express"
            class=""
          />
          <span class="pl-3 reference-code">{{
            dialogData?.job_ref_no || "-"
          }}</span>
          <span class="pl-3 slip-reference-no font-size-15">
            Col.Slip No. :
          </span>
          <span class="pl-3 slip-reference-no">{{
            dialogData?.booking?.collection_slip_no || "-"
          }}</span>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job Date</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  dateFormat="dd/mm/yy"
                  :disabled="true"
                  class="contactsCalendar"
                  v-model="smsSendData.job_date"
                  :showIcon="true"
                  style="width: 100%"
                  :class="{
                    'p-invalid': v$.smsSendData.job_date.$invalid && submitted,
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
            <h5 class="dialog-label-text">Route</h5>
            <Dropdown
              v-model="smsSendData.route"
              :value="smsSendData.route"
              :options="routeList"
              optionLabel="route_name"
              @change="updateRouteData($event.value)"
              :filter="true"
              :class="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text">Rider</h5>
            <Dropdown
              v-model="smsSendData.rider"
              :options="riderList"
              optionLabel="employee_name"
              :filter="true"
              placeholder="Select a rider"
              @change="updateRiderData($event.value)"
              class="inputfield dialog-field-text"
            >
              <template #value="slotProps">
                <div
                  class="supervisor-item supervisor-item-value flex"
                  v-if="slotProps.value"
                >
                  <img
                    :src="
                      slotProps.value.image_url != 'null'
                        ? slotProps.value.image_url
                        : require('../../../../public/images/noavatar.png')
                    "
                  />
                  <div>{{ slotProps.value.employee_name || "None" }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="supervisor-item flex">
                  <img
                    :src="
                      slotProps.option.image_url != 'null'
                        ? slotProps.option.image_url
                        : require('../../../../public/images/noavatar.png')
                    "
                  />
                  <div>{{ slotProps.option.employee_name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Mobile No.</h5>
            <TextField
              v-model="smsSendData.mobile_no"
              @blur="smsSendData.mobile_no"
              :classes="{
                'p-invalid': v$.smsSendData.mobile_no.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text">Email</h5>
            <TextField
              v-model="smsSendData.email"
              @blur="smsSendData.email"
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="bold-600 font-size-14 pt-6">
              Count: <span class="">{{ smsCount }}</span>
            </h5>
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Remarks</h5>
            <Textarea
              v-model="smsSendData.remarks"
              :autoResize="true"
              rows="3"
              cols="30"
              placeholder="Enter your remarks here"
              :class="{
                'p-invalid': v$.smsSendData.remarks.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="bold-600 font-size-14">
              Text Length: <span class="color-1e90ff">108</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Send"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isSendSMS"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { reactive } from "vue";
import { errhandler } from "@/services/httpClient";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";

export default {
  name: "SendSMS",
  props: ["dialogData", "selectedTab"],
  components: {
    Dropdown,
    Textarea,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isSendSMS: false,
      smsSendData: {
        job_date: "",
        route: "",
        rider: "",
        mobile_no: "",
        email: "",
        remarks: "",
        company_details: ""
      },
      routeList: [],
      riderList: [],
      smsCount: 0,
    };
  },
  validations() {
    return {
      smsSendData: {
        job_date: { required },
        mobile_no: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      getBikeRiderDropdownList: "liveJobStatus/getBikeRiderDropDownList",
      getVanRiderDropdownList: "liveJobStatus/getVanRiderDropDownList",
      getRapidoRiderDropdownList: "liveJobStatus/getRapidoRiderDropDownList",
      getBikeRouteDropdownList: "liveJobStatus/getBikeRouteDropDownList",
      getVanRouteDropdownList: "liveJobStatus/getVanRouteDropDownList",
      getRapidoRouteDropdownList: "liveJobStatus/getRouteRapidoDropDownList",
      sendSMSInfo: "liveJobStatus/sendSMSOnLiveJobStatus",
      isUpdateSMSDialog: "liveJobStatus/showSendSMSDialog",
      getSendSMSDetails: "liveJobStatus/getSMSDetails",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
      };
      this.isUpdateSMSDialog(dialogData);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isSendSMS = true;
      const remarks = this.smsSendData.remarks.replaceAll("\n", " ");
      const remarksString = remarks.toString();
      const separators = [":ASS:", "fr:", "@" ,"Ph:", "Re:"];
      let splittedRemarks = remarksString.split(
        new RegExp(separators.join("|"), "g")
      );
      this.smsSendData.job_type= splittedRemarks[1];
      let company_details = this.smsSendData?.company_details[0];
      company_details.company_name= splittedRemarks[2];
      company_details.address= splittedRemarks[3];
      company_details.contact_no= splittedRemarks[4];
      this.smsSendData.remarks = splittedRemarks[5];
      this.sendLiveJobStatusSMS(company_details);
    },
    async sendLiveJobStatusSMS(company_details) {
      try {
        let data = {
          ...this.smsSendData,
          company_details: [company_details],
          job_id: this.dialogData?.id,
          bike_route_id:
            this.selectedTab == "BikeTab" ? this.smsSendData.route_id : null,
          van_route_id:
            this.selectedTab == "VanTab" ? this.smsSendData.route_id : null,
          rapido_route_id:
            this.selectedTab == "RapidoTab" ? this.smsSendData.route_id : null,
        };
        let response = await this.sendSMSInfo(data);
        if (response && response.status === 200) {
          let info = "SMS sent successfully";
          this.commonToast("success", "Success", info);
          this.closeDialog();
        } else {
          let info = response.data.message || "Failed to send the SMS";
          this.commonToast("error", "Error", info);
        }
        this.isSendSMS = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    updateRouteData(data) {
      this.smsSendData.route_id = data.id;
    },
    updateRiderData(data) {
      this.smsSendData.rider_id = data.id;
    },
    preloadRouteData(data) {
      this.smsSendData.route_id = data;
      if (data !== null) {
        let routeData = this.routeList.filter((res) => res.id == data);
        this.smsSendData.route = routeData[0] || null;
      }
    },
    preloadRiderData(data) {
      this.smsSendData.rider_id = data;
      if (data !== null) {
        let riderData = this.riderList.filter((res) => res.id == data);
        this.smsSendData.rider = riderData[0] || null;
      }
    },
    loadInitialData() {
      let routeId =
        this.selectedTab == "BikeTab"
          ? this.dialogData?.bike_zone_id
          : this.selectedTab == "VanTab"
          ? this.dialogData?.van_zone_id
          : this.dialogData?.rapido_zone_id;
      let jobDate;
      if (this.dialogData?.job_date) {
        jobDate = new Date(this.dialogData?.job_date);
      }
      this.smsSendData = {
        ...this.dialogData,
        job_date: jobDate,
      };
      const smsId = this.dialogData?.id;
      this.loadInitialDropdownData(routeId, smsId);
    },
    loadInitialDropdownData(routeId, smsId) {
      if (this.selectedTab == "BikeTab") {
        this.getBikeRiderDropdownList();
        this.getBikeRouteDropdownList(routeId);
      } else if (this.selectedTab == "VanTab") {
        this.getVanRiderDropdownList();
        this.getVanRouteDropdownList(routeId);
      } else {
        this.getRapidoRiderDropdownList();
        this.getRapidoRouteDropdownList(routeId);
      }
      this.getSendSMSDetails(smsId);
    },
    commonToast(severity, summary, message) {
      this.isSendSMS = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  computed: {
    ...mapGetters({
      bikeRiderList: "liveJobStatus/getBikeRiderDropDownListArray",
      vanRiderList: "liveJobStatus/getVanRiderDropDownListArray",
      rapidoRiderList: "liveJobStatus/getRapidoRiderDropDownListArray",
      bikeRouteList: "liveJobStatus/getBikeRouteDropDownListArray",
      vanRouteList: "liveJobStatus/getVanRouteDropDownListArray",
      rapidoRouteList: "liveJobStatus/getRapidoRouteDropDownListArray",
      smsTemplateDetails: "liveJobStatus/getSendSMSDetails",
    }),
  },
  watch: {
    bikeRouteList: async function (newVal, oldVal) {
      this.routeList = newVal || [];
      let routeId = this.dialogData?.bike_route_id || null;

      this.preloadRouteData(routeId);
    },
    vanRouteList: async function (newVal, oldVal) {
      this.routeList = newVal || [];
      let routeId = this.dialogData?.van_route_id || null;
      this.preloadRouteData(routeId);
    },
    rapidoRouteList: async function (newVal, oldVal) {
      this.routeList = newVal || [];
      let routeId = this.dialogData?.rapido_route_id || null;
      this.preloadRouteData(routeId);
    },
    bikeRiderList: async function (newVal, oldVal) {
      this.riderList = newVal || [];
      let riderId = this.dialogData?.rider_id || null;
      this.preloadRiderData(riderId);
    },
    vanRiderList: async function (newVal, oldVal) {
      this.riderList = newVal || [];
      let riderId = this.dialogData?.rider_id || null;
      this.preloadRiderData(riderId);
    },
    rapidoRiderList: async function (newVal, oldVal) {
      this.riderList = newVal || [];
      let riderId = this.dialogData?.rider_id || null;
      this.preloadRiderData(riderId);
    },
    smsTemplateDetails: async function (newVal, oldVal) {
      console.log(this.smsTemplateDetails);
      const referenceNo = this.smsTemplateDetails?.job_ref_no || "";
      const jobType = this.smsTemplateDetails?.job_type;
      this.smsCount = this.smsTemplateDetails?.count || 0;
      const addressDetails = this.smsTemplateDetails?.company_details[0] || {};
      const remarksDetails = this.smsTemplateDetails?.info[0] || {};
      this.smsSendData.remarks =
        referenceNo +
        ":ASS:" +
        jobType +
        "\n" +
        "fr:" +
        addressDetails?.contact_person_name +
        "@" +
        addressDetails?.address +
        "\n" +
        "Ph:" +
        addressDetails?.contact_no +
        "\n" +
        "Re:" +
        remarksDetails?.remarks;
    },
  },
  created() {
    this.loadInitialData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.required {
  color: $color-7a7a7a !important;
}

.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 300px;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 280px;
  overflow: auto;
}
.sub-title {
  font-weight: 700;
  font-size: 14px;
  color: $color-4e5968;
  font-family: $font-family-third;
}
.field-checkbox {
  color: $color-357dea;
  font-weight: 700;
  font-size: 14px;
  font-family: $font-family-third;
}
::v-deep .p-checkbox .p-checkbox-box {
  width: 18px !important;
  height: 18px !important;
}
.reference-code {
  color: #eabb17;
}
.slip-reference-no {
  color: #4e5868;
}
.supervisor-item {
  img {
    width: 24px;
    margin-right: 0.5rem;
    height: 24px;
    border-radius: 4px;
  }
}
.p-dropdown {
  width: 100% !important;
}
</style>
