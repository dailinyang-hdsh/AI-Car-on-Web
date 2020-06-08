// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;
let resultsText;
function setup() {
  // Options for Neural Network
  createCanvas(400, 400);
  const options = {
    dataUrl:'t2.csv',
    inputs: ['s1', 's2', 's3', 's4', 's5'],
    outputs: ['left','right'],
    task: 'regression',
    debug: true,
    learningRate: 0.2,
    hiddenUnits: 16,
    layers: [
      {
        type: 'dense',
        units: 16,
        activation: 'relu'
      },
      {
        type: 'dense',
        units: 16,
        activation: 'sigmoid'
      },
      {
        type: 'dense',
        activation: 'sigmoid'
      }
    ]
  };
  // Create Neural Network
  nn = ml5.neuralNetwork(options,dataLoaded);

  // trainModel();
  resultsText = select('#results');

  // Train the model
  let trainBtn = select('#trainBtn');
  // trainBtn.position(10, 50);
  trainBtn.mousePressed(function () {
    trainModel();
  });

  //Save and download the model
  let saveBtn = createButton('Save Model');
  saveBtn.position(10, 90);
  saveBtn.mousePressed(function () {
    nn.save();
  });

  // // Load the model from local files
  // let loadLocalBtn = createButton('Load the model from local files');
  // loadLocalBtn.position(10, 110);
  // loadLocalBtn.mousePressed(function () {
  //   nn.load('model/model.json', function () {
  //     console.log('Model Loaded!');
  //   });
  // });

  // Load Data
  // let loadBtn = select('#load');
  // loadBtn.changed(function () {
  //   nn.loadData(loadBtn.elt.files, function () {
  //     console.log('Data Loaded!');
  //   });
  // });
}

function draw(){
  background(240);
}

function dataLoaded(){
  // continue on your neural network journey
  
  console.log('data loaded.')
  console.log('data normalizing.')
  nn.normalizeData();
  console.log('data normalized.')
  // ...
}

function trainModel() {
  
  const trainingOptions = {
    epochs: 32,
    batchSize: 300
  }
  // Train
  nn.train(trainingOptions, finishedTraining);
}

// Training callback
function finishedTraining() {
  //classify();
  console.log('finished Training')
}

function classify() {
  nn.classify({x:mouseX, y:mouseY}, gotResults);
}

function gotResults(error, results) {
  if (error) console.log(error);
  if (results) {
    // console.log(results)
    resultsText.html(`${results[0].label}`)
    classify();
  }
}