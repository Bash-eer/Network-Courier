<template :key="renderKey">
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-4">Weight and Dimensions</p>
  </div>

  <!-- Parent -->
  <div class="adhocvan">
    <!-- Child -->
    <div>
      <img src="/images/box.png" alt="images" />
    </div>
    <!-- Weight Kg -->
    <div class="flex-direction md:col-9">
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-12">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Weight (kg)
          </h5>
          <TextField
            label="kg"
            type="number"
            v-model="details.kg"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details.kg.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-4">
          <h5 class="bold-500 font-size-14 color-7a7a7a">Length (cm)</h5>
          <TextField
            label="length"
            type="number"
            v-model="details.length"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details.length.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="bold-500 font-size-14 color-7a7a7a">Width (cm)</h5>
          <TextField
            label="weidth"
            type="number"
            v-model="details.weidth"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details.weidth.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="bold-500 font-size-14 color-7a7a7a">Height (cm)</h5>
          <TextField
            label="height"
            type="number"
            v-model="details.height"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details.height.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="formgrid grid ml-3">
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
          'inputfield w-full dialog-dropdown-text mb-0': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        To Postal Code
      </h5>
      <TextField
        label="no_of_units"
        v-on:childToParent="getUserInput"
        type="number"
        v-model="details.to_postal_code"
        :classes="{
          'p-invalid': v$.details.to_postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text mb-0': true,
        }"
      />
    </div>
  </div>

  <div class="field col-12 md mt-2">
    <p class="bold-700 font-size-12 color-7e84a7">Select Rates</p>
    <!-- need to change table data as needed, sample table assigned -->
    <div class="sales-selectRate-tableDesign">
      <span class="flex grid align-items-center mb-0 pb-0">
        <p class="flex bold-600 font-size-16 color-4e5868 col-8 md:col-3">
          Rates
        </p>
        <span
          class="
            flex
            col-12
            md:col-9
            justify-content-between
            align-items-center
            mb-0
            pb-0
          "
        >
          <p class="bold-600 font-size-14 color-4e5868">
            Total Weight: {{ Math.round(details.kg) }} Kg
          </p>
          <p class="bold-600 font-size-14 color-4e5868">
            Vol. Weight:
            {{
              Math.round(this.volumetric_weight) ||
              Math.round(
                this.details.weidth * this.details.length * this.details.height
              ) / this.volumeData
            }}
            <!-- {{newFunction()   }} -->
            Kg
          </p>
          <p class="bold-600 font-size-14 color-66c11e">
            Chargable Weight:
            {{
              Math.round(this.chargeable_weight) ||
              greater(
                details.kg,
                (details.weidth * details.length * details.height) /
                  this.volumeData
              )
            }}
            Kg
          </p>

          <p class="bold-600 font-size-14 color-66c11e">
            Total Charge :
            {{
              Math.round(this.add) ||
              Math.round(
                this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                  ?.express_adhoc_specifics?.total_charges
              )
            }}
            S$
          </p>
        </span>
      </span>
      <hr />

      <DataTableRates
        v-if="$store.state.salesExpressAdhoc.DialogNormalVan != null"
        :key="$store.state.salesExpressAdhoc.DialogNormalVan"
        formTableDataName="additionOfRowsEach"
        :selectionModeState="
          $store.state.salesExpressAdhoc.editExpressAdhocData
            ?.express_adhoc_specifics?.normal_charges ||
          $store.state.salesExpressAdhoc.DialogNormalVan
        "
        dataKey="charge_name"
        :tableData="$store.state.salesExpressAdhoc.DialogNormalVan"
        :tableColumns="
          $store.state.salesExpressAdhoc.inspectionsDropDownTableDataColumnsTwo
        "
        storePath="salesExpressAdhoc"
        keyTabValue="DialogNormalVan"
        @getSelectedSurchargeData="getSelectedSurchargeData"
        @getSelectedData="getSelectedData"
      />

      <DataTableRates
        v-if="$store.state.salesExpressAdhoc.ExpressVanData != null"
        :key="$store.state.salesExpressAdhoc.ExpressVanData"
        formTableDataName="additionOfRowsEach"
        :selectionModeState="
          $store.state.salesExpressAdhoc?.editExpressAdhocData
            ?.express_adhoc_specifics?.delivery_charges ||
          $store.state.salesExpressAdhoc.ExpressVanData
        "
        dataKey="delivery_type_initial"
        :tableData="$store.state.salesExpressAdhoc.ExpressVanData"
        :tableColumns="
          $store.state.salesExpressAdhoc.inspectionsDropDownTableDataColumnsOne
        "
        storePath="salesExpressAdhoc"
        keyTabValue="ExpressVanData"
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
          :multipleSelectValue="true"
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
        <!-- v-on:childToParent="submitData" -->
      </div>
    </div>
  </div>
  <Toasts
    :severity="$store.state['salesExpressAdhoc'].toastData.severity"
    :summary="$store.state['salesExpressAdhoc'].toastData.summary"
  />
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import moment from "moment";
import DataTables from "../Contract/Components/DataTables.vue";
import { mapActions, mapGetters } from "vuex";
import DataTableRates from "../../../../../../Reusables/Sales/DataTable.vue";
// import DataTable from "./DataTable.vue";
const { URL } = require("../../../../../../../../config/const");
import Toasts from "./Toast.vue";
// import Toasts from "../../../components/Sales/Sales/Toast.vue";
import router from "../../../../../../../router";
import {
  sales_co,
  sales_IC,
  salesCommon,
} from "../../../../../../../store/helper";
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "ExpressAdhocVanCategory",
  props: ["", ""],
  components: { Toasts, DataTables, DataTableRates },
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    products: [],
    greaterA: null,
    selected_contacts: [],
    con_tacts: [],
    greaterB: null,
    datas: null,
    val: null,
    datatable: false,
    sendButton: false,
    newValue: [],
    userDetails: [],
    surchargeData: {},
    newValueOne: null,
    chargeable_weight: null,
    volumetric_weight: null,
    volumeData: null,
    add: null,
    profile_type: "",
    details: {
      kg: "",
      length: "",
      weidth: "",
      height: "",
      from_postal_code: "",
      to_postal_code: "",
      remarks: "",
    },
    submitted: false,
  }),

  validations() {
    return {
      details: {
        kg: { required },
        from_postal_code: { required },
        to_postal_code: { required },
        // remarks: { required },
        length: { required },
        weidth: { required },
        height: { required },
      },
    };
  },
  // components: {
  //   // DataTable,
  // },
  computed: {
    ...sales_co,
    ...sales_IC,
    ...mapGetters({
      sendQutotionData: "salesSales/getSendQutationData",
    }),
  },
  methods: {
    // volume() {},
    ...salesCommon,
    newFunction() {
      if (this.details.weidth || this.details.length || this.details.height) {
        return (
          (this.details.weidth * this.details.length * this.details.height) /
          this.volumeData
        );
      } else if (this.volumetric_weight) {
        return this.volumetric_weight;
      }
    },

    ...mapActions({
      userDetailsApi: "salesCommon/getProfileDetails",
      salesModuleSurchargeList: "salesCommon/salesModuleSurchargeList",
    }),

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
      } else if (this.$store.state.salesExpressAdhoc.DialogNormalVan) {
        let b = this.$store.state.salesExpressAdhoc.DialogNormalVan.map((x) => {
          let a = null;
          return a + x.rate || x.net_charges;
        });
        let sum = 0;
        for (let i = 0; i < b.length; i++) {
          sum += b[i];
        }
        this.add = sum;
      } else if (this.$store.state.salesExpressAdhoc.ExpressVanData) {
        let b = this.$store.state.salesExpressAdhoc.ExpressVanData.map((x) => {
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

    async getUserInput() {
      if (
        this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce &&
        this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
      ) {
        if (
          this.details.from_postal_code.length > 5 &&
          this.details.to_postal_code.length > 5
        ) {
          let weight = this.chargeable_weight
            ? this.chargeable_weight
            : this.greater(
                this.details.kg,
                (this.details.weidth *
                  this.details.length *
                  this.details.height) /
                  this.volumeData
              );
          const payload = {
            postal_code_from: this.details.from_postal_code,
            postal_code_to: this.details.to_postal_code,
            weight: `${weight}`,
          };
          this.$store.dispatch(
            "salesExpressAdhoc/loadAdhocDialogEcommerceVan",
            {
              path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/ecommerce/van",
              id: "",
              payload,
              method: "fetchLoadAdhocDialogEcommerceVan",
            }
          );
          this.addition();
          this.renderKey++;
        }
      } else if (
        this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal &&
        this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
      ) {
        if (
          this.details.from_postal_code.length > 5 &&
          this.details.to_postal_code.length > 5
        ) {
          let weight = this.chargeable_weight
            ? this.chargeable_weight
            : this.greater(
                this.details.kg,
                (this.details.weidth *
                  this.details.length *
                  this.details.height) /
                  this.volumeData
              );
          const payload = {
            postal_code_from: this.details.from_postal_code,
            postal_code_to: this.details.to_postal_code,
            weight: `${weight}`,
          };
          this.$store.dispatch("salesExpressAdhoc/loadAdhocDialogNormalVan", {
            path: "/settings/salesSettings/rates/express/adhoc/zones/postalcodes/normalcharge/van",
            id: "",
            payload,
            method: "fetchLoadAdhocDialogNormalVan",
          });
          this.addition();
          this.renderKey++;
        }
      }

      if (this.details.length || this.details.weidth || this.details.height) {
        this.volumetric_weight = null;
        this.renderKey++;
      }
    },

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
          this.surchargeData[value[k].delivery_type_initial] = value;
        }
      }
    },

    greater(a, b) {
      if (a > b) {
        this.greaterA = Math.round(a);
        return a;
      } else {
        this.greaterB = a;
        return Math.round(b);
      }
    },

    async handleClick() {
      this.datatable = true;
      if (
        this.v$.$invalid
        // &&
        // !this.$store.state.salesExpressAdhoc.additionOfRowsEach?.length
      ) {
        this.submitted = true;
        // return;
      }
      if (!this.v$.$invalid) {
        // this.datatable = true;

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
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
          ) {
            //Normal Van Patch
            if (!this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.products = [];
              this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.normal_charges.map(
                (i) => {
                  this.products.push({
                    charge_name: i.charge_name,
                    disabled: i.disabled,
                    selected: true,
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
                    selected: true,
                    rate: i.rate,
                  });
                }
              );
            }

            const payload = {
              profile_id: this.$route.params?.p_id
                ? this.$route.params?.p_id
                : this.$route.params?.id,
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
                volumetric_weight:
                  // this.val ?  this.val :  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                  //   ?.express_adhoc_specifics?.volumetric_weight
                  this.details.weidth ||
                  this.details.length ||
                  this.details.height
                    ? (this.details.weidth *
                        this.details.length *
                        this.details.height) /
                      this.volumeData
                    : this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                        ?.express_adhoc_specifics?.volumetric_weight,
                chargeable_weight:
                  this.greaterA ||
                  this.greaterB ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.chargeable_weight,
                total_charges:
                  this.add ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.total_charges,
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
                weight: Number(this.details.kg),
                length: Number(this.details.length),
                height: Number(this.details.height),
                width: Number(this.details.weidth),
                rates: this.products,
              },
            };

            // this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
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
            //       toastMsg: "Something Went Wrong normal van",
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
              detail: !this.$route.params.id
                ? "Quotation Created Successfully"
                : "Quotation Updated Successfully",
              life: 3000,
            });

            this.$store.dispatch("salesSales/closeDialog");
            return abc?.data?.results;
          } else if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
          ) {
            //Ecom Van Patch
            if (!this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              // this.newValueOne.map((item) => {
              //   this.products.push({
              //     delivery_type: item.delivery_type,
              //     // ecommerce van patch
              //     delivery_type_initial: item.delivery_type_initial,
              //     cut_off_days_count: item.cut_off_days_count,
              //     net_charges: item.net_charges,
              //     selected: true,
              //     collect_time: item.collect_time,
              //     cut_off_time: item.cut_off_time,
              //   });
              // });
              this.products = [];
              this.$store.state.salesExpressAdhoc?.ExpressVanData?.map(
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
            } else if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              // this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
              //   (item) => {
              //     this.products.push({
              //       delivery_type: item.delivery_type,
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
              //     });
              //   }
              // );

              this.$store.state.salesExpressAdhoc?.ExpressVanData?.map(
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
              // profile_id: Number(this.$route.params.id),

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
                volumetric_weight:
                  // this.val ? this.val : this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                  //    ?.express_adhoc_specifics?.volumetric_weight
                  this.details.weidth ||
                  this.details.length ||
                  this.details.height
                    ? (this.details.weidth *
                        this.details.length *
                        this.details.height) /
                      this.volumeData
                    : this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                        ?.express_adhoc_specifics?.volumetric_weight,
                chargeable_weight:
                  this.greaterA ||
                  this.greaterB ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.chargeable_weight,
                total_charges:
                  this.add ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.total_charges,
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
                weight: Number(this.details.kg),
                length: Number(this.details.length),
                height: Number(this.details.height),
                width: Number(this.details.weidth),
                rates: this.products,
              },
            };

            // this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
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
            //       toastMsg: "Something Went Wrong normal van",
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
              detail: !this.$route.params.id
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
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.e_commerce &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
          ) {
            //Ecom Van Post
            if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              // this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
              //   (item) => {
              //     this.products.push({
              //       delivery_type: item.delivery_type,
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
              //     });
              //   }
              // );
              this.products = [];
              this.$store.state.salesExpressAdhoc?.ExpressVanData?.map(
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
              this.$store.state.salesExpressAdhoc.ExpressVanData.map((item) => {
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
                volumetric_weight:
                  (this.details.weidth *
                    this.details.length *
                    this.details.height) /
                  this.volumeData,
                chargeable_weight:
                  this.greaterA ||
                  this.greaterB ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.chargeable_weight,
                total_charges:
                  this.add ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.total_charges,
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
                weight: Number(this.details.kg),
                length: Number(this.details.length),
                height: Number(this.details.height),
                width: Number(this.details.weidth),
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
                  toastMsg: "Something Went Wrong !",
                  toastSeverity: "error",
                },
              },
              id: this.$route.params.id,
              loadData: "loadQuotationTabTableData",
            });
          } else if (
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.normal &&
            this.$store.state.salesExpressAdhoc.ExpressAdhoc.van
          ) {
            //Normal Van Post
            if (this.$store.state.salesExpressAdhoc.additionOfRowsEach) {
              this.$store.state.salesExpressAdhoc.additionOfRowsEach.map(
                (i) => {
                  this.products.push({
                    charge_name: i.charge_name,
                    disabled: i.disabled,
                    selected: true,
                    rate: i.rate,
                  });
                }
              );
            } else if (
              !this.$store.state.salesExpressAdhoc.additionOfRowsEach
            ) {
              this.$store.state.salesExpressAdhoc.DialogNormalVan?.map((i) => {
                this.products.push({
                  charge_name: i.charge_name,
                  disabled: i.disabled,
                  selected: true,
                  rate: i.rate,
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
                volumetric_weight:
                  (this.details.weidth *
                    this.details.length *
                    this.details.height) /
                  this.volumeData,
                chargeable_weight:
                  this.greaterA ||
                  this.greaterB ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.chargeable_weight,
                total_charges:
                  this.add ||
                  this.$store.state.salesExpressAdhoc?.editExpressAdhocData
                    ?.express_adhoc_specifics?.total_charges,
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
                weight: Number(this.details.kg),
                length: Number(this.details.length),
                height: Number(this.details.height),
                width: Number(this.details.weidth),
                rates: this.products,
              },
            };

            this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
              path: "/sales/quotation",
              method: "POST",

              data: payload,
              toastData: {
                toastSuccessData: {
                  toastMsg: ` The Express Adhoc Quotation Posted Sucessfully `,
                  toastSeverity: "success",
                },
                toastCommonErrorData: {
                  toastMsg: "Something Went Wrong !",
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

    openDialog(name) {
      this.$store.state.users.displayDialog = true;
      this.$store.state.users.dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).utc().format("hh:mm");

      if (date === "Invalid date") {
        return null;
      } else {
        return date;
      }
    },
  },

  async created() {
    await this.$store.dispatch(
      "salesExpressAdhoc/loadGetNormalVanVolumetricData"
    );
    this.userDetailsApi(this.$route.params?.id).then((c) => {
      if (c.status == 200) {
        // this.userDetails.push(c.data.results);
        this.profile_type = c.data.results?.profile_type;
      }
    });
    this.userDetails = [];
    let data = this.$store.state.salesExpressAdhoc.editExpressAdhocData;
    this.profileCreationData.company_contacts.map((i) => {
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
      this.datatable = false;
      this.details.remarks =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.remarks;
      this.details.kg =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.weight;
      this.details.length =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.length;
      this.details.weidth =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.width;
      this.details.height =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.height;
      this.details.from_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.from_postal_code;
      this.details.to_postal_code =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.to_postal_code;

      this.$store.state.salesExpressAdhoc.WatchVanUpdate =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData;

      this.chargeable_weight =
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.express_adhoc_specifics?.chargeable_weight;

      this.volumetric_weight =
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.express_adhoc_specifics?.volumetric_weight;
      //surcharge
      this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.express_adhoc_specifics?.delivery_charges.map(
        (list) => {
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
          });
        }
      );
      this.renderKey++;
    }
  },

  watch: {
    "$store.state.salesExpressAdhoc.WatchVanUpdate": function () {
      if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.delivery_charges[0] != null
      ) {
        this.$store.state.salesExpressAdhoc.ExpressVanData =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.delivery_charges;
      }

      if (
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          .express_adhoc_specifics.normal_charges[0] != null
      ) {
        this.$store.state.salesExpressAdhoc.DialogNormalVan =
          this.$store.state.salesExpressAdhoc.editExpressAdhocData.express_adhoc_specifics.normal_charges;
      }
    },

    "$store.state.salesExpressAdhoc.additionOfRowsEach": function () {
      this.addition();
    },
    "$store.state.salesExpressAdhoc.DialogNormalVan": function () {
      this.addition();
    },
    "$store.state.salesExpressAdhoc.ExpressVanData": function () {
      this.addition();

      this.newValue = [];
      this.$store?.state?.salesExpressAdhoc?.ExpressVanData?.map((i) => {
        return this?.newValue?.push({
          delivery_type: i?.delivery_type,
          delivery_type_initial: i?.delivery_type_initial,
          collect_time: this.timeFormater(i?.collect_time),
          cut_off_time: this.timeFormater(i?.cut_off_time),
          cut_off_days_count: i?.cut_off_days_count,
          net_charges: i?.net_charges,
        });
      });
      let jsonObject = this?.newValue?.map(JSON.stringify);
      let uniqueSet = new Set(jsonObject);
      let uniqueArray = Array?.from(uniqueSet)?.map(JSON.parse);
      this.newValueOne = uniqueArray;
    },

    "$store.state.salesExpressAdhoc.NormalVanVolumetricData": function () {
      this.volumeData =
        this.$store.state.salesExpressAdhoc?.NormalVanVolumetricData?.volumetric_value;
    },

    "details.from_postal_code": function () {
      if (this.details.from_postal_code) {
        this.$store.state.salesExpressAdhoc.ExpressVanData = null;
        this.$store.state.salesExpressAdhoc.DialogNormalVan = null;
      }
    },
    "details.to_postal_code": function () {
      if (this.details.to_postal_code) {
        this.$store.state.salesExpressAdhoc.ExpressVanData = null;
        this.$store.state.salesExpressAdhoc.DialogNormalVan = null;
      }
    },
    sendQutotionData: function () {
      this.send(this.sendQutotionData);
    },
  },

  unmounted() {
    // this.$store.state.salesExpressAdhoc.editExpressAdhocData = null;
    // this.$store.state.salesExpressAdhoc.ExpressVanData = null;
    // this.$store.state.salesExpressAdhoc.DialogNormalVan = null;
    // this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData = null;
    // this.$store.state.salesExpressAdhoc.NormalBikeData = null;
    // this.$store.state.salesExpressAdhoc.additionOfRowsEach = null;
  },
};
</script>

<style scoped>
.adhocvan {
  display: flex;
}
.van-header {
  font-size: 12px !important;
  color: #343434 !important;
}
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