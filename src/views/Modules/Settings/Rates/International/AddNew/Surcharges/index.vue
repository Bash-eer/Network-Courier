<template>
  <div>
    <div class="title flex justify-content-start">Add Surcharges</div>
    <div class="flex justify-content-start align-items-center mt-4">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
    </div>
    <div class="mt-5">
      <keep-alive>
        <component :tab="selectedTab" :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Emergencysurcharges from "./EmergencySurcharges/index.vue";
import RestrictedCountryCharges from "./RestrictedCountryCharges/index.vue";
import OverWeightCharges from "./OverWeightCharges/index.vue";
import RemoteAreaChanges from "./RemoteAreaCharges/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SelectButton,
    Emergencysurcharges,
    RestrictedCountryCharges,
    OverWeightCharges,
    RemoteAreaChanges,
  },
  data() {
    return {
      tabs: [
        {
          tab: "Emergency Surcharges",
          component: "Emergencysurcharges",
          storeKey: "emergencySurcharges",
        },
        {
          tab: "Restricted Country Charges",
          component: "RestrictedCountryCharges",
          storeKey: "restrictedCountry",
        },
        {
          tab: "Over Weight Charges",
          component: "OverWeightCharges",
          storeKey: "overWeightCharges",
        },
        {
          tab: "Remote Area Charges",
          component: "RemoteAreaChanges",
          storeKey: "remoteAreaCharges",
        },
      ],
      selectedTab: {
        tab: "Emergency Surcharges",
        component: "Emergencysurcharges",
        storeKey: "emergencySurcharges",
      },
      currentTabName: "",
    };
  },
  watch: {
    selectedTab() {
      this.setCurrentTab(this.selectedTab.tab);
    },
    saveKey() {
      let invalidForm = "";
      for (const [key] of Object.entries(this.validations)) {
        for (const [typeKey] of Object.entries(this.validations[key])) {
          this.validations[key][typeKey].find((list) => {
            if (list.valid == false) {
              invalidForm = {
                tab: key,
                type: typeKey,
                list,
              };
              return;
            }
          });
        }
      }
      if (invalidForm) {
        this.setIsNextValid(false);
        this.setInvalidTab(invalidForm);
        this.selectedTab = this.tabs.find(
          (list) => list.storeKey === invalidForm.tab
        );
      } else {
        this.setIsNextValid(true);
      }
    },
  },
  computed: {
    ...mapGetters({
      saveKey: "AddNewInternational/Surcharges/saveKey",
      validations: "AddNewInternational/Surcharges/validations",
    }),
  },
  methods: {
    ...mapActions({
      setIsNextValid: "AddNewInternational/setIsNextValid",
      setInvalidTab: "AddNewInternational/Surcharges/setInvalidTab",
      setCurrentTab: "AddNewInternational/Surcharges/setCurrentTab",
    }),
  },
};
</script>

<style>
</style>