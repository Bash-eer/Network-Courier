<template>
  <div class="formgrid grid mt-2">
    <div class="field col-12 md:col-6 p-2 mt-2">
      <span class="step-text">Add Additional Surcharges</span>
    </div>
  </div>

  <div v-for="(rate, index) of addRates" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Surcharge Name</h5>
        <!-- <TextField
          v-model="details['additional_surcharges'][index].surcharge_name"
          type="text"
          :classes="{
            'p-invalid':
              v$.details['additional_surcharges'][index].surcharge_name
                .$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        /> -->
        <AddNewDropDownTextField
        type="Surcharge"
        :optionClose="true"
        stateName="addNewSurchargeName"
        :state="details['additional_surcharges'][index].surcharge_name"
        :data="addNewSurchargeName"
        :placeholder="'Choose a Surcharge Name'"
        storePath="expressContract"
        v-model="details['additional_surcharges'][index].surcharge_name"
        @addNewValue="addNewSurcharge"
        :classes="{
          'p-invalid': v$.details['additional_surcharges'][index].surcharge_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Rate (S$)</h5>
        <TextField
          v-model="details['additional_surcharges'][index].rates"
          type="number"
          :classes="{
            'p-invalid':
              v$.details['additional_surcharges'][index].rates.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex justify-content-between add_rate ml-3">
    <div class="flex">
      <span class="new-field" @click="addRate"><b>+ Add Surcharge</b></span>
    </div>
  </div>

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn ml-2"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CloseButton storePath="expressContract" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { errhandler } from "@/services/httpClient";
import moment from "moment";
import { ADD_RATES_STEPS } from "../../../const/const";
import {  mapActions } from 'vuex';
import {exc_master,ex_state_master} from "../../../../../../../../store/helper"
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    addRatesClicked: 0,
    charge: {
      charge_type: {
        normal: {
          bike: {
            trips: [
             
            ],
            rates: {
              rates: [
                {
                  min_units: "",
                  max_units: "",
                  unit_rate: "",
                },
              ],
              bike_customer_van_job: {
                van_job_min_cost: "",
                maximum_weight: "",
                van_job_add_cost: "",
                van_job_add_weight: "",
                van_job_urgent_surcharges: "",
              },
            },
          },
          van: {
            trips: [
             
            ],
            rates: {
              rates: [
                {
                  min_units: "",
                  max_units: "",
                  unit_rate: "",
                },
              ],
              van_job_urgent_surcharges: "",
              two_tire_rates: {
                charge_by_weight: {
                  maximum_weight: "",
                  van_job_add_weight: "",
                  van_job_add_cost: "",
                },
                charge_by_quantity: {
                  maximum_quantity: "",
                  van_job_add_quantity: "",
                  van_job_add_cost: "",
                  box_count_charges: [
                    {
                      boxes_under: "",
                      rate: "",
                    },
                  ],
                },
              },
              multi_tire: {
                charge_by_quantity: [
                  {
                    min_box: "",
                    max_box: "",
                    rate: "",
                  },
                ],
                charge_by_job_count: [
                  {
                    min_job: "",
                    max_job: "",
                    rate: "",
                  },
                ],
              },
              van_customer_bike_job: {
                min_charge_per_job: "",
              },
            },
          },
        },
        e_commerce: {
          bike: {
            delivery_type: [
              {
                delivery_type: "",
                delivery_type_initial: "",
                collect_time: "",
                cut_off_time: "",
                cut_off_days_count: "",
                timeslot_delivery: "",
                timeslot_delivery_fixed_hours: "",
                rates: [
                  {
                    min_units: "",
                    max_units: "",
                    unit_rate: "",
                  },
                ],
                bike_customer_van_job: {
                  van_job_min_cost: "",
                  maximum_weight: "",
                  van_job_add_cost: "",
                  van_job_add_weight: "",
                  van_job_urgent_surcharges: "",
                },
              },
             
            ],
          },
          van: {
            delivery_type: [
              {
                delivery_type: "",
                delivery_type_initial: "",
                collect_time: "",
                cut_off_time: "",
                cut_off_days_count: "",
                timeslot_delivery: "",
                timeslot_delivery_fixed_hours: "",
                rates: [
                  {
                    min_units: "",
                    max_units: "",
                    unit_rate: "",
                  },
                ],
                charge_by_weight: {
                  maximum_weight: "",
                  van_job_add_weight: "",
                  van_job_add_cost: "",
                },
                charge_by_quantity: {
                  maximum_quantity: "",
                  van_job_add_quantity: "",
                  van_job_add_cost: "",
                  box_count_charges: [
                    {
                      box_under: "",
                      rate: "",
                    },
                  ],
                },
                van_customer_bike_job: {
                  min_charge_per_job: "",
                },
              }
            ],
          },
        },
        surcharges: {
          cod_fee: "",
          cod_fee_percentage: "",
          standard_liability: "",
        },
        additional_surcharges: [
          {
            surcharge_name: "",
            rates: "",
          },
        ],
      },
    },

    // charge_type:{normal : { bike :{trips:[{ region_trip_id : "1"},{region_trip_id : "2"}] ,rates : {rates:[{
    //                         "min_units": "0",
    //                         "max_units": "10",
    //                         "unit_rate": "4.5"
    //                     }}}}},
    addRates: ["new_rate"],
    ratesValidation: [
      {
        surcharge_name: { required },
        rates: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      additional_surcharges: [{ surcharge_name: "", rates: "" }],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addRatesClicked > -1) {
      return {
        details: {
          additional_surcharges: this.ratesValidation,
        },
      };
    }
  },
  computed:{
    ...ex_state_master,
  },
async created(){
  await this.getSurchargeNames();
},
  methods: {
    ...exc_master,
     ...mapActions('express', ['createRateCard', 'setCurrentStep']),
     ...mapActions('expressContract',['closeDialog']),

    goBackHandler() {
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddSurcharges",
      }).then(() => {
        this.setCurrentStep(ADD_RATES_STEPS.THREE)
      });
    },
    async addNewSurcharge(e){

    },
    async nextStepHandler() {
     
    try {
      if(this.v$.$invalid){
        this.$toast.add({
        severity: 'error',
        summary: 'Missing Fields',
        detail: 'One of the required fields is empty',
        life: 3000,
      });
      }
      
       if (!this.v$.$invalid) {
       this.$store.state.express.createRateCard=Object.assign(this.$store.state.express.createRateCard,this.details)
     this.charge.charge_type.normal.bike.trips=[]
    for (let i = 0; i < this.$store.state.express.createRateCard.selectedBikeItem.length; i++) {
         this.charge.charge_type.normal.bike.trips.push({region_trip_id: this.$store.state.express.createRateCard.selectedBikeItem[i].trip_id})
      }
    this.charge.charge_type.normal.van.trips=[]
      for (let i = 0; i < this.$store.state.express.createRateCard.selectedVanItem.length; i++) {
          this.charge.charge_type.normal.van.trips.push({region_trip_id:  this.$store.state.express.createRateCard.selectedVanItem[i].trip_id})
      }
        this.charge.charge_type.normal.bike.trips = []
      for (let bikeTrips of this.$store.state.express.createRateCard.selectedBikeItem) {
         this.charge.charge_type.normal.bike.trips.push({region_trip_id:bikeTrips.trip_id})
      }
    this.charge.charge_type.normal.van.trips= []
      for (let vanTrips of this.$store.state.express.createRateCard.selectedVanItem)
      {
    this.charge.charge_type.normal.van.trips.push({region_trip_id:vanTrips.trip_id})
      }
      if(this.$store.state.express.createRateCard.default_rate_card){
        this.$store.state.express.createRateCard.default=this.$store.state.express.createRateCard.default_rate_card
      }
      else{
         this.$store.state.express.createRateCard.default=false
      }
       this.charge.charge_type.normal.bike.rates.rates=[]
      for ( let i = 0; i < this.$store.state.express.createRateCard.normal_bike_rates.length;i++) {
          this.charge.charge_type.normal.bike.rates.rates.push({
            max_units:  this.$store.state.express.createRateCard.normal_bike_rates[i].max_unit,
            min_units:this.$store.state.express.createRateCard.normal_bike_rates[i].min_unit,
            unit_rate:this.$store.state.express.createRateCard.normal_bike_rates[i].rate
        })
      }
        this.charge.charge_type.normal.bike.rates.bike_customer_van_job =
        this.$store.state.express.createRateCard.normal_bike_customer_van_job;
        this.charge.charge_type.normal.van.rates.rates=[]
     for ( let i = 0; i < this.$store.state.express.createRateCard.normal_van_rates.length; i++ ) {
         this.charge.charge_type.normal.van.rates.rates.push({
            max_units:  this.$store.state.express.createRateCard.normal_van_rates[i].max_unit,
            min_units:this.$store.state.express.createRateCard.normal_van_rates[i].min_unit,
            unit_rate:this.$store.state.express.createRateCard.normal_van_rates[i].rate
            })
     
      }
      this.charge.charge_type.normal.van.rates.van_job_urgent_surcharges =
        this.$store.state.express.createRateCard.nomal_van_job_urgent_surcharge;
      this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_quantity.maximum_quantity =
        this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity.maximum_quantity;
      this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_quantity.van_job_add_quantity =
        this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity.van_job_add_quantity;
      this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_quantity.van_job_add_cost =
        this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity.van_job_add_cost;
      this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_weight =
        this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_weight;
     this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_quantity.box_count_charges=[]
     for ( let i = 0; i < this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity_box_count_charges.length; i++) {
          this.charge.charge_type.normal.van.rates.two_tire_rates.charge_by_quantity.box_count_charges.push({
           min_box :this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity_box_count_charges[i].min_box,
           max_box :this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity_box_count_charges[i].max_box,
           rate:this.$store.state.express.createRateCard.normal_van_two_tier_rates_charge_by_quantity_box_count_charges[i].rate
            })
        }
        this.charge.charge_type.normal.van.rates.multi_tire.charge_by_quantity=[]
      for ( let i = 0; i < this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_quantity.length; i++ ) {
         this.charge.charge_type.normal.van.rates.multi_tire.charge_by_quantity.push({
            min_box:this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_quantity[i].min_boxes,
            max_box:this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_quantity[i].max_boxes,
            rate:this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_quantity[i].rate
              })
            }
       this.charge.charge_type.normal.van.rates.multi_tire.charge_by_job_count=[]
      for ( let i = 0; i < this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_job_count.length; i++ ) {
            this.charge.charge_type.normal.van.rates.multi_tire.charge_by_job_count.push({ 
              min_job : this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_job_count[i].min_jobs,
              max_job : this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_job_count[i].max_jobs,
              rate: this.$store.state.express.createRateCard.normal_van_multi_tier_rates_charge_by_job_count[i].rate
          })
        }

     
       this.charge.charge_type.e_commerce.bike.delivery_type=[]
      for ( let i = 0; i < this.$store.state.express.createRateCard.eCommerce_bike_delivery_type.length; i++) {
        this.charge.charge_type.e_commerce.bike.delivery_type[i] = this.$store.state.express.createRateCard.eCommerce_bike_delivery_type[i]
          let collectTime= this.$store.state.express.createRateCard.eCommerce_bike_delivery_type[i].collect_time ;
        if((moment(collectTime, 'DD/MM/YYYY',true).isValid())){
         collectTime=moment(collectTime).format("HH:mm");
        }
          let cut_off_time= this.$store.state.express.createRateCard.eCommerce_bike_delivery_type[i].cut_off_time;
          if((moment(cut_off_time, 'DD/MM/YYYY',true).isValid())){
              cut_off_time=moment(cut_off_time).format("HH:mm");
          }

          this.charge.charge_type.e_commerce.bike.delivery_type[i].collect_time = collectTime
          this.charge.charge_type.e_commerce.bike.delivery_type[i].cut_off_time = cut_off_time
          this.charge.charge_type.e_commerce.bike.delivery_type[i].timeslot_delivery= this.$store.state.express.createRateCard.bike_timeslot_delivery
          this.charge.charge_type.e_commerce.bike.delivery_type[i].timeslot_delivery_fixed_hours= this.$store.state.express.createRateCard.bike_timeslot_delivery_fixed_hours
      }
   
      for (let k = 0; k <this.$store.state.express.createRateCard.eCommerce_van_delivery_type.length; k++) {
        this.charge.charge_type.e_commerce.van.delivery_type[k]=this.$store.state.express.createRateCard.eCommerce_van_delivery_type[k]
 
          let vanCollectTime= this.$store.state.express.createRateCard.eCommerce_van_delivery_type[k].collect_time;
            if((moment(vanCollectTime, 'DD/MM/YYYY',true).isValid())){
                  vanCollectTime=moment(vanCollectTime).format("HH:mm");
              }
          let van_cut_off_time= this.$store.state.express.createRateCard.eCommerce_van_delivery_type[k].cut_off_time;
            if((moment(van_cut_off_time, 'DD/MM/YYYY',true).isValid())){
                van_cut_off_time = moment(van_cut_off_time).format("HH:mm");
              }
            this.charge.charge_type.e_commerce.van.delivery_type[k].collect_time = vanCollectTime
            this.charge.charge_type.e_commerce.van.delivery_type[k].cut_off_time = van_cut_off_time
            this.charge.charge_type.e_commerce.van.delivery_type[k].timeslot_delivery = this.$store.state.express.createRateCard.bike_timeslot_delivery
            this.charge.charge_type.e_commerce.van.delivery_type[k].timeslot_delivery_fixed_hours = this.$store.state.express.createRateCard.bike_timeslot_delivery_fixed_hours
            this.charge.charge_type.e_commerce.van.delivery_type[k].charge_by_quantity.box_count_charges =  this.$store.state.express.createRateCard.eCommerce_van_delivery_type[k].box_count_charges
     
         }
            this.charge.charge_type.normal.van.rates.van_customer_bike_job = this.$store.state.express.createRateCard.normal_van_customer_bike_job;

            this.charge.charge_type.surcharges = this.$store.state.express.createRateCard.surcharges;
            this.charge.charge_type.additional_surcharges = this.$store.state.express.createRateCard.additional_surcharges;
            this.charge.charge_type.additional_surcharges.map((i) => {
            let f_data = this.addNewSurchargeName[0].items.find(
              (u) => u.name == i.surcharge_name?.surcharge_name
            );
            i["geo_fencing_id"] = f_data ? f_data.geo_fencing_id : null;
            i["surcharge_name"] = f_data ? f_data.surcharge_name : "";
            return i;
          });
        this.$store.state.express.createRateCard = Object.assign( this.$store.state.express.createRateCard, this.charge );
        let payload = this.payloadCreator(this.$store.state.express.createRateCard);
        await this.createRateCard(payload)
        this.closeDialog();
       
      this.submitted = true;
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "New data added successfully",
          life: 3000,
        });
       }
    }
    catch (err) {
      
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
      
    },
    payloadCreator(payload) {
      const requiredKeys = [ 'region_id', 'rate_card_name', 'default', 'charge_type'];
      const data = Object.keys(payload)
        .filter((key) => requiredKeys.includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: payload[key],
          });
        }, {});
      return data;
    },
    addRate() {
      this.details.additional_surcharges.push({
        surcharge_name: "",
        rates: "",
      });
      this.ratesValidation.push({
        surcharge_name: { required },
        rates: { required },
      });
      this.addRatesClicked++;
      this.addRates.push("new_rate");
    },
    deleteRate(index) {
      this.details.additional_surcharges.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addRatesClicked++;
    },
  },
};
</script>

<style></style>
