/* eslint-disable camelcase */
import { endpoints } from '../../../components/Settings/Sales/Express/Contract/Constants/endpoint';
/* eslint-disable-next-line no-unused-vars */
import axios from "axios";

const express = {
  namespaced: true,
  state: {
      regions: [],
      renderKeys:0,
      commonCreate:0,
      stepChangeData:0,
      stepChange:0,
      ratesStep: 1,
      norBikeNew:0,
      new1:0,
      new2:0,
      new3:0,
      new:0,
      norVanTabDel:0,
      norBikeTabData:0,
      norMultiJobTabData:0,
      norMultiQuantityTabData:0,
      norVanTabData:0,
      norBikeTripDel:0,
      tier2Tab:'Quantity',
      multiTierTab:'Quantity',
      newKey:0,
      currentIndex:0,
      tripBikeTableData:[],
      tripVanTableData:[],
      rateCards:[],
      normalRegionId:null,
      bikeCusVanJobData:null,
      createRateCard:{},
      regionRatesById:[],
      bikeTripsDatas:null,
      bikeRatesData:null,
      addRateCardNameError:null,
      rateCardId:null,
      additionalSurchargesData:null,
      surchargesData:null,
      deleteAddlSurCgs:false,
      deleteNorBiRates:false,
      deleteNorBiTrips:false,
      deleteNorVanRates:false,
      deleteNorVanTrips:false,
      deliveryId:null,
      vanDeliveryId:null,
      quantityBoxChargesId:null,
      bikeTripsData:null,
     
      
     
  },
  getters: {
      regions: ({ regions }) => regions,
      stepChangeData: ({ stepChangeData }) => stepChangeData,
    
  },
  mutations: {
    setRegions(state, payload) {
          state.regions = payload
      },
      setTripBikeGrid(state, tripBikeTableData) {
        state.tripBikeTableData = tripBikeTableData
        state.renderKeys++;
    },
    setRateId(state, rateCardId) {
      state.rateCardId = rateCardId
  },
    setTripVanGrid(state, tripVanTableData) {
      state.tripVanTableData = tripVanTableData
      state.renderKeys++;
  },
  setRegionRatesById(state, regionRatesById) {
    state.regionRatesById = regionRatesById
    state.renderKeys++;
},
  setRateCards(state, rateCards) {
    state.rateCards = rateCards
    state.renderKeys++;
},
addRateCardNameErrorMutation(state, error) {
  state.addRateCardNameError = error;
},
   setCurrentSteps(state, currStep){
      state.ratesStep = currStep
    },
    clearTripData(state){
      state.tripBikeTableData = []
      state.tripVanTableData = []
    }
  },
  actions: {
    getRateCards({ commit }) {
      return axios.get(`${endpoints.RATECARD}`).then((res) => {
        if(res.data){
        commit('setRateCards', res.data.results);
        }
        for (let i = 0; i < res.data.results.length; i++) {
          let r_obj = res.data.results[i];

          r_obj["sno"] = i + 1;
          r_obj["createdAt"]=new Date(res.data.results[i].createdAt);
        }
        for (let c in res.data.results) {
          res.data.results[c]["created_by"] =
            res.data.results[c]["user"]["display_name"];

          res.data.results[c]["rate_cards_count"] =
            res.data.results[c]["rate_cards"].length;
        }
       
       // return res.data.data;
      });
    },
    getRegions({ commit }) {
      return axios.get(`${endpoints.REGIONSDROPDOWN}`).then((res) => {
        if(res.data){
        commit('setRegions', res.data.results);
        }
       // return res.data.data;
      });
    },
    getTripBikeGrid({ commit }, regionsId) {
  
      return axios.get(`${endpoints.TRIPSBIKEGRID}/${regionsId}`).then((res) => {
        if(res.data){
          commit('setTripBikeGrid', res.data.results);
        }
        });
    },  
    getTripVanGrid({ commit }, regionsId) {
     
         return axios.get(`${endpoints.TRIPSVANGRID}/${regionsId}`).then((res) => {
          if(res.data){
             commit('setTripVanGrid', res.data.results);
          }
           });
       }, 
       getRegionRatesById({ commit }, regionsId) {
      
           return axios.get(`${endpoints.REGIONRATES}/${regionsId}`).then((res) => {
           if(res.data){
               commit('setRegionRatesById', res.data.results);
           }
               for (let i = 0; i < res.data.results.length; i++) {
                let r_obj = res.data.results[i];
      
                r_obj["s_no"] = i + 1;
              }
            
             
             });
         },
         
         updateAddlSurcharge({ dispatch,state },formData) {
      
             return axios
               .patch(`${endpoints.ADDITIONALSURCHARGES}/${formData.id}`, {
                
                ...formData,
               })
               .then(() => {
                dispatch('getRegionRatesById',state.rateCardId)
               });
           },
           addAddlSurcharge({ dispatch,state },formData) {
      console.log(state,"state")
            return axios
              .post(`${endpoints.ADDITIONALSURCHARGES}`, {
               
               ...formData,
              })
              .then(() => {
                dispatch('getRegionRatesById',state.rateCardId)
              });
          },
           updateSurcharge({ dispatch,state },formData) {
           
               return axios
                 .patch(`${endpoints.SURCHARGES}/${formData.id}`, {
                  
                  ...formData,
                 })
                 .then(() => {
                  dispatch('getRegionRatesById',state.rateCardId)
                 });
             },
             createNormalBikeTrips({ dispatch,state },formData) {
      
              return axios
                .patch(`${endpoints.CREATENORMALBIKETRIPS}`, {
                 ...formData,
                })
                .then((res) => {
                  dispatch('getRegionRatesById',state.rateCardId)
                  return res;
                });
            },
            createNormalVanTrips({ dispatch,state },formData) {
      
              return axios
                .patch(`${endpoints.CREATENORMALVANTRIPS}`, {
                 
                 ...formData,
                })
                .then(() => {
                  dispatch('getRegionRatesById',state.rateCardId)
                });
            },  
             updateBikeRateTrips({ dispatch,state },formData) {
            
                 return axios
                   .patch(`${endpoints.BIKERATETRIPS}/${formData.id}`, {
                    
                    ...formData,
                   })
                   .then(() => {
                    dispatch('getRegionRatesById',state.rateCardId)
                   });
               },
              
               updateBikeRateRates({ dispatch,state },formData) {
              
                   return axios
                     .patch(`${endpoints. BIKERATERATES}/${formData.id}`, {
                      
                      ...formData,
                     })
                     .then(() => {
                      dispatch('getRegionRatesById',state.rateCardId)
                     });
                 },
                 updateBikeCusVanJob
                 ({ dispatch,state },formData) {
                 
                     return axios
                       .patch(`${endpoints. BIKECUSVANJOB}/${formData.id}`, {
                        
                        ...formData,
                       })
                       .then(() => {
                        dispatch('getRegionRatesById',state.rateCardId)
                       });
                   },
     
      createRateCard({ dispatch }, rateCard) {
      
        return axios.post(`${endpoints.CREATERATECARD}`, {...rateCard}).then(() => {
        
          dispatch('getRateCards');
        });
      },
      setRateCardNameError({commit}, {error}) {
        commit("addRateCardNameErrorMutation", error);
      },
      deleteAddlSurcharge({ dispatch,state }, formData) {
    
        return axios
          .delete(`${endpoints.DELETEADDLSURCHARGE}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteNormalVanTrips({ dispatch,state }, formData) {
    
        return axios
          .delete(`${endpoints.DELETENORMALVANTRIPS}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteNormalBikeRates({ dispatch,state }, formData) {
      
        return axios
          .delete(`${endpoints.DELETENORMALBIKERATES}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteNormalBikeTrips({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETENORMALBIKETRIPS}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteEcomBikeRates({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEECOMBIKERATES}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },  
      deleteEcomDelivery({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEECOMMERCEDELIVERY}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },
      createNormalBikeRates({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATENORMALBIKERATES}`, {
           
           ...formData,
          })
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId)
          });
      }, 
      createEcomBikeRates({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEECOMBIKERATES}`, {
           
           ...formData,
          })
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId)
          });
      },
      createNormalVanRates({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATENORMALVANRATES}`, {
           
           ...formData,
          })
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId)
          });
      },
      createMultiTierVanJob({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEMULTITIERVANJOB}`, {
           
           ...formData,
          })
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId)
          });
      },
      createEcommerceDelivery({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEECOMMERCEDELIVERY}`, {
           
           ...formData,
          })
          .then(() => {
           dispatch('getRegionRatesById',state.rateCardId);
          });
      },   
      createEcommercVanQuantity({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEECOMVANQUANTITY}`, {
           
           ...formData,
          })
          .then(() => {
           dispatch('getRegionRatesById',state.rateCardId);
          });
      },
      createEcommerceVanDelivery({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEECOMMERCEVANDELIVERY}`, {
           
           ...formData,
          })
          .then(() => {
           dispatch('getRegionRatesById',state.rateCardId);
          });
      },  
      createEcommerceVanRates({ dispatch,state },formData) {
        return axios
          .post(`${endpoints.CREATEECOMVANRATES}`, {
           
           ...formData,
          })
          .then(() => {
           dispatch('getRegionRatesById',state.rateCardId);
          });
      },
      createMultiTierQuantity({ dispatch,state },formData) {
      
        return axios
          .post(`${endpoints.CREATEMULTITIERQUANTITY}`, {
           
           ...formData,
          })
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId)
          });
      },
      deleteNormalVanRates({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETENORMALVANRATES}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },     
      deleteEcomVanDelivery({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEECOMVANDELIVERY}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },
      deleteEcomVanRates({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEECOMVANDELIVERYRATES}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteEcomVanQuantity({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEECOMVANQUANTITYBOXES}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },

      deleteMultiTierQuantity({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEMULTITIERQUANTITY}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      }, 
      deleteMultiTierVanJob({ dispatch,state }, formData) {
       
        return axios
          .delete(`${endpoints.DELETEMULTITIERVANJOB}/${formData.id}`)
          .then(() => {
            dispatch('getRegionRatesById',state.rateCardId);
           });
      },
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
              commit("toastMutation", toastData.toastSuccessData);
              dispatch(loadData.loadApi, {
                path: loadData.loadPath,
                mutation: loadData.loadMutation,
              });
            }
          })
          .catch((err) => {
            toastData.toastErrorData.toastMsg = err.response.data.message;
            commit("toastMutation", toastData.toastErrorData);
          });
      },
      setCurrentStep({commit}, payload){
        commit('setCurrentSteps', payload)
      },
      clearAddRateTable({commit}){
        commit('clearTripData')
      }
    
   
  },
}
export default express;