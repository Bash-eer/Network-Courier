<template>
  <div class="m-3 book-meeting-container pb-3">
    <!-- ROOM IMAGE AND INVITEES -->
    <div class="grid w-100 pb-2 pl-4 pr-4">
      <div class="col-8">
        <div
          class="roomImageDiv my-2"
          :style="
            backgroundStyles(
              Object.keys(this.$store.state.contacts.meetingsRoomsFormStateData)
                .length == 0
                ? this.$store.state.contacts.roomCardData['image_url']
                : this.$store.state.contacts.meetingsRoomsFormStateData[
                    'settings_room_contact_meeting_booking'
                  ]['image_url']
            )
          "
        >
          <div class="roomImageDivFooter w-100 p-2 bodyTxt">
            <div class="flex flex-column justify-content-center w-100 h-100">
              <div class="flex roomsTitleText">
                {{
                  Object.keys(
                    this.$store.state.contacts.meetingsRoomsFormStateData
                  ).length == 0
                    ? this.$store.state.contacts.roomCardData["room_name"]
                    : this.$store.state.contacts.meetingsRoomsFormStateData[
                        "settings_room_contact_meeting_booking"
                      ]["room_name"]
                }}<i class="pi pi-angle-down ml-2 mt-2"></i>
              </div>
              <div class="flex roomsSubTitleText">
                Occupancy:
                {{
                  Object.keys(
                    this.$store.state.contacts.meetingsRoomsFormStateData
                  ).length == 0
                    ? this.$store.state.contacts.roomCardData["occupancy"]
                    : this.$store.state.contacts.meetingsRoomsFormStateData[
                        "settings_room_contact_meeting_booking"
                      ]["occupancy"]
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="inviteesDiv">
          <Invitees
            :data="$store.state.contacts.inviteesData"
            usage="cards"
            inviteesClass="rooms_invitees_parent"
            noInviteesClass="roomsNoInvitees"
          />
        </div>
      </div>
    </div>
    <!-- FORM FIELD AND CONTACTS TABLE -->
    <div class="grid w-100 pt-2 pb-2 pl-4 pr-4">
      <div class="col-8">
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Meeting Title</h5>
            <TextField
              label="meeting_title"
              type="text"
              v-model="details.meeting_title"
              @blur="v$.details.meeting_title.$model;"
              :classes="{
                'p-invalid': v$.details.meeting_title.$invalid && submitted,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Name</h5>
            <DropDown
              :data="NameData"
              :state="details.name"
              label="meeting_name"
              code="code"
              v-model="details.name"
              @blur="v$.details.name.$model;"
              :classes="{
                'p-invalid': v$.details.name.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Meeting Type</h5>
            <DropDown
              :data="MeetingTypeData"
              :state="details.meeting_type"
              label="meeting_type"
              code="code"
              v-model="details.meeting_type"
              :value="details.meeting_type"
              :classes="{
                'p-invalid': v$.details.meeting_type.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">From Date & Time</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  :showTime="true"
                  :showSeconds="false"
                  dateFormat="d MM yy"
                  class="fleetsCalendar"
                  v-model="details.from_date_time"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                  :class="{
                    'p-invalid':
                      v$.details.from_date_time.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">To Date & Time</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  :showTime="true"
                  :showSeconds="true"
                  dateFormat="d MM yy"
                  class="fleetsCalendar"
                  v-model="details.to_date_time"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                  :class="{
                    'p-invalid': v$.details.to_date_time.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Remarks</h5>
            <TextAreaField
              :state="details.remarks"
              label="receipt_remarks"
              v-model="details.remarks"
              @blur="v$.details.remarks.$model;"
              :classes="{
                'p-invalid': v$.details.remarks.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div
          class="
            flex
            justify-content-between
            pl-2
            mt-2
            align-items-center
            justify-content-center
          "
        >
          <div class="flex embedCodeHeading">All Employee</div>
<SearchContact/>
        </div>
        <ContactTables
          :key="$store.state['contacts']['eventContactsTableData']"
          :tableClass="'contactEventsTableClass'"
          :tableDataName="'eventContactsTableData'"
          :tableName="'eventContactsTable'"
          :storePath="'contacts'"
          :tableData="$store.state['contacts']['eventContactsTableData']"
          :tableColumns="
            $store.state['contacts']['eventContactsTableColumnData']
          "
        />
      </div>
    </div>
    <div class="flex align-self-center justify-content-end m-2">
      <Buttons
        label="Cancel"
        v-on:childToParent="returnBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Book Now"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "BookMeetings",
  data() {
    return {
      NameData: [{ name: "Bob", code: 1 }],
      MeetingTypeData: [
        { name: "Internal", code: 1 },
        { name: "External", code: 2 },
      ],
      searcher: "",
      v$: useVuelidate(),
      details: {
        meeting_title: "",
        name: "",
        meeting_type: "",
        from_date_time: "",
        to_date_time: "",
        remarks: "",
      },
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        meeting_title: { required },
        name: { required },
        meeting_type: { required },
        from_date_time: { required },
        to_date_time: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    backgroundStyles(image) {
      return {
        background: `url(${image}`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-blend-mode": "darken",
        "border-radius": "15px",
      };
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    returnBack() {
      this.$router.push("/contact-management");
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "name":
          source = this.NameData;
          break;
        case "meeting_type":
          source = this.MeetingTypeData;
          break;
      }
      return source;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY HH:mm:ss");
        return formattedDate;
      }
    },
    dateAndTimeFormatter(date) {
      return moment(date).utcOffset("+8:00").format();
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let inviteesData = JSON.parse(
          JSON.stringify(this.$store.state.contacts.inviteesData)
        );
        for (let i in inviteesData) {
          let iObj = inviteesData[i];
          for (let iKeys in iObj) {
            if (iKeys == "imgUrl" || iKeys == "name" || iKeys == "phone") {
              delete iObj[iKeys];
            }
          }
        }
        let meetingDetails = {};
        for (let d in this.details) {
          if (d == "from_date_time" || d == "to_date_time") {
            if (
              Object.keys(this.$store.state.contacts.meetingsRoomsFormStateData)
                .length != 0
            ) {
              meetingDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              meetingDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else if (d == "name" || d == "meeting_type") {
            if (isNaN(this.details[d]) == false) {
              meetingDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              meetingDetails[d] = this.details[d];
            }
          } else {
            meetingDetails[d] = this.details[d];
          }
        }
        meetingDetails["meeting_members"] = inviteesData;

        if (
          Object.keys(this.$store.state.contacts.meetingsRoomsFormStateData)
            .length == 0
        ) {
          meetingDetails["room_id"] = this.$store.state.contacts.roomId;
        }

        //stroring the list of deleted invitees
        if (
          Object.keys(this.$store.state.contacts.meetingsRoomsFormStateData)
            .length != 0
        ) {
          meetingDetails["delete_meeting_members"] =
            this.$store.state.contacts.deletedEventGroupsInviteesIds;
        }

        //making an update/PATCH api call to update meeting details
        if (this.$store.state.contacts.meetingsRoomsFormStateData.id) {
          meetingDetails["id"] =
            this.$store.state.contacts.meetingsRoomsFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "meetingRoom/booking",
            mutation: "fetchCurrentStatusOfRooms",
            tag: "update",
            data: meetingDetails,
            nameKey: "",
          });
          this.$router.push("/calendar");
        }
        //making an add/POST api call to create new meeting details
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "meetingRoom/booking",
            mutation: "fetchCurrentStatusOfRooms",
            tag: "add",
            data: meetingDetails,
            nameKey: "",
          });
          this.$router.push("/contact-management");
        }
      }
    },
    //loads the past invitees' state
    processInviteesState(data) {
      let inviteeObj = {};
      if (data["id"]) {
        inviteeObj["id"] = data["id"];
      }
      inviteeObj["contact_id"] = data["contact_id"];
      inviteeObj["imgUrl"] = data["contact"]["contactPicture"];
      inviteeObj["name"] = data["contact"]["contactName"];
      inviteeObj["phone"] = data["contact"]["contactNumber"];
      this.$store.state.contacts.inviteesData.push(inviteeObj);
    },
    processStates(tag) {
      let inviteesData =
        this.$store.state.contacts.meetingsRoomsFormStateData[
          "meeting_room_booking_members"
        ];
      for (let t in this.$store.state["contacts"]["eventContactsTableData"]) {
        let tObj = this.$store.state["contacts"]["eventContactsTableData"][t];
        for (let i in inviteesData) {
          if (inviteesData[i]["contact_id"] == tObj["contact_id"]) {
            if (inviteesData[i]["id"]) {
              this.$store.state["contacts"]["eventContactsTableData"][t]["id"] =
                inviteesData[i]["id"];
              tObj["id"] = inviteesData[i]["id"];
            }
            //loads the past invitees' state
            if (tag == "chips") {
              this.processInviteesState(tObj);
            }
            //loads the past contact table's state
            if (tag == "table") {
              this.$store.state["contacts"]["eventContactsTableData"][t][
                "inviteeStatus"
              ] = "Invited";
            }
          }
        }
      }
    },
    resetTable() {
      for (let t in this.$store.state["contacts"]["eventContactsTableData"]) {
        this.$store.state["contacts"]["eventContactsTableData"][t][
          "inviteeStatus"
        ] = "Invite";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.meetingsRoomsFormStateData)
          .length != 0
      ) {
        this.resetTable();
        //loads the past invitees' state
        this.processStates("chips");
        //loads the past contact table's state
        this.processStates("table");
        //loads other fields' past state
        for (let state in this.details) {
          if (state == "from_date_time" || state == "to_date_time") {
            let rawDate = new Date(
              this.$store.state.contacts.meetingsRoomsFormStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.contacts.meetingsRoomsFormStateData[state];
          }
        }
        this.details["room_id"] = parseInt(
          this.$store.state.contacts.meetingsRoomsFormStateData["room_id"]
        );
      }
    },
  },
  unmounted() {
    this.$store.state.contacts.inviteesData = [];
    //fetch event contacts table data
    this.$store.dispatch("contacts/loadContactManagementTableCommons", {
      path: "contacts",
      mutation: "fetchContactMangementContactTableData",
      nameKey: "users_contact_contacts",
    });
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.book-meeting-container {
  background-color: #fff;
}
.roomImageDiv {
  height: 350px;
  position: relative;
}
.roomImageDivFooter {
  bottom: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  height: 84px;
}
.bodyTxt {
  color: #ffffff !important;
  text-align: left;
  font-family: Montserrat;
}
.roomsTitleText {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
}
.roomsSubTitleText {
  font-style: normal;
  font-weight: 100;
  font-size: 13px;
}
.inviteesDiv {
  height: 350px;
}
.circle-around {
  border-radius: 50%;
  border: 1px solid #4e5968;
  width: 15px;
  height: 15px;
}
</style>
