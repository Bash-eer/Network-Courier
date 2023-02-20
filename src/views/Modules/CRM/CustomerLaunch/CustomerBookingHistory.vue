<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3 font-bold">Customer Booking History</div>
    </div>
    <div class="card flex-column border-radius-18">
      <TimeLineStamp
        :cusId="customerData?.customer_id"
        :cusName="customerData?.customer_name"
        :cusAddress="customerData?.address"
      />
    </div>
    <keep-alive>
      <div :key="renderkey">
        <ExpressHistoryTable
          tableClass="p-datatable-sm CustomerBookingHistory"
          tableDataName="standardCollectionDataTable"
          :overlayData="getOverlayData('ExpressTab')"
          tableName="bookingHistoryTable"
          :tabPageOffset="expressPageOffset"
          :tableData="tableData"
          :subTableData="
            $store.state['customerLaunchBookingHistory']['expressSubTableData']
          "
          :totalRecords="totalRecords"
          :tableColumns="expressHistoryColumns"
          :subTableColumns="expressHistorySubColumns"
          v-bind:is="'expressHistoryTable'"
          :currentTab="currentTab"
        />
      </div>
    </keep-alive>
  </div>
</template>
<script>
import ExpressHistoryTable from "./expressHistory/expressHistoryTable";
import TimeLineStamp from "../../../../components/CRM/timeLineStamp.vue";
import {
  standardCollectionTableColumnData,
  standardCollectionOverlayData,
} from "../../../../components/Reusables/CRM/Const";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Customer Booking History",
  components: { ExpressHistoryTable, TimeLineStamp },
  data() {
    return {
      tableColumns: standardCollectionTableColumnData,
      overlayData: standardCollectionOverlayData,
      customerData: {},
      payload: null,
      customerDetail: null,
    };
  },
  computed: {
    ...mapGetters({
      totalRecords: "customerLaunchBookingHistory/getTotalRecords",
      expressHistoryColumns:
        "customerLaunchBookingHistory/getExpressHistoryColumns",
      expressHistorySubColumns:
        "customerLaunchBookingHistory/getExpressHistorySubColumns",
      tableData: "customerLaunchBookingHistory/getExpressHistoryTableData",
    }),
  },
  methods: {
    ...mapActions({
      expressHistoryDataFetch:
        "customerLaunchBookingHistory/loadExpressCustomerHistoryTableData",
      getCutomerDetailsForBookingHistory:
        "customerLaunchBookingHistory/getCutomerDetailsForBookingHistory",
    }),
    getOverlayData(tableName) {
      return this.$store.state.masters.customerlaunchBookingOverlayData;
    },
  },
  watch: {
    "$store.state.customerLaunchBookingHistory.expressHistoryTableData":
      function () {
        let customer =
          this.$route.params.type == "Contract"
            ? this.tableData[0]?.contract_customer
            : this.tableData[0]?.adhoc_customer;
        this.customerData = {
          customer_id: this.customerDetail?.customer_id,
          customer_name: this.customerDetail?.profile_name,
          address: `${this.customerDetail?.address}, ${this.customerDetail?.building_name}, ${this.customerDetail?.floor_no}-${this.customerDetail?.unit_no}, ${this.customerDetail?.country}-${this.customerDetail?.postal_code}`,
        };
      },
  },
  async created() {
    if (this.$route.params.type == "Contract") {
      this.payload = {
        contract_id: this.$route.params.id,
        profile_id: null,
      };
    } else {
      this.payload = {
        contract_id: null,
        profile_id: this.$route.params.id,
      };
    }
    let response = await this.getCutomerDetailsForBookingHistory(this.payload);
    if (response && response.status === 200) {
      this.customerDetail = response.data?.results;
    }

    let paginationParams;
    if (this.$route.params.type == "Contract") {
      paginationParams = {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "DESC"],
        contract_id: this.$route.params.id,
      };
    } else {
      paginationParams = {
        offset: 1,
        limit: 10,
        profile_id: this.$route.params.id,
        orderBy: ["createdAt", "DESC"],
      };
    }
    this.expressHistoryDataFetch(paginationParams);

    this.$store.state.users.breadcrumbTitle = "CRM";
    this.$store.state.users.breadcrumbPath = `CRM > Customer Launch Booking History`;
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
