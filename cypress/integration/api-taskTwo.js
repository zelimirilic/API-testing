/// <reference types="cypress" />

describe("Post, Get and Delete rtequest", () => {
    let comments = new Array();
    let randomComment = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    let randomPostId = Math.floor(Math.random() * 1000 + 1);

    it("Create a new comment", () => {

        cy.request({
            method: "POST",
            url: 'http://localhost:3000/comments/',
            body: {

                body: randomComment,
                postId: randomPostId
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

            body.forEach((item) => {
                comments.push(item["body"]);

            })
        }).then(() => {
            let latestComment = comments[comments.length - 1];
            expect(latestComment).to.equal(randomComment)
        })


    });

    it("Delete a new comment", () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/comments/' + comments.length
        }).then(response => {
            expect(response.status).to.equal(200);
        })

    })
})