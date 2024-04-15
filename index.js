//bring in the express server and create application
let express = require('express');
let app = express();
let vehicleRepo = require('./repos/vehiclesRepo');

//use the express Router object
let router = express.Router();

//ROUTER SECTION
//create GET to return a list of cities
router.get('/', function (req, res, next) {
    vehiclesRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All Vehicle retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

//create the router that uses an id calling the getById function
router.get('/:id', function (req, res, next) {
    vehicleRepo.getByID(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Vehicle retrieved",
                "data": data
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The vehicle with id '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The vehicle with id '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    })
});

//configure the router so all routers all prefixed with /api/v1
app.use('/api', router);

//create the server to listen on port 5000
var server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000...');
})