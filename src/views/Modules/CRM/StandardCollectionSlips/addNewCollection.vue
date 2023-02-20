<template>
  <div :key="renderKey">
    <div
      class="formgrid grid mr-3 flex justify-content-between align-self-center"
    >
      <div class="formgrid grid field col-12">
        <div class="field col-6 md:col-6">
          <h5 class="color-7a7a7a font-size-14 text-left noWrap mr-1">
            Template Name:
          </h5>
          <TextField
            label="template_name"
            type="text"
            v-model="details.template_name"
            :classes="{
              'p-invalid': v$.details.template_name.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-6 md:col-6">
          <h5 class="color-7a7a7a text-sm noWrap mr-1">Effective Date:</h5>
          <Calendar
            label="effective_date"
            type="text"
            showIcon="true"
            v-model="details.effective_date"
            :classes="{
              'p-invalid': v$.details.effective_date.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex
        justify-content-end
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="flex align-self-center justify-content-start">
        <CancelButton
          storePath="salesQuotationDialog"
          class="color-357dea"
          @click="closeDialog"
        />

        <Buttons
          label="Submit"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="SubmitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import ContractBikeSendQuotationDialog from "../../../../components/Settings/Quotation/Dialogs/ExpressContractBike/ContractBikeSendQuotationDialog.vue";
export default {
  name: "SalesExpressContractBikeFSRThirdStep",
  components: {},
  data: () => ({
    v$: useVuelidate(),
    selectionModeState: null,
    details: {
      template_name: "",
      effective_date: "",
    },
    errMsg: false,
    tripsSelected: false,
    renderKey: 10,

    submitted: false,
  }),
  validations() {
    return {
      details: {
        template_name: { required },
        effective_date: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      templateEditData: "Masscollection/gettemplateEditData",
    }),
  },
  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: "Masscollection/POSTPATCHCRUDOPERATION",
      closeDialog: "Masscollection/closeDialog",
      postSelectedCostCenterStdCollection:
        "CustomerLaunchStore/postSelectedCostCenterStdCollection",
      patchCrmCollerData: "CustomerLaunchStore/patchCrmCollerData",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      fetchStdCollectionSlipsTableData:
        "Masscollection/fetchStdCollectionSlipsTableData",
    }),
    SubmitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (this.templateEditData?.id) {
          let path = "/crm/standard/slip/" + this.templateEditData?.id;
          this.PostData(path, "PATCH");
        } else {
          let path = "/crm/standard/slips";
          this.PostData(path, "POST");
        }
      }
    },
    PostData(path, method) {
      this.POSTPATCHCRUDOPERATION({
        path: path,

        data: this.details,
        method: method,
        loadData: "Masscollection/fetchStdCollectionSlipsTableData",
        closeDialogue: "Masscollection/closeDialog",
        toastData: {
          toastSuccessData: {
            toastMsg:
              method == "PATCH"
                ? `Template is updated successfully!`
                : `Template is Created Successfully`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Template already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the Template, try again!",

            toastSeverity: "error",
          },
        },
      }).then((c) => {
        let data = {
          template_id: c?.data?.results?.id,
        };
        this.postSelectedCostCenterStdCollection(data).then((res) => {
          if (res.status == 200) {
            this.getCrmBookingDetails(res.data?.results?.id);
            this.$router.push({
              name: "customerDetailsCrm",
              params: {
                type: "Contract",
              },
            });
            this.fetchStdCollectionSlipsTableData();
          }
        });
      });
    },
    prefillData(Data) {
      this.details.effective_date = this.dateFormater(Data?.effective_date);
      this.details.template_name = Data?.template_name;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("MM-DD-YYYY");
        return formattedDate;
      }
    },
  },
  created() {
    if (this.templateEditData?.id) {
      this.prefillData(this.templateEditData);
      this.renderKey++;
    }
  },
  unmounted() {
    this.$store.state.Masscollection.templateEditData = null;
    this.renderKey++;
  },
  watch: {},
};
</script>

<style scoped>
.trips-header {
  font-size: 12px !important;
  color: #343434 !important;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px dashed #cad1dd !important;
}
</style>
