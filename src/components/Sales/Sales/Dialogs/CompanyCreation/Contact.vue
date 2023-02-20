<template>
  <br />
  <br />
  <p class="ml-2 color-4e5868 font-size-12 bold-800">Contact</p>
  <div>
    <div v-for="(contact, index) of addContacts" :key="contact">
      <div class="flex justify-content-between ml-2">
        <div class="flex">
          <!-- {{ details.contacts[index].profile_url }} -->
          <ImgUpload
            @file="getFile($event, index)"
            URL="/images/profile-here.png"
            class="mt-0 mb-2"
            :state="details.contacts[index].profile_url"
          />
          <!-- <ImgUpload URL="/images/profile-here.png" /> -->
          <!-- <ImgUpload :URL="details.contacts[index].profile_url" /> -->
        </div>
        <div
          class="flex delete"
          v-if="index > 0 && contact == 'new_contact'"
          @click="deleteContact(index)"
        >
          <i class="fas fa-times"></i>
        </div>
      </div>
      <br />
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="color-7a7a7a font-size-14">Person Name</h5>
          <!-- salutation -->
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <select
                name="salutation"
                id="salutation"
                v-model="details.contacts[index].salutation"
              >
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <!-- <option value="opel">Opel</option>
    <option value="audi">Audi</option> -->
              </select>
            </span>

            <TextField
              label="Person"
              type="text"
              v-model="details.contacts[index].contact_name"
              :classes="{
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="color-7a7a7a font-size-14">Contact No</h5>
          <TextField
            label="Contact"
            type="number"
            v-model="details.contacts[index].contact_no"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="color-7a7a7a font-size-14">Email Id</h5>
          <TextField
            label="Email"
            type="text"
            v-model="details.contacts[index]['email']"
            :classes="{
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
          <!-- 
            @blur="v$.details.contacts[index]['email'].$model;"
            'p-invalid': v$.details.contacts[index]['email'].$invalid && submitted,
            <span v-if="v$.details.contacts[index]['email'].$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.details.contacts[index]['email']
                .$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.details.contacts[index]['email'].$invalid && submitted) ||
              v$.details.contacts[index]['email'].$pending.$response
            "
            class="p-error"
            >{{
              v$.details.contacts[index]["email"].required.$message.replace(
                "Value",
                "Email"
              )
            }}</small
          > -->
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="color-7a7a7a font-size-14">Mobile No</h5>
            <TextField
              label="Contact"
              type="number"
              v-model="details.contacts[index].mobile_no"
              :classes="{
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-content-between">
      <div class="flex">
        <span class="new_contact Contact" @click="addContact"
          ><b>+ Add Contact</b></span
        >
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
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesSales" />
        <Buttons
          v-on:childToParent="submitRedirectHandler"
          label="Go to Quotation"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { salesCommon } from "../../../../../store/helper";
import { crm_launch } from "../../../../../store/modules/CRM/helper";
import { mapGetters,mapActions } from "vuex";
import moment from "moment";
export default {
  name: "Contact",
  data: () => ({
    didItWork: "",
    addContactdefault: 0,
    addContacts: ["new_contact"],
    addContactClicked: 0,
    details: {
      contacts: [
        {
          profile_url: "",
          contact_name: "",
          contact_no: "",
          email: "",
          designation: "",
          mobile_no: "",
          salutation: "Mr",
        },
      ],
    },
    email: "",
    submitted: false,
  }),
  computed: {
    ...mapGetters({
      salesTabAddNewData: "salesSales/salesTabAddNewData",
    }),
  },

  methods: {
    ...salesCommon,
    ...crm_launch,
   
    getFile(value, index) {
      if (value) {
        this.details.contacts[index].profile_url = value?.fileLink;
      }
    },
    addContact() {
      this.details.contacts.push({
        profile_url: "",
        contact_name: "",
        contact_no: "",
        email: "",
        designation: "",
        mobile_no: "",
        salutation: "Mr",
      });
      this.addContactClicked++;
      this.addContacts.push("new_contact");
    },
    deleteContact(index) {
      this.details.contacts.splice(index, 1);
      this.addContacts.splice(index, 1);
      this.addContactClicked++;
    },

    goBackHandler() {
      this.$store.dispatch("salesSales/navigateStepper", {
        step: "Address",
      });
    },
    async submitRedirectHandler() {
      if (this.$store.state["salesSales"].companyCreationStateData.id) {
        this.$store.state.salesSales.SalesRedirectToQuotation = true;
        this.$store.state.salesSales.SalesRedirectToQuotationId =
          this.$store.state["salesSales"].companyCreationStateData.id;
        await this.submitData();
      } else {
        this.$store.state.salesSales.SalesRedirectToQuotation = true;
        await this.submitData();
      }
    },
    async submitData() {
      for (let i in this.details) {
        this.salesTabAddNewData[i] = this.details[i];
      }

      this.salesTabAddNewData.contact_name =
        this.salesTabAddNewData.salutation +
        "." +
        this.salesTabAddNewData.contact_name;
        let id;
      if (this.$store.state["salesSales"].companyCreationStateData.id) {
        await this.apiPatchCallHandler();
      } else {
       id=  await this.apiCallHandler();
      }
      this.loadSalesTabData();
      if (this.$route.path.includes("CustomerLaunch")) {
        this.crmbookingFunc(id)
      }
    },
    async crmbookingFunc(id){
      let data = {
          booking_type:"Adhoc",
          customer_type:"Express",
          profile_id: id,
          charge_type: "Normal",
          date: moment().format()
        };
        await this.getCrmCollerDropDown({ type: "Adhoc", id:id });
        await this.postSelectedCostCenter(data).then((c) => {
         this.successFun(id)
        });
    },
    async successFun(id){
       let idData = id;
        await this.getCrmBookingDetails(idData);
        this.fetchState({ surchargeDropDownListState: [] });
this.getAdhocSurcharges({
            payload: { postal_code: "657656" },
            toast: this.$toast,
          });
          await this.getCrmCollerDropDown({ type: "Adhoc", id: idData });
await this.getCustomerDData({
          c_type: "Express",
          b_type: "Adhoc",
          toast: this.$toast,
        });
        this.$router.push({
          name: "customerDetailsCrm",
          params: {
            type: "Adhoc",
          },
        });
    },
   async apiCallHandler() {
      if (this.$route.path.includes("CustomerLaunch")) {
        this.salesTabAddNewData['from_crm']=true
      }else{
        this.salesTabAddNewData['from_crm']=false
      }
    let profile_id= await this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path: "/sales/profile",
        data: this.salesTabAddNewData,
        method: "POST",

        loadData: "loadSalesTabData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
      return profile_id;
    },
    apiPatchCallHandler() {
      this.$store.dispatch("salesSales/POSTPATCHCRUDOPERATION", {
        path:
          "/sales/profiles/" +
          this.$store.state["salesSales"].companyCreationStateData.id,
        data: this.salesTabAddNewData,

        method: "PATCH",
        loadData: "loadSalesTabData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    async populateContacts() {
      let contactsStateData =
        this.$store.state["salesSales"].companyCreationStateData
          .company_contacts;
      console.log(contactsStateData, "contact data");
      if (contactsStateData.length > 0) {
        this.addContacts = [];
        this.details.contacts = [];
        for (let cs in contactsStateData) {
          this.addContacts.push("existing_contact");
          let cd_obj = contactsStateData[cs];
          let detailsContactObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "contact_name" ||
              cd_obj_keys == "contact_no" ||
              cd_obj_keys == "email" ||
              cd_obj_keys == "designation" ||
              cd_obj_keys == "id" ||
              cd_obj_keys == "mobile_no" ||
              cd_obj_keys == "salutation" ||
              cd_obj_keys == "profile_url"
            ) {
              detailsContactObj[cd_obj_keys] = cd_obj[cd_obj_keys];
            }
          }
          this.details.contacts.push(detailsContactObj);
        }
      }
    },
  },
  async created() {
    if (
      Object.keys(this.$store.state["salesSales"].companyCreationStateData)
        .length != 0
    ) {
      await this.populateContacts();
    }
  },
  watch: {
    "$store.state.salesSales.salesProfileCreatedId": function () {},
  },
  unmounted() {
    this.$store.state.salesSales.SalesRedirectToQuotationId = null;
    this.$store.state.salesSales.SalesRedirectToQuotation = false;
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

.blue {
  color: #3057ff;
}

/* salutation */
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
  color: #212121;
  font-size: 14px;
  font-weight: 700;
}

::v-deep .p-inputtext {
  color: #212121;
  font-size: 14px;
  font-weight: 700;
}
</style>
