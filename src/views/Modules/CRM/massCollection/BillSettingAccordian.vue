<template>
  <div :key="renderkey">
    <div class="flex flex-row">
      <div class="flex flex-row flex-wrap my-auto">
        <div class="flex ont-bold border-round top">
          <Checkbox v-model="manualChecked" :binary="true" />
          <h6 class="pl-2 color-1e90ff text-nowrap mr-4">Manual Bill</h6>
        </div>
      </div>
      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          mb-2
          border-round
          w-10rem
          my-auto
        "
      >
        <h5 class="required color-7a7a7a bold-500 flex font-size-14 indent">
          Billing Mode
        </h5>
        <Dropdown
          v-model="selectedMode"
          :options="getLogisticsList"
          optionLabel="name"
          class="text-left w-100 height-40"
        />
      </div>
      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          w-10rem
          my-auto
        "
      >
        <h5 class="required color-7a7a7a bold-500 flex font-size-14">
          Billed by
        </h5>
        <Dropdown
          v-model="selectedType"
          :options="typeArray"
          optionLabel="name"
          class="text-left w-100 height-40"
          :filter="true"
        />
      </div>
      <div class="card top">
        <div class="card-container flex flex-wrap">
          <div
            v-if="chargeType != 'Normal' && e_commerce.length != 0"
            class="justify-content-between font-bold flex border-round"
          >
            <div
              v-for="keyInt of e_commerce"
              class="
                ml-2
                my-2
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
              :key="keyInt"
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="keyInt.rate"
                  :disabled="!manualChecked"
                  @blur="
                    getUserInput(keyInt?.delivery_type_initial, keyInt?.rate)
                  "
                />
                <Buttons
                  :label="keyInt?.delivery_type_initial?.toUpperCase()"
                  class="bg-357dea height-40"
                />
              </div>
            </div>
          </div>
          <div
            v-if="chargeType == 'Normal'"
            class="w-50 justify-content-between font-bold flex border-round"
          >
            <div
              class="
                ml-2
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="sn"
                  :disabled="!manualChecked"
                  @blur="getUserInput('sn', sn)"
                />
                <Buttons label="SN" class="bg-357dea height-40" />
              </div>
            </div>
            <div
              class="
                ml-2
                w-40
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="su"
                  :disabled="!manualChecked"
                  @blur="getUserInput('su', su)"
                />
                <Buttons label="SU" class="bg-357dea height-40" />
              </div>
            </div>
            <div
              class="
                ml-2
                w-40
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="un"
                  :disabled="!manualChecked"
                  @blur="getUserInput('un', un)"
                />
                <Buttons label="UN" class="bg-357dea height-40" />
              </div>
            </div>
            <div
              class="
                ml-2
                w-40
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="uu"
                  :disabled="!manualChecked"
                  @blur="getUserInput('uu', uu)"
                />
                <Buttons label="UU" class="bg-357dea height-40" />
              </div>
            </div>
            <div
              class="
                ml-2
                w-40
                height-40
                bg-fff
                font-bold
                flex
                justify-content-between
              "
            >
              <div class="p-inputgroup">
                <InputText
                  class="w-50 height-40 p-0 font-bold flex text-center border"
                  id="username"
                  type="text"
                  v-model="rtn"
                  :disabled="!manualChecked"
                  @blur="getUserInput('rtn', rtn)"
                />
                <Buttons label="RTN" class="bg-357dea height-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex color-4e5968 bold-700 font-size-16 my-2">Surcharges</div>
    <div class="card border-round">
      <div class="card">
        <div class="card-container flex justify-content-center">
          <div
            class="
              flex-column flex-row flex-grow-1
              align-items-center
              justify-content-center
              font-bold
              text-gray-900
              mb-2
              border-round
              w-5rem
            "
          >
            <h5 class="color-7a7a7a bold-500 flex font-size-14">
              Surcharge Name <b class=""> </b>
            </h5>
            <Dropdown
              v-model="selectedSurcharge"
              :options="SurchargeDropDownList"
              optionLabel="name"
              class="text-left w-100"
              :filter="true"
            />
          </div>
          <div
            class="
              flex-column flex-row flex-grow-1
              align-items-center
              justify-content-center
              font-bold
              text-gray-900
              px-3
              mb-2
              border-round
              w-5rem
            "
          >
            <h5 class="color-7a7a7a bold-500 flex font-size-14">
              Rate S$<b class=""> </b>
            </h5>
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="w-100 flex"
              id="username"
              type="text"
              v-model="surchargeRate"
            />
          </div>
          <div
            class="
              flex-column flex-row flex-grow-1
              align-items-start
              justify-content-start
              font-bold
              text-gray-900
              border-round
              w-5rem
              my-auto
              text-left
            "
          >
            <Buttons
              label="Add"
              class="bg-357dea flex-row h-2rem w-4rem mt-3"
              @click="addValue()"
            />
          </div>
        </div>
        <div class="flex flex-row flex-wrap card-container mt-2">
          <div class="flex w-15rem h-1rem border-round">
            <h6 class="pl-1 color-7a7a7a">Surcharges</h6>
          </div>
        </div>
        <div :key="renderCardValue" class="bg-fff w-100 mt-3 flex flex-wrap">
          <div
            class="flex align-content-start"
            v-for="inputValue in getCrmBookingData?.surcharges"
            :key="inputValue"
          >
            <Chip
              :label="`${inputValue?.surcharge_name} - ${inputValue?.rate}`"
              class="m-1"
              removable
              @click="deleteSurcharge(inputValue?.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import { mapActions, mapGetters } from "vuex";
import Chip from "primevue/chip";
export default {
  name: "BillSettingAccordian",
  props: ["chargeType"],
  components: { InputText, Checkbox, Dropdown, InputNumber, Chip },
  data() {
    return {
      sn: "",
      su: "",
      un: "",
      uu: "",
      rtn: "",
      manualChecked: false,
      renderkey: 10,
      selectedMode: null,
      selectedType: "",
      selectedSurcharge: "",
      surchargeRate: "",
      e_commerce: {
        sd: "",
        rd: "",
        nd: "",
      },
      typeArray: [
        { name: "NWE", code: "NWE" },
        { name: "NWR", code: "NWR" },
        { name: "NWI", code: "NWI" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      getCrmBookingData: "Masscollection/getCrmBookingData",
      SurchargeDropDownList: "CustomerLaunchStore/getsurchargeDropDownListData",
      postSurchargeData: "CustomerLaunchStore/postSurchargeData",
      getEcomData: "Masscollection/getEcomData",
      massCollectionPayloadData: "Masscollection/massCollectionPayloadData",
    }),
  },
  methods: {
    ...mapActions({
      postSurchargeValue: "CustomerLaunchStore/postSurchargeValue",
      deleteSurchargeData: "CustomerLaunchStore/deleteSurchargeData",
      getCrmBookingDetails: "Masscollection/getCrmBookingDetails",
      getLogisticsListDropDownApi:
        "CustomerLaunchStore/getLogisticsListDropDownApi",
      getSurchargeDropDownList: "CustomerLaunchStore/getSurchargeDropDownList",
      getSurchargeDropDownListAdhoc:
        "CustomerLaunchStore/getSurchargeDropDownListAdhoc",
      patchCrmBookingDetails: "Masscollection/patchCrmBookingDetails",
      loadEComData: "Masscollection/loadEComData",
      getJobPriorityListDropDownApi:
        "CustomerLaunchStore/getJobPriorityListDropDownApi",
    }),
    async addValue() {
      let name = this.selectedSurcharge
        ? this.selectedSurcharge.surcharge_name
        : "";
      let value = this.surchargeRate;
      let val = name + " " + value;

      let surchargeData = [
        {
          id:
            this.getCrmBookingData && this.getCrmBookingData?.surcharge
              ? Object.keys(this.getCrmBookingData?.surcharges).length + 1
              : 1,
          surcharge_id:
            this.getCrmBookingData && this.getCrmBookingData?.surcharge
              ? Object.keys(this.getCrmBookingData?.surcharges).length + 1
              : 1,
          surcharge_name: name,
          rate: value,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          booking_id: this.getCrmBookingData?.id,
          job_id: this.getCrmBookingData?.job_type_id,
        },
      ];

      let data = {
        ...this.objSerialData,
        billing_mode: this.selectedMode ? this.selectedMode?.name : "",
        billed_by: this.selectedType ? this.selectedType?.name : "",
        id: this.getCrmBookingData?.id,
        manual_bill: this.manualChecked,
      };
      this.$emit("emittedManualData", data);

      let valueDataCard = {
        booking_id: this.getCrmBookingData?.id,
        surcharge_name: this.selectedSurcharge
          ? this.selectedSurcharge.surcharge_name
          : "",
        rate: this.surchargeRate.toString(),
        surcharge_id: this.postSurchargeData.id,
      };
      // this.inputValue.push(valueDataCard);
      await this.postSurchargeValue(valueDataCard);
    },
    async deleteSurcharge(id) {
      await this.deleteSurchargeData(id).then(async (c) => {
        if (c == 200) {
          let idValue = this.getCrmBookingData?.id;
          await this.getCrmBookingDetails(idValue);
        }
      });
    },
    getUserInput(key, value, event) {
      if (this.chargeType == "Normal") {
        let data = {
          id: this.getCrmBookingData?.id,
          keyword: value,
        };
        const myJSON = JSON.stringify(data);
        let replace = myJSON.replace("keyword", key);
        let newData = JSON.parse(replace);
        newData[key] = Number(value);
        this.patchCrmBookingDetails(newData);
      } else {
        let data = {
          id: this.getCrmBookingData.id,
          ecommerce_job_priority: this.e_commerce,
        };
        this.patchCrmBookingDetails(data);
      }
    },
    loadEcommerceData() {
      if (this.chargeType == "E-Commerce" && this.selectedMode) {
        let Data = {
          logistics_mode: this.selectedMode?.name,
        };
        this.loadEComData(Data).then((s) => {
          this.e_commerce = [];
          if (this.getEcomData?.length != 0) {
            this.getEcomData.map((list) => {
              this.e_commerce.push({
                delivery_type_initial: list.delivery_type_initial,
                rate: list.rate,
                delivery_type_id: list.delivery_type_id,
                delivery_type: list.delivery_type,
              });
            });
          }
          this.e_commerce.push({
            delivery_type_initial: "rtn",
            rate: 0,
          });
        });
      } else {
        this.getJobPriorityListDropDownApi();
      }
    },
    prefillData() {
      this.sn = this.getCrmBookingData ? this.getCrmBookingData?.sn : "";
      this.su = this.getCrmBookingData ? this.getCrmBookingData?.su : "";
      this.un = this.getCrmBookingData ? this.getCrmBookingData?.un : "";
      this.uu = this.getCrmBookingData ? this.getCrmBookingData?.uu : "";
      this.rtn = this.getCrmBookingData ? this.getCrmBookingData?.rtn : "";
      this.selectedType = this.typeArray ? this.typeArray[0] : null;

      this.renderKey++;
    },
  },
  async mounted() {
    await this.getLogisticsListDropDownApi();
    this.selectedMode = this.getLogisticsList ? this.getLogisticsList[0] : null;
    this.selectedCity = this.getLogisticsList ? this.getLogisticsList[0] : null;

    this.prefillData();
  },
  watch: {
    chargeType: function () {
      this.loadEcommerceData();
    },
    selectedMode: function (newVal, oldVal) {
      this.loadEcommerceData();
    },
    getCrmBookingData: function (newList, oldList) {
      if (this.getCrmBookingData?.id) {
        if (
          newList?.contract_id != oldList?.contract_id &&
          this.$route.params.type == "Contract"
        ) {
          this.getSurchargeDropDownList(this.getCrmBookingData?.contract_id);
        } else if (
          newList?.profile_id != oldList?.profile_id &&
          this.$route.params.type == "Adhoc"
        ) {
          this.getSurchargeDropDownListAdhoc();
        }
        this.prefillData();
      }
    },
    SurchargeDropDownList: function () {
      this.selectedSurcharge = this.SurchargeDropDownList
        ? this.SurchargeDropDownList[0]
        : null;
    },
  },
};
</script>

<style scoped>
::v-deep.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 1rem;
  border: 1px solid #dee2e6;
  color: #212121;
  background: #c7d9fc;
  font-weight: 600;
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.top {
  margin-top: 24px;
}
.border {
  border: 1px solid grey;
}
::v-deep .p-dropdown .p-dropdown-label {
  display: flex;
}
::v-deep .p-chip {
  background: rgba(126, 132, 167, 1);
  border-radius: 2px;
  color: white;
}
::v-deep .p-button {
  height: 40px !important;
}
::v-deep .border {
  border: 1px solid grey !important;
}
</style>