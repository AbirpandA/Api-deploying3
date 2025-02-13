const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const port = 3010;

app.use(express.json());


const rawData = fs.readFileSync('data.json');
const students = JSON.parse(rawData);

app.post('/students/threshold', (req, res) => {
    const { threshold } = req.body;

    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({
            error: 'Invalid threshold value. Please provide a positive number.'
        });
    }

    const filteredStudents = students.filter(student => student.total > threshold);

    res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    });
});

app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
