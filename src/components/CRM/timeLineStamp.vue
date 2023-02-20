<template>
  <div class="card-cusd-crm flex border-radius-18 pt-1">
    <div
      class="flex flex-row ml-4 mr-4 align-items-center"
      @click="$router.go(-1)"
    >
      <i class="pi pi-arrow-left color-fff pointer text-white"></i>
    </div>

    <div class="flex align-items-center ml-4">
      <AvatarLabel :label="subStringHandler(cusName)" classes="avatar-text" />
      <!-- <img class="h-3rem w-3rem mr-auto" src="/images/car.png" alt="" /> -->
    </div>
    <div
      class="
        text-white
        flex flex-column
        align-items-start
        justify-content-center
        font-bold
        py-3
        border-round
        ml-4
        col-7
      "
    >
      <div class="text-left color-fff font-size-12 bold-600">
        <label for="floatingInput w-50" class="" id="inputId">{{
          cusId
        }}</label>
      </div>
      <div class="text-left color-fff font-size-12 bold-600">
        <label for="floatingInput" class="" id="inputNames">{{
          cusName
        }}</label>
      </div>
      <!--v-if-->
    </div>

    <div
      class="
        text-left text-white
        flex flex-column
        align-items-start
        justify-content-center
        font-bold
        text-center
        border-round
      "
    >
      <div class="text-left color-fff font-size-12 bold-600 pt-1">
        Address :
      </div>
      <div class="color-fff font-size-12 bold-600 pt-1">
        {{ cusAddress ?? "" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cusId", "cusName", "cusAddress"],
  methods: {
    subStringHandler(string) {
      if (string) {
        return string.substring(0, 2);
      }
    },
  },
};
</script>
<style scoped>
.card-cusd-crm {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%);
  min-height: 13vh;
}
.form-control {
  background: linear-gradient(180deg, #357dea 0%, #0347ae 100%) !important;
  color: white !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300 !important;
  line-height: 20px;
  letter-spacing: 0px;
  border: none;
}

.pi:before {
  --webkit-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.pi-arrow-left:before {
  content: "\e91a";
}
.avatar-text {
  color: #353b48;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
</style>
