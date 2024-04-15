let fs = require('fs');
const FILE_NAME = './assets/cars.json';

let vehiclesRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    },
    getByID: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let vehicle = JSON.parse(data).find(p => p.id == id);
                resolve(vehicle);
            }
        });
    }
};

module.exports = vehiclesRepo;