<template>
  <div class="contactMargin">
    <ContactManagementTab
      v-bind:tabMenuData="$store.state.contacts.ContactHomeTabMenuData"
      type="contactManagementHome"
      defaultTab="ContactContacts"
      storePath="contacts"
    />
  </div>
</template>

<script>
export default {
  name: "ContactManagementHome",
  methods: {
    openDialog(name) {
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },
  created() {
    // this.$store.commit("users/updateBreadCrumb", "FleetVehicles");
    //fetch contacts table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "contacts",
      mutation: "fetchContactMangementContactTableData",
      nameKey: "users_contact_contacts",
    });
    //fetch groups table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "mainGroups",
      mutation: "fetchContactManagementMainGroupTableData",
      nameKey: "users_contact_main_group",
    });
    //fetch appointments table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "appointments",
      mutation: "fetchAppointmentsTableData",
      nameKey: "users_contact_appointments",
    });
    //fetch donations table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "donations",
      mutation: "fetchDonationsTableData",
      nameKey: "users_contact_donations",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.ContactDonations .p-datatable-row-expansion > td {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
  padding: 0px !important;
}
.contactMargin {
  margin-left: 20px;
  margin-right: 20px;
  //  margin-top: 19px;
}
</style>
