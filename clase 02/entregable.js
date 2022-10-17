class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
        
        this.libros = [
            {nombre:'El senior de las moscas', autor: 'William Golding'},
            {nombre: 'Fundacion', autor: 'Isaac Asimov'}]
        this.mascotas = ["Perro"]
    }
    getFullName(){
        return(`El nombre de usuario es ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        return(this.mascotas.push(mascota))
    }
    countMascotas(){
        return(`El usuario tiene ${this.mascotas.length} mascotas`)
    }
    addBook(nombre, autor){
        let newBook = {nombre: nombre, autor: autor}
        this.libros.push(newBook)
    }
    getBookNames(){
        return(this.libros.map(nombre => nombre.nombre))
    }
}
const usuario =  new Usuario ('Juan Pablo', "Godoy")

usuario.addBook("Luna", "Sol")
console.log(usuario.getFullName())
console.log(usuario.addMascota('gato'))
console.log(usuario.countMascotas())
console.log(usuario.addBook('alo', 'kk'))
console.log(usuario.getBookNames())
console.log(usuario)