<template>
  <DataTable
    :class="tableClass"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    :dataKey="dataKey"
    filterDisplay="menu"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="tableName == 'travelsTable' ? false : true"
      :style="getColWidth(col.header)"
    >
      <template #body="slotProps">
        <!-- ACTIONS TEMPLATE-->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="contacts"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- NAME TEMPLATE -->
        <span v-if="col.header == 'Sub Group name'">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <AvatarLabel
                v-if="slotProps.data['image_url'] == null"
                v-bind:label="slotProps.data[col.field].substring(0, 2)"
                classes="avatar-text"
              />
              <img
                v-if="slotProps.data['image_url'] != null"
                :src="slotProps.data['image_url']"
                class="contactsImage"
              />
            </div>
            <div class="flex align-items-center">
              {{ slotProps.data[col.field] }}
            </div>
          </div>
        </span>

        <!-- CREATED BY TEMPLATE -->
        <span v-if="col.header == 'Created By'">Josh</span>
        <!-- CREATED BY TEMPLATE -->

        <!-- MEMBERS TEMPLATE -->
        <span
          class="members"
          v-if="col.header == 'Members'"
          @click="openDialog('MembersDialog', slotProps.data)"
        >
          <PrimeGroupedAvatars :data="getMembers(slotProps.data)[0]" />
        </span>

        <!-- STATUS TEMPLATE -->
        <span v-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? "Active"
                : "Sold"
            }}</span
          >
        </span>

        <span
          v-if="
            col.header != 'Created On' &&
            col.header != 'Created By' &&
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Sub Group name' &&
            col.header != 'Members'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
export default {
  name: "ContactSubTables",
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
    return {};
  },
  methods: {
    //eslint-disable-next-line no-unused-vars
    getColWidth(column) {
      return "max-width:30px";
      // if (column == "Actions") {
      //   return "max-width:30px";
      // }
      // if (column == "Sub Group name" || column == "Members") {
      //   return "max-width:40px";
      // }
    },
    openDialog(name, data) {
      this.$store.state.contacts.groupMembersData = this.getMembers(data)[1];
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters["users/controlActivityDialog"];
    },
    getMembers(data) {
      let memberProfiles = [];
      let memberDetails = [];
      let nc_members = data["groups_network_courier_members"];
      let prsnl_members = data["groups_personal_contact_members"];
      processMembersData(nc_members, "contacts_groups_network_courier_members");
      processMembersData(
        prsnl_members,
        "contacts_groups_personal_contact_members"
      );
      function processMembersData(data, key) {
        for (let m in data) {
          memberProfiles.push(data[m][key]["image_url"]);
          memberDetails.push({
            id: data[m][key]["id"],
            profile: data[m][key]["image_url"],
            name: data[m][key]["name"],
            phone: data[m][key]["mobile_no"],
          });
        }
      }
      return [memberProfiles, memberDetails];
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    timeParser(time) {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let parsed_time = hours + ":" + minutes;
      return parsed_time;
    },
    rowClass() {
      return "formRows";
    },
  },
  components: { DataTable, Column },
  mounted() {
    var formRows = document.getElementsByClassName("formRows");
    for (let fr in formRows) {
      let fr_obj = formRows[fr];
      if (isNaN(fr_obj) == true) {
        fr_obj.id = "row" + "_" + fr;
        let h_tag = document.createElement("h2");
        let p_tag = document.createElement("p");
        let current_row = document.getElementById("row" + "_" + fr);
        if (current_row) {
          current_row.before(h_tag);
          current_row.before(p_tag);
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.members {
  cursor: pointer;
}
.contactsImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.status-Active {
  color: #17c079;
  font-weight: bold;
}
.status-Inactive {
  color: #ea6e39;
  font-weight: bold;
}
.status-Deleted {
  color: #c01717;
  font-weight: bold;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}
.deletedClass {
  color: #c01717;
  font-weight: bold;
}
.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
.subGroupsTable .p-datatable-tbody > tr:not(.p-highlight):hover {
  background-color: #ffffff !important;
  border-bottom-color: #ffff !important;
}
.travelsTable .p-datatable-tbody > tr:not(.p-highlight):hover {
  background-color: #ffffff !important;
  border-bottom-color: #ffff !important;
}
.formRows {
  margin-top: 2% !important;
}
.subGroupsTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.travelsTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.subGroupsTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-radius: 6px;
  border-bottom-color: #f0f0ff !important;
}
.travelsTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-radius: 6px;
  border-bottom-color: #f0f0ff !important;
}
.subGroupsTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.travelsTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.subGroupsTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.travelsTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.subGroupsTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-color: #edf1f7 !important;
}
.travelsTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-color: #edf1f7 !important;
}
.subGroupsTable .p-datatable-thead > tr > th {
  background: transparent !important;
  border: 0px !important;
}
.travelsTable .p-datatable-thead > tr > th {
  background: #ffffff !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-radius: 4px;
  border-color: #ffffff !important;
}
</style>
