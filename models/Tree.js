import mongoose from 'mongoose'
const {Schema} = mongoose
import Warning from './Warning'

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const schema = new Schema({
    Id: Number,
    Plant_Year: Number,
    Operating_Organization: String,
    Is_Protected: Boolean,
    District: String,
    Location: {type: pointSchema, index:'2dsphere'},
    Warnings: [Warning]
})

// find all within 50 metres of a coordinate
schema.static.Get_Near = function (coordinates) {
    return this.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: 50
            }
        }
    })
}


module.exports = schema
