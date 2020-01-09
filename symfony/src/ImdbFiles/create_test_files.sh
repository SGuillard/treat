#!/bin/bash

rm ratings.tsv
head -10 originals/title.ratings.tsv > ratings.tsv
rm basics.tsv
head -10 originals/title.basics.tsv > basics.tsv
docker exec -i puissance4_mysql mysql -uroot -proot  <<< "use puissance4;delete from movie;"
#curl http://localhost/importFromRatings

