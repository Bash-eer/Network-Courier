<template>
  <div>
    <div class="formgrid grid mb-3">
      <div class="field col-12 md:col-12">
        <h5 class="required">Role Name</h5>
        <TextField
          label="roleName"
          v-model="roleDetails.role_name"
          @blur="v$.roleDetails.role_name.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.roleDetails.role_name.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-3">
      <div class="field col-12 md:col-12">
        <RadioButtons
          :disable="disabled"
          label="platform"
          tag="$store.state.users.radioButtonUsersValue"
          state="radioButtonUsersValue"
          v-bind:radioButtonData="$store.state.users.tabCategories"
          v-model="roleDetails.platform"
        />
      </div>
    </div>
    <div v-if="$store.state.users.rolesTabSwitch" class="formgrid grid mb-3">
      <div class="field col-12 md:col-12">
        <ChoiceSelect
          :disabled="disabled"
          :data="$store.state.users.deliveryChoices"
          state="deliveryChoicesState"
        />
      </div>
    </div>
    <div v-if="$store.state.users.rolesTabSwitch" class="formgrid grid mb-3">
      <span class="required ml-1 mb-3" v-if="deliveryCustomerTypes"
        >Please choose any one of the types below</span
      >
      <div class="field col-12 md:col-12">
        <RadioButtons
          :disable="disabled"
          label="customer_type"
          :key="$store.state.users.categoriesState"
          state="radioButtonTypesValue"
          v-bind:radioButtonData="$store.state.users.categoriesState"
          v-model="roleDetails.user_type"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="flex flex-column">
        <p class="cloneRole mb-2 ml-2">
          Would you like to clone existing role?
        </p>
        <br />
        <div class="field col-11 md:col-11">
          <DropDown
          code="code"
            :disabled="disabled"
            placeholder="Clone Role"
            :data="$store.state.users.rolesPageDropDown"
            v-model="roleDetails.cloneRole_id"
            :value="roleDetails.cloneRole_id"
            :state="roleDetails.cloneRole_id"
            classes="flex text-left inputfield clones"
          />
        </div>
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "CreateRoleDialog",
  data: () => ({
    v$: useVuelidate(),
    roleDetails: {
      cloneRole_id: "",
      role_name: "",
      platform: "",
      user_type: "",
    },
    submitted: false,
    disabled: false,
    deliveryCustomerTypes: false,
  }),
  validations() {
    return {
      roleDetails: {
        role_name: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state.users.displayDialog = false;
    },
    convertToLowerCase(word) {
      var lowerCaseString = word.toLowerCase();
      return lowerCaseString;
    },
    submitData() {
      var customerType;
      var userType;
      if (this.$store.state.users.deliveryChoicesState != null) {
        customerType = this.convertToLowerCase(
          this.$store.state.users.deliveryChoicesState
        );
      }
      if (this.$store.state.users.radioButtonTypesValue != null) {
        userType = this.convertToLowerCase(
          this.$store.state.users.radioButtonTypesValue
        );
      }
      delete this.roleDetails["platform"];
      if (this.$store.state.users.radioButtonUsersValue == "Network Courier") {
        this.roleDetails.customer_type = "internal";
        this.roleDetails.user_type = "internal";
      }
      if (this.$store.state.users.radioButtonUsersValue == "Online Customer") {
        this.roleDetails.customer_type = customerType;
        this.roleDetails.user_type = userType;
      }

      if (this.v$.$invalid) {
        this.submitted = true;
        this.deliveryCustomerTypes = true;
      }
      if (!this.v$.$invalid) {
        //CRUD - UPDATE OPERATION
        if (this.roleDetails.role_id) {
          var updateRoleObject = {};
          updateRoleObject["role_name"] = this.roleDetails["role_name"];
          updateRoleObject["user_type"] = this.roleDetails["user_type"];
          updateRoleObject["customer_type"] = this.roleDetails["customer_type"];
          this.$store.dispatch("users/rolesCRUD", {
            tag: "update",
            data: updateRoleObject,
            id: this.roleDetails.role_id,
          });
        }
        //CRUD - CREATE OPERATION
        else {
          //making an add/POST api
          if (
            this.roleDetails.customer_type != undefined &&
            this.roleDetails.user_type != undefined &&
            this.roleDetails.customer_type != null &&
            this.roleDetails.user_type != null
          ) {
            this.$store.dispatch("users/rolesCRUD", {
              tag: "add",
              data: this.roleDetails,
            });
          }
        }
      }
    },
  },
  watch: {
    "$store.state.users.newRoleData": function () {
      this.$store.dispatch("users/LoadRolesAccessApi", {
        data: this.$store.state.users.newRoleData,
      });
      this.$store.state.users.rolesRoute =
        this.$store.state.users.newRoleData.role_name;
      this.$router.push({
        name: "UsersModuleRights",
        params: { id: this.$store.state.users.newRoleData.role_name },
      });
    },
  },
  mounted() {
    if (
      Object.keys(this.$store.state["users"].network_courier_details).length ==
      0
    ) {
      if (this.$store.state["users"].usersTabsValue == "Network Courier") {
        this.$store.state["users"].rolesTabSwitch = false;
        if (document.getElementById("NC") != null) {
          document.getElementById("NC").click();
        }
      }
      if (this.$store.state["users"].usersTabsValue == "Online Customer") {
        if (document.getElementById("OC") != null) {
          document.getElementById("OC").click();
        }
      }
    }
  },
  created() {
    if (
      Object.keys(this.$store.state["users"].network_courier_details).length !=
      0
    ) {
      this.disabled = true;
      var rolesArray = [];
      for (var state in this.$store.state["users"].network_courier_details) {
        if (state == "cloneRole_id") {
          for (var m in this.$store.state["users"].MultiSelectChipData
            .options) {
            if (
              this.$store.state["users"].network_courier_details[state] ==
              this.$store.state.users.rolesPageDropDown[m].code
            ) {
              rolesArray.push(this.$store.state.users.rolesPageDropDown[m]);
            }
          }
          this.roleDetails[state] = rolesArray;
        } else {
          this.roleDetails[state] =
            this.$store.state["users"].network_courier_details[state];
        }
      }
    } else {
      this.disabled = false;
    }
  },
};
</script>

<style>
.cloneRole {
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
}
</style>
