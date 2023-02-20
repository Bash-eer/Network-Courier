<template>
  <div class="flex flex-row">
    <div
      v-for="category of radioButtonData"
      :key="category.key"
      class="p-field-radiobutton flex mr-3"
    >
      <RadioButton
        :id="category.key"
        name="category"
        :value="category"
        v-model="selectedCategory"
        :disabled="disable"
        @change="$emit('update:modelValue', category.name)"
      />
      <label class="ml-2 mr-2 categories" :for="category.key"
        ><b
          ><span v-if="category.name == 'Online Customer'">Online Users</span
          ><span :class="labelClass??''"  v-else>{{ category.name }}</span></b
        ></label
      >
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
export default {
  name: "RadioButtons",
  props: [
    "radioButtonData",
    "disable",
    "state",
    "modelValue",
    "mainState",
    "tag",
    "selectedRadioButton",
    "labelClass"
  ],
  data: () => ({
    selectedCategory: {},
    rolesPath: "?customer_type=",
  }),
  // computed: {
  //   ctr() {
  //     return this.$store.state[this.state];
  //   },
  // },
  watch: {
    selectedCategory: function () {
      if (this.selectedCategory.name == "Network Courier") {
        this.$store.dispatch("users/loadRolesDropDownApi", {
          apiPath: "/internal/internal",
          tag: "roles_dropdown",
        });
      }
      if (
        this.selectedCategory.name == "Adhoc" ||
        this.selectedCategory.name == "Contract" ||
        this.selectedCategory.name == "Agent" ||
        this.selectedCategory.name == "OBC"
      ) {
        var customerType = this.convertToLowerCase(
          this.$store.state.users.deliveryChoicesState
        );
        var userType = this.convertToLowerCase(this.selectedCategory.name);
        this.$store.dispatch("users/loadRolesDropDownApi", {
          apiPath: "/" + customerType + "/" + userType,
          tag: "roles_dropdown",
        });
        this.$store.state.users.radioButtonTypesValue =
          this.selectedCategory.name;
      }
    },
    modelValue: function () {
      if (
        this.modelValue == "Network Courier" ||
        this.modelValue == "Online Customer"
      ) {
        this.$store.state.users.radioButtonTypesValue =
          this.$store.state.users.previousTabsState;
        this.$store.state.users.radioButtonUsersValue = this.modelValue;
        if (this.modelValue == "Network Courier") {
          if (this.$store.state.users.rolesTabSwitch == true) {
            this.$store.state.users.radioButtonTypesValue = null;
            this.$store.dispatch("users/loadRolesDropDownApi", {
              apiPath: "/internal/internal",
              tag: "roles_dropdown",
            });
            // this.$store.dispatch("/usersloadRolesApi", {
            //   apiPath: "/internal",
            //   tag: "internal_user_roles_dropdown",
            // });
            this.$store.state.users.rolesTabSwitch = false;
          }
        }
        if (this.modelValue == "Online Customer") {
          if (this.$store.state.users.rolesTabSwitch == false) {
            // this.$store.state.users.radioButtonTypesValue = null;
            this.$store.state.users.rolesTabSwitch = true;
          }
          if (this.$store.state.users.previousTabsState == null) {
            this.$store.state.users.rolesPageDropDown = null;
          }
        }
      }
      if (
        this.modelValue == "Adhoc" ||
        this.modelValue == "Contract" ||
        this.modelValue == "Agent" ||
        this.modelValue == "OBC"
      ) {
        this.$store.state.users.radioButtonTypesValue = this.modelValue;
      }
      this.$emit("childToParent", this.label, this.modelValue);
    },
    // ctr(nw) {
    //   console.log(nw);
    // },
  },
  methods: {
    convertToLowerCase(word) {
      var lowerCaseString = word.toLowerCase();
      return lowerCaseString;
    },
  },
  components: {
    RadioButton,
  },
  created() {
    for (var r in this.radioButtonData) {
      var r_obj = this.radioButtonData[r];
      if (r_obj.name == this.$store.state.users[this.state]) {
        this.selectedCategory = r_obj;
      }
    }
    if (this.selectedRadioButton) {
      this.selectedCategory = this.selectedRadioButton;
    }
  },
};
</script>

<style scoped>
/* .categories{
  margin-top: -3px;
} */
</style>
