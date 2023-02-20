<template>
<div>
    <div class="container">
        <div v-for="(siteOffice, index) in siteOfficeHistoryData.reverse()" :key="index">
        <div class="rate-adjust-history-border-box pl-2 pb-2">
            <div :class="index?'rate-adjust-history-current-rates pl-3 pb-3 pt-3 pr-3':'rate-adjust-history-current-rates rate-adjust-history-chargers pl-3 pb-3 pt-3 pr-3'">
               
               <div class="flex flex-row justify-content-between">
                                <span class="rate-adjust-history-heading rate-adjust-history-body-text">{{index?`Revision ${siteOfficeHistoryData.length-index}`:'Current Rates'}}</span>
                <div class="flex align-self-center justify-content-end rate-adjustment">
                    <div class="rate-adjust-history-date-modify">
                        <span class="rate-adjust-history-modify-on">{{index==siteOfficeHistoryData.length-1?'Created On':'Modified On'}}</span>
                        <br/>
                        <span>{{this.dateFormater(siteOffice.createdAt)}}</span>
                    </div>
                    <img
                        :src="siteOffice.quotation_cc_site_office_charge_revisor.profile_url"
                        alt=""
                        class="rate-adjust-history-profile-icons ml-2"
                    />
                    <div>
                        <span class="rate-adjust-history-sales-person">Sales Person</span>
                        <br/>
                        <span>{{siteOffice.quotation_cc_site_office_charge_revisor.display_name}}</span>
                    </div>
                </div>
               </div>
                <div class="rate-adjust-history-content pl-2 pt-2">
                    <span class="rate-adjust-history-sub-heading rate-adjust-history-body-text">Site Office Charges</span>
                    <div class="flex flex-row mt-2 justify-content-start rate-adjust-history-margin-left">
                        <div class="flex mr-3"> 
                            <div class="rate-adjust-history-site-charge-content">
                                <div class="flex mr-1">
                                    <div class="flex rate-adjust-history-site-charge-name">Charge Per Trip</div>
                                </div>
                                <div>                            
                                    <div class="flex rate-adjust-history-site-charge-value">{{ siteOffice.charge_per_trip?siteOffice.charge_per_trip:0 }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex mr-3"> 
                            <div class="rate-adjust-history-site-charge-content">
                                <div class="flex mr-1">
                                    <div class="flex rate-adjust-history-site-charge-name">Return Trip Charge (By Amount)</div>
                                </div>
                                <div>                            
                                    <div class="flex rate-adjust-history-site-charge-value">{{ siteOffice.return_trip_charge?siteOffice.return_trip_charge:0 }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex mr-3"> 
                            <div class="rate-adjust-history-site-charge-content">
                                <div class="flex mr-1">
                                    <div class="flex rate-adjust-history-site-charge-name">Head Off Delivery Charges</div>
                                </div>
                                <div>                            
                                    <div class="flex rate-adjust-history-site-charge-value">{{ siteOffice.head_off_delivery_charge?siteOffice.head_off_delivery_charge:0 }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-row mt-2 rate-adjust-history-selected-box pl-2 pt-2">
                    <div class="flex mr-3" v-for="(radio, index) in callTypeData" :key="index">
                        <div class="flex flex-row">
                            <div class="flex mr-1">
                                <RadioButton
                                    :id="radio.tag"
                                    :name="radio.tag"
                                    :value="radio.tag"
                                    v-model="details.call_type"
                                />
                            </div>
                            <div class="flex">{{ radio.label }}</div>
                        </div>
                    </div>
                </div> -->
             <div class="flex flex-row mt-2 pl-2 pt-2"> 

                <div
              class="flex"
              v-for="(item, index) of siteOffice"
              :key="index"
            >
              <span v-if="item && showTitleHandler(index,item)">
                <div class="flex flex-row">
                  <div class="flex mr-1">
                    <img :src="'/images/' + 'siteOffice' + '.png'" alt="" class="w-10 h-1rem"/>
                  </div>
                  <div class="flex mr-4">
                    <span class="mt-1 inclusions">{{
                      getTitleHandler(index)
                    }}</span>
                  </div>
                </div>
              </span>
            </div>
            </div>
            </div>
        </div>
        <br/>
                </div>
        <!-- <div class="rate-adjust-history-border-box pl-2 pb-2">
            <div class="rate-adjust-history-current-rates pl-3 pb-3 pt-3 pr-3">
                <div class="flex align-self-center justify-content-end rate-adjustment">
                    <div class="rate-adjust-history-date-modify">
                        <span class="rate-adjust-history-modify-on">Modified On</span>
                        <br/>
                        <span>21st july 2021</span>
                    </div>
                    <img
                        :src="'/images/' + 'profile-girl' + '.png'"
                        alt=""
                        class="rate-adjust-history-profile-icons ml-2"
                    />
                    <div class="rate-adjust-history-sales">
                        <span class="rate-adjust-history-sales-person">Sales Person</span>
                        <br/>
                        <span>21st july 2021</span>
                    </div>
                </div>
                <span class="rate-adjust-history-heading rate-adjust-history-body-text">Revision 2</span>
                <div class="rate-adjust-history-content pl-2 pt-2">
                    <span class="rate-adjust-history-sub-heading rate-adjust-history-body-text">Site Office Charges</span>
                    <div class="flex flex-row mt-2 margin-left">
                        <div class="flex mr-3" v-for="(SiteOfficeCharges, index) in SiteOfficeCharges" :key="index">
                            <div class="rate-adjust-history-site-charge-content">
                                <div class="flex mr-1">
                                    <div class="flex rate-adjust-history-site-charge-name">{{ SiteOfficeCharges.name }}</div>
                                </div>
                                <div>                            
                                    <div class="flex rate-adjust-history-site-charge-value">{{ SiteOfficeCharges.value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row mt-2 rate-adjust-history-selected-box pl-2 pt-2">
                    <div class="flex mr-3" v-for="(radio, index) in callTypeData" :key="index">
                        <div class="flex flex-row">
                            <div class="flex mr-1">
                            <RadioButton
                                :id="radio.tag"
                                :name="radio.tag"
                                :value="radio.tag"
                                v-model="details.call_type"
                            />
                            </div>
                            <div class="flex">{{ radio.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="rate-adjust-history-border-box pl-2 pb-2">
            <div class="rate-adjust-history-current-rates pl-3 pb-3 pt-3 pr-3">
                <div class="flex align-self-center justify-content-end rate-adjustment">
                    <div class="rate-adjust-history-date-modify">
                        <span class="rate-adjust-history-modify-on">Modified On</span>
                        <br/>
                        <span>21st july 2021</span>
                    </div>
                    <img
                        :src="'/images/' + 'profile-girl' + '.png'"
                        alt=""
                        class="rate-adjust-history-profile-icons ml-2"
                    />
                    <div class="rate-adjust-history-sales">
                        <span class="rate-adjust-history-sales-person">Sales Person</span>
                        <br/>
                        <span>21st july 2021</span>
                    </div>
                </div>
                <span class="rate-adjust-history-heading rate-adjust-history-body-text">Revision 1</span>
                <div class="content">
                    <span class="rate-adjust-history-sub-heading rate-adjust-history-body-text">Site Office Charges</span>
                    <div class="flex flex-row mt-2 rate-adjust-history-margin-left">
                        <div class="flex mr-3" v-for="(SiteOfficeCharges, index) in SiteOfficeCharges" :key="index">
                            <div class="rate-adjust-history-site-charge-content">
                                <div class="flex mr-1">
                                    <div class="flex rate-adjust-history-site-charge-name">{{ SiteOfficeCharges.name }}</div>
                                </div>
                                <div>                            
                                    <div class="flex rate-adjust-history-site-charge-value">{{ SiteOfficeCharges.value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row mt-2 rate-adjust-history-selected-box pl-2 pt-2">
                    <div class="flex mr-3" v-for="(radio, index) in callTypeData" :key="index">
                        <div class="flex flex-row">
                            <div class="flex mr-1">
                            <RadioButton
                                :id="radio.tag"
                                :name="radio.tag"
                                :value="radio.tag"
                                v-model="details.call_type"
                            />
                            </div>
                            <div class="flex">{{ radio.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/> -->
        <!-- <div class="flex align-self-center justify-content-end">
            <CancelButton storePath="salesSales" />
        </div> -->
    </div>
</div>
</template>

<script>
// import useVuelidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
// import RadioButton from "primevue/radiobutton";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "SiteOfficeHistory",
//   components: {
    // RadioButton,
//   },
  
//   data() {
//     return {
//         userName: null,
//         ImgURL: null,
//       Caller: [
//         { name: "James", code: "1" },
//         { name: "Wan", code: "2" },
//       ],
//       Customer: [
//         { name: "Anne", code: "1" },
//         { name: "Frank", code: "2" },
//       ],
//       callTypeData: [
//         { label: "Return Trip Chargeable (Per Trip)", tag: "Called" },
//         { label: "Collection Chargable", tag: "Call" },
//         { label: "Head Off Delivery Charges", tag: "Meeting" },
//         { label: "Head Off Return Trip Waived", tag: "Email" },
//       ],
//       SiteOfficeCharges:[
//         { name: "Charge Per Trip", value: "6.00 $" },
//         { name: "Return Trip Charge (By Amount)", value: "4.4 $" },
//         { name: "Head Off Delivery Charges", value: "4.4 $" },
//       ],
//       details: {
//         call_type: "",
//         caller: "",
//         date_time: "",
//         customer: "",
//         contactNo: "",
//         whatsapp_number: "",
//         email: "",
//         designation:"",
//         reamrks: "",
//       },
//       maintenanceAttachmentsState: " ",
//       v$: useVuelidate(),
//       submitted: false,
      
//     };
//   },
//   validations() {
//     return {
//       details: {
//         call_type: { required },
//         caller: { required },
//         date_time: { required },
//         customer: { required },
//         contactNo: { required },
//         whatsapp_number: { required },
//         email: { required },
//         designation:{ required },
//         reamrks: { required },
//       },
//     };
//   },
    computed: {
    ...mapGetters({
      siteOfficeHistoryData: "salesCommon/siteOfficeHistory",
    }),
  },

  methods: {
     dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMMM YYYY");
        return formattedDate;
      }
    },
    // submitData() {
    //   if (this.v$.$invalid) {
    //     this.submitted = true;
    //   }
    //   console.log('details',this.details);
    // },
        showTitleHandler(data,item) {
      let show = false;
      switch (data) {
        case "collection_chargable":
          show = item;
          break;
        case "head_off_delivery_chargable":
          show = item;
          break;
        case "head_off_return_waived":
          show = item;
          break;
        case "return_trip_chargable":
          show = item;
          break;
        case "special_monitoring":
          show = item;
          break;
        default:
          break;
      }
      return show;
    },
        getTitleHandler(data) {
      let title;
      switch (data) {
        case "collection_chargable":
          title = "Collection Chargable";
          break;
        case "head_off_delivery_chargable":
          title = "Head Off Delivery Charges";
          break;
        case "head_off_return_waived":
          title = "Head Off Return Weived";
          break;
        case "return_trip_chargable":
          title = "Return Trip Chargable (Per Trip)";
          break;
        case "special_monitoring":
          title = "Special Monitoring";
          break;
        case "charge_per_trip":
          title = "Charge Per Trip";
          break;
        case "head_off_delivery_charge":
          title = "Head Off Delivery Charges";
          break;
        case "return_trip_charge":
          title = "Return Trip Charge";
          break;
          default:
          break;
      }
      return title;
    },
   
  },

};
</script>

<style lang="scss" scoped>
.rate-adjust-history-heading {
  font-style: normal;
  font-size: 1rem;
  color: #343434;
  font-weight: 600;
}
.rate-adjust-history-site-charge-name{
    color:#7E84A7;
}
.rate-adjust-history-sub-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  color: #343434;
}
.rate-adjust-history-text-content{
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 11px !important;
    color: #343434 !important;
}
.rate-adjust-history-margin-left{
    // gap: 8rem;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 11px !important;
    color: #343434 !important;
}
.rate-adjust-history-selected-box{
    gap: 10px;
}
.rate-adjust-history-chargers{
    background: #FFF3F6;
}
.rate-adjust-history-site-charge-value{
    color:#66C11E !important;
}
.rate-adjust-history-border-box {
    border-bottom: 1px solid #DFE4ED;
}
 .container {
    border-left: 1px solid #DFE4ED !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 11px !important;
    color: #343434 !important;
}
.rate-adjustment{
    gap: 1rem;
}
.rate-adjust-history-modify-on{
    color: #7E84A7;
}
.rate-adjust-history-profile-icons{
  height: 32px;
  width: 32px;
  border-radius:5px;
//   margin-top: -0.5rem !important;

}
.rate-adjust-history-sales-person{
    color: #7E84A7;
}

</style>
