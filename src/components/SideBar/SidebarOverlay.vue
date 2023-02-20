<template>
  <Button icon="pi pi-bars" @click="visibleLeft = true" class="left-btn" />
  <Sidebar
    v-model:visible="visibleLeft"
    :baseZIndex="1000"
    :dismissable="true"
    :showCloseIcon="false"
    ariaCloseLabel="close"
    class="p-sidebar-sm"
    ref="sideBarRef"
  >
    <SideDrawer />
  </Sidebar>
</template>

<script>
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import SideDrawer from "./SideDrawer.vue";
export default {
  name: "SidebarOverlay",
  components: { Sidebar, Button, SideDrawer },
  data() {
    return {
      visibleLeft: false,
      content: [
        {
          id: "1",
          title: "Dashboard",
          icon: "pi pi-th-large",
          path: "/dashboard",
        },
        { id: "2", title: "Sales", icon: "pi pi-money-bill", path: "/sales" },
        {
          id: "3",
          title: "Operations",
          icon: "pi pi-globe",
          path: "/operations",
        },
        {
          id: "4",
          title: "Billing Management",
          icon: "pi pi-book",
          path: "/billing-management",
        },
        {
          id: "5",
          title: "Purchase Request",
          icon: "pi pi-bookmark",
          path: "/purchase-request",
        },
        {
          id: "6",
          title: "Asset Management",
          icon: "pi pi-briefcase",
          path: "/asset-management",
        },
        {
          id: "7",
          title: "Fleet Management",
          icon: "pi pi-compass",
          path: "/fleet-management",
        },
        {
          id: "8",
          title: "Warehouse Management",
          icon: "pi pi-home",
          path: "/warehouse-management",
        },
        { id: "9", title: "CVL", icon: "pi pi-wallet", path: "/cvl" },
        {
          id: "10",
          title: "Contact Management",
          icon: "pi pi-credit-card",
          path: "/contact-management",
        },
        { id: "11", title: "HRMS", icon: "pi pi-users", path: "/hrms" },
        { id: "12", title: "Settings", icon: "pi pi-cog", path: "/settings" },
        { id: "13", title: "Users", icon: "pi pi-user-edit", path: "/users" },
      ],
    };
  },
  watch: {
    "$store.state.users.sideBarCount": function () {
      // console.log(this.$store.state.users.sideBarCount);
      this.$refs.sideBarRef.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.lefto {
  // background-color: $primary-color-1;
  background-color: #f5f24d !important;
}
// ::v-deep .p-sidebar {
//   background-color: #204B8C !important;
// }
.left-btn {
  background-color: transparent !important;
  color: grey !important;
  border: none !important;
  padding: 5px !important;
}
// ::v-deep .p-sidebar .p-sidebar-header {
//     padding: 0rem !important;
// }
// ::v-deep .p-sidebar .p-sidebar-content {
//      padding: 0rem !important;
// }
// ::v-deep .p-sidebar{
//    background-color: #204B8C !important;
// }
</style>
