<template>
  <div class="row w-100 vehicleDashBoardParentDiv">
    <div class="col-4 parent vehicle-image-size">
      <div class="card vehiclesCard vehiclesImage w-100 h-100">
        <img
          class="card-img-top vehiclesImage"
          :src="$store.state.fleets.vehicleDashBoardData['image_url']"
          height="250"
          width="250"
          alt=""
        />
        <div
          class="
            flex
            justify-content-between
            pt-4
            pl-4
            pr-4
            vehicleActions
            w-100
            vehiclesCard
          "
        >
          <router-link to="/fleet-management/vehicles">
            <div class="flex act"><i class="pi pi-arrow-left" /></div
          ></router-link>
          <div class="flex act"><i class="pi pi-ellipsis-h" /></div>
        </div>
        <div class="card-body h-100">
          <!--vehicle and driver overview header-->
          <div class="flex justify-content-between">
            <div class="flex">
              <div class="flex flex-column">
                <div class="flex">
                  <div class="flex flex-row">
                    <div class="flex vehicleName">
                      {{ $store.state.fleets.vehicleDashBoardData["name"] }}
                    </div>
                    <div class="flex">
                      <img
                        class="card-img-top vehiclesImage"
                        :src="'/images/' + 'vehicleActivity' + '.png'"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="flex vehicleNumber">
                  {{ $store.state.fleets.vehicleDashBoardData["reg_no"] }}
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-row">
                <div class="flex mr-2">
                  <img
                    class="card-img-top vehicleDriver"
                    :src="'/images/' + 'avatarTwo' + '.png'"
                    alt=""
                  />
                </div>
                <div class="flex">
                  <div class="flex flex-column">
                    <div class="flex designation">Driver</div>
                    <div class="flex driverName">
                      <!-- {{ $store.state.fleets.vehicleDashBoardData["driver"] }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--numbers-->
          <div class="h-100">
            <div
              v-for="(row, index) in $store.state.fleets
                .vehicleDashBoardCircles"
              :key="index"
              :class="index == 0 ? 'row mt-4' : 'row circlesRowTwo'"
            >
              <div
                v-for="(circles, cIndex) in row['row']"
                :key="cIndex"
                class="col-6 circles"
              >
                <CircularProgress
                  :percentage="circles.percentage"
                  :actualValue="circles.actualValue"
                  :color="circles.color"
                  :type="circles.type"
                  :label="circles.label"
                  :img="circles.img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8 vehicleTabsCard">
      <div class="card vehiclesCard h-100">
        <FleetManagementHomeTabs
          v-bind:tabMenuData="$store.state.fleets.fleetsDashBoardTabMenuData"
          type="fleetsHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FleetManagementHome",
  methods: {
    openDialog(name) {
      this.$store.state["users"].displayDialog = true;
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },
  created() {
    this.$store.commit("users/updateBreadCrumb", "FleetHome");
  },
  watch: {
    "$store.state.fleets.vehicleDashBoardCircles": function () {
    },
  },
};
</script>

<style scoped>
.vehicleDashBoardParentDiv {
  max-width: 2000px;
  margin: auto;
}
.circlesRowTwo {
  margin-top: 2%;
}
.circles {
  padding-left: 10% !important;
  padding-right: 10% !important;
}
.act {
  cursor: pointer;
}
.parent {
  position: relative;
  /* margin: 0; */
}
.vehicleActions {
  position: absolute;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  height: 20%;
  margin-top: 0;
}
.vehiclesCard {
  border-radius: 10px 10px 10px 10px !important;
  box-shadow: 0px 10px 20px rgba(32, 75, 140, 0.05);
}
@media only screen and (max-width: 2560px) {
  .vehicleTabsCard {
    height: 1060px !important;
  }
  .vehicle-image-size {
    height: 1060px !important;
  }
}
@media only screen and (max-width: 1440px) {
  .vehicleTabsCard {
    height: 800px !important;
  }
  .vehicle-image-size {
    height: 800px !important;
  }
}
@media only screen and (max-width: 1024px) {
  .vehicleTabsCard {
    height: 850px !important;
  }
  .vehicle-image-size {
    height: 850px !important;
  }
}
/* .vehicleTabsCard {
  height: 800px !important;
}
.vehicle-image-size {
  height: 800px !important;
} */
.vehiclesImage {
  border-radius: 10px;
}

.vehicleDriver {
  width: 32px;
  height: 32px;
}
.designation {
  font-size: 11px;
  color: #4e5868;
  font-weight: 600;
}
.driverName {
  color: #4e5868;
  font-size: 12px;
  font-weight: bold;
}
.vehicleName {
  color: #4e5968;
  font-weight: 700;
  font-size: 20px;
}
.vehicleNumber {
  color: #4e5968;
  font-size: 16px;
  font-weight: 500;
}
</style>
