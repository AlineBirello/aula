///<reference types="cypress"/>

describe('Teste de api em Produtos', () =>{
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
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbHRyYW5vQHFhLmNvbS5iciIsInBhc3N3b3JkIjoidGVzdGUiLCJpYXQiOjE3MDk1NTc0OTYsImV4cCI6MTcwOTU1ODA5Nn0.AMU-uwJeBbsd1z0oZJjB5-tjzFzawZUWHKfseefavik"
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body:{
                "nome": "Controle manual",
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