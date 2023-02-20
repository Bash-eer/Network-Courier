<template>
  <div :key="renderkey">
    <div class="">
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
          :state="massCollectionAttachmentsState"
          type="massCollectionAttachments"
          storePath="Masscollection"
          :default="defaultTemplate"
          @fileData="updateTableData"
        />
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
              tableDataName="massCollectionDataTable"
              :overlayData="overlayData"
              tableName="massCollectionDataTable"
              :tableData="tableData"
              :tableColumns="tableColumns"
              dataKey="id"
            />
          </div>
        </keep-alive>
      </div>
    </div>
    <div
      class="flex justify-content-end w-full align-content-center p-3 flex-wrap"
    >
      <div class="flex align-self-center justify-content-start">
        <CancelButton
          storePath="salesQuotationDialog"
          class="color-357dea mr-2"
        />

        <Buttons
          label="Generate"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TemplateDragAndDropUpload from "../StandardCollectionSlips/components/DragAndDropUpload.vue";
import { mapActions, mapGetters } from "vuex";
import DataTable from "../StandardCollectionSlips/components/DataTable.vue";
import { massCollectionTableColumnData } from "../../../../components/Reusables/CRM/Const";
export default {
  name: "TemplateUploader",
  components: { TemplateDragAndDropUpload, DataTable },
  data() {
    return {
      massCollectionAttachmentsState: " ",
      tableColumns: massCollectionTableColumnData,
      tableData: [],
      logistics_mode: "",
    };
  },
  computed: {
    ...mapGetters({
      massCollectionAttachmentsStateData:
        "Masscollection/massCollectionAttachmentsStateData",
      getCrmBookingData: "Masscollection/getCrmBookingData",
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      getZonesData: "Masscollection/getZonesData",
      getRoutesData: "Masscollection/getRoutesData",
      massCollectionPayloadData: "Masscollection/massCollectionPayloadData",
    }),
  },
  methods: {
    ...mapActions({
      getCrmBookingDetails: "Masscollection/getCrmBookingDetails",
      loadZonesData: "Masscollection/loadZonesData",
      loadRoutesData: "Masscollection/loadRoutesData",
      POSTPATCHCRUDOPERATION: "Masscollection/POSTPATCHCRUDOPERATION",
      generateMassCollectionSlip: "Masscollection/generateMassCollectionSlip",
    }),
    updateTableData(value) {
      this.$emit("emittedtabdata", value);
      this.tableData = value;
    },
    async submitData() {
      if (
        this.getCrmBookingData?.caller_name &&
        this.massCollectionPayloadData?.time_date != null
      ) {
        let addNew = this.massCollectionPayloadData;
        let customer_details =
          this.getCrmBookingData?.contract_customer != null
            ? this.getCrmBookingData?.contract_customer
            : this.getCrmBookingData?.adhoc_customer;
        this.tableData.map((list) => {
          list.postal_code = list.postal_code?.toString();
          list.floor_no = list.floor_no?.toString();
          list.unit_no = list.unit_no?.toString();
          list.order_reference_no = list.order_reference_no?.toString();
          list.quantity = list.quantity?.toString();
          list.act_weight = list.act_weight?.toString();
          list.contact_no = Number(list.contact_no);
        });
        let data = {
          booking_id: this.getCrmBookingData?.id,
          customer_id: this.getCrmBookingData?.customer_id?.toString() || null,
          profile_id: this.getCrmBookingData?.profile_id?.toString() || null,
          customer_name: customer_details?.profile_name,
          business_type: customer_details?.business_type || "Adhoc",
          job_type: addNew?.job_type,
          job_priority: addNew?.job_priority,
          job_date: addNew?.time_date?.substr(0, 10),
          from_time: addNew?.time_date?.substr(12, 5),
          to_time: addNew?.time_date?.substr(20, 5),
          // time_date: addNew?.time_date,
          logistics_mode: addNew?.logistics_mode,
          service_type: addNew?.service_type,
          delivery_document: addNew?.delivery_document,
          cost_center_id: this.getCrmBookingData?.cost_center_id,
          custom_allotment: addNew?.custom_allotment || false,
          bike_zone_id: addNew?.bike_zone_id || null,
          bike_route_id: addNew?.bike_route_id || null,
          van_zone_id: addNew?.van_zone_id || null,
          van_route_id: addNew?.van_route_id || null,
          rapido_zone_id: addNew?.rapido_zone_id || null,
          rapido_route_id: addNew?.rapido_route_id || null,
          jobs: this.tableData,
        };
        await this.generateMassCollectionSlip(data).then(async (c) => {
          if (c.status == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: `"Your booking in Mass collection Slip is sucessfully placed.Collection Slip No :"${c.data.results[1].collection_slip_no}`,
              life: 5000,
            });
            this.$router.push({
              name: "CustomerLaunchBookings",
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "error",
              detail: `${c.data.message}`,
              life: 5000,
            });
          }
        });
      } else {
        // errorCaller
        if (!this.getCrmBookingData?.id) {
          this.$toast.add({
            severity: "error",
            summary: "error",
            detail: `Please select customer type and fill all the required details`,
            life: 5000,
          });
        } else if (!this.getCrmBookingData?.caller_name) {
          this.$toast.add({
            severity: "error",
            summary: "error",
            detail: `Please select a Contact details from header component`,
            life: 5000,
          });
        } else if (this.massCollectionPayloadData?.job_date == null) {
          this.$toast.add({
            severity: "error",
            summary: "error",
            detail: `Please select a valid Trip date from general details Accordian`,
            life: 5000,
          });
        } else if (!this.massCollectionPayloadData?.jobs) {
          this.$toast.add({
            severity: "error",
            summary: "error",
            detail: `Please upload a template file`,
            life: 5000,
          });
        }
      }
    },
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "massCollectionAttachments";
    if (Object.keys(this.massCollectionAttachmentsStateData).length != 0) {
      this.massCollectionAttachmentsState =
        this.massCollectionAttachmentsStateData.attachments;
      this.$store.state.Masscollection.massCollectionAttachmentsFiles =
        this.massCollectionAttachmentsStateData.attachments;
    }
  },
  watch: {},
};
</script>

<style scoped>
::v-deep.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 1rem;
  border: 1px solid #dee2e6;
  color: #212121;
  background: #c7d9fc;
  font-weight: 600;
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.indent {
  text-indent: -3px;
}
.top {
  margin-top: 24px;
}
</style>