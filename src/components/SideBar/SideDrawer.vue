<template>
  <!--  hidden-sm-down-->
  <div class="flex wrapper">
    <div class="md:col-12 sm:col-2 lg:col-12 xl:col-12 lefto m-0 h-full">
      <div class="logo-section flex flex-row flex-wrap">
        <!-- src="https://drive.google.com/file/d/1o1dmhET_bJKb9gn1tmNd95zNIP1pS1dS"-->
        <img
          class="
            flex
            align-items-center
            justify-content-center
            sidebar-nc-logo
            m-3
            ml-4
          "
          src="../../assets/nc-logo.png"
          width="180"
          alt=""
        />
        <!-- <div>
          <img
            class="flex align-items-center justify-content-center m-1 mt-5"
            src="../../assets/logo.png"
            alt=""
          />
        </div>
        <div>
          <img
            class="flex align-items-center justify-content-center mt-5 mr-0"
            src="../../assets/nc.png"
            alt=""
          />
        </div> -->
      </div>

      <div class="flex flex-column m-0 sidebar-flex">
        <!-- <div @click="RedirectHandler"> -->
        <router-link
          @click="RedirectHandler"
          to="/dashboard"
          class="footer-sub-item-list section-text"
        >
          <!-- <p class="text-white section-text"> -->
          <!-- <span class=""> -->
          <img
            class="ml-3"
            src="../../assets/dashboard.png"
            width="15"
            alt=""
          />
          <!-- </span> -->
          <span class="individuals ml-3">Dashboard</span>
          <!-- </p> -->
        </router-link>
        <!-- </div> -->

        <router-link
          @click="RedirectHandler"
          to="/sales"
          class="footer-sub-item-list section-text"
        >
          <!-- <p class="text-white section-text">
            <span class="ml-3" -->
          <img class="ml-3" src="../../assets/sales.png" width="15" alt="" />
          <!-- </span> -->
          <span class="individuals ml-3">Sales</span>
          <!-- </p> -->
        </router-link>
        <Accordion class="accordion">
          <AccordionTab>
            <template #header>
              <span class="text-insider">
                <img
                  class="ml-1"
                  src="../../assets/operations.png"
                  width="15"
                  alt=""
                />
                <span class="individuals">Operations</span>
              </span>
            </template>

            <div class="accodion-list">
              <router-link
                @click="RedirectHandler"
                to="/inbound"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Inbound
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/outbound"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Outbound
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/zones"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Zones
                </p></router-link
              >

              <Accordion class="accordion">
                <AccordionTab>
                  <template #header>
                    <span class="text-insider ml-3">
                      <span class="individuals">Allotment</span>
                    </span>
                  </template>
                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/RiderAllotment"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-text ml-2">
                        Rider Allotment
                      </p></router-link
                    >
                  </div>
                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/RiderZoneAllotment"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-content">
                        Rider Zone Allotment
                      </p></router-link
                    >
                  </div>
                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/DefaultRiderAllotment"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-content">
                        Default Rider Allotment
                      </p></router-link
                    >
                  </div>
                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/DeliveryTypeSettings"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-content">
                        Delivery Type Setting
                      </p></router-link
                    >
                  </div>

                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/DriverMovementChart"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-content">
                        Driver Movement Chart
                      </p></router-link
                    >
                  </div>
                </AccordionTab>
              </Accordion>
              <Accordion class="accordion">
                <AccordionTab>
                  <template #header>
                    <span class="text-insider ml-3">
                      <span class="individuals">Trip Manager</span>
                    </span>
                  </template>
                  <div class="accodion-list">
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/liveJobStatus"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-text ml-2">
                        Live Job Status
                      </p>
                    </router-link>
                    <router-link
                      @click="RedirectHandler"
                      to="/Operation/TransferJob"
                      class="footer-sub-item-list"
                    >
                      <p class="text-white accordion-sub-text ml-2">
                        Transfer Jobs
                      </p>
                    </router-link>
                  </div>
                </AccordionTab>
              </Accordion>
              <router-link
                @click="RedirectHandler"
                to="/specialRiderAllotment"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Special Rider Allotment
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/supervisorAllotment"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Supervisor Allotment
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/Operation/check-in"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">Check In</p>
              </router-link>

              <router-link
                @click="RedirectHandler"
                to="/Operation/Check-out"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">Check Out</p>
              </router-link>

              <router-link
                @click="RedirectHandler"
                to="/statusSettings"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Status Settings
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/Operation/movementChart"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Movement Chart
                </p></router-link
              >

              <router-link
                @click="RedirectHandler"
                to="/specialJobEntry"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Special Job Entry
                </p></router-link
              >
            </div>
          </AccordionTab>
        </Accordion>
        <router-link
          @click="RedirectHandler"
          to="/billing-management"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/billing.png" width="15" alt="" />

          <span class="individuals ml-3">Billing Management</span>
        </router-link>

        <router-link
          @click="RedirectHandler"
          to="/purchase-request"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/purchase.png" width="15" alt="" />
          <span class="individuals ml-3">Purchase Request</span>
        </router-link>
        <router-link
          @click="RedirectHandler"
          to="/asset-management"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/asset.png" width="15" alt="" />
          <span class="individuals ml-3">Asset Management</span>
        </router-link>
        <!-- <router-link
          to="/fleet-management"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/fleet.png" width="15" alt="" />
          <span class="individuals ml-3">Fleet Management</span>
        </router-link> -->
        <Accordion class="accordion">
          <AccordionTab>
            <template #header>
              <span class="text-insider">
                <img
                  class="ml-1"
                  src="../../assets/fleets.png"
                  width="20"
                  alt=""
                />
                <span class="individuals">Fleet Management</span>
              </span>
            </template>
            <div class="accodion-list">
              <router-link
                @click="RedirectHandler"
                to="/fleet-management/liveMapStatus"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Live Map Status
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/fleet-management/vehicles"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Vehicles
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/fleet-management/maintenance"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Maintenance
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/fleet-management/fuel"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Fuel
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/fleet-management/expenditure"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Expenditure
                </p></router-link
              >
            </div>
          </AccordionTab>
        </Accordion>
        <router-link
          @click="RedirectHandler"
          to="/warehouse-management"
          class="footer-sub-item-list section-text"
        >
          <img
            class="ml-3"
            src="../../assets/warehouse.png"
            width="15"
            alt=""
          />
          <span class="individuals ml-3">Warehouse Management</span>
        </router-link>
        <Accordion class="accordion">
          <AccordionTab>
            <template #header>
              <span class="text-insider">
                <img
                  class="ml-1"
                  src="../../assets/operations.png"
                  width="15"
                  alt=""
                />
                <span class="individuals">CRM</span>
              </span>
            </template>
            <div class="accodion-list">
              <router-link
                @click="RedirectHandler"
                to="/CustomerLaunch"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Customer Launch
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/crm-settings"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  CRM Settings
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/crm-feedback"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Feedback
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/crm-jobsheetPrinting"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  JobSheet Printing
                </p></router-link
              >
            </div>
            <Accordion class="accordion">
              <AccordionTab>
                <template #header>
                  <span class="text-insider ml-3">
                    <span class="individuals">Customer Setting</span>
                  </span>
                </template>

                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    to="/CsrActivity"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">
                      CSR Activity
                    </p></router-link
                  >
                </div>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    to="/CustomerLeave"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">
                      Customer Leave
                    </p></router-link
                  >
                </div>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    to="/CustomerSuspension"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">
                      Customer Suspension
                    </p></router-link
                  >
                </div>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    to="/ClientDetails"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">
                      Client Details
                    </p></router-link
                  >
                </div>
              </AccordionTab>
            </Accordion>
            <Accordion class="accordion">
              <AccordionTab>
                <template #header>
                  <span class="text-insider ml-3">
                    <span class="individuals">Mass Collection</span>
                  </span>
                </template>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    to="/CRM/standardCollectionslips"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">
                      Std. Collectionslips
                    </p></router-link
                  >
                </div>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    :to="{
                      name: 'massCollectionContract',
                      params: { type: 'Contract' },
                    }"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">Contract</p>
                  </router-link>
                </div>
                <div class="accodion-list">
                  <router-link
                    @click="RedirectHandler"
                    :to="{
                      name: 'massCollectionContract',
                      params: { type: 'Adhoc' },
                    }"
                    class="footer-sub-item-list"
                  >
                    <p class="text-white accordion-sub-content">Adhoc</p>
                  </router-link>
                </div>
              </AccordionTab>
            </Accordion>
          </AccordionTab>
        </Accordion>
        <router-link
          @click="RedirectHandler"
          to="/CVL"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/cvl.png" alt="" />
          <span class="individuals ml-3">CVL</span>
        </router-link>
        <router-link
          @click="RedirectHandler"
          to="/contact-management"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/contact.png" width="15" alt="" />
          <span class="individuals ml-3">Contact Management</span>
        </router-link>
        <router-link
          @click="RedirectHandler"
          to="/HRMS"
          class="footer-sub-item-list section-text"
        >
          <img class="ml-3" src="../../assets/hrms.png" alt="" />
          <span class="individuals ml-3">HRMS</span>
        </router-link>

        <Accordion class="accordion">
          <AccordionTab>
            <template #header>
              <span class="text-insider">
                <img
                  class="ml-1"
                  src="../../assets/settings.png"
                  width="15"
                  alt=""
                />
                <span class="individuals">Settings</span>
              </span>
            </template>
            <div class="accodion-list">
              <router-link
                @click="RedirectHandler"
                to="/settings/users"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Users
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/roles/"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Roles
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/sales-settings/rates"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Rates
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/fleet-management"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Fleet Settings
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/contact-management"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Contact Settings
                </p></router-link
              >

              <router-link
                @click="RedirectHandler"
                to="/settings/third-party-integration"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Third Party Integration
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/sales-settings/others"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Others
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/geo-fencing"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Geo-Fencing
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/quotation-approval"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Quotation
                </p></router-link
              >
              <router-link
                @click="RedirectHandler"
                to="/settings/templateSettings"
                class="footer-sub-item-list"
              >
                <p class="text-white accordion-sub-text ml-2">
                  Template Settings
                </p></router-link
              >
            </div>
          </AccordionTab>
        </Accordion>
        <br /><br />
        <!--looping through items-->
        <!-- <div v-for="con in content" :key="con.id" class="footer-sub-item-list">
          <router-link
            :to="`/Dashboard/${con.path}`"
            :alt="con.title"
            class="footer-sub-item-list"
          >
            <p class="text-white section-text">
              <i :class="`${con.icon} m-2`"></i>{{ con.title }}
            </p></router-link
          >
        </div> -->
      </div>
    </div>
    <!-- <div class="col-10 flex justify-content-center align-items-center"></div> -->
  </div>
</template>
<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
export default {
  name: "SideDrawer",
  components: { Accordion, AccordionTab },

  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
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
  methods: {
    RedirectHandler() {
      this.$store.state.users.sideBarCount++;
    },
    redirect(path, type) {
      this.$router.push({
        name: path,
        params: {
          type: type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

// .sidebar-nc-logo{
//   // position: absolute;
//   // top: 0;
//   // left: 10px;
//   margin-top: -30px !important;
// }

.router-link-exact-active {
  background: rgba(93, 151, 238, 0.4) !important;
  width: 100%;
}
.section-text {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  opacity: 1 !important;
  position: relative !important;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-left: 10px solid transparent;
  margin: 0px;
  padding: 0px;
}
.individuals {
  color: #fff;
  margin: 10px;
  margin-left: 15px;
}
.router-link-exact-active:before {
  color: #fff !important;
  opacity: 1 !important;
  content: "";
  height: 48px;
  width: 5px;
  border-radius: 0 10px 10px 0;
  border-left: 10px;
  background: #fff;
  display: block;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  margin-left: -10px;
}

.p-accordion-content
  .accodion-list
  .router-link-exact-active
  .accordion-sub-text {
  background: rgba(93, 151, 238, 0.15) !important;
  border: none !important;
}

::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: transparent !important;
  color: rgb(255, 255, 255) !important;
  border: none !important;
  padding: 12px !important;
  position: relative;
  outline: none !important;
  border: 10px solid transparent !important;
  height: 47px !important;
  font-size: 14px;
}
::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link:focus {
  background: rgba(93, 151, 238, 0.4) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border-left: 10px solid transparent !important;
  outline: none !important;
  outline-offset: 0ch transparent !important;
  height: 47px !important;
}
::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled)
  .p-accordion-header-link:focus:before {
  color: #fff !important;
  opacity: 1 !important;
  content: "" !important;
  height: 47px !important;
  width: 5px !important;
  border-radius: 0 10px 10px 0 !important;
  border-left: 10px !important;
  background: #fff;
  display: block;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  margin-left: -10px;
  margin-top: -10px;
}
// .footer-sub-item-list {
//   margin: 2px 0 !important;
// }
body {
  margin: 0;
}

.wrapper {
  height: 100% !important;
  width: 100% !important;
  overflow-x: hidden !important;
  // overflow-y: scroll !important;
}
.lefto {
  background-color: $primary-color-1;
  padding: 0 !important;
}

.sidebar-flex {
  margin: 0 !important;
  width: 100% !important;
}
.logo-text {
  font-family: $font-family;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0.09em;
  text-align: left;
}
.accodion-list .accordion-sub-text {
  padding: 10px 55px !important;
  margin: 5px 0 !important;
  font-size: 14px;
  text-align: left;
  border: none !important;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0px;
}
::v-deep .accordion-sub-text {
  margin-right: -35px !important;
}

.accodion-list .accordion-sub-content {
  padding: 10px 55px !important;
  margin-left: 20px !important;
  font-size: 14px;
  text-align: left;
  border: none !important;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0px;
}

::v-deep .p-accordion .p-accordion-content {
  padding: 0 !important;
}

a {
  text-decoration: none !important;
}

.pi-plus {
  display: none !important;
}
.pi-cog {
  margin-left: 10px !important;
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
}

::v-deep .p-accordion .p-accordion-tab {
  background-color: $primary-color-1 !important;
  width: 100% !important;
}

::v-deep .p-accordion-content {
  background-color: $primary-color-1 !important;
  border: none !important;
  outline: none !important;
  color: #fff;
}
.accodion-list {
  color: #fff !important;
  padding: 0 !important;
  margin: 0 !important;
}
.p-accordion
  .p-accordion-header:not(.p-disabled)
  .p-accordion-header-link:focus {
  box-shadow: none !important;
  outline: none !important;
  border: 10px solid transparent !important;
  background: rgba(93, 151, 238, 0.4) !important;
}

.p-sidebar .p-sidebar-header {
  padding: 0rem !important;
  // display: none !important;
}
.p-sidebar .p-sidebar-content {
  padding: 0rem !important;
}
.p-sidebar {
  background-color: #204b8c !important;
}
.p-sidebar .p-sidebar-header .p-sidebar-close,
.p-sidebar .p-sidebar-header .p-sidebar-icon {
  color: #fff !important;
  margin: 10px;
  // display: block !important;
  // position: absolute !important;
}
</style>
