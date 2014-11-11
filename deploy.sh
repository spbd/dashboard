#!/bin/bash

export YENV=prod

PATH_ROOT="$(dirname $0)"
PATH_STATIC="$PATH_ROOT/static"

PATH_SOURCE="$PATH_ROOT/build/dashboard"
PATH_SOURCE_JS="$PATH_SOURCE/_dashboard.js"
PATH_SOURCE_CSS="$PATH_SOURCE/_dashboard.css"
PATH_SOURCE_HTML="$PATH_SOURCE/dashboard.html"
PATH_SOURCE_HTML_INDEX="$PATH_SOURCE/index.html"

PATH_BUILDS="$PATH_ROOT/builds"
PATH_BUILDS_STATIC="$PATH_ROOT/builds/static"

PATH_BUILD="$PATH_ROOT/builds/master-$TRAVIS_BUILD_NUMBER"
PATH_STABLE="$PATH_ROOT/builds/stable"
PATH_PR="$PATH_ROOT/builds/pr-$TRAVIS_PULL_REQUEST"
PATH_PR_SOURCE="$PATH_PR/src"

enb make clean
enb make --no-cache

mv $PATH_SOURCE_HTML $PATH_SOURCE_HTML_INDEX

git clone -q --branch gh-pages "https://$GH_TOKEN@github.com/spbd/builds.git" "$PATH_BUILDS"

copy_static()
{
    cp -R $PATH_STATIC $1
}

copy_source()
{
    cp $PATH_SOURCE_JS $1
    cp $PATH_SOURCE_CSS $1
    cp $PATH_SOURCE_HTML_INDEX $1
}

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then

    rm -rf $PATH_PR
    mkdir -p $PATH_PR $PATH_PR_SOURCE
    copy_static $PATH_PR
    copy_source $PATH_PR_SOURCE
    echo "PR build is available at http://spbd.github.io/builds/pr-$TRAVIS_PULL_REQUEST/src"

elif [ "${TRAVIS_BRANCH}" = "master" ]; then

    rm -rf $PATH_STABLE $PATH_BUILDS_STATIC
    mkdir -p $PATH_BUILD $PATH_STABLE
    copy_static $PATH_BUILDS_STATIC
    copy_source $PATH_STABLE
    copy_source $PATH_BUILD
    echo "Stable build is available at http://spbd.github.io/builds/stable"
    echo "Master build is available at http://spbd.github.io/builds/master-$TRAVIS_BUILD_NUMBER"

fi

cd $PATH_BUILDS

git config user.name "Travis Publisher"
git config user.email "travis@publisher.com"
git add -A -f
git commit -m "Build $TRAVIS_BUILD_NUMBER"
git push origin gh-pages
