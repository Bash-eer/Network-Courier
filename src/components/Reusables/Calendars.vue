<template>
  <Calendar
    selectionMode="range"
    :manualInput="false"
    :inline="false"
    :value="modelValue"
    v-model="value"
    dateFormat="mm/dd/yy"
    placeholder="dd/mm/yyyy"
    :monthNavigator="true"
    :yearNavigator="true"
    yearRange="1950:2050"
  />
</template>

<script>
import Calendar from "primevue/calendar";
import moment from "moment";
export default {
  name: "Calendars",
  props: ["modelValue", "state"],
  data() {
    return {
      value: null,
    };
  },
  methods: {
    dateFormater(data) {
      var formattedDate = moment(data).format("Do MMM YYYY");
      return formattedDate;
    },
    getDatesBetweenDates(startDate, endDate) {
      let dates = [];
      const theDate = new Date(startDate);
      while (theDate <= endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
      }
      return dates;
    },
  },
  components: {
    Calendar,
  },
  watch: {
    value: function () {
      // document.getElementsByClassName('p-datepicker')[0].style.display = "none"
      if (this.value[0] != null && this.value[1] != null) {
        var fastForward = new Date(this.value[1]);
        fastForward.setDate(fastForward.getDate() + 1);
        var newDatesArray = [];
        newDatesArray.push(this.value[0], fastForward);
        this.$emit("update:modelValue", newDatesArray);
      }
    },
    modelValue: function () {},
  },
  created() {
    this.value = this.state;
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  },
};
</script>

<style>
</style>
