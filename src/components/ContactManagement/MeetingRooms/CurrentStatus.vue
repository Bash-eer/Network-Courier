<template>
  <div class="m-2 contact-room-container">
    <div class="grid m-2 lg:m-0">
      <div
        v-for="rooms in $store.state.contacts.CurrentRoomsStatusData"
        :key="rooms"
        class="col-12 md:col-4 lg:col-3 contact-room-card"
      >
        <router-link to="/contact-management/book-meeting-rooms">
          <div
            @click="cardClick(rooms)"
            class="
              card
              pointer-cursor
              contact-room-card-insider
              m-1
              flex flex-column
              align-content-between
              justify-content-between
              h-100
            "
            :style="backgroundStyles(rooms['image_url'])"
          >
            <div class="flex flex-row w-full justify-content-end">
              <p v-if="rooms.status == 'Booked'" class="booked p-1 px-2 m-3">
                Booked
              </p>
            </div>
            <div>
              <div
                class="
                  flex flex-row
                  w-full
                  align-items-start
                  justify-content-between
                "
              >
                <div class="flex flex-column align-items-start m-3">
                  <div class="flex flex-row">
                    <div class="contact-room-card-title">
                      {{ rooms.room_name }}
                    </div>
                    <span
                      v-if="rooms.status == 'Booked'"
                      class="m-1 mx-2"
                      id="red-dot"
                    ></span>
                    <span v-else class="m-1 mx-2" id="green-dot"></span>
                  </div>
                  <div class="contact-room-card-subtitle">
                   Occupancy - {{ rooms.occupancy }}
                  </div>
                </div>
                <div v-if="rooms.status == 'Booked'" class="flex flex-row m-3">
                  <!-- <img
                    :src="data.booked_person_img"
                    width="32"
                    height="32"
                    alt=""
                  /> -->
                  <div class="flex flex-column align-items-start ml-1">
                    <span class="contact-room-card-title-right">Booked by</span>
                    <span class="contact-room-card-subtitle-right">{{
                      rooms.booked_by
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    cardClick(data) {
      this.$store.state.contacts.inviteesData = [];
      this.$store.state.contacts.eventsOverviewFormInviteesData = [];
      this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
      this.$store.state.contacts.meetingsRoomsFormStateData = {};
      this.$store.state.contacts.roomId = data["room_id"];
      this.$store.state.contacts.roomCardData = data;
    },
    backgroundStyles(image) {
      return {
        background: `linear-gradient(rgba(0.3, 0.3, 0.3, 0.5), rgba(0.3, 0.3, 0.3, 0.5)), url(${image})`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-blend-mode": "darken",
      };
    },
  },
};
</script>
<style scoped>
#red-dot {
  width: 10.34px;
  height: 10.34px;
  background: #ff3636;
  box-shadow: 1px 2px 15px rgba(192, 23, 23, 0.87);
  border-radius: 50%;
}
#green-dot {
  width: 10.34px;
  height: 10.34px;
  background: #17c079;
  box-shadow: 1px 2px 15px rgba(23, 192, 121, 0.87);
  border-radius: 50%;
}
.booked {
  color: #ff0000;
  background-color: rgba(255, 233, 233, 1);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
}
.contact-room-container {
  min-height: 70vh;
}
.contact-room-card {
  min-height: 250px;
  border-radius: 15px;
  color: #fff;
}
a {
  text-decoration: none !important;
  color: #fff !important;
}
.contact-room-card-insider {
  border-radius: 15px;
}
.contact-room-card-avatars {
  margin-right: -60px;
}
.contact-room-card-bottom-content {
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
}
.contact-room-card-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}
.contact-room-card-subtitle {
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
}
.contact-room-card-title-right {
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
}
.contact-room-card-subtitle-right {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
</style>
