<template>
  <div>
    <!-- MAIN CONTENT -->
    <div class="weeklySchedule">
      <div class="weeks grid">
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="mon"
            name="weekCategory"
            :binary="true"
            v-model="scheduleDay.monday"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            @input="getUserData($event, 'monday')"
          />
          <label class="check_label" for="mon">Monday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="tue"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.tuesday"
            @input="getUserData($event, 'tuesday')"
          />
          <label class="check_label" for="tue">Tuesday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="wed"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.wednesday"
            @input="getUserData($event, 'wednesday')"
          />
          <label class="check_label" for="wed">Wednesday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="thur"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.thursday"
            @input="getUserData($event, 'thursday')"
          />
          <label class="check_label" for="thur">Thursday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="fri"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.friday"
            @input="getUserData($event, 'friday')"
          />
          <label class="check_label" for="fri">Friday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="sat"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.saturday"
            @input="getUserData($event, 'saturday')"
          />
          <label class="check_label" for="sat">Saturday</label>
        </div>
        <div class="col-3 align-items-center">
          <Checkbox
            class="mr-3"
            inputId="sun"
            name="weekCategory"
            :binary="true"
            :class="{
              'p-invalid': v$.scheduleDay.$invalid && !isValid,
            }"
            v-model="scheduleDay.sunday"
            @input="getUserData($event, 'sunday')"
          />
          <label class="check_label" for="sun">Sunday</label>
        </div>
      </div>
      <hr />
      <div class="trip">
        <div class="grid" v-if="tripsDataForSchedule !== null">
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
import { API } from './const';
export default {
  components: { Checkbox },
  props: ['formdata', 'formValid'],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      scheduleDay: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      isValid: this.formValid ?? true,
      scheduleData: {},
      mockTrips,
      selectedDay: [],
      selectedTrip: [],
      formData: {},
      schedule: [],
    };
  },
  validations() {
    return {
      scheduleDay: { required },
      selectedTrip: { required },
    };
  },
  created() {
    this.loadData();
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

    loadData() {
      this.formData = this.formdata;
      if (this.formdata && this.formdata.schedule.length) {
        this.schedule = this.formdata?.schedule;
        let logisticKey = this.getLogisticKeys(this.formData?.logistics_mode);
        // stores trips
        for (let i = 0; i < this.schedule[0]?.trips.length; i++) {
          this.selectedTrip[i] = this.schedule[0]?.trips[i][logisticKey];
        }
        this.scheduleDay = this.filterObject(this.schedule[0]);
      }
    },

    getLogisticKeys(mde) {
      const mode = mde.toLowerCase();
      let data = '';
      mode == 'bike'
        ? (data = 'bike_trip_id')
        : mode == 'van'
        ? (data = 'van_trip_id')
        : (data = 'rapido_trip_id');
      return data;
    },

    filterObject(payload) {
      let data = payload;
      let keys = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];
      if (data) {
        const filterdObj = Object.keys(data)
          .filter((key) => keys.includes(key))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: data[key],
            });
          }, {});

        return filterdObj;
      }
    },

    getUserData(value, fieldName) {
      this.scheduleDay[fieldName] = value;
      this.scheduleDay = { ...this.scheduleDay };
    },

    closeDialog() {
      this.closeScheduleDialog(false);
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

    addSchedule() {
      let data = {};
      let trips = [];
      data = { ...this.scheduleDay };
      data.date = null;
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

    filterKeys(payload) {
      let data = payload;
      let result = Object.keys(data).filter((e) => data[e] === true);
      return result;
    },

    patchData(data) {
      this.POSTPATCHCRUDOPERATION({
        path: API.SLIPS + data.id,
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
.weeklySchedule {
  border: 1px solid #c3c3c3;
  padding: 15px 40px;
}

.trips_col {
  padding: 0.85rem 0.75rem;
}

.check_label {
  color: #7a7a7a;
  font-size: 14px;
}

::v-deep.p-checkbox .p-checkbox-box.p-highlight {
  border-color: #2196f3 !important;
  background: none !important;
}

::v-deep.p-checkbox .p-checkbox-box .p-checkbox-icon {
  color: #2196f3 !important;
}

.scheduleShow {
  border: 1px solid #c3c3c3;
  height: 45px;
}
</style>
