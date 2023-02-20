<template>
  <div class="p-2 mt-2">
    <span class="step-text">Add E-Commerce Charges</span>

    <!--transport type selection (BIKE/VAN)-->
    <div class="mt-4">
      <DuoSelection
        :options="['Bike', 'Van']"
        :default="defaultTransportType"
        type="setECommerceTransportType"
      />
    </div>

    <!------------------------------------BIKE FIELDS : STARTS HERE------------------------------------->
    <span v-if="defaultTransportType == 'Bike'">
      <!--DELIVERY TYPE FIELDS : STARTS HERE-->
      <Accordion
        class="formAccordion mt-3"
        :multiple="true"
        :activeIndex="active"
      >
        <AccordionTab
          class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
          v-for="(deliveryType, dIndex) of addBikeDeliveryTypes"
          :key="dIndex"
        >
          <template #header>
            <div class="flex justify-content-between w-100">
              <div class="flex">
                {{ "Delivery Type" + " " + (parseInt(dIndex) + 1) }}
              </div>
              <div
                v-if="dIndex > 0"
                class="flex delete"
                @click="deleteBikeDeliveryType(dIndex)"
              >
                <i class="parent-times pi pi-times mt-2"></i>
              </div>
            </div>
          </template>
          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Delivery Type</h5>
              <TextField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex].delivery_type
                "
                type="text"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
             <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Delivery Type Initial</h5>
              <TextField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex].delivery_type_initial
                "
                type="text"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Collect Time</h5>
              <TimePicker24
            v-model="details['eCommerce_bike_delivery_type'][dIndex].collect_time"
            :state="details['eCommerce_bike_delivery_type'][dIndex].collect_time"
           :classes="{
                  'rates inputfield w-full dialog-field-text ': true,
                
            }"
          />
            </div>
            <!-- <Calendar v-model="value" :showTime="true" :timeOnly="true" /> -->
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Cut Off Time</h5>
                 <TimePicker24
            v-model="details['eCommerce_bike_delivery_type'][dIndex].cut_off_time"
            :state="details['eCommerce_bike_delivery_type'][dIndex].cut_off_time"
           :classes="{
                  'rates inputfield w-full dialog-field-text ': true,
                }"
          />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Cut Off Days Count</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex]
                    .cut_off_days_count
                "
                mode="decimal"
                :max='0'
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--RATES FIELDS : STARTS HERE-->
          <div
            v-for="(rate, rIndex) of details['eCommerce_bike_delivery_type'][
              dIndex
            ].rates"
            :key="rIndex"
          >
            <div v-if="rIndex > 0" class="flex justify-content-between">
              <div class="flex"></div>
              <div class="flex delete" @click="deleteBikeRate(dIndex, rIndex)">
                <i class="child-times pi pi-times mt-2"></i>
              </div>
            </div>
            <!--fields row one-->
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">
                  Minimum Monthly Units (Dispatches)
                </h5>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['eCommerce_bike_delivery_type'][dIndex].rates[
                          rIndex
                        ].min_units
                      "
                      :showButtons="true"
                      mode="decimal"
                      :classes="{
                        'p-invalid':
                          v$.details['eCommerce_bike_delivery_type'][dIndex]
                            .rates[rIndex].min_units.$invalid && submitted,
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['eCommerce_bike_delivery_type'][dIndex].rates[
                          rIndex
                        ].max_units
                      "
                      :showButtons="true"
                      mode="decimal"
                      :classes="{
                        'p-invalid':
                          v$.details['eCommerce_bike_delivery_type'][dIndex]
                            .rates[rIndex].max_units.$invalid && submitted,
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">Units Rate($)</h5>
                <NumberField
                  v-model="
                    details['eCommerce_bike_delivery_type'][dIndex].rates[
                      rIndex
                    ].unit_rate
                  "
                  mode="decimal"
                  :max="0"
                  :maxFractionDigits="2"
                  :classes="{
                    'p-invalid':
                      v$.details['eCommerce_bike_delivery_type'][dIndex].rates[
                        rIndex
                      ].unit_rate.$invalid && submitted,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-content-between add_rate ml-3">
            <div class="flex">
              <span class="new-field" @click="addBikeRate(dIndex)"
                ><b>+ Add Rate</b></span
              >
            </div>
          </div>
          <!--RATES FIELDS : ENDS HERE-->

          <hr class="divider w-100" />

          <!--BIKE CUSTOMER VAN JOB FIELDS : STARTS HERE-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <span class="section-text">Bike Customer Van jobs</span>
            </div>
          </div>
          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex][
                    'bike_customer_van_job'
                  ].van_job_min_cost
                "
                mode="decimal"
                :max='0'
                :maxFractionDigits="2"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text">Kgs</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex][
                    'bike_customer_van_job'
                  ].maximum_weight
                "
                mode="decimal"
                :maxFractionDigits="2"
                :max='0'
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--fields row two-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex][
                    'bike_customer_van_job'
                  ].van_job_add_cost
                "
                mode='decimal'
                :max='0'
                :maxFractionDigits="2"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text">Kgs $</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex][
                    'bike_customer_van_job'
                  ].van_job_add_weight
                "
                mode='decimal'
                :maxFractionDigits="2"
                :max='0'
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--fields row three-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text">Van Job Urgent. Surcharge $</h5>
              <NumberField
                v-model="
                  details['eCommerce_bike_delivery_type'][dIndex][
                    'bike_customer_van_job'
                  ].van_job_urgent_surcharges
                "
                mode="decimal"
                :max="0"
                :maxFractionDigits="2"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--BIKE CUSTOMER VAN JOB FIELDS : ENDS HERE-->
        </AccordionTab>
      </Accordion>
      <div class="flex justify-content-between add_rate ml-3 mt-2">
        <div class="flex">
          <span class="new-field" @click="addBikeDeliveryType"
            ><b>+ Add Delivery Type</b></span
          >
        </div>
      </div>
      <!--DELIVERY TYPE FIELDS : ENDS HERE-->

      <hr class="divider w-100" />

      <!--TIME SLOT FIELDS : STARTS HERE-->
      <!--fields row one-->
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Timeslot Delivery ($)</h5>
          <NumberField
            v-model="details['bike_timeslot_delivery']"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Timeslot Delivery Fixed Hours</h5>
          <NumberField
            v-model="details['bike_timeslot_delivery_fixed_hours']"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <!--TIME SLOT FIELDS  : ENDS HERE-->
    </span>
    <!------------------------------------BIKE FIELDS : ENDS HERE------------------------------------->

    <!------------------------------------VAN FIELDS : STARTS HERE------------------------------------->
    <span v-if="defaultTransportType == 'Van'">
      <!--DELIVERY TYPE FIELDS : STARTS HERE-->
      <Accordion
        class="formAccordion mt-3"
        :multiple="true"
        :activeIndex="active"
      >
        <AccordionTab
          class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
          v-for="(deliveryType, dIndex) of addVanDeliveryTypes"
          :key="dIndex"
        >
          <template #header>
            <div class="flex justify-content-between w-100">
              <div class="flex">
                {{ "Delivery Type" + " " + (parseInt(dIndex) + 1) }}
              </div>
              <div
                v-if="dIndex > 0"
                class="flex delete"
                @click="deleteVanDeliveryType(dIndex)"
              >
                <i class="parent-times pi pi-times mt-2"></i>
              </div>
            </div>
          </template>
          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Delivery Type</h5>
              <TextField
                v-model="
                  details['eCommerce_van_delivery_type'][dIndex].delivery_type
                "
                type="text"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Delivery Type Initial</h5>
              <TextField
                v-model="
                  details['eCommerce_van_delivery_type'][dIndex].delivery_type_initial
                "
                type="text"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Collect Time</h5>
               <TimePicker24
            v-model="details['eCommerce_van_delivery_type'][dIndex].collect_time"
            :state="details['eCommerce_van_delivery_type'][dIndex].collect_time"
           :classes="{
                  'rates inputfield w-full dialog-field-text ': true,
                }"
          />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Cut Off Time</h5>
                <TimePicker24
            v-model="details['eCommerce_van_delivery_type'][dIndex].cut_off_time"
            :state="details['eCommerce_van_delivery_type'][dIndex].cut_off_time"
           :classes="{
                  'rates inputfield w-full dialog-field-text ': true,
                }"
          />
               
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Cut Off Days</h5>
              <TextField
                v-model="
                  details['eCommerce_van_delivery_type'][dIndex]
                    .cut_off_days_count
                "
                type="number"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>

          <!--RATES FIELDS : STARTS HERE-->
          <div
            v-for="(rate, rIndex) of details['eCommerce_van_delivery_type'][
              dIndex
            ].rates"
            :key="rIndex"
          >
            <div v-if="rIndex > 0" class="flex justify-content-between">
              <div class="flex"></div>
              <div
                class="flex delete"
                @click="deleteVanRate('rate', dIndex, rIndex)"
              >
                <i class="child-times pi pi-times mt-2"></i>
              </div>
            </div>
            <!--fields row one-->
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">
                  Minimum Monthly Units (Dispatches)
                </h5>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['eCommerce_van_delivery_type'][dIndex].rates[
                          rIndex
                        ].min_units
                      "
                       mode="decimal"
                       :max='0'
                      :classes="{
                        'p-invalid':
                          v$.details['eCommerce_van_delivery_type'][dIndex]
                            .rates[rIndex].min_units.$invalid && submitted,
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['eCommerce_van_delivery_type'][dIndex].rates[
                          rIndex
                        ].max_units
                      "
                       mode="decimal"
                       :max='0'
                      :classes="{
                        'p-invalid':
                          v$.details['eCommerce_van_delivery_type'][dIndex]
                            .rates[rIndex].max_units.$invalid && submitted,
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">Units Rate($)</h5>
                <NumberField
                  v-model="
                    details['eCommerce_van_delivery_type'][dIndex].rates[rIndex]
                      .unit_rate
                  "
                  mode='decimal'
                  :maxFractionDigits="2"
                  :max="0"
                  :classes="{
                    'p-invalid':
                      v$.details['eCommerce_van_delivery_type'][dIndex].rates[
                        rIndex
                      ].unit_rate.$invalid && submitted,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-content-between add_rate ml-3">
            <div class="flex">
              <span class="new-field" @click="addVanRate('rate', dIndex)"
                ><b>+ Add Rate</b></span
              >
            </div>
          </div>
          <!--RATES FIELDS : ENDS HERE-->

          <hr class="divider w-100" />

          <!--CHARGE BY WEIGHT/CHARGE BY QUANTITY FIELDS : STARTS HERE-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <!-- (Charge by Weight/Charge by Quantity) selection-->
              <DuoSelection
                :options="['Charge by Weight', 'Charge by Quantity']"
                :default="
                  details['eCommerce_van_delivery_type'][dIndex]
                    .duoSelectionState
                "
                :index="dIndex"
                type="setECommerceVanDuoType"
              />
            </div>
          </div>

          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-4">
              <h5 class="dialog-label-text">
                <span
                  v-if="
                    details['eCommerce_van_delivery_type'][dIndex]
                      .duoSelectionState == 'Charge by Weight'
                  "
                >
                  Maximum Weight (Kg)</span
                >
                <span v-else>Maximum Quantity</span>
              </h5>
              <NumberField
                v-model="
                  details['eCommerce_van_delivery_type'][dIndex][
                    details['eCommerce_van_delivery_type'][dIndex]
                      .duoSelectionState == 'Charge by Weight'
                      ? 'charge_by_weight'
                      : 'charge_by_quantity'
                  ][
                    details['eCommerce_van_delivery_type'][dIndex]
                      .duoSelectionState == 'Charge by Weight'
                      ? 'maximum_weight'
                      : 'maximum_quantity'
                  ]
                "
                mode="decimal"
                :maxFractionDigits="2"
                :classes="{
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-4">
              <h5 class="dialog-label-text">
                <span
                  v-if="
                    details['eCommerce_van_delivery_type'][dIndex]
                      .duoSelectionState == 'Charge by Weight'
                  "
                >
                  Van Job Addl. Weight (Kg)</span
                >
                <span v-else>Van Job Add. Quantity</span>
              </h5>
              <NumberField
                  v-model="
                      details['eCommerce_van_delivery_type'][dIndex][
                        details['eCommerce_van_delivery_type'][dIndex]
                          .duoSelectionState == 'Charge by Weight'
                          ? 'charge_by_weight'
                          : 'charge_by_quantity'
                      ][
                        details['eCommerce_van_delivery_type'][dIndex]
                          .duoSelectionState == 'Charge by Weight'
                          ? 'van_job_add_weight'
                          : 'van_job_add_quantity'
                      ]
                    "
                    mode="decimal"
                    :max='0'
                    :maxFractionDigits="2"
                    :classes="{
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
            </div>
            <div class="field col-12 md:col-4">
              <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
              <NumberField
                  v-model="
                      details['eCommerce_van_delivery_type'][dIndex][
                        details['eCommerce_van_delivery_type'][dIndex]
                          .duoSelectionState == 'Charge by Weight'
                          ? 'charge_by_weight'
                          : 'charge_by_quantity'
                      ]['van_job_add_cost']
                    "
                    mode="decimal"
                    :max='0'
                    :maxFractionDigits="2"
                    :classes="{
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
            </div>
          </div>

          <!--CHARGE BY QUANTITY SPECIFIC FIELDS : STARTS HERE-->
          <span
            v-if="
              details['eCommerce_van_delivery_type'][dIndex]
                .duoSelectionState == 'Charge by Quantity'
            "
          >
            <div class="formgrid grid">
              <div class="field col-12 md:col-12">
                <span class="section-text">Box Count Charges</span>
              </div>
            </div>
            <!--ADD BOX COUNT RATES : STARTS HERE-->
            <div
              v-for="(boxRate, bIndex) of details[
                'eCommerce_van_delivery_type'
              ][dIndex]['box_count_charges']"
              :key="bIndex"
            >
              <div v-if="bIndex > 0" class="flex justify-content-between">
                <div class="flex"></div>
                <div
                  class="flex delete"
                  @click="deleteVanRate('box_rate', dIndex, bIndex)"
                >
                  <i class="child-times pi pi-times mt-2"></i>
                </div>
              </div>
              <!--fields row one-->
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <h5 class="dialog-label-text required">Boxes Count</h5>
                  <div class="formgrid grid">
                  <div class="field col-12 md:col-6">
                    <NumberField
                    v-model="
                      details['eCommerce_van_delivery_type'][dIndex][
                        'box_count_charges'
                      ][bIndex].min_box
                    "
                    :showButtons="true"
                    mode="decimal"
                    :classes="{
                      'p-invalid':
                        v$.details['eCommerce_van_delivery_type'][dIndex][
                          'box_count_charges'
                        ][bIndex].min_box.$invalid && submitted,
                      'rates inputfield w-full dialog-field-text ': true,
                    }"
                  />
                  </div>
                  <div class="field col-12 md:col-6">
                    <NumberField
                    v-model="
                      details['eCommerce_van_delivery_type'][dIndex][
                        'box_count_charges'
                      ][bIndex].max_box
                    "
                    :showButtons="true"
                    mode="decimal"
                    :classes="{
                      'p-invalid':
                        v$.details['eCommerce_van_delivery_type'][dIndex][
                          'box_count_charges'
                        ][bIndex].max_box.$invalid && submitted,
                      'rates inputfield w-full dialog-field-text ': true,
                    }"
                  />
                  </div>
                </div>
                </div>
                <div class="field col-12 md:col-4">
                  <h5 class="dialog-label-text required">Rate ($)</h5>
                  <NumberField
                    v-model="
                      details['eCommerce_van_delivery_type'][dIndex][
                        'box_count_charges'
                      ][bIndex].rate
                    "
                     mode="decimal"
                     :max='0'
                     :maxFractionDigits="2"
                    :classes="{
                      'p-invalid':
                        v$.details['eCommerce_van_delivery_type'][dIndex][
                          'box_count_charges'
                        ][bIndex].rate.$invalid && submitted,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-content-between add_rate ml-3">
              <div class="flex">
                <span class="new-field" @click="addVanRate('box_rate', dIndex)"
                  ><b>+ Add Rate</b></span
                >
              </div>
            </div>
            <!--ADD BOX COUNT RATES : ENDS HERE-->
          </span>
          <!--CHARGE BY QUANTITY SPECIFIC FIELDS : ENDS HERE-->

          <hr class="divider w-100" />

          <!--VAN CUSTOMER BIKE JOB FIELDS : STARTS HERE-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-12">
              <span class="section-text">Van Customer Bike job</span>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col-12 md:col-5">
              <h5 class="dialog-label-text required">Min Charge per Job ($)</h5>
              <NumberField
                v-model="
                  details['eCommerce_van_delivery_type'][dIndex][
                    'van_customer_bike_job'
                  ].min_charge_per_job
                "
                mode="decimal"
                :max="0"
                :maxFractionDigits="2"
                :classes="{
                  'p-invalid':
                    v$.details['eCommerce_van_delivery_type'][dIndex][
                      'van_customer_bike_job'
                    ].min_charge_per_job.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--VAN CUSTOMER BIKE JOB FIELDS : ENDS HERE-->
          <!--CHARGE BY WEIGHT/CHARGE BY QUANTITY FIELDS FIELDS : ENDS HERE-->
        </AccordionTab>
      </Accordion>
      <div class="flex justify-content-between add_rate ml-3 mt-2">
        <div class="flex">
          <span class="new-field" @click="addVanDeliveryType"
            ><b>+ Add Delivery Type</b></span
          >
        </div>
      </div>
      <!--DELIVERY TYPE FIELDS : ENDS HERE-->

      <hr class="divider w-100" />

      <!--TIME SLOT FIELDS : STARTS HERE-->
      <!--fields row one-->
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Timeslot Delivery ($)</h5>
          <NumberField
            v-model="details['van_timeslot_delivery']"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text">Timeslot Delivery Fixed Hours</h5>
          <NumberField
            v-model="details['van_timeslot_delivery_fixed_hours']"
            mode="decimal"
            :maxFractionDigits="2"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <!--TIME SLOT FIELDS  : ENDS HERE-->
    </span>
    <!------------------------------------VAN FIELDS : ENDS HERE------------------------------------->

    <!--navigation buttons-->
    <div class="mt-5">
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-start
          flex-wrap
        "
      >
        <div class="align-self-center flex">
          <Buttons
            label="Previous"
            v-on:childToParent="goBackHandler"
            class="p-button-outlined mr-1 dialog-button-text previous-btn"
          />
        </div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="expressContract" />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="nextStepHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
// import Calendar from 'primevue/calendar';
import { required } from "@vuelidate/validators";
import {mapActions} from 'vuex';
import DuoSelection from "../../../DuoSelect.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { ADD_RATES_STEPS } from "../../../const/const";
import NumberField from "../../../../../../../Reusables/NumberField.vue";
export default {
  components: { DuoSelection, Accordion, AccordionTab, NumberField },
  data: () => ({
    active: 0,
    v$: useVuelidate(),
    submitted: false,
    addFieldsClicked: 0,
    defaultTransportType: "Bike",

    //BIKE
    //delivery-type
    addBikeDeliveryTypes: ["new_bike_delivery_type"],
    //rates
    addBikeRates: ["new_rate"],
    //validations - delivery type vise and rate vise within a delivery type
    eCommerce_bike_delivery_type_rates_validation: [
      {
        rates: [
          {
            max_units: { required },
            min_units: { required },
            unit_rate: { required },
          },
        ],
      },
    ],

    //VAN
    //delivery-type
    addVanDeliveryTypes: ["new_van_delivery_type"],
    //rates
    addVanRates: ["new_rate"],
    //validations - delivery type vise and rate vise within a delivery type
    eCommerce_van_delivery_type_validation: [
      {
        rates: [
          {
            max_units: { required },
            min_units: { required },
            unit_rate: { required },
          },
        ],
        box_count_charges: [
          {
            min_box: { required },
            max_box: { required },
            rate: { required },
          },
        ],
        van_customer_bike_job: {
          min_charge_per_job: { required },
        },
      },
    ],

    //DATA COLLECTION
    details: {
      //BIKE
      eCommerce_bike_delivery_type: [
        {
          delivery_type: "",
          delivery_type_initial:"",
          collect_time: "",
          cut_off_time: "",
          cut_off_days_count: "",
          //rates
          rates: [
            {
              max_units: "",
              min_units: "",
              unit_rate: "",
            },
          ],
          //bike customer van job
          bike_customer_van_job: {
            van_job_min_cost: "",
            maximum_weight: "",
            van_job_add_cost: "",
            van_job_add_weight: "",
            van_job_urgent_surcharges: "",
          },
        },
      ],
      //bike time-slots
      bike_timeslot_delivery: "",
      bike_timeslot_delivery_fixed_hours: "",

      //VAN
      eCommerce_van_delivery_type: [
        {
          delivery_type: "",
          delivery_type_initial:"",
          collect_time: "",
          cut_off_time: "",
          cut_off_days_count: "",
          //rates
          rates: [
            {
              max_units: "",
              min_units: "",
              unit_rate: "",
            },
          ],
          duoSelectionState: "Charge by Weight",
          //charge by weight
          charge_by_weight: {
            maximum_weight: "",
            van_job_add_weight: "",
            van_job_add_cost: "",
          },
          //charge by quantity
          charge_by_quantity: {
            maximum_quantity: "",
            van_job_add_quantity: "",
            van_job_add_cost: "",
          },
          //box count charges
          box_count_charges: [
            {
              min_box: "",
              max_box: "",
              rate: "",
            },
          ],
          //van customer bike job
          van_customer_bike_job: {
            min_charge_per_job: "",
          },
        },
      ],
      //van time-slots
      van_timeslot_delivery: "",
      van_timeslot_delivery_fixed_hours: "",
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addFieldsClicked > -1) {
      return {
        details: {
          eCommerce_bike_delivery_type:
            this.eCommerce_bike_delivery_type_rates_validation,
          eCommerce_van_delivery_type:
            this.eCommerce_van_delivery_type_validation,
        },
      };
    }
  },

  methods: {
    ...mapActions({setCurrentStep: 'express/setCurrentStep'}),
    goBackHandler() {
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddNormalRates",
      }).then(() => {
        this.setCurrentStep(ADD_RATES_STEPS.ONE)            
      });
      
    },
    async nextStepHandler() {
      this.$store.state.express.createRateCard = await Object.assign(this.$store.state.express.createRateCard,this.details)
      
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddSurcharges",
      });
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
        severity: 'error',
        summary: 'Missing Fields',
        detail: 'One of the required fields is empty',
        life: 3000,
      });
      }
      if (!this.v$.$invalid) {
        await this.$store.dispatch("expressContract/navigateStepper", {
          step: "AddSurcharges",
        })
       await this.setCurrentStep(ADD_RATES_STEPS.THREE)
    }
    },

    //BIKE
    //delivery type
    addBikeDeliveryType() {
      this.details.eCommerce_bike_delivery_type.push({
        delivery_type: "",
        delivery_type_initial:"",
        collect_time: "",
        cut_off_time: "",
        cut_off_days_count: "",
        rates: [
          {
            max_units: "",
            min_units: "",
            unit_rate: "",
          },
        ],
        bike_customer_van_job: {
          van_job_min_cost: "",
          maximum_weight: "",
          van_job_add_cost: "",
          van_job_add_weight: "",
          van_job_urgent_surcharges: "",
        },
      });
      this.eCommerce_bike_delivery_type_rates_validation.push({
        rates: [
          {
            max_units: { required },
            min_units: { required },
            unit_rate: { required },
          },
        ],
      });
      this.addBikeDeliveryTypes.push("new_bike_delivery_type");
      this.addFieldsClicked++;
    },
    deleteBikeDeliveryType(index) {
      this.details.eCommerce_bike_delivery_type[index].rates.splice(1);
      this.details.eCommerce_bike_delivery_type.splice(index, 1);
      this.eCommerce_bike_delivery_type_rates_validation[index].rates.splice(1);
      this.eCommerce_bike_delivery_type_rates_validation.splice(index, 1);
      this.addBikeDeliveryTypes.splice(index, 1);
      this.addFieldsClicked++;
    },
    //rates
    addBikeRate(parentIndex) {
      this.details.eCommerce_bike_delivery_type[parentIndex].rates.push({
        max_units: "",
        min_units: "",
        unit_rate: "",
      });
      this.eCommerce_bike_delivery_type_rates_validation[
        parentIndex
      ].rates.push({
        max_units: { required },
        min_units: { required },
        unit_rate: { required },
      });
      this.addFieldsClicked++;
    },
    deleteBikeRate(parentIndex, index) {
      this.details.eCommerce_bike_delivery_type[parentIndex].rates.splice(
        index,
        1
      );
      this.eCommerce_bike_delivery_type_rates_validation[
        parentIndex
      ].rates.splice(index, 1);
      this.addFieldsClicked++;
    },
    //rates
    //BIKE

    //VAN
    addVanDeliveryType() {
      this.details.eCommerce_van_delivery_type.push({
        delivery_type: "",
        delivery_type_initial:"",
        collect_time: "",
        cut_off_time: "",
        cut_off_days_count: "",
        rates: [
          {
            max_units: "",
            min_units: "",
            unit_rate: "",
          },
        ],
        duoSelectionState: "Charge by Weight",
        charge_by_weight: {
          maximum_weight: "",
          van_job_add_weight: "",
          van_job_add_cost: "",
        },
        charge_by_quantity: {
          maximum_quantity: "",
          van_job_add_quantity: "",
          van_job_add_cost: "",
        },
        box_count_charges: [
          {
            min_box: "",
            max_box: "",
            rate: "",
          },
        ],
        van_customer_bike_job: {
          min_charge_per_job: "",
        },
      });
      this.eCommerce_van_delivery_type_validation.push({
        rates: [
          {
            max_units: { required },
            min_units: { required },
            unit_rate: { required },
          },
        ],
        box_count_charges: [
          {
            min_box : { required },
            max_box : { required },
            rate: { required },
          },
        ],
        van_customer_bike_job: {
          min_charge_per_job: { required },
        },
      });
      this.addVanDeliveryTypes.push("new_van_delivery_type");
      this.addFieldsClicked++;
    },
    deleteVanDeliveryType(index) {
      this.details.eCommerce_van_delivery_type[index].rate.splice(1);
      this.details.eCommerce_van_delivery_type[index].box_count_charges.splice(
        1
      );
      this.details.eCommerce_van_delivery_type.splice(index, 1);
      this.eCommerce_van_delivery_type_validation[index].rate.splice(1);
      this.eCommerce_van_delivery_type_validation[
        index
      ].box_count_charges.splice(1);
      this.eCommerce_van_delivery_type_validation.splice(index, 1);
      this.addVanDeliveryTypes.splice(index, 1);
      this.addFieldsClicked++;
    },
    addVanRate(type, parentIndex) {
      let ratesObj = {
        max_units: "",
        min_units: "",
        unit_rate: "",
      };
      let boxRatesObj = {
        min_box: "",
        max_box: "",
        rate: "",
      };
      if (type == "rate") {
        this.details.eCommerce_van_delivery_type[parentIndex].rates.push(
          ratesObj
        );
        this.eCommerce_van_delivery_type_validation[parentIndex].rates.push({
          max_units: { required },
          min_units: { required },
          unit_rate: { required },
        });
      }
      if (type == "box_rate") {
        this.details.eCommerce_van_delivery_type[
          parentIndex
        ].box_count_charges.push(boxRatesObj);
        this.eCommerce_van_delivery_type_validation[
          parentIndex
        ].box_count_charges.push({
          min_box: { required },
          max_box: { required },
          rate: { required },
        });
      }
      this.addFieldsClicked++;
    },
    deleteVanRate(type, parentIndex, index) {
      if (type == "rate") {
        this.details.eCommerce_van_delivery_type[parentIndex].rates.splice(
          index,
          1
        );
        this.eCommerce_van_delivery_type_validation[parentIndex].rates.splice(
          index,
          1
        );
      }
      if (type == "box_rate") {
        this.details.eCommerce_van_delivery_type[
          parentIndex
        ].box_count_charges.splice(index, 1);
        this.eCommerce_van_delivery_type_validation[
          parentIndex
        ].box_count_charges.splice(index, 1);
      }
      this.addFieldsClicked++;
    },
    //VAN
  },

  watch: {
    //watch e-commerce transport type choices
    "$store.state.expressContract.eCommerceTransportType": function () {
      this.defaultTransportType =
        this.$store.state.expressContract.eCommerceTransportType;
    },
    //(Charge by Weight/Charge by Quantity) selection
    "$store.state.expressContract.eCommerceVanDuoType": function () {
      this.details.eCommerce_van_delivery_type[
        this.$store.state.expressContract.eCommerceVanDuoType[1]
      ].duoSelectionState =
        this.$store.state.expressContract.eCommerceVanDuoType[0];
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
.ecommerce_bike_delivery_type_div {
  background: rgba(197, 220, 254, 0.3) !important;
}
.parent-times {
  color: red !important;
}
.child-times {
  color: blue !important;
}
</style>
