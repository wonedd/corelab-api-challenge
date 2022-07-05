const express = require('express')
const { v4 } = require('uuid'); 

const app = express()

app.use(express.json())

const vehicles = [];

app.post('/vehicles', (req, res) => {
    const { name, brand, color, year, plate } = req.body

    const vehicle = {
        name,
        brand,
        color,
        year,
        plate,
        id: v4(),
        favorite:false,
        createdAt: new Date()
    }

    vehicles.push(vehicle)

    return res.status(201).json(vehicle)
})

app.get('/vehicles', (req, res) => {
    return res.json(vehicles)
})

app.put('/vehicles/:id', (req, res) => {
    const { name, brand, color, year, plate } = req.body

    const { id } = req.params;

    const vehicle = vehicles.find(vehicle => vehicle.id === id);

    if(!vehicle){
        return res.status(400).json({error: "Vehicle not found"})
    }
    

    vehicle.name = name ? name : vehicle.name;
    vehicle.brand = brand ? brand : vehicle.brand;
    vehicle.color = color ? color : vehicle.color;
    vehicle.year = year ? year : vehicle.year;
    vehicle.plate = plate ? plate : vehicle.plate;

    return res.status(200).json(vehicle)

})

app.delete('/vehicles/:id', (req, res) => {
    const { id } = req.params

    const vehicle = vehicles.find(vehicle => vehicle.id === id);

    if(!vehicle){
        return res.status(400).json({error: "Vehicle not found"})
    }

    vehicles.splice(vehicles.indexOf(vehicle), 1)

    return res.status(204).send()
})

app.patch('/vehicles/:id', (req, res) => {
    const { id } = req.params;

    const vehicle = vehicles.find(vehicle => vehicle.id === id);

    if(!vehicle){
        return res.status(400).json({error: "Vehicle not found"})
    }

    vehicle.favorite = true;

    return res.status(200).json(vehicle)
})

app.listen(3333)