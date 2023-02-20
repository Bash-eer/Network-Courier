<template>
  <span class="additional">Additional Info</span>
  <div class="card mb-5">
    <DataTable
      :value="products"
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="van-costing-details-trip-schedule flex">
          <span
            >Estimated Start Date:
            <span class="date">{{
              dateFormater(this.overview_data?.settings?.estimated_start_date)
            }}</span></span
          >
          <span class="ml-4"
            >Estimated End Date:
            <span class="date">{{
              dateFormater(this.overview_data?.settings?.estimated_end_date)
            }}</span></span
          >
        </div>
        <div class="van-costing-details-trip-schedule mt-2">Emailed to</div>
      </template>

      <template class="flex">
        <Column
          class="chargable-weight"
          field="contact_name"
          header="Name"
        ></Column>
        <Column field="designation" header="Designation"></Column>
        <Column field="contact_no" header="Contact"></Column>
        <Column field="email" header="Email"></Column>
      </template>
    </DataTable>
  </div>
  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div
      class="
        flex
        font-size-12
        express-international-font express-international-table
        mb-2
      "
    >
      Remarks
    </div>
    <div class="flex">
      <div class="bg-f3f7ff border-radius-8 p-2">
        <p
          class="
            font-size-12
            line-height-18
            color-4e5968
            express-international-font
          "
        >
          {{ this.overview_data?.remarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      products: [
        // {
        //   designation: "developer",
        //   contact_name: "1st",
        //   contact_no: "tom",
        //   email: "Weekdays@gmal.com",
        // },
        // {
        //   designation: "developer",
        //   contact_name: "2nd",
        //   contact_no: "tom",
        //   email: "Weekdays@gmal.com",
        // },
      ],
    };
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY ");
        return formattedDate;
      }
    },
  },
  created() {
    this.overview_data?.contacts.map((i) => {
      this.products.push({
        designation: i?.designation,
        contact_name: i?.contact_name,
        contact_no: i?.contact_no,
        email: i?.email,
      });
    });
  },
};
</script>

<style>
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
.additional {
  color: #7e84a7;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}
</style>
