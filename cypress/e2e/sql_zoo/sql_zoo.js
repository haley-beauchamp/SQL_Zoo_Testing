describe("Test Suite for SQL Zoo for Project Odin", () => {
	it("Opens the page!", () => {
		cy.visit("SQL_Tutorial");
		cy.get("h1").should("have.text", "SQL Tutorial");
	});
});
