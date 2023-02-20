<template>
  <div :key="render" class="sub-tab-margin">
    <SubTabs :key="render" :tabMenuData="getSubTabMenuData()" />
   
  </div>
</template>

<script>
import SubTabs from "../../../Tabs/SubTabs.vue";

import { mapActions, mapState } from "vuex";

import {eCommerceVanDeliveryTableColumnsData} from "../../../const/const.js";

import {
  getTableInput,
  generateDynamicSubTabs,
} from "../../../functions/functions.js";

export default {
  components: {
   SubTabs,
   
  },
  data: () => ({
    render:0,
    tabData:[{label:"",data:""}],
    tabDatas:[],
    currentIndex:0,
    activeIndex:0,
    tableColumn:null,
    eCommerceVanDeliveryTableColumnsData,
   
  }),
   computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    
    this.initialised();
  
  },
  methods:{
  ...mapActions("express", ["createNormalBikeRates"]),
    ...mapActions("express", [
      "getRegionRatesById",
      "createNormalVanRates",
      "createMultiTierVanJob",
      "createMultiTierQuantity",
    ]),
      getSubTabMenuData() {
      let data = getTableInput(
        this.regionRatesByIdData,
        "data",
        "Van",
        "e_commerce",
        "delivery_type"
      );
      
      return generateDynamicSubTabs(
        data,
        "RegionRatesTable",
        "Van",
        "e_commerce"
      );
    },
    initialised() {
      this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(() => {
        this.regionRatesByIdData.charge_types[0].normal_charge_services[0].service_type;
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if ( this.regionRatesByIdData.charge_types[i].charge_type == "e_commerce" ) {
            for (var j = 0; j <this.regionRatesByIdData.charge_types[i].e_commerce_services.length; j++ ) {
              if ( this.regionRatesByIdData.charge_types[i].e_commerce_services[j].service_type == "van" ) {

                let value=this.regionRatesByIdData.charge_types[i].e_commerce_services[j]
               for(let l=0; l<value.delivery_type.length;l++){
                   this.tabData[l]={
                    label:value.delivery_type[l].delivery_type,
                    data:value.delivery_type[l]
                   }
               }
               if(this.activeIndex==0){
                this.tabDatas=this.tabData[0].data
               }
                this.tableColumn=this.eCommerceVanDeliveryTableColumnsData;
              
              } 
            }
          
          }
        
        }
      });
    },
    tabChanged(args){
    
    }
  
  },
   watch: {
  
     "$store.state.express.new3":function(){
      this.getSubTabMenuData()
    },
   }
};
</script>


<style>
a {
    color: #8f96bf !important;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-align: left;
}
</style>
