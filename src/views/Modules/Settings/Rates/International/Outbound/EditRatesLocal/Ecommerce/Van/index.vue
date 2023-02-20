<template>
  <div :key="storeRenderKey">
    <TabMenu
      class="ratesSubTabs"
      :model="items"
      v-model:activeIndex="activeIndex"
    />
    <Card>
      <template #content>
        <div :key="activeIndex" v-if="ecommerceBike.length" class="pt-2">
          <TableComponent :data="[ecommerceBike[activeIndex]]" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import Card from "primevue/card";
import TableComponent from "./TableComponent/index.vue";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    TabMenu,
    Card,
    TableComponent,
  },
  data() {
    return {
      activeIndex: 0,
      ecommerceBike: [],
      items: [],
      selectedTab: {},
    };
  },
  watch: {
    activeIndex(value) {
      if (this.items[value]) {
        this.selectedTab = this.items[value];
      }
    },
    renderKey() {
      this.getData();
    },
    storeRenderKey() {
      this.getData();
    },
  },
  computed: {
    ...mapGetters({
      storeRenderKey: "Outbound/Edit/renderKey",
    }),
  },
  methods: {
    ...mapActions({
      getRateCardDetails: "Outbound/Edit/getRateCardDetails",
      setTypeId: "Outbound/Edit/setTypeId",
    }),
    async getData() {
      this.ecommerceBike = [];
      this.items = [];
      let response;
      try {
        this.isloading = true;
        response = await this.getRateCardDetails({
          id: this.$route.params.id,
          type: "e_commerce",
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

      if (response) {
        let data = [];

        response.data.results.charges.map((list) => {
          if (list.charge_type == "e_commerce") {
            console.log(list, "---");
            list.e_commerce_services.map((rates) => {
              if (rates.service_type === "van") {
                rates.delivery_type.map((items, idx) => {
                  this.items.push({ label: items.delivery_type });
                  data.push({
                    sl_no: idx + 1,
                    delivery_type: items.delivery_type,
                    collect_time: items.collect_time,
                    cut_off_time: items.cut_off_time,
                    cut_off_days_count: items.cut_off_days_count,
                    timeslot_delivery: items.timeslot_delivery,
                    timeslot_delivery_fixed_hours:
                      items.timeslot_delivery_fixed_hours,
                    created_by: items.user.display_name,
                    createdAt: items.createdAt,
                    service_id: items.service_id,
                    delivery_type_initial: items.delivery_type_initial,
                    id: items.id,
                    rates_expanded: [],
                    job_expanded: [],
                    weight_expanded: [],
                    quantity_expanded: [],
                    boxCount_expanded: [],
                  });

                  items.rates.map((item, itemIdx) => {
                    data[idx].rates_expanded.push({
                      sl_no: itemIdx + 1,
                      ...item,
                    });
                  });

                  items.van_charge_by_weight.map((item, itemIdx) => {
                    data[idx].weight_expanded.push({
                      sl_no: itemIdx + 1,
                      ...item,
                    });
                  });

                  items.van_charge_by_quantity.map((item, itemIdx) => {
                    data[idx].quantity_expanded.push({
                      sl_no: itemIdx + 1,
                      ...item,
                    });
                  });

                  items.van_charge_by_quantity.map((item, itemIdx) => {
                    item.rates.map((boxRates) => {
                      data[idx].boxCount_expanded.push({
                        sl_no: itemIdx + 1,
                        ...boxRates,
                      });
                    });
                  });

                  items.van_customer_bike_job.map((item, itemIdx) => {
                    data[idx].job_expanded.push({
                      sl_no: itemIdx + 1,
                      ...item,
                    });
                  });
                });
              }
            });
          }
        });

        this.ecommerceBike = data;

        if (this.ecommerceBike?.length) {
          this.setTypeId({
            type: "local_edit",
            data: this.ecommerceBike[0].service_id,
          });
          this.setTypeId({
            type: "local_edit",
            name: "expanded",
            data: this.ecommerceBike[0].rates_expanded[0].delivery_type_id,
          });
          this.setTypeId({
            type: "local_edit",
            name: "expanded_2",
            data: this.ecommerceBike[0].boxCount_expanded[0]
              ?.charge_quantity_id,
          });
        }
      }
    },
  },
  created() {
    this.getData();
    this.selectedTab = this.items[0];
  },
};
</script>

<style>
</style>