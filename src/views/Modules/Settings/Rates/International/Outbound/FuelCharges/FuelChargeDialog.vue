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
      <div v-if="fuelCharges.editData">Edit Fuel Charges</div>
      <div v-else class="color-4e5868 font-size-16 bold-600">
        Add Fuel Charge
      </div>
    </template>
    <div class="content">
      <div class="flex align-items-end">
        <div :key="formData.vendor_code" class="input-wrapper col">
          <div
            class="
              color-7a7a7a
              font-size-14
              bold-500
              required
              flex
              align-items-start
              mb-2
            "
          >
            Vendor Code
            <!-- <span class="ml-1 required-field">*</span> -->
          </div>
          <DropDownField
            :options="vendor"
            label="vendor_code"
            code="name"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.vendor_code"
            :value="formData.vendor_code"
            :classes="{
              'p-invalid': v$.formData.vendor_code.$invalid && !isValid,
            }"
          />
        </div>
        <div :key="formData.vendor_code" class="input-wrapper col">
          <div
            class="
              color-7a7a7a
              font-size-14
              bold-500
              required
              flex
              align-items-start
              mb-2
            "
          >
            Vendor
            <!-- <span class="ml-1 required-field">*</span> -->
          </div>
          <TextField
            label="vendor"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.vendor"
            :value="formData.vendor"
            :classes="{
              'p-invalid': v$.formData.vendor.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <div class="flex align-items-end">
        <div class="input-wrapper col">
          <div
            class="
              color-7a7a7a
              font-size-14
              bold-500
              flex
              align-items-start
              mb-2
            "
          >
            From Date
            <!-- <span class="ml-1 required-field">*</span> -->
          </div>
          <Calendar
            placeholder="dd-mm-yy"
            dateFormat="d MM yy"
            class="ratesCalendar"
            v-model="formData.from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
              'p-invalid': v$.formData.from_date.$invalid && !isValid,
            }"
          />
        </div>
        <div class="input-wrapper col">
          <div
            class="
              color-7a7a7a
              font-size-14
              bold-500
              flex
              align-items-start
              mb-2
            "
          >
            To Date
            <!-- <span class="ml-1 required-field">*</span> -->
          </div>
          <Calendar
            placeholder="dd-mm-yy"
            dateFormat="d MM yy"
            class="ratesCalendar"
            v-model="formData.to_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
              'p-invalid': v$.formData.to_date.$invalid && !isValid,
            }"
          />
        </div>
      </div>

      <div class="input-wrapper col-6">
        <div
          class="
            color-7a7a7a
            font-size-14
            bold-500
            required
            flex
            align-items-start
            mb-2
          "
        >
          Percentage
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <NumberField
          label="percentage"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.percentage"
          :maxFractionDigits="2"
          :classes="{
            'p-invalid': v$.formData.percentage.$invalid && !isValid,
          }"
        />
      </div>
    </div>

    <template #footer>
      <Buttons
        label="Close"
        button_class="p-button-sm mr-3 p-button-outlined add-btn custom-add-btn color-357dea"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
        v-on:childToParent="save"
        :loading="isloading"
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import moment from "moment";

export default {
  components: {
    Dialog,
  },
  props: ["show"],
  data() {
    return {
      showDialog: this.$props.show,
      isloading: false,
      isValid: true,
      vendor: [],
      formData: {
        vendor_code: "",
        vendor: "",
        from_date: "",
        to_date: "",
        percentage: "",
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
    "formData.vendor_code": function () {
      this.formData.vendor = this.vendor[0].code;
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        vendor_code: { required },
        vendor: { required },
        from_date: { required },
        to_date: {
          required,
          maxVal: (value) => {
            return moment(this.formData.from_date).isBefore(value);
          },
        },
        percentage: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      fuelCharges: "Outbound/Edit/fuelCharges",
    }),
  },
  methods: {
    ...mapActions({
      postFuelCharges: "Outbound/Edit/postFuelCharges",
      editFuelCharges: "Outbound/Edit/editFuelCharges",
    }),
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.fuelCharges.editData) {
        console.log(this.fuelCharges.editData);
        try {
          this.isloading = true;
          let data = {
            agent_id: this.$route.params.id,
            percentage: this.formData.percentage,
            from_date: this.formData.from_date,
            to_date: this.formData.to_date,
          };
          await this.editFuelCharges({
            id: this.fuelCharges.editData.id,
            data,
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Fuel charges data edited successfully",
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
          let data = {
            agent_id: this.$route.params.id,
            percentage: this.formData.percentage,
            from_date: this.formData.from_date,
            to_date: this.formData.to_date,
          };
          await this.postFuelCharges(data);
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Fuel charges data added successfully",
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
    getUserInput(label) {
      if (label == "vendor_code") {
        this.formData.vendor = this.vendor[0].code;
      }
    },
  },
  created() {
    this.vendor = [];
    this.vendor = [
      { name: this.$route.params?.id, code: this.$route.query?.a },
    ];
    if (this.fuelCharges.editData) {
      let data = this.fuelCharges.editData;
      this.formData.to_date = this.dateFormater(data.to_date);
      this.formData.from_date = this.dateFormater(data.from_date);
      this.formData.vendor = data.vendor;
      this.formData.vendor_code = data.vendor_code;
      this.formData.percentage = data.percentage;
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

:deep .p-calendar {
  width: 100%;
}
</style>
