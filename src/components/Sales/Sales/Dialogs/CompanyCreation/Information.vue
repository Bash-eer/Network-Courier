<template>
  <br />
  <br />
  <div>
    <div
      class="
        flex flex-row
        mx-2
        justify-content-between
        align-items-center
        image-upload-container
      "
    >
      <div>
        <span v-if="roleDetails.selectedCategory == 'Company'">
          <ImgUpload URL="/images/logo-here.png" :state="ImageState" />
        </span>
        <span v-if="roleDetails.selectedCategory == 'Personal'">
          <ImgUpload URL="/images/profile-here.png" :state="ImageState" />
        </span>
      </div>
      <div
        v-if="submitted && $store.state.fleets.globalImageUploadURL == null"
        class="our-error p-error mismatch mb-2 ml-2"
      >
        {{ mismatchError }}
      </div>
      <RadioButtons
        class="color-212121 font-size-14"
        label="platform"
        state="radioButtonCompany"
        v-bind:radioButtonData="SalesDialogCategoriesHandler()"
        v-model="roleDetails.selectedCategory"
      />
    </div>
  </div>
  <div>
    <span
      v-if="
        roleDetails.selectedCategory == 'Company' && hideCategory != 'Company'
      "
    >
      <CompanyCategoryComponent />
    </span>
    <span
      v-if="
        roleDetails.selectedCategory == 'Personal' && hideCategory != 'Personal'
      "
    >
      <IndividualCategoryComponent />
    </span>
  </div>
</template>

<script>
import CompanyCategoryComponent from "./CompanyCategory.vue";
import IndividualCategoryComponent from "./IndividualCategory.vue";

export default {
  components: { CompanyCategoryComponent, IndividualCategoryComponent },
  data: () => ({
    // mismatchError: "please upload an image!",
    ImageState: "",
    url: "/images/nc-logo-transparent.png",
    stepId: "Information",
    hideCategory: null,
    items: [
      {
        index: 0,
        label: "1",
        component: "Information",
      },
      {
        index: 1,
        label: "2",
        component: "Individual",
      },
    ],
    SalesDialogCategories: [
      { name: "Company", key: "CU" },
      { name: "Personal", key: "IU" },
    ],
    SalesDialogCategoriesCompany: [{ name: "Company", key: "CU" }],
    SalesDialogCategoriesPersonal: [{ name: "Personal", key: "IU" }],
    roleDetails: {
      cloneRole_id: "",
      role_name: "",
      selectedCategory: "",
      user_type: "",
    },
    submitted: false,
  }),
  methods: {
    SalesDialogCategoriesHandler() {
      if (this.hideCategory == "Company") {
        return this.SalesDialogCategoriesPersonal;
      } else if (this.hideCategory == "Personal") {
        return this.SalesDialogCategoriesCompany;
      } else {
        return this.SalesDialogCategories;
      }
      // return this.SalesDialogCategories;
    },
  },
  created() {
    this.$store.state.sales.stepperNavigation = null;
    this.roleDetails.selectedCategory = this.SalesDialogCategories[0].name;
    if (
      Object.keys(this.$store.state["salesSales"].companyCreationStateData)
        .length != 0
    ) {
      this.ImageState =
        this.$store.state["salesSales"].companyCreationStateData["profile_url"];
      if (
        this.$store.state["salesSales"].companyCreationStateData.profile_type !=
        "company"
      ) {
        this.roleDetails.selectedCategory =
          this.SalesDialogCategoriesPersonal[0].name;
        this.hideCategory = "Company";
      } else {
        this.hideCategory = "Personal";
      }
    }
  },
};
</script>

<style></style>
