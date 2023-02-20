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
              >{{ data.title }} <br />{{data.subTitle??"" }}</span
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
               <div v-if="contacts.length !==0" class="flex flex-row">
                <div  v-for="(i, index1) of contacts" :key="index1">
                  <img
                  v-if="i?.selected"
                :src="i?.profile_url??''"
                alt="img"
                height="32"
                width="32"
                class="mx-1"
                
              />
              <!-- v-tooltip.bottom="`${i?.contact_name??''}  <br />  ${i?.contact_no??''}`" -->
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
import Tooltip from "primevue/tooltip";
import moment from "moment";
export default {
  
  name: "ExpressTimeLineHeader",
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      RowData: [
        {
          title: "Service Type",
          subTitle: "Van",
        },
        {
          title: "Address",
          subTitle: this.$store.state.salesExpressContractVan
      .OverviewData?.address??"",
        },
        {
          title: "Contract Start Date",
          subTitle: moment(this.$store.state.salesExpressContractVan
      .OverviewData?.settings?.contract_start_date??Date()).format("d MMM yy"),
      field:"contract_start_date"
        },
        {
          title: "Contract End Date",
          subTitle: moment(this.$store.state.salesExpressContractVan
      .OverviewData?.settings?.contract_end_date??Date()).format("d MMM yy"),
      field:"contract_end_date"
        },
        {
          title: "Contract Period",
          subTitle: this.$store.state.salesExpressContractVan
      .OverviewData?.settings?.contract_period??"",
      field:"contract_period"
        },
        {
          title: "Credit Terms",
          subTitle: this.$store.state.salesExpressContractVan
      .OverviewData?.settings?.credit_terms??"",
      field:"credit_terms"
        },
      ],
      contacts: this.$store.state.salesExpressContractVan
      .OverviewData?.contacts??[],
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
