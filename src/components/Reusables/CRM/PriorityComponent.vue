<template>
  <div v-if="this.$route.query.type == 'standardCollectionSlips'">
    <div
      class="formgrid grid mr-3 flex justify-content-between align-self-center"
    >
      <div
        class="
          field
          col-9
          md:col-9
          flex
          justify-content-between
          align-self-center
        "
      >
        <div class="formgrid grid field col-12">
          <div class="field col-6 md:col-6 flex">
            <h5 class="color-7a7a7a font-size-14 text-left noWrap mr-1">
              Template No:
            </h5>
            <DropDownField
              :key="renderKey"
              :value="details.template_number"
              code="code"
              :data="region"
              label="region_name"
              @update:modelValue="onChange($event)"
              v-model="details.template_number"
              :class="{
                // 'p-invalid': v$.details.region_id.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-6 md:col-6 flex">
            <h5 class="color-7a7a7a text-sm noWrap mr-1">Effective Date:</h5>
            <Calendar
              label="effective_date"
              type="text"
              showIcon="true"
              v-model="details.effective_date"
              :classes="{
                //'p-invalid': v$.details.effective_date.$invalid && submitted,
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="field col-2 md:col-2 flex justify-content-end">
        <Buttons
          button_class="p-button-sm add-btn custom-add-btn min-width-99 bg-357dea"
          label="Schedule Trip"
          v-on:childToParent="
            openDialog('CompanyCreationDialog', 'salesHome', 'Add New')
          "
        />
      </div>
    </div>
    <div class="flex align-items-center justify-content-center">
      <span class="purpleBox px-8 py-4">
        <span class="font-size-24">Trip 2</span><br />
        <span>2022 feb 7,9,11</span>
      </span>
    </div>
  </div>
  <div class="flex align-items-center m-2 pl-1">
    <div class="flex m-1 font-size-14 bold-500 color-7a7a7a text-nowrap">
      Customer Priority :
    </div>
    <Dropdown
      class="
        dropdown-priority
        border-radius-4
        color-fff
        flex
        justify-content-center
        crm-priority-high
      "
      v-model="selected"
      :options="value"
      optionLabel="name"
      :placeholder="
        gerCrmBookingData?.priority ? gerCrmBookingData.priority : 'High'
      "
      @change="changePriority(selected)"
    />
    <div class="font-size-14 bold-500 color-7a7a7a text-nowrap px-3">
      Booked via :
    </div>
    <Dropdown
      class="
        border-radius-4
        color-fff
        flex
        justify-content-center
        crm-booked-via
        dropdown-booked
      "
      v-model="selectedBook"
      :options="bookedValue"
      optionLabel="call_type"
      :placeholder="
        gerCrmBookingData.booked_via ? gerCrmBookingData.booked_via : 'Whatsapp'
      "
      @change="changeBooked(selectedBook)"
    />
     <div class="font-size-14 bold-500 color-7a7a7a text-nowrap px-3">
      Booking Date :
    </div>
    <div class="col-2">
      <Calendar inputId="dateformat" v-model="date" dateFormat="mm-dd-yy" @date-select="dateSelect" />
    </div>
    
    <div
      class="border-radius-5 bg-b4efc0 color-55ba6b p-1 px-4 crm-charge-type"
    >
      <h4 class="font-size-12 text-nowrap">Charge Type</h4>
      <Dropdown
        v-if="$route.params.type == 'Adhoc'"
        :key="renderKey"
        class="
          flex
          justify-content-center
          bg-transparent
          border-transparent
          cus-dropDown
        "
        @change="onChangeChargeType"
        v-model="select_charge_type"
        :options="charge_type"
        optionLabel="name"
      />
      <!-- <DropDownField
      v-if="$route.params.type=='Adhoc'"
        :key="renderKey"
        :value="select_charge_type"
        code="name"
        :data="charge_type"
        label="charge type"
        @change="onChangeChargeType"
        v-model="select_charge_type"
        :class="{
          'inputfield w-full dialog-dropdown-text bg-transparent border-transparent cus-dropDown': true,
        }"
      /> -->
      <h4
        v-else
        class="text-align-center justify-content-center font-size-16 b-700"
      >
        <b>{{
          gerCrmBookingData.charge_type ? gerCrmBookingData.charge_type.charAt(0).toUpperCase() + gerCrmBookingData.charge_type.slice(1) : ""
        }}</b>
      </h4>
    </div>
  </div>
</template>
<script>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";
import { crm_launch } from "../../../store/modules/CRM/helper";
import moment from "moment";
export default {
  name: "PriorityComponent",
  components: { Dropdown, Calendar },
  props: ["gerCrmBookingData"],
  data() {
    return {
      date:"",
      renderKey: 1,
      details: {
        template_number: "",
        effective_date: "",
      },
      value: [{ name: "High" }, { name: "Low" }],
      selectedid: "name",
      id: [{ name: "CID000123" }, { name: "CID000123" }],
      bookedValue: null,
      selectedBook: null,
      selectedCity: null,
      select_charge_type: null,
      charge_type: [
        { name: "Normal", code: "Normal" },
        { name: "E-Commerce", code: "E-Commerce" },
      ],
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
  watch: {
    // selected: function (newVal, oldVal) {
    //   this.$emit("emittedPriority", newVal.name);
    //   this.$emit("emittedManual", newVal);
    // },
    // selectedBook: function (newVal, oldVal) {
    //   this.$emit("emittedPriorityBook", newVal.call_type);
    //   this.$emit("emittedManual", newVal);
    // },
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      getBookedViaDropDown: "CustomerLaunchStore/getBookedViaDropDown",
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
    }),
    dateSelect(){
      let data={
        ...this.gerCrmBookingData,
        id:this.gerCrmBookingData.id,
        date:this.date
      }
      this.patchCrmCollerData(data)
      //  this.$emit("dateSelect", this.date);
    },
    openDialog(name, type, header) {
      this.$store.dispatch("CustomerLaunchStore/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["CustomerLaunchStore/controlActivityDialog"];
    },
    onChangeChargeType(e) {
      let data = {
        charge_type: e.value.name,
      };
      let data1 = {
        logistics_mode: "Bike",
      };
      this.getJobPriorityEcomerceList({ payload: data1 });
      // this.getJobPriorityListDropDownApi({type:e.value})
      this.$emit("emittedManual", data);
    },

    changePriority(newVal) {
      this.$emit("emittedPriority", newVal);
      this.$emit("emittedManual", newVal);
    },

    changeBooked(newVal) {
      this.$emit("emittedPriorityBook", newVal);
      this.$emit("emittedManual", newVal);
    },
  },
  async created() {
    this.getBookedViaDropDown();
    this.date=moment().format("MM-DD-YYYY")
    this.bookedValue = this.getBookedViaDropDownList;
    this.select_charge_type =
      this.gerCrmBookingData.charge_type == "Normal"
        ? this.charge_type[0]
        : this.charge_type[1];
    this.renderKey++;
  },
  computed: {
    ...mapGetters({
      getBookedViaDropDownList: "CustomerLaunchStore/getBookedViaDropDownList",
      getselectedCostCenterStdCollection:
        "Masscollection/getselectedCostCenterStdCollection",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
    }),
  },
};
</script>
<style scoped>
::v-deep .p-dropdown {
  border: 1px solid #ced4da;
  width: 100%;
}

::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  font-size: 14px;
  display: flex !important;
  justify-content: center !important;
}

::v-deep .p-dropdown .p-dropdown-label {
  display: flex;
}
.dropdown-priority {
  background: #ff5555 !important;
  color: #fff !important;
  width: 10% !important;
}
.dropdown-booked {
  width: 10% !important;
}
.crm-booked-via {
  background: #7e84a7 !important;
  color: white !important;
}
.crm-charge-type {
  margin-left: 22%;
}
.noWrap {
  white-space: nowrap;
  display: flex;
  align-items: center;
}
::v-deep .p-button.p-button-icon-only {
  width: 2.357rem;
  padding: 0.5rem 0;
  background: #357dea !important;
}
::v-deep .purpleBox {
  background: #7469f2;
  border: none;
  padding: 50 px !important;
  color: #fff;
}
.cus-dropDown {
  height: 35px !important;
  width: 120px !important;
}
::v-deep .cus-dropDown .p-dropdown-trigger .p-dropdown-trigger-icon {
  color: black !important;
}
::v-deep .crm-charge-type .cus-dropDown .p-inputtext {
  color: #68c959 !important;
}

::v-deep .crm-booked-via.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
.crm-booked-via.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep .crm-booked-via.p-dropdown .p-dropdown-label {
  color: white !important;
}
.crm-booked-via.p-dropdown .p-dropdown-label {
  color: white !important;
}
::v-deep.crm-priority-high.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
.crm-priority-high.p-dropdown .p-dropdown-label.p-placeholder {
  color: white !important;
}
::v-deep.crm-priority-high.p-dropdown .p-dropdown-label {
  color: white !important;
}
.crm-priority-high.p-dropdown .p-dropdown-label {
  color: white !important;
}
::v-deep .crm-priority-high .p-dropdown-trigger .p-dropdown-trigger-icon {
  color: white !important;
}
::v-deep .crm-booked-via .p-dropdown-trigger .p-dropdown-trigger-icon {
  color: white !important;
}
</style>
