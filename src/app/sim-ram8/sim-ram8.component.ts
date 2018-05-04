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
  ngOnInit() {
  }
  f1() {
    this.generateProbability();
    while (this.simulationIndex < 1000 ) {
      this.simulationIndex = this.simulationIndex + 1;
      this.generateCode();
      if (this.generatedCode.length === 8) {
        this.simulationText = this.simulationText + 'Simulation Index: ' + this.simulationIndex + '\n';
        this.simulationText = this.simulationText + 'Generated Code: ' + this.codeText + '\n';
        for (let h = 0; h < 8; h++) {
          this.a[h] = +this.generatedCode[h];
        }
        if (this.a.length === 8) {
          document.getElementById('Code').innerHTML = 'Code: ' + this.a;
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
          if (this.probabilityValue < (this.simulationIndex/10) ) {
            this.generateError();
          }
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
  }
  checkHammingCode() {
    let sum = 0;
    console.log(this.HammingArray);
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
      console.log('bład na: c' + (sum ));
      this.simulationText = this.simulationText + 'STATUS: ERROR ON POSSITION:' + sum + '\n\n';
    } else {
      this.simulationText = this.simulationText + 'STATUS: OK \n\n';
    }
  }
  changeArray(val) {
    console.log('val:' + val);
    console.log(this.HammingArray);
    for (let h = 0; h < 12; h++) {
      this.HammingArray[h] = +val[h];
      document.getElementById('ch' + h + '').innerText = val[h];
    }
    console.log(this.HammingArray);
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
  arrayTostring(){
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
    this.probabilityValue = Math.floor(Math.random() * 100 + 1);
    console.log('probability' + this.probabilityValue);
  }
}
