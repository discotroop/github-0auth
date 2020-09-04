9.4.2020:

Basic Structure:

1. Home page
2. Login - redirects
3. user dashboard
   a. display git commits
   b. display history
   c. display in app commits
   d. ?

How this needs to work?

1. get gh login securely
2. save basic user info & encrypted token to mongo db users section
3. get token from mongo db and use it to query gh api to populate fields (maybe save last sessions gh info to db as)

Schemas:

1. users
2. in app commits
3. git commits.

both types of commits should know who their user is via tokens

Might need to rework login process
