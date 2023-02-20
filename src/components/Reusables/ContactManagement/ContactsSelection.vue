<template>
  <div class="mt-4">
    <div class="formgrid grid pl-1 selectedContactsDiv">
      <div class="field col-12 md:col-12 selectedContactsDiv">
        Selected Contacts:
        {{ $store.state.contacts.contactsFormTableData.length }}
      </div>
      <div class="flex flex-row ml-2 mb-4">
        <div
          class="flex mr-3"
          v-for="(item, index) of $store.state.contacts.contactsFormTableData"
          :key="index"
        >
          <RemovableImageChips
            :url="
              item['contact']['contactPicture'] != null
                ? item['contact']['contactPicture']
                : './images/defaultProfile.jpg'
            "
            :index="index"
            v-on:childToParent="removeContactChips"
            mainChipClass="contactsImagesChipsDiv"
            chipImageClass="contactsChipImages"
            chipImageRemoveClass="contactsChipImageRemove"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-content-between">
      <div class="flex ml-2">
        <DuoSelect
          :options="['Network Courier', 'Personal Contacts']"
          default="Network Courier"
          v-on:childToParent="contactsWatch"
        />
      </div>
      <!-- <div class="flex"> -->
    <div
    class="
      searchicon
      flex flex-row
      justify-content-end
      align-items-center
    "
  >
    <i class="fa fa-search ml-1"></i>
        <TextField
          v-model="searcher"
          label="contactsSearch"
          placeholder="Search Contacts"
          type="text"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          v-on:childToParent="globalSearcher"
          style="color: #B9B9B9;"
        />
      </div>
    </div>
    <div class="formgrid grid mt-4">
      <div
        class="field col-12 md:col-12"
        v-for="(item, index) of $store.state.contacts.contactsTableTabData"
        :key="index"
      >
        <!-- preserves the table selection state -->
        <keep-alive>
          <ContactTables
            v-if="item.type == contactsType"
            :type="contactsType"
            :tableClass="'contactsTableClass'"
            :tableDataName="'contactsTableData'"
            :tableName="'contactsTable'"
            :storePath="'contacts'"
            :formTableDataName="'contactsFormTableData'"
            :selectionModeState="
              $store.state.contacts.contactsSelectionModeState
            "
            :tableData="$store.state['contacts'][item.data]"
            :tableColumns="$store.state['contacts']['contactsTableColumnData']"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsSelection",
  data() {
    return {
      searcher: "",
      contactsData: null,
      contactsType: null,
    };
  },
  methods: {
    contactsWatch(type) {
      this.searcher = "";
      this.setContactsSelectionState(type);
      this.contactsType = type;
    },
    setContactsSelectionState(type) {
      let filteredArray = [];
      if (this.$store.state.contacts.contactsFormTableData.length != 0) {
        for (let c in this.$store.state.contacts.contactsFormTableData) {
          let c_obj = this.$store.state.contacts.contactsFormTableData[c];
          if (c_obj["contactType"] == type) {
            filteredArray.push(c_obj);
          }
        }
        this.$store.state.contacts.contactsSelectionModeState = filteredArray;
      }
    },
    removeContactChips(contactChipsData) {
      this.$store.state.contacts.contactsSelectionModeState = null;
      this.$store.state["contacts"].globalSearch = "";
      this.searcher = "";
      let filteredArray = [];
      for (let i in this.$store.state.contacts.contactsFormTableData) {
        if (i != contactChipsData[0]) {
          filteredArray.push(
            this.$store.state.contacts.contactsFormTableData[i]
          );
        } else {
          if (this.$store.state.contacts.contactsFormTableData[i].id) {
            this.$store.state.contacts.deletedContactIds.push(
              this.$store.state.contacts.contactsFormTableData[i]
            );
          }
        }
      }
      this.$store.state.contacts.contactsSelectionModeState = filteredArray;
      this.$store.state.contacts.contactsFormTableData = filteredArray;
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },

    loadState() {
      if (this.$store.state.contacts.contactsFormTableStateData.length != 0) {
        this.$store.state.contacts.contactsFormTableData = [];
        this.$store.state.contacts.contactsFormTableData =
          this.$store.state.contacts.contactsFormTableStateData;
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
::v-deep .selectedContactsDiv{
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #7a7a7a !important;
}
::v-deep .contactsFormTableData {
  font-weight: bold !important;
  font-size: 14px !important;
  font-family: Montserrat !important;
  color: #7a7a7a !important;
}
::v-deep .border {
  border: none !important;
}
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}
::v-deep .p-inputtext {
  border: none !important;
}
::v-deep .p-inputtext:enabled:hover {
  border: none !important;
}
::v-deep .p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  border-color: none !important;
}
::v-deep .p-selectbutton .p-button{
  color: #7E84A7 !important;
  font-family: Montserrat !important;
  font-size:14px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-thead > tr > th{
  font-size: 14px;
  font-weight: 700;
  line-height: 28px;
  color: #7a7a7a !important;
}
::v-deep .p-selectbutton .p-button.p-highlight{
  background-color: #357dea;
  color:#ffffff !important;
}
::v-deep .p-paginator-current{
  font-size: 13px !important;
  margin: 0;
  /* margin-right: 10px; */
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page{
  font-size: 14px !important;
}
::v-deep .p-paginator-next, .p-paginator-last, .p-paginator-first, .p-paginator-prev, .p-paginator-current{
  height: 14px !important;
}
::v-deep .p-dropdown .p-dropdown-trigger{
  align-self: center !important;
}
::v-deep .p-paginator .p-dropdown{
  height: 30px !important;
  /* margin-left: 10px; */
}
::v-deep .p-paginator .p-dropdown .p-dropdown-label{
  align-self: center !important;
}
::v-deep p-column-title{
  color:#7a7a7a !important
}
::v-deep .dialog-button-text{
  border-radius: 6px !important;
}
</style>
