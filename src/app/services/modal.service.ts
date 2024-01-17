import { Injectable } from "@angular/core";
import _ from "lodash";
import { ModalComponent } from "../modal/modal.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  
  private modals: ModalComponent[] = [];

  add(modal: ModalComponent) {
    // ensure component has a unique id attribute
    if (!modal.id || _.filter(this.modals,(item) => {
      return item.id===modal.id;}).length>0) return;
    this.modals.push(modal); // add modal to array of active modals
  }
  remove(modal: ModalComponent) {// remove modal from array of active modals
    this.modals = _.filter(this.modals,(mdl) => {
      return mdl!==modal;
    });
  }
  open(id: string) {// open modal specified by id
    const modal = _.filter(this.modals,(mdl) => {
      return mdl.id===id;
    })[0];
    modal?.open();
  }
  close() {// close the modal that is currently open  
    const modal = _.filter(this.modals,(mdl) => {
      return mdl.isOpen;
    })[0];
    modal?.close();
  }
  getModalById(id:string):ModalComponent{
    return _.filter(this.modals,(mdl) => {
      return mdl.id===id;
    })[0];
  }
}
