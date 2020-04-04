import { Injectable } from '@angular/core';
import {Policy} from "../models/policy.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  updatedPolicy: Policy;
  constructor(private firestore: AngularFirestore) { }

  getPolicies() {
    return this.firestore.collection('policies').snapshotChanges();
  }

  createPolicy(policy: Policy){
    if(policy.id == null) {
      this.updatedPolicy = {policyNumber: policy.policyNumber,creationDate: policy.creationDate,
        effectiveDate: policy.effectiveDate,expireDate: policy.expireDate,
        paymentOption: policy.paymentOption,policyAmount: policy.policyAmount,extraInfo: policy.extraInfo} as Policy;
      return this.firestore.collection('policies').add(this.updatedPolicy);
;    } else {
       return this.updatePolicy(policy);
    }
  }

  updatePolicy(policy: Policy){
     return this.firestore.doc('policies/' + policy.id).update(policy);
  }

  deletePolicy(policyId: string){
    this.firestore.doc('policies/' + policyId).delete();
  }
  editPolicy(policyId: string){
   return this.firestore.doc('policies/' + policyId).snapshotChanges();
  }

}
