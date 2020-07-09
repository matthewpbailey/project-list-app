<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <H1>NMCN Project List Application</H1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
      </v-btn>
    </v-app-bar>

    <v-content>
      <ProjectList/>
      <AddData/>
    </v-content>
  </v-app>
</template>

<script>
import ProjectList from './components/ProjectList';
import AddData from './components/addData/AddData';

export default {
  name: 'App',

  components: {
    ProjectList,
    AddData,
  },

  data: () => ({
    //
  }),
};
</script>
