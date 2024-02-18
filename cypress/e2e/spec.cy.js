describe('E2E Tests', () => {
  it('should load the working examples', () => {
    cy.visit('/')

    // It should load the working examples
    cy.get('.h-16.w-24.cursor-pointer.rounded.border').should('be.visible')

    // Download button should be disabled
    cy.get('button').contains(/Download/i).should('be.disabled')

    // It should render the example
    cy.get('.h-16.w-24.cursor-pointer.rounded.border').wait(500).first().parent().trigger('mouseover').click()

    // It should download the rendered example
    cy.get('button').contains(/Download/i).click()
    cy.readFile("cypress/downloads/neatBG.png");
  })

  it('should load the image', () => {
    cy.visit('/')

    // It should load the file input
    cy.get("input[type='file']").wait(500).click({ force: true }).selectFile('cypress/exampleImage/exampleFile.png', { force: true })

    // It should load the image from the input
    cy.get('label[for="upload"]').contains(/change file/i)

    // It should download the rendered image
    cy.get('button').contains(/download/i).click()
    cy.readFile("cypress/downloads/neatBG.png");
  })

  it('should edit the loaded image', () => {
    cy.visit('/')

    // It should load the image from the input 
    cy.get("input[type='file']").wait(500).click({ force: true }).selectFile('cypress/exampleImage/exampleFile.png', { force: true })

    // It should load the advanced options switch and toggle the options
    cy.get('button[role="switch"]').wait(500).click()

    // It should edit the loaded image
    cy.get('button[role="combobox"]').click()
    cy.get('div').contains('Extreme').click()
    cy.get('span[role="slider"]').first().wait(500).type('{shift}{rightarrow}', { release: false }).wait(1000)

    // It should download the edited image
    cy.get('button').contains(/Download/i).click()
    cy.readFile("cypress/downloads/neatBG.png");
  })
})