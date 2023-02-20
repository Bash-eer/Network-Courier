<template>
  <ContactManagementTab
    v-bind:tabMenuData="$store.state.contacts.EDMMessagesTabMenuData"
    type="contactManagementEDM"
    storePath="contacts"
  />
</template>

<script>
export default {};
</script>

<style></style>
