export async function createExhibition(page) {
    const randomString = Math.random().toString(36).substring(2, 10);
    const title = `Exhibition ${randomString}`;
    const description = `Test description for ${title}`;

    const creationResponse = await page.request.post('/api/exhibitions/create', {
        data: {
            title: title,
            description: description,
        },
    });

    if (!creationResponse.ok()) {
        throw new Error(`Exhibition creation failed: ${await creationResponse.text()}`);
    }

    const responseData = await creationResponse.json();
    return {
        title,
        id: responseData.id,
    };
}