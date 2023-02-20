<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="items"
      v-model:activeIndex="activeIndex"
    />
    <Card>
      <template #content>
        <AddNew
          v-if="imp_edit[imp_edit.currentTab] && false"
          @cancel="cancel"
        />
        <!-- <hr /> -->
        <keep-alive>
          <component :is="selectedTab.component" />
        </keep-alive>
      </template>
    </Card>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import Card from "primevue/card";
import Document from "./Document/index.vue";
import Parcel from "./Parcel/index.vue";
import DocumentAndParcel from "./DocumentAndParcel/index.vue";
import AddNew from "./addNew.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { TabMenu, Card, Document, DocumentAndParcel, Parcel, AddNew },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          label: "Document",
          component: "Document",
        },
        {
          label: "Parcel",
          component: "Parcel",
        },
        {
          label: "Document and Parcel",
          component: "DocumentAndParcel",
        },
      ],
      selectedTab: {
        label: "Document",
        component: "Document",
      },
    };
  },
  watch: {
    activeIndex(value) {
      this.cancel();
      if (this.items[value]) {
        this.selectedTab = this.items[value];
      }
    },
  },
  computed: {
    ...mapGetters({
      imp_edit: "Outbound/Edit/imp_edit",
    }),
  },
  methods: {
    ...mapActions({
      toggleDialog: "Outbound/Edit/toggleDialog",
    }),
    cancel() {
      this.toggleDialog({
        edit: "imp_edit",
        type: this.imp_edit.currentTab,
        data: false,
      });
    },
  },
};
</script>

<style>
</style>