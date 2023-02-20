<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3">Delivery Type Settings</div>
      <div class="flex align-items-center">
        <SearchField storePath="operationAllotment" class="mt-3 mx-2" />
        <Buttons
          button_class="export_button min-width-99 mt-3 mx-2"
          label="Export"
        />
        <Buttons
          button_class="import_button min-width-99 mt-3 mx-2"
          label="import"
        />
        <Buttons
          v-if="defaultTransportType == 'Bike'"
          button_class="Add_button mr-4 ml-2 add-btn custom-add-btn min-width-99 mt-3"
          label="Add New"
          v-on:childToParent="
            openDialog(
              'DeliveryTypeDialog',
              'TypeSetting',
              'New Delivery Type Bike'
            )
          "
        />
        <Buttons
          v-if="defaultTransportType == 'Van'"
          button_class="Add_button mr-4 ml-2 add-btn custom-add-btn min-width-99 mt-3"
          label="Add New"
          v-on:childToParent="
            openDialog(
              'DeliveryTypeDialog',
              'TypeSetting',
              'New Delivery Type Van'
            )
          "
        />
        <Buttons
          v-if="defaultTransportType == 'Rapido'"
          button_class="Add_button mr-4 ml-2 add-btn  min-width-99 mt-3"
          label="Add New"
          v-on:childToParent="
            openDialog(
              'DeliveryTypeDialog',
              'TypeSetting',
              'New Delivery Type Rapido'
            )
          "
        />
      </div>
    </div>
    <div class="ml-3 pl-0 my-2 flex justify-content-start align-items-center">
      <keep-alive>
        <DuoSelect
          :options="['Bike', 'Van', 'Rapido']"
          :default="defaultTransportType"
          type="setRegionDeliveryTransportType"
          class="mt-4"
      /></keep-alive>
    </div>
    <keep-aliv>
      <div v-if="defaultTransportType == 'Bike'"><BikeDeliveryType /></div>
      <div v-if="defaultTransportType == 'Van'"><VanDeliveryType /></div>
      <h3 v-if="defaultTransportType == 'Rapido'"><RapidoDeliveryType /></h3>
    </keep-aliv>
  </div>
  <Dialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="this.dialogComponentData"
  />
  <Toasts
    :severity="this.showToastMessageData['severity']"
    :summary="this.showToastMessageData['summary']"
  />
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import RapidoDeliveryType from "./DeliveryTypeSettingTable/RapidoDeliveryType.vue";
import BikeDeliveryType from "./DeliveryTypeSettingTable/BikeDeliveryType.vue";
import VanDeliveryType from "./DeliveryTypeSettingTable/VanDeliveryType.vue";
import Dialogs from "./Dialog.vue";
import DuoSelect from "./DuoSelect.vue";
import Toasts from "./Toast.vue";
export default {
  name: "DeliveryTypeSettings",
  components: {
    DuoSelect,
    Dialogs,
    BikeDeliveryType,
    VanDeliveryType,
    RapidoDeliveryType,
    Toasts,
  },
  data() {
    return {
      defaultTransportType: "Bike",
    };
  },
  computed: {
    ...mapGetters({
      tabMenuData: "TypeSetting/addRegionDeliveryTransportTypeData",
      controlActivityDialog: "TypeSetting/controlActivityDialog",
      showToastMessageData: "TypeSetting/showToastMessagedata",
      dialogComponentData: "TypeSetting/dialogComponentData",
    }),
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Delivery Type Settings",
      breadcrumbInfo: "Operations > Delivery Type Settings",
    });
  },
  methods: {
    ...mapActions({
      openDialogdata: "TypeSetting/openDialog",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    openDialog(name, type, header) {
      this.openDialogdata({
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.controlActivityDialog;
      // }
    },
  },

  watch: {
    tabMenuData: function () {
      this.defaultTransportType = this.tabMenuData;
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
/* . {
  margin-left: 392px;
} */
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
  
}

.import_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
  /* left: 15px; */
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
