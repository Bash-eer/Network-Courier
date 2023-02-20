<template >
  <div class="white" :key="reloadKey">
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 color-4e5968 bold-700 font-size-18 ml-3">
        Bulk Import Jobs
      </div>
      <div class="flex">
        <div
          class="
            h-5rem
            border-radius-5
            bg-b4efc0
            color-55ba6b
            p-1
            px-4
            m-2
            chargetype
          "
        >
          <h5
            class="
              color-7a7a7a
              bold-500
              flex
              justify-content-center
              font-size-14
              color-55ba6b
            "
          >
            Created by
          </h5>
          <Dropdown
            class="
              dropdown-priority
              border-radius-4
              color-fff
              flex
              justify-content-center
            "
            v-model="created_by"
            :options="value"
            optionLabel="name"
            placeholder="High"
          />
        </div>
        <div
          class="
            h-5rem
            border-radius-5
            bg-b4efc0
            color-55ba6b
            p-1
            px-4
            m-2
            chargetype
          "
        >
          <h5
            class="
              color-7a7a7a
              bold-500
              flex
              justify-content-center
              font-size-14
              color-55ba6b
            "
          >
            Charge Type
          </h5>
          <DropDownField
            :disabled="$route.params.type == 'Contract' ? true : false"
            :value="chargeTypesSelected"
            code="name"
            :data="getChargeTypeDropDown"
            label="charge_type"
            v-model="chargeTypesSelected"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div :key="renderKey" class="card-cusd-crm border-radius-18 pt-1">
      <div class="card m-3">
        <div class="flex card-container align-items-center indigo-container">
          <div @click="$router.go(-1)" class="flex flex-row ml-4 mr-4">
            <i
              class="pi pi-arrow-left color-fff pointer"
              style="font-size: 2rem color-fff"
            ></i>
          </div>
          <div class="flex align-items-center ml-4">
            <img class="h-3rem w-3rem mr-2" src="/images/car.png" alt="" />
          </div>
          <div
            class="
              flex-grow-1
              h-4rem
              text-white
              align-items-center
              justify-content-center
              font-size-14
              text-left
              pb-2
              mb-2
              border-round
            "
          >
            <div class="text-left pt-1 flex flex-column">
              <Dropdown
                class="text-left profile-drop-down w-100"
                v-model="customerDropdown"
                :options="customerIdAndCompanyNamesList"
                optionLabel="name"
                code="customer_id"
                :filter="true"
                :placeholder="
                  $route.params.type == 'Contract'
                    ? 'Company Contract Name'
                    : 'Profile Name'
                "
              />
            </div>
            <div
              :class="getCrmBookingData?.customer_id ? 'pl-2' : 'hidden pl-2'"
              :key="reloadKey"
            >
              {{ getCrmBookingData?.customer_id }}
            </div>
          </div>

          <div class="flex align-items-center ml-4">
            <img class="h-3rem w-3rem mr-2" src="/images/avatar.png" alt="" />
          </div>
          <div
            class="
              flex-grow-1
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              pt-2
              pb-2
              border-round
            "
          >
            <div :key="renderKey">
              <CustomerDataCardCollerDropDown
                :emittedManual="DataSendtoAnotherChild"
              />
            </div>
          </div>
          <div
            class="
              flex-auto
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              p-4
              pt-2
              pb-2
              border-round
              mr-4
            "
          >
            <div class="text-left color-fff font-size-12 bold-600 pt-1">
              Contact Number
            </div>
            <div
              v-if="getCrmBookingData?.caller_details"
              class="text-left color-fff font-size-12 bold-600"
            >
              {{ getCrmBookingData?.caller_details?.contact_number }}
            </div>
          </div>
          <div
            class="
              flex-auto
              h-4rem
              text-white
              align-items-center
              font-bold
              text-center
              p-4
              pt-2
              pb-2
              border-round
              mx-4
            "
          >
            <div class="text-left color-fff font-size-12 bold-600 pt-1">
              Email
            </div>
            <div
              v-if="getCrmBookingData?.caller_details"
              class="text-left color-fff font-size-12 bold-600 pl-0"
            >
              {{ getCrmBookingData?.caller_details?.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :key="renderKey">
      <div class="flex justify-content-between align-items-center">
        <div class="flex justify-content-between align-items-center">
          <div
            class="
              flex-column flex-row flex-grow-1
              align-items-center
              justify-content-center
              font-bold
              text-gray-900
              mb-2
              mr-4
              border-round
              w-25rem
            "
          >
            <h5 class="color-7a7a7a bold-500 flex font-size-14">
              Customer Name
              <b class="color-red ml-1"> &#42; </b>
            </h5>

            <Dropdown
              v-model="costCenterSelected"
              :options="costCenterDropdown"
              code="name"
              optionLabel="name"
              class="text-left w-100"
              :filter="true"
            />
          </div>

          <div
            class="
              flex-column flex-row flex-grow-1
              align-items-center
              justify-content-center
              font-bold
              text-gray-900
              pr-3
              mb-2
              border-round
              w-25rem
            "
          >
            <h5 class="color-7a7a7a bold-500 flex font-size-14">
              Pickup Location <b class="color-red ml-1"> &#42; </b>
            </h5>
            <AddNewDropDownTextField
              stateName="customerCostCenterDropdownData"
              :state="pickup_location"
              :data="pickupLocationDropDown"
              :companyDetails="getCrmBookingData"
              storePath="Masscollection"
              v-model="pickup_location"
              class="text-left w-100"
              type="mass_collection"
              code="name"
              :optionClose="true"
            />
          </div>
        </div>
        <div class="flex justify-content-between align-items-center">
          <div
            class="
              flex flex-row flex-wrap
              card-container
              blue-container
              my-auto
              justify-content-end
            "
          >
            <TemplateDragAndDropUpload
              :state="bulkActionAttachmentsState"
              type="massCollectionAttachments"
              storePath="Masscollection"
              :default="defaultTemplate"
              @fileData="updateTableData"
            />
          </div>
          <div class="mt-3">
            <Buttons
              button_class="w-100 bg-357dea buttonStyle"
              label="Show Trips"
              :disabled="false"
              @click="enableDialog"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        flex-column flex-row flex-grow-1
        align-items-center
        justify-content-center
        font-bold
        text-gray-900
        mb-2
        border-round
        w-100
      "
    >
      <keep-alive>
        <div :key="renderkey">
          <DataTable
            tableClass="p-datatable-sm AdhocRateCardTable"
            tableDataName="bulkActionDataTable"
            :overlayData="overlayData"
            tableName="bulkActionDataTable"
            :tableData="tableData"
            :tableColumns="tableColumns"
            dataKey="id"
          />
        </div>
      </keep-alive>
    </div>
  </div>
  <Toast
    :severity="$store.state['Masscollection'].toastData.severity"
    :summary="$store.state['Masscollection'].toastData.summary"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import moment from "moment";
import Toast from "../StandardCollectionSlips/components/Toast.vue";
import Dropdown from "primevue/dropdown";
import CustomerDataCardCollerDropDown from "../CustomerLaunch/CustomerDataCardCollerDropDown.vue";
import { crmCusLState, crm_launch } from "../../../../store/modules/CRM/helper";
import TemplateDragAndDropUpload from "../StandardCollectionSlips/components/DragAndDropUpload.vue";
import DataTable from "../StandardCollectionSlips/components/DataTable.vue";
import { massCollectionTableColumnData } from "../../../../components/Reusables/CRM/Const";
export default {
  name: "contract",
  components: {
    DataTable,
    TemplateDragAndDropUpload,
    CustomerDataCardCollerDropDown,
    Dropdown,
    Toast,
  },
  data() {
    return {
      created_by: "",
      value: [],
      customerDropdown: "",
      customerIdAndCompanyNamesList: [],
      chargeTypesSelected: "",
      pickupLocationDropDown: [],
      pickup_location: "",
      getChargeTypeDropDown: [
        { name: "Normal", code: 1 },
        { name: "E-Commerce", code: 2 },
      ],
      bulkActionAttachmentsState: " ",
      tableColumns: massCollectionTableColumnData,
      tableData: [],
    };
  },
  computed: {
    ...crmCusLState,
    ...mapGetters({
      massCollectionAttachmentsStateData:
        "Masscollection/massCollectionAttachmentsStateData",
      // getCrmBookingData: "Masscollection/getCrmBookingData",
      // getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      // getZonesData: "Masscollection/getZonesData",
      // getRoutesData: "Masscollection/getRoutesData",
      // massCollectionPayloadData: "Masscollection/massCollectionPayloadData",
    }),
  },
  methods: {
    ...crm_launch,
    updateTableData(value) {
      this.$emit("emittedtabdata", value);
      this.tableData = value;
    },
  },
  async created() {
    this.$store.state.commonStore.attachmentsTag = "massCollectionAttachments";
    if (Object.keys(this.massCollectionAttachmentsStateData).length != 0) {
      this.massCollectionAttachmentsState =
        this.massCollectionAttachmentsStateData.attachments;
      this.$store.state.Masscollection.massCollectionAttachmentsFiles =
        this.massCollectionAttachmentsStateData.attachments;
    }
  },
  unmounted() {},
  watch: {
    // "$store.state.Masscollection.crmBookingDetailsArray": function () {
    //   if (this.getCrmBookingData?.id) {
    //     this.prefillData(this.getCrmBookingData);
    //   }
    // },
  },
};
</script>

<style scoped>
.white {
  background-color: #ffffff;
}
::v-deep .card {
  background-color: transparent;
  border-radius: 0.25rem;
  border: none !important;
}

::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  font-size: 14px;
  text-align: left !important;
}
.card-cusd-crm {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  /* min-height: 13vh; */
}
.dropdown-priority {
  background: #ff5555 !important;
  color: #fff !important;
  width: 80% !important;
}
::v-deep .p-inputtext-lg .p-inputtext {
  font-weight: 400 !important;
}
.crm_express_screen_width {
  max-width: 1600px !important;
}
::v-deep .dropdown-priority .p-dropdown-label.p-inputtext.p-placeholder {
  color: #fff !important;
  font-size: 14px;
  display: flex !important;
  justify-content: center !important;
}
::v-deep .dropdown-priority .p-dropdown-label.p-inputtext {
  color: #fff !important;
  font-size: 14px;
  display: flex !important;
  justify-content: center !important;
}
::v-deep .dropdown-priority .p-dropdown-trigger .pi-chevron-down:before {
  color: #ffffff !important;
}
::v-deep.p-accordion
  .p-accordion-header
  .p-accordion-header-link
  .p-accordion-toggle-icon {
  position: absolute;
  right: 10px;
}
::v-deep
  .p-accordion
  .p-accordion-tab:first-child
  .p-accordion-header
  .p-accordion-header-link {
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  border: 1px solid #dee2e6;
  color: #4e5968 !important ;
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion-header-text {
  line-height: 1;
  font-size: 16px !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight:hover
  .p-accordion-header-link {
  border-color: #d0e0ff !important;
  background: #d0e0ff !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link {
  background: #d0e0ff !important;
  border-color: #d0e0ff;
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep
  .p-accordion
  .p-accordion-tab:last-child
  .p-accordion-header:not(.p-highlight)
  .p-accordion-header-link:hover {
  background: #d0e0ff !important;
}

::v-deep .p-accordion .p-accordion-tab:last-child .p-accordion-content {
  background: #f3f7ff;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link:hover {
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep .pi-trash:before {
  color: red;
}
::v-deep .p-accordion .p-accordion-content {
  padding: 1rem;
  border: 1px solid #dee2e6;
  background: #ecf2ff;
  color: #7a7a7a;
}
.chargetype {
  background: #b4efc0;
  color: #66c11e;
}
::v-deep .chargetype .p-dropdown {
  background: #b4efc0;
  border: none;
}
.buttonStyle {
  flex-wrap: nowrap !important;
  width: 120px !important;
}
.calenderStyle {
  width: 350px !important;
}
.profile-drop-down {
  width: 235px !important;
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  border: none !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-label {
  color: white !important;
}
.profile-drop-down.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: white !important;
}
.profile-drop-down.p-dropdown .p-dropdown-trigger {
  color: white !important;
}
</style>