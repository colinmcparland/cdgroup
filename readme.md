# CDG Website

## Local Development
First pull down the repo and populate your env file with the appropriate data.  

Then get the `local-certs` folder from Colin and add the cert to your trusted certificates _(this can be done in osx by using the Keychain app)_.

Next, add the following virtual hosts to your `/etc/hosts` file

```
127.0.0.1 cdgroup-ae.dev
127.0.0.1 admin.cdgroup-ae.dev
```

Next, create the docker volume where we will store the database:

```
docker volume create db-volume
```

Then, build and start the docker instances by running
```
./buildDev.sh && ./runDev.sh
```
You should now be able to view the website at [https://cdgroup-ae.dev]() and [https://admin.cdgroup-ae.dev]().

## Accessing the database

### Dev database
The easiest way to access the database is by using a visual client.  I recommend [Sequel Ace](https://sequel-ace.com/).

Once you have your software installed, you can connect via TCP/IP with the host `localhost` and whatever username and password you put into `.env`.

Be aware that the database is stored in a Docker volume, meaning it will persist even if you destroy all the Docker containers and images.

### Prod database
To access the production database, you need to upload your public key to the remote file `/home/cdg/.ssh/known_hosts`.  Then, you can connect via SSH by using the SQL user `root`, the root password, ssh host `cdgroup-ae.com`, ssh user `cdg` and the SSH key `cdg`.  You will need to get the SQL root password and `cdg` key from Colin.

## SSL Certificates
We are using the `certbot` docker image to generate SSH certificates on prod _(locally, we are using self-signed certs)_.  The certificates are stored in remote folder `/var/website/certs` and there is a crontab running to attempt to renew the certificates every day.  To see the crontab, run `crontab -l`.

## TODO
- Separate `uploads`, `themes` and `plugins` into volume mounts on production, so we don't have to store that data in git
- Figure out a way to back up the production database, uploads, themes and plugins
- Figure out if there's a way for us to delete all the source code except `.sh` scripts when deploying to prod
- Look into using Dockerhub to just push images to server