var express = require('express');
var router = express.Router();
const json2csv = require('json2csv').parse;

router.get('/', (req, res, next) => {
  try {
    const data = [
      {
        _id: '63f0dc6493fa9772ea1adfe0',
        name: 'JS',
        description: 'Test nek2',
        createdAt: '2023-02-18T14:10:44.474Z',
        updatedAt: '2023-02-18T14:10:44.474Z',
        __v: 0,
      },
      {
        _id: '63f0f4a425a9a3b0c6bfaab3',
        name: 'ReactJS',
        description: 'Test nek4',
        createdAt: '2023-02-18T15:54:12.507Z',
        updatedAt: '2023-02-18T15:54:12.507Z',
        __v: 0,
      },
      {
        _id: '63f25c0c836385f001dd012e',
        name: 'Giang',
        description: 'Login/Logout',
        createdAt: '2023-02-19T17:27:40.548Z',
        updatedAt: '2023-02-19T17:27:40.548Z',
        __v: 0,
      },
    ];
    const fields = ['name', 'description', 'createdAt', 'updatedAt'];

    // Convert the data to a CSV string with only the specified fields
    const csv = json2csv(data, { fields });

    // Set the response headers to force a download of the CSV file
    res.set({
      'Content-Disposition': 'attachment; filename="data.csv"',
      'Content-Type': 'text/csv',
    });

    // Send the CSV file to the client
    res.send(csv);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
