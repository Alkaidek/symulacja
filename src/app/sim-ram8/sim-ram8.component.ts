import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ram-sim-ram8',
  templateUrl: './sim-ram8.component.html',
  styleUrls: ['./sim-ram8.component.css']
})
export class SimRam8Component implements OnInit {


  constructor() { }
  a = [];
  HammingArray = [];
  j = 0;
  generatedCode = [];
  codeText = '';
  simulationText = '';
  codeTextHamming = '';
  simulationStatus = true;
  simulationIndex = 0;
  probabilityValue;
  errorIndex;
  errorAmount = 0;
  correctAmount = 0;
  unif;
  beta;
  betaLeft;
  L;
  U;
  imagePath;
  transferTime;
  simulationTime = 0;
  transferTimeArray = [];
  simulationCodeArray = [];
  simulationHammingCodeArray = [];
  ngOnInit() {
  }
  f1() {
    while (this.simulationIndex < 1000 ) {
      if ( this.transferTime === 10 ) {
        this.probabilityValue = this.poissonRandomNumber(1200) + (this.simulationIndex / 5);
      } else {
        this.probabilityValue = this.generateProbability();
      }
      console.log(this.simulationIndex + ' : ' + this.probabilityValue);
      this.simulationIndex = this.simulationIndex + 1;
      this.generateCode();
      if (this.generatedCode.length === 8) {

        this.simulationText = this.simulationText + 'Simulation Index: ' + this.simulationIndex + '\n';
        const tmpTime = Math.floor(Math.random() * ((this.transferTime * 2) - this.transferTime + 1) ) + this.transferTime;
        this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationTime = this.simulationTime + tmpTime;
        this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n';
        this.simulationText = this.simulationText +  'Generated Code: ' + this.codeText + '\n';
        this.simulationCodeArray[this.simulationCodeArray.length] = this.codeText;
        for (let h = 0; h < 8; h++) {
          this.a[h] = +this.generatedCode[h];
        }
        if (this.a.length === 8) {
          this.j = 0;
          for (let i = 0; i < 12; i++) {
            if (i === 0) {
              this.HammingArray[i] = +(this.a[0] ^ this.a[1] ^ this.a[3] ^ this.a[4] ^ this.a[6]);
            } else if (i === 1) {
              this.HammingArray[i] = +(this.a[0] ^ this.a[2] ^ this.a[3] ^ this.a[5] ^ this.a[6]);
            } else if (i === 3) {
              this.HammingArray[i] = +(this.a[1] ^ this.a[2] ^ this.a[3] ^ this.a[7]);
            } else if (i === 7) {
              this.HammingArray[i] = +(this.a[4] ^ this.a[5] ^ this.a[6] ^ this.a[7]);
            } else {
              this.HammingArray[i] = +(this.a[this.j]);
              this.j++;
            }

          }
          //console.log('Hamming Array: ' + this.HammingArray);
          //document.getElementById('HammingCode').innerHTML = 'Hamming Code: ' + this.array;
          if (this.probabilityValue < (this.simulationIndex )  ) {
            this.generateError();
          }
          this.simulationHammingCodeArray[this.simulationHammingCodeArray.length] = this.codeTextHamming;
          this.arrayTostring();
          this.simulationText = this.simulationText + 'Hamming Code: ' + this.codeTextHamming + '\n';
          this.checkHammingCode();
        } else {
          alert('Długość kodu musi mieć 8 znaków!');
        }
      } else {
        alert('Długość kodu musi mieć 8 znaków!');
      }
    }
    alert('Errors amount: ' + this.errorAmount + ' out of ' + this.simulationIndex);
    console.log('time: ' + this.transferTimeArray);
    console.log('code: ' + this.simulationCodeArray);
    console.log('Hamming code: ' + this.simulationHammingCodeArray);
  }
  checkHammingCode() {
    let sum = 0;
    //console.log(this.HammingArray);
    if ( this.HammingArray[0] !== ( this.HammingArray[2] ^ this.HammingArray[4] ^ this.HammingArray[6] ^ this.HammingArray[8] ^ this.HammingArray[10] ) ) {
      sum = 1;
    }
    if ( this.HammingArray[1] !== ( this.HammingArray[2] ^ this.HammingArray[5] ^ this.HammingArray[6] ^ this.HammingArray[9] ^ this.HammingArray[10] ) ) {
      sum = sum + 2;
    }
    if ( this.HammingArray[3] !== ( this.HammingArray[4] ^ this.HammingArray[5] ^ this.HammingArray[6] ^ this.HammingArray[11] ) ) {
      sum = sum + 4;
    }
    if ( this.HammingArray[7] !== ( this.HammingArray[8] ^ this.HammingArray[9] ^ this.HammingArray[10] ^ this.HammingArray[11] ) ) {
      sum = sum + 8;
    }
    if ( sum !== 0 ) {
      //console.log('bład na: c' + (sum ));
      this.errorIndex = sum;
      this.simulationText = this.simulationText + 'STATUS: ERROR ON POSSITION:' + sum + '\n';
      this.errorAmount = this.errorAmount + 1;
      this.repairHammingCode();
    } else {
      this.simulationText = this.simulationText + 'STATUS: OK \n\n';
      this.correctAmount = this.correctAmount + 1;
    }
  }
  changeArray(val) {
    //console.log('val:' + val);
    //console.log(this.HammingArray);
    for (let h = 0; h < 12; h++) {
      this.HammingArray[h] = +val[h];
      document.getElementById('ch' + h + '').innerText = val[h];
    }
    //console.log(this.HammingArray);
  }
  generateCode() {
    this.codeText = '';
    for (let i = 0; i < 8; i++) {
      this.generatedCode[i] = Math.floor(Math.random() * 2);
    }
    for (let i = 0; i < 8; i++) {
      this.codeText = this.codeText + this.generatedCode[i];
    }
  }
  arrayTostring() {
    this.codeTextHamming = '';
    for (let i = 0; i < 12; i++) {
      this.codeTextHamming = this.codeTextHamming + this.HammingArray[i];
    }
  }
  reset() {
    this.simulationIndex = 0;
  }
  generateError() {
    const index = Math.floor(Math.random() * 12);
    //console.log('wartość: ' + this.HammingArray[index]);
    if ( this.HammingArray[index] === 1) {
      this.HammingArray[index] = 0;
    } else {
      this.HammingArray[index] = 1;
    }
    //console.log('wartość po: ' + this.HammingArray[index]);
  }
  generateProbability() {
    this.probabilityValue = Math.floor(Math.random() * 1000 + 1);
    //console.log('probability' + this.probabilityValue);
    return this.probabilityValue;
  }
  repairHammingCode(){
    if ( this.HammingArray[(this.errorIndex - 1)] === 1) {
      this.HammingArray[(this.errorIndex - 1)] = 0;
    } else {
      this.HammingArray[(this.errorIndex - 1)] = 1;
    }
    this.arrayTostring();
    this.simulationText = this.simulationText + 'STATUS: HAMMING CODE HAS BEEN REPAIRED:' + this.codeTextHamming +   ' \n';
    this.checkHammingCode();
  }
  probabilityBetaLeft() {
    this.unif = Math.random();
    this.beta =  Math.sin (this.unif * Math.PI / 2 ) ^ 2;
    this.betaLeft = (this.beta > 0.5) ? 2 * this.beta - 1 : 2 * (1 - this.beta) - 1;
    console.log (this.simulationIndex +   'Probability' + this.betaLeft );
  }
  poissonRandomNumber(lambda) {
    this.L = Math.exp( - lambda);
    let k = 40;
    let p = 0.5;
    do {
       k = k + 1;
       p = p * Math.random();
    } while (p > this.L);

    return k - 1;
  }
  randomExponential(rate, randomUniform) {
    // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
    rate = rate || 1;

    // Allow to pass a random uniform value or function
    // Default to Math.random()
    this.U = randomUniform;
    if (typeof randomUniform === 'function') {
      this.U = randomUniform();
    }
    if ( !this.U ) {
      this.U = Math.random();
    }

    return -Math.log(this.U) / rate;
  }
  setOption(arg1) {
    this.imagePath = 'bcg' + arg1 + '.png';
    this.transferTime = arg1 * 10;
  }
}
