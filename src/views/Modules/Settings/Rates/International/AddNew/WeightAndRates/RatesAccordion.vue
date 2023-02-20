<template>
  <div>
    <Accordion :activeIndex="active">
      <AccordionTab
        v-for="tab in accordianTab"
        :key="tab.name"
        :header="tab.name"
      >
        <component :tabName="tabName" :is="tab.component" />
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import NormalRates from "./NormalRates.vue";
import MultiplierRates from "./MultiplierRates.vue";
import { mapGetters } from "vuex";

export default {
  components: { Accordion, AccordionTab },
  props: ["tabName"],
  data() {
    return {
      active: 0,
      accordianTab: [
        { name: "Add Normal Rates", component: NormalRates },
        { name: "Add Multiplier Rates", component: MultiplierRates },
      ],
    };
  },
  watch: {
    saveKey() {
      let invalidForm = "";

      for (const [key] of Object.entries(this.rowValidations)) {
        for (const [rateKey] of Object.entries(this.rowValidations[key])) {
          this.rowValidations[key][rateKey].find((list) => {
            if (list.valid == false) {
              invalidForm = {
                tab: key,
                rate: rateKey,
                list,
              };
              return;
            }
          });
        }
      }

      if (invalidForm) {
        if (invalidForm.rate == "normal") {
          this.active = 0;
        } else if (invalidForm.rate == "multiplier") {
          this.active = 1;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      saveKey: "AddNewInternational/WeightAndRates/saveKey",
      rowValidations: "AddNewInternational/WeightAndRates/rowValidations",
    }),
  },
};
</script>

<style scoped>
::v-deep .p-accordion .p-accordion-tab-active .p-accordion-header > a > span{
  color:#357dea !important;
  font-weight: 700;
  font-size: 14px;
}
::v-deep .p-accordion-header-text{
  font-weight: 700;
  font-size: 14px;
  color: #343434 !important;
}
</style>