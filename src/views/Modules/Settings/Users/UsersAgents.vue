<template>
  <div v-if="$store.state.users.agentsData != null">
    <BootstrapTabs
      :companyName="$store.state.users.agentsData['company_name']"
      storePath="users"
      userPath="usersTypesRolePath"
      :agentsData="$store.state.users.agentsData"
      v-bind:tabMenuData="$store.state.users.tabMenuOrganizationData"
      tabs="not_needed"
    />
  </div>
</template>

<script>
export default {
  name: "UsersAgents",
  data: () => ({
    label: null,
    path: null,
    tagClass: null,
  }),
  methods: {
    openDialog() {
      this.$store.state.dialogComponent = "AgentDialog";
      this.$store.getters.controlActivityDialog;
    },
    globalSearcher(searchString) {
      this.$store.state.globalSearch = searchString;
    },
  },
  mounted() {
    if (this.$store.state.users.agentsData) {
      this.$store.state.users.breadcrumbTitle = "Users";
      let tempo =
        "Settings > Users > Online Customers >" +
        this.$store.state.users.agentsData.company_name;

      this.$store.commit("users/updateBreadCrumb", tempo);
    }
  },
  updated() {
    if (this.$store.state.users.agentsData) {
      this.$store.state.users.breadcrumbTitle = "anah";
      this.$store.commit("users/updateBreadCrumb", "Edit Profile");
    }
  },
};
</script>

<style scoped>
.table-col {
  max-width: 2040px;
  margin: 0 auto;
}
.agent-class {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.Role {
  color: red !important;
}
.agent-chip {
  background-color: #7469f2;
  border-radius: 7px;
  width: 68px;
  height: min-content;
  padding: 2px;
  color: #fff;
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
}
.heading {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;

  text-align: left;
}
.users {
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;

  text-align: left;
}
.agent-img {
  width: 50px;
  height: 50px;
}
.margin-push {
  margin-top: -10px;
}
</style>
