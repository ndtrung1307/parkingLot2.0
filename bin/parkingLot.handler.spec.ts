import { expect } from "chai";
import * as sinon from "sinon";
import * as fs from "fs";
import { readDataInputFromFile, processParkingLotData } from "./parkingLot.handler";

describe("initialize ParkingLot", () => {

  it("init should failed with wrong Action", async () => {
    const stub = sinon.stub(fs, "readFileSync").returns("create_parking_lota 6");
    try {
      readDataInputFromFile("file_inputs.txt");
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message.includes("This Action isn't handled:")).to.eq(true);
    }
    stub.restore();
  });

  it("init should failed with wrong size value", async () => {
    const stub = sinon.stub(fs, "readFileSync").returns("create_parking_lot 6a");
    try {
      readDataInputFromFile("filePath");
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message).to.eq("size is invalid!");
    }
    stub.restore();
  });

  it("init should success with right size value", async () => {
    const stub = sinon.stub(fs, "readFileSync").returns("create_parking_lot 6");
    const spy = sinon.spy(console, "log");
    readDataInputFromFile("filePath");
    processParkingLotData();
    expect(spy.args[0][0]).to.eq("Created parking lot with 6 slots");
    stub.restore();
    spy.restore();
  });

  it("init should failed if try to create the second ParkingLot", async () => {
    const stub = sinon.stub(fs, "readFileSync").returns("create_parking_lot 6");
    try {
      readDataInputFromFile("filePath");
      processParkingLotData();
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message).to.eq("Park was initialized!");
    }
    stub.restore();
  });
});
