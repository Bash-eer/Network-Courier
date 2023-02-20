<template>
  <div class="flex flex-row flex-wrap main mt-3">
    <div v-for="(item, index) of data" class="flex mr-5 child" :key="index">
      <div class="flex flex-row">
        <div class="flex mr-2">
          <img
            :src="'/images/' + 'inspectionChecks' + '.png'"
            alt=""
            height="43"
            width="43"
          />
        </div>
        <div class="flex">
          <div class="flex flex-column mt-1">
            <div class="flex align-items-center labels">
              {{ item.inspection }}
            </div>
            <div class="flex align-items-center info mt-1">
              <span> {{ item.feedback }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherInspectionsTemplate",
  props: ["data"],
};
</script>

<style scoped></style>
