import './styles/home.css';
import Footer from './footer';
import React from 'react';

function home(){


    return (
        <div className="home-parent">
            <div className="content">

                <div className="foto1">
                    <div className="quiz">
                        <img src="images/logo_fundo_escuro.png"/>
                        <h1>Find the best plants for your house.
                        </h1>
                        <a href="busca_personalizada" className="buttonQuiz">Take the quiz</a>
                    </div>
                </div>
                
                <div className="home-ondinha"></div>

                <div className="tipos_produtos">
                    <h1>Products</h1>
                    <div className="lista_produtos">
                        <ul>
                            <li>
                                <a href='loja_plantas_interior' className="linkproduto">
                                    <article>
                                        <div className="slide" id="plantasCasa">
                                            <h2>Indoor Plants</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                          
                            <li>
                                <a href='loja_plantas_arvores&amp;arbustos' className="linkproduto">
                                    <article>
                                        <div className="slide" id="arbustos">
                                            <h2>Outdoor plants</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                            <li>
                                <a href='loja_plantas_horta' className="linkproduto">
                                <article>
                                    <div className="slide" id="hortinha">
                                            <h2>Herbs and spices</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                        </ul>
                        <ul className="lista2">
                            <li>
                                <a href='loja_vasos' className="linkproduto">
                                    <article>
                                        <div className="slide" id="vasos">
                                            <h2>Planters</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                            <li>
                                <a  href='loja_outros_equipamentos' className="linkproduto">
                                    <article>
                                        <div className="slide" id="equipamentos">
                                            <h2>Gardening<br/>Equipments</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                            <li>
                                <a href="loja_outros_adubos&amp;fertilizantes" className="linkproduto">
                                    <article>
                                        <div className="slide" id="fertilizantes">
                                            <h2>Fertilizers and<br/>Manures</h2>
                                        </div>
                                    </article>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default home;