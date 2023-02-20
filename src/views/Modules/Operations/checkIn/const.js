export const checkInTabData = [
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
  { header: "Actions", field: "actions" },
  { header: "Movement Chart ID", field: "m_chart.movement_chart_id" },
  { header: "Collection Slip No", field: "booking.collection_slip_no" },
  { header: "Job No", field: "job_ref_no" },
  { header: "Customer Name", field: "company_details.company_name" },
  { header: "Doc Type", field: "info.service_type" },
  { header: "Instruction", field: "instruction" },
  { header: "Status", field: "status" },
  { header: "Remarks", field: "remarks" },
  { header: "Date&Time", field: "estimated_delivery_datetime" },
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
  REMARKS_DROPDOWN: "/operations/check-in/remarks",
  SCAN: "/operations/rider/cico/scan",
  LIST: "/operations/rider/cico/jobs",
  UPDATE: "/operations/rider-jobs/cico",
  PRINT_MCHART: "operations/movement/chart/print",
  ACTIONS: {
    INSTRUCTION_SLIP: "operations/slip/instruction/checkin",
    INSTRUCTION_SLIP_PREVIEW: "operations/slip/instruction-preview/checkin",
    ATTEMPT_SLIP: "operations/slip/attempt/checkin",
    ATTEMPT_SLIP_PREVIEW: "operations/slip/attempt-preview/checkin",
    CHECKLIST: "operations/check-list/checkin",
    CHECKLIST_PREVIEW: "operations/check-lists/preview/checkin",
    PRINT_SLIP: "operations/print/checkin",
    PRINT_SLIP_PREVIEW: "operations/print-preview/checkin",
  },
};

export const mockData = [
  {
    id: 1,
    movement_chart_id: 786456464564,
    logistics_mode: "Bike",
    status: "Delivered",
    collection_slip_no: 12345667,
    customer_name: "Network International",
    doc_type: "Delivery",
    instruction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
    date: "9:00 PM 17 Oct, 2020",
    remarks: "others",
  },
  {
    id: 2,
    movement_chart_id: 786456464456564,
    logistics_mode: "Van",
    status: "Delivered",
    collection_slip_no: 123456678,
    customer_name: "Network International 1",
    doc_type: "Delivery",
    instruction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
    date: "9:00 PM 17 Oct, 2020",
    remarks: "Holiday",
  },
  {
    id: 3,
    movement_chart_id: 7864451556464564,
    logistics_mode: "Rapido",
    status: "Delivered",
    collection_slip_no: 1234566789,
    customer_name: "Network International 2",
    doc_type: "Delivery",
    instruction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
    date: "9:00 PM 17 Oct, 2020",
    remarks: "Wrong Trip",
  },
];

export const NUMBER = {
  NEGATIVE_ONE: -1,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  ZERO: 0,
};
