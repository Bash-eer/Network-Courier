import axios from 'axios';
import router from '../../../router';
// import { useToast } from "primevue/usetoast";
const { URL } = require('../../../../config/const');
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const bulkAdjustment = {
  namespaced: true,
  state: {
    globalSearch: '',
    //toast data
    toastData: {
      showToastMessage: false,
      summary: null,
      severity: null,
    },
    //newly added
    batchName: {},
    rowEdit: {},
    checkBoxClickEcom: false,
    normalTableRowDelete: {},
    ecomTableRowDelete: {},
    editField: "",
    editFieldEcom: "",
    IncrementAmountDisable: false,
    IncrementPercentageDisable: false,
    addRegionDeliveryTransportType: null,
    bulkAdjustmentRowProfileName: null,
    ProfileExpansionData: [],
    ProfileExpansionRevisionData: [],

    //firststepper
    FirstStepperTableData: [],
    FirstStepperTableDataSelected: [],
    SecondStepperTableData: [],
    bulkAdjustmentAddNewData: {},
    bulkAdjustmentAddNewPayload: {},
    tripFormTableData: [],
    //Followup
    FollowUpStateData: {},
    BulkAdjustmentFollowUpAddNewData: {},
    BulkAjustmentRowAddNewData: {},
    //Attachment
    BulkAdjustmentAttachmentsStateData: {},
    BulkAdjustmentEditAttachmentStateData: {},
    BulkAdjustmentStateData: null,
    BulkAdjustmentAttachmentsFiles: [],
    BulkAdjustmentEditAttachmentFiles: [],
    deletedBulkAdjustmentAttachmentsFiles: [],
    deletedBulkAdjustmentEditAttachmentsFiles: [],
    //dialog data
    OverViewRowId: '',
    selectedTab: 'quotations',
    displayDialog: false,
    dialogComponent: null,
    dialogHeader: null,
    dialogHeaderId: null,
    //sales profile creation data
    companyCreationStateData: {},
    salesProfileCreatedId: null,
    sendQuotationData: null,
    SalesRedirectToQuotation: false,
    SalesRedirectToQuotationId: null,
    //send quotation in dialog id and type
    quotationPostPatchRedirect: false,
    sendQuotationRedirect: false,
    // TimeLineCurrentTab: "Overview",
    //second page
    ContractSubTableData: [],
    QuotationSubTableData: [],
    //for stepper
    stepperNavigation: null,

    salesTabAddNewData: {},
    EcommerceTable: [],
    EcomProfileData: [
      {
        Increment_Percentage: 0,
        Increment_amount: 0,
        address: "Coimbatore",
        building_name: "VJ",
        business_type: "Contract",
        clearance_name: null,
        contract_id: "NEC/SQ00127/2022",
        country: "India",
        customer_type: "Express",
        selected: false,
        ecom: [
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
        ],
        floor_no: "1",
        id: "1",
        latest: true,
        min_units: 10,
        postal_code: "96958741",
        priority: "Low",
        profile_name: "Antony",
        remarks: "Make the contract Easier",
        revised_Unit_Cost: 0,
        sales_person: { display_name: "Network", contact_no: "9876434569" },
        short_name: null,
        state: "Tamil Nadu",
        status: "New",
        unit_cost: 30,
        unit_no: "5",
      },
      {
        Increment_Percentage: 0,
        Increment_amount: 0,
        address: "Coimbatore",
        building_name: "VJ",
        business_type: "Contract",
        clearance_name: null,
        contract_id: "NEC/SQ00127/2022",
        country: "India",
        customer_type: "Express",
        floor_no: "1",
        id: "2",
        latest: true,
        min_units: 10,
        postal_code: "96958741",
        priority: "Low",
        profile_name: "Antony",
        remarks: "Make the contract Easier",
        revised_Unit_Cost: 0,
        sales_person: { display_name: "Network", contact_no: "9876434569" },
        selected: false,
        ecom: [
          {
            job_count: 300,
            rate_per_job: 100,
            amount: 100,
            additional_job_rate: 200,
            percentage: 50,
            remarks: "yyyyyyy",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
        ],
        short_name: null,
        state: "Tamil Nadu",
        status: "New",
        unit_cost: 20,
        unit_no: "5",
      },
      {
        Increment_Percentage: 0,
        Increment_amount: 0,
        address: "Coimbatore",
        building_name: "VJ",
        business_type: "Contract",
        clearance_name: null,
        contract_id: "NEC/SQ00127/2022",
        country: "India",
        customer_type: "Express",
        floor_no: "1",
        id: "3",
        latest: true,
        min_units: 10,
        postal_code: "96958741",
        priority: "Low",
        profile_name: "Antony",
        remarks: "Make the contract Easier",
        revised_Unit_Cost: 0,
        sales_person: { display_name: "Network", contact_no: "9876434569" },
        selected: false,
        ecom: [
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 20,
            amount: 10,
            additional_job_rate: 10,
            percentage: 5,
            remarks: "abc",
          },
          {
            job_count: 30,
            rate_per_job: 10,
            amount: 10,
            additional_job_rate: 20,
            percentage: 5,
            remarks: "abc",
          },
        ],
        short_name: null,
        state: "Tamil Nadu",
        status: "New",
        unit_cost: 10,
        unit_no: "3",
      },
    ],
    //
    salesTableColumnData: [
      { field: 'Actions', header: 'Actions' },
      { field: 'sno', header: 'S. No' },
      { field: 'company_name', header: 'Company Name' },
      { field: 'address', header: 'Address' },
      { field: 'contact', header: 'Contact' },
      { field: 'contract', header: 'Contract' },
      { field: 'email', header: 'Email' },
      { field: 'mobile_no', header: 'Telephone' },
      { field: 'status', header: 'Status' },
      { field: 'created_by', header: 'Created By' },
      { field: 'createdAt', header: 'Created On' },

      // { field: "company_status", header: "Status" },
    ],
    quotationSubTableColumnData: [
      // { field: "sno", header: "S. No" },
      { field: 'profile_name', header: 'Profile Name' },
      { field: 'customer_type', header: 'Quotation' },
      { field: 'address', header: 'Address' },
      { field: 'remarks', header: 'Remarks' },
      { field: 'createdAt', header: 'Created On' },
      { field: 'created_by', header: 'Created By' },
      { field: 'preview', header: 'Preview' },
      { field: 'status', header: 'Status' },
      { field: 'contacts', header: 'Members' },
    ],
    salesTableData: [
      {
        id: '1',
        company_name: 'BTS',
        Trade: 'k-pop band',
        img: './images/car.png',
        contact_name: 'Keerthana',
        customer_name: null,
        quotation: 'Contract',
        type: 'rapido',
        email: 'keerthana@amanasia.com',
        contact_no: '45555',
        mobile_no: '22222',
        designation: 'BOSS',
        fax_no: '222',
        status: 'company',
        website: 'amanasia.com',
        roc_no: '111',
        postal_code: '222',
        country: 'Korea South',
        state: 'Busan',
        building_name: 'Zombie Towers',
        floor_no: '',
        unit_no: '34',
        address: 'BTS Street',
        company_logo: null,
        company_status: null,
        createdAt: '2021-12-06T09:27:15.718Z',
        updatedAt: '2021-12-06T09:27:15.718Z',
        deletedAt: null,
        created_by: 'Keerthi',
        user_sales_company: {
          display_name: 'Antony Jerold ',
        },
        business_types: [],
      },
    ],
    QuotationTabMenuData: [
      {
        label: 'Quotation',
        tab: 'QuotationTab',
        select: true,
        tabName: 'Quotationss',
      },
      {
        label: 'Contract',
        tab: 'ContractTab',
        select: false,
        tabName: 'Contract',
      },
    ],
    quotationTabTableColumnData: [
      { field: 'actions', header: 'Actions' },
      { field: 'sno', header: 'S. No' },
      // { field: "edit", header: "Edit" },
      { field: 'profile_name', header: 'Profile Name' },
      { field: 'customer_type', header: 'Quotation' },
      { field: 'addresss', header: 'Address' },
      { field: 'remarks', header: 'Remarks' },
      { field: 'createdAt', header: 'Created On' },
      { field: 'created_by', header: 'Created By' },
      { field: 'preview', header: 'Preview' },
      { field: 'status', header: 'Status' },
      { field: 'contacts', header: 'Members' },
    ],
    ContractTabTableData: [],

    QuotationTabTableData: [
      {
        id: '2',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        business_type: 'Contract',
        quotation_type: 'ExpressContractBike',
        address: 'UPS Highlands',

        status: 'New1',

        remarks: 'Christmas Greetings',

        createdAt: '2021-12-06T11:33:39.716Z',

        quotation_id: '1',
        created_by: 'surya',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
          {
            id: '2',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
        revisions: [
          {
            id: '1',
            name_of_the_profile: 'Postman Charles',
            customer_type: 'Express',
            quotation_type: 'ExpressContractBike',
            address: 'UPS Highlands',

            status: 'New1',

            remarks: 'Christmas Greetings',

            createdAt: '2021-12-06T11:33:39.716Z',

            quotation_id: '1',
            created_by: 'surya',
            contact_person: [
              {
                id: '1',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
              {
                id: '2',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
            ],
          },
          {
            id: '2',
            name_of_the_profile: 'Postman Pat',
            customer_type: 'Express',
            quotation_type: 'ExpressContractBike',
            address: 'UPS Highlands',

            status: 'New1',

            remarks: 'Christmas Greetings',

            createdAt: '2021-12-06T11:33:39.716Z',

            quotation_id: '1',
            created_by: 'surya',
            contact_person: [
              {
                id: '1',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
              {
                id: '2',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'International',
        quotation_type: 'InternationalContract',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '2',
        created_by: 'josh',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '4',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'International',
        quotation_type: 'InternationalAdhoc',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '3',
        created_by: 'DEAR',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '5',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'International',
        quotation_type: 'InternationalAgent',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '4',
        created_by: 'FIRE ',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '6',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractVan',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '5',
        created_by: 'EAGLE',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '7',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractInterCompany',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '6',
        created_by: 'TIGER',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '8',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractBikeFSRCompany',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '7',
        created_by: 'JAGUAR',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '9',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractVanFSR',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '8',
        created_by: 'Bull',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '10',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractFSR',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '9',
        created_by: 'jayanth',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '11',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractProjectJobs',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '10',
        created_by: 'ram',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '12',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Express',
        quotation_type: 'ExpressContractExpressAdhoc',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '12',
        created_by: 'minion',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '13',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Rapido',
        quotation_type: 'RapidoRapidoContract',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '13',
        created_by: 'srini',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
      {
        id: '14',
        name_of_the_profile: 'Postman Pat',
        customer_type: 'Rapido',
        quotation_type: 'RapidoRapidoAdhoc',
        address: 'UPS Highlands',
        status: 'New1',
        remarks: 'Christmas Surprise',
        createdAt: '2021-12-06T12:54:07.460Z',
        quotation_id: '14',
        created_by: 'krishh',
        contact_person: [
          {
            id: '1',
            person_name: 'Jim',
            email: 'ji@nc.com',
            contact_no: '211',
            designation: 'Manager',
          },
        ],
      },
    ],
    QuotationTabTableData2: [
      {
        quotation_id: '2',
        type: 'quotation',
        termination_referenced_by: null,
        request_termination_date: null,
        actual_termination_date: null,
        date: null,
        reason: null,
        created_by: 1,
        sales_company_id: '1',
        quotation_contract_express: [
          {
            two_tier: null,
            multi_tier: null,
            contact_person: [
              {
                id: '1',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
            ],
            trip_schedule: [
              {
                id: '1',
                trip_no: 1,
                from: '1970-01-01T14:46:00.000Z',
                to: '1970-01-01T15:46:00.000Z',
                day: 'Weekdays',
                type: 'Open',
                fromraw_time: '1970-01-01T14:46:00.000Z',
                toraw_time: '1970-01-01T15:46:00.000Z',
              },
            ],
            id: '2',
            name_of_the_profile: 'Postman Pat',
            customer_type: 'Express',
            quotation_type: 'ExpressContractBike',
            address: 'UPS Highlands',
            postal_code: '333',
            country: 'Country1',
            state: 'State1',
            building_name: 'The UPS Store',
            floor_no: '10',
            unit_no: '1',
            business_method: 'Agent',
            status: 'New1',
            priority: 'High',
            previously_served_by: 'ABC Company1',
            referral_person_name: 'Jacob1',
            referred_by: 'Rider1',
            package_details: 'Post',
            service_required: 'bike',
            Region: 'Hulk Gardens',
            rates: 'Hulk Card',
            job: 10,
            no_of_units: 20,
            job_amount: null,
            additional_jobs: 40,
            estimated_start_date: null,
            estimated_end_date: null,
            first_month: 'charge usage only',
            first_month_detail: null,
            detail_type: null,
            unit_price: null,
            unit_price_qty: null,
            unit_price_amount: null,
            description: null,
            min_qty: 10,
            min_amount: 16,
            billing_cycle: '100',
            remarks: 'Christmas Greetings',
            update: 'revision',
            credit_limit: 0,
            credit_term: 0,
            credit_term_days: null,
            sms: 0,
            special_urget_price: 0,
            sur_charge: 0,
            island_charge: 0,
            weekend_2nd_trip_charge: false,
            saturday_2nd_trip_charge: false,
            return_trip_charge: false,
            return_trip_partial_charge: false,
            collection_trip_charge: false,
            special_monitoring: false,
            call_centre: false,
            min_charge_per_job: null,
            job_min_cost: 0,
            job_min_cost_kgs: 0,
            urgent_sur_charge: 0,
            job_add_cost: 0,
            job_add_cost_kgs: 0,
            contract_starts: null,
            contract_ends: null,
            contract_period: null,
            auto_renewal: null,
            createdAt: '2021-12-06T11:33:39.716Z',
            updatedAt: '2021-12-06T12:54:07.422Z',
            deletedAt: null,
            quotation_id: '2',
          },
          {
            two_tier: null,
            multi_tier: null,
            contact_person: [
              {
                id: '1',
                person_name: 'Jim',
                email: 'ji@nc.com',
                contact_no: '211',
                designation: 'Manager',
              },
            ],
            trip_schedule: [
              {
                id: '1',
                trip_no: 1,
                from: '1970-01-01T14:46:00.000Z',
                to: '1970-01-01T15:46:00.000Z',
                day: 'Weekdays',
                type: 'Open',
                fromraw_time: '1970-01-01T14:46:00.000Z',
                toraw_time: '1970-01-01T15:46:00.000Z',
              },
            ],
            id: '4',
            name_of_the_profile: 'Postman Pat',
            customer_type: 'Express',
            quotation_type: 'ExpressContractBike',
            address: 'UPS Highlands',
            postal_code: '333',
            country: 'Country1',
            state: 'State1',
            building_name: 'The UPS Store',
            floor_no: '10',
            unit_no: '1',
            business_method: 'Agent',
            status: 'New1',
            priority: 'High',
            previously_served_by: 'ABC Company1',
            referral_person_name: 'Jacob1',
            referred_by: 'Rider1',
            package_details: 'Post',
            service_required: 'bike',
            Region: 'Hulk Gardens',
            rates: 'Hulk Card',
            job: 10,
            no_of_units: 20,
            job_amount: null,
            additional_jobs: 40,
            estimated_start_date: null,
            estimated_end_date: null,
            first_month: 'charge usage only',
            first_month_detail: null,
            detail_type: null,
            unit_price: null,
            unit_price_qty: null,
            unit_price_amount: null,
            description: null,
            min_qty: 10,
            min_amount: 16,
            billing_cycle: '100',
            remarks: 'Christmas Surprise',
            update: 'latest',
            credit_limit: 0,
            credit_term: 0,
            credit_term_days: null,
            sms: 0,
            special_urget_price: 0,
            sur_charge: 0,
            island_charge: 0,
            weekend_2nd_trip_charge: false,
            saturday_2nd_trip_charge: false,
            return_trip_charge: false,
            return_trip_partial_charge: false,
            collection_trip_charge: false,
            special_monitoring: false,
            call_centre: false,
            min_charge_per_job: null,
            job_min_cost: 0,
            job_min_cost_kgs: 0,
            urgent_sur_charge: 0,
            job_add_cost: 0,
            job_add_cost_kgs: 0,
            contract_starts: null,
            contract_ends: null,
            contract_period: null,
            auto_renewal: null,
            createdAt: '2021-12-06T12:54:07.460Z',
            updatedAt: '2021-12-06T12:54:07.460Z',
            deletedAt: null,
            quotation_id: '2',
          },
        ],
        user_quotation: {
          display_name: 'Antony Jerold ',
        },
        international_express_adhoc: [],
      },
    ],
    quotationHeaderProfileData: {},
    fetchNoOfUnitsHandlerData: {},
  },
  mutations: {
    //newly added
    bulkAdjustmentRowProfileNameMutation(state, rate_card_name) {
      state.bulkAdjustmentRowProfileName = rate_card_name;
    },
    fetchProfileExpansionData(state, data) {
      state.ProfileExpansionData = data;
    },
    fetchProfileExpansionRevisionData(state, data) {
      state.ProfileExpansionRevisionData = data;
    },

    getFirstStepperTableData(state, data) {
      state.FirstStepperTableData = data;
    },
    getSecondStepperTableData(state, data) {
      state.SecondStepperTableData = data;
    },
    toastMutation(state, toastData) {
      state.toastData.summary = toastData.toastMsg;
      state.toastData.severity = toastData.toastSeverity;
      state.toastData.showToastMessage = true;
      //console.log("toasttt")
    },
    // fetchExpressContractBikeTimeLineData(state, data) {
    //   state.expressContractBikeTimeLine.push(data);
    // },
    // fetchDefaultExpressContractBikeTimeLineData(state, data) {
    //   state.expressContractBikeTimeLine = [];
    //   state.expressContractBikeTimeLine = data;
    // },
    //DIALOGS
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
      state.dialogHeaderId = dialogDetails.dialogHeaderId;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
      //console.log("closeetwoo")

    },
    //STEPPER
    stepperNavigationMutation(state, step) {
      state.stepperNavigation = step;
    },
    fetchQuotationTableData(state, data) {
      state.QuotationTabTableData = data;
    },
    fetchContractTableData(state, data) {
      state.ContractTabTableData = data;
    },

    //sales amin table

    fetchSalesTableData(state, data) {
      state.salesTableData = data;
    },
    //sales second page  contract subtable
    fetchContractSubTableData(state, data) {
      state.ContractSubTableData = data;
    },
    //sales second page quotation subtable
    fetchQuotationSubTableData(state, data) {
      state.QuotationSubTableData = data;
    },
    //sales quotation header profile
    fetchSalesQuotationHeaderProfile(state, data) {
      state.quotationHeaderProfileData = data;
    },
    //number of units handler
    fetchNoOfUnitsHandler(state, data) {
      state.fetchNoOfUnitsHandlerData = data;
    },
    //sales profile id
    salesProfileCreatedId(state, data) {
      state.salesProfileCreatedId = data;
    },
    //Send Quotation id
    sendQuotationData(state, data) {
      state.sendQuotationData = data;
    },
    setSelectedTab(state, data) {
      if (data == 'Quotation') {
        state.selectedTab = 'quotation';
      } else if (data == 'Contract') {
        state.selectedTab = 'contract';
      }
    },
    addRegionDeliveryTransportTypeMutation(state, type) {
      state.addRegionDeliveryTransportType = type;
    },
  },
  actions: {
    //newly added
    setBulkAdjustmentRowProfileName({ commit }, { rate_card_name }) {
      commit('bulkAdjustmentRowProfileNameMutation', rate_card_name);
    },

    async loadBulkAdjustmentSecondPageData({ commit }, { path, mutation }) {
      await axios.get(path).then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;

          commit('bulkAdjustmentRowProfileNameMutation', res.data.results);
        }
      });
    },

    async getFirstStepperTableData() {
      return await axios.get(
        '/sales/contract/bulk-adjustment/express/contracts'
      );
    },
    async getSecondStepperTableData(_, payload) {
      return await axios.post(
        '/sales/contract/bulk-adjustment/express/contract/selected',
        payload
      );
    },
    // async getSecondStepperTableData(_, payload) {
    //   axios
    //     .post('/sales/contract/bulk-adjustment/express/contracts'), payload
    //       .then((res) => {
    //         if (res.data.results) {
    //           console.log(res.data.results, 'result profile');
    //           // commit('fetchProfileExpansionData', res.data.results);
    //         }
    //       });
    // },
    async loadProfileExpansionData({ commit }, { id }) {
      axios
        .get('/sales/contract/bulk-adjustment/express/profiles/' + id)
        .then((res) => {
          if (res.data.results) {
            commit('fetchProfileExpansionData', res.data.results);
          }
        });
    },

    async loadProfileExpansionRevisionData({ commit }, { id }) {
      axios
        .get('/sales/contract/bulk-adjustment/batch/profile/history/' + id)
        .then((res) => {
          if (res.data.results) {
            commit('fetchProfileExpansionRevisionData', res.data.results);
          }
        });
    },
    //timeline
    // resetExpressContractBikeTimeLineData({ commit }, { data }) {
    //   commit("fetchDefaultExpressContractBikeTimeLineData", data);
    // },
    // updateExpressContractBikeTimeLineData({ commit }, { data }) {
    //   commit("fetchExpressContractBikeTimeLineData", data);
    // },
    setRegionDeliveryTransportType({ commit }, { type }) {
      commit('addRegionDeliveryTransportTypeMutation', type);
    },
    //DIALOGS
    setSelectedTab({ commit }, payload) {
      commit('setSelectedTab', payload);
    },
    openDialog({ commit, getters }, { dialogDetails }) {
      commit('dialogComponentMutation', dialogDetails);
      getters.controlActivityDialog;
    },
    closeDialog({ commit }) {
      commit('dialogDisplayMutation', false);
      //console.log("closee")
    },
    //STEPPER
    navigateStepper({ commit }, { step }) {
      commit('stepperNavigationMutation', step);
    },

    loadSalesTabData(
      { commit, state } // { redirect }
    ) {
      // axios.get("/salesCompany").then((res) => {
      axios.get('/sales/profile').then((res) => {
        if (res.data.results) {
          // console.log(res.data.results, 'result');
          let resultRows = res.data.results;
          for (let c in resultRows) {
            resultRows[c]['created_by'] = resultRows[c]['user']['display_name'];
          }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];

            r_obj['sno'] = i + 1;
          }
          commit('fetchSalesTableData', res.data.results);
          commit('salesProfileCreatedId', res.data.results.id);
          // if (state.SalesRedirectToQuotation) {
          //   router.push({
          //     name: "QuotationContract",
          //     params: { id: res.data.results.id },
          //   });
          // }
        }
      });
    },
    //load second page quotation tab table data

    // async loadBulkAdjustmentSecondPageData({ commit }, { path, mutation }) {
    //   await axios.get(path).then((res) => {
    //     if (res.data.results) {
    //       console.log(res.data.results, "result");
    //       let resultRows = res.data.results;

    //       commit("bulkAdjustmentRowProfileNameMutation", res.data.results);
    //     }
    //   });
    // },
    //load second page contract tab table data

    loadContractTabTableData({ commit }, { id }) {
      // axios.get("/salesCompany").then((res) => {
      axios.get('/sales/contract/' + id).then((res) => {
        if (res.data.results) {
          // console.log(res.data.results, 'result');
          let resultRows = res.data.results;
          // for (let c in resultRows) {
          //   resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
          // }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];

            r_obj['sno'] = i + 1;
          }
          commit('fetchContractTableData', res.data.results);
        }
      });
    },
    //second page contarct expand history data
    loadContractSubTableData({ commit }, { id }) {
      // axios.get("/salesCompany").then((res) => {
      axios.get('/sales/contract/histories/' + id).then((res) => {
        if (res.data.results) {
          // console.log(res.data.results, 'result');
          let resultRows = res.data.results;
          for (let c in resultRows) {
            resultRows[c]['created_by'] = resultRows[c]['user']['display_name'];
          }
          // for (let i = 0; i < resultRows.length; i++) {
          //   let r_obj = resultRows[i];

          //   r_obj["sno"] = i + 1;
          // }
          commit('fetchContractSubTableData', res.data.results);
        }
      });
    },
    //second page quotation expand history data
    loadQuotationSubTableData({ commit }, { id }) {
      // axios.get("/salesCompany").then((res) => {
      axios.get('/sales/quotation/histories/' + id).then((res) => {
        if (res.data.results) {
          // console.log(res.data.results, 'result');
          let resultRows = res.data.results;
          for (let c in resultRows) {
            resultRows[c]['created_by'] = resultRows[c]['user']['display_name'];
          }
          // for (let i = 0; i < resultRows.length; i++) {
          //   let r_obj = resultRows[i];

          //   r_obj["sno"] = i + 1;
          // }
          commit('fetchQuotationSubTableData', res.data.results);
        }
      });
    },
    //delete
    DELETECRUDOPERATION(
      { dispatch, commit },
      { path, method, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
      })
        .then((res) => {
          if (res.data.status == 200) {
            commit('toastMutation', toastData.toastSuccessData);

            dispatch(loadData);
            // dispatch(loadData.loadApi, {
            //   path: loadData.loadPath,
            //   mutation: loadData.loadMutation,
            // });
            // console.log("above toast delete");
            // const toast = useToast();
            // toast.add({
            //   severity: "success",
            //   summary: "Success",
            //   detail: "Deleted",
            //   life: 3000,
            // });
            // console.log("below toast delete");
          }
        })
        .catch((err) => {
          toastData.toastErrorData.toastMsg = err.response.data.message;
          commit('toastMutation', toastData.toastErrorData);
        });
    },
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, id, type, toastMutationData, toastData, loadDiffStore, closeDialogue }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            // dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });
            dispatch(loadData, { id: id, type: type }, { root: true });
            dispatch(closeDialogue, "closeDialog", { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });
            // dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });

            commit("toastMutation", toastData.toastSuccessData);

            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastCommonErrorData);
            // dispatch(toastMutationData, { data: toastData.toastCommonErrorData }, { root: true });
          }
        });
    },
    POSTPATCHCRUDOPERATIONAddNew(
      { dispatch, commit },
      { path, method, data, loadData, id, type, toastMutationData, toastData, loadDiffStore }
    ) {
      return axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          if (loadDiffStore) {
            // commit("toastMutation", toastData.toastSuccessData);
            dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });
            dispatch(loadData, { id: id, type: type }, { root: true });
            // this.$router.push({ name: "SalesHome" });
          } else {
            dispatch(loadData, { id, type }, { root: true });
            dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });

            // commit("toastMutation", toastData.toastSuccessData);
            // this.$router.push({ name: "SalesHome" });
            // dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            // commit("toastMutation", toastData.toastCommonErrorData);
            dispatch(toastMutationData, { data: toastData.toastCommonErrorData }, { root: true });
          }
        });
    },
    PATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, id, type, loadDataPath, toastData, loadDiffStore, closeDialogue }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then((res) => {
          if (res) {
            id = res.data.results.id;
          }
          if (loadDiffStore) {
            commit("toastMutation", toastData.toastSuccessData);
            // dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });
            dispatch(loadData, { path: loadDataPath, type: type }, { root: true });
            dispatch(closeDialogue, "closeDialog", { root: true });
          } else {
            dispatch(loadData, { id, type }, { root: true });
            // dispatch(toastMutationData, { data: toastData.toastSuccessData }, { root: true });

            commit("toastMutation", toastData.toastSuccessData);

            dispatch("closeDialog");
          }
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastCommonErrorData);
            // dispatch(toastMutationData, { data: toastData.toastCommonErrorData }, { root: true });
          }
        });
    },
    //sales quotation header profile details // method : get
    loadSalesQuotationHeaderProfile({ commit }, { id }) {
      axios.get('/sales/profiles/' + id).then((res) => {
        if (res?.data?.results) {
          commit('fetchSalesQuotationHeaderProfile', res?.data?.results);
        }
      });
    },
  },
  getters: {
    globalSearch: ({ globalSearch }) => globalSearch,
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
    ProfileExpansionData: ({ ProfileExpansionData }) => ProfileExpansionData,
    batchName: ({ batchName }) => batchName,
    rowEdit: ({ rowEdit }) => rowEdit,
    IncrementAmountDisable: ({ IncrementAmountDisable }) => IncrementAmountDisable,
    IncrementPercentageDisable: ({ IncrementPercentageDisable }) => IncrementPercentageDisable,
    ProfileExpansionRevisionData: ({ ProfileExpansionRevisionData }) =>
      ProfileExpansionRevisionData,

    salesTabAddNewData: ({ salesTabAddNewData }) => salesTabAddNewData,

    quotationHeaderProfileData: ({ quotationHeaderProfileData }) =>
      quotationHeaderProfileData,
    selectedTab: ({ selectedTab }) => selectedTab,

    bulkAdjustmentAddNewData: ({ bulkAdjustmentAddNewData }) =>
      bulkAdjustmentAddNewData,

    BulkAdjustmentAttachmentsStateData: ({ BulkAdjustmentAttachmentsStateData }) =>
      BulkAdjustmentAttachmentsStateData,


    BulkAdjustmentEditAttachmentStateData: ({ BulkAdjustmentEditAttachmentStateData }) =>
      BulkAdjustmentEditAttachmentStateData,

    BulkAdjustmentFollowUpAddNewData: ({ BulkAdjustmentFollowUpAddNewData }) =>
      BulkAdjustmentFollowUpAddNewData,


    BulkAjustmentRowAddNewData: ({ BulkAjustmentRowAddNewData }) =>
      BulkAjustmentRowAddNewData,

    bulkAdjustmentAddNewPayload: ({ bulkAdjustmentAddNewPayload }) =>
      bulkAdjustmentAddNewPayload,
  },
};
export default bulkAdjustment;
