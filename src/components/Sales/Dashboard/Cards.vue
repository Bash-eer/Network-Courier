<template>
  <div class="grid">
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/rapidoBadge.png"
                width="30"
                height="20"
                alt="Rapido"
                class="mr-1"
              />
              <CircleProgress 
               :percent="55"
               :is-gradient="true"
                :gradient="{
                    angle:210,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
                empty-color="#204B8C"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
          <div class="pl-3">
            <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6">1,545</h3>
            <p class="text-white text-left font-size-14 bold-500 line-height-28">Advanced Contracts</p>
          </div>
        </template>
        <!-- <template #title>
          <h3 class="text-white text-left cardValue">1,545</h3>
        </template>
        <template #content>
          <p class="text-white text-left cardTitle">Advanced Contracts</p>
        </template> -->
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/InternationalBadge.png"
                width="30"
                height="20"
                alt="International"
                class=""
              />
              <CircleProgress 
               :percent="80"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle:180,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
          <div class="pl-3">
             <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6">575</h3>
            <p class="text-white text-left font-size-14 bold-500 line-height-28">International Contracts</p>
          </div>
        </template>
        <!-- <template #title>
          <h3 class="text-white text-left bold-800">575</h3>
        </template>
        <template #content>
          <p class="text-white text-left">International Contracts</p>
        </template> -->
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/ExpressBadge.png"
                width="30"
                height="20"
                alt="Express"
                class="mr-1"
              />
              <CircleProgress 
               :percent="35"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle:100,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
          <div class="pl-3">
             <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6">100</h3>
            <p class="text-white text-left font-size-14 bold-500 line-height-28">Express Contracts</p>
          </div>
        </template>
        <!-- <template #title>
          <h3 class="text-white text-left bold-800">100</h3>
        </template>
        <template #content>
          <p class="text-white text-left">Express Contracts</p>
        </template> -->
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/rapidoBadge.png"
                width="30"
                height="20"
                alt="Rapido"
                class="mr-2"
              />
              <CircleProgress 
               :percent="80"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle: 180,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
          <div class="pl-3">
             <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6">1,005</h3>
            <p class="text-white text-left font-size-14 bold-500 line-height-28">Rapido Contracts</p>
          </div>
        </template>
        <!-- <template #title>
          <h3 class="text-white text-left bold-800">1,005</h3>
        </template>
        <template #content>
          <p class="text-white text-left">Rapido Contracts</p>
        </template> -->
      </Card>
    </div>
  </div>
  <div class="grid mt-2">
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/InternationalBadge.png"
                width="30"
                height="20"
                alt="International"
                class=""
              />
              <CircleProgress 
               :percent="45"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle: 100,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div><p class="flex text-white font-size-13 bold-500 line-height-15 mt-3">International</p></div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6 ml-3">67</h3>
            </div>
            <div>
              <h3 class="text-white font-size-22 bold-700 line-height-28 mt-6 mr-3">05</h3>
            </div>
          </div>
        </div>
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <p class="text-white text-left font-size-14 bold-500 line-height-28 ml-3">Agent</p>
            </div>
            <div>
              <p class="text-white font-size-14 bold-500 line-height-28 mr-3">Adhoc</p>
            </div>
          </div>
        </div>
      </template>
        <!-- </template>
        <template #title>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <h3 class="text-white text-left bold-800">67</h3>
            </div>
            <div>
              <h3 class="text-white text-left bold-800">05</h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <p class="text-white text-left">Agent</p>
            </div>
            <div>
              <p class="text-white">Adhoc</p>
            </div>
          </div>
        </template> -->
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/ExpressBadge.png"
                width="30"
                height="20"
                alt="Express"
                class=""
              />
              <CircleProgress 
               :percent="80"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle: 210,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
              
            </div>
            <div><p class="flex text-white font-size-13 bold-500 line-height-15 mt-3">Express</p></div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6 ml-3">22</h3>
            </div>
            <div>
              <h3 class="text-white font-size-22 bold-700 line-height-28 mt-6 mr-3">12</h3>
            </div>
          </div>
        </div>
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <p class="text-white text-left font-size-14 bold-500 line-height-28 ml-3">Agent</p>
            </div>
            <div>
              <p class="text-white font-size-14 bold-500 line-height-28 mr-3">Adhoc</p>
            </div>
          </div>
        </div>
      </template>
        <!-- </template>
        <template #title>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <h3 class="text-white text-left bold-800">22</h3>
            </div>
            <div>
              <h3 class="text-white text-left bold-800">12</h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <p class="text-white text-left">Agent</p>
            </div>
            <div>
              <p class="text-white">Adhoc</p>
            </div>
          </div>
        </template> -->
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/rapidoBadge.png"
                width="30"
                height="20"
                alt="Rapido"
                class="mr-2"
              />
              <CircleProgress 
               :percent="60"
                empty-color="#204B8C"
                :is-gradient="true"
                :gradient="{
                    angle: 150,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
              :show-percent="false"
              :viewport="true"
              />
            </div>
            <div><p class="text-left text-white font-size-13 bold-500 line-height-15 mt-3">Rapido</p></div>
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
        
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6 ml-3">32</h3>
            </div>
            <div>
              <h3 class="text-white font-size-22 bold-700 line-height-28 mt-6 mr-3">232</h3>
            </div>
          </div>
        </div>
        <div>
          <div class="flex align-items-center justify-content-between ">
            <div class="text-white">
              <p class="text-white text-left font-size-14 bold-500 line-height-28 ml-3">Agent</p>
            </div>
            <div>
              <p class="text-white font-size-14 bold-500 line-height-28 mr-3">Adhoc</p>
            </div>
          </div>
        </div>
      </template>
      </Card>
    </div>
    <div class="col-3">
      <Card class="sales-dashboard-cards min-height-152 mr-2">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <div class="mt-4 ml-3">
              <img
                src="/images/InternationalBadge.png"
                width="30"
                height="20"
                alt="International"
                class=""
              />
              <CircleProgress 
               :percent="30"
               :is-gradient="true"
               :gradient="{
                    angle:45,
                    startColor: '#FBFBFB',
                    stopColor: '#204b8c'
                }"
                empty-color="#204B8C"
              :show-percent="false"
              :viewport="true"
              />
            </div>
             <!-- <div><p class="flex text-white">International</p></div> -->
            <div>
              <img
                :src="require(`@/assets/graphIcon.png`)"
                width="15"
                height="9"
                alt="Img"
                class="mr-3"
              />
            </div>
          </div>
          <div class="pl-3">
             <h3 class="text-white text-left font-size-22 bold-700 line-height-28 mt-6">432</h3>
            <p class="text-white text-left font-size-14 bold-500 line-height-28 pb-3">International Contracts</p>
          </div>
        </template>
        <!-- <template #title>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <h3 class="text-white text-left bold-800">432</h3>
            </div>
            <div>
              <h3 class="text-white text-left bold-800"></h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex align-items-center justify-content-between">
            <div class="text-white">
              <p class="text-white text-left">International Contracts</p>
            </div>
            <div>
              <p class="text-white"></p>
            </div>
          </div>
        </template> -->
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "primevue/card";
import CircleProgress from '../../../components/Reusables/CircularProgress.vue'
export default {
  components: {
    Card,
    CircleProgress
  },
};
</script>

<style scoped>
.p-card.p-component.sales-dashboard-cards {
  background: linear-gradient(
    108.42deg,
    #204b8c 2.45%,
    rgba(32, 75, 140, 0) 198.45%
  );
  /* padding: 10px; */
}
.p-card-content {
  padding: 0 !important;
}
/* .p-card-header {
  margin: 10px;
} */
.p-card-header img {
  width: 17px !important;
}
.vue3-circular-progressbar{
  width: 40px !important;
  height: 0px !important;
  top: -30px !important;
}
::v-deep .p-card .p-card-body{
  display: none !important;
}
</style>
