import mongoose from "mongoose";
import SpeciesSchema from 'models/Species'
import TreeSchema from 'models/Tree'
import WarningSchema from 'models/Warning'


mongoose.connect('mongodb://localhost:27017').then(()=>{
    const Species = mongoose.model('Species', SpeciesSchema)
    const Tree = mongoose.model('Tree', TreeSchema)
    const Warning = mongoose.model('Warning', WarningSchema)

})
