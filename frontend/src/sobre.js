import './styles/sobre.css'
import Footer from './footer';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function sobre(){

   
    useEffect(() =>{
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () =>{
        const data = await fetch('/sobre');
        const items = await data.json();
        setItems(items);
    };

    return (

        <div>

            <div className="parent">
                <div className="titulo_sobre">

                    <h1>About</h1>
                </div>
                <div className="ondinha_meio_loja">
                    <img src={require("./button_images/fundo_verde.png")} alt="Detalhe onda verde"/>
                </div>
                <div style={{ fontFamily: 'Segoe UI' }} className="texto_sobre">
                Criada em 2022 por alunos da USP, a PlantCare nasceu de uma vontade enorme
                de viabilizar o acesso ao verde para todas as pessoas, sempre buscando oferecer a opção de 
                decoração que mais se adequa ao espaço do cliente. O respeito ao consumidor, a qualidade dos produtos e o atendimento personalizado
                são as especialidades e os pilares da nossa empresa. O acesso direto aos produtores é o principal diferencial da empresa que pode
                oferecer aos seus clientes produtos frescos a preços baixos. A empresa presta serviços de qualidade, com agilidade e excelência,
                envolvendo o cliente no processo para, assim, alcançar sua satisfação.
                </div>
                
                {/* <div className="titulo_fundadores">
                    <h1>Fundadores</h1>
                </div> */}

                <div className="cards_fundadores">
                    <div className="fundador">
                        <img src="images/matheus.jpg"/>
                        <h1>Matheus<br/>Bermudes</h1>
                        <p>-</p>
                        <p>11849797</p>
                    </div>
                </div>
                <img className="folha" src="images/folha.png"/>
                <div className="sobre_ondinha"></div>

        <Footer />
            </div>
        </div>

    )
}

export default sobre;