import { readDataInputFromFile, processParkingLotData } from "./parkingLot.handler";

readDataInputFromFile(process.argv[2]);
processParkingLotData();