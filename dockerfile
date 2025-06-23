FROM node:22 as builder
WORKDIR /opt/nodecg/bundles
RUN git clone https://github.com/IPLSplatoon/sj-overlays/
RUN git clone https://github.com/inkfarer/ipl-overlay-controls
WORKDIR /opt/nodecg/bundles/sj-overlays
RUN git checkout build --force
RUN npm i
WORKDIR /opt/nodecg/bundles/ipl-overlay-controls
RUN npm install
RUN npm run build

FROM ghcr.io/nodecg/nodecg:latest
COPY --from=builder /opt/nodecg/bundles/ /opt/nodecg/bundles/