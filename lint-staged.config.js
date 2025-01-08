module.exports = {
	'*.{js,mjs,cjs,ts,jsx,tsx}': ['prettier --write', 'eslint --fix', 'npm test -- --passWithNoTests']
};
