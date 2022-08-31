
import React from 'react';
import './styles/header.css'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import 'jquery-ui';

class Conta{
    constructor(nome_usuario, senha, email, telefone){
        this.id = localStorage.getItem('qtdClientes');
        this.nome_usuario = nome_usuario;
        this.senha = senha;
        this.email = email;
        this.telefone = telefone;
    }
}

var lista_contas = [
    
]

function atualiza_contas(){
    for(let i = 0; i < 10; i++){
        try{
            if(localStorage.getItem(`cliente${i}`)){
                lista_contas[i] = JSON.parse(localStorage.getItem(`cliente${i}`));
            }
        }catch(e){
            console.log(e);
        }
    }
    lista_contas = lista_contas.filter(conta => {return conta != null;});
}

atualiza_contas();


if(localStorage.getItem('serverON') == null){
    console.log("iniciando")
    localStorage.setItem('isLogged', false);
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('clienteAtivo', null);
    localStorage.setItem('qtdClientes', 0);
    localStorage.setItem('serverON', true);
    localStorage.setItem('janela_editar', false);
    localStorage.setItem('ordenacao_produtos', "padrao");


}

function header(){

    const navigate = useNavigate();

    console.log(localStorage.getItem('qtdClientes'));
    console.log("cliente0:", localStorage.getItem('cliente0'));
    console.log("cliente1:", localStorage.getItem('cliente1'));
    console.log("cliente2:", localStorage.getItem('cliente2'));
    console.log("lista contas:", lista_contas);

    let lista_admins = [
        {login: 'admin@admin.com', senha: 'admin'},
        {login: 'admin2@web.com', senha: 'admin2'},
    ]
        
    const isAdmin = useRef(("true" == localStorage.getItem('isAdmin')));
    const isLoggedIn = useRef(("true" == localStorage.getItem('isLogged')));
    const [errorMessage, setErrorMessage] = useState('');

    let minhaurl = window.location.href.substring(window.location.href.lastIndexOf('/'));


    
    const handle_login = async (event) => {
        event.preventDefault();
        console.log($('#username').val());
        let login = $('#username').val();
        let senha = $('#password').val();
        console.log("AQUI_______________________________________________");
        console.log(login);
        console.log(senha);
        let response = await fetch("http://localhost:3000/accounts");
        let accounts = await response.json();
        console.log(accounts);
        for (let account of accounts) {
            console.log(account);
            console.log(login);
            console.log(senha);
            if(account.email == login && account.password == senha){
                console.log("logado!!!");
                localStorage.setItem('isLogged', true);
                isLoggedIn.current = true;
                console.log(isLoggedIn.current);
                if(account.admin){
                    localStorage.setItem('isAdmin', true);
                    localStorage.setItem('clienteAtivo', `cliente?${account.id}`);
                    localStorage.setItem('id_cliente_ativo', `${account.id}`);
                    isAdmin.current = true;
                }else{
                    localStorage.setItem('clienteAtivo', `cliente?${account.id}`);
                    localStorage.setItem('id_cliente_ativo', `${account.id}`);
                    localStorage.setItem('isAdmin', false);
                    isAdmin.current = false;
                }
                setErrorMessage('');
                navigate('/home');
                return;
            }
        }
        setErrorMessage('Usuário ou senha incorretos');
        // alert("Usuário ou senha incorretos!");
        navigate('/home');
       
    }

    const trigger_cadastro = () =>{
        $('#cadastro-popup').show();
    }

    const trigger_perfil = () =>{

        console.log("trigou")
        // $('#opcoes-perfil').show();

        let teste = $('#opcoes-perfil').css('display');
        console.log(teste);
        if(teste == 'none'){
            $('#opcoes-perfil').show();
        }else{
            $('#opcoes-perfil').hide();
        }
       
    }


    const fazCadastro = async (event) => {
        event.preventDefault();
        if(document.getElementById('cadastro_email').checkValidity()) {
            if ($('#cadastro_senha').val() === $('#confirma_senha').val()){

                if ($('#cadastro_senha').val().length < 8){
                    alert("A senha deve ter no mínimo 8 caracteres!")
                    return;
                }
                console.log("entrou no cadastro!");

                let response = await fetch("http://localhost:3000/accounts/");
                let accounts = await response.json();
                
                let exists = false;
                for (let account of accounts){
                    if(account.email == $('#cadastro_email').val()){
                        exists = true;
                        break;
                    }
                }
                if (exists) {
                    alert("Email já cadastrado!");
                    return;
                }

                let id = 1;
					while (true) {
						let used = false;
						for (let account of accounts) {
							if (account.id == id) used = true;
						}
						if (used == false) {
                            console.log("used falso!");
							let new_account = {
								id: id,
								name: $('#cadastro_nome').val(),
								password: $('#cadastro_senha').val(),
								email: $('#cadastro_email').val(),
								phone: $('#cadastro_telefone').val(),
								admin: false,
								CEP: $('#cadastrar_cep').val(),
								numeroEndereco: 55,
                    
							};
                            console.log(new_account);
							await fetch(
								"http://localhost:3000/accounts/" + id,
								{
									method: "PUT",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json",
									},
									body: JSON.stringify(new_account),
								}
							);
							alert("Cadastro realizado com sucesso!");
                            localStorage.setItem('qtdClientes', parseInt(localStorage.getItem('qtdClientes')) + 1);
                            localStorage.setItem('isLogged', true);
                            localStorage.setItem('isAdmin', false);
                            isLoggedIn.current = true;
                            isAdmin.current = false;
                            localStorage.setItem('clienteAtivo', `cliente?${new_account.id}`);
                            localStorage.setItem(`numero_compras_cliente${new_account.id}`,0);
                            localStorage.setItem('id_cliente_ativo', new_account.id);
							break;
						} else id++;
                    }
                    navigate('/home');
                    return;
            }
            alert("Senhas não conferem.")
        }
        alert("Email inválido!")
        
    }

    const trigger_login = () => {
        setErrorMessage('');
        console.log("trigou")
        $('#login-trigger').next('.login-content').slideToggle(0);
        $('#login-trigger').toggleClass('active');
        $('#cadastro-popup').hide();

        if ($('#login-trigger').hasClass('active')){
            $('#login-trigger').find('span').html('&#x25B2;')
        } 
        else $('#login-trigger').find('span').html('&#x25BC;')
    }

    
    const trigger_loja_popup = () => {
        $('.loja-popup-content').show()
    }

    const trigger_loja_popup_leave = () => {
        $('.loja-popup-content').hide()
    }

    const handleKeyPress= (e) =>{
        if (e.key === 'Enter') {
            let busca = $('.buscar').val();
            localStorage.setItem('busca', busca.toLowerCase());
            console.log("enter");
            navigate(`/loja_busca`);
            window.location.reload()
        }
    }
    const toggleLogin = () => {
        if(window.confirm("Você deseja realmente sair?")){
            isLoggedIn.current = false;

            localStorage.setItem('preco_total', 0);
            localStorage.setItem('quantidade_no_carrinho', 0);
            localStorage.setItem('carrinho', null);
            localStorage.setItem('isLogged', false);
            navigate('home');
        }
        return;
    }

        // console.log(isLoggedIn);
    console.log("local storage", localStorage.getItem('isLogged'));

    return (
        <div className="barra_superior">
            <ul>
                <li>
                    <a href='/loja' onMouseEnter={trigger_loja_popup} onMouseLeave={trigger_loja_popup_leave}  className="botoes_barra" id="loja">Shop</a>
                </li>
                <li>
                    <Link to='/busca_personalizada' className="botoes_barra">Quiz</Link>
                </li>
                <li>
                    {/* <a className="botoes_barra" id="sobre" href="sobre">Sobre</a> */}
                    <Link to='/sobre' className="botoes_barra" id="sobre">About us</Link>
                </li>
                <li>
                    <Link to='/home' className="botoes_barra" id="home"></Link>
                    {/* <a className="botoes_barra" id="home" href="home"> */}
                        {/* Home */}
                        {/* <img src="images/logo_fundo_branco.png" style="width: 133px; height: 103px; margin-left: 10%;"/> */}
                    {/* </a> */}
                </li>
                <li>
                    <input onKeyUp={handleKeyPress.bind(this)} type="text" className="botoes_barraDIR buscar" placeholder="Search"/>
                </li>

                {!isLoggedIn.current ?
                <div>
                    <li id="login">
                        <a onClick={trigger_login} className="botoes_barraDIR" id="login-trigger" href="#">Login <span>▼</span></a>
                        <div className="login-content" id="login-popup">
                            <form>
                            <fieldset id="inputs">
                                <input  autoComplete="new-password" id="username"
                                        type="email"
                                        name="E-mail"
                                        placeholder="E-mail"
                                        required/>
                                <input  id="password"
                                        type="password"
                                        name="Password"
                                        placeholder="Password"
                                        required/>
                            </fieldset>
                            <fieldset id="actions">
                                <input  onClick={(event)=>handle_login(event)} type="submit"
                                        id="submit"
                                        value="Login"/>
                                <span id="msg_erro_login" style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{errorMessage}</span>
                                <p id="legenda-cadastro"> Not registered?</p>
                                <input onClick={trigger_cadastro} type="submit"
                                id="submit"
                                value="Sign up"/>
                            </fieldset>
                            </form>
                        </div>
                    </li>

                    <li id="cadastro">
                        <div className="login-content" id="cadastro-popup">
                            <form id="form_cadastro">
                            <fieldset id="inputs">
                            <input  autoComplete="new-password" id="cadastro_nome"
                            type="text"
                            name="Nome"
                            placeholder="Name"
                            required/>
                            <input  autoComplete="new-password" id="cadastro_email"
                                    type="email"
                                    name="E-mail"
                                    placeholder="Email"
                                    required/>
                            <input  id="cadastro_senha"
                                    type="password"
                                    name="Password"
                                    placeholder="Password"
                                    required/>
                            <input  id="confirma_senha"
                            type="password"
                            name="Confirm Password"
                            placeholder="Confirm Password"
                            required/>
                            <input  autoComplete="new-password" id="cadastro_telefone"
                            type="tel"
                            name="Telefone"
                            placeholder="Phone"
                            required/>
                            <input  autoComplete="new-password" id="cadastrar_cep"
                            type="text"
                            name="CEP"
                            placeholder="ZIP Code"
                            required/>
                          </fieldset>
                          <fieldset id="actions">
                            <input onClick={(event)=>fazCadastro(event)} type="submit"
                                    id="submit"
                                    value="Sign up"/>
                          </fieldset>
                            </form>
                        </div>
                    </li>
                    </div>
                 : 
                    isAdmin.current ?
                   <li>
                        <Link className="carrinho adminCliente" to="/admin_clientes">Clients</Link>
                        <Link className="carrinho adminProdutos" to="/admin_products">Products</Link>
                        <Link className="carrinho adminCompras" to="/lista_compras">Sales</Link>
                        <img id="icon-perfil" onClick={trigger_perfil} src={require('./button_images/icon-perfil.png')} alt="Perfil" />
                        <div id="opcoes-perfil">
                            <a href="editar_info_cliente" id="editar-perfil-button" className="editar-button-perfil">Editar</a>
                            <a id="logout-button" className="logout" onClick={toggleLogin}>Logout</a>
                        </div>
                        {/* <a className="logout" onClick={toggleLogin}>Logout</a> */}
                   </li>
                    : 
                    <li>
                        <Link className="carrinho pedidos" to="meus_pedidos">My Orders</Link>
                        <Link className="carrinho" id="div_do_carrinho" to="carrinho">
                            <img id="cesta_carrinho" src={require('./button_images/cesta.png')} alt="Carrinho" />
                        </Link>
                        <img id="icon-perfil" onClick={trigger_perfil} src={require('./button_images/icon-perfil.png')} alt="Perfil" />
                        <div id="opcoes-perfil">
                            <a href="editar_info_cliente" id="editar-perfil-button" className="editar-button-perfil">Edit</a>
                            <a id="logout-button" className="logout" onClick={toggleLogin}>Logout</a>
                        </div>
                    </li> 
                   
                }
                
            </ul>
            

            {/* Popup */}
            <div onMouseEnter={trigger_loja_popup} onMouseLeave={trigger_loja_popup_leave} className="loja-popup-content">
               
                <div id="loja-popup">

                    <div>
                        <a href='loja_plantas'><p className="categoria-geral">Plants</p></a>
                        <a href='loja_plantas_interior'><p className="categoria-especifica">Indoor plants</p></a>
                        <a href='loja_plantas_horta'><p className="categoria-especifica">Herbs and spices</p></a>
                        <a href='loja_plantas_arvores&amp;arbustos'><p className="categoria-especifica">Outdoor plants</p></a>
                        <a href='loja_plantas_bulbos'><p className="categoria-especifica">Bulbs</p></a>
                    </div>

                    <div>
                        <a href="loja_vasos">
                        <p className="categoria-geral">Pots</p>
                        </a>
                        <a href="loja_vasos_ceramica" ><p>Ceramic</p></a>
                        <a href="loja_vasos_plastico"><p>Plastic</p></a>
                    </div>
                   
                    <div>
                        <a href="loja_outros"><p className="categoria-geral">Others</p></a>
                        <a href="loja_outros_adubos&amp;fertilizantes"><p>Fertilizers & Manures</p></a>
                        <a href="loja_outros_equipamentos"><p>Gardening Equipments</p></a>
                    </div>
                </div>
        </div>
            {/* Popup */}
        </div>
    )
}

export default header;
export {atualiza_contas};