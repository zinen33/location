const os = require('os');

console.log('CPU architecture: ', os.arch());
console.log('Number of CPUs: ', os.cpus().length);
console.log('Total memory: ', os.totalmem());
console.log('Free memory: ', os.freemem());
console.log('Operating system: ', os.type());



// Code chỉ để test