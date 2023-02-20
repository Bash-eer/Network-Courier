<template>
  <div class="pl-2 pr-2 text-left">
    <!--EMAIL TEMPLATE AND MAP-->
    <div class="row">
      <!--email template-->
      <div class="col-6">
        <div class="card edmDiv mt-1 p-2">
          <img
            :src="$store.state.contacts.eventsOverviewPageData['cover_image']"
            height="295"
            class="edmImage"
            alt=""
          />
          <div class="eventTxt">
            <!--event name-->
            <div style="margin-top: 2%">
              <span class="eventTitle">{{
                $store.state.contacts.eventsOverviewPageData["event_name"]
              }}</span>
            </div>
            <!--event id-->
            <div style="margin-top: 0px">
              <span class="eventID"
                >Event ID:
                {{ $store.state.contacts.eventsOverviewPageData["id"] }}</span
              >
            </div>
          </div>
          <!--event description-->
          <div style="margin-top: 5px">
            <span style="font-weight: normal; font-size: 14px">{{
              $store.state.contacts.eventsOverviewPageData["subject"]
            }}</span>
          </div>
          <!--event details-->
          <div class="flex flex-row flex-wrap align-items-center iconDiv mt-4">
            <div
              class="flex mr-3 align-items-center"
              v-for="(icon, index) of $store.state.contacts.contactIcons"
              :key="index"
            >
              <div class="flex flex-row align-items-center">
                <div class="flex">
                  <i :class="'pi pi-' + icon.icon + ' ' + 'blue-icon'"></i>
                </div>
                <div class="flex">
                  <span class="iconsText ml-2">{{ icon.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--google map-->
      <div class="col-6">
        <div class="card edmDiv mt-1 p-2">
          <GoogleMap
            api-key="AIzaSyBqmYAYo7avti-jDXV6Rh_gHKLaIKkM0AE"
            style="width: 100%; height: 100%; margin-top: 0"
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
    </div>
    <!--INVITEES-->
    <div class="row">
      <!--all contacts section-->
      <div class="col-4">
        <div class="card edmDiv mt-1 p-2">
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
            <div class="flex embedCodeHeading">All Contacts</div>
            <div class="flex">
              <TextField
                v-model="searcher"
                label="contactsSearch"
                placeholder="Search Contacts"
                type="text"
                :classes="{
                  'inputfield w-full dialog-dropdown-text inviteesTableSearch': true,
                }"
                v-on:childToParent="globalSearcher"
              />
            </div>
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
      <!--selected contacts section-->
      <div class="col-8">
        <div class="card edmDiv pl-2 pr-2">
          <Invitees
            :data="$store.state.contacts.inviteesData"
            usage="cards"
            inviteesClass="edm_invitees_parent"
            noInviteesClass="edmNoInvitees"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-content-end">
      <Buttons
        label="Send as Mail"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { GoogleMap, Marker } from "vue3-google-map";
const { URL } = require("../../../../config/const");
export default {
  components: {
    GoogleMap,
    Marker,
  },
  data() {
    return {
      searcher: "",
    };
  },
  methods: {
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    submitData() {
      let memberIds = [];
      let invitees = this.$store.state.contacts.inviteesData;
      let inviteesTableData =
        this.$store.state.contacts.ContactManagamentInviteesTableData;
      for (let i in invitees) {
        for (let it in inviteesTableData) {
          if (inviteesTableData[it]["contactId"] == invitees[i]["contact_id"]) {
            memberIds.push(inviteesTableData[it]["memberId"]);
          }
        }
      }
      let path =
        "event/edm/invitees/" + this.$store.state.contacts.inviteesEventId;
      let edmDetails = {};
      edmDetails["id"] = memberIds;
      //calling POST method to submit edm details
      axios.post("contactManagement/" + path, edmDetails).then((res) => {
        if (res.status == 200) {
          this.$store.commit("users/showToast", [
            "success",
            res.data.results,
            "was sent!",
            "edm",
          ]);
          this.$router.push("/contact-management");
        }
      });
    },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style scoped>
.iconsText {
  font-size: 11px;
}
.edmDiv {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  /* border: 1px solid #c8deff; */
  /* border-radius: 15px; */
  overflow: auto;
  height: 470px;
}
.eventTxt {
  font-family: Montserrat;
  font-style: normal;
  color: #4e5868;
}
.eventTitle {
  font-weight: bold;
  font-size: 16px;
  opacity: 0.8;
}
.eventID {
  font-size: 14px;
  font-weight: normal;
  opacity: 0.8;
}
.edmImage {
  width: 100%;
  border-radius: 15px;
}
.blue-icon {
  color: #357dea;
}
</style>
