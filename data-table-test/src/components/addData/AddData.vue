<template>
  <v-row justify="center">
    <v-dialog v-model="isProjectEntryModelOpen" persistent max-width="600px">
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
      <ProjectDataEntryModal/>
    </v-dialog>
  </v-row>
</template>
<script>
  import ProjectDataEntryModal from './ProjectDataEntryModal'
  export default {
    name: 'AddData',
    components: {
      ProjectDataEntryModal
    },
    data: () => ({
    }),
    computed: {
      isProjectEntryModelOpen: {
        get: function(){
          return this.$store.getters.isProjectEntryModelOpen
        },
        set: function(value){
          this.$store.dispatch({type:"setProjectEntryModelVisiblity",isOpen: value});
        }
      }
    }
  }
</script>
