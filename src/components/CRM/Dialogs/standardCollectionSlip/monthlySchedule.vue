<template>
  <div>
    <!-- MAIN CONTENT  -->
    <div class="monthlySchedule">
      <div class="check_label mx-5 mb-3">Select Dates</div>
      <div class="flex grid justify-content-between">
        <div class="monthly col-7">
          <div class=" mt-1 grid calender"  :class="{'invalid': v$.selectedDate.$invalid && !isValid}">
            <div
              v-for="(itm, idx) of days"
              :key="idx"
              class="days"
              :class="{ 'activeDay': itm === selectedDate }"
              @click="onSelectDate(itm)"
            >
              {{ itm }}
            </div>
          </div>
        </div>
        <div class="trip col mx-3 flex align-items-center">
          <div class="grid">
            <div class="grid" v-if="tripsDataForSchedule !== null">
              <div
                v-for="(itm, idx) of tripsDataForSchedule"
                :key="idx"
                class="flex-initial my-2 justify-content-center align-items-center trips_col"
              >
                <Checkbox
                  class="mr-3"
                  :inputId="itm.trip_code"
                  name="tripCategory"
                  :value="itm.id"
                  :class="{
                    'p-invalid': v$.selectedTrip.$invalid && !isValid,
                  }"
                  v-model="selectedTrip"
                />
                <label class="check_label" :for="itm.trip_code">{{
                  itm.trip_code
                }}</label>
              </div>
            </div>
            <div v-else>No Trip</div>
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
import Checkbox from 'primevue/checkbox';
import { scheduleDays, mockTrips } from './const';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { API, NUMBER } from './const';
import { range } from 'lodash';
export default {
  components: { Checkbox },
  props: ['formdata', 'formValid'],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      scheduleDays,
      isValid: this.formValid ?? true,
      mockTrips,
      selectedDate: null,
      selectedTrip: [],
      formData: {},
      schedule: [],
      days: [],
    };
  },
  validations() {
    return {
      selectedDate: { required },
      selectedTrip: { required },
    };
  },
  created() {
    this.loadData();
    this.generateDaysArray();
  },
  computed: {
    ...mapGetters({
      tripsDataForSchedule: 'Masscollection/getTripsForSchedule',
    }),
  },
  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: 'Masscollection/POSTPATCHCRUDOPERATION',
    }),
    ...mapMutations({
      closeScheduleDialog: 'Masscollection/setScheduleDialog',
    }),
    closeDialog() {
      this.closeScheduleDialog(false);
    },

    onSelectDate(value) {
      this.selectedDate = value;
    },

    generateDaysArray() {
      const totalDays = 31;
      this.days = range(NUMBER.ONE, totalDays + 1);
    },

    loadData() {
      this.formData = this.formdata;
      if (this.formdata && this.formdata?.schedule.length) {
        this.schedule = this.formdata?.schedule;
        let logisticKey = this.getLogisticKeys(this.formData?.logistics_mode);
        // stores trips
        for (let i = 0; i < this.schedule[0]?.trips.length; i++) {
          this.selectedTrip[i] = this.schedule[0]?.trips[i][logisticKey];
        }
        this.selectedDate = this.schedule[0].date;
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

    formatTripsData(mde, data) {
      let mode = mde.toLowerCase();
      let results = {};
      if (mode == 'bike') {
        results = {
          bike_trip_id: data,
          van_trip_id: null,
          rapido_trip_id: null,
        };
      } else if (mode == 'van') {
        results = {
          bike_trip_id: null,
          van_trip_id: data,
          rapido_trip_id: null,
        };
      } else if (mode == 'rapido') {
        results = {
          bike_trip_id: null,
          van_trip_id: null,
          rapido_trip_id: data,
        };
      }
      return results;
    },

    addSchedule() {
      let data = {};
      let trips = [];
      data.date = this.selectedDate;
      data.week = null;
      for (let i = 0; i < this.selectedTrip.length; i++) {
        trips[i] = this.formatTripsData(
          this.formData?.logistics_mode,
          Number(this.selectedTrip[i])
        );
      }
      data.trips = trips;
      this.schedule[0] = data;
      this.formData.schedule = this.schedule;
      this.formData.status = 'Scheduled';
    },

    checkvalidations() {
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit('isFormValid', false);
      } else {
        this.$emit('isFormValid', true);
      }
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
      this.checkvalidations();
      this.addSchedule();
      if (this.v$.$invalid && !this.isValid) return;
      this.patchData(this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid {
  border: 1px solid red !important;
}
.monthlySchedule {
  border: 1px solid #c3c3c3;
  padding: 15px 0;
}

.trips_col {
  padding: 0.85rem 0.75rem;
}

.monthly {
  border-right: 1px solid #c3c3c3;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.trip {
  padding: 20px 20px !important;
}

.check_label {
  color: #7a7a7a;
  font-size: 14px;
}

.scheduleShow {
  border: 1px solid #c3c3c3;
  height: 45px;
}

.calender {
  border: 1px solid #c3c3c3;
  padding: 0.8rem 0.8rem 0.6rem 0.8rem;
  border-radius: 5px;

  .days {
    flex: 0 0 auto;
    padding: 0.8rem 0.7rem;
    width: 14%;
    text-align: center;
    font-size: 0.85rem;
    color: #333333;
    cursor: pointer;
  }
}

.activeDay {
  background: #2196f3 !important;
  color: #fff !important;
  border-radius: 100% !important;
}

::v-deep.p-checkbox .p-checkbox-box.p-highlight {
  border-color: #2196f3 !important;
  background: none !important;
}

::v-deep.p-checkbox .p-checkbox-box .p-checkbox-icon {
  color: #2196f3 !important;
}

::v-deep.p-datepicker-group-container {
  width: 300px !important;
}

::v-deep.customCalender .p-datepicker table td {
  padding: 0.1rem !important;
}

::v-deep.customCalender .p-datepicker table td > span {
  color: #7a7a7a !important;
}
::v-deep.customCalender .p-datepicker table th > span {
  color: #7a7a7a !important;
}

::v-deep.customCalender .p-datepicker .p-datepicker-header {
  padding: unset !important;
}

::v-deep.customCalender .p-datepicker table td > span.p-highlight {
  color: white !important;
  background: #2196f3 !important;
}

::v-deep.customCalender .p-datepicker table td > span:focus {
  box-shadow: unset !important;
}
</style>
