<template :key="renderKey">
  <div>
    <div>
      <div class="flex justify-content-start">
        <div
          class="
            flex-column flex-row
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mt-1
            border-round
          "
        >
          <h5 class="color-7a7a7a font-size-12 flex color-4e5968">
            Delivery Parcel
          </h5>
        </div>

        <div
          class="
            flex-column flex-row flex-grow-1
            align-items-start
            justify-content-start
            font-bold
            text-gray-900
            px-3
            mt-1
            border-round
          "
        >
          <h5 class="color-4e5968 font-size-12 flex color-4E5968">
            No of Parcels :
            {{ deliveryParcelArray.length }}
          </h5>
        </div>
      </div>

      <div v-for="item in deliveryParcelArray" :key="item.id">
        <DeliveryParcelFields
          @deleteTheParcel="deleteTheParcelFunct"
          :deliveryParcelObj="item"
          @cloneTheParcel="cloneParcelFunct"
          :volumentricValue="volumentricValue"
          @parcelTotalWeight="parcelTotalWeight"
        />
      </div>

      <!-- <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          mt-1
          border-round
        "
        
      > -->
      <h5
        @click="addParcelRow"
        class="font-size-14 color-064ed1 bold-600 flex width-120 ml-3"
      >
        + Add New Parcels
      </h5>
      <!-- </div> -->
    </div>

    <div
      v-if="deliveryParcelArray.length > 0"
      class="
        flex-column flex-row
        align-items-start
        justify-content-start
        font-bold
        text-gray-900
        px-3
        mt-2
        pt-3
        border-round border-top-d4d4d4
      "
    >
      <div
        class="
          flex
          justify-content-end
          flex-wrap
          card-container
          green-container
        "
      >
        <div
          class="
            flex flex-row flex-grow-1
            align-items-center
            justify-content-end
            font-bold
            text-white
            border-round
          "
        >
          <div class="flex">
            <h6 class="color-7a7a7a font-size-14">Total Vol. Weight (Kg)</h6>
          </div>

          <div class="fl mx-2">
            <h6 class="color-7a7a7a font-size-14 bold-700">
              {{ totalWeightOne?.toFixed(2) }}
            </h6>
          </div>
        </div>
        <div
          class="
            flex flex-grow-1
            align-items-center
            justify-content-end
            h-1rem
            font-bold
            text-white
            border-round
          "
        >
          <div class="flex">
            <h6 class="color-7a7a7a font-size-14">Total Weight (Kg)</h6>
          </div>

          <div class="fl mx-2">
            <h6 class="color-7a7a7a font-size-14 bold-700">
              {{ totalWeightTwo?.toFixed(2) }}
            </h6>
          </div>
        </div>
        <div
          class="
            flex flex-grow-1
            align-items-center
            justify-content-end
            h-1rem
            font-bold
            text-white
            border-round
          "
        >
          <div class="flex">
            <h6 class="color-7a7a7a font-size-14">
              Total Chargeable Weight (Kg)
            </h6>
          </div>

          <div class="flex mx-2">
            <h4 class="color-66c11e font-size-32 bold-700">
              {{ totalWeightThree?.toFixed(2) }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeliveryParcelFields from "./DeliveryParcelFields.vue";
export default {
  name: "DeliveryParcel",
  components: { DeliveryParcelFields },
  props: ["volumentricValue", "selectedUpdateDataOne"],
  data() {
    return {
      emptyData: "",
      searcher: "",
      checked1: false,
      checked2: false,
      radioValue1: "",
      radioValue2: "",
      selectedServiceType: null,
      serviceType: [
        { name: "Document", code: "document" },
        { name: "Parcel", code: "parcel" },
      ],
      deliveryParcelArray: [],

      totalWeightOne: 0,
      totalWeightTwo: 0,
      totalWeightThree: 0,
      renderKey: 1,
    };
  },
  methods: {
    cloneParcelFunct(id, data) {
      const items = this.deliveryParcelArray.find((c) => c.id == id);
      if (items) {
        this.deliveryParcelArray = [
          ...this.deliveryParcelArray,
          { ...data, id: this.deliveryParcelArray.length + 1 },
        ];
      }
    },
    deleteTheParcelFunct(id) {
      const items = this.deliveryParcelArray.filter((c) => c.id !== id);
      this.deliveryParcelArray = [...items];

      this.$emit("deleteParcel", id);
    },
    addParcelRow() {
      const items = {
        boxNo: 0,
        length: 0,
        width: 0,
        height: 0,
        volWeight: 0,
        actWeight: 0,
        chargeableWeight: 0,
      };
      this.deliveryParcelArray = [
        ...this.deliveryParcelArray,
        { ...items, id: this.deliveryParcelArray.length + 1 },
      ];
    },
    parcelTotalWeight(data, id) {
      let updatedData = this.deliveryParcelArray.map((c) => {
        if (c.id == id) {
          return { ...data, id: c.id };
        } else {
          return { ...c };
        }
      });

      this.totalWeightOne = updatedData.reduce((acc, obj) => {
        return acc + obj.volWeight;
      }, 0);
      this.totalWeightTwo = updatedData.reduce((acc, obj) => {
        return acc + obj.actWeight;
      }, 0);
      this.totalWeightThree = updatedData.reduce((acc, obj) => {
        return acc + obj.chargeableWeight;
      }, 0);

      this.deliveryParcelArray = updatedData;

      let datas = id;
      this.$emit("parcelTotalWeight", data, id);
    },
  },
  async created() {
    if (this.selectedUpdateDataOne) {
      this.deliveryParcelArray =
        this.selectedUpdateDataOne?.info[0]?.parcel_details;
      this.renderKey++;
    }
  },
  watch: {},
};
</script>

<style scoped></style>
