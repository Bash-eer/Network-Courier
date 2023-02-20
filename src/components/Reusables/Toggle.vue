<template>
  <div>
    <InputSwitch
      v-model="checked"
      @input="EmitToParent($event, toggleLabel)"
      :disabled="disable"
    />
  </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";
export default {
  name: "Toggle",
  props: ["toggleLabel", "check", "disable"],
  data: () => ({
    checked: true,
  }),
  methods: {
    EmitToParent(event, label) {
      this.$emit("childToParent", event, label);
    },
  },
  components: {
    InputSwitch,
  },
  created() {  
    this.checked = this.check;
  },
 
};
</script>

<style></style>
