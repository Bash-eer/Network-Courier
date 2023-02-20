<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div v-for="(data, index) in state.zonesList" :key="index">
        <div class="formgrid grid">
          <div
            class="field"
            v-bind:class="{
              'col-12 md:col-6': state.zonesList.length-1 == index,
              'col-12 md:col-5': state.zonesList.length-1 != index
            }"
          >
            <h5 class="required dialog-label-text">Zone</h5>
            <TextField
              label="profile_name"
              v-model="data.zone_name"
              @blur="data.zone_name"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v.zonesList.$each.$response.$errors[index].zone_name
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div
            class="field"
            v-bind:class="{
              'col-12 md:col-6': state.zonesList.length-1 == index,
              'col-12 md:col-5': state.zonesList.length-1 != index,
            }"
          >
            <h5 class="required dialog-label-text">Zone Tag</h5>
            <TextField
              label="profile_name"
              v-model="data.zone_tag"
              @blur="data.zone_tag"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v.zonesList.$each.$response.$errors[index].zone_tag.length !==
                    0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div
            class="
              field
              col-12
              md:col-2
              flex
              justify-content-center
              align-items-end
            "
            v-if="state.zonesList.length-1 != index"
          >
            <span class="remove-item cursor-pointer" @click="removeItem(index)"
              ><i class="pi pi-times"></i
            ></span>
          </div>
        </div>
      </div>
      <div v-if="!zoneCreationId">
        <span class="add-item pl-2" @click="addItem()"
          > <i class="pi pi-plus"></i> Add Zone</span
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
          :loading="isZoneCreation"
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

export default {
  name: "zoneCreationDialog",
  props: ["selectedTab"],
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
      isZoneCreation: false,
      zoneCreationId: null,
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ['createdAt', 'ASC'],
      }
    };
  },
  methods: {
    ...mapActions({
      createBikeZone: "operationZones/createBikeZoneData",
      createVanZone: "operationZones/createVanZoneData",
      createRapidoZone: "operationZones/createRapidoZoneData",
      updateBikeZone: "operationZones/updateBikeZoneData",
      updateVanZone: "operationZones/updateVanZoneData",
      updateRapidoZone: "operationZones/updateRapidoZoneData",
      vanDataFetch: "operationZones/loadVanTableData",
      rapidoDataFetch: "operationZones/loadRapidoTableData",
      bikeDataFetch: "operationZones/loadBikeTableData",
    }),
    closeDialog() {
      this.$store.state["operationZones"].displayDialog = false;
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v.$invalid) {
        return;
      }
      this.isZoneCreation = true;
      this.paginationParams.offset = this.pageOffset;
      this.paginationParams.limit = this.pageLimit;
      if (!this.zoneCreationId) {
        if (this.selectedTab == "VanTab") {
          this.addVanZoneData();
        } else if (this.selectedTab == "RapidoTab") {
          this.addRapidoZoneData();
        } else {
          this.addBikeZoneData();
        }
      } else {
        if (this.selectedTab == "VanTab") {
          this.editVanZoneData();
        } else if (this.selectedTab == "RapidoTab") {
          this.editRapidoZoneData();
        } else {
          this.editBikeZoneData();
        }
      }
    },
    async addBikeZoneData() {
      try {
        let data = {
          zones: this.state.zonesList,
        };
        let response = await this.createBikeZone(data);
        if (response && response.status === 200) {
          let info = "Bike zone created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.bikeDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create bike zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addVanZoneData() {
      try {
        let data = {
          zones: this.state.zonesList,
        };
        let response = await this.createVanZone(data);
        if (response && response.status === 200) {
          let info = "Van zone created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.vanDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create van zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addRapidoZoneData() {
      try {
        let data = {
          zones: this.state.zonesList,
        };
        let response = await this.createRapidoZone(data);
        if (response && response.status === 200) {
          let info = "Rapido zone created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.rapidoDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create rapido zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editBikeZoneData() {
      try {
        let data = {
          zones: {
            zones: this.state.zonesList[0] || {},
          },
          id: this.zoneCreationId,
        };
        let response = await this.updateBikeZone(data);
        if (response && response.status === 200) {
          let info = "Bike zone updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.bikeDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update bike zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editVanZoneData() {
      try {
        let data = {
          zones: {
            zones: this.state.zonesList[0] || {},
          },
          id: this.zoneCreationId,
        };
        let response = await this.updateVanZone(data);
        if (response && response.status === 200) {
          let info = "Van zone updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.vanDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update van zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editRapidoZoneData() {
      try {
        let data = {
          zones: {
            zones: this.state.zonesList[0] || {},
          },
          id: this.zoneCreationId,
        };
        let response = await this.updateRapidoZone(data);
        if (response && response.status === 200) {
          let info = "Rapido zone updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.operationZones.tableLoad = true;
          this.rapidoDataFetch(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update rapido zone";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
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
  computed: {
    ...mapGetters({ zoneFormData: "operationZones/getEditZonesData", filterParams: "operationZones/getFilterParams", pageOffset: "operationZones/getPageOffset", pageLimit: "operationZones/getPageLimit" }),
  },
  created() {
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
