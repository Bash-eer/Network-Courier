<template>
  <div class="grid ml-1">
    <div class="col wrapper">
      <div class="flex justify-content-between">
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex mr-4">
              <img
                :src="'/images/' + 'parcel' + '.png'"
                alt=""
                class="parcel ml-2"
              />
            </div>
            <div class="flex mr-4">
              <span class="type commonTextStyle"
                >Service Type <br />{{
                  $store.state.sales.expressQuotationOverviewData[0][
                    "timeLineHeader"
                  ]["service_required"]
                }}</span
              >
            </div>
            <div class="flex mr-4"><div class="vertical_line"></div></div>
            <div class="flex mr-4">
              <span class="type_address commonTextStyle"
                >Address <br />{{
                  $store.state.sales.expressQuotationOverviewData[0][
                    "timeLineHeader"
                  ]["address"]
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-row">
            <div class="flex mr-4">
              <div class="flex mr-3"><div class="vertical_line"></div></div>
              <div class="flex mr-3">
                <img :src="'/images/' + 'pdf' + '.png'" alt="" />
              </div>
              <div class="flex mr-4"><div class="vertical_line"></div></div>
              <div class="flex">
                <div class="flex flex-column">
                  <div class="flex commonTextStyle">Sent To</div>
                  <div class="flex mt-2">
                    <GroupedAvatars
                      :data="
                        $store.state.sales.expressQuotationOverviewData[0][
                          'members'
                        ].length < 3
                          ? $store.state.sales.expressQuotationOverviewData[0][
                              'members'
                            ]
                          : getGroupedAvatarsData(
                              $store.state.sales
                                .expressQuotationOverviewData[0]['members']
                            )
                      "
                      :more="
                        $store.state.sales.expressQuotationOverviewData[0][
                          'members'
                        ].length >= 3
                          ? $store.state.sales.expressQuotationOverviewData[0][
                              'members'
                            ].length - 2
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
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
  color: #ffffff;
  font-size: 12px;
  font-weight: 300;
}
.type_address {
  margin-top: 5%;
}
.type {
  margin-top: 19%;
}
.vertical_line {
  border-left: 1px solid #4383e5;
  height: 100%;
  width: 0%;
  // position: absolute;
}
.parcel {
  margin-top: 9%;
}
.wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
  color: #fff !important;
}
.title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.subtitle {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.side-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.heading {
  font-family: $font-family-primary;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.03em;
  text-align: left;
}
.sub-heading {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
</style>
