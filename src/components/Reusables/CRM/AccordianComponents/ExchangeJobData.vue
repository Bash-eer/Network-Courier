<template>
  <div :key="renderKey">
    <div class="ml-3 pt-2">
      <h3 class="color-4E5968 bold-600 color-4E5968 flex font-size-14">
        Job Details
      </h3>
    </div>

    <div class="flex justify-content-around">
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <div class="color-7a7a7a font-size-12 flex color-4E5968">
          Logistics Mode <b class="color-red pl-2"> &#42; </b>
        </div>
        <div class="flex flex-row">
          <div class="mt-2 w-100">
            <Dropdown
              v-model="selectedLogistics"
              :options="getLogisticsList"
              @change="OnChangeLogistics"
              optionLabel="name"
              placeholder="Select Logistics"
              class="custom-drop-down height-40"
              :class="{
                'p-invalid': v$.selectedLogistics.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />

            <span v-if="v$.selectedLogistics.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.selectedLogistics.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          mt-4
          pt-3
          px-4
          mb-2
          border-round
        "
      >
        <div class="flex flex-row">
          <div class="flex w-7rem h-1rem font-bold border-round">
            <Checkbox
              v-model="combinations"
              :binary="true"
              :aria-disabled="true"
            />
            <h6 class="pl-2 font-size-14 bold-600 color-1e90ff">Combination</h6>
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          px-3
          pt-3
          mb-2
          border-round
        "
      >
        <div class="flex-row">
          <div class="w-100">
            <div class="col-12 md:col-4">
              <div class="p-inputgroup w-20rem bg-fff">
                <span class="border">
                  <Dropdown
                    v-model="selectedTrip"
                    :options="getRapidoTripNumber"
                    optionLabel="trip_name"
                    placeholder=""
                    class="w-7rem border bg-fff"
                  />
                </span>
                <InputText
                  class="border text w-100"
                  id="username"
                  type="text"
                  v-model="value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Priority -->
    <div id="JobPriorityId" class="flex justify-content-around mb-2 row ml-0">
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          col-3
          px-3
          border-round
        "
      >
        <h5
          class="color-7a7a7a font-size-14 flex bold-500 bold-600 color-4E5968"
        >
          Job Priority
        </h5>

        <div class="flex flex-row">
          <div class="bg-fff pt-2 pb-2 job-priority-dropdown">
            <Dropdown
              :key="selectedJobPriority"
              v-model="selectedJobPriority"
              :options="
                gerCrmBookingData?.charge_type?.toLowerCase() == 'normal'
                  ? getjobPriorityList
                  : $store.state.CustomerLaunchStore[
                      'jobPriorityDropDownList' + selectedLogistics?.name
                    ]
              "
              optionLabel="name"
              placeholder="Job Priority"
              @change="$emit('priorityChange', selectedJobPriority, $event)"
            />
          </div>
          <div class="bg-fff p-2">
            <Buttons
              button_class="w-100 text-nowrap"
              label="Show Trips"
              :disabled="false"
              @click="onClickShowTrips"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          col-5
          px-3
          border-round
        "
      >
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Date & Time
        </h5>
        <div :class="`bg-white col-4 flex flex-row pl-3 py-3`">
          {{ getModelTime(jopPriorityTrip) }}

          <div
            v-if="!selectedTime_pri && submitted == true"
            class="time-feild-color ml-2 my-auto"
          >
            Please fill the time
          </div>
        </div>
      </div>
    </div>
    <!-- Delivery Info -->
    <div
      v-if="
        selectedJobType == 'Delivery' ||
        selectedJobType == 'Endorse' ||
        selectedJobType == 'Assignment' ||
        selectedJobType == 'Exchange'
      "
      class="mb-2"
    >
      <div class="ml-3">
        <h3 class="color-4E5968 bold-600 color-4E5968 flex font-size-14">
          Delivery Info
        </h3>
      </div>

      <div class="flex justify-content-around">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Service Type <b class="color-red pl-2"> &#42; </b>
          </h5>

          <div class="flex flex-row">
            <div class="width-190">
              <Dropdown
                v-model="selectedServiceTypeDelivery"
                :options="serviceTypeDelivery"
                optionLabel="name"
                placeholder="Cost Center Name"
                class="custom-drop-down height-40 width-190"
                :class="{
                  'p-invalid':
                    v$.selectedServiceTypeDelivery.$invalid && submitted,
                  'inputfield w-full dialog-field-text ': true,
                }"
              />

              <span v-if="v$.selectedServiceTypeDelivery.$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.selectedServiceTypeDelivery
                    .$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Delivery Document
          </h5>

          <div class="flex flex-row flex-grow-1">
            <div class="w-100">
              <InputText
                class="border text w-100"
                id="deliveryDocument"
                type="text"
                v-model="deliveryDocument"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
            cash-width
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            <div class="flex w-7rem height-12 font-bold border-round">
              <Checkbox v-model="collectionCashDelivery" :binary="true" />
              <h6 class="mt-1 pl-2 color-7a7a7a font-size-12 flex color-4E5968">
                Cash S$
              </h6>
            </div>
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <InputNumber
                mode="decimal"
                :useGrouping="false"
                class="text w-100"
                id="username"
                type="text"
                v-model="collectionCashValueDelivery"
                :disabled="!collectionCashDelivery"
                :minFractionDigits="0"
                :maxFractionDigits="4"
              />
            </div>
          </div>
        </div>
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumberDelivery"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="w-100">
              <Textarea
                v-model="collectionRemarkDelivery"
                class="h-3rem overflow-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="selectedServiceTypeDelivery.code == 'parcel'"
        class="
          w-100
          py-3
          bg-e1ecff
          flex
          align-items-start
          justify-content-start
          mb-4
          ml-3
        "
      >
        <DeliveryParcel
          :volumentricValue="volumentricValue"
          @parcelTotalWeight="parcelTotalWeight"
          @deleteParcel="deleteParcel"
          :selectedUpdateDataOne="selectedUpdateData"
          :key="renderKeyUpdate"
        />
      </div>
      <!-- <div class="flex justify-content-around mt-2">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumberDelivery"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100">
              <Textarea
                v-model="collectionRemarkDelivery"
                class="h-3rem overflow-auto"
              />
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- collection info -->
    <div v-if="selectedJobType == 'Collect' || selectedJobType == 'Exchange'">
      <div class="ml-3">
        <h3 class="color-4E5968 bold-600 color-4E5968 flex font-size-14">
          Collection Info
        </h3>
      </div>

      <div class="flex justify-content-around">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Service Type <b class="color-red pl-2"> &#42; </b>
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <Dropdown
                v-model="selectedServiceType"
                :options="serviceType"
                optionLabel="name"
                placeholder="Cost Center Name"
                class="custom-drop-down height-40"
              />
            </div>
          </div>
        </div>

        <!-- <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Collect Documents
          </h5>

          <div class="flex flex-row">
            <div class="">
              <InputText
                class="border text"
                id="username"
                type="text"
                v-model="collectDocuments"
              />
            </div>
          </div>
        </div> -->

        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Collect Document
          </h5>

          <div class="flex flex-row">
            <div class="mb-2 w-100">
              <InputText
                class="border text"
                id="username"
                type="text"
                v-model="collectDocuments"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
            cash-width
          "
        >
          <h5 class="mb-2 color-7a7a7a font-size-12 flex color-4E5968">
            <div class="flex height-12 font-bold border-round">
              <Checkbox v-model="collectionCash" :binary="true" />
              <h6
                class="
                  pl-2
                  mt-1
                  color-7a7a7a
                  font-size-12
                  pt-1
                  flex
                  color-4E5968
                "
              >
                Cash S$
              </h6>
            </div>
          </h5>

          <div class="flex flex-row">
            <div class="">
              <InputNumber
                mode="decimal"
                :useGrouping="false"
                class="text"
                id="username"
                type="text"
                v-model="collectionCashValue"
                :disabled="!collectionCash"
                :minFractionDigits="0"
                :maxFractionDigits="4"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="mb-2 w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumber"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="h-3rem w-100">
              <Textarea
                v-model="collectionRemark"
                class="h-3rem overflow-auto w-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="selectedServiceType?.code == 'parcel'"
        class="
          w-100
          py-3
          bg-e1ecff
          mb-4
          flex
          align-items-start
          justify-content-start
          ml-3
        "
      >
        <DeliveryParcel
          :volumentricValue="volumentricValue"
          @parcelTotalWeight="parcelTotalWeight"
          @deleteParcel="deleteParcel"
          :selectedUpdateDataOne="selectedUpdateData"
          :key="renderKeyUpdate"
        />
      </div>

      <div class="flex justify-content-around mt-2">
        <!-- <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumber"
              />
            </div>
          </div>
        </div> -->

        <!-- <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100 h-3rem">
              <Textarea
                v-model="collectionRemark"
                class="h-5rem overflow-auto"
              />
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!-- collection info -->
    <div v-if="selectedJobType == 'Return'" class="mb-2">
      <div class="ml-3">
        <h3 class="color-4E5968 bold-600 color-4E5968 flex font-size-14">
          Return Info
        </h3>
      </div>

      <div class="flex justify-content-around">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Service Type <b class="color-red pl-2"> &#42; </b>
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <Dropdown
                v-model="selectedServiceType"
                :options="serviceType"
                optionLabel="name"
                placeholder="Cost Center Name"
                class="custom-drop-down height-40 mb-2"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Return Documents
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="collectDocuments"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
            cash-width
          "
        >
          <h5 class="mb-2 color-7a7a7a font-size-12 flex color-4E5968">
            <div class="flex w-7rem height-12 font-bold border-round">
              <Checkbox v-model="collectionCash" :binary="true" />
              <h6 class="pl-2 mt-1 color-7a7a7a font-size-12 flex color-4E5968">
                Cash S$
              </h6>
            </div>
          </h5>

          <div class="flex flex-row">
            <div class="mb-2 w-100">
              <InputNumber
                mode="decimal"
                :useGrouping="false"
                class="text w-100"
                id="username"
                type="text"
                v-model="collectionCashValue"
                :disabled="!collectionCash"
                :minFractionDigits="0"
                :maxFractionDigits="4"
              />
            </div>
          </div>
        </div>
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumber"
              />
            </div>
          </div>
        </div>
        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="w-100">
              <Textarea
                v-model="collectionRemark"
                class="h-3rem overflow-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="selectedServiceType?.code == 'parcel'"
        class="
          w-100
          py-3
          bg-e1ecff
          mb-4
          flex
          align-items-start
          justify-content-start
          ml-3
        "
      >
        <DeliveryParcel
          :volumentricValue="volumentricValue"
          @parcelTotalWeight="parcelTotalWeight"
          @deleteParcel="deleteParcel"
          :selectedUpdateDataOne="selectedUpdateData"
          :key="renderKeyUpdate"
        />
      </div>
      <!-- <div class="flex justify-content-around mt-2">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Order/Reference No
          </h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100">
              <InputText
                class="border text w-100"
                id="username"
                type="text"
                v-model="orderRefNumber"
              />
            </div>
          </div>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mb-2
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Remarks</h5>

          <div class="flex flex-row">
            <div class="mt-2 mb-2 w-100">
              <Textarea
                v-model="collectionRemark"
                class="h-5rem overflow-auto"
              />
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Company info -->
    <div class="ml-3 -mt-4">
      <h3
        class="
          color-4E5968
          bold-600
          color-4E5968
          flex
          font-size-14
          companyDetails
        "
      >
        Company Details
      </h3>
    </div>

    <div class="flex justify-content-around">
      <!-- <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Company Name<b class="color-red pl-2"> &#42; </b>
        </h5>

        <div class="flex flex-row">
          <div class="w-100 custom-drop-down">
            <AddNewDropDown
              stateName="customerNameDropDownList"
              v-model="details.company_name"
              :data="$store.state.CustomerLaunchStore.customerNameDropDownList"
              :companyDetails="gerCrmBookingData"
              storePath="internationalInbound"
              placeholder="CustomerName"
              tableName="CompanyName"
              class="custom-drop-down"
              type="companyData"
            />
          </div>
        </div>
      </div> -->

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          border-round
          company-name-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Company Name<b class="color-red pl-2"> &#42; </b>
        </h5>
        <div class="flex flex-row">
          <div class="w-100 custom-drop-down">
            <AddNewDropDown
              stateName="customerNameDropDownList"
              v-model="details.company_name"
              :data="$store.state.CustomerLaunchStore.customerNameDropDownList"
              :companyDetails="gerCrmBookingData"
              storePath="internationalInbound"
              placeholder="CustomerName"
              tableName="CompanyName"
              class="custom-drop-down"
              type="companyData"
            />
          </div>
        </div>
      </div>

      <!-- <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Contact Person
          <b class="color-red pl-2"> &#42; </b>
        </h5>

        <div class="flex flex-row">
          <div class="w-25rem custom-drop-down">
            <AddNewDropDown
              stateName="customerContactDropDownList"
              v-model="details.company_contact"
              :data="
                $store.state.CustomerLaunchStore.customerContactDropDownList
              "
              :state="details.company_contact"
              :companyDetails="gerCrmBookingData"
              storePath="internationalInbound"
              placeholder="CustomerContact"
              tableName="CompanyContact"
              class="custom-drop-down"
              type="companyDataContact"
            />
          </div>
        </div>
      </div> -->
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          postal-code-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Postal Code</h5>

        <div class="flex flex-row">
          <div class="w-100">
            <div class="p-inputgroup">
              <InputNumber
                mode="decimal"
                :useGrouping="false"
                class="text w-100"
                id="username"
                type="text"
                v-model="postalCode"
              />
              <span class="p-inputgroup-addon primary-color cursor-pointer"
                ><i @click="getDetail" class="fas fa-search font-size-14"></i
              ></span>
              <!-- <Button icon="pi pi-search" class="primary-color"/> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Address</h5>

        <div class="flex flex-row">
          <div :key="renderKey" class="w-100">
            <!-- {{address_list}} -->
            <!-- <AutoComplete
        v-model="address"
        :suggestions="address_list"
        @item-select="onSelect($event)"
        @complete="searchAddress($event)"
        minLength=""
        field="name"
        :inputClass="{
          'inputfield  dialog-dropdown-text text w-100': true,
        }"
        optionLabel="name"
      /> -->
            <div class="p-inputgroup">
              <InputText
                class="text w-100"
                id="username"
                type="text"
                v-model="address"
              />
              <!-- <span class="p-inputgroup-addon primary-color cursor-pointer"><i @click="editTotalCost" class="fas fa-search font-size-14"></i></span> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          floor-no-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Building Name
        </h5>

        <div class="flex flex-row">
          <div class="w-100">
            <InputText
              class="border text w-100"
              id="username"
              type="text"
              v-model="buildingName"
            />
          </div>
        </div>
      </div>
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          cash-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Floor No</h5>

        <div class="flex flex-row">
          <div class="w-100">
            <input
              type="text"
              class="form-control"
              :maxlength="max"
              v-model="floorNumber"
            />
          </div>
        </div>
      </div>
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          cash-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Unit No</h5>

        <div class="flex flex-row">
          <div class="w-100">
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="text w-100"
              id="username"
              type="text"
              v-model="unitNumber"
            />
          </div>
        </div>
      </div>

      <!-- <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          floor-no-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Floor No</h5>

        <div class="flex flex-row">
          <div class="w-100">
            <input
              type="text"
              class="form-control"
              :maxlength="max"
              v-model="gerCompanyNameDropDownId.floor_no"
            />
          </div>
        </div>
      </div> -->
    </div>

    <div class="flex justify-content-start mt-2">
      <!-- <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Postal Code</h5>

        <div class="flex flex-row">
          <div class="mt-2 mb-2 w-100">
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="text w-100"
              id="username"
              type="text"
              v-model="postalCode"
            />
          </div>
        </div>
      </div> -->

      <!-- <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Enter the Address <b class="color-red pl-2"> &#42; </b>
        </h5>

        <div class="flex flex-row">
          <div class="mt-2 mb-2 w-100">
            <InputText
              class="text w-100"
              id="username"
              type="text"
              v-model="address"
            />
          </div>
        </div>
      </div> -->

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Contact Person
        </h5>
        <div class="flex flex-row">
          <div class="mt-1 mb-2 w-10rem text-align-start">
            <AddNewDropDown
              stateName="customerContactDropDownList"
              v-model="details.company_contact"
              :data="
                $store.state.CustomerLaunchStore.customerContactDropDownList
              "
              :state="details.company_contact"
              :companyDetails="gerCrmBookingData"
              storePath="internationalInbound"
              placeholder="CustomerContact"
              tableName="CompanyContact"
              class="custom-drop-down"
              type="companyDataContact"
            />
          </div>
        </div>
      </div>

      <!-- <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Unit No</h5>

        <div class="flex flex-row">
          <div class="mt-2 mb-2 w-100">
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="text w-100"
              id="username"
              type="text"
              v-model="unitNumber"
            />
          </div>
        </div>
      </div> -->

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Contact No <b class="color-red pl-2"> &#42; </b>
        </h5>

        <div class="flex flex-row">
          <div class="w-100">
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="text w-100"
              id="username"
              type="text"
              v-model="contactNumber"
              :class="{
                'p-invalid': v$.contactNumber.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />

            <span v-if="v$.contactNumber.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.contactNumber.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Fax No</h5>

        <div class="flex flex-row">
          <div class="w-100">
            <InputText
              class="border text"
              id="username"
              type="text"
              v-model="faxNumber"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Email ID</h5>

        <div class="flex flex-row email_id">
          <div class="w-100">
            <InputText
              class="text w-100"
              id="username"
              type="text"
              v-model="emailId"
              :class="{
                //'p-invalid': v$.emailId.$invalid && submitted,
                'dialog-label-text dialog-field-text': true,
              }"
            />
            <!-- <span v-if="v$.emailId.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.emailId.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="flex justify-content-start mb-2 pt-2">
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Fax No</h5>

        <div class="flex flex-row">
          <div class="mt-1 mb-2 w-100">
            <InputText
              class="border text"
              id="username"
              type="text"
              v-model="faxNumber"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Email Id</h5>

        <div class="flex flex-row">
          <div class="mt-1 mb-2 w-100">
            <InputText
              class="border text"
              id="username"
              type="text"
              v-model="emailId"
            />
          </div>
        </div>
      </div>
    </div> -->

    <div v-if="$route.params.type != 'Adhoc'" class="ml-3">
      <h3 class="color-4E5968 bold-600 color-4E5968 flex font-size-14">
        Surcharge
      </h3>
    </div>

    <div
      v-if="$route.params.type != 'Adhoc'"
      class="flex justify-content-start mb-2"
    >
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Surcharge Name
        </h5>

        <div class="flex flex-row">
          <div class="mt-1 mb-2 w-10rem text-align-start">
            <Dropdown
              v-model="selectedSurcharge"
              :options="SurchargeDropDownList"
              @show="getDropDownData"
              optionLabel="name"
              placeholder="Select surcharge name"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
          cash-width
        "
      >
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Rate S$</h5>

        <div class="flex flex-row">
          <div class="mt-1 mb-2 w-100">
            <InputNumber
              mode="decimal"
              :useGrouping="false"
              class="text"
              id="username"
              type="text"
              v-model="surchargeRate"
              :minFractionDigits="0"
              :maxFractionDigits="4"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          px-3
          mb-2
          mt-1
          border-round
        "
      >
        <div class="flex flex-row">
          <div class="mt-4 w-100">
            <Buttons
              label="Add"
              button_class="dialog-button-text"
              @click="addValue"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-content-start mb-4">
        <div
          class="
            flex-column flex-row flex-grow-1
            justify-content-start
            font-bold
            text-gray-900
            px-3
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
            Surcharges
          </h5>
          <div :key="surchargeRenderKey" class="bg-fff w-100 flex flex-wrap">
            <div
              class="flex align-content-start"
              v-for="inputData in inputValue"
              :key="inputData"
            >
              <!-- :label="`${inputData}`"  -->
              <Chip
                :label="`${inputData.surcharge_name} - ${inputData.rate}`"
                class="m-1"
                removable
                @remove="deleteSurcharge(inputData)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Surcharge Div -->

    <!-- <div class="flex justify-content-start mb-4">
      <div
        class="
          flex-column flex-row flex-grow-1
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mb-2
          border-round
        "
      >
        <h5 class="color-7a7a7a pb-2 font-size-12 flex color-4E5968">
          Surcharges
        </h5>
        <div class="bg-fff w-100 mt-3 flex flex-wrap">
          <div
            class="flex align-content-start"
            v-for="inputData in inputValue"
            :key="inputData"
          >
            <Chip :label="`${inputData}`" class="m-2" removable />
          </div>
        </div>
      </div>
    </div> -->

    <div class="dragdrop">
      <DragAndDropUpload
        v-if="AttachmentType == 'CrmCollectFileAttachment'"
        :state="crmFileAttachments"
        type="CrmCollectFileAttachment"
        storePath="CustomerLaunchStore"
        :default="upload_files_collect"
        :key="renderCollect"
      />
      <DragAndDropUpload
        v-if="AttachmentType == 'CrmReturnFileAttachment'"
        :state="crmReturnFileAttachmentsData"
        type="CrmReturnFileAttachment"
        storePath="CustomerLaunchStore"
        :default="upload_files_return"
        :key="renderReturn"
      />
      <DragAndDropUpload
        v-if="AttachmentType == 'CrmExchangeFileAttachment'"
        :state="crmExchangeFileAttachmentsData"
        type="CrmExchangeFileAttachment"
        storePath="CustomerLaunchStore"
        :default="upload_files_exchange"
        :key="renderExchange"
      />
      <DragAndDropUpload
        v-if="AttachmentType == 'CrmDeliveryFileAttachment'"
        :state="crmDeliveryFileAttachmentsData"
        type="CrmDeliveryFileAttachment"
        storePath="CustomerLaunchStore"
        :default="upload_files_delivery"
        :key="renderDelivery"
      />
      <DragAndDropUpload
        v-if="AttachmentType == 'CrmEndorseFileAttachment'"
        :state="crmFileAttachments"
        type="CrmEndorseFileAttachment"
        storePath="CustomerLaunchStore"
        :default="upload_files_endrose"
        :key="renderCollect"
      />
    </div>

    <div
      class="
        w-100
        height-42
        mx-2
        flex
        align-items-end
        justify-content-end
        -mt-3
        buttontop
      "
    >
      <div class="flex flex-row">
        <div class="flex mx-2">
          <Buttons
            v-if="!isUpdateBtn"
            label="Cancel"
            button_class="dialog-button-text"
            @click="cancel(this.selectedJobType)"
          />
        </div>
        <div class="flex mx-2">
          <Buttons
            v-if="isUpdateBtn"
            label="Update"
            button_class="dialog-button-text"
            @click="saveJobType(true, selectedJobType, true)"
          />

          <Buttons
            v-else
            label="Save"
            @click="saveJobType(true, selectedJobType, false)"
            button_class="dialog-button-text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import DeliveryParcel from "../AccordianComponents/DeliveryParcel.vue";
import { mapActions, mapGetters } from "vuex";
import InputNumber from "primevue/inputnumber";
import Chip from "primevue/chip";
import AddNewDropDown from "../../../../components/Reusables/CRM/AddNewDropDown.vue";
import { crm_launch, crmCusLState } from "../../../../store/modules/CRM/helper";
import { salesCommon, sales_co } from "../../../../store/helper";
import Textarea from "primevue/textarea";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import moment from "moment";

export default {
  name: "ExchangeJobData",
  components: {
    Dropdown,
    Checkbox,
    InputText,
    DeliveryParcel,
    InputNumber,
    Chip,
    AddNewDropDown,
    Textarea,
  },
  props: [
    "selectedJobType",
    "documentDetailType",
    "SurchargeDropDownList",
    "isUpdateBtn",
    "AttachmentType",
    "index",
    "volumentricValue",
    "selectedUpdateData",
    "selectedJob",
    "selectedTime",
    "jopPriorityTrip",
  ],

  data() {
    return {
      value: null,
      v$: useVuelidate(),
      initial_section: true,
      renderKeyUpdate: 1,
      number_selected: null,
      selectedJobPriority: null,
      selectedTime_pri: "",
      address_list: [],
      kl: document.getElementById("JobPriorityId"),
      renderKey: 1,
      emptyData: "",
      selectedLogistics: { name: "Van" },
      selectedTrip: null,
      searcher: "",
      checked1: false,
      selectedSurcharge: null,
      address: "",
      company_name_DropDown: "",
      company_contact_DropDown: "",
      postalCode: 0,
      contactNumber: "",
      orderRefNumber: "",
      orderRefNumberDelivery: "",
      unitNumber: "",
      floorNumber: "",
      max: 3,
      emailId: "",
      buildingName: "",
      faxNumber: "",
      customerNameSelected: null,
      customerContactSelected: null,
      collectionCashValue: "",
      collectionCashValueDelivery: "",
      combinations: false,
      surchargeRate: "",
      deliveryCashValue: "",
      crmFileAttachments: " ",
      crmReturnFileAttachmentsData: " ",
      crmCollectFileAttachmentsData: " ",
      crmDeliveryFileAttachmentsData: " ",
      crmExchangeFileAttachmentsData: " ",
      collectDocuments: "",
      checked2: false,
      radioValue1: "",
      deliveryDocument: "",
      inputValue: [],
      inputData: [],
      renderCollect: 10,
      renderReturn: 10,
      renderDelivery: 10,
      renderExchange: 10,
      upload_files_collect: [],
      upload_files_return: [],
      upload_files_exchange: [],
      upload_files_delivery: [],
      upload_files_endrose: [],
      surchargeArray: [],
      surchargeRenderKey: 1,
      radioValue2: "",
      deliveryCash: false,
      collectionCash: false,
      collectionCashDelivery: false,
      collectionRemark: "",
      collectionRemarkDelivery: "",
      updateData: {},
      selectedServiceType: { name: "Parcel", code: "parcel" },
      selectedServiceTypeDelivery: { name: "Parcel", code: "parcel" },
      serviceType: [
        { name: "Document", code: "document" },
        { name: "Parcel", code: "parcel" },
      ],
      serviceTypeDelivery: [
        { name: "Document", code: "document" },
        { name: "Parcel", code: "parcel" },
      ],
      number: [
        { name: "1st" },
        { name: "2nd" },
        { name: "3rd" },
        { name: "4th" },
        { name: "5th" },
      ],
      details: {
        company_name: "",
        company_contact: "",
      },
      Parcel: [],
      Duplicate: [],
      submitted: false,
    };
  },
  validations() {
    return {
      // emailId: { required, email },
      contactNumber: { required },
      details: {
        company_name: { required },
      },
      selectedServiceTypeDelivery: { required },
      selectedLogistics: { required },
    };
  },

  methods: {
    ...crm_launch,
    ...salesCommon,
    ...mapActions({
      createJobCardData: "CustomerLaunchStore/createJobCardData",
      getCustomerNameDropDownList:
        "CustomerLaunchStore/getCustomerNameDropDownList",
      getCustomerContactDropDownList:
        "CustomerLaunchStore/getCustomerContactDropDownList",
      getCompanyNameDetailsId: "CustomerLaunchStore/getCompanyNameDetailsId",
      updateCompanyNameAddress: "CustomerLaunchStore/updateCompanyNameAddress",
      updateContactPerson: "CustomerLaunchStore/updateContactPerson",
      getTripsNumberRapido: "CustomerLaunchStore/getTripsNumberRapido",
      getCompanyContactDetailsId:
        "CustomerLaunchStore/getCompanyContactDetailsId",
    }),
   async onClickShowTrips() {
      if (this.$route.params.type != "Adhoc") {
       await this.getContractShowTrips({
          id: this.gerCrmBookingData?.contract_id,
          toast: this.$toast,
        });
      }

      this.$emit("enableDialog", this.selectedLogistics);
    },
    getModelTime(e) {
      let date = moment().format("MM/DD/YYYY HH:mm");
      if (e != null) {
        date = moment(e?.c_data).format("L");
        date = `${date} (${e.cus_from_time} - ${e.cus_to_time})`;
      }
      this.selectedTime_pri = date;
      return date ?? "";
    },
    OnChangeLogistics(e) {
      let value = e.value.logistic_mode;
      let data = {
        logistics_mode: value,
      };
      this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
      if (value == "Bike") {
        this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
        this.selectedServiceType = this.serviceType[0];
      }
      if (value == "Van") {
        this.selectedServiceTypeDelivery = this.serviceTypeDelivery[1];
        this.selectedServiceType = this.serviceType[1];
      }
      this.getJobPriorityEcomerceList({ payload: data });
    },
    parcelTotalWeight(data, id) {
      if (data.boxNo !== 0 && data.actWeight !== 0) {
        this.Parcel.push({
          id: id,
          box_no: data.boxNo,
          width: data.width,
          height: data.height,
          length: data.length,
          act_weight: data.actWeight,
          vol_weight: data.volWeight,
          chargable_weight: data.chargeableWeight,
        });
      }
      const ids = this.Parcel.map((o) => o.id);
      const filtered = this.Parcel.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );
      this.Duplicate = filtered;
    },
    deleteParcel(id) {
      const indexOfObject = this.Duplicate.findIndex((object) => {
        return object.id === id;
      });

      this.Duplicate.splice(indexOfObject, 1);
    },
    priorityandDetails(b_data) {
      // Job Details
      this.getLogisticsList.map((i) => {
        if (i?.logistic_mode == b_data?.logistics_mode) {
          this.selectedLogistics = i;
        }
        this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
        this.selectedServiceType = this.serviceType[0];
        if (this.selectedLogistics?.logistic_mode == "Van") {
          this.selectedServiceTypeDelivery = this.serviceTypeDelivery[1];
          this.selectedServiceType = this.serviceType[1];
        }
      });
      if (this.selectedLogistics) {
        let data = {
          logistics_mode: this.selectedLogistics?.logistic_mode,
        };
        this.getJobPriorityEcomerceList({ payload: data });
        this.$emit("UpdateLogistics", this.selectedLogistics?.logistic_mode);
      }
      this.getRapidoTripNumber.map((i) => {
        if (i.trip_name == b_data?.combination_type) {
          this.selectedTrip = i;
        }
      });
      this.combinations = this.selectedUpdateData?.combination_selected;
      this.value = this.selectedUpdateData?.combination_info;
      // Job Pririty

      let priority_data =
        this.gerCrmBookingData?.charge_type?.toLowerCase() == "normal"
          ? this.getjobPriorityList
          : this.$store.state.CustomerLaunchStore[
              "jobPriorityDropDownList" + this.selectedLogistics?.name
            ];
      priority_data?.map((i) => {
        if (i.name == b_data?.job_priority) {
          this.selectedJobPriority = i;
        }
      });
      b_data?.surcharges.map((list) => {
        this.inputValue.push({
          rate: list.rate,
          surcharge_id: list.surcharge_id,
          surcharge_name: list.surcharge_name,
        });
      });
      this.surchargeArray = b_data?.surcharges;
      //  b_data?.surcharges.map((i)=>{
      //   let s_val= i.surcharge_name+ " "+ i.rate
      //   this.inputValue.push(i)
      //  })

      /// Company Details
      this.contactNumber =
        this.selectedUpdateData?.company_details[0]?.contact_no;
      this.postalCode =
        this.selectedUpdateData?.company_details[0]?.postal_code;
      this.address = this.selectedUpdateData?.company_details[0]?.address;
      this.floorNumber = this.selectedUpdateData?.company_details[0]?.floor_no;
      this.unitNumber = this.selectedUpdateData?.company_details[0]?.unit_no;
      this.buildingName =
        this.selectedUpdateData?.company_details[0]?.building_name;
      this.emailId = this.selectedUpdateData?.company_details[0]?.email_id;
      this.faxNumber = this.selectedUpdateData?.company_details[0]?.fax_no;
      this.details.company_contact = {
        name: this.selectedUpdateData?.company_details[0]?.contact_person_name,
        code: this.selectedUpdateData?.company_details[0]?.contact_person_name,
        company_name:
          this.selectedUpdateData?.company_details[0]?.contact_person_name,
        id: this.selectedUpdateData?.company_details[0]?.id,
      };
      this.details.company_name = {
        name: this.selectedUpdateData?.company_details[0]?.company_name,
        code: this.selectedUpdateData?.company_details[0]?.company_name,
        company_name: this.selectedUpdateData?.company_details[0]?.company_name,
        id: "78",
      };
    },
    updateDataPreFill() {
      if (this.selectedUpdateData) {
        let b_data = this.selectedUpdateData;
        this.priorityandDetails(b_data);
        this.collectionCashValue = this.selectedUpdateData?.info[0]?.cash;
        this.collectionCashValueDelivery =
          this.selectedUpdateData?.info[1]?.cash;
        this.collectionRemark = this.selectedUpdateData?.info[0]?.remarks;
        this.collectionRemarkDelivery =
          this.selectedUpdateData?.info[1]?.remarks;
        this.orderRefNumber =
          this.selectedUpdateData?.info[0]?.order_reference_no;
        this.orderRefNumberDelivery =
          this.selectedUpdateData?.info[1]?.order_reference_no;
        this.collectionCash =
          this.selectedUpdateData?.info[1]?.order_reference_no;
        this.deliveryDocument =
          this.selectedUpdateData?.info[0]?.delivery_document;
        this.collectDocuments =
          this.selectedUpdateData?.info[0]?.delivery_document;
        this.collectionCash = this.selectedUpdateData?.info[0]?.cash_selected;
        this.collectionCashDelivery =
          this.selectedUpdateData?.info[1]?.cash_selected;
        this.combinations = this.selectedUpdateData?.combination_selected;
        this.selectedServiceType = this.selectedUpdateData?.service_type;
        this.value = this.selectedUpdateData?.combination_info;
        if (this.selectedUpdateData?.attachments.length != 0) {
          if (this.selectedUpdateData.job_type == "Exchange") {
            this.upload_files_exchange = this.selectedUpdateData?.attachments;
            this.renderExchange++;
          }
        }
      }
    },
    updateDataEndorse() {
      if (this.selectedUpdateData) {
        let b_data = this.selectedUpdateData;
        this.priorityandDetails(b_data);

        // Delivery Info
        this.serviceTypeDelivery.map((i) => {
          if (i.name == b_data?.info[0]?.service_type) {
            this.selectedServiceTypeDelivery = i;
          }
        });

        this.collectionRemarkDelivery =
          this.selectedUpdateData?.info[0]?.remarks;
        this.deliveryDocument =
          this.selectedUpdateData?.info[0]?.delivery_document;
        this.collectionCashDelivery =
          this.selectedUpdateData?.info[0]?.cash_selected;
        this.collectionCashValueDelivery =
          this.selectedUpdateData?.info[0]?.cash;
        this.orderRefNumberDelivery =
          this.selectedUpdateData?.info[0]?.order_reference_no;

        this.selectedServiceType = this.selectedUpdateData?.service_type;

        this.value = this.selectedUpdateData?.combination_info;
        if (this.selectedUpdateData?.attachments.length != 0) {
          if (
            this.selectedUpdateData.job_type == "Endrose" ||
            this.selectedUpdateData.job_type == "Assignment"
          ) {
            this.upload_files_collect = this.selectedUpdateData?.attachments;
            this.renderCollect++;
          } else if (this.selectedUpdateData.job_type == "Delivery") {
            this.upload_files_delivery = this.selectedUpdateData?.attachments;
            this.renderDelivery++;
          }
        }
      }
    },

    updateDataCollection() {
      if (this.selectedUpdateData) {
        let b_data = this.selectedUpdateData;
        this.priorityandDetails(b_data);

        this.collectionRemark = this.selectedUpdateData?.info[0]?.remarks;
        this.collectDocuments =
          this.selectedUpdateData?.info[0]?.delivery_document;
        this.collectionCash = this.selectedUpdateData?.info[0]?.cash_selected;
        this.collectionCashValue = this.selectedUpdateData?.info[0]?.cash;

        this.orderRefNumber =
          this.selectedUpdateData?.info[0]?.order_reference_no;
        this.selectedUpdateData?.info.map((i) => {
          if (i.job_role != "Delivery")
            if (i.service_type == "Parcel") {
              this.selectedServiceType = this.serviceType[1];
            } else {
              this.selectedServiceType = this.serviceType[0];
            }
        });
        if (this.selectedUpdateData?.attachments.length != 0) {
          if (this.selectedUpdateData.job_type == "Collect") {
            this.upload_files_collect = this.selectedUpdateData?.attachments;
            this.renderCollect++;
          } else if (this.selectedUpdateData.job_type == "Return") {
            this.upload_files_return = this.selectedUpdateData?.attachments;
            this.renderReturn++;
          }
        }
      }
    },
    async getDetail(code) {
      let res = await this.getAddress(this.postalCode);
      if (res) {
        let data = res.data.results;
        this.address = `${data.area_name}`;
        this.buildingName = data.building_name;
      }
      this.renderKey++;
    },
    searchAddress(e) {
      setTimeout(async () => {
        let res = await this.getPostalCode(e.query);
        this.address_list = [];
        if (res) {
          res.data.results.map((i) => {
            this.address_list.push({
              name: `${i.area_name}`,
              code: i.from_pincode,
              building_name: i.building_name,
            });
          });
        }
        this.renderKey++;
      }, 850);
    },
    onSelect(e) {
      let data = e.value;
      this.address = data.name;
      this.postalCode = data.code;
      this.buildingName = data.building_name;
      this.renderKey++;
    },
    addValue() {
      let name = this.selectedSurcharge
        ? this.selectedSurcharge.surcharge_name
        : "";
      let value = this.surchargeRate;
      let val = name + " " + value;

      let surchargeObj = {
        surcharge_id: Object.keys(this.inputValue).length + 1,
        surcharge_name: name,
        rate: value,
      };
      const objectToReplace = this.surchargeArray.findIndex(
        (arrayItem) => arrayItem.surcharge_name === name
      );
      if (objectToReplace >= 0) {
        this.surchargeArray.splice(objectToReplace, 1, surchargeObj);
        this.inputValue.splice(objectToReplace, 1, surchargeObj);
      } else {
        this.surchargeArray.push(surchargeObj);
        this.inputValue.push(surchargeObj);
      }
      this.surchargeRenderKey += 1;
    },
    async deleteSurcharge(e) {
      this.surchargeArray = this.surchargeArray.filter(
        (i) => i.surcharge_id != e.surcharge_id
      );
      this.inputValue = this.inputValue.filter(
        (i) => i.surcharge_id != e.surcharge_id
      );
    },
    cancel(data) {
      this.$emit("cancelClicked", data);
    },
    async saveJobType(val, type, isUpdate) {
      if (this.v$.$invalid) {
        this.submitted = true;
      } else {
        let payload = {
          contract_profile_id: await this.gerCompanyNameDropDownId
            .contract_profile_id,
          company_name: await this.gerCompanyNameDropDownId.company_name,
          fax_no: this.faxNumber,
          address: this.address,
          postal_code: String(this.postalCode),
          building_name: this.buildingName,
          floor_no: this.floor_no,
          unit_no: String(this.unitNumber),
          id: await Number(this.gerCompanyNameDropDownId.id),
        };
        await this.updateCompanyNameAddress(payload);

        let pay = {
          company_id: await Number(this.getCompanyContactDropDownId.company_id),
          email: this.emailId,
          contact_name: this.details?.company_contact?.contact_name
            ? this.details?.company_contact?.contact_name
            : this.details?.company_contact,
          contact_no: String(this.contactNumber),
          id: this.getCompanyContactDropDownId.id,
        };
        await this.updateContactPerson(pay);

        let AttachmentsArray =
          this.AttachmentType == "CrmCollectFileAttachment"
            ? this.getCrmCommonAttachmentsFiles
            : this.AttachmentType == "CrmReturnFileAttachment"
            ? this.getCrmReturnAttachmentsFiles
            : this.AttachmentType == "CrmExchangeFileAttachment"
            ? this.getCrmExchangeAttachmentsFiles
            : this.AttachmentType == "CrmDeliveryFileAttachment"
            ? this.getCrmDeliveryAttachmentsFiles
            : this.AttachmentType == "CrmEndorseFileAttachment"
            ? this.getCrmCommonAttachmentsFiles
            : [];

        delete this.Duplicate.id;
        let Final = [];
        this.Duplicate.map((x) => {
          Final.push({
            act_weight: x.act_weight,
            box_no: x.box_no,
            chargable_weight: x.chargable_weight,
            height: x.height,
            vol_weight: x.vol_weight,
            length: x.length,
            width: x.width,
          });
        });

        let job = [
          {
            job_role: this.selectedJobType,
            service_type: this.selectedServiceType?.name
              ? this.selectedServiceType?.name
              : this.selectedServiceTypeDelivery?.name,
            delivery_document: this.collectDocuments,
            cash_selected: this.collectionCash
              ? this.collectionCash
              : this.collectionCashDelivery,
            cash: this.collectionCashValue
              ? this.collectionCashValue
              : this.collectionCashValueDelivery,
            order_reference_no: this.orderRefNumber
              ? this.orderRefNumber
              : this.orderRefNumberDelivery,
            remarks: this.collectionRemark
              ? this.collectionRemark
              : this.collectionRemarkDelivery,
            parcel_details: Final,
          },
        ];

        if (this.selectedJobType == "Exchange") {
          if (
            this.selectedServiceTypeDelivery.name &&
            this.collectionCashValueDelivery &&
            this.orderRefNumberDelivery &&
            this.collectionRemarkDelivery
          ) {
            job.push({
              job_role: "Delivery",
              service_type: this.selectedServiceTypeDelivery.name,
              delivery_document: this.deliveryDocument,
              cash_selected: this.collectionCashDelivery,
              cash: this.collectionCashValueDelivery,
              order_reference_no: this.orderRefNumberDelivery,
              remarks: this.collectionRemarkDelivery,
              parcel_details: Final,
            });
          }
        }

        let value;
        if (typeof this.details.company_name === "string") {
          value = this.details.company_name;
        } else if (typeof this.details.company_name === "object") {
          value = this.details.company_name?.name;
        }
        let values;
        if (typeof this.details.company_contact === "string") {
          values = this.details.company_contact;
        } else if (typeof this.details.company_contact === "object") {
          values = this.details.company_contact?.name;
        }

        let val1 = null;
        let val2 = null;
        let val3 = null;
        if (this.selectedLogistics?.logistic_mode == "Bike") {
          val1 = this.selectedLogistics?.id;
        }
        if (this.selectedLogistics?.logistic_mode == "Van") {
          val2 = this.selectedLogistics?.id;
        }
        if (this.selectedLogistics?.logistic_mode == "Rapido") {
          val3 = this.selectedLogistics?.id;
        }
        let attachmentsData = [];
        AttachmentsArray.map((i) => {
          attachmentsData.push({
            file_name: i.file_name,
            url: i.url,
            mime_type: i.mime_type,
            size: i.size,
          });
        });

        let datas = {
          job_type: job[0].job_role,
          job_priority: this.selectedJobPriority?.job_priority,
          job_date: moment(this.jopPriorityTrip?.c_data).format(),
          from_time: this.jopPriorityTrip?.cus_from_time
            ? this.jopPriorityTrip?.cus_from_time
            : moment().format("HH:mm"),
          to_time: this.jopPriorityTrip?.cus_to_time
            ? this.jopPriorityTrip?.cus_to_time
            : "00:00",
          logistics_mode: this.selectedLogistics?.logistic_mode,
          combination_selected: this.combinations,
          combination_type: this.selectedTrip?.trip_name,
          combination_info: this.value,
          // company_name_DropDown: this.company_name_DropDown,
          // company_contact_DropDown: this.company_contact_DropDown,
          note: null,
          bike_trip_id: val1,
          rapido_trip_id: val3,
          van_trip_id: val2,
          job_info: job,
          company_details: {
            // customer_id: this.gerCrmBookingData?.customer_details?.customer_id,
            company_name: value,
            contact_person_name: values,
            contact_no: this.contactNumber,
            postal_code: this.postalCode,
            address: this.address,
            unit_no: this.unitNumber,
            floor_no: this.floorNumber,
            building_name: this.buildingName,
            fax_no: this.faxNumber,
            email_id: this.emailId,
          },
          surcharges: this.surchargeArray,
          attachments: attachmentsData,
          // service_type: this.selectedServiceType?.name,
        };

        this.$emit("saveJobType", val, type, datas, isUpdate, this.index);
        for (let i in datas) {
          this.CompanyNameAddNewData[i] = datas[i];
        }
        this.submitted = false;
      }
    },
  },
  watch: {
    "$store.state.CustomerLaunchStore.billingmode": function () {
      if (this.billing_select) {
        this.getLogisticsList.map((i) => {
          if (this.$store.state.CustomerLaunchStore.billingmode == i.name) {
            this.selectedLogistics = i;
            if (i.name == "Bike") {
              this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
              this.selectedServiceType = this.serviceType[0];
            }
            if (i.name == "Van") {
              this.selectedServiceTypeDelivery = this.serviceTypeDelivery[1];
              this.selectedServiceType = this.serviceType[1];
            }
          }
        });
        this.initial_section = false;
      }
    },
    selectedTime_pri: function (newVal, oldVal) {
      let utcTime = moment(newVal).toISOString();
      this.$emit("timeChange", utcTime);
    },
    documentDetailType: function (newValue, oldValue) {
      this.deliveryDocument = newValue?.delivery_document;
    },
    SurchargeDropDownList: function (newVal, oldVal) {
      this.selectedSurcharge = newVal ? newVal[0] : null;
    },
    selectedSurcharge: function (newVal, oldVal) {
      this.surchargeRate = newVal ? newVal.rates : "";
    },
    customerNameSelected: async function (newVal, oldVal) {
      this.customerNameSelected = newVal;
      this.selectedCustomerName = { ...newVal };
      if (newVal?.id !== oldVal?.id) {
        let newId = newVal?.id;

        this.details.company_name = newVal;

        let pay;
        if (this.$route.params.type == "Adhoc") {
          pay = {
            profile_id: this.gerCrmBookingData?.profile_id,
          };
        } else if (this.$route.params.type == "Contract") {
          pay = {
            contract_profile_id: this.gerCrmBookingData?.contract_id,
          };
        }
        await this.getCustomerNameDropDownList(pay);
      }
    },
    customerContactSelected: async function (newVal, oldVal) {
      this.customerContactSelected = newVal;
      this.selectedCustomerContact = { ...newVal };
      if (newVal?.id !== oldVal?.id) {
        let newId = newVal?.id;
        this.details.company_contact = newVal;

        let val;
        if (typeof this.details.company_name === "string") {
          this.$store.state.CustomerLaunchStore.customerNameDropDownList[0].items.map(
            (x) => {
              if (this.details.company_name == x.company_name) {
                val = x?.id;
              }
            }
          );
        } else if (typeof this.details.company_name === "object") {
          val = this.details.company_name?.id;
        }
        if (this.$route.params.type != "Adhoc") {
          this.getCustomerContactDropDownList(val);
        }

        // await this.getCustomerContactDropDownList(newId);
      }
    },

    selectedUpdateData: {
      handler() {
        if (this.selectedUpdateData && this.selectedJobType == "Exchange") {
          this.updateDataPreFill();
        } else if (
          (this.selectedUpdateData && this.selectedJobType == "Collect") ||
          this.selectedJobType == "Return"
        ) {
          this.updateDataCollection();
        } else if (
          (this.selectedUpdateData && this.selectedJobType == "Endorse") ||
          this.selectedJobType == "Assignment" ||
          this.selectedJobType == "Delivery"
        ) {
          this.updateDataEndorse();
        }
        this.renderKeyUpdate++;
      },
      deep: true,
    },
    gerCompanyNameDropDownId: {
      handler() {
        this.faxNumber = this.gerCompanyNameDropDownId.fax_no;
        this.address = this.gerCompanyNameDropDownId.address;
        this.postalCode = this.gerCompanyNameDropDownId.postal_code;
        this.buildingName = this.gerCompanyNameDropDownId.building_name;
        this.floorNumber = this.gerCompanyNameDropDownId.floor_no;
        this.unitNumber = this.gerCompanyNameDropDownId.unit_no
          ? String(this.gerCompanyNameDropDownId.unit_no)
          : 0;
      },
    },
    getCompanyContactDropDownId: {
      handler() {
        this.contactNumber = this.getCompanyContactDropDownId.contact_no;
        this.emailId = this.getCompanyContactDropDownId.email;
      },
    },

    "details.company_name": async function (newval, oldval) {
      let val;
      if (typeof this.details.company_name === "string") {
        this.$store.state.CustomerLaunchStore.customerNameDropDownList[0].items.map(
          (x) => {
            if (this.details.company_name == x.company_name) {
              val = x?.id;
              this.$store.state.CustomerLaunchStore.contactNameId = x?.id;
            }
          }
        );
      } else if (typeof this.details.company_name === "object") {
        val = this.details.company_name?.id;
        this.$store.state.CustomerLaunchStore.contactNameId =
          this.details.company_name?.id;
        this.$store.state.CustomerLaunchStore.customerNameDropDownList[0].items.map(
          (x) => {
            if (this.details?.company_name?.name == x.company_name) {
              val = x?.id;
              this.$store.state.CustomerLaunchStore.contactNameId = x?.id;
              // this.$store.state.CustomerLaunchStore.customerNameDropDownList[0].items.map(
              //   (x) => {
              //     if (this.details?.company_name?.name == x.company_name) {
              //       val = x?.id;
              //       this.$store.state.CustomerLaunchStore.contactNameId = x?.id;
              //     }
              //   }
              // );
            }
          }
        );
      }
      if (this.$route.params.type != "Adhoc") {
        await this.getCustomerContactDropDownList(val);
      }
      this.renderkey++;
    },

    "$store.state.CustomerLaunchStore.customerContactDropDownList":
      async function (newval, oldval) {
        this.details.company_contact = this.getCustomerContactDropDown
          ? this.getCustomerContactDropDown[0]
          : null;

        // if (
        //   this.selectedUpdateData?.company_details[0]?.contact_person_name !=
        //   null
        // ) {
        //   this.getCustomerContactDropDown.map((x, i) => {
        //     if (
        //       this.selectedUpdateData.company_details[0].contact_person_name ==
        //       x.name
        //     ) {
        //       this.details.company_contact = this.getCustomerContactDropDown[i];
        //     }
        //   });
        // }
        // await this.getCompanyContactDetailsId(
        //   this.details?.company_contact?.id
        // );
      },
    getCustomerNameDropDown: function (newVal, oldVal) {
      if (newVal[0]?.id != oldVal[0]?.id) {
        this.details.company_name = this.getCustomerNameDropDown
          ? this.getCustomerNameDropDown[0]
          : null;
      }
    },
  },
  mounted() {
    this.selectedSurcharge = this.SurchargeDropDownList
      ? this.SurchargeDropDownList[0]
      : null;
    if (this.$route.params.type == "Adhoc") {
      this.selectedLogistics = this.getLogisticsList
        ? this.getLogisticsList[0]
        : null;
    } else {
      let p_fill = this.initail_billing_mode;
      if (p_fill.van && p_fill.bike) {
        this.selectedLogistics = this.getLogisticsList
          ? this.getLogisticsList[0]
          : null;
      } else if (p_fill.van) {
        this.selectedLogistics = this.getLogisticsList
          ? this.getLogisticsList[1]
          : null;
      } else {
        this.selectedLogistics = this.getLogisticsList
          ? this.getLogisticsList[0]
          : null;
      }
    }

    this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
    if (this.selectedLogistics?.logistic_mode == "Bike") {
      this.selectedServiceTypeDelivery = this.serviceTypeDelivery[0];
      this.selectedServiceType = this.serviceType[0];
    }
    if (this.selectedLogistics?.logistic_mode == "Van") {
      this.selectedServiceTypeDelivery = this.serviceTypeDelivery[1];
      this.selectedServiceType = this.serviceType[1];
    }
    this.selectedTrip = this.getRapidoTripNumber
      ? this.getRapidoTripNumber[0]
      : null;
    if (this.selectedLogistics) {
      let data = {
        logistics_mode: this.selectedLogistics?.logistic_mode,
      };
      this.getJobPriorityEcomerceList({ payload: data });
      this.$emit("UpdateLogistics", this.selectedLogistics?.logistic_mode);
    }
    // if(this.selectedLogistics?.logistic_mode){
    this.getTripsNumberRapido({ type: "rapido" });
    // }
  },
  async created() {
    this.selectedJobPriority = this.selectedJob;
    this.selectedTime_pri = this.selectedTime;

    let pay;
    if (this.$route.params.type == "Adhoc") {
      pay = {
        profile_id: this.gerCrmBookingData?.profile_id,
      };
    } else if (this.$route.params.type == "Contract") {
      pay = {
        contract_profile_id: this.gerCrmBookingData?.contract_id,
      };
    }
    let documant_de = this.gerCrmBookingData.document_detail_type_id;
    let data_find = this.JobDetailsType?.find((i) => i.id == documant_de);
    this.deliveryDocument = data_find?.delivery_document ?? "";
    this.collectDocuments = data_find?.return_document ?? "";
    await this.getCustomerNameDropDownList(pay);

    if (this.$route.params.mode != "edit") {
      this.customerNameSelected = this.getCustomerNameDropDown
        ? this.getCustomerNameDropDown[0]
        : null;
      this.selectedCustomerName = { ...this.customerNameSelected };

      this.details.company_name = this.getCustomerNameDropDown
        ? this.getCustomerNameDropDown[0]
        : null;
      this.customerContactSelected = this.getCustomerContactDropDown
        ? this.getCustomerContactDropDown[0]
        : null;
      this.selectedContactCenter = { ...this.customerContactSelected };

      this.details.company_contact = this.getCustomerContactDropDown
        ? this.getCustomerContactDropDown[0]
        : null;
      this.selectedJobPriority =
        this.gerCrmBookingData?.charge_type?.toLowerCase() == "normal"
          ? this.getjobPriorityList[0]
          : this.$store.state?.CustomerLaunchStore[
              "jobPriorityDropDownList" + this.selectedLogistics?.name
            ][0];
    }

    this.$store.state.commonStore.attachmentsTag = "CrmCollectFileAttachment";

    // if (Object.keys(this.getCommonCrmAttachmentStateData).length != 0) {
    //   this.crmFileAttachments =
    //     this.getCommonCrmAttachmentStateData.attachments;

    //   this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles =
    //     this.getCommonCrmAttachmentStateData.attachments;
    // }

    if (this.selectedUpdateData && this.selectedJobType == "Exchange") {
      this.updateDataPreFill();
    } else if (
      (this.selectedUpdateData && this.selectedJobType == "Collect") ||
      this.selectedJobType == "Return"
    ) {
      this.updateDataCollection();
    } else if (
      (this.selectedUpdateData && this.selectedJobType == "Endorse") ||
      this.selectedJobType == "Assignment" ||
      this.selectedJobType == "Delivery"
    ) {
      this.updateDataEndorse();
    }
  },
  unmounted() {
    this.renderKey++;
  },

  computed: {
    ...crmCusLState,
    ...mapGetters({
      CompanyNameAddNewData: "CustomerLaunchStore/CompanyNameAddNewData",
      getLogisticsList: "CustomerLaunchStore/getLogisticsList",
      // getCompanyNameDetailsId: "CustomerLaunchStore/getCompanyNameDetailsId",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
      getCommonCrmAttachmentStateData:
        "CustomerLaunchStore/getCommonCrmAttachmentStateData",
      getCrmCommonAttachmentsFiles:
        "CustomerLaunchStore/getCrmCommonAttachmentsFiles",
      getReturnCrmAttachmentStateData:
        "CustomerLaunchStore/getReturnCrmAttachmentStateData",
      getCrmReturnAttachmentsFiles:
        "CustomerLaunchStore/getCrmReturnAttachmentsFiles",
      getExchangeCrmAttachmentStateData:
        "CustomerLaunchStore/getExchangeCrmAttachmentStateData",
      getCrmExchangeAttachmentsFiles:
        "CustomerLaunchStore/getCrmExchangeAttachmentsFiles",
      getDeliveryCrmAttachmentStateData:
        "CustomerLaunchStore/getDeliveryCrmAttachmentStateData",
      getCrmDeliveryAttachmentsFiles:
        "CustomerLaunchStore/getCrmDeliveryAttachmentsFiles",
      getCustomerNameDropDown: "CustomerLaunchStore/getCustomerNameDropDown",
      CompanyContactAddNewData: "CustomerLaunchStore/CompanyContactAddNewData",

      getCustomerContactDropDown:
        "CustomerLaunchStore/getCustomerContactDropDown",
      gerCompanyNameDropDownId: "CustomerLaunchStore/gerCompanyNameDropDownId",
      getCompanyContactDropDownId:
        "CustomerLaunchStore/getCompanyContactDropDownId",
      // gerCompanyNameDropDownId:
      //   "CustomerLaunchStore/gerCompanyNameDropDownId",
      getRapidoTripNumber: "CustomerLaunchStore/getRapidoTripNumber",
      getjobPriorityList: "CustomerLaunchStore/getjobPriorityList",
    }),
  },
};
</script>

<style scoped>
::v-deep .p-button {
  color: #ffffff;
  background: #2196f3;
  border: 1px solid #2196f3;
  font-size: 14px;
}

::v-deep .p-dropdown {
  background: #ffffff;
  border: 1px solid #ced4da !important ;
  width: 100%;
}

::v-deep .p-dropdown .p-dropdown-label.p-placeholder {
  font-size: 14px;
  text-align: left !important;
}

::v-deep .p-chip {
  background: rgba(126, 132, 167, 1);
  border-radius: 2px;
  color: white;
}

::v-deep .p-dropdown .p-dropdown-label {
  display: flex;
}
.dragdrop {
  margin-top: -30px !important;
  margin-bottom: 30px !important;
}
.companyDetails {
  margin-top: -10px !important;
}
.buttontop {
  margin-top: -25px !important;
}
.cash-width {
  width: 9% !important;
}
.postal-code-width {
  width: 15% !important;
}
.floor-no-width {
  width: 4% !important;
}
.company-name-width {
  width: 10% !important;
}
.email_id {
  width: 50% !important;
}
.primary-color {
  background: #357dea !important;
  color: #ffffff !important;
}
.job-priority-dropdown {
  width: 150px !important;
}
</style>
