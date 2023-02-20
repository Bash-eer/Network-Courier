<template>
  <ContactManagementTab
    v-bind:tabMenuData="$store.state.contacts.MeetingRoomsTabMenuData"
    type="meetingRoomsTab"
    storePath="contacts"
  />
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("contacts/loadMeetingRooms", {
      path: "currentBooking",
      mutation: "fetchCurrentStatusOfRooms",
    });
  },
};
</script>
<style scoped></style>
