import axios from '../utils/baseAxios'
let goods={
    /**
     * findAll
     */
    findAll(searchForm){
        return axios.post(`goods/findPage`,searchForm)
    },

    findById(id){
        return axios.get(`goods/${id}`)
    },

    addEntity(entity){
        return axios.post(`goods`,entity)
    },

    updateEntity(entity){
        return axios.put(`goods`,entity)
    },

    deleteByIds(ids){
        return axios.delete(`goods/${ids}`)
    }

}

export default goods;