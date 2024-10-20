source "https://rubygems.org"

ruby "3.1.6"

gem 'rails', '~> 7'

gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "redcarpet"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false
gem "jsbundling-rails", "~> 1.3"
gem "rest-client", "~> 2.1"
gem "json-pointer"

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug'

  gem "debug", platforms: %i[ mri windows ]
  gem 'rspec-rails'
  gem 'vcr'
  gem 'capybara', '>= 3.40'
  gem 'capybara-inline-screenshot'
  gem 'selenium-webdriver'
  gem 'webmock'
  gem 'factory_bot_rails'
  gem 'awesome_print'
end

group :development do
  gem "web-console"
  gem "error_highlight", ">= 0.4.0", platforms: [:ruby]
end



gem "dockerfile-rails", ">= 1.6", :group => :development
