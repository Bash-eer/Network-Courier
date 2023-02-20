<template>
  <div >
    <div class="flex justify-content-between flex-wrap p-2">
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
        <div class="flex color-4e5968 font-size-8">
          <div class="bold-300">342 -</div>
          <div class="bold-600 ml-1">kjhgfd</div>

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
        <div class="flex color-4e5968 font-size-8 mt-1">
          <img
            :src="'/images/van.png'"
            alt=""
            width="25"
            height="20"
            class="ml-2 mr-2"
          />
          {{ "-" }}
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
        <div class="bold-300 flex color-4e5968 font-size-8">
          <div class="bold-600 ml-1 color-4e5968 font-size-8"></div>
        </div>
      </div>
    </div>

        <div class="flex justify-content-between p-2">
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
            :src="'/images/express.png'"
            alt=""
            width="35"
            height="30"

            class="ml-2 mr-4"
          />
      </div>
      <div
        style="min-width: max-content"
        class="
          flex-initial flex-column
          align-items-start
          justify-content-start
          w-3rem
          h-2rem
          bold-600
          text-black
          border-round
          m-2
          ml-4
        "
      >
        <div class="flex color-4e5968 font-size-8">
          <div class="bold-300">Current Job : </div>
          <div class="bold-600 ml-1"> MC1234567</div>
        </div>
        <div class="flex color-4e5968 font-size-8 mt-1">

          <div class="bold-300">Est. Delivery : </div>
          <div class="bold-600 ml-1"> 09:00 PM </div>
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
        <div class="bold-300 flex color-4e5968 font-size-8">
          <div class="bold-600 ml-1 color-4e5968 font-size-8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
export default {
  name: "ToolTipComponent",
  props: ["itemData", "selectedRiderId"],
  data() {
    return {
      searcher: "",
    };
  },
};
</script>

<style></style>
