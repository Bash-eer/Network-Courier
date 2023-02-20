<template>
  <div class="tabs">
    <ul class="tabs-header flex p-0">
      <li
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
        :class="{ selected: title == selectedTitle }"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
    <div class="flex flex-row ml-1 mt-4 mb-4">
      <div
        class="flex mr-7"
        v-for="(item, index) of secondRowData"
        :key="index"
      >
        <div class="flex flex-column">
          <div class="flex color-7e84a7 express-international-table">
            {{ getHeader(index) }}
          </div>
          <div :class="'flex  express-international-table color-66c11e '">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, provide } from "vue";
export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);
    provide("selectedTitle", selectedTitle);
    return { selectedTitle, tabTitles };
  },
  data() {
    return {
      secondRowData: {
        priority: "5",
        previously_served_by: "5",
        referred_by: "10",
        referral_person_name: "20",
        festival_name: "100",
      },
    };
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "priority":
          header = "Surcharge (<5 Parcels)";
          break;
        case "previously_served_by":
          header = "COD Fee ($)";
          break;
        case "referral_person_name":
          header = "COD Fee (%)";
          break;
        case "sales_comission":
          header = "Time Slot Delivery Charge  (+$)";
          break;
        case "festival_name":
          header = "Standard Liability  ($)";
          break;
      }
      return header;
    },
  },
};
</script>

<style scoped>
.tabs {
  width: 140%;
}
.tabs-header {
  list-style: none;
  margin-bottom: 10px;
}
.tabs-header li {
  text-align: center;
  width: 200px;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: 0.4s all ease-out;
}
.tabs-header li.selected {
  background-color: #357dea;
  color: white;
}
</style>
