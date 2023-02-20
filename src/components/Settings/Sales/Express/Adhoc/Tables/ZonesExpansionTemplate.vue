<template>
  <div class="flex flex-row m-3 mx-5">
    <div v-for="item in expansionData" :key="item.id">
      <div class="flex flex-column mx-3">
        <div class="add-zone-expansion-expansion-title-container">
          <p class="m-0 add-zone-expansion-expansion-title">{{ item.title }}</p>
          <p class="m-0 add-zone-expansion-expansion-title">
            {{ item.subtitle }}
          </p>
        </div>

        <div class="flex flex-row">
          <div class="flex flex-column m-1">
            <p class="mb-1 add-zone-expansion-expansion-subtitle">Normal</p>
            <p class="green">{{ timeFormatter(data[item.normal_time]) }}</p>
          </div>
          <div class="flex flex-column m-1">
            <p class="mb-1 add-zone-expansion-expansion-subtitle">Urgent</p>
            <p class="green">{{ timeFormatter(data[item.urgent_time]) }}</p>
          </div>
          <div class="flex flex-column m-1">
            <p class="mb-1 add-zone-expansion-expansion-subtitle">Next Day</p>
            <p class="green">{{ data[item.next_day] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ExpansionTemplateThree",
  props: ["data"],
  data() {
    return {
      expansionData: [
        {
          id: 1,
          title: "Before Delivery Time",
          subtitle: "",
          normal_time: "before_delivery_normal_time",
          urgent_time: "before_delivery_urgent_time",
          next_day: "before_delivery_select",
        },
        {
          id: 2,
          title: "Returning Schedule Time",
          subtitle: "(For Direction Collect)",
          normal_time: "return_direction_normal_time",
          urgent_time: "return_direction_urgent_time",
          next_day: "return_direction_select",
        },
        {
          id: 3,
          title: "Returning Schedule Time",
          subtitle: "(For Deliver & Collect)",
          normal_time: "return_delivery_normal_time",
          urgent_time: "return_delivery_urgent_time",
          next_day: "return_delivery_select",
        },
      ],
    };
  },
  methods: {
    timeFormatter(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedTime = moment(data).utc().format("HH:mm");
        return formattedTime;
      }
    },
  },
};
</script>

<style scoped>
.add-zone-expansion-expansion-title-container {
  min-height: 32px;
}
.add-zone-expansion-expansion-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: #4e5968;
}
.add-zone-expansion-expansion-subtitle {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #7e84a7;
}
</style>
