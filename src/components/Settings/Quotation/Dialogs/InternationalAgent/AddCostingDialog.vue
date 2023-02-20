<template>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4 $color-343434">Costing Details</p>
  </div>
  <div class="formgrid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Currency</h5>
      <DropDown
        code="name"
        :data="currency"
        label="country"
        v-model="details.country"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="p-1 mt-2 mb-2">
    <DuoSelection
      :options="['Document', 'Parcels']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <Accordion :activeIndex="0">
    <AccordionTab header="Same Day">
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="SalesDialogCategories"
          v-model="selectedCategory"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Delivery weight Addl. Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <br />
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="AgentDialogCategories"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Addl.charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Resi.Delivery weight Addl.charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3 mt-1">
          <h5 class="dialog-label-text">No of Attempt</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Attempt</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
    </AccordionTab>
    <!-- Method  -->
    <AccordionTab header="Next Day">
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="SalesDialogCategories"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Delivery weight Addl. Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <br />
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="AgentDialogCategories"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Delivery weight Addl. Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3 mt-1">
          <h5 class="dialog-label-text">No of Attempt</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Attempt</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="Regular">
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="SalesDialogCategories"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Delivery weight Addl. Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <br />
      <div
        class="flex flex-row justify-content-between align-items-center ml-2"
      >
        <RadioButtons
          label="platform"
          state="radioButtonCompany"
          v-bind:radioButtonData="AgentDialogCategories"
        />
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-6">
          <h5 class="dialog-label-text mt-2 ml-2">Delivery weight Charges</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="field col-12 md:col-3">
              <NumberField
                v-model="details.name_of_profile"
                :showButtons="true"
                mode="number"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <TextField
                  label="contact_no"
                  type="number"
                  v-model="details.contact_no"
                  :classes="{
                    'p-invalid': v$.details.contact_no.$invalid && submitted,
                    'inputfield w-full dialog-field-text py-2': true,
                  }"
                />
                <span class="p-inputgroup-addon required">Charges</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Delivery weight Addl. Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <span class="new-field mt-0"><b>+ Add New </b></span>
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3 mt-1">
          <h5 class="dialog-label-text">No of Attempt</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Attempt</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
    </AccordionTab>

    <!-- Contract Setting -->
    <AccordionTab header="Surcharges">
      <div class="row ml-2 table_div">
        <div class="col-12">
          <keep-alive>
            <FormTable
              v-if="
                $store.state.quotation.internationalAgentDropDownTableDate !=
                null
              "
              :key="$store.state.quotation.internationalAgentDropDownTableDate"
              formTableDataName="inspectionsFormTableData"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="
                $store.state.quotation.internationalAgentDropDownTableDate &&
                $store.state.quotation &&
                $store.state.quotation.expressQuotationContactsTableData &&
                $store.state.quotation.expressQuotationContactsTableData
                  ? $store.state.quotation.expressQuotationContactsTableData
                  : []
              "
              :tableColumns="
                $store.state.quotation.internationalAgentDropDownTableColumns
              "
              storePath="quotation"
            />
          </keep-alive>
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="Clearance charges">
      <DuoSelection
        class="mb-4"
        :options="['AirFreight', 'DNATA', 'OBC']"
        :default="defaultTransportType"
        type="setRegionDeliveryTransportType"
      />
      <div v-if="defaultTransportType == 'AirFreight'">
        <div class="formgrid grid mt-1">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text mt-2 ml-2">Clearance Charges</h5>
            <div class="formgrid grid">
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="col-12 md:col-6">
                <div class="p-inputgroup">
                  <TextField
                    label="contact_no"
                    type="number"
                    v-model="details.contact_no"
                    :classes="{
                      'p-invalid': v$.details.contact_no.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                  <span class="p-inputgroup-addon required">Charges</span>
                </div>
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text unit_rates">
              Every Addl. Weight Charges
            </h5>
            <div class="p-inputgroup">
              <TextField
                label="contact_no"
                type="number"
                v-model="details.contact_no"
                :classes="{
                  'p-invalid': v$.details.contact_no.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">Kg</span>
            </div>
          </div>
          <div class="field col-12 md:col-3 mt-5">
            <div class="p-inputgroup">
              <TextField
                label="contact_no"
                type="number"
                v-model="details.contact_no"
                :classes="{
                  'p-invalid': v$.details.contact_no.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">Charges</span>
            </div>
          </div>
        </div>
        <div class="formgrid grid mt-1">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text mt-2 ml-2">Clearance Charges</h5>
            <div class="formgrid grid">
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="col-12 md:col-6">
                <div class="p-inputgroup">
                  <TextField
                    label="contact_no"
                    type="number"
                    v-model="details.contact_no"
                    :classes="{
                      'p-invalid': v$.details.contact_no.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                  <span class="p-inputgroup-addon required">Charges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DNATA -->
      <div v-if="defaultTransportType == 'DNATA'">
        <div class="formgrid grid mt-1">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text mt-2 ml-2">DNATA Clearance Charges</h5>
            <div class="formgrid grid">
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="col-12 md:col-6">
                <div class="p-inputgroup">
                  <TextField
                    label="contact_no"
                    type="number"
                    v-model="details.contact_no"
                    :classes="{
                      'p-invalid': v$.details.contact_no.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                  <span class="p-inputgroup-addon required">Charges</span>
                </div>
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="dialog-label-text unit_rates">
              Every Addl. Weight Charges
            </h5>
            <div class="p-inputgroup">
              <TextField
                label="contact_no"
                type="number"
                v-model="details.contact_no"
                :classes="{
                  'p-invalid': v$.details.contact_no.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">Kg</span>
            </div>
          </div>
          <div class="field col-12 md:col-3 mt-5">
            <div class="p-inputgroup">
              <TextField
                label="contact_no"
                type="number"
                v-model="details.contact_no"
                :classes="{
                  'p-invalid': v$.details.contact_no.$invalid && submitted,
                  'inputfield w-full dialog-field-text py-2': true,
                }"
              />
              <span class="p-inputgroup-addon required">Charges</span>
            </div>
          </div>
        </div>
        <div class="formgrid grid mt-1">
          <div class="field col-12 md:col-6">
            <h5 class="dialog-label-text mt-2 ml-2">Clearance Charges</h5>
            <div class="formgrid grid">
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="field col-12 md:col-3">
                <NumberField
                  v-model="details.name_of_profile"
                  :showButtons="true"
                  mode="number"
                />
              </div>
              <div class="col-12 md:col-6">
                <div class="p-inputgroup">
                  <TextField
                    label="contact_no"
                    type="number"
                    v-model="details.contact_no"
                    :classes="{
                      'p-invalid': v$.details.contact_no.$invalid && submitted,
                      'inputfield w-full dialog-field-text py-2': true,
                    }"
                  />
                  <span class="p-inputgroup-addon required">Charges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ends -->
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">SAT Express Charges</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">Ground Handling Fee</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">
            Exception Clearance Charges
          </h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Kg</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="COD charges">
      <div class="formgrid grid mt-1">
        <div class="field col-12 md:col-3">
          <h5 class="dialog-label-text unit_rates">Cash On Delivery</h5>
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">%</span>
          </div>
        </div>
        <div class="field col-12 md:col-3 mt-5">
          <div class="p-inputgroup">
            <TextField
              label="contact_no"
              type="number"
              v-model="details.contact_no"
              :classes="{
                'p-invalid': v$.details.contact_no.$invalid && submitted,
                'inputfield w-full dialog-field-text py-2': true,
              }"
            />
            <span class="p-inputgroup-addon required">Charges</span>
          </div>
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="Other charges">
      <div class="formgrid grid ml-3">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Credit Terms(Days)</h5>
          <TextField
            label="sales_commission"
            type="number"
            v-model="details.sales_commission"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Deposit Amount</h5>
          <TextField
            label="sales_commission"
            type="number"
            v-model="details.sales_commission"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Interest%</h5>
          <TextField
            label="sales_commission"
            type="number"
            v-model="details.sales_commission"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
  </Accordion>

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
import { required, email } from "@vuelidate/validators";
import DuoSelection from "../../DuoSelect.vue";
export default {
  name: "AddCostingDialog",
   data: () => ({
    v$: useVuelidate(),
    defaultTransportType: "AirFreight",
    details: {
      name_of_profile: "",
      short_name: "",
      address: "",
      pin_code: "",
      country: "",
      state: "",
      build_name: "",
      floor_no: "",
      unit_no: "",
      contact_name: "",
      contact_no: "",
      email: "",
      //   Method
      customer_type: "",
      business_type: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person: "",
      previously_served: "",
      sales_commission: "",
      standard_liability: "",
      volumetric_value: "",
      festival_name: "",
      package_detail: "",
      //   TRips
      region: "",
      rates: "",
      effective_start_date: "",
    },
    currency: [
      { name: "SGD Singapore Dollars", key: "CU" },
      { name: "USD American Dollars", key: "CU" },
    ],
    SalesDialogCategories: [
      { name: "Delivery Weight and Addl.Charges", key: "CU" },
      { name: "Delivery Charges", key: "IU" },
      { name: "Same Address (Per Address)", key: "CU" },
    ],
    AgentDialogCategories: [
      { name: "Resi Delivery Weight and Addl.Charges", key: "CU" },
      { name: "Resi Delivery Charges", key: "IU" },
      { name: "Same Address (Per Address)", key: "CU" },
    ],

    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    referral_person: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],
    festival_name: [
      { name: "Deepavali", code: "Deepavali" },
      { name: "Pongal", code: "Pongal" },
    ],
    previously_served: [
      { name: "Abc Company", code: "abc" },
      { name: "EFG", code: " efg" },
    ],
    customer_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    region: [
      { name: "Airport", code: "USD" },
      { name: "Railways", code: "SGD" },
    ],
    rates: [
      { name: "Rate Card1", code: "USD" },
      { name: "Rate Card2", code: "SGD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        name_of_profile: { required },
        short_name: { required },
        address: { required },
        pin_code: { required },
        country: { required },
        state: { required },
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
        // Methods
        customer_type: { required },
        business_type: { required },
        status: { required },
        package_detail: { required },
        festival_name: { required },
        priority: { required },
        previously_served: { required },
        // Trips
        region: { required },
        rates: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddQuestionnaireDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddPermitSettingsDialog",
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

<style></style>
