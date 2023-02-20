<template>
  <div class="avatars">
    <span class="avatar" v-for="(avatar, index) of data" :key="index">
      <img
        v-if="index <= 2 && index!=2 && tableType == 'subGroups'"
        :src="avatar"
        alt=""
        class="avatarImage"
      />
      <img
        v-if="index != 2 && tableType != 'subGroups'"
        :src="'/images/' + 'avatarTwo' + '.png'"
        alt=""
      />
      <div
        class="more"
        v-if="index == 2"
        :style="more >= 100 ? 'width:70%' : 'width:30%'"
      >
        <span>+ {{ more }}</span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "GroupedAvatars",
  props: ["data", "more", "tableType"],
};
</script>

<style scoped>
.avatarImage {
  height: 32px;
  width: 32px;
  border-radius:5px;
}
.more {
  background: #edf1f7;
  border-radius: 6px;
  /* border-left: 1px solid #ffffff; */
  width: 30%;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 12px;
}
.avatars {
  display: inline-flex;
  flex-direction: row;
}
.avatar {
  border-radius: 6px;
  /* border-left: 2px solid #fff; */
  overflow: hidden;
  width: 100px;
}
.avatar:not(:first-child) {
  margin-left: -80px;
}

.avatar img {
  display: block;
}
</style>
