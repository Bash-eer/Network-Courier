import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const initialState = () => ({
    rapidoContractData: { contacts: [{}] },
    quotationData: null,
    costCenterDataById: null,
    selectedContacts:[],
    costCenterData: { contacts: [{}], pick_up_locations: [{}] },
    costCenterDialog: false,
    isCostCenterValid: false,
    islocationInputValid: false,
    btnKey: 10,
})

const Contract = {
    namespaced: true,
    state: initialState,
    getters: {
        rapidoContractData: ({ rapidoContractData }) => rapidoContractData,
        quotationData: ({ quotationData }) => quotationData,
        costCenterData: ({ costCenterData }) => costCenterData,
        costCenterDataById: ({ costCenterDataById }) => costCenterDataById,
        costCenterDialog: ({ costCenterDialog }) => costCenterDialog,
        isCostCenterValid: ({ isCostCenterValid }) => isCostCenterValid,
        islocationInputValid: ({ islocationInputValid }) => islocationInputValid,
        btnKey: ({ btnKey }) => btnKey,
        selectedContacts: ({ selectedContacts }) => selectedContacts,
    },
    mutations: {
        setBtnKey(state) {
            state.btnKey++
        },
        addContacts(state) {
            state.rapidoContractData.contacts.push({})
        },
        removeContacts(state, idx) {
            state.rapidoContractData.contacts.splice(idx, 1)
        },
        setRapidoContractData(state, { key, value, idx }) {
            console.log(key, value)
            if (!isNaN(idx)) {
                state.rapidoContractData[key][idx] = value
            } else if (key) {
                state.rapidoContractData[key] = { ...state.rapidoContractData[key], ...value }
            } else {
                state.rapidoContractData = { ...state.rapidoContractData, ...value }
            }
        },
        setDeliveryRates(state, payload) {
            if (
                state.rapidoContractData['quotation']['delivery_type'] &&
                state.rapidoContractData['quotation']['delivery_type'].length
            ) {
                let idx = state.rapidoContractData['quotation']['delivery_type'].findIndex(list =>
                    list.delivery_type == payload.delivery_type
                )
                if (payload.rates.length) {
                    if (idx != -1) {
                        state.rapidoContractData['quotation']['delivery_type'][idx] = payload
                    } else {
                        state.rapidoContractData['quotation']['delivery_type'].push(payload)
                    }
                } else {
                    state.rapidoContractData['quotation']['delivery_type'].splice(idx, 1)
                }
            } else {
                state.rapidoContractData['quotation']['delivery_type'] = []
                state.rapidoContractData['quotation']['delivery_type'].push(payload)
            }
        },
        setSelectedContacts(state, payload) {
            state.selectedContacts = payload
        },
        setCostCenterData(state, { key, value, idx }) {
            if (!isNaN(idx)) {
                state.costCenterData[key][idx] = value
            } else if (key) {
                state.costCenterData[key] = { ...state.costCenterData[key], ...value }
            } else {
                state.costCenterData = { ...state.costCenterData, ...value }
            }
        },
        updateSelectedDeliveryType(state, payload) {
            state.rapidoContractData?.quotation?.delivery_type && state.rapidoContractData?.quotation?.delivery_type.map(list => {
                if (list.delivery_type == payload.name) {
                    list.selected = payload.selected
                }

            })
        },
        setQuotationData(state, payload) {
            state.quotationData = payload
        },
        setCostCenterDataById(state, payload) {
            state.costCenterDataById = payload
        },
        setCostCenterDialog(state, payload) {
            state.costCenterDialog = payload
        },
        clearCostCenterDataById(state) {
            state.costCenterDataById = null
        },
        clearQuotationData(state) {
            state.quotationData = null
        },
        clearCostCenterData(state) {
            state.costCenterData = null
        },
        updateValid(state, { type, payload }) {
            state[type] = payload
        },
        resetCostCenterStore(state) {
            state.costCenterData = { contacts: [{}], pick_up_locations: [{}] }
        }
    },
    actions: {
        setBtnKey({ commit }) {
            commit('setBtnKey')
        },
        setSelectedContacts({ commit }, payload) {
            commit('setSelectedContacts', payload)
        },
        updateSelectedDeliveryType({ commit }, payload) {
            commit('updateSelectedDeliveryType', payload)
        },
        setRapidoContractData({ commit }, payload) {
            commit('setRapidoContractData', payload)
        },
        setDeliveryRates({ commit }, payload) {
            commit('setDeliveryRates', payload)
        },
        setCostCenterData({ commit }, payload) {
            commit('setCostCenterData', payload)
        },
        addContacts({ commit }, payload) {
            commit('addContacts', payload)
        },
        removeContacts({ commit }, payload) {
            commit('removeContacts', payload)
        },
        setCostCenterDialog({ commit }, payload) {
            commit('setCostCenterDialog', payload)
        },
        clearQuotationData({ commit }) {
            commit('clearQuotationData')
        },
        clearCostCenterData({ commit }) {
            commit('clearCostCenterData')
        },
        updateValid({ commit }, payload) {
            commit('updateValid', payload)
        },
        resetCostCenterStore({ commit }) {
            commit('resetCostCenterStore')
        },
        async getRateCardList(_, payload) {
            return await axios.get(`/settings/sales/rates/rapido/contract/ratecard/sugesttion/${payload}`)
        },
        async getDeliveryRatesData(_, { type, id }) {
            if (type == '1') {
                return await axios.get(`/settings/sales/rates/rapido/contract/ratecard/sugesttion/typeone/rates/${id}`)
            } else if (type == '2') {
                return await axios.get(`/settings/sales/rates/rapido/contract/ratecard/sugesttion/typetwo/rates/${id}`)
            }
        },
        async saveRapidoContract(_, payload) {
            return await axios.post(`/sales/quotation`, payload)
        },
        async getProfileDetails(_, payload) {
            return await axios.get(`/sales/profiles/${payload}`)
        },
        async editRapidoContract(_, { type, id, payload }) {
            console.log(type, id, payload, 'store')
            return await axios.patch(`/sales/${type || 'quotation'}/` + id, payload)
        },
        async editCostCenter(_, { id, payload, type }) {
            return await axios.patch(`/sales/${type}/cost-center/` + id, payload)
        },
        async sendQuotation(_, { id, payload }) {
            return await axios.post(`/sales/quotations/send/${id}`, payload)
        },
        async setQuotationData({ commit }, { type, id }) {
            let apiType = type || 'quotations'
            if (type == 'quotation') {
                apiType = 'quotations'
            }
            const res = await axios.get(`/sales/${apiType}/overview/` + id)

            if (res) {
                commit('setQuotationData', res.data.results || {})
            }
        },
        clearCostCenterDataById({ commit }) {
            commit('clearCostCenterDataById')
        },
        async setCostCenterDataById({ commit }, { type, id }) {
            const res = await axios.get(`/sales/${type}/cost-center/rapido/` + id)

            if (res) {
                commit('setCostCenterDataById', res.data.results || {})
            }
        },
        async saveCostCenterData(_, { type, payload }) {
            return await axios.post(`/sales/${type}/cost-center`, payload)
        },
        async costCenterList(_, { type, id }) {
            return await axios.get(`/sales/${type}/cost-centers/rapido/` + id)
        },
        async costCenterById(_, { type, id }) {
            return await axios.get(`/sales/${type}/cost-center/rapido/` + id)
        },
        async competitorsDropdown() {
            return await axios.get(`settings/salesSettinigs/others/competitor/dropdown`)
        },
        async festivalDropdown() {
            return await axios.get(`settings/salesSettinigs/others/festival/dropdown`)
        },
        async referenceDropdown() {
            return await axios.get(`settings/salesSettinigs/others/reference/dropdown`)
        },
    },

};
export default Contract;
