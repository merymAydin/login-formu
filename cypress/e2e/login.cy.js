describe("Login Form", () => {

  it("successful login redirects to success page", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")
    cy.get('input[name="terms"]').check()

    cy.contains("Login").click()

    cy.url().should("include", "/success")
  })


  it("invalid email shows error and button disabled", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("wrongemail")
    cy.get('input[name="password"]').type("Strong123!")

    cy.get(".error").should("have.length", 1)
    cy.contains("invalid email")

    cy.contains("Login").should("be.disabled")
  })


  it("invalid email and password show two errors", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("wrongemail")
    cy.get('input[name="password"]').type("123")

    cy.get(".error").should("have.length", 2)
    cy.contains("password")

  })


  it("button disabled when terms not accepted", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")

    cy.contains("Login").should("be.disabled")
  })

})