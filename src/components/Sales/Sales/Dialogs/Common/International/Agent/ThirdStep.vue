<template>
  <div class="field col-12 md:col-12 mt-6 mb-0">
    <p class="bold-600 font-size-16 color-343434 ml-3">Agency Profile</p>
  </div>
  <div class="formgrid grid ml-3 mb-2">
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a ">Status</h5>
      <!-- <DropDown
        code="name"
        :data="status"
        label="status"
        v-model="details.status"
        :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
        :key="renderKey"
        :value="details.status"
        code="name"
        :data="status"
        label="status"
        v-model="details.status"
        :class="{
          // 'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-8">
      <h5 class="bold-500 font-size-14 color-7a7a7a">If Others</h5>
      <TextField
        label="if_others"
        v-model="details.if_others"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3 justify-content-between mb-2">
    <div class="field col-12 md:col-5">
      <h5 class="bold-500 font-size-14 color-7a7a7a">
        Name Of Managing Director
      </h5>
      <TextField
        label="name_of_director"
        type="text"
        v-model="details.name_of_director"
        :classes="{
          // 'p-invalid': v$.details.name_of_director.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">
        Capital Declared
      </h5>
      <TextField
        label="capital_declared"
        type="text"
        v-model="details.capital_declared"
        :classes="{
          // 'p-invalid': v$.details.capital_declared.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">
        Paid Up Capital
      </h5>
      <TextField
        label="paid_capital"
        type="text"
        v-model="details.paid_capital"
        :classes="{
          // 'p-invalid': v$.details.paid_capital.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div
    class="formgrid grid ml-3 mb-0"
    v-for="(item, index) of details.share"
    :key="index"
  >
    <div class="field col-12 md:col-6">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">Share Holder</h5>
      <TextField
        label="share_holder"
        type="text"
        v-model="item.share_holder"
        :classes="{
          // 'p-invalid':
            // v$.details.share[index]?.share_holder.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">Percentage</h5>
      <TextField
        type="number"
        label="percentage"
        v-model="item.percentage"
        :classes="{
          // 'p-invalid':
          //   v$.details.share[index]?.percentage.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex ml-4 mb-2 mt-0">
    <span class="bold-600 font-size-14 color-357dea mt-0" @click="addSale"
      ><b>+ Add New Share Holder </b></span
    >
  </div>
  <br />
  <div
    class="formgrid grid ml-3 mb-0"
    v-for="(item, index) of details.branchAffiliates"
    :key="index"
  >
    <div class="field col-12 md:col-12">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">
        Branches & Affiliates
      </h5>
      <TextField
        label="branches_affiliates"
        type="text"
        v-model="item.branches_affiliates"
        :classes="{
          // 'p-invalid':
          //   v$.details.branchAffiliates[index]?.branches_affiliates.$invalid &&
          //   submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex ml-4 mb-2 mt-0">
    <span class="bold-600 font-size-14 color-357dea mt-0" @click="addSale1"
      ><b>+ Add New Branches & Affiliates </b></span
    >
  </div>
  <br />
  <div class="formgrid grid ml-3 mb-3">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Main Bank</h5>
      <TextField
        label="main_bank"
        type="text"
        v-model="details.main_bank"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Branch</h5>
      <TextField
        label="branch"
        type="text"
        v-model="details.branch"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- Clendar -->
  <div class="formgird grid ml-3">
    <div class="field col-12 md:col-3">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Establishment Year</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="false"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.establishment_year"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="bold-500 font-size-14 color-7a7a7a">
        Fiscal Year Ending Date
      </h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="false"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.fiscal_year_ending_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="bold-600 font-size-16 color-343434 ml-3 mb-0">Potential</p>
  </div>
  <!-- Same field repeated 4 times with required in figma, so adding dummy data  -->
  <!-- <div  > -->
  <div
    class="formgrid grid ml-3"
    v-for="(item, index) of details.questions"
    :key="index"
  >
    <div v-if="details.questions[index]" class="field col-12 md:col-12">
      <h5 class=" bold-500 font-size-14 color-7a7a7a">
        {{ details.questions[index].question ?? "" }}
      </h5>
      <TextField
        label="delivery"
        type="text"
        v-model="details.questions[index].value"
        :classes="{
          // 'p-invalid': v$.details.questions[index]?.value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- </div> -->
  <div class="formgrid grid pl-2 pr-2">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text color-357dea ml-3"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesInternationalAgent"
          label="Cancel"
          class="color-357dea"
          @click="closeDialog"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "vuex";
export default {
  name: "SalesInternationalAgentThirdStep",
  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    salesValidation: [],
    shareValidation: [{ share_holder: { required }, percentage: { required } }],
    branchValidation: [
      {
        branches_affiliates: { required },
      },
    ],
    renderKey: 1,
    details: {
      status: "Private",
      if_others: "",
      name_of_director: "",
      capital_declared: "0",
      paid_capital: "",
      share: [{ share_holder: "", percentage: "0" }],
      branchAffiliates: [
        {
          branches_affiliates: "",
        },
      ],
      main_bank: "",
      branch: "",
      establishment_year: null,
      fiscal_year_ending_date: null,
      questions: [],
    },
    potential: [],

    status: [
      { name: "Limited", code: "USD" },
      { name: "Private", code: "SGD" },
      { name: "Joint-Venture", code: "SGD" },
      { name: "Others", code: "SGD" },
    ],

    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          // questions: this.salesValidation,
          // status: { required },
          // name_of_director: { required },
          // capital_declared: { required },
          // paid_capital: { required },

          // share: this.shareValidation,
          // branchAffiliates: this.branchValidation,
        },
      };
    }
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  methods: {
    ...mapActions({
      getQuestionList: "salesInternationalAgent/getQuestionList",
      setAgentStep: "salesInternationalAgent/setAgentStep",
      setPostData: "salesInternationalAgent/setPayloadPostData",
    }),
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentSecondStep",
      });
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let {
        status,
        paid_capital,
        capital_declared,
        name_of_director,
        if_others,
        fiscal_year_ending_date,
        establishment_year,
        branch,
        main_bank,
        branchAffiliates,
        share,
        questions,
      } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let shareHolder = [];
        let branchlist = [];
        let qusList = [];
        share.map((i) => {
          shareHolder.push({
            share_holder_name: i.share_holder,
            share_percent: i.percentage,
          });
        });
        branchAffiliates.map((e) => {
          branchlist.push({
            branch_affiliate: e.branches_affiliates,
          });
        });
        questions.map((i) => {
          qusList.push({
            question: i.question,
            response: i.value,
          });
        });
        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            agent_profile: {
              status: status,
              other_status: if_others,
              md_name: name_of_director,
              declared_capital: capital_declared,
              paid_capital: paid_capital,
              main_bank: main_bank,
              branch: branch,
              establishment_year: establishment_year,
              fiscal_year_ending_date: fiscal_year_ending_date,
              share_holders: shareHolder,
              branch_affiliates: branchlist,
            },
            potentials: qusList,
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesInternationalAgent.agentStep++;
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentFourthStep",
        });
      }
      
    },
    addSale() {
      this.details.share.push({ share_holder: "", percentage: "" });
      this.shareValidation.push({
        share_holder: { required },
        percentage: { required },
      });
      this.addSalesClicked++;
      // this.addSales.push("new_sales");
    },
    addSale1() {
      this.details.branchAffiliates.push({
        branches_affiliates: "",
      });
      this.branchValidation.push({ branches_affiliates: { required } });
      this.addSalesClicked++;
      // this.addSales.push("new_sales");
    },
    async getQuestions() {
      let res = await this.getQuestionList();

      if (res) {
        let data = res.data.results;
        data.map((list) => {
          this.details.questions.push({
            id: list.id,
            question: list.question,
            value: "",
          });
          this.salesValidation.push({
            value: { required },
          });
          this.addSalesClicked++;
        });
      }
    },
    prefillData() {
      let overViewData =
        this.quotationData?.international_agent_specifics?.agent_profile;
      (this.details.status = overViewData?.status),
        (this.details.if_others = overViewData?.other_status),
        (this.details.name_of_director = overViewData?.md_name),
        (this.details.capital_declared = overViewData?.declared_capital),
        (this.details.paid_capital = overViewData?.paid_capital),
        (this.details.main_bank = overViewData?.main_bank),
        (this.details.branch = overViewData?.branch),
        (this.details.establishment_year = overViewData?.establishment_year),
        (this.details.fiscal_year_ending_date =
          overViewData?.fiscal_year_ending_date);

      let shareData = [];
      let branchData = [];
      let potential = [];
      overViewData?.share_holders.map((i) => {
        shareData.push({
          share_holder: i.share_holder_name,
          percentage: i.share_percent,
        });
      });
      overViewData?.branch_affiliates.map((i) => {
        branchData.push({
          branches_affiliates: i.branch_affiliate,
        });
      });
      this.quotationData.international_agent_specifics.potentials.map((i) => {
        potential.push({
          id: i.id,
          question: i.question,
          value: i.response,
        });
      });
      this.details.questions = potential;
      (this.details.share = shareData),
        (this.details.branchAffiliates = branchData),
        this.renderKey++;
    },
    initialize(){
      this.details.status='Private'
    }
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.getQuestions();
      this.initialize()
    }
  },
};
</script>

<style></style>
