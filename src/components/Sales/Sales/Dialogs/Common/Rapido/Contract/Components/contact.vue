<template>
  <div>
    <span class="flex align-items-center">
      <ImgUpload
        @file="getFile"
        URL="/images/logo-here.png"
        class="mt-0 mb-2"
        :state="formData.profile_url"
      />
      <div
        @click="$emit('removeRow', rowId)"
        v-if="rowCount !== 1"
        class="pi pi-times pointer ml-3 mb-3"
      ></div>
    </span>
    <div class="formgrid grid my-2">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Person Name
        </h5>
        <!-- salutation -->
        <div class="p-inputgroup full-width">
          <span class="p-inputgroup-addon">
            <select
              v-model="formData.salutation"
              name="salutation"
              id="salutation"
            >
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
          </span>
          <TextField
            label="contact_name"
            v-model="formData.contact_name"
            class="full-width"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.formData.contact_name.$invalid && !isValid,
              'inputfield w-full full-width dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Contact No
        </h5>
        <TextField
          label="contact_no"
          v-model="formData.contact_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData.contact_no.$invalid && !isValid,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label
          class="required bold-500 font-size-14 color-7a7a7a"
          for="Email ID"
          >Email Id</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="formData['email']"
          @blur="v$.formData['email'].$model"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData['email'].$invalid && !isValid,
            'dialog-label-text dialog-field-text': true,
          }"
        />
        <!-- <span v-if="v$.formData['email'].$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.formData['email'].$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.formData['email'].$invalid && submitted) ||
            v$.formData['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.formData["email"].required.$message.replace("Value", "Email")
          }}</small -->
      </div>
    </div>
    <div class="formgrid grid my-2">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Designation</h5>
        <TextField
          label="designation"
          type="text"
          v-on:childToParent="getUserInput"
          v-model="formData.designation"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Mobile No</h5>
        <TextField
          label="mobile_no_no"
          v-on:childToParent="getUserInput"
          v-model="formData.mobile_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions } from "vuex";

export default {
  props: ["rowCount", "rowId", "type", "stepKey", "profileDetails"],
  data() {
    return {
      isValid: true,
      file: null,
      formData: {
        salutation: "Mr",
        profile_url: "",
        contact_name: "",
        contact_no: "",
        email: "",
        selected: false,
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    };
  },
  watch: {
    stepKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },
  },
  methods: {
    ...mapActions({
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
    }),
    getFile(value) {
      if (value) {
        this.file = value;
        this.formData.profile_url = this.file?.fileLink;
      }
    },
    getUserInput() {
      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      this.setRapidoContractData({
        key: "contacts",
        value: this.formData,
        idx: this.$props.rowId,
      });
    },
  },
  mounted() {
    if (this.v$.$invalid) {
      this.$emit("isRowValid", { isValid: false, id: this.rowId });
    } else {
      this.$emit("isRowValid", { isValid: true, id: this.rowId });
    }
  },
  created() {
    if (this.$props.profileDetails) {
      this.formData.profile_url = this.$props.profileDetails.profile_url;
      this.formData.contact_name = this.$props.profileDetails.contact_name;
      this.formData.contact_no = this.$props.profileDetails.contact_no;
      this.formData.email = this.$props.profileDetails.email;
      this.formData.mobile_no = this.$props.profileDetails.mobile_no;
      this.formData.designation = this.$props.profileDetails.designation;
      this.formData.selected = this.$props.profileDetails.selected;
      this.formData.salutation = this.$props.profileDetails?.salutation || "Mr";

      this.setRapidoContractData({
        key: "contacts",
        value: this.formData,
        idx: this.$props.rowId,
      });
    }
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
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
}
</style>