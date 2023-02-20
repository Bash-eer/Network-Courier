<template>
  <div>
    <div class="flex align-items-center justify-content-center mr-2">
      <div v-if="imageURL != null || imageURL != undefined">
        <img :src="imageURL" class="avatarImage" />
      </div>
      <div v-else-if="imageURL == null || imageURL == undefined">
        <img src="../../../../public/images/noavatar.png" class="avatarImage" />
      </div>

      <Buttons
        :label="imageName"
        icon="pi pi-angle-down"
        iconPos="right"
        type="button"
        @click="toggle"
        class="text-900 border-0 surface-0"
      />
    </div>

    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="false"
      id="overlay_panel"
      style="w-6"
      :breakpoints="{ '960px': '75vw' }"
      v-model="selectedOption"
      :options="data"
      optionLabel="name"
      optionValue="code"
      optionGroupLabel="name"
      optionGroupChildren="items"
      :filter="true"
      :showClear="false"
      :class="classes"
      class="
        flex
        align-items-center
        justify-content-centertext-left
        inputfield
        w-2
        p-inputtext-lg
      "
      @hide="close"
      :placeholder="placeholder"
      @click.self="isOpen = true"
    >
      <div class="flex flex-column flex-wrap">
        <div
          class="d-flex mb-4 mt-2 relative"
        >
          <InputText
            class="ml-4 mr-4 pt-3 pb-3 border-radius-10 search"
            type="text"
            style="height: 20px; width: 182px"
            placeholder="Search"
            v-model="inputSearch"
            @input="inputClick(this.expandData, this.rowData)"
          />
        </div>
        <div v-for="items of data" class="flex my-1 menuDivs" :key="items.name">
          <div class="flex flex-row cursor-pointer">
            <div class="flex align-items-center justify-content-center mr-2">
              <img :src="items.image_url" class="avatarImage" />
            </div>
            <div
              @click="menuClicked(items, data, this.rowData, this.field)"
              class="
                flex
                align-items-center
                justify-content-center
                hover-Menu
                custom-speed-dial-text
              "
            >
              {{ items.employee_name }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-center
          py-3
          flex-wrap
        "
      >
        <div
          class="
            flex
            align-self-center
            justify-content-center
            w-100
            style-button
          "
        >
          <CancelButton
            storePath="operationAllotment"
            label="Cancel"
            class="color-357dea relative mr-6"
            v-on:childToParent="cancelbutton"
          />
          <Buttons
            v-if="tableDataName == 'BikeDefaultAllotmentData'"
            label="Submit"
            button_class="save_button mr-7"
            v-on:childToParent="submitData"
          />
          <Buttons
            v-if="tableDataName == 'VanDefaultAllotmentData'"
            label="Submit"
            button_class="save_button mr-7"
            v-on:childToParent="submitDataVan"
          />
          <Buttons
            v-if="tableDataName == 'BikeRiderExpandAllotmentData'"
            label="Submit"
            button_class="save_button mr-7"
            v-on:childToParent="submitDataExpandBike"
          />
          <Buttons
            v-if="tableDataName == 'VanRiderExpandAllotmentData'"
            label="Submit"
            button_class="save_button mr-7"
            v-on:childToParent="submitDataExpandVan"
          />
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
export default {
  name: "overlaypanel",
  components: { OverlayPanel ,InputText},
  props: [
    "data",
    "rowData",
    "field",
    "tableDataName",
    "databikepost",
    "colorr",
    "expandData"
  ],
  data() {
    return {
      imageURL: null,
      imageName: "Select",
      errorreceived: false,
      selectedOption: "",
      selectedImage: "",
      selectedName: "",
      payloadData: null,
      inputSearch: null,
      payloadDataVan: null,
      images: [
        "https://depositphotos.com/vector-images/no-profile-picture.html",
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    menuClicked(items, Data, rowData, field) {
      this.selectedImage = items.image_url;
      this.selectedName = items.employee_name;
      //for paylod
      if (items.id) {
        this.payloadData = {};
        this.payloadData["route_id"] = Number(rowData?.zone_id);
        this.payloadData["rider_id"] = items?.id;
        this.payloadData["trip_id"] = Number(rowData[field]?.id);
        this.payloadData["zone_id"] = Number(rowData?.id);
        this.payloadData["from_date"] =
          this.$store.state.operationAllotment.DateData.from_date;
        this.payloadData["to_date"] =
          this.$store.state.operationAllotment.DateData.to_date;
        this.payloadData["override"] = false;
      }
      if (items.id) {
        this.payloadDataVan = {};
        this.payloadDataVan["route_id"] = Number(rowData?.zone_id);
        this.payloadDataVan["rider_id"] = items?.id;
        this.payloadDataVan["trip_id"] = Number(rowData[field]?.id);
        this.payloadDataVan["zone_id"] = Number(rowData?.id);
        this.payloadDataVan["from_date"] =
          this.$store.state.operationAllotment.DateDataVan.from_date;
        this.payloadDataVan["to_date"] =
          this.$store.state.operationAllotment.DateDataVan.to_date;
        this.payloadDataVan["override"] = false;
      }
      if (items.id) {
        this.payloadDataExpandBike = {};
        this.payloadDataExpandBike["rider_id"] = items?.id;
        this.payloadDataExpandBike["trip_id"] = Number(rowData?.trip_id);
        this.payloadDataExpandBike["duration_id"] = Number(
          this.databikepost?.data.id
        );
      }
      if (items.id) {
        this.payloadDataExpandVan = {};
        this.payloadDataExpandVan["rider_id"] = items?.id;
        this.payloadDataExpandVan["trip_id"] = Number(rowData?.trip_id);
        this.payloadDataExpandVan["duration_id"] = Number(
          this.databikepost?.data.id
        );
      }
    },
    submitData() {
      if (this.payloadData) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.$refs.op.hide();
        this.addBikeZoneData();
      }
    },
    submitDataVan() {
      if (this.payloadDataVan) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.$refs.op.hide();
        this.addVanZoneData();
      }
    },
    submitDataExpandBike() {
      if (this.payloadDataExpandBike) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.$refs.op.hide();
        this.RiderAllotmentExpandBikeCaller();
      }
    },
    submitDataExpandVan() {
      if (this.payloadDataExpandVan) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.$refs.op.hide();
        this.RiderAllotmentExpandVanCaller();
      }
    },
    inputClick(expandData, rowData) {
      if(this.tableDataName == 'BikeDefaultAllotmentData'  ){
        if (this.inputSearch != null) {
          this.postBikeDataSearch = {};
          (this.postBikeDataSearch["zone_id"] = rowData?.id),
            this.bikeZoneDataSearch(this.postBikeDataSearch);
        }
      }
      else if(this.tableDataName == 'VanDefaultAllotmentData'){
      if (this.inputSearch != null) {
        this.postVanDataSearch = {};
        (this.postVanDataSearch["zone_id"] = rowData?.id),
          this.vanZoneDataSearch(this.postVanDataSearch);
      }
      }
      else if(this.tableDataName == 'BikeRiderExpandAllotmentData'){
        if (this.inputSearch != null) {
          this.postBikeHistoryDataSearch = {};
          (this.postBikeHistoryDataSearch["zone_id"] = expandData?.zone_id),
            (this.postBikeHistoryDataSearch["stand_by"] = false),
            this.bikeZoneDataHistorySearch(this.postBikeHistoryDataSearch);
        }
      }
      else if(this.tableDataName == 'VanRiderExpandAllotmentData'){
        if (this.inputSearch != null) {
          this.postvanHistoryDataSearch = {};
          (this.postvanHistoryDataSearch["zone_id"] = expandData?.zone_id),
            (this.postvanHistoryDataSearch["stand_by"] = false),
            this.vanZoneDataSearch(this.postvanHistoryDataSearch);
        }
      }
    },
    cancelbutton() {
      this.$refs.op.hide();
    },
    bikeZoneDataSearch(data) {
      this.$store.dispatch("operationAllotment/getSearchRiderDataStandby", {
        path: `/operations/zone/rider/bike?globalsearchkey=${this.inputSearch}`,
        data: data,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    bikeZoneDataHistorySearch(data) {
      this.$store.dispatch("operationAllotment/getSearchRiderDataStandby", {
        path: `/operations/zone/rider/bike?globalsearchkey=${this.inputSearch}`,
        data: data,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
     vanZoneDataSearch(data) {
      this.$store.dispatch("operationAllotment/getSearchRiderDataStandby", {
        path: `/operations/zone/rider/van?globalsearchkey=${this.inputSearch}`,
        data: data,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    addBikeZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATIONSTANDBY", {
        path: "/operations/rider-allotment/bike",
        data: this.payloadData,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addVanZoneData() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONVANSTANDBYY",
        {
          path: "/operations/rider-allotment/van",

          data: this.payloadDataVan,
          method: "POST",
          closeDialogue: "operationAllotment/closeDialog",
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        }
      );
    },
    RiderAllotmentExpandBikeCaller() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONVANSTANDBYY",
        {
          path: "/operations/rider-allot/standby/bike/" + this.rowData.id,

          data: this.payloadDataExpandBike,
          method: "PATCH",
          closeDialogue: "operationAllotment/closeDialog",
          loadData:
            "operationAllotment/loadfetchRiderAllotmentExpandTableDataBike",
          
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        }
      );
    },
    RiderAllotmentExpandVanCaller() {
      this.$store.dispatch(
        "operationAllotment/POSTPATCHCRUDOPERATIONVANSTANDBYY",
        {
          path: "/operations/rider-allot/standby/van/" + this.rowData.id,

          data: this.payloadDataExpandVan,
          method: "PATCH",
          closeDialogue: "operationAllotment/closeDialog",
          loadData:
            "operationAllotment/loadfetchRiderAllotmentExpandTableDataVan",
          loadDiffStore: true,
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        }
      );
    },
  },
  created() {
    if (this.rowData[this.field] != null && this.colorr == false) {
      if (this.rowData[this.field]?.rider) {
        this.imageName = this.rowData[this.field].rider?.employee_name;
        this.imageURL = this.rowData[this.field]?.rider?.image_url;
      }
    }
  },
  watch: {
    "$store.state.operationAllotment.errorconflicting": function () {
      this.errorreceived = true;
      if (this.errorreceived) {
        this.$confirm.require({
          message: "Are you sure you want to override the existing data?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.payloadData =
              this.$store.state.operationAllotment.errorconflicting;
            this.payloadData.override = true;
            this.addBikeZoneData();
          },
        });
      }
    },
    "$store.state.operationAllotment.errorconflictingvan": function () {
      this.errorreceived = true;
      if (this.errorreceived) {
        this.$confirm.require({
          message: "Are you sure you want to override the existing data?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.payloadDataVan =
              this.$store.state.operationAllotment.errorconflictingvan;
            this.payloadDataVan.override = true;
            this.addVanZoneData();
          },
        });
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 960px) {
  .p-overlaypanel[pv_id_6] {
    width: 30vw !important;
  }
}
.avatarImage {
  height: 34px;
  width: 32px;
  border-radius: 5px;
  margin-right: 2px;
}
.colorChange {
  width: 178px;
  height: 65px;
  left: 633px;
  top: 548px;

  background: #ff7a00;
  opacity: 0.2;
  border-radius: 4px;
}
.p-button {
  padding: 0.5rem 0.5rem;
}
::v-deep .button:hover {
  background-color: #ffffff;
  border-radius: 6px;
  color: black;
  border: 1px solid #ffffff;
}
.search{
   position: relative;
    left: -26px;
}
 
::v-deep .button {
  width: 117px;
  color: #ffffff;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 3px;
}
.style-button {
  position: relative;
  top: 15px;
}

.button {
  width: 117px;
  color: #ffffff;
  background: #2196f3;
  border: 1px solid #2196f3;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 3px;
}
</style>
