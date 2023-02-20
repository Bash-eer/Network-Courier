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
      <div v-if="editData?.type == 'remote_area_charges_n'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label mb-2 flex">
          Country <span class="required-field ml-2">*</span>
        </div>
        <div :key="formData.country_id" class="flex align-items-center">
          <DropDownField
            :key="formData.country_id"
            label="country_id"
            id="fromZone"
          :filter="true"
            :state="formData.country_id"
            :data="countryOpts"
            v-model="formData.country_id"
            :value="formData.country_id"
            v-on:childToParent="getUserInput"
            code="country_id"
            :classes="{
              'p-invalid': v$.formData.country_id.$invalid && !isValid,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div v-for="(data, idx) of rowData" :key="data">
        <DestinationForm
          :rowId="idx"
          :count="rowData.length"
          @isRowValid="isRowValid"
          @removeRow="removeRow"
          @setDestinations="setDestinations"
          :destinations="formData.destinations[idx]"
          :type="type"
          :saveKey="saveKey"
          :country_id="formData.country_id"
        />
        <hr />
      </div>
      <!-- <div @click="addRow" class="add-text pointer ml-2 mt-3">
        + Add Destinations
      </div> -->
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
import DestinationForm from "./DestinationForm.vue";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    Dialog,
    DestinationForm,
  },
  props: ["show"],
  data() {
    return {
      saveKey: 10,
      isloading: false,
      showDialog: this.$props.show,
      countryOpts: [],
      rowData: [{ id: 1, isValid: false }],
      isValid: true,
      formData: {
        country_id: "",
        destinations: [],
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        country_id: { required },
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
  computed: {
    ...mapGetters({
      editData: "Outbound/Edit/editData",
      imp_edit: "Outbound/Edit/imp_edit",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      postRemoteareaCharges: "Outbound/Edit/postRemoteareaCharges",
      editRemoteareaCharges: "Outbound/Edit/editRemoteareaCharges",
    }),
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidRow = this.rowData.find((list) => list.isValid === false);

      if (this.v$.$invalid && !invalidRow) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
    setDestinations({ idx, data }) {
      this.formData.destinations[idx] = data;
    },
    async save() {
      this.saveKey++;
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "remote_area_charges_n") {
        try {
          this.isloading = true;
          await this.editRemoteareaCharges({
            type: "normal",
            id: this.editData.data.id,
            data: {
              type_id: this.editData.data.type_id,
              country_id: this.formData.country_id,
              ...this.formData.destinations[0],
            },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "New data added successfully",
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
      } else {
        try {
          this.isloading = true;
          await this.postRemoteareaCharges({
            type: "normal",
            data: { type_id: this.imp_edit.type_id, ...this.formData },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "New data added successfully",
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

    if (this.editData?.type == "remote_area_charges_n") {
      let data = this.editData.data;

      this.formData.country_id = data.country_id;
    }
  },
};
</script>

<style>
</style>