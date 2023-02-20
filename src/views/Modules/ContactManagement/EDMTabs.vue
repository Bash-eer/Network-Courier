<template>
  <ContactManagementTab
    v-bind:tabMenuData="$store.state.contacts.EDMTabMenuData"
    type="contactManagementEDM"
    defaultTab="ContactContacts"
    storePath="contacts"
  />
</template>

<script>
export default {
  name: "EDMTabs",
  created() {
    this.$store.state.contacts.inviteesData = [];
    this.$store.state.contacts.eventsOverviewFormInviteesData = [];
    let contactsTableData =
      this.$store.state["contacts"]["eventContactsTableData"];
    let inviteesTableData =
      this.$store.state.contacts.ContactManagamentInviteesTableData;
    let memberData = [];
    for (let t in contactsTableData) {
      for (let i in inviteesTableData) {
        if (
          inviteesTableData[i]["contactId"] ==
          contactsTableData[t]["contact_id"]
        ) {
          if (memberData.indexOf(contactsTableData[t]) === -1) {
            memberData.push(contactsTableData[t]);
          }
        }
      }
    }
    this.$store.state["contacts"]["eventContactsTableData"] = memberData;
  },
};
</script>

<style lang="sss" scoped></style>
