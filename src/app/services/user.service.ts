

import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggingError=new EventEmitter<boolean>(false)

  isUserLoggedIn= new BehaviorSubject<boolean>(false)
  hash: any;
  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:signup){
return this.http.post('http://localhost:3000/signup',data,{observe:'response'}).subscribe((result)=>{
console.log(result)
if(result){
this.isUserLoggedIn.next(true)
localStorage.setItem('User',JSON.stringify(result.body))
this.router.navigate(['/characters'])
}
})

}
reloadUser(){
  if(localStorage.getItem('User')){
    this.isUserLoggedIn.next(true)
    this.router.navigate(['/characters'])

  }
}

userLogIn(data:signup){
  // console.log(data)
  this.http.get(`http://localhost:3000/signup?email=${data.email}&password${data.password}`,{
    observe:'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length===1){
        this.isLoggingError.emit(false)

        localStorage.setItem('User',JSON.stringify(result.body))
this.router.navigate(['/characters'])
      }
      else{
        console.log("Login Failed")
        this.isLoggingError.emit(true)
      }

    })
}

// Api call for data
// private apiUrl = 'https://superheroapi.com/api/2140261852994527';

private baseUrl = 'https://superheroapi.com/api/2140261852994527';

getAllSuperheroesData(): Observable<any[]> {
  const startId = 1;
  const endId = 731; 
  const observables: Observable<any>[] = [];

  for (let id = startId; id <= endId; id++) {
    const url = `${this.baseUrl}/${id}`;
    const observable = this.http.get(url).pipe(
      catchError((error) => {
        console.error(`Error fetching superhero with ID ${id}:`, error);
        return of(null); 
      })
    );
    observables.push(observable);
  }

  return forkJoin(observables).pipe(
    map((results) => {
      return results.filter((result) => result !== null);
    })
  );
}


}