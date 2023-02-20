<template>
  <div class="my-3" v-for="(attendance, index) in attendanceData" :key="index">
    <!--table no - vise heading-->
    <div class="flex flex-row ml-3 mr-3 align-items-center">
      <div class="flex tableNoTxt bodyTxt mr-2">
        Table No : {{ attendance["table_no"] }}
      </div>
      <span class="line-opacity">&nbsp;|</span>
      <div class="flex bodyTxt attendanceTxt mr-2 pl-2">
        Present : {{ attendance["presentees"] }}
      </div>
      <span class="line-opacity">&nbsp;|</span>
      <div class="flex bodyTxt attendanceTxt pl-2">
        Absent : {{ attendance["absentees"] }}
      </div>
    </div>
    <!--invitees cards-->
    <div class="flex flex-wrap ml-2 mr-2 mt-1">
      <div
        v-for="(invitees, index) in attendance['data']"
        :key="index"
        class="card contact-event-attendance-cards m-1"
      >
        <div class="flex flex-row contact-event-attendance-card">
          <img
            :src="invitees['imgUrl']"
            alt="avatar"
            class="m-1 mx-2"
            width="32"
            height="35"
          />
          <div class="flex flex-column align-items-start m-1">
            <span class="contact-event-attendance-title">
              {{ invitees["name"] }}
            </span>
            <span>{{ invitees["sub_group_name"] }}</span>
          </div>
          <label class="container m-2">
            <input
              v-if="invitees['attendance'] == true"
              type="checkbox"
              :checked="'checked'"
              :value="'attendee_' + invitees['id']"
              :class="'attendee_' + invitees['id']"
              @change="checkFunction(invitees['id'])"
            />
            <input
              v-if="invitees['attendance'] == false"
              type="checkbox"
              :value="'attendee_' + invitees['id']"
              :class="'attendee_' + invitees['id']"
              @change="checkFunction(invitees['id'])"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "Attendance",
  props: ["data"],
  data() {
    return {
      checked: null,
      attendanceData: [],
    };
  },
  methods: {
    checkFunction(memberId) {
      let path = "event/invitees/attendance/" + memberId;
      let checkBoxData = document.querySelectorAll(".attendee_" + memberId);
      let bool = checkBoxData[0].checked;
      let attendanceDetails = {};
      attendanceDetails["attendance"] = bool;
      //making an update/PATCH api call to update invitee status details
      this.$store.dispatch("contacts/contactMangementCRUD", {
        path: path,
        mutation: "fetchInviteesTableData",
        tag: "update",
        data: attendanceDetails,
        nameKey: "users_contact_events",
      });
    },
  },
  created() {
    //makes deep copy of array of objects
    let inviteesData = JSON.parse(
      JSON.stringify(this.$store.state.contacts.subGroupInviteesData)
    );
    //computing the presentees and absentees for each table number
    for (let id in inviteesData) {
      let invitees = inviteesData[id]["data"];
      let presentees = 0;
      let absentees = 0;
      for (let i in invitees) {
        if (invitees[i]["attendance"] == true) {
          presentees += 1;
        }
        if (invitees[i]["attendance"] == false) {
          absentees += 1;
        }
      }
      inviteesData[id]["presentees"] = presentees;
      inviteesData[id]["absentees"] = absentees;
    }
    //computing the total invitees, presentees and absentees count
    let totalPresenteesCount = 0;
    let totalAbsenteesCount = 0;
    for (let c in inviteesData) {
      totalPresenteesCount += inviteesData[c]["presentees"];
      totalAbsenteesCount += inviteesData[c]["absentees"];
    }
    let allNumbersObject = {};
    allNumbersObject["Total Members"] =
      this.$store.state.contacts.ContactManagamentInviteesTableData.length;
    allNumbersObject["Present"] = totalPresenteesCount;
    allNumbersObject["Absent"] = totalAbsenteesCount;
    this.$store.state.contacts.contactManagementAttendanceTabData =
      allNumbersObject;
    this.attendanceData = inviteesData;
  },
};
</script>

<style scoped>
.attendanceTxt {
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  color: #000000;
}
.bodyTxt {
  font-family: Montserrat;
}
.tableNoTxt {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  color: #357dea;
}
.line-opacity {
  opacity: 0.2;
}
.contact-event-attendance-cards {
  background: #ffffff;
  border: 0.1px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: #7e84a7;
}
.contact-event-attendance-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
.container {
  position: relative;
  cursor: pointer;
  display: block;
  width: 6px;
  height: 6px;
}
/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  border-radius: 50%;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #70c030;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 10px;
  top: 7px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
