<template>
  <DataTable
    :loading="isTableLoad"
    responsiveLayout="scroll"
    :class="tableClass"
    :rowClass="rowClass"
    selectionMode="single"
    :dataKey="dataKey + index"
    :value="dataKey"
    @rowSelect="onRowExpand"
  >
    <Column
      v-for="col of tableHeader"
      :header="
        col.header !== 'Image' &&
        col.header !== 'FOC' &&
        col.header !== 'Status'
          ? col.header
          : ''
      "
      :key="col"
      :style="col.header !== 'Image' ? 'min-width: 9rem' : 'min-width: 5rem'"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Image'" class="">
          <div class="flex flex-row ml-6">
            <img
              v-if="slotProps.data?.service_type != 'Document'"
              class="m-1"
              src="../../../../assets/box.png"
              alt="img"
              width="37"
              height="37"
            />
            <img
              class="m-1"
              src="../../../../assets/document.png"
              alt="img"
              width="37"
              height="37"
              v-else
            />
          </div>
        </span>

        <span v-if="col.header == 'Document'" class="flex flex-nowrap">
          <div class="flex flex-column flex-nowrap">
            <span class="tracking-hyper-text">{{
              slotProps.data?.delivery_document
            }}</span>
            <div class="flex heading">
              <span>Item Weight:<span class="ml-2"> - </span></span>
            </div>
            <div class="flex heading">
              <span>Volumetric WT:<span class="ml-2"> - </span></span>
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Cash'" class="flex flex-nowrap">
          {{ slotProps.data?.cash }}
        </span>

        <span v-if="col.header == 'Remarks'" class="flex flex-nowrap">
          {{ slotProps.data?.remarks }}
        </span>

        <span v-if="col.header == 'Order Ref Number'" class="flex flex-nowrap">
          {{ slotProps.data?.order_reference_no }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { liveJobExpansionColumnFields } from "../../../../components/Reusables/CRM/Const";

export default {
  name: "liveJobExpansionTable",
  components: {
    DataTable,
    Column,
  },
  props: ["tableClass", "dataKey", "tableData", "expansionId"],
  data() {
    return {
      dialogComponent: "",
      tableHeader: liveJobExpansionColumnFields,
    };
  },

  methods: {
    ...mapActions({
      loadSpecificJobsDetails:
        "customerLaunchBookingHistory/loadSpecificBookingOverAllJobDetails",
      showJobDetailsDialog: "customerLaunchBookingHistory/showJobDetailDialog",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      isTableLoad: "customerLaunchBookingHistory/getExpressExpansionTableLoad",
      getLiveJobExpansionListArray:
        "liveJobStatus/getLiveJobExpansionListArray",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.no_data {
  text-align: center;
  font-weight: bold;
}

.complete-class,
.ongoing-class,
.new-class {
  font-weight: 600 !important;
}
.complete-class {
  color: #269337;
}

.complete-bg-class,
.ongoing-bg-class,
.new-bg-class {
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.complete-bg-class {
  background-color: #b1fcdd;
}
.ongoing-class {
  color: #ff7a00;
}

.new-class {
  color: #131111;
}
.ongoing-bg-class {
  background-color: #a1642b;
}
.new-bg-class {
  background-color: #e5e5e5;
}
.heading,
.heading > span {
  color: $color-4e5868;
  font-size: 11px;
}
.sub {
  color: $color-7e84a7;
}

::v-deep .express-check-icon {
  color: $color-66c11e !important;
  font-weight: 600;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-third;
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
::v-deep .p-column-title {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: $color-212121 !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  background: $color-fff !important;
  border: none !important;
}
::v-deep .p-datatable {
  background-color: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  padding: 0.01rem 0.01rem !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.19rem 0.1rem !important;
}
.more-option {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 20px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
</style>
