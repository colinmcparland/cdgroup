#!/bin/zsh
ssh cdgroot "mysqldump -u root --databases cdg > cdg.sql"
scp cdgroot:~/cdg.sql .
ssh cdgroot "rm cdg.sql"
mysql -u root -e "DROP DATABASE IF EXISTS cdg; CREATE DATABASE cdg"
mysql -u root cdg < cdg.sql
rm cdg.sql
