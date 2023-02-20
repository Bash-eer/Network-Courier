<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- tab header -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tab header title-->
            <span class="table-title">Check Out</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex ml-2 mt-2">
      <div class="flex flex-row flex-wrap">
        <div class="flex tabPills mr-6">
          <ul
            class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
            id="pills-tab"
            role="tablist"
          >
            <li
              class="nav-item"
              role="presentation"
              v-for="(tabs, index) of checkOutTabData"
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
                {{ tabs.label }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="tab-content mt-4" id="pills-tabContent">
      <bikeTab v-if="currentTab == 'bikeTab'" />
      <vanTab v-if="currentTab == 'vanTab'" />
      <rapidoTab v-if="currentTab == 'rapidoTab'" />
    </div>
  </div>
</template>

<script>
import { checkOutTabData } from "./const";
import bikeTab from "./bikeTab.vue";
import vanTab from "./vanTab.vue";
import rapidoTab from "./rapidoTab.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  components: { bikeTab, vanTab, rapidoTab },
  data() {
    return {
      checkOutTabData,
      currentTab: "bikeTab",
      defaultTabIndex: 0,
    };
  },
  created() {
    this.getRemarksDropdown();
    this.updateBreadCrumbAndTitle({
      title: "Check Out",
      breadcrumbInfo: "Operations > Check out",
    });
  },
  methods: {
    ...mapActions({ getRemarksDropdown: "Checkout/getRemarksData" }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    async tabChange(tab) {
      this.currentTab = tab.component;
    },
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
.operations-zones-tab-nav {
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}

::v-deep[data-v-0264a539]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.nav-pills .nav-link.active[data-v-1f88fdea] {
  font-family: $font-family-third !important;
}

::v-deep .global-search {
  height: 37px !important;
}
::v-deep .global-search {
  height: 37px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
</style>
