import {
    Linear_Model
} from './linear_model';
import {
    generateData
} from './data';
import {
    plotData,
    plotDataAndPredictions
} from './ui'
import * as tf from '@tensorflow/tfjs';


async function start() {
    const trueCoefficients = {
        a: -.8,
        b: -.2,
        c: .9,
        d: .5
    };
    let trainingData = generateData(100, trueCoefficients);
    async function liner_method() {
        const linear_model = new Linear_Model();

        await plotData('#data .plot', trainingData.x, trainingData.yNormalized);

        const predictionsBefore = linear_model.predict(trainingData.x);
        await plotDataAndPredictions('#random .plot', trainingData.x, trainingData.yNormalized, predictionsBefore);

        for(let i=0;i<100;i++){
            linear_model.fit(trainingData.x, trainingData.yNormalized,1);
            const predictionsAfter = linear_model.predict(trainingData.x);
            const loss = await linear_model.loss(predictionsAfter, trainingData.yNormalized).data();
            document.querySelector('#trained .loss').innerHTML = loss;
            await plotDataAndPredictions('#trained .plot', trainingData.x, trainingData.yNormalized, predictionsAfter);
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(1)
                },200);
            })
        }
    }

    async function nn_model() {
        const model = tf.sequential();
        model.add(tf.layers.dense({
            units: 4,
            inputShape: [1],
            activation:'sigmoid'
        }));
        model.add(tf.layers.dense({
            units:1,
            activation:'sigmoid'
        }));
        model.compile({
            optimizer:tf.train.adam(0.1),
            loss:'meanSquaredError'
        })

        const trainingData_nn = {
            x: trainingData.x.reshape([100,1]),
            yNormalized: trainingData.yNormalized.reshape([100, 1])
        }
        await plotData('#data3 .plot', trainingData.x, trainingData.yNormalized);

        const predictionsBefore = model.predict(trainingData_nn.x);
        await plotDataAndPredictions('#random3 .plot', trainingData.x, trainingData.yNormalized, predictionsBefore);

        for(let i=0;i<200;i++){
            await model.fit(trainingData_nn.x,trainingData_nn.yNormalized,{
                epochs:1,
                callbacks: {
                    onEpochEnd: async (epoch, logs) => {
                        document.querySelector('#trained3 .loss').innerHTML = logs.loss;
                        await tf.nextFrame();
                    }
                }
            });
            const predictionsAfter = model.predict(trainingData_nn.x);
            await plotDataAndPredictions('#trained3 .plot', trainingData.x, trainingData.yNormalized, predictionsAfter);
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(1)
                },200);
            })
        }
    }
    const trueCoefficients2 = {
        a: -.8,
        b: -.2,
        c: .9,
        d: .5,
        e: .9,
    };
    const trainingData2 = generateData(100, trueCoefficients2);
    async function liner_method2() {
        const linear_model = new Linear_Model();

        await plotData('#data4 .plot', trainingData2.x, trainingData2.yNormalized);

        const predictionsBefore = linear_model.predict(trainingData2.x);
        await plotDataAndPredictions('#random4 .plot', trainingData2.x, trainingData2.yNormalized, predictionsBefore);

        for(let i=0;i<100;i++){
                linear_model.fit(trainingData2.x, trainingData2.yNormalized,1);
                const predictionsAfter = linear_model.predict(trainingData2.x);
                const loss = await linear_model.loss(predictionsAfter, trainingData2.yNormalized).data();
                document.querySelector('#trained4 .loss').innerHTML = loss;
                await plotDataAndPredictions('#trained4 .plot', trainingData2.x, trainingData2.yNormalized, predictionsAfter);
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(1)
                },200);
            })
        }
    }

    async function nn_model2() {
        const model = tf.sequential();
        model.add(tf.layers.dense({
            units: 12,
            inputShape: [1],
            activation:'sigmoid'
        }));
        model.add(tf.layers.dense({
            units:1,
            activation:'sigmoid'
        }));
        model.compile({
            optimizer:tf.train.adam(0.1),
            loss:'meanSquaredError'
        })

        const trainingData2_nn = {
            x: trainingData2.x.reshape([100,1]),
            yNormalized: trainingData2.yNormalized.reshape([100, 1])
        }
        await plotData('#data5 .plot', trainingData2.x, trainingData2.yNormalized);

        const predictionsBefore = model.predict(trainingData2_nn.x);
        await plotDataAndPredictions('#random5 .plot', trainingData2.x, trainingData2.yNormalized, predictionsBefore);

        for(let i=0;i<200;i++){
            await model.fit(trainingData2_nn.x,trainingData2_nn.yNormalized,{
                epochs:1,
                callbacks: {
                    onEpochEnd: async (epoch, logs) => {
                        document.querySelector('#trained5 .loss').innerHTML = logs.loss;
                        await tf.nextFrame();
                    }
                }
            });
            const predictionsAfter = model.predict(trainingData2_nn.x);
            await plotDataAndPredictions('#trained5 .plot', trainingData2.x, trainingData2.yNormalized, predictionsAfter);
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(1)
                },200);
            })
        }
    }

    liner_method();
    nn_model();
    liner_method2();
    nn_model2();
};
start();