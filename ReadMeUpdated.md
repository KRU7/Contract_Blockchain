## Endpoint description

### 1. Contarct Entry

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
"clientname"         ---> Name of Client or UserID  
"bmr"                ---> Rate accepted by Client
"source"             ---> Source of Transportation
"destination"        ---> Destination of Transportation
"dateOfContract"     ---> Date on which contract is created
"vehicletype"        ---> Vehicle type for transportation
"contractStartDate"  ---> Date on which contract is starts
"contractEndDate"    ---> Date on which contract is ends
"duration"           ---> Duration of Contract 
```

**Example**

```
curl -X "POST" "http://52.221.70.49:3000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "transaction": {
    "clientname": "Prem",
    "bmr": "2000",
    "source" : "Delhi",
    "destination" : "Dubai",
    "dateOfContract" : "28-01-2019",
    "vehicletype": "40 feetflat bed",
    "contractStartDate": "28-01-2019",
    "contractEndDate" : "28-02-2019",
    "duration" : "1"
  }
}'
```
**Response**
```
{
    "hash": "f3d85561a67259b2026fdf0a76d8e3ee54cd70e992fe25604dcd2ff58a99710a",
    "height": 14,
    "clientname": "Prem",
    "contractEndDate" : "28-02-2019"
}
```

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
            "clientname": "Prem",
            "bmr": "2000",
            "source": "Delhi",
            "destination": "Dubai",
            "dateOfContract": "28-01-2019",
            "vehicletype": "40 feetflat bed",
            "contractStartDate": "28-01-2019",
            "contractEndDate" : "28-02-2019",
            "duration" : "1"
        }
    },
    "time": "1548677962",
    "previousBlockHash": "fdb91c90b40c35201a29a97eb1e2d160f46d40e490a065b391a3d224fe875f1d"
}
```
### 3. Get block by hash

**Method**

```
GET
```

**Endpoint**

```
http://52.221.70.49:3000/gethash/:hash
```

**Parameters**

```
hash - The hash of one block created before
```

**Example**

```
curl "http://52.221.70.49:3000/gethash/f658a7be274bb8ae3d453eb172292a63c359127a78beda6e4a016858814ec45e"
```
**Response**
```
{
    "hash": "f658a7be274bb8ae3d453eb172292a63c359127a78beda6e4a016858814ec45e",
    "height": 3,
    "body": {
        "transaction": {
            "clientname": "Prem",
            "bmr": "2000",
            "source": "Delhi",
            "destination": "Dubai",
            "dateOfContract": "28-01-2019",
            "vehicletype": "40 feetflat bed",
            "contractStartDate": "28-01-2019",
            "contractEndDate" : "28-02-2019",
            "duration" : "1"
        }
    },
    "time": "1548677962",
    "previousBlockHash": "fdb91c90b40c35201a29a97eb1e2d160f46d40e490a065b391a3d224fe875f1d"
}
```