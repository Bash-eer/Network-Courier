<template>
  <div>
    <div class="flex flex-row justify-content-between m-2">
      <div><p class="dashboard-text">Dashboard</p></div>
      <div>
        <DropDown
          code="code"
          :data="DropDownData"
          label="userRole"
          id="userRole"
          v-model="value"
          :value="value"
          v-on:childToParent="getUserInput"
          classes="inputfield  dialog-dropdown-input-right-text"
          placeholder="Last Week"
        />
      </div>
    </div>
    <TopCard />
    <div class="grid">
      <div class="col-12 md:col-12 lg:col-8 p-0">
        <div class="grid red-color col-12 p-0 mt-5">
          <div class="grid col-12 md:col-7">
            <ChartCard />
          </div>
          <div class="grid col-12 md:col-5">
            <CenterCard />
          </div>
        </div>
        <div class="col-12 mt-3">
          <BottomCard />
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="flex flex-column flex-wrap borders">
          <div class="grid mt-4">
            <div class="col-12 map-card"><MapCard /></div>
            <div class="col-12 bottom-card-right"><BottomCardRight /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopCard from "../components/Dashboard/TopCard.vue";
import CenterCard from "../components/Dashboard/CenterCard.vue";
import ChartCard from "../components/Dashboard/ChartCard.vue";
import BottomCard from "../components/Dashboard/BottomCard.vue";
import MapCard from "../components/Dashboard/MapCard.vue";
import BottomCardRight from "../components/Dashboard/Bottom-Right-Card.vue";

export default {
  components: {
    TopCard,
    CenterCard,
    ChartCard,
    BottomCard,
    MapCard,
    BottomCardRight,
  },
  data() {
    return {
      DropDownData: [
        { name: "Last Week", code: "LW" },
        { name: "Yesterday", code: "YD" },
        { name: "Today", code: "TD" },
      ],
    };
  },
  created() {
    for (var tc in this.$store.state.users.tabCategories) {
      if (tc == 0) {
        this.$store.state.users.usersTabsValue =
          this.$store.state.users.tabCategories[tc].name;
      }
    }
    this.$store.state.users.bootstrapTabsRolesKey = false;
    this.$store.state.users.previousTabsState = null;
    this.$store.state.users.previousDeliveryTabState = "International";
    this.$store.state.users.deliveryChoicesState = "International";
    this.$store.state.users.radioButtonTypesValue = null;
    this.$store.commit("users/updateBreadCrumb", "Dashboard");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
body {
  border: none !important;
}
.map {
  /* width: 500px;
  height: 500px; */
  width: min-content;
  height: min-content;
}

.map-card {
  border-radius: 8px 8px 0 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
.bottom-card-right {
  border-radius: 0 0 8px 8px !important;
  margin: 0 !important;
  padding: 0 !important;
}
.p-0 {
  padding: 0 !important;
}
.p-dropdown {
  background: transparent !important;
  border: 0 !important;
}
.p-dropdown-trigger {
  background: transparent !important;
}
.dashboard-text {
  color: #171717;
  font-family: $font-family-primary;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
}
.dialog-dropdown-input-right-text {
  color: #192a3e;
  font-family: $font-family-primary;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
}
</style>
