const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const cleanFile = fs.readFileSync('./seed-data/trees-clean.csv')
const dirtyFile = fs.readFileSync('./seed-data/trees-dirty.csv')

let cleanContent = parse(cleanFile)
let dirtyContent = parse(dirtyFile)

species = []
trees = []

for (let i = 1; i < cleanContent.length; i++) {
    const treeData = cleanContent[i]
    let s = species.find(e=>{return e.Name_Danish === treeData[1] && e.Genus_Danish === treeData[2]})
    if(!s){
        const row = findSpeciesRow(treeData[1], treeData[2])
        if(!row){
            console.error("Unable to find latin data for: " +treeData[1])
        } else {
            s = {
                Id: species.length,
                Genus_Latin: row[3],
                Name_Latin: row[2],
                Genus_Danish: row[5],
                Name_Danish: row[4]
            }
            species.push(s)
        }
    }
    if(s) {
        tree = {
            Id: treeData[0],
            Plant_Year: parseInt(treeData[3]),
            Operating_Organization: treeData[4],
            Is_Protected: treeData[5] === 'True',
            District: treeData[6],
            Location: treeData[7].substring(7, treeData[7].length-1).split(' ').map(i=>parseFloat(i)),
            Species: s.Id
        }
        trees.push(tree)
        // console.log(treeData)
        // console.log(tree)
    }
}
console.log(`got ${trees.length} trees from ${species.length} species`)
// now convert this data to structured json
json_data = []

for (let s of species){
    s.trees = trees.filter(t => {return t.Species === s.Id})
    json_data.push(s)
}

fs.writeFileSync('./seed-data/trees.json', JSON.stringify(json_data))

function findSpeciesRow(danishName, danishGenus){
    for (let i = 0; i < dirtyContent.length; i++) {
        if(dirtyContent[i][4] === danishName && dirtyContent[i][5] === danishGenus){
            return dirtyContent[i]
        }
    }
    return null
}
