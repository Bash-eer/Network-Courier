<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '800px',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div v-if="costCenterDataById">Edit Cost Center</div>
      <div v-else>Add Cost Center</div>
    </template>

    <div class="content">
      <StepperRoute :activeLabel="currentStep" :stepperData="stepperData" />
      <keep-alive>
        <component :is="selectedTab?.component" />
      </keep-alive>
    </div>
    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <div>
          <Buttons
            v-if="currentStep !== 1"
            label="Previous"
            button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
            v-on:childToParent="prevBtn"
          />
        </div>
        <div class="flex align-items-center">
          <Buttons
            label="Cancel"
            button_class="p-button-sm mr-2 p-button-outlined add-btn custom-add-btn"
            v-on:childToParent="$emit('close')"
          />
          <Buttons
            :label="currentStep == '2' ? 'Save' : 'Next'"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            v-on:childToParent="saveBtn"
            :loading="isloading"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import costCenter from "./costCenter.vue";
import location from "./location.vue";
import { errhandler } from "@/services/httpClient";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Dialog,
    costCenter,
    location,
  },
  props: ["show"],
  data() {
    return {
      isloading: false,
      renderKey: 10,
      isValid: true,
      stepperData: [
        {
          label: 1,
          name: "Add Cost Center",
          component: "costCenter",
        },
        {
          label: 2,
          name: "Pick Up Locations",
          component: "location",
        },
      ],
      currentStep: 1,
      selectedTab: null,
      showDialog: this.$props.show,
      formData: {
        cost_center_name: "",
        address: "",
        postal_code: "",
        country: "",
        state: "",
        floor_no: "",
        building_name: "",
        unit_no: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        cost_center_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
        state: { required },
        floor_no: { required },
        building_name: { required },
        unit_no: { required },
      },
    };
  },
  watch: {
    currentStep() {
      this.selectedTab = this.stepperData[this.currentStep - 1];
    },
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      this.showDialog = value;

      if (!this.showDialog) {
        this.currentStep = 1;
        this.setCostCenterDialog(false);
        this.clearCostCenterDataById(null);
      }
    },
  },
  computed: {
    ...mapGetters({
      costCenterData: "salesRapidoContract/Contract/costCenterData",
      costCenterDataById: "salesRapidoContract/Contract/costCenterDataById",
      isCostCenterValid: "salesRapidoContract/Contract/isCostCenterValid",
      islocationInputValid: "salesRapidoContract/Contract/islocationInputValid",
      btnKey: "salesRapidoContract/Contract/btnKey",
    }),
  },
  methods: {
    ...mapActions({
      saveCostCenterData: "salesRapidoContract/Contract/saveCostCenterData",
      setCostCenterData: "salesRapidoContract/Contract/setCostCenterData",
      editCostCenter: "salesRapidoContract/Contract/editCostCenter",
      setCostCenterDialog: "salesRapidoContract/Contract/setCostCenterDialog",
      clearCostCenterData: "salesRapidoContract/Contract/clearCostCenterData",
      setBtnKey: "salesRapidoContract/Contract/setBtnKey",
      resetCostCenterStore: "salesRapidoContract/Contract/resetCostCenterStore",
      clearCostCenterDataById:
        "salesRapidoContract/Contract/clearCostCenterDataById",
    }),
    async saveBtn() {
      this.setBtnKey();
      if (this.currentStep == 1) {
        if (this.isCostCenterValid) {
          this.currentStep = 2;
          return;
        }
      }

      if (this.islocationInputValid) {
        if (this.costCenterDataById) {
          try {
            this.isloading = true;
            await this.editCostCenter({
              type: this.$route.params.type,
              id: this.costCenterDataById.id,
              payload: this.costCenterData,
            });
            this.isloading = false;
            this.clearCostCenterDataById(null);
            this.$emit("close");
            this.$emit("save");
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Data edited successfully",
              life: 3000,
            });
            this.clearCostCenterData();
            this.resetCostCenterStore();
          } catch (err) {
            this.isloading = false;
            let toastMsg = await errhandler(err);
            this.$toast.add({
              severity: toastMsg.serverity,
              summary: toastMsg.summary,
              detail: toastMsg.msg,
              life: 3000,
            });
          }
        } else {
          try {
            this.isloading = true;
            await this.saveCostCenterData({
              type: this.$route.params.type,
              payload: this.costCenterData,
            });
            this.isloading = false;
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "New data added successfully",
              life: 3000,
            });
            this.clearCostCenterDataById(null);
            this.clearCostCenterData();
            this.$emit("close");
            this.resetCostCenterStore();
            this.$emit("save");
          } catch (err) {
            this.isloading = false;
            let toastMsg = await errhandler(err);
            this.$toast.add({
              severity: toastMsg.serverity,
              summary: toastMsg.summary,
              detail: toastMsg.msg,
              life: 3000,
            });
          }
        }
      }
    },
    prevBtn() {
      if (this.currentStep == 2) {
        this.currentStep = 1;
        return;
      }
    },
  },
  created() {
    this.currentStep = 1;
    this.selectedTab = this.stepperData[this.currentStep - 1];

    let type = this.$route.params.type;

    if (type == "quotation") {
      this.setCostCenterData({
        value: { customer_type: "rapido", quotation_id: this.$route.params.id },
      });
    } else {
      this.setCostCenterData({
        value: { customer_type: "rapido", contract_id: this.$route.params.id },
      });
    }

    // this.setCostCenterDataById();
    // this.renderKey++;
  },
};
</script>

<style>
</style>