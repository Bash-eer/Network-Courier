<template>
  <div class="container bg-fff">
    <ul>
      <li v-for="(item, index) of parcelJobs?.delivery_proof" :key="index">
        <span
          class="circle"
          :style="{
            backgroundColor: item?.status == 'Completed' ? '#6DB302' : '',
          }"
        ></span>
        <span
          class="number"
          :style="{
            backgroundColor: item?.status == 'Completed' ? '#6DB302' : '',
          }"
          v-if="parcelJobs?.delivery_proof.length - 1 != index"
        ></span>
        <div>
          <div class="title flex justify-content-between">
            <div class="mt-0 flex-column">
              <span class="reference mb-3"> Test Shipping </span>
              <h6 class="mt-2">Singapore</h6>
            </div>
            <div class="mt-0 flex-column">
              <span class="reference mb-3">Email </span>
              <h6 class="mt-2">test@gmail.com</h6>
            </div>

            <div class="mt-0 flex-column">
              <span class="reference mb-3">Tel No </span>
              <h6 class="mt-2">123456789</h6>
            </div>

            <div class="mt-0 flex-column">
              <span class="reference mb-3">3PL Name </span>
              <h6 class="mt-2">The Fylers</h6>
            </div>

            <div class="mt-0 flex-column">
              <span class="reference mb-3">Rider Details </span>
              <h6 class="mt-2">Johnson</h6>
            </div>

            <div class="mt-0 flex-column">
              <span class="reference mb-3">Zone Details</span>
              <h6 class="mt-2">Airport</h6>
            </div>

            <div class="mt-0 flex-column">
              <span class="reference">Address </span>
              <h6 class="mt-2">Singapore</h6>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "VerticalTimeLine",
  components: {},
  props: ["parcelJobs", "referenceNo"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
body {
  background: #e6e6e6;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

/*===== Vertical Timeline =====*/
.container ul {
  margin: 0;
  list-style: none;
  position: relative;
  padding: 1px 10px;
  color: #fff;
  font-size: 13px;
  width: 80%;
}
.container ul:before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  border-left: 2px solid #fff;
}
.container ul li {
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 65px;
}
.container ul li > div {
  margin-left: 30px;
}
.container div .info {
  font-weight: 600;
  font-size: 10.5032px;
  color: #343434;
}
.container div > div {
  margin-top: 5px;
}
.container span.number {
  height: 60px;
  width: 1px;
  background: #dadadb;
  position: absolute;
  margin: 13px 5px 0px;
}
.container span.number span:first-child {
  top: 0;
}
.container,
.container-lg,
.container-md,
.container-sm,
.container-xl,
.container-xxl {
  max-width: 1510px;
}
.title {
  font-weight: 400;
  color: #212121;
}

.reference {
  font-weight: 600;
  font-size: 16px;
  color: black;
}
.status {
  font-weight: 600;
  font-size: 10.5032px;
  color: #4e5968;
}
.circle {
  height: 10px;
  width: 10px;
  border-radius: 9px;
  background: #6db302;
  position: absolute;
  top: 3px;
}
.route-check-icon {
  font-weight: 600;
}
</style>
