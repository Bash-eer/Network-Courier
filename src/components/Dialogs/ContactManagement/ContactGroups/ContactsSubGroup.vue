<template>
  <div class="formgrid grid mt-5">
    <div class="field col-12 md:col-7">
      <h5 class="required dialog-label-text">Select Main Group</h5>
      <DropDown
        :disabled="
          Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
            .length != 0
            ? true
            : false
        "
        code="code"
        :state="details.group_id"
        :data="$store.state.contacts.mainGroupsDropDownData"
        label="group_id"
        id="group_id"
        v-model="details.group_id"
        :classes="{
          'p-invalid': v$.details.group_id.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mt-2">
    <div class="flex ml-2">
      <ImgUpload :state="subGroupsImageState" URL="/images/profile-here.png" />
    </div>
    <div class="field col-12 md:col-8 mt-4">
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
      />
    </div>
  </div>
  <ContactsSelection />
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
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />
      <Buttons
        label="Done"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ContactsSubGroup",
  data: () => ({
    mainGroupName: null,
    deletedNCContacts: [],
    deletedPsnlContacts: [],
    allContactsState: [],
    subGroupsImageState: "",
    v$: useVuelidate(),
    details: {
      group_id: "",
      sub_group_name: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        group_id: { required },
        sub_group_name: { required },
      },
    };
  },
  methods: {
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    reverseDropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].code;
        }
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let subGroupDetails = {};
        for (let d in this.details) {
          subGroupDetails[d] = this.details[d];
        }
        subGroupDetails["image_url"] =
          this.$store.state.fleets.globalImageUploadURL;

        let networkCourierContacts = [];
        let personalContacts = [];
        let contactsData = this.$store.state.contacts.contactsFormTableData;
        for (let c in contactsData) {
          let c_obj = contactsData[c];
          if (c_obj["contactType"] == "Network Courier") {
            let nc_obj = {};
            nc_obj["contact_id"] = c_obj["contact_id"];
            if (c_obj.id) {
              nc_obj["id"] = c_obj.id;
            }
            networkCourierContacts.push(nc_obj);
          }
          if (c_obj["contactType"] == "Personal") {
            let p_obj = {};
            p_obj["contact_id"] = c_obj["contact_id"];
            if (c_obj.id) {
              p_obj["id"] = c_obj.id;
            }
            personalContacts.push(p_obj);
          }
        }
        subGroupDetails["network_courier_members"] = networkCourierContacts;
        subGroupDetails["personal_contact_members"] = personalContacts;

        if (
          Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
            .length != 0
        ) {
          for (let d in this.$store.state.contacts.deletedContactIds) {
            let d_obj = this.$store.state.contacts.deletedContactIds[d];
            if (d_obj["contactType"] == "Network Courier") {
              this.deletedNCContacts.push(d_obj["id"]);
            }
            if (d_obj["contactType"] == "Personal") {
              this.deletedPsnlContacts.push(d_obj["id"]);
            }
          }
        }
        subGroupDetails["deleted_network_courier_members"] =
          this.deletedNCContacts;
        subGroupDetails["deleted_personal_contact_members"] =
          this.deletedPsnlContacts;

        //making an add/POST api call to update the sub group details for the choosen main group
        if (
          this.$store.state.contacts.contactGroupsFormStateData.id &&
          this.$store.state.contacts["contactGroupsFormStateData"]["type"] ==
            "sub_group"
        ) {
          subGroupDetails["id"] =
            this.$store.state.contacts.contactGroupsFormStateData.id;
          subGroupDetails["group_id"] = this.reverseDropDownFilter(
            this.$store.state.contacts.mainGroupsDropDownData,
            "name",
            subGroupDetails["group_id"]
          );
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "subGroups",
            mutation: "fetchContactManagementMainGroupTableData",
            tag: "update",
            data: subGroupDetails,
            nameKey: "users_contact_main_group",
          });
        }
        //making an add/POST api call to create a sub group for the choosen main group
        else {
          if (
            Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
              .length == 0 ||
            this.$store.state.contacts["contactGroupsFormStateData"]["type"] ==
              "main_group" ||
            this.$store.state.contacts.mainGroupName != null
          ) {
            if (
              this.$store.state.contacts["contactGroupsFormStateData"][
                "type"
              ] == "main_group"
            ) {
              subGroupDetails["group_id"] = this.reverseDropDownFilter(
                this.$store.state.contacts.mainGroupsDropDownData,
                "name",
                subGroupDetails["group_id"]
              );
            } else if (this.$store.state.contacts.mainGroupName != null) {
              if (this.details["group_id"] != this.mainGroupName) {
                subGroupDetails["group_id"] = this.details["group_id"];
              } else {
                subGroupDetails["group_id"] = this.reverseDropDownFilter(
                  this.$store.state.contacts.mainGroupsDropDownData,
                  "name",
                  subGroupDetails["group_id"]
                );
              }
            } else {
              subGroupDetails["group_id"] = this.details.group_id;
            }
          }
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "subGroups",
            mutation: "fetchContactManagementMainGroupTableData",
            tag: "add",
            data: subGroupDetails,
            nameKey: "users_contact_main_group",
          });
        }
        this.$store.state["users"].displayDialog = false;
      }
    },
    //eslint-disable-next-line no-unused-vars
    processContactsState(data, type, contactsKey, tableDataName) {
      for (let c in data) {
        let cObj = {};
        let contactsDetails = data[c][contactsKey];
        cObj["id"] = data[c]["id"];
        cObj["contactType"] = type;
        cObj["contact"] = {
          contactPicture: contactsDetails["image_url"],
          contactName: contactsDetails["name"],
          contactNumber: contactsDetails["mobile_no"],
        };
        for (let t in this.$store.state.contacts[tableDataName]) {
          if (
            this.$store.state.contacts[tableDataName][t]["contact_id"] ==
            contactsDetails["id"]
          ) {
            cObj["contact_id"] =
              this.$store.state.contacts[tableDataName][t]["contact_id"];
          }
        }
        this.allContactsState.push(cObj);
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
          .length != 0 &&
        this.$store.state.contacts["contactGroupsFormStateData"]["type"] ==
          "sub_group"
      ) {
        this.allContactsState = [];
        let nc_contacts =
          this.$store.state.contacts.contactGroupsFormStateData[
            "groups_network_courier_members"
          ];
        let p_contacts =
          this.$store.state.contacts.contactGroupsFormStateData[
            "groups_personal_contact_members"
          ];
        this.processContactsState(
          nc_contacts,
          "Network Courier",
          "contacts_groups_network_courier_members",
          "networkCourierContactsData"
        );
        this.processContactsState(
          p_contacts,
          "Personal",
          "contacts_groups_personal_contact_members",
          "personalContactsData"
        );
        this.$store.state.contacts.contactsFormTableStateData =
          this.allContactsState;
        this.$store.state.fleets.globalImageUploadURL =
          this.$store.state.contacts.contactGroupsFormStateData["image_url"];
        this.subGroupsImageState =
          this.$store.state.contacts.contactGroupsFormStateData["image_url"];
        for (let state in this.details) {
          if (state == "group_id") {
            this.details[state] = this.dropDownFilter(
              this.$store.state.contacts.mainGroupsDropDownData,
              "code",
              this.$store.state.contacts.contactGroupsFormStateData[state]
            );
          } else {
            this.details[state] =
              this.$store.state.contacts.contactGroupsFormStateData[state];
          }
        }
      }
      if (
        Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
          .length != 0 &&
        this.$store.state.contacts["contactGroupsFormStateData"]["type"] ==
          "main_group"
      ) {
        this.$store.state.fleets.globalImageUploadURL = null;
        this.$store.state.contacts.contactsFormTableData = [];
        this.$store.state.contacts.contactsSelectionModeState = null;
        this.details["group_id"] = this.dropDownFilter(
          this.$store.state.contacts.mainGroupsDropDownData,
          "code",
          this.$store.state.contacts.contactGroupsFormStateData["id"]
        );
      }

      if (this.$store.state.contacts.mainGroupName != null) {
        this.details["group_id"] = this.dropDownFilter(
          this.$store.state.contacts.mainGroupsDropDownData,
          "code",
          this.$store.state.contacts.mainGroupName
        );
        this.mainGroupName = this.dropDownFilter(
          this.$store.state.contacts.mainGroupsDropDownData,
          "code",
          this.$store.state.contacts.mainGroupName
        );
      }
    },
  },
  unmounted() {
    this.mainGroupName = null;
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped></style>
