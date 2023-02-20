<template>
  <div class="mt-2">
    <!--looping through the main groups-->
    <div v-for="(mainGroups, index) in data" :key="index">
      <Accordion class="accordion-custom m-2 mainGroupsAccordion">
        <AccordionTab>
          <template #header>
            <span class="accordion-text">{{ mainGroups["group_name"] }}</span>
          </template>
          <div class="flex justify-content-between">
            <div class="flex"></div>
            <div class="flex align-items-center justify-content-center">
              <!-- <CustomSpeedDial
                :storePath="'contacts'"
                :dataName="'eventsGroupData'"
                :rowData="['main_group', mainGroups['group_name'], mainGroups]"
                :customDialData="$store.state.contacts.eventGroupsOverlayData"
                :tableName="'eventsGroupComponent'"
              /> -->
            </div>
          </div>
          <div class="flex justify-content-between">
            <div class="flex">
              <div class="subGroupsHeading mb-1 ml-2">
                <span>Sub Groups</span>
              </div>
            </div>
          </div>
          <!--looping through the sub groups-->
          <div
            v-for="(subGroups, subIndex) in mainGroups['sub_groups']"
            :key="subIndex"
          >
            <Accordion class="accordion-custom m-2 subGroupsAccordion">
              <AccordionTab>
                <template #header>
                  <span class="accordion-text">
                    {{ subGroups["sub_group_name"] }}
                  </span>
                </template>

                <div class="flex justify-content-between">
                  <div class="flex flex-row subGroupDetailsText mt-2">
                    <span>
                      Total Members :
                      {{ subGroups["sub_group_members"].length }}
                    </span>
                    <span><div class="verticalLine ml-2 mr-2"></div></span>
                    <span>Table No : {{ subGroups["table_no"] }}</span>
                  </div>
                  <div class="flex">
                    <!-- <CustomSpeedDial
                      :storePath="'contacts'"
                      :dataName="'eventsGroupData'"
                      :rowData="[
                        'sub_group',
                        mainGroups['group_name'],
                        subGroups,
                        mainGroups,
                      ]"
                      :customDialData="
                        $store.state.contacts.eventGroupsOverlayData
                      "
                      :tableName="'eventsGroupComponent'"
                    /> -->
                  <div class="flex flex-row justify-content-between">
                    <div class="searchicon flex flex-row justify-content-end align-items-center m-2">
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
                        
                      <Buttons
                          label="Add Invites"
                          button_class="dialog-button-text p-button-sm  ml-2 add-btn custom-add-btn"
                          v-on:childToParent="submitData"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- looping through the invitees -->
                <div class="flex flex-wrap mt-3">
                  <div
                    v-for="(invitees, index) in subGroups['sub_group_members']"
                    :key="index"
                    class="card contact-add-event-small-cards mr-3"
                  >
                    <div class="flex flex-row align-items-center">
                      <img
                        :src="invitees['imgUrl']"
                        alt="avatar"
                        class="m-1"
                        width="32"
                        height="35"
                      />
                      <span class="contact-event-attendance-title mx-1 mr-2">
                        {{ invitees["name"] }}
                      </span>
                      <span
                        @click="
                          removeInvitee(
                            mainGroups['group_name'],
                            subGroups,
                            invitees['contact_id']
                          )
                        "
                        class="
                          delete-icon
                          flex
                          justify-content-center
                          align-items-center
                        "
                        >x</span
                      >
                    </div>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
export default {
  name: "EventGroups",
  components: {
    Accordion,
    AccordionTab,
  },
  props: ["data"],
  methods: {
    removeInvitee(groupName, data, tag) {
      let eventGroupsData = this.$store.state.contacts.eventGroupsData;
      for (let eg in eventGroupsData) {
        //narrowing down the search by main group name
        if (eventGroupsData[eg]["group_name"] == groupName) {
          let subGroupsArray = eventGroupsData[eg]["sub_groups"];
          for (let sg in subGroupsArray) {
            //narrowing down the search by sub group name
            if (
              subGroupsArray[sg]["sub_group_name"] == data["sub_group_name"]
            ) {
              //narrowing down the search by sub group members
              let invitees = subGroupsArray[sg]["sub_group_members"];
              for (let i in invitees) {
                if (invitees[i]["contact_id"] == tag) {
                  if (invitees[i]["id"]) {
                    this.$store.state.contacts.deletedEventGroupsInviteesIds.push(
                      invitees[i]["id"]
                    );
                  }
                  this.$store.state.contacts.eventGroupsData[eg]["sub_groups"][
                    sg
                  ]["sub_group_members"].splice(i, 1);
                }
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.verticalLine {
  opacity: 0.1;
  border-left: 1px solid #000000;
  height: 33px;
}
.subGroupsHeading {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  text-align: start;
}
.subGroupDetailsText {
  text-align: start;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.contact-event-add-event-wrapper {
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
  margin-left: 9rem;
  margin-top: -8rem;
  box-shadow: 10px 14px 14px rgba(0, 0, 0, 0.25),
    10px 10px 10px rgba(0, 0, 0, 0.22);
}
.contact-add-event-small-cards {
  position: relative;
  background: #ffffff;
  border: 0.2px solid #cecece;
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
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: #357dea;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 2% !important;
  color: #357dea;
}
::v-deep .mainGroupsAccordion .p-accordion-header .p-accordion-header-link {
  background: #eef4ff !important;
  border-radius: 8px 8px 8px 8px !important;
  border: 2px solid #d9e8ff !important;
}
::v-deep .subGroupsAccordion .p-accordion-header .p-accordion-header-link {
  background: #eef4ff !important;
  border-radius: 8px 8px 8px 8px !important;
  border: 2px solid #d9e8ff !important;
}
::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
}
::v-deep .mainGroupsAccordion .p-accordion-content {
  background-color: transparent !important;
  border-radius: 8px 8px 8px 8px !important;
  border: 2px solid #d9e8ff !important;
}
::v-deep .subGroupsAccordion .p-accordion-content {
  background: rgba(238, 244, 255, 0.3) !important;
  border: 1px solid #d9e8ff !important;
  box-sizing: border-box !important;
}
</style>
