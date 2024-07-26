#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

bundle install
# bundle exec rake assets:precompile
# bundle exec rake assets:clean
bundle exec rake db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"