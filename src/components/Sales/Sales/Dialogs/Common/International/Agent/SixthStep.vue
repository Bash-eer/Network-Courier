<template>
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-16 color-343434 mt-4 ml-3 mb-0 pb-0">
      Onforwarding
    </p>
  </div>
  <div v-for="(item, index) of details.serviceList" :key="index">
    <div class="formgrid grid">
      <div class="col-4 ml-3">
        <h5 class="bold-600 font-size-16 color-4e5868 head pb-1">
          {{ item.service_provider }}
        </h5>
      </div>
    </div>
    <div class="formgrid grid ml-3">
      <div :key="renderKey" class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Import</h5>
        <!-- <DropDown
        code="name"
        :data="item.import??[]"
        label="import"
        v-model="item.import_value"
        :class="{
            //  'p-invalid': v$.details.import_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
        <DropDownField
          :key="renderKey"
          :value="item.import_value"
          code="name"
          :data="item.import ?? []"
          label="import"
          v-model="item.import_value"
          :class="{
            //  'p-invalid': v$.details.import_value.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Export</h5>
        <!-- <DropDown
        code="name"
        :data="item.export??[]"
        label="export"
        v-model="item.export_value"
        :class="{
            //  'p-invalid': v$.details.export_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
        <DropDownField
          :key="renderKey"
          :value="item.export_value"
          code="name"
          :data="item.export ?? []"
          label="export"
          v-model="item.export_value"
          :class="{
            //  'p-invalid': v$.details.export_value.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Local</h5>
        <!-- <DropDown
        code="name"
        :data="item.local??[]"
        label="local"
        v-model="item.local_value"
        :class="{
            //  'p-invalid': v$.details.local_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
        <DropDownField
          :key="renderKey"
          :value="item.local_value"
          code="name"
          :data="item.local ?? []"
          label="local"
          v-model="item.local_value"
          :class="{
            //  'p-invalid': v$.details.local_value.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>

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
import { mapActions, mapState } from "vuex";
// import { required } from "@vuelidate/validators";
export default {
  name: "SalesInternationalAgentSixthStep",
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    details: {
      serviceList: [],
      import_value: "",
      export_value: "",
      local_value: "",
    },
    import_value: [
      { name: "Rate Card 1", code: "USD" },
      { name: "Rate Card 2", code: "SGD" },
    ],
    export_value: [
      { name: "New", code: "USD" },
      { name: "None", code: "USD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        // import_value: { required },
        // export_value: { required },
        // local_value: { required },
      },
    };
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  methods: {
    ...mapActions({
      getServiceProvider: "salesInternationalAgent/getServiceProvider",
      setPostData: "salesInternationalAgent/setPayloadPostData",
      setAgentStep: "salesInternationalAgent/setAgentStep",
    }),
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentFifthStep",
      });
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let { serviceList } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let localAssign = [];
        serviceList.map((e) => {
          let first = e.import.find((i) => i.name === e.import_value);
          let second = e.export.find((i) => i.name === e.export_value);
          let third = e.local.find((i) => i.name === e.local_value);
          localAssign.push({
            agent_name: e.service_provider,
            agent_id: e.id,
            import: first?.name ?? "",
            export: second?.name ?? "",
            local: third?.name ?? "",
            import_rate_card_id: first?.code ?? 0,
            export_rate_card_id: second?.code ?? 0,
            local_rate_card_id: third?.code ?? 0,
          });
        });
        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            onfarwards: localAssign,
          },
        };
        this.setPostData({ type: payload });
this.$store.state.salesInternationalAgent.agentStep++;
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentSeventhStep",
        });
      }
      
    },
    async getServiceProviderList() {
      let res = await this.getServiceProvider();

      //  this.details.clearance= res.data.results;
      if (res) {
        if (this.quotationData) {
          this.quotationData.international_agent_specifics.onfarwards.map(
            (e) => {
              let resultsData = res.data.results.find(
                (i) => i.service_provider === e.agent_name
              );
              let import1 = [];
              let import2 = [];
              let import3 = [];
              resultsData.rate_card.import.map((i) => {
                import1.push({
                  name: i.rate_card_name,
                  code: i.id,
                });
              });
              resultsData.rate_card.export.map((i) => {
                import2.push({
                  name: i.rate_card_name,
                  code: i.id,
                });
              });
              resultsData.rate_card.local.map((i) => {
                import3.push({
                  name: i.rate_card_name,
                  code: i.id,
                });
              });
              this.details.serviceList.push({
                service_provider: e.agent_name,
                id: e.agent_id,
                import_value: e.import,
                export_value: e.export,
                local_value: e.local,
                import: import1,
                export: import2,
                local: import3,
              });
            }
          );
          this.renderKey++;
        } else {
          res.data.results.map((e) => {
            let import1 = [];
            let import2 = [];
            let import3 = [];
            e.rate_card.import.map((i) => {
              import1.push({
                name: i.rate_card_name,
                code: i.id,
              });
            });
            e.rate_card.export.map((i) => {
              import2.push({
                name: i.rate_card_name,
                code: i.id,
              });
            });
            e.rate_card.local.map((i) => {
              import3.push({
                name: i.rate_card_name,
                code: i.id,
              });
            });
            this.details.serviceList.push({
              service_provider: e.service_provider,
              id: e.id,
              import_value: "",
              export_value: "",
              local_value: "",
              import: import1,
              export: import2,
              local: import3,
            });
          });
        }
      }
    },
    prefillData() {},
  },
  mounted() {
    //  if (this.quotationData) {
    //     this.prefillData();
    //   } else {
    this.getServiceProviderList();
    // }
  },
};
</script>

<style></style>
