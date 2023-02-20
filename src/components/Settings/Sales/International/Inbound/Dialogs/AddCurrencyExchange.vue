<template>
  <div class="button-position">
    <Buttons
      class="ml-4"
      icon="pi pi-download"
      label="Import"
      button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn color-357dea"
    />
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a font-size-14 bold-500">From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.from_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a font-size-14 bold-500">To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.to_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.to_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div style="background: #f5f8fe" class="py-4">
    <div v-for="(currency, index) of addCurrencys" :key="index">
      <div class="flex justify-content-between ml-2">
        <div class="flex"></div>
        <div v-if="index > 0" class="justify-content-between">
          <div class="flex delete" @click="deleteCurrency(index)">
            <i class="pi parent pi-times cross-button"></i>
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Parent Currency
          </h5>
          <DropDownField
            :data="allCountries"
            :state="details['currency_exchange'][index].parent_currency_code"
            :value="details['currency_exchange'][index].parent_currency_code"
            :filter="true"
            code="code"
            label="country"
            v-on:childToParent="getParentCurrency(index)"
            id="country"
            class="text-900"
            v-model="details['currency_exchange'][index].parent_currency_code"
            @blur="
              v$.details['currency_exchange'][index].parent_currency_code
                .$model;
            "
            :classes="{
              'p-invalid':
                v$.details['currency_exchange'][index].parent_currency_code
                  .$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required color-7a7a7a font-size-14 bold-500">
            Convert Currency
          </h5>
          <DropDownField
            :data="allCountries"
            :state="details['currency_exchange'][index].convert_currency_code"
            :value="details['currency_exchange'][index].convert_currency_code"
            :filter="true"
            code="code"
            label="country"
            v-on:childToParent="getConverCurrency(index)"
            id="country"
            class="text-900"
            v-model="details['currency_exchange'][index].convert_currency_code"
            @blur="
              v$.details['currency_exchange'][index].convert_currency_code
                .$model;
            "
            :classes="{
              'p-invalid':
                v$.details['currency_exchange'][index].convert_currency_code
                  .$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">
            Buying Rate S$
          </h5>
          <TextField
            type="number"
            v-model="details['currency_exchange'][index].buying_rate"
            :classes="{
              'p-invalid':
                v$.details['currency_exchange'][index].buying_rate.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">
            Selling Rate S$
          </h5>
          <TextField
            type="number"
            v-model="details['currency_exchange'][index].selling_rate"
            :classes="{
              'p-invalid':
                v$.details['currency_exchange'][index].selling_rate.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="color-7a7a7a font-size-14 bold-500 required">Units</h5>
          <TextField
            type="number"
            v-model="details['currency_exchange'][index].units"
            :classes="{
              'p-invalid':
                v$.details['currency_exchange'][index].units.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="
      Object.keys(
        this.$store.state.internationalInbound.currencyExchangeFormStateData
      ).length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addCurrency"><b>+ Add New Rate</b></span>
    </div>
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
          storePath="internationalInbound"
          class="color-357dea mr-2"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Country } from "country-state-city";
import moment from "moment";

export default {
  name: "AddCurrencyExchangeDialog",
  data: () => ({
    date: null,
    v$: useVuelidate(),
    addCurrencyClicked: 0,
    allCountries: [],
    CountryCode: null,
    selectedCurrency: null,
    addCurrencys: ["new_currency"],
    currencysValidation: [
      {
        parent_currency_code: { required },
        convert_currency_code: { required },
        buying_rate: { required },
        selling_rate: { required },
        units: { required },
      },
    ],
    details: {
      from_date: "",
      to_date: "",
      currency_exchange: [
        {
          convert_currency_code: "",
          convert_currency_country: "",
          parent_currency_code: "",
          parent_currency_country: "",
          buying_rate: "",
          selling_rate: "",
          units: "",
        },
      ],
    },
    submitted: false,
  }),
  validations() {
    if (this.addCurrencyClicked > -1) {
      return {
        details: {
          currency_exchange: this.currencysValidation,
          from_date: { required },
          to_date: { required },
        },
      };
    }
  },
  methods: {
    getParentCurrency(index) {
      this.allCountries.find((list) => {
        if (
          list.code ==
          this.details["currency_exchange"][index].parent_currency_code
        ) {
          this.details["currency_exchange"][index].parent_currency_country =
            list.name;
        }
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getDatesBetweenDates(startDate, endDate) {
      let dates = [];
      const theDate = new Date(startDate);
      while (theDate <= endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
      }
      return dates;
    },
    getConverCurrency(index) {
      console.log("index");
      this.allCountries.find((list) => {
        if (
          list.code ==
          this.details["currency_exchange"][index].convert_currency_code
        ) {
          this.details["currency_exchange"][index].convert_currency_country =
            list.name;
        }
      });
      console.log(
        this.details["currency_exchange"][index].convert_currency_country,
        "convert"
      );
    },
    filterDropdown(type, value) {
      let data =
        type == "parent_currency_code" ? this.allCountries : this.allCountries;
      for (let d in data) {
        if (data[d].code == value) {
          return data[d].name;
        }
      }
    },
    // countryFunction(countryCode) {
    //   this.states = [];
    //   for (var state of this.allStates) {
    //     if (state.countryCode == countryCode) {
    //       this.states.push(state);
    //     }
    //   }
    //   if (this.states.length == 0) {
    //     this.states.push({ name: "none", isoCode: "NAN" });
    //   }
    // },

    submitData() {
      // this.details.map((item) => {
      // console.log(item);
      // payload.push( {
      //   from_date: item.from_date,
      //   to_date: item.to_date,
      //   buying_rate: item.buying_rate,
      //   convert_currency_code:
      //     item.code,
      //   convert_currency_country:
      //    item.name,
      //   parent_currency_code:
      //     item.code,
      //   parent_currency_country:
      //    item.name,
      //   selling_rate: item.selling_rate,
      //   units: item.units,
      // })
      // });
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let payload;
        // for (let c in this.details.currency_exchange) {
        //   let dObject = this.details.currency_exchange[c];
        //   for (let d in dObject) {
        //     if (d == "parent_currency_code" || d == "convert_currency_code") {
        //       let key =
        //         d == "parent_currency_code"
        //           ? "parent_currency_country"
        //           : "convert_currency_country";
        //       this.details.currency_exchange[c][key] = this.filterDropdown(
        //         d,
        //         dObject[d]
        //       );
        //     }
        //   }
        // }
        let StateData =
          this.$store.state.internationalInbound.currencyExchangeFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/sales/rates/international/inbound/currencyExchanges/" +
              StateData.id,
            data: this.details.currency_exchange[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/currencyExchanges",
              loadMutation: "fetchInboundTableData",
              type: "addCurrencyExchangeData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The Currency Exchange is Updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the Currency Exchange, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/sales/rates/international/inbound/currencyExchanges",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/currencyExchanges",
              loadMutation: "fetchInboundTableData",
              type: "addCurrencyExchangeData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The Currency Exchange is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the Currency Exchange, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.currencyExchangeFormStateData
        ).length != 0
      ) {
        this.addCurrencys = [];
        this.addCurrencys.push("new_currency");
        this.details.currency_exchange = [];
        this.currencysValidation = [];
        this.details.currency_exchange.push({
          convert_currency_code: "",
          convert_currency_country: "",
          parent_currency_code: "",
          parent_currency_country: "",
          buying_rate: "",
          selling_rate: "",
          units: "",
        });
        this.currencysValidation.push({
          parent_currency_code: { required },
          convert_currency_code: { required },
          buying_rate: { required },
          selling_rate: { required },
          units: { required },
        });
        for (let d in this.details) {
          if (d != "currency_exchange") {
            this.details[d] =
              this.$store.state.internationalInbound.currencyExchangeFormStateData[
                d
              ];
          }
        }
        for (let d in this.details.currency_exchange[0]) {
          if (d == "parent_currency_code" || d == "convert_currency_code") {
            this.details.currency_exchange[0][d] = this.filterDropdown(
              d,
              this.$store.state.internationalInbound
                .currencyExchangeFormStateData[d]
            );
          } else {
            this.details.currency_exchange[0][d] =
              this.$store.state.internationalInbound.currencyExchangeFormStateData[
                d
              ];
          }
        }
        this.addCurrencyClicked++;
      }
    },
    addCurrency() {
      this.details.currency_exchange.push({
        parent_currency_code: "",
        convert_currency_code: "",
        buying_rate: "",
        selling_rate: "",
        units: "",
      });
      this.currencysValidation.push({
        parent_currency_code: { required },
        convert_currency_code: { required },
        buying_rate: { required },
        selling_rate: { required },
        units: { required },
      });
      this.addCurrencyClicked++;
      this.addCurrencys.push("new_currency");
    },
    deleteCurrency(index) {
      this.details.currency_exchange.splice(index, 1);
      this.currencysValidation.splice(index, 1);
      this.addCurrencys.splice(index, 1);
      this.addCurrencyClicked++;
    },
  },
  created() {
    Country.getAllCountries().map((item) => {
      this.allCountries.push({ name: item.name, code: item.isoCode });
    });
    this.allCountries.find((list) => {
      if (list.code == "SG") {
        this.details["currency_exchange"][0].parent_currency_country =
          list.name;
        this.details["currency_exchange"][0].parent_currency_code = "SG";
      }
    });
    this.loadState();

    if (
      this.$store.state.internationalInbound.currencyExchangeFormStateData?.id
    ) {
      this.details["currency_exchange"][0].to_date =
        this.$store.state.internationalInbound.currencyExchangeFormStateData.to_date;

      this.details["currency_exchange"][0].from_date =
        this.$store.state.internationalInbound.currencyExchangeFormStateData.from_date;
      this.details["currency_exchange"][0].convert_currency_code =
        this.$store.state.internationalInbound.currencyExchangeFormStateData.convert_currency_code;
      this.details["currency_exchange"][0].parent_currency_code =
        this.$store.state.internationalInbound.currencyExchangeFormStateData.parent_currency_code;
      // this.$store.state.internationalInbound.currencyExchangeFormStateData?.map(
      //   (list) => {
      //     console.log(list)
      //     // this.details["currency_exchange"][index].parent_currency_code.push({
      //     //   name: list.parent_currency_country,
      //     //   code: list.parent_currency_code,
      //     // });
      //   }
      // );
    }
  },
  unmounted() {
    this.$store.state.internationalInbound.currencyExchangeFormStateData = {};
  },
};
</script>
<style scoped>
.add-new-rate-background {
  background-color: #357dea;
}
.button-position {
  position: absolute;
  top: 5%;
  right: 10%;
}
</style>
