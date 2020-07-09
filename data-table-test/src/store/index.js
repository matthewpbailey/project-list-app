import Vue from 'vue';
import Vuex from 'vuex';
import { ProjectTableEntryBuilder } from './../sharedClasses/ProjectTableEntryBuilder'; 
Vue.use(Vuex);

const STARTING_NUM = 1;
const STARTING_NUM_STR = "" + STARTING_NUM; 
const ZERO_PAD_STR = "0"; 
const MAX_PADDING = 5;

const DEMO_TABLE = new ProjectTableEntryBuilder()
.setNumber(STARTING_NUM_STR.padStart(MAX_PADDING, ZERO_PAD_STR))
.setName('Project List Appliction')
.setPostcode("NG12 4HP")
.setStatus("Complete")
.setEmail("jon.smith@gmail.com")
.setEndDate("2020-07-07").build();
export default new Vuex.Store({
  state: {
    currentProjectNumber: STARTING_NUM,
    isProjectEntryModelOpen:false,
    projectTableData: [DEMO_TABLE]
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
