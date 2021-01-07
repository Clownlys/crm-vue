import order from "@/api/order.js";

export default {
    name: "index",
    created() {
        // console.log(this.$route);
        this.order.orderId = this.$route.query.id
        // console.log(this.orderId);
        this.findOrder();
        this.orderGoodGet();

    },
    data(){

        return {
            orderId:'',
            order:{},
            orderAssets:{},


        }
    },
    methods:{
        async orderGoodGet(){
            let response = await order.orderGoodGet(this.order.orderId)
            this.order = response;
            console.log(response);
        },

        async findOrder(){
            let response = await order.findById(this.order.orderId)
            this.order.goodList = response;
            console.log(response);
        },
        async findOrderAssets(){
            let response = await order.findOrderAssets();
            this.orderAssets = response;
            console.log(this.orderAssets);
        },



    },

}