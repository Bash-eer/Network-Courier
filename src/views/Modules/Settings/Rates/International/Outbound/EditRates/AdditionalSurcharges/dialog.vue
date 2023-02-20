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
      <div v-if="editData?.type == 'add_surcharges'">Edit</div>
      <div v-else class="color-4e5868 font-size-16 bold-600">Add New</div>
    </template>
    <div class="content">
      <div class="flex align-items-end">
        <div class="input-wrapper col">
          <div class="color-7a7a7a font-size-14 bold-500 required mb-2 flex">
            Special Rate Name
            <!-- <span class="required-field ml-1">*</span> -->
          </div>
          <TextField
            label="special_rate_name"
            v-model="formData.special_rate_name"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.formData.special_rate_name.$invalid && !isValid,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="input-wrapper col">
          <div class="color-7a7a7a font-size-14 bold-500 required mb-2 flex">
            Rate Charge ($)
            <!-- <span class="required-field ml-1">*</span> -->
          </div>
          <NumberField
            label="rate"
            v-model="formData.rate"
            :maxFractionDigits="2"
            mode="decimal"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.formData.rate.$invalid && !isValid,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
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
      isValid: true,
      formData: {
        special_rate_name: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        special_rate_name: { required },
        rate: { required },
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
      postAddsurcharge: "Outbound/Edit/postAddsurcharge",
      editAddsurcharge: "Outbound/Edit/editAddsurcharge",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "add_surcharges") {
        try {
          this.isloading = true;
          await this.editAddsurcharge({
            id: this.editData.data.id,
            data: { type_id: this.editData.data.type_id, ...this.formData },
          });
          this.$emit("close");
          this.$emit("save");
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Data updated successfully",
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
          await this.postAddsurcharge({
            data: { rate_card_id: this.imp_edit.type_id, ...this.formData },
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
  },
  created() {
    if (this.editData?.type == "add_surcharges") {
      let data = this.editData.data;

      this.formData.special_rate_name = data.special_rate_name;
      this.formData.rate = data.rate;
    }
  },
};
</script>

<style>
</style>