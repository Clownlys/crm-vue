import axios from '../utils/baseAxios'
let brand={

   findNoPage(){
       return axios.get(`brand/findNoPage`)
   },
    searchPage(currentPage,pageSize,formInLine){
        return axios.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}&brandName=${formInLine}`)
    },
    /**
     * findAll
     */
    findAll(currentPage,pageSize){
        return axios.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}`)
    },

    findById(id){
        return axios.get(`brand/${id}`)
    },

    addEntity(entity){
        return axios.post(`brand`,entity)
    },

    updateEntity(entity){
        return axios.put(`brand`,entity)
    },

    deleteByIds(ids){
        return axios.delete(`brand/${ids}`)
    }

}

export default brand;