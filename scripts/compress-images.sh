#!/bin/bash

# Runs cwebp recursively in the specified directory on all image files
# Outputs compressed webp files to _compressed/ subdirectory

PARAMS=('-m 6 -q 60 -mt -af -progress')
BASE_DIR="${1:-.local/s3-bucket}"
COMPRESSED_DIR="$BASE_DIR/_compressed"

shopt -s nullglob nocaseglob extglob

convert () {
  for FILE in $1/*; do
    if [[ -d $FILE ]] && [[ "$(basename $FILE)" != "_compressed" ]]; then
      convert "$FILE"
    elif [[ $FILE == *.@(jpg|jpeg|tif|tiff|png) ]]; then
      # Get relative path from base dir and create output path under _compressed
      REL_PATH="${FILE#$BASE_DIR/}"
      OUT_DIR="$COMPRESSED_DIR/$(dirname "$REL_PATH")"
      OUT_FILE="$OUT_DIR/$(basename "${FILE%.*}").webp"

      mkdir -p "$OUT_DIR"
      cwebp $PARAMS "$FILE" -o "$OUT_FILE"
    fi
  done
}

convert "$BASE_DIR"