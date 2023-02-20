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
      <div v-if="editData?.type == 'zone'">Edit Zones</div>
      <div v-else>Add Zones</div>
    </template>
    <div class="content">
      <div class="input-field-wrapper col">
        <div class="label-text mb-2 flex">
          Zone No <span class="required-field ml-1"> *</span>
        </div>
        <div class="flex align-items-center">
          <TextField
            class="col-7"
            label="country_code"
            v-model="zone_no"
            @blur="v$.zone_no.$model"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.zone_no.$invalid && !isValid,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"
          />
          <Buttons
            class="ml-2 col-3"
            label="Import"
            button_class="p-button-sm p-button-outlined add-btn custom-add-btn"
          />
        </div>
      </div>

      <div :key="selectedCountries">
        <div class="label-text mb-2 flex">
          Add Countries <span class="required-field ml-1"> *</span>
        </div>
        <MultiSelectChips
          :options="countries"
          :filter="true"
          placeholder="Select Countries"
          v-model="selectedCountries"
          :value="selectedCountries"
          :state="selectedCountries"
          optionValue="country_id"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.selectedCountries.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-3 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm add-btn custom-add-btn"
        v-on:childToParent="save"
        :loading="isloading"
        class="mr-none"
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
      showDialog: this.$props.show,
      zone_no: "",
      isValid: true,
      selectedCountries: [],
      selectedItems: null,
      selectAll: false,
      countries: [],
      loadingCountry: false,
      countriesId: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      selectedCountries: { required },
      zone_no: { required },
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
  computed: {
    ...mapGetters({
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      editZoneCard: "Outbound/Edit/editZoneCard",
    }),
    onSelectAllChange(event) {
      this.selectedItems = event.checked
        ? this.items.map((item) => item.value)
        : [];
      this.selectAll = event.checked;
    },
    onChange(event) {
      this.selectAll = event.value.length === this.items.length;
    },
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
      this.countriesId = [];

      console.log("hit", this.editData);

      this.selectedCountries.map((list) =>
        this.countriesId.push({ country_id: list })
      );

      if (this.editData?.type == "zone") {
        console.log("hit");
        try {
          this.isloading = true;
          await this.editZoneCard({
            id: this.editData.data.id,
            data: {
              zone_no: this.zone_no,
              rate_card_id: this.$route.params?.id,
              countries: this.countriesId,
            },
          });
          this.isloading = false;
          this.$emit("save");
          this.$emit("close");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Rate card edit successfully",
            life: 3000,
          });
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
      }
    },
    async getCountries() {
      this.loadingCountry = false;
      this.countries = [];
      let res = await this.getCountryList();

      this.loadingCountry = true;

      res.data.results.map((list) => {
        this.countries.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  async created() {
    await this.getCountries();

    if (this.editData?.type == "zone") {
      this.selectedCountries = [];

      this.zone_no = this.editData.data.zone_no;

      this.editData.data?.countries.map((list) =>
        this.selectedCountries.push(list.country_id)
      );
    }
  },
};
</script>

<style scoped>
:deep .col-7,
.col,
.col-4,
.col-2 {
  padding-left: 0 !important;
}

:deep .p-multiselect-panel {
  position: unset !important;
}

.mr-none {
  margin-right: 0 !important;
}

:deep .p-multiselect-label-container {
  min-height: 100px;
}

:deep .p-multiselect-trigger {
  display: none;
}
</style>
