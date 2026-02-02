#!/bin/bash

# Runs cwebp recursively in the specified directory on all image files

PARAMS=('-m 6 -q 60 -mt -af -progress')

if [ $# -ne 0 ]; then
	PARAMS=$@;
fi

cd $(pwd)

shopt -s nullglob nocaseglob extglob

convert () {
  for FILE in $1/*; do
    if [[ -d $FILE ]]; then
      convert $FILE
    elif [[ $FILE == *.@(jpg|jpeg|tif|tiff|png) ]]; then 
      cwebp $PARAMS "$FILE" -o "${FILE%.*}".webp;
    fi
  done
}

convert "${1:-.}"