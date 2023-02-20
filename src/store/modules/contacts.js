import axios from "axios";
const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

function processDropDownData(data, nameKey, codeKey) {
  var processedDropDownArray = [];
  for (let d in data) {
    var d_obj = {};
    d_obj["name"] = data[d][nameKey];
    d_obj["code"] = data[d][codeKey];
    processedDropDownArray.push(d_obj);
  }
  return processedDropDownArray;
}
//DATA PROCESSING - APPOINTMENTS TABLE
function processAppointmentsTableData(data) {
  for (let t in data) {
    let tObj = data[t];
    let travelDetails = {};
    let remarksDetails = {};
    let attendees = [];
    for (let t_keys in tObj) {
      if (
        t_keys == "appointments_network_courier_members" ||
        t_keys == "appointments_personal_contact_members"
      ) {
        let membersArray = tObj[t_keys];
        let memberKey =
          t_keys == "appointments_personal_contact_members"
            ? "contacts_appointments_personal_contact_members"
            : "contacts_appointments_network_courier_members";
        if (membersArray.length != 0) {
          for (let m in membersArray) {
            attendees.push(membersArray[m][memberKey]["image_url"]);
          }
        }
      }
      if (
        t_keys == "travel_type" ||
        t_keys == "staying_at" ||
        t_keys == "hotel_name" ||
        t_keys == "flight_name" ||
        t_keys == "flight_no" ||
        t_keys == "address"
      ) {
        travelDetails[t_keys] = tObj[t_keys];
      }
      if (t_keys == "remarks") {
        remarksDetails["label"] = "Remarks";
        remarksDetails["remark"] = tObj[t_keys];
      }
    }
    data[t]["attendeesImages"] = attendees;
    data[t]["remarkDetails"] = [];
    data[t]["remarkDetails"].push(remarksDetails);
    data[t]["travelDetails"] = [];
    data[t]["travelDetails"].push(travelDetails);
  }
  return data;
}
//DATA PROCESSING - DONATIONS TABLE
function processDonationsTableData(data) {
  for (let d in data) {
    let d_obj = data[d];
    let latest = {};
    let remarksDetails = {};
    for (let d_keys in d_obj) {
      if (
        d_keys == "bank_name" ||
        d_keys == "cheque_date" ||
        d_keys == "cheque_no"
      ) {
        latest[d_keys] = d_obj[d_keys];
      }
      if (d_keys == "remarks") {
        remarksDetails["label"] = "Remarks";
        remarksDetails["remark"] = d_obj[d_keys];
      }
    }
    d_obj["remarkDetails"] = [];
    d_obj["remarkDetails"].push(remarksDetails);
    d_obj["latestData"] = latest;
  }
  return data;
}
//DATA PROCESSING - CONTACT CATEGORIES (NETWORK COURIER & PERSONAL)
function processContactCategories(data) {
  let networkCourierContactsData = [];
  let personalContactsData = [];
  let allContacts = [];
  for (let d in data) {
    let d_obj = data[d];
    let contactsObj = {};
    contactsObj["contact_id"] = d_obj["id"];
    contactsObj["contactType"] = d_obj["contact_type"];
    contactsObj["contact"] = {
      contactPicture: d_obj["image_url"],
      contactName: d_obj["name"],
      contactNumber: d_obj["mobile_no"],
    };

    let allContactsObj = contactsObj;
    allContactsObj["inviteeStatus"] = "Invite";
    allContacts.push(allContactsObj);

    if (d_obj["contact_type"] == "Network Courier") {
      networkCourierContactsData.push(contactsObj);
    }
    if (d_obj["contact_type"] == "Personal") {
      personalContactsData.push(contactsObj);
    }
  }
  return [networkCourierContactsData, personalContactsData, allContacts];
}
//pure function
function getTime(time) {
  return time.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function processEventsTime(tag, from, to) {
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
  let fromClock = getTime(fromTime);
  let toClock = getTime(toTime);

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
}
//DATA PROCESSING - EVENTS PAGE
function processEventsPageData(data) {
  let processedEventsData = [];
  for (let e in data) {
    let eventsObj = {};
    eventsObj["eventName"] = data[e]["event_name"];
    eventsObj["eventImage"] = data[e]["event_image"];
    eventsObj["date"] = processEventsTime(
      "date",
      data[e]["event_from_date_time"],
      data[e]["event_to_date_time"]
    );
    eventsObj["time"] = processEventsTime(
      "time",
      data[e]["event_from_date_time"],
      data[e]["event_to_date_time"]
    );
    let invitees = [];
    let mainGroupsData = data[e]["event_groups"];
    //looping main groups
    for (let mg in mainGroupsData) {
      let subGroupsData = mainGroupsData[mg]["event_groups_sub_groups"];
      //looping sub groups
      for (let sg in subGroupsData) {
        let inviteesData = subGroupsData[sg]["sub_group_members"];
        //looping invitees
        for (let i in inviteesData) {
          invitees.push(
            inviteesData[i]["contacts_events_sub_group_members"]["image_url"]
          );
        }
      }
    }
    eventsObj["invitees"] = invitees;
    processedEventsData.push(eventsObj);
  }

  return processedEventsData;
}
//DATA PROCESSING -  EVENTS PAGE CARDS
function processEventCardsData(data) {
  let eventCardsData = [];
  let embedCodeData = [];
  let thankYouMessageData = [];
  let noWorriesMessageData = [];
  for (let e in data) {
    let eventsObject = data[e];
    let eventCardsObject = {};
    //fetching embded code information
    let embedCodeObject = {};
    embedCodeObject["event_id"] = eventsObject["id"];
    embedCodeObject["embed_code"] = eventsObject["embed_code"];
    embedCodeData.push(embedCodeObject);
    //fetching edm messages information (no worries and thank you messages)
    let thankYouMessageObject = {};
    let noWorriesMessageObject = {};
    thankYouMessageObject["event_id"] = eventsObject["id"];
    thankYouMessageObject["message"] = eventsObject["thank_you_message"];
    noWorriesMessageObject["event_id"] = eventsObject["id"];
    noWorriesMessageObject["message"] = eventsObject["no_worries_message"];
    thankYouMessageData.push(thankYouMessageObject);
    noWorriesMessageData.push(noWorriesMessageObject);

    for (let eKeys in eventsObject) {
      //storing basic event details
      if (eKeys != "event_groups") {
        eventCardsObject[eKeys] = eventsObject[eKeys];
      }
      //processing the event groups data
      if (eKeys == "event_groups") {
        let eventGroupsData = eventsObject[eKeys];
        let eventCardsGroups = [];
        //looping main groups
        for (let eg in eventGroupsData) {
          let eventCardsGroupsObject = {};
          eventCardsGroupsObject["id"] = eventGroupsData[eg]["id"];
          eventCardsGroupsObject["group_name"] =
            eventGroupsData[eg]["group_name"];

          let eventCardsSubGroupsData = [];
          let eventSubGroupsData =
            eventGroupsData[eg]["event_groups_sub_groups"];
          //looping sub groups
          for (let sg in eventSubGroupsData) {
            let eventCardsSubGroupsObject = {};

            let sgObj = eventSubGroupsData[sg];
            for (let sgKeys in sgObj) {
              if (
                sgKeys == "id" ||
                sgKeys == "sub_group_name" ||
                sgKeys == "table_no"
              ) {
                eventCardsSubGroupsObject[sgKeys] = sgObj[sgKeys];
              }
              if (sgKeys == "sub_group_members") {
                let eventCardsSubGroupMembers = [];
                let eventsSubGroupMembers = sgObj[sgKeys];
                //looping invitees
                for (let i in eventsSubGroupMembers) {
                  let eventCardsSubGroupMembersObject = {};
                  let iObj = eventsSubGroupMembers[i];
                  for (let ikeys in iObj) {
                    if (ikeys == "id" || ikeys == "contact_id") {
                      eventCardsSubGroupMembersObject[ikeys] = iObj[ikeys];
                    }
                    if (ikeys == "contacts_events_sub_group_members") {
                      eventCardsSubGroupMembersObject["imgUrl"] =
                        iObj[ikeys]["image_url"];
                      eventCardsSubGroupMembersObject["name"] =
                        iObj[ikeys]["name"];
                      eventCardsSubGroupMembersObject["phone"] =
                        iObj[ikeys]["mobile_no"];
                    }
                  }
                  eventCardsSubGroupMembers.push(
                    eventCardsSubGroupMembersObject
                  );
                }
                eventCardsSubGroupsObject["sub_group_members"] =
                  eventCardsSubGroupMembers;
              }
            }
            eventCardsSubGroupsData.push(eventCardsSubGroupsObject);
          }
          eventCardsGroupsObject["sub_groups"] = eventCardsSubGroupsData;
          eventCardsGroups.push(eventCardsGroupsObject);
        }
        eventCardsObject["groups"] = eventCardsGroups;
      }
    }
    eventCardsData.push(eventCardsObject);
  }
  return [
    eventCardsData,
    embedCodeData,
    thankYouMessageData,
    noWorriesMessageData,
  ];
}
//DATA PROCESSING - INVITEES TABLE
function processInviteesTableData(data) {
  let inviteesArray = [];
  let serialNumberCount = 0;
  let inviteesMainGroupsDropDownData = [];
  let inviteesSubGroupsDropDownData = [];
  let subGroupInviteesData = [];
  //looping main groups
  for (let i in data) {
    //processing the main groups dropdown data
    let inviteesMainGroupsDropDownDataObj = {};
    inviteesMainGroupsDropDownDataObj["code"] = data[i]["id"];
    inviteesMainGroupsDropDownDataObj["name"] = data[i]["group_name"];
    inviteesMainGroupsDropDownData.push(inviteesMainGroupsDropDownDataObj);

    let subGroupsData = data[i]["event_groups_sub_groups"];
    //looping sub groups
    for (let sg in subGroupsData) {
      //processing the sub groups dropdown data
      let inviteesSubGroupsDropDownDataObj = {};
      inviteesSubGroupsDropDownDataObj["mainGroupId"] = data[i]["id"];
      inviteesSubGroupsDropDownDataObj["code"] = subGroupsData[sg]["id"];
      inviteesSubGroupsDropDownDataObj["name"] =
        subGroupsData[sg]["sub_group_name"];
      inviteesSubGroupsDropDownData.push(inviteesSubGroupsDropDownDataObj);

      let subGroupsMembersData = subGroupsData[sg]["sub_group_members"];

      //processing the sub groups invitees data
      let subGroupsInviteesObj = {};
      subGroupsInviteesObj["subGroupId"] = subGroupsData[sg]["id"];
      subGroupsInviteesObj["table_no"] = subGroupsData[sg]["table_no"];
      let inviteesData = [];

      //looping sub group members
      for (let sgm in subGroupsMembersData) {
        let inviteesObj = {};
        inviteesObj["sno"] = ++serialNumberCount;
        //storing the group details
        inviteesObj["group_name"] = data[i]["group_name"];
        inviteesObj["sub_group_name"] = subGroupsData[sg]["sub_group_name"];
        inviteesObj["table_no"] = subGroupsData[sg]["table_no"];

        inviteesObj["memberId"] = subGroupsMembersData[sgm]["id"];
        inviteesObj["contactId"] = subGroupsMembersData[sgm]["contact_id"];

        //storing the invitee details
        let sgmObj = subGroupsMembersData[sgm];

        //processing the sub groups invitees data
        let invitees = {};
        invitees["sub_group_name"] = subGroupsData[sg]["sub_group_name"];

        //invitee status details
        for (let sgmKeys in sgmObj) {
          if (sgmKeys == "id" || sgmKeys == "contact_id") {
            invitees[sgmKeys] = sgmObj[sgmKeys];
          }
          if (
            sgmKeys == "status" ||
            sgmKeys == "attendance" ||
            sgmKeys == "remarks" ||
            sgmKeys == "invited_by"
          ) {
            if (sgmKeys == "attendance") {
              invitees["attendance"] = sgmObj[sgmKeys];
            }
            if (sgmKeys == "invited_by") {
              inviteesObj[sgmKeys] =
                sgmObj["users_contact_events_sub_group_members"][
                  "display_name"
                ];
            } else {
              inviteesObj[sgmKeys] = sgmObj[sgmKeys];
            }
          }
        }
        let memberBioData = sgmObj["contacts_events_sub_group_members"];

        for (let md in memberBioData) {
          //invite profile details
          if (
            md == "name" ||
            md == "mobile_no" ||
            md == "email" ||
            md == "image_url"
          ) {
            if (md == "name" || md == "image_url" || md == "mobile_no") {
              if (md == "image_url") {
                invitees["imgUrl"] = memberBioData[md];
              } else if (md == "mobile_no") {
                invitees["phone"] = memberBioData[md];
              } else {
                invitees[md] = memberBioData[md];
              }
            }
            inviteesObj[md] = memberBioData[md];
          }
          //invitee address details (residence & office)
          if (
            md == "contacts_residence_address" ||
            md == "contacts_office_address"
          ) {
            let addressDetails = memberBioData[md][0];
            let addressString =
              addressDetails["unit_no"] +
              "," +
              addressDetails["floor_no"] +
              "," +
              addressDetails["address"] +
              "," +
              addressDetails["postal_code"];
            if (md == "contacts_residence_address") {
              inviteesObj["residential_address"] = addressString;
              inviteesObj["residential_address_id"] = addressDetails["id"];
            }
            if (md == "contacts_office_address") {
              inviteesObj["office_address"] = addressString;
              inviteesObj["office_address_id"] = addressDetails["id"];
              inviteesObj["company_name"] = addressDetails["company_name"];
            }
          }
        }
        inviteesData.push(invitees);
        inviteesArray.push(inviteesObj);
      }
      subGroupsInviteesObj["data"] = inviteesData;
      subGroupInviteesData.push(subGroupsInviteesObj);
    }
  }
  return [
    inviteesArray,
    inviteesMainGroupsDropDownData,
    inviteesSubGroupsDropDownData,
    subGroupInviteesData,
  ];
}
//DATA PROCESSING - CALENDAR ROOM MEETING DATA
function processCalendarRoomMeetingsData(data) {
  let calendarRoomMeetingsData = [];
  let smallCalendarRoomMeetingsData = [];
  for (let m in data) {
    let mObj = data[m];
    let calendarObject = {};
    let smallCalendarObject = {};
    for (let mkeys in mObj) {
      if (
        mkeys != "meeting_title" &&
        mkeys != "from_date_time" &&
        mkeys != "to_date_time"
      ) {
        calendarObject[mkeys] = mObj[mkeys];
      }
      calendarObject["color"] = mObj["style"]["code"];
      calendarObject["title"] = mObj["meeting_title"];
      calendarObject["meeting_title"] = mObj["meeting_title"];
      calendarObject["start"] = mObj["from_date_time"];
      calendarObject["end"] = mObj["to_date_time"];
      calendarObject["remarks"] = mObj["remarks"];

      smallCalendarObject["id"] = mObj["id"];
      smallCalendarObject["dates"] = mObj["from_date_time"];
      smallCalendarObject["color"] = mObj["style"]["color"];
    }
    calendarRoomMeetingsData.push(calendarObject);
    smallCalendarRoomMeetingsData.push(smallCalendarObject);
  }
  return [calendarRoomMeetingsData, smallCalendarRoomMeetingsData];
}

const contacts = {
  appointmentStatusDropdownData: [
    { name: "Complete", code: "1" },
    { name: "Schedule", code: "2" },
    { name: "No Show", code: "3" },
    { name: "Left Messages", code: "4" },
    { name: "Cancelled", code: "5" },
    { name: "Delete", code: "6" },
  ],
  namespaced: true,
  state: {
    globalSearch: "",
    //contact
    contactsFormData: {},
    contactPersonalInfoFiles: [],
    deletedcontactPersonalInfoFiles: [],
    contactsFormStateData: {},
    contactsOverviewData: {},
    contactsRoomsData: {},
    //groups
    contactGroupsFormStateData: {},
    mainGroupName: null,
    //donations
    donationsFormStateData: {},
    contactDonationsFiles: [],
    deletedcontactDonationsFiles: [],
    //appointment
    appointmentsFormStateData: {},
    contactAppointmentsFiles: [],
    deletedcontactAppointmentsFiles: [],
    //follow up
    followUpFormStateData: {},
    //events
    coverImageURL: "",
    eventImageURL: "",
    eventCradsOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "EDM",
        icon: "fas fa-desktop",
      },
      // {
      //   label: "Messages",
      //   icon: "fas fa-envelope",
      // },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
      {
        label: "Clone",
        icon: "fas fa-clone",
      },
    ],
    eventGroupsOverlayData: [
      {
        label: "Edit",
        icon: "fas fa-pen",
      },
      {
        label: "Delete",
        icon: "fas fa-user-times",
      },
    ],
    // ContactsDonationsOverlayData: [
    //   { label: "Edit", icon: "fas fa-pen" },
    //   {label: "Invite",icon: "fas fa-user-plus"},
    //   { label: "Delete", icon: "fas fa-trash-alt" },

    // ],
    // ContactsAppointmentsOverlayData: [
    //   { label: "Edit", icon: "fas fa-pen" },
    //   {label: "Invite",icon: "fas fa-user-plus"},
    //   { label: "Delete", icon: "fas fa-trash-alt" },
    //   { label: "Calender Sync", icon: "pi pi-calendar-plus" },
    // ],
    MeetingRoomsTabMenuData: [
      {
        label: "CurrentRoomsTab",
        tab: "CurrentStatus",
        select: false,
        tabName: "Current Status",
        heading: "CurrentTab",
      },
      {
        label: "AvailableRoomsTab",
        tab: "AvailableRooms",
        select: true,
        tabName: "Check Availability",
        heading: "AvailableRoomsTab",
      },
    ],
    EDMMessagesTabMenuData: [
      {
        label: "ThanksMessageTab",
        tab: "ThanksMessageTab",
        select: false,
        tabName: "Thank you Message",
        heading: "Thank you Message",
      },
      {
        label: "NoWorriesMessageTab",
        tab: "NoWorriesMessageTab",
        select: true,
        tabName: "No Worries Message",
        heading: "No Worries Message",
      },
    ],
    EDMTabMenuData: [
      {
        label: "EmbedCodeTab",
        tab: "EmbedCodeTab",
        select: false,
        tabName: "Embed Code",
        heading: "Embed Code",
      },
      {
        label: "EDMTab",
        tab: "EDMTab",
        select: true,
        tabName: "EDM",
        heading: "EDM",
      },
    ],
    //contacts table data
    contactsTableData: [
      {
        id: 1,
        contact: {
          contactPicture: "/images/avatar.png",
          contactName: "Susan",
          contactNumber: "5555",
        },
      },
      {
        id: 2,
        contact: {
          contactPicture: "/images/avatarTwo.png",
          contactName: "Ben",
          contactNumber: "8888",
        },
      },
      {
        id: 3,
        contact: {
          contactPicture: "/images/avatarThree.png",
          contactName: "Jill",
          contactNumber: "555",
        },
      },
    ],
    contactsTableColumnData: [{ field: "contact", header: "Select Contacts" }],
    eventContactsTableColumnData: [
      { field: "contact", header: "Select Contacts" },
      { field: "inviteeStatus", header: "Invite" },
    ],
    ContactEventCurrentTab: null,
    ContactEventPreviousTab: null,
    ContactHomeTabMenuData: [
      {
        label: "ContactContacts",
        tab: "ContactManagementTable",
        select: false,
        tabName: "Contacts",
        heading: "Contacts",
        data: "ContactManagamentContactTableData",
        columns: "ContactManagamentContactTableColumnData",
      },
      {
        label: "ContactGroups",
        tab: "ContactManagementTable",
        select: true,
        tabName: "Groups",
        heading: "Groups",
        data: "ContactManagamentMainGroupTableData",
        columns: "ContactManagamentMainGroupTableColumnData",
      },
      {
        label: "ContactEvents",
        tab: "ContactManagementEvent",
        select: true,
        tabName: "Events",
      },
      {
        label: "ContactAppointments",
        tab: "ContactManagementTable",
        select: true,
        tabName: "Appointments",
        heading: "Appointments",
        data: "AppointmentsTableData",
        columns: "AppointmentsTableColumnData",
      },
      {
        label: "ContactDonations",
        tab: "ContactManagementTable",
        select: true,
        tabName: "Donations",
        heading: "Donations",
        data: "DonationsTableData",
        columns: "DonationsTableColumnData",
      },
      {
        label: "ContactMeetingRooms",
        tab: "MeetingRooms",
        select: true,
        tabName: "Meeting Rooms",
      },
    ],
    ContactEventsOverviewTabMenuData: [
      {
        label: "InviteesStatus",
        tab: "ContactManagementTable",
        select: false,
        tabName: "Invitees Status",
        heading: "Invitees Status",
        data: "ContactManagamentInviteesTableData",
        columns: "ContactManagamentInviteesTableColumnData",
      },
      {
        label: "FollowUp",
        tab: "ContactManagementTable",
        select: true,
        tabName: "Follow Up",
        heading: "Follow Up",
        data: "ContactManagementFollowUpTableData",
        columns: "ContactManagementFollowUpTableColumnData",
      },
      {
        label: "Attendance",
        tab: "Attendance",
        select: true,
        tabName: "Attendance",
      },
    ],
    ContactManagamentInviteesTableData: [],
    ContactManagamentInviteesTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "invitees", header: "Invitees" },
      { field: "sub_group_name", header: "Sub-Group" },
      { field: "residential_address", header: "Residential Address" },
      { field: "company_name", header: "Company " },
      { field: "office_address", header: "Office Address" },
      { field: "status", header: "Status" },
      { field: "remarks", header: "Remarks" },
      { field: "invited_by", header: "Invited By" },
      { field: "sno", header: "Invited On" },
    ],
    ContactManagementFollowUpTableData: [],
    ContactManagementFollowUpTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "caller", header: "Caller" },
      { field: "call_type", header: "Call Type" },
      { field: "date_time", header: "Date & Time" },
      { field: "customer_contact", header: "Contacts" },
      { field: "reamrks", header: "Remarks" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    inviteesPrintLabelColumnData: [
      { field: "invitees", header: "Invitees" },
      { field: "residential_address", header: "Residential Address" },
      { field: "office_address", header: "Office Address" },
    ],
    ContactManagamentContactTableData: [],
    ContactManagamentContactTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "name", header: "Name" },
      { field: "mobile_no", header: "Mobile No" },
      { field: "email", header: "Email Id" },
      { field: "company_name", header: "Company Name" },
      { field: "contact_type", header: "Type" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    ContactManagamentMainGroupTableData: [],
    ContactManagamentMainGroupTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "group_name", header: "Group Name" },
      { field: "sub_groups_count", header: "Sub Groups" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "status", header: "Status" },
    ],
    ContactManagamentSubGroupTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sub_group_name", header: "Sub Group Name" },
      { field: "members", header: "Members" },
      { field: "status", header: "Status" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    AppointmentsTableData: [],
    AppointmentsTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "appointment_name", header: "Name " },
      { field: "country", header: "Country" },
      { field: "start_date_time", header: "From" },
      { field: "end_date_time", header: "To" },
      { field: "attendees", header: "Attendees" },
      { field: "pattern", header: "Pattern" },
      { field: "priority", header: "Priority" },
      { field: "availability", header: "Availability" },
      { field: "status", header: "Status " },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    travelDetailsTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "travel_type", header: "Travel Type" },
      { field: "staying_at", header: "Staying At" },
      { field: "hotel_name", header: "Hotel Name" },
      { field: "flight_name", header: "Flight Name" },
      { field: "flight_no", header: "Flight No." },
      { field: "address", header: "Address" },
    ],
    DonationsTableData: [],
    DonationsTableColumnData: [
      { field: "Actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "donation_name", header: "Donation Name" },
      { field: "recipient_name", header: "Recipient Name" },
      { field: "donation_date", header: "Donated Date" },
      { field: "payment_method", header: "Payment" },
      { field: "amount", header: "Amount" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
    ],
    contactsTableTabData: [
      {
        type: "Network Courier",
        selectionModeState: "networkCourierContactsSelectionModeState",
        data: "networkCourierContactsData",
      },
      {
        type: "Personal",
        selectionModeState: "personalContactsSelectionModeState",
        data: "personalContactsData",
      },
    ],
    addNewDropDownData: [
      {
        name: "Add New",
        code: "Hi",
        items: [
          {
            name: "Tom",
            code: 1,
            picture: "/images/avatarTwo.png",
          },
          {
            name: "Jill",
            code: 2,
            picture: "/images/avatar.png",
          },
        ],
      },
    ],
    addNewDropDownDataInbound: [
      {
        name: "Add New",
        code: "Hi",
        items: [
          {
            name: "Airfreight",
            code: 1,
          },
          {
            name: "DNATA",
            code: 2,
          },
          {
            name: "OBC",
            code: 3,
          },
        ],
      },
    ],
    mainGroupsDropDownData: [],
    networkCourierContactsData: null,
    personalContactsData: null,
    contactsSelectionModeState: null,
    contactsFormTableData: [],
    contactsFormTableStateData: [],
    deletedContactIds: [],
    groupMembersData: [],
    //events
    eventContactsTableData: [],
    inviteesData: [],
    eventsMainGroupsDropDownData: [],
    eventGroupsData: [],
    eventGroupsStateData: {},
    eventsMainGroupName: null,
    eventsPageData: [],
    eventCardsData: [],
    eventCardsStateData: {},
    deletedEventGroupsInviteesIds: [],
    deletedEventsMainGroups: [],
    deletedEventsSubGroups: [],
    //events overviewData
    eventsOverviewPageData: {},
    inviteesMainGroupsDropDownData: [],
    inviteesSubGroupsDropDownData: [],
    subGroupInviteesData: [],
    eventsOverviewFormInviteesData: [],
    inviteesTableSearchTracker: 0,
    inviteesEventPath: null,
    inviteesFollowUpPath: null,
    inviteesEventId: null,
    inviteesStatusData: {},
    contactManagementAttendanceTabData: {},
    embedCodeData: [],
    thankYouMessageData: [],
    noWorriesMessageData: [],
    embedCodeString: null,
    inviteesStatusDropDownData: [
      { name: "Coming", code: "1" },
      { name: "Not Coming", code: "2" },
      { name: "Invited", code: "3" },
      { name: "Pending", code: "4" },
    ],
    inviteesStatusImages: [
      {
        img: "event-coming",
        heading: "Coming",
        numbers: "",
        tag: "comingCount",
      },
      {
        img: "event-pending",
        heading: "Pending",
        numbers: "",
        tag: "pendingCount",
      },
      {
        img: "event-not-coming",
        heading: "Not Coming",
        numbers: "",
        tag: "notComingCount",
      },
    ],
    contactIcons: [
      { icon: "calendar", tag: "calendar", text: "" },
      { icon: "clock", tag: "clock", text: "" },
      { icon: "user", tag: "contact_person", text: "" },
      { icon: "envelope", tag: "contact_email", text: "" },
      { icon: "phone", tag: "contact_no", text: "" },
      { icon: "map-marker", tag: "address", text: "" },
    ],
    //meeting rooms
    meetingsRoomsFormStateData: {},
    CurrentRoomsStatusData: [],
    allRoomBookingsData: [],
    roomsAvailabiltyDetails: {},
    roomCardData: {},
    roomId: null,
    monthViseRoomBookingsData: [],
    //calendar
    calendarRoomMeetingsData: [],
    smallCalendarRoomMeetingsData: [],
    calendarDotColors: [
      "#4299e1",
      "#ed8936",
      "#9f7aea",
      "#a0aec0",
      "#f56565",
      "#ecc94b",
      "#667eea",
      "#48bb78",
      "#38b2ac",
      "#ed64a6",
    ],
  },
  mutations: {
    fetchContactMangementContactTableData(state, data) {
      let contactsData = processContactCategories(data);
      state.networkCourierContactsData = contactsData[0];
      state.personalContactsData = contactsData[1];
      state.eventContactsTableData = contactsData[2];
      for (let c in data) {
        data[c]["company_name"] =
          data[c]["contacts_office_address"][0]["company_name"];
      }
      state.ContactManagamentContactTableData = data;
    },
    fetchContactManagementMainGroupTableData(state, data) {
      state.mainGroupsDropDownData = processDropDownData(
        data,
        "group_name",
        "id"
      );
      state.ContactManagamentMainGroupTableData = data;
    },
    fetchAppointmentsTableData(state, data) {
      state.AppointmentsTableData = processAppointmentsTableData(data);
    },
    fetchDonationsTableData(state, data) {
      state.DonationsTableData = processDonationsTableData(data);
    },
    fetchEventsPageData(state, data) {
      state.eventsPageData = processEventsPageData(data);
      let eventCardsData = processEventCardsData(data);
      state.eventCardsData = eventCardsData[0];
      state.embedCodeData = eventCardsData[1];
      state.thankYouMessageData = eventCardsData[2];
      state.noWorriesMessageData = eventCardsData[3];
    },
    //eslint-disable-next-line no-unused-vars
    fetchInviteesTableData(state, data) {
      let inviteesData = processInviteesTableData(data);
      state.ContactManagamentInviteesTableData = inviteesData[0];
      //computing the status (coming,not coming, pending and invited) of invitees for the event
      let comingCount = 0;
      let notComingCount = 0;
      let pendingCount = 0;
      for (let is in inviteesData[0]) {
        switch (inviteesData[0][is]["status"]) {
          case "Coming":
            comingCount += 1;
            break;
          case "Not Coming":
            notComingCount += 1;
            break;
          case "Pending":
            pendingCount += 1;
            break;
        }
      }
      for (let im in state.inviteesStatusImages) {
        switch (state.inviteesStatusImages[im]["tag"]) {
          case "comingCount":
            state.inviteesStatusImages[im]["numbers"] = comingCount;
            break;
          case "notComingCount":
            state.inviteesStatusImages[im]["numbers"] = notComingCount;
            break;
          case "pendingCount":
            state.inviteesStatusImages[im]["numbers"] = pendingCount;
            break;
        }
      }
      state.inviteesMainGroupsDropDownData = inviteesData[1];
      state.inviteesSubGroupsDropDownData = inviteesData[2];
      state.subGroupInviteesData = inviteesData[3];
    },
    fetchFollowUpTableData(state, data) {
      state.ContactManagementFollowUpTableData = data;
    },
    fetchCurrentStatusOfRooms(state, data) {
      state.CurrentRoomsStatusData = data;
    },
    fetchAllRoomBookings(state, data) {
      for (let m in data) {
        data[m]["time"] = processEventsTime(
          "time",
          data[m]["from_date_time"],
          data[m]["to_date_time"]
        );
        data[m]["date"] = processEventsTime(
          "date",
          data[m]["from_date_time"],
          data[m]["to_date_time"]
        );
      }
      let processedCalendarRoomMeetingsData =
        processCalendarRoomMeetingsData(data);
      state.allRoomBookingsData = processedCalendarRoomMeetingsData[0];
      state.calendarRoomMeetingsData = processedCalendarRoomMeetingsData[0];
    },
    fetchMonthViseRoomBookings(state, data) {
      let processedCalendarRoomMeetingsData =
        processCalendarRoomMeetingsData(data);
      state.smallCalendarRoomMeetingsData =
        processedCalendarRoomMeetingsData[1];
    },
    fetchEventGroupsData(state, data) {
      if (data[0] == "main_group") {
        state.eventGroupsData = data[1];
      }
      if (data[0] == "sub_group") {
        state.eventGroupsData[data[1]]["sub_groups"].splice(data[2], 1);
      }
    },
  },
  actions: {
    //LOAD APIS
    //LOAD CONTACT MANAGEMENT TABLE COMMONS
    //contacts
    loadContactManagementTableCommons(
      //eslint-disable-next-line no-unused-vars
      { commit },
      { path, mutation, nameKey }
    ) {
      axios.get("contactManagement/" + path).then((res) => {
        if (res.status == 200) {
          for (let i = 0; i < res.data.results.length; i++) {
            let r_obj = res.data.results[i];

            r_obj["sno"] = i + 1;
          }
          if (nameKey != "users_contact_events") {
            for (let c in res.data.results) {
              res.data.results[c]["created_by"] =
                res.data.results[c][nameKey]["display_name"];
            }
          }
          // if (path == "mainGroups") {
          //   for (let g in res.data.results) {
          //     if (res.data.results[g]["groups_sub_groups"].length != 0) {
          //       let subGroups = res.data.results[g]["groups_sub_groups"];
          //       for (let sg in subGroups) {
          //         subGroups[sg]["created_by"] =
          //           subGroups[sg]["users_contact_sub_group"]["display_name"];
          //       }
          //     }
          //   }
          // }
          commit(mutation, res.data.results);
        }
      });
    },
    //events
    //eslint-disable-next-line no-unused-vars
    loadEventsPage({ commit }, { path, mutation }) {
      axios.get("contactManagement/" + path).then((res) => {
        if (res.status == 200) {
          commit(mutation, res.data.results);
        }
      });
    },
    //meeting rooms
    loadMeetingRooms({ commit }, { path, mutation }) {
      axios.get("contactManagement/meetingRoom/" + path).then((res) => {
        if (res.status == 200) {
          commit(mutation, res.data.results);
        }
      });
    },
    //available rooms
    //eslint-disable-next-line no-unused-vars
    loadAvailableRooms({ commit }, { path, mutation, data }) {
      axios.post("contactManagement/meetingRoom/" + path, data).then((res) => {
        if (res.status == 200) {
          if (res.data.results) {
            commit(mutation, res.data.results);
          }
        }
      });
    },
    //request cancellation
    contactsRequestCancel({ commit }, { path }) {
      axios.post("contactManagement/meetingRoom/" + path).then((res) => {
        if (res.status == 200) {
          commit("users/showToast", ["info", "", "", "requestCancellation"], {
            root: true,
          });
        }
      });
    },
    //clone events
    cloneEvents({ commit, dispatch }, { path }) {
      axios.post("contactManagement/event/clone/" + path).then((res) => {
        if (res.status == 200) {
          dispatch("loadEventsPage", {
            path: "events",
            mutation: "fetchEventsPageData",
          });
          commit("users/showToast", ["info", "", "", "eventsClone"], {
            root: true,
          });
        }
      });
    },
    //event groups
    updateEventGroupsData({ commit, state }, { type, data }) {
      let eventGroupsData = [];
      //deleting main groups
      if (type == "main_group") {
        state.deletedEventsMainGroups.push(data[2].id);
        for (let eg in state.eventGroupsData) {
          if (state.eventGroupsData[eg]["id"] != data[2]["id"]) {
            eventGroupsData.push(state.eventGroupsData[eg]);
          }
        }
        commit("fetchEventGroupsData", [type, eventGroupsData]);
      }
      //deleteing sub groups
      if (type == "sub_group") {
        state.deletedEventsSubGroups.push(data[2].id);
        for (let eg in state.eventGroupsData) {
          if (state.eventGroupsData[eg]["id"] == data[3]["id"]) {
            let subGroups = state.eventGroupsData[eg]["sub_groups"];
            for (let sg in subGroups) {
              if (subGroups[sg]["id"] == data[2]["id"]) {
                commit("fetchEventGroupsData", [type, eg, sg]);
              }
            }
          }
        }
      }
    },

    //CRUD APIS
    //CONTACT MANAGEMENT TABLE CRUD
    //contacts
    contactMangementCRUD({ dispatch }, { path, mutation, tag, data, nameKey }) {
      let loadApi;
      if (path != "events" && path != "meetingRoom/booking") {
        loadApi = "loadContactManagementTableCommons";
      }
      if (path == "events") {
        loadApi = "loadEventsPage";
      }
      if (path == "meetingRoom/booking") {
        loadApi = "loadMeetingRooms";
      }
      if (mutation != "fetchFollowUpTableData") {
        if (tag == "add") {
          dispatch("commonCRUD", {
            basePath: "contactManagement/" + path,
            loadApi: loadApi,
            toastTag: path,
            tag: tag,
            data: data,
            path: path,
            nameKey: nameKey,
            mutation: mutation,
          });
        }
      }
      if (mutation == "fetchFollowUpTableData") {
        if (tag == "add") {
          dispatch("commonCRUD", {
            basePath: "contactManagement/" + path,
            loadApi: loadApi,
            toastTag: "followUp",
            tag: tag,
            data: data,
            path: path,
            nameKey: nameKey,
            mutation: mutation,
          });
        }
      }
      if (
        mutation != "fetchInviteesTableData" &&
        mutation != "fetchFollowUpTableData"
      ) {
        if (tag == "update" || tag == "delete") {
          dispatch("commonCRUD", {
            basePath: "contactManagement/" + path + "/",
            loadApi: loadApi,
            toastTag: path,
            tag: tag,
            data: data,
            path: path,
            nameKey: nameKey,
            mutation: mutation,
            id_key: "id",
          });
        }
      }
      if (
        mutation == "fetchInviteesTableData" ||
        mutation == "fetchFollowUpTableData"
      ) {
        if (tag == "update" || tag == "delete") {
          let toast =
            mutation == "fetchInviteesTableData" ? "inviteesTable" : "followUp";
          dispatch("commonCRUD", {
            basePath: "contactManagement/" + path,
            loadApi: loadApi,
            toastTag: toast,
            tag: tag,
            data: data,
            path: path,
            nameKey: nameKey,
            mutation: mutation,
            id_key: "",
          });
        }
      }
    },

    //COMMON CRUD FUNCTION
    commonCRUD(
      { state, commit, dispatch, rootState },
      {
        basePath,
        loadApi,
        toastTag,
        tag,
        data,
        path,
        nameKey,
        mutation,
        id_key,
      }
    ) {
      if (tag == "add") {
        //adding new data to the data-base using the axios POST method
        axios
          .post(basePath, data)
          .then((res) => {
            if (res.status == 200) {
              state.tableLoad = true;
              if (
                toastTag == "contacts" ||
                toastTag == "mainGroups" ||
                toastTag == "donations" ||
                toastTag == "appointments"
              ) {
                dispatch(loadApi, {
                  path: path,
                  mutation: mutation,
                  nameKey: nameKey,
                });
                if (toastTag == "mainGroups") {
                  state.mainGroupName = res.data.results.id;
                }
              } else if (toastTag == "subGroups") {
                dispatch(loadApi, {
                  path: "mainGroups",
                  mutation: mutation,
                  nameKey: "users_contact_main_group",
                });
              } else if (
                toastTag == "events" ||
                toastTag == "meetingRoom/booking"
              ) {
                let loadPath;
                loadPath = toastTag == "meetingRoom/booking" ? "booking" : path;
                dispatch(loadApi, {
                  path: loadPath,
                  mutation: mutation,
                });
                state.ContactEventCurrentTab = "ContactEvents";
              } else if (toastTag == "followUp") {
                dispatch(loadApi, {
                  path: state.inviteesFollowUpPath,
                  mutation: mutation,
                  nameKey: nameKey,
                });
              } else {
                dispatch(loadApi);
              }
              if (toastTag != "mainGroups") {
                rootState["users"].displayDialog = false;
              }
              commit(
                "users/showToast",
                ["success", data, "was added", toastTag],
                {
                  root: true,
                }
              );
            }
          })
          .catch(function (error) {
            const errorMessage = error.message.split(" ");
            if (errorMessage[5] === "400") {
              let errorMsg =
                toastTag == "meetingRoom/booking"
                  ? "The room is already booked in this date!"
                  : "";
              commit(
                "users/showToast",
                [errorMsg, data, "was added", toastTag],
                {
                  root: true,
                }
              );
            }
          });
      }
      if (tag == "retrive/" || tag == "modifyStatus/") {
        let mssg;
        if (tag == "modifyStatus/") {
          if (data.status == "Active") {
            mssg = "was deactivated! ";
          }
          if (data.status == "Inactive") {
            mssg = "was activated!";
          }
        }
        //retrieving a deleted data from the data-base using the axios PATCH method
        //disabling an existing data from the data-base using the axios PATCH method
        axios
          .patch(basePath + tag + data[id_key])
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            if (res.status == 200) {
              state.tableLoad = true;
              dispatch(loadApi);
              commit("users/showToast", ["info", data, mssg, toastTag], {
                root: true,
              });
            }
          });
      }
      if (tag == "delete") {
        let updatePath =
          mutation != "fetchInviteesTableData" &&
          mutation != "fetchFollowUpTableData"
            ? basePath + data[id_key]
            : basePath;
        //deleting an existing data in the data-base using the axios DELETE method
        axios.delete(updatePath).then((res) => {
          if (res.status == 200) {
            if (
              toastTag == "contacts" ||
              toastTag == "mainGroups" ||
              toastTag == "donations" ||
              toastTag == "appointments"
            ) {
              dispatch(loadApi, {
                path: path,
                mutation: mutation,
                nameKey: nameKey,
              });
              if (toastTag == "contacts") {
                dispatch(loadApi, {
                  path: "mainGroups",
                  mutation: "fetchContactManagementMainGroupTableData",
                  nameKey: "users_contact_main_group",
                });
              }
            } else if (toastTag == "subGroups") {
              dispatch(loadApi, {
                path: "mainGroups",
                mutation: mutation,
                nameKey: "users_contact_main_group",
              });
            } else if (toastTag == "events") {
              dispatch(loadApi, {
                path: path,
                mutation: mutation,
              });
              state.ContactEventCurrentTab = "ContactEvents";
              dispatch("loadEventsPage", {
                path: "events",
                mutation: "fetchEventsPageData",
              });
            } else if (toastTag == "followUp") {
              dispatch(loadApi, {
                path: state.inviteesFollowUpPath,
                mutation: mutation,
                nameKey: nameKey,
              });
            } else {
              dispatch(loadApi);
            }
            commit("users/showToast", ["info", data, "was deleted", toastTag], {
              root: true,
            });
          }
        });
      }
      //editing an existing data in the data-base using the axios PUT method
      if (tag == "update") {
        let updatePath =
          mutation != "fetchInviteesTableData" &&
          mutation != "fetchFollowUpTableData"
            ? basePath + data[id_key]
            : basePath;
        axios
          .patch(updatePath, data)
          .then((res) => {
            if (res.data.status == 200) {
              if (
                toastTag == "contacts" ||
                toastTag == "mainGroups" ||
                toastTag == "donations" ||
                toastTag == "appointments"
              ) {
                dispatch(loadApi, {
                  path: path,
                  mutation: mutation,
                  nameKey: nameKey,
                });
              } else if (toastTag == "inviteesTable") {
                dispatch(loadApi, {
                  path: state.inviteesEventPath,
                  mutation: mutation,
                  nameKey: nameKey,
                });
              } else if (toastTag == "subGroups") {
                dispatch(loadApi, {
                  path: "mainGroups",
                  mutation: mutation,
                  nameKey: "users_contact_main_group",
                });
              } else if (
                toastTag == "events" ||
                toastTag == "meetingRoom/booking"
              ) {
                let loadPath =
                  toastTag == "meetingRoom/booking" ? "booking" : path;
                dispatch(loadApi, {
                  path: loadPath,
                  mutation: mutation,
                });
                state.ContactEventCurrentTab = "ContactEvents";
              } else if (toastTag == "followUp") {
                dispatch(loadApi, {
                  path: state.inviteesFollowUpPath,
                  mutation: mutation,
                  nameKey: nameKey,
                });
              } else {
                dispatch(loadApi);
              }
              if (toastTag != "mainGroups") {
                rootState["users"].displayDialog = false;
              }
              commit(
                "users/showToast",
                ["info", data, "was edited", toastTag],
                {
                  root: true,
                }
              );
            }
          })
          .catch(function (error) {
            const errorMessage = error.message.split(" ");
            if (errorMessage[5] === "400") {
              let errorMsg =
                toastTag == "meetingRoom/booking"
                  ? "The room is already booked in this date!"
                  : "";
              commit(
                "users/showToast",
                [errorMsg, data, "was added", toastTag],
                {
                  root: true,
                }
              );
            }
          });
      }
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};
export default contacts;
