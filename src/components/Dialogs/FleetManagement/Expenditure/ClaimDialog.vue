<template>
    <div class="formgrid grid">
     <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Vehicle Reg No</h5>
      <DropDown
        :data="Vehicle_Reg_No"
        label="Vehicle_Reg_No"
        id="Vehicle_Reg_No"
        />
      </div>
    <div class="field col-12 md:col-6">
        
      <h5 class=" dialog-label-text">Vehicle Name</h5>
     
      <TextField
        label="Vehicle_Name"
        type="text"
        placeholder="Nissan"
        
      />
   </div>
    </div>
     <div class="formgrid grid">
     <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Driver</h5>
      <DropDown
        :data="Driver"
        label="Driver"
        id="Driver"
        />
      </div>
      </div>

     <div class="field col-12 md:col-6">
        <h5 class=" dialog-label-text">Claim Date</h5>
         <div clas="flex">
      <div class="whiteDiv  calendarDiv">
        <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="icon"
          :showIcon="true"
          style="width: 100%"
           :monthNavigator = "true"
                  :yearNavigator="true"
                   yearRange="1950:2050"
        />
      </div>
    </div>
      </div>

  <h6 class="ml-2">Claims</h6>
     <div class="formgrid grid">
     <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Claim Type</h5>
      <DropDown
        :data="Claim_Type"
        label="Claim_Type"
        id="Claim_Type"
        />
      </div>
    <div class="field col-12 md:col-6">
        
      <h5 class="required dialog-label-text">Claim Amount</h5>
     
      <TextField
        label="Claim_Amount"
        type="text"
        placeholder="Nissan" 
      />
   </div>
    </div>
<div class="ml-2 Add_New_Claim"> +Add New Claim Type</div>
<div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text mt-5">Receipt Remarks</h5>
      <TextAreaField
        label="Remarks"
        rows="2"
        value="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
       
      />
    </div>
  </div>
    <div class="ml-2 mb-5">
       <div
        class="flex flex-row"
      >
    <img class="cursor mr-2 mt-1" src="/images/Vector.png" alt="" style="height:13px" />
    <div class=".roadTax Add_Claim_Document"> Add Claim Document</div>
  </div>
  </div>
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

</template>

<script>
export default {
 name:"ClaimDialog",
  data: () => ({
    date: null,
    Vehicle_Reg_No: [
      { name: "Vehicle1 ", code: "s1" },
      { name: "Vehicle2", code: "s2" },
    ],
     Driver: [
      { name: "Driver1 ", code: "s1" },
      { name: "Driver2", code: "s2" },
    ],
      Claim_Type: [
      { name: "Type1 ", code: "s1" },
      { name: "Type2", code: "s2" },
    ],

 }),
   methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
      submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // this.$store.state.fleet = "ExpenditureDialog";

      }
    },
  }
}
</script>

<style scoped>
.Add_New_Claim{
    color: #357DEA;
    font-weight: 600;
    font-size: 14px;
}
.Add_Claim_Document{
    color: #357DEA;
    font-weight: 600;
    font-size: 14px;

}
</style>

