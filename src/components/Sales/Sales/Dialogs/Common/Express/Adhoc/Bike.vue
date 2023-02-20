<template>
  <div class="formgrid grid mt-6 mb-0">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        From Postal Code
      </h5>
      <TextField
        label="postal_code"
        type="number"
        v-model="details.from_postal_code"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.details.from_postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        To Postal Code
      </h5>
      <TextField
        label="no_of_units"
        type="number"
        v-model="details.to_postal_code"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.details.to_postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md mt-2">
    <p class="bold-700 font-size-12 color-343434">Select Rates</p>
    <!-- need to change table data as needed, sample table assigned -->
    <div class="sales-selectRate-tableDesign">
      <span class="flex grid align-items-center mb-0 pb-0">
        <p class="flex bold-600 font-size-16 color-4e5868 col-12 md:col-5">
          Rates
        </p>
        <span
          class="
            flex
            col-12
            md:col-7
            justify-content-between
            align-items-center
            mb-0
            pb-0
          "
        >
          <p class="bold-600 font-size-14 color-4e5868">
            Total Charge :
            {{
              this.add?.toFixed(2) ||
              this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.express_adhoc_specifics?.total_charges?.toFixed(
                2
              )
            }}$
          </p>
        </span>
      </span>
      <hr />

      <DataTableRates
        v-if="
          $store.state.salesExpressAdhoc.inspectionsDropDownTableData != null
        "
        :key="$store.state.salesExpressAdhoc.inspectionsDropDownTableData"
        formTableDataName="additionOfRowsEach"
        :selectionModeState="
          this.$store.state.salesExpressAdhoc?.editExpressAdhocData
            ?.express_adhoc_specifics?.delivery_charges ||
          $store.state.salesExpressAdhoc.inspectionsDropDownTableData
        "
        dataKey="delivery_type_initial"
        :tableData="$store.state.salesExpressAdhoc.inspectionsDropDownTableData"
        :tableColumns="
          $store.state.salesExpressAdhoc.inspectionsDropDownTableDataColumns
        "
        storePath="salesExpressAdhoc"
        keyTabValue="inspectionsDropDownTableData"
        @getSelectedSurchargeData="getSelectedSurchargeData"
        @getSelectedData="getSelectedData"
      />

      <DataTableRates
        v-if="$store.state.salesExpressAdhoc.NormalBikeData != null"
        :key="$store.state.salesExpressAdhoc.NormalBikeData"
        formTableDataName="additionOfRowsEach"
        :selectionModeState="
          this.$store.state.salesExpressAdhoc?.editExpressAdhocData
            ?.express_adhoc_specifics?.normal_charges ||
          $store.state.salesExpressAdhoc.NormalBikeData
        "
        dataKey="charge_name"
        :tableData="$store.state.salesExpressAdhoc.NormalBikeData"
        :tableColumns="
          $store.state.salesExpressAdhoc.inspectionsDropDownTableDataColumn
        "
        storePath="salesExpressAdhoc"
        keyTabValue="NormalBikeData"
        @getSelectedSurchargeData="getSelectedSurchargeData"
        @getSelectedData="getSelectedData"
      />
    </div>
  </div>
  <div>
    <span class="ml-2 font-size-14">Contact Person</span>
    <div :key="renderKey" class="row ml-1 table_div">
      <div class="col-12">
        <DataTables
          :key="renderKey"
          :tableData="userDetails"
          :selectionModeState="selected_contacts"
          v-model:selection="selected_contacts"
          :tableColumn="contact_table"
          :multipleSelectValue="false"
          :profile_type="profile_type"
        />
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="bold-500 font-size-14">Remarks</h5>
    <TextAreaField
      label="remarks"
      type="text"
      v-model="details.remarks"
      :classes="{
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <div class="mt-3">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea"
          @click="closeDialog"
        />
        <Buttons
          label="Send"
          button_class="dialog-button-text mr-1"
          @click="sendQuotation()"
          class="bg-357dea"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          @click="handleClick()"
          class="bg-357dea"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
import DataTableRates from "../../../../../../Reusables/Sales/DataTable.vue";
import axios from "axios";
import moment from "moment";
import router from "../../../../../../../router";
import { sales_co, sales_IC } from "../../../../../../../store/helper";
import DataTables from "../Contract/Components/DataTables.vue";
import { salesCommon } from "../../../../../../../store/helper";
// import DataTable from "./DataTable.vue";
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "ExpressBikeAdhocDialog",
  data: () => ({
    v$: useVuelidate(),
    add: null,
    sub: null,
    products: [],
    selected_contacts: [],
    con_tacts: [],
    userDetails: [],
    datatable: false,
    sendButton: false,
    profile_type: "",
    newValue: [],
    surchargeData: {},
    details: {
      from_postal_code: "",
      to_postal_code: "",
      remarks: "",
    },
    submitted: false,
    newValueOne: null,
  }),

  validations() {
    return {
      details: {
        from_postal_code: { required },
        to_postal_code: { required },
        // remarks: { required },
      },
    };
  },

  components: {
    DataTables,
    DataTableRates,
  },
  computed: {
    ...sales_co,
    ...sales_IC,
    ...mapGetters({
      sendQutotionData: "salesSales/getSendQutationData",
    }),
  },
  methods: {
    ...salesCommon,
    addition() {
      if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
        let b = this.$store.state.salesExpressAdhoc?.additionOfRowsEach.map(
          (x) => {
            let a = null;
            return a + x.rate || x.net_charges;
          }
        );
        let sum = 0;
        for (let i = 0; i < b.length; i++) {
          sum += b[i];
        }
        this.add = sum;
      } else if (
        this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData
      ) {
        let b =
          this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData.map(
            (x) => {
              let a = null;
              return a + x.rate || x.net_charges;
            }
          );

        let sum = 0;
        for (let i = 0; i < b.length; i++) {
          sum += b[i];
        }
        this.add = sum;
      } else if (this.$store.state.salesExpressAdhoc.NormalBikeData) {
        let b = this.$store.state.salesExpressAdhoc.NormalBikeData.map((x) => {
          let a = null;
          return a + x.rate || x.net_charges;
        });
        let sum = 0;
        for (let i = 0; i < b.length; i++) {
          sum += b[i];
        }
        this.add = sum;
      }
    },
    ...mapActions({
      userDetailsApi: "salesCommon/getProfileDetails",
    }),

    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },

    async getUserInput() {
      if (this.$store.state.salesExpressAdhoc.ExpressAdhoc) {
        if (
          this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce == true &&
          this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike == true
        ) {
          if (
            this.details.from_postal_code.length > 5 &&
            this.details.to_postal_code.length > 5
          ) {
            const payload = {
              postal_code_from: this.details.from_postal_code,
              postal_code_to: this.details.to_postal_code,
            };
            this.$store.dispatch(
              "salesExpressAdhoc/loadAdhocDialogEcommerceBike",
              {
                path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/ecommerce/bike",
                mutation: "fetchLoadAdhocDialogEcommerceBike",
                id: "",
                payload,
              }
            );

            // await this.salesModuleSurchargeList(payload);
            this.addition();
          }
        } else if (
          this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal == true &&
          this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike == true
        ) {
          if (
            this.details.from_postal_code.length > 5 &&
            this.details.to_postal_code.length > 5
          ) {
            const payload = {
              postal_code_from: this.details.from_postal_code,
              postal_code_to: this.details.to_postal_code,
            };
            this.$store.dispatch(
              "salesExpressAdhoc/loadAdhocDialogNormalBike",
              {
                path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/normalcharge/bike",
                mutation: "fetchLoadAdhocDialogNormalBike",
                id: "",
                payload,
              }
            );

            this.addition();
          }
        }
      }
      // if (this.$store.state.salesExpressAdhoc.editExpressAdhocData) {
      //   if (
      //     this.$store.state.salesExpressAdhoc.editExpressAdhocData
      //       .express_adhoc_specifics.normal_charges != []
      //   ) {
      //     if (
      //       this.details.from_postal_code.length >= 5 &&
      //       this.details.to_postal_code.length >= 5
      //     ) {
      //       const payload = {
      //         postal_code_from: this.details.from_postal_code,
      //         postal_code_to: this.details.to_postal_code,
      //       };
      //       this.$store.dispatch(
      //         "salesExpressAdhoc/loadAdhocDialogNormalBike",
      //         {
      //           path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/normalcharge/bike",
      //           mutation: "fetchLoadAdhocDialogNormalBike",
      //           id: "",

      //           payload,
      //         }
      //       );
      //       this.addition();
      //     }
      //   } else if (
      //     this.$store.state.salesExpressAdhoc.editExpressAdhocData
      //       .express_adhoc_specifics.delivery_charges != []
      //   ) {
      //     if (
      //       this.details.from_postal_code.length >= 5 &&
      //       this.details.to_postal_code.length >= 5
      //     ) {
      //       const payload = {
      //         postal_code_from: this.details.from_postal_code,
      //         postal_code_to: this.details.to_postal_code,
      //       };
      //       this.$store.dispatch(
      //         "salesExpressAdhoc/loadAdhocDialogEcommerceBike",
      //         {
      //           path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/ecommerce/bike",
      //           mutation: "fetchLoadAdhocDialogEcommerceBike",
      //           id: "",
      //           payload,
      //         }
      //       );
      //       this.addition();
      //     }
      //   }
      // }
    },
    // getSelectedData(value) {
    // },
    getSelectedSurchargeData(value) {
      if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
        for (let i in this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
          for (let j in this.$store.state.salesExpressAdhoc.additionOfRowsEach[
            i
          ]?.surchargeData) {
            for (let k in value) {
              if (
                value[k].key ==
                this.$store.state.salesExpressAdhoc.additionOfRowsEach[i]
                  ?.surchargeData[j].key
              ) {
                this.surchargeData[value[k].delivery_type_initial] = [];
                this.surchargeData[value[k].delivery_type_initial] = value;
              }
            }
          }
        }
      } else {
        for (let k in value) {
          this.surchargeData[value[k].delivery_type_initial] = [];
          this.surchargeData[value[k].delivery_type_initial] = value;
        }
      }
    },
    async handleClick() {
      this.datatable = true;
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let con_tact = [];
        this.con_tacts.map((i) => {
          if (
            this.selected_contacts &&
            this.selected_contacts?.some((u) => u.email === i.email)
          ) {
            i["selected"] = true;
            con_tact.push(i);
          } else {
            i["selected"] = false;
            con_tact.push(i);
          }
        });
        if (this.$store.state.salesExpressAdhoc.editExpressAdhocData?.id) {
          if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike
          ) {
            if (!this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.newValueOne.map((item) => {
                this.products.push({
                  delivery_type: item.delivery_type,
                  delivery_type_initial: item.delivery_type_initial,
                  // ecommerce bike patch
                  cut_off_days_count: item.cut_off_days_count,
                  net_charges: item.net_charges,
                  selected: true,
                  collect_time: moment(item.collection_time)
                    .utcOffset("+8:00")
                    .format("hh:mm"),
                  cut_off_time: moment(item.cut_off_time)
                    .utcOffset("+8:00")
                    .format("hh:mm"),
                });
              });
            } else if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.products = [];
              this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
                (item) => {
                  this.products.push({
                    delivery_type: item.delivery_type,
                    delivery_type_initial: item.delivery_type_initial,
                    cut_off_days_count: item.cut_off_days_count,
                    net_charges: item.net_charges,
                    selected: true,
                    collect_time: moment(item.collection_time)
                      .utcOffset("+8:00")
                      .format("hh:mm"),
                    cut_off_time: moment(item.cut_off_time)
                      .utcOffset("+8:00")
                      .format("hh:mm"),
                    surcharges:
                      this.surchargeData[item.delivery_type_initial] || [],
                  });
                }
              );
            }
            const payload = {
              // profile_id: Number(this.$route.params.id),
              profile_id:
                this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .profile_id,
              business_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .business_type[0],
              // this.$store.state.salesExpressAdhoc.ExpressAdhoc.business_type[0],
              customer_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .customer_type[0],
              // this.$store.state.salesExpressAdhoc.ExpressAdhoc.customer_type[0],
              status: this.$store.state.salesExpressAdhoc.ExpressAdhoc.status,
              remarks: this.details.remarks,
              quotation_id:
                this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .quotation_id,
              contacts: con_tact,
              quotation: {
                total_charges: this.add,
                priority:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.priority,
                remarks: this.details.remarks,
                from_postal_code: Number(this.details.from_postal_code),
                to_postal_code: Number(this.details.to_postal_code),
                normal: this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal,
                e_commerce:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce,
                bike: this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike,
                van: this.$store.state.salesExpressAdhoc.ExpressAdhoc.van,
                rates: this.products,
              },
            };

            // await this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
            //   path:
            //     "/sales/quotation/" +
            //     this.$store.state.salesExpressAdhoc.editExpressAdhocData.id,
            //   method: "PATCH",

            //   data: payload,
            //   toastData: {
            //     toastSuccessData: {
            //       toastMsg: `The Express Adhoc Quotation Updated successfully`,
            //       toastSeverity: "info",
            //     },
            //     toastCommonErrorData: {
            //       toastMsg:
            //         "The Express Adhoc Quotation posted Wrong normal bike",
            //       toastSeverity: "error",
            //     },
            //   },
            //   id: this.$route.params.id,
            //   loadData: "loadQuotationTabTableData",
            // });

            let abc = await this.$store.dispatch(
              "salesExpressAdhoc/loadExpressAdhocPatch",
              {
                id1: this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .id,
                data: payload,
                loadData: "loadQuotationTabTableData",
              }
            );

            if (this.$route.params.p_id) {
              router.push({
                name: "QuotationContract",
                params: {
                  id: this.$route.params.p_id,
                },
              });

              this.$store.dispatch("salesSales/loadQuotationTabTableData", {
                id: this.$route.params.p_id,
              });
            }

            if (!this.$route.params.p_id) {
              this.$store.dispatch("salesSales/loadQuotationTabTableData", {
                id: this.$route.params.id,
              });
            }

            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: !this.$store.state.salesExpressAdhoc.editExpressAdhocData
                ?.id
                ? "Quotation Created Successfully"
                : "Quotation Updated Successfully",
              life: 3000,
            });

            this.$store.dispatch("salesSales/closeDialog");
            return abc?.data?.results;
          } else if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike
          ) {
            if (!this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              let surchargeDatSet = [];
              this.$store.state.salesExpressAdhoc.NormalBikeData?.map((i) => {
                surchargeDatSet.push(i.surchargeData);
              });

              this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.normal_charges.map(
                (i) => {
                  this.products.push({
                    charge_name: i.charge_name,
                    disabled: i.disabled,
                    rate: i.rate,
                  });
                }
              );
            } else if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.products = [];
              this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
                (i) => {
                  this.products.push({
                    charge_name: i.charge_name,
                    disabled: i.disabled,
                    rate: i.rate,
                  });
                }
              );
            }
            const payload = {
              profile_id:
                this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .profile_id,
              business_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .business_type[0],
              customer_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .customer_type[0],
              status: this.$store.state.salesExpressAdhoc.ExpressAdhoc.status,
              remarks: this.details.remarks,
              quotation_id:
                this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .quotation_id,
              contacts: con_tact,
              quotation: {
                total_charges: this.add,
                priority:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.priority,
                remarks: this.details.remarks,
                from_postal_code: Number(this.details.from_postal_code),
                to_postal_code: Number(this.details.to_postal_code),
                normal: this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal,
                e_commerce:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce,
                bike: this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike,
                van: this.$store.state.salesExpressAdhoc.ExpressAdhoc.van,
                rates: this.products,
              },
            };

            let abc = await this.$store.dispatch(
              "salesExpressAdhoc/loadExpressAdhocPatch",
              {
                id1: this.$store.state.salesExpressAdhoc.editExpressAdhocData
                  .id,
                data: payload,
                loadData: "loadQuotationTabTableData",
              }
            );

            if (this.$route.params.p_id) {
              if (abc.data.results) {
                router.push({
                  name: "QuotationContract",
                  params: {
                    id: this.$route.params.p_id,
                  },
                });
                this.$store.dispatch("salesSales/loadQuotationTabTableData", {
                  id: this.$route.params.p_id,
                });
              }
            }

            if (!this.$route.params.p_id) {
              this.$store.dispatch("salesSales/loadQuotationTabTableData", {
                id: this.$route.params.id,
              });
            }

            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: !this.$store.state.salesExpressAdhoc.editExpressAdhocData
                ?.id
                ? "Quotation Created Successfully"
                : "Quotation Updated Successfully",
              life: 3000,
            });

            this.$store.dispatch("salesSales/closeDialog");
            return abc?.data?.results;
          }
          if (this.$route.path == "/sales") {
            this.loadQuotationTabData();
            this.loadContractTabData();
          }
        } else {
          if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike
          ) {
            // const data = this.$store.state.salesExpressAdhoc.NormalBikeData;

            if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
                (i) => {
                  this.products.push({
                    charge_name: i.charge_name,
                    disabled: i.disabled,
                    rate: i.rate,
                  });
                }
              );
            } else if (
              !this.$store.state.salesExpressAdhoc.additionOfRowsEach
            ) {
              this.$store.state.salesExpressAdhoc.NormalBikeData?.map((i) => {
                this.products.push({
                  charge_name: i.charge_name,
                  disabled: i.disabled,
                  rate: i.rate,
                  delivery_type: i.delivery_type,
                  // ecommerce bike post
                  delivery_type_initial: i.delivery_type_initial,
                  cut_off_days_count: i.cut_off_days_count,
                  net_charges: i.net_charges,
                  selected: true,
                  priority:
                    this.$store.state.salesExpressAdhoc.ExpressAdhoc.priority,
                  collect_time: moment(i.collection_time)
                    .utcOffset("+8:00")
                    .format("hh:mm"),
                  cut_off_time: moment(i.cut_off_time)
                    .utcOffset("+8:00")
                    .format("hh:mm"),
                });
              });
            }

            const payload = {
              profile_id: Number(this.$route.params.id),
              business_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .business_type[0],
              customer_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .customer_type[0],
              status: this.$store.state.salesExpressAdhoc.ExpressAdhoc.status,
              remarks: this.details.remarks,
              contacts: con_tact,
              quotation: {
                total_charges: this.add,
                priority:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.priority,
                remarks: this.details.remarks,
                from_postal_code: Number(this.details.from_postal_code),
                to_postal_code: Number(this.details.to_postal_code),
                normal: this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal,
                e_commerce:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce,
                bike: this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike,
                van: this.$store.state.salesExpressAdhoc.ExpressAdhoc.van,
                rates: this.products,
              },
            };

            this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
              path: "/sales/quotation",
              method: "POST",

              data: payload,
              toastData: {
                toastSuccessData: {
                  toastMsg: `The Express Adhoc Quotation Posted Sucessfully `,
                  toastSeverity: "success",
                },
                toastCommonErrorData: {
                  toastMsg: "The Express Adhoc Quotation posted Wrong !",
                  toastSeverity: "error",
                },
              },
              id: this.$route.params.id,
              loadData: "loadQuotationTabTableData",
            });
          } else if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike
          ) {
            if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              // this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
              //   (item) => {
              //     this.products.push({
              //       delivery_type: item.delivery_type,
              //       // ecommerce bike post
              //       delivery_type_initial: item.delivery_type_initial,
              //       cut_off_days_count: item.cut_off_days_count,
              //       net_charges: item.net_charges,
              //       selected: true,
              //       collect_time: moment(item.collection_time)
              //         .utcOffset("+8:00")
              //         .format("hh:mm"),
              //       cut_off_time: moment(item.cut_off_time)
              //         .utcOffset("+8:00")
              //         .format("hh:mm"),
              //       surcharge : this.$store.state.salesExpressAdhoc.NormalBikeData
              //     });
              //   }
              // );

              this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData?.map(
                (item) => {
                  this.products.push({
                    delivery_type: item.delivery_type,
                    delivery_type_initial: item.delivery_type_initial,
                    cut_off_days_count: item.cut_off_days_count,
                    net_charges: item.net_charges,
                    selected: true,
                    collect_time: this.timeFormater(item.collect_time),
                    cut_off_time: this.timeFormater(item.cut_off_time),
                    surcharges:
                      this.surchargeData[item.delivery_type_initial] || [],
                  });
                }
              );
            } else if (
              !this.$store.state.salesExpressAdhoc.additionOfRowsEach
            ) {
              this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData?.map(
                (item) => {
                  this.products.push({
                    delivery_type: item.delivery_type,
                    delivery_type_initial: item.delivery_type_initial,
                    cut_off_days_count: item.cut_off_days_count,
                    net_charges: item.net_charges,
                    selected: true,
                    collect_time: this.timeFormater(item.collect_time),
                    cut_off_time: this.timeFormater(item.cut_off_time),
                    surcharges:
                      this.surchargeData[item.delivery_type_initial] || [],
                  });
                }
              );
            }

            const payload = {
              profile_id: Number(this.$route.params.id),
              business_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .business_type[0],
              customer_type:
                this.$store.state.salesExpressAdhoc.ExpressAdhoc
                  .customer_type[0],
              status: this.$store.state.salesExpressAdhoc.ExpressAdhoc.status,
              remarks: this.details.remarks,
              contacts: con_tact,
              quotation: {
                total_charges: this.add,
                priority:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.priority,
                remarks: this.details.remarks,
                from_postal_code: Number(this.details.from_postal_code),
                to_postal_code: Number(this.details.to_postal_code),
                normal: this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal,
                e_commerce:
                  this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce,
                bike: this.$store.state.salesExpressAdhoc.ExpressAdhoc.bike,
                van: this.$store.state.salesExpressAdhoc.ExpressAdhoc.van,
                rates: this.products,
              },
            };

            this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
              path: "/sales/quotation",
              method: "POST",

              data: payload,
              toastData: {
                toastSuccessData: {
                  toastMsg: `The Express Adhoc Quotation Posted Sucessfully `,
                  toastSeverity: "success",
                },
                toastCommonErrorData: {
                  toastMsg: "The Express Adhoc Quotation posted Wrong !",
                  toastSeverity: "error",
                },
              },
              id: this.$route.params.id,
              loadData: "loadQuotationTabTableData",
            });
          }
        }
      }
    },

    async sendQuotation() {
      this.sendButton = true;
      await this.handleClick().then((res) => {
        this.send(res);
      });
    },
    send(res) {
      if (this.sendButton && res) {
        let second = [];
        res?.contacts.map((i) => {
          if (i.selected == true) {
            second.push(i.id);
          }
        });

        this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
          path: "/sales/quotations/send/" + res?.id,
          method: "POST",
          id: this.$route.params.id,
          loadDiffStore: true,
          data: {
            send_to: second,
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The quotation is sent to mail successfully!`,
              toastSeverity: "info",
            },
            toastCommonErrorData: {
              toastMsg: "There was an error in activating contract, try again!",

              toastSeverity: "error",
            },
          },
        });
      }
    },

    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).utc().format("hh:mm");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },

  watch: {
    "$store.state.salesExpressAdhoc.editExpressAdhocData": function () {
      this.details.remarks =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData?.remarks;
      this.details.from_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.from_postal_code;
      this.details.to_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.to_postal_code;

      if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.delivery_charges[0] != null
      ) {
        this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.delivery_charges;
      } else if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.normal_charges[0] != null
      ) {
        this.$store.state.salesExpressAdhoc.NormalBikeData =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.normal_charges;
      }
    },

    "$store.state.salesExpressAdhoc.additionOfRowsEach": function () {
      this.addition();
    },
    "$store.state.salesExpressAdhoc.inspectionsDropDownTableData": function () {
      this.addition();

      this.$store?.state?.salesExpressAdhoc?.inspectionsDropDownTableData?.map(
        (i) => {
          return this?.newValue?.push({
            delivery_type: i?.delivery_type,
            delivery_type_initial: i?.delivery_type_initial,
            collect_time: this.timeFormater(i?.collect_time),
            cut_off_time: this.timeFormater(i?.cut_off_time),
            cut_off_days_count: i?.cut_off_days_count,
            net_charges: i?.net_charges,
          });
        }
      );

      let jsonObject = this?.newValue?.map(JSON.stringify);

      let uniqueSet = new Set(jsonObject);
      let uniqueArray = Array.from(uniqueSet)?.map(JSON.parse);

      this.newValueOne = uniqueArray;
    },

    "$store.state.salesExpressAdhoc.NormalBikeData": function () {
      this.addition();
    },

    "details.from_postal_code": function () {
      if (this.details.from_postal_code) {
        this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData = null;
        this.$store.state.salesExpressAdhoc.NormalBikeData = null;
      }
    },
    "details.to_postal_code": function () {
      if (this.details.to_postal_code) {
        this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData = null;
        this.$store.state.salesExpressAdhoc.NormalBikeData = null;
      }
    },
    sendQutotionData: function () {
      this.send(this.sendQutotionData);
    },
  },

  created() {
    this.userDetailsApi(this.$route.params?.id).then((c) => {
      if (c.status == 200) {
        this.profile_type = c.data.results?.profile_type;
        // this.userDetails.push(c.data.results?.company_contacts);
      }
    });
    this.con_tacts = [];
    let data = this.$store.state.salesExpressAdhoc.editExpressAdhocData;
    ("");
    this.profileCreationData.company_contacts?.map((i) => {
      this.userDetails.push({
        profile_url: i.profile_url,
        contact_name: i.contact_name,
        contact_no: i.contact_no,
        email: i.email,
        mobile_no: i.mobile_no,
        designation: i.designation,
        salutation: i.salutation,
      });
      if (
        data &&
        data.contacts.some((u) => u.email === i.email && u.selected)
      ) {
        this.selected_contacts.push({
          profile_url: i.profile_url,
          contact_name: i.contact_name,
          contact_no: i.contact_no,
          email: i.email,
          mobile_no: i.mobile_no,
          designation: i.designation,
          salutation: i.salutation,
        });
      }
    });
    this.con_tacts = this.userDetails;
    if (this.$store.state.salesExpressAdhoc.editExpressAdhocData) {
      // this.$store.state.salesExpressAdhoc.editExpressAdhocData.contacts.map(
      //   (i) => {
      //     this.selected_contacts.push({
      //       profile_url: i.profile_url,
      //       contact_name: i.contact_name,
      //       contact_no: i.contact_no,
      //       email: i.email,
      //       mobile_no: i.mobile_no,
      //       designation: i.designation,
      //       salutation: i.salutation,
      //     });
      //   }
      // );
      this.datatable = false;
      this.details.remarks =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.remarks;
      this.details.from_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.from_postal_code;
      this.details.to_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.to_postal_code;

      if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.delivery_charges[0] != null
      ) {
        //surcharge
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.express_adhoc_specifics?.delivery_charges.map(
          (list) => {
            let surcharge = [];
            this.surchargeData[list.delivery_type_initial] = [];
            list.surcharges.map((value) => {
              if (value.selected == true) {
                this.surchargeData[list.delivery_type_initial].push({
                  selected: value.selected,
                  surcharge_id: value.surcharge_id,
                  rates: value.rates,
                  surcharge_name: value.surcharge_name,
                  geo_fencing_id: value.geo_fencing_id,
                  key: list.delivery_type_initial + value.surcharge_name,
                  delivery_type_initial: list.delivery_type_initial,
                });
              }
              surcharge.push({
                selected: value.selected,
                surcharge_id: value.surcharge_id,
                rates: value.rates,
                surcharge_name: value.surcharge_name,
                geo_fencing_id: value.geo_fencing_id,
                key: list.delivery_type_initial + value.surcharge_name,
                delivery_type_initial: list.delivery_type_initial,
              });
            });
            list.surcharges = surcharge;
          }
        );
        this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.delivery_charges;
      } else if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.normal_charges[0] != null
      ) {
        this.$store.state.salesExpressAdhoc.NormalBikeData =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.normal_charges;
      }
    }
    this.renderKey++;
  },
  unmounted() {
    // this.$store.state.salesExpressAdhoc.ExpressVanData = null;
    // this.$store.state.salesExpressAdhoc.DialogNormalVan = null;
    // this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData = null;
    // this.$store.state.salesExpressAdhoc.NormalBikeData = null;
    // this.$store.state.salesExpressAdhoc.additionOfRowsEach = null;
  },
  mounted() {
    this.getUserInput();
  },
};
</script>

<style scoped>
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #f3f7ff !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr > td {
  color: #4e5968 !important;
  font-size: 12px;
  font-weight: 600;
}
.red {
  color: red;
}
</style>