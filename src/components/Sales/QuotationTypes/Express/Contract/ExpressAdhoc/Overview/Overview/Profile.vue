<template>
  <div class="mb-2 Profile">Profile</div>

  <DataTable :value="products" class="p-datatable-sm" responsiveLayout="scroll">
    <template #header>
      <div class="profile-header">
        <div class="flex md:mr-2 mr-6">
          <p class="col result">Quotation(Van)</p>
        </div>
        <div class="profile-sub-header">
          <div class="col action"><i class="pi pi-ellipsis-v"></i></div>
        </div>
      </div>

      <Tabel tableClass="sample" />

      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template class="flex">
            <Column field="Delivery_Type" header="Delivery Type"></Column>
          <Column field="Collection_Time" header="Collection Time"></Column>
          <Column field="Cut_Off_Time" header="Cut Off Time"></Column>
          <Column field="Cut_Off_Days" header="Cut Off Days"></Column>
          <Column field="Net_Charges" header="Net Charges"></Column>
        </template>
      </DataTable>
    </template>
  </DataTable>

  <div class="field mt-5">
    <h5 class="remarks">Remarks</h5>
    <div class="remarks-para">
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit.
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tabel from "../Overview/ProfileTable.vue";
export default {
  components: {
    DataTable,
    Column,
    Tabel,
  },

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

      products: [
        {
          Delivery_Type: "Same Day Delivery",
          Collection_Time: "10.00",
          Cut_Off_Time: "10.00",
          Cut_Off_Days: "2",
          Net_Charges: "$251",
        },
        {
          Delivery_Type: "Next Day Delivery",
          Collection_Time: "10.00",
          Cut_Off_Time: "10.00",
          Cut_Off_Days: "2",
          Net_Charges: "$251",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: 1px dashed #acb5c1 !important;
  border-style: dashed !important;
  border-radius: 6px !important;
}
.p-datatable {
  // padding: 10px;
  background-color: #f3f7ff;
}

.p-datatable[data-v-02e7ee63] {
  padding: 20px;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff;
  padding: 15px;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}

.weight {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #4e5868;
  white-space: nowrap !important;
}
.chargable-weight {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #66c11e;
  white-space: nowrap !important;
}
.result {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #4e5868;
}
::v-deep.p-datatable .p-column-header-content {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
}
::v-deep.field {
  margin-bottom: 0;
}
.profile-header {
  display: flex !important;
  justify-content: space-between !important;
}
.profile-sub-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.action {
  padding-top: 0 !important;
}
.Profile {
  color: #343434;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
}
.date {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #343434;
}
.import {
  color: #8f46eb;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  background-color: #ead9ff;
  border-radius: 7px;
}

.remarks {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
}
.remarks-para {
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #4e5968;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  width: 100%;
  height: 61px;
  background-color: #f3f7ff;
  padding-top: 10px;
  padding-inline: 5px;
}
</style>
