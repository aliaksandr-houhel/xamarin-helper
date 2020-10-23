#!/bin/sh

# This script deletes every bin and obj directory in solution

constrainedPath="."
if [ -z $1 ] ; then
    exit 1
elif [[ $1 != *$constrainedPath* ]]; then
    echo "Invalid path. The allowable path is constrained to $constrainedPath (and subdirectories) for safety"
    exit 1
else
    foldersToRemove=$(find $1 -type d \( -name bin -o -name obj \))
    if [[ $foldersToRemove != "" ]]; then
        echo "Removing folders:"
        echo "$foldersToRemove"
        rm -rf `find $1 -type d \( -name bin -o -name obj \)`
    else
        echo "No bin or obj folders to remove"
    fi
fi
