<template>
  <div class="bottomContentDiv">
    <ContactManagementTab
      v-bind:tabMenuData="
        $store.state.contacts.ContactEventsOverviewTabMenuData
      "
      type="contactManagementEvents"
      defaultTab="InviteesStatus"
      storePath="contacts"
    />
  </div>
</template>

<script scoped>
export default {};
</script>

<style scoped>
.bottomContentDiv {
  margin-top: 27px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
