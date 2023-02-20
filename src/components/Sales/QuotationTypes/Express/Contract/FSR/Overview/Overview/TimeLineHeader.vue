<template>
  <div class="grid ml-1">
    <div class="col express-contract-fsr-time-line-wrapper color-fff">
      <div class="flex flex-row justify-content-between align-items-center">
        <div class="mr-4 flex">
          <div class="mr-3">
            <img
              :src="'/images/' + 'parcel' + '.png'"
              alt=""
              class="parcel ml-2"
            />
          </div>
          <div
            class="flex flex-row"
            v-for="(data, index) in RowData"
            :key="data"
          >
            <div class="mr-4">
              <span
                class="
                  type
                  color-fff
                  font-size-12
                  line-height-15
                  letter-spacing-003
                  express-international-font
                "
                >{{ data.title }} <br />{{ data.subTitle }}</span
              >
            </div>
            <div v-if="index == 0" class="mr-4">
              <div class="express-contract-fsr-time-line-vertical-line"></div>
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="flex mx-4 flex-column">
            <div
              class="
                color-fff
                font-size-12
                line-height-15
                letter-spacing-003
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
          <div class="flex mr-4">
            <div class="express-contract-fsr-time-line-vertical-line"></div>
          </div>

          <div class="flex flex-column">
            <div
              class="
                color-fff
                font-size-12
                line-height-15
                letter-spacing-003
                express-international-font
              "
            >
              Sent To
            </div>
            <div class="mt-2 flex flex-row">
              <div
                v-for="contact in this.CostingDetails.contacts"
                :key="contact"
              >
                <img
                  :src="contact.profile_url"
                  alt="img"
                  height="32"
                  width="32"
                  class="mx-1"
                  v-tooltip.bottom="
                    contact.contact_name + `<br />` + contact.mobile_no
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "primevue/tooltip";
import { mapGetters } from "vuex";
export default {
  name: "ExpressTimeLineHeader",
  directives: {
    tooltip: Tooltip,
  },

  computed: {
    ...mapGetters({
      CostingDetails: "salesExpressContractFSR/ExpressContractFsrOverviewData",
    }),
  },

  data() {
    return {
      RowData: null,
    };
  },
  methods: {},
  mounted() {
    this.RowData = [
      {
        title: "Service Type",
        subTitle: this.CostingDetails?.business_type,
      },
      {
        title: "Address",
        subTitle: this.CostingDetails?.address,
      },
    ];
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-contract-fsr-time-line-vertical-line {
  border-left: 1px solid #4383e5;
  height: 59px;
  width: 0%;
}

.express-contract-fsr-time-line-wrapper {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  height: 80px !important;
  border-radius: 15px;
}
</style>
