const initialState = () => ({
    saveKey: 10,
    data: [{}]
})

const AddSurcharges = {
    namespaced: true,
    state: initialState,
    getters: {
        saveKey: ({ saveKey }) => saveKey,
        data: ({ data }) => data,
    },
    mutations: {
        setData(state, { idx, data }) {
            state.data[idx] = data
        },
        addRow(state) {
            state.data.push({})
        },
        removeRow(state, idx) {
            state.data.splice(idx, 1)
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
        addRow({ commit }, payload) {
            commit('addRow', payload)
        },
        removeRow({ commit }, payload) {
            commit('removeRow', payload)
        },
        setSaveKey({ commit }) {
            commit('setSaveKey')
        },
        setData({ commit }, payload) {
            commit('setData', payload)
        },
        resetData({ commit }) {
            commit('resetData')
        }
    },

};
export default AddSurcharges;
