FROM node:18 as builder
WORKDIR /opt/nodecg/bundles
RUN git clone https://github.com/IPLSplatoon/sj-overlays/
RUN git clone https://github.com/inkfarer/ipl-overlay-controls
WORKDIR /opt/nodecg/bundles/sj-overlays
RUN git checkout build --force
RUN npm i --omit=dev
WORKDIR /opt/nodecg/bundles/ipl-overlay-controls
RUN npm install
RUN npm run build

FROM ghcr.io/nodecg/nodecg:latest
USER nodecg
COPY --chown=nodecg:nodecg --from=builder /opt/nodecg/bundles/ /opt/nodecg/bundles/
RUN nodecg defaultconfig ipl-overlay-controls
