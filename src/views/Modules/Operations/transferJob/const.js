export const logisticMode = [
  { name: 'Bike', code: 'Bike' },
  { name: 'Van', code: 'Van' },
  { name: 'Rapido', code: 'Rapido' },
];

export const transferJobTableColumnData = [
  { header: 'Actions', field: 'actions' },
  { header: 'Scan No', field: 'job_ref_no' },
  { header: 'Order No.', field: 'order_reference_no' },
  { header: 'Collection Slip No.', field: 'booking.collection_slip_no' },
  { header: 'Trip', field: 'trip.trip_name' },
  { header: 'Date', field: 'createdAt' },
  { header: 'Delivery Address', field: 'company_details.address' },
  { header: 'Weight', field: 'act_weight' },
  { header: 'Logistic Mode', field: 'logistics_mode' },
  { header: 'Rider Name', field: 'rider.display_name' },
  { header: 'Status', field: 'status' },
];

export const overlayOptionsMenuData = [
  {
    label: 'Remove',
    icon: 'times'
  },
  {
    label: 'Edit All',
    icon: 'user-edit'
  },
]

export const API = {
  TRIPS: 'operations/rider-allot/suggestions/callTrips',
  JOBSELECT: {
    GET_ID: 'crm/job-transfer/job',
    LIST: 'crm/bookings/selected-jobs',
    UPDATE: 'crm/bookings/selected-jobs',
  },
  RIDER: '/hrms/employee'
};

export const mockData = [
  {
    id: 1,
    movement_chart_id: 786456464564,
    logistics_mode: 'Bike',
    status: 'New',
    weight: 15,
    createdAt: '2022-10-26T13:23:22.558Z',
    booking: {
      id: '2',
      collection_slip_no: '067578196',
    },
    rider: {
      id: 2,
      display_name: 'priya',
      profile_url: null,
    },
    zone: {
      id: '24',
      zone_name: 'North / Central',
    },
    trip: {
      id: '1',
      trip_name: '1st',
    },
  },
  {
    id: 2,
    movement_chart_id: 786456464456564,
    logistics_mode: 'Van',
    status: 'New',
    weight: 17,
    createdAt: '2022-10-26T13:23:22.558Z',
    booking: {
      id: '2',
      collection_slip_no: '0675781964515',
    },
    rider: {
      id: 2,
      display_name: 'kiran',
      profile_url: null,
    },
    zone: {
      id: '24',
      zone_name: 'North / Central',
    },
    trip: {
      id: '2',
      trip_name: '2nd',
    },
  },
  {
    id: 3,
    movement_chart_id: 7864451556464564,
    logistics_mode: 'Rapido',
    status: 'New',
    weight: 55,
    createdAt: '2022-10-26T13:23:22.558Z',
    booking: {
      id: '2',
      collection_slip_no: '067576458196',
    },
    rider: {
      id: 2,
      display_name: 'arjun',
      profile_url: null,
    },
    zone: {
      id: '24',
      zone_name: 'North / Central',
    },
    trip: {
      id: '3',
      trip_name: '4th',
    },
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
