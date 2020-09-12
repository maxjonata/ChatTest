FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
RUN npm install -g @vue/cli
RUN npm install

RUN npm run serve