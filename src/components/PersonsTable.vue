<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" @click="sortUp('id')">ID</th>
                    <th scope="col" @click="sortUp('name')">Name</th>
                    <th scope="col" @click="sortUp('age')">Age</th>
                    <th scope="col" @click="sortUp('phone')">Phone</th>
                    <th scope="col" @click="sortUp('email')">Email</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person, key) in persons" :key="key">
                    <td>
                        {{ person.id }}
                    <td>
                        {{ editingPerson.id === person.id ? '' : person.name }}
                        <input 
                            v-if="editingPerson.id === person.id"
                            v-model="editingPerson.name" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type name" >
                    </td>
                    <td>
                        {{ editingPerson.id === person.id ? '' : person.age }}
                        <input 
                            v-if="editingPerson.id === person.id"
                            v-model="editingPerson.age" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type age">
                    </td>
                    <td>
                        {{ editingPerson.id === person.id ? '' : person.phone }}
                        <input 
                            v-if="editingPerson.id === person.id"
                            v-model="editingPerson.phone" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type phone">
                    </td>
                    <td>
                        {{ editingPerson.id === person.id ? '' : person.email }}
                        <input 
                            v-if="editingPerson.id === person.id"
                            v-model="editingPerson.email" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type email">
                    </td>
                    <td>
                        <button v-if="!editingFlag" @click="editPerson(person)" type="button" class="btn btn-warning btn-sm" >Edit</button>
                        <button v-if="editingPerson.id === person.id && editingPerson.id === person.id" @click="updatePerson" type="button" class="btn btn-success btn-sm">Save</button>
                        <button v-if="!editingFlag" @click="deletePerson(person.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
                    </td> 
                </tr>
                <tr v-if="addNewPersonFlag">
                    <td>
                        
                    <td>
                        <input 
                            v-model="editingPerson.name" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type name" >
                    </td>
                    <td>
                        <input 
                            v-model="editingPerson.age" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type age">
                    </td>
                    <td>
                        <input 
                            v-model="editingPerson.phone" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type phone">
                    </td>
                    <td>
                        <input 
                            v-model="editingPerson.email" 
                            class="form-control" 
                            type="text" 
                            placeholder="Type email">
                    </td>
                    <td>
                        <button v-if="addNewPersonFlag" @click="addPerson" type="button" class="btn btn-success btn-sm">Save</button>
                    </td> 
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-primary btn-sm" @click="addNewPersonFlag = editingFlag = true" v-if="!addNewPersonFlag && !editingFlag">Add line</button>
        <div class="alert alert-danger" v-for="(error, key) in errorMessages" :key="key" role="alert">
            {{ error }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../store/types';
import Person from '../models/Person';

export default {
    data(){
        return{
            editingPerson: new Person(),
            editingFlag: false,
            addNewPersonFlag: false,
            errorMessages: []
        }
    },
    computed:{
        ...mapGetters({
            persons: types.GET_PERSONS
        })
    },
    methods:{
        editPerson(person){
            this.editingPerson = JSON.parse(JSON.stringify(person));
            this.editingFlag = true;
        },
        updatePerson(){
            this.errorMessages = [];
            this.checkInput();
            if(this.errorMessages.length === 0){
                this.$store.dispatch(types.UPDATE_PERSON, this.editingPerson);
                this.editingPerson = new Person();
                this.editingFlag = false;
            }
        },
        addPerson(){
            this.errorMessages = [];
            this.checkInput();
            if(this.errorMessages.length === 0){
                this.$store.dispatch(types.ADD_PERSON, this.editingPerson);
                this.editingPerson = new Person();
                this.editingFlag = false;
                this.addNewPersonFlag = false;
            }
        },
        deletePerson(id){
            this.$store.dispatch(types.DELETE_PERSON, id);
        },
        checkInput(){
            if(!this.editingPerson.name){this.errorMessages.push('Please type name')}
            if(!this.editingPerson.age){this.errorMessages.push('Please type age')}  
            if(!this.editingPerson.phone){this.errorMessages.push('Please type phone')}  
            if(!this.editingPerson.email){this.errorMessages.push('Please type email')}      
        },
        sortUp(field){
            this.persons.sort((a,b) => {
                if (a[field] > b[field]) return 1;
                if (a[field] == b[field]) return 0;
                if (a[field] < b[field]) return -1;
            })
        }
    },
    created(){
        this.$store.dispatch(types.PULL_PERSONS);
    }    
}
</script>

<style scoped>
table {
    text-align: center;
}
td {
    vertical-align: middle;
}
button {
    width: 75px;
    margin: 5px;
}
th {
    cursor: pointer;
}
</style>