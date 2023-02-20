<template>
  <div class="mt-4 ml-2">
    <Accordion :key="renderKey" :activeIndex="0" class="mx-2">
      <AccordionTab class="accordianIndex">
        <template #header>
          <div class="flex font-size-14 ml-1">
            <Checkbox
              id="city1"
              name="city"
              value="additionalCheck"
              v-model="additionalCheck"
              :disabled="false"
              @change="additionalCheckChange(additionalCheck)"
            />
            <b class="font-size-14 ml-2">Additional Settings</b>
          </div>
        </template>

        <div class="flex flex-row ml-3 row flex-nowrap">
          <div class="field-checkbox flex mx-2 col-1">
            <Checkbox
              id="city1"
              name="city1"
              value="foc"
              v-model="foc"
              :disabled="inbuildCheckBoxEnabled"
              @change="focChange(foc)"
            />
            <label :class="classfoc">FOC</label>
          </div>

          <div class="field-checkbox flex mx-2 col-1">
            <Checkbox
              id="city2"
              name="city2"
              value="inJob"
              v-model="inJob"
              :disabled="inbuildCheckBoxEnabled"
              @change="inJobChange(inJob)"
            />
            <label :class="classinJob">In-Job</label>
          </div>

          <div
            class="
              flex flex-row flex-wrap
              card-container
              blue-container
              ml-4
              col-1
              my-auto
            "
          >
            <div class="flex h-2rem font-bold border-round">
              <Checkbox
                v-model="manualChecked"
                @change="onChangeManual"
                :binary="true"
              />
              <h6 class="pl-2 color-1e90ff text-nowrap">Manual Bill</h6>
            </div>
          </div>

          <div class="card row">
            <div class="card-container flex">
              <div
                v-if="
                  this.gerCrmBookingData.charge_type?.toLowerCase() != 'normal'
                "
                class="font-bold flex border-round"
              >
                <div
                  v-for="(i, keyInt) of ecommerce_charge"
                  :class="` ml-3 height-36 bg-fff font-bold flex border ${
                    keyInt ? 'col-sm-1' : ''
                  }`"
                  :key="keyInt"
                >
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">
                    {{ keyInt.toUpperCase() }}
                  </h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    @input="chargeTypeEcom"
                    v-model="ecommerce_charge[keyInt]"
                    :disabled="!manualChecked"
                  />
                </div>
                <div
                  :class="` ml-2 height-36 bg-fff font-bold flex border col-sm-1`"
                  :key="keyInt"
                >
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">RTN</h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    v-model="rtn"
                    @change="changeRTN(rtn)"
                    :disabled="!manualChecked"
                  />
                </div>
              </div>

              <div
                v-if="
                  this.gerCrmBookingData.charge_type?.toLowerCase() == 'normal'
                "
                class="w-50 justify-content-between font-bold flex border-round"
              >
                <div class="w-40 ml-2 height-36 bg-fff font-bold flex border">
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">SN</h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    v-model="sn"
                    @change="changeSN(sn)"
                    :disabled="!manualChecked"
                  />
                </div>
                <div
                  class="
                    ml-2
                    w-40
                    height-36
                    bg-fff
                    font-bold
                    flex
                    border-round border
                  "
                >
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">SU</h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    v-model="su"
                    @change="changeSU(su)"
                    :disabled="!manualChecked"
                  />
                </div>
                <div
                  class="
                    ml-2
                    w-40
                    height-36
                    bg-fff
                    font-bold
                    flex
                    border-round border
                  "
                >
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">UN</h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    v-model="un"
                    @change="changeUN(un)"
                    :disabled="!manualChecked"
                  />
                </div>
                <div
                  class="
                    ml-2
                    w-40
                    height-36
                    bg-fff
                    font-bold
                    flex
                    border-round border
                  "
                >
                  <h6 class="flex align-items-center mb-0 pl-2 pr-2">UU</h6>
                  <InputText
                    class="
                      w-50
                      h-1.5rem
                      p-0
                      bg-f2f2f2
                      font-bold
                      flex
                      text-center
                    "
                    id="username"
                    type="text"
                    v-model="uu"
                    @change="changeUU(uu)"
                    :disabled="!manualChecked"
                  />
                </div>
                <div
                  class="
                    w-2
                    justify-content-between
                    font-bold
                    flex
                    border-round
                    col-sm-1
                  "
                >
                  <div
                    class="
                      ml-2
                      w-40
                      height-36
                      bg-fff
                      font-bold
                      flex
                      border-round border
                    "
                  >
                    <h6 class="flex align-items-center mb-0 pl-2 pr-2">RTN</h6>
                    <InputText
                      class="
                        w-50
                        h-1.5rem
                        p-0
                        bg-f2f2f2
                        font-bold
                        flex
                        text-center
                      "
                      id="username"
                      type="text"
                      v-model="rtn"
                      @change="changeRTN(rtn)"
                      :disabled="!manualChecked"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <div class="mt-2 mx-2">
      <Accordion :activeIndex="activeIndexBilling">
        <AccordionTab class="accordianIndex">
          <template #header>
            <span class="flex flex-grow-1 font-size-14 ml-2">Billing</span>
          </template>
          <!-- <div class="flex font-size-14 ml-4 mb-2">
            <Checkbox
              id="city1"
              name="city"
              value="additionalCheck"
              v-model="additionalCheck"
              :disabled="false"
            />
            <b class="font-size-14 ml-2">Additional Settings</b>
          </div> -->
          <!-- <div class="flex flex-row ml-3">
            <div class="field-checkbox flex mx-2">
              <Checkbox
                id="city1"
                name="city"
                value="foc"
                v-model="foc"
                :disabled="inbuildCheckBoxEnabled"
              />
              <label for="city1" v-if="foc" class="color-000 font-size-16"
                >FOC</label
              >
              <label for="city1" v-else class="color-c4c4c4 font-size-16"
                >FOC</label
              >
            </div>
            <div class="field-checkbox flex mx-2">
              <Checkbox
                id="city2"
                name="city"
                value="inJob"
                v-model="inJob"
                :disabled="inbuildCheckBoxEnabled"
              />
              <label for="city2" v-if="inJob" class="color-000 font-size-16"
                >In-Job</label
              >
              <label for="city2" v-else class="color-c4c4c4 font-size-16"
                >In-Job</label
              >
            </div>
          </div> -->
          <ManualBill
            :SurchargeDropDownList="getSurchargeDropDownList"
            @emittedManualData="emittedManualData"
            :crmBookingData="gerCrmBookingData"
            @emitedDataInitially="emitedDataInitially"
            @getBillingMode="getBillingMode"
            @setActive="setActiveBilling"
          />
        </AccordionTab>
      </Accordion>
    </div>
    <div :key="renderKey">
      <div
        v-show="
          (selectedJobDropDown == 'Collection' && !jobCardCollect) ||
          (selectedJobDropDown == 'collectionDelivery' && !jobCardCollect) ||
          (selectedJobDropDown == 'Collection Exchange' && !jobCardCollect) ||
          (selectedJobDropDown == 'collect_and_deliver' && !jobCardCollect) ||
          (selectedJobDropDown == 'Multiple Exchange' && !jobCardCollect) ||
          (selectedJobDropDown == 'Multiple Delivery' && !jobCardCollect) ||
          (selectedJobDropDown == 'Collect and Deliver' && !jobCardCollect)
        "
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexCollect">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1 font-size-14">Collect</span>
              <i
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianExchange
              :key="renderUpdate"
              :selectedJobType="'Collect'"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              :isUpdateButton="isUpdateButton"
              :AttachmentType="'CrmCollectFileAttachment'"
              :volumentricValue="volumentricValue"
              :selectedUpdateData="selectedItemDataCollect"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div
        v-show="
          (selectedJobDropDown == 'Collection' && jobCardCollect) ||
          (selectedJobDropDown == 'collectionDelivery' && jobCardCollect) ||
          (selectedJobDropDown == 'Collection Exchange' && jobCardCollect) ||
          (selectedJobDropDown == 'Collect and Deliver' && jobCardCollect) ||
          (selectedJobDropDown == 'Multiple Exchange' && jobCardCollect) ||
          (selectedJobDropDown == 'collect_and_deliver' && jobCardCollect) ||
          (selectedJobDropDown == 'Multiple Delivery' && jobCardCollect)
        "
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :key="renderKeyForJob"
          :jobCardHead="'Collect'"
          :companyDetailsObj="companyDetailsObj"
          :JobCardData="collectJobCardData"
          :jobCardInfo="jobCardInfo"
          :jobCardAttachments="collectJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <div
        v-show="selectedJobDropDown == 'Endorse' && !jobCardEndorse"
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexEndorse">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1 font-size-14">Endorse</span>
              <i
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianEndorse
              :key="renderUpda"
              :selectedJobType="'Endorse'"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              :isUpdateButton="isUpdateButtonEndorse"
              @emitedDeleteJobCard="emitedDeleteJobCard"
              :AttachmentType="'CrmCollectFileAttachment'"
              :volumentricValue="volumentricValue"
              :selectedUpdateData="selectedItemDataEndorse"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div
        v-if="selectedJobDropDown == 'Endorse' && jobCardEndorse"
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :jobCardHead="'Endorse'"
          :key="renderKeyForJob"
          :companyDetailsObj="companyObjEndorse"
          :JobCardData="endorseJobCardData"
          :jobCardInfo="jobCardEndorseInfo"
          :jobCardAttachments="endorseJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <div
        v-show="selectedJobDropDown == 'Assignment' && !jobCardAssignment"
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexAssignment">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1 font-size-14">Assignment</span>
              <i
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianAssignment
              :key="renderUpdate"
              :selectedJobType="'Assignment'"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              :isUpdateButton="isUpdateButtonAssignment"
              @emitedDeleteJobCard="emitedDeleteJobCard"
              :AttachmentType="'CrmCollectFileAttachment'"
              :volumentricValue="volumentricValue"
              :selectedUpdateData="selectedItemDataAssignment"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div
        v-if="selectedJobDropDown == 'Assignment' && jobCardAssignment"
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :jobCardHead="'Assignment'"
          :key="renderKeyForJob"
          :companyDetailsObj="companyObjAssignment"
          :JobCardData="assignmentJobCardData"
          :jobCardInfo="jobCardAssignmentInfo"
          :jobCardAttachments="assignmentJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <!--  retun task  accordion  -->

      <!-- <div
      v-show="
        (selectedJobDropDown == 'collectionDelivery' && !jobCardDelivery) ||
        (selectedJobDropDown == 'Delivery' && !jobCardDelivery) ||
        (selectedJobDropDown == 'collect_and_deliver' && !jobCardDelivery) ||
        (selectedJobDropDown == 'Delivery Exchange' && !jobCardDelivery) ||
        (selectedJobDropDown == 'Multiple Exchange' && !jobCardDelivery) ||
        (appendAccordianTitle == 'appendDeliveryAccordian' &&
          !appendAccordian) ||
        (selectedJobDropDown == 'Collect and Deliver' && !jobCardCollect)
      "
      class="mt-2 mx-2"
    >
      <Accordion>
        <AccordionTab>
          <template #header>
            <span class="flex flex-grow-1 font-size-14">Delivery</span>
            <i
              @click="DeliveryDelete"
              class="pi pi-trash align-items-start justify-content-start"
            ></i>
          </template>
          <AccordianExchange
            :key="renderKeyForDelivery"
            :selectedJobType="'Delivery'"
            @savedJobType="savedJobTypeFunct"
            :documentDetailType="documentDetailType"
            :SurchargeDropDownList="getSurchargeDropDownList"
            @selectedJobPriority="selectedJobPriority"
            @selectedTimePeriod="selectedTimePeriod"
            @emitedEditJobCard="emitedEditJobCard"
            @emitedDeleteJobCard="emitedDeleteJobCard"
            :isUpdateButton="isUpdateButtonDelivery"
            :AttachmentType="'CrmDeliveryFileAttachment'"
            :volumentricValue="volumentricValue"
            :selectedUpdateData="selectedItemDataDelivery"
          />
        </AccordionTab>
      </Accordion>
    </div> -->

      <div
        v-if="selectedJobDropDown == 'Multiple Delivery'"
        class="mt-4 mb-4 border-radius-10"
        :key="renderKey"
      >
        <div
          class="my-2"
          v-for="(contact, index) of cardForLoopDeliveryOne"
          :key="index"
        >
          <div v-if="contact.enabled == true" :key="renderKey">
            <SavedExchangeJobCard
              :jobCardHead="'Delivery'"
              :companyDetailsObj="contact?.company_details[0]"
              :JobCardData="contact"
              :jobCardInfo="contact?.info"
              :jobCardAttachments="contact?.attachments"
              :EditId="addNewDelivery"
              :isUpdateButton="isUpdateButtonDelivery"
              @emitedEditJobCard="emitedEditJobCard"
              @emitedDeleteJobCard="emitedDeleteJobCard"
              :editIndex="index"
            />
          </div>
        </div>
      </div>

      <!--  retun task card   -->
      <!-- <div
      v-if="
        (selectedJobDropDown == 'collectionDelivery' && jobCardDelivery) ||
        (selectedJobDropDown == 'delivery' && jobCardDelivery) ||
        (selectedJobDropDown == 'deliveryExchange' && jobCardDelivery) ||
        (selectedJobDropDown == 'Delivery' && jobCardDelivery) ||
        (selectedJobDropDown == 'collect_and_deliver' && jobCardDelivery) ||
        (selectedJobDropDown == 'Delivery Exchange' && jobCardDelivery) ||
        (selectedJobDropDown == 'Multiple Exchange' && jobCardDelivery) ||
        (selectedJobDropDown == 'Collect and Deliver' && jobCardDelivery) ||
        (selectedJobDropDown == 'Collection Exchange' && jobCardDelivery)
      "
      class="mt-4 mb-4 border-radius-10"
    >
      <SavedExchangeJobCard
        :jobCardHead="'Delivery'"
        :companyDetailsObj="companyObjDelivery"
        :JobCardData="deliveryJobCardData"
        :jobCardInfo="jobCardDeliveryInfo"
        :jobCardAttachments="jobCardDeliveryAttachments"
        @emitedEditJobCard="emitedEditJobCard"
        @emitedDeleteJobCard="emitedDeleteJobCard"
      />
    </div> -->

      <div
        v-show="
          (selectedJobDropDown == 'ExchangeReturn' && !jobCardExchange) ||
          (selectedJobDropDown == 'deliveryExchange' && !jobCardExchange) ||
          (selectedJobDropDown == 'Collection Exchange' && !jobCardExchange) ||
          (selectedJobDropDown == 'Delivery Exchange' && !jobCardExchange) ||
          (selectedJobDropDown == 'Exchange Return' && !jobCardExchange)
        "
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexExchange">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1 font-size-14">Exchange</span>
              <i
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianExchange
              :key="renderKeyForExchange"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              :selectedJobType="'Exchange'"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              :isUpdateButton="isUpdateButtonExchange"
              :AttachmentType="'CrmExchangeFileAttachment'"
              :selectedUpdateData="selectedItemData"
              :volumentricValue="volumentricValue"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>
      <!-- delivery -->
      <div
        v-show="
          (selectedJobDropDown == 'Multiple Delivery' && !jobCardDelivery) ||
          (selectedJobDropDown == 'Multiple Delivery' && jobCardDelivery)
        "
        class="mx-2"
      >
        <div
          class="my-2"
          v-for="(delivery, index) of addNewDelivery"
          :key="index"
        >
          <Accordion
            v-if="delivery.enabled == false"
            :activeIndex="activeIndexDelivery"
          >
            <AccordionTab>
              <template #header>
                <span class="flex flex-grow-1 font-size-14">Delivery</span>
                <i
                  class="pi pi-trash align-items-start justify-content-start"
                ></i>
              </template>
              <AccordianExchange
                :key="renderKeyForDelivery"
                :selectedJobType="'Delivery'"
                @savedJobType="savedJobTypeFunct"
                :documentDetailType="documentDetailType"
                :SurchargeDropDownList="getSurchargeDropDownList"
                @selectedJobPriority="selectedJobPriority"
                @selectedTimePeriod="selectedTimePeriod"
                @emitedEditJobCard="emitedEditJobCard"
                @emitedDeleteJobCard="emitedDeleteJobCard"
                :isUpdateButton="isUpdateButtonDelivery"
                :AttachmentType="'CrmDeliveryFileAttachment'"
                :selectedUpdateData="selectedItemDataDelivery"
                :volumentricValue="volumentricValue"
                :index="index"
                :paramData="paramData"
                @cancelClicked="cancel"
              />
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <div :key="renderKey">
        <div class="my-2" v-if="selectedJobDropDown == 'Multiple Exchange'">
          <div
            class="my-2"
            v-for="(contact, index) of cardForLoopOne"
            :key="index"
          >
            <div v-if="contact.enabled == true">
              <SavedExchangeJobCard
                :jobCardHead="'Exchange'"
                :key="renderKeyForJob"
                :companyDetailsObj="contact?.company_details[0]"
                :JobCardData="contact"
                :EditId="addNewExchange"
                :jobCardInfo="contact?.info"
                :jobCardAttachments="contact?.attachments"
                @emitedEditJobCard="emitedEditJobCard"
                @emitedDeleteJobCard="emitedDeleteJobCard"
                :editIndex="index"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- <MultiExchanger /> -->
      <div
        class="mt-2 mx-2"
        v-if="
          (selectedJobDropDown == 'Multiple Exchange' && !jobCardExchange) ||
          (selectedJobDropDown == 'Multiple Exchange' && jobCardExchange)
        "
      >
        <div
          class="my-2"
          v-for="(contact, index) of addNewExchange"
          :key="index"
        >
          <Accordion
            v-if="contact.enabled == false"
            :activeIndex="activeIndexExchange"
          >
            <AccordionTab :key="renderKey">
              <template #header>
                <span class="flex flex-grow-1 font-size-14">Exchange </span>
                <i
                  class="pi pi-trash align-items-start justify-content-start"
                ></i>
              </template>

              <AccordianExchange
                :key="renderKeyForExchange"
                @savedJobType="savedJobTypeFunct"
                :documentDetailType="documentDetailType"
                :SurchargeDropDownList="getSurchargeDropDownList"
                :selectedJobType="'Exchange'"
                @selectedJobPriority="selectedJobPriority"
                @selectedTimePeriod="selectedTimePeriod"
                :isUpdateButton="isUpdateButtonExchange"
                :selectedUpdateData="selectedItemData"
                :AttachmentType="'CrmExchangeFileAttachment'"
                :index="index"
                :paramData="paramData"
                @cancelClicked="cancel"
              />
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <div class="flex justify-content-start mt-1 ml-2">
        <Buttons
          v-if="selectedJobDropDown == 'Multiple Exchange' && showButton()"
          label="+ Add New Exchange"
          button_class="dialog-button-text"
          @click="addContact"
        />
      </div>

      <div
        v-if="
          (selectedJobDropDown == 'ExchangeReturn' && jobCardExchange) ||
          (selectedJobDropDown == 'deliveryExchange' && jobCardExchange) ||
          (selectedJobDropDown == 'Collection Exchange' && jobCardExchange) ||
          (selectedJobDropDown == 'Delivery Exchange' && jobCardExchange) ||
          (selectedJobDropDown == 'Exchange Return' && jobCardExchange)
        "
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :jobCardHead="'Exchange'"
          :key="renderKeyForJob"
          :companyDetailsObj="companyObjExchange"
          :JobCardData="exchangeJobCardData"
          :jobCardInfo="jobCardExchangeInfo"
          :jobCardAttachments="exchangeJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <div
        v-if="
          (selectedJobDropDown == 'collectionDelivery' && jobCardDelivery) ||
          (selectedJobDropDown == 'delivery' && jobCardDelivery) ||
          (selectedJobDropDown == 'deliveryExchange' && jobCardDelivery) ||
          (selectedJobDropDown == 'Delivery' && jobCardDelivery) ||
          (selectedJobDropDown == 'collect_and_deliver' && jobCardDelivery) ||
          (selectedJobDropDown == 'Delivery Exchange' && jobCardDelivery) ||
          (selectedJobDropDown == 'Multiple Exchange' && jobCardDelivery) ||
          (selectedJobDropDown == 'Collect and Deliver' && jobCardDelivery) ||
          (selectedJobDropDown == 'Collection Exchange' && jobCardDelivery)
        "
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :jobCardHead="'Delivery'"
          :companyDetailsObj="companyObjDelivery"
          :JobCardData="deliveryJobCardData"
          :jobCardInfo="jobCardDeliveryInfo"
          :jobCardAttachments="deliveryJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <div
        v-show="
          (selectedJobDropDown == 'collectionDelivery' && !jobCardDelivery) ||
          (selectedJobDropDown == 'Delivery' && !jobCardDelivery) ||
          (selectedJobDropDown == 'collect_and_deliver' && !jobCardDelivery) ||
          (selectedJobDropDown == 'Delivery Exchange' && !jobCardDelivery) ||
          (selectedJobDropDown == 'Multiple Exchange' && !jobCardDelivery) ||
          (appendAccordianTitle == 'appendDeliveryAccordian' &&
            !appendAccordian) ||
          (selectedJobDropDown == 'Collect and Deliver' && !jobCardDelivery)
        "
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexDelivery">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1 font-size-14">Delivery</span>
              <i
                @click="DeliveryDelete"
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianExchange
              :key="renderKeyForDelivery"
              :selectedJobType="'Delivery'"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              @emitedEditJobCard="emitedEditJobCard"
              @emitedDeleteJobCard="emitedDeleteJobCard"
              :isUpdateButton="isUpdateButtonDelivery"
              :AttachmentType="'CrmDeliveryFileAttachment'"
              :volumentricValue="volumentricValue"
              :selectedUpdateData="selectedItemDataDelivery"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div
        v-show="
          (selectedJobDropDown == 'ExchangeReturn' && !jobCardReturn) ||
          (selectedJobDropDown == 'Collection' && !jobCardReturn) ||
          (selectedJobDropDown == 'Multiple Exchange' && !jobCardReturn) ||
          (selectedJobDropDown == 'Exchange Return' && !jobCardReturn) ||
          (appendAccordianTitle == 'appendReturnAccordian' && !appendAccordian)
        "
        class="mt-2 mx-2"
      >
        <Accordion :activeIndex="activeIndexReturn">
          <AccordionTab>
            <template #header>
              <span class="flex flex-grow-1">Return</span>
              <i
                @click="ReturnDelete"
                class="pi pi-trash align-items-start justify-content-start"
              ></i>
            </template>
            <AccordianReturn
              :key="renderKeyForReturn"
              :selectedJobType="'Return'"
              @savedJobType="savedJobTypeFunct"
              :documentDetailType="documentDetailType"
              :SurchargeDropDownList="getSurchargeDropDownList"
              @selectedJobPriority="selectedJobPriority"
              @selectedTimePeriod="selectedTimePeriod"
              :isUpdateButton="isUpdateButtonReturn"
              :AttachmentType="'CrmReturnFileAttachment'"
              :volumentricValue="volumentricValue"
              :selectedUpdateData="selectedItemDataReturn"
              :paramData="paramData"
              @cancelClicked="cancel"
            />
          </AccordionTab>
        </Accordion>
      </div>

      <div
        v-if="
          (selectedJobDropDown == 'ExchangeReturn' && jobCardReturn) ||
          (selectedJobDropDown == 'Collection' && jobCardReturn) ||
          (selectedJobDropDown == 'deliveryExchange' && jobCardReturn) ||
          (selectedJobDropDown == 'Collection Exchange' && jobCardReturn) ||
          (selectedJobDropDown == 'Multiple Exchange' && jobCardReturn) ||
          (selectedJobDropDown == 'Exchange Return' && jobCardReturn) ||
          (selectedJobDropDown == 'deliveryExchange' && jobCardReturn)
        "
        class="mt-4 mb-4 border-radius-10"
      >
        <SavedExchangeJobCard
          :jobCardHead="'Return'"
          :companyDetailsObj="companyObjReturn"
          :JobCardData="returnJobCardData"
          :jobCardInfo="jobCardReturnInfo"
          :jobCardAttachments="returnJobCardData?.attachments"
          @emitedEditJobCard="emitedEditJobCard"
          @emitedDeleteJobCard="emitedDeleteJobCard"
        />
      </div>

      <!-- <div
      v-show="
        appendAccordianTitle == 'appendDeliveryAccordian' && !appendAccordian
      "
      class="mt-2 mx-2"
    >
      <Accordion>
        <AccordionTab>
          <template #header>
            <span class="flex flex-grow-1">Delivery</span>
            <i class="pi pi-trash align-items-start justify-content-start"></i>
          </template>
          <AccordianExchange
            :key="renderKeyForDelivery"
            :selectedJobType="'Delivery'"
            @savedJobType="savedJobTypeFunct"
            :documentDetailType="documentDetailType"
            :SurchargeDropDownList="getSurchargeDropDownList"
            @selectedJobPriority="selectedJobPriority"
            @selectedTimePeriod="selectedTimePeriod"
          />
        </AccordionTab>
      </Accordion>
    </div> -->

      <!-- <div
      v-show="appendAccordianTitle == 'appendReturnAccordian' && !appendAccordian"
      class="mt-2 mx-2"
    >
      <Accordion>
        <AccordionTab>
          <template #header>
            <span class="flex flex-grow-1">Return</span>
            <i class="pi pi-trash align-items-start justify-content-start"></i>
          </template>
          <AccordianReturn
            :selectedJobType="'Return'"
            @savedJobType="savedJobTypeFunct"
            :documentDetailType="documentDetailType"
            :SurchargeDropDownList="getSurchargeDropDownList"
          />
        </AccordionTab>
      </Accordion>
    </div> -->

      <div
        v-if="
          (selectedJobDropDown == 'deliveryExchange' &&
            appendActionButton &&
            !jobCardReturn) ||
          (selectedJobDropDown == 'deliveryExchange' &&
            appendActionButton &&
            !jobCardDelivery) ||
          (selectedJobDropDown == 'Collection Exchange' &&
            appendActionButton &&
            !jobCardDelivery)
        "
        class="flex flex-row justify-content-between my-4"
      >
        <div class="flex flex-row">
          <div class="flex mx-2">
            <Buttons
              label="+ Delivery"
              button_class="dialog-button-text"
              @click="addDeliveryAccordian()"
            />
          </div>

          <div class="flex mx-2">
            <Buttons
              label="+ Return"
              button_class="dialog-button-text"
              @click="addReturnAccordian"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-content-start ml-2">
        <Buttons
          v-if="
            selectedJobDropDown == 'Multiple Delivery' && showButtonDelivery()
          "
          label="+ Add New Delivery"
          button_class="dialog-button-text"
          @click="addDelivery"
        />
      </div>
    </div>
    <!-- <div class="flex justify-content-start mt-1 ml-2">
      <Buttons
        v-if="selectedJobDropDown == 'Multiple Exchange' && showButton()"
        label="+ Add New Exchange"
        button_class="dialog-button-text"
        @click="addContact"
      />
    </div> -->
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import AccordianExchange from "../../../../components/Reusables/CRM/AccordianComponents/AccordianExchange.vue";
import AccordianReturn from "../../../../components/Reusables/CRM/AccordianComponents/AccordianReturn.vue";
import ManualBill from "../../../../components/Reusables/CRM/ManualBill.vue";
import { mapActions, mapGetters } from "vuex";
import SavedExchangeJobCard from "../../../../components/Reusables/CRM/AccordianComponents/SavedExchangeJobCard.vue";
import AccordianEndorse from "../../../../components/Reusables/CRM/AccordianComponents/AccordianEndorse.vue";
import AccordianAssignment from "../../../../components/Reusables/CRM/AccordianComponents/AccordianAssignment.vue";
import { crm_launch, crmCusLState } from "../../../../store/modules/CRM/helper";
export default {
  name: "AccordianComponent",
  props: [
    "selectedJobType",
    "documentDetailType",
    "costCenterSelected",
    "jobTypesSelected",
    "paramData",
  ],
  components: {
    Checkbox,
    Accordion,
    AccordionTab,
    AccordianExchange,
    AccordianReturn,
    ManualBill,
    SavedExchangeJobCard,
    AccordianEndorse,
    AccordianAssignment,
    InputText,
  },
  data() {
    return {
      emptyData: "",
      selectedJobDropDown: "",
      jobCardExchange: false,
      jobCardExchangeClone: false,
      jobCardCollection: false,
      jobCardDelivery: false,
      jobCardEndorse: false,
      jobCardAssignment: false,
      jobCardCollectandDelivery: false,
      jobCardMultipleExchange: false,
      jobCardReturn: false,
      jobCardCollect: false,
      appendAccordianTitle: "",
      appendAccordian: false,
      appendActionButton: true,
      additionalCheck: false,
      inbuildCheckBoxEnabled: true,
      inJob: false,
      foc: false,
      classinJob: "",
      classfoc: "",
      updateData: {
        additional_settings: false,
        additional_settings_in_job: false,
        additional_settings_foc: false,
      },
      renderKey: 5,
      renderKeyForJob: 2,
      jobPriorityString: "",
      timeSelected: "",
      collectJobCardData: [],
      returnJobCardData: [],
      companyDetailsObj: {},
      jobCardInfo: [],
      jobCardAttachments: [],
      companyObjReturn: {},
      jobCardReturnInfo: [],
      jobCardReturnAttachments: [],
      exchangeJobCardData: [],
      endorseJobCardData: [],
      assignmentJobCardData: [],
      companyObjExchange: {},
      companyObjEndorse: {},
      companyObjAssignment: {},
      jobCardExchangeInfo: [],
      jobCardExchangeInfoOne: null,
      jobCardEndorseInfo: [],
      jobCardAssignmentInfo: [],
      jobCardExchangeAttachments: [],
      jobCardExchangeAttachmentsOne: null,
      companyObjExchangeOne: null,
      jobCardEndorseAttachments: [],
      jobCardAssignmentAttachments: [],
      deliveryJobCardData: [],
      companyObjDelivery: {},
      jobCardDeliveryInfo: [],
      jobCardDeliveryAttachments: [],
      isUpdateButton: false,
      isUpdateButtonExchange: false,
      isUpdateButtonReturn: false,
      isUpdateButtonDelivery: false,
      isUpdateButtonEndorse: false,
      isUpdateButtonAssignment: false,
      selectedJobId: null,
      renderUpdate: 1,
      renderKeyForExchange: 1,
      renderKeyForReturn: 1,
      renderKeyForDelivery: 1,
      renderKeyForEndorse: 1,
      activeIndexBilling: 1,
      addNewExchange: [
        {
          name: "add_new_exchange",
          idx: 1,
          enabled: false,
        },
      ],
      // addNewButtonShow: false,
      exchangeEnabled: true,
      accordionIndex: null,
      cardForLoop: [],
      cardForLoopOne: [],
      cardRenderKey: 1,
      volumentricValue: 0,
      selectedItemData: null,
      WatchEditIndex: null,
      addNewDelivery: [
        {
          name: "add_new_delivery",
          idx: 1,
          enabled: false,
        },
      ],
      cardForLoopDelivery: [],
      cardForLoopDeliveryOne: [],
      selectedItemDataDelivery: null,
      WatchEditIndexDelivery: null,
      selectedItemDataCollect: null,
      selectedItemDataReturn: null,
      selectedItemDataEndorse: null,
      selectedItemDataAssignment: null,
      //manuall bill
      manualChecked: false,
      sn: "",
      su: "",
      un: "",
      uu: "",
      rtn: "",
      e_commerce: {},
      activeIndexEndorse: 1,
      activeIndexCollect: 1,
      activeIndexAssignment: 1,
      activeIndexExchange: 1,
      activeIndexDelivery: 1,
      activeIndexReturn: 1,
    };
  },
  methods: {
    changeSN(newVal) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
        this.$emit("emittedManual", data);
      }
    },
    changeSU(newVal) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
        this.$emit("emittedManual", data);
      }
    },
    changeUN(newVal) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
        this.$emit("emittedManual", data);
      }
    },
    changeUU(newVal) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
        this.$emit("emittedManual", data);
      }
    },

    changeRTN(newVal) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
        this.$emit("emittedManual", data);
      }
    },

    additionalCheckChange(newValue) {
      let keys = Object.keys(newValue).length;
      let data = {
        ...this.objSerialData,
        sn: this.sn,
        su: this.su,
        un: this.un,
        uu: this.uu,
        rtn: this.rtn,
        manual_bill: this.manualChecked,
        billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
        billed_by: this.selectedType ? this.selectedType.name : "",
        surcharges: this.gerCrmBookingData.surcharges,
        additional_settings: this.additionalCheck.length > 0 ? true : false,
        additional_settings_foc: this.foc == false ? false : true,
        additional_settings_in_job: this.inJob == false ? false : true,
      };
      if (newValue.length == 1) {
        this.inbuildCheckBoxEnabled = false;
        data["additional_settings"] = true;
      } else {
        data["additional_settings"] = false;
        this.inbuildCheckBoxEnabled = true;
      }
      this.$emit("emittedManual", data);
    },
    focChange() {
      let data = {
        ...this.objSerialData,
      };
      if (this.foc.length == 1) {
        this.classfoc = "color-000 font-size-16 text-nowrap";
        data["additional_settings_foc"] = true;
      } else {
        this.classfoc = "color-c4c4c4 font-size-16 text-nowrap";
        data["additional_settings_foc"] = false;
      }
      this.$emit("emittedManual", data);
    },
    inJobChange() {
      let data = {
        ...this.objSerialData,
      };
      if (this.inJob.length == 1) {
        this.classinJob = "color-000 font-size-16 text-nowrap";
        data["additional_settings_in_job"] = true;
      } else {
        data["additional_settings_in_job"] = false;
        this.classinJob = "color-c4c4c4 font-size-16 text-nowrap";
      }
      this.$emit("emittedManual", data);
    },
    onChangeManual() {
      let data = {
        ...this.objSerialData,
        manual_bill: this.manualChecked,
      };
      this.$emit("emittedManual", data);
    },
    addContact() {
      this.addNewExchange.push({
        name: "add_new_exchange",
        idx: this.addNewExchange.length + 1,
        enabled: false,
      });
      this.accordionIndex = this.renderKeyForExchange++;
      this.renderKey++;
      this.isUpdateButtonExchange = false;
    },
    chargeTypeEcom() {
      let data = {
        ...this.objSerialData,
        ...this.ecommerce_charge,
        sn: this.sn,
        su: this.su,
        un: this.un,
        uu: this.uu,
        rtn: this.rtn,
        manual_bill: this.manualChecked,
        billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
        billed_by: this.selectedType ? this.selectedType.name : "",
        surcharges: this.gerCrmBookingData.surcharges,
      };
      this.$emit("emittedManual", data);
    },
    showButton() {
      let val = this.addNewExchange.every((i) => i.enabled == true);
      return val;
    },
    addDelivery() {
      this.addNewDelivery.push({
        name: "add_new_delivery",
        idx: this.addNewDelivery.length + 1,
        enabled: false,
      });
      this.isUpdateButtonDelivery = false;
      this.renderKey++;
    },
    showButtonDelivery() {
      let val = this.addNewDelivery.every((i) => i.enabled == true);
      return val;
    },

    ...mapActions({
      getCrmBookingDetails: "CustomerLaunchStore/getCrmBookingDetails",
      createJobCardData: "CustomerLaunchStore/createJobCardData",
      gettSavedAccordianJobDetails:
        "CustomerLaunchStore/gettSavedAccordianJobDetails",
      updateJobCardData: "CustomerLaunchStore/updateJobCardData",
      deleteJobCardData: "CustomerLaunchStore/deleteJobCardData",
      getVolumentricValue: "CustomerLaunchStore/getVolumentricValue",
    }),
    selectedJobPriority(data) {
      this.jobPriorityString = data;
    },
    selectedTimePeriod(data) {
      this.timeSelected = data;
    },
    cancel(data) {
      switch (data) {
        case "Delivery":
          this.activeIndexDelivery = this.activeIndexDelivery + 1;
          break;
        case "Collect":
          this.activeIndexCollect = this.activeIndexCollect + 1;
          break;
        case "Return":
          this.activeIndexReturn = this.activeIndexReturn + 1;
          break;
        case "Exchange":
          this.activeIndexExchange = this.activeIndexExchange + 1;
          break;
        case "Assignment":
          this.activeIndexAssignment = this.activeIndexAssignment + 1;
          break;
        case "Endorse":
          this.activeIndexEndorse = this.activeIndexEndorse + 1;
          break;
      }
    },
    emitedEditJobCard(
      types,
      val,
      itemData,
      isUpdate,
      selectedId,
      EditId,
      editIndex
    ) {
      if (types == "Return") {
        this.appendAccordian = !this.appendAccordian;
        this.jobCardReturn = val;
        this.isUpdateButtonReturn = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemDataReturn = itemData;
      } else if (types == "Exchange") {
        this.jobCardExchange = val;
        this.isUpdateButtonExchange = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemData = itemData;
        this.WatchEditIndex = editIndex;
        if (editIndex == 0 || editIndex) {
          this.addNewExchange[editIndex].enabled = false;

          this.cardForLoopOne[editIndex].enabled = false;

          this.renderKey++;
        }
        this.renderKeyForJob++;
        this.renderKey++;
      } else if (types == "Collect") {
        this.jobCardCollect = val;
        this.isUpdateButton = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemDataCollect = itemData;
      } else if (types == "Delivery") {
        this.jobCardDelivery = val;
        this.appendAccordian = !this.appendAccordian;
        this.isUpdateButtonDelivery = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemDataDelivery = itemData;
        this.WatchEditIndexDelivery = editIndex;
        if (editIndex == 0 || editIndex) {
          this.addNewDelivery[editIndex].enabled = false;
          this.cardForLoopDeliveryOne[editIndex].enabled = false;
          this.renderKey++;
        }
      } else if (types == "deliveryExchange") {
        this.jobCardExchange = val;
      } else if (types == "Endorse") {
        this.jobCardEndorse = val;
        this.isUpdateButtonEndorse = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemDataEndorse = itemData;
      } else if (types == "Assignment") {
        this.jobCardAssignment = val;
        this.isUpdateButtonAssignment = isUpdate;
        this.selectedJobId = selectedId;
        this.selectedItemDataAssignment = itemData;
      }
    },
    async emitedDeleteJobCard(types, val, itemData, selectedId) {
      await this.deleteJobCardData(selectedId).then(async (c) => {
        if (c == 200) {
          let idValue = this.gerCrmBookingData.id;
          await this.getCrmBookingDetails(idValue);
          await this.gettSavedAccordianJobDetails(idValue).then((res) => {
            if (res == 200) {
              if (types == "Return") {
                this.jobCardReturn = val;
                this.renderKeyForReturn += 1;
              } else if (types == "Exchange") {
                this.jobCardExchange = val;
                this.renderKeyForExchange += 1;
              } else if (types == "Collect") {
                this.jobCardCollect = val;
                this.renderUpdate += 1;
              } else if (types == "Delivery") {
                this.jobCardDelivery = val;
                this.appendAccordian = true;
                this.renderKeyForDelivery += 1;
              } else if (types == "deliveryExchange") {
                this.jobCardExchange = val;
              } else if (types == "Delivery") {
                this.jobCardEndorse = val;
                this.appendAccordian = true;
                this.renderKeyForEndorse += 1;
              } else if (types == "Endorse") {
                this.jobCardEndorse = val;
                this.renderUpdate += 1;
              } else if (types == "Assignment") {
                this.jobCardAssignment = val;
                this.renderUpdate += 1;
              }
            }
          });
        }
      });
    },
    async savedJobTypeFunct(
      val,
      types,
      dataSetObj,
      AccordType,
      isUpdate,
      index
    ) {
      if (
        (types == "Exchange" && index) ||
        (types == "Exchange" && index == 0)
      ) {
        this.addNewExchange[index].enabled = true;
        if (this.cardForLoopOne.length && index == 0) {
          this.cardForLoopOne[index].enabled = true;
        } else if (this.cardForLoopOne.length >= 1) {
          this.cardForLoopOne[index - 1].enabled = true;
          if (this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey) {
            this.cardForLoopOne[index].enabled = true;
          }
        }
        this.renderKey++;
      }
      if (
        (types == "Delivery" && index) ||
        (types == "Delivery" && index == 0)
      ) {
        this.addNewDelivery[index].enabled = true;
        if (this.cardForLoopDeliveryOne.length && index == 0) {
          this.cardForLoopDeliveryOne[index].enabled = true;
        } else if (this.cardForLoopDeliveryOne.length >= 1) {
          this.cardForLoopDeliveryOne[index - 1].enabled = true;
          if (this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey) {
            this.cardForLoopDeliveryOne[index].enabled = true;
          }
        }
        this.addNewDelivery[index].enabled = true;
        this.renderKey++;
      }

      // exemple code for post job create method

      let dataSet = {
        booking_id: this.gerCrmBookingData.id,
        job_type: AccordType,
        job_priority: this.jobPriorityString,
        time_date: this.timeSelected,
        ...dataSetObj,
      };
      if (isUpdate) {
        let postData = {
          dataSetObj: dataSet,
          selectedJobId: this.selectedJobId,
        };

        await this.updateJobCardData(postData).then(async (c) => {
          if (c == 200) {
            let idValue = this.gerCrmBookingData.id;
            await this.getCrmBookingDetails(idValue);
            await this.gettSavedAccordianJobDetails(idValue).then((res) => {
              if (res == 200) {
                if (types == "Return") {
                  this.jobCardReturn = val;
                  this.appendAccordian = true;
                } else if (types == "Exchange") {
                  this.jobCardExchange = val;
                  this.renderKey++;
                } else if (types == "Collect") {
                  this.jobCardCollect = val;
                } else if (types == "Delivery") {
                  this.jobCardDelivery = val;
                  this.appendAccordian = true;
                } else if (types == "deliveryExchange") {
                  this.jobCardExchange = val;
                } else if (types == "Endorse") {
                  this.jobCardEndorse = val;
                  this.appendAccordian = true;
                } else if (types == "Assignment") {
                  this.jobCardAssignment = val;
                  this.appendAccordian = true;
                }
                this.timeSelected = "";
              }
            });
          }
        });
      } else {
        await this.createJobCardData(dataSet).then(async (c) => {
          if (c == 200) {
            let idValue = this.gerCrmBookingData.id;

            await this.getCrmBookingDetails(idValue);
            await this.gettSavedAccordianJobDetails(idValue).then((res) => {
              if (res == 200) {
                if (types == "Return") {
                  this.jobCardReturn = val;
                  this.appendAccordian = true;
                } else if (types == "Exchange") {
                  this.renderKey++;
                  this.jobCardExchange = val;
                  this.cardForLoop.push(this.addNewExchange[index]);
                } else if (types == "Collect") {
                  this.jobCardCollect = val;
                } else if (types == "Delivery") {
                  this.jobCardDelivery = val;
                  this.cardForLoopDelivery.push(this.addNewDelivery[index]);
                  this.appendAccordian = true;
                } else if (types == "deliveryExchange") {
                  this.jobCardExchange = val;
                } else if (types == "Endorse") {
                  this.jobCardEndorse = val;
                  this.appendAccordian = true;
                } else if (types == "Assignment") {
                  this.jobCardAssignment = val;
                  this.appendAccordian = true;
                }
                this.timeSelected = "";
              }
            });
          }
        });
      }
      this.$emit("updateSection");
    },
    setActiveBilling(index) {
      this.activeIndexBilling = index;
    },
    emittedManualData(data) {
      let datas = {
        ...data,
        rtn: this.rtn,
        uu: this.uu,
        su: this.su,
        sn: this.sn,
        un: this.un,
        manual_bill: this.manualChecked,
        additional_settings: this.additionalCheck == false ? false : true,
        additional_settings_in_job: this.inJob,
        additional_settings_foc: this.foc,
      };

      this.$emit("emittedManual", datas);
    },
    emitedDataInitially(data) {
      let datas = {
        ...data,
        additional_settings: this.additionalCheck == false ? false : true,
        additional_settings_in_job: this.inJob,
        additional_settings_foc: this.foc,
      };
      this.$emit("emitedInitially", datas);
    },
    addDeliveryAccordian() {
      this.appendAccordianTitle = "appendDeliveryAccordian";
      this.appendActionButton = false;
      this.jobCardDelivery = false;
    },
    addReturnAccordian() {
      this.appendAccordianTitle = "appendReturnAccordian";
      this.appendActionButton = false;
      this.jobCardReturn = false;
    },
    addEndorseAccordian() {
      this.appendAccordianTitle = "appendEndorseAccordian";
      this.appendActionButton = false;
      this.jobCardReturn = false;
    },
    ReturnDelete() {
      if (
        this.selectedJobDropDown == "Collection Exchange" ||
        this.selectedJobDropDown == "deliveryExchange"
      ) {
        this.appendAccordianTitle = "";
        this.appendActionButton = true;
      }
    },
    DeliveryDelete() {
      if (
        this.selectedJobDropDown == "Collection Exchange" ||
        this.selectedJobDropDown == "deliveryExchange"
      ) {
        this.appendAccordianTitle = "";
        this.appendActionButton = true;
      }
    },
    initialEditCall() {
      if (Object.keys(this.ecommerce_charge).length != 0) {
        Object.keys(this.ecommerce_charge).map((i) => {
          this.ecommerce_charge[i] = this.gerCrmBookingData[i]
            ? this.gerCrmBookingData[i]
            : this.ecommerce_charge[i];
        });
      }
      if (this.getJobDetailsArrayList) {
        this.getJobDetailsArrayList.map((i, idx) => {
          if (i.job_type == "Collect") {
            this.jobCardCollect = true;
            this.selectedJobDropDown =
              "Collection" ||
              "collect_and_deliver" ||
              "collectionDelivery" ||
              "deliveryExchange" ||
              "Collection Exchange" ||
              "Collect and Deliver" ||
              "Multiple Exchange" ||
              "Multiple Delivery";
            this.renderKey++;
          }
          if (i.job_type == "Endorse") {
            this.jobCardEndorse = true;
            this.selectedJobDropDown = "Endorse";
            this.renderKey++;
          }

          if (i.job_type == "Return") {
            this.jobCardReturn = true;
            this.selectedJobDropDown =
              "ExchangeReturn" ||
              "Collection" ||
              "deliveryExchange" ||
              "Collection Exchange" ||
              "Multiple Exchange";
            this.renderKey++;
          }

          if (i.job_type == "Delivery") {
            this.jobCardDelivery = true;
            this.selectedJobDropDown =
              "Delivery" ||
              "collect_and_deliver" ||
              "collectionDelivery" ||
              "delivery" ||
              "deliveryExchange" ||
              "Delivery Exchange" ||
              "Multiple Exchange" ||
              "Collect and Deliver" ||
              "Collection Exchange" ||
              "Multiple Delivery";

            this.renderKey++;
          }
          if (i.job_type == "Exchange") {
            this.jobCardExchange = true;
            this.selectedJobDropDown =
              "Exchange" ||
              "ExchangeReturn" ||
              "deliveryExchange" ||
              "Collection Exchange" ||
              "Delivery Exchange" ||
              "Multiple Exchange";

            this.renderKey++;
          }
          if (i.job_type == "Assignment") {
            this.jobCardAssignment = true;
            this.selectedJobDropDown = "Assignment";
            this.renderKey++;
          }
        });
      }
    },
    setJobCardData() {
      let lo_data = this.getJobDetailsArrayList;
      let collectData = lo_data.find((c) => {
        if (c.job_type.includes("Collect")) {
          return c;
        }
      });

      let returnData = lo_data.find((c) => {
        if (c.job_type.includes("Return")) {
          return { ...c };
        }
      });

      let exchangeVal = lo_data.find((c) => {
        if (c.job_type.includes("Exchange")) {
          return { ...c };
        }
      });

      let DeliveryData = lo_data.find((c) => {
        if (c.job_type == "Delivery") {
          return { ...c };
        }
      });

      let endorseData = lo_data.find((c) => {
        if (c.job_type == "Endorse") {
          return { ...c };
        }
      });

      let assignmentData = lo_data.find((c) => {
        if (c.job_type == "Assignment") {
          return { ...c };
        }
      });

      // Collect
      this.collectJobCardData = collectData;
      this.companyDetailsObj = collectData
        ? collectData.company_details[0]
        : null;
      this.jobCardInfo = collectData ? collectData.info : [];
      this.jobCardAttachments = collectData ? collectData.attachments : [];

      //Exchange
      let exchangeData = [exchangeVal];

      this.exchangeJobCardData = exchangeData[0];
      this.companyObjExchange = exchangeData
        ? exchangeData[0]?.company_details[0]
        : null;
      this.jobCardExchangeInfo = exchangeData ? exchangeData[0]?.info : [];
      this.jobCardExchangeAttachments = exchangeData
        ? exchangeData[0]?.attachments
        : [];
      //exchange
      if (this.WatchEditIndex == 0 || this.WatchEditIndex) {
        let c = [];
        [lo_data[this.WatchEditIndex]].map((x, i) => {
          [this.cardForLoopOne[this.WatchEditIndex]].map((y, ix) => {
            c.push({ enabled: y?.enabled, idx: y?.idx, name: y?.name, ...x });
          });
        });
        this.cardForLoopOne[this.WatchEditIndex] = c[0];
        this.renderKey += 1;
      }
      this.renderKey += 1;

      //Endorse
      this.endorseJobCardData = endorseData;
      this.companyObjEndorse = endorseData
        ? endorseData.company_details[0]
        : null;
      this.jobCardEndorseInfo = endorseData ? endorseData.info : [];
      this.jobCardEndorseAttachments = endorseData
        ? endorseData.attachments
        : [];

      //Assignment
      this.assignmentJobCardData = assignmentData;
      this.companyObjAssignment = assignmentData
        ? assignmentData.company_details[0]
        : null;
      this.jobCardAssignmentInfo = assignmentData ? assignmentData.info : [];
      this.jobCardAssignmentAttachments = assignmentData
        ? assignmentData.attachments
        : [];

      // Return
      this.returnJobCardData = returnData;
      this.companyObjReturn = returnData ? returnData.company_details[0] : null;
      this.jobCardReturnInfo = returnData ? returnData.info : [];
      this.jobCardReturnAttachments = returnData ? returnData.attachments : [];

      // Delivery
      (this.deliveryJobCardData = DeliveryData),
        (this.companyObjDelivery = DeliveryData
          ? DeliveryData.company_details[0]
          : null);
      this.jobCardDeliveryInfo = DeliveryData ? DeliveryData.info : [];
      this.jobCardDeliveryAttachments = DeliveryData
        ? DeliveryData.attachments
        : [];
      //delivery
      if (this.WatchEditIndexDelivery == 0 || this.WatchEditIndexDelivery) {
        let c = [];
        [lo_data[this.WatchEditIndexDelivery]].map((x, i) => {
          [this.cardForLoopDeliveryOne[this.WatchEditIndexDelivery]].map(
            (y, ix) => {
              c.push({
                enabled: y?.enabled,
                idx: y?.idx,
                name: y?.name,
                ...x,
              });
            }
          );
        });
        this.cardForLoopDeliveryOne[this.WatchEditIndexDelivery] = c[0];
        this.renderKey += 1;
      }
      this.renderKey += 1;

      this.renderKey++;

      this.renderKeyForJob += 1;
    },
  },

  async created() {
    if (this.$route.params.mode == "edit") {
      await this.initialEditCall();
      await this.setJobCardData();
    }
  },
  watch: {
    gerCrmBookingData: {
      handler: function (newVal, oldVal) {
        let b_data = this.gerCrmBookingData;
        this.manualChecked = b_data.manual_bill;
        this.sn = newVal.sn;
        this.su = newVal.su;
        this.un = newVal.un;
        this.uu = newVal.uu;
        this.rtn = newVal.rtn;
        this.additionalCheck =
          b_data.additional_settings == true ? ["additionalCheck"] : false;
        this.foc = b_data.additional_settings_foc == true ? ["foc"] : false;
        this.inJob =
          b_data.additional_settings_in_job == true ? ["inJob"] : false;
        if (Object.keys(this.ecommerce_charge).length != 0) {
          Object.keys(this.ecommerce_charge).map((i) => {
            this.ecommerce_charge[i] = this.gerCrmBookingData[i]
              ? this.gerCrmBookingData[i]
              : this.ecommerce_charge[i];
          });
        }
        this.renderKey += 1;
      },
      deep: true,
      immediate: true,
    },

    inJob: function (newValue, oldValue) {
      if (this.inJob.length == 1) {
        this.classinJob = "color-000 font-size-16 text-nowrap";
      } else {
        this.classinJob = "color-c4c4c4 font-size-16 text-nowrap";
      }
    },
    foc: function (newValue, oldValue) {
      if (this.foc.length == 1) {
        this.classfoc = "color-000 font-size-16 text-nowrap";
      } else {
        this.classfoc = "color-c4c4c4 font-size-16 text-nowrap";
      }
    },

    sn: function (newVal, oldValue) {
      if (newVal || newVal == 0) {
        let data = {
          ...this.objSerialData,
          sn: this.sn,
          su: this.su,
          un: this.un,
          uu: this.uu,
          rtn: this.rtn,
          manual_bill: this.manualChecked,
          billing_mode: this.selectedMode ? this.selectedMode.name : "Bike",
          billed_by: this.selectedType ? this.selectedType.name : "",
          surcharges: this.gerCrmBookingData.surcharges,
        };
      }
    },

    WatchEditIndex: {
      handler() {
        this.renderKey++;
      },
    },

    isUpdateButtonExchange: {
      handler() {
        if (this.isUpdateButtonExchange == false) {
          this.selectedItemData = null;
          this.renderKey += 1;
        }
      },
    },

    cardForLoop: {
      handler() {
        if (this.WatchEditIndex !== 0 || !this.WatchEditIndex) {
          let value = this.getJobDetailsArrayList.length - 1;
          let val = this.getJobDetailsArrayList[value];
          [val].map((ii, idx) => {
            this.cardForLoop.map((x, index) => {
              this.cardForLoopOne.push({
                enabled: x?.enabled,
                idx: x?.idx,
                name: x?.name,
                ...ii,
              });
              const unique = [
                ...new Map(this.cardForLoopOne.map((m) => [m.id, m])).values(),
              ];
              this.cardForLoopOne = unique;
            });
          });
        }
        this.renderKey += 1;
      },
      deep: true,
    },
    cardForLoopDelivery: {
      handler() {
        let value = this.getJobDetailsArrayList.length - 1;
        let val = this.getJobDetailsArrayList[value];
        if (this.WatchEditIndexDelivery !== 0 || !this.WatchEditIndexDelivery) {
          [val].map((y, i) => {
            this.cardForLoopDelivery.map((x, index) => {
              this.cardForLoopDeliveryOne.push({
                enabled: x?.enabled,
                idx: x?.idx,
                name: x?.name,
                ...y,
              });
              const unique = [
                ...new Map(
                  this.cardForLoopDeliveryOne.map((m) => [m.id, m])
                ).values(),
              ];
              this.cardForLoopDeliveryOne = unique;
            });
          });
        }

        this.renderKey += 1;
      },
      deep: true,
    },

    cardForLoopOne: {
      handler() {
        this.renderKey += 1;
      },
      deep: true,
    },

    getJobDetailsArrayList: function (newValue, oldValue) {
      this.setJobCardData();
    },

    "$store.state.CustomerLaunchStore.CrmExpressMouleEditKey": function () {
      this.initialEditCall();
    },

    jobTypesSelected: function () {
      if (this.$store.state.CustomerLaunchStore.CrmExpressMouleEditKey) {
        if (this.jobTypesSelected?.job_type == "Multiple Exchange") {
          this.getJobDetailsArrayList.map((i, idx) => {
            this.jobCardExchange = false;
            this.selectedJobDropDown = "Multiple Exchange";

            if (i.job_type == "Exchange") {
              this.addNewExchange.push({
                name: "add_new_exchange",
                idx: this.addNewExchange.length + 1,
                enabled: true,
              });

              this.cardForLoopOne.push({
                ...i,
                name: "add_new_exchange",
                enabled: true,
                idx: this.addNewExchange.length + 0,
              });
            }
            this.renderKey++;
            this.renderKeyForJob++;
          });
        }
        if (this.jobTypesSelected?.job_type == "Multiple Delivery") {
          this.getJobDetailsArrayList.map((i, idx) => {
            this.jobCardDelivery = false;
            this.selectedJobDropDown = "Multiple Delivery";

            if (i.job_type == "Delivery") {
              this.addNewDelivery.push({
                name: "add_new_delivery",
                idx: this.addNewDelivery.length + 0,
                enabled: true,
              });

              this.cardForLoopDeliveryOne.push({
                ...i,
                name: "add_new_delivery",
                enabled: true,
                idx: this.addNewDelivery.length + 0,
              });
            }
            this.renderKey++;
            this.renderKeyForJob++;
          });
        }
      }
    },
  },
  mounted() {
    this.getVolumentricValue().then((c) => {
      let values = c?.volumetric_value;
      this.volumentricValue = values;
    });
    this.selectedJobDropDown = this.selectedJobType.code;
    let collectData = this.getJobDetailsArrayList.find((c) => {
      if (c.job_type.includes("Collect")) {
        return { ...c };
      }
    });

    let returnData = this.getJobDetailsArrayList.find((c) => {
      if (c.job_type.includes("Return")) {
        return { ...c };
      }
    });

    let exchangeData = this.getJobDetailsArrayList.find((c) => {
      if (c.job_type.includes("Exchange")) {
        return { ...c };
      }
    });

    let endorseData = this.getJobDetailsArrayList.find((c) => {
      if (c.job_type.includes("Endorse")) {
        return { ...c };
      }
    });

    let assignmentData = this.getJobDetailsArrayList.find((c) => {
      if (c.job_type.includes("Assignment")) {
        return { ...c };
      }
    });

    // Collect
    this.collectJobCardData = collectData;
    this.companyDetailsObj = collectData
      ? collectData.company_details[0]
      : null;

    // Exchange
    this.exchangeJobCardData = exchangeData;
    this.companyObjExchange = exchangeData
      ? exchangeData.company_details[0]
      : null;

    // Endorse
    this.endorseJobCardData = endorseData;
    this.companyObjEndorse = endorseData
      ? endorseData.company_details[0]
      : null;

    // Assignment
    this.assignmentJobCardData = assignmentData;
    this.companyObjAssignment = assignmentData
      ? assignmentData.company_details[0]
      : null;

    // Return
    this.returnJobCardData = returnData;
    this.companyObjReturn = returnData ? returnData.company_details[0] : null;

    if (this.$route.params.mode == "edit") {
      this.manualChecked;
    }
    this.renderKeyForJob += 1;
  },
  computed: {
    ...crmCusLState,
    ...mapGetters({
      getSurchargeDropDownList:
        "CustomerLaunchStore/getsurchargeDropDownListData",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
      getJobDetailsArrayList: "CustomerLaunchStore/getJobDetailsArrayList",
    }),
  },
};
</script>

<style scoped>
::v-deep
  .p-accordion
  .p-accordion-tab:first-child
  .p-accordion-header
  .p-accordion-header-link {
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion-toggle-icon.pi-chevron-down:before,
::v-deep .p-accordion-toggle-icon.pi-chevron-right:before {
  position: absolute !important;
  right: 0 !important;
  margin-right: 14px !important;
  top: 0 !important;
  margin-top: 10px !important;
  color: #4e5968;
}

::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  border: 1px solid #dee2e6;
  color: #4e5968 !important ;
  background: #d0e0ff;
  height: 12px;
  font-size: 16px !important;
}

::v-deep .p-accordion-header-text {
  line-height: 1;
  font-size: 16px !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight:hover
  .p-accordion-header-link {
  border-color: #d0e0ff !important;
  background: #d0e0ff !important;
  color: #4e5968;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link {
  background: #d0e0ff !important;
  border-color: #d0e0ff;
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep
  .p-accordion
  .p-accordion-tab:last-child
  .p-accordion-header:not(.p-highlight)
  .p-accordion-header-link:hover {
  background: #d0e0ff !important;
}

::v-deep .p-accordion .p-accordion-tab:last-child .p-accordion-content {
  background: #f3f7ff;
}

::v-deep
  .p-accordion
  .p-accordion-header:not(.p-disabled).p-highlight
  .p-accordion-header-link:hover {
  color: #4e5968;
  font-size: 16px !important;
}

::v-deep .pi-trash:before {
  color: red;
  margin-right: 30px !important;
}
</style>
