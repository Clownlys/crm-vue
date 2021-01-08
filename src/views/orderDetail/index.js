import order from "@/api/order.js";

export default {
    name: "index",
    data(){

        return {
            orderId:'',
            order:{},
            orderAssets:{
                // orderActionList:[],
                // payTypeList:[],
                // bussinessTypeList:[],
                // orderStatusList:[],
                // orderTypeList:[],
            },
            orderActionList:[],
            payTypeList:[],
            bussinessTypeList:[],
            orderStatusList:[],
            orderTypeList:[],
            goodList:{},


        }
    },
    created() {

        this.order.orderId = this.$route.query.id
        this.orderAssets = this.findOrderAssets()
        this.findOrder();
        this.orderGoodGet();
        // console.log(this.order);


    },

    methods:{
        async orderGoodGet(){
            let response = await order.orderGoodGet(this.order.orderId)
            this.goodList = response;
            // console.log(response);
        },

        async findOrder(){
            let response = await order.findById(this.order.orderId)
            this.order = response;
            // console.log(response);
        },
        async findOrderAssets(){
            let response = await order.findOrderAssets();
            this.orderAssets = response;
            // console.log(this.orderAssets);
        },

        goBack(){
            this.$router.back(-1);
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