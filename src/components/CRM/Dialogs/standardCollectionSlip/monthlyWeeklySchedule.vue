<template>
  <div>
    <!-- MAIN CONTENT -->
    <div class="monthlyWeeklySchedule">
      <TabMenu
        :model="tabData"
        v-model:activeIndex="activeTab"
        v-on:tab-change="tabChanged($event)"
      />
      <div v-for="(tabs, index) of tabData" :key="tabs.key">
        <div v-show="index == activeTab">
          <div class="weeklySchedule">
            <div class="weeks grid">
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="mon"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].monday"
                  @input="getUserData($event, 'monday', index)"
                />
                <label class="check_label" for="mon">Monday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="tue"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].tuesday"
                  @input="getUserData($event, 'tuesday', index)"
                />
                <label class="check_label" for="tue">Tuesday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="wed"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].wednesday"
                  @input="getUserData($event, 'wednesday', index)"
                />
                <label class="check_label" for="wed">Wednesday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="thur"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].thursday"
                  @input="getUserData($event, 'thursday', index)"
                />
                <label class="check_label" for="thur">Thursday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="fri"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].friday"
                  @input="getUserData($event, 'friday', index)"
                />
                <label class="check_label" for="fri">Friday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="sat"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].saturday"
                  @input="getUserData($event, 'saturday', index)"
                />
                <label class="check_label" for="sat">Saturday</label>
              </div>
              <div class="col-3 align-items-center">
                <Checkbox
                  class="mr-3"
                  inputId="sun"
                  :name="tabs.label"
                  :binary="true"
                  v-model="schedule[index].sunday"
                  @input="getUserData($event, 'sunday', index)"
                />
                <label class="check_label" for="sun">Sunday</label>
              </div>
            </div>
            <hr />
            <div class="trip grid">
              <div
                v-for="(itm, idx) of tripsDataForSchedule"
                :key="idx"
                class="flex-initial align-items-center trips_col"
              >
                <Checkbox
                  class="mr-3"
                  :inputId="itm.trip_code"
                  name="tripCategory"
                  :value="itm.id"
                  v-model="schedule[index].selectedTrip"
                />
                <label class="check_label" :for="itm.trip_code">{{
                  itm.trip_code
                }}</label>
              </div>
            </div>

            <div class="error_message mt-2" v-if="this.error[index].message !== ''">
              <div class="mr-2">
                <i class="pi pi-info-circle" />
              </div>
              <div>{{ error[index].message }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MAIN CONTENT END -->

    <!-- ACTION BUTTONS -->
    <div class="flex justify-content-end mt-5">
      <div>
        <Buttons
          class="p-button-outlined mx-1"
          label="Cancel"
          @click="closeDialog"
        />
        <Buttons class="mx-1" label="Save" @click="submitData" />
      </div>
    </div>
    <!-- ACTION BUTTONS END -->
  </div>
</template>

<script>
import TabMenu from 'primevue/tabmenu';
import Checkbox from 'primevue/checkbox';
import {
  mockTrips,
  scheduleDays,
  monthlyWeeklyTabData,
  API,
  NUMBER,
} from './const';
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  components: { TabMenu, Checkbox },
  props: ['formdata', 'formValid'],
  data() {
    return {
      tabData: monthlyWeeklyTabData,
      scheduleDays,
      mockTrips,
      activeTab: 0,
      selectedSchedule: [],
      selectedTrip: [],
      schedule: [],
      isFormValid: true,
      error: [],
    };
  },
  computed: {
    ...mapGetters({
      tripsDataForSchedule: 'Masscollection/getTripsForSchedule',
    }),
  },
  created() {
    this.loadData();
  },

  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: 'Masscollection/POSTPATCHCRUDOPERATION',
    }),
    ...mapMutations({
      closeScheduleDialog: 'Masscollection/setScheduleDialog',
    }),

    tabChanged(value) {
      this.activeTab = value.index;
    },

    closeDialog() {
      this.closeScheduleDialog(false);
    },

    loadData() {
      this.formData = this.formdata;
      this.tabData.map((itm,idx) => {
        this.error.push({ message: '' });
      })
      if (this.formdata && this.formdata?.schedule.length) {
        this.schedule = this.formdata?.schedule;
        let logisticKey = this.getLogisticKeys(this.formData?.logistics_mode);
        // stores trips
        let data = [];
        data = this.schedule;
        for (let i = 0; i < data.length; i++) {
          if (data[i].trips) {
            let selectedTrip = [];
            for (let j = 0; j < data[i].trips.length; j++) {
              selectedTrip[j] = data[i].trips[j][logisticKey];
              data[i].selectedTrip = selectedTrip;
            }
          }
        }
        this.schedule = data;
      } else {
        this.tabData.map((itm, index) => {
          this.schedule.push({
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            selectedTrip: [],
          });   
        });
      }
    },

    getLogisticKeys(itm) {
      let mode = itm.toLowerCase();
      let data = '';
      mode == 'bike'
        ? (data = 'bike_trip_id')
        : mode == 'van'
        ? (data = 'van_trip_id')
        : (data = 'rapido_trip_id');
      return data;
    },

    formatTripsData(mode, data) {
      let results = {};
      if (mode.toLowerCase() == 'bike') {
        results = {
          bike_trip_id: data,
          van_trip_id: null,
          rapido_trip_id: null,
        };
      } else if (mode.toLowerCase() == 'van') {
        results = {
          bike_trip_id: null,
          van_trip_id: data,
          rapido_trip_id: null,
        };
      } else if (mode.toLowerCase() == 'rapido') {
        results = {
          bike_trip_id: null,
          van_trip_id: null,
          rapido_trip_id: data,
        };
      }
      return results;
    },

    getUserData(value, key, index) {
      this.schedule[index][key] = value;
      this.schedule[index] = { ...this.schedule[index] };
    },

    addSchedule() {
      let data = this.schedule;
      let mode = this.formdata?.logistics_mode;
      for (let i = 0; i < data.length; i++) {
        data[i].week = i + 1;
        if (data[i]?.selectedTrip) {
          let trip = [];
          for (let j = 0; j < data[i].selectedTrip.length; j++) {
            trip[j] = this.formatTripsData(mode, data[i]?.selectedTrip[j]);
            data[i].trips = trip;
          }
        }
      }
      this.formData.schedule = data;
      this.formData.status = 'Scheduled';
    },

    checkValidations() {
      this.schedule.forEach((item, idx) => {

        if (!item.selectedTrip.length && !Object.values(item).includes(true)) {
          this.isFormValid = false;
          this.error[idx].message = `Days & Trips Not selected`;
          return;
        } else if (!item.selectedTrip.length) {
          this.isFormValid = false;
          this.error[idx].message = `Trips not selected`;
          return;
        } else if (!Object.values(item).includes(true)) {
          this.isFormValid = false;
          this.error[idx].message = `Days not selected`;
          return;
        } else {
          this.isFormValid = true;
          this.error[idx].message = '';
        }
      });
      if (!this.isFormValid)
        this.toaster('Something Went Wrong', 'error', 'Error Message');
    },

    toaster(data, Severity, Summary) {
      this.$toast.add({
        severity: Severity,
        summary: Summary,
        detail: data,
        life: 3000,
      });
    },

    patchData(data) {
      this.POSTPATCHCRUDOPERATION({
        path: API.SLIPS + data?.id,
        data: data,
        method: 'PATCH',
        loadData: 'Masscollection/fetchStdCollectionSlipsTableData',
        closeDialogue: 'Masscollection/closeDialog',
        toastData: {
          toastSuccessData: {
            toastMsg: `Template is updated successfully!`,
            toastSeverity: 'success',
          },
          toastDuplicateErrorData: {
            toastMsg: `Template already exists !`,
            toastSeverity: 'error',
          },
          toastCommonErrorData: {
            toastMsg: 'There was an error in updating the Template, try again!',

            toastSeverity: 'error',
          },
        },
      });
    },

    submitData() {
       this.addSchedule();
       this.checkValidations();
      if(this.isFormValid){
        this.patchData(this.formData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.monthlyWeeklySchedule {
  border: 1px solid #c3c3c3;
}
.weeklySchedule {
  padding: 15px 40px;
}

.trips_col {
  padding: 0.85rem 0.75rem;
}

.check_label {
  color: #7a7a7a;
  font-size: 14px;
}

.scheduleShow {
  border: 1px solid #c3c3c3;
  height: 45px;
}

.error_message {
  .pi {
    font-size: 1.25rem !important;
    line-height: unset !important;
  }
  color: red !important;
  display: flex;
  align-items: center;
}

::v-deep.p-checkbox .p-checkbox-box.p-highlight {
  border-color: #2196f3 !important;
  background: none !important;
}

::v-deep.p-checkbox .p-checkbox-box .p-checkbox-icon {
  color: #2196f3 !important;
}

::v-deep.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  color: #7a7a7a !important;
}
</style>
