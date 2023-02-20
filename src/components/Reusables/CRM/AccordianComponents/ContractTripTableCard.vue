<template>
  <div>
    <div
      class="
        flex
        align-items-start
        justify-content-start
        font-bold
        text-white
        border-round
        my-2
      "
    >
      <h6 class="color-4e5968 bold-700">Contracted Trip Timing</h6>
    </div>

    <div
      class="
        flex
        justify-content-between
        contract-card
        flex-row
        h-1.1rem
        w-auto
        border-radius-8
        py-3
      "
    >
      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">Name</h3>
        </div>
        <div v-for="(i, index) of contract_trips_shows"
                :key="index">
          <h3 class="font-size-12 color-fff text-left">
            {{ i?.trip_no??"" }}
          </h3>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">From</h3>
        </div>
        <div v-for="(i, index) of contract_trips_shows"
                :key="index">
          <h3 class="font-size-12 color-fff text-left">
            {{ i?.from_time??"" }}
          </h3>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">To</h3>
        </div>
          <div v-for="(i, index) of contract_trips_shows"
                :key="index" class="flex">
            <h3 class="font-size-12 color-fff text-left">
              {{ i?.to_time??"" }}
            </h3>
          </div>
      </div>
      <div class="flex flex-column flex-grow-1 mx-2">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">Type</h3>
        </div>
        <div  v-for="(i, index) of contract_trips_shows"
                :key="index">
          <h3 class="font-size-12 color-fff text-left">
            {{ i?.trip_type??"" }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { crmCusLState, crm_launch } from "../../../../store/modules/CRM/helper";
export default {
  name: "ContractTripTableCard",
  data() {
    return {
      emptyData: "",
    };
  },
  computed: {
    ...crmCusLState,
  },
  watch: {
    "$store.state.CustomerLaunchStore.rapidoCallDataRow": function (newVal, oldVal) {
      this.$emit('emittedTimeState', newVal)
    },
  },
  methods:{
    DateFormat(value){
      return value? moment(value).format("Do MMM, YYYY") : ''
    }
  }
};
</script>

<style scoped>
.contract-card {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  min-height: 13vh;
}
</style>
