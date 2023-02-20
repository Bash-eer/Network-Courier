<template>
  <div class="content">
    <DeliveryType
      @isFormValid="isFormValid"
      @getData="getData"
      :saveKey="saveKey"
    />
  </div>
   <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
      v-on:childToParent="cancel"
    />
    <Buttons
      label="Save"
      button_class="p-button-sm mr-4 add-btn custom-add-btn"
      v-on:childToParent="save"
      :loading="isloading"
    />
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import DeliveryType from "./VanTableComponent/DeliveryType/index.vue";
import { errhandler } from "@/services/httpClient";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    DeliveryType,
  },
  props: {
    submitForm: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      serviceId: null,
      bool: true,
      isSaveValid: false,
      showDialog: this.$props.show,
      saveKey: 10,
      e_data: {},
      isValid: true,
      formData: {
        delivery_type: "",
        delivery_type_initial: "",
        collect_time: "",
        cut_off_time: "",
        cut_off_days_count: "",
        timeslot_delivery_fixed_hours: "",
        timeslot_delivery: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        delivery_type: { required },
        delivery_type_initial: { required },
        collect_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        timeslot_delivery_fixed_hours: { required },
        timeslot_delivery: { required },
      },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      if (!value) this.$emit("close");
    },
  },
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    this.initialised();
  },
  methods: {
    ...mapActions("express", ["createEcommerceVanDelivery"]),
    ...mapActions("express", ["getRegionRatesById"]),
    initialised() {
      this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(() => {
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (this.regionRatesByIdData.charge_types[i].charge_type == "e_commerce") {
            for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].e_commerce_services.length; j++ ) {
              if ( this.regionRatesByIdData.charge_types[i].e_commerce_services[j].service_type == "van" ) {
                this.serviceId = this.regionRatesByIdData.charge_types[i].e_commerce_services[j].id;
              }
            }
          }
        }
      });
    },
    isFormValid(value) {
      this.isSaveValid = value;
      this.saveData();
    },
    getData({ field, data }) {
      if (field) {
        this.e_data[field] = data;
      } else {
        this.e_data = { ...this.e_data, ...data };
      }
    },
    getUserInput(label, value) {
      if (label == "cut_off_time" || label == "collect_time") {
        this.formData[label] = moment(value).format("HH:mm");
      }
    },
    cancel() {

        this.$emit('cancel');
    
    },
    async saveData() {
      if (!this.isSaveValid) {
        return;
      }

      try {
        this.isloading = true;
        Object.assign(this.e_data, { service_id: Number(this.serviceId) });
        let formData = this.e_data;
        await this.createEcommerceVanDelivery(formData).then(() => {
          this.bool = false;
        });
        this.submitForm(this.bool);
        this.$emit("close");
        this.$emit("save");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "New data added successfully",
          life: 3000,
        });
        this.isloading = false;
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
    },
    async save() {
      this.saveKey++;

      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "e_delivery_type_v") {
        try {
          this.isloading = true;
          await this.editDeliveryType({
            id: this.editData.data.id,
            data: {
              ...this.formData,
            },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Details updated successfully",
            life: 3000,
          });
          this.isloading = false;
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
    },
  },
  created() {},
};
</script>

<style>
</style>