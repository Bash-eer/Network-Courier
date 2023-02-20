<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(chip, index) of zoneChipsData"
      :key="index"
      class="flex mx-2 m-1"
    >
      <PostalCodeChips
        :data="[chip, index]"
        v-on:childToParent="removeZoneRanges"
      />
    </div>
  </div>
  <div
    class="flex w-100 align-items-center justify-content-center blue mt-4 mb-2"
  >
    +Add Postal Codes
  </div>
</template>

<script>
import PostalCodeChips from "../SelectionChips/PostalCodeChips.vue";
export default {
  components: {
    PostalCodeChips,
  },
  props: ["tableData"],
  data: () => ({
    zoneChipsData: [],
  }),
  methods: {
    removeZoneRanges(index) {
      this.zoneChipsData.splice(index, 1);
    },
  },
  created() {
    this.tableData.map((item) => {
      this.zoneChipsData.push(
        item.postal_code_from + " " + "-" + " " + item.postal_code_to
      );
    });
  },
};
</script>

<style></style>
