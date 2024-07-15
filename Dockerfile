# Use an official Node.js runtime as a base image
FROM node:18.17.0
RUN git clone https://github.com/zoh-98/shellyV26/ /root/inrl
WORKDIR /root/inrl/
RUN npm install
EXPOSE 8000
CMD ["npm", "start"] 
