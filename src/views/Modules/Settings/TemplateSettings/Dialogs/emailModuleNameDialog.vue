<template>
  <div v-for="(module, index) of addModules" :key="module">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteModule(index)">
        <i class="pi parent pi-times mt-2 color-red"></i>
      </div>
    </div>
    <div class="formgrid grid mb-3">
      <div class="field col-12 md:col-12">
        <h5 class="required color-7a7a7a font-size-14">Module Name</h5>
        <TextField
          class="color-212121 font-size-14 font-bold mr-3"
          label="module_name"
          v-model="details.modules[index].module_name"
          :classes="{
            'p-invalid':
              v$.details.modules[index].module_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div v-if="!emailmoduleEditData.id" class="flex mb-2">
    <span class="bold-600 font-size-14 color-3057ff mt-0" @click="addModule"
      ><b>+ Add Module </b></span
    >
  </div>

  <!--footer -->
  <div class="formgrid grid pl-2 pr-2">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text color-357dea"
          v-on:childToParent="closeDialog"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    v$: useVuelidate(),
    addModuleClicked: 0,
    addModules: ["new_module"],
    modulesValidation: [
      {
        module_name: { required },
      },
    ],
    name: null,
    submitted: false,
    details: {
      modules: [
        {
          module_name: "",
        },
      ],
    },
  }),
  validations() {
    if (this.addModuleClicked > -1) {
      return {
        details: {
          modules: this.modulesValidation,
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      emailmoduleEditData: "templateSettings/emailmoduleEditData",
    }),
  },
  methods: {
    closeDialog() {
      this.$store.state["templateSettings"].displayDialog = false;
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (this.emailmoduleEditData.id) {
          this.apiPatchCallHandler();
        } else {
          this.apiCallHandler();
        }
      }
    },
    apiCallHandler() {
      this.$store.dispatch("templateSettings/POSTPATCHCRUDOPERATION", {
        path: "/settings/templates/email/module",
        data: this.details,
        method: "POST",
        loadData: "getEmailModulesData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandler() {
      this.$store.dispatch("templateSettings/POSTPATCHCRUDOPERATION", {
        path: "/settings/templates/email/module/" + this.emailmoduleEditData.id,
        data: this.details.modules[0],
        method: "PATCH",
        loadData: "getEmailModulesData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is Edited successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in Editing the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addModule() {
      this.details.modules.push({
        module_name: "",
      });
      this.modulesValidation.push({
        module_name: { required },
      });
      this.addModuleClicked++;
      this.addModules.push("new_module");
    },
    deleteModule(index) {
      this.details.modules.splice(index, 1);
      this.modulesValidation.splice(index, 1);
      this.addModules.splice(index, 1);
      this.addModuleClicked++;
    },
  },
  created() {
    if (this.emailmoduleEditData) {
      this.details.modules[0].module_name =
        this.emailmoduleEditData.module_name;
    }
  },
  unmounted() {
    this.$store.state.templateSettings.emailmoduleEditData = {};
  },
};
</script>

<style scoped></style>
