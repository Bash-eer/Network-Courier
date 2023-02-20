<template>
  <div>
    <div class="scollable-body">
      <h6>Job Type</h6>
      <div class="flex flex-row">
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="typeData.express"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">Express</h6>
        </div>
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="typeData.rapido"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">Rapido</h6>
        </div>
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="typeData.international"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">
            International
          </h6>
        </div>
      </div>

      <h6 class="mt-2">Logistics Mode</h6>

      <div class="flex flex-row">
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="logisticsTypeData.bike"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">Bike</h6>
        </div>
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="logisticsTypeData.van"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">Van</h6>
        </div>
        <div class="flex align-items-center font-bold border-round p-2">
          <Checkbox
            v-model="logisticsTypeData.rapido"
            :binary="true"
            :aria-disabled="true"
          />
          <h6 class="pl-2 font-size-14 bold-600 color-1e90ff mt-2">Rapido</h6>
        </div>
      </div>
    </div>

    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <Buttons
          label="Filter"
          button_class="dialog-button-text"
          @click="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { reactive } from "vue";
import Checkbox from "primevue/checkbox";

export default {
  name: "MapFilterComponent",
  props: ["selectedTab", "JobTypedata", "logisticsData"],
  cities: [],
  components: {
    Checkbox,
  },
  setup() {
    const rules = {
      zonesList: {
        $each: helpers.forEach({
          zone_name: { required },
          zone_tag: { required },
        }),
      },
    };
    const state = reactive({
      zonesList: [
        {
          zone_name: "",
          zone_tag: "",
        },
      ],
    });
    const v = useVuelidate(rules, state);
    return { v, state };
  },
  data() {
    return {
      submitted: false,
      data: {
        express: false,
        rapido: false,
        international: false,
      },
      logistics: {
        bike: false,
        van: false,
        rapido: false,
      },
      selectedLogistics: [],
      isZoneCreation: false,
      zoneCreationId: null,
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
      typeData: {},
      logisticsTypeData: {}
    };
  },
  methods: {
    ...mapActions({
      createBikeZone: "operationZones/createBikeZoneData",
      liveJobRiderFilterApi: "LiveMapStore/liveJobRiderFilterApi",
    }),

    submitData() {
      let dataArr = [];
      let keyArr = [];

      let selectData = {
        jobTypeValue: this.typeData,
        logisticsValue: this.logisticsTypeData 
      }
      this.$emit('updateSelectedCheckBox', selectData)
      for (const property in this.typeData) {
        if (this.typeData[property]) {
          dataArr.push(property);
        }
      }
      for (const property in this.logisticsTypeData) {
        if (this.logisticsTypeData[property]) {
          keyArr.push(property);
        }
      }
      let postData = {
        orderBy: ["display_name", "DESC"],
        logistics_mode: keyArr,
        booking_type: dataArr,
      };

      console.log(keyArr , 'likeeeeeee', dataArr)
      this.liveJobRiderFilterApi(postData);
      this.$store.state["LiveMapStore"].filterHeaderDialog = false;
    },
    addItem() {
      let data = {
        zone_name: "",
        zone_tag: "",
      };
      this.state.zonesList.push(data);
    },
    removeItem(index) {
      this.state.zonesList.splice(index, 1);
    },
    loadInitialData() {
      if (Object.keys(this.zoneFormData).length != 0) {
        this.state.zonesList = [];
        let zoneFormData = {
          zone_name: this.zoneFormData.zone_name,
          zone_tag: this.zoneFormData.zone_tag,
        };
        this.zoneCreationId = this.zoneFormData.id;
        this.state.zonesList.push(zoneFormData);
      } else {
        this.zoneCreationId = null;
      }
    },
    commonToast(severity, summary, message) {
      this.isZoneCreation = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  watch: {

  },
  computed: {
    ...mapGetters({
      zoneFormData: "operationZones/getEditZonesData",
      filterParams: "operationZones/getFilterParams",
      pageOffset: "operationZones/getPageOffset",
      pageLimit: "operationZones/getPageLimit",
    }),
  },
  created() {
    this.typeData = this.JobTypedata;
this.logisticsTypeData = this.logisticsData
    this.loadInitialData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.required {
  color: $color-7a7a7a !important;
}
.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.add-item,
.add-item > i {
  color: #1e90ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.add-item > i {
  font-size: 10px !important;
}
.custom-modal-height {
  height: 30vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 23px;
  right: 0;
}
.scollable-body {
  height: 23vh;
  overflow: auto;
}
::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
}
</style>
