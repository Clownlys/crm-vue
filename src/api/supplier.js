import axios from '../utils/baseAxios'
let supplier={
    /**
     * findAll
     */
    findAll(currentPage,pageSize,searchForm){
        return axios.post(`supplier/findPage?currentPage=${currentPage}&pageSize=${pageSize}`,searchForm
            // searchForm.supplierName,searchForm.supplierContact,searchForm.supplierPhone,
            // searchForm.supplierAddress,searchForm.supplierBrank,searchForm.supplierBrankCode
            )
    },

    findById(id){
        return axios.get(`supplier/${id}`)
    },

    addEntity(entity){
        return axios.post(`supplier`,entity)
    },

    updateEntity(entity){
        return axios.put(`supplier`,entity)
    },

    deleteByIds(ids){
        return axios.delete(`supplier/${ids}`)
    }

}

export default supplier;