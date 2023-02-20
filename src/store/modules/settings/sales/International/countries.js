const { URL } = require("../../../../../../config/const");
import axios from "axios";
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const InternationalCountries = {
    namespaced: true,
    state: {
        tableData: [],
        refreshKey: 10,
        country: [{}],
        editCountryData: null,
        showEditDialog: false,
        showAddDestDialog: false,
    },
    getters: {
        tableData: ({ tableData }) => tableData,
        refreshKey: ({ refreshKey }) => refreshKey,
        country: ({ country }) => country,
        editCountryData: ({ editCountryData }) => editCountryData,
        showEditDialog: ({ showEditDialog }) => showEditDialog,
        showAddDestDialog: ({ showAddDestDialog }) => showAddDestDialog,
    },
    mutations: {
        setTableData(state, payload) {
            state.tableData = payload
            console.log(state.tableData)
        },
        updateRefreshKey(state) {
            state.refreshKey++
        },
        setCountryData(state, { idx, data }) {
            state.country[idx] = data
        },
        addCountry(state) {
            state.country.push({})
        },
        removeCountry(state, id) {
            state.country.splice(id, 1)
        },
        setEditCountryData(state, payload) {
            state.editCountryData = payload
        },
        setEditDialog(state, payload) {
            state.showEditDialog = payload
        },
        setAddDestDialog(state, payload) {
            state.showAddDestDialog = payload
        },
    },
    actions: {
        updateRefreshKey({ commit }) {
            commit('updateRefreshKey')
        },
        setCountryData({ commit }, payload) {
            commit('setCountryData', payload)
        },
        addCountry({ commit }) {
            commit('addCountry')
        },
        removeCountry({ commit }, id) {
            commit('removeCountry', id)
        },
        setEditCountryData({ commit }, payload) {
            commit('setEditCountryData', payload)
        },
        setEditDialog({ commit }, payload) {
            commit('setEditDialog', payload)
        },
        setAddDestDialog({ commit }, payload) {
            commit('setAddDestDialog', payload)
        },
        async setTableData({ commit }) {
            const res = await axios.get('settings/sales/rates/international/outbound/country')

            if (res) {
                res.data?.results.map((list, idx) => {
                    list['destinations_length'] = list.destinations.length
                    list['sl_no'] = idx + 1
                    list['created_by'] = list.user.display_name
                    list['createdAt'] = new Date(list.createdAt)
                }
                )
                commit('setTableData', res.data?.results || [])
            }
        },
        async disableData(_, { id, data }) {
            await axios.patch('settings/sales/rates/international/outbound/countries/status/' + id, data)
        },
        async deleteData({ commit }, id) {
            await axios.delete('settings/sales/rates/international/outbound/country/' + id)
            commit('updateRefreshKey')
        },
        async addNewCountry(_, payload) {
            await axios.post('settings/sales/rates/international/outbound/country', { country: payload })
        },
        async saveEditData(_, { id, data }) {
            await axios.patch('settings/sales/rates/international/outbound/country/' + id, data)
        },
        async AddDestData(_, data) {
            await axios.post('settings/sales/rates/international/outbound/countries/destination', data)
        },
    }
};
export default InternationalCountries;
