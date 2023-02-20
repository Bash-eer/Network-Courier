<template>
  <Card>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="left-content flex align-items-center">
          <div
            @click="$router.push({ name: 'internationalCountryList' })"
            class="pi pointer icon pi-arrow-left"
          ></div>
          <div class="color-4e5968 font-size-24 bold-600 ml-3">Add New</div>
        </div>
        <div class="righ-content">
          <Buttons
            icon="pi pi-download"
            label="Import"
            button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn color-357dea"
            v-on:childToParent="redirect('AddNewCountry')"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div v-for="(form, idx) of addCount" :key="form">
        <AddNewInputs
          :formId="idx"
          @removeForm="removeForm"
          @isFormValid="isFormValid"
          :saveKey="saveKey"
          :count="addCount.length"
        />
      </div>
      <div @click="addForm" class="add-text pointer ml-3 mt-3">
        + Add Country & Destinations
      </div>
    </template>
    <template #footer>
      <div class="flex align-items-center justify-content-end ml-3">
        <Buttons
          label="Cancel"
          button_class="p-button-sm mr-3 p-button-outlined add-btn custom-add-btn color-357dea"
          v-on:childToParent="$router.go(-1)"
        />
        <Buttons
          label="Save"
          button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
          v-on:childToParent="save"
          :loading="isloading"
        />
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import AddNewInputs from "./AddNewInputs.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: { Card, AddNewInputs },
  data() {
    return {
      addCount: [{ id: 1, valid: false }],
      saveKey: 10,
      saveCountyDest: false,
      validForms: [],
      isloading: false,
    };
  },
  computed: {
    ...mapGetters({
      country: "InternationalCountries/country",
    }),
  },
  created(){
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > International > Countries > Add New",
    });
  },
  methods: {
    ...mapActions({
      addCountry: "InternationalCountries/addCountry",
      removeCountry: "InternationalCountries/removeCountry",
      addNewCountry: "InternationalCountries/addNewCountry",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    onClick() {
      this.addCount++;
      this.saveCountyDest = false;
    },
    addForm() {
      let count = this.addCount.length + 1;

      let exist = this.addCount.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.addCount.push({
          id: this.addCount.length + exist.id,
          valid: false,
        });
      } else {
        this.addCount.push({ id: this.addCount.length + 1, valid: false });
      }

      this.addCountry();

      this.saveCountyDest = false;
    },
    removeForm(id) {
      if (this.addCount.length > 1) {
        this.addCount.splice(id, 1);
        this.removeCountry(id);
      }
    },
    isFormValid({ isValid, id }) {
      this.addCount.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });
    },
    async save() {
      this.saveKey++;
      let invalidForm = this.addCount.find((list) => {
        if (list.valid === false) return list;
      });

      if (!invalidForm) {
        try {
          this.isloading = true;
          await this.addNewCountry(this.country);
          this.$router.push({
            name: "internationalCountryList",
          });
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Country & destinations added successfully",
            life: 3000,
          });
          this.isloading = false;
        } catch (error) {
          this.isloading = false;

          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong, please try again",
            life: 3000,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

:deep .p-card-header {
  padding: 30px 30px 0 30px !important;
}

.left-content {
  .icon {
    font-size: 16px;
  }
  .text {
    font-family: $font-family-third;
    font-size: 24px;
    font-weight: 600;
  }
}

.add-text {
  display: flex;
  align-items: flex-start;
  color: #357dea;
  font-size: 14px;
  font-weight: 600;
}
</style>
