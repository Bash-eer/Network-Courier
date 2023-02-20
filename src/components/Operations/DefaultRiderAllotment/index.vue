<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3">Default Rider Allotment</div>
      <div class="d-flex align-items-center">
        <SearchField storePath="operationAllotment" class="mt-3 mx-1" />
        <Buttons
          button_class="export_button min-width-99 mt-3 mx-2"
          label="Export"
        />
        <Buttons
          :key="renderkey"
          button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 mt-3"
          label="Rider Allotment"
          v-on:childToParent="redirect('StandbyRiderAllotment')"
        />
      </div>
    </div>
    <div class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center pb-1">
      <keep-alive>
        <DuoSelect
          :options="['Bike', 'Van', 'Rapido']"
          :default="defaultTransportType"
          type="setRegionDeliveryTransportType"
          class="mt-4"
      /></keep-alive>
    </div>
    <!-- <keep-alive> -->
    <div v-if="defaultTransportType == 'Bike'"><BikeDefault /></div>
    <div v-if="defaultTransportType == 'Van'"><VanDefault /></div>
    <div v-if="defaultTransportType == 'Rapido'" class="mt-2">
      <TabView ref="tabview1">
        <TabPanel header="Delivery">
          <Delivery />
        </TabPanel>
        <TabPanel header="Collection">
          <Collection />
        </TabPanel>
      </TabView>
    </div>
    <!-- </keep-alive> -->
  </div>

  <Toasts
    :severity="$store.state['operationAllotment'].toastData.severity"
    :summary="$store.state['operationAllotment'].toastData.summary"
  />
</template>
<script>
import Collection from "./rapidotab/collection.vue";
import Delivery from "./rapidotab/Delivery.vue";
import BikeDefault from "./Table/BikeDefault.vue";
import VanDefault from "./Table/VanDefault.vue";
import DuoSelect from "../RiderAllotment/DuoSelect.vue";
import Toasts from "../RiderAllotment/Toast.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { mapMutations } from "vuex";
export default {
  name: "DefaultRiderAllotment",
  components: {
    DuoSelect,
    Toasts,
    BikeDefault,
    VanDefault,
    TabView,
    TabPanel,
    Delivery,
    Collection,
  },
  data() {
    return {
      defaultTransportType: "Bike",
      deliveryComponent: "",
      renderkey: 10,
    };
  },
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
      this.renderkey++;
    },
    addBikeZoneData() {
      this.$store.dispatch(
        "rapidoRiderAllotment/POSTPATCHCRUDOPERATIONCOLLECTION",
        {
          path: "/sales/contracts/rapido/pick-up-location",
          data: "",
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
    },
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Default Rider Allotment",
      breadcrumbInfo: "Operations > Rider Allotment > Default Rider Allotment",
    });
  },
  
  watch: {
    "$store.state.operationAllotment.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.operationAllotment.addRegionDeliveryTransportType;
        if (this.defaultTransportType == "Rapido") {
          this.deliveryComponent = "DeliveryDataTable";
        }
      },
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.text_zone {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #4e5968;
     
}
.aligment {
  height: 39px;
  margin-left: 350px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
  margin-left: 20px;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-right: 10px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
</style>
