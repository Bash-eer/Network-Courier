<template>
  <div class="container">
    <ul>
      <li v-for="(item, index) of parcelJobs" :key="index">
        <span
          class="circle"
          :style="{
            backgroundColor: item.status == 'Completed' ? '#66C11E' : '',
          }"
        ></span>
        <span
          class="number"
          :style="{
            backgroundColor: item.status == 'Completed' ? '#66C11E' : '',
          }"
          v-if="parcelJobs.length - 1 != index"
        ></span>
        <div>
          <div class="title flex justify-content-between">
            <div class="mt-0">
              {{ item.job_type
              }}<span class="reference ml-3">Ref {{ referenceNo }}</span>
            </div>

            <div class="mr-5 mt-0">
              <i
                class="pi pi-check route-check-icon"
                :style="{
                  color: item.status == 'Completed' ? '#66C11E' : '',
                }"
              ></i>
            </div>
          </div>
          <div class="info">
            Endorphine Speed 2 Men Shoes -
            <span class="status">Parcel Delivered</span>
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
  border-radius: 6px;
  width: 100%;
  height: 60px;
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
  width: 3px;
  background: #dadadb;
  position: absolute;
  margin: 13px 3px 0px;
}
.container span.number span:first-child {
  top: 0;
}

.title {
  font-weight: 600;
  font-size: 10.5032px;
  color: #7469f2;
}

.reference {
  font-weight: 600;
  font-size: 10.5032px;
  color: #357dea;
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
  background: #8c8cc1;
  position: absolute;
  top: 3px;
}
.route-check-icon {
  font-weight: 600;
}

/*===== // Vertical Timeline =====*/
</style>
