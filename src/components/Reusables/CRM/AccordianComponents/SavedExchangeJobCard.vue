<template>
  <div
    class="flex flex-column min-height-75 card-cusd-crm border-radius-10 mx-2"
    :key="renderKey"
  >
    <div
      v-if="JobCardData"
      class="flex justify-content-between flex-wrap card-container"
      :key="renderKey"
    >
      <div
        class="
          flex flex-grow-1
          align-items-center
          justify-content-start
          w-4rem
          h-3rem
          font-bold
          text-white
          border-round
          mx-2
        "
      >
        <div
          class="flex flex-row h-1.1rem w-auto bg-fff pt-2 border-radius-8 ml-3"
        >
          <div class="flex mx-2">
            <img
              v-if="jobCardHead == 'Exchange'"
              class="h-1rem w-1rem"
              src="/images/equal-way.png"
              alt=""
            />
            <img
              v-if="JobCardData?.job_type == 'Collect'"
              class="h-1rem w-1rem"
              src="/images/shipping-box.png"
              alt=""
            />
            <img
              v-if="jobCardHead == 'Return'"
              class="h-1rem w-1rem"
              src="/images/truck.png"
              alt=""
            />
            <img
              v-if="jobCardHead == 'Delivery'"
              class="h-1rem w-1rem"
              src="/images/equal-way.png"
              alt=""
            />
            <img
              v-if="jobCardHead == 'Endorse'"
              class="h-1rem w-1rem"
              src="/images/endorse.png"
              alt=""
            />
            <img
              v-if="jobCardHead == 'Assignment'"
              class="h-1rem w-1rem"
              src="/images/Assignment.png"
              alt=""
            />
          </div>
          <div class="flex mr-2">
            <h3
              v-if="
                JobCardData.job_type == 'Collect' || jobCardHead == 'Return'
              "
              class="font-size-12 color-009918"
            >
              {{ JobCardData?.job_type }}
            </h3>
            <h3
              v-else-if="jobCardHead == 'Exchange'"
              class="font-size-12 color-EB4646"
            >
              {{ jobCardHead }}
            </h3>
            <h3
              v-else-if="jobCardHead == 'Delivery'"
              class="font-size-12 color-EB4646"
            >
              {{ jobCardHead }}
            </h3>
            <h3
              v-else-if="jobCardHead == 'Endorse'"
              class="font-size-12 color-ffc00f"
            >
              {{ jobCardHead }}
            </h3>
            <h3
              v-else-if="jobCardHead == 'Assignment'"
              class="font-size-12 color-FC9023"
            >
              {{ jobCardHead }}
            </h3>
          </div>
        </div>

        <div class="flex flex-row h-1.1rem w-auto pt-2 border-radius-8">
          <div class="flex mx-2">
            <img class="h-1rem w-1rem" src="/images/tick-circle.png" alt="" />
          </div>
          <div class="flex mr-2">
            <h3 class="font-size-12 color-fff bold-600">FOC</h3>
          </div>
        </div>
      </div>

      <div
        class="
          flex flex-grow-1
          align-items-center
          justify-content-end
          w-4rem
          h-4rem
          font-bold
          text-white
          border-round
          mx-2
        "
      >
        <div class="flex flex-row h-1.1rem w-auto border-radius-8">
          <div class="flex mx-2" @click="clickedEdit">
            <i class="pi pi-pencil pointer" style="font-size: 1rem"></i>
          </div>
        </div>

        <div class="flex flex-row h-1.1rem w-auto border-radius-8">
          <div class="flex mx-2" @click="clickedDelete">
            <img
              class="h-1rem w-1rem pointer"
              src="/images/red-cross.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="companyDetailsObj"
      :key="renderKey"
      class="flex flex-row h-1.1rem w-auto border-radius-8 mx-3"
    >
      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">
            Company Name
          </h3>
        </div>
        <div>
          <h3 class="font-size-12 color-fff text-left">
            {{ companyDetailsObj.company_name }}
          </h3>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">Address</h3>
        </div>
        <div>
          <h3 class="font-size-12 color-fff text-left">
            {{ companyDetailsObj.address }},
            {{ companyDetailsObj.building_name }}, #{{
              companyDetailsObj.floor_no
            }}-{{ companyDetailsObj.unit_no }},
            {{ companyDetailsObj.postal_code }}
          </h3>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">
            Contact Info
          </h3>
        </div>
        <div class="flex flex-row">
          <div class="flex">
            <h3 class="font-size-12 color-fff text-left">
              <i class="pi pi-user mr-2" style="font-size: 1rem"></i>
              {{ companyDetailsObj.contact_person_name }}
            </h3>
          </div>

          <div class="flex">
            <h3 class="font-size-12 color-fff text-left mx-2">
              <i class="pi pi-phone mr-2" style="font-size: 1rem"></i>
              {{ companyDetailsObj.contact_no }}
            </h3>
          </div>

          <div class="flex">
            <h3 class="font-size-12 color-fff text-left mx-2">
              <i class="pi pi-envelope mr-2" style="font-size: 1rem"></i>
              {{ companyDetailsObj.email_id }}
            </h3>
          </div>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 mx-2">
        <div>
          <h3 class="font-size-12 color-fff bold-600 text-left">Date & Time</h3>
        </div>
        <div>
          <h3 class="font-size-12 color-fff text-left">
            {{ getDateAndTime(JobCardData.time_date) }}
          </h3>
        </div>
      </div>
    </div>

    <div v-for="jobCardInfo of jobCardInfo" :key="jobCardInfo">
      <div class="flex flex-row Job-head my-1 mx-3">
        <div class="flex">
          <i
            class="pi pi-shopping-bag mr-2 color-fff"
            style="font-size: 1rem"
          ></i>
          <h6 class="font-size-14 text-start color-fff bold-600">
            Job Details > {{ jobCardInfo?.job_role }} Info
          </h6>
        </div>
      </div>

      <div class="flex flex-row h-1rem w-auto border-radius-8 mx-3">
        <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
          <div>
            <h3 class="font-size-12 color-fff bold-600 text-left">
              Service Type
            </h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              {{ jobCardInfo?.service_type }}
            </h3>
          </div>
        </div>

        <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
          <div>
            <h3 class="font-size-12 color-fff bold-600 text-left">
              Logistics Mode
            </h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              {{ JobCardData?.logistics_mode }}
            </h3>
          </div>
        </div>

        <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
          <div>
            <h3 class="font-size-12 color-fff bold-600 text-left">
              Order/Reference
            </h3>
          </div>
          <div class="flex flex-row">
            <div class="flex">
              <h3 class="font-size-12 color-fff text-left">
                {{ jobCardInfo?.order_reference_no }}
              </h3>
            </div>
          </div>
        </div>

        <div class="flex flex-column flex-grow-1 mx-2 border-right-4383e5">
          <div>
            <h3 class="font-size-12 color-fff bold-600 text-left">Cash $</h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              {{ jobCardInfo?.cash }}$
            </h3>
          </div>
        </div>

        <div
          v-if="jobCardInfo.parcel_details.length != 0"
          class="flex flex-column flex-grow-1 mx-2 border-right-4383e5"
        >
          <div>
            <h3 class="font-size-12 color-fff bold-600 text-left">
              Parcel Details
            </h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              Total weight (kg) : {{ totalWeight.toFixed(2) }}
            </h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              Total Vol. weight (kg) : {{ volumetricWeight.toFixed(2) }}
            </h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              Total chargable. weight (kg) : {{ chargeableWeight.toFixed(2) }}
            </h3>
          </div>
        </div>

        <div class="flex flex-column flex-grow-1 mx-2">
          <div>
            <h3 class="font-size-12 color-fff text-left">Remarks</h3>
          </div>
          <div>
            <h3 class="font-size-12 color-fff text-left">
              {{ jobCardInfo?.remarks }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex justify-content-between flex-wrap card-container"
      :key="renderKey"
    >
      <div
        class="
          flex flex-grow-1
          align-items-center
          justify-content-start
          w-4rem
          h-4rem
          font-bold
          text-white
          border-round
          m-1
        "
      >
        <div class="flex flex-row h-1.1rem w-auto border-radius-8 mt-1 mx-3">
          <div class="flex mr-2 pt-2">
            <h3 class="font-size-12 color-fff bold-600">Attachments :</h3>
          </div>
        </div>

        <div
          v-for="jobCardAttachments of jobCardAttachments"
          :key="jobCardAttachments"
          class="flex flex-row h-1rem w-auto border-radius-8"
        >
          <div class="flex mr-2">
            <!-- Code for PDF Icon here -->
            <span>
              <img
                :src="'/images/' + 'drag-drop-pdf' + '.png'"
                alt="pdf"
                width="30"
                height="27"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "SavedExchangeJobCard",
  components: {},
  props: [
    "jobCardHead",
    "JobCardData",
    "companyDetailsObj",
    "jobCardInfo",
    "jobCardAttachments",
    "EditId",
    "editIndex",
  ],
  data() {
    return {
      emptyData: "",
      searcher: "",
      renderKey: 1,
      checked1: false,
      checked2: false,
      radioValue1: "",
      radioValue2: "",
      savedCardData: {},
      totalWeight: 0,
      volumetricWeight: 0,
      chargeableWeight: 0,
    };
  },
  created() {
    this.renderKey++;
    this.jobCardInfo.map((x) => {
      x.parcel_details.map((i) => {
        this.chargeableWeight = this.chargeableWeight + i.chargable_weight;
        this.totalWeight = this.totalWeight + i.act_weight;
        this.volumetricWeight = this.volumetricWeight + i.vol_weight;
      });
    });
  },
  methods: {
    getDateAndTime(date) {
      let dateValue = moment(date).format("Do MMMM YYYY, h:mm A");
      return dateValue;
    },
    clickedEdit() {
      let isUpdate = true;
      let selectedId = this.JobCardData.id;

      this.$emit(
        "emitedEditJobCard",
        this.jobCardHead,
        false,
        { ...this.JobCardData },
        isUpdate,
        selectedId,
        this.EditId,
        this.editIndex
      );
    },
    clickedDelete() {
      let selectedId = this.JobCardData.id;
      this.$emit(
        "emitedDeleteJobCard",
        this.jobCardHead,
        false,
        { ...this.JobCardData },
        selectedId
      );
    },
  },
};
</script>

<style scoped>
.card-cusd-crm {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  min-height: 13vh;
}
</style>
