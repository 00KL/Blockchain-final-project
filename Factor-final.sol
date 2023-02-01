// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract Curriculo {

    string private _cpf;
    address private _owner;
    address private _factory;
    string[] private _respostas;
    bool private _contratado = false;

     modifier onlyOwner(address caller) {
        require(caller == _owner, "Voce nao e dono deste curriculo");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Voce deve usar a factory para acessar essa funcao");
        _;
    }

     constructor(address owner, string memory cpf, string[] memory respostas) {
        _owner = owner;
        _factory = msg.sender;
        _cpf = cpf;
        for (uint i=0; i < respostas.length; i++){
            _respostas.push(respostas[i]);
        }
    }

    // CPF não é alterado

    // ------------  Respostas ------------ 
    function setRespostas(address caller, string[] memory respostas) public onlyFactory onlyOwner(caller) {
        delete _respostas;
        for (uint i=0; i < respostas.length; i++){
            _respostas.push(respostas[i]);
        }
    }
    function getRespostas() public onlyFactory view returns(string[] memory)  {
        return _respostas;
    }

    // ---------- Contratado/status -----------
    function setContratado(bool status) public onlyFactory{
        _contratado = status;
    }

    function getContratado() public onlyFactory view returns(bool)  {
        return _contratado;
    }

}

contract Vaga_CurriculoFactory {

    string private _nome;
    address private _factory;
    string[] private curriculos_CPFs;
    string[] _exigencias;

    mapping(string => Curriculo) _curriculos;

    constructor(string memory nome, string[] memory exigencias) {
        _factory =  msg.sender;
        _nome = nome;
        for (uint i=0; i < exigencias.length; i++){
            _exigencias.push(exigencias[i]);
        }
    }

    //  ------------ Funções relacionadas a vaga ------------ 

    // ------------  Exigencias ------------ 
    function setExigencias(string[] memory exigencias) public {
        delete _exigencias;
        for (uint i=0; i < exigencias.length; i++){
            _exigencias.push(exigencias[i]);
        }
    }
    function getExigencia() public view returns(string[] memory) {
        return _exigencias;
    }

    // ------------------------------------ Funções da curriculo ------------------------------------  
    // ------------  Criação ------------ 
    function createCurriculo(address owner, string memory cpf, string[] memory respostas) public {
        // pergunta se existe um curriculo criado pelo sender atual (quem está acessando o contrato)
        // Para fazer essa checagem se conslta a lista _curriculos na "posição" msg.sender e se compara com
        // um curriculo criado apartir de um endereço vazio "address(0)". 
        require (_curriculos[cpf] == Curriculo(address(0)));
        require (respostas.length == _exigencias.length);
        _curriculos[cpf] = new Curriculo(owner, cpf, respostas);
        curriculos_CPFs.push(cpf);
    }

    function getCPFIndex(string memory cpf) public returns(uint) {
        uint index;
        uint i = 0;
        _curriculos[cpf] = Curriculo(address(0));
        for (i = 0; i<curriculos_CPFs.length; i++){
            if (keccak256(abi.encodePacked(curriculos_CPFs[i])) == keccak256(abi.encodePacked(cpf))) {
                index = i;
                break;
            }       
        }
        return index;
    }

    function deleteCurriculoByCPF(string memory cpf) public {
        uint index;
        index = getCPFIndex(cpf);
        if (index >= curriculos_CPFs.length) return;

        curriculos_CPFs[index] = curriculos_CPFs[curriculos_CPFs.length - 1];
        curriculos_CPFs.pop();
    }


    // ------------  Respostas ------------ 
    function setCurriculoRespostas(address owner, string memory cpf, string[] memory respostas) external {
       Curriculo(_curriculos[cpf]).setRespostas(owner, respostas);
    }

    function getCurriculoRespostas(string memory cpf) public view returns(string[] memory){
        return _curriculos[cpf].getRespostas();
    }

    // ------------  CPFs ------------ 
    function getAllCurriculoCPFs() external view returns(string[] memory){
        return curriculos_CPFs;
    }

    // ----------- Contratado/status --------------
    function setCurriculoContratado(string memory cpf, bool status) external {
       Curriculo(_curriculos[cpf]).setContratado(status);
    }

    function getCurriculoContratado(string memory cpf) public view returns(bool) {
        return Curriculo(_curriculos[cpf]).getContratado();
    }

}

contract VagaFactory {
    // Gerente
    address gerenteAddress = 0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a;
    // address gerenteAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; //test
    // address gerenteAddress = 0xA5095296F7fF9Bdb01c22e3E0aC974C8963378ad; //professora

    modifier onlyGerente() {
        require(msg.sender == gerenteAddress, "Esta funcao somente pode ser usada pelo gerente");
        _;
    }

    modifier onlyNaoEGerente() {
        require(msg.sender != gerenteAddress, "Gerente, vc ja tem emprego");
        _;
    }

    mapping(string => Vaga_CurriculoFactory) _vagas;
    string[] nomes_vagas;
    mapping(address => string) address_cpf;
    mapping(string => string) cpf_vaga;

    function createVaga(string memory nome_vaga, string[] memory exigencias) public onlyGerente {
        require (_vagas[nome_vaga] == Vaga_CurriculoFactory(address(0)));
        _vagas[nome_vaga] = new Vaga_CurriculoFactory(nome_vaga, exigencias);
        nomes_vagas.push(nome_vaga);
    }

    function isGerente() external view returns(bool){
        return msg.sender == gerenteAddress;
    }

    // ------------------------------------ Funções da vaga ------------------------------------ 

    // ------------  Exigencia ------------ 
    function setVagaExigencia(string memory nome_vaga, string[] memory exigencia) external {
       Vaga_CurriculoFactory(_vagas[nome_vaga]).setExigencias(exigencia);
    }

    function getVagaExigencia(string memory nome_vaga) public view returns(string[] memory){
        return _vagas[nome_vaga].getExigencia();
    }

    // ------------  Nomes ------------ 
    function getAllNomesVagas() external view returns(string[] memory){
        return nomes_vagas;
    }


    // ------------  Disponibilidade ------------ 

    function getVagaCPFsByName(string memory nome_vaga) external view returns (string[] memory) {
        return _vagas[nome_vaga].getAllCurriculoCPFs();
    }

    function getVagaByCPF(string memory cpf) public view returns(string memory){
        return cpf_vaga[cpf];
    }

    // ------------------------------------ Funções da curriculo ------------------------------------  
    // ------------  Criação ------------ 
    function createVagaCurriculo(string memory nome_vaga, string memory cpf, string[] memory respostas) public onlyNaoEGerente {
        // Checa se o cpf já está sendo usado, caso esteja apaga o registro atual e cria um novo
        if(keccak256(abi.encodePacked(address_cpf[msg.sender])) == keccak256(abi.encodePacked(cpf))){
            // O cpf repetido é usado como chave no mapping cpf_vaga para encontrar
            // o nome da vaga a q está associado, depois o nome da vaga é usado
            // no mapping _vagas para encontrar o contrato referente a vaga em questão.
            // Com o contrato identificado se apaga dele o cpf em questão para q o mesmo
            // seja registrado em outro contrato.
            Vaga_CurriculoFactory(_vagas[cpf_vaga[cpf]]).deleteCurriculoByCPF(cpf);
        }
        
        // Guarda quem é o usuário atual do contrato
        address_cpf[msg.sender] = cpf;
        cpf_vaga[cpf] = nome_vaga;
        // Cria nova vaga
        Vaga_CurriculoFactory(_vagas[nome_vaga]).createCurriculo(msg.sender, cpf, respostas);

    }

    function checkAddressCPF() external view returns(string memory) {
        return address_cpf[msg.sender];
    }

    // ------------  Respostas ------------ 
    function setVagaCurriculoRespostas(string memory nome_vaga, string memory cpf, string[] memory respostas) external {
       Vaga_CurriculoFactory(_vagas[nome_vaga]).setCurriculoRespostas(msg.sender, cpf, respostas);
    }

    function getVagaCurriculoRespostas(string memory nome_vaga, string memory cpf) public view returns(string[] memory){
        return Vaga_CurriculoFactory(_vagas[nome_vaga]).getCurriculoRespostas(cpf);
    }

    // ----------- Contratado/status --------------
    // Create an  transfer event 
    event changeContratado(string cpf, bool status);

    function contratarVagaCurriculo(string memory nome_vaga, string memory cpf, bool status) public onlyGerente {
        Vaga_CurriculoFactory(_vagas[nome_vaga]).setCurriculoContratado(cpf, status);
        emit changeContratado(cpf, status);
    }

    function getVagaCurriculoContratado(string memory nome_vaga, string memory cpf) public view returns (bool) {
        return Vaga_CurriculoFactory(_vagas[nome_vaga]).getCurriculoContratado(cpf);
    }



}
