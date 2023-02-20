<template>
  <div>
    <div class="title flex justify-content-start">Add E-Commerce Charges</div>
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
        <component :is="selectedTab.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import Bike from "./Bike/index.vue";
import Van from "./Van/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { SelectButton, Bike, Van },
  data() {
    return {
      tabs: [
        { tab: "Bike", component: "Bike" },
        { tab: "Van", component: "Van" },
      ],
      selectedTab: { tab: "Bike", component: "Bike" },
    };
  },
  watch: {
    nextBtnKey() {
      this.checkValidation();
    },
    backBtnKey() {
      if (this.selectedTab.tab == "Van") {
        this.selectedTab = this.tabs[0];
      } else if (this.selectedTab.tab == "Bike") {
        this.setStepBackKey();
      }
    },
  },
  computed: {
    ...mapGetters({
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
      backBtnKey: "AddNewInternationalLocal/backBtnKey",
      validations: "AddNewInternationalLocal/Ecommerce/validations",
    }),
  },
  methods: {
    ...mapActions({
      setInvalidTab: "AddNewInternationalLocal/setInvalidTab",
      setStepBackKey: "AddNewInternationalLocal/setStepBackKey",
      setStepperKey: "AddNewInternationalLocal/setStepperKey",
      setTabActive: "AddNewInternationalLocal/setTabActive",
      setTabDisable: "AddNewInternationalLocal/setTabDisable",
    }),
    checkValidation() {
      let isTabInvalid;
      for (const [key] of Object.entries(this.validations)) {
        for (const [tabKey] of Object.entries(this.validations[key])) {
          if (Object.keys(this.validations[key][tabKey])[0] != 0) {
            if (this.validations[key][tabKey].valid == false) {
              isTabInvalid = {
                tabKey,
                key,
                data: this.validations[key][tabKey],
              };
            }
          } else {
            this.validations[key][tabKey].map((list) => {
              if (list.valid == false) {
                isTabInvalid = { data: list, tabKey, key };
              }
            });
          }
        }
      }

      if (isTabInvalid) {
        this.setInvalidTab(isTabInvalid);
        this.setTabDisable();

        switch (isTabInvalid.key) {
          case "van":
            this.selectedTab = this.tabs[1];
            break;
          case "bike":
            this.selectedTab = this.tabs[0];
            break;
        }
      } else {
        this.setInvalidTab(null);
        this.setTabActive();
        this.setStepperKey();
      }
    },
  },
};
</script>

<style>
</style>