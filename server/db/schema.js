import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const galleryItemSchema = new Schema({
    title: { type: String, required: true },
    created: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    favourite: { type: Boolean, required: false, default: false}
});

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);