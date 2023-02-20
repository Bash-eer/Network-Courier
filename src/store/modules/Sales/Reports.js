import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesReport = {
  state: {
    salesReportsTableColumnData: [
      { field: "company_status", header: "Actions" },
      { field: "id", header: "S. No" },
      { field: "profile_name", header: "Profile Name" },
      { field: "quotation", header: "Quotation" },
      { field: "address", header: "Address" },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
      { field: "preview", header: "Preview" },
      { field: "status", header: "Status" },
      { field: "members", header: "Members" },
    ],

    reportTableData: [
      // {
      //   id: "1",
      //   profile_name: "DHL 003",
      //   quotation: "Adhoc",
      //   remarks: "Lorem Ipsum Doret Dexir auvoir",
      //   preview: "",
      //   address: "No.1 Second Chin Bee 238801",
      //   status: "Called",
      //   createdAt: "2021-12-06T09:14:39.228Z",
      //   created_by: "Antony Jerold",
      //   type: "express",
      // },
      // {
      //   id: "2",
      //   profile_name: "DHL 004",
      //   quotation: "Agent",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee 238801",
      //   status: "Concluded",
      //   createdAt: "2021-12-06T09:27:15.718Z",
      //   created_by: "Keerthi",
      //   type: "rapido",
      // },
      // {
      //   id: "3",
      //   profile_name: "DHL 006",
      //   quotation: "international",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee 238801",
      //   status: "Hold",
      //   createdAt: "2021-12-06T09:28:28.834Z",
      //   created_by: "abi",
      //   type: "international",
      // },
      // {
      //   id: "4",
      //   profile_name: "DHL 004",
      //   quotation: "international",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee 238801",
      //   status: "New",
      //   createdAt: "2021-12-06T09:48:08.407Z",
      //   created_by: "surya",
      //   type: "international",
      // },
      // {
      //   id: "5",
      //   profile_name: "DHL 004",
      //   quotation: "international",
      //   remarks: "Lorem Ipsum Doret Dexir auvoim Doret Dexir a",
      //   address: "No.1 Second Chin Bee 238801",
      //   status: "Quote",
      //   createdAt: "2021-12-06T09:48:08.407Z",
      //   created_by: "surya",
      //   type: "international",
      // },
    ],
  },

  mutations: {},
  actions: {},
};
export default salesReport;
