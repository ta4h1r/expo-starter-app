
let ip = "localhost"; 

let constants = {
  
    ticket_backend: `http://${ip}`,
    socket_uri: `http://${ip}:20000`,
    fleet_manager: `http://${ip}:20001`,
    queue_handler: `http://${ip}:20002`,
    notifications_server: `http://${ip}:20005`,
    pudu_microservice: `http://${ip}:29050/api`,

};

module.exports = constants;
