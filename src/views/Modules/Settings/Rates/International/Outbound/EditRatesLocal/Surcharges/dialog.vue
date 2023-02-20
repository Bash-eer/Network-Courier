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
      <div v-if="editData?.type == 'surcharges'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col mt-3">
        <div class="label flex align-items-start mb-2">COD Fee ($)</div>
        <NumberField
          label="cod_fee"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.cod_fee"
        />
      </div>
      <div class="input-wrapper col mt-3">
        <div class="label flex align-items-start mb-2">
          COD Fee (% of cash collected)
        </div>
        <NumberField
          label="cod_fee_percentage"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.cod_fee_percentage"
        />
      </div>
      <div class="input-wrapper col mt-3">
        <div class="label flex align-items-start mb-2">
          Standard Liability ($)
        </div>
        <NumberField
          label="standard_liability"
          :maxFractionDigits="2"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.standard_liability"
        />
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
      isValid: true,
      showDialog: this.$props.show,
      formData: {
        cod_fee: "",
        cod_fee_percentage: "",
        standard_liability: "",
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
        cod_fee: {},
        cod_fee_percentage: {},
        standard_liability: {},
      },
    };
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      editLocalSurcharge: "Outbound/Edit/editLocalSurcharge",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.editData?.type == "surcharges") {
        try {
          this.isloading = true;
          await this.editLocalSurcharge({
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
    if (this.editData?.type == "surcharges") {
      let data = this.editData.data;
      this.formData.cod_fee = data.cod_fee;
      this.formData.cod_fee_percentage = data.cod_fee_percentage;
      this.formData.standard_liability = data.standard_liability;
    }
  },
};
</script>

<style>
</style>
