<template>
  <DataTable :value="sales" responsiveLayout="scroll">
    <ColumnGroup type="header">
      <Row>
        <!-- <Column header="Sales" :colspan="2" /> -->
        <Column header="" :colspan="6" />
      </Row>
      <Row>
        <Column header="Before Delivery Time" :colspan="3" />
        <Column
          header="Returning schedule Time (For Direction Collect)"
          :colspan="3"
        />
        <Column
          header="Returning schedule Time (For Deliver & Collect)"
          :colspan="3"
        />
      </Row>

      <Row>
        <Column header="Before Delivery Time" :colspan="3" />
        <Column
          header="Returning schedule Time (For Direction Collect)"
          :colspan="3"
        />
        <Column
          header="Returning schedule Time (For Deliver & Collect)"
          :colspan="3"
        />
      </Row>
      <Row>
        <Column header="Normal" :sortable="true" field="lastYearSale" />
        <Column header="Urgent" :sortable="true" field="thisYearSale" />
        <Column header="Select" :sortable="true" field="before_delivery" />
        <Column header="Normal" :sortable="true" field="lastYearProfit" />
        <Column header="Urgent" :sortable="true" field="thisYearProfit" />
        <Column header="Select" :sortable="true" field="direction_collect" />
        <Column header="Normal" :sortable="true" field="lastYearLoss" />
        <Column header="Urgent" :sortable="true" field="thisYearLoss" />
        <Column header="Select" :sortable="true" field="direction_collect" />
      </Row>
    </ColumnGroup>
    <Column field="lastYearSale">
      <template #body="slotProps">
        {{ slotProps.data.lastYearSale }}%
      </template>
    </Column>
    <Column field="thisYearSale">
      <template #body="slotProps">
        {{ slotProps.data.thisYearSale }}%
      </template>
    </Column>
    <Column field="lastYearProfit">
      <template #body="slotProps">
        {{ slotProps.data.lastYearProfit }}
      </template>
    </Column>
    <Column field="thisYearProfit">
      <template #body="slotProps">
        {{ slotProps.data.thisYearProfit }}
      </template>
    </Column>
    <Column field="lastYearLoss">
      <template #body="slotProps">
        {{ slotProps.data.lastYearLoss }}
      </template>
    </Column>
    <Column field="thisYearLoss">
      <template #body="slotProps">
        {{ slotProps.data.thisYearLoss }}
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Row from "primevue/row";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
export default {
  components: {
    DataTable,
    Row,
    Column,
    ColumnGroup,
  },
  data: () => ({
    sales: [
      {
        // product: "Bamboo Watch",
        lastYearSale: 51,
        thisYearSale: 40,
        lastYearProfit: 54406,
        thisYearProfit: 43342,
        lastYearLoss: 54406,
        thisYearLoss: 43342,
      },
      {
        // product: "Black Watch",
        lastYearSale: 83,
        thisYearSale: 9,
        lastYearProfit: 423132,
        thisYearProfit: 312122,
        lastYearLoss: 54406,
        thisYearLoss: 43342,
      },
      {
        // product: "Blue Band",
        lastYearSale: 38,
        thisYearSale: 5,
        lastYearProfit: 12321,
        thisYearProfit: 8500,
        lastYearLoss: 54406,
        thisYearLoss: 43342,
      },
    ],
  }),
};
</script>
<style scoped>
/* ::v-deep .p-datatable .p-datatable-thead > tr > th:first-child {
  display: none;

} */
</style>