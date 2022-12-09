import { promises as fs } from 'fs'

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta
    }
            //CREATE
    async create() {
        try {
            const create = await fs.writeFile(`./${this.ruta}.json`, "");
            console.log(this.ruta + ".txt creado");
          } catch (err) {
            throw new Error(err);
          }
    }
            // READ
    async getAll(){
        try{
            const read = await fs.readFile(`./${this.ruta}.json`)
            return JSON.parse(read)
        }catch(err){
            throw new Error(err);
        }
    }
            // GET BY ID
    async getById(id){
        try{
           const found = await this.getAll()
           const find = found.find(i => i.id === id)
           if(!find){
            throw new Error('Item not found')
           }
           return find
        }catch(err){
            throw new Error(err);
        }
    }
            //UPDATE
    async update (id, changes ) {
        try{
            const data = await this.getAll()
            const index = data.findIndex((i) => i.id === id)
            if(index < 0) {
                throw new Error('Index not found');
            }
            const update = {...data[index], ...changes}
            data[index] = update;
            const rewrite = await fs.writeFile(`./${this.ruta}.json`, JSON.stringify(data))
            console.info('Updated!')
            return update
        }catch(err){
            throw new Error(err);
        }   
    }
            //DELETE
    async delete(){
        try{
           const deleteThis = await fs.unlink(`./${this.ruta}.json`)
         }catch(err){
            throw new Error(err);
        }   
    }
}

export default ContenedorArchivo