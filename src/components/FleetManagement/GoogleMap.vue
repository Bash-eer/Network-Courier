<template>
  <div class="">
    <div id="pac-container">
      <input
        id="pac-input"
        class="controls"
        type="text"
        placeholder="Search Box"
      />
    </div>
    <div id="map" class="mapSize"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "GoogleMapComponents",
  props: ["positionData", "type", "jobArrangement"],
  data: () => ({
    map: null,
    mapCenter: { lat: 1.277064, lng: 103.8069639 },
    dummyCenter: {
      lat: 11.0117016,
      lng: 76.8971944,
    },
    autocomplete: null,
    gmarkers : []
  }),

  methods: {
    initMap() {
      let dS = new window.google.maps.DirectionsService();
      let dD = new window.google.maps.DirectionsRenderer();

      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.mapCenter,
        zoom: 13,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        fullScreenControl: false,
        zoomControl: true,
      });

      this.loadAutoComplete();

      dD.setMap(this.map);

      if (this.type === "JobTrip") {
        let newVal = this.getStoredOptimizeData;
        let storeDatas =
          this.getStoredOptimizeData && this.getStoredOptimizeData.coordinates
            ? this.getStoredOptimizeData.coordinates
            : [];

        let datLength = storeDatas.length;

        let startData = datLength > 0 ? storeDatas[0].coordinates : null;
        let endData =
          datLength > 0 ? storeDatas[datLength - 1].coordinates : null;

        if (newVal && Object.keys(newVal).length > 0) {
          let startValues = newVal.routes[0]?.legs[0]?.start_location;
          let endValues = newVal.routes[0]?.legs[0]?.end_location;

          let waypts = [];

          let legData = newVal.routes[0]?.legs;

          for (let i = 0; i < legData.length; i++) {
            if (legData[i]?.start_location) {
              waypts.push({
                location:
                  legData[i] && i != legData.length - 1
                    ? legData[i].start_location
                    : legData[i].end_location,
                  stopover: true,
              });

              this.setMarker(
                legData[i]?.start_location,
                legData[i] && i == 0
                  ? "/images/vanMapSmall.png"
                  : "/images/deliveryBoxSmall.png"
              );

            }
          }

          if (startData && endData) {
            var request = {
              origin: startValues,
              destination: endValues,
              travelMode: "DRIVING",
              waypoints: waypts,
              optimizeWaypoints: true,
            };

            dS.route(request, function (result, status) {
              if (status == "OK") {
                dD.setDirections(result);
              }
            });
          }
        }

      }
    },

    setMarker(points, icons) {
      const contentString =
        "<div >" +
        '<div class="flex justify-content-between flex-wrap p-2">' +
        '<div style="border-radius: 10px" class="flex-none align-items-center justify-content-center w-2rem h-2rem bold-600 text-white border-round m-2" >' +
        '<img :src="/images/avatarThree.png" alt="" width="35" height="35" class="ml-2 mr-2"/></div>' +
        '<div style="min-width: max-content" class=" flex-initial flex-column align-items-center justify-content-center w-3rem h-2rem  bold-600  text-black border-round m-2 ">' +
        '<div class="flex color-4e5968 font-size-8">' +
        '<div class="bold-300">342 -</div>' +
        '<div class="bold-600 ml-1">kjhgfd</div>' +
        '<div style="height: 7px; margin-top: 5px; margin-left: 5px; width: 7px; background-color: #17c079; border-radius: 5px; "></div></div>' +
        '<div class="flex color-4e5968 font-size-8 mt-1">' +
        '<img :src="/images/van.png" alt="" width="25" height="20" class="ml-2 mr-2" />-</div></div>' +
        '<div style="min-width: max-content" class="flex-none flex-column align-items-center justify-content-center w-6rem h-2rem bold-600 text-black border-round m-2">' +
        '<div class="bold-300 flex color-4e5968 font-size-8">' +
        '<div class="bold-600 ml-1 color-4e5968 font-size-8"></div></div></div></div>' +
        '<div class="flex justify-content-between p-2"><div style="border-radius: 10px" class="flex-none align-items-center justify-content-center w-2rem h-2rem bold-600 text-white border-round m-2">' +
        '<img :src="/images/express.png" alt="" width="35" height="30" class="ml-2 mr-4" /></div>' +
        '<div style="min-width: max-content" class="flex-initial flex-column align-items-start justify-content-start w-3rem h-2rem bold-600 text-black border-round m-2 ml-4">' +
        '<div class="flex color-4e5968 font-size-8"><div class="bold-300">Current Job : </div><div class="bold-600 ml-1"> MC1234567</div></div>' +
        '<div class="flex color-4e5968 font-size-8 mt-1"><div class="bold-300">Est. Delivery : </div><div class="bold-600 ml-1"> 09:00 PM </div></div></div>' +
        '<div style="min-width: max-content" class="flex-none flex-column align-items-center justify-content-center w-6rem h-2rem bold-600 text-black border-round m-2"><div class="bold-300 flex color-4e5968 font-size-8"><div class="bold-600 ml-1 color-4e5968 font-size-8"></div></div></div></div></div>';

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Uluru",
      });

      const markers = new window.google.maps.Marker({
        position: points,
        map: this.map,
        icon: icons,
      });

      markers.addListener("click", () => {
        infowindow.open({
          anchor: markers,
          ...this.map,
        });
      });

    },
    loadAutoComplete() {
      const input = document.getElementById("pac-input");
      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
      };
      this.autocomplete = new window.google.maps.places.Autocomplete(
        input,
        options
      );
      this.autocomplete.bindTo("bounds", this.map);

      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);
        }
      });
    },
  },
  watch: {
    positionData: function (newVal, oldVal) {
      if (this.type === "Rider") {
        this.initMap();
        newVal?.forEach((c) => {
          if (c.position && c.position.lat && c.position.lng) {
            this.setMarker(c.position, c.icons);
           
          }
        });
      } else if (this.type === "JobTrip") {
        this.initMap();
        newVal?.forEach((c) => {

          if (c.coordinates) {
             this.setMarker(c.coordinates, c.icons);
             
          }
        });
      }
    },

    getStoredOptimizeData: function (newVal, oldVal) {
      let dS = new window.google.maps.DirectionsService();
      let dD = new window.google.maps.DirectionsRenderer();

      if (this.type === "JobTrip") {
        let datLength = [newVal.coordinates].length;
        let dataArrays = [newVal.coordinates];

        let startData = datLength > 0 ? dataArrays[0]?.coordinates : null;
        let endData = datLength > 0 ? dataArrays[datLength - 1]?.coordinates : null;


        if (newVal && Object.keys(newVal).length > 0) {
          let startValues = newVal.routes[0]?.legs[0]?.start_location;
          let endValues = newVal.routes[0]?.legs[0]?.end_location;

          let waypts = [];

          let legData = newVal.routes[0]?.legs;

          for (let i = 0; i < legData.length; i++) {
            if (legData[i]?.start_location) {
              waypts.push({
                location:
                  legData[i] && i != legData.length - 1
                    ? legData[i].start_location
                    : legData[i].end_location,
                stopover: true,
              });

             this.setMarker(
                legData[i]?.start_location,
                legData[i] && i == 0
                  ? "/images/vanMapSmall.png"
                  : "/images/deliveryBoxSmall.png"
              );
            }
          }

          if (startData && endData) {
            var request = {
              origin: startValues,
              destination: endValues,
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: "DRIVING",
            };

            dS.route(request, function (result, status) {
              if (status == "OK") {
                dD.setDirections(result);
              }
            });
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getStoredOptimizeData: "LiveMapStore/getStoredOptimizeData",
    }),
  },
  mounted() {
    this.initMap();
    if (this.type === "Rider") {
      this.positionData?.forEach((c) => {
        if (c.position && c.position.lat && c.position.lng) {
          this.setMarker(c.position, c.icons);
        }
      });
    }
  },
};
</script>

<style scoped>
.mapSize {
  width: 67.5vw;
  height: 65vh;
}
#pac-input {
  height: 51px;
  background: #ffffff;
  border: 1px solid #e0e4eb;
  border-radius: 6px;
  width: 80%;
  padding: 20px;
  outline: none;
}
.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}
#pac-container {
  padding-bottom: 12px;
  margin-top: 12px;
  z-index: 99;
  position: absolute;
  width: 100%;
}
</style>
