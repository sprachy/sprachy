#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: add-image.sh <paths-to-input-images>"
    exit
fi

for path in $@; do
  filename=$(basename -- "$path")
  filename_noext="${filename%.*}"


  cwebp $path -o assets/${filename_noext%.*}.webp
done
