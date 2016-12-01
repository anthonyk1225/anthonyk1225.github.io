---
layout: post
<!-- title:  "What is big O notation?" -->
date:   2015-02-11 23:34:00
categories: jekyll update
---
What exactly is big 0 notation? This is what I was asking myself just yesterday.

Simply put, Big-O notation is a relative representation of the complexity of an algorithm.

Wait, what does that mean?

O.K., you're not going to compare algorithms unless they are designed for the same purpose. If you have one algorithm that does a particular sort (bubble, insert, etc.), you wont compare it to an algorithm for reverse polish notation. Everything is relative, ESPECIALLY the comparison of algorithms.

Big O notation yields a score, or representation of how complex the algorithm is. It's easy to see why this is great for comparison purposes.

Between best, average, and worst case scenarios, it doesn't take long to realize why average, and worst are more important to test for than best. When you have consistent average, and worst case scenario outcomes, you can expect consistent outcomes. What would be the point of an algorithm if it was only reliable with 10% of parameters. Big O notation is about the worst-case scenario of an algorithm, making it a great tool for testing.

How many elements or parameters the algorithm passes through will affect the Big O's score. If an algorithm scales well, the big O will reflect that positively.

Big O notation is still new to me, and there is a lot I do not understand, but I do see the great benefit it holds with testing.
