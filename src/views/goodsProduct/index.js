import goodsProduct from "@/api/goodsProduct";
import brand from "@/api/brand"
import category from "@/api/category"

export default {
    name: "index",
    data() {
        return {
            brandList:[],
            categoryList:[],
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 5,
            ids:[],
            dialogDeleteVisible:false,
            searchForm:{}
        }
    },
    created() {
        this.findAll();
        this.findBrandList();
        this.findCategoryList();
    },
    methods: {
        async findBrandList(){
            let response=await brand.findNoPage();
            this.brandList=response.list;
        },
        async findCategoryList(){
            let response=await category.findNoPage();
            this.categoryList=response.list;
        },
        async findAll() {
            let response = await goodsProduct.searchPage(this.currentPage, this.pageSize,this.searchForm)
            this.tableData = response.list;
            this.total=response.total;
        },
        pageChange(page){
            this.currentPage=page;
            this.findAll();
        },
        async findById(id){
            this.formData= await goodsProduct.findById(id);
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
                await goodsProduct.deleteByIds(this.ids);
                this.findAll();
            }
        }
    }
}
