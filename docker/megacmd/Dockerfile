# Create docker and upload to gitgud.io
# docker build -t gitgud.io:5050/user/project:megacmd .
# docker login gitgud.io
# docker push gitgud.io:5050/user/project:megacmd
#
# Debug build process
# docker build --no-cache --progress=plain -t megacmd .

# Create debian as base image
FROM debian

# Update
RUN apt-get -y update
RUN apt-get -y upgrade

# Install zip
RUN apt-get -y install zip

# mega cmd
RUN apt-get -y install wget
RUN wget https://mega.nz/linux/repo/Debian_11/amd64/megacmd-Debian_11_amd64.deb
RUN apt-get -y install ./megacmd-Debian_11_amd64.deb
