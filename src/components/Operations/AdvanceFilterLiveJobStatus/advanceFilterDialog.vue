<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div class="formgrid grid mt-4">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            From Date
          </h5>
          <div clas="flex">
            <div class="whiteDiv calendarDiv">
              <Calendar
                class="contactsCalendar"
                v-model="filterFormData.from_date"
                :showIcon="true"
                style="width: 100%"
                :class="{
                  'p-invalid':
                    v$.filterFormData.from_date.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1950:2050"
              />
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            To Date
          </h5>
          <div clas="flex">
            <div class="whiteDiv calendarDiv">
              <Calendar
                class="contactsCalendar"
                v-model="filterFormData.to_date"
                :showIcon="true"
                style="width: 100%"
                :class="{
                  'p-invalid': v$.filterFormData.to_date.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1950:2050"
              />
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            Job Type
          </h5>
          <Dropdown
            v-model="filterFormData.job_type"
            :value="filterFormData.job_type"
            :options="jobTypeList"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">Zone</h5>
          <Dropdown
            v-model="filterFormData.zone"
            :value="filterFormData.zone"
            :options="zoneList"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-8">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            Customer Name
          </h5>
          <TextField
            label="customer_name"
            v-model="filterFormData.customer_name"
            @blur="filterFormData.customer_name"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-12 p-fluid">
          <h5 class="dialog-label-text">Additional Filter</h5>
          <MultiSelect
            v-model="filterFormData.additional_filter"
            :options="additionalFilterList"
            optionLabel="name"
            :filter="true"
            @change="changeAdditionalFilter"
            placeholder="Select additional filter"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            display="chip"
          />
        </div>
        <!-- <div class="flex flex-row flex-wrap col-12 md:col-12">
          <span class="field-checkbox pr-4">
            <Checkbox v-model="filterFormData.booked_via" :binary="true" />
            <label
              for="unitno"
              class="dialog-label-text line-height-28 font-size-14"
              >Only SMS Jobs</label
            >
          </span>
          <span class="field-checkbox pr-4">
            <Checkbox v-model="filterFormData.project_job" :binary="true" />
            <label
              for="floorno"
              class="dialog-label-text line-height-28 font-size-14"
              >Exclude Project Jobs</label
            >
          </span>
          <span class="field-checkbox pr-4">
            <Checkbox v-model="filterFormData.status" :binary="true" />
            <label
              for="floorno"
              class="dialog-label-text line-height-28 font-size-14"
              >Exclude Cancel Jobs</label
            >
          </span>
          <span class="field-checkbox">
            <Checkbox v-model="filterFormData.home_address" :binary="true" />
            <label
              for="floorno"
              class="dialog-label-text line-height-28 font-size-14"
              >Only Home Address</label
            >
          </span>
        </div> -->
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Clear"
          @click="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Apply"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isAdvanceFilter"
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
//import Checkbox from "primevue/checkbox";
import MultiSelect from "primevue/multiselect";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  name: "AdvanceFilterDialog",
  props: ["selectedTab", "filterList"],
  components: {
    Dropdown,
    //Checkbox,
    MultiSelect,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isAdvanceFilter: false,
      filterFormData: {},
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
      additionalFilterList: [
        { id: 1, name: "Special Monitoring" },
        { id: 2, name: "Cash Sales" },
        { id: 3, name: "Only SMS Jobs" },
        { id: 4, name: "Exclude Project Jobs" },
        { id: 5, name: "Exclude Cancel Jobs" },
        { id: 6, name: "Only Home Address" },
      ],
      advanceFilterList: [],
    };
  },
  validations() {
    return {
      filterFormData: {
        from_date: { required },
        to_date: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      showAdvanceFilterDialog: "liveJobStatus/showFilterDialog",
      loadJobDetails: "liveJobStatus/getJobTypeData",
      loadZoneDetails: "liveJobStatus/getZoneData",
      loadCustomerData: "liveJobStatus/getCustomerNameData",
      updateAdvanceFilter: "liveJobStatus/updateAdvanceFilterOnLiveJobStatus",
    }),
    async closeDialog() {
      let filteredList = this.setFilterList({});
      let data = {
        filter_params: filteredList,
        formData: null,
        currentTab: this.selectedTab,
      };
      this.updateAdvanceFilter(data);
    },
    setFilterList(formData) {
      let filteredList = this.advanceFilterList || {};

      filteredList["createdAt"].constraints[0].value = [];
      filteredList["createdAt"].constraints[0].value[0] =
        formData?.from_date || "";
      filteredList["createdAt"].constraints[0].value[1] =
        formData?.to_date || "";
      filteredList["job_type"].constraints[0].value = formData?.job_type || "";
      filteredList["zone.zone_name"].constraints[0].value =
        formData?.zone || "";
      filteredList["company_details.company_name"].constraints[0].value =
        formData?.customer_name || "";
      return filteredList;
    },
    async submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }

      let filteredList = this.setFilterList(this.filterFormData);
      let data = {
        filter_params: filteredList,
        formData: this.filterFormData,
        currentTab: this.selectedTab,
      };
      this.updateAdvanceFilter(data);
    },
    changeAdditionalFilter(event) {
      let additionalFilter = event.value;
      for (let data of additionalFilter) {
        if (data.name == "Special Monitoring") {
          this.advanceFilterList[
            "special_monitoring"
          ].constraints[0].value = true;
          this.advanceFilterList["job_type"].constraints[0].value =
            "Assignment";
          this.filterFormData.job_type = "Assignment";
        } else if (data.name == "Cash Sales") {
          this.advanceFilterList["customer_type"].constraints[0].value =
            "Adhoc";
        } else if (data.name == "Only SMS Jobs") {
          this.advanceFilterList["booked_via"].constraints[0].value = "SMS";
        } else if (data.name == "Exclude Project Jobs") {
          this.advanceFilterList["project_job"].constraints[0].value = false;
        } else if (data.name == "Exclude Cancel Jobs") {
          this.advanceFilterList["project_job"].constraints[0].value =
            "Cancelled";
          this.advanceFilterList["project_job"].constraints[0].matchMode =
            FilterMatchMode.NOT_EQUALS;
        } else if (data.name == "Only Home Address") {
          this.advanceFilterList["home_address"].constraints[0].value = true;
        }
      }
    },
  },
  created() {
    this.advanceFilterList = this.filterList || {};
    this.loadJobDetails();
    this.loadZoneDetails();
    this.loadCustomerData();
    if (this.selectedTab == "BikeTab") {
      this.filterFormData = this.bikeFilterForm || {};
    } else if (this.selectedTab == "VanTab") {
      this.filterFormData = this.vanFilterForm || {};
    } else {
      this.filterFormData = this.rapidoFilterForm || {};
    }
  },
  computed: {
    ...mapGetters({
      jobTypeList: "liveJobStatus/getJobTypeListData",
      zoneList: "liveJobStatus/getZoneListData",
      customerNameList: "liveJobStatus/getCustomerNameListData",
      bikeFilterForm: "liveJobStatus/getBikeFilterFormData",
      vanFilterForm: "liveJobStatus/getVanFilterFormData",
      rapidoFilterForm: "liveJobStatus/getRapidoFilterFormData",
    }),
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
</style>
