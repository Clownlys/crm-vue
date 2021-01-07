import axios from '../utils/baseAxios'

let order={


    findAll(condition){
       return  axios.get(`order`,{
            params:condition
        })
    },
    findById(id){
        return axios.get(`order/${id}`);
    },
    findOrderAssets(){
        return axios.get(`order/assets`)
    },

    orderGoodGet(orderId){
        return axios.get(`ordergood/orderid/${orderId}`);
    },



}

export default order;