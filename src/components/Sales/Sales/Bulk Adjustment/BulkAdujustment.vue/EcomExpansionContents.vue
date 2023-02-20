<template>
  <div>
    <div>
      <div>Same Day Delivery</div>
      <br />
      <!-- <div class="formgrid grid ml-3 mt-5">
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Jobs</h5>
          <DropDown
            :disabled="true"
            code="name"
            :state="details.customer_type"
            :key="details.customer_type"
            :data="customer_type"
            label="customer_type"
            v-model="details.customer_type"
            :class="{
              'p-invalid': v$.details.customer_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Business Method
          </h5>
          <DropDown
            :disabled="true"
            code="name"
            :data="business_type"
            label="business_type"
            :state="details.business_type"
            :key="details.business_type"
            v-model="details.business_type"
            :class="{
              'p-invalid': v$.details.business_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Jobs</h5>
          <DropDown
            :disabled="true"
            code="name"
            :state="details.customer_type"
            :key="details.customer_type"
            :data="customer_type"
            label="customer_type"
            v-model="details.customer_type"
            :class="{
              'p-invalid': v$.details.customer_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Business Method
          </h5>
          <DropDown
            :disabled="true"
            code="name"
            :data="business_type"
            label="business_type"
            :state="details.business_type"
            :key="details.business_type"
            v-model="details.business_type"
            :class="{
              'p-invalid': v$.details.business_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Jobs</h5>
          <DropDown
            :disabled="true"
            code="name"
            :state="details.customer_type"
            :key="details.customer_type"
            :data="customer_type"
            label="customer_type"
            v-model="details.customer_type"
            :class="{
              'p-invalid': v$.details.customer_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Business Method
          </h5>
          <DropDown
            :disabled="true"
            code="name"
            :data="business_type"
            label="business_type"
            :state="details.business_type"
            :key="details.business_type"
            v-model="details.business_type"
            :class="{
              'p-invalid': v$.details.business_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
      </div> -->
      <div class="flex mr-3">
        <div class="field col-12 md:col-2">
          <h5 class="required color-7a7a7a font-size-14 text-left">
            Min. Unit
          </h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.sameDayDelivery.Jobs"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.sameDayDelivery.no_units"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required color-7a7a7a font-size-14 text-left">
            Increment Amount
          </h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.sameDayDelivery.amount"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required color-7a7a7a font-size-14 text-left">
            Increment Percentage
          </h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            class="mr-5"
            v-model="details.sameDayDelivery.Percentage"
          />
        </div>
        <div class="field col-12 md:col-2">
          <h5 class="required color-7a7a7a font-size-14 text-left">New Cost</h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            class="mr-5"
            v-model="details.sameDayDelivery.Percentage"
          />
        </div>
      </div>
    </div>
    <!-- <div>
      <div>Next Day Delivery</div>
      <br />
      <div class="flex mr-3">
        <div class="field col-12 md:col-3">
          <h5 class="required color-7a7a7a font-size-14 text-left">Jobs</h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.NextDayDelivery.Jobs"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required color-7a7a7a font-size-14 text-left">
            No of Units
          </h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.NextDayDelivery.no_units"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required color-7a7a7a font-size-14 text-left">Amount</h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            v-model="details.NextDayDelivery.amount"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required color-7a7a7a font-size-14 text-left">
            Percentage
          </h5>
          <NumberField
            :showButtons="true"
            mode="decimal"
            class="mr-5"
            v-model="details.NextDayDelivery.Percentage"
          />
        </div>
      </div>
    </div> -->
    <div class="field col-12 md:col-10">
      <h5 class="required color-7a7a7a font-size-14 text-left">Remarks</h5>
      <TextAreaField class="mr-5" v-model="details.remarks" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionTable",
  data() {
    return {
      details: {
        customer_type: "",
        business_type: "",
        sameDayDelivery: {
          Jobs: "",
          no_units: "",
          amount: "",
          Percentage: "",
        },
        NextDayDelivery: {
          Jobs: "",
          no_units: "",
          amount: "",
          Percentage: "",
        },
        remarks: "",
      },
    };
  },
};
</script>

<style>
</style>