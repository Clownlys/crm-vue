import axios from '../utils/baseAxios'
let category={

    findNoPage(){
        return axios.get(`category/findNoPage`)
    },
    getTreeData(categoryName){
        return axios.get(`category/getTreeData?categoryName=${categoryName}`)
    },
    /**
     * findAll
     */
    findAll(currentPage,pageSize){
        return axios.get(`category?currentPage=${currentPage}&pageSize=${pageSize}`)
    },

    findById(id){
        return axios.get(`category/${id}`)
    },

    addEntity(entity){
        return axios.post(`category`,entity)
    },

    updateEntity(entity){
        return axios.put(`category`,entity)
    },

    deleteByIds(ids){
        return axios.delete(`category/${ids}`)
    }

}

export default category;