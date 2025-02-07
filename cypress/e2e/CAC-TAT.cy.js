describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal','Central de Atendimento ao Cliente TAT')
    })

  it('Preenche o formulário',()=>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Balbinote')
    cy.get('#email').type('asdas@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    //verificar
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Balbinote')
    cy.get('#email').type('asdas@gmail.com')
    cy.get('button[type="submit"]').click()

    //verificar
    cy.get('.error').should('be.visible')
  })

  it('verificar telefone para não aceitar valor diferente de numero', () => {
    cy.get('#phone')
      .type('abcdefghijk')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Balbinote')
    cy.get('#email').type('asdas@gmail.com')
    cy.get('#phone-checkbox').check() //check em checkbox é melhor que click
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })
 it('Preenche e limpa os campos', ()=>{
  cy.get('#firstName')
    .type('Matheus')
    .should('have.value', 'Matheus')
    .clear()
    .should('have.value','')
 })

 // comandos customizados são meio que funções para tu usar em vários testes, 
 // eles ficam localizados no arquivo commands.js porém pode ser criado outros,
 // o importante é importar no arquivo e2e.js
 it('envia o formuário com sucesso usando um comando customizado',() => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
 })
 //esse teste foi colocando os valores já na função, no comando customizado

 it('envia o formuário com sucesso usando um comando customizado2', () => {
  // const data = {
  //   firstName: 'Matheus',
  //   lastName: 'Balbinote',
  //   email: 'balbinotem@gmail.com',
  //   text: 'teste.'
  // }
  //cy.fillMandatoryFieldsAndSubmit(data)
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
 })
 //já esse comando, é utilizado uma variavel data para assim conseguir mudar os dados
 it('click com contains', () => {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Balbinote')
    cy.get('#email').type('asdas@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
 })
 it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
 })
 it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox')
      .check()
      .should('be.checked')
    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')

  })
 //uma maneira melhor para fazer o check 
 it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
//simula um arquivo sendo enviado 'arrastando o arquivo'
  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  //removendo o target o link abre na mesma aba
  it('acessa a página da política de privacidade removendo o target e então clicando no link',() => {  
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .should('not.have.attr', 'target', '_blank')
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })
  //para abrir o cypress com dimensões de celular, no terminal basta escrever
  //npm cy:open:mobile, isso se da pq mudamos o script no arquivo package.json
  //e criamos esse comando para abrir com essas dimensões, sem precisar digitar
  // cypress open --config viewportWidth=370 viewportHeight=660
})
