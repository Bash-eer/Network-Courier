<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-4">
      <div class="mt-3 text_zone ml-3">Rider Allotment</div>
      <SearchField storePath="operationAllotment" class="mt-3 aligment" />
      <Buttons button_class="export_button min-width-99 mt-3" label="Export" />
      <Buttons
        button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 mt-3"
        label="Default Rider Allotment"
        v-on:childToParent="redirect('DefaultRiderAllotment')"
      />
    </div>
    <TabView ref="tabview1">
      <TabPanel header="Allotment">
        <div
          class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center"
        >
          <keep-alive>
            <DuoSelect
              :options="['Bike', 'Van']"
              :default="defaultTransportType"
              type="setRegionDeliveryTransportType"
              class="mt-4"
          /></keep-alive>
        </div>
<keep-alive>
  <div v-if="defaultTransportType == 'Bike'">
        <div class="formgrid grid mt-3" >
          <div class="field col-12 md:col-3">
            <div class="required color-7a7a7a text-sm flex ml-1" for="time24">
              Date
            </div>
            <Calendar
              :showIcon="true"
              selectionMode="range"
              :manualInput="false"
              class="full-width"
              label="from"
              v-model="details.date"
              :class="{
                'p-invalid': v$.details.date.$invalid && submitted,
                'inputfield w-full color-212121 font-bold ': true,
              }"
            />
          </div>
          <keep-alive>
          <div class="field col-12 md:col-3">
            <div class="required color-7a7a7a text-sm flex ml-1" for="time24">
              Zone
            </div>
            <div clas="flex" :key="renderkey">
              <DropDown
                v-model="details.zone"
                code="name"
                label="zone"
                :filter="true"
                :data="zone"
                :state="details.zone"
                :key="details.zone"
                :class="{
                  'p-invalid': v$.details.zone.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold ': true,
                }"
              />
            </div>
          </div>
          </keep-alive>
          <Buttons
            button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 apply_button"
            label="Apply"
            v-on:childToParent="submitData"
          />
        </div>
        <keep-alive>
            <div><BikeTable/></div>
          </keep-alive>
  </div>
</keep-alive>
<keep-alive>
        <div>
          <div v-if="defaultTransportType == 'Van'">
            <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-3">
      <div class="required color-7a7a7a text-sm flex ml-1" for="time24">
        Date
      </div>

      <keep-alive>
        <Calendar
          :showIcon="true"
          selectionMode="range"
          class="full-width"
          label="from"
          v-model="details.dates"
          :class="{
            
            'inputfield w-full color-212121 font-bold ': true,
          }"
      /></keep-alive>
    </div>
    <keep-alive>
    <div class="field col-12 md:col-3">
      <div class="required color-7a7a7a text-sm flex ml-1" for="time24">
        Zone
      </div>
      <div clas="flex" :key="renderkey">
        <DropDown
          v-model="details.zones"
          code="name"
          :filter="true"
          label="zone"
          :data="zoneVan"
          :state="details.zones"
          :key="details.zones"
          :class="{
            
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    </keep-alive>
    <div>
    <Buttons
      button_class="Add_button mr-4 add-btn custom-add-btn min-width-99 apply_button"
      label="Apply"
      v-on:childToParent="submitDataVan"
    /></div>
  </div>
  <div>
  <VanTable /></div></div>
        </div></keep-alive>
      </TabPanel>
      <TabPanel header="Rider History" >
        <div
          class="ml-3 pl-0 mt-2 flex justify-content-start align-items-center"
        >
          
            <DuoSelect
              :options="['Bike', 'Van']"
              :default="defaultTransportTypeHistory"
              type="setRegionDeliveryTransportTypeHistory"
              class="mt-4"
          />
        </div>
        <div v-if="defaultTransportTypeHistory == 'Bike'">
          <RiderAllotmentBike />
        </div>
        <div v-if="defaultTransportTypeHistory == 'Van'">
          <RiderAllotmentVan />
        </div>
      </TabPanel>
    </TabView>
  </div>
  <Toast
    :severity="$store.state['operationAllotment'].toastData.severity"
    :summary="$store.state['operationAllotment'].toastData.summary"
  />
</template>
<script>
import RiderAllotmentVan from "./RiderAllotmentVan.vue";
import RiderAllotmentBike from "./RiderAllotmentBike.vue";
import { mapActions, mapGetters,mapMutations } from "vuex";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import BikeTable from "./BikeTable.vue";
import VanTable from "./VanTable.vue";
import useVuelidate from "@vuelidate/core";
import moment from "moment";
import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { required } from "@vuelidate/validators";
import DuoSelect from "../RiderAllotment/DuoSelect.vue";
import Toast from "../RiderAllotment/Toast.vue";

export default {
  name: "StandbyRiderAllotment",
  components: {
    DuoSelect,
    Toast,
    BikeTable,
    VanTable,
    TabView,
    TabPanel,
    RiderAllotmentBike,
    RiderAllotmentVan,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      defaultTransportType: "Bike",
      defaultTransportTypeHistory:"Bike",
      deliveryComponent: "",
      renderkey: 10,
      details: {
        date: "",
        zone: "",
        zones:"",
        dates:""
      },
      postid: null,
      postData: [],
      databike: {},
      zone: [
        { name: "Deepavali", code: "Deepavali" },
        { name: "Pongal", code: "Pongal" },
      ],
      zones: [
        { name: "Deepavali", code: "Deepavali" },
        { name: "Pongal", code: "Pongal" },
      ],
      zoneVan: [
        { name: "Deepavali", code: "Deepavali" },
        { name: "Pongal", code: "Pongal" },
      ],
      postidVan: null,
    };
  },
  validations() {
    return {
      details: {
        date: { required },
        zone: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      BikedeliveryTypeTableDatatable:
        "TypeSetting/BikedeliveryTypeTableDatatable",
      RiderAllotmentTableColumnData:
        "operationAllotment/RiderAllotmentTableColumnData",
    }),
  },
  methods: {
    ... mapMutations({
      updateBreadCrumbAndTitle: 'users/updateBreadCrumbAndTitle'
    }),
    ...mapActions({
      loadfetchBikeDefaultRiderAllotmentTableData:
        "operationAllotment/loadfetchBikeDefaultRiderAllotmentTableData",
      POSTPATCHCRUDOPERATIONRIDERALLOTMENTBIKE:
        "operationAllotment/POSTPATCHCRUDOPERATIONRIDERALLOTMENTBIKE",
      POSTPATCHCRUDOPERATIONRIDERALLOTMENTVAN:
        "operationAllotment/POSTPATCHCRUDOPERATIONRIDERALLOTMENTVAN",
    }),
    getdata() {},
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        this.databike = {
          from_date: this.dateFormater(this.details.date[0]),
          to_date: this.dateFormater(this.details.date[1]),
        };
        this.$store.state.operationAllotment.DateData = this.databike;
        for (let i in this.zone) {
          if (this.details.zone == this.zone[i].zone_name) {
            this.postid = this.zone[i].id;
          }
        }
        this.addBikeZoneData();
      }
    },
    submitDataVan(){
        this.dataVan = {
          from_date: this.dateFormater(this.details.dates[0]),
          to_date: this.dateFormater(this.details.dates[1]),
          zone: this.details.zones,
        };
        this.$store.state.operationAllotment.DateDataVan = this.dataVan;
        this.$store.state.operationAllotment.DateDataVanprefill =
          this.details.dates;
        for (let i in this.zoneVan) {
          if (this.details.zones == this.zoneVan[i].zone_name) {
            this.postidVan = this.zoneVan[i].id;
          }
        }
        this.addVanZoneData();
      
    },
    addVanZoneData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONRIDERVAN",
        {
          path: "/operations/rider-allotment/vans/" + this.postidVan,
          data: this.dataVan,
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
         
        }
      );
      this.renderkey++;
    },
     dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("YYYY-MM-DD");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    async getZoneDropdownData() {
      this.zone = [];
      await axios
        .get("operations/route-plan/dropdown/zone/bike")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.zone.push(res.data.results[c]);
            }
          }
        });
    },
     async getZoneDropdownDataVan() {
      this.zoneVan = [];
      await axios
        .get("/operations/route-plan/dropdown/zone/van")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.zoneVan.push(res.data.results[c]);
            }
          }
        });
    },
    apiCallHandlerRiderAllotmentBike() {
      this.POSTPATCHCRUDOPERATIONRIDERALLOTMENTBIKE(
        {
          path: "/operations/rider-allot/standby/bike",
          data: [],
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
      this.renderkey++;
    },
    apiCallHandlerRiderAllotmentVan() {
      this.POSTPATCHCRUDOPERATIONRIDERALLOTMENTVAN(
        {
          path: "/operations/rider-allot/standby/van",
          data: [],
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
        }
      );
      this.renderkey++;
    },
    addBikeZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATIONRIDER", {
        path: "/operations/rider-allotment/bikes/" + this.postid,
        data: this.databike,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
      this.renderkey++;
    },
  },
  watch: {
    "$store.state.operationAllotment.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.operationAllotment.addRegionDeliveryTransportType;
        if (this.defaultTransportType == "Rapido") {
          this.deliveryComponent = "DeliveryDataTable";
        }
      },
      "$store.state.operationAllotment.addRegionDeliveryTransportTypeHistory":
      function (){
        this.defaultTransportTypeHistory =
          this.$store.state.operationAllotment.addRegionDeliveryTransportTypeHistory;
      }
  },
  async created() {
     this.updateBreadCrumbAndTitle({
      title: 'Rider Allotment',
      breadcrumbInfo: 'Operations > Rider Allotment'
    })
    this.apiCallHandlerRiderAllotmentBike();
    this.apiCallHandlerRiderAllotmentVan();
    await this.getZoneDropdownData();
    await this.getZoneDropdownDataVan();
    this.getdata();
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.text_zone {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #4e5968;
}
.aligment {
  margin-left: 430px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
.apply_button {
  margin-top: 23px;
  margin-left: 39px;
}
</style>
