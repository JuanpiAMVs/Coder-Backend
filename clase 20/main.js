



//fs
const fileContainer = new ContenedorArchivo("file1");
//CREATE
/* fileContainer.create() */

//READ
/* fileContainer.getAll() */

//GET BY ID
/* fileContainer.getById(323) */

//UPDATE
/* fileContainer.update(323, {id: 1, mondongo:232}) */
//DELETE 
/* fileContainer.delete() */

 //mongodb

 const db = new ContenedorMongoDb()

 // create
/*  db.create({name: 'auto volador', price: 123, stock: 1}) */

 // read
/*  db.read() */

// update
/* db.update('63912813c937efd1f4f45054', {name: "auto volador1 updated", price:99, stock:100}) */

//detele
/* db.delete('63912813c937efd1f4f45054') */