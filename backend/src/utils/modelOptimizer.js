const path = require('path');
const { compressModelFile } = require('./compressModelFile');

async function optimize3DModel(buffer, originalName) {
    const ext = path.extname(originalName).toLowerCase();

    if (ext === '.glb') {
        return await compressModelFile(buffer, originalName);
    }

    if (ext === '.gltf') {
        return {
            buffer,
            optimizedName: originalName,
        };
    }
    
    throw new Error('Unsupported file type. Only .gltf and .glb files are supported.');
}

module.exports = { optimize3DModel };