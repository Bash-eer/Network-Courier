<template>
<p>Van Jobs</p>
<Accordion class="accordion-custom m-2">
            <AccordionTab>
                <template #header>
                  
                 <!-- <input type="radio" id="two"> -->
<!-- <label for="two" class="accordion-text"> &nbsp; 2 tier</label> -->
                   <span class="accordion-text">2 tier</span>
                </template>
                 <RadioButtons
        label="platform"
        state="radioButtonAccordionTier"
        v-bind:radioButtonData="TierCategories"
        v-model="selectedCategory"
        class="category"
         :classes="{
         
          'inputfield w-full dialog-field-text ': true,
        }"
      />


              <div>
    <span v-if="selectedCategory == 'Charge by Weight'">
        <br><br>
      <ChargeByWeight />
    </span>
    <span v-if="selectedCategory == 'Charge by Quantity'">
        <br><br>
     <ChargeByQuantity />
    </span>
    <span v-if="selectedCategory == 'Charge by Job Count'">
        <br><br>
     <ChargeByJobCount />
    </span>
  </div>
             

            </AccordionTab>
</Accordion>
            <Accordion class="accordion-custom m-2" >
            <AccordionTab>
                <template #header>
                    <!-- <input type="radio" id="multi"> -->
<!-- <label for="multi" class="accordion-text"> &nbsp; Multi-Tier</label> -->
                   <span class="accordion-text">Multi-Tier</span>
                   </template>
                 <RadioButtons
        label="platform"
        state="radioButtonAccordionMultiTier"
        v-bind:radioButtonData="MultiTierCategories"
        v-model="multiSelectedCategory"
        class="category"
         :classes="{
        
          'inputfield w-full dialog-field-text ': true,
        }"
      />


              <div>
    <span v-if="multiSelectedCategory == 'Quantity'">
        
      <Quantity />
    </span>
    <span v-if="multiSelectedCategory == 'Job Count'">
        
     <JobCount />
    </span>
    
  </div>
            </AccordionTab>
             </Accordion>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ChargeByWeight from './ChargeByWeight.vue'
import ChargeByQuantity from './ChargeByQuantity.vue'
import ChargeByJobCount from './ChargeByJobCount.vue'
import Quantity from './Quantity.vue'
import JobCount from './JobCount.vue'
export default {
     components : { Accordion , AccordionTab , ChargeByWeight , ChargeByQuantity , ChargeByJobCount , Quantity , JobCount},
     data(){ 
         return { 
             selectedCategory : "" , 
             multiSelectedCategory : "",
              TierCategories: [
      { name: "Charge by Weight", key: "CBW" },
      { name: "Charge by Quantity", key: "CBQ" },
      { name: "Charge by Job Count", key: "CBJC" },
    ],

     MultiTierCategories: [
      { name: "Quantity", key: "QT" },
      { name: "Job Count", key: "JC" },
      
    ],

         }
     },
      created() {
    this.selectedCategory = this.TierCategories[0].name;
    this.multiSelectedCategory = this.MultiTierCategories[0].name;
  },
}
</script>

<style scoped>
.category:checked ~ label {
  color: blue;
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color :  #357DEA;

}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color :  #357DEA;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link{
    background: #5cd0f3;
border-radius: 8px 8px 0px 0px !important;

}
::v-deep .p-accordion-header-link{
    padding: 0.5rem !important;
    background: #F3F7FF !important;
border-radius: 8px 8px 8px 8px !important;

}
.category {
    font-family: Montserrat;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 17px; 
 letter-spacing: 0.03em;
text-align: left;
/* color : pink; */

}
.accordion-text {
    font-family: Montserrat;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 17px;
letter-spacing: 0.03em;
text-align: left;
color: #357DEA;

}
 /* .p-accordion .p-accordion-content{
  background-color: rgb(88, 233, 233) ;
}
::v-deep .p-accordion .p-accordion-content{
  background-color: rgb(163, 88, 233) ;
}
.p-accordion .p-accordion-content{
  background-color: rgb(233, 175, 88) !important;
} */
::v-deep  .p-accordion-content{
  background-color: transparent !important;
  border-radius: 8px 8px 0px 0px !important;
  /* border-color: #357DEA !important; */
  border: 0.5px solid #83aae6 !important;
  
}
::v-deep .p-inputnumber-buttons-stacked .p-inputnumber-input{
  border-right: none !important;
}
::v-deep .p-inputnumber-buttons-stacked .p-inputnumber-button-group{
  border-radius: 0px 5px 5px 0px !important;
  border: 1px solid #ccc !important;
  border-left: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border-color : #ccc !important;
}
::v-deep .p-inputtext:enabled:focus {
   border-color : #ccc !important;
   box-shadow: none !important;
}
</style>