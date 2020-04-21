// tslint:disable: no-console
import {isPositiveInt} from "./util";

export enum ACTION {
    CREATE = "create_parking_lot",
    PARK = "park",
    LEAVE = "leave",
    STATUS = "status"
}

const first2HoursFee = 10;
const additionalHourFee = 10;

export interface ILeaveACar {
    carName: string,
    fee: number,
    slotNumber: number
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

    public parkACar(carName: string) {
        if (this.isThisCarParked(carName)) throw new Error(`Car with name ${carName} is Parked!`);
        const slotNumber = this.findEmptySlot();
        if(slotNumber > 0){
            this.slots.set(slotNumber, carName);
        }
        return slotNumber;
    }

    public leaveACar(carName: string, time: number): ILeaveACar | undefined {
        if(!isPositiveInt(time)) throw Error('time is invalid!');
        if (this.isThisCarParked(carName)) {
            const fee = this.caculateParkingFee(time);
            const slotNumber = this.findCarSlotNumber(carName);
            if(slotNumber > 0){
                this.slots.set(slotNumber, null);
                return {
                    carName,
                    fee,
                    slotNumber
                };
            }
        }
        return undefined;
    }

    public logStatus() {
        console.log("Slot No. Registration No.");
        for (const [key, value] of this.slots) {
            if(value) {
                console.log(`${key} ${value}`);
            }
        }
    }

    private caculateParkingFee(time: number) {
        if (time > 2) return first2HoursFee + (time - 2)*additionalHourFee;
        return first2HoursFee;
    }

    private findCarSlotNumber(carName: string) {
        for (const [key, value] of this.slots) {
            if(value === carName) {
                return key;
            }
        }
        return 0;
    }

    private isThisCarParked(carName: string){
        return Array.from(this.slots.values()).includes(carName);
    }

    private findEmptySlot(){
        for (const [key, value] of this.slots) {
            if(!value) return key;
        }
        return 0;
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