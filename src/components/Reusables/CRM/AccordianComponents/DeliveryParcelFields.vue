<template>
  <div class="flex justify-content-center card-container blue-container">
    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
        ml-3
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Box No</h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="border text w-100"
            id="username"
            type="text"
            v-model="fieldsData.boxNo"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Length (cm)</h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="border text w-100"
            id="username"
            type="text"
            v-model="fieldsData.length"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">width (cm)</h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="border text w-100"
            id="username"
            type="text"
            v-model="fieldsData.width"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">Height (cm)</h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="border text w-100"
            id="username"
            type="text"
            v-model="fieldsData.height"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Vol. Weight (kg)
        </h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            :useGrouping="false"
            class="border text w-100"
            id="username"
            type="text"
            v-model="volWeight"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Act. Weight (kg)
        </h5>
      </div>

      <div class="flex">
        <div class="mb-1 w-100">
          <InputNumber
            mode="decimal"
            class="border text w-100"
            id="username"
            type="text"
            v-model="actWeight"
          />
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <h5 class="color-7a7a7a font-size-12 flex color-4E5968">
          Chargable Weight
        </h5>
      </div>

      <div class="flex">
        <div class="mt-3 mb-2 w-100">
          <h2 class="font-size-12 color-7a7a7a justify-content-center">
            {{ chargeableWeight?.toFixed(2) }} Kg
          </h2>
        </div>
      </div>
    </div>

    <div
      class="
        flex-row
        width-120
        align-items-center
        justify-content-center
        h-4rem
        font-bold
        text-white
        border-round
        m-2
      "
    >
      <div class="flex">
        <div class="mt-5 mb-2 w-100" @click="cloneParcel(deliveryParcelObj.id)">
          <i
            class="pi pi-copy color-357dea mx-1"
            style="font-size: 1.35rem"
          ></i>
        </div>

        <div
          class="mt-5 mb-2 w-100"
          @click="deleteParcel(deliveryParcelObj.id)"
        >
          <i
            class="pi pi-times color-EB4646 mx-1"
            style="font-size: 1.35rem"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputNumber from "primevue/inputnumber";
export default {
  name: "DeliveryParcelFields",
  components: { InputNumber },
  props: ["deliveryParcelObj", "volumentricValue", "selectedUpdateData"],
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
      fieldsData: {
        boxNo: 0,
        length: 0,
        width: 0,
        height: 0,
      },
      volWeight: 0,
      actWeight: 0,
      chargeableWeight: 0,
      volumetricWeight: 0,
    };
  },
  computed: {
    ...mapGetters({
      getVolumentricValueState: "CustomerLaunchStore/getVolumentricValueState",
    }),
  },
  watch: {
    fieldsData: {
      handler(newVal, oldVal) {
        let dimensionValue =
          (newVal?.length * newVal?.width * newVal?.height) /
          this.volumetricWeight;
        this.volWeight = dimensionValue;
      },
      deep: true,
    },
    actWeight: function (newVal, oldVal) {
      let greatedWeight = newVal > this.volWeight ? newVal : this.volWeight;
      this.chargeableWeight = greatedWeight;

      let data = {
        volWeight: this.volWeight,
        actWeight: this.actWeight,
        chargeableWeight: greatedWeight,
        boxNo: this.fieldsData.boxNo,
        length: this.fieldsData.length,
        width: this.fieldsData.width,
        height: this.fieldsData.height,
      };
      let id = this.fieldsData.id;

      this.$emit("parcelTotalWeight", data, id);
    },
    volWeight: function (newVal, oldVal) {
      let greatedWeight = newVal > this.actWeight ? newVal : this.actWeight;
      this.chargeableWeight = greatedWeight;

      let data = {
        volWeight: this.volWeight,
        actWeight: this.actWeight,
        chargeableWeight: greatedWeight,
        boxNo: this.fieldsData.boxNo,
        length: this.fieldsData.length,
        width: this.fieldsData.width,
        height: this.fieldsData.height,
      };

      let id = this.fieldsData.id;
      this.$emit("parcelTotalWeight", data, id);
    },
  },
  methods: {
    cloneParcel(id) {
      let data = {
        ...this.fieldsData,
        box_no: this.fieldsData.boxNo,
        act_weight: this.actWeight,
        vol_weight: this.volWeight,
      };
      this.$emit("cloneTheParcel", id, data);
    },
    deleteParcel(id) {
      this.$emit("deleteTheParcel", id);
    },
  },
  created() {
    this.fieldsData.boxNo = this.deliveryParcelObj.box_no;
    this.fieldsData.length = this.deliveryParcelObj.length;
    this.fieldsData.width = this.deliveryParcelObj.width;
    this.fieldsData.height = this.deliveryParcelObj.height;
    this.fieldsData.id = this.deliveryParcelObj.id;
    this.volWeight = this.deliveryParcelObj.vol_weight;
    this.actWeight = this.deliveryParcelObj.act_weight;
    this.chargeableWeight = this.deliveryParcelObj.chargable_weight;
    this.volumetricWeight = this.getVolumentricValueState;

    if (this.selectedUpdateData) {
      let data = [];

      this.selectedUpdateData?.map((x, i) => {
        this.fieldsData.boxNo = this.selectedUpdateData[i].box_no;
        this.fieldsData.length = this.selectedUpdateData[i].length;
        this.fieldsData.width = this.selectedUpdateData[i].width;
        this.fieldsData.height = this.selectedUpdateData[i].height;
      });
    }
  },
};
</script>

<style scoped></style>
