<template>
    <div class="ml-2">
      <h5 class="required dialog-label-text">Upload Image</h5>
    <div class="flex">
      <ImgUpload
        URL="/images/uploadImage.png"
        :state="roomsImageState"
      />
    </div>
    </div>
    <div
      v-if="
       submitted &&
        $store.state.fleets.globalImageUploadURL == null
      "
      class="our-error p-error mismatch mb-2 ml-2"
    >
      {{ mismatchError }}
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Room No</h5>
          <TextField
            label="room_no"
            type="number" 
            v-model="details.room_no"
        @blur="v$.details.room_no.$model;"
        :classes="{
          'p-invalid': v$.details.room_no.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
          />
        </div>
          <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Room Name</h5>
          <TextField
            label="room_name"
            type="text" 
             v-model="details.room_name"
        @blur="v$.details.room_name.$model;"
        :classes="{
          'p-invalid': v$.details.room_name.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
          />
        </div>
        </div>

         <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text">Occupancy</h5>
          <TextField
            label="occupancy"
            type="number" 
             v-model="details.occupancy"
        @blur="v$.details.occupancy.$model;"
        :classes="{
          'p-invalid': v$.details.occupancy.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
          />
        </div>
       
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Done"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
 name:"RoomSettingsDialog",
  data: () => ({
    mismatchError: "please upload a vehicle image!",
    roomsImageState:"",
 v$: useVuelidate(),
    details: {
      occupancy:"",
      room_no:"",
      room_name:""
      
    },
    submitted: false,
  }),
    validations() {
    return {
      details: {
        occupancy: { required },
        room_no: { required },
        room_name: { required },
      },
    };
  },
  methods:{
       closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
             if (this.v$.$invalid) {
        this.submitted = true;

      }
      
       if (!this.v$.$invalid && this.$store.state.fleets.globalImageUploadURL != null) {
         
          this.details['image_url']=this.$store.state.fleets.globalImageUploadURL;
          let roomsDetails ={};
            for (let d in this.details) {
              roomsDetails[d] = this.details[d]
            }
      
       //if (this.$store.state.contacts.contactsRoomsData.id) {
       if (this.$store.state.masters.RoomsMasterFormStateData.id) {
          roomsDetails["id"] = this.$store.state.masters.RoomsMasterFormStateData.id;
          this.$store.dispatch("masters/ContactMastersCRUD", {
            path: "rooms",
            loadApi: "loadRoomsData",
            mutation: "fetchRoomsData",
            tag: "update",
            data: roomsDetails,
            type: "rooms",
          });
        }
        
       
       else{
           this.$store.dispatch("masters/ContactMastersCRUD",{
          tag:"add", 
          data:this.details,
          type:"rooms",
          loadApi:"loadRoomsData",
          mutation:"fetchRoomsData",
           path: "rooms",
        })

       }
      

       }
       
      
  },
  
     loadState() {
      if (
        Object.keys(this.$store.state.masters.RoomsMasterFormStateData).length != 0
      ) {
        this.roomsImageState =
          this.$store.state.masters.RoomsMasterFormStateData["image_url"];
        this.$store.state.fleets.globalImageUploadURL =
          this.$store.state.masters.RoomsMasterFormStateData["image_url"];
        for (let state in this.details) {
            this.details[state] =
              this.$store.state.masters.RoomsMasterFormStateData[state];
          
        }
      }
    },
  },
    created() {
    // this.$store.dispatch("fleets/loadFleetDropDowns", {
    //   path: "rooms",
    //   mutation: "fetchRoomsData",
    // });
    this.$store.state.fleets.globalImageUploadURL = [];
    this.$store.state.sales.stepperNavigation = null;
    this.loadState();
  },
}
</script>

<style>

</style>