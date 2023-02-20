<template>
  <div>
    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Termination Reference by</h5>
        <DropDown
          code="name"
          :state="details.termination_reference_by"
          :data="Referred"
          label="termination_reference_by"
          id="termination_reference_by"
          :key="details.termination_reference_by"
          v-model="details.termination_reference_by"
          :classes="{
            'p-invalid':
              v$.details.termination_reference_by.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="false"
              :showSeconds="false"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.date"
              :showIcon="true"
              style="width: 100%"
              :class="{
                'p-invalid': v$.details.date.$invalid && submitted,
                'inputfield w-full': true,
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
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Request Termination Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="false"
              :showSeconds="false"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.request_termination_date"
              :showIcon="false"
              style="width: 100%"
              :class="{
                'p-invalid':
                  v$.details.request_termination_date.$invalid && submitted,
                'inputfield w-full': true,
              }"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Actual Termination Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="false"
              :showSeconds="false"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.actual_termination_date"
              :showIcon="false"
              style="width: 100%"
              :class="{
                'p-invalid':
                  v$.details.actual_termination_date.$invalid && submitted,
                'inputfield w-full ': true,
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
        <h5 class="required dialog-label-text">Reason</h5>
        <TextAreaField
          :state="details.reason"
          label="remarks"
          v-model="details.reason"
          @blur="v$.details.reason.$model;"
          :classes="{
            'p-invalid': v$.details.reason.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="flex flex-row mt-2 ml-2">
      <!-- <div class="flex mr-3 col"> -->
      <span class="bold-800 color-343434 font-size-13"
        >Yearly Contract Terms</span
      >

      <div
        class="flex flex-row"
        v-for="(radio, index) in yearlyContract"
        :key="index"
      >
        <div class="flex mx-2">
          <RadioButton
            :id="radio.tag"
            name="yearly_contract"
            :value="radio.label"
            v-model="details.yearly_contract"
          />
        </div>
        <label
          :for="radio.tag"
          class="flex font-bold color-343434 font-size-12"
          >{{ radio.label }}</label
        >
        <!-- <div class="flex font-bold color-343434 font-size-12">
            {{ radio.label }}
          </div> -->
      </div>
      <!-- </div> -->
    </div>
    <br />
    <div class="flex flex-row mt-2 ml-2">
      <span class="bold-800 color-343434 font-size-13"
        >Non-Yearly Contract Terms</span
      >

      <div
        class="flex mr-3 flex-row"
        v-for="(radio, index) in nonYearlyContract"
        :key="index"
      >
        <div class="flex flex-row">
          <div class="flex mx-2">
            <RadioButton
              :id="radio.tag"
              name="non_yearly_contract"
              :value="radio.label"
              v-model="details.non_yearly_contract"
            />
          </div>
          <label
            :for="radio.tag"
            class="flex font-bold color-343434 font-size-12"
            >{{ radio.label }}</label
          >
          <!-- <div class="flex font-bold color-343434 font-size-12">
            {{ radio.label }}
          </div> -->
        </div>
      </div>
    </div>
    <div :key="renderKey">
      <DragAndDropUpload
        :state="salesCommonAttachmentsState"
        type="salesCommonAttachments"
        storePath="salesCommon"
      />
    </div>
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
        <CancelButton label="Cancel" v-if="edit" storePath="salesApproval" />
        <CancelButton label="Cancel" v-else storePath="salesSales" />
        <Buttons
          label="Submit"
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
import RadioButton from "primevue/radiobutton";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
export default {
  name: "AddFollowUP",
  components: {
    RadioButton,
  },
  data() {
    return {
      renderKey: 10,
      edit: false,
      salesCommonAttachmentsState: " ",
      yearlyContract: [
        { label: "Early Termination", tag: "EarlyTermination" },
        { label: "In line To Contract terms", tag: "InLineToContractTerms" },
        {
          label: "Not In line To Contract Terms",
          tag: "NotInLinetoContractTerms",
        },
      ],
      nonYearlyContract: [
        { label: "In line To Contract terms", tag: "InLineToContractTerms2" },
        {
          label: "Not In line To Contract Terms",
          tag: "NotInLinetoContractTerms2",
        },
      ],
      termination_reference_by: [
        { name: "James", code: "1" },
        { name: "Jackson wang", code: "2" },
      ],
      Referred: [
        { name: "EMail", code: "EMail" },
        { name: "Letter", code: "Letter" },
        { name: "Phone", code: "Phone" },
        { name: "Fax", code: "Fax" },
        { name: "Others", code: "Others" },
      ],
      details: {
        non_yearly_contract: "",
        yearly_contract: "",
        termination_reference_by: "",
        date: "",
        request_termination_date: "",
        actual_termination_date: "",
        reason: "",
        contract_id: null,
        attachments: {
          uploaded_in: "termination",
          attachment_details: [],
        },
      },
      maintenanceAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        termination_reference_by: { required },
        date: { required },
        request_termination_date: { required },
        actual_termination_date: { required },
        reason: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      commonContractTerminationStateData:
        "salesCommon/commonContractTerminationStateData",
    }),
  },
  methods: {
    ...mapActions({
      referenceDropdown: "salesRapidoContract/Contract/referenceDropdown",
    }),
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.details.contract_id = this.$route.params.id;
        //attachment key processing for wireup
        // if (this.details.attachments) {
        //   if (this.details.attachments.attachment_details.length > 0) {
        //     this.details.attachments.attachment_details =
        //       this.$store.state.salesCommon.salesCommonAttachmentsFiles;
        //   } else if (this.details.attachments.attachment_details.length == 0) {
        //     delete this.details.attachments;
        //   }
        // }

        if (
          this.$store.state.salesCommon.salesCommonAttachmentsFiles.length > 0
        ) {
          this.details.attachments.attachment_details =
            this.$store.state.salesCommon.salesCommonAttachmentsFiles;
        }
        if (this.commonContractTerminationStateData.id) {
          this.details.contract_id = this.incomingData.id;

          this.apiPatchCallHandler(
            "PATCH",
            "/sales/contracts/termination/" +
              // this.commonContractTerminationStateData.id,
              this.$store.state.salesApproval.approvalsTerminationStateData
                .termination_id,
            "updated"
          );
        } else {
          this.apiCallHandler(
            "POST",
            "/sales/contracts/termination",
            "Initiated"
          );
        }
      }
      //process date
      // for (let Data in this.details[i]) {
      //       if (
      //         Data == "date" ||
      //         Data == "request_termination_date" ||
      //         Data == "actual_termination_date"
      //         ) {
      //         procesedDatas[Data] = this.dateFormater(this.details[i][Data]);
      //       }
    },
    apiCallHandler(method, path, txt) {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: path,
        method: method,
        id: this.$route.params.id,
        type: this.$route.params.type,
        data: this.details,
        loadDiffStore: true,
        loadData: "salesRapidoContract/loadRapidoContractOverviewData",
        closeDialog: "salesSales/closeDialog",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Termination has been ${txt} successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        // loadData: "loadAttachmentData",
      });
    },
    apiPatchCallHandler(method, path, txt) {
      this.$store.dispatch("salesApproval/POSTPATCHCRUDOPERATION", {
        path: path,
        method: method,
        id: this.$route.params.id,
        type: this.$route.params.type,
        data: this.details,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Termination has been ${txt} successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        loadData: "loadApprovalTerminationTableData",
      });
    },
    dateFormater(data) {
      if (data == null) {
        return null;
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    async setAttachmentsHandler(attachments) {
      // this.$store.state.commonStore.attachmentsTag = "salesCommonAttachments";
      this.salesCommonAttachmentsState = attachments;

      this.$store.state.salesCommon.salesCommonAttachmentsFiles = attachments;
      this.details["attachments"]["attachment_details"] = [];
      this.details.attachments.attachment_details = attachments;
      this.renderKey += 1;
    },
  },
  // async created() {
  //   this.$store.state.commonStore.attachmentsTag = "salesCommonAttachments";
  //   // if (Object.keys(this.commonContractTerminationStateData).length != 0) {

  //   //   // this.salesCommonAttachmentsState =
  //   //   //   this.commonContractTerminationStateData.attachments;
  //   //   // this.$store.state.salesCommon.salesCommonAttachmentsFiles =
  //   //   //   this.commonContractTerminationStateData.attachments;

  //   //   for (var state in this.details) {
  //   //     this.details[state] = this.commonContractTerminationStateData[state];
  //   //   }
  //   // }
  // },

  unmounted() {
    // this.commonContractTerminationStateData = {};
    this.$store.state.salesCommon.commonContractTerminationStateData = {};
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesCommon.salesCommonAttachmentsFiles = [];
    this.$store.state.salesCommon.deletedsalesCommonAttachmentsFiles = [];
    this.$store.state.salesApproval.approvalsTerminationStateData = {};
  },

  async created() {
    this.$store.state.commonStore.attachmentsTag = "salesCommonAttachments";

    // this.$store.state.commonStore.attachmentsTag = "salesCommonAttachments";

    if (
      Object.keys(this.$store.state.salesApproval.approvalsTerminationStateData)
        .length > 0
    ) {
      this.edit = true;
      let data = this.$store.state.salesApproval.approvalsTerminationStateData;
      // this.contract_profile_id = data.contract_profile.id;
      await axios
        .get("/sales/contracts/termination/" + data.termination_id)
        .then((res) => {
          if (res.data.results) {
            this.incomingData = res.data.results.contract_termination;

            // this.details = res.data.results;
            for (let state in this.details) {
              if (state != "attachments") {
                this.details[state] = res.data.results[state];
              }

              // this.salutation =
            }
            this.details.termination_reference_by =
              res.data.results.termination_reference_by;
            this.details.date = this.dateFormater(res.data.results.date);
            this.details.request_termination_date = this.dateFormater(
              res.data.results.request_termination_date
            );
            this.details.actual_termination_date = this.dateFormater(
              res.data.results.actual_termination_date
            );

            if (res.data.results.termination_attachments.length > 0) {
              //  setTimeout(myGreeting, 5000)
              let attachments =
                res.data.results.termination_attachments[0].attachments;
              if (attachments.length > 0) {
                this.setAttachmentsHandler(attachments);
                // this.salesCommonAttachmentsState = attachments;

                // this.$store.state.salesCommon.salesCommonAttachmentsFiles =
                //   attachments;
                // this.details["attachments"]["attachment_details"] = [];
                // this.details.attachments.attachment_details = attachments;
              }
            }

            //             if(this.incomingData.termination_attachments.length >0){
            //               if(this.incomingData.termination_attachments[0].attachments){
            // this.salesCommonAttachmentsState =
            //         this.incomingData.termination_attachments[0].attachments;
            //       this.$store.state.salesCommon.salesCommonAttachmentsFiles =
            //         this.commonContractTerminationStateData.attachments;
            //               }

            //             }

            // this.details.contract_id = res.data.results.contract_termination.id;
            // let result = res.data.results;
            // this.secondRowData.date = this.dateFormater(result.date);
            // this.secondRowData.termination_reference_by =
            //   result.termination_reference_by;
            // this.secondRowData.request_termination_date = this.dateFormater(
            //   result.request_termination_date
            // );
            // this.secondRowData.actual_termination_date = this.dateFormater(
            //   result.actual_termination_date
            // );
            // this.secondRowData.yearly_contract = result.yearly_contract;
            // this.non_yearly_contract = result.non_yearly_contract;
            // this.termination_no = result.contract_termination.contract_id;
            // this.createdAt = this.dateFormater(result.createdAt);
            // this.reason = result.reason;
          }
        });
    }
  },
};
</script>

<style></style>
