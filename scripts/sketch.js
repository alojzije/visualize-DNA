var lines = '';//ACGGCAAGTTTGTTTCAGCTACCATATCAAATATAATCCTGATTTGAAGAAAAGTTTATCCTTTAAGAAAGACAACAACATCTTAAGCCTTTTAGTCAGGAAGATGGAATCAGTACAAACTAAATGTCAGGAGAAGTGATACAGGGCAACTCACAGTTTTGGCTCCAGGAAAACAGCATCCGGAGAGAAATACTGGGAGCAAGCAGGAAGTGAATAGTAGGATCTACCAGCAGCTGACAATTATTGTGTGCATCAAAGTCAGATGAAGCAGGGGGGCAGCAGACCCCTCGTCACACCAAGGCAAAGATGAAGAAAAACTGCTGTTAGTTTAGTCAAGGAAAATCAGAAGAAAAGCATAAGGCCAATGAGGGGAATTCCCTCAAATAGTGCACTGAAGGAACCCAGGGGTGCCCGTCTGTTGAGCCAGCACAGCAAATTATTGTGGGTCAAATTATTGTACAATCCTGGGGTTGCTCTGGTAATAGATAAAGATTGTAACGCACAGTAGACATAATAGAGAACTTATCTATCAAGCAGTACAGCCAGATCCATTCCTGATTTGAAGAAAAATTTATAAAGCCCTCAGGTCAGACCCTGTGTGCATGGACAGAGAGAGCAGAAATTGTGTGAATATGCATGAGACAGGTACCTTTGGCAAGTTTGTTAAAAAAGAGAAGCAGCATGACATGGAAAAAAGCATTCTGGGATACTTGGGAGCAGAGCAATTTTAACTTCTGGGGATGGAACAATTTCATAATGATGCATGAGACAGGTAAGGTGCAGCAAGCTTTTAACATTAGGAGTAGGATCTGAGCCAGCTACCAGTATTGGAGGAGGCTACAAGCAGCAGAATGATAGGGCAGCAGTACAGTGCAAAAATGATACCCCTCGTCACAGTCTGGGGACAATGGACATCGAGCTGACACAATTACACATACAAGAATAAAGATGGAATCTCTACAATACAGAAAGAAATACTGGAACAATTTATAAATGGAGAGCTATTGAGGTGGGTGCGAGAGCAGAGAGCTTTGCCAAGTAGTGCTGTTAGAAAAATAGGGGGGCAAGAATGAGTCCGAGAGCAATGAGACGAGCTGCTTTTAGGAACAAAATCTGTTGATGATACAGTACAAACTAATACATTAGGAAAAGTAGTGTTTCAGACTCCTTGGGCAGCTACCAGCGGCTACACTAGAAGTGATAAAAGATATCCAGAGGAAGCAGCATCTCGAGACCAGCATCTCCTACAATGAGGGGATTAGATGGTGGTATAGCACAGTCTGGGACAGCTGTACTGGGGAAATACAAGAAGAATGAACATCTGTCAATGCCACACCAAGGGAAGTCAGATCCCTTCAGGAAAAGACAACAATGAGACGAGCTTTAGAGGAACAGATAGGGCACACAATCAGTGTGAATTATGTATGCCCCGGCTGGTTTAATAGCAACCATTATCAACATAAAGCTAGAACAGACCCCACCAAAAATTAACAGGGCTTGGTTTTCAGAGTTAGCTTTTTGCTGTACCAATGGCTTAGGCATCAAAGCTATTGTGGAGGAAGACTGTAGTGTGATACAGAGAGAAGCACAACAATTGTAAACTTGATCTGTTGTGTGGCAACTCAAGAGGAAGCCATGCTCCTCTGGCTAATTCAACAGCATCCAGGAAGACTATGTATGTAAAAACAGACAAGCCCCACTCTTTGGATGGTGCAGCAGCTGTTAGACAAGATTTGTACAGGCCTGTAGATTTCACGGACAAGTAGACAGTAGCATTGGGAGCCAGGAATAGTAAAATTAGGAAAAGCCACCTTTGGAATCATAGAAATGAAGAATTAGATACAGTACTGACAATGAGACACCAGAAGAAATAATAGTTGGAGGTAAGACCATGCTAAAAGTTAGCCCTCAATAATAAGACAGCGACGAAGAGCCGATAGACAAAAAATATCAAAGTAGTAATAACAAAAGAACCCACCAGCAATTATGGGGACCAGCAG';
var myp5;

window.onload = function(){

    var visualizeBtn = document.getElementById('dnaTxtButton');
    var dnaFileInput = document.getElementById('dnaFileInput');
    var dnaTextArea  = document.getElementById('dnaTextArea');
    var chosenFile   = document.getElementById("chosenFile");
    chosenFile.value  = '';
    dnaTextArea.value  = '';
    dnaFileInput.value = '';


    dnaFileInput.addEventListener('change', function(e){
      chosenFile.value = dnaFileInput.value;
      dnaTextArea.value = '';
      var file = dnaFileInput.files[0];
      if(file.type.match(/text.*/)){
        var reader = new FileReader();
        reader.onload = function(e){
            lines = reader.result;
        };
        reader.readAsText(file);
      }

    });

    visualizeBtn.addEventListener('click',function(e) {
      e.preventDefault();
      if(dnaTextArea.value !== ''){
        lines = dnaTextArea.value;
        dnaFileInput.value = '';
      }

      if(!myp5) 
        myp5 = new p5(s, 'canvasContainer');
      else{
        myp5.clear();
        myp5.background(0, 125);
        myp5.loop();
        myp5.redraw();
      }

  });
};

var s = function(sketch){

var xbound = 200;
var ybound = 200;
var px = xbound/2;
var py = ybound/2;  
var aminoacid = '';
var i = 0;


//  lines = loadStrings("MethanocaldococcusMarkov.txt");

  sketch.setup = function() {
    // put setup code here
    sketch.createCanvas(200,200);
    sketch.strokeWeight(2);
    sketch.stroke(0, 128, 128, 80);
    sketch.background(0, 125);
   // noLoop();

   
  };

  sketch.draw = function (){
    var cnt = 50;
    while(--cnt){
      aminoacid = lines.charAt(i).toUpperCase();   
      switch(aminoacid){
        case 'A':
          px = px/2;
          py = (py+ybound)/2;
          break;
        case 'T':
        case 'U':
          px = (px+xbound)/2;
          py = (py+ybound)/2;
          break;
        case 'G':
          px = (px+xbound)/2;
          py = py/2;
          break;   
        case 'C':
          px = px/2;
          py = py/2;
          break; 
        default:
          break;    
      }

      if(++i >= lines.length){
        sketch.noLoop(); 
        i = 0;
        break;
      }
      sketch.point(parseInt(px),parseInt(py));



    }

  };
};



