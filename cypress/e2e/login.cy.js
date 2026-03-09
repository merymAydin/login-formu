describe("Login Form", () => {
  const loginApi = "https://6540a96145bedb25bfc247b4.mockapi.io/api/login"

  it("successful login redirects to main page", () => {
    cy.intercept("GET", loginApi, [
      { email: "test@test.com", password: "Strong123!" },
    ]).as("getLogin")

    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")
    cy.get('input[name="terms"]').check()

    cy.contains("Login").click()
    cy.wait("@getLogin")

    cy.url().should("include", "/main")
  })


  it("button stays disabled until terms are accepted", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")

    cy.contains("Login").should("be.disabled")
  })


  it("button becomes enabled when terms are accepted", () => {
    cy.visit("/")

    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="password"]').type("Strong123!")
    cy.get('input[name="terms"]').check()

    cy.contains("Login").should("not.be.disabled")

  })


  it("invalid credentials redirect to error route", () => {
    cy.intercept("GET", loginApi, [
      { email: "someone@site.com", password: "Different123!" },
    ]).as("getLogin")

    cy.visit("/")

    cy.get('input[name="email"]').type("wrongemail@test.com")
    cy.get('input[name="password"]').type("wrongpass")
    cy.get('input[name="terms"]').check()

    cy.contains("Login").click()
    cy.wait("@getLogin")

    cy.url().should("include", "/error")
  })

})