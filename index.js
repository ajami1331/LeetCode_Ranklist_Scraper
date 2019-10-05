const fetch = require('node-fetch');

let page = 1;

async function* pages(url, totalPage) {
    for (let page = 1; page <= totalPage; page++) {
        
        const pageUrl = url + page;

        const response = await fetch(pageUrl);
        
        const data = await response.text();

        yield data;
    }
}

(async function(url, totalPage) {
    try {
        for await (const page of pages(url, totalPage)) {
            console.log(page);
        }
    } catch (error) {
        console.log(error);
    }
})('https://leetcode.com/contest/biweekly-contest-10/ranking/', 2);