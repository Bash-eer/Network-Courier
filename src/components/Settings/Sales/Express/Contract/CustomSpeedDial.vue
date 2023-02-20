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
            <div
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
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
import Button from 'primevue/button';
import { mapState, mapActions } from 'vuex';
import OverlayPanel from 'primevue/overlaypanel';

export default {
  name: 'CustomSpeedDial',
  props: [
    'customDialData',
    'rowData',
    'transport',
    'dataName',
    'tabName',
    'type',
    'storePath',
    'formTableDataName',
    'tableName',
    'upperLevelData',
  ],
  data() {
    return {
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-plus',
          command: () => this.$emit('editMethod'),
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => this.$emit('deleteMethod'),
        },
      ],
    };
  },
  methods: {
    ...mapActions('express', ['getRegionRatesById']),
    ...mapActions('express', [
      'deleteAddlSurcharge',
      'deleteNormalBikeRates',
      'deleteMultiTierVanJob',
      'deleteMultiTierQuantity',
      'deleteNormalVanRates',
      'deleteNormalBikeTrips',
      'deleteNormalVanTrips',
      'deleteEcomBikeRates',
      'deleteEcomDelivery',
      'deleteEcomVanQuantity',
      'deleteEcomVanRates',
      'deleteEcomVanDelivery',
    ]),

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {
      let status;
      let statusMsg;
      if (this.rowData.status == 'Active') {
        status = {
          status: 'Inactive',
        };
        statusMsg = 'disabled';
      } else if (this.rowData.status == 'Inactive') {
        status = {
          status: 'Active',
        };
        statusMsg = 'enabled';
      }
      if (this.dataName == 'AddRegionData') {
        this.$store.dispatch('expressContract/POSTPATCHCRUDOPERATION', {
          path:
            'settings/salesSettings/rates/express/contract/regions/modifyStatus/' +
            this.rowData.id,
          data: status,
          method: 'PATCH',
          loadData: {
            loadApi: 'loadRegionsData',
            loadPath: 'settings/salesSettings/rates/express/contract/region',
            loadMutation: 'fetchRegionsData',
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The region ${this.rowData['region']} is ${statusMsg}`,
              toastSeverity: 'info',
            },
            toastCommonErrorData: {
              toastMsg:
                'There was an error in disabling/enabling a region, try again!',
              toastSeverity: 'error',
            },
          },
        });

        this.$refs.op.hide();
      } else if (this.dataName == 'ContractTableData') {
        this.$store.dispatch('expressContract/POSTPATCHCRUDOPERATION', {
          path:
            'settings/salesSettings/rates/express/contract/regions/modifyStatus/' +
            this.rowData.id,
          data: status,
          method: 'PATCH',
          loadData: {
            loadApi: 'loadContractTableData',
            loadPath:
              '/settings/salesSettings/rates/express/contract/regionRateCards',
            loadMutation: 'fetchContractTableData',
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The region ${this.rowData['region']} is ${statusMsg}`,
              toastSeverity: 'info',
            },
            toastCommonErrorData: {
              toastMsg:
                'There was an error in disabling/enabling a region, try again!',
              toastSeverity: 'error',
            },
          },
        });
        this.$refs.op.hide();
      } else if (this.dataName == 'expressContractRateCards') {

        this.$store.dispatch('expressContract/POSTPATCHCRUDOPERATION', {
          path:
            'settings/salesSettings/rates/express/contract/rateCards/modifyPrivate/' +
            this.rowData.id,
          data: {
            private: !this.rowData.private,
          },
          method: 'PATCH',
          loadData: {
            loadApi: 'loadContractTableData',
            loadPath:
              '/settings/salesSettings/rates/express/contract/regionRateCards',
            loadMutation: 'fetchContractTableData',
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The rate card ${this.rowData['rate_card_name']} is edited`,
              toastSeverity: 'info',
            },
            toastCommonErrorData: {
              toastMsg:
                'There was an error in updating the rate card, try again!',
              toastSeverity: 'error',
            },
          },
        });
      }
    },

    menuClicked(choice) {
      if (choice == 'Delete') {
        this.$confirm.require({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: () => {
           
        if (
          this.type == 'normal' &&
          this.transport == 'Bike' &&
          this.dataName == 'Rates'
        ) {
          let formData = this.upperLevelData;
          this.deleteNormalBikeRates(formData).then(() => {
            this.$store.state.express.norBikeTripDel++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Bike Rates Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'e_commerce' &&
          this.transport == 'Bike' &&
          this.dataName == 'Rates'
        ) {
          let formData = this.upperLevelData;
          this.deleteEcomBikeRates(formData).then(() => {
            this.$store.state.express.new++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Bike Rates Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'e_commerce' &&
          this.transport == 'Bike' &&
          this.dataName != 'Rates'
        ) {
          let formData = this.upperLevelData;
          this.deleteEcomDelivery(formData).then(() => {
            this.$store.state.express.new3++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Bike Rates Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'e_commerce' &&
          this.transport == 'Van' &&
          this.dataName != 'Rates' &&
          this.dataName != 'BoxCountCharges'
        ) {
          let formData = this.upperLevelData;
          this.deleteEcomVanDelivery(formData).then(() => {
            this.$store.state.express.new3++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Charges Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'e_commerce' &&
          this.transport == 'Van' &&
          this.dataName == 'Rates'
        ) {
          let formData = this.upperLevelData;
          this.deleteEcomVanRates(formData).then(() => {
            this.$store.state.express.new3++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Van Rates Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'e_commerce' &&
          this.transport == 'Van' &&
          this.dataName == 'BoxCountCharges'
        ) {
          let formData = this.upperLevelData;
          this.deleteEcomVanQuantity(formData).then(() => {
            this.$store.state.express.new3++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Charges Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'normal' &&
          this.transport == 'Van' &&
          this.dataName == 'Rates'
        ) {
          let formData = this.upperLevelData;
          this.deleteNormalVanRates(formData).then(() => {
            this.$store.state.express.norVanTabDel++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Van Rates Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'normal' &&
          this.transport == 'Van' &&
          this.dataName == 'Trips'
        ) {
          let formData = this.upperLevelData;
          this.deleteNormalVanTrips(formData).then(() => {
            this.$store.state.express.norVanTabDel++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Trips Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'normal' &&
          this.transport == 'Bike' &&
          this.dataName == 'Trips'
        ) {
          let formData = this.upperLevelData;
          this.deleteNormalBikeTrips(formData).then(() => {
            this.$store.state.express.norBikeTripDel++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Trips Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'normal' &&
          this.tableName == 'VanMultiTierRatesChargeByQuantity'
        ) {
          let data = this.upperLevelData;
          
          this.deleteMultiTierQuantity(data).then(() => {
            this.$store.state.express.norMultiQuantityTabData++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: ' Charges Deleted Successfully.', life: 3000, });
          });
        }
        if (
          this.type == 'normal' &&
          this.tableName == 'VanMultiTierRatesChargeByJobCount'
        ) {
          let data = this.upperLevelData;
          this.deleteMultiTierVanJob(data).then(() => {
            this.$store.state.express.norMultiJobTabData++;
            this.$toast.add({severity: 'info', summary: 'Delete Confirmed', detail: 'Charges Deleted Successfully.', life: 3000, });
          });
        }
        if (this.dataName == 'AdditionalSurchargesTableData') {
          let formData = this.upperLevelData;
          this.deleteAddlSurcharge(formData).then(() => {
            this.$store.state.express.deleteAddlSurCgs = true;
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Additional Surcharge Deleted successfully',
              life: 3000,
            });
          });

          this.$refs.op.hide();
        }
        if (this.dataName == 'AddRegionData') {
          this.$store.dispatch('expressContract/DELETECRUDOPERATION', {
            path:
              'settings/salesSettings/rates/express/contract/region/' +
              this.rowData.id,
            method: 'DELETE',

            toastData: {
              toastSuccessData: {
                toastMsg: `The region ${this.rowData.region} is deleted`,
                toastSeverity: 'info',
              },
              toastErrorData: {
                toastMsg: 'There was an error in deleting a region, try again!',
                toastSeverity: 'error',
              },
            },
            loadData: {
              loadApi: 'loadRegionsData',
              loadPath: 'settings/salesSettings/rates/express/contract/region',
              loadMutation: 'fetchRegionsData',
            },
          });
        } else if (this.dataName == 'expressContractRateCards') {
          this.$store.dispatch('expressContract/DELETECRUDOPERATION', {
            path:
              'settings/salesSettings/rates/express/contract/rateCard/' +
              this.rowData.id,
            method: 'DELETE',

            toastData: {
              toastSuccessData: {
                toastMsg: `The data ${this.rowData.rate_card_name} is deleted`,
                toastSeverity: 'info',
              },
              toastErrorData: {
                toastMsg: 'There was an error in deleting the data, try again!',
                toastSeverity: 'error',
              },
            },
            loadData: {
              loadApi: 'loadContractTableData',
              loadPath:
                '/settings/salesSettings/rates/express/contract/regionRateCards',
              loadMutation: 'fetchContractTableData',
            },
          });
        }
      },
            reject: () => {
              this.$toast.add({severity: 'error', summary: 'Rejected', detail: 'Deletion rejected', life: 3000, });
            },
          });
      } else if (choice == 'Edit') {
        if (this.dataName == 'expressContractRateCards') {
          this.$router.push({
            name: 'RegionRates',
            params: { id: this.rowData.id },
          });
        }
        //for vehicle details edit operation
        if (this.dataName == 'AddRegionData') {
          this.$store.state.expressContract.addRegionFormStateData = this.rowData;
          this.$store.state.expressContract.addRegionValue = this.rowData.region;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'AddNewRegion',
              dialogHeader: 'Edit Region',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
        if (this.dataName == 'AdditionalSurchargesTableData') {
          console.log('edit');
          //   "AddRegionDialogs";
          this.$store.state.express.additionalSurchargesData =
            this.upperLevelData;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'AdditionalSurchargesEdit',
              dialogHeader: 'Additional Surcharges Edit',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
        if (this.dataName == 'Trips') {
          console.log('edit');
          //   "AddRegionDialogs";
          this.$store.state.express.bikeTripsDatas = this.upperLevelData;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'BikeTripsEdit',
              dialogHeader: 'Bike Trips Edit',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
        if (this.dataName == 'Rates') {
          console.log('edit');
          //   "AddRegionDialogs";
          this.$store.state.express.bikeRatesData = this.upperLevelData;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'BikeRatesEdit',
              dialogHeader: 'Bike Rates Edit',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
        if (this.dataName == 'Bike Customer Van Job') {
          console.log('edit');
          //   "AddRegionDialogs";
          this.$store.state.express.bikeCusVanJobData = this.upperLevelData;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'BikeCustomerVanjobEdit',
              dialogHeader: 'Bike Customer Van Job Edit',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];

        }
        if (this.dataName == 'SurchargesTableData') {
          console.log('edit');
          //   "AddRegionDialogs";
          this.$store.state.express.surchargesData = this.upperLevelData;
          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'SurchargesEdit',
              dialogHeader: 'Surcharges Edit',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
      }
      if (choice == 'Set as default' || choice == 'Remove default') {
        console.log(choice);
        if (this.dataName == 'expressContractRateCards') {
          this.$store.dispatch('expressContract/POSTPATCHCRUDOPERATION', {
            path:
              'settings/salesSettings/rates/express/contract/rateCards/modifyDefault/' +
              this.rowData.id,
            method: 'PATCH',
            data: {
              default: !this.rowData.default,
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The rate card ${this.rowData.rate_card_name} is updated`,
                toastSeverity: 'info',
              },
              toastCommonErrorData: {
                toastMsg:
                  'There was an error in updating the rate card, try again!',
                toastSeverity: 'error',
              },
            },
            loadData: {
              loadApi: 'loadContractTableData',
              loadPath:
                '/settings/salesSettings/rates/express/contract/regionRateCards',
              loadMutation: 'fetchContractTableData',
            },
          });
        }
      }
      if (choice == 'Clone') {
        if (this.dataName == 'expressContractRateCards') {
          this.$store.dispatch('expressContract/setCloneRateCardRegion', {
            data: {
              region: this.upperLevelData.region,
              rate_card_name: this.rowData.rate_card_name,
              rate_card_id: this.rowData.id,
            },
          });

          this.$store.dispatch('expressContract/openDialog', {
            dialogDetails: {
              dialogName: 'CloneRateCardDialog',
              dialogHeader: 'Clone Rate Card',
            },
          });
          this.$store.getters['expressContract/controlActivityDialog'];
        }
      }

      this.$refs.op.hide();
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
  /* line-height: 15px; */
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
