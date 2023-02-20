<template>
  <!-- <Card :key="renderKey" class="bg-ecf2ff">
    <template #content> -->

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
          <div class="flex row">
            <h5 class="color-7a7a7a bold-500 flex font-size-14 col-5">
              Billing Mode <b class="color-red ml-2"> &#42; </b>
            </h5>
            <div class="flex col-2">
              <Checkbox v-model="apply_all" :binary="true" @change="applyall" />
            </div>
            <span class="col-5 flex font-size-14 ml-0 pl-0 color-7a7a7a"
              >Apply all</span
            >
          </div>
          <Dropdown
            v-model="selectedMode"
            :options="getLogisticsList"
            @change="onChangeBillMode"
            optionLabel="name"
            placeholder="Bike"
            class="text-left"
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
            mt-3
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Billed by <b class="color-red ml-2"> &#42; </b>
          </h5>
          <Dropdown
            v-model="selectedType"
            :options="typeArray"
            optionLabel="name"
            placeholder="NWE"
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
            mt-3
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Surcharge Name <b class=""> </b>
          </h5>
          <Dropdown
            v-model="selectedSurcharge"
            :options="SurchargeDropDownList"
            optionLabel="name"
            placeholder="Surcharge Name"
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
            mt-3
          "
        >
          <h5 class="color-7a7a7a bold-500 flex font-size-14">
            Rate S$<b class=""> </b>
          </h5>
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="w-100 bg-fff flex"
            id="username"
            type="text"
            v-model="surchargeRate"
            :minFractionDigits="0"
            :maxFractionDigits="4"
          />

          <!-- <input type="text" v-model="surchargeRate" class="w-100 input-rate" /> -->
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
            mt-3
          "
        >
          <!-- <h5 class="color-7a7a7a bold-500 flex font-size-14">
                Billing by <b class="color-red ml-2"> &#42; </b>
              </h5> -->
          <Buttons
            label="Add"
            class="bg-357dea flex-row h-2rem w-4rem mt-5"
            @click="addValue()"
          />
        </div>
      </div>
    </div>

    <!-- <div>
        <div class="flex flex-row flex-wrap card-container">
          <div class="flex w-15rem h-1rem border-round">
            <h6 class="pl-1 font-bold">Overall Surcharges</h6>
          </div>
        </div>
        <div class="card">
          <div class="w-50 h-4rem align-items-center flex mt-4">
            <div
              class="
                flex-column flex-row flex-grow-1
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                border-round
                mt-2
                mr-3
              "
            >
              <h6 class="color-7a7a7a flex">Surcharge Name</h6>
              <Dropdown
                v-model="selectedSurcharge"
                :options="SurchargeDropDownList"
                optionLabel="name"
                placeholder="Island Charges"
              />
            </div>
            <div
              class="
                flex-column flex-row flex-grow-1
                align-items-center
                justify-content-center
                font-bold
                text-gray-900
                border-round
                mt-2
                ml-3
              "
            >
              <h6 class="color-7a7a7a flex">Rate S$</h6>
              <InputNumber
                mode="decimal"
                :useGrouping="false"
                class="w-100 bg-fff flex"
                id="username"
                type="text"
                v-model="surchargeRate"
              />
            </div>
            <div
              class="
                flex-column flex-row flex-grow-1
                align-items-center
                justify-content-center
                mt-5
                border-round
              "
            >
              <Buttons
                label="Add"
                class="bg-357dea flex-row h-2rem w-4rem"
                @click="addValue()"
              />
            </div>
          </div>
        </div>
        </div> -->

    <div class="flex flex-row flex-wrap card-container mt-4">
      <div class="flex w-15rem h-1rem border-round">
        <h6 class="pl-1 color-7a7a7a">Surcharges</h6>
      </div>
    </div>
    <div :key="renderCardValue" class="bg-fff w-100 mt-3 flex flex-wrap">
      <div
        class="flex align-content-start"
        v-for="inputValue in gerCrmBookingData.surcharges"
        :key="inputValue"
      >
        <Chip
          :label="`${inputValue.surcharge_name} - ${inputValue.rate}`"
          class="m-1"
          removable
          @click="deleteSurcharge(inputValue.id)"
        />
      </div>
    </div>
  </div>
  <!-- </template>
  </Card> -->
</template>
<script>
import Dropdown from "primevue/dropdown";
// import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import { mapActions, mapGetters } from "vuex";
import Chip from "primevue/chip";
import { crm_launch, crmCusLState } from "../../../store/modules/CRM/helper";
import Checkbox from "primevue/checkbox";

export default {
  name: "ManualBill",
  components: {
    Dropdown,
    Chip,
    InputNumber,
    Checkbox,
  },
  props: ["SurchargeDropDownList", "crmBookingData"],
  data() {
    return {
      selectedType: null,
      selectedMode: null,
      selectedSurcharge: null,
      surchargeRate: "",
      city: false,
      apply_all: false,
      // manualChecked: false,
      renderKey: 10,
      renderCardValue: 10,
      value1: null,
      value2: null,
      sn: "",
      su: "",
      un: "",
      uu: "",
      rtn: "",
      inputValue: [],
      objSerialData: {
        sd: 0,
        nd: 0,
        rd: 0,
        manual_bill: false,
        billing_mode: "",
        billed_by: "",
      },
      typeArray: [
        { name: "Express", code: "NWR" },
        { name: "International", code: "NWE" },
        { name: "Rapido", code: "NWI" },
      ],
      option1: [
        { name: "Island Charges" },
        { name: "India Charges" },
        { name: "UK Charges" },
        { name: "USA Charges" },
      ],
      option2: [
        { money: "10$" },
        { money: "9$" },
        { money: "8$" },
        { money: "7$" },
      ],
    };
  },
  watch: {
    SurchargeDropDownList: function (newVal, oldVal) {
      this.selectedSurcharge = newVal ? newVal[0] : null;
    },
    selectedSurcharge: function (newVal, oldVal) {
      this.surchargeRate = newVal ? newVal.rates : "";
    },
    inputValue: function (newVal, oldVal) {
      this.renderCardValue += 1;

      let data = {
        ...this.objSerialData,
        billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
        billed_by: this.selectedType ? this.selectedType.name : "",
        surcharges: this.gerCrmBookingData.surcharges,
      };

      this.$emit("emitedDataInitially", data);
    },
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      postSurchargeValue: "CustomerLaunchStore/postSurchargeValue",
      deleteSurchargeData: "CustomerLaunchStore/deleteSurchargeData",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
    }),
    async deleteSurcharge(id) {
      await this.deleteSurchargeData(id).then(async (c) => {
        if (c == 200) {
          let idValue = this.gerCrmBookingData.id;
          await this.getCrmBookingDetails(idValue);
        }
      });
    },
    applyall(e) {
      if (this.apply_all) {
        this.$confirm.require({
          message: "Are you sure overwrite Logistics Mode?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: async () => {
            this.apply_all = true;
            this.fetchState({ billing_select: this.apply_all });
          },
          reject: () => {
            this.apply_all = false;
            this.fetchState({ billing_select: this.apply_all });
          },
        });
      }
    },
    onChangeBillMode(e) {
      this.fetchState({ billingmode: e.value.name });
      let data1 = {
        logistics_mode: e.value.name,
      };
      this.getJobPriorityEcomerceList({ payload: data1 });
      this.$store.state.CustomerLaunchStore.billingmode = e.value.name;
      // let billing_data = {
      //   ...this.gerCrmBookingData,
      //   billing_mode: e.value.name ? e.value.name : "",
      // };
      // this.patchCrmCollerData(billing_data)
      // // this.$emit("emittedManualData", billing_data);
    },
    async addValue() {
      let name = this.selectedSurcharge
        ? this.selectedSurcharge.surcharge_name
        : "";
      let value = this.surchargeRate;
      let val = name + " " + value;
      let surchargeData = [];
      let push_data = {
        id:
          this.gerCrmBookingData && this.gerCrmBookingData.surcharge
            ? Object.keys(this.gerCrmBookingData.surcharges).length + 1
            : 1,
        surcharge_id:
          this.gerCrmBookingData && this.gerCrmBookingData.surcharge
            ? Object.keys(this.gerCrmBookingData.surcharges).length + 1
            : 1,
        surcharge_name: name,
        rate: value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        booking_id: this.gerCrmBookingData.id,
        job_id: this.gerCrmBookingData.job_type_id,
      };
      if (this.gerCrmBookingData?.surcharges?.length == 0) {
        surchargeData.push(push_data);
      }

      if (
        !this.gerCrmBookingData?.surcharges?.some(
          (u) => u.surcharge_name == name && u.rate == value
        )
      ) {
        surchargeData.push(push_data);
      }
      if (surchargeData.length == 0) {
        this.$toast.add({
          severity: "info",
          summary: "Info",
          detail: "Already exits.",
          life: 3000,
        });
        return;
      }

      let data = {
        ...this.objSerialData,
        billing_mode: this.selectedMode ? this.selectedMode.name : "",
        billed_by: this.selectedType ? this.selectedType.name : "",
        surcharges: surchargeData,
      };
      this.$emit("emittedManualData", data);
      this.$emit("setActive", 0);
      let valueDataCard = {
        booking_id: this.gerCrmBookingData.id,
        surcharge_name: name,
        rate: value.toString(),
        surcharge_id: this.postSurchargeData.id,
      };
      this.inputValue.push(valueDataCard);
      await this.postSurchargeValue(valueDataCard).then(async (c) => {
        if (c == 200) {
          let idValue = this.gerCrmBookingData.id;
          await this.getCrmBookingDetails(idValue);
        }
      });
    },
    initialfill() {
      this.selectedSurcharge = this.SurchargeDropDownList
        ? this.SurchargeDropDownList[0]
        : null;
      this.selectedType = this.typeArray ? this.typeArray[0] : null;
      if (this.gerCrmBookingData.billing_mode) {
        this.getLogisticsList.map((i) => {
          if (i.name == this.gerCrmBookingData.billing_mode) {
            this.selectedMode = i;
          }
        });
      } else {
        if (this.$route.params.type == "Adhoc") {
          this.selectedMode = this.getLogisticsList
            ? this.getLogisticsList[0]
            : null;
        } else {
          let p_fill = this.initail_billing_mode;
          if (p_fill.van && p_fill.bike) {
            this.selectedMode = this.getLogisticsList
              ? this.getLogisticsList[0]
              : null;
          } else if (p_fill.van) {
            this.selectedMode = this.getLogisticsList
              ? this.getLogisticsList[1]
              : null;
          } else {
            this.selectedMode = this.getLogisticsList
              ? this.getLogisticsList[0]
              : null;
          }
        }
      }
    },
    prefilledEdit() {
      let fill_data = this.gerCrmBookingData;
      this.getLogisticsList.map((i) => {
        if (i.name == fill_data.billing_mode) {
          this.selectedMode = i;
        }
      });
      this.selectedType = this.typeArray ? this.typeArray[0] : null;

      // this.selectedMode = this.getLogisticsList ? this.getLogisticsList[1] : null;

      this.renderKey += 1;
    },
  },
  computed: {
    ...crmCusLState,
    ...mapGetters({
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
      postSurchargeData: "CustomerLaunchStore/postSurchargeData",
    }),
  },
  mounted() {
    if (this.$route.params.mode == "edit") {
      this.prefilledEdit();
    } else {
      this.initialfill();
    }
  },
};
</script>
<style scoped>
::v-deep .p-inputtext {
  border: 0px solid transparent !important;
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
</style>
