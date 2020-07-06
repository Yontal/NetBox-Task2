import Vue from 'vue'
import Vuex from 'vuex'
import Person from '../models/Person';
import * as types from '../store/types';
import * as API from '../helpers/API';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    persons: [],
  },
  mutations: {
    [types.MUTATE_PERSONS]: (state, payload) => {
      state.persons = payload;
    }
  },
  actions: {
    [types.PULL_PERSONS]: ({commit}) => {
      let parcedPersons = [];
      API.pullPersons()
        .then(res => {
          res.forEach(element => {
            let person = new Person();
            element.forEach(field => {
              switch(field.field){
                case 'ID':
                  person.id = field.value;
                  break;
                case 'Name':
                  person.name = field.value;
                  break;
                case 'Age':
                  person.age = field.value;
                  break;
                case 'Phone':
                  person.phone = field.value;
                  break;
                case 'E-mail':
                  person.email = field.value;
                  break;
              }
            })
            parcedPersons.push(person);
          });
          commit(types.MUTATE_PERSONS, parcedPersons);
        })
        .catch(err => console.log(err))
    },
    [types.UPDATE_PERSON]: ({commit, state}, payload) => {
      API.updatePerson(payload)
        .then(res => {
          if(res.result === "ok"){
            let updatedPersons = state.persons.map(person => {
              if(person.id === payload.id){
                return payload;
              } else {
                return person;
              }
            })
            commit(types.MUTATE_PERSONS, updatedPersons);     
          }
        })
        .catch(err => console.log(err));
    },
    [types.ADD_PERSON]: ({commit, state}, payload) => {
      API.addPerson(payload)
        .then(res => {
          if(res.result === "ok"){
            let newId = null;
            state.persons.forEach(element => {
              if(element.id > newId){newId = element.id}
            });
            payload.id = newId + 1;
            let updatedPersons = state.persons.concat(payload);
            commit(types.MUTATE_PERSONS, updatedPersons);
            }     
        })
        .catch(err => console.log(err));
    },
    [types.DELETE_PERSON]:({commit, state}, payload) => {
      API.deletePersonById(payload)
        .then(res => {
          if(res.result === "ok"){
            let updatedPersons = state.persons.filter(person => {return person.id !== payload});
            commit(types.MUTATE_PERSONS, updatedPersons);
          }
        })
        .catch(err => console.log(err));
    }
  },
  
  getters: {
    [types.GET_PERSONS]: state => {
      return state.persons;
    }
  }
})
