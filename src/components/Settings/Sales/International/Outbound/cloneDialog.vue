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
      <div class="color-4e5868 font-size-16 bold-600">Clone Rate Card</div>
    </template>
    <div class="content">
      <div class="input-wrapper col">
        <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Agent
          <!-- <span class="required-field ml-2">*</span> -->
        </div>
        <TextField
          v-model="agent_name"
          :value="agent_name"
          v-on:childToParent="getUserInput"
          code="id"
          :disabled="true"
        />
      </div>
      <div class="input-wrapper col">
        <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Rate Card Name
          <!-- <span class="required-field ml-2">*</span> -->
        </div>
        <TextField
          v-model="rate_card_name"
          :value="rate_card_name"
          v-on:childToParent="getUserInput"
          :disabled="true"
        />
      </div>
      <div
        class="icon-wrapper flex align-items-center justify-content-center mt-3"
      >
        <div class="pi icon pi-arrow-down bg-357dea"></div>
      </div>
      <div class="input-wrapper col">
        <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Agent
          <!-- <span class="required-field ml-2">*</span> -->
        </div>
        <DropDownField
          :data="agentDropdown"
          v-model="formData.agent_id"
          :value="formData.agent_id"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData.agent_id.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          code="id"
        />
      </div>
      <div class="input-wrapper col">
        <div class="required color-7a7a7a font-size-14 bold-500 mb-2 flex">
          Cloned Rate Card Name
          <!-- <span class="required-field ml-2">*</span> -->
        </div>
        <TextField
          v-model="formData.rate_card_name"
          :value="formData.rate_card_name"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.formData.rate_card_name.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-2 p-button-outlined add-btn custom-add-btn color-357dea"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-2 add-btn custom-add-btn bg-357dea"
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
      agentDropdown: [{ name: "Anto Tech", id: "1" }],
      target_rate_card_id: "",
      agent_name: "",
      rate_card_name: "",
      formData: {
        agent_id: "",
        rate_card_name: "",
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
        agent_id: { required },
        rate_card_name: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      cloneData: "Outbound/cloneData",
    }),
  },
  methods: {
    ...mapActions({
      cloneRateCard: "Outbound/cloneRateCard",
      setRefreshKey: "Outbound/setRefreshKey",
      setCloneData: "Outbound/setCloneData",
    }),
    async save() {
      try {
        this.isloading = true;
        await this.cloneRateCard({
          ...this.formData,
          target_rate_card_id: this.target_rate_card_id,
        });
        this.isloading = false;
        this.$emit("close");
        this.setCloneData(null);
        this.setRefreshKey();
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Rate card cloned successfully",
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
    },
  },
  created() {
    if (this.cloneData) {
      this.agent_name = this.cloneData.agent_name;
      this.target_rate_card_id = this.cloneData.id;
      this.rate_card_name = this.cloneData.rate_card_name;
    }
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  .icon {
    background: #357dea;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

:deep .p-calendar {
  width: 100%;
}
</style>
