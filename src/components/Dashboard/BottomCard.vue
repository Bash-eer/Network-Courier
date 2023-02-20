<template>
  <div class="card bottom-card-wrap">
    <div class="flex flex-row">
      <p class="bottom-card-title flex text-left m-3 ml-2">
        Financial Analysis by Contract Customers
      </p>
      <DropDown
        :data="dropDownData"
        label="userRole"
        id="userRole"
        v-model="value"
        :value="value"
        v-on:childToParent="getUserInput"
        classes="inputfield  dialog-dropdown-input-text m-3 text-right"
        placeholder="Last Week"
        code="code"
      />
    </div>

    <DataTables
      storePath="users"
      :loading="false"
      tableName="dashboardTable"
      tableClass="dashboard-bottom-card-class"
      :tableData="$store.state.users.dashboardTableData"
      :tableColumns="$store.state.users.dashboardTableColumnData"
      :showFilterMenu="false"
      :paginator="false"
    />
    <!-- <DataTable :value="null" responsiveLayout="scroll"   :tableData="$store.state.dashboardTableData"
    :tableColumns="$store.state.dashboardTableColumnData">
           <template #header>
                <div class="table-header">
                    Products
                    <Button icon="pi pi-refresh" />
                </div>
            </template> -->
    <!-- <Column field="name" header="Name"></Column>
            <Column header="Image">
                 <template #body="slotProps">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
                </template>
            </Column>
            
        </DataTable>  -->
  </div>
</template>

<script>
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';
export default {
  //    components:{DataTable , Column },
  //    data(){
  //        return {
  //            Data: [
  // {"brand": "Volkswagen", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
  // {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
  // {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
  // {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
  // {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
  //            ]
  //        }
  //    }
  data() {
    return {
      dropDownData: [
        { name: "Last Week", code: "LW" },
        { name: "Yesterday", code: "YD" },
        { name: "Today", code: "TD" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .card {
  // border: none !important;

  border-radius: 8px !important;
}
.bottom-card-wrap {
  width: 100% !important;
  // margin-top : -10px !important;
  // border: n  .card{
  border-radius: 8px !important;
  // background-color: rgb(255, 101, 127) !important;
  padding: 20px !important;
}
.bottom-card-title {
  font-family: $font-family-primary;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
  color: #1d1d1d;
}
.dialog-dropdown-input-text {
  position: absolute;
  right: 10px;
  top: 0;
  width: 200px !important;
  //styleName: Small 16 / Family #1 / Regular;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
}
.input-flied {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled) {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled):hover {
  border: none !important;
}
.p-dropdown:not(.p-disabled).p-focus {
  border: none !important;
  outline: none !important;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background-color: transparent !important;
  border: none !important;
  //styleName: Small 16 / Family #1 / Regular;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}

::v-deep .p-column-title {
  color: #1d1d1d;
  // color: #f30808;
  // margin-left:10px !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep .p-datatable.p-datatable-striped .p-datatable-tbody {
  color: #4a5571;

  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep
  .p-datatable.p-datatable-striped
  .p-datatable-tbody
  > tr:nth-child(even) {
  background-color: transparent !important;
  // color:pink;
}
// .p-datatable .p-sortable-column .p-sortable-column-icon {

//     display: none !important;
// }
// ::v-deep .p-datatable .p-sortable-column .p-sortable-column-icon{
//   display: none !important;

// }
// ::v-deep .p-checkbox .p-checkbox-box{
//   display: none !important;
// }
// ::v-deep .p-checkbox{
//   display: none !important;
// }
</style>
