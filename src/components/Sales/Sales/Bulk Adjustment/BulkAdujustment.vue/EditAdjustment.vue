<template>
  <div>
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex ">
          <CheckBox
            v-bind:categories="[
              {
                name: 'Rebate',
                key: 'a',
              },
            ]"
          />
        </div>
        <div class="flex">
          <span class=" color-343434 text-xs font-bold line-height-42">Rebate</span>
        </div>
      </div>
    </div><br>
    <div class="formgrid grid flex justify-content-between">
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Credit Limit $</h5>
        <TextField label="profile_name" type="text" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Effective From Date</h5>
        <Calendar label="profile_name" type="text" showIcon="true" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Effective to Date</h5>
        <Calendar label="short_name" type="text" showIcon="true" />
      </div>
    </div>
    <div class="color-343434 text-sm ml-2 mb-2 font-bold">Monthly minimum</div>
    <div class="formgrid grid flex justify-content-between">
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Job$</h5>
        <TextField label="profile_name" type="text" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">no of units</h5>
        <TextField label="profile_name" type="text" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Amount</h5>
        <TextField label="short_name" type="text" />
      </div>
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required text-style">Additional Jobs</h5>
      <TextField label="short_name" type="text" />
    </div>
    <div class="color-343434 text-sm ml-2 mb-2 font-bold">Charges</div>
    <div class="formgrid grid flex justify-content-between">
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Sms</h5>
        <TextField label="profile_name" type="text" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Special Urgent Price $</h5>
        <TextField label="profile_name" type="text" />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required text-style">Ftz$</h5>
        <TextField label="short_name" type="text" />
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:categories="[
              {
                name: 'Std Entries',
                key: 'a',
              },
            ]"
          />
        </div>
        <div class="flex">
          <span class=" color-343434 text-sm font-bold line-height-42">Std Entries</span>
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-14">
      <h5 class="required text-style text-left">Remarks</h5>
      <TextAreaField class="mr-5" />
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
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <CancelButton storePath="salesSales" label="Cancel" />
        <Buttons
          label="Save"
          button_class="dialog-button-text "
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditAdjustment",
};
</script>

<style scoped>
.text-style{
  font-weight: 500;
font-size: 14px;
line-height: 28px;
color: #7A7A7A;
}
</style>