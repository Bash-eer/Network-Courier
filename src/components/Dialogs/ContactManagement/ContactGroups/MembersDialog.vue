<template>
  <List :data="listData" :header="'Members'" />
</template>

<script>
export default {
  name: "MembersDialog",
  data() {
    return {
      listData: [],
    };
  },
  unmounted() {
    this.$store.state.contacts.groupMembersData = [];
  },
  created() {
    this.listData = this.$store.state.contacts.groupMembersData;
  },
};
</script>

<style scoped>
.selected {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #7a7a7a;
}
</style>
