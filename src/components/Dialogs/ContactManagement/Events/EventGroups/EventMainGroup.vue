<template>
  <div class="formgrid grid mt-2">
    <div class="field col-6 md:col-6 mt-4">
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
  name: "EventMainGroup",
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
        //creating a main group for the first time
        if (
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length ==
          0
        ) {
          this.$store.state.contacts.eventsMainGroupsDropDownData.push({
            name: this.details.group_name,
            code:
              this.$store.state.contacts.eventsMainGroupsDropDownData.length +
              1,
          });
          this.$store.state.contacts.eventsMainGroupName =
            this.details.group_name;
        }
        //updating the main group details
        if (
          Object.keys(this.$store.state.contacts.eventGroupsStateData).length !=
          0
        ) {
          let groupName =
            this.$store.state.contacts.eventGroupsStateData["group_name"];
          let dropDownData =
            this.$store.state.contacts.eventsMainGroupsDropDownData;
          for (let d in dropDownData) {
            if (dropDownData[d].name == groupName) {
              dropDownData[d].name = this.details.group_name;
            }
          }
          this.$store.state.contacts.eventGroupsStateData["group_name"] =
            this.details.group_name;
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.eventGroupsStateData).length != 0
      ) {
        for (let state in this.details) {
          this.details[state] =
            this.$store.state.contacts.eventGroupsStateData[state];
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped></style>
