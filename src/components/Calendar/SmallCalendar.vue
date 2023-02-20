<template>
  <Calendar
    title-position="left"
    :attributes="attributes"
    is-expanded
    class="v-calendar"
    @dayclick="dayClicked"
    @update:from-page="monthChange"
    @update:to-page="monthChange"
  />
</template>

<script>
import { Calendar } from "v-calendar";

export default {
  components: {
    Calendar,
  },
  props: ["data"],
  data() {
    return {
      dotColors: [
        { color: "blue", code: "#4299e1" },
        { color: "orange", code: "#ed8936" },
        { color: "purple", code: "#9f7aea" },
        { color: "gray", code: "#a0aec0" },
        { color: "red", code: "#f56565" },
        { color: "yellow", code: "#ecc94b" },
        { color: "indigo", code: "#667eea" },
        { color: "green", code: "#48bb78" },
        { color: "teal", code: "#38b2ac" },
        { color: "pink", code: "#ed64a6" },
      ],
      date: "",
      attributes: [
        {
          key: "today",
          highlight: "red",
          dates: new Date(),
        },
      ],
    };
  },
  created() {},
  watch: {
    data: function () {
      this.updateSmallCalendarData();
    },
  },
  methods: {
    updateSmallCalendarData() {
      if (this.attributes.length > 1) {
        let elementsToDelete = this.attributes.length - 1;
        this.attributes.splice(
          this.attributes.length - elementsToDelete,
          elementsToDelete
        );
      }
      for (let d in this.data) {
        let dotObject = {};
        dotObject["dates"] = [];
        dotObject["dates"].push(new Date(this.data[d]["dates"]));
        dotObject["dot"] = this.data[d]["color"];
        this.attributes.push(dotObject);
      }
    },
    monthChange(page) {
      page.month = page.month - 1;
      let startDate = new Date(page.year, page.month);
      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        1
      );
      let timeDetails = {};
      timeDetails["from_date_time"] = startDate;
      timeDetails["to_date_time"] = endDate;
      this.makeApiCall(timeDetails);
    },
    getDotColors(code) {
      let color;
      for (let c in this.dotColors) {
        if (this.dotColors[c]["code"] == code) {
          color = this.dotColors[c]["color"];
        }
      }
      return color;
    },
    dayClicked(day) {
      this.$store.state.commonStore.startDate = "";
      this.$store.state.commonStore.endDate = "";
      this.$store.state.calendar.dateClickedInInlineCalendar = new Date(day.id);
    },
    makeApiCall(data) {
      let basePath;
      let path;
      let mutation;
      switch (this.$store.state.commonStore.calendarStore) {
        case "contacts":
          basePath = "contacts/loadAvailableRooms";
          path = "showBookings";
          mutation = "fetchMonthViseRoomBookings";
          break;
      }
      setTimeout(() => {
        this.$store.dispatch(basePath, {
          path: path,
          mutation: mutation,
          data: data,
        });
      }, 10);
    },
  },
};
</script>

<style scoped>
.v-calendar {
  border: none !important;
}
::v-deep .vc-svg-icon {
  color: #5849e1 !important;
}
</style>
