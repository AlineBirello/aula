///<reference types="cypress"/>

describe('Teste de api em Produtos', () =>{

    let token

    beforeEach(() => {
        cy.token('beltrano@qa.com.br' , 'teste').then(tkn =>{
            token = tkn
        })
    });

    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'        
        }).should((response) =>{
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
        })        
    })

    it('Cadastrar produto - POST', () => {        
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body:{
                //TODO: Criar produto dinamicamente
                "nome": "Controle v2",
                "preco": 100,
                "descricao": "Controle A",
                "quantidade": 100
              }
        }).should((response) => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
    })
})