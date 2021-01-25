Feature: Testing a REST API.
    Rule: Users should be able to submit GET and POST requests to a web service, server should handle it.

    Rule: If user post /shorten endpoint with some URL, server should return shortened URL.

    Rule: If user hit get endpoint with shortened URL, server should redirect user to original URL.


    Scenario: Scenario for url shortening.
        When user post /shorten endpoint
        Then expect a shorten url. 

    Scenario: Scenario for getting original URL.
        When user get /:shorten_url
        Then expect an original URL.
