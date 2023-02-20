<template>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-12">
      <h1 class="dialog-label-text header-style">Contract Withdrawal Period</h1>

      <p class="dialog-label-text sentence-style">
        The contract will be withdrawn once it crosses the given withdrawl
        period
      </p>
      <div class="flex justify-content-between margin-right-space">
        <div class="insider-text" v-for="(item, index) in contract_withdrawal_period" :key="index">
          <h6 textfield-textsize>{{ item.name}}</h6>
          <p class="ml-2">:</p>
          <TextField
            type="number"
            v-model="details[item.key]"
            :classes="{
              submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
          <p class="ml-2 sub-header-style">Day(s)</p>
        </div>
      </div>
    </div>

    <!-- Contract termination -->
    <div class="field col-12 md:col-12">
      <h1 class="dialog-label-text header-style">
        Contract Termination withdrawal Period
      </h1>

      <p class="dialog-label-text sentence-style">
        The contract will be withdrawn once it crosses the given withdrawl
        period
      </p>
      <div class="flex justify-content-between margin-right-space">
        <div class="insider-text" v-for="(item, index) in contract_termination_period" :key="index">
          <h6 textfield-textsize>{{ item.name }}</h6>
          <p class="ml-2">:</p>
          <TextField
            type="number"
            v-model="details[item.key]"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
          <p class="ml-2 sub-header-style">Day(s)</p>
        </div>
      </div>
    </div>
    <!-- volumetric -->
    <!-- <div
      class="field col-12 md:col-12 custom"
    > -->
      <h1 class="dialog-label-text header-style ml-2">Volumetric Value</h1>
     <br/>
      <p class="dialog-label-text w-full ml-2 sentence-style">
        Volumetric Value is used for volumetric Weight Calculation
      </p>
      <br/>
      <TextField
        type="number"
        class="mb-5 ml-2"
        v-model="details.volumetric_value"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
    <!-- </div> -->
    <!-- end -->

    <!-- Set Default  -->
    <div class="field col-12 md:col-12">
      <h1 class="dialog-label-text header-style">Set Default Quoation Type</h1>

      <p class="dialog-label-text sentence-style">
        Default type will be appear in website and while creating Quotation
      </p>
<div class="flex">
  <div class="flex-row mr-4">  
      <h5 class="dialog-label-text">Express (Adhoc)</h5>
          <DropDown
            id="country"
            :data="Express"
            code="name"
            :key="$store.state.others.otherFormStateData"
            :state="details.default_quation_express_adhoc"
            v-model="details.default_quation_express_adhoc"
            class="dropdown-width"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
      </div>
  <div class="flex-row">
      <h5 class="dialog-label-text">Rapido (Adhoc)</h5>
          <DropDown
            id="country"
            :data="Adhoc"
            code="name"
            :key="$store.state.others.otherFormStateData"
            :state="details.default_quation_rapido_adhoc"
            v-model="details.default_quation_rapido_adhoc"
            class="dropdown-width"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
      </div>
     </div>
    </div>
  </div>
  <div class="mt-3">
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
      </div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Save"
          class="mr-5"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OthersForm",
  data: () => ({

    Express: [
      { name: "Test", code: "1" },
      { name: "Ok Test", code: "2" },
    ],
    Adhoc: [
      { name: "Test", code: "1" },
      { name: "Ok Test", code: "2" },
    ],
    contract_withdrawal_period: [{name:'International',key:'contract_withdrawal_international_days'},{name:'Express',key:'contract_withdrawal_express_days'},{name:'Rapido',key:'contract_withdrawal_rapido_days'}],
    contract_termination_period: [{name:'International',key:'contract_termination_international_days'},{name:'Express',key:'contract_termination_express_days'},{name:'Rapido',key:'contract_termination_rapido_days'}],
    details : {
            "contract_withdrawal_international_days": '',
            "contract_withdrawal_express_days": '',
            "contract_withdrawal_rapido_days": '',
            "contract_termination_international_days": '',
            "contract_termination_express_days": '',
            "contract_termination_rapido_days": '',
            "volumetric_value": '',
            "default_quation_express_adhoc": '',
            "default_quation_rapido_adhoc": '',
    }

  }),
  methods:{
    submitData(){
       this.$store.dispatch("others/commonCRUD", {
          path: "settings/salesSettinigs/others/others",
          action:"loadOtherFormTab",
          tag: 'update',
          data: this.details,
          mutation: 'fetchOtherFormStateData',
          type:'',
          id_key:'',
          listApiPath:'',

        })
    },
  loadState(){
     if (
        Object.keys(this.$store.state.others.otherFormStateData)
          .length != 0
      ){
     for(let state in this.details){
       this.details[state]=this.$store.state.others.otherFormStateData[0][state];
     }
      }
  }
  },
  watch:{
    '$store.state.others.otherFormStateData':function(){
      this.loadState()
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-label-text {
  font-size: 16px;
}
.insider-text {
  display: flex;
  align-items: baseline;
  ::v-deep input {
    width: 50px !important;
    margin-left: 20px !important;
  }
}
::v-deep .dropdown-width{
  width: 296px !important;
}
h6{
  font-weight: bold !important;
  font-size: 14px !important;
  color: #464648 !important;
}
::v-deep input {
  width: 100px !important;
  margin-left: 0px !important;
}
.insider-text-2 {
  ::v-deep input {
    width: 50px !important;
    margin-left: 20px !important;
  }
}
.margin-right-space{
  margin-right: 250px;
}
.header-style{
  font-weight: 600;
  font-size: 16px;
  color: #4E5868;
}
.sentence-style{
font-size: 14px;
line-height: 17px;
color: #938F8F;
}
.sub-header-style{
  font-size: 14px;
  color: #938F8F;
}
// .custom {
//   ::v-deep div {
//     margin-right: auto;
//   }
// }
</style>