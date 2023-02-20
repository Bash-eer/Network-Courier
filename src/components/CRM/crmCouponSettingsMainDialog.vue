<template>
  <Dialog
    v-model:visible="$store.state['CrmSettings'].displayCouponDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
      backgroundColor: color(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
    :closable="true"
  >
    <!--dialog header-->
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex">
          <h4 class="font-size-16 color-4e5968 dialog-header">
            {{
              CouponSettingsData?.id
                ? "Edit Coupon Settings"
                : "New Coupon Settings"
            }}
          </h4>
        </div>
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <!-- <component v-bind:is="dialogComponent" class="tab"> </component> -->
    <couponSettingsFields :filledData="filledData" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
// import feedbackSettings from "./Dialogs/feedbackSettings.vue";
import couponSettingsFields from "./Dialogs/couponSettingsFields.vue";
export default {
  name: "CRMCouponSettingsMainDialog",
  props: ["dialogComponent"],
  components: {
    Dialog,
    couponSettingsFields,
  },
  data() {
    return {
      filledData: {},
    };
  },
  methods: {
    getHeight() {
      return "80vh";
    },
    getWidth() {
      return "60vw";
    },
    color() {
      return "white";
    },
  },
  created() {},
  computed: {
    ...mapGetters({
      feedbackSettingsData: "CrmSettings/getEditFeedbackSettingsData",
      CouponSettingsData: "CrmSettings/getEditCouponSettingsData",
    }),
  },
  watch: {
    CouponSettingsData: function (newVal, oldVal) {
      let objectBoolean = Object.keys(newVal).length;
      if (objectBoolean > 0) {
        let data = {
          logisticsId: newVal.id,
          ShipmentType: newVal.shipment_type,
          fromPost: newVal.from_postal,
          toPost: newVal.to_postal,
          minWeight: newVal.min_weight,
          maxWeight: newVal.max_weight,
          building_type: newVal.building_type,
          default_logistics: newVal.default_logistics,
          company_id: newVal.company_id,
          logistic_type: newVal.logistic_type,
          company: newVal.company,
        };
        this.filledData = data;
      } else {
        this.filledData = {};
      }
    },
  },
  mounted() {
    if (Object.keys(this.CouponSettingsData).length) {
      let data = {
        logisticsId: this.CouponSettingsData.id,
        ShipmentType: this.CouponSettingsData.shipment_type,
        fromPost: this.CouponSettingsData.from_postal,
        toPost: this.CouponSettingsData.to_postal,
        minWeight: this.CouponSettingsData.min_weight,
        maxWeight: this.CouponSettingsData.max_weight,
        building_type: this.CouponSettingsData.building_type,
        default_logistics: this.CouponSettingsData.default_logistics,
        company_id: this.CouponSettingsData.company_id,
        logistic_type: this.CouponSettingsData.logistic_type,
        company: this.CouponSettingsData.company,
      };

      this.filledData = data;
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  font-weight: 700;
}
::v-deep .p-chips .p-chips-multiple-container .p-chips-token {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 4px;
}
</style>
