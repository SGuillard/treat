#!/bin/bash

rm ratings.tsv
head -10 title.ratings.tsv > ratings.tsv
rm basics.tsv
head -10 title.basics.tsv > basics.tsv
curl http://localhost/importFromRatings

