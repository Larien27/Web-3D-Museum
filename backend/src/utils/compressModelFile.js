const fs = require('fs');
const path = require('path');
const { file: tmpFile } = require('tmp-promise');
const { NodeIO } = require('@gltf-transform/core');
const { draco } = require('@gltf-transform/functions');
const { KHRDracoMeshCompression } = require('@gltf-transform/extensions');
const draco3d = require('draco3dgltf');

async function compressModelFile(buffer, originalName) {
    const ext = path.extname(originalName).toLowerCase();

    // Check if the file is a GLB file
    if (ext !== '.glb') {
        throw new Error('Only .glb files are supported for this compression method.');
    }

    // Create temporary files for input and output
    const tempInput = await tmpFile({ postfix: '.glb' });
    const tempOutput = await tmpFile({ postfix: '.glb' });
    fs.writeFileSync(tempInput.path, buffer);

    // Initialize the NodeIO with Draco encoder
    const io = new NodeIO()
        .registerExtensions([KHRDracoMeshCompression])
        .registerDependencies({
            'draco3d.encoder': await draco3d.createEncoderModule(),
        });

    // Read the GLB file and apply Draco compression
    const document = await io.read(tempInput.path);
    await document.transform(draco({ method: 'edgebreaker' }));

    try {
        // Write the optimized GLB file to the output temp file
        await io.write(tempOutput.path, document);
    } catch (err) {
        console.error('Error writing GLB:', err);
        throw err;
    }

    // Read the optimized GLB file into a buffer
    const optimizedBuffer = fs.readFileSync(tempOutput.path);

    // Clean up temporary files
    tempInput.cleanup();
    tempOutput.cleanup();

    // Return the optimized buffer and the new file name
    return {
        buffer: optimizedBuffer,
        optimizedName: path.basename(originalName, ext) + '.glb',
    };
}

module.exports = { compressModelFile };