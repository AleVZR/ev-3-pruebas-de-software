describe("Sign Up E2E", () => {
    it("R-1 Sign Up correct", () => {
        cy.visit("/register");

        cy.get("#register-email").type("a.valenzuela10@chile.cl");
        cy.get("#register-name").type("Nombre de ejemplo");
        cy.get("#register-rut").type("11043429-4");
        cy.get('[aria-label="Password"]').type("Mango12345%");
        cy.get('[aria-label="Confirm the password"]').type("Mango12345%");

        cy.get(".q-form").submit();

        cy.get("div")
        .find(".q-notification")
        .should("be.visible").and("contain.text", "Please login");

        cy.url()
            .should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("R-2 Sign Up incorrect due to email already used", () => {
        cy.visit("/register");

        cy.get("#register-email").type("a.valenzuela10@chile.cl");
        cy.get("#register-name").type("Nombre de ejemplo");
        cy.get("#register-rut").type("8722664-6");
        cy.get('[aria-label="Password"]').type("Mango12345%");
        cy.get('[aria-label="Confirm the password"]').type("Mango12345%");

        cy.get(".q-form").submit();

        cy.get("div")
        .find(".q-notification")
        .should("be.visible").and("contain.text", "the email already exists");

        cy.url().should("not.include", "/login");
    });

    it("R-3 Sign Up incorrect due to rut already used", () => {
        cy.visit("/register");

        cy.get("#register-email").type("AAAAAAAAAAA18@example.com");
        cy.get("#register-name").type("Nombre de ejemplo");
        cy.get("#register-rut").type("11043429-4");
        cy.get('[aria-label="Password"]').type("Mango12345%");
        cy.get('[aria-label="Confirm the password"]').type("Mango12345%");

        cy.get(".q-form").submit();

        cy.get("div")
        .find(".q-notification")
        .should("be.visible").and("contain.text", "the rut already exists");

        cy.url().should("not.include", "/login");
    });
});
