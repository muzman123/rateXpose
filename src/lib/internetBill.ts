class InternetBill {
    private _id: string;
    private _provider: string;
    private _monthlyCost: number;
    private _uploadedAt: Date;
    private _internetSpeed: number;
    private _isCopper: boolean;
    private _isFibre: boolean;
    private _location?: string;
    private _description?: string;

    constructor(
        id: string, 
        provider: string, 
        monthlyCost: number, 
        uploadedAt: Date, 
        internetSpeed: number, 
        isCopper: boolean, 
        isFibre: boolean,
        location?: string,
        description?: string
    ) {
        this._id = id;
        this._provider = provider;
        this._monthlyCost = monthlyCost;
        this._uploadedAt = uploadedAt;
        this._internetSpeed = internetSpeed;
        this._isCopper = isCopper;
        this._isFibre = isFibre;
        this._location = location;
        this._description = description;
    }

    // Setters
    set id(id: string) {
        this._id = id;
    }

    set provider(provider: string) {
        this._provider = provider;
    }

    set monthlyCost(monthlyCost: number) {
        this._monthlyCost = monthlyCost;
    }

    set uploadedAt(uploadedAt: Date) {
        this._uploadedAt = uploadedAt;
    }

    set internetSpeed(internetSpeed: number) {
        this._internetSpeed = internetSpeed;
    }

    set isCopper(isCopper: boolean) {
        this._isCopper = isCopper;
    }

    set isFibre(isFibre: boolean) {
        this._isFibre = isFibre;
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

    get monthlyCost(): number {
        return this._monthlyCost;
    }

    get uploadedAt(): Date {
        return this._uploadedAt;
    }

    get internetSpeed(): number {
        return this._internetSpeed;
    }

    get isCopper(): boolean {
        return this._isCopper;
    }

    get isFibre(): boolean {
        return this._isFibre;
    }

    get location(): string | undefined {
        return this._location;
    }

    get description(): string | undefined {
        return this._description;
    }
}

export default InternetBill;