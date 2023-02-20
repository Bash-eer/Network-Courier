import axios from "axios";
import { errhandler } from "@/services/httpClient";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const CRMClients = {
  namespaced: true,
  state: {
    globalSearch: "",
    pageLimit: 10,
    pageNo: 1,
    sub_pageNo: 1,
    sub_pageLimit: 10,
    contract_profile_id: 0,
    contact_company_id: 0,
    ovarlay_data: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Delete", icon: "fas fa-trash" },
    ],
    ovarlay_data_cus: [{ label: "Add Company", icon: "fas fa-plus" }],
    ovarlay_data_contact: [
      { label: "Add Contact", icon: "fas fa-plus" },
      { label: "Edit", icon: "fas fa-pen" },
    ],
    table_column: [
      {
        field: "",
        header: "Actions",
      },
      {
        field: "customer_id",
        header: "Customer ID",
      },
      {
        field: "profile_name",
        header: "Customer Name",
      },
      {
        field: "company_name",
        header: "Company Name",
      },
      {
        field: "address",
        header: "Address",
      },
      {
        field: "building_name",
        header: "Building Name",
      },
      {
        field: "postal_code",
        header: "Postal Code",
      },
      {
        field: "floor_no",
        header: "Floor No",
      },
      {
        field: "unit_no",
        header: "Unit No",
      },
    ],
    table_column_cus: [
      // {
      //   field: "",
      //   header: "Actions",
      // },
      {
        field: "customer_id",
        header: "Customer ID",
      },
      {
        field: "profile_name",
        header: "Customer Name",
      },
      {
        field: "address_list",
        header: "Address",
      },
    ],
    sub_table_column: [
      {
        field: "",
        header: "Actions",
      },
      {
        field: "company_name",
        header: "Company Name",
      },
      {
        field: "address",
        header: "Address",
      },
      {
        field: "building_name",
        header: "Building Name",
      },
      {
        field: "postal_code",
        header: "Postal Code",
      },
      {
        field: "floor_no",
        header: "Floor No",
      },
      {
        field: "unit_no",
        header: "Unit No",
      },
    ],
    table_contact: [
      {
        field: "",
        header: "Actions",
      },
      {
        field: "contact_name",
        header: "Contact Name",
      },
      {
        field: "contact_no",
        header: "Contact No",
      },
      {
        field: "email",
        header: "Email",
      },
    ],
    table_data: [],
    sub_table_data: [],
    sub_table_contact: [],
    customer_data: null,
    contact_data: null,
    edit_data_mutiple: [],
    action_type: "By All",
  },
  mutations: {
    fetchStateValue(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
  },
  actions: {
    setReset({ commit }, data) {
      commit("fetchStateValue", data);
    },
    async getAllClient({ commit, state }, { toast, search, payload }) {
      return axios
        .post(
          `/crm/settings/client-detail?offset=${state.pageNo}&limit=${
            state.pageLimit
          }&globalsearchkey=${search ?? ""}`,
          payload
        )
        .then((res) => {
          let g_data = [];
          res.data.results?.rows?.map((i) => {
            g_data.push({
              customer_id: i.contract_profile.customer_id,
              profile_name: i.contract_profile.profile_name,
              ...i,
            });
          });
          let data = {
            count: res.data.results?.count ?? 0,
            rows: g_data,
          };
          commit("fetchStateValue", { table_data: data });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getCustomerClient({ commit, state }, { toast, search, payload }) {
      return axios
        .post(
          `/crm/settings/client-detail/customers?offset=${state.pageNo}&limit=${
            state.pageLimit
          }&globalsearchkey=${search ?? ""}`,
          payload
        )
        .then((res) => {
          let f_data = {
            count: res.data.results.count,
            rows: [],
          };
          res.data.results.rows.map((i) => {
            let u_no=i.unit_no?`${i.unit_no}, `:""
            let f_no=i.floor_no?`${i.floor_no}, `:""
            let b_name=i.building_name?`${i.building_name}, `:""
            let a_no=i.address?`${i.address}, `:""
            let address = `${u_no}${f_no}${b_name}${a_no}${i.postal_code}`;
            i["address_list"] = address;
            return i;
          });
          commit("fetchStateValue", { table_data: res.data.results });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getCustomerSUbClient({ commit, state }, { payload, toast }) {
      return axios
        .post(
          `/crm/settings/client-detail/by-customer?offset=${state.sub_pageNo}&limit=${state.sub_pageLimit}`,
          payload
        )
        .then((res) => {
          commit("fetchStateValue", { sub_table_data: res.data.results });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async actionCustomer({ commit }, { payload, toast, method }) {
      let url = `/crm/settings/client-detail/by-customer`;
      if (method == "POST") {
        url = `/crm/settings/client/address-book/companies`;
      }
      return axios({
        url: url,
        method: method,
        data: payload,
      })
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data[method == "POST" ? "message" : "results"] ?? "",
            life: 3000,
          });
          commit("fetchStateValue", { edit_data_mutiple: [] });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          if (ex.response.status == 409) {
            toast.add({
              severity: "info",
              summary: "Please Confirm",
              life: 3000,
            });
            return ex.response.data.result;
          }
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async deleteCustomer(_, { id, toast }) {
      return axios
        .delete(`/crm/settings/client/address-book/company/contacts/${id}`)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data.results ?? "",
            life: 3000,
          });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async getContactsBy({ commit, state }, { id, toast }) {
      return axios
        .get(`/crm/settings/client/address-book/company-contact/${id}`)
        .then((res) => {
          commit("fetchStateValue", { sub_table_contact: res.data.results });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
    async actionContacts({ commit, dispatch }, { payload, toast, method }) {
      let url = "";
      if (method == "POST") {
        url = `/crm/settings/client/address-book/company/contacts`;
      } else {
        url = `/crm/settings/client/address-book/company/contacts/${payload.id}`;
      }
      return axios({
        url: url,
        method: method,
        data: payload.data,
      })
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data[method == "POST" ? "message" : "results"] ?? "",
            life: 3000,
          });
          dispatch("getContactsBy", {
            id: payload.data.company_id,
            toast: toast,
          });
          return res;
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
  },

  getters: {
    table_data: ({ table_data }) => table_data,
  },
};

export default CRMClients;
