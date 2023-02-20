<template>
  <div>

  <MultiSelect
    :id="id"
    v-model="selected"
    :key="renderKey"
    display="chip"
    @change="$emit('update:modelValue', $event.value)"
    :options="data"
    :value="modelValue"
    optionLabel="name"
    :optionValue="code"
    :placeholder="placeholder"
    :filter="filter"
    :class="classes"
    class="flex text-left inputfield p-inputtext-sm w-full"
    appendTo="body"
    :disabled="disable"
    :optionDisabled="optionDisabled"
  >
  
  <template #header>
    <div>
      
      <div  v-if="true" class="flex flex-row align-items-center mt-2 mx-2">
      <div
        v-for="category of firstData"
        :key="category.id"
        class="p-field-radiobutton flex mr-2 "
      >
        <RadioButton
          name="category"
          :value="category.type"
          v-model="select_first_type"
          @change="$emit('firstOption', category.type)"
        />
        <label
          :class="`font-size-12 ml-1 ${
            select_type == category.type ? 'primary-color' : ''
          }`"
          :for="category.id"
          >{{ category.type}}</label
        >
      </div>
    </div>
    <div v-if="true" class="flex flex-row align-items-center mt-3 mx-2">
      <div
        v-for="category of secondData"
        :key="category.id"
        class="p-field-radiobutton flex mr-2"
      >
        <RadioButton
          name="category"
          :value="category.type"
          v-model="select_second_type"
          @change="$emit('secondOption',category.type)"
        />
        <label
          :class="`font-size-12 ml-1 ${
            select_type == category.type ? 'primary-color' : ''
          }`"
          :for="category.id"
          >{{ category.type }}</label
        >
      </div>
    </div>
  </div>

  
  </template>
  </MultiSelect>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MultiSelect from "primevue/multiselect";
import RadioButton from "primevue/radiobutton";

export default {
  name: "DropDown",
  props: [
    "state",
    "placeholder",
    "data",
    "v_model_value",
    "filter",
    "label",
    "id",
    "value",
    "classes",
    "modelValue",
    "code",
    "disable",
    "optionDisabled",
    "firstData",
    "firstOption",
    "secondData",
    "secondOption",
    "dropDownName",
    "prefill",
    "selectedData"
  ],
  data: () => ({
    selected: null,
    select_first_type:"",
    select_second_type:"",
    selectedArray: [],
    selectedValues: [],
    renderKey: 1
  }),
  components: {
    MultiSelect,
    RadioButton
  },
  computed:{
...mapGetters({
      loadFeedbackData: "CrmFeedback/getFeedbackFormData",
    }),
  },
  methods:{
  ...mapActions({ 
    loadgetassigntoDropdownData:
        "CrmFeedback/loadgetassigntoDropdownData",
        loadgetNotifytoDropdownData:
        "CrmFeedback/loadgetNotifytoDropdownData"
  }),
  options() {
    if(this.dropDownName == 'assignedToooo'){

      let pay = `typeOne=${this.select_first_type}&typeTwo=${this.select_second_type}`;
      this.loadgetassigntoDropdownData(pay);
    }
    },
    optionsData() {
      if(this.dropDownName == 'notifyToooo'){
      let play = `typeOne=${this.select_first_type}&typeTwo=${this.select_second_type}`;
      this.loadgetNotifytoDropdownData(play);
      }
    },
  },
  watch: {
    modelValue: function () {
      this.$emit("childToParent", this.label, this.modelValue);
    },
    select_first_type: function(newVal,oldVal){
      if(newVal!=oldVal){
      this.options();
      this.optionsData();
      }
      
    },
    select_second_type: function(){
      this.options();
      this.optionsData();
    },
    ["selectedData"]: function(newVal, oldVal){
      if(this.dropDownName == 'notifyToooo'){
        this.select_first_type = newVal?.role == 'zone' ? 'Zones' : 'User'  
        this.renderKey += 1
      } else {
        this.select_first_type = newVal?.role == 'zone' ? 'Zones' : 'User'
        this.renderKey += 1
      }
    }
  },
  created() {
    this.selected = this.$props.value || null;
  },
};
</script>

<style>
::v-deep .p-multiselect.p-multiselect-chip .p-multiselect-token {
 background: #5DC389 !important;
    color: #ffffff;
    border-radius: 2px;
}
::v-deep .clones {
  border: 3px solid #357dea !important;
  /* font-size: 14px !important; */
}
.p-dropdown .p-dropdown-label.p-placeholder {
  color: #357dea !important;
  font-size: 14px !important;
  font-weight: bold !important;
}.p-multiselect.p-multiselect-chip .p-multiselect-token {
    background: #5DC389;
    color: #ffffff;
    border-radius: 2px;
}

.p-inputtext-lg .p-inputtext {
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #212121 !important;
}
.p-dropdown .p-dropdown-label.p-placeholder {
  color: black !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300 !important;
  line-height: 20px;
  letter-spacing: 0px;
}

</style>
