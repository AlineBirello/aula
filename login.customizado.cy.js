///<reference types="cypress"/>

describe('Teste de api - login', () => {
    it('Deve realizar login com sucesso', () => {
      cy.request ({
        method: 'POST',
        url: 'login',
        body: {
          "email": "beltrano@qa.com.br",
          "password": "teste"
        }
      }).then((response) =>{
        cy.log(response.body.authorization)
        expect(response.body.message).to.equal('Login realizado com sucesso')
        expect(response.status).to.equal(200)
      })
    })
  })