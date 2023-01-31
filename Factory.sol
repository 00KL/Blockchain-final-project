// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract Curriculo {

    string private _cpf;
    address private _owner;
    address private _factory;
    string[] private _respostas;
    bool contratado = false;

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


    // ------------  CPF ------------ 
    function getCPF() public view returns (string memory) {
        return _cpf;
    }

    function setCPF(address caller, string memory nome ) public onlyOwner(caller) {
        _cpf = nome;
    }

    // ------------  Respostas ------------ 
    function setRespostas(string[] memory respostas) public {
        delete _respostas;
        for (uint i=0; i < respostas.length; i++){
            _respostas.push(respostas[i]);
        }
    }
    function getRespostas() public view returns(string[] memory) {
        return _respostas;
    }



}

contract Vaga_CurriculoFactory {

    string private _nome;
    address private _factory;
    uint256 private _disponibilidade;
    string[] private curriculos_CPFs;
    string[] _exigencias;

    mapping(string => Curriculo) _curriculos;

    constructor(string memory nome, string[] memory exigencias) {
        _factory =  msg.sender;
        _nome = nome;
        _disponibilidade++;
        for (uint i=0; i < exigencias.length; i++){
            _exigencias.push(exigencias[i]);
        }
    }

    //  ------------ Funções relacionadas a vaga ------------ 
    //  ------------ Disponibilidade ------------ 
    function getDisponibilidade() public view returns(uint256) {
        return _disponibilidade;
    }
    function incrementaDisponibilidade() public {
        _disponibilidade++;
    }
    function decrementaDisponibilidade() public {
        _disponibilidade--;
    }

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
    function createCurriculo(string memory cpf, string[] memory respostas) public {
        // pergunta se existe um curriculo criado pelo sender atual (quem está acessando o contrato)
        // Para fazer essa checagem se conslta a lista _curriculos na "posição" msg.sender e se compara com
        // um curriculo criado apartir de um endereço vazio "address(0)". 
        require (_curriculos[cpf] == Curriculo(address(0)));
        require (respostas.length == _exigencias.length);
        _curriculos[cpf] = new Curriculo(msg.sender, cpf, respostas);
        curriculos_CPFs.push(cpf);
    }

     function removeCPFfromCurriculos_CPFs(
        uint256 index
    ) public {
        if (index >= curriculos_CPFs.length) return;

        curriculos_CPFs[index] = curriculos_CPFs[curriculos_CPFs.length - 1];
        curriculos_CPFs.pop();
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
        removeCPFfromCurriculos_CPFs(index);
    }


    // ------------  CPF ------------ 
    function setCurriculoCPF(address account, string memory cpf) public {
        Curriculo(_curriculos[cpf]).setCPF(account, cpf);
    }

    function getCurriculoCPF(string memory cpf) public view returns(string memory) {
        return (_curriculos[cpf].getCPF());
    }

    // ------------  Respostas ------------ 
    function setCurriculoRespostas(string memory cpf, string[] memory respostas) external {
       Curriculo(_curriculos[cpf]).setRespostas(respostas);
    }

    function getCurriculoRespostas(string memory cpf) public view returns(string[] memory){
        return _curriculos[cpf].getRespostas();
    }

    // ------------ vaga Address ------------ 
    function getCurriculoAddressByCPF(string memory CPF) external view returns(address){
        return address(_curriculos[CPF]);
    }

    // ------------  CPFs ------------ 
    function getAllCurriculoCPFs() external view returns(string[] memory){
        return curriculos_CPFs;
    }

}

contract VagaFactory {
    mapping(string => Vaga_CurriculoFactory) _vagas;
    string[] nomes_vagas;
    mapping(address => string) address_cpf;
    mapping(string => string) cpf_vaga;

    // Var que guarda quem é o atual usuário do contrato
    address voterAddress;

    //test
    string test = "limpo";
    uint test2 = 0;

    function createVaga(string memory nome_vaga, string[] memory exigencias) public {
        require (_vagas[nome_vaga] == Vaga_CurriculoFactory(address(0)));
        _vagas[nome_vaga] = new Vaga_CurriculoFactory(nome_vaga, exigencias);
        nomes_vagas.push(nome_vaga);
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

    // ------------ vaga Address ------------ 
    function getVagaAddressByName(string memory nome_vaga) external view returns(address){
        return address(_vagas[nome_vaga]);
    }

    // ------------  Disponibilidade ------------ 
    function incrementaVagaDisponibilidade(string memory nome_vaga) external {
        Vaga_CurriculoFactory(_vagas[nome_vaga]).incrementaDisponibilidade();
    }

    function decrementaVagaDisponibilidade(string memory nome_vaga) external {
        Vaga_CurriculoFactory(_vagas[nome_vaga]).decrementaDisponibilidade();
    }

    function getVagaDisponibilidade(string memory nome_vaga) external view returns (uint256) {
        return _vagas[nome_vaga].getDisponibilidade();
    }

    function getVagaCPFsByName(string memory nome_vaga) external view returns (string[] memory) {
        return _vagas[nome_vaga].getAllCurriculoCPFs();
    }

    function deleteCurriculo(string memory cpf) public{
        Vaga_CurriculoFactory(_vagas[cpf_vaga[cpf]]).deleteCurriculoByCPF(cpf);
    }

    // ------------------------------------ Funções da curriculo ------------------------------------  
    // ------------  Criação ------------ 
    function createVagaCurriculo(string memory nome_vaga, string memory cpf, string[] memory respostas) public {
        // Checa se o cpf já está sendo usado, caso esteja apaga o registro atual e cria um novo
        if(keccak256(abi.encodePacked(address_cpf[msg.sender])) == keccak256(abi.encodePacked(cpf))){
            // O cpf repetido é usado como chave no mapping cpf_vaga para encontrar
            // o nome da vaga a q está associado, depois o nome da vaga é usado
            // no mapping _vagas para encontrar o contrato referente a vaga em questão.
            // Com o contrato identificado se apaga dele o cpf em questão para q o mesmo
            // seja registrado em outro contrato.
            deleteCurriculo(cpf);
        }
        
        // Guarda quem é o usuário atual do contrato
        address_cpf[msg.sender] = cpf;
        cpf_vaga[cpf] = nome_vaga;
        // Cria nova vaga
        Vaga_CurriculoFactory(_vagas[nome_vaga]).createCurriculo(cpf, respostas);

    }

    function removeCPFfromVaga(string memory nome_vaga, uint index) public {
        Vaga_CurriculoFactory(_vagas[nome_vaga]).removeCPFfromCurriculos_CPFs(index);
    }

    function checkIndexCPFVaga(string memory nome_vaga, string memory cpf) public{
        test2 = Vaga_CurriculoFactory(_vagas[nome_vaga]).getCPFIndex(cpf);
    }

    function checkAddressCPF() external view returns(string memory) {
        return address_cpf[msg.sender];
    }

    function testString() external view returns(string memory) {
        return test;
    }

    function test2Uint() external view returns(uint){
        return test2;
    }

    // ------------  Respostas ------------ 
    function setVagaCurriculoRespostas(string memory nome_vaga, string memory cpf, string[] memory respostas) external {
       Vaga_CurriculoFactory(_vagas[nome_vaga]).setCurriculoRespostas(cpf, respostas);
    }

    function getVagaCurriculoRespostas(string memory nome_vaga, string memory cpf) public view returns(string[] memory){
        return Vaga_CurriculoFactory(_vagas[nome_vaga]).getCurriculoRespostas(cpf);
    }

    // ------------ vaga Address ------------ 
    function getVagaCurriculoAddressByCPF(string memory nome_vaga, string memory cpf) external view returns(address){
        return Vaga_CurriculoFactory(_vagas[nome_vaga]).getCurriculoAddressByCPF(cpf);
    }

    // ------------  ------------ 


}
