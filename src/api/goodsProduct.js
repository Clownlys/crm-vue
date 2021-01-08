import axios from '../utils/baseAxios'
let goodsProduct={
    findNoPage(){
        return axios.get(`goodsProduct/findNoPage`)
    },

    searchPage(currentPage,pageSize,formInLine){
        return axios.post(`goodsProduct/findPage?currentPage=${currentPage}&pageSize=${pageSize}`,formInLine)
    },
    /**
     * findAll
     */
    findAll(currentPage,pageSize){
        return axios.get(`goodsProduct?currentPage=${currentPage}&pageSize=${pageSize}`)
    },

    findById(id){
        return axios.get(`goodsProduct/${id}`)
    },

    addEntity(entity){
        return axios.post(`goodsProduct`,entity)
    },

    updateEntity(entity){
        return axios.put(`goodsProduct`,entity)
    },

    deleteByIds(ids){
        return axios.delete(`goodsProduct/${ids}`)
    }

}

export default goodsProduct;