<template >
  <div v-if="this.overview_data?.express_contract[0]?.trips?.length">
    <span class="addachments">Attachments</span>
    <div class="flex flex-row">
      <div
        class="flex my-3 mr-3"
        v-for="(i, index) in attachments"
        :key="index"
      >
        <a target="_blank" :href="i.url ?? ''">
          <img
            :src="'/images/' + 'drag-drop-pdf' + '.png'"
            alt="pdf"
            width="30"
            height="27"
        /></a>
      </div>
    </div>

    <div class="card mb-4">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              Trip Schedule
            </div>
            <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
          </div>
        </template>

        <template class="flex">
          <Column
            class="chargable-weight"
            field="trip_no"
            header="Trip Name"
          ></Column>
          <Column field="from_time" header="From"></Column>
          <Column field="to_time" header="To"></Column>
          <Column field="trip_days" header="Trip Days"></Column>
          <Column field="trip_type" header="Trip Type"></Column>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      products: [],
      attachments: [],
      file: null,
    };
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  created() {
    if (this.$route.params.type == "contract") {
      if (this.overview_data?.contract_attachments.length != 0) {
        this.attachments =
          this.overview_data?.contract_attachments[0]?.attachments;
      }
    } else {
      if (this.overview_data?.quotation_attachments.length != 0) {
        this.attachments =
          this.overview_data?.quotation_attachments[0]?.attachments;
      }
    }

    this.overview_data?.express_contract[0]?.trips.map((i) => {
      this.products.push({
        trip_no: i?.trip_no,
        trip_days: i?.trip_days,
        from_time: i?.from_time,
        to_time: i?.to_time,
        trip_type: i?.trip_type,
      });
    });
  },
  methods: {
    toggle(event, e) {
      this.file = e;
      this.$refs.op.toggle(event);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}
.van-costing-details-trip-schedule {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #7e84a7;
}
.date {
  color: #66c11e;
}
.addachments {
  color: #7e84a7;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}
</style>
