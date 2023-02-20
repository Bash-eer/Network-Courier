<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div
        v-if="tabs != 'needed' && tabs != 'expel'"
        class="flex flex-row mt-1"
      >
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex align-self-center ml-1 mr-4">
              <span @click="recentTab()">
                <router-link to="/settings/users">
                  <i class="pi pi-arrow-left ml-2" />
                </router-link>
              </span>
            </div>
            <div class="flex align-self-center role_type">
              <!-- <img
                :src="'/images/' + agentsData['company_name'] + '.png'"
                alt=""
                class="mr-2 agent-img"
              /> -->
            </div>
          </div>
        </div>
        <div class="flex flex-column ml-2">
          <div class="flex company_name">
            {{ agentsData["company_name"] }}
          </div>
          <div class="flex align-self-center">
            <div class="flex flex-row align-self-center">
              <div class="flex align-self-center">
                <CustomerTags
                  :labelClass="agentsData['delivery_type'] + '_title'"
                  marginClass="customerTags"
                  :label="agentsData['online_customer_type']"
                  :path="agentsData['delivery_type']"
                  :tagClass="agentsData['delivery_type'] + 'dev'"
                />
              </div>
              <div class="flex align-self-center ml-2">
                <i class="pi pi-users ml-2 mt-1"></i>
                {{ $store.state.users.companyUsersCount }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- left contents -->
      <div v-if="tabs == 'needed'" class="flex">
        <div class="flex flex-row flex-wrap">
          <div class="flex ml-3 tabPills mr-6">
            <!-- tabs -->
            <ul class="nav nav-pills  tab-padding px-1" id="pills-tab" role="tablist">
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs.label)"
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

          <!-- tab-legends -->
          <div class="flex">
            <div v-if="showKeys" class="align-self-center">
              <div class="flex flex-row toolPills">
                <div
                  v-for="tabKeys of $store.state[storePath].tabKeys"
                  :key="tabKeys.label"
                  class="flex align-items-center mr-4"
                >
                  <img
                    :src="'/images/' + tabKeys.label + '.png'"
                    alt=""
                    class="mr-2"
                  />
                  <span :class="tabKeys.label" class="top-lables">
                    {{ tabKeys.label }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <TextField
            v-if="userPath == 'usersHomePath'"
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm p-3 search-text"
            v-on:childToParent="globalSearcher"
          />
          <TextField
            v-if="
              userPath == 'usersRolePath' &&
              $store.state.users.usersTabsValue != 'Online Customer'
            "
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm p-3 search-text"
            v-on:childToParent="globalSearcher"
          />
          <TextField
            v-if="
              userPath != 'deliverytypesPath' &&
              userPath != 'usersHomePath' &&
              userPath != 'usersRolePath' &&
              !createRoleKey
            "
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm p-3 search-text"
            v-on:childToParent="globalSearcher"
          />
          <TextField
            v-if="userPath == 'deliverytypesPath'"
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm p-3 search-text"
            v-on:childToParent="globalSearcher"
          />
        </div>
        <!-- add new button -->
        <Buttons
          v-if="
            !showKeys &&
            $store.state.users.usersNetworkCourierAddAccess &&
            userPath == 'usersHomePath'
          "
          button_class="p-button-sm mr-3 add-btn custom-add-btn"
          label="Add New User"
          v-on:childToParent="openDialog()"
        />
        <Buttons
          v-if="
            !showKeys &&
            $store.state.users.usersOnlineUsersAddAccess &&
            userPath == 'usersTypesRolePath'
          "
          button_class="p-button-sm mr-3 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
        <!--create roles button-->
        <Buttons
          v-if="
            userPath != 'deliverytypesPath' &&
            userPath != 'usersHomePath' &&
            userPath != 'usersTypesRolePath' &&
            $store.state.users.rolesNetworkCourierAddAccess == true &&
            !createRoleKey
          "
          button_class="p-button-sm mr-4 ml-2"
          label="Create Role"
          v-on:childToParent="openDialog()"
        />
        <Buttons
          v-if="
            userPath == 'deliverytypesPath' &&
            $store.state.users.rolesOnlineUsersAddAccess == true
          "
          button_class="p-button-sm mr-4 ml-2"
          label="Create Role"
          v-on:childToParent="openDialog()"
        />
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
        <!--delivery types tabs-->
        <BootstrapTabs
          v-if="tabs.label == 'OnlineCustomerTabs'"
          userPath="deliverytypesPath"
          :storePath="storePath"
          v-bind:tabMenuData="$store.state[storePath].deliveryTypesData"
          tabs="needed"
        />
        <!-- tabs component -->
        <Tabs
          v-if="tabs.label == 'OnlineCustomerTabs'"
          :storePath="storePath"
          :tabMenuData="$store.state[storePath].rolesOnlineCustomerTabsState"
          :key="$store.state.users.deliveryTypestabs"
        />
        <!-- dynamic component-->
        <keep-alive
          v-if="
            $store.state[storePath][tabs.data] != null &&
            tabs.label != 'OnlineCustomerTabs' &&
            tabs.label != 'International' &&
            tabs.label != 'Express' &&
            tabs.label != 'Rapido'
          "
        >
          <component
            :storePath="storePath"
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state[storePath][tabs.data]"
            :tableColumns="$store.state[storePath][tabs.columns]"
            v-bind:is="tabs.tab"
            :globalSearchString="$store.state[storePath].globalSearch"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BootstrapTabs",
  props: [
    "tabMenuData",
    "userPath",
    "tabs",
    "agentsData",
    "companyName",
    "storePath",
  ],
  data: () => ({
    defaultTabIndex: 0,
    createRoleKey: false,
    showKeys: false,
    rolesPath: "?customer_type=",
    searcher: "",
    deliveryTabs: false,
    // previousDeliveryTabState: null,
  }),
  methods: {
    // getTableData() {},
    // getTableColumns() {},
    convertToLowerCase(word) {
      var lowerCaseString = word.toLowerCase();
      return lowerCaseString;
    },
    recentTab() {
      document.getElementById("pills-OnlineCustomer-tab").click();
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData(tableName) {
      if (tableName == "NetworkCourier") {
        return this.$store.state[this.storePath].networkCourierOverlayData;
      }
      if (tableName == "OnlineCustomer") {
        return this.$store.state[this.storePath].onlineCustomerOverlayData;
      }
      if (tableName == "AgentsTable") {
        return this.$store.state[this.storePath].organizationOverlayData;
      }
      if (
        tableName == "OnlineCustomerTabs" ||
        tableName == "Contract" ||
        tableName == "Agent" ||
        tableName == "OBC"
      ) {
        return this.$store.state[this.storePath].rolesOnlineUsersOverlayData;
      }

      if (tableName == "NetworkCourierTabs") {
        return this.$store.state[this.storePath].rolesNetworkCourierOverlayData;
      }
    },
    navigateToRoles() {
      // this.$store.state.userRoles = true;
    },
    openDialog() {
      this.$store.state[this.storePath].dialogUserTitle = "Add New User";
      this.$store.state[this.storePath].dialogRoleTitle = "Create Role";
      this.$store.state[this.storePath].userActivityControl = true;
      if (
        Object.keys(this.$store.state[this.storePath].network_courier_details)
          .length != 0
      ) {
        this.$store.state[this.storePath].network_courier_details = {};
        this.$store.state[this.storePath].userActivityControl = true;
      }
      //opening up the 'add users' dialog for network courier users
      if (
        this.userPath == "usersHomePath" ||
        this.userPath == "usersTypesRolePath"
      ) {
        this.$store.state[this.storePath].dialogComponent =
          "UserSettingsDialog";
      }
      //opening up the 'create role' dialog for roles tables
      if (
        this.userPath == "usersRolePath" ||
        this.userPath == "deliverytypesPath"
      ) {
        // if (
        //   this.$store.state[this.storePath].previousTabsState != null &&
        //   this.$store.state[this.storePath].deliveryTypestabs != null
        // ) {
        //   this.$store.state.users.radioButtonTypesValue =
        //     this.$store.state[this.storePath].previousTabsState;
        //   this.$store.state[this.storePath].deliveryChoicesState =
        //     this.$store.state[this.storePath].deliveryTypestabs;
        // }
        if (this.$store.state[this.storePath].previousTabsState != null) {
          this.$store.state.users.radioButtonTypesValue =
            this.$store.state[this.storePath].previousTabsState;
        }

        if (this.$store.state[this.storePath].deliveryTypestabs != null) {
          this.$store.state[this.storePath].deliveryChoicesState =
            this.$store.state[this.storePath].deliveryTypestabs;
        }

        if (this.$store.state.users.previousTabsState == null) {
          this.$store.state.users.previousTabsState = "Adhoc";
          this.$store.state.users.radioButtonTypesValue =
            this.$store.state.users.previousTabsState;
        }
        if (
          this.$store.state[this.storePath].usersTabsValue == "Network Courier"
        ) {
          this.$store.state[this.storePath].deliveryChoicesState =
            "International";
          this.$store.state[this.storePath].previousDeliveryTabState =
            "International";
          this.$store.state[this.storePath].radioButtonUsersValue =
            "Network Courier";
          this.$store.state[this.storePath].previousTabsState = null;
        }
        this.$store.state[this.storePath].dialogComponent = "CreateRoleDialog";
      }
      //opening up the 'add users' dialog for companies/organizations under online customers
      if (this.userPath == "usersTypesRolePath") {
        this.$store.state[this.storePath].dialogComponent = "AgentDialog";
      }

      this.$store.getters[this.storePath + "/controlActivityDialog"];
    },
    globalSearcher(label, searchString) {
      this.$store.state[this.storePath].globalSearch = searchString;
    },
    tabChange(tab) {
      this.$store.state.treeTableTraverse = false;
      this.$store.state[this.storePath].globalSearch = "";
      this.searcher = "";

      this.$store.state[this.storePath]["rolesOnlineCustomerTabsState"] = [];
      this.$store.state[this.storePath]["categoriesState"] = [];
      if (
        tab != "OnlineCustomer" &&
        tab != "NetworkCourier" &&
        tab != "OnlineCustomerTabs" &&
        tab != "NetworkCourierTabs"
      ) {
        this.$store.state[this.storePath].deliveryChoicesState = tab;
        this.$store.state[this.storePath].deliveryTypesTabsActual =
          this.convertToLowerCase(tab);
        this.$store.state[this.storePath].deliveryTypestabs = tab;
        this.$store.state[this.storePath].previousDeliveryTabState = tab;

        if (tab == "International") {
          for (var ro in this.$store.state[this.storePath]
            .rolesOnlineCustomerTabs) {
            var ro_obj =
              this.$store.state[this.storePath].rolesOnlineCustomerTabs[ro];
            if (
              ro_obj.label == "Contract" ||
              ro_obj.label == "Agent" ||
              ro_obj.label == "Adhoc" ||
              ro_obj.label == "OBC"
            ) {
              this.$store.state[this.storePath].categoriesState.push(
                this.$store.state[this.storePath].categories[ro]
              );
              this.$store.state[
                this.storePath
              ].rolesOnlineCustomerTabsState.push(ro_obj);
            }
          }
        }
        if (tab == "Express" || tab == "Rapido") {
          for (var ro_two in this.$store.state[this.storePath]
            .rolesOnlineCustomerTabs) {
            var ro_two_obj =
              this.$store.state[this.storePath].rolesOnlineCustomerTabs[ro_two];
            if (ro_two_obj.label == "Contract" || ro_two_obj.label == "Adhoc") {
              this.$store.state[this.storePath].categoriesState.push(
                this.$store.state[this.storePath].categories[ro_two]
              );
              this.$store.state[
                this.storePath
              ].rolesOnlineCustomerTabsState.push(ro_two_obj);
            }
          }
        }
        this.$store.state[this.storePath].rolesTabSwitch = true;
      }
      if (tab == "OnlineCustomer") {
        this.showKeys = true;
      }
      if (tab == "NetworkCourier") {
        this.showKeys = false;
      }
      if (tab == "NetworkCourierTabs") {
        this.$store.dispatch("users/loadRolesDropDownApi", {
          apiPath: "/internal/internal",
          tag: "roles_dropdown",
        });
        this.createRoleKey = false;
        this.deliveryTabs = false;
        this.$store.state[this.storePath].deliveryChoicesState =
          "International";
        this.$store.state[this.storePath].previousDeliveryTabState =
          "International";
        this.$store.state[this.storePath].radioButtonUsersValue =
          "Network Courier";
        // this.$store.state[this.storePath].deliveryTypestabs = null;
        this.$store.state[this.storePath].previousTabsState = null;
        this.$store.state[this.storePath].usersTabsValue = "Network Courier";
        this.$store.state[this.storePath].rolesTabSwitch = false;
      }
      if (tab == "OnlineCustomerTabs") {
        this.deliveryTabs = true;
        this.createRoleKey = true;
        for (var ro_three in this.$store.state[this.storePath]
          .rolesOnlineCustomerTabs) {
          var ro_three_obj =
            this.$store.state[this.storePath].rolesOnlineCustomerTabs[ro_three];
          if (
            ro_three_obj.label == "Contract" ||
            ro_three_obj.label == "Agent" ||
            ro_three_obj.label == "Adhoc" ||
            ro_three_obj.label == "OBC"
          ) {
            this.$store.state[this.storePath].categoriesState.push(
              this.$store.state[this.storePath].categories[ro_three]
            );
            this.$store.state[this.storePath].rolesOnlineCustomerTabsState.push(
              ro_three_obj
            );
          }
        }

        this.$store.state[this.storePath].radioButtonTypesValue = "Adhoc";
        this.$store.state[this.storePath].deliveryTypestabs = "International";
        this.$store.state[this.storePath].radioButtonUsersValue =
          "Online Customer";
        this.$store.state[this.storePath].rolesTabSwitch = true;
        this.$store.state[this.storePath].usersTabsValue = "Online Customer";
        this.$store.dispatch("users/loadRolesDropDownApi", {
          apiPath: "/" + "international" + "/" + "adhoc",
          tag: "roles_dropdown",
        });
        document
          .getElementById(
            "pills-" +
              this.$store.state[this.storePath].previousDeliveryTabState +
              "-tab"
          )
          .click();
      }
    },
  },
  watch: {
    "$store.state.users.treeTableTraverse": function () {
      this.$store.state[this.storePath].innerMostTabsState = false;
      if (this.$store.state[this.storePath].treeTableTraverse == true) {
        if (
          this.$store.state[this.storePath].usersTabsValue == "Network Courier"
        ) {
          this.$store.state[this.storePath].innerMostTabsState = false;
          if (document.getElementById("pills-NetworkCourierTabs-tab")) {
            document.getElementById("pills-NetworkCourierTabs-tab").click();
          }
        }
        if (
          this.$store.state[this.storePath].usersTabsValue == "Online Customer"
        ) {
          this.$store.state[this.storePath].innerMostTabsState = true;
          if (document.getElementById("pills-OnlineCustomerTabs-tab")) {
            document.getElementById("pills-OnlineCustomerTabs-tab").click();
          }
          if (
            document.getElementById(
              "pills-" +
                this.$store.state[this.storePath].previousDeliveryTabState +
                "-tab"
            )
          ) {
            document
              .getElementById(
                "pills-" +
                  this.$store.state[this.storePath].previousDeliveryTabState +
                  "-tab"
              )
              .click();
          }
        }
      }
    },
  },
  mounted() {
    if (
      document.getElementById(
        "pills-" + this.$store.state.users.previousDeliveryTabState + "-tab"
      ) != null
    ) {
      document
        .getElementById(
          "pills-" + this.$store.state.users.previousDeliveryTabState + "-tab"
        )
        .click();
    }

    if (
      this.userPath == "usersRolePath" ||
      this.userPath == "deliverytypesPath"
    ) {
      this.showKeys = false;
    }

    if (this.userPath == "usersHomePath") {
      for (var tm in this.$store.state.users.tabMenuData) {
        if (tm == 0) {
          if (
            this.$store.state.users.tabMenuData[tm].label == "NetworkCourier"
          ) {
            this.showKeys = false;
          }
          if (
            this.$store.state.users.tabMenuData[tm].label == "OnlineCustomer"
          ) {
            this.showKeys = true;
          }
        }
      }
    }

    if (this.$store.state[this.storePath].previousTabsState == null) {
      for (var tmr in this.$store.state.users.tabMenuRolesData) {
        if (tmr == 0) {
          if (
            document.getElementById(
              "pills-" +
                this.$store.state.users.tabMenuRolesData[tmr].label +
                "-tab"
            ) != null
          ) {
            document
              .getElementById(
                "pills-" +
                  this.$store.state.users.tabMenuRolesData[tmr].label +
                  "-tab"
              )
              .click();
          }
        }
      }
    }
  },
  created() {
    if (this.$store.state.users.usersTabsValue == "Online Customer") {
      this.$store.state.users.createRoleKey = true;
    }
    if (this.$store.state.users.usersTabsValue == "Network Courier") {
      this.$store.state.users.createRoleKey = false;
    }
    this.$store.state.users.bootstrapTabsRolesKey = true;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-datatable .p-column-header-content {
  justify-content: space-between !important;
}

::v-deep .RolesTable > .p-sortable-column .p-sortable-column-icon {
  margin-left: 10rem !important;
  margin-right: 1px !important;
}
// .p-button:enabled:hover {
//   background: white !important;
// }
.updateButton {
  background: none !important;
}
.p-datatable {
  table-layout: fixed !important;
  word-wrap: break-word !important;
}
// ::v-deep
//   .p-datatable.p-datatable-striped
//   .p-datatable-tbody
//   > tr:nth-child(even) {
//    background: #f8f8f8;
// }
.null_div {
  color: white;
}
.tab-class {
  // margin-left: 95px;
  margin-right: 2%;
}
.company_name {
  color: #4e5968;
  font-weight: 600;
}
.agent-img {
  width: 50px;
  height: 50px;
}
@media only screen and (max-width: 600px) {
  body {
    background-color: #fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.nav-pills {
  background: #edf1f7 !important;
  border-radius: 4px !important;
}

.nav-pills .nav-link.active {
  background: #357dea;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
}

.nav-link {
  color: #7e84a7;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: left;
}

.Express {
  color: #ebbd46;
  font-weight: bold;
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.International {
  color: #7469f2;
  font-weight: bold;
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.Rapido {
  color: #55ba6b;
  font-weight: bold;
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
::v-deep .search-text {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  padding: 0 10px;
  margin-left: 2px;
  width: 273px !important;
  height: 36px !important;
}
.add-btn {
  width: 99px !important;
  height: 36px !important;
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: #357dea;
  border-radius: 4px;
  padding: 1px 7px !important;
}
.roles-btn {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: center;
  color: #357dea !important;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #357dea;
}
// ::v-deep .p-datatable .p-datatable-thead > tr > th {
//   background: transparent !important;
// }
// .p-datatable .p-sortable-column .p-column-title

// ::v-deep .p-datatable .p-column-header-content {
//   // width: 80px !important;
// }
::v-deep .p-column-title:first-child {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}

::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
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

::v-deep .User {
  margin-left: 30px !important;
}

::v-deep .p-datatable-responsive-scroll > .p-datatable-wrapper {
  margin: 0 !important;
}
::v-deep .NetworkCourierTabs .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
// ::v-deep .NetworkCourierTabs .p-sortable-column-icon {
//   // margin-left: 65% !important;
// }
::v-deep .NetworkCourierTabs > .p-datatable-wrapper {
  margin: 0 !important;
}
::v-deep .NetworkCourierTabs .p-datatable-thead > tr > th {
  background: #f8f8f8 !important;
}
// ::v-deep .NetworkCourierTabs .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

// ::v-deep .RolesTable .p-datatable-tbody > tr {
//   border: 1px solid white !important ;
// }
::v-deep .RolesTable > .p-datatable-wrapper {
  margin: 0 !important;
}
::v-deep .RolesTable .p-datatable-thead > tr > th {
  background: #f8f8f8 !important;
  height: 83px !important;
}

::v-deep .Adhoc .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
::v-deep .Adhoc > .p-datatable-wrapper {
  margin: 0 !important;
}
::v-deep .Adhoc .p-datatable-thead > tr > th {
  background: #f8f8f8 !important;
}
// ::v-deep .Adhoc .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

::v-deep .Contract .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
::v-deep .Contract > .p-datatable-wrapper {
  margin: 0 !important;
}
::v-deep .Contract .p-datatable-thead > tr > th {
  background: #f8f8f8 !important;
}
// ::v-deep .Contract .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

::v-deep .p-checkbox {
  margin-left: 25px;
}

::v-deep .NetworkCourier .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: #7e84a7;
  // min-width: 80px !important;
}
// ::v-deep .NetworkCourier .p-sortable-column-icon {
//   // margin-left: 4rem !important;
//   // margin-right: 1px !important;
// }
::v-deep .NetworkCourier > .p-datatable-wrapper {
  margin-left: 0px !important;
}
::v-deep .NetworkCourier .p-datatable-thead > tr > th {
  background: #f8f8f8 !important;
  // border: 0px !important ;
}
// ::v-deep .NetworkCourier .p-datatable-tbody > tr > td {
//    border: 0px !important ;
// }

::v-deep .OnlineCustomer .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 107px !important;
}
::v-deep .OnlineCustomer > .p-datatable-wrapper {
  margin: 0px !important;
}
::v-deep .OnlineCustomer .p-datatable-thead > tr > th {
  // border: 0px !important ;
  background: #f8f8f8 !important;
}
// ::v-deep .OnlineCustomer .p-datatable-tbody > tr > td {
//   border: 0px !important ;
// }
// ::v-deep .OnlineCustomer .p-sortable-column-icon {
//   // margin-left: 2.5rem !important;
//   // margin-right: 1px !important;
// }

::v-deep .AgentsTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
::v-deep .AgentsTable > .p-datatable-wrapper {
  margin: 0px !important;
}
::v-deep .ui-datatable * {
  border: 0px !important;
}
::v-deep .AgentsTable .p-datatable-thead > tr > th {
  background: transparent !important;
  border: 0px !important;
}
::v-deep .AgentsTable .p-datatable-tbody > tr > td {
  border: 0px !important ;
}
// ::v-deep .AgentsTable .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

::v-deep .Agent .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
// ::v-deep .Agent .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

::v-deep .OBC .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
  // min-width: 80px !important;
}
// ::v-deep .OBC .p-sortable-column-icon {
//   // margin-left: 13rem !important;
//   // margin-right: 1px !important;
// }

.top-lables {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
::v-deep .p-datatable .p-column-header-content {
  justify-content: flex-start !important;
}
::v-deep .p-column-filter-menu {
  margin-left: 0 !important;
}
</style>
