<template>
  <div class="ml-1">
    <div class="col wrapper">
      <div class="flex preview">
        <div class="flex align-items-center">
          <div class="mr-4">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div class="flex flex-row" v-for="data in RowData" :key="data">
            <div class="mr-4">
              <span class="type commonTextStyleAddress"
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
            <!-- <div class="mr-4"><div class="vertical_line"></div></div> -->
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div class="commonTextStyle">Preview</div>
            <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
          </div>
          <!-- <div class="flex mr-4"><div class="vertical_line"></div></div> -->

          <div class="flex flex-column">
            <div class="commonTextStyle">Sent To</div>
            <div class="mt-2">
              <img
                src="/images/avatar.png"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpressTimeLineHeader",
  data() {
    return {
      RowData: [
        {
          title: "Service Type",
          subTitle: "Van",
        },
        {
          title: "Priority",
          subTitle: "High",
        },
        {
          title: "Address",
          subTitle: "4, 133 Grandee Building, Singapore, 238801",
        },
      ],
    };
  },
  methods: {
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.commonTextStyle {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
}
.commonTextStyleAddress {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #ffffff;
  display: flex;
  align-items: start !important;
  justify-content: start !important;
}

.vertical_line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.preview {
  justify-content: space-between !important;
}

.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
</style>
