/// <reference types="cypress" />

describe("Get request", () => {
    var results;
    it("Validate status code of the /post API", () => {
        results = cy.request("http://localhost:3000/posts");
        results.its("status").should("equal", 200);

    })

    it('Validate /post API contains the correct keys and values', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body);

            expect(body[0]).has.property('title', "Example json-server");
            expect(body[1]).has.property('author', "Zeljko Ilic QA Tester");
            expect(body[2]).has.property('id', 3);

            body.forEach((item) => {
                expect(item).to.have.all.keys('author', 'title', 'id');
                cy.log("Author is " + item['author'] + " and title is " + item['title'] + " with ID number " + item['id']);
                
            });
        })

    })
})