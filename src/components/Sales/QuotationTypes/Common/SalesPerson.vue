<template>
  <div class="flex flex-row mx-3">
    <img :key="renderKey" :src="salesPersonUrl" alt="" width="32" height="32" />
    <div :key="renderKey" class="flex flex-column mx-2">
      <Dropdown
        :key="renderKey"
        :options="cities"
        @change="selectPerson($event)"
        optionLabel="name"
        placeholder="Sales Person"
      />
      <span class="international-agent-date">{{ salesPersonName }}</span>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { salesCommon } from "../../../../store/helper";
export default {
  props: ["details", "key", "detail", "life"],
  data() {
    return {
      renderKey: 1,
      cities: [],
      salesPersonName: "",
      salesPersonUrl: "/images/avatar.png",
    };
  },
  async created() {
    await this.getSalesName();
    this.salesPersonName = this.details?.display_name ?? "";
    this.salesPersonUrl = this.details?.profile_url ?? "";
    this.renderKey++;
  },
  methods: {
    ...salesCommon,
    async selectPerson(e) {
      let data = e.value;
      (this.salesPersonName = data.name), (this.salesPersonUrl = data.url);
      let payload = {
        sales_person_id: data.id,
      };
      await this.updateSalesPerson({
        id: this.$route.params.id,
        payload: payload,
        toast: this.$toast
      });
    },
    async getSalesName() {
      this.cities = [];

      let res = await this.getSalesPerson();

      res.data.results.map((list) => {
        this.cities.push({
          name: list.name,
          url: list.image_url,
          id: list.id,
        });
      });
    },
  },
  components: {
    Dropdown,
  },
  watch: {
    "details.display_name":
      function () {
        this.renderKey++;
      },
  },
};
</script>

<style scoped>
.international-agent-date {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4e5968;
}
::v-deep.p-dropdown .p-dropdown-label.p-placeholder {
  padding: 0;
  border: unset;
  font-weight: 600 !important;
  color: #7e84a7 !important;
  font-size: 11px !important;
  letter-spacing: 0.03em !important;
}
::v-deep.p-dropdown {
  border: unset;
}
::v-deep.p-dropdown .p-dropdown-trigger {
  color: #000000;
}
::v-deep.p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none;
  border-color: unset;
}
</style>