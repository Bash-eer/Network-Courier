<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '800px',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div v-if="editData?.type == 'e_delivery_type_b'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <DeliveryType
        v-if="this.editData?.type !== 'e_delivery_type_b'"
        @isFormValid="isFormValid"
        @getData="getData"
        :saveKey="saveKey"
      />
      <div v-else>
        <div class="flex align-items-end">
          <div class="input-wrapper col-2">
            <div class="label flex align-items-start mb-2">
              Initial
              <span class="ml-1 required-field">*</span>
            </div>
            <TextField
              label="min_weight"
              mode="decimal"
              v-on:childToParent="getUserInput"
              v-model="formData.delivery_type_initial"
              :classes="{
                'p-invalid':
                  v$.formData.delivery_type_initial.$invalid && !isValid,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Delivery Type
              <span class="ml-1 required-field">*</span>
            </div>
            <TextField
              label="min_weight"
              mode="decimal"
              v-on:childToParent="getUserInput"
              v-model="formData.delivery_type"
              :classes="{
                'p-invalid': v$.formData.delivery_type.$invalid && !isValid,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Collect Time
              <span class="ml-1 required-field">*</span>
            </div>
            <TimePicker24
              class="full-width"
              label="collect_time"
              v-model="formData.collect_time"
              v-on:childToParent="getUserInput"
              :state="formData.collect_time"
              :classes="{
                'p-invalid': v$.formData.collect_time.$invalid && !isValid,
              }"
            />
          </div>
        </div>
        <div class="flex align-items-end">
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Cut Off Time
              <span class="ml-1 required-field">*</span>
            </div>
            <TimePicker24
              class="full-width"
              label="cut_off_time"
              v-model="formData.cut_off_time"
              v-on:childToParent="getUserInput"
              :state="formData.cut_off_time"
              :classes="{
                'p-invalid': v$.formData.cut_off_time.$invalid && !isValid,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Cut Off Days Count
              <span class="ml-1 required-field">*</span>
            </div>
            <NumberField
              label="min_weight"
              mode="decimal"
              v-on:childToParent="getUserInput"
              v-model="formData.cut_off_days_count"
              :classes="{
                'p-invalid':
                  v$.formData.cut_off_days_count.$invalid && !isValid,
              }"
            />
          </div>
          <div class="input-wrapper col">
            <div class="label flex align-items-start mb-2">
              Timeslot Delivery Fixed Hours
            </div>
            <NumberField
              label="min_weight"
              mode="decimal"
              :maxFractionDigits="2"
              v-on:childToParent="getUserInput"
              v-model="formData.timeslot_delivery_fixed_hours"
              :classes="{
                'p-invalid':
                  v$.formData.timeslot_delivery_fixed_hours.$invalid &&
                  !isValid,
              }"
            />
          </div>
        </div>
        <div class="input-wrapper col-4">
          <div class="label flex align-items-start mb-2">Timeslot Delivery</div>
          <NumberField
            label="min_weight"
            mode="decimal"
            v-on:childToParent="getUserInput"
            :maxFractionDigits="2"
            v-model="formData.timeslot_delivery"
            :classes="{
              'p-invalid': v$.formData.timeslot_delivery.$invalid && !isValid,
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
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import DeliveryType from "./DeliveryType/index.vue";
import { errhandler } from "@/services/httpClient";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {
    Dialog,
    DeliveryType,
  },
  props: ["show"],
  data() {
    return {
      isSaveValid: false,
      showDialog: this.$props.show,
      saveKey: 10,
      e_data: {},
      isValid: true,
      formData: {
        delivery_type: "",
        delivery_type_initial: "",
        collect_time: "",
        cut_off_time: "",
        cut_off_days_count: "",
        timeslot_delivery_fixed_hours: "",
        timeslot_delivery: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        delivery_type: { required },
        delivery_type_initial: { required },
        collect_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        timeslot_delivery_fixed_hours: {},
        timeslot_delivery: {},
      },
    };
  },
  watch: {
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      // if (!value) this.$emit("close");
    },
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      addDelieryType: "Outbound/Edit/addDelieryType",
      editDeliveryType: "Outbound/Edit/editDeliveryType",
    }),
    isFormValid(value) {
      this.isSaveValid = value;
      this.saveData();
    },
    getData({ field, data }) {
      if (field) {
        this.e_data[field] = data;
      } else {
        this.e_data = { ...this.e_data, ...data };
      }
    },
    getUserInput(label, value) {
      if (label == "cut_off_time" || label == "collect_time") {
        this.formData[label] = moment(value).format("HH:mm");
        console.log(this.formData[label]);
      }
    },
    async saveData() {
      if (!this.isSaveValid) {
        return;
      }

      try {
        this.isloading = true;
        await this.addDelieryType({
          service_id: this.local_edit.type_id,
          type: "bike",
          ...this.e_data,
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
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
        this.isloading = false;
      }
    },
    async save() {
      this.saveKey++;

      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "e_delivery_type_b") {
        try {
          this.isloading = true;
          await this.editDeliveryType({
            id: this.editData.data.id,
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
      }
    },
  },
  created() {
    if (this.editData?.type == "e_delivery_type_b") {
      let data = this.editData.data;
      this.formData.delivery_type = data.delivery_type;
      this.formData.delivery_type_initial = data.delivery_type_initial;
      this.formData.collect_time = data.collect_time;
      this.formData.cut_off_time = data.cut_off_time;
      this.formData.cut_off_days_count = data.cut_off_days_count;
      this.formData.timeslot_delivery_fixed_hours =
        data.timeslot_delivery_fixed_hours;
      this.formData.timeslot_delivery = data.timeslot_delivery;
    }
  },
};
</script>

<style>
</style>