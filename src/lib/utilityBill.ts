class UtilityBill {
    private _id: string;
    private _provider: string;
    private _uploadedAt: Date;
    private _rate: number; // e.g., kWh for electricity or cubic meters for gas
    private _serviceFee: number;
    private _location?: string;
    private _description?: string;

    constructor(
        id: string,
        provider: string,
        uploadedAt: Date,
        rate: number,
        serviceFee: number,
        location?: string,
        description?: string
    ) {
        this._id = id;
        this._provider = provider;
        this._uploadedAt = uploadedAt;
        this._rate = rate;
        this._serviceFee = serviceFee;
        if(location) this._location = location;
        if(description) this._description = description;
    }

    // Setters
    set id(id: string) {
        this._id = id;
    }

    set provider(provider: string) {
        this._provider = provider;
    }

    set uploadedAt(uploadedAt: Date) {
        this._uploadedAt = uploadedAt;
    }

    set rate(rate: number) {
        this._rate = parseFloat(rate.toString());
    }

    set serviceFee(serviceFee: number) {
        this._serviceFee = serviceFee;
    }

    set location(location: string) {
        this._location = location;
    }

    set description(description: string) {
        this._description = description;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get provider(): string {
        return this._provider;
    }

    get uploadedAt(): Date {
        return this._uploadedAt;
    }

    get rate(): number {
        return this._rate;
    }

    get serviceFee(): number {
        return this._serviceFee;
    }

    get location(): string | undefined {
        return this._location;
    }

    get description(): string | undefined {
        return this._description;
    }
}

export default UtilityBill;
