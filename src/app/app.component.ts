import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//first set implements OnInit lifecycle
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  //we are required then to place the ngOnInit method
  //this intializes it before the template is rendered
  //we need to create a new FormGroup
  //once we have passing in a js object, then we have our first form
  //remember reactive forms are created programatically
  //first argument is the default, the second is the validators
  //if you want to pass multiple validators, make an array
  //controls are all added in ngOnInit
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        //we have to bind forbiddenNames to username so it refers to the class 'username'
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }), 
      'gender': new FormControl('male'),
      //FormArray holds an array of controls
      'hobbies': new FormArray([new FormControl])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    //we need to tell ts that this is of type FormArray, so we won't get any errors
    //by placing it all in parens, we are telling angular that it is a form array
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
//for a vaildator to work, we have to enter control as the argument
//it also needs to return something, a js object
//it should have any key, and the value of the key/value pair should be a boolean
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    //a problem we are running into is we are checking if control value is part of the array
    //this will return -1 if it is not part
    //-1 is interperted as true
    //so set up the logic to check if it is not equal to -1
    //meaning we did find it, and it is invalid
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    //must return nothing is validation is successful
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
