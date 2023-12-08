import express from 'express';
import Ride from './Ride';
import pgp from 'pg-promise';
import crypto from 'crypto';
import { validate } from './CpfValidator';
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
    try {
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        res.json({ price });  
    } catch (error: any) {
        res.status(422).send(error.message);
    }
});

app.post("/passengers", async function(req, res) {
    try {
        const connection = pgp()("postgres://postgres:123456@localhost:5432");
        const passengerId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("Invalid cpf");
        await connection.query(
            "insert into clean_code_clean_arch.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)",
            [passengerId, req.body.name, req.body.email, req.body.document]
        );
        res.json({passengerId});
        await connection.$pool.end();
    } catch (error: any) {
        res.status(422).send(error.message);        
    }
});

app.get("/passengers/:passengerId", async function(req, res) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432");
    const [passengerData] = await connection.query(
        "select * from clean_code_clean_arch.passenger where passenger_id = $1",
        [req.params.passengerId]
    );
    await connection.$pool.end();
    res.json(passengerData);
});

app.post("/drivers", async function(req, res) {
    try {
        const connection = pgp()("postgres://postgres:123456@localhost:5432");
        const driverId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("Invalid cpf");
        await connection.query(
            "insert into clean_code_clean_arch.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)",
            [driverId, req.body.name, req.body.email, req.body.document, req.body.carPlate]
        );
        res.json({driverId});
        await connection.$pool.end();
    } catch (error: any) {
        res.status(422).send(error.message);        
    }
});

app.get("/drivers/:driverId", async function(req, res) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432");
    const [driverData] = await connection.query(
        "select * from clean_code_clean_arch.driver where driver_id = $1",
        [req.params.driverId]
    );
    await connection.$pool.end();
    res.json({
        driverId: driverData.driver_id,
        name: driverData.name,
        email: driverData.email,
        document: driverData.document,
        carPlate: driverData.car_plate
    });
});

app.listen(3000);