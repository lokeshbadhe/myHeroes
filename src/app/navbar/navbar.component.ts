import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu: string = "default";
  userName: string = ""; 

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const userLoggedIn = !!localStorage.getItem('User');

      if (userLoggedIn) {
        // console.log("User is logged ");
        this.menu = "User";
        let userStore=localStorage.getItem('User');
        let userData=userStore && JSON.parse(userStore)[0];
        this.userName=userData.first;

      } else {
        this.menu = "default";
        this.userName = ""; 
      }

      this.cdr.detectChanges();
    });
  }
  logout(): void {
    localStorage.removeItem('User');

    this.router.navigate(['/login']); 
  }
}
