const { URL } = require("../../../../../../../config/const.js");
import axios from "axios";
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const Edit = {
    namespaced: true,
    state: {
        renderKey: 10,
        editData: null,
        expandedDialog: false,
        rateCard: null,
        local_edit: {
            type_id: '',
            type_id_2: '',
            type_id_3: '',
            currentTab: '',
            normal_bike_rates: false,
            normal_bike_trips: false,
            normal_bike_jobs: false,
            normal_van_rates: false,
            normal_van_trips: false,
            normal_van_twotier: false,
            normal_van_twotier_w: false,
            normal_van_twotier_q: false,
            normal_van_multi: false,
            normal_van_multi_q: false,
            normal_van_multi_j: false,
            normal_van_box: false,
            e_delivery_type_b: false,
            e_delivery_type_v: false,
            surcharges: false,
            add_surcharges: false
        },
        imp_edit: {
            type_id: '',
            currentTab: '',
            zone: false,
            document_n: false,
            document_m: false,
            parcel_n: false,
            parcel_m: false,
            document_parcel_n: false,
            document_parcel_m: false,
            emergency_n: false,
            emergency_m: false,
            restricted_charges_n: false,
            restricted_charges_m: false,
            restricted_charges_bsm: false,
            overweight_charges: false,
            remote_area_charges_n: false,
            remote_area_charges_m: false,
            add_surcharges: false,
        },
        transitDays: {
            displayDocumentDialog: false,
            displayParcelDialog: false,
            editData: null,
        },
        fuelCharges: {
            displayFuelChargeDialog: false,
            editData: null,
        }
    },
    getters: {
        transitDays: ({ transitDays }) => transitDays,
        fuelCharges: ({ fuelCharges }) => fuelCharges,
        imp_edit: ({ imp_edit }) => imp_edit,
        local_edit: ({ local_edit }) => local_edit,
        renderKey: ({ renderKey }) => renderKey,
        rateCard: ({ rateCard }) => rateCard,
        editData: ({ editData }) => editData,
        expandedDialog: ({ expandedDialog }) => expandedDialog,
    },
    mutations: {
        setTransitDaysDialog(state, { type, data }) {
            state.transitDays[type] = data

            if (!data) {
                state.transitDays.editData = null
            }
        },
        setFuelChargeDialog(state, payload) {
            state.fuelCharges.displayFuelChargeDialog = payload

            if (!payload) {
                state.fuelCharges.editData = null
            }
        },
        setFuelChargeEdit(state, payload) {
            state.fuelCharges.editData = payload
        },
        setTransitDaysEdit(state, payload) {
            state.transitDays.editData = payload
        },
        setCurrentTab(state, { edit, data }) {
            state[edit].currentTab = data
        },
        setRenderKey(state) {
            state.renderKey++
        },
        toggleDialog(state, { edit, type, data }) {
            state[edit][type] = data
            if (!data) {
                state.editData = null
            }
        },
        setExpandedDialog(state, payload) {
            state.expandedDialog = payload


            if (!payload) {
                state.editData = null
            }
        },
        setEditData(state, payload) {
            state.editData = payload
        },
        setTypeId(state, { type, data, name }) {
            if (name === 'expanded') {
                state[type].type_id_2 = data
            } else if (name === 'expanded_2') {
                state[type].type_id_3 = data
            } else {
                state[type].type_id = data
            }
        }
    },
    actions: {
        setTransitDaysDialog({ commit }, payload) {
            commit('setTransitDaysDialog', payload)
        },
        setFuelChargeDialog({ commit }, payload) {
            commit('setFuelChargeDialog', payload)
        },
        setTransitDaysEdit({ commit }, payload) {
            commit('setTransitDaysEdit', payload)
        },
        setFuelChargeEdit({ commit }, payload) {
            commit('setFuelChargeEdit', payload)
        },
        setCurrentTab({ commit }, payload) {
            commit('setCurrentTab', payload)
        },
        setExpandedDialog({ commit }, payload) {
            commit('setExpandedDialog', payload)
        },
        setRenderKey({ commit }) {
            commit('setRenderKey')
        },
        toggleDialog({ commit }, payload) {
            commit('toggleDialog', payload)
        },
        setEditData({ commit }, payload) {
            commit('setEditData', payload)
        },
        setTypeId({ commit }, payload) {
            commit('setTypeId', payload)
        },
        async postFuelCharges(_, payload) {
            await axios.post('/settings/sales/rates/international/outbound/fuelcharges', payload)
        },
        async editFuelCharges(_, { id, data }) {
            await axios.patch('/settings/sales/rates/international/outbound/fuelcharges/' + id, data)
        },
        async deleteFuelCharges(_, payload) {
            await axios.delete('/settings/sales/rates/international/outbound/fuelcharges/'+ payload)
        },
        async getFuelCharges(_, id) {
            return await axios.get('/settings/sales/rates/international/outbound/fuelcharges/' + id)
        },
        async getTransitDays(_, { id, type }) {
            return await axios.get(`settings/sales/rates/international/outbound/transitdays/${id}?type=${type}`)
        },
        async postTransitDays(_, payload) {
            return await axios.post('settings/sales/rates/international/outbound/transitdays', payload)
        },
        async deleteTransitDays(_, id) {
            return await axios.delete('/settings/sales/rates/international/outbound/transitdays/' + id)
        },
        async editTransitDays(_, { id, data }) {
            return await axios.patch('settings/sales/rates/international/outbound/transitdays/' + id, data)
        },
        async getRateCardDetails(_, { id, type }) {
            return await axios.get(`/settings/sales/rates/international/outbound/ratecards/${id}?type=${type}`)
        },

        // zone
        async deletZoneCard(_, id) {
            await axios.delete('/settings/sales/rates/international/outbound/ratecards/import/zone/' + id)
        },
        async disableZonecard(_, { id, data }) {
            await axios.patch('/settings/sales/rates/international/outbound/ratecards/import/zone/status/' + id, data)
        },
        async editZoneCard(_, { id, data }) {
            await axios.patch('/settings/sales/rates/international/outbound/ratecards/import/zones/' + id, data)
        },

        // weights
        async deleteWeight(_, { type, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/${type}/weights/`, data)
        },
        async editWeight(_, { type, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/${type}/weight/`, data)
        },

        // surcharges

        // Emergency charges
        async postEmergencyCharges(_, { type, data }) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/import/${type}/emergency/surcharges/`, data)
        },
        async deleteEmergencyCharges(_, { type, id }) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/import/${type}/emergency/surcharges/` + id)
        },
        async editEmergencyCharges(_, { type, id, data }) {
            console.log(type, 'type');
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/${type}/emergency/surcharges/` + id, data)
        },

        // Restricted country charges
        async postRestrictedcharges(_, { type, data }) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/import/${type}/restricted/country/surcharges`, data)
        },
        async deleteRestrictedcharges(_, { type, id }) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/import/${type}/restricted/country/surcharges/` + id)
        },
        async editRestrictedcharges(_, { type, id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/${type}/restricted/country/surcharges/` + id, data)
        },

        // Overweight charges
        async postOverweightCharge(_, { data }) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/import/over/weight/surcharges/`, data)
        },
        async deleteOverweightCharge(_, { id }) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/import/over/weight/surcharges/` + id)
        },
        async editOverweightCharge(_, { id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/over/weight/surcharges/` + id, data)
        },

        // Remotearea charges
        async postRemoteareaCharges(_, { type, data }) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/import/${type}/remote/area/surcharges`, data)
        },
        async deleteRemoteareaCharges(_, { type, id }) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/import/${type}/remote/area/surcharges/` + id)
        },
        async editRemoteareaCharges(_, { type, id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/import/${type}/remote/area/surcharges/` + id, data)
        },
        // async updateStatusRemoteareaCharges(_, { type, id, data }) {
        //     await axios.patch(`settings/sales/rates/international/outbound/ratecards/import/normal/remote/area/surcharge/status/` + id, data)
        // },

        // add surcharge
        async postAddsurcharge(_, { data }) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/import/additional/surcharges`, data)
        },
        async deleteAddsurcharge(_, { id }) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/import/additional/surcharges/` + id)
        },
        async editAddsurcharge(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/import/additional/surcharges/` + id, data)
        },

        // local edit flow
        // normal/bike
        async postRate(_, data) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/local/normal/rates`, data)
        },
        async editRate(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/normal/rates/` + id, data)
        },
        async deleteRate(_, payload) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/normal/rates/` + payload)
        },


        // normal/job
        async editBikeJob(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/normal/bike/` + id, data)
        },

        async updateTrips(_, payload) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/local/normal/trips`, payload)
        },

        async deleteTrips(_, id) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/normal/trips/` + id)
        },

        // surcharges
        async editLocalSurcharge(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/surcharges/` + id, data)
        },

        // add_surcharge
        async postAddSurcharge(_, data) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/local/additional/surcharges`, data)
        },
        async editAddSurcharge(_, { id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/local/additional/surcharges/` + id, data)
        },
        async deletetAddSurcharge(_, payload) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/local/additional/surcharges/` + payload)
        },

        // two_tier
        async editChargeByWeight(_, { id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/local/normal/van/weight/` + id, data)
        },
        async editChargeByQty(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/normal/van/quantity/` + id, data)
        },
        async addBoxRates(_, payload) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/local/normal/van/twotire/quantity/rates` + payload)
        },
        async editBoxRates(_, { id, data }) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/normal/van/twotire/quantity/rates/` + id + data)
        },
        async deleteBoxRates(_, id) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/normal/van/twotire/quantity/rates/` + id)
        },

        async editChargeByQtyMultiTier(_, { id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/quantity/rates/` + id, data)
        },
        async addChargeByQtyMultiTier(_, payload) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/quantity/rates/`, payload)
        },
        async deleteChargeByQtyMultiTier(_, id) {
            await axios.delete(`/settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/quantity/rates/` + id)
        },

        // job count
        async editJobcountMultiTier(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/jobcount/` + id, data)
        },
        async addJobcountMultiTier(_, payload) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/jobcount`, payload)
        },
        async deleteJobcountMultiTier(_, id) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/normal/van/multitire/jobcount/` + id)
        },

        // van job
        async editNormalVanJob(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/normal/van/` + id, data)
        },

        // Ecommerce
        async editDeliveryType(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/` + id, data)
        },
        async deleteDelieryType(_, id) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/` + id)
        },
        async addDelieryType(_, payload) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/`, payload)
        },

        // vanjob
        async editEBikeVanJob(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytypes/bikejob/` + id, data)
        },

        async editBikeDtRates(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytyperates/` + id, data)
        },
        async deleteBikeDtRates(_, id) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/deliverytyperates/` + id)
        },
        async postBikeDtRates(_, payload) {
            await axios.post(`settings/sales/rates/international/outbound/ratecards/local/deliverytyperates`, payload)
        },

        async editBikeCustomerVan(_, { id, data }) {
            await axios.patch(`/settings/sales/rates/international/outbound/ratecards/local/deliverytype/bikejob/` + id, data)
        },

        async edtiEcommerceChargeByWeight(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytypes/weight/` + id, data)
        },

        async edtiEcommerceChargeByQty(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytypes/quantity/` + id, data)
        },

        async editVanCustomerJob(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/vanjob/` + id, data)
        },

        async postEcommerceBoxCount(_, data) {
            await axios.post(`/settings/sales/rates/international/outbound/ratecards/local/deliverytype/quantity/rates`, data)
        },
        async editEcommerceBoxCount(_, { id, data }) {
            await axios.patch(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/quantity/rates/` + id, data)
        },
        async deleteEcommerceBoxCount(_, payload) {
            await axios.delete(`settings/sales/rates/international/outbound/ratecards/local/deliverytype/quantity/rates/` + payload)
        },
    },

};
export default Edit;
