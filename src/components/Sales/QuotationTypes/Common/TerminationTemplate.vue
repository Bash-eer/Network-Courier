<template>
  <div class="sales-termination-template">
    <div
      class="
        flex flex-row
        align-items-center
        justify-content-between
        sales-termination-wrapper
        p-3
      "
    >
      <!--left-->
      <div class="flex align-items-center">
        <img src="/images/termination.png" alt="" width="44" height="44" />
        <div class="color-fff mx-3 font-size-16 bold-600">
          Contract has been terminated
        </div>
        <!-- <div
          class="
            color-ffe600
            text-decoration-line
            mx-2
            bold-600
            font-size-12
            cursor-pointer
          "
        >
          View Contract >
        </div> -->
        <div
          @click="withDrawTerminationHandler()"
          class="
            color-ffe600
            text-decoration-line
            mx-2
            bold-600
            font-size-12
            cursor-pointer
          "
        >
          Withdraw Termination >
        </div>
      </div>
      <!--righty-->
      <div class="flex align-items-center">
        <div class="flex flex-column ml-3 p-0">
          <p
            class="
              font-size-11
              bold-600
              line-height-13
              color-fff
              opacity-07
              m-0
              p-0
            "
          >
            Termination No
          </p>
          <p class="bold-600 font-size-12 line-height-15 color-fff mt-1">
            {{ termination_no }}
          </p>
        </div>
        <div class="flex flex-column ml-3 p-0">
          <p
            class="
              font-size-11
              bold-600
              line-height-13
              color-fff
              opacity-07
              m-0
              p-0
            "
          >
            Created On
          </p>
          <p class="bold-600 font-size-12 line-height-15 color-fff mt-1">
            {{ createdAt }}
          </p>
        </div>
        <!-- <div class="flex m-2">
          <span>
            <p
              class="
                font-size-11
                bold-600
                line-height-13
                color-fff
                opacity-07
                m-0
                p-0
              "
            >
              Created On
            </p>
            <b
              class="
                bold-600
                font-size-12
                line-height-15
                color-fff
                opacity-1
                m-0
                p-0
              "
            > -->
        <!-- {{
                          dateFormater(
                            rapidoContractOverviewData
                              ?.rapido_contract_specifics?.updatedAt
                          )
                        }} -->
        <!-- {{ dateFormater(rapidoContractOverviewData.updatedAt) }} -->
        <!-- 24th Apr, 2021 -->
        <!-- </b></span
          >
        </div> -->
        <div class="flex mx-3">
          <img
            :src="this.$store.state.commonStore.userDetails?.profile_url ?? ''"
            alt="img"
            width="32"
            height="32"
          />
          <div class="flex flex-column ml-3 p-0">
            <p
              class="
                font-size-11
                bold-600
                line-height-13
                color-fff
                opacity-07
                m-0
                p-0
              "
            >
              Sales person
            </p>
            <p class="bold-600 font-size-12 line-height-15 color-fff p-0 mt-1">
              {{ this.$store.state.commonStore.loggedInUser ?? "" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--below-content-->
    <div>
      <div
        class="
          flex flex-row
          ml-1
          my-4
          p-3
          align-items-center
          justify-content-between
          flex-wrap
        "
      >
        <div
          class="flex mr-7"
          v-for="(item, index) of secondRowData"
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex color-7e84a7 express-international-table">
              {{ getHeader(index) }}
            </div>
            <div class="flex express-international-table color-c11e1e">
              {{ item || "-" }}
            </div>
          </div>
        </div>
        <div>
          <div class="flex color-7e84a7 express-international-table">
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
      </div>
      <!--bottom-->
      <div class="p-3">
        <div class="reason my-1">Reason</div>
        <div class="reason-div p-2">
          {{ reason }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  props: ["loadData"],
  data() {
    return {
      secondRowData: {
        termination_reference_by: "Letter",
        date: "01 July 2022",
        request_termination_date: "01 July 2022",
        actual_termination_date: "01 July 2022",
        yearly_contract: "Not In Line to Contract Terms",
        non_yearly_contract: "Not In Line to Contract Terms",
      },
      termination_no: "",
      createdAt: "",
      reason: "",
      incomingData: null,
      contract_profile_id: "",
      termination_id: "",
    };
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "termination_reference_by":
          header = "Termination Reference by";
          break;
        case "date":
          header = "Date";
          break;
        case "request_termination_date":
          header = "Request Termination Date";
          break;
        case "actual_termination_date":
          header = "Actual Termination Date";
          break;
        case "yearly_contract":
          header = "Yearly Contract (Terms)";
          break;
        case "non_yearly_contract":
          header = "Not In Line to Contract Terms";
          break;
        // case "estimated_start_date":
        //   header = "Estimated Start Date";
        //   break;
      }
      return header;
    },

    withDrawTerminationHandler() {
      this.$confirm.require({
        message: "Are you sure you want to Withdraw the termination?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
            path:
              "/sales/contracts/terminations/reactivate/" +
              // this.$store.state.salesApproval.approvalsTerminationStateData.termination_id
              this.termination_id,
            method: "PATCH",
            id: this.$route.params.id,
            type: this.$route.params.type,
            loadDiffStore: true,
            // data: this.details,
            toastData: {
              toastSuccessData: {
                toastMsg: `The Termination has been withdrawn successfully!`,
                toastSeverity: "success",
              },

              toastCommonErrorData: {
                toastMsg: "",

                toastSeverity: "error",
              },
            },
            loadData: this.loadData,
          });
        },
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
  },
  created() {
    // $route.params.type == 'quotation'
    axios
      .get("/sales/contracts/terminations/contract/" + this.$route.params.id)
      .then((res) => {
        if (res?.data?.results) {
          this.incomingData = res.data.results.contract_termination;

          let result = res.data.results;
          this.secondRowData.date = this.dateFormater(result.date);
          this.secondRowData.termination_reference_by =
            result.termination_reference_by;
          this.secondRowData.request_termination_date = this.dateFormater(
            result.request_termination_date
          );
          this.secondRowData.actual_termination_date = this.dateFormater(
            result.actual_termination_date
          );
          this.secondRowData.yearly_contract = result.yearly_contract;
          this.non_yearly_contract = result.non_yearly_contract;
          this.termination_no = result.contract_termination.contract_id;
          this.createdAt = this.dateFormater(result.createdAt);
          this.reason = result.reason;
          this.termination_id = result.id;
        }
      });
  },
};
</script>

<style scoped>
.sales-termination-template {
  position: relative;

  background-color: rgba(251, 170, 170, 0.1);

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;

  min-height: 300px;
}
.sales-termination-wrapper {
  background: linear-gradient(180deg, #ff0000 0%, #bd0000 100%);
  opacity: 0.8 !important;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;

  width: 100%;
}
.reason {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #928d8f;

  opacity: 0.9;
}
.reason-div {
  box-sizing: border-box;

  width: 100%;
  height: 61px;

  background: #feeeee;
  border: 1px solid rgba(167, 126, 126, 0.3);
  border-radius: 8px;

  font-weight: 600;
  font-size: 12px;
  line-height: 18px;

  color: #4e5968;
}
</style>
