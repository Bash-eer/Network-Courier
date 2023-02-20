<template>
  <div class="grid ml-1">
    <div class="col van-time-line-header-wrapper color-fff border-radius-15">
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="mr-2">
          <img
            :src="'/images/' + 'parcel' + '.png'"
            alt=""
            class="parcel ml-2"
          />
        </div>
        <div class="flex flex-row" v-for="data in RowData" :key="data">
          <div class="mr-2">
            <span
              class="
                type
                font-size-12
                line-height-15
                letter-spacing-003
                color-fff
                express-international-font
              "
              >{{ data.title }} <br />{{ data.subTitle }}</span
            >
          </div>
          <div class="mr-2">
            <div class="van-time-line-header-vertical-line"></div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-2 flex-column">
            <div
              class="
                font-size-12
                line-height-15
                letter-spacing-003
                color-fff
                express-international-font
              "
            >
              Preview
            </div>
            <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
          </div>
          <div class="flex mr-2">
            <div class="van-time-line-header-vertical-line"></div>
          </div>
          <div class="flex flex-column">
            <div
              class="
                font-size-12
                line-height-15
                letter-spacing-003
                color-fff
                express-international-font
              "
            >
              Sent To
            </div>
            <div class="mt-2">
              <img
                src="/images/avatar.png"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
              />
              <img
                src="/images/avatarTwo.png"
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
          title: "Address",
          subTitle: "4, 133 Grandee Building, Singapore, 238801",
        },
        {
          title: "Contract Start Date",
          subTitle: "14 Nov 2021",
        },
        {
          title: "Contract End Date",
          subTitle: "14 Nov 2022",
        },
        {
          title: "Contract Period",
          subTitle: "12 Months",
        },
        {
          title: "Credit Terms",
          subTitle: "15 Days",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.van-time-line-header-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}
.van-time-line-header-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
}
</style>
