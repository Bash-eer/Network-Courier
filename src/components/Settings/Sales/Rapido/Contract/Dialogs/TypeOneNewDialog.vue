<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-9">
      <h5 class="color-7a7a7a required text-style text-sm">Rate Card Name</h5>
      <TextField
        type="text"
        v-model="details.rate_card_name"
        :classes="{
          'p-invalid': v$.details.rate_card_name.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <h6 class="color-4e5868">Add Charges</h6>

  <div v-for="(delivery, dIndex) of addDeliverys" :key="dIndex">
    <div v-if="dIndex > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteDelivery(dIndex)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <div style="background: rgb(189 191 195 / 12%)">
      <br />
      <div class="formgrid grid">
        <div class="field col-12 md:col-5">
          <h5 class="required color-7a7a7a text-sm required">Delivery Type</h5>
          <TextField
            type="text"
            class="color-212121"
            v-model="details['delivery_type'][dIndex].delivery_type"
            :classes="{
              'p-invalid':
                v$.details['delivery_type'][dIndex].delivery_type.$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text color-212121': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="color-7a7a7a text-sm required">Pick Up Cut Off Time</h5>

          <TimePicker24
            v-model="details['delivery_type'][dIndex].pick_up_cut_off_time"
            :state="details['delivery_type'][dIndex].pick_up_cut_off_time"
            :classes="{
              'p-invalid':
                v$.details['delivery_type'][dIndex].pick_up_cut_off_time
                  .$invalid && submitted,
              'inputfield w-full dialog-dropdown-text color-212121': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="color-7a7a7a text-sm required">Cut Off Time</h5>

          <TimePicker24
            v-model="details['delivery_type'][dIndex].cut_off_time"
            :state="details['delivery_type'][dIndex].cut_off_time"
            class="color-212121"
            :classes="{
              'p-invalid':
                v$.details['delivery_type'][dIndex].cut_off_time.$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="color-7a7a7a text-sm text-indent-negative-18 required">
            Cut Off Days Count
          </h5>
          <TextField
            type="number"
            v-model="details['delivery_type'][dIndex].cut_off_days_count"
            class="color-212121"
            :classes="{
              'p-invalid':
                v$.details['delivery_type'][dIndex].cut_off_days_count
                  .$invalid && submitted,
              'inputfield w-full dialog-dropdown-text color-212121': true,
            }"
          />
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="color-7a7a7a text-sm required">Delivery Type Initial</h5>
            <TextField
              type="text"
              v-model="details['delivery_type'][dIndex].delivery_type_initial"
              class="color-212121"
              :classes="{
                'p-invalid':
                  v$.details['delivery_type'][dIndex].delivery_type_initial
                    .$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div
          v-for="(size, sIndex) of details['delivery_type'][dIndex].rates"
          :key="sIndex"
        >
          <div v-if="sIndex > 0" class="flex justify-content-between">
            <div class="flex"></div>
            <div class="flex delete" @click="deleteSize(dIndex, sIndex)">
              <i class="pi parent pi-times mt-2"></i>
            </div>
          </div>
          <!-- {{ details["delivery_type"][dIndex]["rates"] }} -->
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <h5 class="required color-7a7a7a text-sm">Name the Size</h5>

              <TextField
                type="text"
                class="color-212121"
                v-model="
                  details['delivery_type'][dIndex]['rates'][sIndex].size_name
                "
                :classes="{
                  'p-invalid':
                    v$.details['delivery_type'][dIndex]['rates'][sIndex]
                      .size_name.$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="color-7a7a7a required ml-2 text-sm">Kg</h5>
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <!-- <NumberField
                    :showButtons="true"
                    class="color-212121"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .min_weight
                    "
                    mode="decimal"
                    :minFractionDigits="2"
                    :classes="{
                      'p-invalid': submitted,
                      'inputfield w-full dialog-field-text': true,
                    }"
                  /> -->
                  <TextField
                    type="number"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .min_weight
                    "
                    class="color-212121"
                    :classes="{
                      'p-invalid':
                        v$.details['delivery_type'][dIndex]['rates'][sIndex]
                          .min_weight.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text color-212121': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-6">
                  <!-- <NumberField
                    :showButtons="true"
                    class="color-212121"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .max_weight
                    "
                    mode="decimal"
                    :classes="{
                      'p-invalid': submitted,
                      'inputfield w-full dialog-field-text': true,
                    }"
                  /> -->
                  <TextField
                    type="number"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .max_weight
                    "
                    class="color-212121"
                    :classes="{
                      'p-invalid':
                        v$.details['delivery_type'][dIndex]['rates'][sIndex]
                          .max_weight.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text color-212121': true,
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="required color-7a7a7a ml-2 text-sm">Cm</h5>
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <!-- <NumberField
                    :showButtons="true"
                    class="color-212121"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .min_length
                    "
                    mode="decimal"
                    :classes="{
                      'p-invalid': submitted,
                      'inputfield w-full dialog-field-text': true,
                    }"
                  /> -->
                  <TextField
                    type="number"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .min_length
                    "
                    class="color-212121"
                    :classes="{
                      'p-invalid':
                        v$.details['delivery_type'][dIndex]['rates'][sIndex]
                          .min_length.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text color-212121': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-6">
                  <!-- <NumberField
                    :showButtons="true"
                    class="color-212121"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .max_length
                    "
                    mode="decimal"
                    :classes="{
                      'p-invalid': submitted,
                      'inputfield w-full dialog-field-text': true,
                    }"
                  /> -->
                  <TextField
                    type="number"
                    v-model="
                      details['delivery_type'][dIndex]['rates'][sIndex]
                        .max_length
                    "
                    class="color-212121"
                    :classes="{
                      'p-invalid':
                        v$.details['delivery_type'][dIndex]['rates'][sIndex]
                          .max_length.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text color-212121': true,
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="field col-12 md:col-2">
              <h5 class="color-7a7a7a text-sm required">Rate ($)</h5>
              <!-- 'p-invalid':
                    v$.details['delivery_type'][dIndex]['rates'][sIndex].rate
                      .$invalid && submitted,-->
              <TextField
                type="number"
                class="color-212121"
                v-model="details['delivery_type'][dIndex]['rates'][sIndex].rate"
                :classes="{
                  'p-invalid':
                    v$.details['delivery_type'][dIndex]['rates'][sIndex].rate
                      .$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mb-4 ml-2">
      <span class="new-field mt-0" @click="addSize(dIndex)"
        ><b>+ Add size </b></span
      >
    </div>
  </div>
  <hr />
  <div class="flex mb-2 ml-2">
    <span class="new-field mt-0" @click="addDelivery"
      ><b>+ Add Delivery Type </b></span
    >
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Surcharge ($)</h5>
      <TextField
        type="number"
        class="color-212121"
        v-model="details['surcharge']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Surcharge Minimum Parcels</h5>
      <!--'p-invalid': submitted,-->
      <TextField
        type="number"
        class="color-212121"
        v-model="details['surcharge_minimum_parcels']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">COD Fee ($)</h5>
      <TextField
        type="number"
        class="color-212121"
        v-model="details['cod_fee']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">COD Fee (% of cash collected)</h5>
      <TextField
        type="number"
        class="color-212121"
        v-model="details['cod_percentage']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Standard Liability ($)</h5>
      <TextField
        type="number"
        class="color-212121"
        v-model="details['standard_liability']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Timeslot Delivery ($)</h5>
      <TextField
        type="number"
        class="color-212121"
        v-model="details['timeslot_delivery']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Timeslot Delivery Fixed Hours</h5>

      <!-- <TimePicker24
        v-model="details['timeslot_delivery_fixed_hours']"
        class="color-212121"
        :state="details['timeslot_delivery_fixed_hours']"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <TextField
        type="number"
        class="color-212121"
        v-model="details['timeslot_delivery_fixed_hours']"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <h6 class="ml-2 color-4e5868">Other Charges</h6>
  <div v-for="(charge, index) of addCharges" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteCharge(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-5">
        <h5 class="color-7a7a7a text-sm">Charge Name</h5>
        <TextField
          type="text"
          class="color-212121"
          v-model="details['other_charges'][index].charge_name"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-7">
        <h5 class="color-7a7a7a text-sm">Charge</h5>
        <TextField
          type="number"
          class="color-212121"
          v-model="details['other_charges'][index].charge"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex mb-2">
    <span class="color-2196f3" @click="addCharge"><b>+ Add Charges</b></span>
  </div>
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
        <CancelButton
          storePath="rapidoContract"
          class="color-2196F3 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text save-style"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  data: () => ({
    addCloneFieldClicked: 0,
    addCharges: ["new_charge"],
    addDeliverys: ["new_delivery"],
    deliveryValidation: [
      {
        delivery_type: { required },
        delivery_type_initial: { required },
        pick_up_cut_off_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        rates: [
          {
            size_name: { required },
            min_weight: { required },
            max_weight: { required },
            min_length: { required },
            max_length: { required },
            rate: { required },
          },
        ],
      },
    ],
    details: {
      rate_card_name: "",
      other_charges: [
        {
          charge_name: "",
          charge: "",
        },
      ],
      delivery_type: [
        {
          delivery_type: "",
          delivery_type_initial: "",
          pick_up_cut_off_time: "",
          cut_off_time: "",
          cut_off_days_count: "",
          rates: [
            {
              size_name: "",
              min_weight: "",
              max_weight: "",
              min_length: "",
              max_length: "",
              rate: "",
            },
          ],
        },
      ],
      surcharge: "",
      surcharge_minimum_parcels: "",
      cod_fee: "",
      cod_percentage: "",
      standard_liability: "",
      timeslot_delivery: "",
      timeslot_delivery_fixed_hours: "",
    },
    v$: useVuelidate(),
    submitted: false,
  }),
  validations() {
    if (this.addCloneFieldClicked > -1) {
      return {
        details: {
          rate_card_name: { required },
          delivery_type: this.deliveryValidation,
        },
      };
    }
  },
  methods: {
    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        // var formattedTime = moment(data).format("HH:mm");
        var formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },
    editTimeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        // var formattedTime = moment(data).format("HH:mm");
        var formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },
    submitData() {
      console.log("ongoing", this.details);

      let processedData = JSON.parse(JSON.stringify(this.details));

      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        processedData["delivery_type"].map((item) => {
          item.cut_off_time = this.timeFormatter(item.cut_off_time);

          item.pick_up_cut_off_time = this.timeFormatter(
            item.pick_up_cut_off_time
          );
        });

        let StateData = this.$store.state.rapidoContract.Type1FormStateData;
        if (StateData.id) {
          delete processedData.created_by;
          processedData["delivery_type"].map((item) => {
            delete item.id;
            item.rates.map((rate) => {
              if (rate.id) {
                delete rate.id;
              }
            });
          });

          processedData["other_charges"].map((item) => {
            if (item.id) {
              delete item.id;
              delete item.created_by;
            }
          });

          this.$store.dispatch("rapidoContract/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/sales/rates/rapido/contract/ratecard/typeone/" +
              StateData.id,
            data: processedData,
            method: "PATCH",
            loadData: {
              loadApi: "loadrapidoContractTypeOneData",
              loadPath:
                "/settings/sales/rates/rapido/contract/ratecard/typeone",
              loadMutation: "fetchRapidoContractTypeOneData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The rate card is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The rate card already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the rate card, try again!",

                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("rapidoContract/POSTPATCHCRUDOPERATION", {
            path: "/settings/sales/rates/rapido/contract/ratecard/typeone",

            data: processedData,
            method: "POST",
            loadData: {
              loadApi: "loadrapidoContractTypeOneData",
              loadPath:
                "/settings/sales/rates/rapido/contract/ratecard/typeone",
              loadMutation: "fetchRapidoContractTypeOneData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The rate card ${processedData.rate_card_name} is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The rate card ${processedData.rate_card_name} already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the rate card, try again!",

                toastSeverity: "error",
              },
            },
          });
        }
      }
    },

    //for delivery_type
    addDelivery() {
      this.details.delivery_type.push({
        delivery_type: "",
        delivery_type_initial: "",
        pick_up_cut_off_time: "",
        cut_off_time: "",
        cut_off_days_count: "",
        rates: [
          {
            size_name: "",
            min_weight: "",
            max_weight: "",
            min_length: "",
            max_length: "",
            rate: "",
          },
        ],
      });
      this.deliveryValidation.push({
        delivery_type: { required },
        delivery_type_initial: { required },
        pick_up_cut_off_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        rates: [
          {
            size_name: { required },
            min_weight: { required },
            max_weight: { required },
            min_length: { required },
            max_length: { required },
            rate: { required },
          },
        ],
      });
      this.addCloneFieldClicked++;
      this.addDeliverys.push("new_delivery");
    },
    deleteDelivery(index) {
      this.details.delivery_type.splice(index, 1);

      this.deliveryValidation.splice(index, 1);
      this.addDeliverys.splice(index, 1);
      this.addCloneFieldClicked++;
    },
    //for size
    addSize(parentIndex) {
      this.details.delivery_type[parentIndex].rates.push({
        size_name: "",
        min_weight: "",
        max_weight: "",
        min_length: "",
        max_length: "",
        rate: "",
      });
      this.deliveryValidation[parentIndex].rates.push({
        size_name: { required },
        min_weight: { required },
        max_weight: { required },
        min_length: { required },
        max_length: { required },
        rate: { required },
      });
      this.addCloneFieldClicked++;
    },
    deleteSize(parentIndex, index) {
      this.details.delivery_type[parentIndex].rates.splice(index, 1);

      this.deliveryValidation[parentIndex].rates.splice(index, 1);
      this.addCloneFieldClicked++;
    },

    //for other_charges
    addCharge() {
      this.details.other_charges.push({
        charge_name: "",
        charge: "",
      });
      this.addCloneFieldClicked++;
      this.addCharges.push("new_charge");
    },

    deleteCharge(index) {
      this.details.other_charges.splice(index, 1);
      this.addCharges.splice(index, 1);
      this.addCloneFieldClicked++;
    },
    prefillOtherCharges(otherCharges) {
      if (otherCharges.length > 0) {
        this.details.other_charges = [];
        this.addCharges = [];
        otherCharges.map((itm) => {
          this.details.other_charges.push(itm);
          this.addCharges.push("new_charge");
        });
      }
    },
    async prefillDeliveryType(deliveryType) {
      if (deliveryType.length > 0) {
        this.addDeliverys = [];
        this.details.delivery_type = [];
        this.details.delivery_type.rates = [];
        this.deliveryValidation = [];
        for (let dt in deliveryType) {
          this.addDeliverys.push("new_delivery");

          let cd_obj = deliveryType[dt];

          let detailsDeliveryObj = {};

          let deliveryValidationObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "delivery_type" ||
              cd_obj_keys == "delivery_type_initial" ||
              cd_obj_keys == "pick_up_cut_off_time" ||
              cd_obj_keys == "cut_off_time" ||
              cd_obj_keys == "cut_off_days_count"
            ) {
              detailsDeliveryObj[cd_obj_keys] = cd_obj[cd_obj_keys];

              if (cd_obj_keys != "id" && cd_obj_keys != "rates") {
                deliveryValidationObj[cd_obj_keys] = { required };
              }
            }
            if (cd_obj_keys == "rates") {
              detailsDeliveryObj["rates"] = [];

              let incomingRates = cd_obj[cd_obj_keys];

              incomingRates.map((itm) => {
                detailsDeliveryObj["rates"].push(itm);
              });
            }

            if (cd_obj_keys == "rates") {
              deliveryValidationObj["rates"] = [];

              let arr = cd_obj["rates"];
              let newobj = {};
              arr.map((itm) => {
                for (let obj in itm) {
                  if (
                    obj == "size_name" ||
                    obj == "min_weight" ||
                    obj == "max_weight" ||
                    obj == "min_length" ||
                    obj == "max_length" ||
                    obj == "rate"
                  ) {
                    newobj[obj] = { required };
                  }
                }

                deliveryValidationObj["rates"].push(newobj);
              });
            }
          }
          this.details.delivery_type.push(detailsDeliveryObj);

          this.deliveryValidation.push(deliveryValidationObj);
        }
      }
    },
    async loadState() {
      if (
        Object.keys(this.$store.state.rapidoContract.Type1FormStateData)
          .length != 0
      ) {
        console.log(this.$store.state.rapidoContract.Type1FormStateData, "in");
        this.details = this.$store.state.rapidoContract.Type1FormStateData;

        await this.prefillDeliveryType(
          this.$store.state.rapidoContract.Type1FormStateData.delivery_type
        );
        await this.prefillOtherCharges(
          this.$store.state.rapidoContract.Type1FormStateData.other_charges
        );
      }
    },
  },
  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.dispatch("rapidoContract/setType1FormStateData", {
      data: {},
    });
    this.details = {};
    this.$store.dispatch("rapidoContract/loadrapidoContractTypeOneData", {
      path: "/settings/sales/rates/rapido/contract/ratecard/typeone",
      mutation: "fetchRapidoContractTypeOneData",
    });
  },
};
</script>

<style scoped>
/* .text-style {
  font-size: 14px;
} */
/* .addCharges {
  color: #495057;
} */
/* .cutoffDays {
  text-indent: -18px;
} */
/* .plusaddCharges {
  color: #2196f3;
} */
</style>
