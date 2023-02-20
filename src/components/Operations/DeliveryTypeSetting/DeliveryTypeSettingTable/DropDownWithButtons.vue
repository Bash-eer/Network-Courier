<template>
  <div>
    <div class="border" :key="renderkey">
      <div class="flex align-items-center justify-content-start mr-6">
        <div v-if="imageURL != null || imageURL != undefined">
          <img :src="imageURL" class="avatarImage" />
        </div>
        <div v-else-if="imageURL == null || imageURL == undefined">
          <img
            src="../../../../../public/images/noavatar.png"
            class="avatarImage"
          />
        </div>

        <Buttons
          :label="imageName"
          type="button"
          @click="toggle"
          class="text-900 border-0 surface-0 bbtn-style mr-5"
        />
      </div>
    </div>
    <span class="relative mr-6">
      <OverlayPanel
        ref="op"
        appendTo="div"
        :showCloseIcon="false"
        id="overlay_panel"
        pv_id_18style="transform-origin: center top;top: 180.688px;left: 210.469px; --overlayArrowLeft: -4px;z-index: 2102;"
        :breakpoints="{ '960px': '15vw' }"
        v-model="selectedOption"
        :options="data"
        optionLabel="name"
        optionValue="code"
        optionGroupLabel="name"
        optionGroupChildren="items"
        :filter="true"
        :showClear="false"
        :class="classes"
        class="w-min pr-4"
        @hide="close"
        :placeholder="placeholder"
        @click.self="isOpen = true"
      >
        <div class="flex flex-column flex-wrap">
          <div class="d-flex mx-4 mb-4 mt-2 relative">
            <InputText
              class="py-3 border-radius-10"
              type="text"
              style="height: 20px"
              placeholder="Search"
              v-model="inputSearch"
              @input="input"
            />
          </div>

          <div
            v-for="items of data"
            class="flex my-1 menuDivs mr-2"
            :key="items.name"
          >
            <div class="flex flex-row cursor-pointer">
              <div class="flex align-items-center justify-content-center mr-2">
                <img :src="items.image_url" class="avatarImage" />
              </div>
              <div
                @click="menuClicked(items, this.rowData, this.field)"
                class="
                  flex
                  align-items-center
                  justify-content-center
                  hover-blue
                  custom-speed-dial-text
                "
              >
                {{ items.employee_name }}
              </div>
            </div>
          </div>
        </div>
      </OverlayPanel>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
export default {
  name: "overlaypanel",
  components: { OverlayPanel, InputText },
  props: ["data", "rowData", "field", "tableDataName"],
  data() {
    return {
      imageURL: "",
      imageName: "Select",
      selectedOption: "",
      selectedImage: "",
      selectedName: "",
      payloadData: null,
      inputSearch: null,
      renderkey: 10,
      employee: [],
    };
  },
  computed: {
    ...mapGetters({
      PrefillBikeDeliveryData: "TypeSetting/PrefillBikeDeliveryData",
      PrefillVanDeliveryDatawireup: "TypeSetting/PrefillVanDeliveryDatawireup",
      PrefillRapidoDeliveryDatawireup:
        "TypeSetting/PrefillRapidoDeliveryDatawireup",
      tabData: "TypeSetting/addRegionDeliveryTransportTypeData",
    }),
  },
  methods: {
    ...mapActions({
      getDriverDropDownListSearch: "TypeSetting/getDriverDropDownListSearch",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    menuClicked(items, rowData, field) {
      this.$emit("selectedName", { name: items.employee_name, id: items.id }),
        (this.selectedImage = items.image_url);
      this.selectedName = items.employee_name;
      this.imageName = this.selectedName;
      this.imageURL = this.selectedImage;
      this.$refs.op.hide();
    },
    input() {
      if (this.inputSearch != null) {
        let datacome = {
          tab: this.tabData,
          employee_name: this.inputSearch,
        };
        if (datacome) {
          this.getDriverDropDownListSearch(datacome);
        }
      }
    },
    cancelbutton() {
      this.$refs.op.hide();
    },
  },
  created() {
    if (this.PrefillBikeDeliveryData) {
      this.imageName =
        this.PrefillBikeDeliveryData.driver_details?.employee_name || "select";
      this.imageURL = this.PrefillBikeDeliveryData.driver_details?.image_url;
      this.renderkey++;
    }
    if (this.PrefillVanDeliveryDatawireup) {
      this.imageName =
        this.PrefillVanDeliveryDatawireup.driver_details?.employee_name ||
        "select";
      this.imageURL =
        this.PrefillVanDeliveryDatawireup.driver_details?.image_url;
      this.renderkey++;
    }
    if (this.PrefillRapidoDeliveryDatawireup) {
      this.imageName =
        this.PrefillRapidoDeliveryDatawireup.driver_details?.employee_name ||
        "select";
      this.imageURL =
        this.PrefillRapidoDeliveryDatawireup.driver_details?.image_url;
      this.renderkey++;
    }
  },
  watch: {
    "$store.state.TypeSetting.PrefillBikeDeliveryData": function () {
      if (this.PrefillBikeDeliveryData) {
        this.imageName =
          this.PrefillBikeDeliveryData.driver_details?.employee_name ||
          "select";
        this.imageURL = this.PrefillBikeDeliveryData.driver_details?.image_url;
      }
    },
    "$store.state.TypeSetting.PrefillVanDeliveryData": function () {
      if (this.PrefillVanDeliveryDatawireup) {
        this.imageName =
          this.PrefillVanDeliveryDatawireup.driver_details?.employee_name ||
          "select";
        this.imageURL =
          this.PrefillVanDeliveryDatawireup.driver_details?.image_url;
      }
    },
    "$store.state.TypeSetting.PrefillRapidoDeliveryData": function () {
      if (this.PrefillRapidoDeliveryDatawireup) {
        this.imageName =
          this.PrefillRapidoDeliveryDatawireup.driver_details?.employee_name ||
          "select";
        this.imageURL =
          this.PrefillRapidoDeliveryDatawireup.driver_details?.image_url;
      }
    },
    inputSearch: function () {
      if (this.inputSearch) {
        let datacome = {
          tab: this.tabData,
          employee_name: this.inputSearch,
        };
        this.getDriverDropDownListSearch(datacome);
      }

      if (this.inputSearch == null) {
        this.$store.state.TypeSetting.DriverDropDownList = null;
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
::v-deep.bbtn-style {
  text-indent: -116px;
  position: relative;
  left: 19px;
  padding-left: 116px !important;
}
.avatarImage {
  height: 37px;
  width: 40px;
  border-radius: 0px;
  margin-right: 22px;
}
.position {
  position: relative;
  right: 34px;
}
.p-button {
  padding: 0.5rem 0.5rem;
}

.border {
  border: 1px solid lightgray;
}
.icon-style {
  position: relative;
  /* right: -37px; */
  left: 28px;
}
.dstyle {
  position: absolute;
  left: 50px;
}
::v-deep #p-overlaypanel {
  background: #ffffff;
  color: #261298 !important;
  border: 0 none;
  border-radius: 0px;
  margin-left: -51px !important;
  position: relative;
  left: 10%;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
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
.pi-angle-down:before {
  content: "\e930";
  margin-left: 12px;
}
::v-deep.left {
  left: 25% !important;
}
::v-deep .searchicon {
  width: 140px !important;
}
</style>
