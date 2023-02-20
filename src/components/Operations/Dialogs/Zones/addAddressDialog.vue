<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Name</h5>
            <TextField
              v-model="addressFormData.area_name"
              @blur="v$.addressFormData.area_name.$model"
              :classes="{
                'p-invalid': v$.addressFormData.area_name.$invalid && submitted,
              }"
            />
          </div>
          <div class="field col-12 md:col-2">
            <h5 class="required dialog-label-text">Postal Code</h5>
            <TextField
              v-model="addressFormData.from_pincode"
              @blur="v$.addressFormData.from_pincode.$model"
              :classes="{
                'p-invalid':
                  v$.addressFormData.from_pincode.$invalid && submitted,
              }"
            />
          </div>
          <div class="field col-12 md:col-2">
            <h5 class="dialog-label-text">Latitude</h5>
            <TextField
              v-model="addressFormData.latitude"
              @blur="addressFormData.latitude"
            />
          </div>
          <div class="field col-12 md:col-2">
            <h5 class="dialog-label-text">Longitude</h5>
            <TextField
              v-model="addressFormData.longitude"
              @blur="addressFormData.longitude"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text">Region 1</h5>
            <TextField
              v-model="addressFormData.region_1"
              @blur="addressFormData.region_1"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text">Region 2</h5>
            <TextField
              v-model="addressFormData.region_2"
              @blur="addressFormData.region_2"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text">Region 3</h5>
            <TextField
              v-model="addressFormData.region_3"
              @blur="addressFormData.region_3"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text">Region 4</h5>
            <TextField
              v-model="addressFormData.region_4"
              @blur="addressFormData.region_4"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Area 1</h5>
            <TextField
              v-model="addressFormData.area_1"
              @blur="addressFormData.area_1"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Area 2</h5>
            <TextField
              v-model="addressFormData.area_2"
              @blur="addressFormData.area_2"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Building Name</h5>
            <TextField
              v-model="addressFormData.building_name"
              @blur="addressFormData.building_name"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text">Building Type</h5>
            <DropDown
              label="Building Type"
              :data="[]"
              placeholder="Select a building type"
              v-model="addressFormData.building_type"
              :filter="true"
              @change="setBuilingTypeData($event)"
            />
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="dialog-label-text">Google Address</h5>
            <TextField
              v-model="addressFormData.google_address"
              @blur="addressFormData.google_address"
            />
          </div>
          <div class="field-checkbox col-12 md:col-12 mt-3">
            <Checkbox v-model="addressFormData.is_residential" :binary="true" />
            <label for="isresidential">Is Residential</label>
          </div>
          <div class="sub-title my-3 pl-1 pb-2">Mandatory Settings</div>
          <div class="flex flex-row col-12 md:col-12">
            <span class="field-checkbox pr-4">
              <Checkbox v-model="addressFormData.unit_no" :binary="true" />
              <label for="unitno">Unit No.</label>
            </span>
            <span class="field-checkbox">
              <Checkbox v-model="addressFormData.floor_no" :binary="true" />
              <label for="floorno">Floor No.</label>
            </span>
          </div>
        </div>
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
          :loading="isAddressCreation"
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
import Checkbox from "primevue/checkbox";

export default {
  name: "addAddressDialog",
  components: {
    Checkbox,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isAddressCreation: false,
      addressFormDataId: null,
      addressFormData: {
        area_name: "",
        from_pincode: "",
        latitude: "",
        longitude: "",
        region_1: "",
        region_2: "",
        region_3: "",
        region_4: "",
        building_name: "",
        building_type: "",
        google_address: "",
        area_1: "",
        area_2: "",
        is_residential: false,
        unit_no: false,
        floor_no: false,
      },
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
    };
  },
  validations() {
    return {
      addressFormData: {
        area_name: { required },
        from_pincode: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      createAddressData: "zoneAreaList/createAddressOnAreaList",
      updateAddressData: "zoneAreaList/updateAddressOnAreaList",
      loadAllAreasList: "zoneAreaList/loadAllAreasData",
    }),
    closeDialog() {
      this.$store.state["zoneAreaList"].displayDialog = false;
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isAddressCreation = true;
      this.paginationParams.offset = this.pageOffset;
      this.paginationParams.limit = this.pageLimit;
      if (!this.addressFormDataId) {
        this.addAddressData();
      } else {
        this.editAddressData();
      }
    },
    async addAddressData() {
      try {
        this.addressFormData.status = "Active";
        let data = this.addressFormData;
        let response = await this.createAddressData(data);
        if (response && response.status === 200) {
          let info = "Address created successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.zoneAreaList.tableLoad = true;
          this.loadAllAreasList(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create the address";
          this.commonToast("error", "Error", info);
        }
        this.isAddressCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editAddressData() {
      try {
        let data = {
          addressParams: this.addressFormData,
          id: this.addressFormDataId,
        };
        let response = await this.updateAddressData(data);
        if (response && response.status === 200) {
          let info = "Address updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.zoneAreaList.tableLoad = true;
          this.loadAllAreasList(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update the address";
          this.commonToast("error", "Error", info);
        }
        this.isAddressCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.addressData).length != 0) {
        this.addressFormData = this.addressData;
        this.addressFormDataId = this.addressData.id;
      } else {
        this.addressFormDataId = null;
      }
    },
    commonToast(severity, summary, message) {
      this.isAddressCreation = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    setBuilingTypeData() {},
  },
  computed: {
    ...mapGetters({
      addressData: "zoneAreaList/getEditAddressData",
      filterParams: "zoneAreaList/getZoneAreaListFilterParams",
      pageOffset: "zoneAreaList/getPageOffset",
      pageLimit: "zoneAreaList/getPageLimit",
    }),
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
.custom-modal-height {
  height: 59vh;
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
  height: 53vh;
  overflow: auto;
}
.sub-title {
  font-weight: 700;
  font-size: 14px;
  color: $color-4e5968;
  font-family: $font-family-third;
}
.field-checkbox {
  color: $color-357dea;
  font-weight: 700;
  font-size: 14px;
  font-family: $font-family-third;
}
::v-deep .p-checkbox .p-checkbox-box {
  width: 18px !important;
  height: 18px !important;
}
</style>
