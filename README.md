# ssv-institutional-staking

## Overview
![Architecture](https://i.ibb.co/ZSNtwbK/Screenshot-2022-11-16-at-12-29-29.png)

## Visit website

https://blcs-inst-stake.vercel.app/ssv


## Run locally
1. In root folder execute :
```
$ sh run.sh
```

2. Generate your keystores
* generate ten keys locally with wagyu (https://github.com/stake-house/wagyu-key-gen/releases)
* copy them into backend/assets/keys
* rename keys similar to current naming (1-10)

3. Fix known build bug:
copy `latest.txt` into dist folder. 
Find file at `backend/assets/keys`
=> copy into backend/dist/assets/keys



