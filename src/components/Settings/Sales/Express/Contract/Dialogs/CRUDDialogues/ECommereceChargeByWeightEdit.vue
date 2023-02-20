<template>
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <label class="required color-7a7a7a font-size-14 bold-500">Maximum Quantity</label>
              <NumberField
                  v-model="details.maximum_quantity"
                  mode="decimal"
                  :maxFractionDigits="2"
                  :max='0'
                  :classes="{
                  // 'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
               />
            </div>
            <div class="field col-12 md:col-4">
              <label class="required color-7a7a7a font-size-14 bold-500">Van Job Add. Quantity</label>
              <NumberField
                  v-model="details.van_job_add_quantity"
                  mode="decimal"
                  :maxFractionDigits="2"
                  :max='0'
                  :classes="{
                  // 'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
               />
            </div>
            <div class="field col-12 md:col-4">
              <label class="required color-7a7a7a font-size-14 bold-500"
                >Van Job Add. Cost $
              </label>
              <NumberField
                  v-model="details.van_job_add_cost"
                  mode="decimal"
                  :maxFractionDigits="2"
                  :max='0'
                  :classes="{
                  // 'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
               />
           
            </div>
          </div>
    <!-- Button -->
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Close"
        v-on:childToParent="cancel"
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />

      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitData"
      />
    </div>
</template>

<script>
export default {
    name: "ECommereceChargeByWeightEdit",
    data: () => ({
    details: {
          maximum_quantity: "",
          van_job_add_quantity: "",
          van_job_add_cost: "",
        },
  }),
  components: {
    
  },
  
};
</script>

<style scoped>
</style>