FROM mongo
COPY trees.json /trees.json
CMD mongoimport --host mongodb --db treesdb --collection trees --type json --file /trees.json --jsonArray
