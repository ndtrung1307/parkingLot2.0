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
            for (const action of this.parkActions) {
                const actionParams = action.trim().split(/\s+/);
                switch (actionParams[0]) {
                    case ACTION.CREATE:
                        if(this.parkingLot){
                            throw new Error("Park was initialized!");
                        }
                        this.parkingLot = new ParkingLot(Number(actionParams[1]));
                        console.log(`Created parking lot with ${this.parkingLot.getParkSize()} slots`);
                        break;
                
                    default:
                        throw new Error(`This Action isn't handled: ${JSON.stringify(actionParams)}`);
                }
            }
        } catch(e) {
            console.error(e.stack);
            throw e;
        }
    }
}

const parkingLotHandler = new ParkingLotHandler();
export const readDataInputFromFile = (filePath: string) => parkingLotHandler.readDataInputFromFile(filePath);
export const processParkingLotData = () => parkingLotHandler.processParkingLotData();