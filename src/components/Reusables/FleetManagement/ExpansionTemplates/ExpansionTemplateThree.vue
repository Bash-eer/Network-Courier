<template>
  <div class="flex flex-column">
    <div
      :class="index == data.length - 1 ? 'flex' : 'flex mb-5'"
      v-for="(remarks, index) of data"
      :key="index"
    >
      <div class="flex flex-row">
        <div class="flex mr-3">
          <img
            :src="'/images/' + 'remarks' + '.png'"
            alt=""
            height="43"
            width="43"
          />
        </div>
        <div class="flex align-items-center">
          <div class="flex flex-column">
            <div class="flex align-items-center labels label-head">
              {{ remarks.label }}
            </div>
            <div class="flex align-items-center info mt-1 label-info">
              {{ remarks.remark }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionTemplateThree",
  props: ["data"],
};
</script>

<style scoped>
.label-head{
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #4E5868;
}
.label-info{
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #4E5868;
}
</style>
