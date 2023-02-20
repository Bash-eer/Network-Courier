<template>
  <div v-if="shouldShowSidebar">
    <router-view />
  </div>

  <div v-else class="grid">
    <!--❌do not delete following code❌-->
    <!-- <div class="md:col-3 lg:col-1 xl:col-2 side-drawer">
      <SideDrawer class="h-full" />
    </div> -->

    <!-- <div class="m-0 lg:col-11 xl:col-10 md:col-9 p-0 m-0 parent"> -->
    <div class="m-0 col-12 p-0 m-0 parent">
      <div class="grid p-0">
        <div class="col-12 w-full m-0 p-0 custom-toolbar">
          <ToolBar />
        </div>
      </div>
      <div class="grid container-wrap">
        <div class="col-12">
          <div class="tabs_class">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none" id="loading-icon">
    <div class="spinner_overlay">
      <div class="loader">
        <div class="loader-action"></div>
        <span><h3>Loading...</h3></span>
      </div>
    </div>
  </div>
  <Dialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['users'].dialogComponent"
  />

  <Toast position="top-center" />

  <ToastMessages
    :severity="$store.state['users'].severity"
    :summary="$store.state['users'].summary"
  />
  <ConfirmDialog></ConfirmDialog>

</template>
<script>
import ConfirmDialog from "primevue/confirmdialog";
import axios from "axios";
import { loader_fun } from "./store/helper";
export default {
  data: () => ({
    accessCode: null,
    loading: false,
  }),
  components: { ConfirmDialog },
  method: {
    ...loader_fun,
  },
  computed: {
    shouldShowSidebar() {
      return this.$route.meta.sidebar == false;
    },
  },

  watch: {},
  mounted() {
    axios.interceptors.request.use(
      (config) => {
        document.getElementById("loading-icon").className = "d-block";
        return config;
      },
      function (error) {
        document.getElementById("loading-icon").className = "d-none";
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        document.getElementById("loading-icon").className = "d-none";
        return response;
      },
      function (error) {
        document.getElementById("loading-icon").className = "d-none";
        return Promise.reject(error);
      }
    );
  },
  created() {
    this.accessCode = localStorage.getItem("AccessToken");
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/main.scss";
.p-chip img {
  border-radius: 0px !important;
  margin-top: 7% !important;
  margin-bottom: 7% !important;
  margin-left: 1% !important;
  width: 3rem !important;
  height: 1.5rem !important;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  background: #edf1f7 !important;
}
// .parent {
//    overflow: auto !important;
// }
.p-overflow-hidden {
  overflow: auto !important;
}
.grid {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.tab-class {
  padding: 0 !important;
  background-color: white;
}
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a {
  color: #2c3e50 !important;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.tabs_class {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 30px;
  margin-bottom: 40px;
}
.p-datatable .p-datatable-header {
  background: white !important;
}
.side-drawer {
  padding: 0 !important;
}
.container-wrap {
  background: #edf1f7 !important;
}
.custom-tooltip-class .p-tooltip-text {
  font-family: $font-family-primary !important;
  font-size: 10px !important;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #fff !important;
  background-color: #2196f3 !important;
}
::v-deep.p-datepicker .p-component .p-ripple-disabled {
  transform-origin: center bottom !important;
}
.p-accordion
  .p-accordion-header:not(.p-disabled)
  .p-accordion-header-link:focus {
  box-shadow: none !important;
}
.activityLogTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7 !important;
}
.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
}
.map {
  border-radius: 0px 0px 10px 10px !important;
}
.mapdiv {
  border-radius: 0px 0px 10px 10px !important;
}
//for sidebar overlay only not for normal sidebar
.p-sidebar .p-sidebar-header {
  padding: 0rem !important;
}
.p-sidebar .p-sidebar-content {
  padding: 0rem !important;
}
.p-sidebar {
  // background-color: #66fcef !important;
  // overflow : hidden !important;
  background-color: #204b8c !important;
  // height: 100vh !important;
}
.p-sidebar .p-sidebar-header .p-sidebar-close,
.p-sidebar .p-sidebar-header .p-sidebar-icon {
  color: #fff !important;
  margin: 10px;
}
.p-datepicker .p-datepicker-header .p-datepicker-title select {
  border: none !important;
}
</style>
