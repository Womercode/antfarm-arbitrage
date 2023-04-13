# Antfarm-bot
Alors tu dois faire d'abord un :

npm install

Dans secret.ts tu mets pour ton wallet
si y a des erreurs pg ça va qd meme marcher.
Après dans package.json d'abord tu mets à la place de bot/index.ts scripts/deploy.ts et après tu remets l'autre truc.
Normalement j'ai tout adapté, ah et juste quand tu exécuteras scripts/deploy.ts attention ça va prendre quelques ETH c'est pour déployer le smart contract.
Ducoup dans config.ts, add-basetoken.ts et show_status.ts tu mets à la place des adresses l'adresse du contract qui t'as été donnée
Dans tokens.ts tu mets les infos que tu veux, genre les DEX et voilà.