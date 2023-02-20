<template>
  <div>
    <TabMenu
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      
      v-on:tab-change="tabChanged($event)"
    />
    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="tabs.label">
      <keep-alive>
        <component
          :storePath="storePath"
          :tableClass="getTableClass(tabs.label)"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :overlayData="getOverlayData(tabs.label)"
          :tableData="$store.state[storePath][tabs.data]"
          :tableColumns="$store.state[storePath][tabs.columns]"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
  name: "Tabs",
  props: ["tabMenuData", "tabComponent", "tabtwoComponent", "storePath"],
  data: () => ({
    activeIndex: 0,
    rolesPath: "?customer_type=",
  }),
  methods: {
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData(tableName) {
      if (
        tableName == "OnlineCustomerTabs" ||
        tableName == "Contract" ||
        tableName == "Adhoc" ||
        tableName == "Agent" ||
        tableName == "OBC"
      ) {
        return this.$store.state[this.storePath].rolesOnlineUsersOverlayData;
      }
    },
    tabChanged(event) {
      this.$store.state[this.storePath].treeTableTraverse = false;
      this.$store.state[this.storePath].globalSearch = "";
      this.searcher = "";
      this.activeIndex = event.index;
      for (var t in this.tabMenuData) {
        if (t == event.index) {
          if (this.$store.state[this.storePath].deliveryTypestabs != null) {
            this.$store.state[this.storePath].previousTabsState =
              this.tabMenuData[t].label;
            this.$store.state[this.storePath].radioButtonTypesValue =
              this.tabMenuData[t].label;
          }
          this.callTableApi(this.tabMenuData[t].label);
        }
      }
    },
    convertToLowerCase(word) {
      var lowerCaseString = word.toLowerCase();
      return lowerCaseString;
    },
    callTableApi(current_tab) {
      if (this.$store.state[this.storePath].deliveryTypestabs != null) {
        var userType = this.convertToLowerCase(current_tab);
        var customerType = this.convertToLowerCase(
          this.$store.state[this.storePath].deliveryTypestabs
        );
        this.$store.dispatch("users/loadRolesApi", {
          apiPath: "/users",
          data: {
            user_type: userType,
            customer_type: customerType,
          },
        });
        // if()
        this.$store.dispatch("users/loadRolesDropDownApi", {
          apiPath: "/" + customerType + "/" + userType,
          tag: "roles_dropdown",
        });
      }
    },
  },
  components: {
    TabMenu,
  },

  // watch: {
  //   "$store.state.users.deliveryTypestabs": function () {
  //     if (this.$store.state[this.storePath].radioButtonTypesValue != null) {
  //       this.callTableApi(
  //         this.$store.state[this.storePath].radioButtonTypesValue
  //       );
  //     }
  //     this.tabChanged({ index: 0 });
  //     this.tabChanged({ index: 0 });
  //     this.tabChanged({ index: 0 });
  //   },
  // },
  created() {
    if (this.$store.state[this.storePath].radioButtonTypesValue == null) {
      this.$store.state[this.storePath].deliveryTypestabs = "International";
      this.$store.state[this.storePath].radioButtonTypesValue = "Adhoc";
    }
    this.$store.state.treeTableTraverse = false;
    this.$store.state[this.storePath].globalSearch = "";
    this.searcher = "";
    if (this.$store.state[this.storePath].radioButtonTypesValue != null) {
      this.callTableApi(
        this.$store.state[this.storePath].radioButtonTypesValue
      );
    }
    this.tabChanged({ index: 0 });
  },
  updated() {
    this.$store.commit("users/updateBreadCrumb", "RolesOnlineUsers");
  },
};
</script>

<style scoped></style>
