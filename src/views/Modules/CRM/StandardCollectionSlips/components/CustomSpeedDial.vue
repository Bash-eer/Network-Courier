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
      <div class="flex flex-column flex-wrap mb-2">
        <div
          v-for="items of customDialData"
          class="flex my-1 menuDivs"
          :key="items.label"
        >
          <div
            class="flex flex-row cursor-pointer mt-2"
            @click="menuClicked(items.label)"
          >
            <!-- <div > -->
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="
                flex
                align-items-center
                justify-content-center
                hover-blue
                bold-600
                font-size-12
                color-4e5868
              "
            >
              {{ items.label }}
            </div>

            <!-- <div :class="items.label == 'Book' && rowData.booking_id == null?'disable':'enabled'">
              <div class="flex align-items-center justify-content-center mr-2">
                <i :class="items.icon"></i>
              </div>
              <div
                class="
                  flex
                  align-items-center
                  justify-content-center
                  hover-blue
                  bold-600
                  font-size-12
                  color-4e5868
                "
              >
                {{ items.label }}
              </div> -->
            <div
              v-if="items.label == 'Inactivate' || items.label == 'Private'"
              class="ml-3"
            >
              <div>
                <Toggle
                  v-on:childToParent="disableRow"
                  :check="
                    rowData.active == false || rowData.private == true
                      ? true
                      : false
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from "primevue/button";

import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName"],
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState({
      stdcollectiondata: (state) => state.Masscollection.stdCollectionData,
    }),
    ...mapGetters({
      templateEditData: "Masscollection/gettemplateEditData",
      stdCollectionSlipData: "Masscollection/getStdCollectionData",
    }),
  },
  methods: {
    ...mapActions({
      deleteTemplateData: "Masscollection/deleteTemplateData",
      getTemplateTableData: "Masscollection/fetchStdCollectionSlipsTableData",
      disableTemplateTableData: "Masscollection/disableTemplateTableData",
      fetchTableData: "Masscollection/fetchStdCollectionSlipsTableData",
      postSelectedCostCenterStdCollection:
        "CustomerLaunchStore/postSelectedCostCenterStdCollection",
      fetchStdCollectionSlipById: "Masscollection/fetchStdCollectionSlipById",
      postCustomerLaunchBookingHistoryClone:
        "CustomerLaunchStore/postCustomerLaunchBookingHistoryClone",
      expressDataFetch: "customerLaunchBookingHistory/loadExpressTableData",
    }),
    ...mapMutations({
      openScheduleDialog: "Masscollection/setScheduleDialog",
    }),

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    async disableRow() {
      let status;
      let payload;

      if (this.rowData.active == true) {
        payload = {
          id: this.rowData.id,
          status: {
            active: false,
          },
        };
      } else if (this.rowData.active == false) {
        payload = {
          id: this.rowData.id,
          status: {
            active: true,
          },
        };
      }
      await this.disableTemplateTableData({
        payload,
        toastData: {
          toastSuccessData: {
            toastMsg:
              payload.status.active == true
                ? `Template is Activated successfully!`
                : `Template is Inactivated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Template already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg:
              "There was an error in Activate/Disable the Template, try again!",

            toastSeverity: "error",
          },
        },
      }).then((c) => {
        this.fetchTableData();
      });

      this.$refs.op.hide();
    },
    commonToast(severity, summary, message) {
      this.$store.state.CrmSettings.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    async menuClicked(choice) {
      if (this.tableName === "standardCollectionDataTable") {
        if (choice == "Delete") {
          this.$confirm.require({
            message: "Are you sure you want to Delete?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              let data = this.rowData.id;
              this.deleteTemplateData(data).then(async (c) => {
                if (c == 200) {
                  await this.getTemplateTableData();
                  let info = "Template deleted successfully";
                  this.commonToast("success", "Success", info);
                } else {
                  let info = "Failed to delete Template";
                  this.commonToast("error", "Error", info);
                }
              });
            },
          });
        } else if (choice == "Schedule") {
          await this.fetchStdCollectionSlipById(this.rowData?.id);
          this.openScheduleDialog(true);
        } else if (choice == "Edit") {
          this.templateEditData = {};
          this.$store.state.Masscollection.templateEditData = this.rowData;
          this.openDialog(
            "addNewCollection",
            "Masscollection",
            "Edit Template"
          );
        } else if (choice == "Book") {
          //needed
          // this.postSelectedCostCenterStdCollection().then((res) => {
          //   if (res.status == 200) {
          //     this.$router.push({
          //       name: "customerDetailsCrm",
          //       params: {
          //         type: "Contract",
          //       },
          //     });
          //   }
          // });
          if (this.rowData.booking_id != null) {
            await this.postCustomerLaunchBookingHistoryClone(
              this.rowData.booking_id
            );
            let paginationParams = {
              offset: 1,
              limit: 10,
              orderBy: ["createdAt", "ASC"],
            };
            await this.expressDataFetch(paginationParams);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "There is no Booking Id for this.",
              life: 3000,
            });
          }
        }
      }
    },
    openDialog(name, type, header) {
      this.$store.dispatch("Masscollection/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["Masscollection/controlActivityDialog"];
      // }
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
.disable {
  pointer-events: none;
}
.enabled {
  pointer-events: all;
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
