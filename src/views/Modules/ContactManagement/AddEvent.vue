<template>
  <div class="contact-event-add-event-wrapper">
    <br /><br />
    <!--top-card cover image-->
    <div class="contact-event-add-event-top-wrapper cursor-pointer">
      <!-- <div class="flex justify-content-center align-items-center h-full">
        <img src="/images/contact-event-cover-img.png" alt="" />
      </div> -->
      <CoverImageUpload URL="/images/cover-pic.png" state="" />
    </div>
    
    <!--absolute image-->
   <div class="contact-event-add-event-absolute-wrap pointer-cursor">
      <!-- <div class="flex justify-content-center align-items-center h-full">
        <img src="/images/contact-event-event-img.png" alt="" />
      </div> -->
      <EventImageUpload URL="/images/event-img.png" state="" />
    </div> 
    
    <br />
    <br />
    <!--center components-->
    <div class="grid mx-7">
      <!--left component-->
      <div class="col-6 contact-event-add-event-left-component">
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Event Name</h5>
            <TextField
              label="event_name"
              v-model="details['event_name']"
              @blur="v$.details['event_name'].$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.details['event_name'].$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">From Date & Time</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  :showTime="true"
                  :showSeconds="true"
                  dateFormat="d MM yy"
                  class="fleetsCalendar"
                  v-model="details.from_date_time"
                  :showIcon="true"
                  style="width: 100%"
                  :monthNavigator = "true"
                  :yearNavigator="true"
   yearRange="1950:2050"
   
                />
              </div>
            </div>
          </div>

          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">To Date & Time</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  :showTime="true"
                  :showSeconds="true"
                  dateFormat="d MM yy"
                  class="fleetsCalendar"
                  v-model="details.to_date_time"
                  :showIcon="true"
                  style="width: 100%"
                    :monthNavigator = "true"
                  :yearNavigator="true"
                   yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Contact Person</h5>
            <TextField
              label="contact_person"
              v-model="details['contact_person']"
              @blur="v$.details['contact_person'].$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.details['contact_person'].$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <!-- <label class="required dialog-label-text" for="Email ID"
          >Contact E-mail</label
        > -->
            <h5 class="required dialog-label-text">Contact E-mail</h5>
            <TextField
              id="Email ID"
              type="text"
              label="Email ID"
              v-model="details['email']"
              @blur="v$.details['email'].$model"
              placeholder="e.g. Tommy@gmail.com"
              v-on:childToParent="FormInput"
              :classes="{
                'p-invalid': v$.details['email'].$invalid && submitted,
                'dialog-label-text dialog-field-text': true,
              }"
            ></TextField>
            <span v-if="v$.details['email'].$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.details['email'].$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.details['email'].$invalid && submitted) ||
                v$.details['email'].$pending.$response
              "
              class="p-error"
              >{{
                v$.details["email"].required.$message.replace("Value", "Email")
              }}</small
            >
          </div>

          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Contact No</h5>
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
        </div>
      </div>
      <!--right component-->
      <div class="col-6 contact-event-add-event-right-component">
        <!--google-map-->
        <GoogleMap
          api-key="AIzaSyBqmYAYo7avti-jDXV6Rh_gHKLaIKkM0AE"
          style="width: 668px; height: 376px"
          :center="center"
          :zoom="15"
          class="map"
        >
          <Marker
            :key="index"
            v-for="(m, index) in markerOptions"
            :options="m"
          />
        </GoogleMap>
      </div>
    </div>
    <!--center-bottom-component-->
    <div class="mx-8">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="dialog-label-text">Enter the Address</h5>
            <TextField
              label="address"
              type="text"
              v-model="details.address"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Postal Code</h5>
          <TextField
            label="postalCode"
            type="number"
            v-model="details.postal_code"
            @blur="v$.details.postal_code.$model;"
            :classes="{
              'p-invalid': v$.details.postal_code.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Country</h5>
          <DropDown
            :data="Country"
            :state="details.country"
            label="country"
            code="code"
            v-model="details.country"
            @blur="v$.details.country.$model;"
            :classes="{
              'p-invalid': v$.details.country.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">State</h5>
          <DropDown
            :data="State"
            :state="details.state"
            label="state"
            code="code"
            v-model="details.state"
            :value="details.state"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Building Name</h5>
          <TextField
            label="building_name"
            v-model="details.building_name"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Floor No</h5>
          <TextField
            label="floorNo"
            v-model="details.floor_no"
            v-on:childToParent="getUserInput"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Unit No</h5>
          <TextField
            label="unitNo"
            v-model="details.unit_no"
            v-on:childToParent="getUserInput"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Subject</h5>
          <TextAreaField
            :state="details.subject"
            label="receipt_remarks"
            v-model="details.subject"
            @blur="v$.details.subject.$model;"
            :classes="{
              'p-invalid': v$.details.subject.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>

        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Remarks</h5>
          <TextAreaField
            :state="details.remarks"
            label="receipt_remarks"
            v-model="details.remarks"
            @blur="v$.details.remarks.$model;"
            :classes="{
              'p-invalid': v$.details.remarks.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <!--end of center fields -->
    <div class="flex flex-row justify-content-between mx-8">
      <div>Invites (45)</div>
      <div>
        <!-- Create Group button -->
        <Buttons
          button_class="p-button-sm p-button-outlined mr-4 add-btn custom-add-btn"
          label="Create Group"
          v-on:childToParent="openDialog()"
        />
      </div>
    </div>
    <br>
    <!--accordions-->
    <div class="mx-8">
      <div v-for="data in accordionData" :key="data">
      <Accordion class="accordion-custom m-2">
        <AccordionTab>
          <template #header>
            <span class="accordion-text">{{data.main_group_name}}</span>
          </template>

          <!--accordion-body-->
           <div v-for="subData in data.subgroupData" :key="subData">
          <Accordion class="accordion-custom m-2">
            <AccordionTab>
              <template #header>
                <span class="accordion-text">{{subData.sub_group_name}}</span>
              </template>

              <!--accordion-body-->
              <div class="flex flex-row">
                <span>Total Members : 45</span>
                <span> &nbsp;|&nbsp;</span>
                <span>Table No : 01</span>
              </div>
              <!--body cards-->
              <!-- v-for="(subdata, index) in data.peopleData"
                  :key="subdata" -->
              <div class="flex flex-wrap m-2">
                <div v-for="(subpeopledata) in subData.peopleData" :key="subpeopledata" class="card contact-add-event-small-cards m-1 mx-2">
                  <div class="flex flex-row align-items-center">
                    <img
                      :src="subpeopledata.imgUrl"
                      alt="avatar"
                      class="m-1 "
                      width="32"
                      height="35"
                    />

                    <span class="contact-event-attendance-title mx-1 mr-2"
                      >{{subpeopledata.name}}</span
                    >

                    <span
                      class="
                        delete-icon
                        flex
                        justify-content-center
                        align-items-center
                      "
                      >x</span
                    >
                  </div>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
           </div>
          <!--accordion-body-->
        </AccordionTab>
      </Accordion>
      </div>
    </div>
    <!--accordions-->
    <!--create button --> 
    <br>
    <div class="mx-8">
    <div class="flex justify-content-end align-items-end w-100">
       <Buttons
          label="Create Event"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
    </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { GoogleMap, Marker } from "vue3-google-map";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
 import CoverImageUpload from "../../../components/ContactManagement/CoverImageUpload.vue"
 import EventImageUpload from "../../../components/ContactManagement/EventImageUpload.vue"
export default {
  components: {
    GoogleMap,
    Marker,
    Accordion,
    AccordionTab,
     CoverImageUpload,
     EventImageUpload
  },
  data: () => ({
    v$: useVuelidate(),

    accordionData: [
      {
        main_group_name: "Main Group Name 1",
        subgroupData: [
          {
            sub_group_name: "Sub Group Name 1",
            peopleData: [
              { imgUrl: "/images/avatar.png", name: "Jasmine" },
              { imgUrl: "/images/avatarTwo.png", name: "Tommy" },
            ],
          },
          {
            sub_group_name: "Sub Group Name 2",
            peopleData: [
              { imgUrl: "/images/avatar.png", name: "Jasmine" },
              { imgUrl: "/images/avatarTwo.png", name: "Tommy" },
            ],
          },
        ],
      },
      {
        main_group_name: "Main Group Name 2",
        subgroupData: [
          {
            sub_group_name: "Sub Group Name 1",
            peopleData: [
              { imgUrl: "/images/avatar.png", name: "Jasmine" },
              { imgUrl: "/images/avatarTwo.png", name: "Tommy" },
              { imgUrl: "/images/avatar.png", name: "Jasmine" },
              { imgUrl: "/images/avatarTwo.png", name: "Tommy" },
            ],
          },
       
        ],
      },
    ],

    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State", code: "C1" },
      { name: "State", code: "C2" },
    ],
    details: {
      event_name: "",
      from_date_time: "",
      to_date_time: "",
      contact_person: "",
      email: false,
      contact_no: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      subject: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        event_name: { required },
        from_date_time: { required },
        to_date_time: { required },
        contact_person: { required },
        email: false,
        contact_no: { required },

        postal_code: { required },
        country: { required },
        subject: { required },
        remarks: { required },
      },
    };
  },
   created() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    },
};
</script>

<style scoped>
.contact-event-add-event-wrapper {
  background: #fff;
}
.contact-event-add-event-top-wrapper {
  background-color: #c4c4c4;
  width: 84.5rem;
  height: 15.688rem;
  margin: auto;
}
.contact-event-add-event-absolute-wrap {
  z-index: 1;
  width: 265px;
  height: 173px;
  background-color: #ffffff;
  /* border: 1px solid #f7efef; */
  /* box-sizing: border-box; */
  margin-left: 9rem;
  margin-top: -8rem;
  box-shadow: 10px 14px 14px rgba(0, 0, 0, 0.25), 10px 10px 10px rgba(0, 0, 0, 0.22);
}
.map {
  margin: auto;
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: #357dea;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 2% !important;
  color: #357dea;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 8px 8px !important;
  border: 2px solid #d9e8ff !important;
}
::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
}
::v-deep .p-accordion-content {
  background-color: transparent !important;
  border-radius: 8px 8px 8px 8px !important;
  /* border-color: #357DEA !important; */
  border: 2px solid #d9e8ff !important;
}
.contact-add-event-small-cards {
  position: relative;
  background: #ffffff;
  border: 0.2px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -7px;
  margin-right: -7px;
  width: 19.36px;
  height: 19.36px;
  background: #fff;
  box-shadow: 0px 5.60477px 5.60477px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
}
.contact-event-attendance-title{
  font-family: Montserrat;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: 15px;
letter-spacing: 0.03em;
text-align: left;
color: #7E84A7;
}
/* ::v-deep .p-datepicker .p-datepicker-header .p-datepicker-title select{
  border: none ;
      /* transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s; 
      transition: none !important;
      transition: background-color 0.2s, color transparent, border-color transparent, box-shadow 0.2s;
} */
</style>
