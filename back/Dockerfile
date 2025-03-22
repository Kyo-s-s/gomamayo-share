FROM ruby:3.3.4

RUN apt-get update && apt-get install -y \
    mecab \
    libmecab-dev \
    mecab-ipadic-utf8 \
    git \
    sudo

RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git /usr/local/src/mecab-ipadic-neologd && \
    cd /usr/local/src/mecab-ipadic-neologd && \
    ./bin/install-mecab-ipadic-neologd -n -y

RUN echo "dicdir = /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd" > /etc/mecabrc

WORKDIR /app

COPY Gemfile* .
RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-e", "production"]


# # syntax = docker/dockerfile:1

# # Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
# ARG RUBY_VERSION=3.3.4
# FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# # Rails app lives here
# WORKDIR /rails

# # Set production environment
# ENV RAILS_ENV="production" \
#     BUNDLE_DEPLOYMENT="1" \
#     BUNDLE_PATH="/usr/local/bundle" \
#     BUNDLE_WITHOUT="development"


# # Throw-away build stage to reduce size of final image
# FROM base as build

# # Install packages needed to build gems
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y build-essential git libvips pkg-config

# # Install application gems
# COPY Gemfile Gemfile.lock ./
# RUN bundle install && \
#     rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
#     bundle exec bootsnap precompile --gemfile

# # Copy application code
# COPY . .

# # Precompile bootsnap code for faster boot times
# RUN bundle exec bootsnap precompile app/ lib/


# # Final stage for app image
# FROM base

# # Install packages needed for deployment
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives

# # Copy built artifacts: gems, application
# COPY --from=build /usr/local/bundle /usr/local/bundle
# COPY --from=build /rails /rails

# # Run and own only the runtime files as a non-root user for security
# RUN useradd rails --create-home --shell /bin/bash && \
#     chown -R rails:rails db log storage tmp
# USER rails:rails

# # Entrypoint prepares the database.
# ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# # Start the server by default, this can be overwritten at runtime
# EXPOSE 3000
# CMD ["./bin/rails", "server"]
