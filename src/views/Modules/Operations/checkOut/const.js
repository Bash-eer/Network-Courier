export const checkOutTabData = [
  {
    label: "Bike",
    component: "bikeTab",
  },
  {
    label: "Van",
    component: "vanTab",
  },
  {
    label: "Rapido",
    component: "rapidoTab",
  },
];

export const tableColumns = [
  { header: "Movement Chart ID", field: "m_chart.movement_chart_id" },
  { header: "Collection Slip No", field: "booking.collection_slip_no" },
  { header: "Job No", field: "job_ref_no" },
  { header: "Customer Name", field: "company_details.company_name" },
  { header: "Doc Type", field: "info.service_type" },
  { header: "Instruction", field: "instruction" },
  { header: "Status", field: "status" },
  { header: "Remarks", field: "remarks" },
  { header: "Date&Time", field: "estimated_delivery_datetime" },
  { header: "Actions", field: "" },
];


export const overlayOptionsMenuData = [
  {
    label: "Checklist",
    icon: "checklist",
  },
  {
    label: "Instruction Slip",
    icon: "document",
  },
  {
    label: "Attempt Slip",
    icon: "attempt-slip",
  },
  {
    label: "Print Label",
    icon: "print",
  },
];

export const API = {
    REMARKS_DROPDOWN: 'operations/check-out/remarks',
    SCAN: 'operations/rider/cico/scan',
    LIST: 'operations/rider/cico/jobs',
    UPDATE: 'operations/rider-jobs/cico',
    ACTIONS:{
        INSTRUCTION_SLIP: 'operations/slip/instruction/checkout',
        INSTRUCTION_SLIP_PREVIEW: 'operations/slip/instruction-preview/checkout',
        ATTEMPT_SLIP: 'operations/slip/attempt/checkout',
        ATTEMPT_SLIP_PREVIEW: 'operations/slip/attempt-preview/checkout',
        CHECKLIST: 'operations/slip/check-list/checkout',
        CHECKLIST_PREVIEW: 'operations/slip/check-lists/preview/checkout',
        PRINT_SLIP: 'operations/slip/print/checkout',
        PRINT_SLIP_PREVIEW: 'operations/slip/print-preview/checkout'
    },
    PRINT_MCHART: 'operations/movement/chart/print'
}
