<template>
  <OrderList v-model="listData" listStyle="height:auto" dataKey="id">
    <template #header> {{ header }} </template>
    <template #item="slotProps">
      <div class="flex flex-row">
        <div class="flex mr-2">
          <img
            :src="
              slotProps.item['profile'] != null
                ? slotProps.item['profile']
                : './images/defaultProfile.jpg'
            "
            width="32"
            height="32"
            alt=""
          />
        </div>
        <div class="flex membersListText">
          <div class="flex flex-column justify-content-center">
            <div class="flex">
              {{ slotProps.item["name"] }}
            </div>
            <div class="flex">
              {{ slotProps.item["phone"] }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </OrderList>
</template>

<script>
import OrderList from "primevue/orderlist";
export default {
  name: "List",
  props: ["data", "header"],
  data() {
    return {
      listData: [],
    };
  },
  components: {
    OrderList,
  },
  created() {
    this.listData = this.data;
  },
};
</script>

<style>
.p-orderlist .p-orderlist-controls {
  display: none !important;
}
.membersListText {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  color: #4e5968;
}
</style>
