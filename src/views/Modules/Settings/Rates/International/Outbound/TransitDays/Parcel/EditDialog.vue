<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '600px',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div v-if="false">Edit Fuel Charges</div>
      <div v-else>Add Fuel Charges</div>
    </template>
    <div class="content">
      <div class="flex align-items-end">
        <div :key="formData.country_id" class="input-wrapper col">
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
            code="country_id"
            :value="formData.country_id"
            :classes="{
              'p-invalid': v$.formData.country_id.$invalid && !isValid,
            }"
          />
        </div>
        <div :key="formData.destination_id" class="input-wrapper col">
          <div class="label flex align-items-start mb-2">
            Destination
            <span class="ml-1 required-field">*</span>
          </div>
          <DropDownField
            mode="decimal"
            v-on:childToParent="getUserInput"
            label="destination_id"
            code="destination_id"
            :data="destinationOpts"
            :value="formData.destination_id"
            v-model="formData.destination_id"
            :classes="{
              'p-invalid': v$.formData.destination_id.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="flex align-items-end">
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
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="$emit('close')"
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
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    Dialog,
  },
  props: ["show"],
  data() {
    return {
      isloading: false,
      countryOpts: [],
      destinationOpts: [],
      isValid: true,
      showDialog: this.$props.show,
      formData: {
        country_id: "",
        destination_id: "",
        postal_code: "",
        transit_days: "",
      },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      if (!value) this.$emit("close");
    },
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
  computed: {
    ...mapGetters({
      transitDays: "Outbound/Edit/transitDays",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      getDestList: "Outbound/getDestList",
      editTransitDays: "Outbound/Edit/editTransitDays",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
      try {
        this.isloading = true;
        await this.editTransitDays({
          id: this.transitDays.editData.id,
          data: {
            ...this.formData,
          },
        });
        this.$emit("close");
        this.$emit("save");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Details updated successfully",
          life: 3000,
        });
        this.isloading = false;
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
    getUserInput(label, value) {
      console.log(label, value, "---");
      if (label === "country_id") {
        this.destList(value);
      }
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
  async created() {
    await this.getCountries();
    if (this.transitDays.editData) {
      let data = this.transitDays.editData;
      await this.destList(data.country_id);

      this.formData.country_id = data.country_id;
      this.formData.destination_id = data.destination_id;
      this.formData.postal_code = data.postal_code;
      this.formData.transit_days = data.transit_days;
    }
  },
};
</script>

<style>
</style>