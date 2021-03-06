import brand from "@/api/brand";

export default {
    name: "index",
    data() {
        return {
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 5,
            dialogFormVisible:false,
            formData:{},
            ids:[],
            dialogDeleteVisible:false,
            formInLine:{},
            brandName:""
        }
    },
    created() {
        this.findAll();
    },
    methods: {
        async findAll() {
            let response=await brand.searchPage(this.currentPage,this.pageSize,this.brandName)
            this.tableData = response.list;
            this.total=response.total;
        },
        // findAll(){
        //     axios.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}`)
        // },
        async addOrEdit(){
            if(this.formData.id){
                //修改
                await brand.updateEntity(this.formData);
            }else {
                //新增
                await brand.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage=page;
            this.findAll();
        },
        async findById(id){
            this.formData= await brand.findById(id);
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
                await brand.deleteByIds(this.ids);
                this.findAll();
            }
        }
    }
}
