#! /bin/bash
git_count=`git rev-list HEAD | wc -l | awk '{print $1}'`
date_android_1=`date +%m%d`
date_android_2=`echo $date_android_1 | awk  '{printf("%d\n",$1)}'`

data_ios=`date +%Y%m%d`

device_ios='ios'
if [ "$1" = "$device_ios" ]
then
   echo $data_ios$git_count
else
   echo $date_android_2$git_count
fi
