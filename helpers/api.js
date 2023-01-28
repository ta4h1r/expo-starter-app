const fetch = require("node-fetch");

const {
    fleet_manager,
    queue_handler,
    pudu_microservice, 
    ticket_backend,
    notifications_server, 
} = require('../constants');

let Helper = {}

let controller = new AbortController();

const TIMEOUT_SHORT = 5000;
const TIMEOUT_LONG = 30000;


Helper.sendDataToFleetController = async (route, data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, 2 * TIMEOUT_LONG)   // Doubled this timeout because of Gaussian OpenAPI latency
    const res = await sendDataToApi('POST', `${fleet_manager}/api/${route}`, data);
    clearTimeout(timeoutId)
    return res.json();
}


Helper.sendDataToQueueHandler = async (data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_LONG)
    const res = await sendDataToApi('POST', `${queue_handler}/api/qh`, data);
    clearTimeout(timeoutId)
    return { res: res.json(), status: res.status };
}


Helper.queryRobotsStatus = async (data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    const res = await sendDataToApi('POST', `${pudu_microservice}/robot/state`, data);
    clearTimeout(timeoutId)
    return res.json();
}


Helper.createTicketFromTaskStatusChange = async (data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    const {
        shortId, clientId, timestamps
    } = data;
    const rejectedTime = (typeof timestamps['rejected']) === 'object' ? timestamps['rejected'].join(" \n") : timestamps['rejected']; 
    const postData = {
        "title": "Expo task rejection",
        "description": `Task ${shortId}\nfor clientId: ${clientId}\nwas rejected at ${rejectedTime}`,
        "priority": "High",
        "status": "Open",
        "type": "Bug",
        "name": "auto: ctrl-expo",
        "email": "dev@ctrlrobotics.com"
    }
    const res = await sendDataToApi('POST', `${ticket_backend}/tickets/create`, postData);
    console.warn("Created ticket!")
    clearTimeout(timeoutId)
    return res.json();
}


Helper.createTicket = async (data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    
    const {
        name, title, email, priority, description, type
    } = data;
    const postData = {
        "title": title,
        "description": description, 
        "priority": priority,
        "status": "Open",
        "type": type,
        "name": name,
        "email": email, 
    }
    
    const res = await sendDataToApi('POST', `${ticket_backend}/tickets/create`, postData);
    console.warn("Created ticket!")
    clearTimeout(timeoutId)
    return res.json();
}


Helper.getScheduleData = async (data) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    
    const { clientId } = data; 
    if (!clientId) return; 
    const res = await sendDataToApi('GET', `${notifications_server}/api/notification/${clientId}`);

    clearTimeout(timeoutId)
    return res.json();
}


Helper.editScheduleData = async ({clientId, body, id}) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    
    if (!clientId || !id) return; 
    const res = await sendDataToApi('PATCH', `${notifications_server}/api/notification/${clientId}/${id}`, body);

    clearTimeout(timeoutId)
    return res.json();
}



Helper.createScheduleData = async ({clientId, body}) => {
    const timeoutId = setTimeout(() => {
        controller.abort()
        controller = new AbortController();
    }, TIMEOUT_SHORT)
    
    if (!clientId) return; 
    const res = await sendDataToApi('POST', `${notifications_server}/api/notification/${clientId}`, body);

    clearTimeout(timeoutId)
    return res.json();
}



function sendDataToApi(method, url, data) {
    // HTTP Request handler
    if (method == 'GET') {
        return fetch(url, {
            method: method, // POST, PUT, GET, DELETE
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            signal: controller.signal
        });
    } else {
        return fetch(url, {
            method: method, // POST, PUT, GET, DELETE
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });
    }
}



module.exports = Helper;