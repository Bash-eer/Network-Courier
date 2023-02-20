<template>
  <div>
    <div class="flex flex-row mt-2">
      <div class="flex">
        <RadioButton
          id="network_courier"
          name="network_courier"
          value="Network Courier"
          v-model="details.contact_type"
        />
        <label class="Radio-Button ml-2 mr-4 cursor-pointer" for="network_courier"
          >Network Courier</label
        >
      </div>
      <div class="flex">
        <RadioButton
          id="personal_contact"
          name="personal_contact"
          value="Personal"
          v-model="details.contact_type"
        />
        <label class="Radio-Button ml-2 cursor-pointer" for="personal_contact"
          >Personal Contact</label
        >
      </div>
    </div>
    <div class="flex justify-content-between ml-2 mt-3 mb-3">
      <div class="flex">
        <ImgUpload :state="contactImageState" URL="/images/profile-here.png" />
      </div>
    </div>
    <br />
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text TextStyleHeader">Employee Name</h5>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <!--:value="details.surname" @change="getSurname"-->
            <select  name="salutation" id="salutation">
              <option value="mr">Mr</option>
              <option value="ms">Ms</option>
              <option value="mrs">Mrs</option>
            </select>
          </span>
          <TextField
            label="name"
            type="text"
            v-model="details.name"
            @blur="v$.details.name.$model"
            :classes="{
              'p-invalid': v$.details.name.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Nick Name</h5>
        <TextField
          label="nick_name"
          type="text"
          v-model="details.nick_name"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text TextStyleHeader">Mobile No</h5>
         <InputMask mask="99 99 99 99 99"  
         v-model="details.mobile_no"
          @blur="v$.details.mobile_no.$model"
         :classes="{
            'p-invalid': v$.details.mobile_no.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
         /> 
      </div>
    </div>
    <div class="formgrid grid">
      <!-- <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Email</h5>
        <TextField
          label="email"
          type="text"
          v-model="details.email"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div> -->
      <div class="field col-12 md:col-4">
        <label class=" dialog-label-text TextStyleHeader" for="Email ID"
          >Email</label
        >
        <TextField
          id="email"
          type="text"
          label="email"
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
            <small class="p-error">{{ error}}</small>
            <!-- <small class="p-error">{{ error.$message }}</small> -->
          </span>
        </span>
        <!-- <small
          v-else-if="
            (v$.details['email'].$invalid && submitted) ||
            v$.details['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details["email"].required.$message.replace("Value", "Email")
          }}</small
        > -->
      </div>
      
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Religion</h5>
        <TextField
          label="religion"
          type="text"
          v-model="details.religion"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Race</h5>
        <TextField
          label="race"
          type="text"
          v-model="details.race"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text color-357dea"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import InputMask from 'primevue/inputmask';
export default {
  name: "BasicDetails",
  components: { RadioButton , InputMask},
  data: () => ({
    contactImageState: "",
    ContactDialogCategories: [
      { name: "Network Courier", key: "1" },
      { name: "Personal Contact", key: "2" },
    ],
    v$: useVuelidate(),
    details: {
      contact_type: "Network Courier",
      name: "",
      nick_name: "",
      mobile_no: null,
      email: "",
      religion: "",
      race: "",
      surname: "",
    },
    email:"",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        name: { required },
        email:{email},
        mobile_no: { required },
      },
    };
  },
  methods: {
     phoneNumberMask(){
        const x = this.formData.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        this.formData.phone = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    getSurname(e){
          this.details.surname = e.target._value
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
         var select = document.getElementById('salutation');
var text = select.options[select.selectedIndex].text;
this.details['surname'] = text + '.';
        for (let d in this.details) {
          this.$store.state.contacts.contactsFormData[d] = this.details[d];
        }
        this.$store.state.sales.stepperNavigation = "ResidenceDetails";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        for (let state in this.details) {
          this.details[state] =
            this.$store.state.contacts.contactsFormStateData[state];
        }
        this.$store.state.fleets.globalImageUploadURL =
          this.$store.state.contacts.contactsFormStateData["image_url"];
        this.contactImageState =
          this.$store.state.contacts.contactsFormStateData["image_url"];
      }
    },
  },
  created() {
    this.loadState();
//      var select = document.getElementById('salutation');
//  select.options[select.selectedIndex].text = "ms"
  },


 
};
</script>

<style scoped>
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.TextStyleHeader{
/* font-family: Montserrat; */
font-style: normal;
font-weight: 500 !important;
font-size: 14px !important;
color: #7A7A7A;
}
.Radio-Button{
  color: #919191;
  font-size: 12px;
  font-weight: 700;
}
TextField{
  font-weight: 700;
  color: #212121;
}
.p-multiselect-label {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: left;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.blue {
  color: #3057ff;
}
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
}
</style>
