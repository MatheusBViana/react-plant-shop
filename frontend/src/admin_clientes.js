import CardAdminCliente from './card_admin_cliente';
import Footer from './footer';
import React from 'react';

function admin_clientes(){
    return(
        <div>

            <div>
                <div className="edit-panel">
                    <h1> Clientes </h1>
                    <CardAdminCliente indice={0} />
                    <CardAdminCliente indice={1} />
                    <CardAdminCliente indice={2} />
                    <CardAdminCliente indice={4} />
                    <CardAdminCliente indice={5} />
                    <CardAdminCliente indice={6} />
                    <CardAdminCliente indice={7} />
                    <CardAdminCliente indice={8} />
                    <CardAdminCliente indice={9} />
                    <CardAdminCliente indice={10} />
                    <CardAdminCliente indice={11} />
                    <CardAdminCliente indice={12} />
                    <CardAdminCliente indice={13} />
                    <CardAdminCliente indice={14} />
                    <CardAdminCliente indice={15} />
                    <CardAdminCliente indice={16} />
                    <CardAdminCliente indice={17} />
      
                </div>

                <div className="finalizar_ondinha">
            <img src={require("./button_images/detalhe.png")} alt="Detalhe onda verde"/>
        </div>
            </div>
            <Footer />
        </div>
    )
}

export default admin_clientes;