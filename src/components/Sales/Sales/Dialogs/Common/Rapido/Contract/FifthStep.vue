<template>
  <div>
    <div class="flex flex-column time_content pb-5 px-2 pt-2 ml-2 mr-4 mt-6">
      <div class="flex">
        <div class="flex flex-row p-2">
          <div class="flex align-items-center">
            <SingleCheckBox
              label="Estimated Start Date (Tentative)"
              v-model="details.estimated_start_date_selected"
              :value="details.estimated_start_date_selected"
            />
          </div>
        </div>
      </div>
      <div clas="flex pb-2">
        <div class="white_content p-2 calendar_content">
          <Calendar
            placeholder="Enter a date"
            dateFormat="d MM yy"
            class="quotation_calendar"
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
      <div
        v-if="quotationData?.status == 'In Contract'"
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
            v-model="details.effective_start_date"
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
    <div class="field col-12 md my-4">
      <span class="color-343434 font-size-12 bold-700">Contact Person</span>
      <div class="row table_div mt-2">
        <div class="col-12">
          <DataTable
            formTableDataName="contactTable"
            dataKey="contact_name"
            :tableData="rapidoContractData.contacts"
            :tableColumns="tableColumns"
            storePath="salesQuotationDialog"
          />
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="color-7a7a7a font-size-14 bold-500 pb-1">Remarks</h5>
        <TextAreaField
          label="remarks"
          v-model="remarks"
          @blur="v$.remarks.$model;"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div>
      <!--attachment-->
      <DragAndDropUpload
        :state="rapidoContractQuotationAttachmentsState"
        type="rapidoContractQuotation"
        storePath="salesRapidoContract"
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
            v-on:childToParent="goBack"
            class="p-button-outlined mr-1 dialog-button-text color-357dea"
          />
          <div class="flex align-self-center justify-content-end">
            <CancelButton
              @click="closeDialog"
              storePath="salesSales"
              label="cancel"
            />
            <!-- <Buttons
              label="Preview"
              class="p-button-outlined mr-2 dialog-button-text color-357dea"
            /> -->
            <Buttons
              @click="save"
              label="Save"
              button_class="dialog-button-text bg-357dea"
              :loading="isloading"
            />
            <Buttons
              label="Send Quotation Now"
              @click="sendQuotation"
              button_class="dialog-button-text ml-2 bg-357dea"
              v-on:childToParent="submitData"
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
import DataTable from "./Components/DataTable.vue";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
import { salesCommon } from "../../../../../../../store/helper";
export default {
  name: "SalesRapidoContractFifthStep",
  components: { DataTable },
  data: () => ({
    date: null,
    v$: useVuelidate(),
    remarks: "",
    isQuotationBtnLoading: false,
    isloading: false,
    validationErr: false,
    details: {
      estimated_start_date: null,
      estimated_start_date_selected: false,
      effective_start_date: null,
    },
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
    tableColumns: [
      { field: "contact_name", header: "Name" },
      { field: "contact_no", header: "Contact" },
      { field: "email", header: "Email" },
      { field: "mobile_no", header: "Mobile" },
    ],
    //attachment
    rapidoContractQuotationAttachmentsState: " ",
    submitted: false,
  }),
  validations() {
    if (this.quotationData?.status == "In Contract") {
      return {
        details: {
          effective_start_date: { required },
          remarks: {},
        },
      };
    } else {
      return {
        remarks: {},
      };
    }
  },
  watch: {
    "$store.state.salesRapidoContract.rapidoContractQuotationFiles":
      function () {
        this.setRapidoContractData({
          key: "attachments",
          value: {
            uploaded_in: "Quotation",
            attachment_details:
              this.$store.state.salesRapidoContract
                .rapidoContractQuotationFiles,
          },
        });
      },
    remarks() {
      this.setRapidoContractData({
        value: { remarks: this.remarks },
      });
    },
    details: {
      handler() {
        this.setRapidoContractData({
          key: "quotation",
          value: { settings: this.details },
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      rapidoContractData: "salesRapidoContract/Contract/rapidoContractData",
      quotationData: "salesRapidoContract/Contract/quotationData",
      selectedTab: "salesSales/selectedTab",
      selectedContacts: "salesRapidoContract/Contract/selectedContacts",

      // rapidoContractQuotationAttachmentStateData : "salesRapidoContract/rapidoContractQuotationAttachmentStateData"
    }),
  },
  methods: {
    ...salesCommon,
    ...mapActions({
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      saveRapidoContract: "salesRapidoContract/Contract/saveRapidoContract",
      editRapidoContract: "salesRapidoContract/Contract/editRapidoContract",
      sendQuotationData: "salesRapidoContract/Contract/sendQuotation",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
    }),
    closeDialog() {
      this.clearQuotationData();
      this.setRapidoContractStep(-4);
      this.$store.dispatch("salesSales" + "/closeDialog");
    },
    async sendQuotation() {
      try {
        this.isQuotationBtnLoading = true;
        let quotationId = null;
        if (this.quotationData) {
          if (this.$route.name == "QuotationContract") {
            quotationId = await this.editRapidoContract({
              type: this.selectedTab,
              id: this.quotationData.id,
              payload: {
                ...this.rapidoContractData,
                contacts: this.selectedContacts,
              },
            });
          } else {
            quotationId = await this.editRapidoContract({
              type: this.$route.params.type,
              id: this.quotationData.id,
              payload: {
                ...this.rapidoContractData,
                contacts: this.selectedContacts,
              },
            });
          }
        } else {
          quotationId = await this.saveRapidoContract(this.rapidoContractData);
        }
        if (quotationId) {
          let arr = [];

          quotationId?.data.results?.contacts.map((list) => {
            if (list.selected) {
              arr.push(list.id);
            }
          });
          await this.sendQuotationData({
            id: quotationId?.data.results?.id,
            payload: {
              send_to: arr,
            },
          });
          this.isQuotationBtnLoading = false;
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Quotation sent successfully",
            life: 3000,
          });
        }
        this.clearQuotationData();
        this.setRapidoContractStep(-4);
        if (this.$route.params.type) {
          await this.$router.push({
            name: "RapidoRapidoContractOverview",
            params: {
              id: quotationId.data?.results?.id,
              type: this.$route.params.type,
              p_id: this.$route.params.p_id,
            },
          });
        }
        this.$store.dispatch("salesSales/closeDialog");
        if (this.$route.path == "/sales") {
          this.loadQuotationTabData();
          this.loadContractTabData();
        }
        this.$store.dispatch("salesSales/loadQuotationTabTableData", {
          id: this.$route.params.id,
        });
        this.$store.dispatch("salesSales/loadContractTabTableData", {
          id: this.$route.params.id,
        });
      } catch (err) {
        this.isQuotationBtnLoading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    async save() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        // this.rapidoContractData.attachment_details =
        //   this.$store.state.salesRapidoContract.rapidoContractQuotationFiles;
        if (this.quotationData) {
          try {
            let res;
            this.isloading = true;
            if (this.$route.name == "QuotationContract") {
              res = await this.editRapidoContract({
                id: this.quotationData.id,
                type: this.selectedTab,
                payload: {
                  ...this.rapidoContractData,
                  contacts: this.selectedContacts,
                },
              });
            } else {
              res = await this.editRapidoContract({
                type: this.$route.params?.type,
                id: this.quotationData.id,
                payload: {
                  ...this.rapidoContractData,
                  contacts: this.selectedContacts,
                },
              });
            }
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Data edited successfully",
              life: 3000,
            });
            this.isloading = false;
            if (this.$route.params.type) {
              await this.$router.push({
                name: "RapidoRapidoContractOverview",
                params: {
                  id: res.data?.results?.id,
                  type: this.$route.params.type,
                  p_id: this.$route.params.p_id,
                },
              });
            }
            this.$store.dispatch("salesSales/loadQuotationTabTableData", {
              id: this.$route.params.id,
            });
            this.clearQuotationData();
            this.setRapidoContractStep(-4);
            this.$store.dispatch("salesSales/closeDialog");
            if (this.$route.path == "/sales") {
              this.loadQuotationTabData();
              this.loadContractTabData();
            }

            this.$store.dispatch(
              "salesRapidoContract/loadRapidoContractOverviewData",
              {
                id: this.$route.params.id,
                type: this.$route.params.type,
              }
            );
            this.$store.dispatch("salesSales/loadContractTabTableData", {
              id: this.$route.params.id,
            });
          } catch (err) {
            this.isloading = false;
            let toastMsg = await errhandler(err);
            this.$toast.add({
              severity: toastMsg.serverity,
              summary: toastMsg.summary,
              detail: toastMsg.msg,
              life: 3000,
            });
          }
        } else {
          try {
            this.isloading = true;
            await this.saveRapidoContract({
              ...this.rapidoContractData,
              contacts: this.selectedContacts,
            });
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "New data added successfully",
              life: 3000,
            });
            this.isloading = false;
            this.clearQuotationData();
            this.setRapidoContractStep(-4);
            this.$store.dispatch("salesSales/closeDialog");
            this.$store.dispatch("salesSales/loadQuotationTabTableData", {
              id: this.$route.params.id,
            });
            this.$store.dispatch("salesSales/loadContractTabTableData", {
              id: this.$route.params.id,
            });
          } catch (err) {
            this.isloading = false;
            let toastMsg = await errhandler(err);
            this.$toast.add({
              severity: toastMsg.serverity,
              summary: toastMsg.summary,
              detail: toastMsg.msg,
              life: 3000,
            });
          }
        }
      }
    },
    goBack() {
      this.setRapidoContractStep(-1);
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
    },
    dateFormater(data) {
      if (data == null) {
        return null;
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    prefillData() {
      this.details.estimated_start_date_selected =
        this.quotationData.settings.estimated_start_date_selected;
      this.details.estimated_start_date = this.dateFormater(
        this.quotationData.settings.estimated_start_date
      );
      this.details.effective_start_date = this.dateFormater(
        this.quotationData.settings.effective_start_date
      );
      this.remarks = this.quotationData.remarks;
      // this.rapidoContractQuotationAttachmentsState =
      //   this.commonAttachmentStateData.attachments;
      if (this.quotationData.quotation_attachments?.length > 0) {
        //processed
        // let attachmentArr = [];
        // for (
        //   let i = 0;
        //   i < this.quotationData.quotation_attachments.length;
        //   i++
        // ) {
        //   attachmentArr.push(
        //     this.quotationData.quotation_attachments[i].attachments
        //   );
        // }
        // this.quotationData["attachments"] = attachmentArr;
        let respectiveData = this.quotationData.quotation_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );
        if (respectiveData) {
          this.rapidoContractQuotationAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesRapidoContract.rapidoContractQuotationFiles =
            respectiveData["attachments"];
        }

        //processed

        //   this.details["attachments"]["attachment_details"] = [];
        // // this.details.attachments.attachment_details = []
        // this.details.attachments.attachment_details =
        //   this.commonFollowUpStateData.follow_up_attachments[0].attachments;

        return;
      }

      if (this.quotationData.contract_attachments?.length > 0) {
        //processed
        // let attachmentArr = [];
        // for (
        //   let i = 0;
        //   i < this.quotationData.contract_attachments.length;
        //   i++
        // ) {
        //   attachmentArr.push(
        //     this.quotationData.contract_attachments[i].attachments
        //   );
        // }
        // this.quotationData["attachments"] = attachmentArr;
        let respectiveData = this.quotationData.contract_attachments.find(
          (itm) => itm.uploaded_in == "Quotation"
        );
        if (respectiveData) {
          this.rapidoContractQuotationAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.salesRapidoContract.rapidoContractQuotationFiles =
            respectiveData["attachments"];
        }

        //processed

        //   this.details["attachments"]["attachment_details"] = [];
        // // this.details.attachments.attachment_details = []
        // this.details.attachments.attachment_details =
        //   this.commonFollowUpStateData.follow_up_attachments[0].attachments;

        return;
      }
    },
  },
  created() {
    //attachment
    this.$store.state.commonStore.attachmentsTag = "rapidoContractQuotation";
    this.$store.state.sales.expressQuotationContactsTableData =
      this.$store.state["sales"].contactsStateData;
    let p_id = this.quotationData?.profile_id;
    this.setRapidoContractData({
      value: {
        profile_id: p_id ? p_id : this.$route.params?.id,
      },
    });

    this.setRapidoContractData({
      key: "quotation",
      value: { settings: this.details },
    });

    if (this.quotationData) {
      this.prefillData();
    }
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesRapidoContract.rapidoContractQuotationFiles = [];
    this.$store.state.salesRapidoContract.deletedrapidoContractQuotationFiles =
      [];
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

.calendar_content {
  margin-left: 15%;
}
.white_content {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 4px;
  height: 25%;
  width: 67.8%;
}
.time_content {
  background: #edf1f7;
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
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
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px solid #cad1dd !important;
  border-radius: 6px;
}
</style>