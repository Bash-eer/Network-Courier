<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '60vw',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>Edit Country</template>
    <div class="flex align-items-center">
      <div class="col-6">
        <div class="input-wrapper full-width">
          <div class="label-text mb-2 flex">
            Country Code <span class="required-field ml-1"> *</span>
          </div>
          <TextField
            label="country_code"
            v-model="country_code"
            @blur="v$.country_code.$model"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid':
                v$.country_code.$invalid && (!isValid || !validateSave),
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="input-wrapper full-width">
          <div class="label-text mb-2 flex">
            Country Name<span class="required-field ml-1">*</span>
          </div>
          <TextField
            label="country_name"
            v-model="country_name"
            @blur="v$.country_name.$model"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid':
                v$.country_name.$invalid && (!isValid || !validateSave),
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex align-items-end">
      <div class="flex col">
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="label-text mb-2 flex">
              Destination Code <span class="required-field ml-1"> *</span>
            </div>
            <TextField
              label="destination_code"
              v-model="destination_code"
              @blur="v$.destination_code.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.destination_code.$invalid && !isValid,
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="input-wrapper full-width">
            <div class="label-text mb-2 flex">
              Destination Name<span class="required-field ml-1">*</span>
            </div>
            <TextField
              label="destination_name"
              v-model="destination_name"
              @blur="v$.destination_name.$model"
              v-on:childToParent="getUserInput"
              :classes="{
                'p-invalid': v$.destination_name.$invalid && !isValid,
                'inputfield p-inputtext-sm  w-full dialog-field-text': true,
              }"
            />
          </div>
        </div>
      </div>
      <Buttons
        class="flex mb-3"
        label="Add"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="addDestination"
      />
    </div>
    <div class="destinations-wrapper ml-3">
      <div class="text flex">
        Added Destinations
        <div class="required-field ml-1">*</div>
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
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="setEditDialog(false)"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="save"
        :loading="isloading"
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Dialog,
  },
  props: ["show"],
  data() {
    return {
      showDialog: this.$props.show,
      country_code: "",
      country_name: "",
      destination_code: "",
      destination_name: "",
      destinations: [],
      destinationData: [],
      isValid: true,
      isDestValid: true,
      validateSave: true,
      isloading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      country_code: { required },
      country_name: { required },
      destination_code: { required },
      destination_name: { required },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },

    showDialog(value) {
      this.showDialog = value;

      if (!this.showDialog) {
        this.setEditDialog(false);
      }
    },
  },
  computed: {
    ...mapGetters({
      showEditDialog: "InternationalCountries/showEditDialog",
      editCountryData: "InternationalCountries/editCountryData",
    }),
  },
  methods: {
    ...mapActions({
      setEditDialog: "InternationalCountries/setEditDialog",
      saveEditData: "InternationalCountries/saveEditData",
      updateRefreshKey: "InternationalCountries/updateRefreshKey",
    }),
    addDestination() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      let dest = this.destination_code + " - " + this.destination_name;

      this.destinations.push(dest);
      this.destinationData.push({
        destination_code: this.destination_code,
        destination_name: this.destination_name,
      });

      this.isDestValid = true;

      this.destination_code = "";
      this.destination_name = "";
      this.isValid = true;
    },
    removeDestination(index) {
      this.destinations.splice(index, 1);
      this.destinationData.splice(index, 1);
    },
    async save() {
      if (this.destinations.length) {
        this.isDestValid = true;
      } else {
        this.isDestValid = false;
      }

      if (this.v$.country_code.$invalid || this.v$.country_name.$invalid) {
        this.validateSave = false;
      } else {
        this.validateSave = true;
      }

      if (this.validateSave && this.isDestValid) {
        let data = {
          country_iso_code: this.country_code,
          country_name: this.country_name,
          destinations: this.destinationData,
        };

        try {
          this.isloading = true;
          await this.saveEditData({ id: this.editCountryData.id, data });
          this.updateRefreshKey();
          this.setEditDialog(false);
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Country details edited successfully",
            life: 3000,
          });
          this.isloading = false;
        } catch (err) {
          this.isloading = false;

          if (err.response && err.response.data && err.response.data.message) {
            await this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: err.response.data.message,
              life: 3000,
            });
          } else {
            await this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Something went wrong, Please try again!",
              life: 3000,
            });
          }
        }
      } else {
        this.$emit("isFormValid", { isValid: false, id: this.formId });
      }
    },
  },
  created() {
    console.log("lskjdf laksjd flksjad flksdfj lkj ");
    if (this.editCountryData) {
      this.country_code = this.editCountryData.country_iso_code;
      this.country_name = this.editCountryData.country_name;

      this.editCountryData.destinations.map((list) => {
        this.destinations.push(
          list.destination_code + " - " + list.destination_name
        );
        this.destinationData.push({
          destination_code: list.destination_code,
          destination_name: list.destination_name,
        });
      });
    }
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
