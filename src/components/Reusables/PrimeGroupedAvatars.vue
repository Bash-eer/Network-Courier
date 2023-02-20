<template>
  <AvatarGroup class="">
    <Avatar
      v-for="(item, index) of getGroupedAvatarsData(data)"
      :key="index"
      :image="item != null ? item : './images/defaultProfile.jpg'"
      size="small"
      shape="square"
    />
    <Avatar
      v-if="data.length > 2"
      :label="getGroupedAvatarsLabel(data)"
      shape="square"
      size="small"
      class="grouped-avatar-more-text"
    />
  </AvatarGroup>
</template>

<script>
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
export default {
  name: "PrimeGroupedAvatars",
  components: {
    Avatar,
    AvatarGroup,
  },
  props: ["data"],
  methods: {
    getGroupedAvatarsLabel(data) {
      let avatarsLabel;
      if (data.length > 2) {
        let len = data.length - 2;
        avatarsLabel = "+" + "" + len.toString();
      } else {
        avatarsLabel = "";
      }
      return avatarsLabel;
    },
    getGroupedAvatarsData(data) {
      if (data.length <= 2) {
        return data;
      } else {
        let gAData = [];
        for (let gA = 0; gA < 2; gA++) {
          gAData.push(data[gA]);
        }
        return gAData;
      }
    },
  },
};
</script>

<style scoped>
.p-avatar-group .p-avatar + .p-avatar {
  margin-left: -0.7rem !important;
}
.p-avatar-group .p-avatar {
  border: none !important;
}
::v-deep .p-avatar img {
  border-radius: 6px !important;
}
</style>
