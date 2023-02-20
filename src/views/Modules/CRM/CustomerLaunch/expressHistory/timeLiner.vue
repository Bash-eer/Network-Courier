<template>
  <div class="timeline-header-title">
    Overall Job Status
    <!--Create Export button -->
    <Buttons
      label="Export as PDF"
      button_class="p-button-sm mr-4 add-btn custom-add-btn"
    />
  </div>
  <div class="container m-0">
    <div class="row">
      <div class="col-md-12">
        <div style="display: inline-block; width: 100%; overflow-y: visible">
          <ul class="timeline timeline-horizontal">
            <li
              class="timeline-item"
              v-for="(event, index) of timeLinerData"
              :key="event.id"
            >
              <div
                class="timeline-badge cursor-pointer p-button-rounded"
                :style="{
                  backgroundColor:
                    event.status == 'Completed'
                      ? '#66C11E'
                      : event.status == 'Ongoing'
                      ? '#FF7A00'
                      : '#c6c9cf',
                }"
                @click="toggle($event, event)"
                aria-haspopup="true"
                aria-controls="overlay_menu"
              >
                <i class="pi pi-check-circle"></i>
              </div>

              <div
                class="time-line-border"
                :style="{
                  backgroundColor:
                    event.status == 'Completed'
                      ? '#66C11E'
                      : event.status == 'Ongoing'
                      ? '#FF7A00'
                      : '#e1eaf9',
                }"
                v-if="timeLinerData.length - 1 > index"
              ></div>
              <div class="timeline-panel">
                <div
                  class="timeline-heading time-line-text"
                  :style="{
                    color:
                      event.status == 'Completed'
                        ? '#66C11E'
                        : event.status == 'Ongoing'
                        ? '#FF7A00'
                        : '#c6c9cf',
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
            <template>
              <OverlayPanel
                id="overlay_panel"
                ref="op"
                :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
                style="width: 600px; height: 379px"
              >
                <div class="container m-0">
                  <div class="timeline-overlay-title">
                    Collection
                    <span class="tracking-hyper-text"
                      >({{
                        timeLineOverAllTrackJobData.job_type_no || "-"
                      }})</span
                    >
                  </div>
                  <div class="table-container mt-3">
                    <DataTable
                      responsiveLayout="scroll"
                      :class="tableClass"
                      :rowClass="rowClass"
                      selectionMode="single"
                      :dataKey="'collection'"
                      :value="timeLineOverAllTrackStatus"
                    >
                      <!--These are the fields not needed now-->
                      <!-- <Column field="code" header="">
                        <template #body="slotProps">
                          <span class="table-text">{{
                            slotProps?.data.status || "-"
                          }}</span>
                        </template>
                      </Column>
                      <Column field="name" header="">
                        <template #body> - </template>
                      </Column> -->
                      <Column
                        field="category"
                        header=""
                        style="min-width: 12rem"
                      >
                        <template #body="slotProps">
                          <span class="table-text">{{
                            dateWithTimeFormater(
                              slotProps?.data.status_date_time
                            )
                          }}</span
                          ><br />
                          <span class="table-location-text mt-1">
                            <img
                              class="mr-1"
                              src="../../../../../assets/location.png"
                              alt="img"
                              width="10"
                              height="14"
                            />{{ slotProps?.data.location }}
                          </span>
                        </template>
                      </Column>
                      <Column field="quantity" header="">
                        <template #body> - </template>
                      </Column>
                      <Column field="quantity" header="">
                        <template #body="slotProps">
                          <span class="table-text">{{
                            slotProps?.data.status_name
                          }}</span>
                        </template>
                      </Column>
                      <template #empty> No data found </template>
                    </DataTable>
                  </div>
                </div>
              </OverlayPanel>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import OverlayPanel from "primevue/overlaypanel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExpressTimeLiner",
  components: { OverlayPanel, DataTable, Column },
  props: ["timeLinerData"],
  data() {
    return {
      timeLineOverAllTrackStatus: [],
      timeLineOverAllTrackJobData: {},
    };
  },

  methods: {
    ...mapActions({
      loadOverAllTrackStatus:
        "customerLaunchBookingHistory/loadSpecificBookingOverAllTrackStatus",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
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
    timeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("hh:mm A");
        return formattedDate;
      }
    },
    async toggle(event, data) {
      let jobId = data.id;
      this.$refs.op.toggle(event);

      const overAllTrackStatusResponse = await this.loadOverAllTrackStatus(
        jobId
      );

      if (
        overAllTrackStatusResponse &&
        overAllTrackStatusResponse.status === 200
      ) {
        let overAllTrackStatus = overAllTrackStatusResponse.data.results || {};
        this.timeLineOverAllTrackStatus =
          overAllTrackStatus?.status_updates || [];
        this.timeLineOverAllTrackJobData = overAllTrackStatus;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
/* Timeline */
.timeline,
.timeline-horizontal {
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
  width: 20%;
  min-width: 320px;
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
  bottom: -38px;
  color: #7a7b7c;
}
.timeline-heading {
  position: absolute;
  bottom: 35px;
}
.time-line-border {
  background: #e1eaf9;
  width: 100%;
  margin-left: 50px;
  position: absolute;
  border: 1px solid #e1eaf9 !important;
  top: 5px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 50px; //for horizontal scrollbar
  height: 50px; //for vertical scrollbar
}
.time-line-text {
  font-family: $font-family-third;
  font-size: 12px;
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
.timeline-overlay-title {
  color: #fb7901;
  font-weight: 700;
  font-size: 12px;
}
.tracking-hyper-text {
  color: #357dea;
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
</style>
