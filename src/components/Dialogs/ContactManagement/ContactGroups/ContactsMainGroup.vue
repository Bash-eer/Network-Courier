<template>
  <div class="formgrid grid mt-4">
    <div class="inline-flex"> 
    <div class="flex ml-2">
      <ImgUpload :state="mainGroupsImageState" URL="/images/profile-here.png" />
    </div>
    <div class="field col-12 md:col-10 mt-4 ml-3">
      <h5 class="required dialog-label-text">Group Name</h5>
      <TextField 
        label="group_name"
        type="text"
        v-model="details.group_name"
        @blur="v$.details.group_name.$model"
        :classes="{
          'p-invalid': v$.details.group_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    </div>
  </div>
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
    <div class="flex align-self-center justify-content-end ">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text  color-blue-cancel "
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
  name: "ContactsMainGroup",
  data: () => ({
    mainGroupsImageState: "",
    v$: useVuelidate(),
    details: {
      group_name: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        group_name: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.details["image_url"] =
          this.$store.state.fleets.globalImageUploadURL;
        //making an update/PATCH api call to update main group details
        if (this.$store.state.contacts.contactGroupsFormStateData.id) {
          this.details["id"] =
            this.$store.state.contacts.contactGroupsFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "mainGroups",
            mutation: "fetchContactManagementMainGroupTableData",
            tag: "update",
            data: this.details,
            nameKey: "users_contact_main_group",
          });
        }
        //making an add/POST api call to create a new main group
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "mainGroups",
            mutation: "fetchContactManagementMainGroupTableData",
            tag: "add",
            data: this.details,
            nameKey: "users_contact_main_group",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
          .length != 0
      ) {
        this.$store.state.fleets.globalImageUploadURL =
          this.$store.state.contacts.contactGroupsFormStateData["image_url"];
        this.mainGroupsImageState =
          this.$store.state.contacts.contactGroupsFormStateData["image_url"];
        for (let state in this.details) {
          this.details[state] =
            this.$store.state.contacts.contactGroupsFormStateData[state];
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.color-blue-cancel{
  color:#0247fe;
}
</style>
