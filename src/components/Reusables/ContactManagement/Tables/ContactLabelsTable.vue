<template>
  <DataTable
    :class="tableClass"
    class="p-datatable-sm editable-cells-table contactsTable"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    :dataKey="'id'"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="
        col.header == 'Select Contacts'
          ? 'width:90%'
          : 'max-width:10%;min-width:10%'
      "
    >
      <template #header v-if="col.header != 'Invitees'">
        <CheckBox
          path="contacts"
          class="checksText"
          :key="details['All' + ' ' + col.header]"
          v-bind:checker="
            details['All' + ' ' + col.header] == true
              ? [
                  {
                    name: col.header,
                    tag: col.header,
                    key: col.header,
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: col.header,
              tag: col.header,
              key: col.header,
            },
          ]"
          v-on:childToParent="masterCheckBoxChange"
        />
      </template>
      <template #body="slotProps">
        <!-- TEMPLATE : INVITEES -->
        <span v-if="col.header == 'Invitees'" class="mr-2">
          <div class="flex flex-row">
            <div class="flex mr-2">
              <img
                :src="slotProps.data['image_url']"
                alt="logo"
                width="40"
                height="40"
              />
            </div>
            <div class="flex">
              <div class="flex flex-column justify-content-center">
                <div class="flex inviteeName">{{ slotProps.data["name"] }}</div>
                <div class="flex tableNo">
                  Table No: {{ slotProps.data["table_no"] }}
                </div>
              </div>
            </div>
          </div>
        </span>

        <!-- TEMPLATE : ADDRESS -->
        <span v-if="col.header != 'Invitees'">
          <div class="flex flex-row align-items-center">
            <div class="flex mr-1">
              <CheckBox
                path="contacts"
                class="checksText"
                :key="details[col.header + '_' + slotProps.data['sno']]"
                v-bind:checker="
                  details[col.header + '_' + slotProps.data['sno']] == true
                    ? [
                        {
                          name: col.header + '_' + slotProps.data['sno'],
                          tag: col.header + '_' + slotProps.data['sno'],
                          key: col.header + '_' + slotProps.data['sno'],
                        },
                      ]
                    : []
                "
                v-bind:categories="[
                  {
                    name: col.header + '_' + slotProps.data['sno'],
                    tag: col.header + '_' + slotProps.data['sno'],
                    key: col.header + '_' + slotProps.data['sno'],
                  },
                ]"
                v-on:childToParent="childCheckBoxChange"
              />
            </div>
            <div class="flex">
              {{ slotProps.data[col.field] }}
            </div>
          </div>
        </span>
      </template>
    </Column>
    <template #footer>
      <div
        class="
          flex
          justify-content-between
          w-full
          align-content-center
          py-3
          flex-wrap
        "
      >
        <div class="align-self-center flex"></div>
        <div class="flex align-self-center justify-content-end">
          <Buttons
            label="Cancel"
            v-on:childToParent="closeDialog"
            class="p-button-outlined mr-1 dialog-button-text"
          />
          <Buttons
            label="Generate"
            button_class="dialog-button-text"
            v-on:childToParent="submitData"
          />
        </div>
      </div>
    </template>
  </DataTable>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../config/const");
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  name: "ContactLabelsTable",
  components: {
    DataTable,
    Column,
  },
  props: [
    "type",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "selectionModeState",
    "formTableDataName",
  ],
  data() {
    return {
      selectedResidenceAddresses: [],
      selectedOfficeAddress: [],
      inviteesIds: [],
      details: {
        "All Residential Address": false,
        "All Office Address": false,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      let printLabelDetails = {};
      this.inviteesIds = [];
      let residenceAddressIds = [];
      let officeAddressIds = [];
      residenceAddressIds = this.getAddressIds(
        this.selectedResidenceAddresses,
        "residential_address_id"
      );
      officeAddressIds = this.getAddressIds(
        this.selectedOfficeAddress,
        "office_address_id"
      );
      printLabelDetails["id"] = this.inviteesIds;
      printLabelDetails["residence_address_id"] = residenceAddressIds;
      printLabelDetails["office_address_id"] = officeAddressIds;
      //download label
      axios({
        url: "contactManagement/event/invitees/lable/exportAsPdf",
        method: "POST",
        data: printLabelDetails,
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "Address List" + ".pdf");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    getAddressIds(addressData, addressKey) {
      let addressIds = [];
      for (let a in addressData) {
        for (let t in this.tableData) {
          if (addressData[a] == this.tableData[t]["sno"]) {
            addressIds.push(this.tableData[t][addressKey]);
            if (
              this.inviteesIds.indexOf(
                parseInt(this.tableData[t]["memberId"])
              ) === -1
            ) {
              this.inviteesIds.push(parseInt(this.tableData[t]["memberId"]));
            }
          }
        }
      }
      return addressIds;
    },
    masterCheckBoxChange(val, src) {
      this.details["All" + " " + src[0]["name"]] =
        val.length != 0 ? true : false;
      let bool;
      bool = val.length != 0 ? true : false;
      for (let d in this.details) {
        if (d != "All Residential Address" && d != "All Office Address") {
          if (d.split("_")[0] == src[0]["name"]) {
            this.details[d] = bool;
          }
        }
      }
      if (bool == true) {
        this.storeAllData(src[0]["name"]);
      }
      if (bool == false) {
        this.resetData(src[0]["name"]);
      }
    },
    resetData(type) {
      let source;
      source =
        type == "Residential Address"
          ? "selectedResidenceAddresses"
          : "selectedOfficeAddress";
      this[source] = [];
    },
    storeAllData(type) {
      let source;
      source =
        type == "Residential Address"
          ? "selectedResidenceAddresses"
          : "selectedOfficeAddress";
      for (let t in this.tableData) {
        if (this[source].indexOf(this.tableData[t]["sno"]) === -1) {
          this[source].push(this.tableData[t]["sno"]);
        }
      }
    },
    childCheckBoxChange(val, src) {
      this.details[src[0]["name"]] = val.length != 0 ? true : false;
      if (this.details["All" + " " + src[0]["name"].split("_")[0]] == true) {
        this.details["All" + " " + src[0]["name"].split("_")[0]] =
          val.length != 0 ? true : false;
      }
      let namesSplit = src[0]["name"].split("_");
      this.storeData(namesSplit[0], namesSplit[1], val);
    },
    storeData(type, value, checked) {
      let source;
      source =
        type == "Residential Address"
          ? "selectedResidenceAddresses"
          : "selectedOfficeAddress";

      if (checked.length != 0) {
        if (this[source].indexOf(parseInt(value)) === -1) {
          this[source].push(parseInt(value));
        }
      }
      if (checked.length == 0) {
        if (this[source].length != 0) {
          for (let s in this[source]) {
            if (this[source][s] == parseInt(value)) {
              this[source].splice(s, 1);
            }
          }
        }
      }
      this.details["All" + " " + type] =
        this[source].length == this.tableData.length ? true : false;
    },
  },
  created() {
    for (let t in this.tableData) {
      this.details[
        "Residential Address" + "_" + this.tableData[t]["sno"]
      ] = false;
      this.details["Office Address" + "_" + this.tableData[t]["sno"]] = false;
    }
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style>
.printLablesTableClass .p-datatable-footer {
  padding: 0 !important;
  background: #ffffff !important;
  border: none !important;
}
</style>
