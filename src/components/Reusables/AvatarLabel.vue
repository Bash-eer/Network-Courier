<template>
  <Avatar
    :label="label"
    class="p-mr-2"
    v-bind:style="{ backgroundColor: color }"
    :class="classes"
    :shape="shape"
  
  />
</template>

<script>
import Avatar from "primevue/avatar";
export default {
  name: "AvatarLabel",
  props: ["label", "classes"],
  data: () => ({
    color: "blue",
  }),
  components: {
    Avatar,
  },
  created() {
    var letters = "BCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    this.color = color;
  },
};
</script>

<style>
.avatar-class {
  border-radius: 4px !important;
}
</style>
