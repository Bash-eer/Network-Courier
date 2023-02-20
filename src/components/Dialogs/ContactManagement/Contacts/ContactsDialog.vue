<template>
  <div class="mt-5">
    <Stepper :stepId="stepId" :stepperData="ContactStepperItems" />
  </div>
</template>

<script>
export default {
  name: "ContactsDialog",
  data: () => ({
    stepId: "BasicDetails",
    ContactStepperItems: [
      {
        index: 0,
        label: "1",
        component: "BasicDetails",
        name: "Basic Details",
      },
      {
        index: 1,
        label: "2",
        component: "ResidenceDetails",
        name: "Residence Details",
      },
      {
        index: 2,
        label: "3",
        component: "OfficeDetails",
        name: "Office Details",
      },
      {
        index: 3,
        label: "4",
        component: "PersonalInfo",
        name: "Personnel Info",
      },
    ],
  }),
  created() {
    this.$store.state.sales.stepperNavigation = null;
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.contacts.contactPersonalInfoFiles = [];
    this.$store.state.contacts.deletedcontactPersonalInfoFiles = [];
  },
};
</script>

<style scoped>
.p-steps-item {
  justify-content: left !important;
}
::v-deep .stepNames{
  color:#4e5868 ;
  font-size: 12px;
  font-weight: 500;
}

</style>
