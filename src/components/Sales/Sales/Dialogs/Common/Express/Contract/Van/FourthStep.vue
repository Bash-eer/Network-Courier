<template>
  <div class="mt-6">
    <div class="flex flex-row align-items-center">
    <div v-for="category of base_data" :key="category.key" class="p-field-radiobutton flex mr-3">
            <RadioButton  name="category" :value="category.name" v-model="select_type" @change="setTypeChange($event, category.name)" />
            <label class="p-accordion-header-text mt-1 ml-2" :for="category.key">{{category.name}}</label>
        </div>
        </div>
    <!-- <RadioButtons
      label="platform"
      labelClass="p-accordion-header-text"
      v-bind:radioButtonData="base_data"
      v-model="select_type"
      @update:modelValue="setTypeChange"
    /> -->
    <Accordion :activeIndex="0" class="mt-3">
      <AccordionTab
        v-if="select_type === 'Normal (Monthly Minimum)'"
        header="Normal (Monthly Minimum)"
      >
       
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required color-7a7a7a font-size-14 bold-500"
              >No. of Units ($)</label
            >
            <TextField
              label="no_of_units"
              type="number"
              v-model="details.no_of_units"
              @update:modelValue="onChangeUnit"
              :classes="{
                'p-invalid': v$.details?.no_of_units?.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 bold-500">Job $</h5>
            <TextField
              label="adjustment_jobs"
              type="number"
              v-model="details.adjustment_jobs"
              :classes="{
                'p-invalid': v$.details?.adjustment_jobs?.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label class="required color-7a7a7a font-size-14 bold-500"
              >Amount
            </label>
            <TextField
              label="adjustment_amount"
              type="number"
              v-model="details.adjustment_amount"
              :classes="{
                'p-invalid':
                  v$.details?.adjustment_amount?.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-4">
            <label class="required color-7a7a7a font-size-14 bold-500"
              >Additional Job $
            </label>
            <TextField
              label="additional_job"
              type="number"
              v-model="details.additional_job"
              :classes="{
                'p-invalid': v$.details?.additional_job?.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <h5 class="required color-7a7a7a font-size-14 bold-500">
              Van Urgent Surcharge $
            </h5>
            <TextField
              label="van_urgent_surcharge"
              type="number"
              v-model="details.van_urgent_surcharge"
              :classes="{
                'p-invalid':
                  v$.details?.van_urgent_surcharge?.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
        <div class="flex flex-row align-items-center">
         <div v-for="category of base_data_tier" :key="category.key" class="p-field-radiobutton flex mr-3">
            <RadioButton  name="category" :value="category.name" v-model="select_tire" @change="setTierChange($event, category.name)" />
            <label class="p-accordion-header-text mt-1 ml-2" :for="category.key">{{category.name}}</label>
        </div>
        </div>
        <!-- <RadioButtons
          label="platform"
          labelClass="p-accordion-header-text"
          state="radioButtonCompany"
          v-bind:radioButtonData="base_data_tier"
          v-model="select_tire"
          @update:modelValue="setTierChange(e)"
        /> -->
        <Accordion class="mt-6">
          <AccordionTab v-if="select_tire === '2 tier'" header="2 tier">
            <div class="dropDownField">
              <div
                class="
                  flex flex-row
                  justify-content-between
                  align-items-center
                  my-2
                  ml-2
                "
              >
                <!-- <RadioButtons
                  label="platform"
                  labelClass="p-accordion-header-text"
                  state="radioButtonCompany"
                  v-bind:radioButtonData="Two_tier_button_data"
                  v-model="select_tire_cat"
                  @update:modelValue="setTierNCharges"
                /> -->
                <div class="flex flex-row align-items-center">
                 <div v-for="category of Two_tier_button_data" :key="category.key" class="p-field-radiobutton flex mr-3">
            <RadioButton  name="category" :value="category.name" v-model="select_tire_cat" @change="setTierNCharges($event, category.name)" />
            <label class="p-accordion-header-textn mt-1 ml-2" :for="category.key">{{category.name}}</label>
        </div>
        </div>
              </div>

              <!-- Need to add radio button functionality to enable v-if -->
              <!-- <div v-if="selectedCategory == ''"> -->
              <div v-if="select_tire_cat === 'Charge by weight'">
                <div class="formgrid grid flex my-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Maximum Weight (kg)</label
                    >
                    <TextField
                      label="maximum_weight"
                      type="number"
                      v-model="details.maximum_weight"
                      :classes="{
                        // 'p-invalid':v$.details.maximum_weight.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="col-12 md:col-4">
                    <h5 class="bold-500 font-size-14 color-7a7a7a">
                      Van Job Addl. Weight (kg)
                    </h5>
                    <TextField
                      label="van_job_addl_weight"
                      type="number"
                      v-model="details.van_job_addl_weight"
                      :classes="{
                        // 'p-invalid':v$.details.van_job_addl_weight.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Add. Cost $</label
                    >
                    <TextField
                      label="van_job_add_cost2"
                      type="number"
                      v-model="details.van_job_add_cost2"
                      :classes="{
                        // 'p-invalid':v$.details.van_job_add_cost2.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div>
                <!-- <hr />
                <div class="formgrid grid mt-3">
                  <div :key="renderKey" class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Urgent Surcharge $</label
                    >
                    <TextField
                      :key="renderKey"
                      label="van_job_urgent_surcharge"
                      type="number"
                      v-model="details.van_job_urgent_surcharge"
                      :classes="{
                        // 'p-invalid':v$.details.van_job_urgent_surcharge.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div> -->
              </div>
            </div>
            <!-- </div> -->

            <!-- <div v-if="selectedCategory == ''"> -->
            <div v-if="select_tire_cat === 'Charge by Quantity'">
            <div class="flex flex-row align-items-center">
             <div v-for="category of qty_data" :key="category.key" class="p-field-radiobutton flex mr-3">
            <RadioButton  name="category" :value="category.name" v-model="select_tire_cat_charge" @change="setChargeQty($event, category.name)" />
            <label class="p-accordion-header-text mt-1 ml-2" :for="category.key">{{category.name}}</label>
        </div>
        </div>
              <!-- <RadioButtons
                label="platform"
                labelClass="p-accordion-header-text"
                state="radioButtonCompany"
                v-bind:radioButtonData="qty_data"
                v-model="select_tire_cat_charge"
                @update:modelValue="setChargeQty"
              /> -->
              <!-- <div>
            <h5 class="bold-700 font-size-14 color-343434 mt-4">Charges</h5>
          </div> -->
              <div v-if="select_tire_cat_charge === 'Charges'">
                <div class="formgrid grid mt-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Maximum Quantity</label
                    >
                    <TextField
                      label="cbq_maximum_quantity"
                      type="number"
                      v-model="details.cbq_maximum_quantity"
                      :classes="{
                        // 'p-invalid':v$.details.cbq_maximum_quantity.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div>
                <div class="formgrid grid flex my-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Add. Quantity</label
                    >
                    <TextField
                      label="cbq_van_job_add_quantity"
                      type="number"
                      v-model="details.cbq_van_job_add_quantity"
                      :classes="{
                        // 'p-invalid':v$.details.cbq_van_job_add_quantity.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Add. Cost $</label
                    >
                    <TextField
                      label="cbq_van_job_add_cost"
                      type="number"
                      v-model="details.cbq_van_job_add_cost"
                      :classes="{
                        // 'p-invalid':v$.details.cbq_van_job_add_cost.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <!-- <div class="col-12 md:col-4">
                    <h5 class="bold-500 font-size-14 color-7a7a7a">
                      Van Job Urgent. Surcharge $
                    </h5>
                    <TextField
                      label="cbq_van_job_urgent_surcharge"
                      type="number"
                      v-model="details.cbq_van_job_urgent_surcharge"
                      :classes="{
                        // 'p-invalid':v$.details.cbq_van_job_urgent_surcharge.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div> -->
                </div>
              </div>
              <!-- <div class="formgrid grid mt-3">
            <span class="col-12 md:col-4"><hr /></span>
            <span class="bold-500 font-size-12 color-4e5868 m-2">OR</span>
            <span class="col-12 md:col-4"><hr /></span>
          </div> -->
              <!-- <div>
            <h5 class="bold-700 font-size-14 color-343434 mt-4">
              Box Count Charges
            </h5>
          </div> -->
              <div v-if="select_tire_cat_charge === 'Box Count Charges'">
                <div
                  class="field col-12 md:col-6 ml-0 pl-0 my-0 py-0"
                  v-for="(item, index) of details.box_under"
                  :key="index"
                >
                  <div class="formgrid grid ml-0 pl-0 align-items-center">
                    <div class="field col-12 md:col-3 ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Boxes under
                      </h5>
                      <TextField
                        label="no_of_boxes1"
                        type="number"
                        v-model="item.boxe_under1"
                        :classes="{
                          'p-invalid':
                            v$.details.box_under[index]?.boxe_under1
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-3 mt-5">
                      <TextField
                        label="no_of_boxes2"
                        type="number"
                        v-model="item.boxe_under2"
                        :classes="{
                          'p-invalid':
                            v$.details.box_under[index]?.boxe_under2
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-6 flex-none ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Rate ($)
                      </h5>
                      <div class="p-inputgroup">
                        <TextField
                          label="cbq_boxes_under_rate"
                          type="number"
                          v-model="item.boxe_under_rate"
                          :classes="{
                            'p-invalid':
                              v$.details.box_under[index]?.boxe_under_rate
                                ?.$invalid && submitted,
                            'inputfield w-full dialog-field-text py-2': true,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex mb-2">
                  <span
                    class="color-357dea font-size-14 bold-600 mt-0"
                    @click="addNormalBox"
                    ><b>+ Add Rates</b></span
                  >
                </div>
                <!-- <hr />
                <div class="formgrid grid mt-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Urgent</label
                    >
                    <TextField
                      label="cbq_van_job_urgent"
                      type="number"
                      v-model="details.cbq_van_job_urgent"
                      :classes="{
                        // 'p-invalid':v$.details.cbq_van_job_urgent.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div> -->
              </div>
            </div>

            <!-- </div> -->
          </AccordionTab>
          <AccordionTab v-if="select_tire === 'Multi tier'" header="Multi tier">
            <div class="dropDownField">
              <div
                class="
                  flex flex-row
                  justify-content-between
                  align-items-center
                  my-4
                  ml-2
                "
              >
              <div class="flex flex-row align-items-center">
              <div v-for="category of Multi_tier_button_data" :key="category.key" class="p-field-radiobutton flex mr-3">
            <RadioButton  name="category" :value="category.name" v-model="select_multi_tire_cat" @change="setMultiCharge($event, category.name)" />
            <label class="p-accordion-header-text mt-1 ml-2" :for="category.key">{{category.name}}</label>
        </div>
        </div>
                <!-- <RadioButtons
                  label="platform"
                  labelClass="p-accordion-header-text"
                  state="radioButtonCompany"
                  v-bind:radioButtonData="Multi_tier_button_data"
                  v-model="select_multi_tire_cat"
                  @update:modelValue="setMultiCharge"
                /> -->
              </div>

              <!-- Quantity -->
              <div v-if="select_multi_tire_cat === 'Quantity'">
                <h5 class="bold-600 font-size-14 color-343434 mt-3 mb-1">
                  Multi-Tier Charges
                </h5>
                <div
                  class="field col-12 md:col-6 ml-0 pl-0 my-0 py-0"
                  v-for="(item, index) of details.multi_box"
                  :key="index"
                >
                  <div class="formgrid grid ml-0 pl-0 align-items-center">
                    <div class="field col-12 md:col-3 ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        No of Boxes
                      </h5>
                      <TextField
                        label="no_of_boxes1"
                        type="number"
                        v-model="item.no_of_boxes1"
                        :classes="{
                          'p-invalid':
                            v$.details.multi_box[index]?.no_of_boxes1
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-3 mt-5">
                      <TextField
                        label="no_of_boxes2"
                        type="number"
                        v-model="item.no_of_boxes2"
                        :classes="{
                          'p-invalid':
                            v$.details.multi_box[index]?.no_of_boxes2
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-6 flex-none ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Rate ($)
                      </h5>
                      <div class="p-inputgroup">
                        <TextField
                          label="no_of_boxes_rate"
                          type="number"
                          v-model="item.no_of_boxes_rate"
                          :classes="{
                            'p-invalid':
                              v$.details.multi_box[index]?.no_of_boxes_rate
                                ?.$invalid && submitted,
                            'inputfield w-full dialog-field-text py-2': true,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex mb-2">
                  <span
                    class="color-357dea font-size-14 bold-600 mt-0"
                    @click="addMultiQty"
                    ><b>+ Add Rates</b></span
                  >
                </div>
                <!-- <hr />
                <div class="formgrid grid mt-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Urgent. Surcharge $</label
                    >
                    <TextField
                      label="van_job_urgent_surcharge"
                      type="number"
                      v-model="details.van_job_urgent_surcharge2"
                      :classes="{
                        // 'p-invalid':v$.details.van_job_urgent_surcharge.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div> -->
              </div>
              <!-- Job count -->
              <div v-if="select_multi_tire_cat === 'Job Count'">
                <h5 class="bold-600 font-size-14 color-343434 mt-3 mb-1">
                  Multi-Tier Charges
                </h5>
                <div
                  class="field col-12 md:col-6 ml-0 pl-0 my-0 py-0"
                  v-for="(item, index) of details.multi_job"
                  :key="index"
                >
                  <div class="formgrid grid ml-0 pl-0 align-items-center">
                    <div class="field col-12 md:col-3 ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        No of jobs
                      </h5>
                      <TextField
                        label="jc_no_of_jobs1"
                        type="number"
                        v-model="item.jc_no_of_jobs1"
                        :classes="{
                          'p-invalid':
                            v$.details.multi_job[index]?.jc_no_of_jobs1
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                      <!-- <NumberField
                    v-model="details.jc_no_of_jobs1"
                    :showButtons="true"
                    mode="number"
                    :classes="{
                      'p-invalid':
                        v$.details.jc_no_of_jobs1.$invalid && submitted,
                      'inputfield w-full dialog-field-text': true,
                    }"
                  /> -->
                    </div>
                    <div class="field col-12 md:col-3 mt-5">
                      <TextField
                        label="jc_no_of_jobs2"
                        type="number"
                        v-model="item.jc_no_of_jobs2"
                        :classes="{
                          'p-invalid':
                            v$.details.multi_job[index]?.jc_no_of_jobs2
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                      <!-- <NumberField
                    v-model="details.jc_no_of_jobs2"
                    :showButtons="true"
                    mode="number"
                    :classes="{
                      'p-invalid':
                        v$.details.jc_no_of_jobs2.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  /> -->
                    </div>
                    <div class="field col-12 md:col-6 flex-none ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Rate ($)
                      </h5>
                      <div class="p-inputgroup">
                        <TextField
                          label="jc_no_of_jobs_rate1"
                          type="number"
                          v-model="item.jc_no_of_jobs_rate1"
                          :classes="{
                            'p-invalid':
                              v$.details.multi_job[index]?.jc_no_of_jobs_rate1
                                ?.$invalid && submitted,
                            'inputfield w-full dialog-field-text py-2': true,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex mb-2">
                  <span
                    class="color-357dea font-size-14 bold-600 mt-0"
                    @click="addMultiJob"
                    ><b>+ Add Rates</b></span
                  >
                </div>
                <!-- <hr />
                <div class="formgrid grid mt-3">
                  <div class="col-12 md:col-4">
                    <label class="bold-500 font-size-14 color-7a7a7a"
                      >Van Job Urgent. Surcharge $</label
                    >
                    <TextField
                      label="jc_van_job_urgent_surcharge"
                      type="number"
                      v-model="details.jc_van_job_urgent_surcharge"
                      :classes="{
                        // 'p-invalid':v$.details.jc_van_job_urgent_surcharge.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </AccordionTab>
        </Accordion>
        <!-- <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add Contact </b></span>
      </div> -->
      </AccordionTab>
      <!-- Method  -->
      <AccordionTab :key="addScaleClicked"  v-if="select_type === 'E-commerce'" header="E-commerce">
        <h5 class="required bold-500 font-size-14 color-7a7a7a mb-3">
          Select Rate
        </h5>
        <div :key="addScaleClicked" class="field justify-content-center mx-3 mr-3">
          <DropDownField
          :key="addScaleClicked"
        :value="details.rate_type"
         code="key"
            :data="rate_type"
            label="rate_type"
            v-model="details.rate_type"
            @update:modelValue="selectRate"
            :class="{
              'p-invalid': v$.details.rate_type?.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text': true,
            }"
      />
          <!-- <DropDown
            code="key"
            :data="rate_type"
            label="rate_type"
            v-model="details.rate_type"
            @update:modelValue="selectRate"
            :class="{
              'p-invalid': v$.details.rate_type?.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text': true,
            }"
          /> -->
        </div>
        <Accordion v-if="rate_type_header!==''" :activeIndex="0">
          <AccordionTab :header="rate_type_header">
            <div class="flex mt-2 mb-4">
              <div class="flex flex-row acknowledgement-check">
                <div
                  class="flex flex-row acknowledgement-row"
                  v-for="(item, index) of checkbox_data"
                  :key="index"
                >
                  <Checkbox
                    v-model="item.value"
                    :binary="true"
                    @change="addRemoveDelivery($event, item)"
                  />
                  <span class="p-accordion-header-text ml-2">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
            <DuoSelection
              class="mb-4"
              :options="delivery_data"
              :default="defaultTransportType"
              v-model="defaultTransportType"
            />
            <div v-for="(i, index) of details.e_commerce" :key="index">
              <div v-if="defaultTransportType == i.name">
                <div class="formgrid grid">
                  <div class="field col-12 md:col-4">
                    <label class="required color-7a7a7a font-size-14 bold-500"
                      >No. of Units ($)</label
                    >
                    <TextField
                      label="no_of_units"
                      type="number"
                      v-model="i.no_of_units"
                      @update:modelValue="onChangeEUnit($event, index)"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.no_of_units?.$invalid &&
                          submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-4">
                    <h5 class="required color-7a7a7a font-size-14 bold-500">
                      Job $
                    </h5>
                    <TextField
                      label="adjustment_jobs"
                      type="number"
                      v-model="i.adjustment_jobs"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.adjustment_jobs
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-4">
                    <label class="required color-7a7a7a font-size-14 bold-500"
                      >Amount
                    </label>
                    <TextField
                      label="adjustment_amount"
                      type="number"
                      v-model="i.adjustment_amount"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.adjustment_amount
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-4">
                    <label class="required color-7a7a7a font-size-14 bold-500"
                      >Additional Job $
                    </label>
                    <TextField
                      label="additional_job"
                      type="number"
                      v-model="i.additional_job"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.additional_job
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-4">
                    <h5 class="required color-7a7a7a font-size-14 bold-500">
                      Standard Liability $
                    </h5>
                    <TextField
                      label="standard_liability"
                      type="number"
                      v-model="i.standard_liability"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.standard_liability
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-4">
                    <h5 class="required color-7a7a7a font-size-14 bold-500">
                      Timeslot Delivery (Fixed 2 hours)
                    </h5>
                    <TextField
                      label="timeslot_delivery"
                      type="number"
                      v-model="i.timeslot_delivery"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.timeslot_delivery
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div>
                <div class="formgrid grid">
                  <div class="field col-12 md:col-4">
                    <label class="required color-7a7a7a font-size-14 bold-500"
                      >Cut Off Time $
                    </label>
                    <TextField
                      label="cut_off_time"
                      type="text"
                      v-model="i.cut_off_time"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.cut_off_time
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                  <div class="field col-12 md:col-4">
                    <h5 class="required color-7a7a7a font-size-14 bold-500">
                      Cut Off Days Count
                    </h5>
                    <TextField
                      label="cut_off_days_count"
                      type="number"
                      v-model="i.cut_off_days_count"
                      :classes="{
                        'p-invalid':
                          v$.details.e_commerce[index]?.cut_off_days_count
                            ?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }"
                    />
                  </div>
                </div>
                <DuoSelection
                  class="mb-4"
                  :options="['Charge by Weight', 'Charge by Quantity']"
                  :default="i.transportType"
                  v-model="i.transportType"
                />
                <div v-if="i.transportType == 'Charge by Weight'">
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-4">
                      <label class="color-7a7a7a font-size-14 bold-500"
                        >Maximum Weight (kg)</label
                      >
                      <TextField
                        label="maximum_quantity"
                        type="number"
                        v-model="i.maximum_weight"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.maximum_quantity.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-4">
                      <h5 class="color-7a7a7a font-size-14 bold-500">
                        Van Job Add. Weight (kg)
                      </h5>
                      <TextField
                        label="van_job_add_quantity"
                        type="number"
                        v-model="i.van_job_addl_weight"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.van_job_add_quantity.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-4">
                      <label class="color-7a7a7a font-size-14 bold-500"
                        >Van Job Add. Cost $
                      </label>
                      <TextField
                        label="van_job_add_cost"
                        type="number"
                        v-model="i.van_job_add_cost1"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.van_job_add_cost.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="i.transportType == 'Charge by Quantity'">
                  <div class="formgrid grid">
                    <div class="field col-12 md:col-4">
                      <label class="color-7a7a7a font-size-14 bold-500"
                        >Maximum Quantity</label
                      >
                      <TextField
                        label="maximum_quantity"
                        type="number"
                        v-model="i.maximum_qty"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.maximum_quantity.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-4">
                      <h5 class="color-7a7a7a font-size-14 bold-500">
                        Van Job Add. Quantity
                      </h5>
                      <TextField
                        label="van_job_add_quantity"
                        type="number"
                        v-model="i.van_job_addl_qty"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.van_job_add_quantity.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-4">
                      <label class="color-7a7a7a font-size-14 bold-500"
                        >Van Job Add. Cost $
                      </label>
                      <TextField
                        label="van_job_add_cost"
                        type="number"
                        v-model="i.van_job_add_cost2"
                        :classes="{
                          // 'p-invalid':
                          //   v$.details.van_job_add_cost.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                  </div>
                  <div class="box-count-charges">
                    <label>Box Count Charges</label>
                  </div>
                  <div
                    class="formgrid grid"
                    v-for="(e, idx) of i.box_under"
                    :key="idx"
                  >
                    <div class="field col-12 md:col-3 ml-0 pl-0 mt-2">
                      <h5 class="color-7a7a7a font-size-14 bold-500 required">
                        Boxes under
                      </h5>
                      <TextField
                        label="boxes_under_one"
                        type="number"
                        v-model="e.under1"
                        :classes="{
                          'p-invalid':
                            v$.details.e_commerce[index]?.box_under[idx]?.under1
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <div class="field col-12 md:col-3 mt-5">
                      <TextField
                        label="boxes_under_one"
                        type="number"
                        v-model="e.under2"
                        :classes="{
                          'p-invalid':
                            v$.details.e_commerce[index]?.box_under[idx]?.under2
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                    <!-- <div class="field col-12 md:col-4">
                      <label class="required color-7a7a7a font-size-14 bold-500"
                        >Boxes under
                      </label>
                      <TextField
                        label="boxes_under_one"
                        type="number"
                        v-model="e.under"
                        :classes="{
                          'p-invalid':
                            v$.details.e_commerce[index]?.box_under[idx]?.under
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div> -->
                    <div class="field col-12 md:col-4">
                      <h5 class="required color-7a7a7a font-size-14 bold-500">
                        Rate ($)
                      </h5>
                      <TextField
                        label="rate_one"
                        type="number"
                        v-model="e.rate"
                        :classes="{
                          'p-invalid':
                            v$.details.e_commerce[index]?.box_under[idx]?.rate
                              ?.$invalid && submitted,
                          'inputfield w-full dialog-field-text py-2': true,
                        }"
                      />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <span class="new-field mt-0" @click="eBoxUnder(index)"
                      ><b>+ Add Rate </b></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </AccordionTab>
    </Accordion>
    <p class="billing-setting-heading">Billing settings</p>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="required color-7a7a7a font-size-14 bold-500"
          >Credit Limit $ *</label
        >
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
        <h5 class="required color-7a7a7a font-size-14 bold-500">
          Credit Terms (Days)
        </h5>
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
        <h5 class="required color-7a7a7a font-size-14 bold-500">
          Billing Cycle
        </h5>
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
    <div class="row pl-1 ml-1">
      <div class="col-3" v-for="(item, index) of surcharges_data" :key="index">
        <div class="flex flex-row align-items-center">
          <div class="flex">
            <Checkbox v-model="item.value" :binary="true" />
          </div>
          <div class="flex check-text align-items-center">
            <label
              class="color-7a7a7a font-size-14 bold-500 urgent_charges ml-2"
              >{{ item?.surcharge_name ?? "" }}</label
            >
            <TextField
              label="credit_terms"
              type="number"
              v-model="item.rates"
              :classes="{
                // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <p class="ml-2 mt-3 head">Trip Charges</p>
    <div class="row pl-1 ml-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox
              v-model="details.weekend_2nd_trip_charge"
              :binary="true"
            />
          </div>
          <div class="flex check-text ml-2">
            <label class="color-7a7a7a font-size-14 bold-500"
              >Weekday 2nd Trip Charge</label
            >
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox
              v-model="details.saturday_2nd_trip_charge"
              :binary="true"
            />
          </div>
          <div class="flex check-text ml-2">
            <label class="color-7a7a7a font-size-14 bold-500"
              >Saturday 2nd Trip Charge</label
            >
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox v-model="details.return_trip_charge" :binary="true" />
            <div class="flex check-text ml-2">
              <label class="color-7a7a7a font-size-14 bold-500"
                >Return Trip Charge</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox
              v-model="details.return_trip_partial_charge"
              :binary="true"
            />
          </div>
          <div class="flex check-text ml-2">
            <label class="color-7a7a7a font-size-14 bold-500"
              >Return Trip Partial Charge</label
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row pl-1 ml-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox v-model="details.collection_trip_charge" :binary="true" />
          </div>
          <div class="flex check-text ml-2">
            <label class="color-7a7a7a font-size-14 bold-500"
              >Collection Trip Charge</label
            >
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="flex flex-row">
          <div class="flex">
            <Checkbox v-model="details.FTZ" :binary="true" />
          </div>
          <div class="flex check-text ml-2">
            <label class="color-7a7a7a font-size-14 bold-500 urgent_charges"
              >Special Urgent Charges $</label
            >
            <TextField
              label="credit_terms"
              type="number"
              v-model="details.spc_urgent_charges"
              :classes="{
                // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
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
        <label class="required color-7a7a7a font-size-14 bold-500"
          >Min Charge per Job ($)
        </label>
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
    <!-- <div class="mt-3">
      <span class="step-text">Effective Date</span>
    </div> -->
    <!--fields row one-->
    <!-- <div class="formgird grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a font-size-14 bold-500">
          Effective Start Date
        </h5>
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
    </div> -->

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
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text color-357dea ml-3"
        />
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <CancelButton storePath="salesQuotationDialog" @click="closeDialog" />
          <Buttons
            label="Next"
            button_class="dialog-button-text"
            v-on:childToParent="submitData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DuoSelection from "../../../DuoSelect.vue";
import Checkbox from "primevue/checkbox";
import { mapActions, mapState } from "vuex";
import moment from "moment";
import RadioButton from "primevue/radiobutton";
// import RadioButton from "primevue/radiobutton";

export default {
  name: "SalesExpressContractVanFourthStep",
  data: () => ({
    defaultTransportType: "Same Night Delivery",
    ecommerceTransportType: "Charge by Weight",
    v$: useVuelidate(),
    renderKey: 1,
    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    addScaleClicked: 1,
    select_type: "",
    select_tire: "",
    select_tire_cat: "",
    select_tire_cat_charge: "",
    select_multi_tire_cat: "",
    validation_details: {},
    box_valid: [],
    multi_qty_valid: [],
    multi_job_valid: [],
    e_commerce_valid: [],
    delivery_data: [],
    delivery_type: "",
    rate_type_header: "",
    select_rate_id: "",
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

      // 2 tier
      maximum_weight: "",
      van_job_addl_weight: "",
      van_job_add_cost2: "",
      van_job_urgent_surcharge: "",
      //2 tier cbq

      box_under: [],
      cbq_maximum_quantity: "",
      cbq_van_job_add_quantity: "",
      cbq_van_job_add_cost: "",
      cbq_van_job_urgent_surcharge: "",
      cbq_boxes_under: "",
      cbq_boxes_under_rate: "",
      cbq_boxes_under2: "",
      cbq_boxes_under_rate2: "",
      cbq_van_job_urgent: "",

      // multi-tier
      van_job_urgent_surcharge2: "",
      multi_box: [],
      e_commerce: [],
      // no_of_boxes_rate: "",
      // no_of_boxes1: "",
      // no_of_boxes2: "",
      // no_of_boxes_rate2: "",
      // no_of_boxes3: "",
      // no_of_boxes4: "",
      //multi-tier job count
      multi_job: [],
      // jc_no_of_jobs_rate1: "",
      // jc_no_of_jobs_rate2: "",
      // jc_no_of_jobs1: "",
      // jc_no_of_jobs2: "",
      // jc_no_of_jobs3: "",
      // jc_no_of_jobs4: "",
      jc_van_job_urgent_surcharge: "",

      //
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
      spc_urgent_charges: "",
    },
    base_data: [
      { name: "Normal (Monthly Minimum)", key: "CU" },
      { name: "E-commerce", key: "IU" },
    ],
    base_data_tier: [
      { name: "2 tier", key: "CU" },
      { name: "Multi tier", key: "IU" },
    ],
    Two_tier_button_data: [
      { name: "Charge by weight", key: "CU" },
      { name: "Charge by Quantity", key: "IU" },
    ],
    Two_tier_charge_data: [
      { name: "Charge by weight", key: "CU" },
      { name: "Charge by Quantity", key: "IU" },
    ],
    qty_data: [
      { name: "Charges", key: "CU" },
      { name: "Box Count Charges", key: "IU" },
    ],
    Multi_tier_button_data: [
      { name: "Quantity", key: "CU" },
      { name: "Job Count", key: "IU" },
    ],
    rate_type: [],
    checkbox_data: [],
    surcharges_data: [],
    submitted: false,
  }),
  validations() {
    if (this.addScaleClicked > -1) {
      return {
        details: {
          ...this.validation_details,
          // rate_type: { required },
          // no_of_units: { required },
          // adjustment_jobs: { required },
          // adjustment_amount: { required },
          // additional_job: { required },
          // van_urgent_surcharge: { required },
          // Methods
          e_commerce: this.e_commerce_valid,
          // standard_liability: { required },
          // timeslot_delivery: { required },
          // cut_off_time: { required },
          // cut_off_days_count: { required },
          // maximum_quantity: { required },
          // Trips
          min_charge: { required },
          // van_job_add_quantity: { required },
          // van_job_add_cost: { required },
          // boxes_under_one: { required },
          // rate_one: { required },
          // boxes_under_two: { required },
          // rate_two: { required },
          credit_limits: { required },
          credit_terms: { required },
          billing_cycle: { required },
          //2 tier cbq
          box_under: this.box_valid,
          // cbq_boxes_under: { required },
          // cbq_boxes_under_rate: { required },
          // cbq_boxes_under2: { required },
          // cbq_boxes_under_rate2: { required },
          // multi-tier
          multi_box: this.multi_qty_valid,
          // no_of_boxes_rate: { required },
          // no_of_boxes1: { required },
          // no_of_boxes2: { required },
          // no_of_boxes_rate2: { required },
          // no_of_boxes3: { required },
          // no_of_boxes4: { required },
          //multi-tier job count
          multi_job: this.multi_job_valid,
          // jc_no_of_jobs_rate1: { required },
          // jc_no_of_jobs_rate2: { required },
          // jc_no_of_jobs1: { required },
          // jc_no_of_jobs2: { required },
          // jc_no_of_jobs3: { required },
          // jc_no_of_jobs4: { required },
        },
      };
    }
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesExpressContractVan.payloadPost,
      quotationData: (state) => state.salesExpressContractVan.OverviewData,
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      normalVanUrgent: "salesExpressContractVan/normalVanUrgent",
      getJobByUnit: "salesExpressContractVan/getJobByUnit",
      multiQty: "salesExpressContractVan/multiQty",
      multiJob: "salesExpressContractVan/multiJob",
      getRatesData: "salesExpressContractBikeProjectJobs/getRatesData",
      deliverTypes: "salesExpressContractVan/deliverTypes",
      getECommerceByUnit: "salesExpressContractVan/getECommerceByUnit",
      getSurcharges: "salesExpressContractVan/getSurcharges",
      setPostData: "salesExpressContractVan/setPayloadPostData",
      getTwoBoxQty: "salesExpressContractVan/getTwoBoxQty",
    }),
    goBackHandler() {
      this.$store.state.salesExpressContractVan.vanStep--
      this.$store.dispatch("salesExpressContractVan/navigateStepper", {
        step: "SalesExpressContractVanThirdStep",
      });
    },
     closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    async normalVanUrgentValue() {
      const res = await this.normalVanUrgent(
        this.finalData?.quotation?.rate_card_id
      );
      if (res) {
        this.details.van_urgent_surcharge =
          res.data.results.van_job_urgent_surcharges.toString();
        this.renderKey++;
      }
    },
    async onChangeUnit(e) {
      let payload = {
        units: e,
      };
      const res = await this.getJobByUnit({
        id: this.finalData?.quotation?.rate_card_id,
        payload: payload,
      });
      this.details.adjustment_jobs = res.data.results.jobs;
      this.details.adjustment_amount =
        this.details.adjustment_jobs * parseInt(e);
    },
    async getRates(id) {
      let res = await this.getRatesData(id);

      res.data.results.map((i) => {
        this.rate_type.push({
          name: i.rate_card_name,
          key: i.id,
        });
      });
    },
    async setTypeChange(l,e) {
      if (e === "Normal (Monthly Minimum)") {
this.normalVanUrgentValue();
 this.validation_details = {
          no_of_units: { required },
          adjustment_jobs: { required },
          adjustment_amount: { required },
          additional_job: { required },
          van_urgent_surcharge: { required },
        };
        
       
        this.e_commerce_valid = [];
      } else {
        this.getRates(this.finalData?.quotation?.region_id);
        this.validation_details = {
          rate_type: { required },
        };
        this.multi_job_valid = [];
        this.multi_qty_valid = [];
        this.box_valid = [];
      }
    },
    addNormalBox() {
      this.details.box_under.push({
        boxe_under1: "",
        boxe_under2: "",
        boxe_under_rate: "",
      });
      this.box_valid.push({
        boxe_under1: { required },
        boxe_under2: { required },
        boxe_under_rate: { required },
      });
      this.addScaleClicked++;
    },
    setTierChange(l,e) {
      if (e === "Multi tier") {
         this.details.box_under = [];
        this.box_valid = [];
        this.select_tire_cat_charge = "";
      } 
    },
    setTierNCharges(l,e) {
      if (e === "Charge by weight") {
        this.details.box_under = [];
        this.box_valid = [];
        this.select_tire_cat_charge = "";
      }
    },
   async twoTierBoxQty(){
let res = await this.getTwoBoxQty(this.finalData?.quotation?.rate_card_id)
if(res){
  let data=res.data.results?.normal_charge_services[0]?.van_2_tire_rates_charge_by_quantity[0];
 this.details.cbq_van_job_add_cost=data.van_job_add_cost
 this.details.cbq_van_job_add_quantity=data.van_job_add_quantity
 this.details.cbq_maximum_quantity=data.maximum_quantity
}
    },
    setChargeQty(l,e) {
      if (e === "Box Count Charges") {
        this.details.box_under.push({
          boxe_under1: "",
          boxe_under2: "",
          boxe_under_rate: "",
        });
        this.box_valid.push({
          boxe_under1: { required },
          boxe_under2: { required },
          boxe_under_rate: { required },
        });
        this.addScaleClicked++;
      } else {
        this.twoTierBoxQty()
        this.details.box_under = [];
        this.box_valid = [];
      }
    },
    async setMultiCharge(l,e) {
      if (e === "Quantity") {
        const res = await this.multiQty(
          this.finalData?.quotation?.rate_card_id
        );
        res.data.results.map((i) => {
          this.details.multi_box.push({
            no_of_boxes_rate: i.rate,
            no_of_boxes1: i.min_box,
            no_of_boxes2: i.max_box,
          });
          this.multi_qty_valid.push({
            no_of_boxes_rate: { required },
            no_of_boxes1: { required },
            no_of_boxes2: { required },
          });
        });

        this.details.multi_job = [];
        this.multi_job_valid = [];
      } else {
        const res = await this.multiJob(
          this.finalData?.quotation?.rate_card_id
        );
        res.data.results.map((i) => {
          this.details.multi_job.push({
            jc_no_of_jobs_rate1: i.rate,
            jc_no_of_jobs1: i.min_job,
            jc_no_of_jobs2: i.max_job,
          });
          this.multi_job_valid.push({
            jc_no_of_jobs_rate1: { required },
            jc_no_of_jobs1: { required },
            jc_no_of_jobs2: { required },
          });
        });

        this.details.multi_box = [];
        this.multi_qty_valid = [];
      }
      this.addScaleClicked++;
    },
    addMultiQty() {
      this.details.multi_box.push({
        no_of_boxes_rate: "",
        no_of_boxes1: "",
        no_of_boxes2: "",
      });
      this.multi_qty_valid.push({
        no_of_boxes_rate: { required },
        no_of_boxes1: { required },
        no_of_boxes2: { required },
      });
      this.addScaleClicked++;
    },
    addMultiJob() {
      this.details.multi_job.push({
        jc_no_of_jobs_rate1: "",
        jc_no_of_jobs1: "",
        jc_no_of_jobs2: "",
      });
      this.multi_job_valid.push({
        jc_no_of_jobs_rate1: { required },
        jc_no_of_jobs1: { required },
        jc_no_of_jobs2: { required },
      });
      this.addScaleClicked++;
    },
    addRemoveDelivery(i, e) {
      
      if (!this.delivery_data.includes(e.name)) {
        this.delivery_data.push(e.name);
        this.details.e_commerce.push({
          name: e.name,
          delivery_type_initial: e.delivery_type_initial,
          no_of_units: "",
          adjustment_jobs: "",
          adjustment_amount: "",
          additional_job: "",
          timeslot_delivery: e.timeslot_delivery ?? "",
          cut_off_time: moment(e.cut_off_time).format("HH:mm") ?? "",
          cut_off_days_count: e.cut_off_days_count ?? "",
          standard_liability: "",
          maximum_weight: "",
          van_job_addl_weight: "",
          van_job_add_cost1: "",
          maximum_qty: "",
          van_job_addl_qty: "",
          van_job_add_cost2: "",
          transportType: "Charge by Weight",
          box_under: [
            {
              under1: "",
              under2: "",
              rate: "",
            },
          ],
        });
        this.e_commerce_valid.push({
          no_of_units: { required },
          adjustment_jobs: { required },
          adjustment_amount: { required },
          additional_job: { required },
          timeslot_delivery: { required },
          cut_off_time: { required },
          cut_off_days_count: { required },
          standard_liability: { required },
          box_under: [
            {
              under1: { required },
              under2: { required },
              rate: { required },
            },
          ],
        });
      } else {
        this.delivery_data = this.delivery_data.filter((i) => i !== e);
        this.details.e_commerce = this.details.e_commerce.filter(
          (i) => i.name !== e
        );
        this.e_commerce_valid.splice(0, 1);
      }
      this.renderKey++;
      this.addScaleClicked++;
    },
    eBoxUnder(index) {
      this.details.e_commerce[index].box_under.push({
        under1: "",
        under2: "",
        rate: "",
      });
      this.e_commerce_valid[index].box_under.push({
        under1: { required },
        under2: { required },
        rate: { required },
      });
      this.addScaleClicked++;
    },
    async getDelivery(id) {
      let res = await this.deliverTypes(id);
      this.checkbox_data = [];
       if (this.quotationData) {
        res.data.results.map((i) => {
          this.quotationData.express_contract[0]?.quotation_van[0].e_commerce_charges.map((e)=>{
            if(i.delivery_type===e.delivery_type){
i["name"] = i.delivery_type;
        i["value"] = true;
        this.delivery_data.push(e.delivery_type);
        let box_under=[]
        let box_under_valid=[]
        e.charge_by_quantities[0]?.rates.map((u)=>{
          box_under.push({
              under1: u.min_box,
              under2: u.max_box,
              rate: u.rate,
            })
            box_under_valid.push({
              under1: { required },
              under2: { required },
              rate: { required },
            })
        })
        this.details.e_commerce.push({
          name: e.delivery_type,
          delivery_type_initial: e.delivery_type_initial,
          no_of_units: e.no_of_units,
          adjustment_jobs: e.per_job,
          adjustment_amount: e.amount,
          additional_job: e.additional_job,
          timeslot_delivery: i.timeslot_delivery ?? "",
          cut_off_time: moment(e.cut_off_time).format("HH:mm") ?? "",
          cut_off_days_count: e.cut_off_day_count ?? "",
          standard_liability: "",
          maximum_weight:e.charge_by_weights[0]?.minimum_weight,
          van_job_addl_weight: e.charge_by_weights[0]?.van_job_additional_weight,
          van_job_add_cost1: e.charge_by_weights[0]?.van_job_additional_cost,
          maximum_qty: e.charge_by_quantities[0]?.minimum_quantity,
          van_job_addl_qty: e.charge_by_quantities[0]?.van_job_additional_quantity,
          van_job_add_cost2: e.charge_by_quantities[0]?.van_job_additional_cost,
          transportType: "Charge by Weight",
          box_under: box_under,
        });
        this.e_commerce_valid.push({
          no_of_units: { required },
          adjustment_jobs: { required },
          adjustment_amount: { required },
          additional_job: { required },
          timeslot_delivery: { required },
          cut_off_time: { required },
          cut_off_days_count: { required },
          standard_liability: { required },
          box_under: box_under_valid,
        });
            }else{
              i["name"] = i.delivery_type;
        i["value"] = false;
            }
 
        this.checkbox_data.push(i);
          });
       
      });
      this.defaultTransportType=this.delivery_data[0]
       }else{
        
      res.data.results.map((i) => {
        i["name"] = i.delivery_type;
        i["value"] = false;
        this.checkbox_data.push(i);
      });
       }
    },
    selectRate(e) {
      this.e_commerce_valid = [];
      this.details.e_commerce = [];
      this.delivery_data = [];
      let data = this.rate_type.find((i) => i.key == e);
      this.rate_type_header = data?.name ?? "";
      this.select_rate_id = e;
      this.getDelivery(e);
    },
    async onChangeEUnit(e, index) {
      let payload = {
        units: e,
      };
      const res = await this.getECommerceByUnit({
        id: 31,
        payload: payload,
      });
      this.details.e_commerce[index].adjustment_jobs = res.data.results.job;
      this.details.e_commerce[index].adjustment_amount =
        res.data.results.job * parseInt(e);
    },
    async surcharges() {
      const res = await this.getSurcharges(
        this.finalData?.quotation?.rate_card_id
      );
      res.data.results.map((i) => {
        i["value"] = "";
        this.surcharges_data.push(i);
      });
    },
    submitData() {
      let {
        no_of_units,
        adjustment_jobs,
        adjustment_amount,
        additional_job,
        van_urgent_surcharge,
        van_job_add_cost2,
        van_job_addl_weight,
        maximum_weight,
        cbq_van_job_add_cost,
        cbq_van_job_add_quantity,
        cbq_maximum_quantity,
        box_under,
        multi_box,
        multi_job,
        e_commerce,
        credit_limits,
        credit_terms,
        billing_cycle,
        weekend_2nd_trip_charge,
        saturday_2nd_trip_charge,
        return_trip_charge,
        return_trip_partial_charge,
        collection_trip_charge,
        special_monitoring,
        spc_urgent_charges,
        min_charge,
      } = this.details;
      
      if (this.v$.$invalid) {
        this.submitted = true;
         this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let costing_details = {};
        if (this.select_type === "Normal (Monthly Minimum)") {
          let normal_co1 = {
            charge_type: "normal",
            normal_rate_card_id: this.finalData?.quotation?.rate_card_id ?? "",
            normal_rate_card_name: "",
            selected_normal: true,
          };
          let normal_co = {
            no_of_units: no_of_units,
            per_job: adjustment_jobs,
            amount: adjustment_amount,
            additional_job: additional_job,
            van_job_urgent_surcharges: van_urgent_surcharge,
          };
          if (this.select_tire === "2 tier") {
            if (this.select_tire_cat === "Charge by weight") {
              costing_details = {
                ...normal_co1,
                two_tier: true,
                charge_by_weight: true,
                rates: {
                  ...normal_co,
                  tire_rates: {
                    minimum_weight: maximum_weight,
                    van_job_additional_weight: van_job_addl_weight,
                    van_job_additional_cost: van_job_add_cost2,
                  },
                },
              };
            } else {
              if (this.select_tire_cat_charge === "Charges") {
                costing_details = {
                  ...normal_co1,
                  two_tier: true,
                  charge_by_quantity: true,
                  charge_quantity_charge: true,
                  rates: {
                    ...normal_co,
                    tire_rates: {
                      minimum_quantity: cbq_maximum_quantity,
                      van_job_additional_quantity: cbq_van_job_add_quantity,
                      van_job_additional_cost: cbq_van_job_add_cost,
                    },
                  },
                };
              } else {
                let tire_rate = [];
                box_under.map((i) => {
                  tire_rate.push({
                    min_box: i.boxe_under,
                    max_box: i.boxe_under,
                    rate: i.boxe_under_rate,
                  });
                });
                // { boxe_under: "", boxe_under_rate: "" }
                costing_details = {
                  ...normal_co1,
                  two_tier: true,
                  charge_by_quantity: true,
                  charge_quantity_box_count_charges: true,
                  rates: {
                    ...normal_co,
                    tire_rates: tire_rate,
                  },
                };
              }
            }
          } else {
            if (this.select_multi_tire_cat === "Quantity") {
              let tire_rate = [];

              multi_box.map((i) => {
                tire_rate.push({
                  min_box: i.no_of_boxes1,
                  max_box: i.no_of_boxes2,
                  rate: i.no_of_boxes_rate,
                });
              });
              costing_details = {
                ...normal_co1,
                multi_tier: true,
                charge_by_quantity: true,
                rates: {
                  ...normal_co,
                  tire_rates: tire_rate,
                },
              };
            } else {
              let tire_rate = [];

              multi_job.map((i) => {
                tire_rate.push({
                  min_job: i.jc_no_of_jobs1,
                  max_job: i.jc_no_of_jobs2,
                  rate: i.jc_no_of_jobs_rate1,
                });
              });
              costing_details = {
                ...normal_co1,
                multi_tier: true,
                charge_by_job_count: true,
                rates: {
                  ...normal_co,
                  tire_rates: tire_rate,
                },
              };
            }
          }
        } else {
          let delivery_data = [];
          //   {
          //   timeslot_delivery: e.timeslot_delivery ?? "",
          //   standard_liability: "",

          // }
          e_commerce?.map((i) => {
            let rate_data = [];
            i.box_under.map((e) => {
              rate_data.push({
                min_box: e.under1,
                max_box: e.under2,
                rate: e.rate,
              });
            });
            delivery_data.push({
              delivery_type_initials: i.delivery_type_initial,
              delivery_type: i.name,
              selected: true,
              delivery_type_id: i.id,
              no_of_units: i.no_of_units,
              per_job: i.adjustment_jobs,
              amount: i.adjustment_amount,
              additional_job: i.additional_job,
              cut_off_time: i.cut_off_time,
              cut_off_day_count: i.cut_off_days_count,
              charge_by_weight: {
                minimum_weight: i.maximum_weight,
                van_job_additional_weight: i.van_job_addl_weight,
                van_job_additional_cost: i.van_job_add_cost1,
              },
              charge_by_job_count: {
                minimum_quantity: i.maximum_qty,
                van_job_additional_quantity: i.van_job_addl_qty,
                van_job_additional_cost: i.van_job_add_cost2,
                rates: i.rate_data,
              },
            });
          });
          costing_details = {
            charge_type: "e_commerce",
            normal_rate_card_id: this.finalData?.quotation?.rate_card_id ?? "",
            normal_rate_card_name: "",
            e_commerce_rate_card_id: this.select_rate_id,
            e_commerce_rate_card_name: this.rate_type_header,
            selected_e_commerce: true,
            delivery_type: delivery_data,
          };
        }
        let sur_data = [];
        this.surcharges_data.map((i) => {
          sur_data.push({
            surcharge_name: i.surcharge_name,
            rates: i.rates,
            selected: i.value===''?false:true,
            surcharge_id: i.surcharge_id,
          });
        });
        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            bill_settings: {
              credit_limit: credit_limits,
              credit_term_days: credit_terms,
              billing_cycle: billing_cycle,
              weekend_2nd_trip_charge: weekend_2nd_trip_charge,
              saturday_2nd_trip_charge: saturday_2nd_trip_charge,
              return_trip_charge: return_trip_charge,
              return_trip_partial_charge: return_trip_partial_charge,
              collection_trip_charge: collection_trip_charge,
              special_urgent_charges_selected: special_monitoring,
              special_urgent_charges: spc_urgent_charges!=""?spc_urgent_charges:0,
              min_charge_per_job: min_charge,
              surcharges: sur_data,
            },
            costing_details: costing_details,
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesExpressContractVan.vanStep++;
        this.$store.dispatch("salesExpressContractVan/navigateStepper", {
          step: "SalesExpressContractVanFifthStep",
        });
      }
    },
  async prefillData(){
let quotation_van =
      this.quotationData.express_contract[0]?.quotation_van[0] ?? {};
        if(quotation_van.charge_type==="normal" && quotation_van?.rate_card_id == this.finalData.quotation.rate_card_id){
          this.select_type='Normal (Monthly Minimum)'; 
          let normal_charges =quotation_van.normal_charges[0]
          this.details.no_of_units =normal_charges.no_of_units
          this.details.adjustment_jobs =normal_charges.per_job
          this.details.adjustment_amount =normal_charges.amount
          this.details.additional_job =normal_charges.additional_job
          this.details.van_urgent_surcharge =normal_charges.van_job_urgent_surcharges
           this.validation_details = {
          no_of_units: { required },
          adjustment_jobs: { required },
          adjustment_amount: { required },
          additional_job: { required },
          van_urgent_surcharge: { required },
        };
          if(quotation_van.two_tier){
          this.select_tire ='2 tier'
          if(quotation_van.charge_by_weight){
            let charge_weight =normal_charges.two_tier_charge_by_weight[0]
            this.select_tire_cat='Charge by weight'
            this.details.maximum_weight=charge_weight.minimum_weight
            this.details.van_job_addl_weight=charge_weight.van_job_additional_weight
            this.details.van_job_add_cost2=charge_weight.van_job_additional_cost
          }else{
             this.select_tire_cat='Charge by Quantity'
            if(quotation_van.charge_quantity_charge){
               let charge_qty =normal_charges.two_tier_charge_by_quantity[0]
              
               this.select_tire_cat_charge="Charges"
               this.details.cbq_maximum_quantity=charge_qty.minimum_quantity
               this.details.cbq_van_job_add_quantity=charge_qty.van_job_additional_quantity
               this.details.cbq_van_job_add_cost=charge_qty.van_job_additional_cost
            }else{
               let charge_qty =normal_charges.two_tier_charge_by_quantity_box_count
              this.select_tire_cat_charge="Box Count Charges"
              charge_qty.map((i)=>{
this.details.box_under.push({
        boxe_under1: i.min_box,
        boxe_under2: i.max_box,
        boxe_under_rate:i.rate,
      });
       this.box_valid.push({
        boxe_under1: { required },
        boxe_under2: { required },
        boxe_under_rate: { required },
      });
              })
              
            }
          }
          }else{
             this.select_tire ='Multi tier'
             if(quotation_van.charge_by_quantity){
              
              this.select_multi_tire_cat='Quantity'
              normal_charges.multi_tier_charge_by_quantity.map((i)=>{
                this.details.multi_box.push({
            no_of_boxes_rate: i.rate,
            no_of_boxes1: i.min_box,
            no_of_boxes2: i.max_box,
          });
          this.multi_qty_valid.push({
            no_of_boxes_rate: { required },
            no_of_boxes1: { required },
            no_of_boxes2: { required },
          });
              })
             }else{
 this.select_multi_tire_cat='Job Count'
 normal_charges.multi_tier_charge_by_quantity.map((i)=>{
                this.details.multi_job.push({
            jc_no_of_jobs_rate1: i.rate,
            jc_no_of_jobs1: i.min_job,
            jc_no_of_jobs2: i.max_job,
          });
          this.multi_job_valid.push({
            jc_no_of_jobs_rate1: { required },
            jc_no_of_jobs1: { required },
            jc_no_of_jobs2: { required },
          });
              })
             }
          }
          
        }else{
          if(quotation_van?.region_id == this.finalData?.quotation?.region_id){
          this.select_type='E-commerce'
          await this.getRates(this.finalData?.quotation?.region_id);
          this.details.rate_type=quotation_van.e_commerce_rate_card_id
          await this.selectRate(this.details.rate_type)
          }
        }
        let bill_settings =this.quotationData.express_contract[0]?.bill_settings[0]??{}
        this.details.credit_limits =bill_settings.credit_limit
        this.details.credit_terms =bill_settings.credit_term_days
        this.details.billing_cycle =bill_settings.billing_cycle
        
        this.details.min_charge=bill_settings.min_charge_per_job
        this.details.weekend_2nd_trip_charge=bill_settings.weekend_2nd_trip_charge
        this.details.saturday_2nd_trip_charge=bill_settings.saturday_2nd_trip_charge
        this.details.return_trip_charge=bill_settings.return_trip_charge
        this.details.return_trip_partial_charge=bill_settings.return_trip_partial_charge
        this.details.collection_trip_charge=bill_settings.collection_trip_charge
        this.details.FTZ=bill_settings.special_urgent_charges_selected
        this.details.spc_urgent_charges=bill_settings.special_urgent_charges
       bill_settings.surcharges.map((i)=>{
        this.surcharges_data.push( {
            "surcharge_id": i.surcharge_id,
            "surcharge_name": i.surcharge_name,
            "rates": i.rates,
            "value":i.selected  
        })
       })
       
        this.addScaleClicked++
    }
  },
  components: {
    Accordion,
    AccordionTab,
    DuoSelection,
    Checkbox,
    RadioButton
  },
  async created() {
    
  },
  async mounted() {
    this.surcharges();
    if (this.quotationData) {
      this.prefillData();
    } 
    // else {
    // this.getProfileData();
    // }
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
  background-color: rgb(234, 247, 255, 0.3) !important;
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
::v-deep .p-accordion-header-text {
  font-weight: 700;
  font-size: 14px;
  color: #343434 !important;
}
</style>
