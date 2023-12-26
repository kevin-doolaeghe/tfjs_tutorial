// Model: y=2x-1 function
async function processLinearFunction(input) {
    // Initialize the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compile the model
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // Set the model's inputs (6 rows, 1 column)
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model (250 iterations)
    await model.fit(xs, ys, { epochs: 250 });

    // Predict the output
    var predictions = model.predict(tf.tensor2d([input], [1, 1]));
    let result = predictions.dataSync();

    console.log('Result: ', result[0]);
    return result[0];
}

// Model: MobileNet
async function classifyImage(image) {
    // Load the MobileNet model
    const model = await mobilenet.load();

    // Classify the image
    let predictions = await model.classify(image);

    // const logits = model.infer(image);
    // const embedding = model.infer(image, true);

    // Extract the result
    let result = [];
    predictions.forEach((item, _) => result.push(item));

    console.log('Result: ', result);
    return result;
}
