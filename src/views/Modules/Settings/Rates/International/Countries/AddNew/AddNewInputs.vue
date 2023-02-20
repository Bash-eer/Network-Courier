<template>
  <div>
    <div class="flex align-items-end">
      <div class="flex align-items-center col-6">
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="required color-7a7a7a font-size-14 bold-500  mb-2 flex">
              Country Code 
              <!-- <span class="required-field ml-1"> *</span> -->
            </div>
            <TextField
              label="country_code"
              v-model="formData.country_code"
              @blur="v$.formData.country_code.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v$.formData.country_code.$invalid &&
                  (!isValid || !validateSave),
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="required color-7a7a7a font-size-14 bold-500  mb-2 flex">
              Country Name
              <!-- <span class="required-field ml-1">*</span> -->
            </div>
            <TextField
              label="country_name"
              v-model="formData.country_name"
              @blur="v$.formData.country_name.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid':
                  v$.formData.country_name.$invalid &&
                  (!isValid || !validateSave),
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
      <div
        v-if="count !== 1"
        @click="$emit('removeForm', formId)"
        class="pi pi-times-circle ml-3 pointer remove-icon mb-4"
      ></div>
    </div>

    <div class="flex align-items-end">
      <div class="flex col-6">
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="required color-7a7a7a font-size-14 bold-500  mb-2 flex">
              Destination Code 
              <!-- <span class="required-field ml-1"> *</span> -->
            </div>
            <TextField
              label="destination_code"
              v-model="formData.destination_code"
              @blur="v$.formData.destination_code.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.destination_code.$invalid && !isValid,
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="required color-7a7a7a font-size-14 bold-500  mb-2 flex">
              Destination Name
              <!-- <span class="required-field ml-1">*</span> -->
            </div>
            <TextField
              label="destination_name"
              v-model="formData.destination_name"
              @blur="v$.formData.destination_name.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.formData.destination_name.$invalid && !isValid,
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
      <Buttons
        class="flex mb-3"
        label="Add"
        button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
        v-on:childToParent="addDestination"
      />
    </div>
    <div class="destinations-wrapper ml-3">
      <div class="required color-7a7a7a font-size-14 bold-500 flex">
        Added Destinations
        <!-- <div class="required-field ml-1">*</div> -->
      </div>
      <div
        class="list-wrapper mt-2"
        :class="!isDestValid && 'list-wrapper-err'"
      >
        <div class="flex flex-row flex-wrap">
          <div
            v-for="(chip, index) of destinations"
            :key="index"
            class="flex mr-2 m-1"
          >
            <ZoneChips
              v-on:childToParent="removeDestination"
              :data="[chip, index]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions } from "vuex";

export default {
  props: ["saveKey", "formId", "count"],
  data() {
    return {
      formData: {
        country_code: "",
        country_name: "",
        destination_code: "",
        destination_name: "",
      },
      destinations: [],
      destinationData: [],
      isValid: true,
      isDestValid: true,
      validateSave: true,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        country_code: { required },
        country_name: { required },
        destination_code: { required },
        destination_name: { required },
      },
    };
  },
  watch: {
    saveKey() {
      if (this.destinations.length) {
        this.isDestValid = true;
      } else {
        this.isDestValid = false;
      }

      if (
        this.v$.formData.country_code.$invalid ||
        this.v$.formData.country_name.$invalid
      ) {
        this.validateSave = false;
      } else {
        this.validateSave = true;
      }

      if (this.validateSave && this.isDestValid) {
        this.$emit("isFormValid", { isValid: true, id: this.formId });
      } else {
        this.$emit("isFormValid", { isValid: false, id: this.formId });
      }
    },
  },
  methods: {
    ...mapActions({
      setCountryData: "InternationalCountries/setCountryData",
    }),
    getUserInput() {
      this.setCountryData({
        idx: this.formId,
        data: {
          country_iso_code: this.formData.country_code,
          country_name: this.formData.country_name,
          destinations: this.destinationData,
        },
      });

      if (
        !this.v$.formData.country_code.$invalid &&
        !this.v$.formData.country_name.$invalid &&
        this.destinations.length
      ) {
        this.$emit("isFormValid", { isValid: true, id: this.formId });
      } else {
        this.$emit("isFormValid", { isValid: false, id: this.formId });
      }
    },
    addDestination() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      let dest =
        this.formData.destination_code + " - " + this.formData.destination_name;

      this.destinations.push(dest);
      this.destinationData.push({
        destination_code: this.formData.destination_code,
        destination_name: this.formData.destination_name,
      });

      this.isDestValid = true;

      this.formData.destination_code = "";
      this.formData.destination_name = "";
      this.isValid = true;
      this.watchDestination();
    },
    removeDestination(index) {
      this.destinations.splice(index, 1);
      this.destinationData.splice(index, 1);
      this.setCountryData({
        idx: this.formId,
        data: {
          country_iso_code: this.formData.country_code,
          country_name: this.formData.country_name,
          destinations: this.destinationData,
        },
      });
      this.watchDestination();
    },
    watchDestination() {
      if (this.destinations.length) {
        this.$emit("isFormValid", { isValid: true, id: this.formId });
      } else {
        this.$emit("isFormValid", { isValid: false, id: this.formId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  padding: 0.5rem;
  min-height: 100px;
}

.list-wrapper-err {
  border: 1px solid #f44336 !important;
}

.remove-icon {
  font-size: 22px !important;
}
</style>