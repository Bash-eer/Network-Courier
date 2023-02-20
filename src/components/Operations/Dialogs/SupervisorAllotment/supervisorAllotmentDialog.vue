<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div v-for="(data, index) in state.allotmentList" :key="index">
        <div class="formgrid grid">
          <div
            class="field"
            v-bind:class="{
              'col-12 md:col-6': state.allotmentList.length - 1 == index,
              'col-12 md:col-5': state.allotmentList.length - 1 != index,
            }"
          >
            <h5 class="required dialog-label-text">Zone</h5>

            <DropDown
              label="zone_name"
              :data="zonesList"
              v-model="data.zone_id"
              placeholder="Select a zone"
              :classes="{
                'p-invalid':
                  v.allotmentList.$each.$response.$errors[index].zone_id
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div
            class="field"
            v-bind:class="{
              'col-12 md:col-6': state.allotmentList.length - 1 == index,
              'col-12 md:col-5': state.allotmentList.length - 1 != index,
            }"
          >
            <h5 class="required dialog-label-text">Supervisor</h5>

            <Dropdown
              v-model="data.supervisor_id"
              :options="supervisorList"
              optionLabel="name"
              :filter="true"
              placeholder="Select a Supervisor"
              :class="{
                'p-invalid':
                  v.allotmentList.$each.$response.$errors[index].supervisor_id
                    .length !== 0 && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            >
              <template #value="slotProps">
                <div
                  class="supervisor-item supervisor-item-value flex"
                  v-if="slotProps.value"
                >
                  <img
                    :src="
                      slotProps.value.image_url != 'null'
                        ? slotProps.value.image_url
                        : '../../../../assets/noavatar.png'
                    "
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="supervisor-item flex">
                  <img
                    :src="
                      slotProps.option.image_url != 'null'
                        ? slotProps.option.image_url
                        : '../../../../assets/noavatar.png'
                    "
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
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
            v-if="state.allotmentList.length - 1 != index"
          >
            <span class="remove-item cursor-pointer" @click="removeItem(index)"
              ><i class="pi pi-times"></i
            ></span>
          </div>
        </div>
      </div>
      <div>
        <span class="add-item pl-2" @click="addItem()">
          <i class="pi pi-plus"></i> Add New</span
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
          :loading="isSupervisorAssign"
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
import Dropdown from "primevue/dropdown";

export default {
  name: "supervisorAllotmentDialog",
  props: ["selectedTab"],
  components: {
    Dropdown,
  },
  setup() {
    const rules = {
      allotmentList: {
        $each: helpers.forEach({
          zone_id: { required },
          supervisor_id: { required },
        }),
      },
    };
    const state = reactive({
      allotmentList: [
        {
          zone_id: "",
          supervisor_id: "",
        },
      ],
    });
    const v = useVuelidate(rules, state);
    return { v, state };
  },
  data() {
    return {
      submitted: false,
      isSupervisorAssign: false,
      zonesList: [],
      supervisorList: [],
    };
  },
  methods: {
    ...mapActions({
      createBikeSupervisor: "supervisorAllotment/createBikeSupervisor",
      createVanSupervisor: "supervisorAllotment/createVanSupervisor",
      createRapidoSupervisor: "supervisorAllotment/createRapidoSupervisor",
      vanDataFetch: "supervisorAllotment/loadVanTableData",
      rapidoDataFetch: "supervisorAllotment/loadRapidoTableData",
      bikeDataFetch: "supervisorAllotment/loadBikeTableData",
      fetchZonesList: "assignRouteArea/loadCommonZonesList",
      fetchSupervisorsList: "supervisorAllotment/loadSupervisorsList",
      showSupervisorDialog: "supervisorAllotment/showSupervisorDialog",
    }),
    closeDialog() {
      this.showSupervisorDialog(false);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v.$invalid) {
        return;
      }
      this.isSupervisorAssign = true;

      if (this.selectedTab == "VanTab") {
        this.addVanSupervisorData();
      } else if (this.selectedTab == "RapidoTab") {
        this.addRapidoSupervisorData();
      } else {
        this.addBikeSupervisorData();
      }
    },
    async addBikeSupervisorData() {
      let allotmentList = this.getAllotmentList();
      try {
        let data = {
          zone_supervisor: allotmentList,
        };
        let response = await this.createBikeSupervisor(data);
        if (response && response.status === 200) {
          let info = "Bike supervisor allotment created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;
          this.bikeDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to create bike supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addVanSupervisorData() {
      let allotmentList = this.getAllotmentList();
      try {
        let data = {
          zone_supervisor: allotmentList,
        };
        let response = await this.createVanSupervisor(data);
        if (response && response.status === 200) {
          let info = "Van supervisor allotment created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;
          this.vanDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to create van supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async addRapidoSupervisorData() {
      let allotmentList = this.getAllotmentList();
      try {
        let data = {
          zone_supervisor: allotmentList,
        };
        let response = await this.createRapidoSupervisor(data);
        if (response && response.status === 200) {
          let info = "Rapido supervisor allotment created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;
          this.rapidoDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to create rapido supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    addItem() {
      let data = {
        zone_id: "",
        supervisor_id: "",
      };
      this.state.allotmentList.push(data);
    },
    removeItem(index) {
      this.state.allotmentList.splice(index, 1);
    },
    async loadInitialData() {
      let tabType = {
        type: this.selectedTab,
      };

      let zonesResponse = await this.fetchZonesList(tabType);
      if (zonesResponse && zonesResponse.status === 200) {
        let zonesList = zonesResponse.data?.results || [];
        for (let i = 0; i < zonesList.length; i++) {
          zonesList[i] = {
            ...zonesList[i],
            name: zonesList[i]["zone_name"],
          };
        }
        this.zonesList = zonesList;
      }
      let supervisorListResponse = await this.fetchSupervisorsList(tabType);
      if (supervisorListResponse && supervisorListResponse.status === 200) {
        let supervisorList = supervisorListResponse.data.results || [];
        this.supervisorList = supervisorList;
      }
    },
    commonToast(severity, summary, message) {
      this.isSupervisorAssign = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    getAllotmentList() {
      let allotmentList = this.state.allotmentList.map((res) => {
        return {
          zone_id: res.zone_id.id,
          supervisor_id: res.supervisor_id.id,
        };
      });
      return allotmentList;
    },
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
.supervisor-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
.p-dropdown {
  width: auto;
  height: 32px;
}
</style>
