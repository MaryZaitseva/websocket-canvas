#!/bin/bash

cat /dev/urandom | tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c 10KB > test.txt;
# head -c 10K /dev/urandom > foo.txt 

echo "$(cat test.txt)"


