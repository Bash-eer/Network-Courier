<template>
  <div class="flex flex-row">
    <div class="flex align-items-center">
      <img
        :src="require('../../assets/' + path + '.png')"
        alt=""
        class="mr-2"
      />
    </div>
    <div class="flex align-items-center">
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyNames",
  props: ["path", "label"],
};
</script>

<style></style>
