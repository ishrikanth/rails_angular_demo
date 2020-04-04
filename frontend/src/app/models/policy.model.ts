export class Policy {
  id: string;
  policyNumber: string;
  creationDate: Date;
  effectiveDate: Date;
  expireDate: Date;
  paymentOption: string;
  policyAmount: number;
  extraInfo: string;

  constructor(obj: any){
    this.id = obj && obj.id || null;
    this.policyNumber = obj && obj.policyNumber || null;
    this.creationDate = obj.creationDate || null;
    this.effectiveDate = obj.effectiveDate || null;
    this.expireDate = obj.expireDate || null;
    this.paymentOption = obj.paymentOption || null;
    this.policyAmount = obj.policyAmount || null;
    this.extraInfo = obj.extraInfo || null;
  }
}
