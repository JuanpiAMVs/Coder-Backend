import { v4 as uuidv4 } from 'uuid';

class ContenedorMemoria{
    constructor(){
        this.memory = []
    }

    async create(data){
        try{
            const id = uuidv4()
            const item = this.memory.push({id: id, ...data})
            console.log(this.memory)
        }catch(err){
            throw new Error(err)
        }

    }

    async read(){
        try{
            return this.memory
        }catch(err){
            throw new Error(err)
        }
    }

    async getById(id){
        try{
            const found = this.memory.find(i => i.id === id)
        }catch(err){
            throw new Error(err)
        }
    }

    async update(id, changes){
        try{
            const index = this.memory.findIndex(i => i.id === id)
            const select = this.memory[index];
            const updated = {...select, ...changes};
            select = updated
            return updated
        }catch(err){
            throw new Error(err)
        }
    }

    async delete(){
        try{
            const find = this.memory.findIndex(i => i.id === id)
            this.memory.splice(find, 1)
            return this.memory
        }catch(err){

        }
    }
}

export default ContenedorMemoria

const cm = new ContenedorMemoria()

cm.create({name: "Hi", price: 213, stock: 12})