// punto uno
const mostrarLista = (lista) =>{
    if(!lista || !lista.length ) return "lista vacia"
    let msj =""
    lista.forEach(item => {
        msj+=` ${item}`
    });
    return msj
}

//punto dos, funcion anonima auto invocada // se ejecuta automaticamente   
(() => {
    const lista = ["mondongo", "messi"]
    const mostrarLista = (lista) =>{
        if(!lista || !lista.length ) return "lista vacia"
        let msj =""
        lista.forEach(item => {
            msj+=` ${item}`
        });
        return msj
    }
    
    console.log (mostrarLista(["mondongo", "messi"]))
    console.log (mostrarLista())

})()

// atributos: cosas que se pueden ver sobre el elemento
//metodos : acciones que puede hacer sobre el elemento


class contador {
    name 
    constructor(name){
        this.name=name
        this.cuenta=0

    }
    obtenerResponsable(){
        return `soy el responsable: ${this.name}`
    }
    obtenerCuentaIndividual(){
        return `cantidad: ${this.cuenta}`
    }

}