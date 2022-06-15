class PedidoService {
    getAll(){
        const pedido = localStorage.getItem('pedido')
        return (pedido) ? (JSON.parse(pedido)) : ([])
    }

    get(id){
        const pedido = this.getAll()
        return pedido[id]
    }

    create(dados){
        const pedido = this.getAll()
        pedido.push(dados)
        localStorage.setItem('pedido', JSON.stringify(pedido))
    }

    update(id, dados){
        const pedido = this.getAll()
        pedido.splice(id, 1, dados)
        localStorage.setItem('pedido', JSON.stringify(pedido))
    }

    delete(id){
        const pedido = this.getAll()
        pedido.splice(id, 1)
        localStorage.setItem('pedido', JSON.stringify(pedido))
    }

}

export default new PedidoService()