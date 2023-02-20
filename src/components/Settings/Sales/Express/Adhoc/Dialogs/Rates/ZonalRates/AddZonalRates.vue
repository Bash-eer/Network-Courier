<template>
  <div class="p-2 mt-2">
    <!--ADD ZONAL RATES FIELDS : STARTS HERE-->
    <!--  :multiple="true"-->
    <Accordion class="formAccordion mt-3" :activeIndex="active">
      <AccordionTab
        class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
        v-for="(zonalRate, zrIndex) of addZonalRates"
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
          :options="$store.state.expressAdhoc.zoneRangeDropDownData"
          :filter="true"
          :value="details.rates[zrIndex].zones_ranges"
          :state="details.rates[zrIndex].zones_ranges"
          v-model="details.rates[zrIndex].zones_ranges"
          @blur="v$.details.rates[zrIndex].zones_ranges.$model"
          :classes="{
            'p-invalid':
              v$.details.rates[zrIndex].zones_ranges.$invalid &&
              $store.state.expressAdhoc.addZonalRatesSubmission,
            'inputfield w-full dialog-field-text': true,
          }"
        />
        <!--Add Zone Ranges : Ends Here-->
        <div class="my-3">
          <span class="color-4e5968 font-size-14 bold-600">Add Rates</span>
        </div>
        <!--Rate Types Selection : Starts Here-->
        <div class="mt-4">
          <DuoSelection
            :options="[
              { name: 'Normal', code: 'Normal', disabled: false },
              { name: 'E-Commerce', code: 'E-Commerce', disabled: true },
              { name: 'Surcharges', code: 'Surcharges', disabled: true },
              {
                name: 'Additional Surcharges',
                code: 'Additional Surcharges',
                disabled: true,
              },
            ]"
            :default="details['rates'][zrIndex]['rates_duo_selection_state']"
            :index="zrIndex"
            type="setZonalRates"
          />
        </div>
        <!--Rate Types Selection : Ends Here-->

        <!--Normal Rates Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['rates_duo_selection_state'] == 'Normal'
          "
        >
          <div class="mt-4 bikeVanDuoSelect">
            <DuoSelection
              :options="[
                { name: 'Bike', code: 'Bike', disabled: false },
                { name: 'Van', code: 'Van', disabled: false },
              ]"
              :default="
                details['rates'][zrIndex][
                  'normal_transport_duo_selection_state'
                ]
              "
              :index="zrIndex"
              type="setNormalRatesTransport"
            />

            <!--Bike Fields : Starts Here-->
            <span
              v-if="
                details['rates'][zrIndex][
                  'normal_transport_duo_selection_state'
                ] == 'Bike'
              "
            >
              <!--fields row one-->
              <div class="formgrid grid mt-3">
                <div class="field col-12 md:col-6">
                  <h5 class="color-7a7a7a font-size-14 bold-500 required">
                    Min Charge per Job ($)
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal'][
                        'bike'
                      ]['min_charge_per_job']
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'bike'
                        ]['min_charge_per_job'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
            </span>
            <!--Bike Fields : Ends Here-->

            <!--Van Fields : Starts Here-->
            <span
              v-if="
                details['rates'][zrIndex][
                  'normal_transport_duo_selection_state'
                ] == 'Van'
              "
            >
              <!--fields row one-->
              <div class="formgrid grid mt-3">
                <div class="field col-12 md:col-6">
                  <h5 class="required color-7a7a7a font-size-14 bold-500">
                    Van Job Min. Cost $
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal']['van'][
                        'van_job_min_cost'
                      ]
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'van'
                        ]['van_job_min_cost'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-6">
                  <h5 class="required color-7a7a7a font-size-14 bold-500">
                    Maximum Weight (Kg)
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal']['van'][
                        'maximun_weight'
                      ]
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'van'
                        ]['maximun_weight'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
              <!--fields row two-->
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <h5 class="color-7a7a7a font-size-14 bold-500 required">
                    Van Job Add. Cost $
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal']['van'][
                        'van_job_additional_cost'
                      ]
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'van'
                        ]['van_job_additional_cost'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-6">
                  <h5 class="color-7a7a7a font-size-14 bold-500 required">
                    Van Job Add. Weight (Kg)
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal']['van'][
                        'van_job_additional_weight'
                      ]
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'van'
                        ]['van_job_additional_weight'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
              <!--fields row three-->
              <div class="formgrid grid">
                <div class="field col-12 md:col-6">
                  <h5 class="color-7a7a7a font-size-14 bold-500 required">
                    Van Job Urgent. Surcharge $
                  </h5>
                  <TextField
                    v-model="
                      details['rates'][zrIndex]['charge_type']['normal']['van'][
                        'van_job_urgent_surcharges'
                      ]
                    "
                    type="number"
                    :classes="{
                      'p-invalid':
                        v$.details['rates'][zrIndex]['charge_type']['normal'][
                          'van'
                        ]['van_job_urgent_surcharges'].$invalid &&
                        $store.state.expressAdhoc.addZonalRatesSubmission,
                      'inputfield w-full dialog-field-text ': true,
                    }"
                  />
                </div>
              </div>
            </span>
            <!--Van Fields : Ends Here-->
          </div>
        </span>
        <!--Normal Rates Fields : Ends Here-->

        <!--E-Commerce Rates Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['rates_duo_selection_state'] ==
            'E-Commerce'
          "
        >
          <div class="mt-3">
            <span class="color-4e5968 font-size-14 bold-600"
              >Add E-Commerce Charges</span
            >
          </div>
          <div class="mt-4 bikeVanDuoSelect">
            <DuoSelection
              :options="[
                { name: 'Bike', code: 'Bike', disabled: false },
                { name: 'Van', code: 'Van', disabled: false },
              ]"
              :default="
                details['rates'][zrIndex][
                  'e_commerce_transport_duo_selection_state'
                ]
              "
              :index="zrIndex"
              type="setECommerceRatesTransport"
            />

            <!--Bike Fields : Starts Here-->
            <span
              v-if="
                details['rates'][zrIndex][
                  'e_commerce_transport_duo_selection_state'
                ] == 'Bike'
              "
            >
              <Accordion class="SubFormAccordion mt-3" :activeIndex="activeTwo">
                <AccordionTab
                  class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
                  v-for="(eCommerceBikeDeliveryType, cBDTIndex) of details[
                    'rates'
                  ][zrIndex]['charge_type']['e_commerce']['bike'][
                    'delivery_type'
                  ]"
                  :key="cBDTIndex"
                >
                  <template #header>
                    <div class="flex justify-content-between w-100">
                      <div class="flex">
                        {{ "Delivery Type" + " " + (parseInt(cBDTIndex) + 1) }}
                      </div>
                      <div
                        v-if="cBDTIndex > 0"
                        class="flex delete"
                        @click="
                          deleteECommerceBikeDeliveryType(zrIndex, cBDTIndex)
                        "
                      >
                        <i class="parent-times pi pi-times mt-2"></i>
                      </div>
                    </div>
                  </template>
                  <!--fields row one-->
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-6">
                      <h5 class="required color-7a7a7a font-size-14 bold-500">
                        Delivery Type
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['delivery_type']
                        "
                        type="text"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'delivery_type'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'rates inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-6">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Collection Time
                      </h5>
                      <!-- <NumberField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['collect_time']
                        "
                        :showButtons="true"
                        mode="decimal"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'collect_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'rates inputfield w-full dialog-field-text ': true,
                        }"
                      /> -->
                      <TimePicker24
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['collect_time']
                        "
                        :key="
                          $store.state.expressAdhoc.eCommerceRatesTransportType
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['collect_time']
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'collect_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      />
                    </div>
                  </div>
                  <!--fields row two-->
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-3">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Cut Off Time
                      </h5>
                      <TimePicker24
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'cut_off_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      />
                      <!-- <TimePicker
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :key="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'cut_off_time'
                            ].$invalid && submitted,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      /> -->
                      <!-- <NumberField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['cut_off_time']
                        "
                        :showButtons="true"
                        mode="decimal"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'cut_off_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'rates inputfield w-full dialog-field-text ': true,
                        }"
                      /> -->
                    </div>
                    <div class="field col-12 md:col-3">
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          required
                          flex-nowrap flex-none
                          mx-0
                          px-0
                        "
                      >
                        Cut Off Days Count
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex][
                            'cut_off_days_count'
                          ]
                        "
                        type="number"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'cut_off_days_count'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'rates inputfield w-full dialog-field-text ': true,
                        }"
                      />
                      <!-- <TimePicker24
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex][
                            'cut_off_days_count'
                          ]
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex][
                            'cut_off_days_count'
                          ]
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'cut_off_days_count'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      /> -->
                    </div>
                    <div class="field col-12 md:col-6">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Rate ($)
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex]['rate']
                        "
                        type="number"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex]['rate']
                              .$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                  </div>
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-10">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Delivery Type Initial
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['bike']['delivery_type'][cBDTIndex][
                            'delivery_type_initial'
                          ]
                        "
                        type="text"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['bike']['delivery_type'][cBDTIndex][
                              'delivery_type_initial'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                  </div>
                </AccordionTab>
              </Accordion>
              <div class="flex justify-content-between add_rate ml-3 mt-2">
                <div class="flex">
                  <span
                    class="new-field"
                    @click="addECommerceBikeDeliveryType(zrIndex)"
                    ><b>+ Add Delivery Type</b></span
                  >
                </div>
              </div>
            </span>
            <!--Bike Fields : Ends Here-->

            <!--Van Fields : Starts Here-->
            <span
              v-if="
                details['rates'][zrIndex][
                  'e_commerce_transport_duo_selection_state'
                ] == 'Van'
              "
            >
              <Accordion class="SubFormAccordion mt-3" :activeIndex="active">
                <AccordionTab
                  class="p-2 mt-3 ecommerce_bike_delivery_type_div w-100"
                  v-for="(eCommerceVanDeliveryType, cVDTIndex) of details[
                    'rates'
                  ][zrIndex]['charge_type']['e_commerce']['van'][
                    'delivery_type'
                  ]"
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
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Delivery Type
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['delivery_type']
                        "
                        type="text"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex][
                              'delivery_type'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-3">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Collection Time
                      </h5>
                      <TimePicker24
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['collect_time']
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['collect_time']
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex]['collect_time']
                              .$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      />
                      <!-- <NumberField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['collect_time']
                        "
                        :showButtons="true"
                        mode="decimal"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex][
                              'collect_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      /> -->
                    </div>
                    <div class="field col-12 md:col-3">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Cut Off Time
                      </h5>
                      <!-- <NumberField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['cut_off_time']
                        "
                        :showButtons="true"
                        mode="decimal"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex][
                              'cut_off_time'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      /> -->
                      <TimePicker24
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['cut_off_time']
                        "
                        :state="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex]['cut_off_time']
                        "
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex]['cut_off_time']
                              .$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-dropdown-text ': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-3">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Cut Off Days Count
                      </h5>
                      <TextField
                        v-model="
                          details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex][
                            'cut_off_days_count'
                          ]
                        "
                        type="number"
                        :classes="{
                          'p-invalid':
                            v$.details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex][
                              'cut_off_days_count'
                            ].$invalid &&
                            $store.state.expressAdhoc.addZonalRatesSubmission,
                          'inputfield w-full dialog-field-text ': true,
                        }"
                      />
                    </div>
                  </div>
                  <div class="field col-12 md:col-10">
                    <h5 class="color-7a7a7a font-size-14 bold-500 required">
                      Delivery Type Initial
                    </h5>
                    <TextField
                      v-model="
                        details['rates'][zrIndex]['charge_type']['e_commerce'][
                          'van'
                        ]['delivery_type'][cVDTIndex]['delivery_type_initial']
                      "
                      type="text"
                      :classes="{
                        'p-invalid':
                          v$.details['rates'][zrIndex]['charge_type'][
                            'e_commerce'
                          ]['van']['delivery_type'][cVDTIndex][
                            'delivery_type_initial'
                          ].$invalid &&
                          $store.state.expressAdhoc.addZonalRatesSubmission,
                        'inputfield w-full dialog-field-text ': true,
                      }"
                    />
                  </div>
                  <!--fields row two-->
                  <div
                    v-for="(
                      eCommerceVanDeliveryTypeRates, cVDTRIndex
                    ) of details['rates'][zrIndex]['charge_type']['e_commerce'][
                      'van'
                    ]['delivery_type'][cVDTIndex]['rates']"
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
                    <div class="formgrid grid">
                      <div class="field col-12 md:col-6">
                        <h5 class="color-7a7a7a font-size-14 bold-500 required">
                          Weight Range (Kg)
                        </h5>
                        <div class="formgrid grid">
                          <div class="field col-12 md:col-6">
                            <NumberField
                              v-model="
                                details['rates'][zrIndex]['charge_type'][
                                  'e_commerce'
                                ]['van']['delivery_type'][cVDTIndex]['rates'][
                                  cVDTRIndex
                                ]['min_weight']
                              "
                              :showButtons="true"
                              mode="decimal"
                              :maxFractionDigits="2"
                              :classes="{
                                'p-invalid':
                                  v$.details['rates'][zrIndex]['charge_type'][
                                    'e_commerce'
                                  ]['van']['delivery_type'][cVDTIndex]['rates'][
                                    cVDTRIndex
                                  ]['min_weight'].$invalid &&
                                  $store.state.expressAdhoc
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
                                ]['van']['delivery_type'][cVDTIndex]['rates'][
                                  cVDTRIndex
                                ]['max_weight']
                              "
                              :showButtons="true"
                              mode="decimal"
                              :maxFractionDigits="2"
                              :classes="{
                                'p-invalid':
                                  v$.details['rates'][zrIndex]['charge_type'][
                                    'e_commerce'
                                  ]['van']['delivery_type'][cVDTIndex]['rates'][
                                    cVDTRIndex
                                  ]['max_weight'].$invalid &&
                                  $store.state.expressAdhoc
                                    .addZonalRatesSubmission,
                                'inputfield w-full dialog-field-text ': true,
                              }"
                            />
                          </div>
                          <div
                            v-if="
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['van']['delivery_type'][cVDTIndex]['rates'][
                                cVDTRIndex
                              ]['max_weight'] <=
                              details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['van']['delivery_type'][cVDTIndex]['rates'][
                                cVDTRIndex
                              ]['min_weight']
                            "
                            class="ml-2"
                            style="color: red"
                          >
                            Max weight must be greater than Min weight
                          </div>
                        </div>
                      </div>
                      <div class="field col-12 md:col-6">
                        <h5 class="color-7a7a7a font-size-14 bold-500 required">
                          Units Rate($)
                        </h5>
                        <TextField
                          v-model="
                            details['rates'][zrIndex]['charge_type'][
                              'e_commerce'
                            ]['van']['delivery_type'][cVDTIndex]['rates'][
                              cVDTRIndex
                            ]['unit_rate']
                          "
                          type="number"
                          :classes="{
                            'p-invalid':
                              v$.details['rates'][zrIndex]['charge_type'][
                                'e_commerce'
                              ]['van']['delivery_type'][cVDTIndex]['rates'][
                                cVDTRIndex
                              ]['unit_rate'].$invalid &&
                              $store.state.expressAdhoc.addZonalRatesSubmission,
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
            </span>
            <!--Van Fields : Ends Here-->
          </div>
        </span>
        <!--E-Commerce Rates Fields : Ends Here-->

        <!--Surcharges Fields : Starts Here-->
        <span
          v-if="
            details['rates'][zrIndex]['rates_duo_selection_state'] ==
            'Surcharges'
          "
        >
          <div class="m-3">
            <span class="color-4e5968 font-size-14 bold-600 my-2"
              >Add Surcharges</span
            >
          </div>
          <!--fields row one-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="color-7a7a7a font-size-14 bold-500 required">
                COD Fee ($)
              </h5>
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
                    $store.state.expressAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="color-7a7a7a font-size-14 bold-500 required">
                COD Fee (% of cash collected)
              </h5>
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
                    $store.state.expressAdhoc.addZonalRatesSubmission,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />
            </div>
          </div>
          <!--fields row two-->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="color-7a7a7a font-size-14 bold-500 required">
                Standard Liability ($)
              </h5>
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
                    $store.state.expressAdhoc.addZonalRatesSubmission,
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
            details['rates'][zrIndex]['rates_duo_selection_state'] ==
            'Additional Surcharges'
          "
        >
          <div class="mt-3 mb-5">
            <span class="color-4e5968 font-size-14 bold-600 my-2"
              >Add Surcharges</span
            >
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
                <h5 class="color-7a7a7a font-size-14 bold-500 required">
                  Surcharge Name
                </h5>
                <!-- <TextField
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
                      $store.state.expressAdhoc.addZonalRatesSubmission,
                    'inputfield w-full dialog-field-text ': true,
                  }"
                /> -->
                 <AddNewDropDownTextField
                 type="Surcharge"
                 :optionClose="true"
        stateName="addNewSurchargeName"
        :state="details['rates'][zrIndex]['charge_type'][
                      'additional_surcharges'
                    ][addlSurchargeIndex]['surcharge_name']"
        :data="addNewSurchargeName"
        :placeholder="'Choose a Surcharge Name'"
        storePath="expressContract"
        v-model="details['rates'][zrIndex]['charge_type'][
                      'additional_surcharges'
                    ][addlSurchargeIndex]['surcharge_name']"
        @addNewValue="addNewSurcharge"
        :classes="{
          'p-invalid': v$.details['rates'][zrIndex]['charge_type'][
                      'additional_surcharges'
                    ][addlSurchargeIndex]['surcharge_name'].$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
              </div>
              <div class="field col-12 md:col-6">
                <h5 class="color-7a7a7a font-size-14 bold-500 required">
                  Rate (S$)
                </h5>
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
                      $store.state.expressAdhoc.addZonalRatesSubmission,
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
        v-if="v$.$invalid && $store.state.expressAdhoc.addZonalRatesSubmission"
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
          class="
            p-button-outlined
            mr-1
            dialog-button-text
            previous-btn
            color-357dea
          "
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="expressAdhoc"
          label="Cancel"
          class="color-357dea"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
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
import AccordionTab from "primevue/accordiontab";
import moment from "moment";
import DuoSelection from "../../../DuoSelect.vue";
import axios from "axios";
import {exc_master,ex_state_master} from "../../../../../../../../store/helper"
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  components: { Accordion, AccordionTab, DuoSelection },
  data: () => ({
    v$: useVuelidate(),
    // submitted: false,
    ZoneData: [],

    active: 0,
    activeTwo: 0,

    addZonalRates: ["new_zonal_rate"],

    cloneFieldClicked: 0,

    //Zonal Rates Validation
    rates_validation: [
      {
        zones_ranges: { required },
        charge_type: {
          normal: {
            bike: {
              min_charge_per_job: { required },
            },
            van: {
              van_job_min_cost: { required },
              maximun_weight: { required },
              van_job_additional_cost: { required },
              van_job_additional_weight: { required },
              van_job_urgent_surcharges: { required },
            },
          },
          e_commerce: {
            bike: {
              delivery_type: [
                {
                  delivery_type: { required },
                  collect_time: { required },
                  cut_off_time: { required },
                  cut_off_days_count: { required },
                  delivery_type_initial: { required },
                  rate: { required },
                },
              ],
            },
            van: {
              delivery_type: [
                {
                  delivery_type: { required },
                  collect_time: { required },
                  cut_off_time: { required },
                  cut_off_days_count: { required },
                  delivery_type_initial: { required },

                  rates: [
                    {
                      max_weight: { required },
                      min_weight: { required },
                      unit_rate: { required },
                    },
                  ],
                },
              ],
            },
          },
          surcharges: {
            cod_fee: { required },
            cod_fee_percentage: { required },
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
      //zonal range

      //zonal rate
      rates: [
        {
          zones: [],
          //zone ranges
          zones_ranges: "",

          rates_duo_selection_state: "Normal",

          normal_transport_duo_selection_state: "Bike",
          e_commerce_transport_duo_selection_state: "Bike",
          charge_type: {
            //normal rates
            normal: {
              bike: {
                min_charge_per_job: "",
              },
              van: {
                van_job_min_cost: "",
                maximun_weight: "",
                van_job_additional_cost: "",
                van_job_additional_weight: "",
                van_job_urgent_surcharges: "",
              },
            },

            //e-commerce rates
            e_commerce: {
              bike: {
                delivery_type: [
                  {
                    delivery_type: "",
                    collect_time: "",
                    cut_off_time: "",
                    cut_off_days_count: "",
                    delivery_type_initial: "",

                    rate: "",
                  },
                ],
              },
              van: {
                delivery_type: [
                  {
                    delivery_type: "",
                    collect_time: "",
                    cut_off_time: "",
                    cut_off_days_count: "",
                    delivery_type_initial: "",

                    rates: [
                      {
                        max_weight: "",
                        min_weight: "",
                        unit_rate: "",
                      },
                    ],
                  },
                ],
              },
            },

            //surcharges
            surcharges: {
              cod_fee: "",
              cod_fee_percentage: "",
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
          rates: this.rates_validation,
        },
      };
    }
  },
computed:{
    ...ex_state_master,
  },
  methods: {
    ...exc_master,
    goBackHandler() {
      this.$store.dispatch("expressAdhoc/navigateStepper", {
        step: "AddZone",
      });
    },
    async addNewSurcharge(e){

    },
    async nextStepHandler() {
      // await this.processDataHandler();

      if (this.v$.$invalid) {
        this.$store.dispatch("expressAdhoc/setAddZonalRatesSubmission", {
          bool: true,
        });
      }
      if (!this.v$.$invalid) {
        await this.processDataHandler();
        await this.processTimePickerData();
        this.$store.dispatch("expressAdhoc/navigateStepper", {
          step: "AddEffectiveDates",
        });
      }
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

      processedData["rates"].map((item) => {
        // this.details["rates"].map((item) => {
            item.charge_type.additional_surcharges.map((i)=>{
            let f_data=this.addNewSurchargeName[0].items.find((u)=>u.name==i.surcharge_name?.surcharge_name);
        i["geo_fencing_id"]=f_data.geo_fencing_id;
        i["surcharge_name"]=f_data.surcharge_name;
        return i;
          })
        item.charge_type.e_commerce.bike.delivery_type.map((itm) => {
          itm.cut_off_time = this.timeFormatter(itm.cut_off_time);
          itm.collect_time = this.timeFormatter(itm.collect_time);
        });
        item.charge_type.e_commerce.van.delivery_type.map((itm) => {
          itm.cut_off_time = this.timeFormatter(itm.cut_off_time);
          itm.collect_time = this.timeFormatter(itm.collect_time);
        });
      });
      this.$store.state.expressAdhoc.expressAdhocAddNewData["rates"] =
        processedData["rates"];
    },
    // },
    async getZoneDropdownData() {
      axios
        .get("/settings/sales/rates/express/adhoc/dropdowns/zones")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.ZoneData.push(res.data.results[c]);
            }
          }
        });
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
        zones: [],
        zones_ranges: "",
        rates_duo_selection_state: "Normal",
        normal_transport_duo_selection_state: "Bike",
        e_commerce_transport_duo_selection_state: "Bike",
        charge_type: {
          //normal rates
          normal: {
            bike: {
              min_charge_per_job: "",
            },
            van: {
              van_job_min_cost: "",
              maximun_weight: "",
              van_job_additional_cost: "",
              van_job_additional_weight: "",
              van_job_urgent_surcharges: "",
            },
          },
          //e-commerce rates
          e_commerce: {
            bike: {
              delivery_type: [
                {
                  delivery_type: "",
                  collect_time: "",
                  cut_off_time: "",
                  delivery_type_initial: "",
                  cut_off_days_count: "",
                  rate: "",
                },
              ],
            },
            van: {
              delivery_type: [
                {
                  delivery_type: "",
                  collect_time: "",
                  cut_off_time: "",
                  delivery_type_initial: "",
                  cut_off_days_count: "",
                  rates: [
                    {
                      max_weight: "",
                      min_weight: "",
                      unit_rate: "",
                    },
                  ],
                },
              ],
            },
          },
          //surcharges
          surcharges: {
            cod_fee: "",
            cod_fee_percentage: "",
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
      this.rates_validation.push({
        zones_ranges: { required },
        charge_type: {
          normal: {
            bike: {
              min_charge_per_job: { required },
            },
            van: {
              van_job_min_cost: { required },
              maximun_weight: { required },
              van_job_additional_cost: { required },
              van_job_additional_weight: { required },
              van_job_urgent_surcharges: { required },
            },
          },
          e_commerce: {
            bike: {
              delivery_type: [
                {
                  delivery_type: { required },
                  collect_time: { required },
                  cut_off_time: { required },
                  delivery_type_initial: { required },
                  cut_off_days_count: { required },
                  rate: { required },
                },
              ],
            },
            van: {
              delivery_type: [
                {
                  delivery_type: { required },
                  collect_time: { required },
                  cut_off_time: { required },
                  delivery_type_initial: { required },

                  cut_off_days_count: { required },
                  rates: [
                    {
                      max_weight: { required },
                      min_weight: { required },
                      unit_rate: { required },
                    },
                  ],
                },
              ],
            },
          },
          surcharges: {
            cod_fee: { required },
            cod_fee_percentage: { required },
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
      this.details.rates[
        index
      ].charge_type.e_commerce.bike.delivery_type.splice(1);
      this.details.rates[index].charge_type.e_commerce.van.delivery_type.splice(
        1
      );
      // this.details.rates[index].additional_surcharges.splice(1);
      this.details.rates.splice(index, 1);

      this.rates_validation[
        index
      ].charge_type.e_commerce.bike.delivery_type.splice(1);
      this.rates_validation[
        index
      ].charge_type.e_commerce.van.delivery_type.splice(1);
      // this.rates_validation[index].additional_surcharges.splice(1);
      this.rates_validation.splice(index, 1);

      this.addZonalRates.splice(index, 1);
      this.cloneFieldClicked++;
    },

    //E-Commerce Bike delivery type
    addECommerceBikeDeliveryType(parentIndex) {
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.push({
        delivery_type: "",
        collect_time: "",
        cut_off_time: "",
        delivery_type_initial: "",
        cut_off_days_count: "",
        rate: "",
      });
      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.push({
        // rate: { required },
        // collect_time: { required },
        delivery_type: { required },
        collect_time: { required },
        cut_off_time: { required },
        delivery_type_initial: { required },

        cut_off_days_count: { required },
        rate: { required },
      });
      this.cloneFieldClicked++;
    },
    deleteECommerceBikeDeliveryType(parentIndex, index) {
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.splice(1);
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.splice(index, 1);

      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.splice(1);
      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.bike.delivery_type.splice(index, 1);
      this.cloneFieldClicked++;
    },

    //E-Commerce Van delivery type
    addECommerceVanDeliveryType(parentIndex) {
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.van.delivery_type.push({
        delivery_type: "",
        collect_time: "",
        cut_off_time: "",
        delivery_type_initial: "",
        cut_off_days_count: "",
        rates: [
          {
            max_weight: "",
            min_weight: "",
            unit_rate: "",
          },
        ],
      });
      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.van.delivery_type.push({
        delivery_type: { required },
        collect_time: { required },
        cut_off_time: { required },
        delivery_type_initial: { required },

        cut_off_days_count: { required },
        rates: [
          {
            max_weight: { required },
            min_weight: { required },
            unit_rate: { required },
          },
        ],
      });
      this.cloneFieldClicked++;
    },
    deleteECommerceVanDeliveryType(parentIndex, index) {
      this.details.rates[parentIndex].charge_type.e_commerce.van.delivery_type[
        index
      ].rates.splice(1);
      this.details.rates[
        parentIndex
      ].charge_type.e_commerce.van.delivery_type.splice(index, 1);

      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.van.delivery_type[index].rates.splice(1);
      this.rates_validation[
        parentIndex
      ].charge_type.e_commerce.van.delivery_type.splice(index, 1);
      this.cloneFieldClicked++;
    },

    //E-Commerce Van delivery type rates
    addECommerceVanDeliveryTypeRates(grandParentIndex, parentIndex) {
      this.details.rates[
        grandParentIndex
      ].charge_type.e_commerce.van.delivery_type[parentIndex].rates.push({
        max_weight: "",
        min_weight: "",
        unit_rate: "",
      });
      this.rates_validation[
        grandParentIndex
      ].charge_type.e_commerce.van.delivery_type[parentIndex].rates.push({
        max_weight: { required },
        min_weight: { required },
        unit_rate: { required },
      });
      this.cloneFieldClicked++;
    },
    deleteECommerceVanDeliveryTypeRates(grandParentIndex, parentIndex, index) {
      this.details.rates[
        grandParentIndex
      ].charge_type.e_commerce.van.delivery_type[parentIndex].rates.splice(
        index,
        1
      );
      this.rates_validation[
        grandParentIndex
      ].charge_type.e_commerce.van.delivery_type[parentIndex].rates.splice(
        index,
        1
      );
      this.cloneFieldClicked++;
    },

    //Additional Surcharges
    addAdditionalSurcharges(parentIndex) {
      this.details.rates[parentIndex].charge_type.additional_surcharges.push({
        surcharge_name: "",
        rates: "",
      });
      this.rates_validation[parentIndex].charge_type.additional_surcharges.push(
        {
          surcharge_name: { required },
          rates: { required },
        }
      );
      this.cloneFieldClicked++;
    },
    deleteAdditionalSurcharges(parentIndex, index) {
      this.details.rates[parentIndex].charge_type.additional_surcharges.splice(
        index,
        1
      );
      this.rates_validation[
        parentIndex
      ].charge_type.additional_surcharges.splice(index, 1);
      this.cloneFieldClicked++;
    },
    async zonalRatesDuoTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.expressAdhoc.zonalRatesDuoType[1]
        ]
      ) {
        if (
          this.details["rates"][
            this.$store.state.expressAdhoc.zonalRatesDuoType[1]
          ]["rates_duo_selection_state"]
        ) {
          this.details["rates"][
            this.$store.state.expressAdhoc.zonalRatesDuoType[1]
          ]["rates_duo_selection_state"] =
            this.$store.state.expressAdhoc.zonalRatesDuoType[0];
        }
      }
    },
    async normalRatesTransportTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.expressAdhoc.normalRatesTransportType[1]
        ]
      ) {
        this.details["rates"][
          this.$store.state.expressAdhoc.normalRatesTransportType[1]
        ]["normal_transport_duo_selection_state"] =
          this.$store.state.expressAdhoc.normalRatesTransportType[0];
      }
    },
    async eCommerceRatesTransportTypeHandler() {
      if (
        this.details["rates"][
          this.$store.state.expressAdhoc.eCommerceRatesTransportType[1]
        ]
      ) {
        this.details["rates"][
          this.$store.state.expressAdhoc.eCommerceRatesTransportType[1]
        ]["e_commerce_transport_duo_selection_state"] =
          this.$store.state.expressAdhoc.eCommerceRatesTransportType[0];
      }
    },
  },

  watch: {
    //watch for validation changes
    v$: function () {
      this.$store.dispatch("expressAdhoc/setAddZonalRatesValidation", {
        bool: this.v$,
      });
    },
    //watch for zonal rates type selection
    "$store.state.expressAdhoc.zonalRatesDuoType": async function () {
      await this.zonalRatesDuoTypeHandler();
    },
    //watch for normal rates transport selection
    "$store.state.expressAdhoc.normalRatesTransportType": async function () {
      await this.normalRatesTransportTypeHandler();
    },
    //watch for e-commerce rates transport selection
    "$store.state.expressAdhoc.eCommerceRatesTransportType": async function () {
      await this.eCommerceRatesTransportTypeHandler();
    },
  },
  async created() {
    await this.getZoneDropdownData();
    await this.getSurchargeNames();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

::v-deep .formAccordion .p-accordion-tab .p-accordion-content {
  background: #f4f6f8 !important;
  border: 1px solid #357dea;
}
::v-deep .SubFormAccordion .p-accordion-tab .p-accordion-content {
  background: #e1eaf7 !important;
  border: none;
  // opacity: 0.1;
}
::v-deep .bikeVanDuoSelect .p-selectbutton .p-button {
  border: 1px solid #357dea !important;
  // border-radius: 4px;
  background: none;
  color: #7a7a7a !important;
  font-weight: 600;
  font-size: 14px !important;
}
::v-deep .p-selectbutton .p-button {
  border: 1px solid #e7e7e7 !important;
  border-radius: 4px;
  background: none;
  color: #7e84a7 !important;
  font-weight: 600;
  font-size: 14px !important;
}
::v-deep .p-selectbutton .p-button.p-highlight {
  font-weight: 600;
  font-size: 14px !important;
  color: #ffffff !important;
  background: #357dea !important;
}
</style>
