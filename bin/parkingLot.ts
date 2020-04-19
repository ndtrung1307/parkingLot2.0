// tslint:disable: no-console
import {isPositiveInt} from "./util";

export enum ACTION {
    CREATE = "create_parking_lot",
    PARK = "park",
    LEAVE = "leave",
    STATUS = "status"
}

export class ParkingLot {
    private parkSize: number;
    private slots: Map<number, string>;

    constructor (size: number) {
        if(!isPositiveInt(size)) throw Error('size is invalid!');
        this.parkSize = size;
        this.initSlotArray();
    }

    public getParkSize() {
        return this.parkSize;
    }

    private initSlotArray() {
        if(!this.slots){
            this.slots = new Map();
            for (let index = 1; index <= this.parkSize; index++) {
                this.slots.set(index, null);
            }
        }
    }
}