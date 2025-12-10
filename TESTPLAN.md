## Test Plan

# 1. Automated Test Cases

Login: Verified successful login using valid username and password, including a negative cases for invalid user/password.

Inventory page: Validate that the inventory list loads correctly and verify that at least one item has: a name, an image, a price, an Add to Cart button.

Sort: sort all choice (name A to Z and vice versa, price low to high and vice versa). Verify that each sorting option produces the correct order. Make sure the assertions cannot pass coincidentally.

Checkout Flow: Add two different products to the cart -> Navigate to the cart -> Validate product details in the cart -> Remove one product -> Proceed through checkout, filling in required details -> Validate displayed totals, including tax and final amount -> Complete the 

checkout and verify the order confirmation page.

Email: Validate valid email followed given rules. Return an object with three arrays: valid Email, invalid Email, duplicate Email.

# 2. Additional Tests (if given more time)

Cross-browser testing: Run tests on Chromium, Firefox, and WebKit to ensure consistent behavior.

Localization checks: Validate content and flows for multiple regions/languages/account.

Negative scenarios: Extensive input validation, sort price, not enough money to pay, lost connection while paying/loading, round up or round down, how many product can buy in 1 time, 1 product can buy how many, any discount or sale, back end testing with sql and api, out of stock, transaction history of user, wish list or favourites, search and filter function, support multiple payment, giftcard testing, cached, 3rd party integrations, block VPN/ads, error handling, and session timeout cases.

Performance tests: Measure page load times and API response times during high load by stress test and load test.

Security tests: Block user/payment method/location for shipping and SQL injection.

# 3. Risks or Flaky Areas

Run test in parallel

API/server slow

Wait time not enough to wait element appears

Cross-browser testing: Run tests on Chromium, Firefox, and WebKit

Change database

# 4. Questions / Assumptions

Confirm you land on the inventory page => not clear

Validate that the inventory list loads correctly => define "load correctly"

Add two different products to the cart then Remove one product => not sure which product