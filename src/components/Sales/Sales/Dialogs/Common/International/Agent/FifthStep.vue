<template>
  <div class="field col-12 md:col-12 mt-4 mb-0 pl-0 ml-3">
    <p class="bold-700 font-size-16 color-343434">Permit Settings</p>
  </div>
  <Accordion :activeIndex="0" v-for="(i, index) of details.list" :key="index">
    <AccordionTab :header="i.gst_type">
      <div
        class="formgrid grid"
        v-for="(item, index1) of details.list[index].permitSettings"
        :key="index1"
      >
        <div v-if="item.permit_type != null" class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500 mt-1 ml-1">
            Permit Type
          </h5>
          <TextField
            v-model="item.permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500 required">
            Document Charges
          </h5>
          <TextField
            v-model="item.document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.list[index]?.permitSettings[index1]?.document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required color-7a7a7a font-size-14 bold-500 required">
            Handling Charges
          </h5>
          <TextField
            v-model="item.handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.list[index]?.permitSettings[index1]?.handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <div class="field col-12 md:col-12">
    <p class="color-343434 font-size-14 bold-700 mt-3 mb-0 pb-0">
      Storage Charges
    </p>
  </div>
  <div v-for="e of storage_charge" class="formgrid grid mt-0 pt-0" :key="e">
    <div class="field col-12 md:col-5">
      <h5 class="color-7a7a7a font-size-14 bold-500">Weight Range</h5>
      <div class="formgrid grid ml-0 pl-0">
        <div class="field col-12 md:col-6 ml-0 pl-0">
          <TextField
            label="weight_range"
            type="number"
            v-model="e.storage_min_weight"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6 ml-0 pl-0">
          <TextField
            label="weight_range2"
            type="number"
            v-model="e.storage_max_weight"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-7">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500">Minimum Charges</h5>
          <TextField
            label="minimum_charges"
            type="number"
            :iconSet="true"
            icon_class="p-input-icon-left"
            v-model="e.storage_min_charge"
            :classes="{
              // 'p-invalid': v$.details.minimum_charges.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500">Per KG Charges</h5>
          <TextField
            label="per_kg"
            type="number"
            :iconSet="true"
            icon_class="p-input-icon-left"
            v-model="e.storage_charge_per_kg"
            :classes="{
              // 'p-invalid': v$.details.per_kg.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500">Grace Period</h5>
          <TextField
            label="grace_period"
            type="number"
            v-model="e.storage_grace_period"
            :classes="{
              // 'p-invalid': v$.details.grace_period.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="color-343434 font-size-14 bold-700 mt-3 my-0 py-0">
      Miscellaneous
    </p>
  </div>
  <div class="flex-row row">
    <div
      v-for="(item, index) of miscellaneous"
      class="formgrid grid mt-2 md:col-5"
      :key="index"
    >
      <div class="field">
        <h5 class="color-7a7a7a font-size-14 bold-500 unit_rates">
          {{ item.miscellaneous_charge_name }}
        </h5>
        <div class="formgrid grid">
          <div class="col-12 md:col-6 ml-0 pl-0">
            <div class="p-inputgroup ml-0 pl-0">
              <TextField
                label="adim_charges_percent"
                type="number"
                v-model="item.miscellaneous_charge_percent"
                :classes="{
                  'p-invalid':
                    v$.miscellaneous[index]?.miscellaneous_charge_percent
                      ?.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">(%)</span>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <div class="p-inputgroup">
              <TextField
                label="adim_charges"
                type="number"
                v-model="item.miscellaneous_min_charge"
                :classes="{
                  'p-invalid':
                    v$.miscellaneous[index]?.miscellaneous_min_charge
                      ?.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">min Charges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-for="e of permit_additional" class="formgrid grid" :key="e">
    <div class="field col-12 md:col-5">
      <h5 class="color-7a7a7a font-size-14 bold-500">
        Minimum {{ e.charge_name }} (FOC)
      </h5>
      <TextField
        label="minimum_permit"
        type="number"
        v-model="e.min_foc"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-5">
      <h5 class="color-7a7a7a font-size-14 bold-500">
        Additional Amount Per {{ e.charge_name }} ($)
      </h5>
      <TextField
        label="additional_amount"
        type="number"
        v-model="e.additional_charge"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-5">
      <h5 class="color-7a7a7a font-size-14 bold-500">Minimum Item (FOC)</h5>
      <TextField
        label="minimum_item"
        type="number"
        v-model="details.minimum_item"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-5">
      <h5 class="color-7a7a7a font-size-14 bold-500">
        Additional Amount Per item ($)
      </h5>
      <TextField
        label="additional_item"
        type="number"
        v-model="details.additional_item"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div> -->
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
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesInternationalAgent"
          label="Cancel"
          class="color-357dea"
          @click="closeDialog"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "vuex";
import { internationalAgent } from "../../../../../../../store/helper";
export default {
  name: "SalesInternationalAgentFifthStep",
  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    permitValidation: [],
    details: {
      list: [],
      grace_period: "0",
      per_kg: "0",
      minimum_charges: "0",
      weight_range: "0",
      weight_range2: "0",
      additional_amount: "0",
      minimum_permit: "0",
      minimum_item: "0",
      additional_item: "0",
      adim_charges_percent: "0",
      adim_charges: "0",
    },
    storage_charge: [],
    permit_additional: [],
    miscellaneous: [],
    miscellaneous_valid: [],
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          list: this.permitValidation,
          // grace_period: { required },
          // per_kg: { required },
          // minimum_charges: { required },
          // adim_charges_percent: { required },
          // adim_charges: { required },
        },
        miscellaneous: this.miscellaneous_valid,
      };
    }
  },
  components: {
    Accordion,
    AccordionTab,
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  methods: {
    ...internationalAgent,
    ...mapActions({
      getPermitSettings: "salesInternationalAgent/getPermitSettings",
      setPostData: "salesInternationalAgent/setPayloadPostData",
      setAgentStep: "salesInternationalAgent/setAgentStep",
    }),
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentFourthStep",
      });
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let {
        list,
        grace_period,
        per_kg,
        minimum_charges,
        weight_range,
        weight_range2,
        additional_amount,
        minimum_permit,
        minimum_item,
        additional_item,
        adim_charges_percent,
        adim_charges,
      } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let gstPostTypes = [];
        console.log("list", list);
        let mes = list.find((i) => i.gst_type.includes("MES SCHEME"));
        list.map((e) => {
          // let localPermit=[];
          e.permitSettings.map((i) => {
            gstPostTypes.push({
              gst_type: e.gst_type,
              permit_type: i.permit_type,
              document_charges: i.document_charges,
              handling_charges: i.handling_charges,
            });
          });
        });
        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            permit_settings: {
              mes_gst_count: 0,
              mes_gst_charges: mes.permitSettings[0].handling_charges,
              gst_details: gstPostTypes,
              storage_charges: this.storage_charge,
              miscellaneous: this.miscellaneous,
              permit_additional: this.permit_additional,
            },
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesInternationalAgent.agentStep++;
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentSixthStep",
        });
      }
    },
    async getPermitList() {
      let res = await this.getPermitSettings();

      //  this.details.clearance= res.data.results;
      if (res) {
        res.data.results.map((e) => {
          let localPermit = [];
          let localPermitValidation = [];

          e.permitSettings.map((i) => {
            localPermit.push({
              permit_type: i.permit_type,
              document_charges: i.document_charges ? i.document_charges : "0",
              handling_charges: i.handling_charges ? i.handling_charges : "0",
            });
            localPermitValidation.push({
              // permit_type: { required },
              document_charges: { required },
              handling_charges: { required },
            });
            this.addSalesClicked++;
          });
          this.details.list.push({
            gst_type: "GST Type: " + e.gst_type,
            permitSettings: localPermit,
          });
          this.permitValidation.push({
            permitSettings: localPermitValidation,
          });
        });
      }
    },
    async getOtherCharges() {
      let res = await this.getPermitOther();
      if (res) {
        res.data.results.map((i) => {
          this.miscellaneous.push({
            miscellaneous_charge_name: i.charge_name,
            miscellaneous_charge_percent: 0,
            miscellaneous_min_charge: i.rate,
          });
          this.miscellaneous_valid.push({
            miscellaneous_charge_percent: { required },
            miscellaneous_min_charge: { required },
          });
        });
        this.addSalesClicked++;
      }
    },
    async getAdditionalCharges() {
      let res = await this.getPermitAdl();
      if (res) {
        res.data.results.map((i) => {
          this.permit_additional.push({
            charge_name: i.charge_name,
            min_foc: i.item_threshold,
            additional_charge: i.rate,
          });
        });
      }
    },
    async getStorageCharges() {
      let res = await this.getPermitStorage();
      if (res) {
        res.data.results.map((i) => {
          this.storage_charge.push({
            storage_min_weight: i.min_weight,
            storage_max_weight: i.max_weight,
            storage_charge_per_kg: i.per_kg_charges,
            storage_min_charge: i.minimum_charge,
            storage_grace_period: i.grace_period,
          });
        });
      }
    },
    prefillData() {
      let gstType = [];
      this.quotationData.international_agent_specifics.permit_settings.gst_details.map(
        (i) => {
          if (!gstType.includes(i.gst_type)) {
            gstType.push(i.gst_type);
          }
        }
      );
      gstType.map((e) => {
        let filterData =
          this.quotationData.international_agent_specifics.permit_settings.gst_details.filter(
            (k) => k.gst_type === e
          );
        let localPermit = [];
        let localPermitValidation = [];

        filterData.map((u) => {
          localPermit.push({
            permit_type: u.permit_type,
            document_charges: u.document_charges,
            handling_charges: u.handling_charges,
          });
          localPermitValidation.push({
            // permit_type: { required },
            document_charges: { required },
            handling_charges: { required },
          });
          this.addSalesClicked++;
        });
        this.details.list.push({
          gst_type: e,
          permitSettings: localPermit,
        });
        this.permitValidation.push({
          permitSettings: localPermitValidation,
        });
      });
      let detail_data =
        this.quotationData.international_agent_specifics.permit_settings;
      detail_data.storage_charges.map((i) => {
        this.storage_charge.push({
          storage_min_weight: i.storage_min_weight,
          storage_max_weight: i.storage_max_weight,
          storage_charge_per_kg: i.storage_charge_per_kg,
          storage_min_charge: i.storage_min_charge,
          storage_grace_period: i.storage_grace_period,
        });
      });
      detail_data.miscellaneous.map((i) => {
        this.miscellaneous.push({
          miscellaneous_charge_name: i.miscellaneous_charge_name,
          miscellaneous_charge_percent: i.miscellaneous_charge_percent,
          miscellaneous_min_charge: i.miscellaneous_min_charge,
        });
        this.miscellaneous_valid.push({
          miscellaneous_charge_percent: { required },
          miscellaneous_min_charge: { required },
        });
      });
      detail_data.permit_additional.map((i) => {
        this.permit_additional.push({
          charge_name: i.charge_name,
          min_foc: i.min_foc,
          additional_charge: i.additional_charge,
        });
      });

      // (this.details.grace_period =
      //   this.quotationData.international_agent_specifics.permit_settings.storage_grace_period),
      //   (this.details.per_kg =
      //     this.quotationData.international_agent_specifics.permit_settings.storage_charge_per_kg),
      //   (this.details.minimum_charges =
      //     this.quotationData.international_agent_specifics.permit_settings.storage_min_charge),
      //   (this.details.weight_range =
      //     this.quotationData.international_agent_specifics.permit_settings.storage_min_weight),
      //   (this.details.weight_range2 =
      //     this.quotationData.international_agent_specifics.permit_settings.storage_max_weight),
      //   (this.details.additional_amount =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_amount_per_item),
      //   (this.details.minimum_permit =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_min_permit_foc),
      //   (this.details.minimum_item =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_min_item),
      //   (this.details.additional_item =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_amount_per_item),
      //   (this.details.adim_charges_percent =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_adim_charge_percent),
      //   (this.details.adim_charges =
      //     this.quotationData.international_agent_specifics.permit_settings.miscellaneous_adim_min_charge);
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.getPermitList();
      this.getOtherCharges();
      this.getAdditionalCharges();
      this.getStorageCharges();
    }
  },
};
</script>

<style scoped>
.category:checked ~ label {
  color: rgb(143, 143, 167);
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion-tab {
  margin-bottom: 15px !important ;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
/* ::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}

::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
} */
.category {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  /* color : pink; */
}
/* .accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.5) !important;
  border-radius: 8px 8px 0px 0px !important;
  border-color: #357DEA !important;
  border: 1px solid #357dea !important;
} */
::v-deep .p-accordion-content {
  padding-top: 20px !important;
  background: rgba(243, 247, 255, 0.5) !important;
  border: 1px solid #357dea !important;
}
::v-deep .p-accordion-header-link {
  background: #edf3ff !important;
  border-radius: 8px 8px 0 0 !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  color: #357dea !important;
  padding-right: 15px !important;
}
.p-inputgroup-addon {
  min-height: 38px;
  background: #c4c4c4 0.2;
  padding: 0 20px;
  font-size: 10px !important;
  color: #7a7a7a !important;
}
</style>