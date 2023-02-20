<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3">Call Trip</div>
      <div class="d-flex justify-content-center  align-items-center">
      <SearchField storePath="operationAllotment" class="mt-3 aligment" />
      <Buttons button_class="export_button min-width-99 mt-3 mx-2" label="Export" />
      <Buttons
        v-if="defaultTransportType == 'Bike'"
        button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 mt-3"
        label="Add New"
        v-on:childToParent="
          openDialog(
            'AllotmentDialog',
            'operationAllotment',
            'New Call Trip Bike'
          )
        "
      />
      <Buttons
        v-if="defaultTransportType == 'Van'"
        button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 mt-3"
        label="Add New"
        v-on:childToParent="
          openDialog(
            'AllotmentDialog',
            'operationAllotment',
            'New Call Trip Van'
          )
        "
      />
      <Buttons
        v-if="defaultTransportType == 'Rapido'"
        button_class="Add_button mr-4 add-btn  min-width-99 mt-3"
        label="Add New"
        v-on:childToParent="
          openDialog(
            'AllotmentDialog',
            'operationAllotment',
            'New Call Trip Rapido'
          )
        "
      />
    </div>
    </div>
    <div class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center">
      <keep-alive>
        <DuoSelect
          :options="['Bike', 'Van', 'Rapido']"
          :default="defaultTransportType"
          type="setRegionDeliveryTransportType"
          class="mt-4"
      /></keep-alive>
    </div>
    <keep-aliv>
      <div v-if="defaultTransportType == 'Bike'"><BikeRider class="mt-3" /></div>
      <div v-if="defaultTransportType == 'Van'"><VanRider class="mt-3" /></div>
      <h3 v-if="defaultTransportType == 'Rapido'"><RapidoRider class="mt-3" /></h3>
    </keep-aliv>
  </div>
  <Dialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['operationAllotment'].dialogComponent"
  />
  <Toasts
    :severity="$store.state['operationAllotment'].toastData.severity"
    :summary="$store.state['operationAllotment'].toastData.summary"
  />
</template>
<script>
import DuoSelect from "./DuoSelect.vue";
import BikeRider from "./AllotmentTable/BikeRider.vue";
import VanRider from "./AllotmentTable/VanRider.vue";
import Dialogs from "./Dialog.vue";
import RapidoRider from "./AllotmentTable/RapidoRider.vue";
import Toasts from "./Toast.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Allotment",
  components: { DuoSelect, BikeRider, VanRider, Dialogs, RapidoRider, Toasts },
  data() {
    return {
      defaultTransportType: "Bike",
    };
  },
  methods: {
    ...mapActions({
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
    }),
    openDialog(name, type, header) {
      this.$store.dispatch("operationAllotment/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["operationAllotment/controlActivityDialog"];
    },
  },
  watch: {
    "$store.state.operationAllotment.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.operationAllotment.addRegionDeliveryTransportType;
      },
  },
  created() {
    let breadCrumbData = {
      title: "Operations",
      breadcrumbInfo: "Operations > Rider Allotment",
    };
    this.updateBreadCrumb(breadCrumbData);
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
  margin-left: 598px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
</style>