<template>
  <Calendar
    :class="classes"
    id="time"
    v-model="time"
    :value="modelValue"
    :timeOnly="true"
    hourFormat="12"
    :monthNavigator="true"
    :yearNavigator="true"
    yearRange="1950:2050"
    autocomplete="off"
    :minDate="min_date"
  />
</template>

<script>
import Calendar from "primevue/calendar";
export default {
  name: "TimePicker",
  props: ["modelValue", "state", "classes", "min_date"],
  data: () => ({
    time: null,
    minDate: null,
    maxDate: null,
  }),
  watch: {
    time: function () {
      let date = new Date(this.time);
      if (date != "Invalid Date") {
        if (this.time != null) {
          this.$emit("update:modelValue", date);
          this.$emit("childToParent", this.label, date);
        }
        if (this.time == null) {
          this.$emit("update:modelValue", "");
        }
      }
    },
  },
  created() {
    if (this.state != "") {
      // this.time = new Date(this.state);
      let date = new Date(this.state);

      if (date != "Invalid Date") {
        this.time = date;
      } else {
        this.time = this.state;
      }
    }
  },
  components: {
    Calendar,
  },
};
</script>

<style></style>
