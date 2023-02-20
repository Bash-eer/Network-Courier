<template>
  <div>
    <div class="flex align-items-center justify-content-center mr-2">
      <span v-if="imageURL != ''">
        <img :src="imageURL" class="avatarImage" />
      </span>
      <span v-else
        ><img
          src="../../../../../public/images/noavatar.png"
          class="avatarImage"
      /></span>

      <Buttons
        :label="imageName || profileName"
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
          v-if="
            tableDataName != 'BikeDefaultAllotmentData' &&
            tableDataName != 'VanDefaultAllotmentData'
          "
        >
          <InputText
            class="ml-4 mr-4 pt-3 pb-3 border-radius-10 search"
            type="text"
            style="height: 20px; width: 182px"
            placeholder="Search"
            v-model="inputSearch"
            @input="input"
          />
        </div>
        <div
          class="d-flex mb-4 mt-2 relative"
          v-if="tableDataName == 'BikeDefaultAllotmentData'"
        >
          <InputText
            class="ml-4 mr-4 pt-3 pb-3 border-radius-10 search"
            type="text"
            style="height: 20px; width: 182px"
            placeholder="Search"
            v-model="inputSearchBike"
            @input="inputClickBike(items, this.rowData)"
          />
        </div>
        <div
          class="d-flex mb-4 mt-2 relative"
          v-if="tableDataName == 'VanDefaultAllotmentData'"
        >
          <InputText
            class="ml-4 mr-4 pt-3 pb-3 border-radius-10 search"
            type="text"
            style="height: 20px; width: 182px"
            placeholder="Search"
            v-model="inputSearchBike"
            @input="inputClickVan(items, this.rowData)"
          />
        </div>
        <div v-for="items of data" class="flex my-1 menuDivs" :key="items.name">
          <div class="flex flex-row cursor-pointer">
            <div class="flex align-items-center justify-content-center mr-2">
              <img :src="items.image_url" class="avatarImage" />
            </div>
            <div
              @click="
                menuClicked(items, this.rowData, this.field, this.tableData)
              "
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                custom-speed-dial-text
              "
            >
              {{ items.employee_name }}
              {{ items.vendor_name }}
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
        <div class="flex align-self-center justify-content-center w-100">
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
            button_class="save_button mr-5"
            v-on:childToParent="submitDataVan"
          />
          <Buttons
            v-if="tableDataName == 'RapidoDeliveryDataTable'"
            label="Submit"
            button_class="save_button mr-5"
            v-on:childToParent="submitDataDelivery"
          />
          <Buttons
            v-if="tableDataName == 'RapidoDeliveryDataTablevendor'"
            label="Submit"
            button_class="save_button mr-5"
            v-on:childToParent="submitDataDeliveryvendor"
          />
          <Buttons
            v-if="tableDataName == 'RapidocollectionDataTablepage'"
            label="Submit"
            button_class="save_button mr-5"
            v-on:childToParent="RapidocollectionDataTablepage"
          />
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
export default {
  name: "overlaypanel",
  components: { OverlayPanel, InputText },
  props: ["data", "rowData", "field", "tableDataName", "tableData"],
  data() {
    return {
      imageURL: "",
      imageName: "Select",
      profileName: "select",
      selectedOption: "",
      selectedImage: "",
      selectedName: "",
      selectedprofileName: "",
      profileUrl: "",
      payloadData: null,
      payloadDataDelivery: null,
      inputSearch: null,
      inputSearchBike: null,
      postBikeDataSearch: {},
    };
  },
  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: "operationAllotment/POSTPATCHCRUDOPERATION",
      loadcollectionDataTablePage:
        "rapidoRiderAllotment/loadcollectionDataTablePage",
      getRiderDropDownListSearch:
        "operationAllotment/getRiderDropDownListSearch",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    menuClicked(items, rowData, field) {
      this.selectedImage = items.image_url;
      this.selectedName = items.employee_name;
      if (this.tableDataName == "RapidoDeliveryDataTablevendor") {
        this.selectedprofileName = items.vendor_name;
        this.selectedprofileurl = items.profile_url;
      }
      //for paylod
      if (items.id) {
        this.payloadData = {};
        this.payloadData["route_id"] = Number(rowData?.zone_id);
        this.payloadData["rider_id"] = items?.id;
        this.payloadData["trip_id"] = Number(rowData[field]?.id);
        this.payloadData["zone_id"] = Number(rowData?.id);
      }
      if (items.id) {
        this.payloadDataDelivery = {};
        this.payloadDataDelivery["zone_id"] = Number(rowData?.zone_id);
        this.payloadDataDelivery["route_id"] = Number(rowData?.route_id);
        this.payloadDataDelivery["rider_id"] = items?.id;
        this.payloadDataDelivery["vendor_id"] = null;
      }
      if (items.id) {
        this.payloadDataDeliveryriderallotment = {};
        this.payloadDataDeliveryriderallotment["pick_up_location_id"] = Number(
          rowData?.pick_up_location_id
        );
        this.payloadDataDeliveryriderallotment["contract_id"] =
          rowData?.contract_id;
        this.payloadDataDeliveryriderallotment["rider_id"] = items?.id;
        this.payloadDataDeliveryriderallotment["vendor_id"] = null;
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
      if (this.payloadData) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.$refs.op.hide();
        this.addVanZoneData();
      }
    },
    submitDataDelivery() {
      if (this.payloadDataDelivery) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.profileName = this.selectedprofileName;
        this.$refs.op.hide();
        this.addDeliveryZoneData();
      }
    },
    submitDataDeliveryvendor() {
      this.imageName = this.selectedName;
      this.imageURL = this.selectedImage;
      this.profileUrl = this.selectedprofileurl;
      this.profileName = this.selectedprofileName;
      this.$refs.op.hide();
    },
    RapidocollectionDataTablepage() {
      if (this.payloadDataDeliveryriderallotment) {
        this.imageName = this.selectedName;
        this.imageURL = this.selectedImage;
        this.profileName = this.selectedprofileName;
        this.$refs.op.hide();
        this.addDeliveryriderallotmentZoneData();
      }
    },
    inputClickBike(items, rowData) {
      if (this.inputSearchBike != null) {
        this.postBikeDataSearch = {};
        (this.postBikeDataSearch["zone_id"] = rowData?.id),
          (this.postBikeDataSearch["stand_by"] = false),
          this.bikeZoneDataSearch(this.postBikeDataSearch);
      }
    },
    inputClickVan(items, rowData) {
      if (this.inputSearchBike != null) {
        this.postVanDataSearch = {};
        (this.postVanDataSearch["zone_id"] = rowData?.id),
          (this.postVanDataSearch["stand_by"] = false),
          this.vanZoneDataSearch(this.postVanDataSearch);
      }
    },
    cancelbutton() {
      this.$refs.op.hide();
    },
    bikeZoneDataSearch(data) {
      this.$store.dispatch("operationAllotment/getSearchRiderData", {
        path: `/operations/zone/rider/bike?globalsearchkey=${this.inputSearchBike}`,
        data: data,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    vanZoneDataSearch(data) {
      this.$store.dispatch("operationAllotment/getSearchRiderData", {
        path: `/operations/zone/rider/van?globalsearchkey=${this.inputSearchBike}`,
        data: data,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
      });
    },
    addBikeZoneData() {
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/bike/default",
        data: this.payloadData,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rider is assigned successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rider already exists !`,
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
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/van/default",

        data: this.payloadData,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rider is assigned successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rider already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addDeliveryZoneData() {
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/rapido/default/delivery",

        data: this.payloadDataDelivery,
        method: "POST",
        loadData:
          "rapidoRiderAllotment/loadRapidoDeliveryRiderAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rider is assigned successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rider already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addDeliveryriderallotmentZoneData() {
      this.POSTPATCHCRUDOPERATION({
        path: "/operations/rider-allot/rapido/default/collection",

        data: this.payloadDataDeliveryriderallotment,
        method: "POST",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rider is assigned successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rider already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    input() {
      if (this.inputSearch != null) {
        let datacome = {
          tab: this.tableDataName,
          employee_name: this.inputSearch,
        };
        if (datacome) {
          this.getRiderDropDownListSearch(datacome);
        }
      }
    },
  },
  created() {
    if (this.rowData[this.field] != null) {
      if (this.rowData[this.field]?.rider?.rider) {
        this.imageName = this.rowData[this.field]?.rider?.rider?.employee_name;
        this.imageURL = this.rowData[this.field]?.rider?.rider?.image_url;
      }
    }
    if (this.tableDataName == "RapidocollectionDataTablepage") {
      if (this.rowData[this.field] != null) {
        this.imageName = this.rowData[this.field]?.employee_name;
        this.imageURL = this.rowData[this.field]?.image_url;
      }
    }
    if (this.tableDataName == "RapidoDeliveryDataTable") {
      this.imageName = this.rowData?.rider?.employee_name;
      this.imageURL = this.rowData?.rider?.image_url;
    }
  },
  watch: {
    inputSearch: function () {
      if (this.inputSearch) {
        let datacome = {
          tab: this.tableDataName,
          employee_name: this.inputSearch,
        };
        this.getRiderDropDownListSearch(datacome);
      }

      if (this.inputSearch == null) {
        this.$store.state.operationAllotment.RiderDropDownList = null;
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

.p-button {
  padding: 0.5rem 0.5rem;
}
.button[data-v-4af66fb2]:hover {
  background-color: #357dea;
  border-radius: 6px;
}
.button[data-v-4af66fb2] {
  width: 117px;
  color: #181717;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 3px;
}
.search{
   position: relative;
    left: -26px;
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
::v-deep .cancel{
  font-weight: bold;
    line-height: 32px;
    font-size: 14px;
    color: #2196F3;
    position: relative;
    right: 49px;
}
</style>
