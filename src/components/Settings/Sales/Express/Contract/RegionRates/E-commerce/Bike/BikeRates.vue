<template>
  <div class="sub-tab-margin">
    <SubTabs :tabMenuData="getSubTabMenuData()" />
  </div>
</template>

<script>
import SubTabs from "../../../Tabs/SubTabs.vue";
import { mapState, mapActions } from 'vuex';
import {
  getTableInput,
  generateDynamicSubTabs,
} from "../../../functions/functions.js";

export default {
  components: {
    SubTabs,
  },
  data: () => ({
   
  }), computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
      
     
    }),
  },
  mounted(){
    this.initialised()
  },
    methods: {
    //fetch table input
       ...mapActions('express', ['getRegionRatesById']),
      initialised(){
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(()=>{
          for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (this.regionRatesByIdData.charge_types[i].charge_type == "normal") {
            for(var j=0;j<this.regionRatesByIdData.charge_types[i].normal_charge_services.length;j++){
              if(this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type=='bike'){
                  this.tableColumn=this.normalBikeBikeCustomerVanJobTableColumnData      
                  this.tableData=this.regionRatesByIdData.charge_types[i].normal_charge_services[j].bike_van_job_rates
                
              }
        
           }
    }
   }

 })
    },
 getSubTabMenuData() {
   
      let data = getTableInput(
        this.regionRatesByIdData,
        "data",
        "Bike",
        "e_commerce",
        "delivery_type"
      );
      return generateDynamicSubTabs(
        data,
        "RegionRatesTable",
        "Bike",
        "e_commerce"
      );
    }
  
    }
};
</script>

<style></style>
