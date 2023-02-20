<template>
 
    <div class="content">
      <div class="input-wrapper col">
        <div class="label flex align-items-start mb-2">
          Boxes Count
          <span class="ml-1 required-field">*</span>
        </div>
        <div class="flex align-items-end">
            <NumberField
            label="min_box"
            :showButtons="true"
            mode="decimal"
            :max='0'
            :maxFractionDigits="2"
            class="ml-2"
            v-model="formData.min_box"
            :classes="{
              'p-invalid': v$.formData.min_box.$invalid && !isValid,
            }"
          />
            <NumberField
            label="box_under"
            :showButtons="true"
            mode="decimal"
            :max='0'
            :maxFractionDigits="2"
            class="ml-2"
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
          :max='0'
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.rate"
          :classes="{
            'p-invalid': v$.formData.rate.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="cancel"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="save"
        :loading="isloading"
      />
    </div>
</template>

<script>

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
   
  },
  props: { submitForm: {
      type: Function,
      default: () => {},
    },},
  data() {
    return {
      bool:false,
      isValid: true,
      showDialog: this.$props.show,
      formData: {
      
        min_box:"",
        max_box:"",
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
       
        rate: { required },
        min_box:{ required },
        max_box:{ required }
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
    ...mapActions('express',['createEcommercVanQuantity']),
     cancel() {

        this.$emit('cancel');
    
    },
    async save() {
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }

      try {
        this.isloading = true;

        Object.assign(this.formData, {
          charge_quantity_id: this.$store.state.express.quantityBoxChargesId,
        });
        await this.createEcommercVanQuantity(this.formData).then(() => {
          this.bool = true;
        });

        this.$emit('close');
        this.$emit('save');
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New data added successfully',
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
  },
  created() {
  },
};
</script>

<style>
</style>