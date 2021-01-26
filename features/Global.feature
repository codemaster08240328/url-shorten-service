Feature: Testing a REST API.
    Rule: Users should be able to submit GET and POST requests to a web service, server should handle it.

    Rule: If user post /shorten endpoint with valid URL, server should return 6 length shorten URL.

    Rule: If user post /shorten endpoint with invalid URL, server should return 400 Error, with msg "Invalid Url"

    Rule: If user hit get endpoint with random string, server should return 404 Error, with msg "Wrong Url!"

    Rule: If user hit get endpoint with shortened URL, server should redirect user to original URL.

    Scenario Outline: Scenario for valid URL shortening.
        Given A request with URL: "<url>"
        
        When User sends POST request to /shorten.
        
        Then expect a 201 status code.
        
        Then expect 6 length shorten URL. 

        Examples:
            | url                    |
            | https://google.com     |
            | https://youtube.com    |

    Scenario: Scenario for invalid URL validation.
        Given A request with URL: "google.com"

        When User sends POST request to /shorten.
        
        Then expect a 400 status code.

        Then expect error message: "Invalid Url".

    Scenario: Scenario for random shorten URL.
        Given A request with URL: "abc123"

        When User sends GET request

        Then expect a 404 status code.

        Then expect error message: "Wrong Url".
