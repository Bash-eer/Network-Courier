<template>
  <div class="card flex flex-row ">
    <div class="flex flex-row mt-5 ml-5">
            <div class="flex pointer-cursor ">
              <router-link to="/contact-management">
                <i class="pi pi-arrow-left .color-7e84a7"></i>
              </router-link>
            </div>
    </div>
    <br />
    <Timeline
      :value="$store.state.contacts.contactsOverviewData"
      align="left"
      class="customized-timeline mt-3"
    >
      <!--timeleline markers-->
      <template #marker="slotProps">
        <span
          :class="
            slotProps.index == 'Contacts Header'
              ? 'custom-marker p-shadow-2'
              : 'default-marker'
          "
        >
          <img
            v-if="slotProps.index == 'Contacts Header'"
            :src="slotProps.item[0]['image_url']"
            class="contactsOverviewImage"
            alt=""
          />
          <img
            v-if="slotProps.index != 'Contacts Header'"
            :src="'/images/' + 'marker' + '.png'"
            alt=""
            class="markers"
          />
        </span>
      </template>
      <!--timeleline content-->
      <template #content="slotProps">
        <!--TEMPLATE FOR FIRST MARKER : CONTACTS OVERVIEW HEADER-->
        <span v-if="slotProps.index == 'Contacts Header'">
          <div class="flex flex-wrap justify-content-between mt-2">
            <!--left contents-->
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-2">
                  <div class="flex flex-column">
                    <div class="flex name">{{ slotProps.item[0]["name"] }}</div>
                    <div class="flex phone">
                      {{ slotProps.item[0]["mobile_no"] }}
                    </div>
                  </div>
                </div>
                <div class="flex actions justify-content-center">
                    <span class="bg-white flex"> 
                     <!-- <CustomSpeedDial
                    dataName="eventGroupsOverlayData"
                    storePath="contacts"
                    class="white-custom-speed-dial "
                    :customDialData="
                      $store.state.contacts.eventGroupsOverlayData
                    "
                    :rowData="$store.state.contacts.eventCardsData[index]"
                    @click="
                      customDialFunction(
                        $store.state.contacts.eventCardsData[index]
                      )
                    " -->
                     <CustomSpeedDial
                      :storePath="'contacts'"
                      :dataName="tableDataName"
                      :rowData="slotProps.data"
                      :customDialData="overlayData"
                      :tableName="tableName"
                  /></span>
             
                </div>
              </div>
            </div>
            <!--right contents-->
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex headerRight">
                  <div class="flex flex-column">
                    <div class="flex heading">Type</div>
                    <div
                      :class="
                        'flex type' + ' ' + slotProps.item[0]['contact_type']
                      "
                    >
                      {{ slotProps.item[0]["contact_type"] }}
                    </div>
                  </div>
                </div>
                <div class="flex headerRight">
                  <div class="flex flex-column">
                    <div class="flex heading">Created on</div>
                    <div class="flex date">
                      {{ dateFormater(slotProps.item[0]["createdAt"]) }}
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-row">
                    <div class="flex">
                      <img
                        :src="
                          slotProps.item[0]['users_contact_contacts']['profile_url']
                        "
                        class="contactsOverviewImage"
                      />
                    </div>
                    <div class="flex">
                      <div class="flex flex-column">
                        <div class="flex heading">Created by</div>
                        <div class="flex date">
                          {{
                            slotProps.item[0]["users_contact_contacts"][
                              "display_name"
                            ]
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
        <!--TEMPLATE FOR THE OTHER MARKERS -->
        <span v-if="slotProps.index != 'Contacts Header'">
          <div class="contactsHeadingsDiv">{{ slotProps.index }}</div>
          <!--TEMPLATE : BASIC DETAILS, RESIDENCE DETAILS, OFFICE DETAILS, PERSONAL INFO-->
          <span v-if="slotProps.index != 'Attachments'">
            <div class="contactsContentDiv">
              <div class="flex flex-row">
                <div
                  class="flex mr-4"
                  v-for="(item, index) of slotProps.item[0]"
                  :key="index"
                >
                  <div class="flex flex-column">
                    <div class="flex detailsText flex-wrap">
                      {{ getHeader(index) }}
                    </div>
                    <div class="flex infosText">
                      <span
                        v-if="
                          index == 'date_of_birth' ||
                          index == 'anniversary_date'
                        "
                        >{{ dateFormater(item) }}</span
                      >
                      <span v-else>{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <!--TEMPLATE : ATTACHMENTS-->
          <span v-if="slotProps.index == 'Attachments'"
            ><div class="contactsContentDiv">
              <div class="flex flex-row">
                <div
                  class="flex mr-2"
                  v-for="(item, index) of slotProps.item"
                  :key="index"
                >
                  <img :src="'/images/' + 'preview' + '.png'" alt="" />
                </div>
              </div>
            </div>
          </span>
        </span>
      </template>
    </Timeline>
  </div>
</template>

<script>
import moment from "moment";
import Timeline from "primevue/timeline";
export default {
  name: "ContactsTracker",
  components: {
    Timeline,
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "name":
          header = "Name";
          break;
        case "nick_name":
          header = "Nick Name";
          break;
        case "mobile_no":
          header = "Mobile No";
          break;
        case "email":
          header = "Email";
          break;
        case "religion":
          header = "Religion";
          break;
        case "race":
          header = "Race";
          break;
        case "address":
          header = "Address";
          break;
        case "home_phone":
          header = "Home Phone";
          break;
        case "company_name":
          header = "Company Name";
          break;
        case "office_fax":
          header = "Office Fax";
          break;
        case "office_phone":
          header = "Office Phone";
          break;
        case "website":
          header = "Website";
          break;
        case "date_of_birth":
          header = "Date of Birth";
          break;
        case "anniversary_date":
          header = "Aniversery Date";
          break;
        case "marital_status":
          header = "Marital Status";
          break;
        case "no_of_children":
          header = "No of Children";
          break;
        case "spouse_name":
          header = "Spouse Name";
          break;
      }
      return header;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.contactsOverviewImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.actions {
  width: 36px;
  height: 36px;
  background: #f6f6f7;
  border-radius: 6px;
}
.name {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.phone {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #7e84a7;
}
.heading {
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #7e84a7;
}
.headerRight {
  margin-right: 58px;
}
.type {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
}
.date {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.Personal {
  color: #e24d4d;
}
.Network {
  color: #1f0aa2;
}
.contactsHeadingsDiv {
  background: #eef4ff;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 18px;
}
.contactsContentDiv {
  margin-top: 24px;
  margin-left: 18px;
  margin-bottom: 39px;
}

</style>
