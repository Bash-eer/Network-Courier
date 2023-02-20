<template>
  <div class="formgrid grid mt-3">
    <div class="field col-6 md:col-6">
      <h5 class="required dialog-label-text">Main Group</h5>
      <DropDown
        :disabled="
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
          0
            ? true
            : false
        "
        :key="
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
          0
            ? details.group_name
            : ''
        "
        code="code"
        :state="details.group_name"
        :data="$store.state.contacts.eventsMainGroupsDropDownData"
        label="group_name"
        id="group_name"
        v-model="details.group_name"
        :classes="{
          'p-invalid': v$.details.group_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
        style="height:38px;"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-6 md:col-6">
      <h5 class="required dialog-label-text">Sub Group Name</h5>
      <TextField
        label="sub_group_name"
        type="text"
        v-model="details.sub_group_name"
        @blur="v$.details.sub_group_name.$model"
        :classes="{
          'p-invalid': v$.details.sub_group_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
        class="borderText"
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
        class="borderText"
      
      />
    </div>
  </div>
  <Invitees
    :data="$store.state.contacts.inviteesData"
    usage="dialog"
    inviteesClass="invitees_parent"
    noInviteesClass="noInvitees"
  />
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
         <div
    class="
      searchicon
      flex flex-row
      justify-content-end
      align-items-center
      
    "
  >
    <i class="fa fa-search ml-1"></i>
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
    :key="$store.state['contacts']['eventContactsTableData']"
    :tableClass="'contactEventsTableClass'"
    :tableDataName="'eventContactsTableData'"
    :tableName="'eventContactsTable'"
    :storePath="'contacts'"
    :tableData="$store.state['contacts']['eventContactsTableData']"
    :tableColumns="$store.state['contacts']['eventContactsTableColumnData']"
  />
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
  name: "EventSubGroup",
  data() {
    return {
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
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    processInviteesData() {
      let subGroupMembers = [];
      for (let t in this.$store.state.contacts.inviteesData) {
        let subGroupMembersObj = {};
        subGroupMembersObj["contact_id"] =
          this.$store.state.contacts.inviteesData[t]["contact_id"];
        if (this.$store.state.contacts.inviteesData[t]["id"]) {
          subGroupMembersObj["id"] =
            this.$store.state.contacts.inviteesData[t]["id"];
        }
        subGroupMembersObj["imgUrl"] =
          this.$store.state.contacts.inviteesData[t]["imgUrl"];
        subGroupMembersObj["name"] =
          this.$store.state.contacts.inviteesData[t]["name"];
        subGroupMembersObj["phone"] =
          this.$store.state.contacts.inviteesData[t]["phone"];
        subGroupMembers.push(subGroupMembersObj);
      }
      return subGroupMembers;
    },
    processMainGroupsData(groupName) {
      let groupsObj = {};
      groupsObj["group_name"] = groupName;
      groupsObj["sub_groups"] = this.processSubGroupsData();
      this.$store.state.contacts.eventGroupsData.push(groupsObj);
    },
    processSubGroupsData() {
      let subGroupDetails = [];
      let subGroupsObj = {};
      for (let d in this.details) {
        if (d != "group_name") {
          subGroupsObj[d] = this.details[d];
        }
      }
      subGroupsObj["sub_group_members"] = this.processInviteesData();
      subGroupDetails.push(subGroupsObj);
      return subGroupDetails;
    },
    createSubGroup(groupName) {
      let flag = 0;
      //adding a sub group to an existing main group
      if (this.$store.state.contacts.eventGroupsData.length != 0) {
        let groupsData = this.$store.state.contacts.eventGroupsData;
        for (let g in groupsData) {
          if (groupsData[g]["group_name"] == groupName) {
            flag = 1;
            if (groupsData[g]["sub_groups"]) {
              let getSubGroupsArray = this.processSubGroupsData();
              this.$store.state.contacts.eventGroupsData[g]["sub_groups"].push(
                getSubGroupsArray[0]
              );
            }
          }
        }
        if (flag == 0) {
          this.processMainGroupsData(groupName);
        }
      }
      //creating a main group with sub group for the first time
      else {
        this.processMainGroupsData(groupName);
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        //when CREATING a sub group
        if (
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length ==
          0
        ) {
          //fetching the main group name
          let groupName;
          if (this.$store.state.contacts.eventsMainGroupName != null) {
            if (
              this.details.group_name !=
              this.$store.state.contacts.eventsMainGroupName
            ) {
              groupName = this.dropDownFilter(
                this.$store.state.contacts.eventsMainGroupsDropDownData,
                "code",
                this.details.group_name
              );
            } else {
              groupName = this.$store.state.contacts.eventsMainGroupName;
            }
          }
          if (this.$store.state.contacts.eventsMainGroupName == null) {
            groupName = this.dropDownFilter(
              this.$store.state.contacts.eventsMainGroupsDropDownData,
              "code",
              this.details.group_name
            );
          }
          this.createSubGroup(groupName);
        }
        if (
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
            0 &&
          this.$store.state.contacts.eventGroupsStateData["type"] ==
            "main_group"
        ) {
          //fetching the main group name
          let groupName;
          groupName = this.details.group_name;
          this.createSubGroup(groupName);
        }

        //when EDITING a sub group
        if (
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
            0 &&
          this.$store.state.contacts.eventGroupsStateData["type"] == "sub_group"
        ) {
          let subGroupsStateData =
            this.$store.state.contacts.eventGroupsStateData;
          let eventGroupsData = this.$store.state.contacts.eventGroupsData;
          for (let eg in eventGroupsData) {
            //narrowing down the search by main group name
            if (
              eventGroupsData[eg]["group_name"] ==
              subGroupsStateData["group_name"]
            ) {
              let subGroupsArray = eventGroupsData[eg]["sub_groups"];
              for (let sg in subGroupsArray) {
                //narrowing down the search by sub group name
                if (
                  subGroupsArray[sg]["sub_group_name"] ==
                  subGroupsStateData["sub_group_name"]
                ) {
                  //updating the form fields
                  for (let state in this.details) {
                    if (state != "group_name") {
                      this.$store.state.contacts.eventGroupsData[eg][
                        "sub_groups"
                      ][sg][state] = this.details[state];
                    }
                  }
                  this.$store.state.contacts.eventGroupsData[eg]["sub_groups"][
                    sg
                  ]["sub_group_members"] = this.processInviteesData();
                }
              }
            }
          }
        }
        this.$store.state["users"].displayDialog = false;
      }
    },
    //loads the past invitees' state
    processInviteesState(data) {
      let inviteeObj = {};
      if (data["id"]) {
        inviteeObj["id"] = data["id"];
      }
      inviteeObj["contact_id"] = data["contact_id"];
      inviteeObj["imgUrl"] = data["contact"]["contactPicture"];
      inviteeObj["name"] = data["contact"]["contactName"];
      inviteeObj["phone"] = data["contact"]["contactNumber"];
      this.$store.state.contacts.inviteesData.push(inviteeObj);
    },
    processStates(tag) {
      let inviteesData =
        this.$store.state.contacts.eventGroupsStateData["sub_group_members"];
      for (let t in this.$store.state["contacts"]["eventContactsTableData"]) {
        let tObj = this.$store.state["contacts"]["eventContactsTableData"][t];
        for (let i in inviteesData) {
          if (inviteesData[i]["contact_id"] == tObj["contact_id"]) {
            if (inviteesData[i]["id"]) {
              this.$store.state["contacts"]["eventContactsTableData"][t]["id"] =
                inviteesData[i]["id"];
              tObj["id"] = inviteesData[i]["id"];
            }
            //loads the past invitees' state
            if (tag == "chips") {
              this.processInviteesState(tObj);
            }
            //loads the past contact table's state
            if (tag == "table") {
              this.$store.state["contacts"]["eventContactsTableData"][t][
                "inviteeStatus"
              ] = "Invited";
            }
          }
        }
      }
    },
    resetTable() {
      for (let t in this.$store.state["contacts"]["eventContactsTableData"]) {
        this.$store.state["contacts"]["eventContactsTableData"][t][
          "inviteeStatus"
        ] = "Invite";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
          0 &&
        this.$store.state.contacts.eventGroupsStateData["type"] == "sub_group"
      ) {
        this.resetTable();
        //loads the past invitees' state
        this.processStates("chips");
        //loads the past contact table's state
        this.processStates("table");
        //loads other fields' past state
        for (let state in this.details) {
          this.details[state] =
            this.$store.state.contacts.eventGroupsStateData[state];
        }
      }
      if (
        Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
          0 &&
        this.$store.state.contacts.eventGroupsStateData["type"] == "main_group"
      ) {
        this.resetTable();
        if (this.$store.state.contacts.eventGroupsStateData.id) {
          this.details["group_name"] = this.dropDownFilter(
            this.$store.state.contacts.eventsMainGroupsDropDownData,
            "code",
            this.$store.state.contacts.eventGroupsStateData["id"]
          );
        }
        if (!this.$store.state.contacts.eventGroupsStateData.id) {
          this.details["group_name"] =
            this.$store.state.contacts.eventGroupsStateData["group_name"];
        }
      }
      if (this.$store.state.contacts.eventsMainGroupName != null) {
        this.details["group_name"] =
          this.$store.state.contacts.eventsMainGroupName;
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.inviteesTableSearch {
  height: 36px;
}
.allContactsText {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.borderText{
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-radius: 2px;
}
::v-deep .border {
  border: none !important;
}
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}
::v-deep .p-inputtext {
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  border-color: none !important;
}
</style>
