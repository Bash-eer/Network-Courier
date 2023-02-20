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
      <div v-if="mode === 'Edit'">Edit</div>
      <div v-else>Add New</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Boxes Count
          <span class="ml-1 required-field">*</span>
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
            v-model="formData.min_box"
            :classes="{
              'p-invalid': v$.formData.min_box.$invalid && !isValid,
            }"
          />
          <NumberField
            class="ml-2"
            label="min_weight"
            :showButtons="true"
            mode="decimal"
              :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.max_box"
            :classes="{
              'p-invalid': v$.formData.max_box.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Unit Rate ($)
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
          v-model="formData.rate"
          :classes="{
            'p-invalid': v$.formData.rate.$invalid && !isValid,
          }"
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
  props: ["show", "mode", "tab"],
  data() {
    return {
      isValid: true,
      showDialog: this.$props.show,
      formData: {
        min_box: "",
        max_box: "",
        rate: "",
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
        min_box: { required },
        max_box: {
          required,
          maxVal: (value) => {
            if (this.formData.min_box >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        rate: { required },
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
      postEcommerceBoxCount: "Outbound/Edit/postEcommerceBoxCount",
      editEcommerceBoxCount: "Outbound/Edit/editEcommerceBoxCount",
    }),
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      if (this.mode === "Edit") {
        try {
          this.isloading = true;
          await this.editEcommerceBoxCount({
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
      } else {
        try {
          this.isloading = true;
          await this.postEcommerceBoxCount({
            charge_by_quantity_id:
              this.$props.tab == "chargeByQty"
                ? this.local_edit.type_id_3
                : this.local_edit.type_id_2,
            ...this.formData,
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
    if (this.mode === "Edit") {
      let data = this.editData.data;
      this.formData.min_box = data.min_box;
      this.formData.max_box = data.max_box;
      this.formData.rate = data.rate;
    }
  },
};
</script>

<style>
</style>