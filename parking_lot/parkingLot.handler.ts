// tslint:disable: no-console

import { ParkingLot, ACTION } from "./parkingLot";
import {readFileSync} from "fs";
import {seperateStrLineByLine} from "./util";

class ParkingLotHandler {
    private parkingLot: ParkingLot;
    private parkActions: string[];
    public readDataInputFromFile(filePath: string) {
        try {
            const data = readFileSync(filePath, 'utf8');
            this.parkActions = seperateStrLineByLine(data);
        } catch (error) {
            console.error("Read Data from input file error: ", error.stack);
        }
    }

    public processParkingLotData() {
        try {
            if(!this.parkActions) throw new Error("Action List is empty!");
            for (const action of this.parkActions) {
                const actionParams = action.trim().split(/\s+/);
                switch (actionParams[0]) {
                    case ACTION.CREATE:
                        // if(this.parkingLot){
                        //     throw new Error("Park was initialized!");
                        // }
                        this.parkingLot = new ParkingLot(Number(actionParams[1]));
                        console.log(`Created parking lot with ${this.parkingLot.getParkSize()} slots`);
                        break;
                    case ACTION.PARK:
                            const result = this.parkingLot.parkACar(actionParams[1]);
                            if (result > 0) {
                                console.log("Allocated slot number: ",result);
                            } else {
                                console.log("Sorry, parking lot is full");
                            }
                            break;
                    case ACTION.LEAVE:
                            const leaveResult = this.parkingLot.leaveACar(actionParams[1], Number(actionParams[2]));
                            if (!leaveResult) {
                                console.log(`Registration number ${actionParams[1]} not found`);
                            } else {
                                console.log(`Registration number ${leaveResult.carName} with Slot Number ${leaveResult.slotNumber} is free with Charge ${leaveResult.fee}`);
                            }
                            break;
                    case ACTION.STATUS:
                            this.parkingLot.logStatus();
                            break;
                    default:
                        throw new Error(`This Action isn't handled: ${JSON.stringify(actionParams)}`);
                }
            }
        } catch(e) {
            console.error("Process Parking lot data failed: ",e.stack);
            throw e;
        }
    }
}

const parkingLotHandler = new ParkingLotHandler();
export const readDataInputFromFile = (filePath: string) => parkingLotHandler.readDataInputFromFile(filePath);
export const processParkingLotData = () => parkingLotHandler.processParkingLotData();