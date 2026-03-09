describe("Login Form", () => {

  it("successful login redirects to main page", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")
    cy.get('input[name="terms"]').check()

    cy.contains("Login").click()

    cy.url().should("include", "/main")
  })


  it("without accepting terms, button is disabled", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("wrongemail")
    cy.get('input[name="password"]').type("Strong123!")

    cy.contains("Login").should("be.disabled")
  })

})
