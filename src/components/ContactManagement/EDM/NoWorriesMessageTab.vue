<template>
  <div class="field col-12 md:col-12">
    <p class="edm-dialog-title text-left">No Worries message</p>
    <TextAreaField
      :state="details.message"
      label="remarks"
      v-model="details.message"
      :classes="{
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text"
    />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../config/const");
export default {
  data() {
    return {
      text: "No worries",
      details: {
        message: "",
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      let path =
        "event/edm/messages/" +
        this.$store.state.contacts.inviteesEventId +
        "?message=noWorries";
      axios
        .patch("contactManagement/" + path.trim(), this.details)
        .then((res) => {
          if (res.data.status == 200) {
            this.$store.commit("users/showToast", [
              "success",
              res.data.results,
              "was sent!",
              "edmMessage",
            ]);
            //fetch events page data
            this.$store.dispatch("contacts/loadEventsPage", {
              path: "events",
              mutation: "fetchEventsPageData",
            });
            // this.$store.state["users"].displayDialog = false;
          }
        });
    },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
    let noWorriesMessageData = this.$store.state.contacts.noWorriesMessageData;
    for (let n in noWorriesMessageData) {
      if (
        noWorriesMessageData[n]["event_id"] ==
        this.$store.state.contacts.inviteesEventId
      ) {
        this.details.message = noWorriesMessageData[n]["message"];
      }
    }
  },
};
</script>

<style scoped>
.edm-dialog-title {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: #4e5868;
}
</style>
