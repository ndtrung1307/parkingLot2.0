# ParkingLot2  

ParkingLot2 is a NodeJs program run by Terminal and written on Linux.  

## Installation  

Requirement:  

NodJS : https://nodejs.org/en/download/  
Yarn: https://classic.yarnpkg.com/en/docs/install  

Install:  
```bash
$ bin/setup
```

## Usage

```base
$ bin/parking_lot [filename].txt
```  

[filename].txt is the input file must be located in the root directory (parkingLot2) and should be a text file.
This file is a argument of the program. It contains many commands as instructions and the program will execute accordingly.

### Commands  
• Create parking lot of sizen: create_parking_lot {capacity}  
• Park a car: park {car_number}  
• Remove (Unpark) car from: leave {car_number} {hours}  
• Print status of parkings lot: status  


### Example Input file: 
create_parking_lot 6  
park KA-01-HH-1234  
park KA-01-HH-9999  
park KA-01-BB-0001  
park KA-01-HH-7777  
park KA-01-HH-2701  
park KA-01-HH-3141  
leave KA-01-HH-3141 4  
status  

### Output (to STDOUT):  
Created parking lot with 6 slots  
Allocated slot number: 1  
Allocated slot number: 2  
Allocated slot number: 3  
Allocated slot number: 4  
Allocated slot number: 5  
Allocated slot number: 6  
Registration number KA-01-HH-
3141 with Slot Number 6 is free with Charge 30 Slot No. Registration No.  
1 KA-01-HH-1234  
2 KA-01-HH-9999  
3 KA-01-BB-0001  
4 KA-01-HH-7777  
5 KA-01-HH-2701  
Registration number KA-01-HH-
3141 with Slot Number 6 is free with Charge 30 Slot No. Registration No.  
1 KA-01-HH-1234  
2 KA-01-HH-9999  
3 KA-01-BB-0001  
4 KA-01-HH-7777  
5 KA-01-HH-2701  


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)