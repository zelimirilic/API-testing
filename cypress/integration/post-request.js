/// <reference types="cypress" />

describe("Post request", () => {
    var titleOfPosts = new Array();
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    console.log(randomTitle);

    it("Create a new post via /post API", () => {
        cy.request({
            method: "POST",
            url: 'http://localhost:3000/posts',
            body: {
                title: randomTitle,
                author: 'Djoka Malesevic'
            }

        }).then(response => {
            expect(response.status).to.equal(201);
        })
    });

    it('Validate title of latest post', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));
            console.log(body);
            body.forEach(item => {
                titleOfPosts.push(item['title'])
            })

        }).then(() => {
            var latestPost = titleOfPosts[titleOfPosts.length - 1];
            console.log(latestPost);
            expect(latestPost).to.equal(randomTitle);
        })
    })

})