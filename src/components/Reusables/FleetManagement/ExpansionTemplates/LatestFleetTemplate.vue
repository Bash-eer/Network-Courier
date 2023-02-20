<template>
  <div class="flex justify-content-between">
    <div class="flex">
      <div class="flex flex-row flex-wrap main">
        <div v-for="(item, index) of data" class="flex mr-5 child" :key="index">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <img
                :src="'/images/' + index + '.png'"
                alt=""
                height="43"
                width="43"
              />
            </div>
            <div class="flex">
              <div class="flex flex-column mt-1">
                <div class="flex align-items-center labels">
                  {{ getLabel(index) }}
                </div>
                <div class="flex align-items-center info mt-1">
                  <span
                    v-if="
                      getLabel(index) == 'Date' ||
                      getLabel(index) == 'Cheque Date'
                    "
                  >
                    {{ dateFormater(item) }}</span
                  >
                  <span v-else-if ="getLabel(index) == 'Distance'"> {{ item }} KM</span>
                  <span v-else> {{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex" v-if="attachmentsData != ''">
      <AttachmentsTemplate receipt="" :data="attachmentsData" :type="name" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "LatestFleetTemplate",
  props: ["name", "data", "attachmentsData"],
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getLabel(index) {
      let label;
      switch (index) {
        case "idle_hours":
          label = "Idle Hours";
          break;
        case "mileage":
          label = "Mileage";
          break;
        case "problem":
          label = "Problems";
          break;
        case "solution":
          label = "Solution";
          break;
        case "account_number":
          label = "Account No";
          break;
        case "certificate_referance_no":
          label = "Certificate RefNo.";
          break;
        case "date":
          label = "Date";
          break;
        case "remarks":
          label = "Remarks";
          break;
        case "route":
          label = "Route";
          break;
        case "cost_per_liter":
          label = "$Cost/Liter";
          break;
        case "cost_per_km":
          label = "$Cost/KM";
          break;
        case "efficiency":
          label = "Efficiency";
          break;
        case "distance":
          label = "Distance";
          break;
        case "card_no":
          label = "Card No";
          break;
        case "delivery_point":
          label = "Delivery Point";
          break;
        case "product_name":
          label = "Product Name";
          break;
        case "capacity":
          label = "Capacity";
          break;
        case "cost_center":
          label = "Cost Center";
          break;
        case "customer_no":
          label = "Customer No.";
          break;
        case "vendor":
          label = "Vendor";
          break;
        case "bank_name":
          label = "Bank Name";
          break;
        case "cheque_date":
          label = "Cheque Date";
          break;
        case "cheque_no":
          label = "Cheque No";
          break;
      }
      return label;
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: -30px;
}
.child {
  margin-top: 30px;
}
</style>
