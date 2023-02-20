<template>
  <div class="mr-top mt-6">
    <div class="trip-head">
      <h6>Billing Settings</h6>
    </div>
    <Panel :toggleable="true" :collapsed="collapsed">
      <template #icons>
        <div @click="toggle" class="icon-wrapper">
          <span v-if="collapsed" class="icon pi pi-angle-down"></span>
          <span v-else class="icon pi pi-angle-up"></span>
        </div>
      </template>
      <template #header>
        <div @click="toggle" class="sub-title full-width pointer">Billing Settings</div>
      </template>
      <div class="billing-sub-head mt-2">
        <h6>Effective Date</h6>
      </div>
      <div class="flex mt-2 mb-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="checks-text"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Rebate',
                        tag: 'Rebate',
                        key: 'Rebate',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Rebate',
                  tag: 'Rebate',
                  key: 'Rebate',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            
          </div>
        </div>
      </div>
      <div class="formgird grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Effective Start Date </h5>
          <div clas="flex">
            <div class="whiteDiv calendarDiv">
              <Calendar
                :showTime="true"
                :showSeconds="true"
                dateFormat="d MM yy"
                class="fleetsCalendar"
                v-model="details.to_date_time"
                :showIcon="true"
                style="width: 100%"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1950:2050"
                :class="{
                  'p-invalid': v$.details.to_date_time.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "primevue/panel"
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { Panel },
  data() {
    return {
      collapsed: true,
      details: {
        acknowledgement: false,
        to_date_time:"",
        
      },
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      details: {
        to_date_time:{ required}
      },
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .p-panel-header {
  background: #EDF1F7 !important;
  border: none !important;
  border: 1px solid #02003826 !important;
  border-radius: 5px !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
  padding: 0.5rem !important;
}
.table-color{
  background:#E1EAF9;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
::v-deep .p-panel .p-panel-content {
  border: none !important;
}

::v-deep .p-panel .p-panel-header .p-panel-header-icon {
  display: none !important;
}
.padding-y {
  padding: 0.5rem 0 !important;
}
.billing-sub-head{
  font-size: 12px;
}
::v-deep .p-column-header-content{
    color:#7E84A7;
    font-weight: 600;
    font-size: 12px;
}
 .checks-text{
    color: #343434 !important;
    font-weight: 600;
    font-style: normal;
    font-size: 12px;
}
.dialog-label-text{
  color: #343434 !important;
}
.icon-wrapper {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(2, 0, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
