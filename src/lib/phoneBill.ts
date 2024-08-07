class PhoneBill {
    private _id: string;
    private _provider: string;
    private _monthlyCost?: number;
    private _dataLimit?: number;
    private _minutes?: number;
    private _sms?: number;
    private _uploadedAt?: Date;
    private _description?: string;
    private _location?: string;
  
    constructor(
      id: string,
      provider: string, 
      monthlyCost?: number, 
      dataLimit?: number, 
      minutes?: number, 
      sms?: number, 
      uploadedAt?: Date, 
      description?: string, 
      location?: string
    ) {
      this._id = id;
      this._provider = provider;
      this._location = location;
      if (monthlyCost) this._monthlyCost = monthlyCost;
      if (dataLimit) this._dataLimit = dataLimit;
      if (minutes) this._minutes = minutes;
      if (sms) this._sms = sms;
      if (uploadedAt) this._uploadedAt = uploadedAt;
      if (description) this._description = description;
    }
  
    // Setters
    set id(id: string) {
      this._id = id;
    }
  
    set monthlyCost(monthlyCost: number) {
      this._monthlyCost = monthlyCost;
    }
  
    set dataLimit(dataLimit: number) {
      this._dataLimit = dataLimit;
    }
  
    set minutes(minutes: number) {
      this._minutes = minutes;
    }
  
    set sms(sms: number) {
      this._sms = sms;
    }
  
    set uploadedAt(uploadedAt: Date) {
      this._uploadedAt = uploadedAt;
    }
  
    set provider(provider: string) {
      this._provider = provider;
    }
  
    set description(description: string) {
      this._description = description;
    }

    set location(location: string) {
      this._location = location;
    }
  
    // Getters (if needed)
    get id(): string {
      return this._id;
    }
  
    get monthlyCost(): number | undefined {
      return this._monthlyCost;
    }
  
    get dataLimit(): number | undefined {
      return this._dataLimit;
    }
  
    get minutes(): number | undefined {
      return this._minutes;
    }
  
    get sms(): number | undefined {
      return this._sms;
    }
  
    get uploadedAt(): Date | undefined {
      return this._uploadedAt;
    }
  
    get provider(): string {
      return this._provider;
    }
  
    get description(): string | undefined {
      return this._description;
    }

    get location(): string | undefined {
      return this._location;
    }
  }
  
  export default PhoneBill;
  