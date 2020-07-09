import { ProjectTableEntry } from './ProjectTableEntry';

export class ProjectTableEntryBuilder {
    constructor() {
        this._projectTableEntryBuilder = new ProjectTableEntry();
    }
    setNumber(number){
       this._projectTableEntryBuilder.number = number;
       return this;
    }
    setName(name){
       this._projectTableEntryBuilder.name = name;
       return this;
    }
    setPostcode(postcode){
       this._projectTableEntryBuilder.postcode = postcode;
       return this;
    }
    setStatus(status){
       this._projectTableEntryBuilder.status = status;
       return this;
    }
    setEndDate(endDate){
       this._projectTableEntryBuilder.endDate = endDate;
       return this;
    }
    setEmail(email){
       this._projectTableEntryBuilder.email = email;
       return this;
    }
    build(){
       return this._projectTableEntryBuilder; 
    }
}