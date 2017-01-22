---
layout: page
title: Projects
permalink: /projects/
---

<h3>July 2015 - July 2015</h3>
<b><a href='http://wordsearchgame.ddns.net'>Word Search</a></b>
<br>
A simple word-search game written in Node js using Express, mongoDB and socket.io. User starts a game and sends the unique link generated for them, to their friends. Players can chat and guess words on the grid that are generated. Game supports up to 5 players and ends when all words are found. Game state and words are saved in db (MongoDB). All events are broadcasted on the page, or in the chat box for all players to see. Broadcasting and chat box made possible with sockets and rooms. Deployed using digital ocean and served using apache.

<h3>May 2015</h3>
<b><a href='https://peaceful-spire-6882.herokuapp.com/'>Sentiment Tracker</a></b>
<br>
The culmination of 4 months. The idea behind it is to search for stocks, given a date range anywhere from 10 years ago to present day. It takes the prices of the given range and plots it on a graph using D3. You then would be able to query twitter and it would plot those specific tweets and show if there is any correlation between the two. 

We made use of twitter API, Quandl's database and Alchemy API, to get the sentiment rating of each tweet. We also populated a part of the page with recent news stories of the company that you searched for, which were also able to be evaluated using Alchemy's sentiment evaluator. We were able to make this into a single page application using Ajax and moustache templating.