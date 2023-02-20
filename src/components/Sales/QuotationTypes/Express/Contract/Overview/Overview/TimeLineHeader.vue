<template :key="renderkey">
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
                flex flex-row
                align-items-center
                justify-content-center
              "
            >
              Preview
            </div>
            <div
              v-if="attachmentData"
              class="
                item-second-wrap
                grid
                flex flex-row
                align-items-center
                justify-content-center
              "
            >
              <div
                class="col-5 md:col-3"
                v-for="(file, index) in attachmentData"
                :key="index"
              >
                <div
                  class="
                    wrap-insider
                    flex flex-row
                    align-items-center
                    justify-content-between
                  "
                >
                  <a :href="file.url" target="_blank">
                    <img
                      v-if="
                        file.mime_type == 'image/png' ||
                        file.mime_type == 'image/jpeg'
                      "
                      src="/images/drag-drop-img.png"
                      alt=""
                      class="mx-3"
                      v-tooltip.bottom="
                        file.file_name.substring(0, 8) +
                        `<br />` +
                        (file.size / 1000000).toFixed(2) +
                        ' mb'
                      "
                    />
                    <img
                      v-else-if="file.mime_type == 'application/pdf'"
                      src="/images/drag-drop-pdf.png"
                      alt=""
                    />
                    <img
                      v-else-if="
                        file.mime_type ==
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      "
                      src="/images/drag-drop-excel.png"
                      alt=""
                    />
                    <img v-else src="/images/drag-drop-doc.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div v-else>-</div>
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
            <!-- {{ overview_data.contacts }} -->
            <div class="mt-2">
              <div class="flex flex-row">
                <div v-for="contact in overview_data?.contacts" :key="contact">
                  <img
                    :src="contact?.profile_url"
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
              <!-- <img
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
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Tooltip from "primevue/tooltip";
export default {
  name: "ExpressTimeLineHeader",
  props: ["IncomingData"],
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      renderkey: 1,
      attachmentData: null,
      RowData: [
        {
          title: "Service Type",
          subTitle: "",
        },
        {
          title: "Address",
          subTitle: "",
        },
        {
          title: "Contract Start Date",
          subTitle: "",
        },
        {
          title: "Contract End Date",
          subTitle: "",
        },
        {
          title: "Contract Period",
          subTitle: "",
        },
        {
          title: "Credit Terms",
          subTitle: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  watch: {
    "$store.state.salesExpressContract.OverviewData": function () {
      this.loadState();
      this.renderkey++;
    },
  },
  async created() {
    this.loadState();
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY ");
        return formattedDate;
      }
    },
    loadState() {
      let set_ting = this.overview_data?.settings;
      let data = this.overview_data?.express_contract[0];
      this.RowData[0].subTitle =
        this.overview_data?.express_contract[0]?.service;
      this.RowData[1].subTitle =
        this.overview_data?.unit_no +
        ", " +
        this.overview_data?.floor_no +
        ", " +
        this.overview_data?.building_name +
        ", " +
        this.overview_data?.address +
        ", " +
        this.overview_data?.state +
        ", " +
        this.overview_data?.country +
        ", " +
        this.overview_data?.postal_code;
      if (this.$route.params.type == "contract") {
        this.RowData[2].subTitle = this?.dateFormater(
          set_ting?.contract_start_date
        );
        this.RowData[3].subTitle = this?.dateFormater(
          set_ting?.contract_end_date
        );
      } else {
        this.RowData[2].subTitle = this?.dateFormater(
          set_ting?.estimated_start_date
        );
        this.RowData[3].subTitle = this?.dateFormater(
          set_ting?.estimated_end_date
        );
      }
      this.RowData[4].subTitle = set_ting?.contract_period || "-";
      this.RowData[5].subTitle = data?.bill_settings?.credit_terms;
      if (this.$route.params.type == "contract") {
        if (
          this.overview_data?.contract_attachments?.length != 0 &&
          this.overview_data?.contract_attachments[0]?.attachments
        ) {
          this.attachmentData =
            this.overview_data?.contract_attachments[0]?.attachments;
        }
      } else {
        if (
          this.overview_data?.quotation_attachments?.length != 0 &&
          this.overview_data?.quotation_attachments[0]?.attachments
        ) {
          this.attachmentData =
            this.overview_data?.quotation_attachments[0]?.attachments;
        }
      }

      this.renderkey++;
    },
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
