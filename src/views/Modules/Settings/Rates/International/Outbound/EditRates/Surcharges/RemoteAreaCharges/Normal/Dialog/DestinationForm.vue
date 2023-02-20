<template>
  <div>
    <div class="input-wrapper col">
      <div class="label mb-2 flex">Destination</div>
      <div :key="formData.destination_id" class="flex">
        <DropDownField
          :data="destinationOpts"
          v-model="formData.destination_id"
          :value="formData.destination_id"
          :key="formData.destination_id"
          :filter="true"
          v-on:childToParent="getUserInput"
          label="destination_id"
          code="destination_id"
          :classes="{
            'p-invalid': v$.formData.destination_id.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
        <div
          v-if="count !== 1"
          @click="$emit('removeRow', rowId)"
          class="pi pi-times pointer ml-3 mt-2"
        ></div>
      </div>
    </div>
    <div class="flex align-items-end">
      <div class="input-wrapper col">
        <div class="label mb-2 flex">Postal code</div>
        <NumberField
          @childToParent="getUserInput"
          label="postal_code"
          v-model="formData.postal_code"
          class="number-field"
          mode="decimal"
          :classes="{
            'p-invalid': v$.formData.postal_code.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="label mb-2 flex">Per Kg Doc $</div>
        <NumberField
          @childToParent="getUserInput"
          label="per_document_rate"
          v-model="formData.per_document_rate"
          class="number-field"
          mode="decimal"
          :classes="{
            'p-invalid': v$.formData.per_document_rate.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <div class="flex align-items-end">
      <div class="input-wrapper col">
        <div class="label mb-2 flex">Per Kg Parcel $</div>
        <NumberField
          @childToParent="getUserInput"
          label="per_parcel_rate"
          mode="decimal"
          class="number-field"
          v-model="formData.per_parcel_rate"
          :classes="{
            'p-invalid': v$.formData.per_parcel_rate.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="label mb-2 flex">Minimum $</div>
        <NumberField
          @childToParent="getUserInput"
          label="per_min_rate"
          v-model="formData.per_min_rate"
          class="number-field"
          mode="decimal"
          :classes="{
            'p-invalid': v$.formData.per_min_rate.$invalid && !isValid,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["count", "rowId", "destinations", "type", "saveKey", "country_id"],
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
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        destination_id: {},
        postal_code: {},
        per_document_rate: {},
        per_parcel_rate: {},
        per_min_rate: {},
      },
    };
  },
  watch: {
    saveKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },
    country_id() {
      this.destList();
    },
  },
  computed: {
    ...mapGetters({
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      getDestList: "Outbound/getDestList",
    }),
    getUserInput() {
      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      this.$emit("setDestinations", {
        idx: this.rowId,
        data: this.formData,
      });
    },
    async destList() {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    if (this.editData?.type == "remote_area_charges_n") {
      if (this.$props.country_id) {
        await this.destList();
      }
      let data = this.editData.data;

      this.formData.destination_id = data.destination_id;
      this.formData.postal_code = data.postal_code;
      this.formData.per_document_rate = data.document;
      this.formData.per_parcel_rate = data.parcel;
      this.formData.per_min_rate = data.min;

      this.$emit("setDestinations", {
        idx: this.rowId,
        data: this.formData,
      });
    }
  },
};
</script>

<style>
</style>