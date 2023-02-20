<template>
  <div>
    <div
      style="display: inline-block; width: 100%; overflow-y: visible"
      class="mt-5"
    >
      <ul class="timeline timeline-horizontal">
        <li
          class="timeline-item"
          v-for="(event, index) of timeLinerData"
          :key="event.id"
        >
          <div
            class="timeline-badge cursor-pointer p-button-rounded"
            :style="{
              backgroundColor: getTrackStatusColor(event),
            }"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <i class="pi pi-check-circle"></i>
          </div>

          <div
            class="time-line-border"
            :style="{
              backgroundColor: getTrackStatusColor(event),
            }"
            v-if="timeLinerData.length - 1 > index"
          ></div>
          <div class="timeline-panel">
            <div
              class="timeline-heading time-line-text"
              :style="{
                color: getTrackStatusColor(event),
              }"
            >
              {{ event.job_type }}
            </div>
            <div class="timeline-body">
              <p class="time-line-text">
                {{ timeFormater(event.updatedAt) }}
              </p>
              <p class="time-line-text">
                {{ dateFormater(event.updatedAt) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "TrackStatusDialog",
  components: {},
  data() {
    return {
      timeLinerData: [
        {
          job_type: "Pickup",
          status: "New",
          updatedAt: "pick_up_date_time",
        },
        {
          job_type: "In-Transit",
          status: "New",
          updatedAt: "in_transit_date_time",
        },
        {
          job_type: "Delivered",
          status: "New",
          updatedAt: "delivered_date_time",
        },
      ],
      tabs: [
        {
          title: "Tracking Details",
          content: "",
        },
      ],
      timeLineOverAllTrackStatus: [],
    };
  },
  methods: {
    dateFormater(data) {
      let date = this.getLiveJobExpansionListArray?.[data];
      if (date == null) {
        return "";
      } else {
        var formattedDate = moment(date).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    timeFormater(data) {
      let date = this.getLiveJobExpansionListArray?.[data];
      if (date == null) {
        return "";
      } else {
        var formattedDate = moment(date).format("hh:mm A");
        return formattedDate;
      }
    },
    dateWithTimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY, hh:mm A");
        return formattedDate;
      }
    },
    getDateTime(data) {
      let dateTime;
      switch (data.job_type) {
        case "Pickup":
          dateTime =
            this.getLiveJobExpansionListArray.results?.tracking_status
              ?.pick_up_date_time;
          break;
        case "In-Transit":
          dateTime =
            this.getLiveJobExpansionListArray.results?.tracking_status
              ?.in_transit_date_time;
          break;
        case "Delivered":
          dateTime =
            this.getLiveJobExpansionListArray.results?.tracking_status
              ?.delivered_date_time;
          break;
      }
      return dateTime;
    },
    getTrackStatusColor(data) {
      let trackStatusColor;
      switch (data.job_type) {
        case "Pickup":
          trackStatusColor = this.getLiveJobExpansionListArray.results
            ?.tracking_status?.pick_up
            ? "#66C11E"
            : "#c6c9cf";
          break;
        case "In-Transit":
          trackStatusColor = this.getLiveJobExpansionListArray.results
            ?.tracking_status?.in_transit
            ? "#66C11E"
            : "#c6c9cf";
          break;
        case "Delivered":
          trackStatusColor = this.getLiveJobExpansionListArray.results
            ?.tracking_status?.delivered
            ? "#66C11E"
            : "#c6c9cf";
          break;
      }
      return trackStatusColor;
    },
  },
  computed: {
    ...mapGetters({
      overAllTrackStatus: "customerLaunchBookingHistory/getOverAllTrackStatus",
      getLiveJobExpansionListArray:
        "liveJobStatus/getLiveJobExpansionListArray",
    }),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.custom-modal-height {
  height: 500px;
}

.track-status-code {
  color: #ebbd46;
  font-weight: 600;
  font-size: 17.9045px;
}
/* Timeline */
.timeline,
.timeline-horizontal {
  width: 100%;
  list-style: none;
  padding: 20px;
  position: relative;
  align-items: center;
}
.timeline:before {
  top: 40px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  left: 50%;
  margin-left: -1.5px;
}
.timeline .timeline-item {
  margin-bottom: 20px;
  position: relative;
}
.timeline .timeline-item:before,
.timeline .timeline-item:after {
  content: "";
  display: table;
}
.timeline .timeline-item:after {
  clear: both;
}
.timeline .timeline-item .timeline-badge {
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -25px;
  background-color: #7c7c7c;
  border: 3px solid #ffffff;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.timeline .timeline-item .timeline-badge i,
.timeline .timeline-item .timeline-badge .fa,
.timeline .timeline-item .timeline-badge .glyphicon {
  top: 2px;
  left: 0px;
}
.timeline .timeline-item .timeline-badge.primary {
  background-color: #1f9eba;
}
.timeline .timeline-item .timeline-badge.info {
  background-color: #5bc0de;
}
.timeline .timeline-item .timeline-badge.success {
  background-color: #59ba1f;
}
.timeline .timeline-item .timeline-badge.warning {
  background-color: #d1bd10;
}
.timeline .timeline-item .timeline-badge.danger {
  background-color: #ba1f1f;
}
.timeline .timeline-item .timeline-panel .timeline-title {
  margin-top: 0;
  color: inherit;
}
.timeline .timeline-item .timeline-panel .timeline-body > p,
.timeline .timeline-item .timeline-panel .timeline-body > ul {
  margin-bottom: 0;
}
.timeline .timeline-item .timeline-panel .timeline-body > p + p {
  margin-top: 5px;
}
.timeline .timeline-item:last-child:nth-child(even) {
  float: right;
}
.timeline .timeline-item:nth-child(even) .timeline-panel {
  float: right;
  left: 16px;
}
.timeline .timeline-item:nth-child(even) .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}
.timeline-horizontal {
  list-style: none;
  position: relative;
  padding: 20px 0px 20px 0px;
  display: inline-block;
}
.timeline-horizontal:before {
  height: 3px;
  top: auto;
  bottom: 18px;
  left: 56px;
  right: 0;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item {
  display: table-cell;
  height: auto;
  min-width: 700px;
  float: none !important;
  padding-left: 0px;
  padding-right: 20px;
  margin: 0 auto;
  vertical-align: bottom;
}
.timeline-horizontal .timeline-item .timeline-panel {
  top: auto;
  bottom: 64px;
  display: inline-block;
  float: none !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
}
.timeline-horizontal .timeline-item .timeline-panel:before {
  top: auto;
  bottom: -16px;
  left: 28px !important;
  right: auto;
  border-right: 16px solid transparent !important;
  border-top: 16px solid #c0c0c0 !important;
  border-bottom: 0 solid #c0c0c0 !important;
  border-left: 16px solid transparent !important;
}
.timeline-horizontal .timeline-item:before,
.timeline-horizontal .timeline-item:after {
  display: none;
}
.timeline-horizontal .timeline-item .timeline-badge {
  top: auto;
  bottom: 0px;
  left: 43px;
}
.pi-check-circle:before {
  font-size: 12px;
}
.timeline-heading {
  padding-left: 15px;
}
.timeline-body {
  position: absolute;
  bottom: -42px;
  color: #7a7b7c;
}
.timeline-heading {
  position: absolute;
  bottom: 35px;
}
.time-line-border {
  background: #e1eaf9;
  width: 100%;
  margin-left: 30px;
  position: absolute;
  border: 1px solid #e1eaf9 !important;
  top: 9px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 50px; //for horizontal scrollbar
  height: 50px; //for vertical scrollbar
}
.time-line-text {
  font-family: $font-family-third;
  font-size: 12px;
  font-weight: 600;
}
.timeline-header-title {
  font-weight: 600;
  font-size: 14px;
  color: $color-212121 !important;
  font-family: $font-family-third;
  display: flex;
  justify-content: space-between;
}
.timeline-badge:active {
  transform: scale(0.98);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  /* Lowering the shadow */
}
.title-image {
  height: 21px;
  width: 38px;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #ffffff;
  border: 1px solid #ffffff;
}
::v-deep .p-datatable {
  background: #ffffff !important;
}
::v-deep .p-datatable .p-datatable-tbody > tr > td {
  border: 1px solid #ffffff;
}
.table-text {
  color: #343434;
  font-weight: 600;
  font-size: 12px;
  font-family: $font-family-third;
}
::v-deep .p-datatable-thead {
  display: none !important;
}
.table-location-text {
  font-weight: 600;
  font-size: 10px;
  color: #a3a3a5;
  font-family: $font-family-third;
  letter-spacing: 0.1em;
}
::v-deep .p-accordion-toggle-icon.pi-chevron-down:before,
::v-deep .p-accordion-toggle-icon.pi-chevron-right:before {
  position: absolute;
  right: 20px;
  top: 18px;
  color: #4e5968;
}
::v-deep .p-accordion-header-text {
  color: #4e5968;
  font-weight: 700;
  font-size: 14px;
}
::v-deep .p-accordion-content {
  height: 323px;
  padding: 0px !important;
}
::v-deep .p-dialog-content {
  overflow-y: auto;
  overflow-x: hidden !important;
}
.parcel-document-title {
  color: #4e5968;
  font-weight: 700;
  font-size: 14px;
  width: 100%;
  margin: 15px 0px;
  font-family: $font-family-third;
}
.parcel-document-inner-container {
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  height: 183px;
}
.column-text {
  font-weight: 600;
  font-size: 12px;
  color: #7e84a7;
}
.timeline-item:nth-child(3) {
  min-width: 80px !important;

  .timeline-body {
    width: 100px;
  }
}
.parcel-time-line-container {
  overflow: auto;
  height: 130px;
}
.table-container {
  overflow: auto;
  height: 322px;
}
</style>
