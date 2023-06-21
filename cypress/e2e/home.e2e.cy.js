describe("Home E2E", () => {
	it("H-1 Home correct", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.visit("/");

		cy.get(".user-name").should("have.text", "John Doe");
		cy.get(".user-rut").should("have.text", "22.222****");
		cy.get(".user-email").should("have.text", "john@example.com");
	});

	it("H-2 Home incorrect due to user not validated", () => {
		cy.visit("/login");

		cy.get('input[type="email"]').type("correo.chistoso420@gmail.com");
		cy.get('input[type="password"]').type("Mango12345%");
		cy.get('button[type="submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "You need to verify your account");

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
	});

	it("H-3 Home incorrect", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.visit("/");

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please enter your credentials");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/login?login_error=1`);
		});
	});

	it("H-4 Get RUT of the user when clicking on the card", () => {
		cy.visit("/login");

		cy.get('input[type="email"]').type("correo@correo.co");
		cy.get('input[type="password"]').type("Mango12345%");
		cy.get('button[type="submit"]').click();

		cy.wait(2000);

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);

		cy.get('#user').click();

		cy.get('div')
			.find("#user-rut-complete")
			.should("contain.text", "13.702.594-9");
	});

	it("H-5 Block user", () => {
		cy.visit("/login");

		cy.get('input[type="email"]').type("correo@correo.co");
		cy.get('input[type="password"]').type("Mango12345%");
		cy.get('button[type="submit"]').click();

		cy.wait(2000);

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);

		cy.get('div')
			.find(".text-caption")
			.should("contain.text", "This user is unblocked");

		cy.get('button.bg-red').click();

		cy.wait(2000);

		cy.get('div')
			.find(".text-caption")
			.should("contain.text", "This user is blocked");
	});

	it("H-6 Unblock user", () => {
		cy.visit("/login");

		cy.get('input[type="email"]').type("correo@correo.co");
		cy.get('input[type="password"]').type("Mango12345%");
		cy.get('button[type="submit"]').click();

		cy.wait(2000);

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);

		cy.get('div')
			.find(".text-caption")
			.should("contain.text", "This user is blocked");

		cy.get('button.bg-green').click();

		cy.wait(2000);

		cy.get('div')
			.find(".text-caption")
			.should("contain.text", "This user is unblocked");
	});
});
