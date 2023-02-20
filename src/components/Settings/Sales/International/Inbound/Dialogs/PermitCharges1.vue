<template>
  <Accordion :activeIndex="0">
    <AccordionTab
      v-for="data of PermitChargeData"
      :key="data.id"
      :header="data.gstType"
    >
      <div v-for="(item, index) of data.details" :key="item">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4" v-if="data.id != 5">
            <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
            <TextField
              v-model="
                details.gst_types[`${data['individualType']}`][index][
                  'permit_type'
                ]
              "
              type="text"
              :disabled="true"
              :classes="{
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4" v-if="data.id != 5">
            <h5 class="dialog-label-text required">Document Charges</h5>
            <TextField
              v-model="
                details.gst_types[`${data['individualType']}`][index][
                  'document_charges'
                ]
              "
              type="text"
              :classes="{
                'p-invalid':
                  v$.details.gst_types[`${data['individualType']}`][index][
                    'document_charges'
                  ].$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="dialog-label-text required">Handling Charges</h5>
            <TextField
              v-model="
                details.gst_types[`${data['individualType']}`][index][
                  'handling_charges'
                ]
              "
              type="text"
              :classes="{
                'p-invalid':
                  v$.details.gst_types[`${data['individualType']}`][index][
                    'handling_charges'
                  ].$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
      <!-- <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[0].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[0].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[1].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[1].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[2].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[2].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[3].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[3].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[4].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[4].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div> -->
    </AccordionTab>
  </Accordion>

  <div class="mt-5">
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
        <CancelButton storePath="internationalInbound" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  name: "PermitCharges",
  data: () => ({
    PermitChargeData: [
      {
        id: 1,
        gstType: "FreeDom",
        individualType: "free_dom",
        details: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
      },
      {
        id: 2,

        gstType: "DDU",
        individualType: "ddu",

        details: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
      },
      {
        id: 3,
        individualType: "free_dom_request",

        gstType: "Free Dom Request",
        details: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
      },
      {
        id: 4,
        individualType: "freedom_transfer",

        gstType: "Free Dom Transfer",
        details: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
      },
      {
        id: 5,
        individualType: "mes_scheme",

        gstType: "Mes Scheme",
        details: [
          {
            handling_charges: "",
          },
        ],
      },
    ],
    v$: useVuelidate(),
    details: {
      gst_types: {
        free_dom: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        ddu: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        free_dom_request: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        freedom_transfer: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        mes_scheme: [
          {
            handling_charges: "",
          },
        ],
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        gst_types: {
          free_dom: [
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
          ],
          ddu: [
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
          ],
          free_dom_request: [
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
          ],
          freedom_transfer: [
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
            {
              document_charges: {required},
              handling_charges: {required},
            },
          ],
          mes_scheme: [
            {
              handling_charges: {required},
            },
          ],
        },
      },
    };
  },
  components: {
    Accordion,
    AccordionTab,
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
          path: "/settings/salesSettinigs/rates/international/inbound/permitCharges/gstTypes",
          data: this.details,
          method: "POST",
          loadData: {
            loadApi: "loadPermitChargesData",
            loadPath:
              "/settings/salesSettinigs/rates/international/inbound/permitCharges/gstTypes",
            type: "fetchGstChargesData",
          },

          toastData: {
            toastSuccessData: {
              toastMsg: `The surcharge detail is added!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The data is already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in adding the surcharge, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
    },
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
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}

::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
}
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
.accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
/* .p-accordion .p-accordion-content{
  background-color: rgb(88, 233, 233) ;
}
::v-deep .p-accordion .p-accordion-content{
  background-color: rgb(163, 88, 233) ;
}
.p-accordion .p-accordion-content{
  background-color: rgb(233, 175, 88) !important;
} */
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.5) !important;
  border-radius: 8px 8px 0px 0px !important;
  /* border-color: #357DEA !important; */
  border: 1px solid #357dea !important;
}
</style>
