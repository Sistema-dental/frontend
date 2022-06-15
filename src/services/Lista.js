class ListaService {
    getAll(){
        const lista = localStorage.getItem('lista')
        return (lista) ? (JSON.parse(lista)) : ([])
    }

    get(id){
        const lista = this.getAll()
        return lista[id]
    }

    create(dados){
        const lista = this.getAll()
        lista.push(dados)
        localStorage.setItem('lista', JSON.stringify(lista))
    }

    update(id, dados){
        const lista = this.getAll()
        lista.splice(id, 1, dados)
        localStorage.setItem('lista', JSON.stringify(lista))
    }

    delete(id){
        const lista = this.getAll()
        lista.splice(id, 1)
        localStorage.setItem('lista', JSON.stringify(lista))
    }

}

export default new ListaService()