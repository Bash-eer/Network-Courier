<template>
  <div class="card">
    <div class="flex card-container p-2 m-3 border-radius-5 borderGreen">
      <div
        v-if="$route.params.type != 'Adhoc'"
        class="
          flex-1
          border
          font-bold
          color-7e84a7
          text-center
          p-2
          border-radius-5
        "
      >
        <div>Job Cost</div>
        <div class="row px-6 flex" v-if="this.gerCrmBookingData.charge_type?.toLowerCase() == 'normal'">
          <div class="col-3">
            <div class="flex font-bold">SN</div>
            <div class="flex mt-1">
              <div class="flex color-68C959">
                {{
                  this.$store.state.CustomerLaunchStore.crmBookingDetailsArray
                    .sn
                }}
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="flex font-bold ">SU</div>
            <div class="flex mt-1">
              <div class="flex color-68C959">
                {{
                  this.$store.state.CustomerLaunchStore.crmBookingDetailsArray
                    .su
                }}
              </div>
              </div>
          </div>
          <div class="col-3">
            <div class="flex font-bold">UN</div>
            <div class="flex mt-1">
              <div class="flex color-68C959">
                {{
                  this.$store.state.CustomerLaunchStore.crmBookingDetailsArray
                    .un
                }}
              </div></div>
          </div>
          <div
            class="
              col-3
            "
          >
            <div class="flex font-bold">UU</div>
            <div class="flex mt-1">
              <div class="flex color-68C959">
                {{
                  this.$store.state.CustomerLaunchStore.crmBookingDetailsArray
                    .uu
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="row px-6" v-if="this.gerCrmBookingData.charge_type?.toLowerCase() != 'normal'">
          <div
          
            v-for="(i, index) of $store.state.CustomerLaunchStore
              .crmBookingDetailsArray"
            :key="index"
            :class="`col-3 ${getHeaderECommerce(index) != ''?'d-block':'d-none'}`"
          >
            <!-- {{index}} -->
            <div
              v-if="getHeaderECommerce(index) != ''"
              
            >
              <div class="flex font-bold ">
                {{ index.toUpperCase() }}
              </div>
              <div class="flex mt-1">
                <div class="flex color-68C959">
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3 px-6 ">
          <div class="flex font-bold">RTN</div>
          <div class="flex mt-1">
            <div class="flex color-68C959">
              {{
                this.$store.state.CustomerLaunchStore.crmBookingDetailsArray.rtn
              }}
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-4"></div>
          <div class="flex col-2 font-bold">Total </div>
          <div class="flex col-2  color-68C959 ">
            {{ getSumValue() }}
          </div>
        </div>
        <!-- <div class="flex justify-content-start flex-wrap card-container mt-2">
          <div class="flex w-50 h-2rem font-bold">Total</div>
          <div class="flex w-50 h-2rem color-68C959 pl-5">
            {{ getSumValue() }}
          </div>
        </div> -->
      </div>
      <div
        class="
          flex-1
          border
          color-7e84a7
          font-bold
          text-center
          border-radius-5
          mx-4
        "
      >
        <div>Surcharges</div>
        <div class="overflow-auto row pl-4">
          <div
            v-for="inputValue in gerCrmBookingData.surcharges"
            :key="inputValue"
            class="col-4 mt-2"
          >
            <div class="flex font-bold">
              {{ inputValue.surcharge_name }}
            </div>
            <div class="flex color-68C959">
              {{ inputValue.rate }}
            </div>
          </div>
        </div>
        <hr class="mx-3" />
        <div class="row">
          <div class="col-4"></div>
          <div class="flex col-2 font-bold">Total </div>
          <div class="flex col-2  color-68C959 ">
            {{ getSurchargeSumValue(gerCrmBookingData.surcharges) }}
          </div>
        </div>
      </div>
      <div
        v-if="$route.params.type == 'Adhoc'"
        class="
          flex-1
          bg-b4efc0
          font-bold
          text-center
          p-4
          border-radius-5
          row
          mr-2
        "
      >
        <div class="col-5 pl-0">
          <div class="flex font-size-16 color-red bold-700 pl-3">
            Total Cost
          </div>
          <div class="flex font-size-20 bold-700 pt-2 pl-3">
            <span v-if="!enable_edit" class="color-68C959">{{ cost }} $</span>
            <div v-if="enable_edit" class="p-inputgroup input-grp-he">
              <InputText
                placeholder="Cost"
                type="number"
                v-model="e_total_cost"
              />
              <span class="p-inputgroup-addon cursor-pointer"
                ><i
                  @click="editTotalCost"
                  class="color-68C959 fas fa-check font-size-14"
                ></i
              ></span>
              <span class="p-inputgroup-addon cursor-pointer"
                ><i
                  @click="enablecostedit"
                  class="fas fa-times font-size-14"
                ></i
              ></span>
            </div>
            <i
              v-if="!enable_edit"
              @click="enablecostedit"
              class="
                align-self-center
                fas
                fa-pen
                cursor-pointer
                ml-2
                font-size-14
              "
            ></i>
          </div>
        </div>
        <div class="col-3 pl-3">
          <div class=" flex font-size-16 color-red bold-700">
            Discount
          </div>
          <div class="flex font-size-20 bold-700 color-68C959 pt-2">
            {{ discount }}
          </div>
        </div>
        <div class="col-3">
          <div
            class="
              flex
              font-size-16
              color-red
              bold-700
              align-items-center
            "
          >
            Payment Cost
          </div>
          <div class="flex font-size-16 bold-700 color-68C959 pt-2">
            {{ totalCost ? totalCost + " $" : "" }}
          </div>
        </div>
        <div class="col-4">
        <div class="flex">Payment Mode</div>
        <div class=" mt-3">
          <DropDownField
            :key="renderKey"
            :value="payment_mode"
            code="payment_method"
            :data="paymentMethodOriginalData"
            label="payment_mode"
            v-model="payment_mode"
            :class="{
              'inputfield w-full dialog-dropdown-text': true,
            }"
          />
        </div>
        </div>
        <div class="col-8">
        <div class="flex">Discount</div>
        <div
          class="
            flex
            row
            justify-content-start
            flex-wrap
            card-container
            mt-2
          "
        >
          <div class="col-6">
            <DropDownField
           :key="renderKey"
              :value="selectedCity"
              code="name"
              :data="cities"
              label="customer_type"
              v-model="selectedCity"
              :class="{
                'inputfield w-full dialog-dropdown-text': true,
              }"
            />
          </div>
          <div class="pr-0 col-4 pl-0">
            <TextField
              :disabled="parseInt(cost) > 0 ? false : true"
              label="profile_name"
              type="text"
              v-model="discountValue"
              :classes="{
                'inputfield w-full dialog-dropdown-text col-7 ': true,
              }"
            />
          </div>
          <div
            @click="onChangeDiscount"
            class="
              job-width
              align-self-center
              col-1
              cursor-pointer
              pt-2
              px-0 px-1
              py-1
              bg-68C959
            "
          >
            <i class="color-fff pi pi-arrow-right"></i>
          </div>
          <!-- <Dropdown class="flex w-8rem h-3rem text-align-start " v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Coupon" />        -->
          <!-- <InputText class="flex w-15rem h-3rem color-68C959" id="username" type="text"
                    v-model="value" /> -->
          <!-- <i
                class="pi pi-arrow-right color-fff bg-68C959 pt-3 w-3rem border"
              ></i> -->
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import {
  crmCusLState,
  crm_launch,
  crm_set_state,
  crm_Setting,
} from "../../../store/modules/CRM/helper";

export default {
  name: "jobCostCard",
  components: { InputText },

  data() {
    return {
      renderKey: 1,
      payment_mode: "",
      selectedCity: "Coupon",
      enable_edit: false,
      jobCostData: "",
      discount: "0 $",
      totalCost: "58",
      e_total_cost: "",
      cost: "58",
      discountValue: "",
      coupon_data: null,
      cities: [
        { name: "Coupon", code: "Coupon" },
        { name: "Percentage", code: "Percentage" },
        { name: "Fixed", code: "Fixed" },
      ],
      paymentArray: [
        { id: 1, name: "Online", code: "Online" },
        { id: 2, name: "Phone Booking", code: "Phone Booking" },
      ],
    };
  },
  computed: {
    ...crmCusLState,
    ...crm_set_state,
    ...mapGetters({
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
    }),
  },
  async created() {
    await this.loadPaymentMethodData();
    this.payment_mode = this.paymentMethodOriginalData[0]?.name ?? "";
    if (this.$route.params.type == "Adhoc") {
      let b_data = this.crmBookingDetailsArray;
      this.cost = b_data.total_cost ?? "0";
      this.totalCost = this.cost;
      if (b_data.discount_via?.toLowerCase() == "percentage") {
        this.discount = b_data.discount_value
          ? `${b_data.discount_value} %`
          : "";
        let dis_count = this.getPercntage(this.cost, b_data.discount_value);
        this.totalCost = dis_count != "NaN" ? this.cost - dis_count : this.cost;
      } else {
        this.discount = b_data.discount_value
          ? `${b_data.discount_value} $`
          : "0";
        let dis_count = this.getRate(this.cost, b_data.discount_value);
        this.totalCost = dis_count ? dis_count : this.cost;
      }
    }
    if(this.$route.params.mode=="edit"){
      this.payment_mode=this.gerCrmBookingData.payment_method
      this.selectedCity=this.gerCrmBookingData.discount_via
      this.discountValue=this.gerCrmBookingData.discount_value
    }
    this.renderKey++;
  },
  methods: {
    ...crm_launch,
    ...crm_Setting,
    ...mapActions({
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
    }),
    getPercntage(cost, value) {
      let dis_count = ((parseFloat(cost) / 100) * parseFloat(value)).toFixed(2);
      return dis_count;
    },
    enablecostedit() {
      this.enable_edit = !this.enable_edit;
      this.e_total_cost = this.totalCost;
    },
    getRate(cost, value) {
      let dis_count =
        parseFloat(cost).toFixed(2) - parseFloat(value).toFixed(2);
      return dis_count;
    },
    editTotalCost() {
      this.enable_edit = !this.enable_edit;
      this.discount = "0 $";
      this.cost = this.e_total_cost;
      this.totalCost = this.e_total_cost;
      let data = {
        total_cost: this.cost,
      };
      this.$emit("emittedManual", data);
    },
    async onChangeDiscount(e) {
      if (this.selectedCity == "Percentage") {
        this.discount = this.discountValue ? `${this.discountValue} %` : "0 $";
        let dis_count = this.getPercntage(this.cost, this.discountValue);
        this.totalCost = dis_count != "NaN" ? this.cost - dis_count : this.cost;
      }
      if (this.selectedCity == "Fixed") {
        this.discount = this.discountValue ? `${this.discountValue} $` : "0 $";
        let dis_count = this.getRate(this.cost, this.discountValue);
        this.totalCost = dis_count ? dis_count : this.cost;
      }
      if (this.selectedCity == "Coupon") {
        let payload = {
          coupon_code: this.discountValue,
          business: "Express",
          payment_mode: this.payment_mode,
          total_cost: this.cost,
        };
        let g_data = await this.couponSetting({
          payload: payload,
          toast: this.$toast,
        });
        this.coupon_data = g_data;
        if (g_data.unit == "percentage") {
          this.discount = `${g_data.discount} %`;
          let dis_count = this.getPercntage(this.cost, g_data.discount);
          this.totalCost =
            dis_count != "NaN" ? this.cost - dis_count : this.cost;
        } else {
          this.discount = `${g_data.discount} $`;
          let dis_count = this.getRate(this.cost, g_data.discount);
          this.totalCost = dis_count ? dis_count : this.cost;
        }
      }
      let data = {
        payment_method: this.payment_mode,
        discount_via: this.selectedCity,
        discount_value: this.discountValue,
        coupon: this.selectedCity == "Coupon" ? true : false,
        coupon_value: this.coupon_data?.coupon_code ?? "",
        coupon_id: this.coupon_data?.id ?? "",
        total_cost: this.cost,
      };
      this.$emit("emittedManual", data);
    },
    getHeaderECommerce(index) {
      let header = "";
      switch (index) {
        case "sd":
          header = "SD";
          break;
        case "rd":
          header = "RD";
          break;
        case "nd":
          header = "ND";
          break;
      }
      return header;
    },
    getSumValue() {
      let su_data =
        this.$store.state.CustomerLaunchStore.crmBookingDetailsArray;
      let ft = su_data ? false : true;
      let sumValue;
      if (ft) {
        sumValue = su_data.sd + su_data.nd + su_data.rd + su_data.rtn;
        return sumValue;
      }
      sumValue =
        su_data.sn + su_data.su + su_data.un + su_data.uu + su_data.rtn;
      if (sumValue) {
        return sumValue;
      }
      return "";
    },
    getSurchargeSumValue(e) {
      const sumWithInitial = e
        ? e.reduce((accumulator, current) => accumulator + current.rate, 0)
        : "";
      return parseFloat(sumWithInitial).toFixed(2);
    },
  },
};
</script>

<style scoped>
.borderGreen {
  border: 5px dashed #68c959 !important;
}
.job-width {
  width: 30px !important;
}
.input-grp-he {
  height: 35px !important;
}
</style>
