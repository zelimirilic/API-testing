/// <reference types="cypress" />

describe("Update request", () => {

    it("Update an existing post via /post API", () => {
        cy.request({
            method: "PUT",
            url: 'http://localhost:3000/posts/12',
            body: {
                title: 'How many presentation you have today?',
                author: 'Zelimir Ilic Licno'
            }

        }).then(response => {
            expect(response.status).to.equal(200);
        })
    });
})