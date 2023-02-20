<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded mx-2  updateButton'"
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 130px"
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer"
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="`pi pi-${items.icon}`" />
            </div>
            <div
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                zone-route-custom-speed-dial-text
              "
            >
              {{ items.label }}
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from 'primevue/button';

import OverlayPanel from 'primevue/overlaypanel';
import { mapActions, mapState, mapMutations } from 'vuex';
import { difference } from 'lodash';

export default {
  name: 'CustomSpeedDial',
  props: ['customDialData', 'rowData', 'dataName', 'tableName', 'selectedJobs'],
  components: {
    Button,
    OverlayPanel,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedJobId: (state) => state.liveJobStatus.selectedJobId,
      totalJobsSelected: (state) => state.liveJobStatus.totalJobsSelected,
    }),
  },
  methods: {
    ...mapActions({
      sendSMSInfo: 'liveJobStatus/sendSMSOnLiveJobStatus',
      sendNotifyRiderApp: 'liveJobStatus/notifyRiderApp',
      fetchJobForTransfer: 'liveJobStatus/fetchSelectedJobById',
      
    }),
    ...mapMutations({
      sendJobsForTransfer: 'liveJobStatus/setTransferJobData',
      setParentTriggered: 'liveJobStatus/setParentTriggered',
      removeSelectedJobs: 'liveJobStatus/removeSelectedJob'
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {
      this.$refs.op.hide();
    },

    removeIds(data, rmv) {
      let payload = difference(data, rmv);
      return payload;
    },

    menuClicked(choice) {
      //TO Update Route Settings TABLE ROW
      if (choice == 'Remove') {
        let data = [];
        let selectedData = this.selectedJobs.map((c) => {
          return Number(c.id);
        });
        let singleData = [];
        singleData[0] = Number(this.rowData?.id);

        if (selectedData.length) {
          data = this.removeIds(this.selectedJobId, selectedData);
          this.$emit('removeRows', selectedData);
          this.removeSelectedJobs(selectedData);
        } else {
          data = this.removeIds(this.selectedJobId, singleData);
          this.$emit('removeRows', singleData);
          this.removeSelectedJobs(singleData);
        }
        selectedData = [];
        this.$refs.op.hide();
      }

      if (choice == 'Edit All') {
        let selectedData = this.selectedJobs;
        let singleData = this.rowData;
        if (selectedData.length) {
          for (let i = 0; i < selectedData.length; i++) {
            selectedData[i].logistics_mode = singleData.logistics_mode;
            if (selectedData[i].logistics_mode == 'Bike') {
              selectedData[i].van_trip_id = null;
              selectedData[i].rapido_trip_id = null;
              selectedData[i].bike_trip_id = singleData.bike_trip_id;
            } else if (selectedData[i].logistics_mode == 'Van') {
              selectedData[i].bike_trip_id = null;
              selectedData[i].rapido_trip_id = null;
              selectedData[i].van_trip_id = singleData.van_trip_id;
            } else if (selectedData[i].logistics_mode == 'Rapido') {
              selectedData[i].van_trip_id = null;
              selectedData[i].bike_trip_id = null;
              selectedData[i].rapido_trip_id = singleData.rapido_trip_id;
            }
          }
          this.$emit('updateAllRows', {
            mode: 'selective',
            data: selectedData,
          });
        } else {
          this.$emit('updateAllRows', {
            mode: 'all',
            data: this.rowData,
          });
        }
      }
    },

    //FOR SEND SMS

    commonToast(severity, summary, message) {
      this.$store.state.operationZonesRoute.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
};
</script>

<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.zone-route-custom-speed-dial-text {
  font-weight: 600;
  font-size: 14px;
  color: #4e5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
