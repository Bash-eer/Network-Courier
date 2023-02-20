const initialState = () => ({
    bike: {
        delivery_type: [
            { rates: [{}], bike_customer_van_job: {} }
        ]
    },
    van: {
        delivery_type: [
            {
                rates: [{}],
                van_customer_bike_job: {}, charge_by_weight: {},
                charge_by_quantity: { box_count_charges: [{}] }
            }
        ]
    },
    validations: {
        van: {
            van_customer_bike_job: { valid: false },
            box_count_charges: [{ id: 0, valid: false }],
            rates: [{ id: 0, valid: false }],
            delivery_type: [{ id: 0, valid: false }]
        },
        bike: {
            rates: [{ id: 0, valid: false }],
            delivery_type: [{ id: 0, valid: false }]
        },
    }
})

const Ecommerce = {
    namespaced: true,
    state: initialState,
    getters: {
        bike: ({ bike }) => bike,
        van: ({ van }) => van,
        validations: ({ validations }) => validations,
    },
    mutations: {
        AddBikeDelivery(state) {
            state.bike.delivery_type.push(
                { rates: [{}], bike_customer_van_job: {} }
            )
        },
        removeBikeDelivery(state, payload) {
            state.bike.delivery_type.splice(payload, 1)
        },
        AddVanDelivery(state) {
            state.van.delivery_type.push(
                {
                    rates: [{}],
                    van_customer_bike_job: {}, charge_by_weight: {},
                    charge_by_quantity: { box_count_charges: [{}] }
                }
            )
        },
        removeVanDelivery(state, payload) {
            state.van.delivery_type.splice(payload, 1)
        },
        AddRates(state, { type, idx }) {
            state[type].delivery_type[idx].rates.push({})
        },
        removeRates(state, { type, idx, ratesIdx }) {
            state[type].delivery_type[idx].rates.splice(ratesIdx, 1)
        },
        AddBoxCount(state, payload) {
            state.van.delivery_type[payload].charge_by_quantity.box_count_charges.push({})
        },
        removeBoxCount(state, { idx, boxIdx }) {
            state.van.delivery_type[idx].charge_by_quantity.box_count_charges.splice(boxIdx, 1)
        },
        setBikeDeliveryData(state, { type, data, idx, ratesIdx, otherField }) {
            if (type == 'rates' && ratesIdx >= 0) {
                state.bike.delivery_type[idx].rates[ratesIdx] = data
                return
            } else if (type == 'bike_customer_van_job') {
                state.bike.delivery_type[idx].bike_customer_van_job = data
                return
            } else if (type == 'other') {
                state.bike.delivery_type[idx][otherField] = data
                return
            } else {
                for (const [key, value] of Object.entries(data)) {
                    state.bike.delivery_type[idx][key] = value
                }
                return
            }
        },
        setVanDeliveryData(state, { type, data, idx, ratesIdx, otherField, chargeType, boxIdx }) {
            if (type == 'rates' && ratesIdx >= 0) {
                state.van.delivery_type[idx].rates[ratesIdx] = data
                return
            } else if (type == 'van_customer_bike_job') {
                state.van.delivery_type[idx].van_customer_bike_job = data
                return
            } else if (type == 'other') {
                state.van.delivery_type[idx][otherField] = data
                return
            } else if (chargeType == 'charge_by_weight') {
                state.van.delivery_type[idx].charge_by_weight = data
            } else if (chargeType == 'charge_by_quantity' && boxIdx == -1) {
                for (const [key, value] of Object.entries(data)) {
                    state.van.delivery_type[idx].charge_by_quantity[key] = value
                }
                return
            } else if (chargeType == 'charge_by_quantity' && boxIdx >= 0) {
                state.van.delivery_type[idx].charge_by_quantity.box_count_charges[boxIdx] = data
                return
            } else {
                for (const [key, value] of Object.entries(data)) {
                    state.van.delivery_type[idx][key] = value
                }
                return
            }
        },
        setValidations(state, { tab, type, data }) {
            state.validations[tab][type] = data
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        AddBikeDelivery({ commit }, payload) {
            commit('AddBikeDelivery', payload)
        },
        removeBikeDelivery({ commit }, payload) {
            commit('removeBikeDelivery', payload)
        },
        AddVanDelivery({ commit }, payload) {
            commit('AddVanDelivery', payload)
        },
        removeVanDelivery({ commit }, payload) {
            commit('removeVanDelivery', payload)
        },
        AddRates({ commit }, payload) {
            commit('AddRates', payload)
        },
        removeRates({ commit }, payload) {
            commit('removeRates', payload)
        },
        AddBoxCount({ commit }, payload) {
            commit('AddBoxCount', payload)
        },
        removeBoxCount({ commit }, payload) {
            commit('removeBoxCount', payload)
        },
        setBikeDeliveryData({ commit }, payload) {
            commit('setBikeDeliveryData', payload)
        },
        setVanDeliveryData({ commit }, payload) {
            commit('setVanDeliveryData', payload)
        },
        setValidations({ commit }, payload) {
            commit('setValidations', payload)
        },
        resetData({ commit }) {
            commit('resetData')
        }
    },

};
export default Ecommerce;
