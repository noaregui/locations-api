install:
	npm install

dev:
	npx ts-node src/index.ts

start:
	npx tsc
	node dist/index.js
