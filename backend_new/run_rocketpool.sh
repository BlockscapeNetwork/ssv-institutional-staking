#!/bin/bash

# faucet
#rocketpool -r f w

# stake rpl 
#rocketpool -r n k <<< $'1\n\ny\n'

# create minipool and validator
# TESTING
#echo 'The validator pubkey is: 99af0ae241253e792521423fb1d9da77e90ac56cdb8147087c3bfee938ea7c7a02cbb2b07b080d7b97f31631946b5e11' | grep 'The validator pubkey is:' | sed 's/The validator pubkey is: //g' | xargs -I{} /root/.nvm/versions/node/v18.12.1/bin/node nft-service.js {}
/root/bin/rocketpool -r n d -y | grep 'The validator pubkey is:' | sed 's/The validator pubkey is: //g' 
#| xargs -I{} /root/.nvm/versions/node/v18.12.1/bin/node nft-service.js {}

