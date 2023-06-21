describe("Login E2E", () => {
	it("L-1 Correct login", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("john@example.com");
		cy.get('input[type="password"]').type("2aSsword95%");
		cy.get('button[type="submit"]').click();

		cy.url()
            .should("eq", `${Cypress.config().baseUrl}/`);
	});

	it("L-2 Login incorrect", () => {
		cy.visit("/login");
		cy.get('input[id="login-email"]').type("john@example.com");
		cy.get('input[id="login-password"]').type("john@example.com");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "invalid credentials");
	});

	it("L-3 Login incorrect due to email with bad format", () => {
	  cy.visit("/login");
  
	  cy.get('input[type="email"]').type("dadsa@a");
	  cy.get('input[type="password"]').type("2aSsword95%");
	  cy.get('button[type="submit"]').click();
  
	  cy.get("div")
	  .find(".q-notification")
	  .should("be.visible")
	  .and("contain.text", "email is required and must be a valid email");
  
	  cy.url().should("include", "/login");
	});

	it("L-4 Login correct with user not validated", () => {
	  cy.visit("/login");
  
	  cy.get('input[type="email"]').type("correo.chistoso420@gmail.com");
	  cy.get('input[type="password"]').type("Mango12345%");
	  cy.get('button[type="submit"]').click();
  
	  cy.get("div")
	  .find(".q-notification")
	  .should("be.visible")
	  .and("contain.text", "You need to verify your account");
  
	  cy.url().should("include", "/verify?verify_error=1");
	});
});
