<template>
  <div class="flex flex-row mt-2">
    <div class="flex">
      <RadioButton
        :disabled="mainGroupDisable"
        id="main_group"
        name="main_group"
        value="main_group"
        v-model="groups.group_type"
      />
      <label class="Radio-Button ml-2 mr-4 color-919191 bold-700 font-size-12 line-height-28" for="rich_text_format"
        >Main Group</label
      >
    </div>
    <div class="flex">
      <RadioButton
        :disabled="subGroupDisable"
        id="sub_group"
        name="sub_group"
        value="sub_group"
        v-model="groups.group_type"
      />
      <label class="Radio-Button ml-2 color-919191 bold-700 font-size-12 line-height-28" for="rich_text_format">Sub-Group</label>
    </div>
  </div>
  <ContactsMainGroup v-if="groupType == 'main_group'" />
  <ContactsSubGroup v-if="groupType == 'sub_group'" />
</template>

<script>
import RadioButton from "primevue/radiobutton";
export default {
  name: "ContactsGroupDialog",
  components: {
    RadioButton,
  },
  data: () => ({
    mainGroupDisable: false,
    subGroupDisable: false,
    groupType: "",
    groups: {
      group_type: null,
    },
  }),
  methods: {
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
          .length != 0
      ) {
        this.groups.group_type =
          this.$store.state.contacts.contactGroupsFormStateData["type"];
        if (this.groups.group_type == "main_group") {
          this.subGroupDisable = false;
        }
        if (this.groups.group_type == "sub_group") {
          this.mainGroupDisable = true;
        }
      } else {
        this.groups.group_type = "main_group";
        this.mainGroupDisable = false;
        this.subGroupDisable = false;
      }
    },
  },
  watch: {
    "groups.group_type": function () {
      this.groupType = this.groups.group_type;
    },
  },
  unmounted() {
    this.$store.state.contacts.mainGroupName = null;
    this.$store.state.fleets.globalImageUploadURL = null;
    this.$store.state.contacts.contactsSelectionModeState = null;
    this.$store.state.contacts.contactGroupsFormStateData = {};
    this.$store.state.contacts.contactsFormTableStateData = [];
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
::v-deep .p-radiobutton .p-radiobutton-box .p-radiobutton-icon{
  background-color: #357DEA !important;
}
::v-deep .p-radiobutton .p-radiobutton-box.p-highlight{
      border-color: #2196F3 !important;
    background: white !important;
}
</style>
