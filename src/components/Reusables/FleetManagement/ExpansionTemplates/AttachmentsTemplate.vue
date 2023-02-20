<template>
  <div class="divider" style="float: left" v-if="type != 'expenditure'"></div>
  <div style="float: left" class="pl-3">
    <div class="flex flex-column">
      <div class="flex" v-if="type == 'Summon'">
        <div class="receiptsDiv p-3">Receipt No: {{ receipt }}</div>
      </div>
      <div :class="type == 'Summon' ? 'flex mt-5' : 'flex'">
        <div class="flex flex-column">
          <div class="flex">
            <span class="attachmentsDiv">Attachments</span>
          </div>
          <div class="flex mt-3">
            <GroupedFiles :data="data" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttachmentsTemplate",
  props: ["data", "type", "receipt"],
};
</script>

<style>
.receiptsDiv {
  width: 173px;
  height: 41 px;
  background: #cee0ff;
  opacity: 0.5;
  border: 1px dashed #357dea;
  box-sizing: border-box;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7;
}
.attachmentsDiv {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
  line-height: 15px;
}
.divider {
  border-left: 1px solid #000000;
  opacity: 0.1;
  height: 100%;
  width: 1%;
}
</style>
