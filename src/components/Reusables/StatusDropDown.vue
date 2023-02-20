<template>
  <Dropdown
    @change="$emit('update:modelValue', $event.value)"
    :value="modelValue"
    v-model="selectedStatus"
    :options="data"
    optionLabel="name"
    optionValue="code"
    :filter="false"
    :class="classes"
    class="flex text-left inputfield w-full p-inputtext-lg"
    :placeholder="placeholder"
    appendTo="self"
  >
    <template #option="slotProps">
      <StatusTags
        :type="getOptionType(slotProps.option.name)"
        :label="slotProps.option.name"
        usage="table"
      />
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  name: "StatusDropDown",
  components: { Dropdown },
  props: ["state", "data", "classes", "placeholder", "modelValue"],
  data() {
    return {
      selectedStatus: null,
    };
  },
  methods: {
    getOptionType(label) {
      let type;
      if (label == "Not Coming") {
        switch (label) {
          case "Not Coming":
            type = "NotComing";
            break;
        }
        return type;
      } else {
        type = label;
      }
      return type;
    },
  },
  created() {
    if (this.state != "") {
      for (let s in this.data) {
        if (this.data[s]["name"] == this.state) {
          this.selectedStatus = this.data[s]["code"];
        }
      }
    }
  },
};
</script>

<style scoped></style>
