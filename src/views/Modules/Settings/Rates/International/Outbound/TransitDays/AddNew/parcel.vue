<template>
  <div class="content">
    <div class="flex align-items-end">
      <div :key="renderKey" class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Country
          <span class="ml-1 required-field">*</span>
        </div>
        <DropDownField
          label="country_id"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :data="countryOpts"
          v-model="formData.country_id"
          :value="formData.country_id"
          :classes="{
            'p-invalid': v$.formData.country_id.$invalid && !isValid,
          }"
        />
      </div>
      <div :key="renderKey" class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Destination
          <span class="ml-1 required-field">*</span>
        </div>
        <DropDownField
          mode="decimal"
          v-on:childToParent="getUserInput"
          label="destination_id"
          :data="destinationOpts"
          :value="formData.destination_id"
          v-model="formData.destination_id"
          :classes="{
            'p-invalid': v$.formData.destination_id.$invalid && !isValid,
          }"
        />
      </div>

      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Postal Code
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="postal_code"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.postal_code"
          :value="formData.postal_code"
          :classes="{
            'p-invalid': v$.formData.postal_code.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Transit Days
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="transit_days"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.transit_days"
          :value="formData.transit_days"
          :classes="{
            'p-invalid': v$.formData.transit_days.$invalid && !isValid,
          }"
        />
      </div>
      <Buttons
        label="Add"
        class="mb-2"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="addDest"
      />
    </div>

    <div class="destinations-wrapper ml-2 mt-3">
      <div class="text flex">
        Added Destinations with Transit
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

    <div class="flex align-items-center justify-content-end mt-4">
      <Buttons
        label="cancel"
        class="mb-2"
        type="outline"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="returnToList"
      />
      <Buttons
        label="Save"
        class="mb-2"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="save"
        :isloading="loading"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { errhandler } from "@/services/httpClient";

export default {
  data() {
    return {
      isValid: true,
      renderKey: 10,
      isloading: false,
      countryOpts: [],
      destinations: [],
      destinationOpts: [],
      destData: [],
      isDestValid: true,
      formData: {
        country_id: "",
        destination_id: "",
        postal_code: "",
        transit_days: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        country_id: { required },
        destination_id: { required },
        postal_code: { required },
        transit_days: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      getDestList: "Outbound/getDestList",
      postTransitDays: "Outbound/Edit/postTransitDays",
    }),
    async save() {
      if (this.destData && !this.destData.length) {
        this.isDestValid = false;
        return;
      }

      try {
        this.isloading = true;
        await this.postTransitDays(this.destData);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Data added successfully",
          life: 3000,
        });
        this.isloading = false;
        this.destData = [];
        this.destinations = [];
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
    addDest() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      let dest =
        this.formData.country_id.name +
        " - " +
        this.formData.destination_id.name +
        " - " +
        this.formData.postal_code +
        " - " +
        this.formData.transit_days +
        " Days";

      this.destinations.push(dest);

      let obj = {
        country_id: this.formData.country_id.country_id,
        destination_id: this.formData.destination_id.destination_id,
        postal_code: this.formData.postal_code.toString(),
        transit_days: this.formData.transit_days,
        agent_id: this.$route.params.id,
        type: "parcel",
      };

      this.destData.push(obj);

      this.formData = {
        country_id: "",
        destination_id: "",
        postal_code: "",
        transit_days: "",
      };

      this.renderKey++;

      this.isDestValid = true;
      this.isValid = true;
    },
    getUserInput(label, value) {
      if (label === "country_id") {
        this.destList(value.country_id);
      }
    },
    returnToList() {
      this.$router.push({ name: "TransitDays" });
    },
    removeDestination(index) {
      this.destinations.splice(index, 1);
      this.destData.splice(index, 1);
    },
    async destList(id) {
      if (id) {
        try {
          console.log(id);
          this.destinationOpts = [];
          let res = await this.getDestList(id);

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
    async getCountries() {
      this.countryOpts = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countryOpts.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  created() {
    this.getCountries();
  },
};
</script>

<style scoped>
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

:deep .p-calendar {
  width: 100%;
}

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