import requests from "./index";

const conversactionService = {
    getAll:  async (body)=> {
        console.log('service', body)
        return requests.post('/conversation/list', body);
    },
    getById: async(id) =>{
        return requests.get(`/conversation/${id}`);
    },
    addConversaction: async(body) => {
        return requests.post('/conversation/add', body);
    },
    updateConversaction: async(body) => {
        return requests.post('/conversation/update',body);
    },
    deleteConversaction: async(id) => {
        return requests.delete(`/conversation/${id}`);
    },
    feedbackMessage: async(body) =>{
        return requests.post(`/conversation/feedback`, body);
    }
}

export default conversactionService;