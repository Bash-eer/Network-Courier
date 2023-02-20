<template>
  <DataTable
    :class="tableClass"
    class="p-datatable-sm editable-cells-table contactsTable"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    v-model:selection="selectionMode"
    v-model:filters="filters"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    responsiveLayout="scroll"
    filterDisplay="menu"
    :globalFilterFields="[
      'display_name',
      'roles',
      'role_name',
      'username',
      'user_id',
      'contact_number',
      'contact_no',
      'mobile_no',
      'email',
      'created_by',
      'createdBy',
      'status',
      'company_name',
      'customer_code',
      'online_customer_type',
      'count',
      'costCenter',
      'os',
      'ip_address',
      'location',
      'logged_in',
      'logged_out',
      'contact.contactName',
    ]"
    :dataKey="'contact_id'"
    :paginator="true"
    :rows="5"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10]"
    pageLinkSize = 3
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="
        col.header == 'Select Contacts'
          ? 'width:90%'
          : 'max-width:10%;min-width:10%'
      "
      :sortable="tableName == 'RoomsData' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'Image' ? true : false
      "
      :showFilterMatchModes="
        col.header == 'Created On' ||
        col.header == 'Logged In' ||
        col.header == 'Logged Out'
          ? false
          : true
      "
    >
      <template #body="slotProps">
        <!--CONTACTS TEMPLATE-->
        <span v-if="col.header == 'Select Contacts'">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <img
                :src="
                  slotProps.data[col.field]['contactPicture'] != null
                    ? slotProps.data[col.field]['contactPicture']
                    : './images/defaultProfile.jpg'
                "
                width="32"
                height="32"
                alt=""
              />
            </div>
            <div class="flex">
              <div class="flex flex-column justify-content-center">
                <div class="flex">
                  {{ slotProps.data[col.field]["contactName"] }}
                </div>
                <div class="flex">
                  {{ slotProps.data[col.field]["contactNumber"] }}
                </div>
              </div>
            </div>
          </div>
        </span>
        <!--INVITE TEMPLATE-->
        <span
          v-if="col.header == 'Invite'"
          class="addInvitee"
          @click="
            inviteeControl(
              slotProps.data[col.field],
              slotProps.data['contact_id'],
              slotProps.data
            )
          "
        >
          <div class="flex justify-content-between inviteDiv w-4rem">
            <div
              :class="
                slotProps.data[col.field] == 'Invite'
                  ? 'flex inviteText'
                  : 'flex invitedText'
              "
            >
              {{ slotProps.data[col.field] }}
            </div>

            <div class="flex">
              <img
                :src="
                  '/images/' +
                  getInviteeImage(slotProps.data[col.field]) +
                  '.png'
                "
                alt=""
                :class="getInviteeImage(slotProps.data[col.field])"
              />
            </div>
          </div>
        </span>
      </template>
    </Column>
    <Column
      v-if="tableName == 'contactsTable'"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column
  ></DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  name: "ContactTables",
  components: {
    DataTable,
    Column,
  },
  props: [
    "type",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "selectionModeState",
    "formTableDataName",
  ],
  data() {
    return {
      selectedRows: [],
      selectionMode: null,
      filters: null,
    };
  },
  methods: {
    inviteeControl(value, index, data) {
      let inviteesData =
        this.$store.state.contacts.eventsOverviewFormInviteesData.length == 0
          ? "inviteesData"
          : "eventsOverviewFormInviteesData";
      for (let t in this.tableData) {
        if (this.tableData[t]["contact_id"] == index) {
          this.$store.state["contacts"][this.tableDataName][t][
            "inviteeStatus"
          ] = value == "Invite" ? "Invited" : "Invite";
        }
      }
      //to invite an invitee
      if (value == "Invite") {
        // let deletedIds =this.$store.state.contacts.deletedEventGroupsInviteesIds;
        let inviteeObj = {};
        // if (data["id"]) {
        //   if (deletedIds.length != 0) {
        //     // for (let del in deletedIds) {
        //     //   if (deletedIds[del] == data["id"]) {
        //     //     this.$store.state.contacts.deletedEventGroupsInviteesIds.splice(
        //     //       del,
        //     //       1
        //     //     );
        //     //   }
        //     // }
        //   }
        //   // inviteeObj["id"] = data["id"];
        // }
        inviteeObj["contact_id"] = data["contact_id"];
        inviteeObj["imgUrl"] = data["contact"]["contactPicture"];
        inviteeObj["name"] = data["contact"]["contactName"];
        inviteeObj["phone"] = data["contact"]["contactNumber"];
        this.$store.state.contacts[inviteesData].push(inviteeObj);
      }
      //to remove an invitee
      if (value == "Invited") {
        if (data["id"]) {
          this.$store.state.contacts.deletedEventGroupsInviteesIds.push(
            data["id"]
          );
        }
        let inviteesArray = this.$store.state.contacts[inviteesData];
        for (let i in inviteesArray) {
          if (inviteesArray[i]["contact_id"] == data["contact_id"]) {
            this.$store.state.contacts[inviteesData].splice(i, 1);
          }
        }
      }
    },
    getInviteeImage(value) {
      let src;
      switch (value) {
        case "Invite":
          src = "addInvitee";
          break;
        case "Invited":
          src = "removeInvitee";
          break;
      }
      return src;
    },
    rowClass() {
      return "contactRows";
    },
    // eslint-disable-next-line no-unused-vars
    updateContactsType(data, action) {
      //to select rows
      if (action == "add") {
        for (let d in data) {
          let m_no = data[d]["contact_id"];
          let bool = false;
          for (let c in this.$store.state[this.storePath][
            this.formTableDataName
          ]) {
            let c_obj =
              this.$store.state[this.storePath][this.formTableDataName][c];
            if (c_obj["contact_id"]) {
              if (c_obj["contact_id"] == m_no) {
                bool = true;
              }
            }
          }
          if (bool == false) {
            this.$store.state[this.storePath][this.formTableDataName].push(
              data[d]
            );
          }
        }
      }
      //rows unselection
      if (action == "remove") {
        //to unselect all rows
        if (Array.isArray(data)) {
          for (let d in this.$store.state[this.storePath][
            this.formTableDataName
          ]) {
            if (
              this.$store.state[this.storePath][this.formTableDataName][d][
                "contactType"
              ] == this.type
            ) {
              this.$store.state.contacts.deletedContactIds.push(
                this.$store.state[this.storePath][this.formTableDataName][d]
              );
            }
          }
          this.$store.state[this.storePath][this.formTableDataName] =
            this.$store.state[this.storePath][this.formTableDataName].filter(
              (c) => c["contactType"] != this.type
            );
        }
        //to unselect a single row
        else {
          for (let c in this.$store.state[this.storePath][
            this.formTableDataName
          ]) {
            let c_obj =
              this.$store.state[this.storePath][this.formTableDataName][c];
            if (c_obj["contact_id"] == data["contact_id"]) {
              this.$store.state[this.storePath][this.formTableDataName].splice(
                c,
                1
              );
              // if (this.$store.state.contacts.deletedContactIds.length != 0) {
              //   for (let del in this.$store.state.contacts.deletedContactIds) {
              //   }
              // } else {
              this.$store.state.contacts.deletedContactIds.push(c_obj);
              // }
            }
          }
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    selectAllRows(event) {
      this.updateContactsType(this.selectionMode, "add");
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.updateContactsType([], "remove");
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.updateContactsType(this.selectionMode, "add");
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.updateContactsType(event.data, "remove");
    },
    initilaizeFilters() {
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "contact.contactName": {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
  },
  created() {
    if (this.tableName == "contactsTable") {
      if (
        this.selectionModeState != undefined &&
        this.selectionModeState != null
      ) {
        this.selectionMode = this.selectionModeState;
      }
      if (
        this.selectionModeState == undefined ||
        this.selectionModeState == null
      ) {
        this.selectionMode = null;
      }
    }
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.contacts.contactsSelectionModeState": function () {
      let filteredArray = [];
      for (let c in this.$store.state.contacts.contactsSelectionModeState) {
        let c_obj = this.$store.state.contacts.contactsSelectionModeState[c];
        if (c_obj["contactType"] == this.type) {
          filteredArray.push(c_obj);
        }
      }
      this.selectionMode = filteredArray;
    },
    "$store.state.contacts.globalSearch": function () {
      // if (this.$store.state[this.storePath].globalSearch == null) {
      //   this.selectionMode = this.$store.state.contacts.contactsFormTableData;
      // }

      // if (this.selectionMode != null) {
      //   if (this.selectionMode.length == 1) {
      //     if (
      //       !this.selectionMode[0]["contact"]["contactName"].startsWith(
      //         this.$store.state[this.storePath].globalSearch
      //       )
      //     ) {
      //       this.selectionMode = null;
      //     }
      //     if (
      //       this.selectionMode[0]["contact"]["contactName"].startsWith(
      //         this.$store.state[this.storePath].globalSearch
      //       )
      //     ) {
      //       this.selectionMode =
      //         this.$store.state.contacts.contactsFormTableData;
      //     }
      //   }
      // }
      this.filters["contact.contactName"].constraints[0].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style>
.contactEventsTableClass .p-datatable-thead > tr > th {
  background: transparent;
  color: #ffff;
  border: none;
}
.inviteText {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.invitedText {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #32be72;
}
.inviteDiv {
  text-align: start;
}
.addInvitee {
  width: 15px;
  height: 15px;
}
.removeInvitee {
  width: 15px;
  height: 15px;
}
.addInvitee {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.child {
  display: inline-block;
}
</style>
