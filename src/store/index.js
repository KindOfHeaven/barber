import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      steps: [
          { label: 'Choose the category', mobileText: 'Category' },
          { label: 'Choose the service', mobileText: 'Service' },
          { label: 'Choose the master', mobileText: 'Master' },
          { label: 'Confirm the appointment', mobileText: 'Confirm' },
      ],
      form: {
          name: '',
          phone: '',
          email: '',
          message: ''
      },
      thanks: false,
      activeStep: 0,
      activeCategory: null,
      activeService: [],
      activeMaster: null,
      activeDate: null,
      activeTime: null,
      categories: [
          {
              id: 101,
              image: require('@/assets/images/categories/category1.jpg'),
              image2x: require('@/assets/images/categories/category1@2x.jpg'),
              title: 'Hairdress',
              description: 'Toning, Haircut, etc.',
              sale: true,
              services: [
                  {
                      id: 201,
                      title: 'Toning',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '40',
                      price: '570—600',
                      image: require("@/assets/images/services/service1.jpg"),
                      image2x: require("@/assets/images/services/service1@2x.jpg"),
                  },
                  {
                      id: 202,
                      title: 'Haircut',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '25',
                      price: '230—250',
                      image: require("@/assets/images/services/service2.jpg"),
                      image2x: require("@/assets/images/services/service2@2x.jpg"),
                  },
                  {
                      id: 203,
                      title: 'Bald',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '15',
                      price: '175',
                      image: require("@/assets/images/services/service3.jpg"),
                      image2x: require("@/assets/images/services/service3@2x.jpg"),
                  }
              ],
              masters: [
                  {
                      id: 301,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 302,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 303,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 304,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 305,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 306,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  }
              ]
          },
          {
              id: 102,
              image: require('@/assets/images/categories/category2.jpg'),
              image2x: require('@/assets/images/categories/category2@2x.jpg'),
              title: 'Barber',
              description: 'Toning, Haircut, etc.',
              sale: false,
              services: [
                  {
                      id: 211,
                      title: 'Toning',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '40',
                      price: '570—600',
                      image: require("@/assets/images/services/service1.jpg"),
                      image2x: require("@/assets/images/services/service1@2x.jpg"),
                  },
                  {
                      id: 212,
                      title: 'Haircut',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '25',
                      price: '230—250',
                      image: require("@/assets/images/services/service2.jpg"),
                      image2x: require("@/assets/images/services/service2@2x.jpg"),
                  },
                  {
                      id: 213,
                      title: 'Bald',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '15',
                      price: '175',
                      image: require("@/assets/images/services/service3.jpg"),
                      image2x: require("@/assets/images/services/service3@2x.jpg"),
                  }
              ],
              masters: [
                  {
                      id: 311,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 312,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 313,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 314,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 315,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 316,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  }
              ]
          },
          {
              id: 103,
              image: require('@/assets/images/categories/category3.jpg'),
              image2x: require('@/assets/images/categories/category3@2x.jpg'),
              title: 'SPA',
              description: 'Black Mask, etc.',
              sale: false,
              services: [
                  {
                      id: 221,
                      title: 'Toning',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '40',
                      price: '570—600',
                      image: require("@/assets/images/services/service1.jpg"),
                      image2x: require("@/assets/images/services/service1@2x.jpg"),
                  },
                  {
                      id: 222,
                      title: 'Haircut',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '25',
                      price: '230—250',
                      image: require("@/assets/images/services/service2.jpg"),
                      image2x: require("@/assets/images/services/service2@2x.jpg"),
                  },
                  {
                      id: 223,
                      title: 'Bald',
                      description: 'Short description for the service. Sometimes it can fill more than 1 or 2 rows.',
                      time: '15',
                      price: '175',
                      image: require("@/assets/images/services/service3.jpg"),
                      image2x: require("@/assets/images/services/service3@2x.jpg"),
                  }
              ],
              masters: [
                  {
                      id: 321,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 322,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 323,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 324,
                      title: 'Andrew',
                      type: 'Hair stylist',
                      image: require("@/assets/images/masters/master1.jpg"),
                      image2x: require("@/assets/images/masters/master1@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 325,
                      title: 'Maximilian',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master2.jpg"),
                      image2x: require("@/assets/images/masters/master2@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  },
                  {
                      id: 326,
                      title: 'Arthur',
                      type: 'Barber',
                      image: require("@/assets/images/masters/master3.jpg"),
                      image2x: require("@/assets/images/masters/master3@2x.jpg"),
                      time: [
                          '9:25',
                          '11:20',
                          '12:35',
                          '13:45',
                          '17:00',
                          '18:45',
                          '19:45',
                          '20:30'
                      ]
                  }
              ]
          }
      ]
  },
  mutations: {
      CHANGESTEP (state, payload) {
          if (payload < 0 || payload > 4) {
              return 0
          }
          if (payload === 4) {
              state.thanks = true
          }
          state.activeStep = payload
      },
      CHOOSEDATE (state, payload) {
          state.activeDate = payload
      },
      CHANGEFORM (state, payload) {
          this.form = payload
      },
      CHOOSETIME (state, payload) {
          state.activeTime = payload
      },
      CHOOSECATEGORY (state, payload) {
          state.activeService = []
          state.activeMaster = null
          state.activeDate = null
          state.activeTime = null
          state.activeCategory = payload
      },
      CHOOSEMASTER (state, payload) {
          state.activeDate = null
          state.activeTime = null
          state.activeMaster = payload
      },
      CHOOSESERVICE (state, payload) {
          let index = -1;
          state.activeService.forEach((el, idx) => {
              if (el.title === payload.title) {
                  index = idx
              }
          })
          if (index === -1) {
              state.activeService.push(payload)
          } else {
              state.activeService.splice(index, 1)
          }
      }
  },
  actions: {
      chooseTime ({ commit }, payload) {
          commit('CHOOSETIME', payload)
      },
      chooseMaster ({ commit }, payload) {
          commit('CHOOSEMASTER', payload)
      },
      chooseCategory ({ commit }, payload) {
          commit('CHOOSECATEGORY', payload)
      },
      chooseService ({ commit }, payload) {
          commit('CHOOSESERVICE', payload)
      },
      chooseDate ({ commit }, payload) {
          commit('CHOOSEDATE', payload)
      },
      changeStep ({ commit }, payload) {
          commit('CHANGESTEP', payload)
      },
      changeForm ({ commit }, payload) {
          commit('CHANGEFORM', payload)
      }
  },
  modules: {
  }
})
