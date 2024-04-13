# Build and run an FC Docker container
# $ docker build -t fc .
# $ docker run -d --rm -p 8080:80 fc
# Access with brownser at http://localhost:8080

# Compile
FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York
RUN apt update
RUN apt install -y git
WORKDIR /opt
RUN git clone https://gitgud.io/pregmodfan/fc-pregmod.git
WORKDIR /opt/fc-pregmod
RUN chmod +x devTools/tweeGo/tweego_nix*
RUN bash ./compile.sh

# Install the 3d renders hosted on mega.nz
RUN apt install -y megatools unzip
WORKDIR /tmp
RUN megadl --path=renders.zip https://mega.nz/#!upoAlBaZ!EbZ5wCixxZxBhMN_ireJTXt0SIPOywO2JW9XzTIPhe0
RUN unzip renders.zip
RUN cp -r 'Free Cities v 0.10.4 renders'/resources /opt/fc-pregmod/bin/

# Serve with nginx
FROM nginx
COPY --from=0 /opt/fc-pregmod/bin /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN mv FC_pregmod.html index.html
