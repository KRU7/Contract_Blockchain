## Endpoint description

### 1. Contarct Entry

#### A. Leasing Contract

**Method**

```
POST
```

**Endpoint**

```
http://52.221.70.49:3000/block
```

**Parameters**

```
"contractId"         ---> ID of the contract to be made
"clientname"         ---> Name of Client or UserID
"tradeLicenseNumber" ---> Trading License Number issued 
"bmr"                ---> Rate accepted by Client / Contract Rate
"vehiclenumber"      ---> Number of Vehicle to be leased
"dateOfContract"     ---> Date on which contract is created
"vehicletype"        ---> Vehicle type for transportation
"contractStartDate"  ---> Date on which contract is starts
"contractEndDate"    ---> Date on which contract is ends
"contractType"       ---> "Leasing" should be written as it leasing contract
"change"             ---> Any change suggested by client and later on aprroved by admin in terms and condition
```

**Example**

```
curl -X "POST" "http://52.221.70.49:3000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
        "transaction": {
            "contractId" : "1021561",
            "clientname": "Krunal",
            "tradeLicenseNumber": "123456",
            "bmr": "1000",
            "vehiclenumber": "1000050",
            "dateOfContract": "01-03-2019",
            "vehicletype": "40 feet flat bed",
            "contractStartDate": "01-04-2019",
            "contractEndDate": "01-05-2019",
            "contractType": "Leasing",
            "change" : ""
        }
}'
```
**Response**
```
{
    "hash": "f3d85561a67259b2026fdf0a76d8e3ee54cd70e992fe25604dcd2ff58a99710a",
    "height": 14,
    "clientname": "Krunal",
    "contractEndDate" : "01-05-2019",
    "contractId" : "1021561"
}
```

#### B. Cntainerised , Cross-Broder And Domestic Contracts:

**Method**

```
POST
```

**Endpoint**

```
http://52.221.70.49:3000/block
```

**Parameters**

```
"contractId"         ---> ID of the contract to be made
"clientname"         ---> Name of Client or UserID
"tradeLicenseNumber" ---> Trading License Number issued 
"bmr"                ---> Rate accepted by Client / Contract Rate
"dateOfContract"     ---> Date on which contract is created
"vehicletype"        ---> Vehicle type for transportation
"contractStartDate"  ---> Date on which contract is starts
"contractEndDate"    ---> Date on which contract is ends
"source"             ---> Source of Transportation
"destination"        ---> Destination of Transportation
"contractType"       ---> "Containerized" , "CrossBorder" or "Domestic" Depending Upon type of contract
"change"             ---> Any change suggested by client and later on aprroved by admin in terms and condition
```

**Example**

```
curl -X "POST" "http://52.221.70.49:3000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
        "transaction": {
            "contractId" : "1021561",
            "clientname": "Krunal",
            "tradeLicenseNumber": "123456",
            "bmr": "1000",
            "dateOfContract": "01-03-2019",
            "vehicletype": "40 feet flat bed",
            "contractStartDate": "01-04-2019",
            "contractEndDate": "01-05-2019",
            "source": "delhi",
            "destination": "amd",
            "contractType": "Domestic",
            "change" : "Pay per detention 150 AED "
        }
}'
```
**Response**
```
{
    "hash": "f3d85561a67259b2026fdf0a76d8e3ee54cd70e992fe25604dcd2ff58a99710a",
    "height": 14,
    "clientname": "Krunal",
    "contractEndDate" : "01-05-2019",
    "contractId" : "1021561"
}
```

**NOTE : 
--> Only 4 contract type will be accepted "Leasing", "Containerized" , "CrossBorder" and "Domestic". Anything else will  result into invalid contract type. Also Make sure that all parameters are present and any extra paramters other than defined here will be discarded
--> Parameter change can be empty incase of no suggestions by user** 

### 2. Get block by height

**Method**

```
GET
```

**Endpoint**

```
http://52.221.70.49:3000/getblock/:height
```

**Parameters**

```
height - The height of block
```

**Example**

```
curl "http://52.221.70.49:3000/getblock/3"
```

**Response**
```
{
    "hash": "f658a7be274bb8ae3d453eb172292a63c359127a78beda6e4a016858814ec45e",
    "height": 3,
    "body": {
        "transaction": {
            "contractId" : "1021561",
            "clientname": "Krunal",
            "tradeLicenseNumber": "123456",
            "bmr": "1000",
            "dateOfContract": "01-03-2019",
            "vehicletype": "40 feet flat bed",
            "contractStartDate": "01-04-2019",
            "contractEndDate": "01-05-2019",
            "source": "delhi",
            "destination": "amd",
            "contractType": "Domestic",
            "change" : ""
        }
    },
    "time": "1548677962",
    "previousBlockHash": "fdb91c90b40c35201a29a97eb1e2d160f46d40e490a065b391a3d224fe875f1d"
}
```

### 3. Invoice Entry

**Method**

```
POST
```

**Endpoint**

```
http://52.221.70.49:3000/invoiceblock
```

**Parameters**

```
"clientname"         ---> Name of Client or UserID  
"companyname"        ---> Client's Company Name
"email"              ---> Email ID of Client
"invoicenum"         ---> Invoice number 
"ponum"              ---> P.O./S.O. Number
"idate"              ---> Invoice Date
"pdate"              ---> Last Date for Payment
"items"              ---> Truck info and Source and Destination
"quantity"           ---> Number of Trucks/Items
"price"              ---> Price of Single unit/Truck
"amount"             ---> Total Amount result of Price * Quatity
"notes"              ---> Contains info about trucks in trip
```

**Example**

```
curl -X "POST" "http://52.221.70.49:3000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
    "invoice" :{
        "clientname": "Himanshu Dhyani",
        "companyname" : "Planet Pharmacies LLC",
        "email": "HimanshuDhyani@planetme.ae",
        "invoicenum": "1218004",
        "ponum" : "953/MB/SAJJA/DEC18",
        "idate" : "December 11, 2018",
        "pdate" : "December 26, 2018",
        "items" : "45 Feet Reefer Truck",
        "quantity" : "6",
        "price" : "AED 1,375.00",
        "amount" : "AED 8,250.00",
        "notes" : "Total 6 Trips:-TRWB Vehicle Number Placement Date 1218002-1 SHJ50997 6/12/2018  1218002-2 SHJ50997 7/12/2018 1218002-3 SHJ53102 7/12/2018 1218002-4 SHJ50997 8/12/2018 1218002-5 SHJ53102 8/12/2018 1218002-6 SHJ50562 8/12/2018"
    }
}'
```
**Response**
```
{
    "hash": "f3d85561a67259b2026fdf0a76d8e3ee54cd70e992fe25604dcd2ff58a99710a",
    "height": 14,
    "clientname": "Himanshu Dhyani",
    "invoicenum" : "1218004"
}
```


### 4. Get block by height

**Method**

```
GET
```

**Endpoint**

```
http://52.221.70.49:3000/getiblock/:height
```

**Parameters**

```
height - The height of block
```

**Example**

```
curl "http://52.221.70.49:3000/getiblock/3"
```

**Response**
```
{
    "hash": "f658a7be274bb8ae3d453eb172292a63c359127a78beda6e4a016858814ec45e",
    "height": 3,
    "body": {
        "invoice" :{
        "clientname": "Himanshu Dhyani",
        "companyname" : "Planet Pharmacies LLC",
        "email": "HimanshuDhyani@planetme.ae",
        "invoicenum": "1218004",
        "ponum" : "953/MB/SAJJA/DEC18",
        "idate" : "December 11, 2018",
        "pdate" : "December 26, 2018",
        "items" : "45 Feet Reefer Truck",
        "quantity" : "6",
        "price" : "AED 1,375.00",
        "amount" : "AED 8,250.00",
        "notes" : " Total 6 Trips:-
                    TRWB Vehicle Number Placement Date
                    1218002-1 SHJ50997 6/12/2018 
                    1218002-2 SHJ50997 7/12/2018 
                    1218002-3 SHJ53102 7/12/2018 
                    1218002-4 SHJ50997 8/12/2018 
                    1218002-5 SHJ53102 8/12/2018 
                    1218002-6 SHJ50562 8/12/2018 " 
    }
    },
    "time": "1548677962",
    "previousBlockHash": "fdb91c90b40c35201a29a97eb1e2d160f46d40e490a065b391a3d224fe875f1d"
}
```