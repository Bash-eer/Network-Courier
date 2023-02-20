const initialState = () => ({
    currentTab: 'Document',
    saveKey: 10,
    rowValidations: {
        documentAndparcel: {
            multiplier: [{ id: 0, valid: false }],
            normal: [{ id: 0, valid: false }],
        },
        parcel: {
            multiplier: [{ id: 0, valid: false }],
            normal: [{ id: 0, valid: false }],
        },
        document: {
            multiplier: [{ id: 0, valid: false }],
            normal: [{ id: 0, valid: false }],
        },
    },
    document: {
        normal: [{}],
        multiplier: [{}],
    },
    parcel: {
        normal: [{}],
        multiplier: [{}],
    },
    documentAndparcel: {
        normal: [{}],
        multiplier: [{}],
    }
})

const WeightAndRates = {
    namespaced: true,
    state: initialState,
    getters: {
        currentTab: ({ currentTab }) => currentTab,
        document: ({ document }) => document,
        parcel: ({ parcel }) => parcel,
        documentAndparcel: ({ documentAndparcel }) => documentAndparcel,
        rowValidations: ({ rowValidations }) => rowValidations,
        saveKey: ({ saveKey }) => saveKey,
    },
    mutations: {
        setCurrentTab(state, payload) {
            state.currentTab = payload
        },
        setDocumentRates(state, { key, value, idx }) {
            state.document[key][idx] = value
        },
        setParcelRates(state, { key, value, idx }) {
            state.parcel[key][idx] = value
        },
        setDocumentAndParcelRates(state, { key, value, idx }) {
            state.documentAndparcel[key][idx] = value
        },
        addRow(state, { tab, rate }) {
            state[tab][rate].push({})
        },
        removeRow(state, { tab, rate, idx }) {
            state[tab][rate].splice(idx, 1)
        },
        setRowValidations(state, { tab, rate, data }) {
            state.rowValidations[tab][rate] = data
        },
        setSaveKey(state) {
            state.saveKey++
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        setCurrentTab({ commit }, payload) {
            commit('setCurrentTab', payload)
        },
        setDocumentRates({ commit }, payload) {
            commit('setDocumentRates', payload)
        },
        setParcelRates({ commit }, payload) {
            commit('setParcelRates', payload)
        },
        setDocumentAndParcelRates({ commit }, payload) {
            commit('setDocumentAndParcelRates', payload)
        },
        addRow({ commit }, payload) {
            commit('addRow', payload)
        },
        removeRow({ commit }, payload) {
            commit('removeRow', payload)
        },
        setRowValidations({ commit }, payload) {
            commit('setRowValidations', payload)
        },
        setSaveKey({ commit }) {
            commit('setSaveKey')
        },
        resetData({ commit }) {
            commit('resetData')
        }
    },

};
export default WeightAndRates;
