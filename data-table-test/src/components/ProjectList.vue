<template>
  <v-card>
      <v-card-title>
        Project List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :search="search"
      ></v-data-table>
    </v-card>
</template>

<script>
  export default {
    name: 'ProjectList',

    data: () => ({
        search:'',
        headers: [
          {text:'Project Number',align:'start',value:'number'},
          {text:'Project Name',value:'name'},
          {text:'Project Postcode',value:'postcode'},
          {text:'Project Status',value:'status'},
          {text:'Project Completion Date',value:'endDate'},
          {text:'Project Contact Email Address',value:'email'},
        ],
    }),
    computed: {
      tableData(){
        return this.$store.getters.projectTableData;
      }
    }
  }
</script>
