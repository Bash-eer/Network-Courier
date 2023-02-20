<template>
  <div class="p-2 mt-2">
    <!--ADD ZONAL RATES FIELDS : STARTS HERE-->
    <Accordion class="formAccordion mt-3" :activeIndex="active">
      <AccordionTab
        class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
        v-for="(zonalRate, zrIndex) of addZonalRates"
        :multiple="true"
        :key="zrIndex"
      >
        <template #header>
          <div class="flex justify-content-between w-100">
            <div class="flex">
              {{ "Zonal Rate" + " " + (parseInt(zrIndex) + 1) }}
            </div>
            <div
              v-if="zrIndex > 0"
              class="flex delete"
              @click="deleteZonalRates(zrIndex)"
            >
              <i class="parent-times pi pi-times mt-2"></i>
            </div>
          </div>
        </template>

        <!--Add Zone Ranges : Starts Here-->
        <!-- @blur="v$.details.vehicle_no.$model" -->
        <!--  v-model="''"-->
        <MultiSelectChips
          placeholder="Select Zone Range"
          :options="$store.state.rapidoAdhoc.zoneRangeDropDownData"
          :filter="true"
          :value="details.rates[zrIndex]?.zones_ranges"
          :state="details.rates[zrIndex]?.zones_ranges"
          v-model="details.rates[zrIndex].zones_ranges"
          :classes="{
            'p-invalid':
              v$.details.rates[zrIndex].zones_ranges.$invalid &&
              $store.state.rapidoAdhoc.addZonalRatesSubmission,
            'inputfield w-full dialog-field-text': true,
          }"
        />
        <!--Add Zone Ranges : Ends Here-->

        <!--Rate Types Selection : Starts Here-->
        <div class="mt-4">
          <DuoSelection
            :options="[
              { name: 'E-Commerce', code: 'E-Commerce', disabled: false },
              {
                name: 'On Demand Service',
                code: 'On Demand Service',
                disabled: true,
              },
              { name: 'Surcharges', code: 'Surcharges', disabled: true },
              {
                name: 'Additional Surcharges',
                code: 'Additional Surcharges',
                disabled: true,
              },
            ]"
            :default="
              details['rates'][zrIndex]['zonal_rates_duo_selection_state']
            "
            :index="zrIndex"
            type="setZonalRates"
          />
        </div>
        <!--Rate Types Selection : Ends Here-->

        <!--Demand Rates Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['zonal_rates_duo_selection_state'] ==
            'On Demand Service'
          "
        >
          <div class="mt-4">
            <!-- First row of on demand -->
            <div class="formgrid grid">
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text required">Weight Range (Kg)</h5>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['rates'][zrIndex]['charge_type'][
                          'on_demand_services'
                        ]['min_weight']
                      "
                      :showButtons="true"
                      :maxFractionDigits="2"
                      mode="decimal"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'on_demand_services'
                          ]['min_weight'].$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>

                  <div class="field col-12 md:col-6">
                    <NumberField
                      v-model="
                        details['rates'][zrIndex]['charge_type'][
                          'on_demand_services'
                        ]['max_weight']
                      "
                      :maxFractionDigits="2"
                      :showButtons="true"
                      mode="decimal"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'on_demand_services'
                          ]['max_weight'].$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                </div>
                <div
                  v-if="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['max_weight'] <
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['min_weight']
                  "
                  class="ml-2"
                  style="color: red"
                >
                  Max weight must be greater than Min weight
                </div>
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text required">Collection Time</h5>
                <TimePicker24
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['collect_time']
                  "
                  :state="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['collect_time']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['collect_time'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-dropdown-text ': true,
                  }"
                />
                <!-- <NumberField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['collect_time']
                  "
                  :showButtons="true"
                  mode="decimal"
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['collect_time'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                /> -->
              </div>
              <div class="field col-12 md:col-2">
                <h5 class="dialog-label-text required">Cut off Time</h5>
                <TimePicker24
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['cut_off_time']
                  "
                  :state="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['cut_off_time']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['cut_off_time'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-dropdown-text ': true,
                  }"
                />
                <!-- <NumberField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['cut_off_time']
                  "
                  :showButtons="true"
                  mode="decimal"
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['cut_off_time'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                /> -->
              </div>
              <div class="field col-12 md:col-2">
                <h5 class="dialog-label-text required">Cut off Days-Count</h5>
                <NumberField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['cut_off_days_count']
                  "
                  :maxFractionDigits="2"
                  :showButtons="true"
                  mode="decimal"
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['cut_off_days_count'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
            <div class="formgrid grid">
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['van_job_min_cost']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['van_job_min_cost'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                  type="text"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text">Maximum Kilometer (Km)</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['van_job_maximum_kilo_meter']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['van_job_maximum_kilo_meter'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                  type="text"
                />
              </div>
            </div>
            <div class="formgrid grid">
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text">Van Job Add Cost $</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['van_job_additional_cost']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['van_job_additional_cost'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                  type="text"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text">Van Job Add Kilometer (Km)</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['van_job_additional_kilo_meter']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['van_job_additional_kilo_meter'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                  type="text"
                />
              </div>
              <div class="field col-12 md:col-4">
                <h5 class="dialog-label-text">Van Job Urgent Surcharge $</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'on_demand_services'
                    ]['van_job_urgent_surcharges']
                  "
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'on_demand_services'
                      ]['van_job_urgent_surcharges'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                  type="text"
                />
              </div>
            </div>
          </div>
        </span>

        <span
          v-if="
            details['rates'][zrIndex]['zonal_rates_duo_selection_state'] ==
            'E-Commerce'
          "
        >
          <div class="mt-4">
            <Accordion class="SubFormAccordion mt-3" :activeIndex="active">
              <AccordionTab
                class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
                v-for="(eCommerceVanDeliveryType, cVDTIndex) of details[
                  'rates'
                ][zrIndex]['charge_type']['e_commerce']['delivery_type']"
                :multiple="true"
                :key="cVDTIndex"
              >
                <template #header>
                  <div class="flex justify-content-between w-100">
                    <div class="flex">
                      {{ "Delivery Type" + " " + (parseInt(cVDTIndex) + 1) }}
                    </div>
                    <div
                      v-if="cVDTIndex > 0"
                      class="flex delete"
                      @click="
                        deleteECommerceVanDeliveryType(zrIndex, cVDTIndex)
                      "
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
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['delivery_type']
                      "
                      type="text"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['delivery_type']
                            .$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-3">
                    <h5 class="dialog-label-text">Collection Time</h5>
                    <!-- <NumberField
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['collect_time']
                      "
                      :showButtons="true"
                      mode="decimal"
                      :classes="{
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    /> -->
                    <TimePicker24
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['collect_time']
                      "
                      :state="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['collect_time']
                      "
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['collect_time']
                            .$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-dropdown-text ': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-3">
                    <h5 class="dialog-label-text">Cut Off Time</h5>
                    <!-- <NumberField
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['cut_off_time']
                      "
                      :showButtons="true"
                      mode="decimal"
                      :classes="{
                        'rates inputfield w-full dialog-field-text ': true,
                      }"
                    /> -->
                    <TimePicker24
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['cut_off_time']
                      "
                      :state="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['cut_off_time']
                      "
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['cut_off_time']
                            .$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-dropdown-text ': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-3">
                    <h5 class="dialog-label-text">Cut Off Days Count</h5>
                    <TextField
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['cut_off_days_count']
                      "
                      type="number"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['cut_off_days_count']
                            .$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                </div>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-10">
                    <h5 class="dialog-label-text">Delivery type initial</h5>
                    <TextField
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'delivery_type'
                        ][cVDTIndex]['delivery_type_initial']
                      "
                      type="text"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['delivery_type_initial']
                            .$invalid &&
                          $store.state.rapidoAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                </div>
                <!--fields row two-->
                <div
                  v-for="(eCommerceVanDeliveryTypeRates, cVDTRIndex) of details[
                    'rates'
                  ][zrIndex]['charge_type']['e_commerce']['delivery_type'][
                    cVDTIndex
                  ]['size']"
                  :key="cVDTRIndex"
                >
                  <div
                    v-if="cVDTRIndex > 0"
                    class="flex justify-content-between"
                  >
                    <div class="flex"></div>
                    <div
                      class="flex delete"
                      @click="
                        deleteECommerceVanDeliveryTypeRates(
                          zrIndex,
                          cVDTIndex,
                          cVDTRIndex
                        )
                      "
                    >
                      <i class="pi pi-times mt-2"></i>
                    </div>
                  </div>
                  <!--fields row one-->
                  <!-- Second row delivery type -->
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-3">
                      <h5 class="dialog-label-text required">Name the Size</h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'size_name'
                          ]
                        "
                        type="text"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                              'size_name'
                            ].$invalid &&
                            $store.state.rapidoAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-4">
                      <h5 class="dialog-label-text required">Kg</h5>
                      <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                          <NumberField
                            v-model="
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                                'min_weight'
                              ]
                            "
                            :maxFractionDigits="2"
                            :showButtons="true"
                            mode="decimal"
                            :classes="{
                              'p-invalid':
                                v$.details['rates'][zrIndex]['charge_type'][
                                  'e_commerce'
                                ]['delivery_type'][cVDTIndex]['size'][
                                  cVDTRIndex
                                ]['min_weight'].$invalid &&
                                $store.state.rapidoAdhoc
                                  .addZonalRatesSubmission,
                              'inputfield w-full dialog-field-text ': true,
                            }"
                          />
                        </div>
                        <div class="field col-12 md:col-6">
                          <NumberField
                            v-model="
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                                'max_weight'
                              ]
                            "
                            :maxFractionDigits="2"
                            :showButtons="true"
                            mode="decimal"
                            :classes="{
                              'p-invalid':
                                v$.details['rates'][zrIndex]['charge_type'][
                                  'e_commerce'
                                ]['delivery_type'][cVDTIndex]['size'][
                                  cVDTRIndex
                                ]['max_weight'].$invalid &&
                                $store.state.rapidoAdhoc
                                  .addZonalRatesSubmission,
                              'inputfield w-full dialog-field-text ': true,
                            }"
                          />
                        </div>
                      </div>

                      <div
                        v-if="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'max_weight'
                          ] <
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'min_weight'
                          ]
                        "
                        class="ml-2"
                        style="color: red"
                      >
                        Max Kg must be greater than Min Kg
                      </div>
                    </div>
                    <div class="field col-12 md:col-4">
                      <h5 class="dialog-label-text required">Cm</h5>
                      <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                          <NumberField
                            v-model="
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                                'min_length'
                              ]
                            "
                            :maxFractionDigits="2"
                            :showButtons="true"
                            mode="decimal"
                            :classes="{
                              'p-invalid':
                                v$.details['rates'][zrIndex]['charge_type'][
                                  'e_commerce'
                                ]['delivery_type'][cVDTIndex]['size'][
                                  cVDTRIndex
                                ]['min_length'].$invalid &&
                                $store.state.rapidoAdhoc
                                  .addZonalRatesSubmission,
                              'inputfield w-full dialog-field-text ': true,
                            }"
                          />
                        </div>
                        <div class="field col-12 md:col-6">
                          <NumberField
                            v-model="
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                                'max_length'
                              ]
                            "
                            :maxFractionDigits="2"
                            :showButtons="true"
                            mode="decimal"
                            :classes="{
                              'p-invalid':
                                v$.details['rates'][zrIndex]['charge_type'][
                                  'e_commerce'
                                ]['delivery_type'][cVDTIndex]['size'][
                                  cVDTRIndex
                                ]['max_length'].$invalid &&
                                $store.state.rapidoAdhoc
                                  .addZonalRatesSubmission,
                              'inputfield w-full dialog-field-text ': true,
                            }"
                          />
                        </div>
                      </div>
                      <div
                        v-if="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'max_length'
                          ] <
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'min_length'
                          ]
                        "
                        class="ml-2"
                        style="color: red"
                      >
                        Max cm must be greater than Min cm
                      </div>
                    </div>
                    <div class="field col-12 md:col-1">
                      <h5 class="dialog-label-text required">Rate</h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                            'unit_rate'
                          ]
                        "
                        type="number"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['delivery_type'][cVDTIndex]['size'][cVDTRIndex][
                              'unit_rate'
                            ].$invalid &&
                            $store.state.rapidoAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-content-between add_rate ml-3">
                  <div class="flex">
                    <span
                      class="new-field"
                      @click="
                        addECommerceVanDeliveryTypeRates(zrIndex, cVDTIndex)
                      "
                      ><b>+ Add Rate</b></span
                    >
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <div class="flex justify-content-between add_rate ml-3 mt-2">
              <div class="flex">
                <span
                  class="new-field"
                  @click="addECommerceVanDeliveryType(zrIndex)"
                  ><b>+ Add Delivery Type</b></span
                >
              </div>
            </div>
          </div>
        </span>
        <!--E-Commerce Rates Fields : Ends Here-->

        <!--Surcharges Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['zonal_rates_duo_selection_state'] ==
            'Surcharges'
          "
        >
          <div class="mt-3">
            <span class="step-text">Add Surcharges</span>
          </div>
          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text">COD Fee ($)</h5>
              <TextField
                v-model="
                  details['rates'][zrIndex]['charge_type']['surcharges'][
                    'cod_fee'
                  ]
                "
                type="number"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][zrIndex]['charge_type']['surcharges'][
                      'cod_fee'
                    ].$invalid &&
                    $store.state.rapidoAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text">COD Fee (% of cash collected)</h5>
              <TextField
                v-model="
                  details['rates'][zrIndex]['charge_type']['surcharges'][
                    'cod_fee_percentage'
                  ]
                "
                type="number"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][zrIndex]['charge_type']['surcharges'][
                      'cod_fee_percentage'
                    ].$invalid &&
                    $store.state.rapidoAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--fields row two-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text">Timeslot Delivery ($)</h5>
              <TextField
                v-model="
                  details['rates'][zrIndex]['charge_type']['surcharges'][
                    'timeslot_delivery'
                  ]
                "
                type="number"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][zrIndex]['charge_type']['surcharges'][
                      'timeslot_delivery'
                    ].$invalid &&
                    $store.state.rapidoAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-3">
              <h5 class="dialog-label-text">Timeslot Delivery Fixed Hours</h5>
              <NumberField
                v-model="
                  details['rates'][zrIndex]['charge_type']['surcharges'][
                    'timeslot_delivery_fixed_hours'
                  ]
                "
                :maxFractionDigits="2"
                :showButtons="true"
                mode="decimal"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][zrIndex]['charge_type']['surcharges'][
                      'timeslot_delivery_fixed_hours'
                    ].$invalid &&
                    $store.state.rapidoAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!-- field row three -->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="dialog-label-text">Standard Liability ($)</h5>
              <TextField
                v-model="
                  details['rates'][zrIndex]['charge_type']['surcharges'][
                    'standard_liability'
                  ]
                "
                type="number"
                :classes="{
                  'p-invalid':
                    v$.details['rates'][zrIndex]['charge_type']['surcharges'][
                      'standard_liability'
                    ].$invalid &&
                    $store.state.rapidoAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
        </span>
        <!--Surcharges Fields : Ends Here-->

        <!--Additional Surcharges Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['zonal_rates_duo_selection_state'] ==
            'Additional Surcharges'
          "
        >
          <div class="mt-3">
            <span class="step-text">Add Surcharges</span>
          </div>
          <!--fields row one-->
          <div
            v-for="(additionalSurcharges, addlSurchargeIndex) of details[
              'rates'
            ][zrIndex]['charge_type']['additional_surcharges']"
            :key="addlSurchargeIndex"
          >
            <div
              v-if="addlSurchargeIndex > 0"
              class="flex justify-content-between"
            >
              <div class="flex"></div>
              <div
                class="flex delete"
                @click="deleteAdditionalSurcharges(zrIndex, addlSurchargeIndex)"
              >
                <i class="pi pi-times mt-2"></i>
              </div>
            </div>
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">Surcharge Name</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'additional_surcharges'
                    ][addlSurchargeIndex]['surcharge_name']
                  "
                  type="text"
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'additional_surcharges'
                      ][addlSurchargeIndex]['surcharge_name'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="dialog-label-text required">Rate (S$)</h5>
                <TextField
                  v-model="
                    details['rates'][zrIndex]['charge_type'][
                      'additional_surcharges'
                    ][addlSurchargeIndex]['rates']
                  "
                  type="number"
                  :classes="{
                    'p-invalid':
                      v$.details['rates'][zrIndex]['charge_type'][
                        'additional_surcharges'
                      ][addlSurchargeIndex]['rates'].$invalid &&
                      $store.state.rapidoAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-content-between add_rate ml-3 mt-2">
            <div class="flex">
              <span class="new-field" @click="addAdditionalSurcharges(zrIndex)"
                ><b>+ Add Surcharge</b></span
              >
            </div>
          </div>
        </span>
        <!--Additional Surcharges Fields : Ends Here-->

        <div class="mt-3">
          <span class="tab-validation-text">
            <i class="pi pi-info-circle mr-2"></i>
            <span
              >Fill all the required fields in the current tab to proceed to
              other tab/s</span
            >
          </span>
        </div>
      </AccordionTab>
    </Accordion>
    <div class="flex justify-content-between add_rate ml-3 mt-2">
      <div class="flex">
        <span class="new-field" @click="addZonalRate"
          ><b>+ Add Zonal Rate</b></span
        >
      </div>
    </div>
    <!--ADD ZONAL RATES FIELDS : ENDS HERE-->

    <div class="mt-3">
      <span
        v-if="v$.$invalid && $store.state.rapidoAdhoc.addZonalRatesSubmission"
        class="validation-text"
      >
        <i class="pi pi-info-circle mr-2"></i>
        <span>Ensure all required fields for each zonal rate/s are filled</span>
      </span>
    </div>
  </div>

  <!--navigation buttons-->
  <div class="mt-5">
    <div
      class="flex justify-content-between w-full align-content-start flex-wrap"
    >
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="rapidoAdhoc" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
  <!--navigation buttons-->
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Accordion from "primevue/accordion";
import moment from "moment";
import AccordionTab from "primevue/accordiontab";
import axios from "axios";
import { mapGetters } from "vuex";
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

import DuoSelection from "../../DuoSelect.vue";

export default {
  components: { Accordion, AccordionTab, DuoSelection },
  data: () => ({
    v$: useVuelidate(),
    // submitted: false,

    active: 0,
    activeTwo: 0,
    ZoneData: [],
    addZonalRates: ["new_zonal_rate"],

    cloneFieldClicked: 0,

    //Zonal Rates Validation
    zonal_rates_validation: [
      {
        zones_ranges: { required },
        charge_type: {
          on_demand_services: {
            min_weight: { required },
            max_weight: { required },
            collect_time: { required },
            cut_off_time: { required },
            cut_off_days_count: { required },
            van_job_min_cost: { required },
            van_job_maximum_kilo_meter: { required },
            van_job_additional_cost: { required },
            van_job_additional_kilo_meter: { required },
            van_job_urgent_surcharges: { required },
          },
          e_commerce: {
            delivery_type: [
              {
                delivery_type: { required },
                delivery_type_initial: { required },
                collect_time: { required },
                cut_off_time: { required },
                cut_off_days_count: { required },
                size: [
                  {
                    size_name: { required },
                    min_weight: { required },
                    max_weight: { required },
                    min_length: { required },
                    max_length: { required },
                    unit_rate: { required },
                  },
                ],
              },
            ],
          },
          surcharges: {
            cod_fee: { required },
            cod_fee_percentage: { required },
            timeslot_delivery: { required },
            timeslot_delivery_fixed_hours: { required },
            standard_liability: { required },
          },
          additional_surcharges: [
            {
              surcharge_name: { required },
              rates: { required },
            },
          ],
        },
      },
    ],

    //DATA COLLECTION
    details: {
      //zonal rate
      rates: [
        {
          //zone ranges
          zones_ranges: [],
          zones: [],
          zonal_rates_duo_selection_state: "E-Commerce",
          charge_type: {
            //normal rates
            on_demand_services: {
              min_weight: "",
              max_weight: "",
              collect_time: "",
              cut_off_time: "",
              cut_off_days_count: "",
              van_job_min_cost: "",
              van_job_maximum_kilo_meter: "",
              van_job_additional_cost: "",
              van_job_additional_kilo_meter: "",
              van_job_urgent_surcharges: "",
            },

            //e-commerce rates
            e_commerce: {
              delivery_type: [
                {
                  delivery_type: "",
                  collect_time: "",
                  cut_off_time: "",
                  delivery_type_initial: "",
                  cut_off_days_count: "",
                  size: [
                    {
                      size_name: "",
                      min_weight: "",
                      max_weight: "",
                      min_length: "",
                      max_length: "",
                      unit_rate: "",
                    },
                  ],
                },
              ],
            },

            //surcharges
            surcharges: {
              cod_fee: "",
              cod_fee_percentage: "",
              timeslot_delivery: "",
              timeslot_delivery_fixed_hours: "",
              standard_liability: "",
            },

            //additional surcharges
            additional_surcharges: [
              {
                surcharge_name: "",
                rates: "",
              },
            ],
          },
        },
      ],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.cloneFieldClicked > -1) {
      return {
        details: {
          rates: this.zonal_rates_validation,
        },
      };
    }
  },

  methods: {
    goBackHandler() {
      this.$store.dispatch("rapidoAdhoc/navigateStepper", {
        step: "AddZone",
      });
    },
    async nextStepHandler() {
      if (this.v$.$invalid) {
        this.$store.dispatch("rapidoAdhoc/setAddZonalRatesSubmission", {
          bool: true,
        });
      }
      if (!this.v$.$invalid) {
        await this.processDataHandler();
        await this.processTimePickerData();

        // this.$store.state.rapidoAdhoc.rapidoAdhocAddNewData["rates"] =
        //   this.details.rates;
        this.$store.dispatch("rapidoAdhoc/navigateStepper", {
          step: "AddEffectiveDates",
        });
      }
    },
    //for time pickers
    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        var formattedTime = moment(data).utc().format("HH:mm");
        //var formattedTime = moment(data).format("HH:mm");
        return formattedTime;
      }
    },
    //Zonal Rates
    addZonalRate() {
      this.details.rates.push({
        //zone ranges
        zones_ranges: "",
        zones: [],

        zonal_rates_duo_selection_state: "E-Commerce",
        charge_type: {
          //on demand rates
          on_demand_services: {
            min_weight: "",
            max_weight: "",
            collect_time: "",
            cut_off_time: "",
            cut_off_days_count: "",
            van_job_min_cost: "",
            van_job_maximum_kilo_meter: "",
            van_job_additional_cost: "",
            van_job_additional_kilo_meter: "",
            van_job_urgent_surcharges: "",
          },
          //e-commerce rates
          e_commerce: {
            delivery_type: [
              {
                delivery_type: "",
                collect_time: "",
                cut_off_time: "",
                delivery_type_initial: "",
                cut_off_days_count: "",
                size: [
                  {
                    size_name: "",
                    min_weight: "",
                    max_weight: "",
                    min_length: "",
                    max_length: "",
                    unit_rate: "",
                  },
                ],
              },
            ],
          },
          //surcharges
          surcharges: {
            cod_fee: "",
            cod_fee_percentage: "",
            timeslot_delivery: "",
            timeslot_delivery_fixed_hours: "",
            standard_liability: "",
          },
          //additional surcharges
          additional_surcharges: [
            {
              surcharge_name: "",
              rates: "",
            },
          ],
        },
      });
      this.zonal_rates_validation.push({
        zones_ranges: { required },
        charge_type: {
          on_demand_services: {
            min_weight: { required },
            max_weight: { required },
            collect_time: { required },
            cut_off_time: { required },
            cut_off_days_count: { required },
            van_job_min_cost: { required },
            van_job_maximum_kilo_meter: { required },
            van_job_additional_cost: { required },
            van_job_additional_kilo_meter: { required },
            van_job_urgent_surcharges: { required },
          },
          e_commerce: {
            delivery_type: [
              {
                delivery_type: { required },
                delivery_type_initial: { required },
                collect_time: { required },
                cut_off_time: { required },
                cut_off_days_count: { required },
                size: [
                  {
                    size_name: { required },
                    min_weight: { required },
                    max_weight: { required },
                    min_length: { required },
                    max_length: { required },
                    unit_rate: { required },
                  },
                ],
              },
            ],
          },
          surcharges: {
            cod_fee: { required },
            cod_fee_percentage: { required },
            timeslot_delivery: { required },
            timeslot_delivery_fixed_hours: { required },
            standard_liability: { required },
          },
          additional_surcharges: [
            {
              surcharge_name: { required },
              rates: { required },
            },
          ],
        },
      });
      this.addZonalRates.push("new_zonal_rate");
      this.cloneFieldClicked++;
    },
    deleteZonalRates(index) {
      this.details.rates[index].charge_type.e_commerce.delivery_type.splice(1);
      // this.details.zonal_rates[index].additional_surcharges.splice(1);
      this.details.rates.splice(index, 1);

      this.zonal_rates_validation[
        index
      ].charge_type.e_commerce.delivery_type.splice(1);
      // this.zonal_rates_validation[index].additional_surcharges.splice(1);
      this.zonal_rates_validation.splice(index, 1);

      this.addZonalRates.splice(index, 1);
      this.cloneFieldClicked++;
    },
    //process dropdown data
    async processDataHandler() {
      for (let i in this.details.rates) {
        if (this.details.rates) {
          if (this.details.rates[i].zones_ranges) {
            this.details.rates[i].zones = [];
            this.details.rates[i].zones_ranges.map((item) => {
              let splitarr = item.name.split("-");

              if (this.ZoneData) {
                let respectiveFromZoneData = this.ZoneData.find(
                  (itm) => itm.name == splitarr[0].trim()
                );
                let respectiveToZoneData = this.ZoneData.find(
                  (itm) => itm.name == splitarr[1].trim()
                );
                if (respectiveFromZoneData && respectiveToZoneData) {
                  this.details.rates[i]["zones"].push({
                    zone_from_id: respectiveFromZoneData.id,
                    zone_to_id: respectiveToZoneData.id,
                  });
                }
              }
            });
          }
        }
      }
    },
    async processTimePickerData() {
      let processedData = JSON.parse(JSON.stringify(this.details));
      // processedData["rates"].map((item) => {
      processedData["rates"].map((item) => {
        item.charge_type.e_commerce.delivery_type.map((itm) => {
          itm.cut_off_time = this.timeFormatter(itm.cut_off_time);
          itm.collect_time = this.timeFormatter(itm.collect_time);
        });
        item.charge_type.on_demand_services.cut_off_time = this.timeFormatter(
          item.charge_type.on_demand_services.cut_off_time
        );
        item.charge_type.on_demand_services.collect_time = this.timeFormatter(
          item.charge_type.on_demand_services.collect_time
        );
      });
      this.$store.state.rapidoAdhoc.rapidoAdhocAddNewData["rates"] =
        processedData["rates"];
    },
    getZoneDropdownData() {
      axios
        .get("/settings/sales/rates/rapido/adhoc/dropdowns/zones")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.ZoneData.push(res.data.results[c]);
            }
          }
        });
    },

    //E-Commerce Van delivery type
    addECommerceVanDeliveryType(parentIndex) {
      this.details.rates[parentIndex].charge_type.e_commerce.delivery_type.push(
        {
          delivery_type: "",
          collect_time: "",
          cut_off_time: "",
          delivery_type_initial: "",
          cut_off_days_count: "",
          size: [
            {
              size_name: "",
              min_weight: "",
              max_weight: "",
              min_length: "",
              max_length: "",
              unit_rate: "",
            },
          ],
        }
      );
      this.zonal_rates_validation[
        parentIndex
      ].charge_type.e_commerce.delivery_type.push({
        delivery_type: { required },
        delivery_type_initial: { required },
        collect_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        size: [
          {
            size_name: { required },
            min_weight: { required },
            max_weight: { required },
            min_length: { required },
            max_length: { required },
            unit_rate: { required },
          },
        ],
      });
      this.cloneFieldClicked++;
    },
    deleteECommerceVanDeliveryType(parentIndex, index) {
      this.details.rates[parentIndex].charge_type.e_commerce.delivery_type[
        index
      ].size.splice(1);
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.delivery_type.splice(index, 1);

      this.zonal_rates_validation[
        parentIndex
      ].charge_type.e_commerce.delivery_type[index].size.splice(1);
      this.zonal_rates_validation[
        parentIndex
      ].charge_type.e_commerce.delivery_type.splice(index, 1);
      this.cloneFieldClicked++;
    },

    //E-Commerce Van delivery type rates
    addECommerceVanDeliveryTypeRates(grandParentIndex, parentIndex) {
      this.details.rates[grandParentIndex].charge_type.e_commerce.delivery_type[
        parentIndex
      ].size.push({
        size_name: "",
        min_weight: "",
        max_weight: "",
        min_length: "",
        max_length: "",
        unit_rate: "",
      });
      this.zonal_rates_validation[
        grandParentIndex
      ].charge_type.e_commerce.delivery_type[parentIndex].size.push({
        size_name: { required },
        min_weight: { required },
        max_weight: { required },
        min_length: { required },
        max_length: { required },
        unit_rate: { required },
      });
      this.cloneFieldClicked++;
    },
    deleteECommerceVanDeliveryTypeRates(grandParentIndex, parentIndex, index) {
      this.details.rates[grandParentIndex].charge_type.e_commerce.delivery_type[
        parentIndex
      ].size.splice(index, 1);
      this.zonal_rates_validation[
        grandParentIndex
      ].charge_type.e_commerce.delivery_type[parentIndex].size.splice(index, 1);
      this.cloneFieldClicked++;
    },

    //Additional Surcharges
    addAdditionalSurcharges(parentIndex) {
      this.details.rates[parentIndex].charge_type.additional_surcharges.push({
        surcharge_name: "",
        rates: "",
      });
      this.zonal_rates_validation[
        parentIndex
      ].charge_type.additional_surcharges.push({
        surcharge_name: { required },
        rates: { required },
      });
      this.cloneFieldClicked++;
    },
    deleteAdditionalSurcharges(parentIndex, index) {
      this.details.rates[parentIndex].charge_type.additional_surcharges.splice(
        index,
        1
      );
      this.zonal_rates_validation[
        parentIndex
      ].charge_type.additional_surcharges.splice(index, 1);
      this.cloneFieldClicked++;
    },
    async zonalRatesDuoTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.rapidoAdhoc.zonalRatesDuoType[1]
        ]
      ) {
        if (
          this.details["rates"][
            this.$store.state.rapidoAdhoc.zonalRatesDuoType[1]
          ]["zonal_rates_duo_selection_state"]
        ) {
          this.details["rates"][
            this.$store.state.rapidoAdhoc.zonalRatesDuoType[1]
          ]["zonal_rates_duo_selection_state"] =
            this.$store.state.rapidoAdhoc.zonalRatesDuoType[0];
        }
      }
    },
    async normalRatesTransportTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.rapidoAdhoc.normalRatesTransportType[1]
        ]
      ) {
        this.details["rates"][
          this.$store.state.rapidoAdhoc.normalRatesTransportType[1]
        ]["on_demand_services_transport_duo_selection_state"] =
          this.$store.state.rapidoAdhoc.normalRatesTransportType[0];
      }
    },
    async eCommerceRatesTransportTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.rapidoAdhoc.eCommerceRatesTransportType[1]
        ]
      ) {
        this.details["rates"][
          this.$store.state.rapidoAdhoc.eCommerceRatesTransportType[1]
        ]["e_commerce_transport_duo_selection_state"] =
          this.$store.state.rapidoAdhoc.eCommerceRatesTransportType[0];
      }
    },
  },

  computed: {
    ...mapGetters({
      rapidoAdhocEditTableData: "rapidoAdhoc/rapidoAdhocEditTableData",
    }),
  },
  watch: {
    //watch for validation changes
    v$: function () {
      this.$store.dispatch("rapidoAdhoc/setAddZonalRatesValidation", {
        bool: this.v$,
      });
    },
    //watch for zonal rates type selection
    "$store.state.rapidoAdhoc.zonalRatesDuoType": async function () {
      await this.zonalRatesDuoTypeHandler();
    },
    //watch for normal rates transport selection
    "$store.state.rapidoAdhoc.normalRatesTransportType": async function () {
      await this.normalRatesTransportTypeHandler();
    },
    //watch for e-commerce rates transport selection
    "$store.state.rapidoAdhoc.eCommerceRatesTransportType": async function () {
      await this.eCommerceRatesTransportTypeHandler();
    },
    //watch for zonal rates type selection
    // "$store.state.rapidoAdhoc.zonalRatesDuoType": function () {
    //   setTimeout(() => {
    //     this.details["rates"][
    //       this.$store.state.rapidoAdhoc.zonalRatesDuoType[1]
    //     ]["zonal_rates_duo_selection_state"] =
    //       this.$store.state.rapidoAdhoc.zonalRatesDuoType[0];
    //   }, 700);
    // },
    // //watch for normal rates transport selection
    // "$store.state.rapidoAdhoc.normalRatesTransportType": function () {
    //   setTimeout(() => {
    //     this.details["rates"][
    //       this.$store.state.rapidoAdhoc.normalRatesTransportType[1]
    //     ]["on_demand_services_transport_duo_selection_state"] =
    //       this.$store.state.rapidoAdhoc.normalRatesTransportType[0];
    //   }, 700);
    // },
    // //watch for e-commerce rates transport selection
    // "$store.state.rapidoAdhoc.eCommerceRatesTransportType": function () {
    //   setTimeout(() => {
    //     this.details["rates"][
    //       this.$store.state.rapidoAdhoc.eCommerceRatesTransportType[1]
    //     ]["eCommerce_rates_transport_duo_selection_state"] =
    //       this.$store.state.rapidoAdhoc.eCommerceRatesTransportType[0];
    //   }, 700);
    // },
  },
  async created() {
    await this.getZoneDropdownData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
</style>
