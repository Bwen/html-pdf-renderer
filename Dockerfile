FROM node:12-buster-slim

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg \
	--no-install-recommends

RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list

RUN apt-get update && apt-get install -y \
	google-chrome-stable \
	--no-install-recommends \
	&& apt-get purge --auto-remove -y curl \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2

RUN mkdir /app
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install --production

RUN chown node:node -R /app

COPY ./bin/docker-entrypoint.sh /usr/local/bin/chrome-entrypoint.sh
USER node
ENTRYPOINT ["chrome-entrypoint.sh"]
CMD [ "npm", "start" ]