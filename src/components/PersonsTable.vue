<template>
  <v-container>
    <v-row>
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="persons"
            :search="search"
            sort-by="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>My contacts</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="primary" depressed @click="addPerson">Add</v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" small @click="editPerson(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deletePerson(item.id)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-dialog v-model="editingFlag" persistent max-width="600px">
        <PersonEditForm
          :editingPerson="editingPerson"
          @closeEditingForm="closeForm"
        />
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../store/types";
import Person from "../models/Person";
import PersonEditForm from "../components/PersonEditForm";

export default {
  components: {
    PersonEditForm,
  },
  data() {
    return {
      editingPerson: new Person(),
      editingFlag: false,
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
          width: 75
        },
        { text: "Name", value: "name", align: "center" },
        { text: "Age", value: "age", align: "center", width: 75 },
        { text: "Phone", value: "phone", align: "center" },
        { text: "Email", value: "email", align: "center" },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center",
          width: 230,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      persons: types.GET_PERSONS,
    }),
  },
  methods: {
    closeForm() {
      this.editingFlag = false;
      this.editingPerson = new Person();
    },
    editPerson(person) {
      this.editingPerson = JSON.parse(JSON.stringify(person));
      this.editingFlag = true;
    },
    addPerson() {
      this.editingPerson = new Person();
      this.editingFlag = true;
    },
    deletePerson(id) {
      this.$store.dispatch(types.DELETE_PERSON, id);
    },
  },
  created() {
    this.$store.dispatch(types.PULL_PERSONS);
  },
};
</script>