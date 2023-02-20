<template>
  <div class="flex justify-content-between van-fsr-create-contact">
    <div class="flex my-3">
      <div>
        <img
          :src="'/images/brownTick.png'"
          alt="...img"
          class="van-fsr-create-contact-image mx-3"
        />
      </div>
      <div>
        <div class="van-fsr-create-contact-heading express-international-font">
          Customer has approved the quotation
        </div>
        <div class="van-fsr-create-contact-sub-heading">
          Please Complete Bill setting and Contract setting to Complete contract
        </div>
      </div>
    </div>
    <div class="van-fsr-create-contact-button mr-4">
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
.van-fsr-create-contact {
  background-color: #fbeeaa;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  align-items: center;
  color: #4e5868;
}
.van-fsr-create-contact-image {
  align-items: center;
}
.van-fsr-create-contact-button {
  align-items: center;
  justify-content: center;
}

.van-fsr-create-contact-heading {
  font-size: 16px;
  line-height: 20px;
}
.van-fsr-create-contact-sub-heading {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
</style>
