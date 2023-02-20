<template>
  <div class="flex flex-row ml-1 mt-4 mb-4">
    <div class="flex mr-7" >
      <div class="flex flex-column">
        <div class="flex detailsText">Cash on Delivery</div>
        <div
          :class="
            item != 'High'
              ? 'flex international-agent-cod-details_text express-international-table international-agent-cod-valuesText'
              : 'flex international-agent-cod-details_text express-international-table international-agent-cod-valuesText'
          "
        >
          {{ data+" $ " }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["data"],

  data() {
    return {};
  },

  methods: {
    getSubHeaderThree(index) {
      let header;
      switch (index) {
        case "public":
          header = "Cash on Delivery";
          break;
      }
      return header;
    },
  },
};
</script>

<style scoped>
.international-agent-cod-details_text {
  color: #7e84a7;
}
.international-agent-cod-valuesText {
  color: #66c11e;
}
</style>
