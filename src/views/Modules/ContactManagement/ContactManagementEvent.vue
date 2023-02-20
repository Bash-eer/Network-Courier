<template>
  <div class="contact-event-container mb-4 h-full h-100">
    <div class="grid">
      <div
        class="col-12 md:col-3 contact-event-card"
        v-for="(event, index) in $store.state.contacts.eventsPageData"
        :key="index"
      >
        <div
          class="card h-full h-100 w-100 cursor-pointer"
          :style="backgroundStyles(event['eventImage'])"
        >
          <div
            class="card-img-overlay"
            @click="
              clickedFunction($store.state.contacts.eventCardsData[index])
            "
          >
            <!--card title/header-->
            <div class="card-title">
              <div class="flex justify-content-between">
                <div class="flex"></div>
                <div class="flex">
                  <CustomSpeedDial
                    dataName="eventsOverlayData"
                    storePath="contacts"
                    class="white-custom-speed-dial"
                    :customDialData="
                      $store.state.contacts.eventCradsOverlayData
                    "
                    :rowData="$store.state.contacts.eventCardsData[index]"
                    @click="
                      customDialFunction(
                        $store.state.contacts.eventCardsData[index]
                      )
                    "
                  />
                </div>
              </div>
            </div>
            <!--card footer-->
            <div class="footer w-100">
              <!--event name and invitees info-->
              <div
                class="
                  flex
                  justify-content-between
                  align-items-center
                  justify-content-center
                  eventOverview
                "
              >
                <div class="flex contact-event-card-title">
                  {{ event["eventName"] }}
                </div>
                <div class="flex">
                  <AvatarGroup class="">
                    <Avatar
                      v-for="(item, index) of getGroupedAvatarsData(
                        event['invitees']
                      )"
                      :key="index"
                      :image="item"
                      size="small"
                      shape="square"
                    />
                    <Avatar
                      v-if="event['invitees'].length > 2"
                      :label="getGroupedAvatarsLabel(event['invitees'])"
                      shape="square"
                      size="small"
                      class="grouped-avatar-more-text"
                    />
                  </AvatarGroup>
                </div>
              </div>
              <!--event time info-->
              <div
                class="flex flex-row contact-event-card-bottom-content timeInfo"
              >
                <div class="flex">
                  <i class="pi pi-calendar-times " style="margin-right: 6px ,font-size: 2rem"></i>
                  <span>{{ event["date"] }}</span>
                </div>
                <div class="flex">
                  <div class="verticalLine ml-2 mr-2"></div>
                </div>
                <div class="flex">
                  <i class="pi pi-chevron-circle-left" style="margin-right: 6px"></i>
                  <span>{{ event["time"] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
export default {
  components: {
    Avatar,
    AvatarGroup,
  },
  data() {
    return {
      path: "event/Invitees/status/",
      followUpPath: "event/invitees/followUp/",
      isCustomDialClicked: "No",
    };
  },
  methods: {
    backgroundStyles(image) {
      return {
        background: `linear-gradient(179.98deg, rgba(0, 0, 0, 0) 44.16%, #000000 99.98%), url(${image})`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-blend-mode": "darken",
        "border-radius": "15px",
      };
    },
    getGroupedAvatarsLabel(data) {
      let avatarsLabel;
      if (data.length > 2) {
        let len = data.length - 2;
        avatarsLabel = "+" + "" + len.toString();
      } else {
        avatarsLabel = "";
      }
      return avatarsLabel;
    },
    getGroupedAvatarsData(data) {
      if (data.length <= 2) {
        return data;
      } else {
        let gAData = [];
        for (let gA = 0; gA < 2; gA++) {
          gAData.push(data[gA]);
        }
        return gAData;
      }
    },
    customDialFunction(data) {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      this.getContactsTableData();
      this.getInviteesTableData(data);
      this.processEventsOverviewData(data);
    },
    getTime(time) {
      return time.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    processEventsTime(tag, from, to) {
      //reference months
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let fromTime = new Date(from);
      let toTime = new Date(to);
      //get the year
      // let fromYear = fromTime.getFullYear();
      let toYear = toTime.getFullYear();
      //get the month
      let fromMonth = months[fromTime.getMonth()];
      let toMonth = months[toTime.getMonth()];
      //get the date
      let fromDate = fromTime.getDate();
      let toDate = toTime.getDate();
      //get the hours and minutes
      let fromClock = this.getTime(fromTime);
      let toClock = this.getTime(toTime);

      //return the event's data format
      if (tag == "date") {
        let eventsDateString = "";
        eventsDateString =
          fromDate +
          " " +
          fromMonth +
          " - " +
          toDate +
          " " +
          toMonth +
          "," +
          toYear;
        return eventsDateString;
      }
      //return the event's time format
      if (tag == "time") {
        let eventsTimeString = "";
        eventsTimeString = fromClock + " - " + toClock;
        return eventsTimeString;
      }
    },
    getContactsTableData() {
      this.$store.dispatch("contacts/loadContactManagementTableCommons", {
        path: "contacts",
        mutation: "fetchContactMangementContactTableData",
        nameKey: "users_contact_contacts",
      });
    },
    processEventsOverviewData(data) {
      let eventsOverviewPageData = {};
      //fetching the required data for events overview page
      for (let keys in data) {
        if (
          keys == "cover_image" ||
          keys == "event_image" ||
          keys == "event_name" ||
          keys == "id" ||
          keys == "users_contact_events" ||
          keys == "createdAt" ||
          keys == "subject" ||
          keys == "contact_person" ||
          keys == "contact_email" ||
          keys == "contact_no" ||
          keys == "address"
        ) {
          if (keys == "users_contact_events") {
            eventsOverviewPageData["createdBy"] = data[keys]["display_name"];
          } else {
            eventsOverviewPageData[keys] = data[keys];
          }
        }
      }
      eventsOverviewPageData["calendar"] = this.processEventsTime(
        "date",
        data["event_from_date_time"],
        data["event_to_date_time"]
      );
      eventsOverviewPageData["clock"] = this.processEventsTime(
        "time",
        data["event_from_date_time"],
        data["event_to_date_time"]
      );
      //processing the icons data
      for (let eo in eventsOverviewPageData) {
        for (let icons in this.$store.state.contacts.contactIcons) {
          if (this.$store.state.contacts.contactIcons[icons]["tag"] == eo) {
            this.$store.state.contacts.contactIcons[icons]["text"] =
              eventsOverviewPageData[eo];
          }
        }
      }
      this.$store.state.contacts.eventsOverviewPageData =
        eventsOverviewPageData;
    },
    getEmbedCodeString(id) {
      let embedCodeData = this.$store.state.contacts.embedCodeData;
      for (let e in embedCodeData) {
        if (embedCodeData[e]["event_id"] == id) {
          this.$store.state.contacts.embedCodeString =
            embedCodeData[e]["embed_code"];
        }
      }
    },
    getInviteesTableData(data) {
      this.getEmbedCodeString(data.id);
      let eventPath = this.path + data.id;
      this.$store.state.contacts.inviteesEventId = data.id;
      this.$store.state.contacts.inviteesEventPath = eventPath;
      this.$store.state.contacts.inviteesMainGroupsDropDownData = [];
      this.$store.state.contacts.inviteesSubGroupsDropDownData = [];
      this.$store.state.contacts.subGroupInviteesData = [];
      this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
      //fetching data for invitees table in events overview page
      this.$store.dispatch("contacts/loadContactManagementTableCommons", {
        path: eventPath,
        mutation: "fetchInviteesTableData",
        nameKey: "users_contact_events",
      });
      //fetching the follow up table data for each event
      let followUpPath = this.followUpPath + data.id;
      this.$store.state.contacts.inviteesFollowUpPath = followUpPath;
      this.$store.dispatch("contacts/loadContactManagementTableCommons", {
        path: followUpPath,
        mutation: "fetchFollowUpTableData",
        nameKey: "users_contact_events_follow_up",
      });
    },
    clickedFunction(data) {
      this.getContactsTableData();
      this.getInviteesTableData(data);
      //processing data for events overview page header
      this.processEventsOverviewData(data);
      this.$router.push("/contact-management/event");
    },
  },
  created() {
    //fetch event contacts table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "contacts",
      mutation: "fetchContactMangementContactTableData",
      nameKey: "users_contact_contacts",
    });
    //fetch events page data
    this.$store.dispatch("contacts/loadEventsPage", {
      path: "events",
      mutation: "fetchEventsPageData",
    });
  },
};
</script>
<style scoped>
/* .grouped-avatar-more-text {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #7E84A7;
} */
.p-avatar-group .p-avatar + .p-avatar {
  margin-left: -0.7rem !important;
}
.p-avatar-group .p-avatar {
  border: none !important;
}
::v-deep .p-avatar img {
  border-radius: 6px !important;
}
.card {
  border-radius: 15px !important;
  border-color: transparent;
}
.card-img-overlay {
  padding: 0rem !important;
}
.eventOverview {
  margin-bottom: 13px;
}
.timeInfo {
  margin-bottom: 15px;
}
.footer {
  position: absolute;
  bottom: 0px;
  padding-left: 17px;
  padding-right: 10px;
}
.verticalLine {
  opacity: 1;
  border-left: 2px solid white;
  height: 15px;
}
.contact-event-custom-dial {
  z-index: 100;
}
::v-deep .pi-ellipsis-v {
  color: #fff !important;
}
::v-deep .pi-ellipsis-v:hover {
  color: #000 !important;
}
.contact-event-container {
  min-height: 70vh;
  /* padding-left: 37px; */
  /* padding-right: 37px; */
}
.contact-event-card {
  min-height: 231px;
  /* width: 346px; */
  border: none;
  color: #fff;
}
a {
  text-decoration: none !important;
  color: #fff !important;
}
.contact-event-card-insider {
  border-radius: 15px;
}
.contact-event-card-avatars {
  margin-right: -60px;
}
.contact-event-card-bottom-content {
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0em;
}
.contact-event-card-title {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
}
</style>
