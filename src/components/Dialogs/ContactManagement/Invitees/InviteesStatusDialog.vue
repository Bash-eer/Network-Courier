<template>
  <div class="ml-2">
    <span class="inviteesText">Invitees</span>
    <div class="flex flex-row mt-2">
      <div class="flex mr-2">
        <img
          :src="inviteesStatusData['image_url']"
          alt=""
          class="inviteesImage"
        />
      </div>
      <div
        class="flex justify-content-center align-items-center inviteesNameText"
      >
        {{ inviteesStatusData["name"] }}
      </div>
    </div>
  </div>
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Status</h5>
      <StatusDropDown
        :state="details.status"
        :data="$store.state.contacts.inviteesStatusDropDownData"
        v-model="details.status"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.remarks"
        label="remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="flex justify-content-between mt-4">
    <div class="flex"></div>
    <div class="flex pr-2">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Update"
        button_class="dialog-button-text p-button-sm add-btn custom-add-btn"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "InviteesStatusDialog",
  data() {
    return {
      inviteesStatusData: {},
      v$: useVuelidate(),
      details: {
        status: "",
        remarks: "",
      },
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        status: { required },
        remarks: { required },
      },
    };
  },
  methods: {
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
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let inviteeStatusDetails = {};
        for (let d in this.details) {
          if (d == "status") {
            if (isNaN(this.details[d]) == false) {
              inviteeStatusDetails[d] = this.dropDownFilter(
                this.$store.state.contacts.inviteesStatusDropDownData,
                "code",
                this.details.status
              );
            } else {
              inviteeStatusDetails[d] = this.details[d];
            }
          } else {
            inviteeStatusDetails[d] = this.details[d];
          }
        }
        let path =
          "event/invitees/status/modifyStatus/" +
          this.inviteesStatusData["memberId"];
        //making an update/PATCH api call to update invitee status details
        this.$store.dispatch("contacts/contactMangementCRUD", {
          path: path,
          mutation: "fetchInviteesTableData",
          tag: "update",
          data: inviteeStatusDetails,
          nameKey: "users_contact_events",
        });
      }
    },
    loadState() {
      for (let state in this.details) {
        this.details[state] = this.inviteesStatusData[state];
      }
    },
  },
  created() {
    this.inviteesStatusData = this.$store.state.contacts.inviteesStatusData;
    this.loadState();
  },
};
</script>

<style scoped>
.bodyText {
  font-family: Montserrat;
}
.inviteesText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #7e84a7;
}
.inviteesImage {
  width: 50px;
  height: 50px;
}
.inviteesNameText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
</style>
