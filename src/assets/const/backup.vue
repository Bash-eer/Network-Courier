<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Username</h5>
        <TextField
          label="username"
          v-model="details.username"
          @blur="v$.details.username.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.username.$invalid && submitted,
            'inputfield p-inputtext-sm  w-full dialog-field-text': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">User ID</h5>
        <TextField
          label="User ID"
          :disabled="true"
          v-model="details['user_id']"
          @blur="v$.details['user_id'].$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details['user_id'].$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12">
        <h5 class="required dialog-label-text">User Role</h5>
        <MultiSelectChips
          :options="$store.state['users'].MultiSelectChipData.options"
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
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Mobile No</h5>
        <TextField
          label="mobile"
          type="number"
          v-model="details['mobile_number']"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text': true,
          }"
        />
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
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Contact No</h5>
        <TextField
          label="contact"
          type="number"
          v-model="details['contact_number']"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mt-2 mr-3">
      <div class="field col-12 md:col-12 hint-div h-full ml-2">
        <p class="hint mt-3 mb-3 ml-2">
          You will receive a mail with your automatically generated password
        </p>
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
//uniqid is the random id generator package
import uniqid from "uniqid";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "backup",
  data: () => ({
    v$: useVuelidate(),
    details: {
      user_id: "",
      username: "",
      roles: "",

      mobile_number: "",
      email: "",
      contact_number: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        user_id: { required },
        username: { required },
        roles: { required },
        // contact_number: { required },
        //  mobile_number: { required },
        email: {
          required,
          email,
        },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
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
        this.details["type"] = "internal";

        //CRUD - UPDATE OPERATION
        if (this.details.id) {
          if (this.$store.state["users"].userActivityControl) {
            this.details.status = "Active";
          } else {
            this.details.status = "Inactive";
          }
          //making an update/PUT api call
          this.$store.dispatch("users/usersCRUD", {
            tag: "update",
            data: this.details,
          });
          // this.rowControl("modifyStatus/");
        }
        //CRUD - CREATE OPERATION
        else {
          if (this.$store.state["users"].userActivityControl) {
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
    findIndexById(id) {
      let index = -1;
      for (
        let i = 0;
        i < this.$store.state["users"].networkCourierTableData.length;
        i++
      ) {
        if (this.$store.state["users"].networkCourierTableData[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    // rowControl(value) {
    //   this.$store.dispatch("usersCRUD", {
    //     tag: value,
    //     data: this.rowData,
    //   });
    // },
    createId() {
      return uniqid("NC");
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["users"].network_courier_details).length ==
      0
    ) {
      this.details["user_id"] = this.createId();
    }
    if (
      Object.keys(this.$store.state["users"].network_courier_details).length !=
      0
    ) {
      var rolesSource =
        this.$store.state["users"].network_courier_details["user_role_mapping"];
      var rolesArray = [];
      for (var state in this.$store.state["users"].network_courier_details) {
        if (state == "roles") {
          for (var m in this.$store.state["users"].MultiSelectChipData
            .options) {
            for (var r in rolesSource) {
              if (
                rolesSource[r].user_role.role_id ==
                this.$store.state["users"].MultiSelectChipData.options[m].code
              ) {
                rolesArray.push(
                  this.$store.state["users"].MultiSelectChipData.options[m]
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
  watch: {
    "$store.state.users.userActivityControl": function () {
      if (this.$store.state["users"].userActivityControl) {
        this.details.status = "Active";
      } else {
        this.details.status = "Inactive";
      }
    },
  },
};
</script>

<style>
.hint-div {
  background: #fffcdf;
}
.hint {
  color: #7a7a7a;
  font-weight: 500;
  font-size: 11px;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
</style>
