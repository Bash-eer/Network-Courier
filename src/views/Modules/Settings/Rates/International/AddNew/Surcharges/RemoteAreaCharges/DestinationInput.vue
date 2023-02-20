<template>
  <div class="flex align-items-end">
    <div class="flex align-items-center" v-if="type == 'normal'">
      <div class="input-wrapper col-4">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Destination
          <!-- <span class="required-field ml-2">*</span> -->
        </div>
        <div>
          <DropDownField
            :data="destinationOpts"
            v-model="formData.destination_id"
            :value="formData.destination_id"
            :key="formData.destination_id"
            v-on:childToParent="getUserInput"
            label="destination_id"
            code="destination_id"
            :filter="true"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Postal code
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="postal_code"
          v-model="formData.postal_code"
          class="number-field"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Per Kg Doc $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_document_rate"
          v-model="formData.per_document_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Per Kg Parcel $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_parcel_rate"
          v-model="formData.per_parcel_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Minimum $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_min_rate"
          v-model="formData.per_min_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div
        v-if="count !== 1"
        @click="$emit('removeRow', rowId)"
        class="pi pi-times pointer mt-4"
      ></div>
    </div>

    <div class="flex align-items-center" v-else>
      <div class="input-wrapper col-4">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Destination
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <div>
          <DropDownField
            :data="destinationOpts"
            v-model="multiplierData.destination_id"
            :value="multiplierData.destination_id"
            :key="multiplierData.destination_id"
            v-on:childToParent="getUserInput"
            label="destination_id"
            code="destination_id"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Postal code
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="postal_code"
          v-model="multiplierData.postal_code"
          class="number-field"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Per Kg Doc $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_document_rate"
          v-model="multiplierData.per_document_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Minimum $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_document_mim_rate"
          v-model="multiplierData.per_document_mim_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Per Kg Parcel $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_parcel_rate"
          v-model="multiplierData.per_parcel_rate"
          :maxFractionDigits="2"
          class="number-field"
          mode="decimal"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Minimum $
          <!-- <span class="-field ml-2">*</span> -->
        </div>
        <NumberField
          @childToParent="getUserInput"
          label="per_parcel_min_rate"
          v-model="multiplierData.per_parcel_min_rate"
          class="number-field"
          :maxFractionDigits="2"
          mode="decimal"
        />
      </div>
      <div
        v-if="count !== 1"
        @click="$emit('removeRow', rowId)"
        class="pi pi-times pointer mt-4"
      ></div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["count", "rowId", "destinations", "type", "country_id"],
  emits: ["isRowValid", "setDestinations"],
  data() {
    return {
      destinationOpts: [],
      isValid: true,
      formData: {
        destination_id: "",
        postal_code: "",
        per_document_rate: "",
        per_parcel_rate: "",
        per_min_rate: "",
      },
      multiplierData: {
        destination_id: "",
        postal_code: "",
        per_document_rate: "",
        per_document_mim_rate: "",
        per_parcel_rate: "",
        per_parcel_min_rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    // if (this.$props.type == "normal") {
    //   return {
    //     formData: {
    //       destination_id: { required },
    //       postal_code: { required },
    //       per_document_rate: { required },
    //       per_parcel_rate: { required },
    //       per_min_rate: { required },
    //     },
    //   };
    // } else {
    //   return {
    //     multiplierData: {
    //       destination_id: { required },
    //       postal_code: { required },
    //       per_document_rate: { required },
    //       per_document_mim_rate: { required },
    //       per_parcel_min_rate: { required },
    //       per_parcel_rate: { required },
    //     },
    //   };
    // }
  },
  watch: {
    country_id() {
      this.destList();
    },
    footerBtnKey() {
      this.setIsNextValid(false);
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.isValid = true;
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      if (this.$props.type == "normal") {
        this.$emit("setDestinations", { idx: this.rowId, data: this.formData });
      } else {
        this.$emit("setDestinations", {
          idx: this.rowId,
          data: this.multiplierData,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      footerBtnKey: "AddNewInternational/footerBtnKey",
    }),
  },
  methods: {
    ...mapActions({
      setIsNextValid: "AddNewInternational/setIsNextValid",
      getDestList: "Outbound/getDestList",
    }),
    async destList() {
      if (this.$props.country_id) {
        try {
          this.destinationOpts = [];
          let res = await this.getDestList(this.$props.country_id);

          res.data.results.map((list) => {
            this.destinationOpts.push({
              name: list.destination_name,
              code: list.destination_code,
              destination_id: list.id,
            });
          });

          console.log("hit", this.destinationOpts);
        } catch (error) {
          console.log(error);
        }
      }
    },
    getUserInput() {
      if (this.$props.type == "normal") {
        this.$emit("setDestinations", { idx: this.rowId, data: this.formData });
      } else {
        this.$emit("setDestinations", {
          idx: this.rowId,
          data: this.multiplierData,
        });
      }
    },
    async prefillData() {
      await this.destList();
      if (this.$props.type == "normal") {
        let defState = {
          destination: "",
          postal_code: "",
          doc: "",
          parcel: "",
          minimum: "",
        };
        this.formData = this.destinations || defState;
        return;
      } else {
        let defMultiplierState = {
          destination_id: "",
          postal_code: "",
          per_document_rate: "",
          per_document_mim_rate: "",
          per_parcel_rate: "",
          per_parcel_min_rate: "",
        };
        this.multiplierData = this.destinations || defMultiplierState;
      }
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style>
</style>