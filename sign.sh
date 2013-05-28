#!/bin/sh

export PATH=$PATH:~/Downloads/android-sdk-macosx/tools/

jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore ~/Dropbox/Work/7minuteworkout.keystore ~/Downloads/sevenminworkout.apk 7minuteworkout
rm ~/Downloads/sevenminworkout-release.apk
zipalign -v 4 ~/Downloads/sevenminworkout.apk ~/Downloads/sevenminworkout-release.apk
