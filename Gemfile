﻿source 'https://rubygems.org'

require 'json'
require 'open-uri'

# doing this because server admin forgot to renew their certificate!
# OpenSSL::SSL.send(:remove_const, :VERIFY_PEER)
# OpenSSL::SSL.const_set(:VERIFY_PEER, OpenSSL::SSL::VERIFY_NONE)

versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
