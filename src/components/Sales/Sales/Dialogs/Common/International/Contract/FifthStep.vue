<template>
  <div>
    
    <div
      class="
        flex flex-column
        time_content
        pb-5
        pl-2
        pr-2
        pt-2
        ml-2
        mr-4
        fifth-step
      "
    >
      <div class="flex">
        <div class="flex flex-row p-2">
          <div class="flex align-items-center">
            <SingleCheckBox
              label="Estimated Start Date (Tentative)"
              v-model="details.settings.estimated_start_date_selected"
              :value="details.settings.estimated_start_date_selected"
            />
          </div>
        </div>
      </div>
      <div clas="flex">
        <div class="white_content p-2 calendar_content">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            v-model="details.settings.estimated_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
      <div
        v-if="overViewData?.status == 'In Contract'"
        class="field col-12 md:col-6"
      >
        <h5 class="ml-2 bold-500 font-size-14 color-7a7a7a chk required">
          Effective Date
        </h5>
        <div class="white_content">
          <Calendar
            dateFormat="d MM yy"
            class="quotation_calendar"
            id="icon"
            v-model="details.settings.effective_start_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
        <div v-if="validationErr && submitted" class="color-red ml-2">
          Please Select a Effective date
        </div>
      </div>
    </div>
    <div class="field col-12 md">
      <span class="formTableHeader ml-2 color-343434 font-size-16"
        >Contact Person</span
      >
      <div class="row ml-2 table_div">
        <div class="col-12">
          <div class="table-content">
            <ContactTable
              formTableDataName="contactTable"
              dataKey="contact_name"
              :tableData="
                $store.state.salesInternationalContract
                  .CreateQuotationContractData?.contacts
              "
              :tableColumns="
                $store.state.salesInternationalContract
                  .sendQuatitionTableDataColumns
              "
              storePath="salesQuotationDialog"
            />
            <!-- <FormTables
              :key="
                $store.state.salesInternationalContract.sendQuatitionTableData
              "
              formTableDataName="InternationalContractRowData"
              :selectionModeState="selectionModeState"
              dataKey="email"
              :tableData="
                $store.state.salesInternationalContract
                  .CreateQuotationContractData?.contacts
              "
              :tableColumns="
                $store.state.salesInternationalContract
                  .sendQuatitionTableDataColumns
              "
              storePath="quotation"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="dialog-label-text">Remarks</h5>
        <TextAreaField label="remarks" v-model="details.remarks" />
      </div>
    </div>
    <div>
      <DragAndDropUpload
        :state="internationalContractAttachments"
        type="InternationalContractQuotation"
        storePath="salesInternationalContract"
      />
    </div>
    <div class="row ml-1 mt-1 table_div">
      <div class="formgrid grid pl-2 pr-2">
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
          <Buttons
            label="Previous"
            v-on:childToParent="goBackHandler"
            class="p-button-outlined mr-1 color-357dea text-sm font-bold"
          />

          <div class="flex align-self-center justify-content-end">
            <CancelButton storePath="salesSales" />

            <Buttons
              label="Save"
              button_class=" button-bg font-size-14"
              v-on:childToParent="submitData"
            />
            <Buttons
              label="Send Quotation Now"
              button_class="dialog-button-text ml-2 bg-357dea"
              v-on:childToParent="sendQuotation"
              :loading="isQuotationBtnLoading"
            />
          </div>
        </div>
        <div
          v-if="validationErr && submitted"
          class="flex align-self-center justify-content-end color-red ml-2"
        >
          Required fields are missing
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import ContactTable from "./ContactTable.vue";
import { salesCommon } from "../../../../../../../store/helper";

export default {
  name: "SalesInternationalContractFifthStep",
  components: {
    ContactTable,
  },
  data: () => ({
    date: null,
    v$: useVuelidate(),
    validationErr: false,
    details: {
      settings: {
        estimated_start_date: "",
        estimated_start_date_selected: false,
        effective_start_date: null,
      },
      remarks: "",
      attachments: {
        uploaded_in: "Quotation",

        attachment_details: [],
      },
    },
    renderkey:10,
    internationalContractAttachments: " ",
    attachments: {
      uploaded_in: "Quotation",
      attachment_details: [
        {
          file_name: "test1",
          url: "test2",
          mime_type: "test3",
          size: 3,
        },
        {
          file_name: "test4",
          url: "test5",
          mime_type: "test6",
          size: 3,
        },
      ],
    },
    submitted: false,
  }),
  validations() {
    if (this.overViewData?.status == "In Contract") {
      return {
        details: {
          settings: {
            effective_start_date: { required },
          },
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      selectedTab: "salesSales/selectedTab",
      commonAttachmentStateData: "salesCommon/commonAttachmentStateData",
      selectedContacts: "salesInternationalContract/selectedContacts",
      internationalContractAttachmentsStateData:
        "salesInternationalContract/internationalContractAttachmentsStateData",
    }),
  },

  methods: {
    ...salesCommon,
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    goBackHandler() {
      this.setCurrentStep(4);

      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesInternationalContractFourthStep",
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    watch: {
      details: {
        handler() {
          this.$store.state.salesInternationalContract.CreateQuotationContractData =
            Object.assign(
              this.$store.state.salesInternationalContract
                .CreateQuotationContractData,
              this.details
            );
        },
        deep: true,
      },
            "$store.state.salesInternationalContract.InternationalContractQuotationFiles":
        function () {
          this.$store.state.salesInternationalContract.InternationalContractQuotationFiles(
            {
              key: "attachments",
              value: {
                uploaded_in: "Quotation",
                attachment_details:
                  this.$store.state.salesInternationalContract
                    .InternationalContractQuotationFiles,
              },
            }
          );
        },
    },
    async sendQuotation() {
      this.$store.state.salesSales.sendQuotationRedirect = true;
      await this.submitData();
    },
    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        let processedType;
        // let renderType;

        // if (this.$route.name == "QuotationContract") {
        //   if (this.selectedTab == "quotation") {
        //     renderType = "quotation";
        //   } else renderType = "contract";
        // } else {
        //   renderType = this.$route.params.type;
        // }

        if (this.selectedTab == "quotation") {
          processedType = "quotation";
        } else processedType = "contract";
        this.details.attachments.attachment_details =
          this.$store.state.salesInternationalContract.InternationalContractQuotationFiles;

        this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData.quotation,
            { settings: this.details.settings }
          );
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData,
            this.details
          );
        if (
          this.$store.state.salesInternationalContract?.InternationalRowData?.id
        ) {
          let loadstate;
          if (this.selectedTab == "quotation") {
            this.loadstate = "loadQuotationTabTableData";
          }
          if (this.selectedTab == "contract") {
            this.loadstate = "loadContractTabTableData";
          }
          await this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/" +
              processedType +
              "/" +
              this.$store.state.salesInternationalContract?.InternationalRowData
                ?.id,
            data: {
              ...this.$store.state.salesInternationalContract
                .CreateQuotationContractData,
              contacts: this.selectedContacts,
            },

            method: "PATCH",
            id: this.$route.params.id,
            type: this.$route.params?.type,
            profileId: this.$route.params?.pid,
            routeName: "InternationalContractOverview",
            loadData: this.loadstate,
            dataRendering:
              "salesInternationalContract/loadInternationalContractOverviewData",

            redirectToDiffPageById: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The International Contract Quotation is Updated!`,
                toastSeverity: "info",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the International Contract Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
          if (this.$route.path == "/sales") {
            this.loadQuotationTabData();
            this.loadContractTabData();
          }
        } else {
          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path: "/sales/quotation",
            data: {
              ...this.$store.state.salesInternationalContract
                .CreateQuotationContractData,
              contacts: this.selectedContacts,
            },

            method: "POST",
            id: this.$route.params.id,
            loadData: "loadQuotationTabTableData",
            toastData: {
              toastSuccessData: {
                toastMsg: `The International Contract Quotation is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the International Contract Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    async SendQuotation() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let processedType;
        if (this.selectedTab == "quotation") {
          processedType = "quotation";
        } else processedType = "contract";
        this.details.attachments.attachment_details =
          this.$store.state.salesInternationalContract.InternationalContractQuotationFiles;

        for (let n in this.details.settings) {
          if (n == "effective_start_date" || n == "estimated_start_date") {
            this.details.settings[n] = moment(this.details.settings[n]).format(
              "D MMMM YYYY"
            );
          }
        }

        this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData.quotation,
            { settings: this.details.settings }
          );
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData,
            this.details
          );
        if (
          this.$store.state.salesInternationalContract?.InternationalRowData?.id
        ) {
          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/" +
              processedType +
              "/" +
              this.$store.state.salesInternationalContract?.InternationalRowData
                ?.id,
            data: {
              ...this.$store.state.salesInternationalContract
                .CreateQuotationContractData,
              contacts: this.selectedContacts,
            },

            method: "PATCH",
            id: this.$route.params.id,
            profileId: this.$route.params?.pid,
            type: this.$route.params.type,
            routeName: "InternationalContractOverview",
            loadData: "loadQuotationTabTableData",
            dataRendering:
              "salesInternationalContract/loadInternationalContractOverviewData",

            redirectToDiffPageById: true,
            toastData: {
              toastSuccessData: {
                toastMsg: `The International Contract Quotation is Updated!`,
                toastSeverity: "info",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the International Contract Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          await this.$store.dispatch("salesSales/SENDCRUDOPERATION", {
            path: "/sales/quotation",
            data: {
              ...this.$store.state.salesInternationalContract
                .CreateQuotationContractData,
              contacts: this.selectedContacts,
            },

            method: "POST",
            id: this.$route.params.id,
            loadData: "loadQuotationTabTableData",
            toastData: {
              toastSuccessData: {
                toastMsg: `The International Contract Quotation is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the International Contract Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesInternationalContract.InternationalContractQuotationFiles =
      [];
    this.$store.state.salesInternationalContract.internationalContractAttachmentsStateData =
      {};
    this.$store.state.salesInternationalContract.deletedInternationalContractQuotationFiles =
      [];
  },
  created() {
    this.$store.state.commonStore.attachmentsTag =
      "InternationalContractQuotation";
    if (
      Object.keys(this.internationalContractAttachmentsStateData).length != 0
    ) {
      this.internationalContractAttachments =
        this.internationalContractAttachmentsStateData.attachments;
      this.$store.state.salesInternationalContract.InternationalContractQuotationFiles =
        this.internationalContractAttachmentsStateData.attachments;
    }
    this.overViewData =
      this.$store.state.salesInternationalContract.InternationalRowData;
    if (this.overViewData?.id) {
      //   this.commonAttachmentStateData.attachments;
      if (
        this.$store.state.salesInternationalContract?.InternationalRowData
          ?.rate_card_attachments?.length > 0
      ) {
        let respectiveData = this.overViewData?.quotation_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );

        if (respectiveData) {
          this.internationalContractAttachments = respectiveData["attachments"];
          this.$store.state.salesInternationalContract.InternationalContractQuotationFiles =
            respectiveData["attachments"];
        }
      }

      Object.keys(this.details.settings).map((key) => {
        this.details.settings[key] = this.dateFormater(
          this.$store.state.salesInternationalContract?.InternationalRowData
            .settings[key]
        );
      });
      this.details.remarks =
        this.$store.state.salesInternationalContract?.InternationalRowData.remarks;
      this.details.settings.effective_start_date = this.dateFormater(
        this.$store.state.salesInternationalContract?.InternationalRowData
          ?.settings?.effective_start_date
      );
      this.details.settings.estimated_start_date_selected =
        this.$store.state.salesInternationalContract?.InternationalRowData?.settings?.estimated_start_date_selected;
    }
    this.$store.state.sales.expressQuotationContactsTableData =
      this.$store.state["sales"].contactsStateData;
  },
};
</script>
<style scoped>
::v-deep .quotation_calendar .p-inputtext:enabled:hover {
  border-color: white !important;
}
.quotation_calendar .p-inputtext:enabled:focus {
  box-shadow: white !important;
  border-color: white !important;
}
::v-deep .quotation_calendar .p-inputtext {
  border-color: white !important;
}
.check_text {
  margin-left: 14%;
}
.calendar_content {
  margin-left: 15%;
}

.white_content {
  background: #edf1f7;

  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.time_content {
  background: #edf1f7;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  height: 25%;
  width: 99.5%;
}
.effective {
  background: #edf1f7;
  width: 100%;
  height: 400px;
  left: 490px;
  top: 267px;
}
.check_text {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
}
.check-button {
  position: relative;
  bottom: 9px;
}
.text {
  display: contents;
  color: #030c14;
}
.contact-heading {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background: #edf1f7;
  padding: 4px;
  border-radius: 4px;
}
.fifth-step {
  margin-top: 30px;
}
.button-colors {
  color: #357dea;
}
.button-bg {
  background-color: #357dea;
  border-radius: 4px;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  color: #7e84a7;
  font-size: 12px;
}
</style>