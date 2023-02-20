<template>
  <div
    class="
      flex
      justify-content-between
      bg-fff3ec
      color-4e5868
      border-radius-8
      align-items-center
    "
  >
    <div class="flex my-3">
      <div>
        <img
          :src="'/images/brownTick.png'"
          alt="...img"
          class="fsr-create-contact-image mx-3"
        />
      </div>
      <div>
        <div class="font-size-16 line-height-20 express-international-font">
          Contract Signed by the customer
        </div>
        <div class="bold-400 font-size-14 line-height-17">
          Please click the activate button to activate the customer in contract
        </div>
      </div>
    </div>
    <div class="align-items-center justify-content-center mr-4">
      <Button>Activate </Button>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
.project-jobs-create-contact {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
}
</style>
