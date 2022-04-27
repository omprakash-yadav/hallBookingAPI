var express = require('express');
var router = express.Router();

var room =[]

/* GET home page. */
router.get('/room', function(req, res, next) {
    res.send(room);
});


router.post("/create",(req,res)=>{
    data={
      roomID:req.body.roomID,
      capacity:req.body.capacity,
      amenities:req.body.amenities,
      price:req.body.price,
      bookedStatus:"Available",
      customerName:"",
      date:"",
      startTime:"",
      endTime:""
    }
    room.push(data);
    res.json({
      message:"Room created Successfully"
    })
})

router.post("/newbooking",(req,res)=>{
    let booked=false;
    room.map((e)=>{
      if(e.roomID===req.body.roomID){
        e.bookedStatus="Occupied";
        e.customerName=req.body.customerName;
        e.date=req.body.date;
        e.startTime=req.body.startTime;
        e.endTime=req.body.endTime;
        booked=true;
      }
    })
    if(booked){
      res.json({
        message:"Booking Successfull"
      })
    }else{
      res.json({
        message:"Booking Failed",
        instruction:"Check room exist or not and check the availability"
      })
    }
})


router.get("/booked-room-details",(req,res)=>{
    let data=[];
    room.map((e)=>{
      if(e.bookedStatus=="Occupied"){
        data.push({
          roomID:e.roomID,
          bookedStatus:e.bookedStatus,
          customerName:e.customerName,
          date:e.date,
          startTime:e.startTime,
          endTime:e.endTime
        })
      }
    })
    res.send(data);
})

router.get("/booked-customer-details",(req,res)=>{
  let data=[];
  room.map((e)=>{
    if(e.bookedStatus=="Occupied"){
      data.push({
        customerName:e.customerName,
        roomID:e.roomID,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
    }
  })
  res.send(data);
})

module.exports = router;