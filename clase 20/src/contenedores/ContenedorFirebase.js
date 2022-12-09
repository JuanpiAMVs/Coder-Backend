import admin from 'firebase-admin';
import * as ServiceAccount from "../keys/rupert_keys.json"  assert { type: "json" };
import { v4 as uuidv4 } from 'uuid';

admin.initializeApp({

  credential: admin.credential.cert('../keys/rupert_keys.json')
});

console.info("FIREBASE CONNECTED")

const db = admin.firestore();
const query = db.collection('usuarios')

class ContenedorFireBase{
    constructor(){}
 

    async create(data){
        try{
            let id = 1
            let doc = query.doc(`${uuidv4()}`)
            await doc.create(data)
        }catch(err){
            throw new Error(err)
        }
    }

    async read(){
        try{
            const data = await query.get()
            return data.docs.forEach(doc => {
                console.log({id:doc.id,...doc.data()})
            })
        }catch(err){
            throw new Error(err)
        }
    }

    async getById(id){
        try{
            const data = query.doc(`${id}`);
            const item = await data.get()
            console.log(item.data())
        }catch(err){
            throw new Error(err)
        }
    }

    async update(id, changes){
        const doc = query.doc(`${id}`);
        if(!changes.name || !changes.price || !changes.price){
            return console.log('Data is missing in the request')
        } else{
            const response = await doc.update({name:changes.name, price: changes.price, stock: changes.stock})
            console.log(response)
        }


    }

    async delete(id){
        try{
            const doc = query.doc(`${id}`);
            const deleted = await doc.delete()
            console.log('Item has been deleted')    
        }catch(err){
            throw new Error(err)
        }

    }

}

export default ContenedorFireBase

const fb = new ContenedorFireBase()

/* fb.create({name: "JP GODOY", price: 123, stock:231}) */
/* fb.getById('1b37df0b-090c-4cf9-aa65-9ea40f24646d') */
/* fb.update('e129e0ea-8028-47fe-bc3c-bfa92d890bbd', {name: "Juan Pablo", price: 9990, stock:1}) */
/* fb.delete('1b37df0b-090c-4cf9-aa65-9ea40f24646d') */