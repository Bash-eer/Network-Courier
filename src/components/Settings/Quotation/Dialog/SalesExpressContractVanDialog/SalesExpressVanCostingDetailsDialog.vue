<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="Normal (Monthly Minimum)">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <label class="required dialog-label-text">No. of Units ($)</label>
          <TextField
            label="no_of_units"
            type="number"
            v-model="details.no_of_units"
            :classes="{
              'p-invalid': v$.details.no_of_units.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Job $</h5>
          <TextField
            label="adjustment_jobs"
            type="number"
            v-model="details.adjustment_jobs"
            :classes="{
              'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label class="required dialog-label-text">Amount </label>
          <TextField
            label="adjustment_amount"
            type="number"
            v-model="details.adjustment_amount"
            :classes="{
              'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <label class="required dialog-label-text">Additional Job $ </label>
          <TextField
            label="additional_job"
            type="number"
            v-model="details.additional_job"
            :classes="{
              'p-invalid': v$.details.additional_job.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Van Urgent Surcharge $</h5>
          <TextField
            label="van_urgent_surcharge"
            type="number"
            v-model="details.van_urgent_surcharge"
            :classes="{
              'p-invalid':
                v$.details.van_urgent_surcharge.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add Contact </b></span>
      </div>
      <AccordionTab header="2 tier"> </AccordionTab>
      <AccordionTab header="multi-tier"> </AccordionTab>
    </AccordionTab>
    <!-- Method  -->
    <AccordionTab header="E-commerce">
      <div class="flex mt-2 mb-4">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Same Night Delivery',
                        tag: 'Same Night Delivery',
                        key: 'Same Night Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Same Night Delivery',
                  tag: 'Same Night Delivery',
                  key: 'Same Night Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Next Day Delivery',
                        tag: 'Next Day Delivery',
                        key: 'Next Day Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Next Day Delivery',
                  tag: 'Next Day Delivery',
                  key: 'Next Day Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="checksText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Regular Delivery',
                        tag: 'Regular Delivery',
                        key: 'Regular Delivery',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Regular Delivery',
                  tag: 'Regular Delivery',
                  key: 'Regular Delivery',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <DuoSelection
        class="mb-4"
        :options="[
          'Same Night Delivery',
          'Next Day Delivery',
          'Regular Delivery',
        ]"
        :default="defaultTransportType"
        type="setRegionDeliveryTransportType"
      />
      <div v-if="defaultTransportType == 'Same Night Delivery'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">No. of Units ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $</h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Additional Job $ </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid':
                  v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">
              Timeslot Delivery (Fixed 2 hours)
            </h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Cut Off Time $ </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid':
                  v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="defaultTransportType == 'Next Day Delivery'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">No. of Units ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $</h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Additional Job $ </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid':
                  v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">
              Timeslot Delivery (Fixed 2 hours)
            </h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Cut Off Time $ </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid':
                  v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="defaultTransportType == 'Regular Delivery'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">No. of Units ($)</label>
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              :classes="{
                'p-invalid': v$.details.no_of_units.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Job $</h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details.adjustment_jobs.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Amount </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Additional Job $ </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details.additional_job.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Standard Liability $</h5>
            <TextField
              label="standard_liability"
              type="number"
              v-model="details.standard_liability"
              :classes="{
                'p-invalid':
                  v$.details.standard_liability.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">
              Timeslot Delivery (Fixed 2 hours)
            </h5>
            <TextField
              label="timeslot_delivery"
              type="number"
              v-model="details.timeslot_delivery"
              :classes="{
                'p-invalid': v$.details.timeslot_delivery.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Cut Off Time $ </label>
            <TextField
              label="cut_off_time"
              type="number"
              v-model="details.cut_off_time"
              :classes="{
                'p-invalid': v$.details.cut_off_time.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Cut Off Days Count</h5>
            <TextField
              label="cut_off_days_count"
              type="number"
              v-model="details.cut_off_days_count"
              :classes="{
                'p-invalid':
                  v$.details.cut_off_days_count.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <DuoSelection
        class="mb-4"
        :options="['Charge by Weight', 'Charge by Quantity']"
        :default="ecommerceTransportType"
        type="setRegionDeliveryTransportType"
      />
      <div v-if="ecommerceTransportType == 'Charge by Weight'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Maximum Quantity</label>
            <TextField
              label="maximum_quantity"
              type="number"
              v-model="details.maximum_quantity"
              :classes="{
                'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Van Job Add. Quantity</h5>
            <TextField
              label="van_job_add_quantity"
              type="number"
              v-model="details.van_job_add_quantity"
              :classes="{
                'p-invalid':
                  v$.details.van_job_add_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text"
              >Van Job Add. Cost $
            </label>
            <TextField
              label="van_job_add_cost"
              type="number"
              v-model="details.van_job_add_cost"
              :classes="{
                'p-invalid': v$.details.van_job_add_cost.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Boxes under </label>
            <TextField
              label="boxes_under_one"
              type="number"
              v-model="details.boxes_under_one"
              :classes="{
                'p-invalid': v$.details.boxes_under_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($)</h5>
            <TextField
              label="rate_one"
              type="number"
              v-model="details.rate_one"
              :classes="{
                'p-invalid': v$.details.rate_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Boxes under * </label>
            <TextField
              label="boxes_under_two"
              type="number"
              v-model="details.boxes_under_two"
              :classes="{
                'p-invalid': v$.details.boxes_under_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($)</h5>
            <TextField
              label="rate_two"
              type="number"
              v-model="details.rate_two"
              :classes="{
                'p-invalid': v$.details.rate_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
      <div v-if="ecommerceTransportType == 'Charge by Quantity'">
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Maximum Quantity</label>
            <TextField
              label="maximum_quantity"
              type="number"
              v-model="details.maximum_quantity"
              :classes="{
                'p-invalid': v$.details.maximum_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Van Job Add. Quantity</h5>
            <TextField
              label="van_job_add_quantity"
              type="number"
              v-model="details.van_job_add_quantity"
              :classes="{
                'p-invalid':
                  v$.details.van_job_add_quantity.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text"
              >Van Job Add. Cost $
            </label>
            <TextField
              label="van_job_add_cost"
              type="number"
              v-model="details.van_job_add_cost"
              :classes="{
                'p-invalid': v$.details.van_job_add_cost.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="box-count-charges">
          <label>Box Count Charges</label>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Boxes under </label>
            <TextField
              label="boxes_under_one"
              type="number"
              v-model="details.boxes_under_one"
              :classes="{
                'p-invalid': v$.details.boxes_under_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($)</h5>
            <TextField
              label="rate_one"
              type="number"
              v-model="details.rate_one"
              :classes="{
                'p-invalid': v$.details.rate_one.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required dialog-label-text">Boxes under * </label>
            <TextField
              label="boxes_under_two"
              type="number"
              v-model="details.boxes_under_two"
              :classes="{
                'p-invalid': v$.details.boxes_under_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required dialog-label-text">Rate ($)</h5>
            <TextField
              label="rate_two"
              type="number"
              v-model="details.rate_two"
              :classes="{
                'p-invalid': v$.details.rate_two.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="flex mb-2">
          <span class="new-field mt-0"><b>+ Add Rate </b></span>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <p class="billing-setting-heading">Billing settings</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text">Credit Limit $ *</label>
      <TextField
        label="credit_limits"
        type="number"
        v-model="details.credit_limits"
        :classes="{
          'p-invalid': v$.details.credit_limits.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
      <TextField
        label="credit_terms"
        type="number"
        v-model="details.credit_terms"
        :classes="{
          'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Billing Cycle</h5>
      <DropDown
        code="name"
        :data="billing_cycle"
        @blur="v$.details.billing_cycle.$model;"
        label="billing_cycle"
        v-model="details.billing_cycle"
        :class="{
          'p-invalid': v$.details.billing_cycle.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <p class="ml-2 mt-3 head">Surcharge Charges</p>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.SMS == true
                ? [
                    {
                      name: 'SMS',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'SMS',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text urgent_charges">SMS $</label>
          <TextField
            label="credit_terms"
            type="number"
            v-model="details.credit_terms"
            :classes="{
              'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.sur_charge == true
                ? [
                    {
                      name: 'sur_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'sur_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text urgent_charges">Sur Charge $</label>
          <TextField
            label="credit_terms"
            type="number"
            v-model="details.credit_terms"
            :classes="{
              'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.island_charge == true
                ? [
                    {
                      name: 'island_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'island_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
          <div class="flex check-text">
            <label class="dialog-label-text urgent_charges"
              >Island Charge $</label
            >
            <TextField
              label="credit_terms"
              type="number"
              v-model="details.credit_terms"
              :classes="{
                'p-invalid': v$.details.credit_terms.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="ml-2 mt-3 head">Trip Charges</p>
  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.weekend_2nd_trip_charge == true
                ? [
                    {
                      name: 'weekend_2nd_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'weekend_2nd_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text">Weekday 2nd Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.saturday_2nd_trip_charge == true
                ? [
                    {
                      name: 'saturday_2nd_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'saturday_2nd_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text">Saturday 2nd Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.return_trip_charge == true
                ? [
                    {
                      name: 'return_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'return_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
          <div class="flex check-text">
            <label class="dialog-label-text">Return Trip Charge</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.return_trip_partial_charge == true
                ? [
                    {
                      name: 'return_trip_partial_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'return_trip_partial_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text">Return Trip Partial Charge</label>
        </div>
      </div>
    </div>
  </div>

  <div class="row pl-1">
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.collection_trip_charge == true
                ? [
                    {
                      name: 'collection_trip_charge',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'collection_trip_charge',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text">Collection Trip Charge</label>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="flex flex-row">
        <div class="flex">
          <CheckBox
            v-bind:checker="
              details.FTZ == true
                ? [
                    {
                      name: 'Special Urgent Charges $',
                      key: 'wd',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'Special Urgent Charges $',
                key: 'wd',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
        <div class="flex check-text">
          <label class="dialog-label-text urgent_charges"
            >Special Urgent Charges $</label
          >
          <TextField
            label="credit_terms"
            type="number"
            v-model="details.credit_terms"
            :classes="{
              'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <p class="ml-2 mt-3 head">Van Customer Bike Job</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text">Min Charge per Job ($) </label>
      <TextField
        label="min_charge"
        type="number"
        v-model="details.min_charge"
        :classes="{
          'p-invalid': v$.details.min_charge.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="mt-3">
    <span class="step-text">Effective Date</span>
  </div>
  <!--fields row one-->
  <div class="formgird grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Effective Start Date</h5>
      <div clas="flex">
        <div class="white_content calendar_content">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.effective_start_date"
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

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesSales" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../DuoSelect.vue";

export default {
  name: "SalesExpressContractVanCostDetails",
  data: () => ({
    defaultTransportType: "Same Night Delivery",
    ecommerceTransportType: "Charge by Weight",
    v$: useVuelidate(),
    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    details: {
      no_of_units: "",
      adjustment_jobs: "",
      adjustment_amount: "",
      additional_job: "",
      van_urgent_surcharge: "",
      //   Method
      timeslot_delivery: "",
      cut_off_time: "",
      cut_off_days_count: "",
      maximum_quantity: "",

      min_charge: "",
      van_job_add_quantity: "",
      van_job_add_cost: "",
      boxes_under_one: "",
      rate_one: "",
      boxes_under_two: "",
      rate_two: "",
      acknowledgement: false,
      to_date_time: "",
      credit_limits: "",
      credit_terms: "",
      billing_cycle: "",
      weekend_2nd_trip_charge: false,
      saturday_2nd_trip_charge: false,
      return_trip_charge: false,
      return_trip_partial_charge: false,
      collection_trip_charge: false,
      special_monitoring: false,
      call_centre: false,
    },

    submitted: false,
  }),
  validations() {
    return {
      details: {
        no_of_units: { required },
        adjustment_jobs: { required },
        adjustment_amount: { required },
        additional_job: { required },
        van_urgent_surcharge: { required },
        // Methods
        standard_liability: { required },
        timeslot_delivery: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        maximum_quantity: { required },
        // Trips
        min_charge: { required },
        van_job_add_quantity: { required },
        van_job_add_cost: { required },
        boxes_under_one: { required },
        rate_one: { required },
        boxes_under_two: { required },
        rate_two: { required },
        credit_limits: { required },
        credit_terms: { required },
        billing_cycle: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SalesExpressVanTripDetailsDialog",
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "SalesExpressSendQuotationDialog",
        });
      }
    },
  },
  components: {
    Accordion,
    AccordionTab,
    DuoSelection,
  },
};
</script>

<style scoped>
.category:checked ~ label {
  color: rgb(143, 143, 167);
}
.urgent_charges {
  white-space: nowrap;
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion-tab {
  margin-bottom: 15px !important ;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}
::v-deep .p-accordion-toggle-icon {
  display: none !important;
}
::v-deep .p-accordion-header-link {
  background-color: #f3f7ff !important;
  border-radius: 8px 8px 0px 0px !important;
  padding: 1rem !important;
  font-weight: 700;
}
.category {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  /* color : pink; */
}
.accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.5) !important;
  /* border-color: #357DEA !important; */
  border: 1px solid #357dea !important;
}
.check-text {
  gap: 2rem;
}
.billing-setting-heading {
  background-color: #e6e6e6 !important;
  border-radius: 8px !important;
  padding: 1rem !important;
  font-weight: 700;
}
.acknowledgement-check {
  gap: 3rem;
}
</style>
