<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required color-7a7a7a font-size-14">Company Name</h5>
        <TextField
          class="color-212121 font-size-14 font-bold"
          label="companyName"
          v-model="details.profile_name"
          @blur="v$.details.profile_name.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.profile_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Trade</h5>
        <DropDown
          :key="renderKey"
          :data="tradeData"
          :state="details.trade"
          label="trade"
          id="trade"
          code="name"
          v-model="details.trade"
          :value="details.trade"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required color-7a7a7a font-size-14">Contact Name</h5>
        <!-- salutation -->
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <select
              name="salutation"
              id="salutation"
              @change="onChange($event)"
              v-model="salutation"
            >
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <!-- <option value="opel">Opel</option>
    <option value="audi">Audi</option> -->
            </select>
          </span>

          <TextField
            label="customerName"
            v-model="details.contact_name"
            @blur="v$.details.contact_name.$model"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details.contact_name.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required color-7a7a7a font-size-14">Contact No</h5>
        <TextField
          label="contactNo"
          type="text"
          v-model="details.contact_no"
          @blur="v$.details.contact_no.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.contact_no.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="required color-7a7a7a font-size-14" for="Email ID"
          >Email</label
        >
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
            'color-7a7a7a font-size-14 dialog-field-text': true,
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
        <h5 class="color-7a7a7a font-size-14">Mobile No</h5>
        <!-- 'p-invalid': v$.details['mobile_no'].$invalid && submitted,-->
        <TextField
          label="mobileNo"
          type="number"
          v-model="details.mobile_no"
          :classes="{
            'color-7a7a7a font-size-14 dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Designation</h5>
        <TextField
          label="designation"
          v-model="details.designation"
          :classes="'inputfield w-full dialog-field-text '"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Fax No</h5>
        <TextField
          label="faxNo"
          type="number"
          v-model="details.fax_no"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Website</h5>
        <TextField
          label="website"
          type="text"
          v-model="details.website"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">ROC No</h5>
        <TextField
          label="rocNo"
          type="text"
          v-model="details.roc_no"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
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
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <CancelButton storePath="salesSales" label="Cancel" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import { salesCommon } from "../../../../../store/helper";
export default {
  name: "Company",
  data: () => ({
    salutation: "Mr",
    renderKey: 1,
    tradeData: [],
    v$: useVuelidate(),
    details: {
      profile_type: "company",
      // profile_url: "",
      profile_name: "",
      trade: "",
      contact_name: "",
      contact_no: "",
      email: "",
      mobile_no: "",
      designation: "",
      fax_no: "",
      website: "",
      roc_no: "",
      status: "Active",
    },
    email: "",
    submitted: false,
  }),
  computed: {
    ...mapGetters({
      salesTabAddNewData: "salesSales/salesTabAddNewData",
    }),
  },
  validations() {
    return {
      details: {
        profile_name: { required },
        contact_name: { required },
        contact_no: { required },
        // mobile_no: { required },
        email: {
          required,
          email,
        },
      },
    };
  },
  methods: {
    ...salesCommon,
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    onChange(event) {
      console.log(event.target.value, "onchange");
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // for (var t in this.tradeData) {
        //   if (this.details.trade == this.tradeData[t].code) {
        //     this.details.trade = this.tradeData[t].name;
        //   }
        // }
        this.details["profile_url"] =
          this.$store.state.fleets.globalImageUploadURL;

        for (let i in this.details) {
          this.salesTabAddNewData[i] = this.details[i];
        }
        //salutation
        this.salesTabAddNewData["salutation"] = this.salutation;
        this.$store.dispatch("salesSales/navigateStepper", {
          step: "Address",
        });
      }
    },
    async trades() {
      const res = await this.getTrades();
      if (res) {
        res.data.results.map((i) => {
          this.tradeData.push({ name: i.trade_name, code: i.id });
        });
      }
      this.renderKey++;
    },
  },
  async created() {
    await this.trades();
    if (
      Object.keys(this.$store.state["salesSales"].companyCreationStateData)
        .length != 0
    ) {
      for (var state in this.details) {
        this.details[state] =
          this.$store.state["salesSales"].companyCreationStateData[state];
        // this.salutation =
      }
      let incomingData =
        this.$store.state["salesSales"].companyCreationStateData;
      let IndexOfDot = incomingData.contact_name.indexOf(".");
      if (IndexOfDot != -1) {
        this.salutation = incomingData.contact_name.slice(0, IndexOfDot);
        console.log(incomingData.contact_name.slice(IndexOfDot + 1));
        this.details.contact_name = incomingData.contact_name.slice(
          IndexOfDot + 1
        );
      }
      this.$store.state.fleets.globalImageUploadURL = incomingData.profile_url;
      // this.$store.state.fleets.globalImageUploadURL =
      //   this.$store.state["salesSales"].profile_url;
      console.log(IndexOfDot, "splitted");
    }
    this.renderKey++;
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