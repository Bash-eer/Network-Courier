<template>
  <BootstrapTabs
    userPath="usersTypesRolePath"
    storePath="users"
    v-bind:tabMenuData="$store.state.tabUsersTypesRoles"
    tabs="expel"
  />
</template>

<script>
export default {
  name: "UsersTypesRoles",
};
</script>

<style></style>
