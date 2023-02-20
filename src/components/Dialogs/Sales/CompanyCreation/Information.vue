<template>
  <div>
    <div
      class="
        flex flex-row
        justify-content-between
        align-items-center
        image-upload-container
      "
    >
      <div>
        <span v-if="roleDetails.selectedCategory == 'Company'">
          <ImgUpload URL="/images/logo-here.png" />
        </span>
        <span v-if="roleDetails.selectedCategory == 'Personal'">
          <ImgUpload URL="/images/profile-here.png" />
        </span>
      </div>
      <RadioButtons
        label="platform"
        state="radioButtonCompany"
        v-bind:radioButtonData="SalesDialogCategories"
        v-model="roleDetails.selectedCategory"
      />
    </div>
  </div>
  <div>
    <span v-if="roleDetails.selectedCategory == 'Company'">
      <CompanyCategory />
    </span>
    <span v-if="roleDetails.selectedCategory == 'Personal'">
      <IndividualCategory />
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: "/images/nc-logo-transparent.png",
    stepId: "Information",
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
    roleDetails: {
      cloneRole_id: "",
      role_name: "",
      selectedCategory: "",
      user_type: "",
    },
    submitted: false,
  }),
  created() {
    this.$store.state.sales.stepperNavigation = null;
    this.roleDetails.selectedCategory = this.SalesDialogCategories[0].name;
  },
};
</script>

<style></style>
