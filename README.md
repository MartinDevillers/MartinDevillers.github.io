[![Build Status](https://travis-ci.org/MartinDevillers/MartinDevillers.github.io.svg?branch=master)](https://travis-ci.org/MartinDevillers/MartinDevillers.github.io)
# Devillers - Freelance Software Engineer
This repository contains the source-code behind my corporate website and technology blog. Feel free to peek around :-)

Live: [devillers.nl](https://devillers.nl/en/)

## Setup
1. Install a full [Ruby development environment](https://jekyllrb.com/docs/installation/).
2. Install Jekyll, [bundler](https://jekyllrb.com/docs/ruby-101/#bundler), [gems](https://jekyllrb.com/docs/ruby-101/#gems) and html-proofer.
```
gem install jekyll bundler html-proofer
```
3. Ensure all dependencies in the Gemfile are available.
```
bundle install
```
4. Build the site and make it available on a local server.
```
bundle exec jekyll serve
```
5. Browse to [http://localhost:4000](http://localhost:4000)
