<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        >
            Open Dialog
        </v-btn>
      </template>
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
                  <div class="error" v-if="!$v.newProject.postcode.isPostcode && !$v.newProject.postcode.maxLength">Project Postcode is not a vaild Postcode</div>
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
    </v-dialog>
  </v-row>
</template>
<script>
  import { validationMixin } from 'vuelidate';
  import { required,maxLength,minLength,email,helpers,numeric} from 'vuelidate/lib/validators';
  
  const isPostcodeRegex = helpers.regex("alphaNum",/[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i);
  const DEFAULT_DATE = new Date().toISOString().substr(0, 10);
  const PROJECT_NUM_MAX_CHARS = 5;
  export default {
    name: 'AddData',
    mixins: [validationMixin],
    data: () => ({
      dialog:false,
      defaultDate: DEFAULT_DATE,
      projectNumMaxChars: PROJECT_NUM_MAX_CHARS,
      isDatePickerOpen:false,
      newProject:{
        number: null,
        name: null,
        postcode: null,
        status: null,
        endDate: DEFAULT_DATE, 
        email: null
      }
    }),
    validations: {
      newProject:{
          number:{
            required,
            maxLength: maxLength(5), 
            minLength: minLength(5),
            isANumber: numeric
          }, 
          name:{
            required,
            maxLength: maxLength(100)
          }, 
          postcode:{
            required,
            isPostcode: isPostcodeRegex,
            maxLength: maxLength(8)
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
        this.newProject = {
          number: null,
          name: null,
          postcode: null,
          status: null,
          endDate: null,
          email: null   
        }
      },
      closeDatePicker: function(){
        this.isDatePickerOpen = false;
      },
      closeForm: function(){
        this.dialog = false;
        this.clearForm();
      },
      saveForm: function(){
        this.$store.dispatch({type:"addProjectEntry",project:this.newProject});
        this.closeForm();
      }
    }
  }
</script>
