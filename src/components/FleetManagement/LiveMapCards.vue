<template>
  <div
    :class="
      selectedRiderId === itemData.id ? 'borderClassSelected' : 'borderCard'
    "
    @click="selectedRider(itemData.id)"
  >
    <div
      style="width: 365px"
      class="
        flex
        justify-content-between
        flex-wrap
        card-container
        purple-container
        p-2
      "
    >
      <div
        style="border-radius: 10px"
        class="
          flex-none
          align-items-center
          justify-content-center
          w-2rem
          h-2rem
          bold-600
          text-white
          border-round
          m-2
        "
      >
        <img
          :src="'/images/avatarThree.png'"
          alt=""
          width="35"
          height="35"
          class="ml-2 mr-2"
        />
      </div>
      <div
        style="min-width: max-content"
        class="
          flex-initial flex-column
          align-items-center
          justify-content-center
          w-3rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
        "
      >
        <div class="flex color-4e5968 font-size-12">
          <div class="bold-300">{{ itemData.id }} -</div>
          <div class="bold-600 ml-1">{{ itemData.username }}</div>

          <div
            style="
              height: 7px;
              margin-top: 5px;
              margin-left: 5px;
              width: 7px;
              background-color: #17c079;
              border-radius: 5px;
            "
          ></div>
        </div>
        <div class="flex color-4e5968 font-size-12 mt-1">
          <img
            :src="'/images/van.png'"
            alt=""
            width="25"
            height="20"
            class="ml-2 mr-2"
          />
          {{ itemData.contact_no ? itemData.contact_no : "-" }}
        </div>
      </div>

      <div
        style="min-width: max-content"
        class="
          flex-none flex-column
          align-items-center
          justify-content-center
          w-6rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
        "
      >
        <div class="bold-300 flex color-4e5968 font-size-12">
          Jobs Done Today :

          <div class="bold-600 ml-1 color-4e5968 font-size-12">
            {{ itemData.jobs ? itemData.jobs : "-" }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        flex
        justify-content-between
        flex-wrap
        card-container
        purple-container
        mt-2
        p-2
        pb-4
      "
    >
      <div
        style="min-width: max-content"
        class="
          flex-initial flex-column
          align-items-center
          justify-content-center
          w-3rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
        "
      >
        <div class="flex bold-300 color-4e5968 font-size-12">
          Current Job

          <img
            :src="'/images/express.png'"
            alt=""
            width="25"
            height="20"
            class="ml-2"
          />
        </div>
        <div class="flex color-4e5968 font-size-12 mt-1">
          {{ itemData.current ? itemData.current : "-" }}
        </div>
      </div>
      <div
        style="min-width: max-content"
        class="
          flex-initial flex-column
          align-items-center
          justify-content-center
          w-3rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
        "
      >
        <div class="flex bold-300 color-4e5968 font-size-12">
          Delivery Location
        </div>
        <div class="flex color-4e5968 font-size-12 mt-1">
          {{ itemData.deliveryLocation ? itemData.deliveryLocation : "-" }}
        </div>
      </div>

      <div
        style="min-width: max-content"
        class="
          flex-none flex-column
          align-items-center
          justify-content-center
          w-6rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
        "
      >
        <div class="flex bold-300 color-4e5968 font-size-12">
          Est. Delivery :
          <div class="bold-600 ml-1 color-4e5968 font-size-12">-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
export default {
  name: "LiveMapCard",
  props: ["itemData", "selectedRiderId"],
  data() {
    return {
      searcher: "",
      riderIdValue: ''
    };
  },
  methods: {
    selectedRider(id) {
      this.$emit("selectedRiderIdFun", id);
    },
  },
};
</script>

<style>
.borderClass {
  height: 80vh !important;
}

.borderCard {
  border: 1px solid #eaeaea;
  cursor: pointer;
  border-radius: 6px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  background-color: #ffffff;
}

.borderClassSelected {
  border: 1px solid #e2e2d8;
  cursor: pointer;
  border-radius: 6px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  background-color: #eaeaea;
}
</style>
