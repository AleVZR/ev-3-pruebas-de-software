describe("Verify E2E", () => {
    it("V-1 Verification correct", () => {
        cy.visit("/login");
        cy.get('input[id="login-email"]').type("correo.chistoso2@gmail.com");
        cy.get('input[id="login-password"]').type("Mango12345%");
        cy.get('button[id="login-submit"]').click();

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/login`);

        cy.get('input[id="verify-code"]').type("asd123");
        cy.get('button[id="verify-submit"]').click();

        cy.get("div")
            .find(".q-notification")
            .should("be.visible")
            .and("contain.text", "Verification successful");

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("V-2 Verification incorrect due to invalid code", () => {
        cy.visit("/login");
        cy.get('input[id="login-email"]').type("correo.chistoso420@gmail.com");
        cy.get('input[id="login-password"]').type("Mango12345%");
        cy.get('button[id="login-submit"]').click();

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);

        cy.get('input[id="verify-code"]').type("patata");
        cy.get('button[id="verify-submit"]').click();

        cy.get("div")
            .find(".q-notification")
            .should("be.visible")
            .and("contain.text", "the code is not valid");

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
    });

    it("V-3 Verification not needed", () => {
        cy.visit("/login");
        cy.get('input[id="login-email"]').type("correo@correo.co");
        cy.get('input[id="login-password"]').type("Mango12345%");
        cy.get('button[id="login-submit"]').click();

        cy.wait(1000);
        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/`);

        cy.wait(2000);

        cy.visit("/verify?verify_error=1");
        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);

        cy.get('input[id="verify-code"]').type("asd123");
        cy.get('button[id="verify-submit"]').click();

        cy.get("div")
            .find(".q-notification")
            .should("be.visible")
            .and("contain.text", "the user is already verified");

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/`);

    });
});