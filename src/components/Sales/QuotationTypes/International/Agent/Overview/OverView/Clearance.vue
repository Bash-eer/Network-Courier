<template>
  <div>
    <div class="flex flex-row ml-1 mt-4 row">
      <div class="flex flex-row">
        <div
          :class="`flex col-2 ${
            data.clearance_type_charges ? 'c-display' : ''
          }}`"
          v-for="(item, index) of data.clearance_charges"
          :key="index"
        >
          <div class="flex flex-column mb-3">
            <div
              class="
                flex
                international-agent-clearance-detailsText
                express-international-table
              "
            >
              Clearance Charges
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
                  : 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
              "
            >
              {{
                item?.min_weight +
                "kg" +
                " - " +
                item?.max_weight +
                "kg" +
                " | Charges : " +
                item?.charge +
                " $ "
              }}
            </div>
          </div>
        </div>
        <div
          class="flex col-2"
          v-if="data.clearance_additional_type_charges == true"
        >
          <div class="flex flex-column mb-3">
            <div
              class="
                flex
                international-agent-clearance-detailsText
                express-international-table
              "
            >
              Every Addl. Weight Charges
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
                  : 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
              "
            >
              {{
                data?.clearance_weight +
                "kg" +
                " | Charges : " +
                data?.clearance_charge +
                " $ "
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex col-2" v-if="data.clearance_type_charges == true">
        <div class="flex flex-column mb-3">
          <div
            class="
              flex
              international-agent-clearance-detailsText
              express-international-table
            "
          >
            Clearance Charges
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
                : 'flex  international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
            "
          >
            {{
              data?.clearance_weight +
              "kg" +
              " | Charges : " +
              data?.clearance_charge +
              " $ "
            }}
          </div>
        </div>
      </div>
    </div>
    <hr class="mb-2" v-if="val == 0" />

    <div class="flex flex-row ml-1 mb-4 mt-1 row">
      <div
        v-for="(item, index) of data.other_clearance_charges"
        :key="index"
        :class="`row col-2 `"
      >
        <div class="flex">
          <div class="flex flex-column">
            <div
              class="
                flex
                international-agent-clearance-detailsText
                express-international-table
              "
            >
              {{ item.other_charge_type }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
                  : 'flex international-agent-clearance-detailsText express-international-table international-agent-clearance-valuesText'
              "
            >
              {{
                item.other_charge_weight +
                "kg" +
                " | Charges : " +
                item.other_min_charge +
                " $ "
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "dataOne", "val"],
  components: {},

  data() {
    return {};
  },

  methods: {
    getSubHeaderOne(index) {
      let header;
      switch (index) {
        case "airFreight_clearance_charges":
          header = "AirFreight Clearance Charges";
          break;
        case "weight_charges":
          header = "AirFreight Every Addl.  Weight Charges";
          break;
      }
      return header;
    },
    getSubHeaderTwo(index) {
      let header = "";
      switch (index) {
        case "sat_express_charge":
          header = "SAT Express (Per KG) Charges";
          break;
        case "sat_express_weight":
          header = "SAT Express Min Charges";
          break;
        case "exception_clearance_charge":
          header = "Exception Clearance Charges";
          break;
        case "exception_clearance_weight":
          header = "Exception Clearance Weight";
          break;
        case "ground_holding_charge":
          header = "Ground Handling Charge";
          break;
        case "ground_holding_weight":
          header = "Ground Handling Weight";
          break;
      }
      return header;
    },
  },
};
</script>

<style scoped>
.international-agent-clearance-detailsText {
  color: #7e84a7;
}
.international-agent-clearance-valuesText {
  color: #66c11e;
}
.cost-display {
  display: none !important;
}
.c-display {
  display: none;
}
</style>
