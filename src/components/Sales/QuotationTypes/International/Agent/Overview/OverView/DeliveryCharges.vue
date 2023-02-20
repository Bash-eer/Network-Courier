<template>
  <div v-if="type==0" class="flex flex-row ml-1 mt-4 mb-4 row">
  <div  class="flex flex-row" >
    <div :class="`flex col-2 ${!data.delivery_additional_charge_types?'c-display':''}`" v-for="(item, index) of data.delivery_ranges" :key="index">
      <div class="flex flex-column ">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          Delivery Charges
        </div>

        <div
          :class="common"
        >
          {{ item.min_weight+"kg - "+item.max_weight+"kg | Charges : "+item.charge+" $ " }}
        </div>
      </div>
      
    </div>
     <div class="flex flex-column col-2">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{data.delivery_additional_charge_types?"Addl. Delivery Chg.":data.delivery_type_charges?"Delivery Charges":"Same Address Charges"}}
        </div>

        <div
          :class="common"
        >
          {{ data.weight+"kg | Charges : "+data.charge+" $ " }}
        </div>
      </div>
    </div>
   
  </div>
  <div v-if="type==1" class="flex flex-row ml-1 mt-4 mb-4 row">
  <div  class="flex flex-row">
    <div :class="`flex col-2 ${!data.resi_delivery_additional_charge_types?'c-display':''}`" v-for="(item, index) of data.resident_ranges" :key="index">
      <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          Resident Delivery Charges
        </div>

        <div
          :class="common"
        >
          {{ item.resident_min_weight+"kg - "+item.resident_max_weight+"kg | Charges : "+item.resident_charge+" $ " }}
        </div>
      </div>
      
    </div>
    <div class="flex flex-column col-2">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{data.resi_delivery_additional_charge_types?"Addl. Delivery Chg.":data.resi_delivery_type_charges?"Delivery Charges":"Same Address Charges"}}
        </div>

        <div
          :class="common"
        >
          {{ data.weight+"kg | Charges : "+data.charge+" $ " }}
        </div>
      </div>
    </div>
    
  </div>
  <div v-if="type==2" class="flex flex-row ml-1 mt-4 mb-4">
  
    <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          Delivery Attempt Charges
        </div>

        <div
          :class="common"
        >
          {{ data.attempts+" | Charges : "+data.attempt_charges+" $ " }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["data", "type"],
data() {
    return {
      common:"flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText"
    }},
  methods: {
    getSubHeaderNine(index) {
      let header;
      switch (index) {
        case "public":
          header = "Delivery Charges";
          break;
        case "remote":
          header = "Addl. Delivery Chg.";
          break;
      }
      return header;
    },
  },
};
</script>

<style scoped>
.international-agent-costingdetails-detailsText {
  color: #7e84a7;
}
.international-agent-costingdetails-valuesText {
  color: #66c11e;
}
.c-display {
  display: none !important;
}
</style>
