<template>
  <div class="flex flex-row">
    <div v-for="(item, index) of data" class="flex mr-4" :key="index">
      <div class="flex flex-row">
        <div class="flex mr-2">
          <img
            :src="'/images/' + 'fleet' + '.png'"
            alt=""
            height="43"
            width="43"
          />
        </div>
        <div class="flex">
          <div class="flex flex-column mt-1">
            <div class="flex align-items-center labels">
              {{ getLabel(index) }}
            </div>
            <div class="flex align-items-center info mt-1">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionTemplateOne",
  props: ["data"],
  methods: {
    getLabel(index) {
      let label;
      switch (index) {
        case "idleHours":
          label = "Idle Hours";
          break;
        case "mileage":
          label = "Mileage";
          break;
        case "problem":
          label = "Problem";
          break;
        case "solution":
          label = "Solution";
          break;
        case "expenses":
          label = "Expenses";
          break;
        case "capacity":
          label = "Capacity";
          break;
        case "cost_per_litre":
          label = "Cost/Liter";
          break;
        case "cost_per_km":
          label = "Cost/KM";
          break;
        case "efficiency":
          label = "Efficiency";
          break;
        case "account_no":
          label = "Account No";
          break;
        case "certificateRefNo":
          label = "Certificate RefNo.";
          break;
        case "remarks":
          label = "Remarks";
          break;
        case "remark":
          label = "Remarks";
          break;
        case "receiptNo":
          label = "Receipt No";
          break;
        case "offensePlace":
          label = "Offense Place";
          break;
        case "summonRemarks":
          label = "Remarks";
          break;
        case "receiptRemarks":
          label = "Remarks";
          break;
        case "report_on_accident":
          label = "Report on Accident";
          break;
        case "damages_to_vehicle":
          label = "Damages to Vehicle";
          break;
        case "action_taken":
          label = "Action Taken";
          break;
      }
      return label;
    },
  },
};
</script>

<style></style>
