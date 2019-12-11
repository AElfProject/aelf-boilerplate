#!/bin/bash
CONTRACT_NAME=$1
echo $CONTRACT_NAME
echo "${0%/*}"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Current script directory: $DIR"

parentdir="$(dirname "$DIR")"
chain_folder_path="$(dirname "$parentdir")"
echo $chain_folder_path

sed "s|{{ContractName}}|$CONTRACT_NAME|g" $chain_folder_path/scripts/template_script/template.proto  > $chain_folder_path/scripts/template_script/temp.proto
cp $chain_folder_path/scripts/template_script/temp.proto $chain_folder_path/protobuf/$CONTRACT_NAME.proto
rm $chain_folder_path/scripts/template_script/temp.proto


