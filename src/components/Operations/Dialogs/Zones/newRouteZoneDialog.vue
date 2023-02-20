<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div class="col-12 md:col-5 field pl-0">
        <h5 class="required dialog-label-text">Zone</h5>
        <TextField
          label="profile_name"
          v-model="zoneName"
          @blur="zoneName"
          :disabled="true"
          v-on:childToParent="getUserInput"
          class="disabled-text"
        />
      </div>
      <div><h4 class="font-size-16 sub-title">Routes</h4></div>
      <div v-for="(data, index) in state.routeList" :key="index">
        <div class="formgrid grid">
          <div class="col-12 md:col-2 field">
            <h5 class="required dialog-label-text">Route Tag</h5>
            <TextField
              label="profile_name"
              v-model="data.route_tag"
              @blur="data.route_tag"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v.routeList.$each.$response.$errors[index].route_tag
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="col-12 md:col-2 field">
            <h5 class="required dialog-label-text">Route Name</h5>
            <TextField
              label="profile_name"
              v-model="data.route_name"
              @blur="data.route_name"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v.routeList.$each.$response.$errors[index].route_name
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="col-12 md:col-2 field">
            <h5 class="required dialog-label-text">Max Load</h5>
            <NumberField
              v-model="data.max_load"
              :disabled="false"
              mode="decimal"
              :max="0"
              :maxFractionDigits="2"
              :useGrouping="false"
              :classes="{
                'p-invalid':
                  v.routeList.$each.$response.$errors[index].max_load.length !==
                    0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="col-12 md:col-1 field d-flex align-items-end">
            <div class="field-radiobutton mb-1">
              <RadioButton
                id="personalCard"
                name="CBD"
                :value="true"
                v-model="data.cbd"
                class="mt-2"
                :class="{
                  'disabled-text': !data.cbd,
                  'active-text': data.cbd,
                }"
              />
              <label
                for="CBD"
                class="font-size-14 mt-2"
                :class="{
                  'disabled-text': !data.cbd,
                  'active-text': data.cbd,
                }"
                >CBD</label
              >
            </div>
            <!-- <RadioButton
                id="personalCard"
                name="CBD"
                value=""
                v-model="data.paid_with"
                class="mt-2"
              />
              <label class="d-flex justift-content-center align-items-end mb-0 ml-2" for="personalCard"
                >CBD
              </label> -->
          </div>
          <div class="col-12 md:col-1 field d-flex align-items-end">
            <div class="field-radiobutton mb-1">
              <RadioButton
                id="personalCard"
                name="NCBD"
                :value="true"
                v-model="data.ncbd"
                class="mt-2"
                :class="{
                  'disabled-text': !data.ncbd,
                  'active-text': data.ncbd,
                }"
              />
              <label
                for="NCBD"
                class="font-size-14 mt-2"
                :class="{
                  'disabled-text': !data.ncbd,
                  'active-text': data.ncbd,
                }"
                >NCBD</label
              >
            </div>
          </div>
          <div class="col-12 md:col-3 field d-flex align-items-end">
            <div class="field-radiobutton mb-1">
              <label for="Outskirts" class="font-size-14 outskirt-text"
                >Outskirts</label
              >
              <!-- <RadioButtons
                label="platform"
                state="radioButtonCompany"
                v-bind:radioButtonData="outskirtsCategories"
                v-model="data.outskirts"
                :class="{
                  'disabled-text': !data.outskirts,
                  'active-text': data.outskirts,
                }"
                @change="bindRadioButtonValue($event)"
              /> -->
              <RadioButton
                id="personalCard"
                name="Yes"
                :value="true"
                v-model="data.outskirts"
                class="mt-2"
                :class="{
                  'disabled-text': !data.outskirts,
                  'active-text': data.outskirts,
                }"
              />
              <label
                for="NCBD"
                class="font-size-14 mt-2 mr-3"
                :class="{
                  'disabled-text': !data.outskirts,
                  'active-text': data.outskirts,
                }"
                >Yes</label
               >
               <RadioButton
                id="personalCard"
                name="No"
                :value="false"
                v-model="data.outskirts"
                class="mt-2"
                :class="{
                  'disabled-text': data.outskirts,
                  'active-text': !data.outskirts,
                }"
              />
              <label
                for="NCBD"
                class="font-size-14 mt-2"
                :class="{
                  'disabled-text': data.outskirts,
                  'active-text': !data.outskirts,
                }"
                >No</label
               >
            </div>
          </div>
          <div
            class="
              field
              col-12
              md:col-1
              flex
              justify-content-center
              align-items-end
            "
            v-if="state.routeList.length-1 != index"
          >
              <span class="remove-item cursor-pointer" @click="removeItem(index)"
                ><i class="pi pi-times"></i
              ></span>
          </div>
        </div>
      </div>
      <div v-if="!routeCreationId">
        <span class="add-item pl-2" @click="addItem()"
          >
          <i class="pi pi-plus"></i> Add Routes</span
        >
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isRouteCreation"
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
import { errhandler } from "@/services/httpClient";
import RadioButton from "primevue/radiobutton";

export default {
  name: "newRouteZoneDialog",
  components: {
    RadioButton,
  },
  props: ["selectedTab", "zoneId"],
  setup() {
    const rules = {
      routeList: {
        $each: helpers.forEach({
          route_name: { required },
          route_tag: { required },
          max_load: { required },
        }),
      },
    };
    const state = reactive({
      routeList: [
        {
          route_name: "",
          route_tag: "",
          max_load: "",
          cbd: false,
          ncbd: false,
          outskirts: false,
        },
      ],
    });
    const v = useVuelidate(rules, state);
    return { v, state };
  },
  data() {
    return {
      submitted: false,
      zoneName: "",
      disabled: false,
      isRouteCreation: false,
      routeCreationId: null,
      outskirtsCategories: [
        { name: "Yes", key: true },
        { name: "No", key: false },
      ],
      paginationParams: {
      id: null,
      pagination: {
        offset: 1,
        limit: 10,
        orderBy: ['createdAt', 'ASC'],
      },
     }
    };
  },
  methods: {
    ...mapActions({
      createBikeRoute: "operationZonesRoute/createBikeRouteData",
      createVanRoute: "operationZonesRoute/createVanRouteData",
      createRapidoRoute: "operationZonesRoute/createRapidoRouteData",
      updateBikeRoute: "operationZonesRoute/updateBikeRouteData",
      updateVanRoute: "operationZonesRoute/updateVanRouteData",
      updateRapidoRoute: "operationZonesRoute/updateRapidoRouteData",
      vanRouteDataFetch: "operationZonesRoute/loadVanRouteData",
      rapidoRouteDataFetch: "operationZonesRoute/loadRapidoRouteData",
      bikeRouteDataFetch: "operationZonesRoute/loadBikeRouteData",
    }),
    submitData() {
      this.submitted = true;

      if (this.v.$invalid) {
        return;
      }
      this.paginationParams.id =  this.$store.state.operationZonesRoute.zoneId;
      this.paginationParams.pagination.offset = this.pageOffset;
      this.paginationParams.pagination.limit = this.pageLimit;

      this.isRouteCreation = true;
      if (!this.routeCreationId) {
        if (this.selectedTab == "VanTab") {
          this.addVanRouteData();
        } else if (this.selectedTab == "RapidoTab") {
          this.addRapidoRouteData();
        } else {
          this.addBikeRouteData();
        }
      } else {
        if (this.selectedTab == "VanTab") {
          this.editVanRouteData();
        } else if (this.selectedTab == "RapidoTab") {
          this.editRapidoRouteData();
        } else {
          this.editBikeRouteData();
        }
      }
    },
    async addBikeRouteData() {
      try {
        let data = {
          zone_id: this.zoneId,
          routes: this.state.routeList,
        };
        let response = await this.createBikeRoute(data);
        if (response && response.status === 200) {
          let info = "Bike route created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
          this.bikeRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create bike route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addVanRouteData() {
      try {
        let data = {
          zone_id: this.zoneId,
          routes: this.state.routeList,
        };
        let response = await this.createVanRoute(data);
        if (response && response.status === 200) {
          let info = "Van route created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
          this.vanRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create van route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addRapidoRouteData() {
      try {
        let data = {
          zone_id: this.zoneId,
          routes: this.state.routeList,
        };
        let response = await this.createRapidoRoute(data);
        if (response && response.status === 200) {
          let info = "Rapido route created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
          this.rapidoRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create rapido route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editBikeRouteData() {
      try {
        let data = {
          routes: {
            routes: this.state.routeList[0] || {},
          },
          id: this.routeCreationId,
        };
        let response = await this.updateBikeRoute(data);
        if (response && response.status === 200) {
          let info = "Bike route updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
           this.bikeRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update bike route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editVanRouteData() {
      try {
        let data = {
          routes: {
            routes: this.state.routeList[0] || {},
          },
          id: this.routeCreationId,
        };
        let response = await this.updateVanRoute(data);
        if (response && response.status === 200) {
          let info = "Van route updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
          this.vanRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update van route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editRapidoRouteData() {
      try {
        let data = {
          routes: {
            routes: this.state.routeList[0] || {},
          },
          id: this.routeCreationId,
        };
        let response = await this.updateRapidoRoute(data);
        if (response && response.status === 200) {
          let info = "Rapido route updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZonesRoute.tableLoad = true;
           this.rapidoRouteDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update rapido route";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    closeDialog() {
      this.$store.state["operationZonesRoute"].displayDialog = false;
    },
    initializeData() {
      this.zoneName = this.$route.params.zoneName || this.$store.state["operationZonesRoute"].selectedZoneName;
      if (Object.keys(this.routeZoneFormData).length != 0) {
        this.state.routeList = [];
        this.routeCreationId = this.routeZoneFormData.id;
        this.state.routeList.push(this.routeZoneFormData);
      } else {
        this.routeCreationId = null;
      }
    },
    addItem() {
      let data = {
        route_name: "",
        route_tag: "",
        max_load: "",
        cbd: false,
        ncbd: false,
        outskirts: false,
      };
      this.state.routeList.push(data);
    },
    removeItem(index) {
      this.state.routeList.splice(index, 1);
    },
    commonToast(severity, summary, message) {
      this.isRouteCreation = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  created() {
    this.initializeData();
  },
  computed: {
    ...mapGetters({ routeZoneFormData: "operationZonesRoute/getEditRouteZonesData", pageOffset: "operationZonesRoute/getPageOffset", pageLimit: "operationZonesRoute/getPageLimit" }),
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
  height: 42vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 32vh;
  overflow: auto;
}
.disabled-text.p-inputtext {
  color: #a9a9a9;
  font-weight: 600;
  font-size: 14px;
}
.sub-title {
  font-weight: 600;
  color: $color-4e5968;
}

.disabled-text.p-inputtext.p-inputtext-sm {
  color: #c4c4c4;
}

.disabled-text {
  color: #d6dfef;
}
.active-text {
  color: $color-357dea;
  font-weight: 700;
}
.outskirt-text {
  color: $color-4e5968;
  font-weight: 700;
  margin-right: 10px;
  margin-top: 9px;
}
::v-deep .p-field-radiobutton .p-radiobutton-checked .categories > b {
  font-size: 13px;
  color: $color-357dea;
  font-weight: 700;
}
.fa-check:before {
  color: $color-66c11e;
}
::v-deep i.pi.pi-times {
    color: red;
    font-weight: 600;
    font-size: 16px;
    align-items: center;
}
</style>
