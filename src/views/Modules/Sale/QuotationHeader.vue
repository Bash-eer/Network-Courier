<template>
  <div class="grid">
    <div class="col wrapper">
      <div
        class="flex flex-row justify-content-between align-items-center h-full"
      >
        <!--left-->
        <div class="m-3 flex flex-row align-items-start">
          <router-link class="m-1 mt-3" to="/sales">
           <span class="pointer-cursor"> <i class="pi pi-arrow-left"></i></span>
          </router-link>
         
          <div class="flex flex-column">
            <div class="flex flex-row align-items-center">
              <span class="m-1">
                <img src="/images/greencoffee.png" alt="company-logo" />
              </span>
              <span class="flex flex-column align-items-start m-1">
                <span class="title">2000 Recruitment Pte Ltd</span>
                <span class="subtitle">Advertising</span>
              </span>
              <span class="m-3">
                <i class="pi pi-ellipsis-v"></i>
              </span>
            </div>
            <!-- <div>
              <span class="flex flex-row align-items-start mt-3">
                <span class="side-title mt-1">More Info</span>
                <span class="ml-1"> <i class="pi pi-caret-down"></i></span> 
                <span class="ml-1"
                  ><img src="/images/down-arrow.png" alt=""
                /></span>
                <Accordion>
            <AccordionTab header="Header I">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </AccordionTab>
            </Accordion>
              </span>
            </div> -->
          </div>
        </div>

        <div>
  <img class="img1" src="/images/vector1.svg">
        </div>
        <br>
        <div>
        
          <img class="img2" src="/images/vector2.svg">
        </div>

        <!--right-->
        <div class="flex flex-row align-items-start m-3">
          <span class="m-1">
            <img src="/images/avatar.png" alt="avatar" />
          </span>
          <span class="flex flex-column m-1">
            <span class="heading"> Created By </span>
            <span class="sub-heading">Lebron Wayde</span>
          </span>
        </div>
      </div>


 <div>
              <!-- <span class="flex flex-row align-items-start mt-3"> -->
                <!-- <span class="side-title mt-1">More Info</span> -->
                <!-- <span class="ml-1"> <i class="pi pi-caret-down"></i></span> -->
                <!-- <span class="ml-1"
                  ><img src="/images/down-arrow.png" alt=""
                /></span> -->
                <Accordion>
            <AccordionTab>
               <template #header>
                    <span class="side-title mt-1">More Info</span>
               
                <span class="ml-1 mt-1"
                  ><img src="/images/down-arrow.png" alt=""
                /></span>
                </template>
                 <div class="flex flex-row justify-content-between align-items-center h-full">
               <div class="flex flex-row">
                 <!--column -->
                       <span class="flex flex-column align-items-start justify-content-start m-3 ml-5">
                         <small class="more-info-heading mb-2">Email</small>
                         <small class="more-info-subheading ">Jasmine@gmail.com</small>
                       </span>
                       <!--column -->
                        <span class="flex flex-column align-items-start justify-content-start m-3 ml-5">
                         <small class="more-info-heading mb-2">Mobile</small>
                         <small class="more-info-subheading ">+65 655223774</small>
                       </span>
                       <!--column -->
                        <span class="flex flex-column align-items-start justify-content-start m-3 ml-5">
                         <small class="more-info-heading mb-2">Contact No.</small>
                         <small class="more-info-subheading ">+65 655223774</small>
                       </span>
                       <!--column -->
                        <span class="flex flex-column align-items-start justify-content-start m-3 ml-5">
                         <small class="more-info-heading mb-2">Designation</small>
                         <small class="more-info-subheading">Accountant</small>
                       </span>
               </div>
               <div >
                 <span class="flex flex-column align-items-start justify-content-start m-3 ml-5">
                         <small class="more-info-subheading m-2"><i class="pi pi-pencil"></i> &nbsp; Edit</small>
                         <small>
                            <GroupedAvatars
            :data="
              members.length < 3
                ? members
                : getGroupedAvatarsData(members)
            "
            :more="
              members.length >= 3
                ? members.length - 2
                : ''
            "
          />
                         </small>
                       </span>
               </div>
                 </div>
            </AccordionTab>
            </Accordion>
              <!-- </span> -->
            </div>

    </div>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
export default {
  components : {Accordion , AccordionTab} ,
  
  data() {
    return {
              members: [
          { name: "Tim", url: "avatar" },
          { name: "Jill", url: "avatarTwo" },
          { name: "Tommy", url: "avatar" },
          { name: "Tommy", url: "avatar" },
        ],
    }
  },
  methods: {
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: min-content !important;
  border-radius: 15px;
  color: #fff !important;
  position: relative;
}
.pi {
  color: white;
}
.title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.subtitle {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.side-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.heading {
  font-family: $font-family-primary;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.03em;
  text-align: left;
}
.sub-heading {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.more-info-heading{
  font-family: $font-family-primary;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 15px;
letter-spacing: 0.03em;
color: #FFFFFF;
opacity: 0.6;
}
.more-info-subheading {
  font-family:  $font-family-primary;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 15px;
}
.img2 {
  position: absolute;
  top: 0;
  width: 150px;
  margin-left: -30px;
}
.img1 {
  position: absolute;
  bottom: 0;
  width: 250px;
  height: max-content;
  margin-left: -60px;
}
::v-deep .p-accordion .p-accordion-tab{
  background-color: transparent !important;
}

::v-deep .p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link:focus {
    background: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    border-left: 10px solid transparent !important;
    outline: none !important;
    outline-offset: 0ch transparent !important;
    height: 47px !important 
    }
::v-deep .p-accordion
  .p-accordion-header:not(.p-disabled)
  .p-accordion-header-link:focus:before {
 display: none;
}
::v-deep .p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link {
     background: transparent !important;
     border : none !important;
}
::v-deep .p-accordion .p-accordion-content{
  border : none !important;
}

// ::v-deep .p-accordion-content
//   .accodion-list
//   .router-link-exact-active
//   .accordion-sub-text {
//   background: transparent !important;
//   border: none !important;
// }

// ::v-deep .router-link-exact-active {
//   background: transparent !important;
//   width: 100%;
// }
::v-deep .p-accordion-content {
  background-color: transparent !important;
  color: #fff !important;
}
::v-deep .p-accordion-toggle-icon {
    // margin-right: 35rem !important;
    margin-right: -1rem !important;
    color: #fff !important;
    display: none !important;
}
// ::v-deep .pi-chevron-right {
//   position: absolute !important;
//   // left: 0% !important;
// }
// ::v-deep .pi-chevron-down {
//   position: absolute !important;
//   // margin-left: -50rem !important;
//   // left: 0% !important;
// }
::v-deep .p-accordion
.p-accordion-header:not(.p-disabled)
.p-accordion-header-link:focus {
  background: transparent !important;
}
</style>
