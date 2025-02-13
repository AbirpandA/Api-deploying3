// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const students = [
  { name: 'Alice Johnson', total: 433 },
  { name: 'Bob Smith', total: 410 },
  { name: 'Carol White', total: 350 },
  { name: 'David Brown', total: 470 },
];

app.use(bodyParser.json());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/threshold', (req, res) => {
  const threshold = req.body.threshold;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Threshold must be a number' });
  }

  const studentsAboveThreshold = students.filter(student => student.total > threshold);

  res.json({
    count: studentsAboveThreshold.length,
    students: studentsAboveThreshold,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


