import goods from "@/api/goods";
import brand from "@/api/brand"
import category from "@/api/category"
import goodsProduct from "@/api/goodsProduct"

export default {
    name: "index",
    data() {
        return {
            prod:{},
            bran:{},
            cate:{},
            brandList:[],
            categoryList:[],
            goodsProductList:[],
            tableData: [],
            dialogFormVisible:false,
            formData:{},
            ids:[],
            dialogDeleteVisible:false,
            searchForm:{
                goodsProduct:{}
            },
            disabled:{
                default:false
            }
        }
    },
    created() {
        this.findAll();
        this.findBrandList();
        this.findCategoryList();
        this.findGoodsProductList();
    },
    methods: {
        dialogDetail(){
            this.disabled=true;
        },
        dialogEditOdEdit(){
            this.disabled=false;
        },
        async findGoodsProductById(){
            this.prod=await goodsProduct.findById(this.formData.prodId);
            console.log(this.prod)
            this.cate=this.prod.category;
            this.bran=this.prod.brand;
        },
        async findBrandList(){
            let response=await brand.findNoPage();
            this.brandList=response.list;
        },
        async findCategoryList(){
            let response=await category.findNoPage();
            this.categoryList=response.list;
        },
        async findGoodsProductList(){
            let response=await goodsProduct.findNoPage();
            this.goodsProductList=response.list;
        },
        async findAll() {
            let response = await goods.findAll(this.searchForm)
            this.tableData = response.list;
            this.total=response.total;
        },
        async addOrEdit(){
            if(this.formData.id){
                //修改
                await goods.updateEntity(this.formData);
            }else {
                //新增
                await goods.addEntity(this.formData);
            }
            this.findAll();
        },
        async findById(id){
            this.formData= await goods.findById(id);
            this.findGoodsProductById(id)
        },
        selectionChangeListener(selection){
            this.ids=[];
            selection.forEach(item=> this.ids.push(item.id))
            console.log(this.ids);
        },
        async deleteByIds(){
            if(this.ids.length==0){
                this.$notify.error({
                    title:'警告',
                    message:'请选择要删除的内容'
                })
            }else {
                await goods.deleteByIds(this.ids);
                this.findAll();
            }
        }
    }
}
