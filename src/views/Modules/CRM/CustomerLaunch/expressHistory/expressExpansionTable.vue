<template>
  <div v-for="(item, index) of subTableData" :key="index">
    <DataTable
      :loading="isTableLoad"
      responsiveLayout="scroll"
      :class="tableClass"
      :rowClass="rowClass"
      selectionMode="single"
      :dataKey="dataKey + index"
      :value="item"
      @rowSelect="onRowExpand"
    >
      <Column
        v-for="col of subTableColumns"
        :field="col.field"
        :header="
          col.header !== 'Image' &&
          col.header !== 'FOC' &&
          col.header !== 'Status'
            ? col.header
            : ''
        "
        :key="col.field"
        :style="col.header !== 'Image' ? 'min-width: 9rem' : 'min-width: 5rem'"
      >
        <template #body="slotProps">
          <span v-if="col.header == 'Image'" class="">
            <div class="flex flex-row">
              <img
                v-if="slotProps.data?.service_type != 'Document'"
                class="m-1"
                src="../../../../../assets/box.png"
                alt="img"
                width="37"
                height="37"
              />
              <img
                class="m-1"
                src="../../../../../assets/document.png"
                alt="img"
                width="37"
                height="37"
                v-else
              />
            </div>
          </span>

          <span v-if="col.header == 'Book Document'" class="flex flex-nowrap">
            <div class="flex flex-column flex-nowrap">
              <span class="tracking-hyper-text">{{
                slotProps.data?.document_details
              }}</span>
              <div class="flex heading">
                <span>Item Weight:<span class="ml-2"> - </span></span>
              </div>
              <div class="flex heading">
                <span>Volumetric WT:<span class="ml-2"> - </span></span>
              </div>
            </div>
          </span>

          <span v-if="col.header == 'Job Priority'" class="">
            {{ slotProps.data?.job_priority || "-" }}
          </span>

          <span v-if="col.header == 'Time & Date'" class="">
            {{ dateFormater(slotProps.data?.time_date) }}
          </span>

          <span v-if="col.header == 'Job Type'" class="">
            {{ slotProps.data?.job_type || "-" }}
          </span>

          <span v-if="col.header == 'Service Type'" class="">
            {{ slotProps.data?.service_type || "-" }}
          </span>

          <span v-if="col.header == 'Logistics Mode'" class="">
            {{ slotProps.data?.logistics_mode || "-" }}
          </span>

          <span v-if="col.header == 'Cash'" class="">
            {{ slotProps.data?.cash || "Nil" }}
          </span>

          <span v-if="col.header == 'Order/ Reference No'" class="">
            {{ slotProps.data?.order_reference_no || "-" }}
          </span>

          <span v-if="col.header == 'Remarks'" class="">
            {{ slotProps.data?.remarks || "-" }}
          </span>

          <span
            v-if="col.header == 'FOC' && slotProps.data?.combination_selected"
            class="flex flex-row"
          >
            <i class="pi pi-check express-check-icon mr-3"></i> FOC
          </span>

          <span v-if="col.header == 'Status'" class="">
            <span
              :class="
                slotProps.data['status'] == 'Completed'
                  ? 'complete-bg-class'
                  : slotProps.data['status'] == 'Ongoing'
                  ? 'ongoing-bg-class'
                  : 'new-bg-class'
              "
            >
              <span
                :class="
                  slotProps.data['status'] == 'Completed'
                    ? 'complete-class'
                    : slotProps.data['status'] == 'Ongoing'
                    ? 'ongoing-class'
                    : 'new-class'
                "
                >{{ slotProps.data?.status }}</span
              >
            </span>
          </span>
        </template>
      </Column>
      <Column
        :expander="true"
        @click="clickColumn(col)"
        headerStyle="width: 1rem"
      />
      <template #empty> No data found </template>
    </DataTable>
    <div v-if="isMoreOption" class="cursor-pointer py-3">
      <span class="more-option">More</span>
    </div>
  </div>

  <JobDetailsMainDialog
    :dialogComponent="dialogComponent"
  ></JobDetailsMainDialog>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import JobDetailsMainDialog from "../../../../../components/CRM/jobDetailsMainDialog";

export default {
  name: "ExpressExpansionTable",
  components: {
    DataTable,
    Column,
    JobDetailsMainDialog,
  },
  props: [
    "tableClass",
    "dataKey",
    "subTableData",
    "subTableColumns",
    "isMoreOption",
  ],
  data() {
    return {
      dialogComponent: "",
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
    onRowExpand(col) {
      let id = col.data?.id || null;
      this.dialogComponent = "JobDetailsDialog";
      console.log(id, "id");
      this.showJobDetailsDialog(true);
      this.loadSpecificJobsDetails(id);
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      isTableLoad: "customerLaunchBookingHistory/getExpressExpansionTableLoad",
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
