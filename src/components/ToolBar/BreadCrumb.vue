<template>
  <!--dashboard-->
  <div v-if="$store.state.users.breadcrumbPath == 'Dashboard'">
    <div class="flex module header-title">Dashboard</div>
  </div>

  <!--settings-users-->
  <div v-else-if="$store.state.users.breadcrumbPath == 'SettingsUsers'">
    <div class="flex module header-title">Users</div>
    <div class="flex paths mt-1">Settings > Users</div>
  </div>
  <!-- Setting -> Template settings -->
  <div v-else-if="$store.state.users.breadcrumbPath == 'TemplateSettings'">
    <div class="flex module header-title">Template Settings</div>
    <div class="flex paths mt-1">CRM > Customer Launch</div>
  </div>
  <!--settings-roles or roles-NetworkCourierTabs-->
  <div
    v-else-if="
      $store.state.users.breadcrumbPath == 'SettingsRoles' ||
      $store.state.users.breadcrumbPath == 'NetworkCourierTabs'
    "
  >
    <div class="flex module header-title">Roles</div>
    <div class="flex paths mt-1">Network Courier</div>
  </div>

  <div v-else-if="$store.state.users.breadcrumbPath == 'RolesOnlineUsers'">
    <div class="flex module header-title">Roles</div>
    <div class="flex paths mt-1">
      Online Users > {{ this.$store.state.users.deliveryTypestabs }} >
      {{ this.$store.state.users.radioButtonTypesValue }}
    </div>
  </div>
  <!--roles-networkcourier-id-->
  <div v-else-if="$store.state.users.breadcrumbPath == 'RolesNetworkcourierId'">
    <div class="flex module header-title">Roles</div>
    <div class="flex paths mt-1">
      Network Courier > {{ this.$store.state.rolesId }}
    </div>
  </div>
  <!--fleet masters-->

  <div v-else-if="$store.state.users.breadcrumbPath == 'FleetMasters'">
    <div class="flex module header-title">Fleet Settings</div>
    <div class="flex paths mt-1">Settings > Fleet Settings</div>
  </div>
  <div v-else-if="$store.state.users.breadcrumbPath == 'FleetVehicles'">
    <div class="flex module header-title">Fleet Management</div>
    <div class="flex paths mt-1">Fleet Management > Vehicles</div>
  </div>
  <div v-else-if="$store.state.users.breadcrumbPath == 'FleetMaintenance'">
    <div class="flex module header-title">Fleet Management</div>
    <div class="flex paths mt-1">Fleet Management > Maintenance</div>
  </div>
  <div v-else-if="$store.state.users.breadcrumbPath == 'FleetFuel'">
    <div class="flex module header-title">Fleet Management</div>
    <div class="flex paths mt-1">Fleet Management > Fuel</div>
  </div>

  <div v-else-if="$store.state.users.breadcrumbPath == 'FleetExpenditure'">
    <div class="flex module header-title">Fleet Management</div>
    <div class="flex paths mt-1">Fleet Management > Expenditure</div>
  </div>
  <!--Room settings-->
  <div v-else-if="$store.state.users.breadcrumbPath == 'RoomsMaster'">
    <div class="flex module header-title">Rooms Settings</div>
    <div class="flex paths mt-1">Settings > Rooms Settings</div>
  </div>
  <!-- Geo Fencing -->
  <div v-else-if="$store.state.users.breadcrumbPath == 'GeoFencing'">
    <div class="flex module header-title">Rates</div>
    <div class="flex paths mt-1">Settings > Geo Location</div>
  </div>
  <!-- Route Planning Zones -->
  <div v-else-if="$store.state.users.breadcrumbPath == 'Route Planning Zones'">
    <div class="flex module header-title">Route Planning</div>
    <div class="flex paths mt-1">Operations > Route Planning > Zones</div>
  </div>

  <!-- Route Planning Assign Area name -->
  <div
    v-else-if="
      $store.state.users.breadcrumbPath == 'Operations Zones Assign Area'
    "
  >
    <div class="flex module header-title">Assign Area Name</div>
    <div class="flex paths mt-1">Operations > Assign Area Name</div>
  </div>
  <!-- Customer Launch Booking History -->
  <div
    v-else-if="
      $store.state.users.breadcrumbPath == 'Customer Launch Booking History'
    "
  >
    <div class="flex module header-title">Customer Launch</div>
    <div class="flex paths mt-1">CRM > Customer Launch</div>
  </div>
  <!--default-->
  <div v-else class="flex flex-column paths mt-2">
    <div class="flex module header-title">
      {{ $store.state.users.breadcrumbTitle }}
    </div>
    <div class="flex paths mt-1">{{ $store.state.users.breadcrumbPath }}</div>
  </div>
</template>

<script>
export default {
  watch: {
    "$route.path": function () {
      this.$store.state.users.breadcrumbPath = "Dashboard";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-inputtext {
  border: none !important;
}
.module {
  color: #4e5868;
}
.header-title {
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5868;
}
.paths {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
  color: #7e84a7;
}
</style>