#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: add-image.sh <path-to-input-image> <output-image-name>"
    exit
fi


cwebp $1 -o src/lib/img/$2.webp
