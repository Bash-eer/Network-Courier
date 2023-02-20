<template>
  <div>
    <DataTable :value="sales" responsiveLayout="scroll" :class="tableClass">
      <div class="datatabel">
        <Column
          field="lastYearSale"
          header="Origin Country"
          class="column"
        ></Column>
        <Column
          field="thisYearProfit"
          header="Origin City"
          class="column"
        ></Column>
        <Column
          field="product"
          header="Origin Country Postal Code"
          class="column"
        ></Column>
        <Column>
          <template #header>
            <div class="vertical_line"></div>
          </template>
        </Column>
        <Column
          field="lastYearSale"
          header="Destination Country"
          class="column"
        ></Column>
        <Column
          field="thisYearProfit"
          header="Destination City"
          class="column"
        ></Column>
        <Column
          field="product"
          header="Destination Postal Code"
          class="column"
        ></Column>
      </div>
    </DataTable>

    <DataTable
      class="datateble-second"
      :value="sales"
      responsiveLayout="scroll"
    >
      <div class="datatabel flex appe">
        <Column
          field="lastYearSale"
          header="Total Weight"
          class="column col ram"
        ></Column>
        <Column
          field="thisYearProfit"
          header="Volumetric Weight"
          class="column col"
        ></Column>
        <Column field="product" header="L/W/H (cm)" class="column col"></Column>
        <Column
          field="product"
          header="Total Weight: 50 kg "
          class="column col"
        ></Column>
      </div>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: {
    DataTable,
    Column,
  },
  props: ["tableClass"],

  data() {
    return {
      sales: [
        {
          product: "Bamboo Watch",
          lastYearSale: 51,
          thisYearSale: 40,
          lastYearProfit: 54406,
          thisYearProfit: 43342,
        },
      ],
    };
  },
};
</script>

<style scoped>
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: none !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff !important;
  padding: 15px !important;
  border-radius: 5px;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  border: 0px solid #e9ecef !important;
  border-width: 0 0 0 0 !important;
}
.sample.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
  color: green;
}

::v-deep.field {
  margin-bottom: 0;
}

.action {
  padding-top: 0 !important;
}

::v-deep.p-datatable .p-datatable-tbody > tr > td {
  border: none !important;
}
.vertical_line {
  margin-top: 30px;
  width: 189px;
  height: 2px;
  background-color: #66c11e;
}
.datateble-second {
  width: 50% !important;
}
::v-deep.p-datatable-responsive-scroll > .p-datatable-wrapper {
  border-radius: 8px;
}
</style>
