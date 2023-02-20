<template>
  <div>
    <div class="third-step">
      <div
        v-for="(item, index) of $store.state.salesInternationalContract
          .dropDownData"
        :key="index"
      >
        <div v-if="details.service_providers[index] && importType[index]">
          <h6 class="ml-1 heading-letters">{{ item.service_provider }}</h6>
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <h5 class="required text-styles">Import</h5>
              <DropDownField
                :state="details.service_providers[index]['import_rate_card_id']"
                :value="details.service_providers[index]['import_rate_card_id']"
                code="code"
                :data="importType[index]['dropValues']"
                label="customer_type"
                v-model="
                  details.service_providers[index]['import_rate_card_id']
                "
                :classes="{
                  'p-invalid':
                    v$.details.service_providers[index]['import_rate_card_id']
                      .$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-4">
              <h5 class="required text-styles">Export</h5>
              <DropDownField
                :state="details.service_providers[index].export_rate_card_id"
                :value="details.service_providers[index].export_rate_card_id"
                code="code"
                :data="exportType[index]['dropValues']"
                label="export"
                v-model="details.service_providers[index].export_rate_card_id"
                :classes="{
                  'p-invalid':
                    v$.details.service_providers[index].export_rate_card_id
                      .$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-4">
              <h5 class="required text-styles">Local</h5>
              <DropDownField
                :state="details.service_providers[index].local_rate_card_id"
                :value="details.service_providers[index].local_rate_card_id"
                code="code"
                :data="localType[index]['dropValues']"
                label="local"
                v-model="details.service_providers[index].local_rate_card_id"
                :classes="{
                  'p-invalid':
                    v$.details.service_providers[index].local_rate_card_id
                      .$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <div class="flex mt-2 justify-content-end ml-3">
            <div class="flex flex-row acknowledgement-check check-button">
              <div class="flex flex-row ">
                <span class="ml-5 mr-3">
                <SingleCheckBox
                  label="Normal"
                  class="checker-right"
                  v-model="details.service_providers[index].normal"
                  :value="details.service_providers[index].normal"
                /></span>
                <span class="ml-3" >
                <SingleCheckBox
                  label="E-Commerce"
                  v-model="details.service_providers[index].e_commerce"
                  :value="details.service_providers[index].e_commerce"
                /></span>
              </div>
            </div>
          </div>
        </div>
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
        <div class="align-self-center flex ml-2">
          <Buttons
            label="Previous"
            v-on:childToParent="goBackHandler"
            class="p-button-outlined mr-1 dialog-button-text previous-btn"
          />
        </div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton
            storePath="salesSales"
            label="Cancel"
            class="color-357dea"
          />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
export default {
  name: "SalesInternationalContractThirdStep",
  data: () => ({
    exportType: [],
    importType: [],
    localType: [],
    v$: useVuelidate(),
    dropDownDataId: [
      "import_rate_card_id",
      "export_rate_card_id",
      "local_rate_card_id",
    ],
    details: {
      service_providers: [],
    },
    submitted: false,
  }),

  validations() {
    let validate = { details: { service_providers: [] } };
    this.$store.state.salesInternationalContract.dropDownData.map((list) => {
      validate.details.service_providers.push({
        import_rate_card_id: { required },
        export_rate_card_id: { required },
        local_rate_card_id: { required },
      });
    });
    return validate;
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    goBackHandler() {
      this.setCurrentStep(2);
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesInternationalContractSecondStep",
      });
    },
    getDropDownName(dataName, code, index) {
      console.log(dataName, code, "........");
      console.log(this[dataName][index]);

      console.log(this[dataName][index]["dropValues"]);
      return this[dataName][index]["dropValues"].find(
        (item) => item.code == code
      ).name;
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setCurrentStep(4);

        const { service_providers } = this.details;
        service_providers.map((item, index) => {
          console.log(item);
          // const {import_rate_card_id, export_rate_card_id, local_rate_card_id} =
          //   item;

          this.dropDownDataId.map((id) => {
            let type = id.split("_")[0];
            item[type] = this.getDropDownName(type + "Type", item[id], index);
          });
        });
        // const { service_providers } = this.details;

        // service_providers.map((item) => {
        //   if(["import_rate_card_id","export_rate_card_id","local_rate_card_id"].includes(item)){
        // let type = item.split("_")[0];

        //   item[type] = this.getDropDownName(type + "Type", item[id]);
        // });
        //   }

        this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData.quotation,
            { service_providers: this.details.service_providers }
          );

        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesInternationalContractFourthStep",
        });
      }
    },
  },
  async created() {
    await this.$store.dispatch("salesInternationalContract/loadDropdown", {
      path: "/settings/sales/rates/international/outbound/service-provider/rate-cards",
    });

    if (this.$store.state.salesInternationalContract.InternationalRowData.id) {
      const { InternationalRowData } =
        this.$store.state.salesInternationalContract;

      InternationalRowData.international_contract_specifics.service_provider_details.map(
        (item) => {
          this.details.service_providers.push({
            e_commerce: item.e_commerce,
            export: item.export,
            service_provider_id: item.service_provider_id,
            service_provider_name: item.service_provider_name,
            export_rate_card_id: item.export_rate_card_id,
            import: item.import,
            import_rate_card_id: item.import_rate_card_id,
            local: item.local,
            local_rate_card_id: item.local_rate_card_id,
            normal: item.normal,
          });
        }
      );
    }
  },

  watch: {
    // "$store.state.salesInternationalContract.InternationalRowData":
    //   function () {
    //     console.log(
    //       "i meditedddddddddddddddddddddd",
    //       this.$store.state.salesInternationalContract.InternationalRowData
    //     );

    //     if (
    //       this.$store.state.salesInternationalContract.InternationalRowData.id
    //     ) {
    //       console.log("i meditedddddddddddddddddddddd");
    //       const { InternationalRowData } =
    //         this.$store.state.salesInternationalContract;

    //       console.log(InternationalRowData);
    //       InternationalRowData.international_contract_specifics.service_provider_details.map(
    //         (item) => {
    //           console.log(
    //             "i m hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    //             this.$store.state.salesInternationalContract
    //               .InternationalRowData.international_contract_specifics
    //               .service_provider_details
    //           );
    //           this.details.service_providers.push({
    //             e_commerce: item.e_commerce,
    //             export: item.export,
    //             service_provider_id: item.service_provider_id,
    //             service_provider_name: item.service_provider_name,
    //             export_rate_card_id: item.export_rate_card_id,
    //             import: item.import,
    //             import_rate_card_id: item.import_rate_card_id,
    //             local: item.local,
    //             local_rate_card_id: item.local_rate_card_id,
    //             normal: item.normal,
    //           });
    //         }
    //       );
    //     }
    //   },
    "$store.state.salesInternationalContract.dropDownData": function () {
      this.$store.state.salesInternationalContract.dropDownData.map(
        (list, index) => {
          if (
            !this.$store.state.salesInternationalContract.InternationalRowData
              .id
          ) {
            this.details.service_providers.push({
              service_provider_id: list.id,
              service_provider_name: list.service_provider,
              import: "",
              export: "",
              local: "",
              import_rate_card_id: "",
              export_rate_card_id: "",
              local_rate_card_id: "",
              normal: false,
              e_commerce: false,
            });
          }

          this.exportType[index] = {
            service_provider: list.service_provider,
            dropValues: [],
          };
          if (list.rate_card.export.length) {
            list.rate_card.export.map((data) => {
              this.exportType[index]["dropValues"].push({
                name: data.rate_card_name,
                code: data.id,
                default: data.default,
              });
            });
            this.exportType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          } else {
            this.exportType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          }
          this.importType[index] = {
            service_provider: list.service_provider,
            dropValues: [],
          };
          if (list.rate_card.import.length) {
            list.rate_card.import.map((data) => {
              this.importType[index]["dropValues"].push({
                name: data.rate_card_name,
                code: data.id,
                default: data.default,
              });
            });
            this.importType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          } else {
            this.importType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          }
          this.localType[index] = {
            service_provider: list.service_provider,
            dropValues: [],
          };
          if (list.rate_card.local.length) {
            list.rate_card.local.map((data) => {
              this.localType[index]["dropValues"].push({
                name: data.rate_card_name,
                code: data.id,
                default: data.default,
              });
            });
            this.localType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          } else {
            this.localType[index]["dropValues"].push({
              name: "None",
              code: "0",
              default: false,
            });
          }
          if (
            !this.$store.state.salesInternationalContract.InternationalRowData
              .id
          ) {
            this.details.service_providers[index].import_rate_card_id = "0";
            this.details.service_providers[index].export_rate_card_id = "0";
            this.details.service_providers[index].local_rate_card_id = "0";

            this.importType[index]["dropValues"].find((list) => {
              if (list.default) {
                this.details.service_providers[index].import_rate_card_id =
                  list.code;
                return;
              }
            });
            this.exportType[index]["dropValues"].find((list) => {
              if (list.default) {
                this.details.service_providers[index].export_rate_card_id =
                  list.code;
                return;
              }
            });
            this.localType[index]["dropValues"].find((list) => {
              if (list.default) {
                this.details.service_providers[index].local_rate_card_id =
                  list.code;
                return;
              }
            });
          }
        }
      );
    },
    details: {
      handler() {
        console.log(
          "quoation ---------------",
          this.$store.state.salesInternationalContract
            .CreateQuotationContractData
        );
        this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData?.quotation,
            { service_providers: this.details.service_providers }
          );
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
::v-deep .checker-right {
  margin-right: 30px !important;
}
.third-step {
  margin-top: 40px;
}
.check-button {
  margin-right: 29px;
  margin-top: -3px;
  margin-bottom: 35px;
}
.check-text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4e5968;
}
.heading-letters {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}
.text-styles {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #7a7a7a;
}
</style>
