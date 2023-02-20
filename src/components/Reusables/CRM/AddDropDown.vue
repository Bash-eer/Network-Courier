<template>
  <Dropdown
    @change="$emit('update:modelValue', $event.value)"
    :value="modelValue"
    v-model="selectedContact"
    :options="data"
    optionLabel="name"
    optionValue="code"
    optionGroupLabel="name"
    optionGroupChildren="items"
    :filter="true"
    :showClear="false"
    :class="classes"
    class="flex text-left inputfield w-full p-inputtext-lg"
    ref="op"
    @hide="close"
    @click.self="isOpen = true"
    placeholder="Select Job Type"
  >
    <!--DROPDOWN OPTION HEADER TEMPLATE-->
    <template #optiongroup>
      <!--ADD NEW DROPDOWN ITEM TEMPLATE-->
      <div
        v-if="display == false"
        class="flex flex-row align-items-center addNewFieldsDiv"
        @click="addNew"
      >
        <div class="flex fieldNames">
          <span class="addNewFieldtText ml-0">+ Add New</span>
        </div>
      </div>
      <!--ADD NEW DROPDOWN (TEXT BOX AND BUTTON) ITEM TEMPLATE-->
      <div v-if="display == true">
        <div class="flex justify-content-between ml-2">
          <div class="flex"></div>
        </div>
        <div class="row">
          <div class="col-9 md:col-9">
            <TextField
              label="newField"
              type="text"
              v-model="details.newField"
              :classes="{
                'inputfield w-full  dialog-field-text': true,
              }"
            />
          </div>
          <div class="col-2 md:col-2">
            <Buttons
              v-if="type == 'jobType'"
              label="Add"
              button_class="p-button-sm addFieldButton"
              @click="addNewJobTypeClick"
            />
          </div>
        </div>
      </div>
    </template>
    <!--DROPDOWN OPTION VALUES TEMPLATE-->
    <template #option="slotProps">
      <div @click="selected(slotProps.option)">
        <div class="flex fieldNames">
          {{ slotProps.option.name }}
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddDropDown",
  components: {
    Dropdown,
  },
  props: [
    "data",
    "placeholder",
    "storePath",
    "state",
    "stateName",
    "classes",
    "modelValue",
    "companyDetails",
    "tableName",
    "type",
    "companyNameDetails",
  ],
  data() {
    return {
      selectedContact: [],
      display: false,
      events: null,
      contactData: "",
      details: {
        newField: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getJobTypeList: "CrmSettings/getJobTypeList",
    }),
  },
  methods: {
    ...mapActions({
      createNewJobType: "CrmSettings/createNewJobType",
      getJobTypeDropDownList: "CrmSettings/getJobTypeDropDownList",
    }),
    close() {
      this.display = false;
    },
    closeAddNew() {
      this.display = false;
      this.stopPropagation();
    },
    selected(data) {
      this.$emit("name", data);
    },

    addNew(event) {
      this.display = true;
      this.events = event;
      this.stopPropagation();
    },

    async addNewJobTypeClick() {
      if (this.details.newField != "") {
        let data = { job_type: this.details.newField };
        this.createNewJobType(data).then(async (c) => {
          if (c.data.status == 200) {
            await this.getJobTypeDropDownList();
          }
        });
        this.display = false;
      } else {
        this.display = false;
      }
      this.stopPropagation();
    },
    stopPropagation() {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    },
  },
  watch: {
    display: function () {
      if (this.display == true) {
        this.$refs.op.show();
      }
    },
    "modelValue.job_type": function () {
      if (this.modelValue?.job_type) {
        this.selectedContact = this.modelValue.job_type;
      }
    },
  },
  created() {
    if (this.state != "" && this.state != null) {
      let arr = this.data[0]?.items;
      for (let s in arr) {
        if (arr[s]["name"] == this.state?.name) {
          this.selectedContact = arr[s]["code"];
        }
      }
    }
  },
};
</script>

<style scoped>
.fieldNames {
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  color: #1d1d1d;
}
.addNewFieldsDiv {
  cursor: pointer;
}
.addNewFieldtText {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #357dea;
}
.addFieldButton {
  background: #357dea;
  color: #ffffff;
  border: none;
  font-weight: bold;
}
.dropDownPic {
  width: 34.14px;
  height: 34.14px;
  margin-right: 0.5rem;
}
</style>
