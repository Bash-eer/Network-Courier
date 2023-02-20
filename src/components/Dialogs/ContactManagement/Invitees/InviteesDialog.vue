<template>
  <div class="formgrid grid mt-3">
    <div class="field col-6 md:col-6">
      <h5 class="required dialog-label-text">Main Group</h5>
      <DropDown
        code="code"
        :data="$store.state.contacts.inviteesMainGroupsDropDownData"
        label="group_name"
        id="group_name"
        v-model="details.group_name"
        :classes="{
          'p-invalid': v$.details.group_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-6 md:col-6">
      <h5 class="required dialog-label-text">Sub-Group Name</h5>
      <DropDown
        :key="subGroupsDropDownData"
        code="code"
        :data="subGroupsDropDownData"
        label="group_name"
        id="group_name"
        v-model="details.sub_group_name"
        :classes="{
          'p-invalid': v$.details.sub_group_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-6 md:col-6">
      <h5 class="required dialog-label-text">Table No</h5>
      <TextField
        label="sub_group_name"
        type="text"
        v-model="details.table_no"
        @blur="v$.details.table_no.$model"
        :classes="{
          'p-invalid': v$.details.table_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <Invitees
    :data="$store.state.contacts.eventsOverviewFormInviteesData"
    usage="dialog"
    inviteesClass="invitees_parent"
    noInviteesClass="noInvitees"
  />
  <span v-if="details.sub_group_name != ''">
    <div
      class="
        flex
        justify-content-between
        pl-2
        mt-2
        align-items-center
        justify-content-center
      "
    >
      <div class="flex allContactsText">All Contacts</div>
      <div class="flex">
        <TextField
          v-model="searcher"
          label="contactsSearch"
          placeholder="Search Contacts"
          type="text"
          :classes="{
            'inputfield w-full dialog-dropdown-text inviteesTableSearch': true,
          }"
          v-on:childToParent="globalSearcher"
        />
      </div>
    </div>
    <ContactTables
      :tableClass="'contactEventsTableClass'"
      :tableDataName="'eventContactsTableData'"
      :tableName="'eventContactsTable'"
      :storePath="'contacts'"
      :tableData="$store.state['contacts']['eventContactsTableData']"
      :tableColumns="$store.state['contacts']['eventContactsTableColumnData']"
    />
  </span>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Done"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "InviteesDialog",
  data() {
    return {
      subGroupsDropDownData: [],
      searcher: "",
      v$: useVuelidate(),
      details: {
        group_name: "",
        sub_group_name: "",
        table_no: "",
      },
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        group_name: { required },
        sub_group_name: { required },
        table_no: { required },
      },
    };
  },
  methods: {
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    resetTable() {
      for (let t in this.$store.state["contacts"]["eventContactsTableData"]) {
        this.$store.state["contacts"]["eventContactsTableData"][t][
          "inviteeStatus"
        ] = "Invite";
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let inviteeDetails = {};
        let invitees = [];
        let choosenInvitees =
          this.$store.state.contacts.eventsOverviewFormInviteesData;
        for (let ci in choosenInvitees) {
          let ciObj = {};
          if (choosenInvitees[ci]["id"]) {
            ciObj["id"] = choosenInvitees[ci]["id"];
          }
          ciObj["contact_id"] = choosenInvitees[ci]["contact_id"];
          invitees.push(ciObj);
        }
        inviteeDetails["sub_group_members"] = invitees;
        inviteeDetails["delete_sub_group_members"] =
          this.$store.state.contacts.deletedEventGroupsInviteesIds;

        let path = "event/Invitees/status/" + this.details.sub_group_name;
        //making an update/PATCH api call to update invitee details
        this.$store.dispatch("contacts/contactMangementCRUD", {
          path: path,
          mutation: "fetchInviteesTableData",
          tag: "update",
          data: inviteeDetails,
          nameKey: "users_contact_events",
        });
      }
    },
  },
  created() {
    this.resetTable();
    this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
  },
  watch: {
    //filtering sub groups based on main groups choice
    "details.group_name": function () {
      //reset data
      this.details.sub_group_name = "";
      this.subGroupsDropDownData = [];
      this.inviteesData = [];
      this.details.table_no = "";

      let mainGroupId = this.details.group_name;
      let allSubGroupsDropDownData =
        this.$store.state.contacts.inviteesSubGroupsDropDownData;
      for (let sg in allSubGroupsDropDownData) {
        if (allSubGroupsDropDownData[sg]["mainGroupId"] == mainGroupId) {
          this.subGroupsDropDownData.push(allSubGroupsDropDownData[sg]);
        }
      }
    },
    //filtering invitees and table number based on sub groups choice
    "details.sub_group_name": function () {
      //reset data
      this.$store.state.contacts.eventsOverviewFormInviteesData = [];

      let subGroupsInviteesData =
        this.$store.state.contacts.subGroupInviteesData;
      for (let sg in subGroupsInviteesData) {
        if (
          subGroupsInviteesData[sg]["subGroupId"] == this.details.sub_group_name
        ) {
          this.details.table_no = subGroupsInviteesData[sg]["table_no"];
          this.$store.state.contacts.eventsOverviewFormInviteesData =
            subGroupsInviteesData[sg]["data"];
        }
      }
    },
    //filtering the table invitation status based on invitees
    "$store.state.contacts.eventsOverviewFormInviteesData": function () {
      if (this.$store.state.contacts.inviteesTableSearchTracker == 0) {
        //reset data
        this.resetTable();

        let tableData = this.$store.state["contacts"]["eventContactsTableData"];
        let eventsOverviewFormInviteesData =
          this.$store.state.contacts.eventsOverviewFormInviteesData;
        if (eventsOverviewFormInviteesData.length != 0) {
          for (let t in tableData) {
            for (let em in eventsOverviewFormInviteesData) {
              if (
                eventsOverviewFormInviteesData[em]["contact_id"] ==
                tableData[t]["contact_id"]
              ) {
                if (eventsOverviewFormInviteesData[em]["id"]) {
                  this.$store.state["contacts"]["eventContactsTableData"][t][
                    "id"
                  ] = eventsOverviewFormInviteesData[em]["id"];
                }
                this.$store.state["contacts"]["eventContactsTableData"][t][
                  "inviteeStatus"
                ] = "Invited";
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
