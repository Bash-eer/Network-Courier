<template>
  <div>
    <div class="title flex justify-content-start">Bike Customer Van job</div>
    <div class="flex align-items-end mt-3">
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Van Job Min. Cost $</div>
        <NumberField
          label="van_job_min_cost"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.van_job_min_cost"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Kgs</div>
        <NumberField
          label="maximum_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.maximum_weight"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Van Job Add. Cost $</div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_cost"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Kgs $</div>
        <NumberField
          label="van_job_add_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.van_job_add_weight"
        />
      </div>
    </div>
    <div class="input-wrapper col-3 mt-2">
      <div class="label flex align-items-start mb-2">
        Van Job Urgent. Surcharge $
      </div>
      <NumberField
        label="van_job_urgent_surcharges"
        mode="decimal"
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.van_job_urgent_surcharges"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["deliveryIdx"],
  data() {
    return {
      formData: {
        van_job_min_cost: "",
        maximum_weight: "",
        van_job_add_cost: "",
        van_job_add_weight: "",
        van_job_urgent_surcharges: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      bike: "AddNewInternationalLocal/Ecommerce/bike",
    }),
  },
  methods: {
    ...mapActions({
      setBikeDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setBikeDeliveryData",
    }),
    getUserInput() {
      this.setBikeDeliveryData({
        type: "bike_customer_van_job",
        idx: this.$props.deliveryIdx,
        data: this.formData,
      });
    },
    prefillData() {
      let data =
        this.bike.delivery_type[this.$props.deliveryIdx].bike_customer_van_job;

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    console.log("created ///////////////////////////////////////");
    this.setBikeDeliveryData({
      type: "bike_customer_van_job",
      idx: this.$props.deliveryIdx,
      data: this.formData,
    });
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>