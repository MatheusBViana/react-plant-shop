import './styles/menu_categorias.css';
import React from 'react';

function menu_categorias(){
    return (
        <div className="menu_categorias">
            <h2>Product Type</h2>
            <a href='loja_plantas'><h3 className="categoria-geral">Plants</h3></a>
            <a href='loja_plantas_interior'><p className="categoria-especifica">Indoor Plants</p></a>
            <a href='loja_plantas_horta'><p className="categoria-especifica">Herbs and spices</p></a>
            <a href='loja_plantas_arvores&amp;arbustos'><p className="categoria-especifica">Outdoor plants</p></a>
            <a href='loja_plantas_bulbos'><p className="categoria-especifica">Bulbs</p></a>

            <a href="loja_vasos"><h3 className="categoria-geral">Pots</h3></a>
            <a href="loja_vasos_ceramica" ><p>Ceramic</p></a>
            <a href="loja_vasos_plastico"><p>Plastic</p></a>

            <a href="loja_outros"><h3 className="categoria-geral">Others</h3></a>
            <a href="loja_outros_adubos&amp;fertilizantes"><p>Fertilizers & Manures</p></a>
            <a href="loja_outros_equipamentos"><p>Gardening Equipments</p></a>
        </div>
    )
}

export default menu_categorias;