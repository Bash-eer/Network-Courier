<template>
  <br />
  <div class="flex flex-column timeDiv pb-5 pl-2 pr-2 pt-2 ml-2 mr-2">
    <div class="flex">
      <div class="formParentDiv formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text" placeholder="0.00">
              Estimated Start Date
            </h5>
            <div clas="flex">
              <div class="whiteDiv p-2 calendardiv-2">
                <Calendar
                  dateFormat="d MM yy"
                  class="quotationCalendar"
                  id="icon"
                  v-model="details.estimated_start_date"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-2">
      <div class="flex flex-row checkDiv">
        <div class="flex">
          <CheckBox
            v-bind:categories="[
              {
                name: 'Effective',
                key: 'a',
              },
            ]"
          />

          <!-- v-bind:checker="
              details.first_month == true
                ? [
                    {
                      name: 'first_month',
                      key: 'wd',
                    },
                  ]
                : []
            " -->
        </div>
        <div class="flex chk2Div">
          <span class="chk2">First Month</span>
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="formParentDiv formDiv">
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-3">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Detail Type
            </h5>
            <DropDown
              code="name"
              :data="detail_type"
              label="detail_type"
              :state="details.detail_type"
              v-model="details.detail_type"
              :classes="{
                'p-invalid': v$.details.detail_type.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Unit Price
            </h5>
            <TextField
              label="unit_price"
              type="number"
              v-model="details.unit_price"
              :classes="{
                'p-invalid': v$.details.unit_price.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Quantity
            </h5>
            <TextField
              label="quantity"
              type="number"
              v-model="details.quantity"
              :classes="{
                'p-invalid': v$.details.quantity.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Amount
            </h5>
            <TextField
              label="amount"
              type="number"
              v-model="details.amount"
              :classes="{
                'p-invalid': v$.details.amount.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid mt-4">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text" placeholder="0.00">
              Description
            </h5>
            <TextField
              label="description"
              type="text"
              v-model="details.description"
              :classes="{
                'p-invalid': v$.details.description.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-column pb-4 pl-2 pr-2 pt-2 ml-2 mt-2">
    <div class="row">
      <div class="col-12 text">
        <span class="ml-3"> Contract settings </span>
      </div>
    </div>
  </div>
  <span class="ml-2 txt">Contact Person</span>

  <div class="row ml-1 table_div">
    <div class="col-12">
      <FormTable
        :tableData="
          this.$store.state.salesExpressContractFSR
            .expressQuotationContactsTableData
        "
        :tableColumns="
          $store.state.salesExpressContractFSR
            .expressQuotationContactsTableColumnData
        "
        dataKey="contact_no"
        storePath="salesExpressContractFSR"
        formTableDataName="additionOfRowsEach"
        :selectionModeState="
          this.$store.state.salesExpressContractFSR
            .expressQuotationContactsTableData
        "
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        v-model="details.remarks"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--DRAG AND DROP UPLOAD-->
  <div>
    <!-- <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
    /> -->
    <DragAndDropUpload
      :state="salesExpressContractFSRAttachmentsState"
      type="salesExpressContractFSRAttachments"
      storePath="salesExpressContractFSR"
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
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesSales" />
          <!-- <Buttons
            label="Preview"
            class="p-button-outlined mr-2 dialog-button-text"
          /> -->
          <Buttons
            label="Save"
            button_class="dialog-button-text"
            @click="save"
          />
          <Buttons
            label="Send Quotation Now"
            button_class="dialog-button-text ml-2"
            v-on:childToParent="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
const _ = require("lodash");

export default {
  name: "FSRSendQuotationsDialog",

  data: () => ({
    salesExpressContractFSRAttachmentsState: " ",
    v$: useVuelidate(),
    details: {
      estimated_start_date: "",
      first_month: "",
      detail_type: "",
      unit_price: "",
      quantity: "",
      amount: "",
      remarks: "",
      attachment_details: [],
    },
    isQuotationBtnLoading: false,
    detail_type: [
      { name: "Standard Entry", code: "USD" },
      { name: "Entry", code: "USD" },
    ],

    submitted: false,
  }),
  validations() {
    return {
      details: {
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
        remarks: { required },
      },
    };
  },

  computed: {
    ...mapGetters({
      FSRAttachmentsStateData:
        "salesExpressContractFSR/FSRAttachmentsStateData",
      IndexFsrSendQuotation:
        "salesExpressContractFSR/ExpressContractFsrOverviewEditData",
    }),
  },

  created() {
    this.$store.state.commonStore.attachmentsTag =
      "salesExpressContractFSRAttachments";
    if (Object.keys(this.FSRAttachmentsStateData).length != 0) {
      this.salesExpressContractFSRAttachmentsState =
        this.FSRAttachmentsStateData.attachments;
      this.$store.state.salesExpressContractFSR.FSRAttachmentsFiles =
        this.FSRAttachmentsStateData.attachments;
    }

    if (
      this.$store.state.salesExpressContractFSR
        .ExpressContractFsrOverviewEditData
    ) {
      this.details = this.IndexFsrSendQuotation.settings;
      this.details.remarks = this.IndexFsrSendQuotation.remarks;
      // this.details.attachment_details =
      //   this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.quotation_attachments[0].attachments;

      if (
        this.$store.state.salesExpressContractFSR
          .ExpressContractFsrOverviewEditData?.quotation_attachments?.length > 0
      ) {
        let respectiveData =
          this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.quotation_attachments.find(
            (itm) => itm.uploaded_in == "Quotation"
          );
        if (respectiveData) {
          this.salesExpressContractFSRAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesExpressContractFSR.FSRAttachmentsFiles =
            respectiveData["attachments"];
        }
      }
    }

    this.$store.state.salesExpressContractFSR.additionOfRowsEach =
      this.$store.state.salesExpressContractFSR.expressQuotationContactsTableData;
  },

  methods: {
    goBackHandler() {
      this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
        step: "FSRCostingDetailsDialog",
      });
    },

    save() {
      (this.isQuotationBtnLoading = false), this.handleClick();
    },
    submit() {
      (this.isQuotationBtnLoading = true), this.handleClick();
    },

    async sendQuotation() {
      let mailData = {
        send_to: [],
      };
      if (this.isQuotationBtnLoading == true) {
        this.$store.state.salesSales.sendQuotationData.contacts.map((list) => {
          mailData.send_to.push(list.id);
        });

        this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
          path:
            "/sales/quotations/send/" +
            this.$store.state.salesSales.sendQuotationData.id,

          data: mailData,

          method: "POST",
          loadData: "loadSalesTabData",
          toastData: {
            toastSuccessData: {
              toastMsg: `The Quotation is Sent Successfully !`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Quotation is already Sent !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in sending Quotation, try again!",

              toastSeverity: "error",
            },
          },
        });
      }
    },

    handleClick() {
      if (
        this.$store.state.salesExpressContractFSR
          .ExpressContractFsrOverviewEditData
      ) {
        if (this.v$.$invalid) {
          this.submitted = true;
        }
        if (!this.v$.$invalid) {
          const data =
            this.$store.state.salesExpressContractFSR.quotationDetails.map(
              (i) => {
                return i;
              }
            );

          this.details.attachment_details =
            this.$store.state.salesExpressContractFSR.FSRAttachmentsFiles;

          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/quotation/" +
              this.$store.state.salesExpressContractFSR
                .ExpressContractFsrOverviewEditData.id,
            method: "PATCH",
            loadDiffStore: true,
            data: {
              profile_id: this.$route.params.id,
              sales_person_id: 1,
              profile_name: data[0].profile_name,
              address: data[0].address,
              postal_code: data[0].postal_code,
              country: data[0].country,
              state: data[0].state,
              building_name: data[0].building_name,
              floor_no: data[0].floor_no,
              unit_no: data[0].unit_no,
              customer_type: "Express",
              business_type: "Contract",
              status: data[1].status,
              remarks: this.details.remarks,
              contacts:
                this.$store.state.salesExpressContractFSR
                  .expressQuotationContactsTableData,
              quotation: {
                referred_by: data[1].referred_by,
                referral_name: data[1].referral_name,
                previously_served_by: data[1].previously_served_by,
                sales_commission: data[1].sales_commission,
                festival_name: data[1].festival_name,
                standard_liability: data[1].standard_liability,
                volumetric_value: data[1].volumetric_value,
                service: "FSR",
                package_details: data[1].package_details,
                costing_details: {
                  fsr: {
                    rates:
                      this.$store.state.salesExpressContractFSR.FSRCostingDetails.map(
                        (rates) => {
                          return _.omit(
                            rates,
                            "id",
                            "contract_qotation_id",
                            "settings_id",
                            "createdAt",
                            "updatedAt",
                            "deletedAt"
                          );
                        }
                      ),
                  },
                },
                settings: {
                  estimated_start_date: this.details.estimated_start_date,
                  first_month: this.details.first_month,
                  detail_type: this.details.detail_type,
                  unit_price: this.details.unit_price,
                  quantity: this.details.quantity,
                  amount: this.details.amount,
                  description: "data2.at(0)",
                },
              },
              attachments: {
                uploaded_in: "Quotation",
                attachment_details: this.details.attachment_details.map(
                  (rates) => {
                    return _.omit(rates, "id");
                  }
                ),
              },
            },

            id: this.$route.params.id,
            loadData: "loadQuotationTabTableData",
            toastData: {
              toastSuccessData: {
                toastMsg: `The Express Contract FSR Quotation is Updated!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Express Contract FSR Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      } else {
        if (this.v$.$invalid) {
          this.submitted = true;
        }
        if (!this.v$.$invalid) {
          const data =
            this.$store.state.salesExpressContractFSR.quotationDetails.map(
              (i) => {
                return i;
              }
            );

          this.details.attachment_details =
            this.$store.state.salesExpressContractFSR.FSRAttachmentsFiles;

          this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            path: "/sales/quotation",
            method: "POST",
            loadDiffStore: true,
            data: {
              profile_id: this.$route.params.id,
              sales_person_id: 1,
              profile_name: data[0].profile_name,
              address: data[0].address,
              postal_code: data[0].postal_code,
              country: data[0].country,
              state: data[0].state,
              building_name: data[0].building_name,
              floor_no: data[0].floor_no,
              unit_no: data[0].unit_no,
              customer_type: "Express",
              business_type: "Contract",
              status: data[1].status,
              remarks: this.details.remarks,
              contacts:
                this.$store.state.salesExpressContractFSR
                  .expressQuotationContactsTableData,
              quotation: {
                referred_by: data[1].referred_by,
                referral_name: data[1].referral_name,
                previously_served_by: data[1].previously_served_by,
                sales_commission: data[1].sales_commission,
                festival_name: data[1].festival_name,
                standard_liability: data[1].standard_liability,
                volumetric_value: data[1].volumetric_value,
                service: "FSR",
                package_details: data[1].package_details,
                costing_details: {
                  fsr: {
                    rates:
                      this.$store.state.salesExpressContractFSR
                        .FSRCostingDetails,
                  },
                },
                settings: {
                  estimated_start_date: this.details.estimated_start_date,
                  first_month: true,
                  detail_type: this.details.detail_type,
                  unit_price: this.details.unit_price,
                  quantity: this.details.quantity,
                  amount: this.details.amount,
                  description: " data2.at(0)",
                },
              },
              attachments: {
                uploaded_in: "Quotation",
                attachment_details: this.details.attachment_details,
              },
            },

            id: this.$route.params.id,
            loadData: "loadQuotationTabTableData",
            toastData: {
              toastSuccessData: {
                toastMsg: `The Express Contract FSR Quotation is added!`,
                toastSeverity: "info",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Express Contract FSR Quotation, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
  },

  watch: {
    "$store.state.salesSales.sendQuotationData.id": function () {
      this.sendQuotation();
    },
  },

  unmounted() {
    // this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData =
    //   null;
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData =
      null;
    this.$store.state.salesExpressContractFSR.additionOfRowsEach = null;
  },
};
</script>

<style scoped>
.formDiv {
  margin-left: 14% !important;
}
.radioText {
  color: #343434;
  font-size: 12px;
  font-weight: 700;
  margin-top: 2%;
}
::v-deep .quotationCalendar .p-inputtext:enabled:hover {
  border-color: white !important;
}
.quotationCalendar .p-inputtext:enabled:focus {
  box-shadow: white !important;
  border-color: white !important;
}
::v-deep .quotationCalendar .p-inputtext {
  border-color: white !important;
}
.checkDiv {
  margin-left: 14%;
}
.calendarDiv {
  margin-left: 15%;
}
.formParentDiv {
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 70%;
}
.whiteDiv {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.timeDiv {
  background: #edf1f7;
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
.text {
  color: grey;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: bold;
  /* border-radius: 7px; */
}
.txt {
  font-size: 12px;
}
.chk2 {
  font-size: 12px;
  font-weight: bold;
  margin-top: 9%;
}
.chk2Div {
  padding-top: 8%;
}
.chk {
  font-size: 12px;
  font-weight: bold;
  margin-top: 7%;
}
.textA {
  width: 100%;
}
</style>
