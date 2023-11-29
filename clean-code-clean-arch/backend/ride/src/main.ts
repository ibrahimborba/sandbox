import express from 'express';
const app = express();
app.use(express.json());

app.post("/calc", function (req, res) {
    let result = 0;

    for (const segments of req.body) {
        segments.date = new Date(segments.date);
        
        if(segments.distance !== null && segments.distance !== undefined && typeof segments.distance === 'number' && segments.distance > 0) {
            if(segments.date !== null && segments.date !== undefined && segments.date instanceof Date && segments.date.toString() !== "Invalid Date") {
                if(segments.date.getHours() >= 22 || segments.date.getHours() <= 6) {
                    if(segments.date.getDay() !== 0) {
                        result += segments.distance * 3.9;
                    } else {
                        result += segments.distance * 5;
                    }
                } else {
                    if(segments.date.getDay() === 0) {
                        result += segments.distance * 2.9;
                    } else {
                        result += segments.distance * 2.1;
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