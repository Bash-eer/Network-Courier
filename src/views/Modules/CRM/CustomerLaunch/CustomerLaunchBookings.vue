<template>
  <Card>
    <template #content>
      <div class="flex justify-content-between">
        <div class="flex align-self-center">
          <SelectButton
            v-model="selectedTab"
            optionLabel="tab"
            class="mr-5"
            :options="tabs"
          />
        </div>
        <div
          class="flex align-self-center"
          v-if="selectedTab.name == 'BookingHistory'"
        >
          <div class="mr-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                type="text"
                v-model="searchValue"
                class="global-search"
                @input="search($event.target.value)"
                placeholder="Search"
              />
            </span>
          </div>

          <!--Create Import button -->
          <Buttons
            label="Import"
            class="p-button-outlined mr-3 ml-2 dialog-button-text"
          />
        </div>
      </div>
      <div>
        <keep-alive>
          <component
            class="mt-4"
            v-bind:is="selectedTab.name"
            :selectedTab="selectedTab.name"
          ></component>
        </keep-alive>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import SelectButton from "primevue/selectbutton";
import CustomerBookingIndex from "./CustomerBookingIndex.vue";
import BookingHistory from "./BookingHistory.vue";
const _ = require("lodash");
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";

export default {
  name: "CustomerLaunchBookings",
  components: {
    Card,
    SelectButton,
    CustomerBookingIndex,
    BookingHistory,
    InputText,
  },
  created() {
    this.updateBreadCrumb("Customer Launch Booking History");
  },
  data() {
    return {
      details: {},
      showAddNew: true,
      tabs: [
        {
          tab: "Booking",
          name: "CustomerBookingIndex",
        },
        {
          tab: "Booking History",
          name: "BookingHistory",
        },
      ],
      searchValue: "",
      selectedTab: {
        tab: "Booking",
        name: "CustomerBookingIndex",
      },
    };
  },
  methods: {
    ...mapActions({
      expressDataFetch: "customerLaunchBookingHistory/loadExpressTableData",
      updateBreadCrumb: "users/updateBreadCrumb",
    }),
    search: _.debounce(function (e) {
      let paginationParams = {
        offset: 1,
        limit: this.pageLimit,
        orderBy: ["createdAt", "ASC"],
        searchKey: this.searchValue,
        filter_params: [],
      };
      this.expressDataFetch(paginationParams);
    }, 600),
  },
  computed: {
    ...mapGetters({
      filterParams: "customerLaunchBookingHistory/getExpressFilterParams",
      pageOffset: "customerLaunchBookingHistory/getPageOffset",
      pageLimit: "customerLaunchBookingHistory/getPageLimit",
    }),
  },
};
</script>
<style scoped>
p-card-content {
  color: #7a7a7a;
}

div {
  text-align: start;
}

::v-deep .p-selectbutton .p-button {
  color: #7a7a7a;
}

::v-deep .global-search {
  height: 37px !important;
}
</style>
