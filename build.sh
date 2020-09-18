#!/bin/sh
BUILDER_VERSION="2.3.2"

if [ ! -d "ckeditor" ]; then
  echo "Install ckeditor at ./ckeditor"
  exit 1
fi
if [ ! -d "ckeditor/dev/builder/ckbuilder" ]; then
  echo "Run the builder at ckeditor/dev/builder/build.sh"
  exit 1
fi
if [ ! -d "ckeditor/dev/builder/ckbuilder/$BUILDER_VERSION" ]; then
  echo "Update the \$BUILDER_VERSION of this script to match the ckbuilder version"
  exit 1
fi

if [ -f "colorinput.zip" ]; then
    rm colorinput.zip
fi
zip -r colorinput.zip colorinput/
/usr/bin/java -jar "ckeditor/dev/builder/ckbuilder/$BUILDER_VERSION/ckbuilder.jar" --no-ie-checks --verify-plugin colorinput.zip
