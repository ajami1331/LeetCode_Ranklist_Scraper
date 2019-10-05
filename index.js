const fetch = require('node-fetch');

const url = ' https://leetcode.com/contest/api/ranking/';

async function* pages(contestSlug) {
    for (let page = 1; ; page++) {
        
        const pageUrl = url + contestSlug + `/?pagination=${page}&region=global`;

        console.log(pageUrl);

        const response = await fetch(pageUrl, { 
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

        if (data.total_rank.length == 0) {
            break;
        }

        yield data.total_rank;
    }
}

(async function(contestSlug) {
    try {
        let userByCounry = {};
        for await (const page of pages(contestSlug)) {
            console.log(page.length);
            for (const user of page) {
                if (!userByCounry[user['country_name']]) {
                    userByCounry[user['country_name']] = [];
                }
                userByCounry[user['country_name']].push(user);
            }
        }
        console.log(userByCounry['Bangladesh']);
    } catch (error) {
        console.log(error);
    }
})('biweekly-contest-10');