<template>
  <div class="w-100 bg-white">
    <p class="mx-2 rapido-contract-other-charges text-color-primary">
      Other Charges
    </p>
    <div class="flex flex-row flex-wrap">
      <!--loops through data-->

      <div
        v-for="charge in otherChargesData"
        :key="charge.id"
        class="flex flex-column p-2"
      >
        <p class="rapido-contract-other-charges-title text-color-secondary">
          {{ charge.charge_name }}
        </p>
        <p class="rapido-contract-other-charges-subtitle text-color-primary">
          {{ charge.charge }} $
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["otherChargesData"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.rapido-contract-other-charges {
  font-weight: 700;
  font-size: 12px;
  line-height: 28px;
}
.rapido-contract-other-charges-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
}
.rapido-contract-other-charges-subtitle {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
</style>
