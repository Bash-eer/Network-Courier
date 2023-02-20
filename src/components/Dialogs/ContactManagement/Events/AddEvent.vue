<template>
  <div class="addEventDiv">
    <div class="contact-event-add-event-wrapper w-100">
      <!--COVER IMAGE-->
      <div class="grid cursor-pointer">
        <div class="col-12 coverImageDiv">
          <CoverImageUpload
            URL="/images/cover-pic.png"
            :state="coverImageState"
            v-model="details['CoverImageUpload']"
          />
        </div>
        
      </div>
      <!--EVENT IMAGE-->
      <div class="contact-event-add-event-absolute-wrap pointer-cursor">
        <EventImageUpload
          URL="/images/event-img.png"
          :state="profileImageState"
        />
      </div>
      <br />
      <br />
      <div class="grid formFields">
        <!--EVENT AND PERSONAL DETAILS-->
        <div class="col-8">
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <h5 class="required dialog-label-text">Event Name</h5>
              <TextField
                label="event_name"
                v-model="details['event_name']"
                @blur="v$.details['event_name'].$model"
                v-on:childToParent="getUserInput"
                :classes="{
                  'p-invalid': v$.details['event_name'].$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
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
                    :showSeconds="true"
                    dateFormat="d MM yy"
                    class="contactsCalendar"
                    v-model="details.event_from_date_time"
                    :showIcon="true"
                    style="width: 100%"
                    :class="{
                      'p-invalid':
                        v$.details.event_from_date_time.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text ': true,
                    }"
                    :monthNavigator="true"
                    :yearNavigator="true"
                    yearRange="1950:2050"
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
                    class="contactsCalendar"
                    v-model="details.event_to_date_time"
                    :showIcon="true"
                    style="width: 100%"
                    :class="{
                      'p-invalid':
                        v$.details.event_to_date_time.$invalid && submitted,
                      'inputfield w-full dialog-dropdown-text ': true,
                    }"
                    :monthNavigator="true"
                    :yearNavigator="true"
                    yearRange="1950:2050"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <h5 class="required dialog-label-text">Contact Person</h5>
              <TextField
                label="contact_person"
                v-model="details['contact_person']"
                @blur="v$.details['contact_person'].$model"
                v-on:childToParent="getUserInput"
                :classes="{
                  'p-invalid':
                    v$.details['contact_person'].$invalid && submitted,
                  'inputfield w-full dialog-field-text': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Contact E-mail</h5>
              <TextField
                id="contact_email"
                type="text"
                label="contact_email"
                v-model="details['contact_email']"
                @blur="v$.details['contact_email'].$model"
                placeholder="e.g. Tommy@gmail.com"
                :classes="{
                  'p-invalid':
                    v$.details['contact_email'].$invalid && submitted,
                  'dialog-label-text dialog-field-text': true,
                }"
              ></TextField>
              <span v-if="v$.details['contact_email'].$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.details['contact_email'].$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.details['contact_email'].$invalid && submitted) ||
                  v$.details['contact_email'].$pending.$response
                "
                class="p-error"
                >{{
                  v$.details["contact_email"].required.$message.replace(
                    "Value",
                    "Email"
                  )
                }}</small
              >
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Contact No</h5>
              <TextField
                label="contact_no"
                type="number"
                v-model="details.contact_no"
                :classes="{
                  'p-invalid': v$.details.contact_no.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
        </div>
        <!-- MAP -->
        <div class="col-4 contact-event-add-event-right-component">
          <GoogleMap
            api-key="AIzaSyBqmYAYo7avti-jDXV6Rh_gHKLaIKkM0AE"
            style="width: 100%; height: 376px"
            :center="center"
            :zoom="15"
            class="map"
          >
            <Marker
              :key="index"
              v-for="(m, index) in markerOptions"
              :options="m"
            />
          </GoogleMap>
        </div>
      </div>
      <!--ADDRESS DETAILS-->
      <div class="grid formFields">
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <h5 class="dialog-label-text text-color">Enter the Address</h5>
              <TextField
                label="address"
                type="text"
                v-model="details.address"
                :classes="{
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid formFields">
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">Postal Code</h5>
              <TextField
                label="postal_code"
                type="number"
                v-model="details.postal_code"
                :classes="{
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">Country</h5>
              <DropDown
                :data="Country"
                :state="details.country"
                label="country"
                code="code"
                v-model="details.country"
                :classes="{
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">State</h5>
              <DropDown
                :data="State"
                :state="details.state"
                label="state"
                code="code"
                v-model="details.state"
                :value="details.state"
                :classes="{
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">Building Name</h5>
              <TextField
                label="building_name"
                v-model="details.building_name"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid formFields">
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">Floor No</h5>
              <TextField
                label="floor_no"
                v-model="details.floor_no"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text text-color">Unit No</h5>
              <TextField
                label="unit_no"
                v-model="details.unit_no"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Subject</h5>
              <TextAreaField
                :state="details.subject"
                label="subject"
                v-model="details.subject"
                @blur="v$.details.subject.$model;"
                :classes="{
                  'p-invalid': v$.details.subject.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text">Remarks</h5>
              <TextAreaField
                :state="details.remarks"
                label="remarks"
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
      </div>
      <!-- GROUPS CREATION-->
      <div class="flex justify-content-between groupsCreation">
        <div class="flex inviteesText">Invites ({{ getInviteesCount() }})</div>
        <div class="flex">
          <Buttons
            button_class="p-button-sm p-button-outlined mr-4 add-btn custom-add-btn"
            label="Create Group"
            v-on:childToParent="openDialog('CreateEventGroupsDialog')"
          />
        </div>
      </div>
      <div
        :class="
          $store.state.contacts.eventGroupsData.length == 0
            ? 'eventGroupsTextDiv mt-5'
            : 'eventGroupsAccordionDiv mt-5'
        "
      >   <div class="flex  justify-content-end mt-1 margin-right-10px">
         <TextField
                v-model="searcher"
                label="contactsSearch"
                placeholder="Search Contacts"
                type="text"
                class="flex"
                :classes="{
                  'inputfield w-full dialog-dropdown-text inviteesTableSearch': true,
                }"
                v-on:childToParent="globalSearcher"
              />
              <span class="flex ml-4"> <Buttons
            label="Add Invitees"
            class="flex "
            button_class="dialog-button-text p-button-sm  mr-4 add-btn custom-add-btn"
            v-on:childToParent="submitData"
          /></span></div>
            
        <span
          class="noGroupsText"
          v-if="$store.state.contacts.eventGroupsData.length == 0"
        >
          
            
          Create some groups! 👱‍♂️👩
        </span>
        <span v-if="$store.state.contacts.eventGroupsData.length != 0">
          <EventGroups
            :key="$store.state.contacts.eventGroupsData"
            :data="$store.state.contacts.eventGroupsData"
          />
        </span>
      </div>
      <!-- SUBMIT DATA -->
      <div class="flex justify-content-between groupsCreation mt-8">
        <div class="flex"></div>
        <div class="flex">
          <Buttons
            label="Create Event"
            button_class="dialog-button-text p-button-sm  mr-4 add-btn custom-add-btn"
            v-on:childToParent="submitData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { GoogleMap, Marker } from "vue3-google-map";
import useVuelidate from "@vuelidate/core";
import { required ,email} from "@vuelidate/validators";
import CoverImageUpload from "../../../ContactManagement/CoverImageUpload.vue";
import EventImageUpload from "../../../ContactManagement/EventImageUpload.vue";
export default {
  components: {
    GoogleMap,
    Marker,
    CoverImageUpload,
    EventImageUpload,
  },
  data: () => ({
    coverImageState: "",
    profileImageState: "",
    v$: useVuelidate(),
    Country: [
      { name: "India", code: "1" },
      { name: "singapore", code: "2" },
      { name: "Australia", code: "3" },
    ],
    State: [
      { name: "Tamil nadu", code: "1" },
      { name: "kerala", code: "2" },
      { name: "karnataka", code: "2" },
    ],
    details: {
      coverImageState:"",
      event_name: "",
      event_from_date_time: "",
      event_to_date_time: "",
      contact_person: "",
      contact_email: "",
      contact_phone_code: "",
      contact_no: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      latitude: "11.041189",
      longitude: "76.999601",
      subject: "",
      remarks: "",
    },
    contact_email:"",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        coverImageState:{ required},
        event_name: { required },
        event_from_date_time: { required },
        event_to_date_time: { required },
        contact_person: { required },
        contact_email: {  required, email},
        contact_no: { required },
        subject: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    openDialog(name) {
      this.$store.state.contacts.eventsMainGroupName = null;
      //fetch event contacts table data
      this.$store.dispatch("contacts/loadContactManagementTableCommons", {
        path: "contacts",
        mutation: "fetchContactMangementContactTableData",
        nameKey: "users_contact_contacts",
      });
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters["users/controlActivityDialog"];
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "country":
          source = this.Country;
          break;
        case "state":
          source = this.State;
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
      return date.toISOString();
    },
    getInviteesCount() {
      let count = 0;
      let eventGroupsData = this.$store.state.contacts.eventGroupsData;
      for (let i in eventGroupsData) {
        let subGroups = eventGroupsData[i]["sub_groups"];
        for (let sg in subGroups) {
          count = count + subGroups[sg]["sub_group_members"].length;
        }
      }
      return count;
    },
    getProcessedGroupsData() {
      //makes deep copy of array of objects
      let groupsData = JSON.parse(
        JSON.stringify(this.$store.state.contacts.eventGroupsData)
      );
      for (let g in groupsData) {
        let subGroups = groupsData[g]["sub_groups"];
        for (let sg in subGroups) {
          let invitees = subGroups[sg]["sub_group_members"];
          for (let i in invitees) {
            let inviteesObj = invitees[i];
            for (let keys in inviteesObj) {
              if (keys == "imgUrl" || keys == "name" || keys == "phone") {
                delete inviteesObj[keys];
              }
            }
          }
        }
      }
      return groupsData;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let eventDetails = {};
        for (let d in this.details) {
          if (d == "country" || d == "state") {
            if (isNaN(this.details[d]) == false) {
              eventDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              eventDetails[d] = this.details[d];
            }
          } else if (d == "event_from_date_time" || d == "event_to_date_time") {
            if (
              Object.keys(this.$store.state.contacts.eventCardsStateData)
                .length != 0
            ) {
              eventDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              eventDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else {
            eventDetails[d] = this.details[d];
          }
        }
        eventDetails["cover_image"] = this.$store.state.contacts.coverImageURL;
        eventDetails["event_image"] = this.$store.state.contacts.eventImageURL;
        eventDetails["groups"] = this.getProcessedGroupsData();

        //stroring the list of deleted main groups, sub groups and invitees
        if (
          Object.keys(this.$store.state.contacts.eventCardsStateData).length !=
          0
        ) {
          eventDetails["delete_groups"] =
            this.$store.state.contacts.deletedEventsMainGroups;
          eventDetails["delete_sub_groups"] =
            this.$store.state.contacts.deletedEventsSubGroups;
          eventDetails["delete_sub_group_members"] =
            this.$store.state.contacts.deletedEventGroupsInviteesIds;
        }

        //making an update/PATCH api call to update event details
        if (this.$store.state.contacts.eventCardsStateData.id) {
          eventDetails["id"] =
            this.$store.state.contacts.eventCardsStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "events",
            mutation: "fetchEventsPageData",
            tag: "update",
            data: eventDetails,
            nameKey: "",
          });
        }
        //making an add/POST api call to create a new event
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "events",
            mutation: "fetchEventsPageData",
            tag: "add",
            data: eventDetails,
            nameKey: "",
          });
        }
        this.$router.push("/contact-management");
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.eventCardsStateData).length != 0
      ) {
        this.$store.state.contacts.eventsMainGroupsDropDownData = [];
        //loading the image states
        this.coverImageState =
          this.$store.state.contacts.eventCardsStateData["cover_image"];
        this.profileImageState =
          this.$store.state.contacts.eventCardsStateData["event_image"];
        this.$store.state.contacts.coverImageURL =
          this.$store.state.contacts.eventCardsStateData["cover_image"];
        this.$store.state.contacts.eventImageURL =
          this.$store.state.contacts.eventCardsStateData["event_image"];
        //loading basic form details
        for (let state in this.details) {
          if (
            state == "event_from_date_time" ||
            state == "event_to_date_time"
          ) {
            let rawDate = new Date(
              this.$store.state.contacts.eventCardsStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.contacts.eventCardsStateData[state];
          }
        }
        let groupsStateData =
          this.$store.state.contacts.eventCardsStateData["groups"];
        //loading the accordion groups data
        this.$store.state.contacts.eventGroupsData = groupsStateData;
        //loading the main groups dropdown data
        for (let g in groupsStateData) {
          let groupsDropDownObject = {};
          groupsDropDownObject["name"] = groupsStateData[g]["group_name"];
          groupsDropDownObject["code"] = groupsStateData[g]["id"];
          this.$store.state.contacts.eventsMainGroupsDropDownData.push(
            groupsDropDownObject
          );
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.inviteesText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.noGroupsText {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  color: #130f40;
}
.text-color{
  color: #7A7A7A;
}
.eventGroupsTextDiv {
  border: 1px solid #c8deff;
  box-sizing: border-box;
  border-radius: 4px;
  line-height: 300px;
  text-align: center;
  margin-left: 5.5%;
  margin-right: 5.5%;
  overflow: auto;
}
.eventGroupsAccordionDiv {
  border: 1px solid #c8deff;
  box-sizing: border-box;
  border-radius: 4px;
  height: 500px;
  margin-left: 5.5%;
  margin-right: 5.5%;
  overflow: auto;
}
.groupsCreation {
  padding-left: 70px;
  padding-right: 45px;
}
.formFields {
  padding-left: 51px;
  padding-right: 51px;
}
.addEventDiv {
  padding-top: 20px;
  padding-left: 94px;
  padding-right: 94px;
}
.coverImageDiv {
  padding-left: 44px;
  padding-right: 44px;
}
.contact-event-add-event-wrapper {
  padding-top: 26px;
  padding-bottom: 35px;
  background: #fff;
}
.contact-event-add-event-top-wrapper {
  background-color: #c4c4c4;
  width: 84.5rem;
  height: 15.688rem;
  margin: auto;
}
.contact-event-add-event-absolute-wrap {
  z-index: 1;
  width: 265px;
  height: 173px;
  background-color: #ffffff;
  margin-left: 4.9rem;
  margin-top: -10rem;
  box-shadow: 5px 8px 7px rgba(0, 0, 0, 0.05),
    5px 8px 5px rgba(0, 0, 0, 0.05);
}
.map {
  margin: auto;
}
.contact-event-attendance-title {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
</style>
