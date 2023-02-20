<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">User Name / Login Id</h5>
        <TextField
          label="username"
          onkeydown="return event.keyCode !== 32"
          v-model="details.username"
          @blur="v$.details.username.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.username.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Display Name</h5>
        <TextField
          label="display_name"
          v-model="details.display_name"
          @blur="v$.details.display_name.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.display_name.$invalid && submitted,
            'inputfield p-inputtext-sm  w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12">
        <h5 class="required dialog-label-text">User Role</h5>
        <!-- <CascadeSelector /> -->
        <!-- <DropDown
          :filter="true"
          placeholder="Select Role"
          :data="$store.state.users.MultiSelectChipData.options"
          label="userRole"
          id="userRole"
          v-model="details.roles"
          :value="details.roles"
          @blur="v$.details.roles.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.roles.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        /> -->
        <MultiSelectChips
          :options="$store.state['users'].AgentsMultiSelectChipData.options"
          :filter="true"
          placeholder="Select Role"
          label="userRole"
          v-model="details.roles"
          :value="details.roles"
          :state="details.roles"
          @blur="v$.details.roles.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.roles.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12">
        <h5 class="required dialog-label-text">Cost center</h5>
        <MultiSelectChips
          :filter="true"
          placeholder="Select cost center"
          :options="MultiSelectChipData.options"
          label="costCenter"
          v-model="details.costCenter"
          :value="details.costCenter"
          :state="details.costCenter"
          @blur="v$.details.costCenter.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.costCenter.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Contact No</h5>
        <TextField
          label="contact"
          type="number"
          onkeydown="return event.keyCode !== 69"
          v-model="details.contact_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
        <!-- <NumberField 
        label="contact"
          v-model="details.contact"
          @blur="v$.details.contact.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.contact.$invalid && submitted,
            'inputfield w-full': true,
          }"
         /> -->
      </div>
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID"
          >Email ID</label
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
    </div>
    <div class="formgrid grid">
      <div class="field col-6 md:col-6">
        <h5 class="dialog-label-text">Mobile No</h5>
        <TextField
          label="mobile"
          type="number"
          onkeydown="return event.keyCode !== 69"
          v-model="details.mobile_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <!--Footer-->
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
          class="p-button-outlined mr-1 dialog-button-text"
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
//validation using vuelidate
//uniqid is the random id generator package
// import uniqid from "uniqid";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "AgentDialog",
  data: () => ({
    MultiSelectChipData: {
      selectedData: null,
      options: [
        { name: "Cost Center one", code: "CCO" },
        { name: "Cost Center two", code: "CCT" },
      ],
    },
    dropDownData: [
      { name: "Accounts Clerk Level 1", code: "AC" },
      { name: "Accounts Executive", code: "AE" },
      { name: "Accounts Manager", code: "AM" },
    ],
    v$: useVuelidate(),

    details: {
      username: "",
      display_name: "",
      roles: "",
      costCenter: "",
      contact_no: "",
      email: "",
      mobile_no: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        username: { required },
        display_name: { required },
        roles: { required },
        costCenter: { required },
        // contact_no: { required },
        email: {
          required,
          email,
        },
        // mobile_no: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state.users.displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        var userArray = [];
        for (var d in this.details) {
          if (d == "roles") {
            var rolesArray = this.details[d];
            for (var r in rolesArray) {
              userArray.push(rolesArray[r].code);
            }
          }
        }
        this.details["roles"] = userArray;
        this.details["company_id"] = this.$store.state.users.companyId;

        //CRUD - UPDATE OPERATION
        if (this.details.id) {
          if (this.$store.state.users.userActivityControl) {
            this.details.status = "Active";
          } else {
            this.details.status = "Inactive";
          }
          //making an update/PUT api call
          this.$store.dispatch("users/usersCRUD", {
            tag: "update",
            data: this.details,
          });
        }
        //CRUD - CREATE OPERATION
        else {
          if (this.$store.state.users.userActivityControl) {
            this.details.status = "Active";
          } else {
            this.details.status = "Inactive";
          }
          //making an add/POST api
          this.$store.dispatch("users/usersCRUD", {
            tag: "add",
            data: this.details,
          });
        }
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["users"].network_courier_details).length !=
      0
    ) {
      var rolesSource =
        this.$store.state["users"].network_courier_details["user_role_mapping"];
      var rolesArray = [];
      for (var state in this.$store.state["users"].network_courier_details) {
        if (state == "roles") {
          for (var m in this.$store.state["users"].AgentsMultiSelectChipData
            .options) {
            for (var r in rolesSource) {
              if (
                rolesSource[r].user_role.role_id ==
                this.$store.state["users"].AgentsMultiSelectChipData.options[m]
                  .code
              ) {
                rolesArray.push(
                  this.$store.state["users"].AgentsMultiSelectChipData.options[
                    m
                  ]
                );
              }
            }
          }
          this.details[state] = rolesArray;
        } else {
          this.details[state] =
            this.$store.state["users"].network_courier_details[state];
        }
      }
      if (this.details.status == "Active" || this.details.status == "active") {
        this.$store.state["users"].userActivityControl = true;
      }
      if (
        this.details.status == "Inactive" ||
        this.details.status == "inactive"
      ) {
        this.$store.state["users"].userActivityControl = false;
      }
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
</style>
