<template>
  <!-- VEHICLE PERFORMANCE -->
  <div class="card vehiclesDetailsCard m-4 vehiclePerformanceCard">
    <div class="card-header vehiclesDetailsCardHeader">
      <div class="flex justify-content-between">
        <div class="flex tabHeading pt-2">Vehicle Performance</div>
        <div class="flex">
          <TabMenu
            class="chartTabs"
            :model="$store.state.fleets.chartTabData"
            v-model:activeIndex="activeIndex"
            v-on:tab-change="tabChanged($event)"
          />
        </div>
      </div>
    </div>
    <div class="card-body">
      <MultiLineChart
        v-if="$store.state.fleets.vehicleDashboardTab == 'Details'"
        :data="$store.state.fleets.basicData"
      />
    </div>
  </div>
  <!-- VEHICLE DETAILS -->
  <div class="card vehiclesDetailsCard m-4 h-100">
    <div class="flex justify-content-between p-3">
      <div class="flex tabHeading">Vehicle Details</div>
      <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
    </div>
    <div
      v-for="(item, index) of $store.state.fleets.vehicleDetailsGridData"
      :key="index"
      class="grid mb-3"
    >
      <div
        class="col-4 pt-2 pl-4 pr-4"
        v-for="(sub, subIndex) of $store.state.fleets.vehicleDetailsGridData[
          index
        ]"
        :key="subIndex"
      >
        <div class="vehicleDetailsCards">
          <div class="flex flex-column p-3">
            <div class="flex">
              <img :src="'/images/' + sub.img + '.png'" alt="" />
            </div>
            <div class="ml-1 flex vehicleDetailsHeadingText mt-2">
              {{ sub.label }}
            </div>
            <div class="ml-1 flex vehicleDetailsNumbers">
              <span
                v-if="
                  sub.label == 'Registration Date' ||
                  sub.label == 'Purchase Date' ||
                  sub.label == 'Tax Due Date' ||
                  sub.label == 'COE Expiry'
                "
                >{{ dateFormater(sub.value) }}</span
              >
              <span v-else>{{ sub.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TabMenu from "primevue/tabmenu";
export default {
  name: "DashboardVehicleDetails",
  data: () => ({
    activeIndex: 0,
  }),
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    tabChanged(tab) {
      console.log(tab);
    },
  },
  components: {
    TabMenu,
  },
};
</script>

<style lang="scss">
.vehiclePerformanceCard {
  // height: 400px !important;
}
.vehicleDetailsHeadingText {
  color: #4e5868;
  font-weight: normal;
  font-size: 14px;
}
.vehicleDetailsNumbers {
  color: #4e5868;
  font-weight: 600;
  font-size: 14px;
}
.vehicleDetailsCards {
  background: #f5f5fa;
  border-radius: 10px;
}
.p-tabmenu
  .p-tabmenu-nav
  .p-tabmenuitem
  .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: none !important;
}
.chartTabs .p-menuitem-link {
  color: #8083a3 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
::v-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  border-bottom-color: #2196f3 !important;
}
.chartTabs .p-highlight .p-menuitem-link {
  border-bottom-color: #2196f3 !important;
  color: #2196f3 !important;
}
.chartTabs .p-menuitem-link {
  border: 1px solid transparent !important;
}
.tabHeading {
  color: #4E5968;
  font-weight: bold;
  font-size: 20px;
}
.card-header {
  background: #ffffff !important;
}
.vehiclesDetailsCard {
  border-radius: 10px 10px 10px 10px !important;
}
.vehiclesDetailsCardHeader {
  border-radius: 10px 10px 0px 0px !important;
  padding-bottom: 0px !important;
}
</style>
