<template>
  <div>
    <div v-if="replace_com" class="flex row pt-5 pb-7">
      <span class="rpla-text"
        >There are
        <span class="primary-color">{{ this.post_data.count }}</span> entries
        for
        <span class="primary-color">"{{ this.post_data.company_name }}"</span
        >.Do you want to replace address for all?</span
      >
    </div>
    <div v-else>
      <div class="row formgrid grid">
        <div class="field col-12 md:col-8">
          <h5 class="text-style">Company Name</h5>
          <TextField
            label="company_name"
            type="text"
            v-model="details.company_name"
            :classes="{
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required text-style">Postal Code</h5>
          <TextField
            label="postal_code"
            type="number"
            v-model="details.postal_code"
            @update:modelValue="getDetail"
            :classes="{
              'p-invalid': v$.details.postal_code.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-12">
          <h5 class="required text-style">Enter the Address</h5>
          <TextField
            label="address"
            type="text"
            v-model="details.address"
            :classes="{
              'p-invalid': v$.details.address.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="text-style">Building Name</h5>
          <TextField
            label="building_name"
            type="text"
            v-model="details.building_name"
            :classes="{
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>

        <div class="grid field col-4 md:col-8 flex">
          <div class="field col-6 md:col-6">
            <h5 class="text-style">Unit No</h5>
            <TextField
              label="unit_no"
              type="number"
              v-model="details.unit_no"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="text-style">Floor No</h5>
            <TextField
              label="floor_no"
              type="number"
              v-model="details.floor_no"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>
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
        <div class="align-self-center flex"></div>
      </div>
    </div>
    <div class="flex align-items-center justify-content-end mx-2">
      <SingleCheckBox
        v-if="!replace_com && customer_data && edit_data_mutiple.length == 0"
        label="Apply Address for All"
        v-model="details.apply_all"
        :value="details.apply_all"
      />
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea mx-3"
        v-on:childToParent="genaralCloseD"
      />
      <Buttons
        v-if="!replace_com"
        label="Save"
        button_class="dialog-button-text bg-357dea "
        v-on:childToParent="submitData"
      />
      <Buttons
        v-if="replace_com"
        label="Continue"
        button_class="dialog-button-text bg-357dea "
        v-on:childToParent="confirmAll"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { genaralAct } from "../../../store/helper";
import { crmClState, crm_Client } from "../../../store/modules/CRM/helper";
import { salesCommon } from "../../../store/helper";
export default {
  name: "EditAdjustment",
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    replace_com: false,
    post_data: null,
    details: {
      company_name: "",
      company_id: "",
      address: "",
      postal_code: "",
      unit_no: "",
      floor_no: "",
      building_name: "",
      apply_all: false,
      confirm: false,
    },
  }),
  validations() {
    return {
      details: {
        company_name: { required },
        address: { required },
        postal_code: { required },
      },
    };
  },
  computed: {
    ...crmClState,
  },
  created() {
    if (this.customer_data) {
      this.prefilleData();
    }
  },

  methods: {
    ...crm_Client,
    ...genaralAct,
    ...salesCommon,
    async getDetail(e) {
      if (e.length > 4) {
        let res = await this.getAddress(e);
        if (res) {
          let data = res.data.results;
          this.details.address = `${data.area_name}`;
          this.details.building_name = data.building_name;
        }
      }
    },
    prefilleData() {
      let b_data = this.customer_data;
      let b1_data = b_data.company;
      this.details.company_id =
        this.edit_data_mutiple.length != 0
          ? this.edit_data_mutiple
          : [parseInt(b_data.id)];
      this.details.company_name = b_data.company_name;
      this.details.address = b_data.address;
      this.details.postal_code = b_data.postal_code;
      this.details.unit_no = b_data.unit_no ?? "";
      this.details.floor_no = b_data.floor_no ?? "";
      this.details.building_name = b_data.building_name ?? "";
    },
    confirmAll() {
      this.details.confirm = true;
      this.replace_com = false;
      this.continueSubmit();
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
        if (this.details.apply_all) {
          this.replace_com = true;
        }
        this.continueSubmit();
      }
    },
    async continueSubmit() {
      if (!this.customer_data) {
        this.details["contract_profile_id"] = this.contract_profile_id;
      }

      this.post_data = await this.actionCustomer({
        payload: this.details,
        toast: this.$toast,
        method: this.customer_data ? "PATCH" : "POST",
      });
      if (this.$route.params?.cusId) {
        let data = {
          customer_id: this.$route.params?.cusId,
        };
        await this.getCustomerSUbClient({ payload: data, toast: this.$toast });
      } else {
        await this.getAllClient({ toast: this.$toast });
      }
      if (!this.replace_com) {
        this.genaralCloseD();
      }
    },
  },
};
</script>

<style scoped>
.text-style {
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  color: #7a7a7a;
}
.rpla-text {
  font-size: 21px;
  color: black;
  text-align: center;
}
.primary-color {
  color: #357dea !important;
}
</style>
