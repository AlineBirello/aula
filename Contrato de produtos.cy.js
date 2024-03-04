///<reference types="cypress"/>
import contrato from '../contratos/produtos.contrato'

describe('Teste de api em Produtos', () =>{

    let token

    beforeEach(() => {
        cy.token('beltrano@qa.com.br' , 'teste').then(tkn =>{
            token = tkn
        })
    });

    it('Deve validar contrato de produtos com sucesso', () =>{
        cy.request ('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
    })

    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'        
        }).should((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
        })        
    })

    it('Cadastrar produto com sucesso - POST', () => { 
        let produto = 'Produto EBAC' + Math.floor(Math.random() * 1000000000)   
        cy.cadastrarProduto(token,produto, 10, 'controle C', 100)
        .should((response) => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
    })

    it('Deve validar mensagem de produto cadastrado anteriormente - POST', () =>{
        cy.cadastrarProduto(token, 'Controle 001', 10, 'controle C', 100)
    .should((response) => {
        expect(response.status).equal(400)
        expect(response.body.message).equal('Já existe produto com esse nome')
    });
});
});