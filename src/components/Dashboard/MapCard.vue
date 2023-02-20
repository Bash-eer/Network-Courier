<template>
  <GoogleMap
    api-key="AIzaSyBqmYAYo7avti-jDXV6Rh_gHKLaIKkM0AE"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
    class="map"
  >
    <Marker :key="index" v-for="(m, index) in markerOptions" :options="m" />
  </GoogleMap>
</template>
<script>
// import { defineComponent } from "vue";
// import marker_img from "../../assets/map.svg"
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  name: "Map",
  components: {
    GoogleMap,
    Marker,
  },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    const locations = [
      { lat: 40.689247, lng: -74.044502, title: "point one", label: "P1" },
      { lat: 40.789247, lng: -74.044502, title: "point two", label: "P2" },
    ];
    var markerOptions = [];
    for (var l in locations) {
      var loc_obj = locations[l];
      var marker_obj = {};
      marker_obj["position"] = { lat: loc_obj.lat, lng: loc_obj.lng };
      marker_obj["label"] = loc_obj.label;
      marker_obj["title"] = loc_obj.title;
      markerOptions.push(marker_obj);
    }
    return { center, markerOptions };
  },
};
</script>
<style scoped>
.map-card-wrap {
  width: 100%;
  height: 100%;
}
.card {
  border-radius: 8px 8px 0 0 !important;

  margin: 0 !important;
  padding: 0 !important;
}
::v-deep .mapdiv {
  border-radius: 0px 0px 10px 10px !important;
}
</style>
