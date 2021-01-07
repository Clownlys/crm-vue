import order from "@/api/order.js";


export default {
    name: "index.vue",
    data(){
        return {
            orderId:1,
            total:0,
            tableData:[],
            orderAssets:{
                orderActionList:[],
                payTypeList :[],
                bussinessTypeList:[],
                orderStatusList:[],
                orderTypeList :[],
            },
            formData:{
            },
            condition:{
                pageSize:5,
                currentPage:1,
                orderId:'',
                orderType:"-1",
                payType:"-1",
                bussinessType:"-1",
                beginTime:'',
                endTime:'',
                orderAction:"-1",
                orderStatus:"-1",

            },


        }
    },
    created() {
        this.findOrderAssets();

        this.findAll();

    },
    methods:{
        /**
         * 待条件查询所有
         * @returns {Promise<void>}
         */
        async findAll(){
              let response = await order.findAll(this.condition);
            this.tableData = response.list;
            this.total=response.total;

        },
        async findOrderAssets(){
            let response = await order.findOrderAssets();
            this.orderAssets = response;
            console.log(this.orderAssets);
        },
        /**
         * 页码改变
         * @param e
         */
        pageChange(e){
            this.condition.currentPage=e;
            this.findAll();
        },


        /**
         * 通过id查询
         * @param id
         * @returns {Promise<void>}
         */
        async findById(id){


            this.formData= await order.findById(id);
        },
        /**
         * 条件查询
         */
        onSubmit() {
           this.findAll();
        },

        /**
         * 重置表单
         */
        onReset(){
            this.condition = {
                pageSize:5,
                currentPage:1,
                orderId:'',
                orderType:"-1",
                payType:"-1",
                bussinessType:"-1",
                beginTime:'',
                endTime:'',
                orderAction:"-1",
                orderStatus:"-1",

            };
            this.findAll();
        },



        /**
         * 导出查询出的数据
         */
        onExport(){

        },



        orderTypeValue(id){
            let value=-1;
            this.orderAssets.orderTypeList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },
        orderActionValue(id){
            let value=-1;
            this.orderAssets.orderActionList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },
        bussinessTypeValue(id){
            let value=-1;
            this.orderAssets.bussinessTypeList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },

        payTypeValue(id){
            let value=-1;
            this.orderAssets.payTypeList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },
        deliveryTypeValue(id){
            let value=-1;
            this.orderAssets.deliveryTypeList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },
        orderStatusValue(id){
            let value=-1;
            this.orderAssets.orderStatusList.forEach(item=>{
                if(id==item.id){
                    value = item.name;
                }
                // if(value==item.id){
                //     return item.name;
                // }
            })
            return value;
        },











    },


}