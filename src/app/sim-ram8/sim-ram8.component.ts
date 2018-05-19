import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ram-sim-ram8',
  templateUrl: './sim-ram8.component.html',
  styleUrls: ['./sim-ram8.component.css']
})
export class SimRam8Component implements OnInit {


  constructor() { }
  i = 0
  a = [];
  HammingArray = [];
  j = 0;
  probabilityTenPercent = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  items = [10, 12, 14, 16, 19, 20, 21];
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
  imagePath = 'bc.png';
  imagePath2 = 'p1.png';
  transferTime;
  simulationTime = 0;
  transferTimeArray = [];
  simulationCodeArray = [];
  simulationHammingCodeArray = [];
  simulationHappeningArray = [];
  numberOfError = 0;
  numberOfCriticalError = 0;
  actualText = '';
  simulationRun = true;
  ngOnInit() {
  }
  f1() {
    while (this.simulationIndex < 501 ) {
      this.numberOfError = 0;
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
        this.simulationText = this.simulationText +  'Generated Code: ' + this.codeText + '\n';
        let tmpTime = Math.floor(Math.random() * ((20) - 10 + 1) ) + 10;
        this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationTime = this.simulationTime + tmpTime;
        this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n';
        this.simulationCodeArray[this.simulationCodeArray.length] = this.codeText;
        this.simulationHappeningArray[this.simulationHappeningArray.length] = this.codeText;
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
          if (this.probabilityValue < (this.simulationIndex )  ) {
            this.generateError();
          }
          this.arrayTostring();
          this.simulationHammingCodeArray[this.simulationHammingCodeArray.length] = this.codeTextHamming;
          this.simulationHappeningArray[this.simulationHappeningArray.length] = this.codeTextHamming;

          this.simulationText = this.simulationText + 'Hamming Code: ' + this.codeTextHamming + '\n';
          tmpTime = Math.floor(Math.random() * ((this.transferTime * 2) - this.transferTime + 1) ) + this.transferTime;
          this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
          this.simulationTime = this.simulationTime + tmpTime;
          //this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
          this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n';
          this.checkHammingCode();
        } else {
          alert('Długość kodu musi mieć 8 znaków!');
        }
      } else {
        alert('Długość kodu musi mieć 8 znaków!');
      }
    }
    alert('Errors amount: ' + this.errorAmount + ' out of ' + this.simulationIndex + ' || critical error number: ' + this.numberOfCriticalError );
    console.log('time: ' + this.transferTimeArray);
    console.log('code: ' + this.simulationHappeningArray);
   // console.log('Hamming code: ' + this.simulationHammingCodeArray);
    console.log('Długość czasu: ' + this.transferTimeArray.length);
    console.log('Długość zdarzeń: ' + this.simulationHappeningArray.length);
    this.simulationArrayToString();
  }
  checkHammingCode() {
      let sum = 0;
      let tmpTime;
      if (this.HammingArray[0] !== (this.HammingArray[2] ^ this.HammingArray[4] ^ this.HammingArray[6] ^ this.HammingArray[8] ^ this.HammingArray[10])) {
        sum = 1;
      }
      if (this.HammingArray[1] !== (this.HammingArray[2] ^ this.HammingArray[5] ^ this.HammingArray[6] ^ this.HammingArray[9] ^ this.HammingArray[10])) {
        sum = sum + 2;
      }
      if (this.HammingArray[3] !== (this.HammingArray[4] ^ this.HammingArray[5] ^ this.HammingArray[6] ^ this.HammingArray[11])) {
        sum = sum + 4;
      }
      if (this.HammingArray[7] !== (this.HammingArray[8] ^ this.HammingArray[9] ^ this.HammingArray[10] ^ this.HammingArray[11])) {
        sum = sum + 8;
      }
      if (sum !== 0) {
        this.errorIndex = sum;
        this.simulationText = this.simulationText + 'STATUS: ERROR ON POSSITION:' + sum + '\n';
        this.simulationHappeningArray[this.simulationHappeningArray.length] = 'ERROR'
        this.errorAmount = this.errorAmount + 1;
        tmpTime = Math.floor(Math.random() * ((20) - 10 + 1)) + 10;
        this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationTime = this.simulationTime + tmpTime;
        //this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n';
        this.repairHammingCode();
      } else {
        this.simulationText = this.simulationText + 'STATUS: OK \n';
        this.simulationHappeningArray[this.simulationHappeningArray.length] = 'OK'
        tmpTime = Math.floor(Math.random() * ((20) - 10 + 1)) + 10;
        this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationTime = this.simulationTime + tmpTime;
        //this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
        this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n\n';
        this.correctAmount = this.correctAmount + 1;
      }
  }
  changeArray(val) {
    for (let h = 0; h < 12; h++) {
      this.HammingArray[h] = +val[h];
      document.getElementById('ch' + h + '').innerText = val[h];
    }
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
    if ( this.HammingArray[index] === 1) {
      this.HammingArray[index] = 0;
    } else {
      this.HammingArray[index] = 1;
    }
    for (let i = 0; i < 12; i++) {
      if (i !== index) {
        const randomIndex =  Math.floor(Math.random() * 20);
        if ( this.probabilityTenPercent[randomIndex] === 1 ) {
          if ( this.HammingArray[i] === 1) {
            this.HammingArray[i] = 0;
          } else {
            this.HammingArray[i] = 1;
          }
        }
      }
    }
  }
  generateProbability() {
    this.probabilityValue = Math.floor(Math.random() * 1000 + 1);
    return this.probabilityValue;
  }
  repairHammingCode() {
    let tmpTime;
    this.numberOfError = this.numberOfError + 1;
    if (this.numberOfError !== 2) {
      if (this.HammingArray[(this.errorIndex - 1)] === 1) {
        this.HammingArray[(this.errorIndex - 1)] = 0;
      } else {
        this.HammingArray[(this.errorIndex - 1)] = 1;
      }
      this.arrayTostring();
      this.simulationText = this.simulationText + 'STATUS: HAMMING CODE HAS BEEN REPAIRED:' + this.codeTextHamming + ' \n';
      this.simulationHappeningArray[this.simulationHappeningArray.length] = 'REPAIRED';
      tmpTime = Math.floor(Math.random() * ((20) - 10 + 1)) + 10;
      this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
      this.simulationTime = this.simulationTime + tmpTime;
      //this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
      this.simulationText = this.simulationText + 'SimulationTime ' + this.simulationTime / 1000 + '\n';
      this.checkHammingCode();
    } else {
      this.numberOfCriticalError = this.numberOfCriticalError + 1;
      this.simulationHappeningArray[this.simulationHappeningArray.length] = 'CANNOT BEEN REPAIRED';
      this.simulationText = this.simulationText + 'STATUS: HAMMING CODE CANNOT BEEN REPAIRED: \n';
      tmpTime = Math.floor(Math.random() * ((20) - 10 + 1)) + 10;
      this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
      this.simulationTime = this.simulationTime + tmpTime;
     // this.transferTimeArray[this.transferTimeArray.length] = tmpTime;
      this.simulationText = this.simulationText + 'SimulationTime with ' + this.simulationTime / 1000 + '\n\n';
    }
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
  simulationArrayToString() {
    let textOfSimulation = '';
    for (let i = 0; i < this.simulationHappeningArray.length; i++) {
      textOfSimulation = textOfSimulation + ' ' + this.transferTimeArray[i] + ':' + this.simulationHappeningArray[i];

    }
    console.log(textOfSimulation);
  }
  move() {
    for (this.i = 0; this.i < this.simulationHappeningArray.length; this.i++) {
      document.getElementById('simulationDot').style.marginLeft = 400 + 'px';
      setTimeout(() => {
          this.movePart1(this.i);
          this.i++;
        },
        1000);
      setTimeout(() => {
          this.movePart2(this.i);
          this.i++;
        },
        1200);
      setTimeout(() => {
          this.movePart3();
        },
        1400);
      setTimeout(() => {
          this.movePart4(this.i);
        },
        1600);
    }
  }
  movePart1(z) {
   // setTimeout(function () {
      this.actualText = this.simulationHappeningArray[z];
      console.log(this.actualText);
    //}, 300);
  }
  movePart2(z) {
    //setTimeout(function () {
      this.imagePath2 = 'p2.png';
      this.actualText = this.simulationHappeningArray[z];
   // }, 400);
  }
  movePart3() {
    //setTimeout(function () {
      document.getElementById('simulationDot').style.marginLeft = 800 + 'px';
    //}, 500);
  }
  movePart4(z) {
   // setTimeout(function () {
      if (this.simulationHappeningArray[z] === 'OK') {
        this.imagePath2 = 'p3.png';
        this.actualText = this.simulationHappeningArray[z];

      } else {
        this.imagePath2 = 'p4.png';
        this.actualText = this.simulationHappeningArray[z];
        this.i++;
        this.i++;
      }
   // }, 600);
  }
  moveAll() {
    //for (let i = 0;  i < this.simulationHappeningArray.length; i++) {
    this.actualText = '';
    this.imagePath2 = 'p1.png';
    document.getElementById('simulationDot').style.marginLeft = 400 + 'px';
    setTimeout(() => {
        this.actualText = this.simulationHappeningArray[this.i];
        console.log(this.actualText);
        this.i++;
        setTimeout(() => {
            this.imagePath2 = 'p2.png';
            this.actualText = this.simulationHappeningArray[this.i];
            this.i++;
            setTimeout(() => {
                document.getElementById('simulationDot').style.marginLeft = 800 + 'px';
                setTimeout(() => {
                    if (this.simulationHappeningArray[this.i] === 'OK') {
                      this.imagePath2 = 'p3.png';
                      this.actualText = this.simulationHappeningArray[this.i];
                      this.i++;
                      setTimeout(() => {
                        if ( this.i < this.simulationHappeningArray.length ) {
                          this.moveAll();
                          }
                        }, 500);
                    } else {
                      this.imagePath2 = 'p4.png';
                      this.actualText = this.simulationHappeningArray[this.i];
                      this.i++;
                      this.i++;
                      this.i++;
                      setTimeout(() => {
                        if ( this.i < this.simulationHappeningArray.length ) {
                          this.moveAll();
                        }
                      }, 500);
                    }
                  },
                  500);
              },
              500);
          },
          500);
      },
      500);


    //}

  }

}
