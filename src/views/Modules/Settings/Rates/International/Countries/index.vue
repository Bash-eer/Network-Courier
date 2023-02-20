<template>
  <!-- <Card>
    <template #header> -->
  <div class="flex align-items-center justify-content-between text_countries">
    <div class="left-content flex align-items-center">
      <div
        @click="$router.push({ name: 'salesRates' })"
        class="pi pointer icon pi-arrow-left ml-3"
      ></div>
      <div class="color-4e5968 font-size-24 bold-600 ml-3">Countries</div>
    </div>
    <div class="righ-content">
      <Buttons
        label="Add New"
        button_class="p-button-sm mr-4  add-btn custom-add-btn"
        v-on:childToParent="redirect('AddNewCountry')"
      />
    </div>
  </div>
  <!-- </template>
    <template #content> -->
  <br />
  <div>
    <PageContent />
  </div>

  <!-- </template>
  </Card> -->
</template>

<script>
// import Card from "primevue/card";
import PageContent from "./PageContent/index.vue";
import {mapMutations} from 'vuex';

export default {
  components: {
    // Card,
    PageContent,
  },
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
  },
  created(){
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > International > Countries",
    });
  }
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
.text_countries {
  background: #ffffff;
  height: 58px;
  margin-top: -31px;
  margin-bottom: -23px;
  width: 101%;
  margin-left: -6px;
}
</style>
