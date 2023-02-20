<template>
    <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text">Event Status</h5>
          <TextField
            label="status"
            type="text" 
             v-model="details.status"
        @blur="v$.details.status.$model;"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
          />
        </div>
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text">Choose Color</h5>
        <!-- <photoshop-picker v-model="colors" /> -->
        <!-- <material-picker v-model="colors" />
<compact-picker v-model="colors" />
<swatches-picker v-model="colors" />
<slider-picker v-model="colors" />
<sketch-picker v-model="colors" />
<chrome-picker v-model="colors" />
<photoshop-picker v-model="colors" /> -->

<div class="flex flex-column w-100 align-items-start justify-content-start event-status-insider-wrap">
  <!-- <div>
  <p class="event-status-title-text m-1">Frequently Used</p>
  <div class="flex flex-row">
 <div @click="toggleIconShow(item)" v-for="item in FrequestlyUsedColors" :key="item" class="m-1 event-status-frequesntly-used-colors cursor-pointer"  :style="getBackgroundColor(item.color)">
   <i v-if="item.showIcon == true" class="pi pi-check"></i>
  </div>
 
    
  </div>
</div> -->
<div class="flex flex-row">
 
<div class="m-2 ">
   <p class="event-status-title-text mx-1 my-1">Text</p>
  <!--format="hex"-->
  <div class="flex flex-row align-item-center justify-content-center ">
<p class="event-status-custom-value mr-2 event-status-inside-text">{{details.text_color}}</p>
<color-input v-model="details.text_color" position="top"  disable-text-inputs  :disable-alpha="false"/>
  </div>
  

</div>
<div class="m-2">
  <p class="event-status-title-text mx-1 my-1">Chip</p>
  <div class="flex flex-row align-item-center justify-content-center">
<p class="event-status-custom-value mr-2 event-status-inside-text">{{details.background_color}}</p>
<color-input v-model="details.background_color" position="top" disable-text-inputs/>
  </div>


</div>
</div>

</div>


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
// import { Photoshop } from 'vue-color'
import ColorInput from 'vue-color-input'
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {
     ColorInput 
    // 'photoshop-picker': Photoshop,
    //  'material-picker': material,
    
  },
    data: () => ({
     
  // colors: '#194d33',
 FrequestlyUsedColors:[
   {color:"rgb(235, 13, 13)" ,  showIcon: false,},
   {color:"rgb(222, 32, 208)" , showIcon: false,},
   {color:"rgb(13, 18, 235)" ,  showIcon: false,},
   {color:"rgb(222, 216, 32)", showIcon: false,},
   {color:"rgb(96, 237, 213)", showIcon: false,},
   {color:"rgb(222, 112, 32)", showIcon: false,},

 ],
  
 v$: useVuelidate(),
    details: {
      
      status:"",
       text_color: "rgba(150, 50, 50)",
  background_color: "rgb(50, 150, 150)",
      
    },
    submitted: false,
  }),
    validations() {
    return {
      details: {
        
        status: { required },
      },
    };
  },
  methods: {
    toggleIconShow( item){
            //  item[index].showIcon = !item[index].showIcon;
             item.showIcon = !item.showIcon;
    },
     getBackgroundColor(color) {
      return {
        "background-color": color,
      };
    },
      closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
      submitData() {
             if (this.v$.$invalid) {
        this.submitted = true;

      }
      
       if (!this.v$.$invalid ) {
         let statusDetails ={};
            for (let d in this.details) {
              statusDetails[d] = this.details[d]
            }
      
         if (this.$store.state.masters.EventStatusMasterFormStateData.id) {
          statusDetails["id"] = this.$store.state.masters.EventStatusMasterFormStateData.id;
          this.$store.dispatch("masters/ContactMastersCRUD", {
            path: "EventInviteesStatus",
            loadApi: "loadEventStatusData",
            mutation: "fetchEventStatusData",
            tag: "update",
            data: statusDetails,
            type: "EventInviteesStatus",
          });
        }
        
       
       else{
           this.$store.dispatch("masters/ContactMastersCRUD",{
          tag:"add", 
          data:this.details,
          type:"EventInviteesStatus",
          loadApi:"loadEventStatusData",
          mutation:"fetchEventStatusData",
           path: "EventInviteesStatus",
        })

       }
       }
  },

  
   
     loadState() {
      if (
        Object.keys(this.$store.state.masters.EventStatusMasterFormStateData).length != 0
      ) {
        // this.roomsImageState =
        //   this.$store.state.masters.EventStatusMasterFormStateData["image_url"];
        // this.$store.state.fleets.globalImageUploadURL =
        //   this.$store.state.masters.EventStatusMasterFormStateData["image_url"];
        for (let state in this.details) {
            this.details[state] =
              this.$store.state.masters.EventStatusMasterFormStateData[state];
          
        }
      }
    },
},
    created() {
    // this.$store.dispatch("fleets/loadFleetDropDowns", {
    //   path: "rooms",
    //   mutation: "fetchRoomsData",
    // });
    // this.$store.state.fleets.globalImageUploadURL = [];
    // this.$store.state.sales.stepperNavigation = null;
    this.loadState();
  },

}
</script>

<style scoped>
::v-deep .color-input.user .box {
    /* make clickable box a 100x100 circle */
    width: 38px;
    height: 38px;
    border-radius: 50px;
}
.event-status-insider-wrap {
  background: #FFFFFF;
border: 1px solid #E6E6E6;
box-sizing: border-box;
border-radius: 2px;
}
.event-status-frequesntly-used-colors{
  width: 20px;
height: 20px;
border-radius: 2px;
}
.event-status-custom-value{
  width: 186px;
height: 38px;
border: 1px solid #C4C4C4;
box-sizing: border-box;
border-radius: 25px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
}
.event-status-title-text{
    color:#6D6D6D;
  font-weight: 500;
font-size: 14px;
line-height: 28px;
}
.event-status-inside-text{
color: #333333;
font-weight: normal;
font-size: 14px;
line-height: 32px;
}
</style>