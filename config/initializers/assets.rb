Rails.application.config.middleware.insert_before 0, Rack::Static, {
  urls: ["/application.js", "/application.css"], # Add other specific asset files as needed
  root: Rails.root.join('app/assets/builds'),
  index: 'index.html'
}