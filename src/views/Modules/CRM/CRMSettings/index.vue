<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
              id="pills-tab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs)"
                  :class="
                    index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                  "
                  :id="'pills-' + tabs.label + '-tab'"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-' + tabs.label"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-' + tabs.label"
                  :aria-selected="index == 0 ? true : false"
                >
                  {{ tabs.tabName }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- tab-content -->
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <keep-alive>
          <component v-bind:is="tabs.tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FeedbackSettings from "../feedbackSettings.vue";
import couponSettings from "../couponSettings.vue";
import PaymentMethod from "../paymentMethod.vue";
import LogisticsSettings from "../logisticsSettings.vue";
import documentDetailSettings from "../documentDetailSettings.vue";
import countrySettings from "../countrySettings.vue";

export default {
  name: "RoutePlanningZones",
  components: {
    FeedbackSettings,
    couponSettings,
    PaymentMethod,
    LogisticsSettings,
    documentDetailSettings,
    countrySettings,
  },
  data: () => ({
    currentTab: "label",
    defaultTabIndex: 0,
  }),
  methods: {
    ...mapActions({
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
    }),
    async tabChange(tab) {
      this.currentTab = tab.label;

          let breadCrumbData = {
      title: "Settings",
      breadcrumbInfo: `CRM Settings > ${tab.label}`,
    };
    this.updateBreadCrumb(breadCrumbData);
    },
  },
  created() {},
  computed: {
    ...mapGetters({ tabMenuData: "CrmSettings/getSettingsTabMenuData" }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
</style>
