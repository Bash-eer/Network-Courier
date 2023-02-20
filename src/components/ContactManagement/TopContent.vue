<template>
  <div class="card topContentDiv">
    <!--invitee status-->
    <div
      class="card-title eventsImageDiv w-100"
      :style="
        backgroundStyles(
          $store.state.contacts.eventsOverviewPageData['cover_image']
        )
      "
    >
      <div
        class="
          flex
          justify-content-between
          inviteeStatus
          w-100 w-full
          flex-wrap
        "
      >
        <div class="flex">
          <div
            class="
              flex flex-row
              eventDetailsHeaderText
              justify-content-center
              align-items-center
            "
          >
            <div class="flex pointer-cursor mr-3">
              <router-link to="/contact-management">
                <i class="pi pi-arrow-left"></i>
              </router-link>
            </div>
            <div class="flex mr-3">
              <div class="flex flex-column justify-content-center">
                <div class="flex">Event Details</div>
                <div class="flex"></div>
              </div>
            </div>
            <div class="flex pointer-cursor ">
              <CustomSpeedDial
                    dataName="eventsOverlayData"
                    storePath="contacts"
                    class="white-custom-speed-dial "
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
        <div class="flex">
          <div class="flex flex-row">
            <div
              :class="
                index != $store.state.contacts.inviteesStatusImages.length - 1
                  ? 'flex mr-4'
                  : 'flex'
              "
              v-for="(status, index) of $store.state.contacts
                .inviteesStatusImages"
              :key="index"
            >
              <div class="flex flex-row">
                <div class="flex mr-2">
                  <img
                    :src="'/images/' + status.img + '.png'"
                    height="40"
                    width="40"
                    alt="invitee status"
                  />
                </div>
                <div class="flex">
                  <div
                    class="flex flex-column justify-content-center flex-wrap"
                  >
                    <div class="flex statusHeadingText">
                      {{ status.heading }}
                    </div>
                    <div class="flex statusHeadingNumbers">
                      {{ status.numbers }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-event-top-card-wrapper flex flex-row">
      <!--event image-->
      <div class="flex">
        <img
          :src="$store.state.contacts.eventsOverviewPageData['event_image']"
          height="228"
          width="304"
          alt=""
          class="event-img"
        />
      </div>
      <!--event summary-->
      <div class="flex eventsSummaryDiv w-100">
        <div class="flex flex-column w-100">
          <!--first section-->
          <div class="flex w-100">
            <div class="flex justify-content-between w-100">
              <div class="flex">
                <div class="flex flex-column">
                  <div class="flex eventTitle">
                    {{
                      $store.state.contacts.eventsOverviewPageData["event_name"]
                    }}
                  </div>
                  <div class="flex eventSubTitle">
                    Event ID:
                    {{ $store.state.contacts.eventsOverviewPageData["id"] }}
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-row">
                  <div class="flex mr-2">
                    <div class="flex flex-column">
                      <div class="flex eventsCreatedText">Created On</div>
                      <div class="flex eventsCreatedDetailsText">
                        21st july 2021
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex flex-column">
                      <div class="flex eventsCreatedText">Created by</div>
                      <div class="flex eventsCreatedDetailsText">
                        {{
                          $store.state.contacts.eventsOverviewPageData[
                            "createdBy"
                          ]
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--second section-->
          <div class="flex w-100 pl-1">
            <div class="flex justify-content-between w-100">
              <div class="flex w-100">
                <div class="row w-100">
                  <div class="col-10 eventsDescriptionText">
                    {{
                      $store.state.contacts.eventsOverviewPageData["subject"]
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--third section-->
          <div class="flex w-100 mt-3">
            <div class="flex justify-content-between w-100">
              <div class="flex w-100">
                <div class="flex flex-row w-100 flex-wrap">
                  <div
                    class="flex iconDiv"
                    v-for="(icon, index) of $store.state.contacts.contactIcons"
                    :key="index"
                  >
                    <div class="flex flex-row">
                      <div class="flex">
                        <i
                          :class="'pi pi-' + icon.icon + ' ' + 'blue-icon'"
                        ></i>
                      </div>
                      <div class="flex">
                        <span class="iconsText ml-2">{{ icon.text }}</span>
                      </div>
                    </div>
                  </div>
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
export default {
  name: "TopContent",
  methods: {
    backgroundStyles(image) {
      return {
        background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${image})`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-blend-mode": "darken",
      };
    },
  },
};
</script>

<style scoped>
.topContentDiv {
  margin-left: 20px;
  margin-right: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 500px;
}
.eventsImageDiv {
  height: 265px;
  border-radius: 8px;
  padding-left: 56px;
  padding-right: 56px;
}
.inviteeStatus {
  top: 0;
  margin-top: 25px;
}
.eventDetailsHeaderText {
  font-family: Montserrat;
  font-style: normal;
  font-size: 12px;
  color: #ffffff;
}
.statusHeadingText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
}
.statusHeadingNumbers {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #ffffff;
}
.eventsSummaryDiv {
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 14px;
}
.contact-event-top-wrapper {
  background-color: #ffffff;
  height: max-content;
  border-radius: 8px;
}
a {
  text-decoration: none !important;
  color: #fff !important;
}
.event-img {
  margin-top: -80px;
  margin-left: 30px;
}
.blue-icon {
  color: #357dea;
}
.eventTitle {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #4e5868;
}
.eventSubTitle {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #4e5868;
  opacity: 0.8;
}
.eventsCreatedText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #7e84a7;
}
.eventsCreatedDetailsText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.eventsDescriptionText {
  text-align: start;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #4e5868;
}
.iconDiv {
  margin-right: 44px;
}
.iconsText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #4e5868;
}
::v-deep .pi-ellipsis-v {
  color: rgb(247, 243, 243) !important;
}
/* ::v-deep .pi-ellipsis-v:hover {
  color: #000 !important;
} */
</style>
