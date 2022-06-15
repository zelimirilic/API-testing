/// <reference types="cypress" />

describe("Delete request", () => {

    it("Delete an existing post via /post API", () => {
        cy.request({
            method: "DELETE",
            url: 'http://localhost:3000/posts/4'

        }).then(response => {
            expect(response.status).to.equal(200);
        })
    });
})