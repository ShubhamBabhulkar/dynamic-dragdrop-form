import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-output',
  templateUrl: './form-output.component.html',
  styleUrls: ['./form-output.component.scss']
})
export class FormOutputComponent implements OnInit {
  registerForm: FormGroup;
  components:[];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.components = JSON.parse(localStorage.getItem('components'));
    console.log(this.components);
    this.registerForm = this.formBuilder.group(this.generateObject(this.components));
  }


  generateObject = (obj)=>{
    const myObj={};
    obj.forEach(element => {
      if(element.type=='input'){
        let name = element.name;
        myObj[name] = [''];
      }
    });
   return myObj;
  }

  onSubmit = () =>{
    console.log(this.registerForm.value);
    alert(JSON.stringify(this.registerForm.value));
  }

}
