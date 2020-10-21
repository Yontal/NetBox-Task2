<template>
  <v-card>
    <v-card-title>
      <span class="headline">Contact</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Name" v-model="person.name" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Age" type="number" v-model="person.age" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Phone" v-model="person.phone" :rules="[rules.required]" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Email"
                v-model="person.email"
                :rules="rules.emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <small>All fields are required</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeForm"> Close </v-btn>
      <v-btn color="blue darken-1" text @click="save" :disabled="!valid">
        {{ editingPerson.id ? "Save" : "Add" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Person from "../models/Person";
import * as types from "../store/types";
export default {
  props: ["editingPerson"],
  data() {
    return {
      person: new Person("", "", "", "", ""),
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  created() {
    this.refreshPerson();
  },
  watch: {
    editingPerson: function (ov, nv) {
      this.refreshPerson();
    },
  },
  methods: {
    closeForm() {
      this.person = new Person("", "", "", "", "");
      this.$refs.form.resetValidation();
      this.$emit("closeEditingForm");
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.editingPerson.id) {
          this.$store.dispatch(types.UPDATE_PERSON, this.person);
        } else {
          this.$store.dispatch(types.ADD_PERSON, this.person);
        }
        this.person = new Person("", "", "", "", "");
        this.$refs.form.resetValidation();
        this.$emit("closeEditingForm");
      } else {
        return;
      }
    },
    refreshPerson() {
      if (this.editingPerson.id) {
        this.person.id = this.editingPerson.id;
        if (this.editingPerson.name) {
          this.person.name = this.editingPerson.name;
        }
        if (this.editingPerson.age) {
          this.person.age = this.editingPerson.age;
        }
        if (this.editingPerson.phone) {
          this.person.phone = this.editingPerson.phone;
        }
        if (this.editingPerson.email) {
          this.person.email = this.editingPerson.email;
        }
      }
    },
  },
};
</script>