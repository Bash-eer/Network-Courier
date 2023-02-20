<template>
  <div
    class="
      flex
      justify-content-between
      fsr-create-contact
      color-4e5868
      align-items-center
      bg-fbeeaa
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
          Customer has approved the quotation
        </div>
        <div class="bold-400 font-size-14 line-height-17">
          Please complete by clicking create contract
        </div>
      </div>
    </div>
    <div class="align-items-center justify-content-center mr-4">
      <Button>Create Contract</Button>
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
.fsr-create-contact {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
}


</style>
