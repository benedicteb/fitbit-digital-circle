#!/bin/sh
step=$1
last_tag=`git describe --abbrev=0 --tags`
major=`echo $last_tag | cut -d "." -f 1 | cut -d "v" -f 2`
minor=`echo $last_tag | cut -d "." -f 2`

case $step in
  'major')
    next_major=$((major + 1))
    next_version="v$next_major.0.0"
    ;;
  'minor')
    next_minor=$((minor + 1))
    next_version="v$major.$next_minor.0"
    ;;
  'bugfix')
    bugfix=`echo $last_tag | cut -d "." -f 3`
    next_bugfix=$((bugfix + 1))
    next_version="v$major.$minor.$next_bugfix"
    ;;
  *)
    echo "Usage: $0 {major,minor,bugfix}"
    exit 1
esac

git tag -a $next_version -m "Released $next_version"

echo "Released $next_version"
