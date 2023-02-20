<template>
  <div class="w-100 tab-class min-height-100 relative">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding px-1"
              id="pills-tab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs.label)"
                  :class="
                    index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                  "
                  :id="'pills-' + tabs.label + '-tab'"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-' + tabs.label"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-' + tabs.label"
                  :aria-selected="index == 0 ? true : false"
                >
                  {{ tabs.tabName }}
                </button>
              </li>
            </ul>
          </div>
          <div
            v-if="currentTab == 'Attendance'"
            class="flex align-items-center attendanceTabText"
          >
            <div class="flex flex-row">
              <div
                class="flex mr-2"
                v-for="(attendance, index) in $store.state.contacts
                  .contactManagementAttendanceTabData"
                :key="index"
              >
                <span>{{ index }}: {{ attendance }}</span>
                <span class="line-opacity">&nbsp;|</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div
        v-if="type != 'contactManagementEDM'"
        class="flex align-self-center toolPills"
      >
        <div
          class="m-2 align-item-center"
          v-if="currentTab == 'ContactMeetingRooms'"
        >
          <span @click="goToCalendar()">
            <i class="pi pi-calendar blue cursor-pointer"></i>
          </span>
        </div>
        <!-- global table search -->
        <span v-if="type != 'meetingRoomsTab'">
          <div
            class="mr-2"
            v-if="
              currentTab == 'FollowUp' ||
              currentTab == 'ContactMeetingRooms' ||
              currentTab == 'ContactContacts' ||
              currentTab == 'ContactGroups' ||
              currentTab == 'ContactAppointments' ||
              currentTab == 'ContactDonations' ||
              currentTab == 'ContactEvents' ||
              currentTab == 'ContactSettingsRooms' ||
              currentTab == 'ContactSettingsEventStatus'
            "
          >
            <SearchField storePath="contacts" />
          </div>
        </span>
        <span v-if="type != 'meetingRoomsTab'">
          <ReportExport
            v-if="
              currentTab == 'ContactContacts' ||
              currentTab == 'ContactGroups' ||
              currentTab == 'ContactEvents' ||
              currentTab == 'ContactDonations' ||
              currentTab == 'ContactAppointments' ||
              currentTab == 'FollowUp' ||
              currentTab == 'InviteesStatus' ||
              currentTab == 'Attendance'
            "
            :type="currentTab"
          />
        </span>
        <span v-if="type != 'meetingRoomsTab'">
          <Buttons
            v-if="currentTab == 'InviteesStatus'"
            label="Print Label"
            v-on:childToParent="openDialog('Print Label')"
            class="
              p-button-outlined
              mr-1
              PrintLableBtn
              dialog-button-text
              previous-btn
            "
          />
          <Buttons
            v-if="
              currentTab == 'ContactContacts' ||
              currentTab == 'ContactEvents' ||
              currentTab == 'ContactDonations' ||
              currentTab == 'ContactAppointments' ||
              currentTab == 'InviteesStatus' ||
              currentTab == 'FollowUp' ||
              currentTab == 'ContactSettingsRooms' ||
              currentTab == 'ContactSettingsEventStatus'
            "
            label="Add New"
            class="Button-Font"
            button_class="p-button-sm mr-4 add-btn  custom-add-btn"
            v-on:childToParent="openDialog()"
          />
          <Buttons
            v-if="currentTab == 'ContactGroups'"
            label="Create Group"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            v-on:childToParent="openDialog()"
          />

          <!-- <Buttons
            v-if="currentTab == 'InviteesStatus'"
            button_class="p-button-sm mr-4 add-btn PrintLableBtn custom-add-btn"
            label="Add New"
            v-on:childToParent="openDialog()"
          /> -->
          <!-- <Buttons
            v-if="currentTab == 'InviteesStatus'"
            label="Print Label"
            v-on:childToParent="openDialog('Print Label')"
            class="p-button-outlined mr-1 dialog-button-text previous-btn"
          /> -->
          <!-- <Buttons
            v-if="currentTab == 'FollowUp'"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            label="Add New"
            v-on:childToParent="openDialog('EventAddFollowUp')"
          /> -->
        </span>
        <span v-if="type != 'meetingRoomsTab'">
          <div class="mr-2" v-if="currentTab == 'Attendance'">
            <SearchContact />
          </div>
        </span>
      </div>
    </div>

    <!-- tab-content -->
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->
        <keep-alive
          v-if="
            tabs.label != 'ContactEvents' &&
            tabs.label != 'Attendance' &&
            tabs.label != 'EDMTab' &&
            tabs.label != 'EmbedCodeTab'
          "
        >
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.heading"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state[storePath][tabs.data]"
            :tableColumns="$store.state[storePath][tabs.columns]"
            v-bind:is="tabs.tab"
            :storePath="'contacts'"
          ></component>
        </keep-alive>
        <keep-alive
          v-if="
            tabs.label == 'ContactEvents' ||
            tabs.label == 'Attendance' ||
            tabs.label == 'EDMTab' ||
            tabs.label == 'EmbedCodeTab'
          "
        >
          <component
            :key="
              tabs.label == 'Attendance'
                ? $store.state.contacts.subGroupInviteesData
                : ''
            "
            v-bind:is="tabs.tab"
          ></component
        ></keep-alive>
      </div>
    </div>
    <!-- <div v-if="
              currentTab == 'ContactContacts' ||
              currentTab == 'ContactGroups' ||
              currentTab == 'ContactAppointments' ||
              currentTab == 'ContactDonations' &&
              currentTab != 'ContactMeetingRooms' 
            "
            class="paginatorText line-height-20 font-size-12 bold-700 color-4a5571">Result per page
      </div> -->
  </div>
</template>

<script>
export default {
  name: "ContactManagementTab",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "ContactContacts",
  }),
  methods: {
    goToCalendar() {
      this.$store.state.commonStore.calendarStore = "contacts";
      this.$router.push("/calendar");
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    // eslint-disable-next-line no-unused-vars
    getOverlayData(tableName) {
      if (
        tableName == "ContactSettingsRooms" ||
        tableName == "ContactSettingsEventStatus"
      ) {
        return this.$store.state["masters"].RoomSettingsOverlayData;
      } else {
        // return this.$store.state.fleets.FleetVehicleOverlayData;
        return this.$store.state["masters"].RoomSettingsOverlayData;
      }
    },
    tabChange(tab) {
      this.currentTab = tab;
      this.searcher = "";
      if (
        tab == "ContactEvents" ||
        tab == "InviteesStatus" ||
        tab == "FollowUp" ||
        tab == "Attendance"
      ) {
        this.$store.state.contacts.inviteesData = [];
        this.$store.state.contacts.eventsOverviewFormInviteesData = [];
        this.$store.state.contacts.ContactEventCurrentTab = "ContactEvents";
      } else if (tab == "EDMTab" || tab == "EmbedCodeTab") {
        this.$store.state.contacts.inviteesData = [];
        this.$store.state.contacts.eventsOverviewFormInviteesData = [];
        let allContactsTableData =
          this.$store.state["contacts"]["eventContactsTableData"];
        for (let c in allContactsTableData) {
          this.$store.state["contacts"]["eventContactsTableData"][c][
            "inviteeStatus"
          ] = "Invite";
        }
        this.$store.state.contacts.ContactEventCurrentTab = "ContactEvents";
      } else if (tab == "CurrentRoomsTab") {
        this.$store.dispatch("contacts/loadMeetingRooms", {
          path: "currentBooking",
          mutation: "fetchCurrentStatusOfRooms",
        });
        this.$store.state.contacts.ContactEventCurrentTab =
          "ContactMeetingRooms";
      } else if (tab == "AvailableRoomsTab") {
        if (
          Object.keys(this.$store.state.contacts.roomsAvailabiltyDetails)
            .length != 0
        ) {
          this.$store.dispatch("contacts/loadAvailableRooms", {
            path: "availableRooms",
            mutation: "fetchCurrentStatusOfRooms",
            data: this.$store.state.contacts.roomsAvailabiltyDetails,
          });
        }
        this.$store.state.contacts.ContactEventCurrentTab =
          "ContactMeetingRooms";
      } else if (tab == "ContactSettingsRooms") {
        this.$store.dispatch("masters/loadRoomsData", {
          path: "rooms",
          mutation: "fetchRoomsData",
        });
      } else if (tab == "ContactSettingsEventStatus") {
        this.$store.dispatch("masters/loadEventStatusData", {
          path: "EventInviteesStatus",
          mutation: "fetchEventStatusData",
        });
      } else {
        this.$store.state.contacts.ContactEventCurrentTab = tab;
      }
    },
    openDialog(tag) {
      if (this.currentTab == "ContactContacts") {
        this.$store.state.contacts.contactsFormStateData = {};
        this.$store.state["users"].dialogComponent = "ContactsDialog";
      }
      if (this.currentTab == "ContactGroups") {
        this.$store.state.contacts.deletedContactIds = [];
        this.$store.state.contacts.mainGroupName = null;
        this.$store.state.contacts.contactGroupsFormStateData = {};
        this.$store.state.contacts.contactsFormTableData = [];
        this.$store.state["users"].dialogComponent = "ContactsGroupDialog";
      }
      if (this.currentTab == "ContactDonations") {
        this.$store.state.contacts.donationsFormStateData = {};
        this.$store.state["users"].dialogComponent = "DonationDialog";
      }
      if (this.currentTab == "ContactAppointments") {
        this.$store.state.contacts.deletedContactIds = [];
        this.$store.state.contacts.contactsFormTableData = [];
        this.$store.state.contacts.appointmentsFormStateData = {};
        this.$store.state["users"].dialogComponent = "AppointmentDialog";
      }

      if (this.currentTab == "ContactEvents") {
        this.$store.state.contacts.deletedEventsMainGroups = [];
        this.$store.state.contacts.deletedEventsSubGroups = [];
        this.$store.state.contacts.inviteesData = [];
        this.$store.state.contacts.eventsOverviewFormInviteesData = [];
        this.$store.state.contacts.eventGroupsData = [];
        this.$store.state.contacts.eventCardsStateData = {};
        this.$store.state.contacts.eventsMainGroupsDropDownData = [];
        this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
        this.$store.state.contacts.coverImageURL = "";
        this.$store.state.contacts.eventImageURL = "";
        this.$router.push("/contact-management/event/add-event");
      }
      if (this.currentTab == "InviteesStatus") {
        //fetching data for invitees table in events overview page
        this.$store.dispatch("contacts/loadContactManagementTableCommons", {
          path: this.$store.state.contacts.inviteesEventPath,
          mutation: "fetchInviteesTableData",
          nameKey: "users_contact_events",
        });
        this.$store.state.contacts.eventsOverviewFormInviteesData = [];
        this.$store.state["users"].dialogComponent = "InviteesDialog";
      }
      if (this.currentTab == "ContactSettingsRooms") {
        this.$store.state.masters.RoomsMasterFormStateData = {};
        this.$store.state.fleets.globalImageUploadURL = null;

        this.$store.state["users"].dialogComponent = "RoomSettingsDialog";
      }
      if (this.currentTab == "ContactSettingsEventStatus") {
        this.$store.state.masters.EventStatusMasterFormStateData = {};

        this.$store.state["users"].dialogComponent = "EventStatusDialog";
      }
      if (tag == "Print Label") {
        this.$store.state["users"].dialogComponent = "PrintLabelDialog";
      }
      if (tag == "reportExport") {
        this.$store.state["users"].dialogComponent = "ReportExportDialog";
      }
      if (this.currentTab == "FollowUp") {
        this.$store.state.contacts.followUpFormStateData = {};
        this.$store.state["users"].dialogComponent = "ContactsFollowUpDialog";
      }
      if (this.currentTab != "ContactEvents") {
        this.$store.getters["users/controlActivityDialog"];
      }
      this.$store.state.sales.stepperEditMode = false;
    },
  },
  mounted() {
    if (this.$store.state.contacts.ContactEventCurrentTab != null) {
      let lableName = this.$store.state.contacts.ContactEventCurrentTab;
      if (document.getElementById(`pills-${lableName}-tab`)) {
        document.getElementById(`pills-${lableName}-tab`).click();
      } else {
        this.currentTab = this.defaultTab;
      }
    } else {
      this.currentTab = this.defaultTab;
    }
  },
  updated() {
    this.$store.state.users.breadcrumbTitle = "Contact Management";
    if (this.currentTab) {
      let tabLable = this.currentTab;
      tabLable = this.currentTab.slice(7);
      if (tabLable == "MeetingRooms") {
        tabLable = "Meeting Rooms";
        this.$store.state.users.breadcrumbPath = `Contact Management > ${tabLable}`;
      } else
        this.$store.state.users.breadcrumbPath = `Contact Management > ${tabLable}`;

      if (
        this.currentTab == "InviteesStatus" ||
        this.currentTab == "FollowUp" ||
        this.currentTab == "Attendance"
      ) {
        this.$store.state.users.breadcrumbPath = `Contact Management > Events`;
      }

      if (this.currentTab == "ContactSettingsEventStatus") {
        this.$store.state.users.breadcrumbTitle = "Event Status";
        this.$store.state.users.breadcrumbPath = `Settings > ${this.$store.state.users.breadcrumbTitle}`;
      }
      if (this.currentTab == "ContactSettingsRooms") {
        this.$store.state.users.breadcrumbTitle = "Rooms Settings";
        this.$store.state.users.breadcrumbPath = `Settings > ${this.$store.state.users.breadcrumbTitle}`;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: rgb(255, 255, 255) !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.attendanceTabText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.line-opacity {
  opacity: 0.2;
}
.PrintLableBtn {
  height: 32px;
}
::v-deep .search-text {
  width: 328px !important;
}
.Button-Font {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
// .paginatorText{
// position: absolute;
// right:7%;
// bottom:17px;
// }
</style>
