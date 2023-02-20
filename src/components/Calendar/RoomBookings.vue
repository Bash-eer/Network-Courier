<template>
  <div class="mx-2 bookingsDiv">
    <div class="flex flex-row justify-content-between mx-1">
      <p class="description-title">Bookings</p>
      <router-link to="contact-management">
           <p class="cursor-pointer mx-3 plus-blue">+</p>
      </router-link>
      
    </div>
    <span v-if="$store.state.contacts.allRoomBookingsData.length == 0">
      <div class="h-100 noBookingsDiv">
        <div
          class="
            flex flex-column
            align-items-center
            justify-content-center
            h-100
          "
        >
          <div class="flex">
            <img src="/images/noRooms.jpg" class="noRoomsImage" />
          </div>
          <div class="flex mt-2 noBookingsText">No bookings found!</div>
        </div>
      </div>
    </span>
    <span v-if="$store.state.contacts.allRoomBookingsData.length != 0">
      <div
        v-for="(meetings, index) in $store.state.contacts.allRoomBookingsData"
        :key="index"
        class="
          description-container
          my-3
          w-full
          flex flex-row
          justify-content-between
        "
      >
        <div class="flex flex-row">
          <span
            class="calendar-description-border-color mr-2"
            :style="borderColors(meetings['color'])"
          ></span>
          <div class="flex flex-column align-items-start">
            <p class="m-0 calendar-description-title">
              {{
                meetings["settings_room_contact_meeting_booking"]["room_name"]
              }}
            </p>
            <p class="m-0 calendar-description-description">
              Meeting Title: {{ meetings["meeting_title"] }}
            </p>
            <p class="m-0 calendar-description-timing">
              {{ meetings["time"] }}
            </p>
            <p
              v-if="
                $store.state.commonStore.calendarTimeStore == 'dayGridMonth' ||
                $store.state.commonStore.calendarTimeStore == 'timeGridWeek'
              "
              class="m-0 calendar-description-timing"
            >
              {{ meetings["date"] }}
            </p>
          </div>
        </div>

        <div>
          <CustomSpeedDial
            storePath="contacts"
            :customDialData="getOverlayData(meetings)"
            :rowData="meetings"
            dataName="roomBookings"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "RoomBookings",
  props: ["data"],
  data() {
    return {
      bookingsData: [],
      overlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      requestCancellationOverlaydata: [
        { label: "Request Cancel", icon: "fas fa-ban" },
      ],
    };
  },
  methods: {
    getOverlayData(data) {
      if (
        data["users_contact_meeting_room_booking"]["display_name"] ==
        this.$store.state.commonStore.loggedInUser
      ) {
        return this.overlayData;
      } else {
        return this.requestCancellationOverlaydata;
      }
    },
    borderColors(color) {
      return {
        "background-color": color,
      };
    },
  },
};
</script>

<style scoped>
.noBookingsText {
  font-family: Montserrat;
  color: #7e84a7;
}
.bookingsDiv {
  text-align: start;
  height: 300px;
  overflow: auto;
}
.noRoomsImage {
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.noBookingsDiv {
  vertical-align: middle;
  text-align: center;
}
.noBookingsContent {
  line-height: 15;
}
.calendar-description-border-color {
  height: 100%;
  width: 10px;
  border-radius: 4px;
}
.calendar-description-title {
  color: #000210;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
}
.calendar-description-description {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000210;
}
.calendar-description-timing {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #7e84a7;
}
.description-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 34px;
  color: #000210;
}
.plus-blue {
  color: #5849e1;
  font-size: 25px;
}
</style>
