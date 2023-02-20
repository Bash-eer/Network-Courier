<template>
  <div class="ml-1">
    <div class="col wrapper border-radius-15 color-fff">
      <div class="flex justify-content-between">
        <div class="flex align-items-center">
          <div class="mr-4">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div class="flex flex-row" v-for="data in RowData" :key="data">
            <div class="mr-4">
              <span
                class="
                  type
                  font-size-12
                  bold-600
                  line-height-15
                  color-fff
                  letter-spacing-003
                  flex
                  align-items-start
                  justify-content-start
                "
                >{{ data.title }} <br />{{
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.unit_no +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.floor_no +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.building_name +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.address +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.state +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.country +
                  ", " +
                  this.$store.state.salesInternationalContract
                    .internationalContractOverviewData.postal_code
                }}</span
              >

              <!-- {{this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData.address}}, {{this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData.postal_code}}</span> -->
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div
              class="
                font-size-12
                bold-600
                line-height-15
                color-fff
                letter-spacing-003
              "
            >
              Preview
            </div>
            <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
          </div>
          <div class="flex mr-4">
            <div class="vertical_line"></div>
          </div>

          <div class="flex flex-column">
            <div
              class="
                font-size-12
                bold-600
                line-height-15
                color-fff
                letter-spacing-003
              "
            >
              Sent To
            </div>
            <div class="mt-2">
              <div class="flex flex-row">
                <div
                  v-for="(i, index1) of this.$store.state
                    .salesInternationalAgent.InternationalAgentOverviewData
                    .contacts"
                  :key="index1"
                >
                  <img
                    v-if="i?.selected && i.profile_url"
                    :src="i?.profile_url ?? ''"
                    alt="img"
                    height="32"
                    width="32"
                    class="mx-1"
                  />
                  <AvatarLabel
                    v-else
                    :label="subStringHandler(i.contact_name)"
                    classes="avatar-text"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="mt-2" v-for="(i, index1) of this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData.contacts" :key="index1">
              
              <img
                :src="i.profile_url"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                v-tooltip.bottom="`${i.contact_name}  <br />  ${i.contact_no}`"
              />
             
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";
import { mapState } from "vuex";
export default {
  name: "ExpressTimeLineHeader",
  // props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    // let ProcessedAddress = this.$store.state.salesInternationalAgent
    //   .InternationalAgentOverviewData.address + " , " + this.$store.state.salesInternationalAgent
    //   .InternationalAgentOverviewData.postal_code;
    return {
      RowData: [
        {
          title: "Address",
          subTitle:
            this.$store.state.salesInternationalAgent
              .InternationalAgentOverviewData.address +
            " , " +
            this.$store.state.salesInternationalAgent
              .InternationalAgentOverviewData.postal_code,
          // subTitle: "4, 133 Grandee Building, Singapore, 238801",
        },
      ],
      overView:
        this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData,
    };
  },
  computed: {
    ...mapState({
      overviewData: (state) =>
        state.salesInternationalAgent.InternationalAgentOverviewData,
    }),
  },
  methods: {
    subStringHandler(string) {
      if (string) {
        return string.substring(0, 2);
      }
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
    // getToolTip(name, no){
    //   return `{${i.contact_name }}  <br />  9282829182`
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.international-agent-timelineheader-commonTextStyle {
  line-height: 15px;
  color: #ffffff;
}
.international-agent-timelineheader-commonTextStyleAddress {
  line-height: 15px;
  color: #ffffff;
}

.international-agent-timelineheader-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.international-agent-timelineheader-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
.vertical_line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.preview {
  justify-content: space-between !important;
}
</style>
