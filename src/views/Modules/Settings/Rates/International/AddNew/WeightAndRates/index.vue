<template>
  <div>
    <div class="color-4e5868 font-size-14 bold-600 flex justify-content-start">
      Add Weight and Rates
    </div>
    <div class="flex justify-content-start align-items-center mt-4">
      <SelectButton
        v-model="selectedTab"
        optionLabel="tab"
        class="mr-5"
        :options="tabs"
      />
      <!-- <div v-if="selectedTab.tab != 'Document and Parcel'">
      <SingleCheckBox label="Same Rates as Document" v-model="sameRate" /></div> -->
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
import Document from "./Document/index.vue";
import Parcel from "./Parcel/index.vue";
import DocumentAndParcel from "./DocumentAndParcel/index.vue";
import RatesAccordion from "./RatesAccordion.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SelectButton,
    Document,
    RatesAccordion,
    DocumentAndParcel,
    Parcel,
  },
  data() {
    return {
      sameRate: false,
      tabs: [
        { tab: "Document", component: "Document", storeKey: "document" },
        { tab: "Parcel", component: "Parcel", storeKey: "parcel" },
        {
          tab: "Document and Parcel",
          component: "DocumentAndParcel",
          storeKey: "documentAndparcel",
        },
      ],
      selectedTab: {
        tab: "Document",
        component: "Document",
        storeKey: "document",
      },
    };
  },
  watch: {
    selectedTab(value) {
      this.setCurrentTab(value.tab);
    },

    saveKey() {
      let invalidForm = "";
      for (const [key] of Object.entries(this.rowValidations)) {
        for (const [rateKey] of Object.entries(this.rowValidations[key])) {
          this.rowValidations[key][rateKey].map((list) => {
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
        this.setTabName(invalidForm.tab);
        this.selectedTab = this.tabs.find((list) => {
          if (list.tab == this.currentTabName) return list;
        });
        this.setCurrentTab(this.currentTabName);
        this.setIsNextValid(false);
      } else {
        this.setIsNextValid(true);
      }
    },
  },
  computed: {
    ...mapGetters({
      isNextValid: "AddNewInternational/isNextValid",
      rowValidations: "AddNewInternational/WeightAndRates/rowValidations",
      saveKey: "AddNewInternational/WeightAndRates/saveKey",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentTab: "AddNewInternational/WeightAndRates/setCurrentTab",
      setIsNextValid: "AddNewInternational/setIsNextValid",
    }),
    setTabName(tab) {
      switch (tab) {
        case "document":
          this.currentTabName = "Document";
          break;
        case "parcel":
          this.currentTabName = "Parcel";
          break;
        case "documentAndparcel":
          this.currentTabName = "Document and Parcel";
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.setCurrentTab("Document");
  },
};
</script>

<style scoped>
:deep .p-accordion-header-link {
  background: #edf3ff !important;
  border-radius: 8px 8px 0px 0px !important;
  position: relative;
}

:deep .p-accordion-toggle-icon {
  position: absolute;
  right: 1rem;
}

:deep .p-accordion-tab {
  margin-top: 2rem;
}

:deep .p-accordion-content {
  background: rgba(243, 247, 255, 0.5) !important;
  border: 1px solid #cecece !important;
}
</style>