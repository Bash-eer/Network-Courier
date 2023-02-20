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
    :placeholder="placeholder"
    @click.self="isOpen = true"
  >
    <!--DROPDOWN OPTION HEADER TEMPLATE-->
    <template #optiongroup>
      <!--ADD NEW DROPDOWN ITEM TEMPLATE-->
      <div
        v-if="display == false"
        class="flex flex-row align-items-center addNewRecipientsDiv"
        @click="addNew"
      >
        <div class="flex">
          <img :src="'/images/addNew.png'" class="dropDownPic" />
        </div>
        <div class="flex recipientNames">
          <span class="addNewRecipientText">Add New</span>
        </div>
      </div>
      <!--ADD NEW DROPDOWN (TEXT BOX AND BUTTON) ITEM TEMPLATE-->
      <div v-if="display == true">
        <div class="flex justify-content-between ml-2">
          <div class="flex"></div>
          <div class="flex delete" @click="closeAddNew">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="row">
          <div class="col-9 md:col-9">
            <TextField
              label="newRecipient"
              type="text"
              v-model="details.newRecipient"
              :classes="{
                'inputfield w-full  dialog-field-text': true,
              }"
            />
          </div>
          <div class="col-3 md:col-3">
            <Buttons
              label="Add"
              button_class="p-button-sm addRecipientButton"
              v-on:childToParent="addNewRecipient"
            />
          </div>
        </div>
      </div>
    </template>
    <!--DROPDOWN OPTION VALUES TEMPLATE-->
    <template #option="slotProps"
      ><div class="flex flex-row align-items-center">
        <div class="flex">
          <img :src="slotProps.option.picture" class="dropDownPic" />
        </div>
        <div class="flex recipientNames">{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  name: "AddNewDropDown",
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
  ],
  data() {
    return {
      selectedContact: null,
      display: false,
      events: null,
      details: {
        newRecipient: "",
      },
    };
  },
  methods: {
    close() {
      this.display = false;
    },
    closeAddNew() {
      this.display = false;
      this.stopPropagation();
    },
    addNew(event) {
      this.display = true;
      this.events = event;
      this.stopPropagation();
    },
    addNewRecipient() {
      if (this.display == true && this.details.newRecipient != "") {
        let count = 0;
        for (let c in this.$store.state[this.storePath][this.stateName][0]
          .items) {
          count =
            this.$store.state[this.storePath][this.stateName][0].items[c][
              "code"
            ];
        }
        this.$store.state[this.storePath][this.stateName][0].items.push({
          name: this.details.newRecipient,
          code: count + 1,
          picture: "/images/defaultProfile.jpg",
        });
        this.display = false;
      }
      this.details.newRecipient = "";
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
  },
  created() {
    if (this.state != "") {
      let arr = this.data[0].items;
      for (let s in arr) {
        if (arr[s]["name"] == this.state) {
          this.selectedContact = arr[s]["code"];
        }
      }
    }
  },
};
</script>

<style scoped>
.recipientNames {
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  color: #1d1d1d;
}
.addNewRecipientsDiv {
  cursor: pointer;
}
.addNewRecipientText {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #357dea;
}
.addRecipientButton {
  background: #fed330;
  color: #2c3a47;
  border: none;
  font-weight: bold;
}
.dropDownPic {
  width: 34.14px;
  height: 34.14px;
  margin-right: 0.5rem;
}
</style>
