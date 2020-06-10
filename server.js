const express = require('express');
const http = require('http');
const app = express();
const news = require('./routes/News')
const category = require('./routes/Category')
const tag = require('./routes/Tag')
app.get('/',(req,res)=>{
    res.send('sucess')
})
app.use("/tags",tag)
app.use("/news",news)
app.use('/category',category)
const port = process.env.PORT || 4000;
const server = http.createServer(app)
server.listen(port,()=>{
    console.log(`Sever is listening on the port ${port}`)
})
// const axios = require('axios');
//     const cheerio = require('cheerio');

//     const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

//     axios(url)
//       .then(response => {
//         const html = response.data;
//         console.log(html)
//         const $ = cheerio.load(html)
//         const statsTable = $('.statsTableContainer > tr');
//         const topPremierLeagueScorers = [];

//         statsTable.each(function () {
//           const rank = $(this).find('.rank > strong').text();
//           const playerName = $(this).find('.playerName > strong').text();
//           const nationality = $(this).find('.playerCountry').text();
//           const goals = $(this).find('.mainStat').text();

//           topPremierLeagueScorers.push({
//             rank,
//             name: playerName,
//             nationality,
//             goals,
//           });
//         });

//         console.log(topPremierLeagueScorers);
//       })
//       .catch(console.error);