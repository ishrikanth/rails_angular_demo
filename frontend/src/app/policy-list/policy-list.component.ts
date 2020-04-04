import { Component, OnInit } from '@angular/core';
import {PolicyService} from "../services/policy.service";
import {Policy} from "../models/policy.model";
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AlertService} from "../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  display = 'none';
  policies: Policy[];
  policy: Policy;
  submitted = false;
  loading = false;
  policyForm: FormGroup;
  constructor(private policyService: PolicyService,
              public formBuilder: FormBuilder,
              public alertService: AlertService,
              public router: Router) { }

  openModal(){
    this.display="block";
    this.policyForm.reset();
  }

  onCloseHandled(){
    this.display='none';
    this.policyForm.reset();
  }

  get f() { return this.policyForm.controls; }

  ngOnInit() {
    this.policyForm = this.formBuilder.group({
      id: "",
      policyNumber: ['', Validators.required],
      creationDate: ['', [Validators.required, Validators.minLength(1)]],
      effectiveDate: ['', [Validators.required, Validators.minLength(1)]],
      expireDate: ['', [Validators.required, Validators.minLength(1)]],
      paymentOption: ['', [Validators.required, Validators.minLength(1)]],
      policyAmount: ['', [Validators.required, Validators.minLength(1)]],
      extraInfo: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Policy;
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.policyForm.invalid) {
      return;
    }

    this.loading = true;
    this.policyService.createPolicy(this.policyForm.value);
    this.onCloseHandled();
    this.router.navigate(['/policy']);
          this.policyForm.reset();
  }


  update(policy: Policy) {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string) {
    this.policyService.deletePolicy(id);
  }

  edit(id: string) {
    this.display = "block";
    this.policyService.editPolicy(id).subscribe(data => {

      this.policyForm.setValue({
        "policyNumber": data.payload.get("policyNumber"),
        "creationDate": data.payload.get("creationDate"),
        "effectiveDate": data.payload.get("effectiveDate"),
        "expireDate": data.payload.get("policyNumber"),
        "paymentOption": data.payload.get("paymentOption"),
        "policyAmount": data.payload.get("policyAmount"),
        "extraInfo": data.payload.get("extraInfo"),
        "id": data.payload.id
      });
    });
  }
}
