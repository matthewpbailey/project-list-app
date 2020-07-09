const DEFAULT_DATE = new Date().toISOString().substr(0, 10);
export class ProjectTableEntry {

    constructor() {
      this._name = null;
      this._number = null;
      this._postcode = null;
      this._status = null;
      this._endDate = DEFAULT_DATE;
      this._email = null;
    }
  
    set name(name){
      this._name = name;
    } 
    get name(){
      return this._name;
    } 
    set number(number){
      this._number = number;
    } 
    get number(){
      return this._number;
    } 
    set postcode(postcode){
      this._postcode = postcode;
    } 
    get postcode(){
      return this._postcode;
    } 
    set status(status){
      this._status = status;
    } 
    get status(){
      return this._status;
    } 
    set endDate(endDate){
      this._endDate = endDate;
    } 
    get endDate(){
      return this._endDate;
    } 
    set email(email){
      this._email = email;
    } 
    get email(){
      return this._email;
    } 
  }
  