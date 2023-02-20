<template>
  <DataTable
    v-if="tableData.length > 0"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    filterDisplay="menu"
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="30"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      :expander="tableName == 'ApprovalsContractTab' ? true : false"
      headerStyle="width: 1rem"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'Termination' &&
        col.header != 'Contract' &&
        col.header != 'S.No.' &&
        col.header != 'Status' &&
        col.header != 'Signed Doc'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="flex align-items-center">
          <!-- <i class="pi pi-angle-right"></i> -->
          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getOverlayData()"
          />
        </span>
        <!-- TEMPLATE : ACTIONS -->
        <!-- <span v-if="col.header == 'S. No '" class="flex align-items-center">
          {{ slotProps.data }}
        </span> -->
        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          <!-- yes -->
          <!-- <div v-if="slotProps.data.contract_profile"> -->
          <div v-if="tableName == 'ApprovalsContractTab'">
            {{ dateFormater(slotProps.data.contract_profile[col.field]) }}
          </div>
          <div v-else class="text-900">
            {{ dateFormater(slotProps.data[col.field]) }}
            <!-- {{ dateFormater(slotProps.data.createdAt) }}
            {{ slotProps.data }} -->
          </div>

          <!-- </div> -->
        </span>

        <!-- TEMPLATE : CONTrACT -->
        <span v-if="col.header == 'Contract'" class="mr-2 mb-5">
          <div class="flex flex-column mt-4">
            <div class="flex heading">
              <!-- <div v-if="slotProps.data.contract_profile"> -->
              <div
                class="flex sub text-blue-700 mb-3"
                @click="
                  slotProps.data.express_contract
                    ? goToContractOverview(
                        slotProps.data.customer_type,
                        slotProps.data.business_type,
                        slotProps.data.id,
                        slotProps.data.contract_profile.id,
                        slotProps.data.express_contract.service
                      )
                    : goToContractOverview(
                        slotProps.data.customer_type,
                        slotProps.data.business_type,
                        slotProps.data.id,
                        slotProps.data.contract_profile.id
                      )
                "
              >
                view
              </div>
              <!-- </div> -->
            </div>
          </div>
        </span>
        <!-- TEMPLATE : CONTACT -->
        <span v-if="col.header == 'Termination'" class="mr-2 mb-5">
          <div class="flex flex-column mt-4">
            <div class="flex heading">
              <!-- <div v-if="slotProps.data.contract_profile"> -->
              <div
                class="flex sub text-blue-700 mb-3"
                @click="openTerminationDialog(slotProps.data)"
              >
                view
              </div>
              <!-- </div> -->
            </div>
          </div>
        </span>
        <!-- TEMPLATE : COMPANY NAME-->
        <span v-if="col.header == 'Company name'" class="mr-2">
          <div class="flex mt-4">
            <div class="flex mr-2 gap-2">
              <div v-if="slotProps.data.contract_profile">
                <AvatarLabel
                  v-if="slotProps.data['img'] == null"
                  v-bind:label="
                    slotProps.data.contract_profile[col.field].substring(0, 2)
                  "
                  classes="avatar-text"
                />
                <img
                  v-else
                  :src="slotProps.data.contract_profile.profile_url"
                  class="contactsImage"
                />
              </div>
              <div class="flex flex-column mt-3">
                <div class="heading text-900">
                  <div v-if="slotProps.data.contract_profile">
                    {{ slotProps.data.contract_profile[col.field] }}
                    <div class="sub">
                      {{ slotProps.data.contract_profile.trade }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                :src="'/images/' + slotProps.data.customer_type + '.png'"
                alt=""
                class="ml-3 mt-2"
                v-bind:title="slotProps.data.customer_type"
              />
            </div>
          </div>
        </span>
        <!-- <div v-if="slotProps.data.contract_profile"> -->

        <!-- TEMPLATE : ADDRESS -->
        <span v-if="col.header == 'Address'" class="mr-2 mt-3">
          <div class="flex flex-column mt-4">
            <div class="flex heading text-900">
              <div v-if="slotProps.data.contract_profile">
                {{ slotProps.data.contract_profile[col.field] }}
                <div class="flex sub text-600">
                  {{ slotProps.data.contract_profile["postal_code"] }}
                </div>
              </div>
            </div>
          </div>
        </span>
        <!-- TEMPLATE:STATUS -->
        <span v-if="col.header == 'Status'" class="mr-2">
          <!--approvals > contrcat-->
          <div
            v-if="
              slotProps.data[col.field] == 'Approved' &&
              // || slotPropsdata[col.field] == 'New'
              tableName == 'ApprovalsContractTab'
            "
          >
            <div class="flex flex-start gap-2">
              <Button
                id="abc"
                class="btn"
                @click="
                  tableName == 'ApprovalsContractTab'
                    ? openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Contract Approval',
                        'In Contract',
                        slotProps.data.id
                      )
                    : openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Termination Approval',
                        'Approved',
                        slotProps.data.id
                      )
                "
              >
                <i class="pi pi-check"></i>
              </Button>

              <Button
                class="btn-times"
                @click="
                  tableName == 'ApprovalsContractTab'
                    ? openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Contract Rejection',
                        'Rejected',
                        slotProps.data.id
                      )
                    : openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Termination Rejection',
                        'Declined',
                        slotProps.data.id
                      )
                "
              >
                <i class="pi pi-times"></i>
              </Button>
            </div>
          </div>
          <!--approvals-termination-->
          <div
            v-if="
              //  slotProps.data[col.field] == 'Approved' ||
              slotProps.data[col.field] == 'New' &&
              tableName == 'ApprovalsTerminationTab'
            "
          >
            <div class="flex flex-start gap-2">
              <Button
                id="abc"
                class="btn"
                @click="
                  tableName == 'ApprovalsContractTab'
                    ? openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Contract Approval',
                        'Concluded',
                        slotProps.data.id
                      )
                    : openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Termination Approval',
                        'Approved',
                        slotProps.data.id,
                        slotProps.data.termination_id
                      )
                "
              >
                <i class="pi pi-check"></i>
              </Button>

              <Button
                class="btn-times"
                @click="
                  tableName == 'ApprovalsContractTab'
                    ? openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Contract Rejection',
                        'Rejected',
                        slotProps.data.id
                      )
                    : openDialog(
                        'ContractApprovalDialog',
                        'salesApproval',
                        'Termination Rejection',
                        'Declined',
                        slotProps.data.id,
                        slotProps.data.termination_id
                      )
                "
              >
                <i class="pi pi-times"></i>
              </Button>
            </div>
          </div>
          <div
            v-else-if="
              slotProps.data[col.field] == 'Concluded' ||
              slotProps.data[col.field] == 'In Contract'
            "
            class="approvd"
          >
            Approved
          </div>
          <div
            v-else-if="
              slotProps.data[col.field] == 'Rejected' ||
              slotProps.data[col.field] == 'Declined'
            "
            class="declined"
          >
            Declined
          </div>

          <div
            v-else-if="
              slotProps.data[col.field] == 'Approved' &&
              tableName == 'ApprovalsTerminationTab'
            "
            class="declined"
          >
            Approved
          </div>
        </span>

        <!-- {{ slotProps.data["status"] }} -->

        <!-- TEMPLATE:SIGNED DOC -->
        <span v-if="col.header == 'Signed Doc'" class="mr-2">
          <div :class="getSignedDocClassHandler(slotProps.data[col.field])">
            {{ getSignedDocHandler(slotProps.data[col.field]) }}
          </div>
        </span>
        <!-- {{ slotProps.data["signed_doc"] }} -->

        <!--Hide default display-->

        <!-- TEMPLATE:SALES PERSON -->
        <span v-if="col.header == 'Sales Person'" class="mr-3 mt-2">
          <div v-if="slotProps.data.sales_person">
            <div class="flex text-900 mt-2">
              {{ slotProps.data.sales_person.display_name }}
            </div>
            <div class="flex sub text-600">
              {{ slotProps.data.sales_person.contact_no }}
            </div>
          </div>
        </span>
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Contract' &&
            col.header != 'Address' &&
            col.header != 'Created On' &&
            col.header != 'Company name' &&
            col.header != 'Status' &&
            col.header != 'Signed Doc' &&
            col.header != 'Sales Person'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }">
        <!-- <span v-if="col.header == 'Status'">
          <DropDownField
            code="code"
            v-model="filterModel.value"
            :value="filterModel.value"
            :options="[
              { name: 'Approved', code: 'Approved' },
              { name: 'Declined', code: 'Declined' },
            ]"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          />
        </span> -->
        <!-- <span v-if="col.header == 'Signed Doc'">
          <DropDownField
            code="code"
            v-model="filterModel.value"
            :value="filterModel.value"
            :options="[
              { name: 'Received', code: 'Received' },
              { name: 'Not Received', code: 'Not Received' },
            ]"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          />
        </span> -->
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendar
            id="range"
            v-model="filterModel.value"
            :state="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On' && col.header != 'Status'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <template #expansion="slotProps">
      <span v-if="tableName == 'ApprovalsContractTab'">
        <div class="flex flex-row justify-content-between m-3">
          <div class="flex flex-column">
            <div class="flex flex-row">
              <div><img src="/images/remarks.png" alt="" /></div>
              <div class="mx-1">
                <div>Remarks</div>
                <div v-if="slotProps.data.contract_attachments.length > 0">
                  <span v-if="slotProps.data.contract_attachments[0].remarks">
                    {{ slotProps.data.contract_attachments[0].remarks }}
                  </span>
                </div>
                <div v-else>-</div>
              </div>
            </div>
          </div>
          <div class="flex flex-column">
            <div>Attachments</div>
            <div v-if="slotProps.data.contract_attachments.length > 0">
              <!-- {{ slotProps.data.contract_attachments }} -->
              <GroupedFiles
                :data="slotProps.data.contract_attachments[0].attachments"
              />
            </div>
            <div v-else>-</div>
          </div>
        </div>
      </span>
    </template>
  </DataTable>
  <!-- <ContractApprovalDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['quotation'].dialogComponent"
  /> -->
  <div v-else>
    <EmptyTemplate />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
// import Button from "primevue/button";
// import ContractApprovalDialog from "../../Settings/Quotation/Dialog.vue"
import { SalesApprovalsContractOverlayData } from "../Const";
import { SalesApprovalsTerminationOverlayData } from "../Const";
import CustomSpeedDials from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
export default {
  name: "ApprovalTables",
  components: {
    DataTable,
    Column,
    // Button,
    CustomSpeedDials,
    // ContractApprovalDialog,
    InputText,
  },
  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
    "dataKey",
  ],
  data() {
    return {
      filters: null,
      expandedRows: [],
      rowSelect: null,
      OverlayData: SalesApprovalsContractOverlayData,
      title: "Contract",
      show: true,
    };
  },

  methods: {
    openTerminationDialog(data) {
      this.$store.state.salesApproval.approvalsTerminationStateData = data;

      this.$store.dispatch("salesApproval/openDialog", {
        dialogDetails: {
          dialogName: "ApprovalsTerminationDialog",
          dialogHeader: "Termination",
        },
      });
      this.$store.getters["salesApproval/controlActivityDialog"];
    },
    getSignedDocClassHandler(data) {
      // switch (data) {
      //         case "Not Recieved": return '#000' ;

      //             default : return '#872712'

      //     }
      if (data == true) {
        return "approvd";
      } else return "declined";
    },
    getSignedDocHandler(data) {
      if (data == true) {
        return "Recieved";
      } else return "Not Recieved";
    },
    // onRowExpand(e) {
    //   console.log("expansded");
    // },
    openDialog(name, type, header, status, contractId, termination_id) {
      this.$store.state.salesApproval.approvalContractStatus = {
        status,
        contract_id: contractId,
        tableName: this.tableName,
        termination_id: termination_id,
      };
      this.$store.dispatch("salesApproval/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["salesApproval/controlActivityDialog"];
    },
    rowClass(row) {
      for (var r in row) {
        if (r == "company_status") {
          if (row[r] == "deleted") {
            return "deleted_row";
          }
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    getOverlayData() {
      return []
      // switch (this.tableName) {
      //   case "ApprovalsContractTab":
      //     return SalesApprovalsContractOverlayData;

      //   // case "ApprovalsTerminationTab":
      //   //   return SalesApprovalsTerminationOverlayData;
      //   default:
      //     return SalesApprovalsContractOverlayData;
      // }
    },
    goToContractOverview(
      customerType,
      businessType,
      contractId,
      profileId,
      expressContractService
    ) {
      const contract = "contract";
      switch (customerType) {
        case "Express":
          switch (expressContractService) {
            case "Bike":
              this.$router.push({
                name: "ExpressContractBikeQuotationOverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Van":
              this.$router.push({
                name: "ExpressContractVanQuotataionOverview",
              });
              break;
            case "FSR":
              this.$router.push({
                name: "ExpressConractFSROverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Inter Company":
              this.$router.push({
                name: "ExpressContractInterCompanyOverview",
              });
              break;
            case "Project Jobs":
              this.$router.push({
                name: "ExpressContractProjectJobsOverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Van + FSR":
              this.$router.push({
                name: "ExpressContractVanFSROverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Bike + FSR":
              this.$router.push({
                name: "ExpressContractBikeFSRQuotationOverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Van + Project Jobs":
              this.$router.push({
                name: "ExpressContractVanProjectJobsOverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Bike + Project Jobs":
              this.$router.push({
                name: "ExpressContractVanProjectJobsOverview",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;

            default:
              break;
          }
          break;
        case "International":
          switch (businessType) {
            case "Agent":
              this.$router.push({
                name: "InternationalAgent",
                params: { id: contractId, type: contract, mode: "overview" },
              });
              break;
            case "Contract":
              this.$router.push({
                name: "InternationalContractOverview",
                params: {
                  id: contractId,
                  type: contract,
                  pid: profileId,
                  mode: "overview",
                },
              });
              break;
            default:
              break;
          }
          break;
        case "Rapido":
          this.$router.push({
            name: "RapidoRapidoContractOverview",
            params: {
              id: contractId,
              type: contract,
              p_id: profileId,
              mode: "overview",
            },
          });
          break;
        default:
          // break;
          this.$router.push({
            name: "RapidoRapidoContractOverview",
            params: {
              id: 14,
              type: contract,
              p_id: 4,
              mode: "history",
            },
          });
      }
    },
    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      };
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      };
      for (let c in this.tableColumns) {
        this.filters[this.tableColumns[c]["field"]] = obj;
        if (
          this.tableColumns[c]["field"] == "createdAt" ||
          this.tableColumns[c]["field"] == "createdOn"
        ) {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
      }
    },
    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
        globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
  },
  created() {
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.contacts.globalSearch": function () {
      this.filters["global"].value = this.$store.state["contacts"].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.contactsImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.avatar-text {
  color: #353b48;
  font-family: $font-family-secondary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}

.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
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
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: #7e84a7;
}

::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: #357dea;
  border-radius: 5px;
  color: #fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .p-paginator {
  background-color: #edf1f7 !important;
}
.pi-check {
  background: #81ff7f;
  padding: 3px !important;
  border-radius: 6px;
  cursor: pointer;
}

.pi-times {
  background: #ffa084;
  padding: 3px !important;
  border-radius: 7px;
}

.contract-image {
  width: 44px;
  height: 25px;
  margin-top: 10px;
}
.btn {
  background: #81ff7f;
  border-color: #81ff7f;
  border-radius: 7px;
  border-style: none;
}
.btn-times {
  background: #ffa084;
  // border-color: #ffa084;
  border-radius: 7px;
  width: 41px;
  border-style: none;
}
.declined {
  color: #562110;
}
.approvd {
  color: #136d21;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
}
</style>
