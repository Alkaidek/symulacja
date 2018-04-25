import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'ham-hc-ram',
  templateUrl: './hc-ram.component.html',
  styleUrls: ['./hc-ram.component.css']
})
export class HcRamComponent implements OnInit {
  constructor() { }
   a = [];
   array = [];
   HammingArray = [];
   aColnum = [];
   j = 0;
  value;
  ngOnInit() {
  }
  f1(val) {
    this.value = val;
    if (this.value.length === 8) {
      console.log(this.value);
      for (let h = 0; h < 8; h++) {
        this.a[h] = +this.value[h];
      }
      console.log(this.a);
      if (this.a.length === 8) {
        document.getElementById('Code').innerHTML = 'Code: ' + this.a;
        this.j = 0;
        for (let i = 0; i < 12; i++) {
          if (i === 0) {
            this.array[i] = '<th id="ch' + i + '" style="background-color: yellow;">' + (this.a[0] ^ this.a[1] ^ this.a[3] ^ this.a[4] ^ this.a[6]) + '</th>';
            this.HammingArray[i] = +(this.a[0] ^ this.a[1] ^ this.a[3] ^ this.a[4] ^ this.a[6]);
            this.aColnum[i] = '<th  id="hc' + i + '" style="background-color: yellow;">hc' + i + '</th>';
          } else if (i === 1) {
            this.array[i] = '<th id="ch' + i + '" style="background-color: yellow;">' + (this.a[0] ^ this.a[2] ^ this.a[3] ^ this.a[5] ^ this.a[6]) + '</th>';
            this.HammingArray[i] = +(this.a[0] ^ this.a[2] ^ this.a[3] ^ this.a[5] ^ this.a[6]);
            this.aColnum[i] = '<th id="hc' + i + '" style="background-color: yellow;">hc' + i + '</th>';
          } else if (i === 3) {
            this.array[i] = '<th id="ch' + i + '" style="background-color: yellow;">' + (this.a[1] ^ this.a[2] ^ this.a[3] ^ this.a[7]) + '</th>';
            this.HammingArray[i] = +(this.a[1] ^ this.a[2] ^ this.a[3] ^ this.a[7]);
            this.aColnum[i] = '<th id="hc' + i + '"style="background-color: yellow;">hc' + i + '</th>';
          } else if (i === 7) {
            this.array[i] = '<th id="ch' + i + '"style="background-color: yellow;">' + (this.a[4] ^ this.a[5] ^ this.a[6] ^ this.a[7]) + '</th>';
            this.HammingArray[i] = +(this.a[4] ^ this.a[5] ^ this.a[6] ^ this.a[7]);
            this.aColnum[i] = '<th id="hc' + i + '"style="background-color: yellow;">hc' + i + '</th>';
          } else {
            this.array[i] = '<th id="ch' + i + '"style="background-color: green;">' + (this.a[this.j]) + '</th>';
            this.HammingArray[i] = +(this.a[this.j]);
            console.log(this.a[1]);
            this.aColnum[i] = '<th id="hc' + i + '"style="background-color: green;">c' + i + '</th>';
            this.j++;
          }
          console.log('Hamming Array: ' + this.HammingArray);
        }
        document.getElementById('HammingCode').innerHTML = 'Hamming Code: ' + this.array;
        document.getElementById('ColNumber').innerHTML = 'Col Number: ' + this.aColnum;
      } else {
        document.getElementById('Code').innerHTML = 'kod musi miec 8 znaków';
        document.getElementById('HammingCode').innerHTML = '';
        document.getElementById('ColNumber').innerHTML = '';
      }
    } else {
      alert('Długość kodu musi mieć 8 znaków!');
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
    if(sum !== 0) {
      console.log('bład na: c' + (sum - 1));
      alert('bład na: c' + (sum - 1))
      document.getElementById('ch' + (sum - 1) + '').style.backgroundColor = 'red';
      document.getElementById('hc' + (sum - 1) + '').style.backgroundColor = 'red';
    } else {
      alert('brak błędu');
    }
  }
  changeArray(val){
    console.log('val:' + val);
    console.log(this.HammingArray);
    for (let h = 0; h < 12; h++) {
      this.HammingArray[h] = +val[h];
      document.getElementById('ch' + h + '').innerText = val[h];
    }
    console.log(this.HammingArray);
  }
}
