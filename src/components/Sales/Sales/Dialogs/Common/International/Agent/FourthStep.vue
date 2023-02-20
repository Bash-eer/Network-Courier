<template>
  <div class="field col-12 md:col-12 mt-4 mb-0 pl-0 ml-3">
    <!-- <p>Hello</p> -->
    <p class="bold-700 font-size-16 color-343434">Costing Details</p>
  </div>
  <div class="formgrid my-0 ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a mb-2">Currency</h5>
      <!-- <DropDown :key="renderKey" code="name" :data="currency" label="currency" v-model="details.currency" :class="{
        'p-invalid': v$.details.currency?.$invalid && submitted,
        'inputfield w-full dialog-dropdown-text ': true,
      }" /> -->
      <DropDownField
        :value="details.currency"
        :key="renderKey"
        code="name"
        :data="currency"
        label="currency"
        v-model="details.currency"
        :class="{
          'p-invalid': v$.details.currency?.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="p-1 pb-0 mb-0 mt-1 flex align-items-center">
    <div class="flex">
      <SelectButton
        class="my-4"
        v-model="selectedType"
        :options="types"
        @update:modelValue="onChange1($event)"
      />
      <!-- <DuoSelection :options="['Document', 'Parcel']" :default="defaultTransportType"
          type="setRegionDeliveryTransportType" /> -->
    </div>
    <div class="flex mb-0">
      <div class="flex flex-row align-items-center p-2 pb-0">
        <div class="flex align-items-center pb-0 mb-0">
          <!-- <CheckBox v-bind:categories="[
              {
                name: 'Effective',
                key: 'a',
              },
              
            ]"  v-model="details.sameCharges" /> -->
          <Checkbox
            v-model="details.sameCharges"
            :binary="true"
            @change="useSame"
          />
        </div>
        <div class="flex align-items-center">
          <span class="color-4e5968 font-size-12 bold-600 pt-1"
            >Use Same Charges for Parcel</span
          >
        </div>
      </div>
    </div>
  </div>
  <div>
    <div v-for="(typeSelect, idx) of types" :key="idx">
      <div v-if="typeSelect == selectedType">
        <div class="formgrid my-0 ml-3 mb-4">
          <!-- <div> -->
          <div class="duo-select-content p-3 ml-1">
            <div>
              <Accordion :activeIndex="0">
                <AccordionTab
                  v-for="(item, index) of details[typeSelect].day_details"
                  :key="index"
                >
                  <template #header>
                    <span>{{ item["name"] ?? "" }}</span>
                    <Checkbox
                      v-if="
                        item.name === 'Same Day' && typeSelect === 'Document'
                      "
                      class="ml-2"
                      v-model="details.applyAllDocument"
                      :binary="true"
                      @change="useSameDays"
                    />
                    <Checkbox
                      v-if="item.name === 'Same Day' && typeSelect === 'Parcel'"
                      class="ml-2"
                      v-model="details.applyAllParcel"
                      :binary="true"
                      @change="useSameDays"
                    />
                    <div
                      v-if="item.name === 'Same Day'"
                      class="flex align-items-center"
                    >
                      <span class="color-4e5968 font-size-12 bold-600 pt-1"
                        >Apply All</span
                      >
                    </div>
                  </template>
                  <!-- <div class="accord-field-style"> -->
                  <div
                    class="
                      flex flex-row
                      justify-content-between
                      align-items-center
                    "
                  >
                    <div
                      v-for="category of SalesDialogCategories"
                      :key="category.key"
                      class="p-field-radiobutton flex mr-3"
                    >
                      <RadioButton
                        :id="category.key"
                        name="category"
                        :value="category.name"
                        v-model="item.category"
                        @change="
                          onChangeValue(
                            $event,
                            category.name,
                            index,
                            typeSelect
                          )
                        "
                      />
                      <label :for="category.key">{{ category.name }}</label>
                    </div>
                    <!-- <RadioButtons :default="item.category"  label="platform"
            v-bind:radioButtonData="SalesDialogCategories"
              v-model="item.category"  
              :selectedRadioButton="item.category"
              @update:modelValue="onChangeValue($event, index, typeSelect)" /> -->
                  </div>
                  <div
                    v-if="item.category == 'Delivery Weight and Addl.Charges'"
                  >
                    <!-- <div class="formgrid grid mt-1 ml-0 pl-0">
            <div class="field col-12 md:col-6 ml-0 pl-0">
              <h5 class="color-7a7a7a font-size-14 bold-500 mb-2 pb-2 required">Delivery weight Charges</h5>
              <div class="formgrid grid ml-0 pl-0">
                <div class="field col-12 md:col-3 ml-0 pl-0">
                  <input type="number" placeholder="kg" v-model.number="item.first.delivery_weight_num1"
                    :class="numberClass" />

                
                </div>
                <div class="field col-12 md:col-3">
                  <input type="number" placeholder="kg" v-model.number="item.first.delivery_weight_num2"
                    :class="numberClass" />
                 
                </div>
                <div class="col-12 md:col-6">
                  <div class="p-inputgroup">
                    <TextField label="delivery_weight_charges" type="number"
                      v-model="item.first.delivery_weight_charges" :classes="{
                        'p-invalid': v$.details[typeSelect].day_details[index]?.first?.delivery_weight_charges?.$invalid && submitted,
                        'inputfield w-full dialog-field-text py-2': true,
                      }" />
                    <span class="required p-inputgroup-addon">Charges</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

                    <div
                      class="formgrid grid mt-1 mb-0 ml-0 pl-0"
                      v-for="(k, idxy) of item.first.delivery_weight_charges"
                      :key="idxy"
                    >
                      <div class="field col-12 md:col-6 ml-0 pl-0">
                        <h5
                          class="color-7a7a7a font-size-14 bold-500 mt-2 pb-2"
                        >
                          Delivery weight Charges
                        </h5>
                        <div class="formgrid grid ml-0 pl-0">
                          <div class="field col-12 md:col-3 ml-0 pl-0">
                            <TextField
                              placeholder="kg"
                              label="delivery_weight_charges2"
                              type="number"
                              v-model="k.delivery_weight_num1"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.delivery_weight_charges[idxy]
                                    ?.delivery_weight_num1?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="item.first.delivery_weight_charges[idxy].delivery_weight2_num1" :class="{
                        'p-invalid': v$.details[typeSelect].day_details[index]?.first?.delivery_weight_charges[idxy]?.delivery_weight2_num1?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                v-model="details.sameday_delivery_weight2_num1"
                :showButtons="true"
                mode="number"
              /> -->
                          </div>
                          <div class="field col-12 md:col-3">
                            <TextField
                              label="delivery_weight_charges2"
                              placeholder="kg"
                              type="number"
                              v-model="k.delivery_weight_num2"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.delivery_weight_charges[idxy]
                                    ?.delivery_weight_num2?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="item.first.delivery_weight_charges[idxy].delivery_weight2_num2" :class="{
                        'p-invalid': v$.details[typeSelect].day_details[index]?.first?.delivery_weight_charges[idxy]?.delivery_weight2_num2?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                v-model="details.sameday_delivery_weight2_num2"
                :showButtons="true"
                mode="number"
              /> -->
                          </div>
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="delivery_weight_charges2"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="k.delivery_weight_charges"
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.first?.delivery_weight_charges[idxy]
                                      ?.delivery_weight_charges?.$invalid &&
                                    submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-1 align-self-center">
                        <div
                          v-if="item.first.delivery_weight_charges.length !== 1"
                          class="pi pi-times pointer ml-3 mb-3"
                          @click="
                            deleteDelivery(
                              typeSelect,
                              'first',
                              'delivery_weight_charges',
                              index,
                              idxy,
                              0
                            )
                          "
                        ></div>
                      </div>
                      <div
                        class="field col-12 md:col-5"
                        v-if="
                          item.first.delivery_weight_charges.length - 1 == idxy
                        "
                      >
                        <h5
                          class="
                            color-7a7a7a
                            font-size-14
                            bold-500
                            unit_rates
                            pb-2
                            ml-2
                          "
                        >
                          Delivery weight Addl. Charges
                        </h5>
                        <div class="formgrid grid">
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="delivery_weight_addl_charges_kg"
                                type="number"
                                v-model="
                                  item.first.delivery_weight_addl_charges_kg
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.first?.delivery_weight_addl_charges_kg
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >(Kg)</span
                              >
                            </div>
                          </div>
                          <div class="field col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="delivery_weight_addl_charges"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="
                                  item.first.delivery_weight_addl_charges
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.first?.delivery_weight_addl_charges
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex mb-2"
                      @click="addDelivery(typeSelect, index)"
                    >
                      <span class="color-357dea font-size-14 bold-600 mt-0"
                        ><b>+ Add New </b></span
                      >
                    </div>
                  </div>
                  <div class="formgrid grid mt-1 mb-0 ml-0 pl-0">
                    <div
                      v-if="item.category == 'Delivery Charges'"
                      class="field col-12 md:col-6 ml-0 pl-0"
                    >
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          mt-2
                          pb-2
                          ml-0
                          pl-0
                        "
                      >
                        Delivery weight Charges
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="delivery_weight_charges3_kg"
                              type="number"
                              v-model="item.first.delivery_weight_charges3_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.delivery_weight_charges3_kg
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="delivery_weight_charges3"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.first.delivery_weight_charges3"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.delivery_weight_charges3
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="item.category == 'Same Address (Per Address)'"
                      class="field col-12 md:col-6"
                    >
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          unit_rates
                          pb-2
                          ml-2
                        "
                      >
                        Same Address Charges
                      </h5>
                      <div class="formgrid grid">
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="same_address_charges_kg"
                              type="number"
                              v-model="item.first.same_address_charges_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.same_address_charges_kg
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="field col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="same_address_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.first.same_address_charges"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.first?.same_address_charges?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="flex justify-content-between align-items-center">
                    <div
                      v-for="category of AgentDialogCategories"
                      :key="category.key"
                      class="p-field-radiobutton flex mr-3"
                    >
                      <RadioButton
                        :id="category.key"
                        name="category"
                        :value="category.name"
                        v-model="item.res_category"
                        @change="
                          onChangeValueResi(
                            $event,
                            category.name,
                            index,
                            typeSelect
                          )
                        "
                      />
                      <label :for="category.key">{{ category.name }}</label>
                    </div>
                    <!-- <RadioButtons label="platform" 
             v-bind:radioButtonData="AgentDialogCategories" 
             v-model="item.res_category"
             :selectedRadioButton="item.res_category"
             @update:modelValue="onChangeValueResi($event, index, typeSelect)"
             /> -->
                  </div>
                  <div
                    v-if="
                      item.res_category ==
                      'Resi Delivery Weight and Addl.Charges'
                    "
                  >
                    <div
                      class="formgrid grid mt-1 mb-0 ml-0 pl-0"
                      v-for="(k, index2) of item.second
                        .resi_delivery_weight_charges"
                      :key="index2"
                    >
                      <div class="field col-12 md:col-6 ml-0 pl-0">
                        <h5
                          class="color-7a7a7a font-size-14 bold-500 mt-2 pb-2"
                        >
                          Resi. Delivery weight Charges
                        </h5>
                        <div class="formgrid grid ml-0 pl-0">
                          <div class="field col-12 md:col-3 ml-0 pl-0">
                            <TextField
                              label="resi_delivery_weight_charges"
                              type="number"
                              v-model="k.resi_delivery_weight_num1"
                              placeholder="kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_delivery_weight_charges[
                                    index2
                                  ]?.resi_delivery_weight_num1?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="k.resi_delivery_weight_num1" :class="{
                        'p-invalid': v$.details[typeSelect].day_details[index]?.second?.resi_delivery_weight_charges[index2]?.resi_delivery_weight_num1?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                v-model="details.sameday_resi_delivery_weight_num1"
                :showButtons="true"
                mode="number"
              /> -->
                          </div>
                          <div class="field col-12 md:col-3">
                            <TextField
                              label="resi_delivery_weight_charges"
                              type="number"
                              v-model="k.resi_delivery_weight_num2"
                              placeholder="kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_delivery_weight_charges[
                                    index2
                                  ]?.resi_delivery_weight_num2?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="k.resi_delivery_weight_num2" :class="{
                        'p-invalid': v$.details[typeSelect].day_details[index]?.second?.resi_delivery_weight_charges[index2]?.resi_delivery_weight_num2?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                v-model="details.sameday_resi_delivery_weight_num2"
                :showButtons="true"
                mode="number"
              /> -->
                          </div>
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="resi_delivery_weight_charges"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="k.resi_delivery_weight_charges"
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.second?.resi_delivery_weight_charges[
                                      index2
                                    ]?.resi_delivery_weight_charges?.$invalid &&
                                    submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-1 align-self-center">
                        <div
                          v-if="
                            item.second.resi_delivery_weight_charges.length !==
                            1
                          "
                          class="pi pi-times pointer ml-3 mb-3"
                          @click="
                            deleteDelivery(
                              typeSelect,
                              'second',
                              'resi_delivery_weight_charges',
                              index,
                              index2,
                              0
                            )
                          "
                        ></div>
                      </div>
                      <div
                        class="field col-12 md:col-5"
                        v-if="
                          item.second.resi_delivery_weight_charges.length - 1 ==
                          index2
                        "
                      >
                        <h5
                          class="
                            color-7a7a7a
                            font-size-14
                            bold-500
                            unit_rates
                            pb-2
                            ml-2
                          "
                        >
                          Resi. Delivery weight Addl. Charges
                        </h5>
                        <div class="formgrid grid">
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="resi_delivery_weight_addl_charges_kg"
                                type="number"
                                v-model="
                                  item.second
                                    .resi_delivery_weight_addl_charges_kg
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.second
                                      ?.resi_delivery_weight_addl_charges_kg
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >(Kg)</span
                              >
                            </div>
                          </div>
                          <div class="field col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="resi_delivery_weight_addl_charges"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="
                                  item.second.resi_delivery_weight_addl_charges
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].day_details[index]
                                      ?.second
                                      ?.resi_delivery_weight_addl_charges
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex mb-2"
                      @click="addDeliveryResi(typeSelect, index)"
                    >
                      <span class="color-357dea font-size-14 bold-600 mt-0"
                        ><b>+ Add New </b></span
                      >
                    </div>
                  </div>
                  <div class="formgrid grid mt-1 mb-0 ml-0 pl-0">
                    <div
                      v-if="item.res_category == 'Resi Delivery Charges'"
                      class="field col-12 md:col-6 ml-0 pl-0"
                    >
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          mt-2
                          pb-2
                          ml-0
                          pl-0
                        "
                      >
                        Resi. Delivery Charges
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="resi_delivery_charges_kg"
                              type="number"
                              v-model="item.second.resi_delivery_charges_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_delivery_charges_kg
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="resi_delivery_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.second.resi_delivery_charges"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_delivery_charges?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="item.res_category == 'Same Address (Per Address)'"
                      class="field col-12 md:col-6"
                    >
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          unit_rates
                          pb-2
                          ml-2
                        "
                      >
                        Same Address Charges
                      </h5>
                      <div class="formgrid grid">
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="resi_same_address_charges_kg"
                              type="number"
                              v-model="item.second.resi_same_address_charges_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_same_address_charges_kg
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="field col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="resi_same_address_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.second.resi_same_address_charges"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.second?.resi_same_address_charges
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div class="formgrid grid mt-1 ml-0 pl-0">
                    <div class="field col-12 md:col-6 ml-0 pl-0">
                      <h5
                        class="color-7a7a7a font-size-14 bold-500 ml-0 m-2 pb-2"
                      >
                        No of Attempt
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="no_of_attempt"
                              type="number"
                              v-model="item.no_of_attempt"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.no_of_attempt?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="required p-inputgroup-addon"
                              >Attempt</span
                            >
                          </div>
                        </div>
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="no_of_attempt_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.no_of_attempt_charges"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].day_details[index]
                                    ?.no_of_attempt_charges?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="required p-inputgroup-addon"
                              >Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- </div> -->
                </AccordionTab>
                <!-- Same Day and next day contents are same   -->

                <!-- Radio button text color only different, other content same as same and next day  -->
              </Accordion>
            </div>
          </div>
        </div>

        <div class="ml-3 mt-3">
          <Accordion>
            <!-- Contract Setting -->
            <AccordionTab header="Surcharges">
              <div :key="renderKey" class="row table_div">
                <div :key="renderKey" class="col-12">
                  <DataTable
                    :key="renderKey"
                    class="p-datatable-sm editable-cells-table formTable"
                    :value="surchargesList[typeSelect]"
                    responsiveLayout="scroll"
                    v-model:selection="
                      details['selectedSurcharges' + typeSelect]
                    "
                    editMode="cell"
                    @cell-edit-complete="onCellEditComplete"
                  >
                    <Column
                      selectionMode="multiple"
                      style="width: 3rem"
                      :exportable="false"
                    ></Column>
                    <Column
                      field="delivery_name"
                      header="Delivery Name"
                    ></Column>
                    <Column field="charges" header="Charges">
                      <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                      </template>
                    </Column>
                  </DataTable>
                  <!-- <keep-alive>
              <FormTable 
              v-if="
                surchargesList !=
                null
              " :key="surchargesList"
                formTableDataName="inspectionsFormTableData" 
                :selectionModeState="selectionModeState" 
                dataKey="id"
                :tableData="surchargesList"
                :tableColumns="
  $store.state.salesInternationalAgent.internationalAgentDropDownTableColumns
" storePath="salesInternationalAgent" />
            </keep-alive> -->
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Clearance charges">
              <SelectButton
                class="my-4"
                v-model="selectedIndex"
                :options="details.clearance"
                @update:modelValue="onChange($event)"
              />
              <!-- <DuoSelection class="my-4"  v-model="selectedIndex" :options="details.clearance" :default="details.clearance[0]??''" -->
              <!-- type="setRegionDeliveryTransportType" /> -->
              <!-- AirFreight -->

              <!-- need to add functionality for duo selection, disabling v-if for navigating to next step -->

              <!-- <div v-if="defaultTransportType == 'AirFreight'"> -->
              <div
                v-for="(item, index) of details[typeSelect].clearanceDetails"
                :key="index"
              >
                <div v-if="selectedIndex == item.name">
                  <div class="flex flex-row align-items-center">
                    <div
                      v-for="category of SalesDialogCategoriesCleranceCharges"
                      :key="category.key"
                      class="p-field-radiobutton flex mr-3"
                    >
                      <RadioButton
                        :id="category.key"
                        name="category"
                        :value="category.name"
                        v-model="item.category"
                        @change="
                          onChangeValueClearance(
                            $event,
                            category.name,
                            index,
                            typeSelect,
                            item.first.clearance_charges
                          )
                        "
                      />
                      <label :for="category.key">{{ category.name }}</label>
                    </div>
                    <!-- <RadioButtons label="platform" 
            v-bind:radioButtonData="SalesDialogCategoriesCleranceCharges" 
            v-model="item.category"
            :selectedRadioButton="item.category"
            @update:modelValue="onChangeValueClearance($event, index, typeSelect)"
             /> -->
                  </div>
                  <div
                    v-if="item.category == 'Clearance Charges and Addl.Charges'"
                  >
                    <div
                      class="formgrid grid mt-1 ml-0 pl-0"
                      v-for="(k, index1) of item.first.clearance_charges"
                      :key="index1"
                    >
                      <div class="field col-12 md:col-6">
                        <h5
                          class="
                            color-7a7a7a
                            font-size-14
                            bold-500
                            mt-2
                            required
                            ml-0
                            pl-0
                            required
                          "
                        >
                          Clearance Charges
                        </h5>
                        <div class="formgrid grid ml-0 pl-0">
                          <div class="field col-12 md:col-3 ml-0 pl-0">
                            <TextField
                              label="clearance_charges"
                              type="number"
                              placeholder="kg"
                              v-model="k.clearance_charges_num1"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.first?.clearance_charges[index1]
                                    ?.clearance_charges_num1?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="k.clearance_charges_num1" :class="{
                       'p-invalid': v$.details[typeSelect].clearanceDetails[index]?.first?.clearance_charges[index1]?.clearance_charges_num1?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                  v-model="details.air_frieght_clearance_charges_num1"
                  :showButtons="true"
                  mode="number"
                /> -->
                          </div>
                          <div class="field col-12 md:col-3">
                            <TextField
                              label="clearance_charges"
                              type="number"
                              placeholder="kg"
                              v-model="k.clearance_charges_num2"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.first?.clearance_charges[index1]
                                    ?.clearance_charges_num2?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <!-- <input type="number" placeholder="kg" v-model.number="k.clearance_charges_num2" :class="{
                       'p-invalid': v$.details[typeSelect].clearanceDetails[index]?.first?.clearance_charges[index1]?.clearance_charges_num2?.$invalid && submitted,
                        'p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full': true,
                      }" /> -->
                            <!-- <NumberField
                  v-model="details.air_frieght_clearance_charges_num2"
                  :showButtons="true"
                  mode="number"
                /> -->
                          </div>
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="clearance_charges"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="k.clearance_charges"
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].clearanceDetails[
                                      index
                                    ]?.first?.clearance_charges[index1]
                                      ?.clearance_charges?.$invalid &&
                                    submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-1 align-self-center">
                        <div
                          v-if="item.first.clearance_charges.length !== 1"
                          class="pi pi-times pointer ml-3 mb-3"
                          @click="
                            deleteDelivery(
                              typeSelect,
                              'first',
                              'clearance_charges',
                              index,
                              index1,
                              1
                            )
                          "
                        ></div>
                      </div>
                      <div
                        class="field col-12 md:col-5"
                        v-if="item.first.clearance_charges.length - 1 == index1"
                      >
                        <h5
                          class="
                            color-7a7a7a
                            font-size-14
                            bold-500
                            unit_rates
                            required
                            ml-2
                          "
                        >
                          Every Addl. Weight Charges
                        </h5>
                        <div class="formgrid grid">
                          <div class="col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="every_addl_weight_charges_kg"
                                type="number"
                                v-model="
                                  details[typeSelect].clearanceDetails[index]
                                    .first.every_addl_weight_charges_kg
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].clearanceDetails[
                                      index
                                    ]?.first?.every_addl_weight_charges_kg
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >(Kg)</span
                              >
                            </div>
                          </div>

                          <div class="field col-12 md:col-6">
                            <div class="p-inputgroup">
                              <TextField
                                label="every_addl_weight_charges"
                                type="number"
                                :iconSet="true"
                                icon_class="p-input-icon-left"
                                v-model="
                                  details[typeSelect].clearanceDetails[index]
                                    .first.every_addl_weight_charges
                                "
                                :classes="{
                                  'p-invalid':
                                    v$.details[typeSelect].clearanceDetails[
                                      index
                                    ]?.first?.every_addl_weight_charges
                                      ?.$invalid && submitted,
                                  'inputfield w-full dialog-field-text py-2': true,
                                }"
                              />
                              <span class="p-inputgroup-addon required"
                                >Charges</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex mb-2"
                      @click="addClearance(typeSelect, index)"
                    >
                      <span
                        class="
                          color-357dea
                          font-size-14
                          bold-600
                          mt-0
                          pt-0
                          ml-2
                        "
                        ><b>+ Add New </b></span
                      >
                    </div>
                  </div>
                  <div
                    class="formgrid grid mt-1 ml-0 pl-0"
                    v-if="item.category == 'Clearance Charges'"
                  >
                    <div class="field col-12 md:col-6">
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          mt-2
                          ml-0
                          pl-0
                        "
                      >
                        Clearance Charges
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="clearance_charges2_kg"
                              type="number"
                              v-model="item.first.clearance_charges2_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.first?.clearance_charges2_kg?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="clearance_charges2"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.first.clearance_charges2"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.first?.clearance_charges2?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="formgrid grid mt-1 ml-0 pl-0 row">
                    <div
                      class="field col-12 md:col-6"
                      v-for="(e, indexO) of item.otherCharges"
                      :key="indexO"
                    >
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          unit_rates
                          required
                          ml-0
                          pl-0
                        "
                      >
                        {{ e.name ?? "" }}
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="SAT_express_charges_kg"
                              type="number"
                              v-model="
                                details[typeSelect].clearanceDetails[index]
                                  .otherCharges[indexO].per_kg
                              "
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    .otherCharges[indexO]?.per_kg?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="field col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="SAT_express_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="
                                details[typeSelect].clearanceDetails[index]
                                  .otherCharges[indexO].charges
                              "
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    .otherCharges[indexO]?.charges?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="field col-12 md:col-6">
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          unit_rates
                          required
                          ml-2
                        "
                      >
                        Ground Handling Fee
                      </h5>
                      <div class="formgrid grid">
                        <div class="col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="ground_handling_fee_kg"
                              type="number"
                              v-model="item.ground_handling_fee_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.ground_handling_fee_kg?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="field col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="ground_handling_fee"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.ground_handling_fee"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.ground_handling_fee?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                  <!-- <div class="formgrid grid mt-1 ml-0 pl-0">
                    <div class="field col-12 md:col-6">
                      <h5
                        class="
                          color-7a7a7a
                          font-size-14
                          bold-500
                          unit_rates
                          required
                          ml-0
                          pl-0
                        "
                      >
                        Exception Clearance Charges
                      </h5>
                      <div class="formgrid grid ml-0 pl-0">
                        <div class="col-12 md:col-6 ml-0 pl-0">
                          <div class="p-inputgroup ml-0 pl-0">
                            <TextField
                              label="exception_clearance_charges_kg"
                              type="number"
                              v-model="item.exception_clearance_charges_kg"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.exception_clearance_charges_kg
                                    ?.$invalid && submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >per (Kg)</span
                            >
                          </div>
                        </div>
                        <div class="field col-12 md:col-6">
                          <div class="p-inputgroup">
                            <TextField
                              label="exception_clearance_charges"
                              type="number"
                              :iconSet="true"
                              icon_class="p-input-icon-left"
                              v-model="item.exception_clearance_charges"
                              :classes="{
                                'p-invalid':
                                  v$.details[typeSelect].clearanceDetails[index]
                                    ?.exception_clearance_charges?.$invalid &&
                                  submitted,
                                'inputfield w-full dialog-field-text py-2': true,
                              }"
                            />
                            <span class="p-inputgroup-addon required"
                              >min Charges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
              <!-- Ends -->
            </AccordionTab>
            <AccordionTab header="COD charges">
              <div class="formgrid grid mt-3 ml-0 pl-0">
                <div class="field col-12 md:col-6 ml-0 pl-0">
                  <h5
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      unit_rates
                      ml-0
                      pl-0
                    "
                  >
                    Cash On Delivery
                  </h5>
                  <div class="formgrid grid ml-0 pl-0">
                    <div class="col-12 md:col-6 ml-0 pl-0">
                      <div class="p-inputgroup ml-0 pl-0">
                        <TextField
                          label="cash_on_delivery_percent"
                          type="number"
                          v-model="details[typeSelect].cash_on_delivery_percent"
                          :classes="{
                            'p-invalid':
                              v$.details[typeSelect].cash_on_delivery_percent
                                ?.$invalid && submitted,
                            'inputfield w-full dialog-field-text py-2': true,
                          }"
                        />
                        <span class="p-inputgroup-addon required">%</span>
                      </div>
                    </div>
                    <div class="field col-12 md:col-6">
                      <div class="p-inputgroup">
                        <TextField
                          label="cash_on_delivery_charge"
                          type="number"
                          :iconSet="true"
                          icon_class="p-input-icon-left"
                          v-model="details[typeSelect].cash_on_delivery_charge"
                          :classes="{
                            'p-invalid':
                              v$.details[typeSelect].cash_on_delivery_charge
                                ?.$invalid && submitted,
                            'inputfield w-full dialog-field-text py-2': true,
                          }"
                        />
                        <span class="p-inputgroup-addon required"
                          >min Charges</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Other charges">
              <div class="formgrid grid justify-content-between mt-3 ml-0 pl-0">
                <div class="field col-12 md:col-4 ml-0 pl-0">
                  <!-- <div class="formgrid grid">
            <div class="col-12 md:col-4"> -->
                  <h5
                    class="
                      color-7a7a7a
                      font-size-14
                      bold-500
                      required
                      ml-0
                      pl-0
                      required
                    "
                  >
                    Credit Terms(Days)
                  </h5>
                  <TextField
                    label="credit_terms"
                    type="number"
                    v-model="details[typeSelect].credit_terms"
                    :classes="{
                      'p-invalid':
                        v$.details[typeSelect].credit_terms?.$invalid &&
                        submitted,
                      'inputfield w-full dialog-dropdown-text ': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-4">
                  <h5 class="color-7a7a7a font-size-14 bold-500">
                    Deposit Amount
                  </h5>
                  <TextField
                    label="deposit_amount"
                    type="number"
                    v-model="details[typeSelect].deposit_amount"
                    :classes="{
                      'inputfield w-full dialog-dropdown-text ': true,
                    }"
                  />
                </div>
                <div class="field col-12 md:col-4">
                  <h5 class="color-7a7a7a font-size-14 bold-500">Interest%</h5>
                  <TextField
                    label="intrest_percent"
                    type="number"
                    v-model="details[typeSelect].intrest_percent"
                    :classes="{
                      'inputfield w-full dialog-dropdown-text ': true,
                    }"
                  />
                </div>
                <!-- </div>
        </div> -->
              </div>
            </AccordionTab>
          </Accordion>
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
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text color-357dea ml-3"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesInternationalAgent"
          label="Cancel"
          class="color-357dea"
          @click="closeDialog"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="nextStepHandler"
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
import { mapActions, mapState } from "vuex";
import SelectButton from "primevue/selectbutton";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import RadioButton from "primevue/radiobutton";
// import DuoSelection from "../../DuoSelect.vue";
// import InputNumber from "primevue/inputnumber";
//
export default {
  name: "SalesInternationalAgentFourthStep",
  components: {
    Accordion,
    AccordionTab,
    SelectButton,
    Checkbox,
    DataTable,
    Column,
    RadioButton,
    InputText,
  },
  data: () => ({
    v$: useVuelidate(),
    defaultTransportType: "",
    renderKey: 1,
    fg: "Delivery Weight and Addl.Charges",
    addSalesClicked: 0,
    types: ["Document", "Parcel"],
    selectedSurchargesParcel: null,
    selectedSurchargesDocument: null,
    validationGet: {
      Document: [],
      Parcel: [],
    },
    salesValidation: [
      {
        delivery_weight_charges: { required },
        delivery_weight_charges2: { required },
        delivery_weight_addl_charges: { required },
        delivery_weight_addl_charges_kg: { required },
        delivery_weight_charges3_kg: { required },
        delivery_weight_charges3: { required },
        same_address_charges_kg: { required },
        same_address_charges: { required },
        resi_delivery_weight_charges: { required },
        resi_delivery_weight_addl_charges_kg: { required },
        resi_delivery_weight_addl_charges: { required },
        resi_delivery_charges_kg: { required },
        resi_delivery_charges: { required },
        resi_same_address_charges_kg: { required },
        resi_same_address_charges: { required },
        no_of_attempt: { required },
        no_of_attempt_charges: { required },
      },
    ],
    clearanceValidationGet: {
      Document: [],
      Parcel: [],
    },
    clearanceValidation: [
      {
        clearance_charges: { required },
        every_addl_weight_charges_kg: { required },
        every_addl_weight_charges: { required },
        clearance_charges2_kg: { required },
        clearance_charges2: { required },
        SAT_express_charges_kg: { required },
        SAT_express_charges: { required },
        ground_handling_fee_kg: { required },
        ground_handling_fee: { required },
        exception_clearance_charges_kg: { required },
        exception_clearance_charges: { required },
      },
    ],
    surchargesList: {
      Document: [],
      Parcel: [],
    },
    surchargesListDocument: [],
    surchargesListParcel: [],
    otherChargesValid: [],
    numberClass:
      "p-inputtext p-component inputfield w-full dialog-field-text py-2 inputfield p-inputtext-sm w-full",
    selectedIndex: "",
    selectedType: "Document",
    details: {
      otherCharges: [],
      currency: "",
      sameCharges: false,
      applyAllDocument: false,
      applyAllParcel: false,
      clearanceDetails: [],
      selectedSurchargesDocument: null,
      selectedSurchargesParcel: null,
      day_details: [],
      Document: {
        clearanceDetails: [],
        day_details: [],
        //COD Charges
        cash_on_delivery_percent: "0",
        cash_on_delivery_charge: "0",
        //Other Charges
        credit_terms: "15",
        deposit_amount: "0",
        intrest_percent: "0",
      },
      Parcel: {
        clearanceDetails: [],
        day_details: [],
        //COD Charges
        cash_on_delivery_percent: "0",
        cash_on_delivery_charge: "0",
        //Other Charges
        credit_terms: "15",
        deposit_amount: "0",
        intrest_percent: "0",
      },
      clearance: [],

      days: ["Same Day", "Next Day", "Regular"],
      //Air-freight
      air_frieght_clearance_charges: "",
      air_frieght_clearance_charges_num1: "",
      air_frieght_clearance_charges_num2: "",
      air_frieght_every_addl_weight_charges_kg: "",
      air_frieght_every_addl_weight_charges: "",
      air_frieght_clearance_charges2_kg: "",
      air_frieght_clearance_charges2: "",
      //DNATA
      DNATA_clearance_charges: "",
      DNATA_clearance_charges_num1: "",
      DNATA_clearance_charges_num2: "",
      DNATA_every_addl_weight_charges_kg: "",
      DNATA_every_addl_weight_charges: "",
      DNATA_clearance_charges2_kg: "",
      DNATA_clearance_charges2: "",
      //OBC
      OBC_clearance_charges: "",
      OBC_clearance_charges_num1: "",
      OBC_clearance_charges_num2: "",
      OBC_addl_weight_charges_kg: "",
      OBC_addl_weight_charges: "",
      OBC_clearance_charges2_kg: "",
      OBC_clearance_charges2: "",
      //End content
      SAT_express_charges_kg: "",
      SAT_express_charges: "",
      ground_handling_fee_kg: "",
      ground_handling_fee: "",
      exception_clearance_charges_kg: "",
      exception_clearance_charges: "",
      //COD Charges
      cash_on_delivery_percent: "",
      cash_on_delivery_charge: "",
      //Other Charges
      credit_terms: "",
      deposit_amount: "",
      intrest_percent: "",
    },
    currency: [
      { name: "SGD Singapore Dollars", key: "CU" },
      { name: "USD American Dollars", key: "CU" },
    ],
    SalesDialogCategories: [
      { name: "Delivery Weight and Addl.Charges", key: "CU" },
      { name: "Delivery Charges", key: "IU" },
      { name: "Same Address (Per Address)", key: "CU1" },
    ],
    SalesDialogCategoriesCleranceCharges: [
      { name: "Clearance Charges and Addl.Charges", key: "CU" },
      { name: "Clearance Charges", key: "IU" },
    ],
    SalesDialogCategoriesDNATA_CleranceCharges: [
      { name: "DNATA Clearance Charges and Addl.Charges", key: "CU" },
      { name: "DNATA Clearance Charges", key: "IU" },
    ],
    SalesDialogCategoriesOBC_CleranceCharges: [
      { name: "OBC Clearance Charges and Addl.Charges", key: "CU" },
      { name: "OBC Clearance Charges", key: "IU" },
    ],
    AgentDialogCategories: [
      { name: "Resi Delivery Weight and Addl.Charges", key: "CU" },
      { name: "Resi Delivery Charges", key: "IU" },
      { name: "Same Address (Per Address)", key: "CU" },
    ],
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          currency: { required },

          // day_details:this.salesValidation,
          Document: {
            clearanceDetails: this.clearanceValidationGet.Document,
            day_details: this.validationGet.Document,
            //COD Charges
            cash_on_delivery_percent: { required },
            cash_on_delivery_charge: { required },
            //Other Charges
            credit_terms: { required },
          },
          Parcel: {
            clearanceDetails: this.clearanceValidationGet.Parcel,
            day_details: this.validationGet.Parcel,
            //COD Charges
            cash_on_delivery_percent: { required },
            cash_on_delivery_charge: { required },
            //Other Charges
            credit_terms: { required },
          },
          //Same-day
        },
      };
    }
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  methods: {
    ...mapActions({
      getSurchargesList: "salesInternationalAgent/getSurchargesList",
      getClearanceMode: "salesInternationalAgent/getClearanceMode",
      setPostData: "salesInternationalAgent/setPayloadPostData",
      setAgentStep: "salesInternationalAgent/setAgentStep",
      getOtherCharges: "salesInternationalAgent/getOtherCharges",
    }),
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentThirdStep",
      });
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    rowClass() {
      return "formRows";
    },
    onCellEditComplete(event) {
      let { data, newValue, field } = event;
      data[field] = newValue;
    },
    deleteDelivery(type, section, subSection, index1, removeIndex, typeSec) {
      if (typeSec === 1) {
        this.details[type].clearanceDetails[index1][section][subSection].splice(
          removeIndex,
          1
        );
        this.clearanceValidationGet[type][index1][section][subSection].splice(
          removeIndex,
          1
        );
      } else {
        this.details[type].day_details[index1][section][subSection].splice(
          removeIndex,
          1
        );
        this.validationGet[type][index1][section][subSection].splice(
          removeIndex,
          1
        );
      }
    },
    onChange(e) {
      this.renderKey++;
    },
    onChange1(e) {
      this.useSame();
      this.renderKey++;
    },
    async otherCharges() {
      let res = await this.getOtherCharges();
      if (res) {
        res.data.results.map((i) => {
          this.details.otherCharges.push({
            name: i.rate_name,
            per_kg: i.per_kg_rate,
            charges: i.min_charge,
            id: i.id,
          });
          this.otherChargesValid.push({
            per_kg: { required },
            charges: { required },
          });
        });
      }
    },
    saveDetails() {
      this.types.map((typesValue) => {
        this.details.days.map((list) => {
          this.details[typesValue].day_details.push({
            ["name"]: list,
            first: {
              delivery_weight_charges: [
                {
                  ["delivery_weight_num1"]: "",
                  ["delivery_weight_num2"]: "",
                  ["delivery_weight_charges"]: "",
                },
              ],
              ["delivery_weight_addl_charges"]: "",
              ["delivery_weight_addl_charges_kg"]: "",
              ["delivery_weight_charges3_kg"]: "",
              ["delivery_weight_charges3"]: "",
              ["same_address_charges_kg"]: "",
              ["same_address_charges"]: "",
            },
            second: {
              resi_delivery_weight_charges: [
                {
                  ["resi_delivery_weight_num1"]: "",
                  ["resi_delivery_weight_num2"]: "",
                  ["resi_delivery_weight_charges"]: "",
                },
              ],

              ["resi_delivery_weight_addl_charges_kg"]: "",
              ["resi_delivery_weight_addl_charges"]: "",
              ["resi_delivery_charges_kg"]: "",
              ["resi_delivery_charges"]: "",
              ["resi_same_address_charges_kg"]: "",
              ["resi_same_address_charges"]: "",
            },
            ["no_of_attempt"]: "0",
            ["no_of_attempt_charges"]: "0",
            ["category"]: "Delivery Weight and Addl.Charges",
            ["res_category"]: "Resi Delivery Weight and Addl.Charges",
          });
          this.validationGet[typesValue].push({
            first: {
              delivery_weight_charges: [
                {
                  ["delivery_weight_charges"]: { required },
                  ["delivery_weight_num1"]: { required },
                  ["delivery_weight_num2"]: { required },
                },
              ],
              //  ["delivery_weight_charges"]: { required },
              // ["delivery_weight_charges2"]: { required },
              ["delivery_weight_addl_charges"]: { required },
              ["delivery_weight_addl_charges_kg"]: { required },
              // ["delivery_weight_charges3_kg"]: { required },
              // ["delivery_weight_charges3"]: { required },
              // ["same_address_charges_kg"]: { required },
              // ["same_address_charges"]: { required },
            },
            second: {
              resi_delivery_weight_charges: [
                {
                  ["resi_delivery_weight_charges"]: { required },
                  ["resi_delivery_weight_num1"]: { required },
                  ["resi_delivery_weight_num2"]: { required },
                },
              ],

              ["resi_delivery_weight_addl_charges_kg"]: { required },
              ["resi_delivery_weight_addl_charges"]: { required },
              // ["resi_delivery_charges_kg"]: { required },
              // ["resi_delivery_charges"]: { required },
              // ["resi_same_address_charges_kg"]: { required },
              // ["resi_same_address_charges"]: { required },
            },

            ["no_of_attempt"]: { required },
            ["no_of_attempt_charges"]: { required },
          });
        });
      });
      this.addSalesClicked++;
    },
    setSameDayCategory(e) {
      this.details.sameday_category = e;
    },
    async getSurcharges() {
      let res = await this.getSurchargesList();

      this.types.map((typesValue) => {
        res.data.results.map((list) => {
          this.surchargesList[typesValue].push({
            delivery_name: list.rate_name,
            charges: list.rate_charges,
            id: list.id,
          });
        });
      });
    },
    async getClearance() {
      let res = await this.getClearanceMode();

      //  this.details.clearance= res.data.results;
      res.data.results.map((list) => {
        this.details.clearance.push(list.clearance_mode_name);
      });
      this.selectedIndex = this.details.clearance[0];
      this.types.map((typesValue) => {
        res.data.results.map((list) => {
          //  this.details.clearance.push(list.clearance_mode_name);
          let otherCharges = [];
          this.details.otherCharges.map((p) => {
            otherCharges.push({
              name: p.name,
              per_kg: p.per_kg,
              charges: p.charges,
              id: p.id,
            });
          });
          let clearance_range = [];
          let clearance_range_valid = [];
          let addl_charge = list.additional_clearance[0];
          let clearance_charge = list.clearance[0];
          list.rates.map((u) => {
            clearance_range.push({
              ["clearance_charges"]: u.rate ? u.rate : "0",
              ["clearance_charges_num1"]: u.min_weight ? u.min_weight : "0",
              ["clearance_charges_num2"]: u.max_weight ? u.max_weight : "0",
            });
            clearance_range_valid.push({
              ["clearance_charges"]: { required },
              ["clearance_charges_num1"]: { required },
              ["clearance_charges_num2"]: { required },
            });
          });
          this.details[typesValue].clearanceDetails.push({
            ["name"]: list.clearance_mode_name,
            first: {
              clearance_charges: clearance_range,

              ["every_addl_weight_charges_kg"]: addl_charge.weight
                ? addl_charge.weight
                : "0",
              ["every_addl_weight_charges"]: addl_charge.rate
                ? addl_charge.rate
                : "0",
              ["clearance_charges2_kg"]: clearance_charge.rate_per_kg
                ? clearance_charge.rate_per_kg
                : "0",
              ["clearance_charges2"]: clearance_charge.minimum_rate
                ? clearance_charge.minimum_rate
                : "0",
            },
            otherCharges: otherCharges,
            ["SAT_express_charges_kg"]: "",
            ["SAT_express_charges"]: "",
            ["ground_handling_fee_kg"]: "",
            ["ground_handling_fee"]: "",
            ["exception_clearance_charges_kg"]: "",
            ["exception_clearance_charges"]: "",
            category: "Clearance Charges and Addl.Charges",
          });

          this.clearanceValidationGet[typesValue].push({
            first: {
              clearance_charges: clearance_range_valid,

              ["every_addl_weight_charges_kg"]: { required },
              ["every_addl_weight_charges"]: { required },
            },
            // clearance_charges:{},

            // ["clearance_charges2_kg"]:{ required },
            // ["clearance_charges2"]:{ required },
            otherCharges: this.otherChargesValid,
            // ["SAT_express_charges_kg"]: { required },
            // ["SAT_express_charges"]: { required },
            // ["ground_handling_fee_kg"]: { required },
            // ["ground_handling_fee"]: { required },
            // ["exception_clearance_charges_kg"]: { required },
            // ["exception_clearance_charges"]: { required },
          });
          this.addSalesClicked++;
        });
      });
    },
    onChangeValue(l, e, t, f) {
      if (e === "Delivery Charges") {
        let data = {
          ...this.validationGet[f][t],
          first: {
            ["delivery_weight_charges3_kg"]: { required },
            ["delivery_weight_charges3"]: { required },
          },
        };
        this.validationGet[f][t] = data;
      } else if (e === "Same Address (Per Address)") {
        this.validationGet[f][t] = {
          ...this.validationGet[f][t],
          first: {
            ["same_address_charges_kg"]: { required },
            ["same_address_charges"]: { required },
          },
        };
      } else {
        this.details[f].day_details[t].first.delivery_weight_charges = [
          {
            ["delivery_weight_num1"]: "",
            ["delivery_weight_num2"]: "",
            ["delivery_weight_charges"]: "",
          },
        ];
        this.validationGet[f][t] = {
          ...this.validationGet[f][t],
          first: {
            delivery_weight_charges: [
              {
                ["delivery_weight_charges"]: { required },
                ["delivery_weight_num1"]: { required },
                ["delivery_weight_num2"]: { required },
              },
            ],
            ["delivery_weight_addl_charges"]: { required },
            ["delivery_weight_addl_charges_kg"]: { required },
          },
        };
      }
      // (this.details[f].day_details[t].first = {
      //   delivery_weight_charges: [
      //     {
      //       ["delivery_weight_num1"]: "",
      //       ["delivery_weight_num2"]: "",
      //       ["delivery_weight_charges"]: "",
      //     },
      //   ],
      //   ["delivery_weight_addl_charges"]: "",
      //   ["delivery_weight_addl_charges_kg"]: "",
      //   ["delivery_weight_charges3_kg"]: "",
      //   ["delivery_weight_charges3"]: "",
      //   ["same_address_charges_kg"]: "",
      //   ["same_address_charges"]: "",
      // }),
      this.addSalesClicked++;
    },
    onChangeValueResi(l, e, t, f) {
      if (e === "Resi Delivery Charges") {
        let data = {
          ...this.validationGet[f][t],
          second: {
            ["resi_delivery_charges_kg"]: { required },
            ["resi_delivery_charges"]: { required },
          },
        };
        this.validationGet[f][t] = data;
      } else if (e === "Same Address (Per Address)") {
        this.validationGet[f][t] = {
          ...this.validationGet[f][t],
          second: {
            ["resi_same_address_charges_kg"]: { required },
            ["resi_same_address_charges"]: { required },
          },
        };
      } else {
        this.details[f].day_details[t].second.resi_delivery_weight_charges = [
          {
            ["resi_delivery_weight_num1"]: "",
            ["resi_delivery_weight_num2"]: "",
            ["resi_delivery_weight_charges"]: "",
          },
        ];
        this.validationGet[f][t] = {
          ...this.validationGet[f][t],
          second: {
            resi_delivery_weight_charges: [
              {
                ["resi_delivery_weight_num1"]: { required },
                ["resi_delivery_weight_num2"]: { required },
                ["resi_delivery_weight_charges"]: { required },
              },
            ],
            ["resi_delivery_weight_addl_charges_kg"]: { required },
            ["resi_delivery_weight_addl_charges"]: { required },
          },
        };
      }
      // (this.details[f].day_details[t].second = {
      //   resi_delivery_weight_charges: [
      //     {
      //       ["resi_delivery_weight_num1"]: "",
      //       ["resi_delivery_weight_num2"]: "",
      //       ["resi_delivery_weight_charges"]: "",
      //     },
      //   ],

      //   ["resi_delivery_weight_addl_charges_kg"]: "",
      //   ["resi_delivery_weight_addl_charges"]: "",
      //   ["resi_delivery_charges_kg"]: "",
      //   ["resi_delivery_charges"]: "",
      //   ["resi_same_address_charges_kg"]: "",
      //   ["resi_same_address_charges"]: "",
      // }),
      this.addSalesClicked++;
    },
    onChangeValueClearance(l, e, index, type, items) {
      if (e === "Clearance Charges") {
        let data = {
          ...this.clearanceValidationGet[type][index],
          first: {
            ["clearance_charges2_kg"]: { required },
            ["clearance_charges2"]: { required },
          },
        };
        this.clearanceValidationGet[type][index] = data;
      } else {
        let clearance_range_valid = [];
        items.map((u) => {
          clearance_range_valid.push({
            ["clearance_charges"]: { required },
            ["clearance_charges_num1"]: { required },
            ["clearance_charges_num2"]: { required },
          });
        });
        // this.details[type].clearanceDetails[index].first.clearance_charges = [
        //   {
        //     ["clearance_charges"]: "",
        //     ["clearance_charges_num1"]: "",
        //     ["clearance_charges_num2"]: "",
        //   },
        // ];
        this.clearanceValidationGet[type][index] = {
          ...this.clearanceValidationGet[type][index],
          first: {
            clearance_charges: clearance_range_valid,

            ["every_addl_weight_charges_kg"]: { required },
            ["every_addl_weight_charges"]: { required },
          },
        };
      }
      // this.details[type].clearanceDetails[index].first = {
      //   clearance_charges: [
      //     {
      //       ["clearance_charges"]: "",
      //       ["clearance_charges_num1"]: "",
      //       ["clearance_charges_num2"]: "",
      //     },
      //   ],

      //   ["every_addl_weight_charges_kg"]: "",
      //   ["every_addl_weight_charges"]: "",
      //   ["clearance_charges2_kg"]: "",
      //   ["clearance_charges2"]: "",
      // };
      this.addSalesClicked++;
    },
    addDelivery(type, index) {
      this.details[type].day_details[
        index
      ]?.first?.delivery_weight_charges.push({
        ["delivery_weight_num1"]: "",
        ["delivery_weight_num2"]: "",
        ["delivery_weight_charges"]: "",
      });
      let data =
        this.validationGet[type][index].first.delivery_weight_charges ?? [];
      data.push({
        ["delivery_weight_charges"]: { required },
        ["delivery_weight_num1"]: { required },
        ["delivery_weight_num2"]: { required },
      });
      this.validationGet[type][index].first.delivery_weight_charges = data;
      this.addSalesClicked++;
    },
    addDeliveryResi(type, index) {
      this.details[type].day_details[
        index
      ]?.second?.resi_delivery_weight_charges.push({
        ["delivery_weight_num1"]: "",
        ["delivery_weight_num2"]: "",
        ["delivery_weight_charges"]: "",
      });
      let data =
        this.validationGet[type][index].second?.resi_delivery_weight_charges ??
        [];
      data.push({
        ["resi_delivery_weight_charges"]: { required },
        ["resi_delivery_weight_num1"]: { required },
        ["resi_delivery_weight_num2"]: { required },
      });
      this.validationGet[type][index].second.resi_delivery_weight_charges =
        data;
      this.addSalesClicked++;
    },
    addClearance(type, index) {
      this.details[type].clearanceDetails[index]?.first?.clearance_charges.push(
        {
          ["clearance_charges"]: "",
          ["clearance_charges_num1"]: "",
          ["clearance_charges_num2"]: "",
        }
      );
      let data =
        this.clearanceValidationGet[type][index].first.clearance_charges ?? [];
      data.push({
        ["clearance_charges"]: { required },
        ["clearance_charges_num1"]: { required },
        ["clearance_charges_num2"]: { required },
      });
      this.clearanceValidationGet[type][index].first.clearance_charges = data;
      this.addSalesClicked++;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let { currency, sameCharges } = this.details;
      if (this.v$?.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$?.$invalid) {
        let costingDetails = [];
        this.types.map((type) => {
          let delivery_charge_days = [];
          let clearance_data = [];
          let sur_data = [];
          this.details["selectedSurcharges" + type]?.map((u) => {
            sur_data.push({
              delivery_name: u.delivery_name,
              charge: u.charges,
              surcharge_id: u.id,
              selected: true,
            });
          });
          this.details[type].day_details.map((i) => {
            let delivery_range = [];
            let resi_delivery_range = [];
            let delivery1 = false;
            let delivery2 = false;
            let delivery3 = false;
            let delivery_weight = "";
            let delivery_charge = "";
            if (i.category === "Delivery Weight and Addl.Charges") {
              delivery1 = true;
              delivery_weight = i.first.delivery_weight_addl_charges_kg;
              delivery_charge = i.first.delivery_weight_addl_charges;
            } else if (i.category === "Delivery Charges") {
              delivery2 = true;
              delivery_weight = i.first.delivery_weight_charges3_kg;
              delivery_charge = i.first.delivery_weight_charges3;
            } else {
              delivery3 = true;
              delivery_weight = i.first.same_address_charges_kg;
              delivery_charge = i.first.same_address_charges;
            }
            let delivery11 = false;
            let delivery21 = false;
            let delivery31 = false;
            let delivery_weight1 = "";
            let delivery_charge1 = "";
            if (i.res_category === "Resi Delivery Weight and Addl.Charges") {
              delivery11 = true;
              delivery_weight1 = i.second.resi_delivery_weight_addl_charges_kg;
              delivery_charge1 = i.second.resi_delivery_weight_addl_charges;
            } else if (i.res_category === "Resi Delivery Charges") {
              delivery21 = true;
              delivery_weight1 = i.second.resi_delivery_charges_kg;
              delivery_charge1 = i.second.resi_delivery_charges;
            } else {
              delivery31 = true;
              delivery_weight1 = i.second.resi_same_address_charges_kg;
              delivery_charge1 = i.second.resi_same_address_charges;
            }
            i.first.delivery_weight_charges.map((k) => {
              delivery_range.push({
                min_weight: k.delivery_weight_num1,
                max_weight: k.delivery_weight_num2,
                charge: k.delivery_weight_charges,
              });
            });
            i.second.resi_delivery_weight_charges.map((k) => {
              resi_delivery_range.push({
                resident_min_weight: k.resi_delivery_weight_num1,
                resident_max_weight: k.resi_delivery_weight_num2,
                resident_charge: k.resi_delivery_weight_charges,
              });
            });
            delivery_charge_days.push({
              delivery_type: i.name,
              charge_type: "additional",
              delivery_additional_charge_types: delivery1,
              delivery_type_charges: delivery2,
              same_day_delivery_type: delivery3,
              weight: delivery_weight,
              charge: delivery_charge,
              resident_charge_type: "additional",
              resi_delivery_additional_charge_types: delivery11,
              resi_delivery_type_charges: delivery21,
              resi_same_day_delivery_type: delivery31,
              resi_weight: delivery_weight1,
              resi_charge: delivery_charge1,
              attempts: i.no_of_attempt,
              attempt_charges: i.no_of_attempt_charges,
              delivery_ranges: delivery_range,
              resident_ranges: resi_delivery_range,
            });
          });
          this.details[type].clearanceDetails.map((i) => {
            let clearance_range = [];
            let other_data = [];
            let delivery1 = false;
            let delivery2 = false;
            let delivery_weight = "";
            let delivery_charge = "";
            if (i.category === "Clearance Charges and Addl.Charges") {
              delivery1 = true;
              delivery_weight = i.first.every_addl_weight_charges_kg;
              delivery_charge = i.first.every_addl_weight_charges;
            } else {
              delivery2 = true;
              delivery_weight = i.first.clearance_charges2_kg;
              delivery_charge = i.first.clearance_charges2;
            }
            i.first.clearance_charges.map((k) => {
              clearance_range.push({
                min_weight: k.clearance_charges_num1,
                max_weight: k.clearance_charges_num2,
                charge: k.clearance_charges,
              });
            });
            i.otherCharges.map((i) => {
              other_data.push({
                other_clearance_charge_id: i.id,
                other_charge_type: i.name,
                other_charge_weight: i.per_kg,
                other_min_charge: i.charges,
              });
            });
            clearance_data.push({
              clearance_type: i.name,
              clearance_charge_type: "additional",
              clearance_type_charges: delivery2,
              clearance_additional_type_charges: delivery1,
              clearance_weight: delivery_weight,
              clearance_charge: delivery_charge,
              // sat_express_weight: i.SAT_express_charges_kg,
              // sat_express_charge: i.SAT_express_charges,
              // ground_holding_weight: i.ground_handling_fee_kg,
              // ground_holding_charge: i.ground_handling_fee,
              // exception_clearance_weight: i.exception_clearance_charges_kg,
              // exception_clearance_charge: i.exception_clearance_charges,
              clearance_charges: clearance_range,
              other_clearance_charges: other_data,
            });
          });
          costingDetails.push({
            item_type: type,
            cod_charge_percent: this.details[type].cash_on_delivery_percent,
            cod_charge: this.details[type].cash_on_delivery_charge,
            other_charge_credit_days: this.details[type].credit_terms,
            other_charge_deposit_amount: this.details[type].deposit_amount,
            other_charge_interest_percent: this.details[type].intrest_percent,
            delivery_charge: delivery_charge_days,
            surcharges: sur_data,
            clearance: clearance_data,
          });
        });

        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            costings: {
              currency: currency,
              same_document_charges_for_parcel: sameCharges,
              costing_types: costingDetails,
            },
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesInternationalAgent.agentStep++;
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentFifthStep",
        });
      }
    },
    useSameDays() {
      if (this.details["applyAll" + this.selectedType]) {
        let config = this.details.Document.day_details[0];
        let vl = [];
        this.details.Document.day_details.map((e, index) => {
          let i = this.details.Document.day_details[0];
          if (index != 0) {
            let resi = [];
            let delivery = [];
            i.first.delivery_weight_charges.map((n) => {
              delivery.push({
                delivery_weight_num1: n.delivery_weight_num1,
                delivery_weight_num2: n.delivery_weight_num2,
                delivery_weight_charges: n.delivery_weight_charges,
              });
            });
            i.second.resi_delivery_weight_charges.map((n) => {
              resi.push({
                resi_delivery_weight_num1: n.resi_delivery_weight_num1,
                resi_delivery_weight_num2: n.resi_delivery_weight_num2,
                resi_delivery_weight_charges: n.resi_delivery_weight_charges,
              });
            });
            let object = {
              ["name"]: e.name,
              first: {
                delivery_weight_charges: delivery,
                ["delivery_weight_addl_charges"]:
                  i.first.delivery_weight_addl_charges,
                ["delivery_weight_addl_charges_kg"]:
                  i.first.delivery_weight_addl_charges_kg,
                ["delivery_weight_charges3_kg"]:
                  i.first.delivery_weight_charges3_kg,
                ["delivery_weight_charges3"]: i.first.delivery_weight_charges3,
                ["same_address_charges_kg"]: i.first.same_address_charges_kg,
                ["same_address_charges"]: i.first.same_address_charges,
              },
              second: {
                resi_delivery_weight_charges: resi,

                ["resi_delivery_weight_addl_charges_kg"]:
                  i.second.resi_delivery_weight_addl_charges_kg,
                ["resi_delivery_weight_addl_charges"]:
                  i.second.resi_delivery_weight_addl_charges,
                ["resi_delivery_charges_kg"]: i.second.resi_delivery_charges_kg,
                ["resi_delivery_charges"]: i.second.resi_delivery_charges,
                ["resi_same_address_charges_kg"]:
                  i.second.resi_same_address_charges_kg,
                ["resi_same_address_charges"]:
                  i.second.resi_same_address_charges,
              },
              ["no_of_attempt"]: i.no_of_attempt,
              ["no_of_attempt_charges"]: i.no_of_attempt_charges,
              ["category"]: i.category,
              ["res_category"]: i.res_category,
            };
            vl.push(object);
          } else {
            vl.push(i);
          }
        });
        this.details.Document.day_details = [];
        this.details.Document.day_details = vl;
        //     this.details.Document.day_details[1]={
        //       ...config,
        //       name:"Next Day",
        //     }
        this.validationGet.Document[1] = this.validationGet.Document[0];
        //  this.details.Document.day_details[2]={
        //       ...config,
        //       name:"Regular",
        //     }
        this.validationGet.Document[2] = this.validationGet.Document[0];
      } else {
        let data = this.details.Document.day_details;
        this.details.Document.day_details = data;
      }
      // this.renderKey++;
    },
    useSame(e) {
      if (this.details.sameCharges) {
        this.details.applyAllParcel = this.details.applyAllDocument;
        this.details.Parcel.day_details = this.details.Document.day_details;

        this.details.Parcel.clearanceDetails =
          this.details.Document.clearanceDetails;

        (this.selectedIndex = this.details.clearance[0]),
          (this.details.Parcel.cash_on_delivery_percent =
            this.details.Document.cash_on_delivery_percent),
          (this.details.Parcel.cash_on_delivery_charge =
            this.details.Document.cash_on_delivery_charge),
          //Other Charges
          (this.details.Parcel.credit_terms =
            this.details.Document.credit_terms),
          (this.details.Parcel.deposit_amount =
            this.details.Document.deposit_amount),
          (this.details.Parcel.intrest_percent =
            this.details.Document.intrest_percent);
        this.details.selectedSurchargesParcel =
          this.details.selectedSurchargesDocument;
        this.clearanceValidationGet.Parcel =
          this.clearanceValidationGet.Document;
        this.validationGet.Parcel = this.validationGet.Document;
      }
      //       else {
      //         this.details.Parcel.day_details = [];
      //         this.details.Parcel.clearanceDetails = [];
      //         this.details.days.map((list) => {
      //           this.details.Parcel.day_details.push({
      //             ["name"]: list,
      //             first: {
      //               delivery_weight_charges: [
      //                 {
      //                   ["delivery_weight_num1"]: "",
      //                   ["delivery_weight_num2"]: "",
      //                   ["delivery_weight_charges"]: "",
      //                 },
      //               ],
      //               ["delivery_weight_addl_charges"]: "",
      //               ["delivery_weight_addl_charges_kg"]: "",
      //               ["delivery_weight_charges3_kg"]: "",
      //               ["delivery_weight_charges3"]: "",
      //               ["same_address_charges_kg"]: "",
      //               ["same_address_charges"]: "",
      //             },
      //             second: {
      //               resi_delivery_weight_charges: [
      //                 {
      //                   ["resi_delivery_weight_num1"]: "",
      //                   ["resi_delivery_weight_num2"]: "",
      //                   ["resi_delivery_weight_charges"]: "",
      //                 },
      //               ],

      //               ["resi_delivery_weight_addl_charges_kg"]: "",
      //               ["resi_delivery_weight_addl_charges"]: "",
      //               ["resi_delivery_charges_kg"]: "",
      //               ["resi_delivery_charges"]: "",
      //               ["resi_same_address_charges_kg"]: "",
      //               ["resi_same_address_charges"]: "",
      //             },
      //             ["no_of_attempt"]: "0",
      //             ["no_of_attempt_charges"]: "0",
      //             ["category"]: "Delivery Weight and Addl.Charges",
      //             ["res_category"]: "Resi Delivery Weight and Addl.Charges",
      //           });
      //         });
      //         this.details.clearance.map((list) => {
      //           let otherCharges =[]
      //           this.details.otherCharges.map((p)=>{
      // otherCharges.push({
      //               name: p.name,
      //               per_kg:p.per_kg,
      //               charges:p.charges,
      //               id:p.id
      //             })
      //           })
      //           this.details.Parcel.clearanceDetails.push({
      //             ["name"]: list,
      //             first: {
      //               clearance_charges: [
      //                 {
      //                   ["clearance_charges"]: "",
      //                   ["clearance_charges_num1"]: "",
      //                   ["clearance_charges_num2"]: "",
      //                 },
      //               ],

      //               ["every_addl_weight_charges_kg"]: "",
      //               ["every_addl_weight_charges"]: "",
      //               ["clearance_charges2_kg"]: "",
      //               ["clearance_charges2"]: "",
      //             },
      //             otherCharges: otherCharges,

      //             // ["SAT_express_charges_kg"]: "",
      //             // ["SAT_express_charges"]: "",
      //             // ["ground_handling_fee_kg"]: "",
      //             // ["ground_handling_fee"]: "",
      //             // ["exception_clearance_charges_kg"]: "",
      //             // ["exception_clearance_charges"]: "",
      //             category: "Clearance Charges and Addl.Charges",
      //           });
      //         });

      //         (this.selectedIndex = this.details.clearance[0]),
      //           (this.details.Parcel.cash_on_delivery_percent = "");
      //         this.details.Parcel.cash_on_delivery_charge = "";
      //         //Other Charges
      //         this.details.Parcel.credit_terms = "";
      //         this.details.Parcel.deposit_amount = "";
      //         this.details.Parcel.intrest_percent = "";
      //         this.details.selectedSurchargesParcel = [];
      //       }
      this.renderKey++;
    },
    prefillData() {
      this.details.currency =
        this.quotationData.international_agent_specifics.costings?.currency ??
        "";
      this.details.sameCharges =
        this.quotationData.international_agent_specifics?.costings
          ?.same_document_charges_for_parcel ?? false;
      this.quotationData.international_agent_specifics.costings.costing_types.map(
        (l) => {
          l.delivery_charge.map((u) => {
            let deliveryRange = [];
            let resi_deliveryRange = [];
            let delivery_category = "";
            let resi_delivery_category = "";
            let firstValid = {};
            let secondValid = {};
            if (u.delivery_additional_charge_types) {
              delivery_category = "Delivery Weight and Addl.Charges";
              firstValid = {
                delivery_weight_charges: [
                  {
                    ["delivery_weight_charges"]: { required },
                    ["delivery_weight_num1"]: { required },
                    ["delivery_weight_num2"]: { required },
                  },
                ],
                ["delivery_weight_addl_charges"]: { required },
                ["delivery_weight_addl_charges_kg"]: { required },
              };
            } else if (u.delivery_type_charges) {
              delivery_category = "Delivery Charges";
              firstValid = {
                ["delivery_weight_charges3_kg"]: { required },
                ["delivery_weight_charges3"]: { required },
              };
            } else {
              delivery_category = "Same Address (Per Address)";
              firstValid = {
                ["same_address_charges_kg"]: { required },
                ["same_address_charges"]: { required },
              };
            }
            if (u.resi_delivery_additional_charge_types) {
              resi_delivery_category = "Resi Delivery Weight and Addl.Charges";
              secondValid = {
                resi_delivery_weight_charges: [
                  {
                    ["resi_delivery_weight_num1"]: { required },
                    ["resi_delivery_weight_num2"]: { required },
                    ["resi_delivery_weight_charges"]: { required },
                  },
                ],
                ["resi_delivery_weight_addl_charges_kg"]: { required },
                ["resi_delivery_weight_addl_charges"]: { required },
              };
            } else if (u.resi_delivery_type_charges) {
              resi_delivery_category = "Resi Delivery Charges";
              secondValid = {
                ["resi_delivery_charges_kg"]: { required },
                ["resi_delivery_charges"]: { required },
              };
            } else {
              resi_delivery_category = "Same Address (Per Address)";
              secondValid = {
                ["resi_same_address_charges_kg"]: { required },
                ["resi_same_address_charges"]: { required },
              };
            }
            u.delivery_ranges.map((i) => {
              deliveryRange.push({
                delivery_weight_num1: i.min_weight,
                delivery_weight_num2: i.max_weight,
                delivery_weight_charges: i.charge,
              });
            });
            u.resident_ranges.map((i) => {
              resi_deliveryRange.push({
                resi_delivery_weight_num1: i.resident_min_weight,
                resi_delivery_weight_num2: i.resident_max_weight,
                resi_delivery_weight_charges: i.resident_charge,
              });
            });
            this.details[l.item_type].day_details.push({
              name: u.delivery_type,
              first: {
                delivery_weight_charges: deliveryRange,
                delivery_weight_addl_charges: u.delivery_additional_charge_types
                  ? u.charge
                  : "",
                delivery_weight_addl_charges_kg:
                  u.delivery_additional_charge_types ? u.weight : "",
                delivery_weight_charges3_kg: u.delivery_type_charges
                  ? u.weight
                  : "",
                delivery_weight_charges3: u.delivery_type_charges
                  ? u.charge
                  : "",
                same_address_charges_kg: u.same_day_delivery_type
                  ? u.weight
                  : "",
                same_address_charges: u.same_day_delivery_type ? u.charge : "",
              },
              second: {
                resi_delivery_weight_charges: resi_deliveryRange,

                resi_delivery_weight_addl_charges_kg:
                  u.resi_delivery_additional_charge_types ? u.resi_weight : "",
                resi_delivery_weight_addl_charges:
                  u.resi_delivery_additional_charge_types ? u.resi_charge : "",
                resi_delivery_charges_kg: u.resi_delivery_type_charges
                  ? u.resi_weight
                  : "",
                resi_delivery_charges: u.resi_delivery_type_charges
                  ? u.resi_charge
                  : "",
                resi_same_address_charges_kg: u.resi_same_day_delivery_type
                  ? u.resi_weight
                  : "",
                resi_same_address_charges: u.resi_same_day_delivery_type
                  ? u.resi_charge
                  : "",
              },
              no_of_attempt: u.attempts,
              no_of_attempt_charges: u.attempt_charges,
              category: delivery_category,
              res_category: resi_delivery_category,
            });
            this.validationGet[l.item_type].push({
              first: firstValid,
              second: secondValid,

              no_of_attempt: { required },
              no_of_attempt_charges: { required },
            });
            this.addSalesClicked++;
          });
          l.clearance.map((u) => {
            if (!this.details.clearance.includes(u.clearance_type)) {
              this.details.clearance.push(u.clearance_type);
            }

            let clearance_range = [];
            let other_range = [];
            let other_range_valid = [];
            u.clearance_charges.map((i) => {
              clearance_range.push({
                ["clearance_charges"]: i.charge,
                ["clearance_charges_num1"]: i.min_weight,
                ["clearance_charges_num2"]: i.max_weight,
              });
            });
            u.other_clearance_charges.map((p) => {
              other_range.push({
                name: p.other_charge_type,
                per_kg: p.other_charge_weight,
                charges: p.other_min_charge,
                id: p.other_clearance_charge_id,
              });
              other_range_valid.push({
                per_kg: { required },
                charges: { required },
              });
            });
            this.details[l.item_type].clearanceDetails.push({
              ["name"]: u.clearance_type,
              first: {
                clearance_charges: clearance_range,

                ["every_addl_weight_charges_kg"]:
                  u.clearance_additional_type_charges ? u.clearance_weight : "",
                ["every_addl_weight_charges"]:
                  u.clearance_additional_type_charges ? u.clearance_charge : "",
                ["clearance_charges2_kg"]: u.clearance_type_charges
                  ? u.clearance_weight
                  : "",
                ["clearance_charges2"]: u.clearance_type_charges
                  ? u.clearance_charge
                  : "",
              },
              otherCharges: other_range,
              // ["SAT_express_charges_kg"]: u.sat_express_weight,
              // ["SAT_express_charges"]: u.sat_express_charge,
              // ["ground_handling_fee_kg"]: u.ground_holding_weight,
              // ["ground_handling_fee"]: u.ground_holding_charge,
              // ["exception_clearance_charges_kg"]: u.exception_clearance_weight,
              // ["exception_clearance_charges"]: u.exception_clearance_charge,
              category: u.clearance_additional_type_charges
                ? "Clearance Charges and Addl.Charges"
                : "Clearance Charges",
            });

            this.clearanceValidationGet[l.item_type].push({
              first: u.clearance_additional_type_charges
                ? {
                    clearance_charges: [
                      {
                        ["clearance_charges"]: { required },
                        ["clearance_charges_num1"]: { required },
                        ["clearance_charges_num2"]: { required },
                      },
                    ],

                    ["every_addl_weight_charges_kg"]: { required },
                    ["every_addl_weight_charges"]: { required },
                  }
                : {
                    ["clearance_charges2_kg"]: { required },
                    ["clearance_charges2"]: { required },
                  },
              otherCharges: other_range_valid,
              // ["SAT_express_charges_kg"]: { required },
              // ["SAT_express_charges"]: { required },
              // ["ground_handling_fee_kg"]: { required },
              // ["ground_handling_fee"]: { required },
              // ["exception_clearance_charges_kg"]: { required },
              // ["exception_clearance_charges"]: { required },
            });
            this.addSalesClicked++;
          });
          (this.selectedIndex = this.details.clearance[0]),
            (this.details[l.item_type].cash_on_delivery_percent =
              l.cod_charge_percent),
            (this.details[l.item_type].cash_on_delivery_charge = l.cod_charge),
            //Other Charges
            (this.details[l.item_type].credit_terms =
              l.other_charge_credit_days),
            (this.details[l.item_type].deposit_amount =
              l.other_charge_deposit_amount),
            (this.details[l.item_type].intrest_percent =
              l.other_charge_interest_percent);

          let select_surcharges = [];
          this.surchargesList[l.item_type] = this.surchargesList[
            l.item_type
          ].map((i) => {
            l.surcharges.map((u) => {
              if (u.surcharge_id == i.id) {
                i.charges = u.charge;
                select_surcharges.push(i);
              }
            });
            return i;
          });
          // l.surcharges.map((i) => {
          //   select_surcharges.push({
          //     delivery_name: i.delivery_name,
          //     charges: i.charge,
          //     id: i.surcharge_id,
          //   });
          // });
          console.log(
            "this.surchargesList[l.item_type]",
            this.surchargesList[l.item_type]
          );
          this.details["selectedSurcharges" + l.item_type] = select_surcharges;
        }
      );
      this.renderKey++;
    },
  },

  async mounted() {
    await this.getSurcharges();
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.saveDetails(this.details.day_details);
      await this.otherCharges();
      this.getClearance();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-field-radiobutton > label {
  color: #212121;
  font-weight: 600;
  font-size: 14px;
  padding: 10px;
}

::v-deep .p-field-radiobutton {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  /* margin: 20px 25px 20px 0; */
  margin-top: 20px;
  margin-bottom: 10px;
}

::v-deep .Radio-button-design .p-field-radiobutton > label {
  color: #575757 !important;
  font-weight: 600;
  font-size: 14px;
}

.p-inputgroup-addon {
  min-height: 38px;
  background: #c4c4c4 0.2;
  padding: 0 20px;
  font-size: 14px !important;
  color: #7a7a7a !important;
  /* flex: none; */
}

/* .accord-field-style{
  background: rgba(243, 248, 255, 0.3);
  border: 1px solid #D0E4FF;
  margin:0 px;
  padding-left: 20px;
  width: 100%;
} */
::v-deep .p-accordion-content {
  padding-top: 0px !important;
  background: rgba(243, 248, 255, 0.3) !important;
  border: 1px solid #d0e4ff !important;
}

::v-deep .p-accordion-header-link {
  background: #eef4ff !important;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #343434;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
  padding: 10px;
  border-radius: 6px !important;
  border: none;
}

::v-deep .p-datatable .p-datatable-tbody > tr {
  background: #ffffff !important;
  border: 1px solid #cad1dd !important;
  padding: 0 10px;
  margin: 10px 0;
}

::v-deep .p-datatable .p-datatable-tbody > tr > td {
  color: #4e5968 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  border-radius: 6px !important;
  padding: 10px !important;
}

.duo-select-content {
  background: rgba(243, 248, 255, 0.3);
  border: 1px solid #d0e4ff;
  margin: 0;
}

::v-deep .p-inputnumber-buttons-stacked .p-inputnumber-input {
  min-height: 48px !important;
}

.p-inputnumber-input {
  width: 100% !important;
}

::v-deep .p-inputnumber-button-group > button {
  min-height: 24px !important;
}

::v-deep .p-inputtext {
  min-height: 48px !important;
}
.formRows {
  margin-top: 2% !important;
}
.formTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.formTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  border-radius: 5px;
  outline: thin !important;
  outline-style: dashed !important;
  outline-color: #cad1dd !important;
}
.formTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.formTable .p-column-title {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.formTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #edf1f7 !important;
}
.formTable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
}

:deep .p-inputnumber-input {
  padding: 5px !important;
}
</style>

<!-- <template>
<p>Hello</p>

</template>

<script>
export default {
  name: "SalesInternationalAgentFourthStep",
};
</script>

<style scoped>
</style> -->