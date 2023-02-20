<template>
  <div class="grid calendar-wrapper">
    <div class="col-12 md:col-3 flex flex-column mx-0">
      <div class="m-1">
        <SmallCalendar
          :data="
            $store.state[$store.state.commonStore.calendarStore][
              getSmallCalendarData()
            ]
          "
        />
      </div>
      <hr />
      <div class="mx-2">
        <RoomBookings
          :key="watcher"
          v-if="$store.state.commonStore.calendarStore == 'contacts'"
        />
      </div>
    </div>
    <div class="col-12 md:col-9 border-left">
      <Fullcalendar
        :data="
          $store.state[$store.state.commonStore.calendarStore][
            getFullCalendarData()
          ]
        "
      />
    </div>
  </div>
</template>

<script>
import RoomBookings from "../components/Calendar/RoomBookings.vue";
import Fullcalendar from "../components/Calendar/FullCalendar.vue";
import SmallCalendar from "../components/Calendar/SmallCalendar.vue";
export default {
  components: {
    RoomBookings,
    Fullcalendar,
    SmallCalendar,
  },
  data() {
    return {
      calendarEvents: [],
      watcher: 0,
    };
  },
  methods: {
    getSmallCalendarData() {
      let smallCalendarData;
      switch (this.$store.state.commonStore.calendarStore) {
        case "contacts":
          smallCalendarData = "smallCalendarRoomMeetingsData";
          break;
      }
      return smallCalendarData;
    },
    getFullCalendarData() {
      let fullCalendarData;
      switch (this.$store.state.commonStore.calendarStore) {
        case "contacts":
          fullCalendarData = "calendarRoomMeetingsData";
          break;
      }
      return fullCalendarData;
    },
  },
  watch: {
    "$store.state.contacts.allRoomBookingsData": function () {
      this.watcher++;
    },
  },
  unmounted() {
    this.$store.state.commonStore.startDate = "";
    this.$store.state.commonStore.endDate = "";
  },
  mounted() {
    this.$store.state.users.breadcrumbTitle = "";
    this.$store.commit("users/updateBreadCrumb", "Calendar");
  },
};
</script>

<style>
.fa-ban {
  color: red !important;
}
.calendarTitle {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #f8efba;
}
.calendarAvatars {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
}
.calendarAvatarImage {
  border-radius: 6px !important;
  border: none !important;
  height: 32px;
  width: 32px;
}
.calendarAvatarList {
  margin-left: -0.7rem !important;
}
.calendarMembersText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
}
.calendarBookedByText {
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #ffffff;
}
.calenderBookerText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
}
.calendarInternalText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #77ff7c;
}
.calendarExternalText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #fbc531;
}
.calendarRemarksHeaderText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
}
.calendarRemarksBodyText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  opacity: 0.8;
}
.bs-popover-top {
  position: relative;
  padding: 1%;
  font-family: Montserrat !important;
  z-index: 1;
  width: 354px !important;
  height: 167px !important;
  background: #7e84a7 !important;
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 1) !important;
  border-radius: 4px !important;
}
.calendarToolTipFooter {
  margin-top: 5%;
}
.calendarMoreDiv {
  text-align: center;
  line-height: 32px;
  background: #d1e4ff;
  color: #7e84a7;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px !important;
  height: 32px;
  width: 32px;
}
.tooltip.in {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}
.calendar-wrapper {
  background-color: #fff;
}
.border-left {
  border-left: 1px solid #f0f0f1;
}
hr {
  border-top: 1px solid #b7b7b9;
}
</style>
