<template>
  <Calendar
    :class="classes"
    id="time"
    v-model="time"
    :value="modelValue"
    :timeOnly="true"
    hourFormat="24"
    :monthNavigator="true"
    :yearNavigator="true"
    yearRange="1950:2050"
    autocomplete="off"
  />
</template>

<script>
import Calendar from "primevue/calendar";
export default {
  name: "TimePicker",
  props: ["modelValue", "state", "classes", "label"],
  data: () => ({
    time: null,
  }),
  watch: {
    time: function () {
      let date = new Date(this.time);
      console.log(this.time, date, this.state);
      if (date != "Invalid Date") {
        if (this.time != null) {
          this.$emit("update:modelValue", date);
          this.$emit("childToParent", this.label, date);
        }

        if (this.time == null) {
          this.$emit("update:modelValue", "");
        }
      } else {
        this.time = this.state;
      }
    },
  },
  created() {
    if (this.state != "") {
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
