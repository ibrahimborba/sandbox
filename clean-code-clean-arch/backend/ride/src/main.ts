import express from 'express';
const app = express();
app.use(express.json());

app.post("/calc", function (req, res) {
    let result = 0;

    for (const segment of req.body) {
        segment.date = new Date(segment.date);
        
        if(segment.distance !== null && segment.distance !== undefined && typeof segment.distance === 'number' && segment.distance > 0) {
            if(segment.date !== null && segment.date !== undefined && segment.date instanceof Date && segment.date.toString() !== "Invalid Date") {
                if(segment.date.getHours() >= 22 || segment.date.getHours() <= 6) {
                    if(segment.date.getDay() !== 0) {
                        result += segment.distance * 3.9;
                    } else {
                        result += segment.distance * 5;
                    }
                } else {
                    if(segment.date.getDay() === 0) {
                        result += segment.distance * 2.9;
                    } else {
                        result += segment.distance * 2.1;
                    }
                }
            } else {
                res.json({ result: -2 });
                return;    
            }
        }  else {
            res.json({ result: -1 });
            return;    
        }
    }
    res.json({ result });
    return;    
});

app.listen(3000);