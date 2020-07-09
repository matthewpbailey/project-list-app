import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const STARTING_NUM = 1;
const STARTING_NUM_STR = "" + STARTING_NUM; 
const ZERO_PAD_STR = "0"; 
const MAX_PADDING = 5; 
export default new Vuex.Store({
  state: {
    currentProjectNumber: STARTING_NUM,
    isProjectEntryModelOpen:false,
    projectTableData: [{
          name: 'Project List Appliction',
          number: STARTING_NUM_STR.padStart(MAX_PADDING, ZERO_PAD_STR),
          postcode: "NG12 4HP",
          status: "Complete",
          endDate: "07/07/2020",
          email: "jon.smith@gmail.com"
        }]
  },
  mutations: {
    pushProjectTableItem(state,item){
      state.projectTableData.push(item);
    },
    openProjectEntryModel(state){
      state.isProjectEntryModelOpen = true;
    },
    closeProjectEntryModel(state){
      state.isProjectEntryModelOpen = false;
    },
    setProjectEntryModelVisiblity(state,isOpen){
      state.isProjectEntryModelOpen = isOpen;
    },
  },
  getters:{
    projectTableData: state => {
      return state.projectTableData;
    },
    isProjectEntryModelOpen: state => {
      return state.isProjectEntryModelOpen;
    },
  },
  actions: {
    addProjectEntry(context,entry){
      context.commit("pushProjectTableItem",entry.project);
    },
    openProjectEntryModel(context){
      context.commit("openProjectEntryModel"); 
    },
    closeProjectEntryModel(context){
      context.commit("closeProjectEntryModel"); 
    },
    setProjectEntryModelVisiblity(context,model){      
      context.commit("setProjectEntryModelVisiblity",model.isOpen); 
    },
  },
  modules: {
  }
})
