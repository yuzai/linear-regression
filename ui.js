import vegaEmbed from 'vega-embed';

export async function plotData(container, xs, ys) {
    const x = await xs.data();
    const y = await ys.data();

    const values = Array.from(y).map((v, i) => {
        return {
            'x': x[i],
            'y': y[i]
        };
    })

    const spec = {
        '$schema': 'https://vega.github.io/schema/vega-lite/v3.0.0-rc6.json',
        'width': 300,
        'height': 300,
        'data': {
            'values': values
        },
        'mark': 'point',
        'encoding': {
            'x': {
                'field': 'x',
                'type': 'quantitative'
            },
            'y': {
                'field': 'y',
                'type': 'quantitative'
            }
        }
    };

    return vegaEmbed(container, spec, {
        actions: false
    });
}

export async function plotDataAndPredictions(container, xs, ys, preds) {
    const xvals = await xs.data();
    const yvals = await ys.data();
    const predVals = await preds.data();

    const values = Array.from(yvals).map((y, i) => {
        return {
            'x': xvals[i],
            'y': yvals[i],
            pred: predVals[i]
        };
    });

    const spec = {
        '$schema': 'https://vega.github.io/schema/vega-lite/v3.0.0-rc6.json',
        'width': 300,
        'height': 300,
        'data': {
            'values': values
        },
        'layer': [{
                'mark': 'point',
                'encoding': {
                    'x': {
                        'field': 'x',
                        'type': 'quantitative'
                    },
                    'y': {
                        'field': 'y',
                        'type': 'quantitative'
                    }
                }
            },
            {
                'mark': 'line',
                'orientation': 'vertical',
                'encoding': {
                    'x': {
                        'field': 'x',
                        'type': 'quantitative'
                    },
                    'y': {
                        'field': 'pred',
                        'type': 'quantitative'
                    },
                    'color': {
                        'value': 'tomato'
                    }
                },
            }
        ]
    };

    return vegaEmbed(container, spec, {
        actions: false
    });
}

export async function plotLoss(container, loss){
    let x = [];
    const y = loss;
    for(let i=0;i<y.length;i++){
        x.push(i);
    }

    const values = Array.from(y).map((v, i) => {
        return {
            'x': x[i],
            'y': y[i]
        };
    })

    const spec = {
        '$schema': 'https://vega.github.io/schema/vega-lite/v3.0.0-rc6.json',
        'width': 300,
        'height': 300,
        'data': {
            'values': values
        },
        'mark': 'line',
        'encoding': {
            'x': {
                'field': 'x',
                'type': 'quantitative'
            },
            'y': {
                'field': 'y',
                'type': 'quantitative'
            }
        }
    };

    return vegaEmbed(container, spec, {
        actions: false
    });
}