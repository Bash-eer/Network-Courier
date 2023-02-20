<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between pt-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6 align-items-center">
            <i
              class="
                pi pi-arrow-left
                mr-3
                flex
                align-items-center
                cursor-pointer
              "
              @click="redirecToPreviousPage"
            ></i>
            <span class="table-title">Assign Area</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!--Area List button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Area List"
          v-on:childToParent="navigateToAreaList()"
        />
      </div>
    </div>

    <div class="flex ml-2 mt-4">
      <div class="flex flex-row flex-wrap">
        <div class="flex tabPills mr-6">
          <!-- tabs -->
          <ul
            class="nav nav-pills tab-padding px-1 custom-nav"
            id="pills-tab"
            role="tablist"
          >
            <li
              class="nav-item"
              role="presentation"
              v-for="(tabs, index) of assignAreaTabMenuData"
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
      </div>
    </div>

    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <div
        v-for="(tabs, index) of assignAreaTabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <keep-alive>
          <div class="formgrid grid ml-3 mt-4">
            <div class="col-12 md:col-3" :key="zoneIdKey">
              <h5 class="font-size-14 color-7a7a7a text-start">Zone</h5>
              <DropDown
                label="zone_name"
                :data="$store.state['assignRouteArea'][tabs.zoneDropdownData]"
                :loading="
                  $store.state['assignRouteArea'][tabs.isZoneDropdownLoading]
                "
                v-model="assignArea.zoneId"
                placeholder="Select a zone"
                :filter="true"
                @change="getZoneData($event)"
              />
            </div>
            <div class="col-12 md:col-3" :key="routeIdKey">
              <h5 class="font-size-14 color-7a7a7a text-start">Route</h5>
              <DropDown
                label="route_name"
                :data="$store.state['assignRouteArea'][tabs.routeDropdownData]"
                :loading="
                  $store.state['assignRouteArea'][tabs.isRouteDropdownLoading]
                "
                :modelValue="assignArea.routeId"
                placeholder="Select a route"
                v-model="assignArea.routeId"
                :filter="true"
                @change="getAvailableData($event)"
              />
            </div>
          </div>
        </keep-alive>
        <div
          class="
            flex flex-row flex-wrap
            mt-4
            pb-4
            justify-content-between
            align-items-center
          "
        >
          <div class="flex-1 flex align-items-center justify-content-center">
            <keep-alive>
              <component
                :tableName="tabs.label"
                v-bind:is="tabs.tab1"
                :currentTab="currentTab"
                :availableAreaList="availableAreaList"
                :selectedAreaList="selectedAreaList"
                :isAvailableSelectAll="isAvailableSelectAll"
                v-on:selectedSingleArea="getSelectedAreaList($event)"
                v-on:emitSelectAll="getAllSelectedAreaList($event)"
                v-on:searchValue="searchAvailableData($event)"
                :availableSearchValue="availableSearchValue"
              ></component>
            </keep-alive>
          </div>
          <div>
            <Buttons
              label="Add"
              icon="fas fa-forward"
              iconPos="right"
              :loading="isAddArea"
              v-on:childToParent="addAvailableItem()"
              button_class="p-button-sm mx-1 add-btn assign-add-btn"
            />
          </div>

          <div class="flex-1 flex align-items-center justify-content-center">
            <keep-alive>
              <component
                :tableName="tabs.label"
                v-bind:is="tabs.tab2"
                :currentTab="currentTab"
                :selectedAreaNameData="selectedAreaNameData"
                :selectedSearchValue="selectedSearchValue"
                v-on:removeSelectedAreaData="removeSelectedData($event)"
              ></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>

    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end mr-5 pb-3">
        <Buttons
          label="Cancel"
          v-on:childToParent="redirecToPreviousPage"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isAssignArea"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "primevue/button";
export default {
  name: "AssignArea",
  components: {
    Button,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "BikeTab",
    assignArea: {
      zoneId: null,
      routeId: null,
    },
    isAddArea: false,
    isAssignArea: false,
    isAvailableSelectAll: false,
    availableAreaList: [],
    selectedAreaList: [],
    selectedAreaNameData: [],
    selectedAreaItem: [],
    selectedSearchValue: "",
    availableSearchValue: "",
    routeIdKey: 1,
    zoneIdKey: 1,
  }),
  methods: {
    ...mapActions({
      updateBreadCrumb: "users/updateBreadCrumb",
      loadBikeZoneData: "assignRouteArea/getBikeZoneData",
      loadVanZoneData: "assignRouteArea/getVanZoneData",
      loadRapidoZoneData: "assignRouteArea/getRapidoZoneData",
      loadBikeRouteData: "assignRouteArea/getBikeRouteData",
      loadVanRouteData: "assignRouteArea/getVanRouteData",
      loadRapidoRouteData: "assignRouteArea/getRapidoRouteData",
      loadAvailableAreaList: "assignRouteArea/getCommonAreaList",
      commonAssignArea: "assignRouteArea/createCommonAssignArea",
      loadSelectedAreaList: "assignRouteArea/getSpecificAreasList",
      loadAllAreaList: "assignRouteArea/getAllAreasList",
    }),
    async tabChange(tab) {
      if (this.currentTab != tab) {
        this.currentTab = tab;
        this.assignArea = {
          zoneId: "",
          routeId: "",
        };
        await this.clearAssignValues();
        if (this.currentTab == "VanTab") {
          this.loadVanZoneData();
        } else {
          this.loadRapidoZoneData();
        }

        if (this.assignArea.zoneId?.id && this.assignArea.routeId?.id) {
          this.isAvailableSelectAll = false;
          this.loadCommonAreaList();
        }
      }
    },
    async getZoneData(data) {
      let id = data.value?.id;
      this.assignArea.routeId = null;
      await this.clearAssignValues();
      this.selectedAreaNameData = [];
      if (this.currentTab == "BikeTab") {
        this.loadBikeRouteData(id);
      } else if (this.currentTab == "VanTab") {
        this.loadVanRouteData(id);
      } else {
        this.loadRapidoRouteData(id);
      }
      this.routeIdKey++;
    },
    async getAvailableData(data) {
      if (this.assignArea.zoneId?.id && this.assignArea.routeId?.id) {
        this.isAvailableSelectAll = false;
        await this.clearAssignValues();
        this.selectedAreaNameData = [];
        this.loadCommonAreaList();
      }
    },
    loadCommonAreaList() {
      let availableAreaParams = {
        areaList: {
          zone_id: this.assignArea.zoneId?.id,
          route_id: this.assignArea.routeId?.id,
        },
        type: this.currentTab,
      };

      this.loadAvailableAreaList(availableAreaParams).then((response) => {
        let availableList = response?.allAreas || [];
        this.availableAreaList = availableList.filter((response) => {
          let isInclude = this.selectedAreaNameData.some(
            (e) => e.id === response.id
          );
          if (!isInclude) {
            response.name = response.area_name;
            response.key = response.id;
            return response;
          }
        });

        this.selectedAreaItem = response?.selectedData || [];
        this.setSelectedAreaList();
        if (this.selectedAreaItem.length > 0) {
          this.addAvailableItem();
        }
      });
      this.isAvailableSelectAll = true;
    },
    navigateToAreaList() {
      this.$router.push({ name: "areaList" });
    },
    submitData() {
      if (this.selectedAreaNameData.length > 0) {
        this.isAssignArea = true;
        let assignAreaParams = {
          areaList: {
            zone_id: this.assignArea.zoneId?.id,
            route_id: this.assignArea.routeId?.id,
            areas: this.selectedAreaItem,
          },
          type: this.currentTab,
        };
        this.commonAssignArea(assignAreaParams).then(async (response) => {
          let tab =
            this.currentTab == "BikeTab"
              ? "bike"
              : this.currentTab == "VanTab"
              ? "van"
              : "rapido";
          if (response && response.status === 200) {
            this.assignArea = {
              zoneId: "",
              routeId: "",
            };
            this.routeIdKey++;
            this.zoneIdKey++;
            this.selectedAreaNameData = [];
            await this.clearAssignValues();
            let info = `Assign area of ${tab} is created successfully!`;
            this.commonToast("success", "Success", info);
          } else {
            let info =
              response.data.message || `Failed to assign area on ${tab}`;
            this.commonToast("error", "Error", info);
          }
          this.isAssignArea = false;
        });
      } else {
        this.$toast.add({
          severity: "info",
          detail: "Please select any available area",
          life: 3000,
        });
      }
    },
    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    redirecToPreviousPage() {
      this.$router.go(-1);
    },
    async addAvailableItem() {
      await this.setSelectedAreaItem(this.selectedAreaList);
      this.isAddArea = true;
      let areaList = {
        area_list: this.selectedAreaItem,
      };
      this.selectedSearchValue = "";
      let response = await this.loadSelectedAreaList(areaList);
      if (response && response.status === 200) {
        let selectedListData = response.data.results;
        this.selectedAreaNameData = selectedListData || [];
        this.isAvailableSelectAll = false;
        this.availableAreaList = this.availableAreaList.filter((response) => {
          let isInclude = this.selectedAreaNameData.some(
            (e) => e.id === response.id
          );
          if (!isInclude) {
            return response;
          }
        });
        this.isAddArea = false;
      } else {
        this.selectedAreaNameData = [];
        this.isAddArea = false;
      }
    },
    getSelectedAreaList(event) {
      let selectedAreaList = event;
      if (selectedAreaList.length == 0) {
        this.selectedAreaItem = [];
      }
      this.selectedAreaList = selectedAreaList;
    },
    getAllSelectedAreaList(event) {
      if (event.length > 0) {
        let selectedAreaList = this.availableAreaList;
        this.selectedAreaList = this.availableAreaList;
        this.setSelectedAreaItem(selectedAreaList);
      } else {
        this.selectedAreaList = [];
        this.selectedAreaItem = [];
      }
    },
    async searchAvailableData(searchValue) {
      this.availableSearchValue = searchValue;
      let areaList = {
        area_list: this.selectedAreaItem,
        searchValue: searchValue,
      };
      this.isAvailableSelectAll = false;
      let response = await this.loadAllAreaList(areaList);
      if (response && response.status === 200) {
        let availableData = response?.data.results || [];
        this.availableAreaList = availableData.filter((response) => {
          let isInclude = this.selectedAreaNameData.some(
            (e) => e.id === response.id
          );
          if (!isInclude) {
            response.name = response.area_name;
            response.key = response.id;
            return response;
          }
        });
        this.setSelectedAreaList();
      }
    },
    async removeSelectedData(removeItem) {
      this.isAvailableSelectAll = true;
      let areaId = removeItem.id;
      let index = this.selectedAreaItem.findIndex((id) => id == areaId);
      let areaIndex = this.selectedAreaNameData.findIndex(
        (res) => res.id == areaId
      );
      if (areaIndex > -1) {
        this.isAvailableSelectAll = false;
        this.selectedAreaItem.splice(index, 1);
        let availableList = this.availableAreaList;
        let selectedIndexData = this.selectedAreaNameData[areaIndex];
        let selectedData = {
          ...selectedIndexData,
          key: selectedIndexData["id"],
          name: selectedIndexData["area_name"],
        };
        this.availableAreaList = [...availableList, { ...selectedData }];

        await this.setSelectedAreaList();
        await this.addAvailableItem();
      }
    },
    clearAssignValues() {
      return new Promise((resolve) => {
        this.availableAreaList = [];
        this.selectedAreaList = [];
        this.selectedSearchValue = "";
        this.availableSearchValue = "";
        this.selectedAreaItem = [];
        resolve("finish");
      });
    },
    setSelectedAreaItem(selectedAreaList) {
      return new Promise((resolve) => {
        let areaItemSelected = this.selectedAreaItem || [];
        let selecteList = selectedAreaList
          .filter((res) => {
            let id = res.id;
            if (id && !areaItemSelected.includes(id)) {
              return res;
            }
          })
          .map((res) => res.id);
        this.selectedAreaItem = [...areaItemSelected, ...selecteList];
        resolve("finish");
      });
    },
    setSelectedAreaList() {
      this.selectedAreaList = this.availableAreaList.filter((res) => {
        let isSelectedData = this.selectedAreaItem.includes(res.id);
        if (isSelectedData) {
          return res;
        }
      });
    },
  },
  created() {
    this.updateBreadCrumb("Operations Zones Assign Area");
    this.loadBikeZoneData();
  },
  mounted() {},
  computed: {
    ...mapGetters({
      assignAreaTabMenuData: "assignRouteArea/getAssignAreaTabMenuData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.custom-nav {
  border: 1px solid #cecece;
}
.table-title {
  color: $color-4e5968;
  font-weight: 700;
  font-size: 18px;
  font-family: "Montserrat";
}
::v-deep .assign-add-btn {
  background: $color-357dea !important;
}
::v-deep .p-dropdown .p-dropdown-label {
  color: $color-212121;
  font-weight: 700;
  font-size: 14px;
}
</style>
