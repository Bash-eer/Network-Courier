<template>
  <p class="full-calendar-custom-title bodyTxt m-1 uppercase">
    {{ getCalendarTitle($store.state.commonStore.calendarStore) }}
  </p>
  <div class="m-0 uppercase">
    <FullCalendar
      ref="fullCalendar"
      :options="calendarOptions"
      @dateClick="handleDateClick"
      @datesSet="handleDateChanged"
      @eventRender="showPopup"
      @eventMouseEnter="handleMouseEnter"
      @eventMouseLeave="handleMouseLeave"
    />
  </div>
</template>

<script>
// import { Tooltip } from "bootstrap";
import { Popover } from "bootstrap";
import moment from "moment";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import $ from "jquery";
window.$ = $;
export default {
  components: {
    FullCalendar,
  },
  props: ["store", "data"],
  data() {
    return {
      members: ["./images/avatar.png", "./images/avatarTwo.png"],
      tooltipInstance: null,
      calendarOptions: {
        height: 600,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        datesSet: this.handleDateChanged,
        eventMouseEnter: this.handleMouseEnter,
        eventMouseLeave: this.handleMouseLeave,
        events: [],
        headerToolbar: {
          left: "title prev next",
          right: "today,dayGridMonth,timeGridWeek,timeGridDay",
        },
        editable: false,
        selectable: false,
        selectMirror: false,
        dayMaxEventRows: 3,
        dayMaxEvents: false,
        eventColor: "#7D72DF",
      },
    };
  },
  methods: {
    handleMouseEnter(info) {
      let eventsObject = info.event["_def"]["extendedProps"];
      this.tooltipInstance = new Popover(info.el, {
        html: true,
        content: "<div class='calendarTooltip'></div>",
        template:
          "<div>" +
          '<span class="calendarTitle w-100">Title: ' +
          eventsObject["meeting_title"] +
          "</span>" +
          '<div class="flex justify-content-between">' +
          '<div class="flex calendarRemarksHeaderText">Remarks</div>' +
          this.getMeetingType(eventsObject["meeting_type"]) +
          "" +
          "</div>" +
          '<div class="mt-2 calendarRemarksBodyText">' +
          eventsObject["remarks"] +
          "</div>" +
          '<div class="calendarToolTipFooter mb-2"><div class="flex justify-content-between w-100"><div class="flex"></div><div class="flex calendarMembersText">Members</div></div><div>' +
          '<div class="mb-2"><div class="flex justify-content-between w-100">' +
          '<div class="flex"><div class="flex flex-row"><div class="flex mr-2"><img  class="calendarAvatarImage" src="' +
          eventsObject["users_contact_meeting_room_booking"]["profile_url"] +
          '"/></div><div class="flex"><div class="flex flex-column"><div class="flex calendarBookedByText">Booked by</div><div class="flex calenderBookerText">' +
          eventsObject["users_contact_meeting_room_booking"]["display_name"] +
          "</div></div></div></div></div>" +
          '<div class="flex">' +
          "" +
          this.getTemplateAvatars(
            eventsObject["meeting_room_booking_members"]
          ) +
          "</div>" +
          "</div></div>" +
          "</div>",
        trigger: "manual",
        title: info.event.title,
        placement: "top",
        container: "body",
      });
      this.tooltipInstance.show();
    },
    getMeetingType(type) {
      let meetingTypeTemplate;
      switch (type) {
        case "Internal":
          meetingTypeTemplate =
            '<div class="flex calendarInternalText">Internal</div>';
          break;
        case "External":
          meetingTypeTemplate =
            '<div class="flex calendarExternalText">External</div>';
          break;
      }
      return meetingTypeTemplate;
    },
    getTemplateAvatars(data) {
      let length = parseInt(data.length);
      let inviteesCount;
      if (length >= 3) {
        inviteesCount = "more than three";
      }
      if (length == 2) {
        inviteesCount = "equal to two";
      }
      if (length == 1) {
        inviteesCount = "equal to one";
      }
      if (length == 0) {
        inviteesCount = "no one";
      }
      let avatarsTemplate;
      switch (inviteesCount) {
        case "more than three":
          avatarsTemplate =
            '<ul class="calendarAvatars"><li class="calendarAvatarList"><img class="calendarAvatarImage" src="' +
            data[0]["contacts_meeting_room_booking_members"]["image_url"] +
            '"/></li><li class="calendarAvatarList"><img  class="calendarAvatarImage" src="' +
            data[1]["contacts_meeting_room_booking_members"]["image_url"] +
            '"/></li><li class="calendarAvatarList"><div class="calendarMoreDiv">+' +
            (length - 2) +
            "</div></li></ul>";
          break;
        case "equal to two":
          avatarsTemplate =
            '<ul class="calendarAvatars"><li class="calendarAvatarList"><img class="calendarAvatarImage" src="' +
            data[0]["contacts_meeting_room_booking_members"]["image_url"] +
            '"/></li><li class="calendarAvatarList"><img class="calendarAvatarImage" src="' +
            data[1]["contacts_meeting_room_booking_members"]["image_url"] +
            '"/></li></ul>';
          break;
        case "equal to one":
          avatarsTemplate =
            '<ul class="calendarAvatars"><li class="calendarAvatarList"><img class="calendarAvatarImage" src="' +
            data[0]["contacts_meeting_room_booking_members"]["image_url"] +
            '"/></li></ul>';
          break;
        case "no one":
          avatarsTemplate =
            '<ul class="calendarAvatars"><li class="calendarAvatarList"><div class="calendarMoreDiv">0</div></li></ul>';
          break;
      }
      return avatarsTemplate;
    },
    handleMouseLeave() {
      if (this.tooltipInstance) {
        this.tooltipInstance.dispose();
        this.tooltipInstance = null;
      }
    },
    dateAndTimeFormatter(date) {
      return moment(date).utcOffset("+8:00").format();
    },
    handleDateChanged(e) {
      this.handleMouseLeave();
      let startDate;
      let endDate;
      this.$store.state.commonStore.calendarTimeStore = e.view.type;
      if (e.view.type == "dayGridMonth") {
        var now = new Date(e.start);
        let current;
        if (now.getMonth() == 11) {
          current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
          current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        startDate = current;
        endDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      }
      if (e.view.type != "dayGridMonth") {
        startDate = new Date(e.start);
        endDate = new Date(e.end);
      }
      let showBookingDetails = {};
      showBookingDetails["from_date_time"] =
        this.dateAndTimeFormatter(startDate);
      showBookingDetails["to_date_time"] = this.dateAndTimeFormatter(endDate);
      if (
        e.startStr != this.$store.state.commonStore.startDate &&
        e.endStr != this.$store.state.commonStore.endDate
      ) {
        this.makeApiCall(showBookingDetails);
      }
      this.$store.state.commonStore.startDate = e.startStr;
      this.$store.state.commonStore.endDate = e.endStr;
    },
    makeMonthViseApiCall(data) {
      let basePath;
      let path;
      let mutation;
      switch (this.$store.state.commonStore.calendarStore) {
        case "contacts":
          basePath = "contacts/loadAvailableRooms";
          path = "showBookings";
          mutation = "fetchMonthlyBookingsData";
          break;
      }
      this.$store.dispatch(basePath, {
        path: path,
        mutation: mutation,
        data: data,
      });
    },
    makeApiCall(data) {
      let basePath;
      let path;
      let mutation;
      switch (this.$store.state.commonStore.calendarStore) {
        case "contacts":
          basePath = "contacts/loadAvailableRooms";
          path = "showBookings";
          mutation = "fetchAllRoomBookings";
          break;
      }
      this.$store.dispatch(basePath, {
        path: path,
        mutation: mutation,
        data: data,
      });
    },
    showPopup(info) {
      console.log(info);
    },
    getCalendarTitle(type) {
      let title;
      switch (type) {
        case "contacts":
          title = "Room Bookings";
          break;
      }
      return title;
    },
    handleDateClick(arg) {
      this.handleMouseLeave();
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("timeGridDay", arg.dateStr);
    },
  },
  updated() {
    this.calendarOptions.events = this.data;
  },
  watch: {
    "$store.state.calendar.dateClickedInInlineCalendar": function () {
      let clickedInSmallCalendar =
        this.$store.state.calendar.dateClickedInInlineCalendar;
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("timeGridDay", clickedInSmallCalendar);
    },
  },
  created() {
    this.calendarOptions.events = this.data;
  },
};
</script>
<style scoped>
::v-deep .popover-content {
  color: red;
  font-size: 10px;
}
.bodyTxt {
  font-family: Montserrat;
}
.full-calendar-custom-title {
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  color: #000210;
  text-align: left;
}
::v-deep .fc-toolbar .fc-button {
  background: transparent !important;
  border: none !important;
}
::v-deep .fc-toolbar .fc-button:focus {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  outline-color: none !important;
}
::v-deep .fc-toolbar .fc-button:hover {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  outline-color: none !important;
}
::v-deep .fc .fc-button .fc-icon {
  background: none !important;
  color: #357dea !important;
  border: none !important;
}
::v-deep .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) {
  display: flex !important;
}
::v-deep .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
  margin-left: 0 !important;
}
::v-deep .fc .fc-toolbar-title {
  font-weight: 500 !important;
  font-size: 24px !important;
  line-height: 34px !important;
  color: #000210 !important;
}
::v-deep .fc .fc-toolbar.fc-header-toolbar {
  background: #fbfbfc !important;
  border-radius: 12px 12px 0px 0px !important;
  padding: 10px !important;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
::v-deep .fc.fc-theme-standard .fc-view-harness td {
  cursor: pointer !important;
}
::v-deep .fc .fc-daygrid-day.fc-day-today {
  background-color: #ffcccc !important;
}
::v-deep .fc-today {
  background: #fff !important;
}
::v-deep .fc .fc-button-group {
  background-color: #357dea !important;
  color: white !important;
}
::v-deep .fc.fc-theme-standard .fc-toolbar .fc-button:focus {
  outline: none !important;
  box-shadow: none !important;
}
::v-deep .fc-event-time,
.fc-event-title {
  padding: 0 1px !important;
  white-space: normal !important;
}
</style>
