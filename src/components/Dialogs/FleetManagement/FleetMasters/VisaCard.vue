<template>
  <!--body-->
  <div class="grid ml-5">
    <!--left-->
    <div class="col-6">
      <div class="visa-card-left">
        <img class="absolute-img" src="/images/visa-card-left-img.png" alt="" />
        <div
          class="flex flex-row justify-content-between align-items-start w-full"
        >
          <div class="flex flex-column m-3 px-2">
            <span class="visa-card-normal-text">{{ cardDetails.vendor }}</span>
            <span class="visa-card-silent-text">Vendor</span>
          </div>
          <div class="flex flex-row visa-card-top-right m-3 p-1">
            <img
              class="m-1"
              src="/images/visa-card-right-img.png"
              alt="img"
              width="28"
              height="20"
            />
            <div class="flex flex-column m-1">
              <div class="visa-card-card-text">
                {{ $store.state.masters.fleetCardType }}
              </div>
              <div class="visa-card-card-text">CARD</div>
            </div>
          </div>
        </div>
        <div class="flex flex-column m-2 mx-3 px-2">
          <span class="visa-card-bold-text">{{ cardDetails.card_no }}</span>
          <span class="visa-card-silent-text">Card number</span>
        </div>

        <div class="flex flex-row justify-content-between m-3 px-2">
          <div class="flex-colum">
            <div class="visa-card-normal-text">{{ cardDetails.card_type }}</div>
            <div class="visa-card-silent-text">Card Type</div>
          </div>
          <!-- <div class="px-2 flex flex-row">
            <div class="flex-colum mx-2">
              <div class="visa-card-normal-text">
                {{ cardDetails.issue_date }}
              </div>
              <div class="visa-card-silent-text">Issue</div>
            </div>
          </div> -->
          <div class="px-2 flex flex-row">
            <div class="flex-colum mx-2">
              <div class="visa-card-normal-text">
                {{ cardDetails.issue_date }}
              </div>
              <div class="visa-card-silent-text">Issue</div>
            </div>
            <div class="flex-colum mx-2">
              <div class="visa-card-normal-text">
                {{ cardDetails.expiry_date }}
              </div>
              <div class="visa-card-silent-text">Expiry</div>
            </div>
          </div>
        </div>
        <img
          class="visa-card-bottom-img1"
          src="/images/visa-card-bottom-img-1.png"
          alt=""
        />
        <img
          class="visa-card-bottom-img2"
          src="/images/visa-card-bottom-img-2.png"
          alt=""
        />
      </div>
    </div>
    <!--right-->
    <div class="col-6">
      <div class="visa-card-right flex flex-column align-items-center p-4 ml-2">
        <div class="flex flex-column justify-content-start w-100">
          <div class="visa-card-right-bold-text">
            {{ cardDetails.balance + "$" }}
          </div>
          <div class="visa-card-right-silent-text">Used Credit</div>
        </div>

        <div class="flex flex-row justify-content-between w-100 mt-4">
          <div>
            <div class="visa-card-right-normal-text">
              {{ cardDetails.top_up_cycle }}
            </div>
            <div class="visa-card-right-silent-text">Topup Cycle</div>
          </div>
          <div class="px-7">
            <div class="visa-card-right-normal-text">
              {{ cardDetails.top_up_day }}
            </div>
            <div class="visa-card-right-silent-text">Topup Day</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--body-->
</template>

<script>
export default {
  props: ["cardDetails"],
};
</script>

<style scoped>
.visa-card-left {
  position: relative;
  color: #fff;
  height: 200px !important;
  width: 327px !important;
  background: #3e7eff;
  border-radius: 10px;
  box-shadow: 5px 10px 10px -15px #111;
}
.absolute-img {
  position: absolute;
  left: 0;
  top: 5px;
}
.visa-card-right {
  height: 200px !important;
}
.visa-card-top-right {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 11px;
  letter-spacing: 0px;
  text-align: left;
}
.visa-card-silent-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
  mix-blend-mode: normal;
  opacity: 0.75;
}
.visa-card-normal-text {
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.3250001072883606px;
  text-align: left;
}
.visa-card-bold-text {
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0.5500000715255737px;
  text-align: left;
}
.visa-card-card-text {
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 11px;
  letter-spacing: 0px;
  text-align: left;
}
.visa-card-right-bold-text {
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5868;
}
.visa-card-right-normal-text {
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5868;
}
.visa-card-right-silent-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
  color: #718199;
}
.visa-card-bottom-img1 {
  position: absolute;
  bottom: -10px;
  margin-right: -30px;
  left: 10px;
}
.visa-card-bottom-img2 {
  position: absolute;
  bottom: -20px;
  left: 23px;
}
</style>
