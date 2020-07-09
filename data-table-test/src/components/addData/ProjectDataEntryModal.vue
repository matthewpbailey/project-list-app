<template>
    <v-card>
        <v-card-title>
            <span class="headline">New Project</span>
        </v-card-title>
        <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Project Number*" v-model="newProject.number" required></v-text-field>
                  <div class="error" v-if="!$v.newProject.number.required">Field is required</div>
                  <div class="error" v-if="!$v.newProject.number.maxLength || !$v.newProject.number.minLength">Project Number must have {{projectNumMaxChars}} digits.</div>
                  <div class="error" v-if="!$v.newProject.number.isANumber">Project Number entry is not a number.</div>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Project name*" v-model="newProject.name" required></v-text-field>
                  <div class="error" v-if="!$v.newProject.name.required">Field is required</div>
                  <div class="error" v-if="!$v.newProject.name.maxLength">Project Name must have less than {{$v.newProject.name.$params.maxLength.max}} letters.</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Project Postcode*" v-model="newProject.postcode" required></v-text-field>
                  <div class="error" v-if="!$v.newProject.postcode.required">Field is required</div>
                  <div class="error" v-if="!$v.newProject.postcode.isPostcode">Project Postcode is not a vaild Postcode</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="['Pre-start', 'Live', 'Complete']"
                    label="Project Status*"
                    v-model="newProject.status"
                    required
                  ></v-select>
                  <div class="error" v-if="!$v.newProject.status.required">Field is required</div>
                </v-col>
                <v-col cols="12" sm="6">
                   <v-menu
                   v-model="isDatePickerOpen"
                   :close-on-content-click="false"
                   :nudge-right="40"
                   transition="scale-transition"
                   offset-y
                   min-width="290px"
                   >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newProject.endDate"
                        label="Project End Date*"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="newProject.endDate" @input="closeDatePicker()"></v-date-picker>
                  </v-menu>
                  <div class="error" v-if="!$v.newProject.endDate.required">Field is required</div>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" v-model="newProject.email" required></v-text-field>
                  <div class="error" v-if="!$v.newProject.email.required">Field is required</div>
                  <div class="error" v-if="!$v.newProject.email.isEmail">Email Address is not a vaild Email Address</div>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeForm();clearForm()">Cancel</v-btn>
            <v-btn color="blue darken-1" v-if="!$v.$invalid" text @click="saveForm();clearForm()">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { ProjectTableEntry } from './../../sharedClasses/ProjectTableEntry';
import { validationMixin } from 'vuelidate';
import { required,maxLength,minLength,email,helpers,numeric} from 'vuelidate/lib/validators';
  
const IS_POSTCODE_REGEX = helpers.regex("alphaNum",/[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i);
const DEFAULT_DATE = new Date().toISOString().substr(0, 10);
const PROJECT_NUM_REQUIRED_CHARS = 5;
const PROJECT_NAME_MAX_CHARS = 100;

export default {
    name: 'ProjectDataEntryModal',
    mixins: [validationMixin],
    data: () => ({
      defaultDate: DEFAULT_DATE,
      projectNumMaxChars: PROJECT_NUM_REQUIRED_CHARS,
      isDatePickerOpen:false,
      newProject: new ProjectTableEntry() 
    }),
    validations: {
      newProject:{
          number:{
            required,
            maxLength: maxLength(PROJECT_NUM_REQUIRED_CHARS), 
            minLength: minLength(PROJECT_NUM_REQUIRED_CHARS),
            isANumber: numeric
          }, 
          name:{
            required,
            maxLength: maxLength(PROJECT_NAME_MAX_CHARS)
          }, 
          postcode:{
            required,
            isPostcode: IS_POSTCODE_REGEX,
            //maxLength: maxLength(8)
          }, 
          status:{
            required,
          }, 
          endDate:{
            required,
          }, 
          email:{
            required,
            isEmail: email

          }, 
      }
    },
    methods:{
      clearForm: function(){
        this.newProject = new ProjectTableEntry();
      },
      closeDatePicker: function(){
        this.isDatePickerOpen = false;
      },
      closeForm: function(){
        this.$store.dispatch("closeProjectEntryModel");
        this.clearForm();
      },
      saveForm: function(){
        this.$store.dispatch({type:"addProjectEntry",project:this.newProject});
        this.closeForm();
      }
    }
}
</script>