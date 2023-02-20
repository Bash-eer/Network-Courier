<template>
  <div class="flex justify-content-between">
    <div class="flex">
      <div class="flex flex-row flex-wrap main">
        <div
          v-for="(item, index) of data.problemsAndRemarks"
          class="flex mr-5 child"
          :key="index"
        >
          <div class="flex flex-row">
            <div class="flex mr-2">
              <img
                :src="'/images/' + index + '.png'"
                alt=""
                height="43"
                width="43"
              />
            </div>
            <div class="flex">
              <div class="flex flex-column mt-1">
                <div class="flex align-items-center labels">
                  {{ getLabel(index) }}
                </div>
                <div class="flex align-items-center info mt-1">
                  <span> {{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex child">
          <div class="flex flex-column mt-1">
            <div class="flex align-items-center labels">Inspection Images</div>
            <div class="flex align-items-center info mt-1">
              <div class="flex flex-row">
                <div
                  v-for="(item, index) of data.inspection_images"
                  :key="index"
                  class="flex mr-2"
                >
                  <img :src="item.url" alt="" height="40" width="44" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <AttachmentsTemplate receipt="" :data="attachmentsData" :type="name" />
    </div>
  </div>
  <OtherInspectionsTemplate :data="data.other_inspection" />
</template>

<script>
export default {
  name: "LatestInspectionsTemplate",
  props: ["name", "data", "attachmentsData"],
  methods: {
    getLabel(index) {
      let label;
      switch (index) {
        case "problem":
          label = "Problems";
          break;
        case "solution":
          label = "Solution";
          break;
        case "remarks":
          label = "Remarks";
          break;
      }
      return label;
    },
  },
};
</script>

<style scoped></style>
