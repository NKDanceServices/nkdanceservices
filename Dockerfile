# Use phusion/passenger-full as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/passenger-docker/blob/master/Changelog.md for
# a list of version numbers.
# FROM phusion/passenger-full:<VERSION>
# Or, instead of the 'full' variant, use one of these:

FROM phusion/passenger-nodejs:0.9.18

# Upgrade os
RUN apt-get update && apt-get upgrade -y -o Dpkg::Options::="--force-confold"

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# If you're using the 'customizable' variant, you need to explicitly opt-in
# for features. Uncomment the features you want:
#
#   Build system and git.
#  RUN /pd_build/utilities.sh

#   Node.js and Meteor support.
#  RUN /pd_build/nodejs.sh

# ...put your own build instructions here...

# Install Git
RUN apt-get update
RUN apt-get install git

# Set up app directories
RUN mkdir /home/app/nkdanceservices
COPY . /home/app/nkdanceservices
WORKDIR /home/app/nkdanceservices
RUN chown -R app:app /home/app/nkdanceservices

# Install App
RUN \
	npm install -g grunt-cli && \
	npm install --production && \
	npm install mailgun-js --save && \
	node preinstall.js && \
	grunt init && \
	grunt prod 

#mount app directory
VOLUME /home/alexebube/app:/home/app/nkdanceservices

# Enable ssh
RUN rm -f /etc/service/sshd/down
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh
ADD docker/id_rsa.pub /tmp/id_rsa.pub
RUN cat /tmp/id_rsa.pub >> /root/.ssh/authorized_keys && rm -f /tmp/id_rsa.pub

# Enable nginx and passenger
EXPOSE 80
RUN rm -f /etc/service/nginx/down

# Configure web application
RUN rm /etc/nginx/sites-enabled/default
COPY docker/webapp.conf /etc/nginx/sites-enabled/webapp.conf

# Configure Nginx
COPY docker/secret_key.conf /etc/nginx/main.d/secret_key.conf
COPY docker/gzip_max.conf /etc/nginx/conf.d/gzip_max.conf

# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*