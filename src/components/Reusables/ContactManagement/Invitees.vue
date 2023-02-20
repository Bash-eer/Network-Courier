<template>
  <div
    :class="
      usage == 'cards'
        ? 'edm-invitess-wrap my-2 h-100'
        : 'edm-invitess-wrap my-3 pb-2'
    "
  >
    <div class="flex flex-row justify-content-between">
      <div class="m-2 invitees-text">Members</div>
       <div
    class="
      searchicon
      flex flex-row
      justify-content-end
      align-items-center
      m-2
    "
  >
    <i class="fa fa-search ml-1"></i>
        <TextField
          v-model="searcher"
          label="inviteesSearch"
          placeholder="Search Invitees"
          type="text"
          :classes="{
            'inputfield w-full dialog-dropdown-text inviteesTableSearch': true,
          }"
          v-on:childToParent="globalSearcher"
        />
      </div>
    </div>
    <div :class="'m-2 ' + inviteesClass">
      <div :class="'h-100 ' + noInviteesClass" v-if="data.length == 0">
        <span class="noInviteesText">Please invite a contact</span>
      </div>
      <div
        class="edm-invitees-inside-wrap flex flex-wrap m-2"
        v-if="data.length != 0"
      >
        <div
          v-for="(invitee, index) in data"
          :key="index"
          class="card contact-add-event-small-cards m-3"
        >
          <div class="flex flex-row align-items-center">
            <img
              :src="
                invitee.imgUrl != null
                  ? invitee.imgUrl
                  : './images/defaultProfile.jpg'
              "
              alt="avatar"
              class="m-1"
              width="32"
              height="35"
            />
            <span class="contact-event-attendance-title mx-1 mr-2">{{
              invitee.name
            }}</span>
            <span
              @click="removeInvitee(invitee['contact_id'])"
              class="delete-icon flex justify-content-center align-items-center"
              >x</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invitees",
  props: ["data", "usage", "inviteesClass", "noInviteesClass"],
  data() {
    return {
      searcher: "",
    };
  },
  methods: {
    removeInvitee(id) {
      let inviteesData =
        this.$store.state.contacts.eventsOverviewFormInviteesData.length == 0
          ? "inviteesData"
          : "eventsOverviewFormInviteesData";
      let inviteeArray = this.$store.state.contacts[inviteesData];
      for (let i in inviteeArray) {
        if (inviteeArray[i]["contact_id"] == id) {
          if (inviteeArray[i]["id"]) {
            this.$store.state.contacts.deletedEventGroupsInviteesIds.push(
              inviteeArray[i]["id"]
            );
          }
          this.$store.state.contacts[inviteesData].splice(i, 1);
        }
      }
      let inviteesTableData =
        this.$store.state["contacts"]["eventContactsTableData"];
      for (let t in inviteesTableData) {
        if (inviteesTableData[t]["contact_id"] == id) {
          this.$store.state["contacts"]["eventContactsTableData"][t][
            "inviteeStatus"
          ] = "Invite";
        }
      }
    },
    globalSearcher(label, searchString) {
      let inviteesData =
        this.$store.state.contacts.eventsOverviewFormInviteesData.length == 0
          ? "inviteesData"
          : "eventsOverviewFormInviteesData";
      let inviteeArray = this.$store.state.contacts[inviteesData];
      if (searchString != "") {
        this.$store.state.contacts.inviteesTableSearchTracker = 1;
        this.$store.state.contacts[inviteesData] = inviteeArray.filter(
          function (invitee) {
            if (invitee["name"].startsWith(searchString)) {
              return true;
            }
          }
        );
      }
      if (searchString == "") {
        this.$store.state.contacts.inviteesTableSearchTracker = 0;
        this.$store.state.contacts[inviteesData] = [];
        let inviteesTableData =
          this.$store.state["contacts"]["eventContactsTableData"];
        for (let t in inviteesTableData) {
          if (inviteesTableData[t]["inviteeStatus"] == "Invited") {
            let inviteeObj = {};
            inviteeObj["contact_id"] = inviteesTableData[t]["contact_id"];
            inviteeObj["imgUrl"] =
              inviteesTableData[t]["contact"]["contactPicture"];
            inviteeObj["name"] = inviteesTableData[t]["contact"]["contactName"];
            inviteeObj["phone"] =
              inviteesTableData[t]["contact"]["contactNumber"];
            this.$store.state.contacts[inviteesData].push(inviteeObj);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.noInviteesText {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  color: #130f40;
}
.noInvitees {
  line-height: 130px;
  text-align: center;
}
.edmNoInvitees {
  line-height: 350px;
  text-align: center;
}
.roomsNoInvitees {
  line-height: 250px;
  text-align: center;
}
.invitees_parent {
  height: 130px;
  border: 1px solid #c8deff;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 4px;
}
.edm_invitees_parent {
  height: 85%;
  border: 1px solid #c8deff;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 4px;
}
.rooms_invitees_parent {
  height: 80%;
  border: 1px solid #c8deff;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 4px;
}
.blue-icon {
  color: #357dea;
}
.contact-event-title {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
.contact-event-subtitle {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5868;
}
.edm-invitess-wrap {
  background: rgba(225, 234, 249, 0.4);
  border-radius: 10px;
}
.invitees-text {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: #4e5868;
}
.contact-add-event-small-cards {
  position: relative;
  background: #ffffff;
  border: 0.2px solid #f0ecec;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -7px;
  margin-right: -7px;
  width: 19.36px;
  height: 19.36px;
  background: #fff;
  box-shadow: 0px 5.60477px 5.60477px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
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

::v-deep .border {
  border: none !important;
}
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}
::v-deep .p-inputtext {
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  border-color: none !important;
}
</style>
