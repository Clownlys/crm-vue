import category from "@/api/category";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
    name: "index",
    components:{
        Treeselect
    },
    data() {
        return {
            tableData: [],
            dialogFormVisible:false,
            formData:{},
            ids:[],
            dialogDeleteVisible:false,
        }
    },
    created() {
        this.findAll();
    },
    methods: {
        // 如果后台返回的数据  与vue-treeselect要求的数据结构不同，例如，您的数据具有name属性，但vue-treeselect需要label，则可能需要自定义键名， 使用    :normalizer="propTreeNormalizer"
        propTreeNormalizer(node) {
            if(node.children==null||node.children=='null'){
                delete node.children;
            }
            return {
                id:node.id,
                label:node.categoryName,
                children: node.children
            }
        },
        async findAll() {
            this.tableData  = await category.getTreeData()
        },
        async addOrEdit(){
            if(this.formData.id){
                //修改
                await category.updateEntity(this.formData);
            }else {
                //新增
                await category.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage=page;
            this.findAll();
        },
        async findById(id){
            this.formData= await category.findById(id);
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
                await category.deleteByIds(this.ids);
                this.findAll();
            }
        }
    }
}
