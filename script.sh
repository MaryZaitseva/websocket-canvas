#!/bin/bash

cat /dev/urandom | tr -dc '0-1' | head -c 80KB > test.txt

echo "$(cat test.txt)"


