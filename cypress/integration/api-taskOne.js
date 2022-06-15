/// <reference types="cypress" />

describe("Post, Get and Delete rtequest", () => {

    it("Create a new comment", () => {
        cy.request({
            method: "POST",
            url: 'http://localhost:3000/comments/',
            body: {
                id: 3,
                body: "How many times I must say 'Hello World? - fourth!",
                postId: 3
            }

        }).then(response => {
            expect(response.status).to.equal(201);
        })
    });

    it("Locate and assert a new comment", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/comments",
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200);
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));
            cy.log(body);

            expect(body[0]).has.property('id', 1);
            expect(body[1]).has.property('body', "How many times I must say 'Hello World?");
            //expect(body[1]).has.property('body', "How many times I must say 'Hello World? - third!");
        })

    });

    it("Delete a new comment", () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/comments/3'
        }).then(response => {
            expect(response.status).to.equal(200);
        })

    })
})