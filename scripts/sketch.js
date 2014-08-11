var lines = '';//ACGGCAAGTTTGTTTCAGCTACCATATCAAATATAATCCTGATTTGAAGAAAAGTTTATCCTTTAAGAAAGACAACAACATCTTAAGCCTTTTAGTCAGGAAGATGGAATCAGTACAAACTAAATGTCAGGAGAAGTGATACAGGGCAACTCACAGTTTTGGCTCCAGGAAAACAGCATCCGGAGAGAAATACTGGGAGCAAGCAGGAAGTGAATAGTAGGATCTACCAGCAGCTGACAATTATTGTGTGCATCAAAGTCAGATGAAGCAGGGGGGCAGCAGACCCCTCGTCACACCAAGGCAAAGATGAAGAAAAACTGCTGTTAGTTTAGTCAAGGAAAATCAGAAGAAAAGCATAAGGCCAATGAGGGGAATTCCCTCAAATAGTGCACTGAAGGAACCCAGGGGTGCCCGTCTGTTGAGCCAGCACAGCAAATTATTGTGGGTCAAATTATTGTACAATCCTGGGGTTGCTCTGGTAATAGATAAAGATTGTAACGCACAGTAGACATAATAGAGAACTTATCTATCAAGCAGTACAGCCAGATCCATTCCTGATTTGAAGAAAAATTTATAAAGCCCTCAGGTCAGACCCTGTGTGCATGGACAGAGAGAGCAGAAATTGTGTGAATATGCATGAGACAGGTACCTTTGGCAAGTTTGTTAAAAAAGAGAAGCAGCATGACATGGAAAAAAGCATTCTGGGATACTTGGGAGCAGAGCAATTTTAACTTCTGGGGATGGAACAATTTCATAATGATGCATGAGACAGGTAAGGTGCAGCAAGCTTTTAACATTAGGAGTAGGATCTGAGCCAGCTACCAGTATTGGAGGAGGCTACAAGCAGCAGAATGATAGGGCAGCAGTACAGTGCAAAAATGATACCCCTCGTCACAGTCTGGGGACAATGGACATCGAGCTGACACAATTACACATACAAGAATAAAGATGGAATCTCTACAATACAGAAAGAAATACTGGAACAATTTATAAATGGAGAGCTATTGAGGTGGGTGCGAGAGCAGAGAGCTTTGCCAAGTAGTGCTGTTAGAAAAATAGGGGGGCAAGAATGAGTCCGAGAGCAATGAGACGAGCTGCTTTTAGGAACAAAATCTGTTGATGATACAGTACAAACTAATACATTAGGAAAAGTAGTGTTTCAGACTCCTTGGGCAGCTACCAGCGGCTACACTAGAAGTGATAAAAGATATCCAGAGGAAGCAGCATCTCGAGACCAGCATCTCCTACAATGAGGGGATTAGATGGTGGTATAGCACAGTCTGGGACAGCTGTACTGGGGAAATACAAGAAGAATGAACATCTGTCAATGCCACACCAAGGGAAGTCAGATCCCTTCAGGAAAAGACAACAATGAGACGAGCTTTAGAGGAACAGATAGGGCACACAATCAGTGTGAATTATGTATGCCCCGGCTGGTTTAATAGCAACCATTATCAACATAAAGCTAGAACAGACCCCACCAAAAATTAACAGGGCTTGGTTTTCAGAGTTAGCTTTTTGCTGTACCAATGGCTTAGGCATCAAAGCTATTGTGGAGGAAGACTGTAGTGTGATACAGAGAGAAGCACAACAATTGTAAACTTGATCTGTTGTGTGGCAACTCAAGAGGAAGCCATGCTCCTCTGGCTAATTCAACAGCATCCAGGAAGACTATGTATGTAAAAACAGACAAGCCCCACTCTTTGGATGGTGCAGCAGCTGTTAGACAAGATTTGTACAGGCCTGTAGATTTCACGGACAAGTAGACAGTAGCATTGGGAGCCAGGAATAGTAAAATTAGGAAAAGCCACCTTTGGAATCATAGAAATGAAGAATTAGATACAGTACTGACAATGAGACACCAGAAGAAATAATAGTTGGAGGTAAGACCATGCTAAAAGTTAGCCCTCAATAATAAGACAGCGACGAAGAGCCGATAGACAAAAAATATCAAAGTAGTAATAACAAAAGAACCCACCAGCAATTATGGGGACCAGCAG';
var p5_1, p5_2, p5_3;
var visualizeCounter = -1;
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
      visualizeCounter = (++visualizeCounter)%3;
      if(dnaTextArea.value !== ''){
        lines = dnaTextArea.value;
        dnaFileInput.value = '';
        chosenFile.value  = '';
      }
      switch(visualizeCounter){
        case 0:
          if(!p5_1) 
            p5_1 = new p5(s, 'canvas_1');
          else
            redraw1(p5_1);
        break;
        case 2:
          if(!p5_2) {
              p5_2 = new p5(s, 'canvas_2');
              p5_2.stroke(255, 128, 128, 80);
          }
          else
              redraw1(p5_2);
        break;
        default:
          if(!p5_3) {
            p5_3 = new p5(s, 'canvas_3');
            p5_3.stroke(244, 115, 61, 80);
          }
          else
            redraw1(p5_3);
      }
      
  });
};

function redraw1(myp5){
        myp5.clear();
        myp5.background(200);
        myp5.loop();
        myp5.redraw();
}

var s = function(sketch){

var xbound = 170;
var ybound = 170;
var px = xbound/2;
var py = ybound/2;  
var aminoacid = '';
var i = 0;


//  lines = loadStrings("MethanocaldococcusMarkov.txt");

  sketch.setup = function() {
    // put setup code here
    sketch.createCanvas(170,170);
    sketch.strokeWeight(2);
    sketch.stroke(0, 128, 128, 80);
    sketch.background(200);
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



