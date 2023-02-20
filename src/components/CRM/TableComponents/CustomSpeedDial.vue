<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="'p-button-rounded mx-2  updateButton'"
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer"
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                custom-speed-dial-text
              "
            >
              {{ items.label }}
            </div>
            <!-- <div
              v-if="items.label == 'Disable' || items.label == 'Private'"
              class="ml-3"
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="
                    rowData.status == 'Inactive' || rowData.private == true
                      ? true
                      : false
                  "
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>
<script>
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";
import { crmClState, crm_Client } from "../../../store/modules/CRM/helper";
import { genaralAct } from "../../../store/helper";
export default {
  name: "CustomSpeedDial",
  props: [
    "customDialData",
    "rowData",
    "dataName",
    "storePath",
    "tableName",
    "selectedRows",
  ],
  data() {
    return {};
  },
  computed: {
    ...crmClState,
  },
  methods: {
    ...crm_Client,
    ...genaralAct,
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {},
    async menuClicked(choice) {
      if (this.tableName == "ContactTable") {
        if (choice == "Edit") {
          this.setReset({ contact_data: this.rowData });
          this.genaralOpenD({
            dialogDetails: {
              dialogName: "CRMClientContact",
              dialogHeader: "Add Contact",
            },
          });
        } else if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete the Contact?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              this.actionContacts({
                payload: { data: this.rowData, id: this.rowData.id },
                toast: this.$toast,
                method: "Delete",
              });
            },
          });
        }
      } else {
        if (choice == "Edit") {
          let ids = [];
          this.selectedRows &&
            this.selectedRows.map((i) => {
              ids.push(parseInt(i.id));
            });

          this.setReset({
            customer_data: this.rowData,
            edit_data_mutiple: ids,
          });
          this.genaralOpenD({
            dialogDetails: {
              dialogName: "CRMClientDialog",
              dialogHeader: "Edit Client Details",
            },
          });
        } else if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete the Customer?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
              await this.deleteCustomer({
                id: this.rowData.id,
                toast: this.$toast,
              });
              if (this.action_type == "By All") {
                await this.getAllClient({
                  pageNo: 1,
                  PageSize: 10,
                  toast: this.$toast,
                });
              } else {
                await this.getCustomerClient({
                  pageNo: 1,
                  PageSize: 10,
                  toast: this.$toast,
                });
              }
            },
          });
        } else if (choice == "Add Contact") {
          this.setReset({
            contact_company_id: this.rowData.id,
            contact_data: null,
          });
          this.genaralOpenD({
            dialogDetails: {
              dialogName: "CRMClientContact",
              dialogHeader: "Add Contact",
            },
          });
        }
      }
    },
  },
  components: {
    Button,
    OverlayPanel,
  },
};
</script>
<style scoped>
.hover-blue:hover {
  color: #357dea;
}
.custom-speed-dial-text {
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}
::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
