import { expect } from "chai";
import * as sinon from "sinon";
import * as fs from "fs";
import { readDataInputFromFile, processParkingLotData } from "./parkingLot.handler";
import * as path from "path";

const getFilePath = (filePath: string) => path.join(__dirname, filePath);

describe("initialize ParkingLot test suite", () => {

  it("init should failed with wrong Action", async () => {
    try {
      readDataInputFromFile(getFilePath("fileInputTest/init_wrong_action.txt"));
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message.includes("This Action isn't handled:")).to.eq(true);
    }
  });

  it("init should failed with wrong size value", async () => {
    try {
      readDataInputFromFile(getFilePath("fileInputTest/init_wrong_size.txt"));
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message).to.eq("size is invalid!");
    }
  });

  it("init should success with right size value", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/init_success.txt"));
    processParkingLotData();
    expect(spy.args[0][0]).to.eq("Created parking lot with 6 slots");
    spy.restore();
  });

  // it("init should failed if try to create the second ParkingLot", async () => {
  //   try {
  //     readDataInputFromFile(getFilePath("fileInputTest/init_success.txt"));
  //     processParkingLotData();
  //     processParkingLotData();
  //   } catch (error) {
  //     expect(error instanceof Error).to.eq(true);
  //     expect((error as Error).message).to.eq("Park was initialized!");
  //   }
  // });
});

describe("ParkingLot - Park a car Action Test Suite ", () => {

  it("Park a Car should success with right data", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/park_car_success.txt"));
    processParkingLotData();
    expect(spy.args[1][0]+spy.args[1][1]).to.eq("Allocated slot number: 1");
    expect(spy.args[2][0]+spy.args[2][1]).to.eq("Allocated slot number: 2");
    spy.restore()
  });

  it("Park a Car should failed when ParkLot full", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/park_car_full.txt"));
    processParkingLotData();
    expect(spy.args[1][0]+spy.args[1][1]).to.eq("Allocated slot number: 1");
    expect(spy.args[2][0]).to.eq("Sorry, parking lot is full");
    spy.restore()
  });

  it("Park a Car should failed when car is parked", async () => {
    const spy = sinon.spy(console, "log");
    try {
      readDataInputFromFile(getFilePath("fileInputTest/park_car_duplicated.txt"));
    processParkingLotData();
    expect(spy.args[1][0]+spy.args[1][1]).to.eq("Allocated slot number: 1");
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message).to.eq("Car with name KA-01-HH-1234 is Parked!");
    }
    spy.restore()
  });
});

describe("ParkingLot - Leave a car Action Test Suite ", () => {

  it("Leave a Car should success with right data", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/leave_car_success.txt"));
    processParkingLotData();
    expect(spy.args[3][0]).to.eq("Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30");
    spy.restore()
  });

  it("Leave a Car should failed with wrong data", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/leave_car_failed.txt"));
    processParkingLotData();
    expect(spy.args[3][0]).to.eq("Registration number KA-01-HH-12 not found");
    spy.restore()
  });

  it("Leave a Car should failed with wrong time value", async () => {
    try {
      readDataInputFromFile(getFilePath("fileInputTest/leave_car_time_wrong.txt"));
      processParkingLotData();
    } catch (error) {
      expect(error instanceof Error).to.eq(true);
      expect((error as Error).message).to.eq("time is invalid!");
    }
  });
});


describe("ParkingLot - Log status Test Suite ", () => {

  it("Shold log right status data", async () => {
    const spy = sinon.spy(console, "log");
    readDataInputFromFile(getFilePath("fileInputTest/log_status_success.txt"));
    processParkingLotData();
    expect(spy.args[spy.args.length-2][0]).to.eq("1     KA-01-HH-1234");
    expect(spy.args[spy.args.length-1][0]).to.eq("3     KA-01-BB-0001");
    spy.restore()
  });
});