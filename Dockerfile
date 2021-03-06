# Use the Ruby 2.7.1 image from Docker Hub
# as the base image (https://hub.docker.com/_/ruby)
FROM ruby:2.6.2
RUN apt-get update && apt-get install -y nodejs && apt-get install -y build-essential

# Use a directory called /code in which to store
# this application's files. (The directory name
# is arbitrary and could have been anything.)
WORKDIR /code

# Copy all the application's files into the /code
# directory.
COPY . /code

# Run bundle install to install the Ruby dependencies.
RUN bundle install

RUN apt-get install -y nodejs

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#RUN apt-get update && apt-get install -y yarn

# Run yarn install to install JavaScript dependencies.
#RUN yarn install --check-files

# Set "rails server -b 0.0.0.0" as the command to
# run when this container starts.
CMD ["rails", "server", "-b", "0.0.0.0"]

ENV NODE_ROOT /front_end

RUN mkdir -p $NODE_ROOT

WORKDIR $NODE_ROOT

COPY ./frontend .

RUN npm install -g @angular/cli

RUN yarn install
